"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { designProcess } from "@/lib/data";

export function DesignProcess() {
  return (
    <section className="section relative bg-white">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Проєктування енергетичних систем"
          title="Повний цикл проєктних робіт"
          description="Компанія Royal Sun Flower займається повним циклом проєктних робіт, від аналізу вимог та дослідження комерційних об'єктів, до розрахунків необхідної потужності та створення і затвердження проєктно-кошторисної документації."
        />

        <div className="relative mt-20">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent lg:block"
          />
          <div className="grid gap-10 lg:grid-cols-4">
            {designProcess.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group relative"
                >
                  <div className="relative grid h-24 w-24 place-items-center rounded-3xl border border-ink-100 bg-white shadow-[0_20px_40px_-20px_rgba(15,23,42,0.18)] transition-all group-hover:-translate-y-1 group-hover:border-brand/40 group-hover:shadow-[0_30px_60px_-20px_rgba(7,78,162,0.3)]">
                    <span className="absolute -top-3 right-3 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
                      {p.step}
                    </span>
                    <Icon className="h-9 w-9 text-brand" />
                  </div>
                  <h3 className="mt-7 font-display text-xl font-semibold text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {p.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
