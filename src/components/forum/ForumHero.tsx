"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function ForumHero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=85"
          alt="Сонячна електростанція — Всеукраїнський енергетичний форум"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-ink-950/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 via-ink-950/30 to-ink-950/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(7,78,162,0.5),transparent_55%)]" />

      <div
        aria-hidden
        className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-[#FFD700]/20 blur-3xl lg:h-96 lg:w-96"
      />
      <div
        aria-hidden
        className="absolute -right-20 bottom-1/4 h-48 w-48 rounded-full bg-brand/25 blur-3xl lg:h-72 lg:w-72"
      />

      <Container className="relative z-10 pt-32 pb-20 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
          </span>
          Всеукраїнський енергетичний форум
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="heading mt-8 max-w-4xl text-[clamp(2rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white"
        >
          Енергетична безпека країни.{" "}
          <span className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            Житомирська область
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 lg:text-xl"
        >
          Запрошуємо партнерів на Всеукраїнський енергетичний форум на
          Житомирщині — ключову подію регіону для інвесторів, підприємців та
          представників державного сектору.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.75 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <span className="inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-base font-semibold text-white backdrop-blur-md">
            <CalendarDays className="h-5 w-5 text-amber-400" />
            03 липня 2026
          </span>
          <span className="inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-base font-semibold text-white backdrop-blur-md">
            <MapPin className="h-5 w-5 text-amber-400" />
            Звягель Центр
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFD700] to-amber-500 px-8 py-4 text-base font-bold text-ink-950 shadow-[0_12px_40px_-10px_rgba(255,215,0,0.5)] transition-all hover:shadow-[0_16px_50px_-8px_rgba(255,215,0,0.65)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Зареєструватися
          </a>
          <a
            href="#program"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Програма форуму
          </a>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">
          Дізнатися більше
        </span>
        <motion.span
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.7, 0.15, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-11 w-px origin-top bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
