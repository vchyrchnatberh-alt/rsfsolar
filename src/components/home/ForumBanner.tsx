"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Users,
  Mic,
  MapPinned,
  Trophy,
  Presentation,
  MessagesSquare,
  Package,
  UsersRound,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfpmjjDlrqG1wjXWbRnDXJ5HCylMnJFwNGQDVemoZ7hO-RtQA/viewform";

const stats = [
  { icon: Users, value: "200+", label: "учасників" },
  { icon: Mic, value: "10+", label: "спікерів" },
  { icon: MapPinned, value: "3+", label: "локацій" },
  { icon: Trophy, value: "№1", label: "подія Житомирщини" },
];

const programItems = [
  { icon: Presentation, title: "Презентації спікерів" },
  { icon: UsersRound, title: "Відкритий нетворкінг" },
  { icon: Package, title: "Safety Експо" },
  { icon: MessagesSquare, title: "Панельні дискусії" },
];

export function ForumBanner() {
  return (
    <section className="bg-white py-10 lg:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[36px] border border-brand/15 bg-brand-800 text-white shadow-[0_30px_80px_-24px_rgba(7,78,162,0.4)]"
        >
          <div aria-hidden className="absolute inset-0">
            <Image
              src="/images/forum/pdf-assets/image_5.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/95 via-brand-800/92 to-brand-600/70" />
          </div>

          <div
            aria-hidden
            className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#FFD700]/25 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#0057B7]/60 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-20"
          />

          <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:p-12">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD700] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FFD700]">
                  Всеукраїнський енергетичний форум · Запрошуємо партнерів
                </span>
              </div>

              <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-white">
                Всеукраїнський
                <br />
                <span className="text-[#FFD700]">енергетичний форум</span>
              </h2>

              <p className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-white/85 lg:text-xl">
                Енергетична безпека країни · Житомирська область
              </p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-white/90">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-[#FFD700]" />
                  03 липня 2026
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#FFD700]" />
                  Звягель Центр, Житомирська обл.
                </span>
              </div>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 lg:text-base">
                Ключова подія регіону для інвесторів, підприємців та представників
                державного сектору, що відкриває нові енергетичні можливості. Місце
                енергетичної сили, для бізнесів, приватних домогосподарств,
                державного сектору та інвесторів — де збираються топові виробники,
                постачальники та інсталятори відновлюваної енергії.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm"
                    >
                      <Icon className="h-5 w-5 text-[#FFD700]" />
                      <p className="mt-2 font-display text-2xl font-extrabold text-white">
                        {s.value}
                      </p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/60">
                        {s.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFD700]">
                  Програма форуму
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {programItems.map((p) => {
                    const Icon = p.icon;
                    return (
                      <span
                        key={p.title}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
                      >
                        <Icon className="h-3.5 w-3.5 text-[#FFD700]" />
                        {p.title}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFD700] to-amber-400 px-7 py-3.5 text-sm font-bold text-ink-950 shadow-[0_12px_36px_-10px_rgba(255,215,0,0.55)] transition-transform hover:scale-[1.03] active:scale-[0.98] sm:text-base"
                >
                  Реєстраційна форма
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/forum"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:text-base"
                >
                  Дізнатися більше
                </Link>
              </div>
            </div>

            {/* Desktop: 3 photos of equal size, evenly spaced (170px vertical gaps, zigzag horizontal) */}
            <div className="relative order-first hidden lg:order-none lg:block lg:min-h-[580px]">
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="absolute right-0 top-0 h-52 w-72 overflow-hidden rounded-2xl border-4 border-white/15 shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1600&q=85"
                  alt="Презентації спікерів"
                  fill
                  sizes="288px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 to-transparent p-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <Presentation className="h-3 w-3 text-[#FFD700]" />
                    Спікери
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute left-0 top-[170px] h-52 w-72 overflow-hidden rounded-2xl border-4 border-white/15 shadow-2xl"
              >
                <Image
                  src="/images/forum/pdf-assets/image_3.jpg"
                  alt="Нетворкінг"
                  fill
                  sizes="288px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 to-transparent p-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <UsersRound className="h-3 w-3 text-[#FFD700]" />
                    Нетворкінг
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute right-0 top-[340px] h-52 w-72 overflow-hidden rounded-2xl border-4 border-white/15 shadow-2xl"
              >
                <Image
                  src="/images/forum/pdf-assets/image_4.jpg"
                  alt="Панельні дискусії"
                  fill
                  sizes="288px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 to-transparent p-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <MessagesSquare className="h-3 w-3 text-[#FFD700]" />
                    Панельні дискусії
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Mobile / Tablet: 3 photos in an equal-gap grid */}
            <div className="order-first grid grid-cols-2 gap-3 lg:hidden">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl border-4 border-white/15 shadow-2xl sm:col-span-1 sm:aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1600&q=85"
                  alt="Презентації спікерів"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 to-transparent p-2.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <Presentation className="h-3 w-3 text-[#FFD700]" />
                    Спікери
                  </span>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white/15 shadow-2xl">
                <Image
                  src="/images/forum/pdf-assets/image_3.jpg"
                  alt="Нетворкінг"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 to-transparent p-2.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <UsersRound className="h-3 w-3 text-[#FFD700]" />
                    Нетворкінг
                  </span>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white/15 shadow-2xl">
                <Image
                  src="/images/forum/pdf-assets/image_4.jpg"
                  alt="Панельні дискусії"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 to-transparent p-2.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <MessagesSquare className="h-3 w-3 text-[#FFD700]" />
                    Панельні
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
