"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Handshake } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function CooperationCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[36px] border border-brand/15 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-10 text-white lg:p-16"
        >
          <div aria-hidden className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/30 blur-3xl" />
          <div aria-hidden className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-30" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur">
                <Handshake className="h-3.5 w-3.5" />
                Партнерство та підряд
              </span>
              <h2 className="heading mt-6 text-display-md text-white text-balance">
                Будуйте альтернативну енергетику разом з ROYALSUNFLOWER
              </h2>
              <p className="mt-5 max-w-xl text-white/85">
                Запрошуємо до співпраці девелоперів, проектні бюро,
                субпідрядників, дистриб'юторів обладнання та інвесторів.
                Створюємо взаємовигідні партнерські умови.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <Link
                href="/kontakty"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 transition-transform hover:scale-[1.02]"
              >
                Стати партнером
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pro-nas"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Дізнатися про нас
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
