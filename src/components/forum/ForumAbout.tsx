"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function ForumAbout() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div
        aria-hidden
        className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-brand/5 lg:h-[500px] lg:w-[500px]"
      />
      <div
        aria-hidden
        className="absolute -left-20 top-40 h-48 w-48 rounded-full bg-[#FFD700]/8 lg:h-72 lg:w-72"
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-brand-700"
        >
          <span className="size-1.5 rounded-full bg-brand" />
          Про подію
        </motion.div>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <h2 className="heading text-display-md text-ink-900 text-balance">
              Всеукраїнський енергетичний форум на Житомирщині
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-lg leading-relaxed text-ink-600">
              Ключова подія регіону для інвесторів, підприємців та представників
              державного сектору, що відкриває нові енергетичні можливості.
            </p>
            <p className="text-lg leading-relaxed text-ink-600">
              Місце енергетичної сили, для бізнесів, приватних домогосподарств,
              державного сектору та інвесторів. Подія на якій збираються топові
              виробники, постачальники та інсталятори джерел відновлюваної
              енергії.
            </p>
            <div className="rounded-2xl border border-brand/10 bg-brand/5 p-5">
              <p className="text-base font-medium text-brand-700">
                ROYALSUNFLOWER — офіційний партнер та учасник форуму. Ми
                презентуємо новітні рішення у сфері сонячної енергетики та BESS.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
