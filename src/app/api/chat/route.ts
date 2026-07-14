import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit — простий Map на процес. Достатньо для MVP.
// Для розподіленої системи знадобиться Vercel KV / Redis.
const rateLimitMap = new Map<string, number[]>();
const MAX_REQ_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1) Honeypot — приховане поле, яке живі люди не бачать.
    // Якщо заповнене — це бот. Мовчки повертаємо OK, щоб бот думав що спрацювало.
    if (body.website && String(body.website).trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // 2) Rate limit по IP
    const ip = getClientIp(req);
    const now = Date.now();
    const timestamps = (rateLimitMap.get(ip) ?? []).filter(
      (t) => now - t < HOUR_MS,
    );
    if (timestamps.length >= MAX_REQ_PER_HOUR) {
      return NextResponse.json(
        {
          ok: false,
          error: "Забагато запитів. Спробуйте, будь ласка, через годину.",
        },
        { status: 429 },
      );
    }
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);

    // 3) Валідація
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const question = String(body.question ?? "").trim();
    // Історія FAQ-переписки клієнта до відправки (для контексту менеджеру)
    const rawHistory: unknown = body.history;
    const history: Array<{ question: string; answer: string }> = Array.isArray(
      rawHistory,
    )
      ? rawHistory
          .slice(-6) // серверне обмеження — до 6 останніх
          .map((h) => ({
            question: String(
              (h as { question?: unknown })?.question ?? "",
            ).slice(0, 200),
            answer: String(
              (h as { answer?: unknown })?.answer ?? "",
            ).slice(0, 400),
          }))
          .filter((h) => h.question && h.answer)
      : [];

    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Введіть ваше ім'я" },
        { status: 400 },
      );
    }
    if (!phone || !/^[\d+\s\-()]{9,}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: "Введіть коректний телефон" },
        { status: 400 },
      );
    }
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Некоректний email" },
        { status: 400 },
      );
    }
    // question тепер необов'язковий — форма може бути «просто залишити контакти»
    if (question.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Занадто довге повідомлення" },
        { status: 400 },
      );
    }
    const finalQuestion =
      question || "Клієнт залишив контакти для консультації через чат-віджет.";

    // 4) Секрети з env
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("[chat] Telegram credentials not configured");
      return NextResponse.json(
        { ok: false, error: "Сервер не налаштовано. Зателефонуйте нам напряму." },
        { status: 500 },
      );
    }

    // 5) Форматуємо і слугуємо в Telegram
    const kyivTime = new Date().toLocaleString("uk-UA", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const messageLines: string[] = [
      "🆕 <b>Нове питання з сайту</b>",
      "━━━━━━━━━━━━━━━━━━━━━━",
      `👤 <b>${escapeHtml(name)}</b>`,
      `📞 ${escapeHtml(phone)}`,
    ];
    if (email) messageLines.push(`📧 ${escapeHtml(email)}`);

    // ── Історія переписки з FAQ-ботом (якщо є) ──
    if (history.length > 0) {
      messageLines.push("");
      messageLines.push(
        `📜 <b>Що клієнт питав у бота (${history.length}):</b>`,
      );
      history.forEach((h, i) => {
        messageLines.push("");
        messageLines.push(`<b>${i + 1}.</b> ❓ <i>${escapeHtml(h.question)}</i>`);
        messageLines.push(`🤖 ${escapeHtml(h.answer)}`);
      });
      messageLines.push("");
      messageLines.push("━━━━━━━━━━━━━━━━━━━━━━");
    }

    messageLines.push("");
    messageLines.push(
      question
        ? `💬 <b>Особисте питання клієнта:</b>`
        : `💬 <b>Заявка на консультацію</b>`,
    );
    messageLines.push(escapeHtml(finalQuestion));
    messageLines.push("");
    messageLines.push(`🕐 ${kyivTime}`);
    messageLines.push(`🌐 rsf.com.ua`);

    let message = messageLines.join("\n");

    // Telegram обмежує повідомлення 4096 символами
    if (message.length > 4000) {
      message = message.slice(0, 3990) + "\n\n<i>... (обрізано)</i>";
    }

    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error("[chat] Telegram API error:", tgRes.status, errText);
      return NextResponse.json(
        { ok: false, error: "Не вдалось надіслати. Спробуйте ще раз." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[chat] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Внутрішня помилка. Спробуйте ще раз." },
      { status: 500 },
    );
  }
}
