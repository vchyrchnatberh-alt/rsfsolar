"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";

const stats = [
  {
    value: "200+",
    label: "УЧАСНИКІВ",
    desc: "Інвестори, підприємці, представники державного сектору, дилери тощо.",
  },
  {
    value: "10+",
    label: "СПІКЕРІВ",
    desc: "Провідні експерти у сфері відновлюваної енергетики, представники банків.",
  },
  {
    value: "3+",
    label: "ЛОКАЦІЙ",
    desc: "Активного нетворкінгу, рефлексій та навчання.",
  },
  {
    value: "№1",
    label: "ПОДІЯ ЖИТОМИРЩИНИ",
    desc: "Для посилення енергетичної безпеки країни.",
  },
];

const program = [
  {
    title: "ПРЕЗЕНТАЦІЇ\nСПІКЕРІВ",
    desc: "Провідні експерти у сфері відновлюваної енергетики, презентують свою експертизу на реальних кейсах.",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1600&q=85",
    reverse: false,
  },
  {
    title: "ВІДКРИТИЙ\nНЕТВОРКІНГ",
    desc: "Окремий простір для приватних переговорів, обговорення партнерств та укладання угод.",
    image: "/images/forum/pdf-assets/image_3.jpg",
    reverse: true,
  },
  {
    title: "SAFETY\nЕКСПО",
    desc: "Виставкова зона, де бренди презентують новинки та можливості для сфери відновлюваної енергетики.",
    image: "/images/forum/pdf-assets/image_1.jpg",
    reverse: false,
  },
  {
    title: "ПАНЕЛЬНІ\nДИСКУСІЇ",
    desc: "Прикладні воркшопи та розбір реальних кейсів, відповіді на актуальні питання за участі спікерів.",
    image: "/images/forum/pdf-assets/image_4.jpg",
    reverse: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
};

export function ForumInvitation() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full overflow-hidden"
      >
        <div className="absolute -left-2 top-0 h-[600px] w-2 bg-brand lg:w-3" />
        <div className="absolute -left-16 top-[120px] h-40 w-40 rounded-full border-[6px] border-brand/20 lg:-left-10 lg:h-56 lg:w-56" />
        <div className="absolute -left-20 top-[200px] h-32 w-32 rounded-full bg-[#FFD700]/30 lg:-left-12 lg:h-44 lg:w-44" />
        <div className="absolute -left-14 top-[55%] h-48 w-48 rounded-full bg-brand/10 lg:-left-6 lg:h-72 lg:w-72" />
        <div className="absolute -left-10 top-[60%] h-36 w-36 rounded-full bg-[#FFD700]/20 lg:-left-4 lg:h-52 lg:w-52" />
        <div className="absolute -left-16 bottom-[15%] h-40 w-40 rounded-full border-[6px] border-brand/15 lg:-left-8 lg:h-56 lg:w-56" />
        <div className="absolute -left-20 bottom-[10%] h-28 w-28 rounded-full bg-[#FFD700]/25 lg:-left-14 lg:h-40 lg:w-40" />
        <div className="absolute -left-2 bottom-0 h-[400px] w-2 bg-brand lg:w-3" />
      </div>

      <section className="relative pt-32 lg:pt-40">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-start justify-between"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-brand lg:text-base">
              Всеукраїнський
              <br />
              енергетичний
              <br />
              форум
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-10"
          >
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-brand">
              Запрошуємо
            </h1>
            <p className="font-display text-[clamp(1.8rem,5vw,4rem)] font-extrabold uppercase leading-[1] tracking-tight text-ink-400">
              Партнерів
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex items-center gap-3 text-base font-semibold text-ink-700 lg:text-lg"
          >
            <span>03 липня 2026</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="text-brand underline decoration-brand/30 underline-offset-4">
              Звягель Центр
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative mt-8 aspect-[16/7] overflow-hidden rounded-[28px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=85"
              alt="Сонячна електростанція"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/20 to-transparent" />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="heading mt-10 max-w-3xl text-[clamp(1.6rem,4vw,2.8rem)] font-bold uppercase leading-[1.1] tracking-tight text-ink-900"
          >
            Енергетична безпека країни.
            <br />
            Житомирська область
          </motion.h2>
        </Container>
      </section>

      <section className="relative py-16 lg:py-24">
        <Container className="relative z-10">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
            className="text-sm font-bold uppercase tracking-[0.2em] text-brand"
          >
            Про подію
          </motion.p>

          <div className="mt-6 max-w-2xl space-y-5">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={1}
              className="text-lg leading-relaxed text-ink-600"
            >
              Ключова подія регіону для інвесторів, підприємців та представників
              державного сектору, що відкриває нові енергетичні можливості.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={2}
              className="text-lg leading-relaxed text-ink-600"
            >
              Місце енергетичної сили, для бізнесів, приватних домогосподарств,
              державного сектору та інвесторів. Подія на якій збираються топові
              виробники, постачальники та інсталятори джерел відновлюваної
              енергії.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={3}
              className="text-base italic text-brand-700"
            >
              Всеукраїнський енергетичний форум на Житомирщині.
            </motion.p>
          </div>

          <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-ink-100 bg-ink-50/60 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(7,78,162,0.1)]"
              >
                <p className="font-display text-3xl font-extrabold text-brand">
                  {s.value}
                </p>
                <p className="font-display text-sm font-bold uppercase tracking-wider text-ink-900">
                  {s.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-16 lg:py-24">
        <Container className="relative z-10">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
            className="text-sm font-bold uppercase tracking-[0.2em] text-brand"
          >
            Програма форуму
          </motion.p>

          <div className="mt-10 space-y-6">
            {program.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
                className="group overflow-hidden rounded-[24px] border border-ink-100 bg-white transition-all duration-500 hover:shadow-[0_20px_50px_-16px_rgba(7,78,162,0.1)]"
              >
                <div
                  className={`grid items-center lg:grid-cols-2 ${
                    item.reverse ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[4/3]">
                    <Image
                      src={item.image}
                      alt={item.title.replace("\n", " ")}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div
                    className={`p-8 lg:p-10 ${item.reverse ? "[direction:ltr]" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-brand to-brand-400" />
                      <h3 className="font-display text-2xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink-900 lg:text-3xl whitespace-pre-line">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-ink-500 lg:text-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-16 lg:py-24">
        <Container className="relative z-10">
          <motion.a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfpmjjDlrqG1wjXWbRnDXJ5HCylMnJFwNGQDVemoZ7hO-RtQA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-[32px] border border-brand/15 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-10 text-center text-white transition-all duration-500 hover:shadow-[0_30px_80px_-24px_rgba(7,78,162,0.4)] hover:brightness-110 lg:p-14"
          >
            <div
              aria-hidden
              className="absolute -right-32 -top-32 h-[360px] w-[360px] rounded-full bg-[#FFD700]/15 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -left-20 bottom-0 h-[280px] w-[280px] rounded-full bg-accent/20 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-25"
            />

            <div className="relative flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD700] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FFD700]">
                Google Form · відкриється в новій вкладці
              </span>
            </div>

            <h2 className="relative font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
              Реєстраційна <span className="text-[#FFD700]">форма</span>
              <ExternalLink className="ml-3 inline-block h-8 w-8 opacity-70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 lg:h-10 lg:w-10" />
            </h2>

            <p className="relative max-w-xl text-white/80">
              Натисніть, щоб перейти до форми реєстрації та забронювати своє місце
              на Всеукраїнському енергетичному форумі.
            </p>
          </motion.a>
        </Container>
      </section>

      {/* Bottom spacer */}
      <div className="h-10" />
    </div>
  );
}
