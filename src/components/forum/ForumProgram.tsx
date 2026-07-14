"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const programItems = [
  {
    title: "Презентації спікерів",
    description:
      "Провідні експерти у сфері відновлюваної енергетики, презентують свою експертизу на реальних кейсах.",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1600&q=85",
    reverse: false,
  },
  {
    title: "Відкритий нетворкінг",
    description:
      "Окремий простір для приватних переговорів, обговорення партнерств та укладання угод.",
    image: "/images/forum/pdf-assets/image_3.jpg",
    reverse: true,
  },
  {
    title: "Safety Експо",
    description:
      "Виставкова зона, де бренди презентують новинки та можливості для сфери відновлюваної енергетики.",
    image: "/images/forum/pdf-assets/image_1.jpg",
    reverse: false,
  },
  {
    title: "Панельні дискусії",
    description:
      "Прикладні воркшопи та розбір реальних кейсів, відповіді на актуальні питання за участі спікерів.",
    image: "/images/forum/pdf-assets/image_4.jpg",
    reverse: true,
  },
];

export function ForumProgram() {
  return (
    <section id="program" className="relative overflow-hidden bg-white py-20 lg:py-28 scroll-mt-24">
      {/* Decorative circles */}
      <div
        aria-hidden
        className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-brand/5 lg:h-[420px] lg:w-[420px]"
      />
      <div
        aria-hidden
        className="absolute -left-16 bottom-32 h-48 w-48 rounded-full bg-[#FFD700]/8 lg:h-64 lg:w-64"
      />

      <Container className="relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-brand-700">
            <span className="size-1.5 rounded-full bg-brand" />
            Що на вас чекає
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="heading mt-5 text-center text-display-md text-ink-900 text-balance"
        >
          Програма форуму
        </motion.h2>

        {/* Program items */}
        <div className="mt-16 space-y-8">
          {programItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className={`group overflow-hidden rounded-[28px] border border-ink-100 bg-white transition-all duration-500 hover:shadow-[0_24px_60px_-20px_rgba(7,78,162,0.12)] ${
                item.reverse ? "" : ""
              }`}
            >
              <div
                className={`grid items-center gap-0 lg:grid-cols-2 ${
                  item.reverse ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-950/5" />
                </div>

                {/* Content */}
                <div className={`p-8 lg:p-12 ${item.reverse ? "[direction:ltr]" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-1 rounded-full bg-gradient-to-b from-brand to-brand-400" />
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink-900 lg:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-ink-600 lg:text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
