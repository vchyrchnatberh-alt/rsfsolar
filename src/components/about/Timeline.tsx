"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const milestones = [
  {
    year: "2014",
    title: "Заснування ROYALSUNFLOWER",
    desc: "Команда з трьох інженерів запускає перші приватні СЕС у Київській області.",
  },
  {
    year: "2017",
    title: "Перша промислова СЕС",
    desc: "Реалізували 250 кВт станцію для агрокомпанії, отримали ліцензію Держенергонагляду.",
  },
  {
    year: "2019",
    title: "Партнерство з Huawei",
    desc: "Сертифіковані як FusionSolar партнер. Перша СЕС 1.2 МВт з SCADA-моніторингом.",
  },
  {
    year: "2022",
    title: "Резервне живлення",
    desc: "В умовах енергетичної кризи розширили портфоліо — генератори, БЕСС, гібридні системи.",
  },
  {
    year: "2024",
    title: "Вихід у Європу",
    desc: "Перші проекти в Польщі та Німеччині. Сертифікація ISO 9001 і ISO 14001.",
  },
  {
    year: "2026",
    title: "AI-платформа ROYALSUNFLOWER Sense",
    desc: "Почали розробку власної платформи прогнозування генерації на машинному навчанні.",
  },
];

export function Timeline() {
  return (
    <section className="bg-ink-50 py-24">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Історія компанії"
          title="12 років інженерії та якісного сервісу"
          description="Від трьох інженерів до команди з 45 спеціалістів — простежте етапи розвитку ROYALSUNFLOWER."
        />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-[15px] top-0 hidden h-full w-px bg-gradient-to-b from-brand/40 via-brand/15 to-transparent md:left-1/2 md:block"
          />
          <ul className="space-y-10 md:space-y-16">
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`relative grid gap-6 md:grid-cols-2 md:gap-12 ${
                  i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
                }`}
              >
                <div className="md:text-right">
                  <div className="inline-flex flex-col rounded-3xl border border-ink-100 bg-white p-7 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.18)]">
                    <span className="font-display text-4xl font-bold text-brand">
                      {m.year}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-semibold text-ink-900">
                      {m.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-ink-500">
                      {m.desc}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block" />

                <span className="absolute left-[7px] top-2 grid h-4 w-4 place-items-center rounded-full bg-brand md:left-1/2 md:-translate-x-1/2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
