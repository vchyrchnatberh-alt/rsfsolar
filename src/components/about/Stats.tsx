"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/lib/data";

export function Stats() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="rounded-3xl border border-ink-100 bg-white p-7 card-hover"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-6 font-display text-4xl font-bold text-ink-900">
                  <Counter to={s.value} />
                  <span className="text-brand">{s.suffix}</span>
                </p>
                <p className="mt-2 text-sm text-ink-500">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
