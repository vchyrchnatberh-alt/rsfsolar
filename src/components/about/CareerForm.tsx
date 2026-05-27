"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Upload } from "lucide-react";

const vacancies = [
  "Інженер-проектувальник СЕС",
  "Електромонтажник 4 розряд",
  "Менеджер з продажу",
  "Сервісний інженер",
  "Інша посада",
];

export function CareerForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      onSubmit={onSubmit}
      className="rounded-[32px] border border-ink-100 bg-white p-7 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] lg:p-10"
    >
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h3 className="mt-6 font-display text-2xl font-semibold text-ink-900">
            Дякуємо, що приєднуєтеся!
          </h3>
          <p className="mt-3 max-w-md text-ink-500">
            Ми отримали ваше резюме. HR-команда зв'яжеться з вами протягом
            тижня, якщо ваш досвід підходить під одну з наших вакансій.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
                Ім'я та прізвище *
              </label>
              <input required className="input-base mt-2" placeholder="Ваше ім'я" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
                Телефон *
              </label>
              <input
                required
                type="tel"
                className="input-base mt-2"
                placeholder="+380"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
                Email
              </label>
              <input type="email" className="input-base mt-2" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
                Вакансія
              </label>
              <select className="input-base mt-2 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2364748b%22><path d=%22M5.5 7.5l4.5 4.5 4.5-4.5z%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10">
                {vacancies.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
              Коротко про себе
            </label>
            <textarea
              rows={4}
              className="input-base mt-2 resize-none"
              placeholder="Кілька слів про досвід та мотивацію"
            />
          </div>

          <div className="mt-5">
            <label className="text-xs font-medium uppercase tracking-wider text-ink-500">
              Резюме (PDF / DOCX)
            </label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-2 flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50 px-5 py-4 text-left text-sm text-ink-600 transition-colors hover:border-brand hover:bg-brand/5"
            >
              <span className="flex items-center gap-3">
                <Upload className="h-4 w-4 text-brand" />
                {fileName ?? "Завантажте файл або перетягніть сюди"}
              </span>
              <span className="text-xs text-ink-400">PDF · DOCX · до 5 MB</span>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) =>
                  setFileName(e.target.files?.[0]?.name ?? null)
                }
              />
            </button>
          </div>

          <div className="mt-7 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-xs text-ink-500">
              Натискаючи кнопку, ви погоджуєтеся з обробкою персональних даних
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary px-8 py-3.5 text-base disabled:opacity-70"
            >
              {status === "sending" ? "Відправляємо..." : "Надіслати резюме"}
            </button>
          </div>
        </>
      )}
    </motion.form>
  );
}
