"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, MessageSquare, Phone, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

type FormState = {
  name: string;
  phone: string;
  email: string;
  objectType: string;
  message: string;
};

const objectTypes = [
  "Приватний дім",
  "Комерційний об'єкт",
  "Промислове підприємство",
  "Аграрне підприємство",
  "Інше",
];

export function ConsultationForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    objectType: objectTypes[0],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Введіть ваше ім'я";
    if (!form.phone.trim()) e.phone = "Введіть номер телефону";
    else if (!/^[\d+\s\-()]{9,}$/.test(form.phone))
      e.phone = "Некоректний номер";
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Некоректний email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 1200));
      console.info("[RSF] consultation request:", form);
      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        objectType: objectTypes[0],
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section relative bg-ink-50">
      <div aria-hidden className="absolute inset-0 bg-grid-light bg-[size:48px_48px] opacity-30" />
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Отримати консультацію"
              title="Розрахуємо вашу енергосистему"
              description="Бажаєте узнати більше — заповніть форму, зв'яжіться із нами по e-mail або по телефону і ми допоможемо вам обрати найкращий варіант для вашого об'єкту!"
            />

            <div className="mt-10 space-y-4">
              {[
                { icon: Phone, label: "Відділ продажу", value: "+38 (066) 804 25 23" },
                { icon: Mail, label: "Корпоративна пошта", value: "Sales@rsf.com.ua" },
                {
                  icon: MessageSquare,
                  label: "Telegram / Viber",
                  value: "@rsfsolar · 09:00–19:00",
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white px-5 py-4"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ink-500">
                      {c.label}
                    </p>
                    <p className="mt-0.5 font-medium text-ink-900">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            onSubmit={onSubmit}
            className="relative rounded-[32px] border border-ink-100 bg-white p-7 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] lg:col-span-7 lg:p-10"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-ink-900">
                  Дякуємо за заявку!
                </h3>
                <p className="mt-3 max-w-md text-ink-500">
                  Наш інженер зв'яжеться з вами протягом робочого дня. Перевірте,
                  будь ласка, телефон та електронну пошту.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-secondary mt-8"
                >
                  Відправити ще одну заявку
                </button>
              </motion.div>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
                      Ваше ім'я *
                    </label>
                    <div className="relative mt-2">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Іван Петренко"
                        className="input-base pl-11"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
                      Телефон *
                    </label>
                    <div className="relative mt-2">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+380 (__) ___ __ __"
                        className="input-base pl-11"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
                      Email
                    </label>
                    <div className="relative mt-2">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        className="input-base pl-11"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
                      Тип об'єкта
                    </label>
                    <select
                      value={form.objectType}
                      onChange={(e) => update("objectType", e.target.value)}
                      className="input-base mt-2 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2364748b%22><path d=%22M5.5 7.5l4.5 4.5 4.5-4.5z%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10"
                    >
                      {objectTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
                    Повідомлення
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Розкажіть про ваш проект — об'єм споживання, тип даху, очікувана потужність..."
                    className="input-base mt-2 resize-none"
                  />
                </div>

                <div className="mt-7 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <p className="text-xs text-ink-500">
                    Натискаючи кнопку, ви погоджуєтеся з{" "}
                    <a href="/privacy" className="text-brand underline-offset-2 hover:underline">
                      політикою конфіденційності
                    </a>
                    .
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary px-8 py-3.5 text-base disabled:opacity-70"
                  >
                    {status === "sending" ? "Відправляємо..." : "Відправити заявку"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {status === "error" && (
                  <p className="mt-4 text-sm text-red-500">
                    Сталася помилка. Спробуйте, будь ласка, ще раз.
                  </p>
                )}
              </>
            )}
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
