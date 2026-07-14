"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function ForumCTA() {
  return (
    <section id="register" className="bg-white py-16 lg:py-24 scroll-mt-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[36px] border border-brand/15 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-10 text-white lg:p-16"
        >
          <div
            aria-hidden
            className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#FFD700]/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-30"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-lg font-bold uppercase tracking-wider text-[#FFD700]"
              >
                Чекаємо саме тебе
              </motion.p>
              <h2 className="heading mt-4 text-display-md text-white text-balance">
                Зареєструйтесь на форум
              </h2>
              <p className="mt-5 max-w-xl text-white/80">
                Натисніть кнопку нижче, щоб забронювати своє місце на І Всеукраїнському
                енергетичному форумі — форма реєстрації відкриється в новому вікні.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#FFD700]" />
                  03 липня 2026
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#FFD700]" />
                  Звягель Центр, Житомирська обл.
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 lg:items-end">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfpmjjDlrqG1wjXWbRnDXJ5HCylMnJFwNGQDVemoZ7hO-RtQA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFD700] to-amber-500 px-8 py-4 text-base font-bold text-ink-950 shadow-[0_12px_40px_-10px_rgba(255,215,0,0.5)] transition-all hover:shadow-[0_16px_50px_-8px_rgba(255,215,0,0.65)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Зареєструватися
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/kontakty"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Зв&apos;язатися з організаторами
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
