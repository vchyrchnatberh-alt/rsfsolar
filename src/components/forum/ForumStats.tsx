"use client";

import { motion } from "framer-motion";
import { Users, Mic2, MapPinned, Trophy } from "lucide-react";
import { Container } from "@/components/ui/Container";

const stats = [
  {
    icon: Users,
    value: "200+",
    label: "Учасників",
    description:
      "Інвестори, підприємці, представники державного сектору, дилери тощо.",
  },
  {
    icon: Mic2,
    value: "10+",
    label: "Спікерів",
    description:
      "Провідні експерти у сфері відновлюваної енергетики, представники банків.",
  },
  {
    icon: MapPinned,
    value: "3+",
    label: "Локацій",
    description: "Активного нетворкінгу, рефлексій та навчання.",
  },
  {
    icon: Trophy,
    value: "№1",
    label: "Подія Житомирщини",
    description: "Для посилення енергетичної безпеки країни.",
  },
];

export function ForumStats() {
  return (
    <section className="relative overflow-hidden bg-ink-50 py-20 lg:py-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-light bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <Container className="relative">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-[24px] border border-ink-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-16px_rgba(7,78,162,0.12)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 text-brand transition-colors group-hover:from-brand group-hover:to-brand-600 group-hover:text-white">
                <stat.icon className="h-5 w-5" />
              </span>
              <p className="mt-5 font-display text-3xl font-bold text-brand lg:text-4xl">
                {stat.value}
              </p>
              <p className="font-display text-sm font-semibold uppercase tracking-wider text-ink-900">
                {stat.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
