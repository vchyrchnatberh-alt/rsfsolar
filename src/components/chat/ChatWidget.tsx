"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ComponentType,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  ArrowLeft,
  Send,
  CheckCircle2,
  User,
  Phone,
  Mail,
  Sparkles,
  Bot,
  ClipboardList,
} from "lucide-react";

type View = "chat" | "form" | "success";

type ChatMessage = { role: "user" | "assistant"; content: string };

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Вітаю! 👋 Я AI-асистент Royal Sun Flower. Питайте про сонячні станції — ціни, монтаж, гарантії, обладнання. Якщо готові залишити контакти для менеджера — тисніть кнопку внизу.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("chat");

  // ── AI-чат ──
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ── Форма заявки ──
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    website: "", // honeypot
  });
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Автоскрол при нових повідомленнях
  useEffect(() => {
    if (view === "chat" && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking, view]);

  const openWidget = () => {
    setOpen(true);
    setView("chat");
    setChatError(null);
  };

  const closeWidget = () => {
    setOpen(false);
    setTimeout(() => {
      setView("chat");
      // Історію лишаємо — при повторному відкритті продовжить розмову
      setChatError(null);
      setFormError(null);
    }, 300);
  };

  // ── AI: надіслати повідомлення ──
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || thinking) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(newMessages);
    setInput("");
    setThinking(true);
    setChatError(null);

    try {
      const res = await fetch("/api/chat-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content:
              data.error ??
              "Вибачте, сталася помилка. Спробуйте ще раз або залиште заявку.",
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Немає зв'язку. Перевірте інтернет або зателефонуйте: +38 (066) 804 25 23",
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  // ── Форма: відправити заявку ──
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!form.name.trim()) {
      setFormError("Введіть ваше ім'я");
      return;
    }
    if (!form.phone.trim() || !/^[\d+\s\-()]{9,}$/.test(form.phone)) {
      setFormError("Введіть коректний номер телефону");
      return;
    }
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setFormError("Некоректний email");
      return;
    }

    setSending(true);
    try {
      // Формуємо історію переписки з AI для контексту менеджера
      const chatHistory = [];
      for (let i = 0; i < messages.length; i += 2) {
        const q = messages[i];
        const a = messages[i + 1];
        if (
          q?.role === "user" &&
          a?.role === "assistant" &&
          q.content &&
          a.content
        ) {
          chatHistory.push({ question: q.content, answer: a.content });
        }
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          question: "", // порожнє — API само підставить дефолт
          history: chatHistory.slice(-6),
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setView("success");
        setForm({ name: "", phone: "", email: "", website: "" });
      } else {
        setFormError(data.error ?? "Не вдалось надіслати. Спробуйте ще раз.");
      }
    } catch {
      setFormError("Немає зв'язку. Спробуйте ще раз.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* ── Плаваюча кнопка ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            onClick={openWidget}
            aria-label="Відкрити чат з AI-асистентом"
            className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-[0_12px_36px_-8px_rgba(7,78,162,0.5)] transition-shadow hover:shadow-[0_16px_44px_-8px_rgba(7,78,162,0.7)] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-brand"
              animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <MessageCircle
              className="relative h-6 w-6 sm:h-7 sm:w-7"
              strokeWidth={2}
            />
            <span
              aria-hidden
              className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#FFD700] text-[11px] font-bold text-ink-950 shadow-md"
            >
              AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Вікно чата ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-5 z-50 flex h-[calc(100vh-2.5rem)] max-h-[640px] w-[calc(100vw-2.5rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-[0_30px_80px_-20px_rgba(9,18,36,0.45)] sm:bottom-6 sm:right-6"
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-4 text-white">
              <div
                aria-hidden
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FFD700]/20 blur-2xl"
              />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
                    <Bot className="h-5 w-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-brand-600 bg-green-400" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold">
                      RSF AI Асистент
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-white/85">
                      <Sparkles className="h-3 w-3" />
                      На базі Google Gemini
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeWidget}
                  aria-label="Закрити чат"
                  className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <AnimatePresence mode="wait">
              {view === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-1 flex-col overflow-hidden"
                >
                  {/* Повідомлення */}
                  <div
                    ref={scrollRef}
                    className="flex-1 space-y-3 overflow-y-auto p-4"
                  >
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={
                          msg.role === "user"
                            ? "flex justify-end"
                            : "flex items-start gap-2"
                        }
                      >
                        {msg.role === "assistant" && (
                          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                            <Bot className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <div
                          className={
                            msg.role === "user"
                              ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-md bg-brand px-3 py-2 text-sm text-white"
                              : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-md bg-ink-50 px-3 py-2 text-sm leading-relaxed text-ink-800"
                          }
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}

                    {thinking && (
                      <div className="flex items-start gap-2">
                        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                          <Bot className="h-3.5 w-3.5" />
                        </div>
                        <div className="rounded-2xl rounded-tl-md bg-ink-50 px-3 py-2.5">
                          <span className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="h-1.5 w-1.5 rounded-full bg-brand/50"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </span>
                        </div>
                      </div>
                    )}

                    {chatError && (
                      <div className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
                        {chatError}
                      </div>
                    )}
                  </div>

                  {/* Інпут + кнопка заявки */}
                  <div className="border-t border-ink-100 bg-white p-3">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        void sendMessage();
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Ваше питання..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={thinking}
                        className="flex-1 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm outline-none placeholder:text-ink-400 focus:border-brand focus:ring-2 focus:ring-brand/15 disabled:opacity-50"
                        autoFocus
                      />
                      <button
                        type="submit"
                        disabled={thinking || !input.trim()}
                        aria-label="Надіслати"
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-800 disabled:opacity-50"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </form>

                    <button
                      onClick={() => {
                        setView("form");
                        setFormError(null);
                      }}
                      className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand/25 bg-brand/5 px-4 py-2.5 text-sm font-semibold text-brand transition-all hover:border-brand hover:bg-brand/10"
                    >
                      <ClipboardList className="h-4 w-4" />
                      Залишити заявку на сервіси
                    </button>

                    <p className="mt-2 text-center text-[10px] text-ink-400">
                      AI може помилятися. Для точної ціни — залиште заявку.
                    </p>
                  </div>
                </motion.div>
              )}

              {view === "form" && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={submitForm}
                  className="flex flex-1 flex-col overflow-y-auto p-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setView("chat");
                      setFormError(null);
                    }}
                    className="inline-flex items-center gap-1 self-start text-xs font-semibold text-ink-500 transition-colors hover:text-brand"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Назад до чату
                  </button>

                  <div className="mt-4">
                    <h3 className="font-display text-lg font-bold text-ink-900">
                      Залиште контакти
                    </h3>
                    <p className="mt-1 text-sm text-ink-600">
                      Наш менеджер зв'яжеться з вами протягом робочого дня.
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <FormInput
                      icon={User}
                      placeholder="Ваше ім'я *"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <FormInput
                      icon={Phone}
                      type="tel"
                      placeholder="+380 XX XXX XX XX *"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                    />
                    <FormInput
                      icon={Mail}
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form.website}
                      onChange={(e) =>
                        setForm({ ...form, website: e.target.value })
                      }
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        width: "1px",
                        height: "1px",
                        opacity: 0,
                        pointerEvents: "none",
                      }}
                    />

                    {formError && (
                      <div className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                        {formError}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4">
                    <button
                      type="submit"
                      disabled={sending}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-800 hover:shadow-[0_10px_30px_-10px_rgba(7,78,162,0.6)] disabled:opacity-60"
                    >
                      {sending ? (
                        <>
                          <motion.span
                            className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          Надсилаємо...
                        </>
                      ) : (
                        <>
                          Надіслати заявку
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <p className="mt-2 text-center text-[10px] text-ink-400">
                      Натискаючи «Надіслати», ви погоджуєтесь з обробкою
                      персональних даних.
                    </p>
                  </div>
                </motion.form>
              )}

              {view === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-1 flex-col items-center justify-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600"
                  >
                    <CheckCircle2 className="h-10 w-10" strokeWidth={1.8} />
                  </motion.div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                    Дякуємо!
                  </h3>
                  <p className="mt-2 max-w-[260px] text-sm text-ink-600">
                    Ваша заявка отримана. Менеджер зв'яжеться з вами протягом
                    робочого дня.
                  </p>
                  <button
                    onClick={() => setView("chat")}
                    className="mt-6 rounded-full border border-ink-200 bg-white px-5 py-2 text-xs font-semibold text-ink-700 transition-colors hover:border-brand hover:text-brand"
                  >
                    Повернутись до чату
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="border-t border-ink-100 bg-ink-50/50 px-4 py-2 text-center text-[10px] text-ink-500">
              Royal Sun Flower · Сонячні станції під ключ
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FormInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: ComponentType<{ className?: string }>;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-ink-200 bg-white px-3.5 py-2.5 pl-10 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand focus:ring-2 focus:ring-brand/15"
      />
    </div>
  );
}
