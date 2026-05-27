"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

export function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const first = track.firstElementChild as HTMLElement | null;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(track).columnGap || "24") || 24;
      setStep(first.offsetWidth + gap);
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxIndex = Math.max(0, services.length - perView);
  const clamped = Math.min(index, maxIndex);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  return (
    <section className="section relative overflow-hidden bg-ink-50">
      <div aria-hidden className="absolute inset-0 bg-grid-light bg-[size:48px_48px] opacity-40" />
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Типи робіт"
            title="Послуги повного циклу для альтернативної енергетики"
            description="Від проектування СЕС до сервісного обслуговування — закриваємо всі потреби бізнесу та приватних замовників."
          />
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Попередня картка"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white text-ink-900 transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Наступна картка"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white text-ink-900 transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className="mt-14 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            ref={trackRef}
            animate={{ x: -clamped * step }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-6"
          >
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/posluhy/${s.slug}`}
                  className="group relative w-[85%] shrink-0 overflow-hidden rounded-[28px] border border-ink-100 bg-white card-hover sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 31vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-2xl bg-white/90 text-brand backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-ink-900">
                      {s.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-500">
                      {s.short}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Детальніше
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Слайд ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === clamped ? "w-8 bg-brand" : "w-2 bg-ink-300 hover:bg-ink-400"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
