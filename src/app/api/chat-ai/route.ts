import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { SOLAR_SYSTEM_PROMPT } from "@/lib/telegram-ai";

// Rate-limit по IP — щоб не палити безкоштовний Gemini-квоти на спамерах
const rateLimitMap = new Map<string, number[]>();
const MAX_MSGS_PER_HOUR = 40;
const HOUR_MS = 60 * 60 * 1000;

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

type ClientMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Rate limit
    const ip = getClientIp(req);
    const now = Date.now();
    const timestamps = (rateLimitMap.get(ip) ?? []).filter(
      (t) => now - t < HOUR_MS,
    );
    if (timestamps.length >= MAX_MSGS_PER_HOUR) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Забагато повідомлень. Спробуйте через годину або зателефонуйте: +38 (066) 804 25 23",
        },
        { status: 429 },
      );
    }
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);

    // Валідація історії
    const rawHistory: unknown = body.messages;
    if (!Array.isArray(rawHistory) || rawHistory.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Порожня історія повідомлень" },
        { status: 400 },
      );
    }

    const messages: ClientMessage[] = rawHistory
      .slice(-20)
      .map((m): ClientMessage => ({
        role:
          (m as { role?: string })?.role === "assistant"
            ? "assistant"
            : "user",
        content: String((m as { content?: unknown })?.content ?? "").slice(0, 4000),
      }))
      .filter((m) => m.content.length > 0);

    if (messages.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Порожнє повідомлення" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("[chat-ai] GOOGLE_GENERATIVE_AI_API_KEY not set");
      return NextResponse.json(
        {
          ok: false,
          error:
            "AI тимчасово недоступний. Зателефонуйте: +38 (066) 804 25 23",
        },
        { status: 500 },
      );
    }

    // Виклик Gemini — без інструментів, простий вільний чат
    const result = await generateText({
      model: google("gemini-2.0-flash-001"),
      system: SOLAR_SYSTEM_PROMPT,
      messages,
    });

    const reply =
      result.text?.trim() ||
      "Вибачте, не зміг сформулювати відповідь. Спробуйте перефразувати або залиште заявку — менеджер зв'яжеться.";

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error("[chat-ai] error:", err);
    return NextResponse.json(
      { ok: false, error: "Внутрішня помилка. Спробуйте ще раз." },
      { status: 500 },
    );
  }
}
