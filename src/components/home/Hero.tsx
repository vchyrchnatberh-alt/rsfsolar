"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=85"
          alt="Сонячна електростанція Royal Sun Flower"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* overlays */}
      <div className="absolute inset-0 bg-ink-950/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/35 to-ink-950/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(7,78,162,0.45),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pt-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md"
        >
          Українська компанія · Royal Sun Flower
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="heading mt-7 text-balance text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.07] tracking-tight text-white"
        >
          Альтернативна енергетика —{" "}
          <span className="bg-gradient-to-r from-brand-300 via-sky-300 to-accent bg-clip-text text-transparent">
            перший крок
          </span>{" "}
          у фантастичне майбутнє.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/75"
        >
          Royal Sun Flower — спеціалісти у сфері альтернативної енергетики та
          систем зберігання. Забезпечимо безперебійну роботу вашого
          підприємства!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/kontakty"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white transition-all hover:bg-brand-800 hover:shadow-[0_16px_50px_-12px_rgba(7,78,162,0.8)] active:scale-[0.98]"
          >
            Отримати консультацію
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/proekty"
            className="inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-4 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
              <Play className="h-3.5 w-3.5 fill-current" />
            </span>
            Наші проєкти
          </Link>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">
          Гортати
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
