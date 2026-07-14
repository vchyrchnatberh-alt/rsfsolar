import { NextRequest, NextResponse } from "next/server";
import { generateText, stepCountIs, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import {
  SOLAR_SYSTEM_PROMPT,
  getHistory,
  pushHistory,
  clearHistory,
  pruneOldSessions,
} from "@/lib/telegram-ai";

// ─────────────────────────────────────────────────────────────
// Telegram Bot API helpers
// ─────────────────────────────────────────────────────────────
async function tg(method: string, body: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN not set");
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error(`[tg:${method}] ${res.status}: ${errText}`);
  }
  return res;
}

const escapeHtml = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ─────────────────────────────────────────────────────────────
// Telegram Update type (лише те, що використовуємо)
// ─────────────────────────────────────────────────────────────
type TelegramUpdate = {
  message?: {
    message_id: number;
    chat: { id: number; type: string };
    from?: {
      id: number;
      username?: string;
      first_name?: string;
      last_name?: string;
    };
    text?: string;
  };
};

// ─────────────────────────────────────────────────────────────
// Головний handler
// ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const update = (await req.json()) as TelegramUpdate;
    const msg = update.message;

    // Ігноруємо не-текстові повідомлення
    if (!msg?.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = msg.chat.id;
    const text = msg.text.trim();
    const user = msg.from;
    const userLabel = user
      ? `${user.first_name ?? "Клієнт"}${user.last_name ? ` ${user.last_name}` : ""}${
          user.username ? ` (@${user.username})` : ""
        }`
      : "Невідомий";

    // ── Ігноруємо повідомлення в менеджерській групі ──
    // (там сидять менеджери, бот тільки шле notify туди — не відповідає)
    const managerGroupId = process.env.TELEGRAM_CHAT_ID;
    if (managerGroupId && String(chatId) === String(managerGroupId)) {
      return NextResponse.json({ ok: true });
    }

    // Ігноруємо групові чати взагалі (бот тільки для приватних)
    if (msg.chat.type !== "private") {
      return NextResponse.json({ ok: true });
    }

    pruneOldSessions();

    // ── Команди ──
    if (text === "/start" || text === "/help") {
      await tg("sendMessage", {
        chat_id: chatId,
        parse_mode: "HTML",
        text: `Вітаю, ${escapeHtml(user?.first_name ?? "друже")}! 👋

Я AI-асистент <b>Royal Sun Flower</b> — компанії з монтажу сонячних електростанцій.

Питайте що завгодно:
☀️ Ціни на СЕС для дому чи бізнесу
🏠 Який дах підходить, скільки часу монтаж
⚡ Гарантія, обладнання, окупність
🔋 Гібридні системи з акумуляторами

Якщо треба живий менеджер — я переведу автоматично.

📞 Швидкий зв'язок: +38 (066) 804 25 23
🌐 rsf.com.ua`,
      });
      return NextResponse.json({ ok: true });
    }

    if (text === "/reset") {
      clearHistory(chatId);
      await tg("sendMessage", {
        chat_id: chatId,
        text: "🔄 Історію розмови очищено. Можете почати з нуля.",
      });
      return NextResponse.json({ ok: true });
    }

    // ── Перевірка API-ключа Gemini ──
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("[telegram-webhook] GOOGLE_GENERATIVE_AI_API_KEY not set");
      await tg("sendMessage", {
        chat_id: chatId,
        text:
          "Вибачте, AI тимчасово недоступний. Зателефонуйте, будь ласка: +38 (066) 804 25 23",
      });
      return NextResponse.json({ ok: true });
    }

    // ── Індикатор «друкую…» ──
    await tg("sendChatAction", { chat_id: chatId, action: "typing" });

    // ── Побудова історії для моделі ──
    const history = getHistory(chatId);
    const messages = [
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user" as const, content: text },
    ];

    // ── Виклик Gemini з інструментом ескалації ──
    let escalated = false;

    const result = await generateText({
      model: google("gemini-2.0-flash-001"),
      system: SOLAR_SYSTEM_PROMPT,
      messages,
      stopWhen: stepCountIs(3),
      tools: {
        escalate_to_manager: tool({
          description:
            "Переводить клієнта на живого менеджера. Викликай коли клієнт хоче індивідуальний прорахунок, скаржиться, готовий залишити заявку, явно просить людину, або питання поза твоєю компетенцією.",
          inputSchema: z.object({
            reason: z
              .string()
              .describe(
                "Коротка причина ескалації (1 речення українською), напр.: 'Клієнт хоче прорахунок для будинку 200 м²'",
              ),
            summary: z
              .string()
              .describe(
                "Стисле резюме розмови для менеджера (2-3 речення українською): чого хоче клієнт, які деталі згадав.",
              ),
            user_message: z
              .string()
              .describe(
                "Дружнє повідомлення клієнту (2-3 речення), що менеджер скоро зв'яжеться.",
              ),
          }),
          execute: async ({ reason, summary, user_message }) => {
            escalated = true;
            // Форматуємо і надсилаємо в менеджерську групу
            const kyivTime = new Date().toLocaleString("uk-UA", {
              timeZone: "Europe/Kyiv",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            const historyLines: string[] = [];
            for (const m of history.slice(-8)) {
              historyLines.push(
                `${m.role === "user" ? "❓" : "🤖"} ${escapeHtml(m.content.slice(0, 300))}`,
              );
            }
            historyLines.push(`❓ ${escapeHtml(text.slice(0, 300))}`);

            const notification = [
              "🆕 <b>Ескалація з Telegram-бота</b>",
              "━━━━━━━━━━━━━━━━━━━━━━",
              `👤 <b>${escapeHtml(userLabel)}</b>`,
              user?.username ? `💬 Написати: t.me/${user.username}` : "",
              "",
              `📌 <b>Причина:</b> ${escapeHtml(reason)}`,
              "",
              `📝 <b>Резюме:</b>`,
              escapeHtml(summary),
              "",
              `📜 <b>Історія переписки:</b>`,
              ...historyLines,
              "",
              `🕐 ${kyivTime}`,
            ]
              .filter(Boolean)
              .join("\n");

            if (managerGroupId) {
              await tg("sendMessage", {
                chat_id: managerGroupId,
                text:
                  notification.length > 4000
                    ? notification.slice(0, 3990) +
                      "\n\n<i>... (обрізано)</i>"
                    : notification,
                parse_mode: "HTML",
                disable_web_page_preview: true,
              });
            }

            return { ok: true, user_message };
          },
        }),
      },
    });

    const reply = result.text?.trim() || "Хвилинку, обробляю ваше питання...";

    // Зберігаємо в історію
    pushHistory(chatId, { role: "user", content: text });
    pushHistory(chatId, { role: "assistant", content: reply });

    // Надсилаємо відповідь
    await tg("sendMessage", {
      chat_id: chatId,
      text: reply,
    });

    // Якщо була ескалація — додаємо коротке повідомлення що це не рушник
    if (escalated) {
      await tg("sendMessage", {
        chat_id: chatId,
        text: "✅ Менеджер вже отримав ваш запит і зв'яжеться з вами найближчим часом.",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[telegram-webhook] error:", err);
    // Telegram очікує 200 навіть при помилках, інакше буде ретраїти
    return NextResponse.json({ ok: true });
  }
}

// ─────────────────────────────────────────────────────────────
// GET — щоб зареєструвати webhook в браузері одним кліком
// Приклад: https://rsf.com.ua/api/telegram-webhook?setup=SECRET_KEY
// ─────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const setupToken = req.nextUrl.searchParams.get("setup");
  const expected = process.env.WEBHOOK_SETUP_TOKEN;

  if (!expected || setupToken !== expected) {
    return NextResponse.json(
      { ok: false, hint: "Webhook endpoint is alive. Use ?setup=TOKEN to register." },
      { status: 200 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "TELEGRAM_BOT_TOKEN not set" },
      { status: 500 },
    );
  }

  const url = `${req.nextUrl.origin}/api/telegram-webhook`;
  const res = await fetch(
    `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(
      url,
    )}&allowed_updates=${encodeURIComponent(JSON.stringify(["message"]))}`,
  );
  const data = await res.json();
  return NextResponse.json({ ok: true, telegram: data, webhookUrl: url });
}
