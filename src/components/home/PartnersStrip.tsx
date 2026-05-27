"use client";

import { Container } from "@/components/ui/Container";
import { partners } from "@/lib/data";

export function PartnersStrip() {
  const row = [...partners, ...partners];

  return (
    <section className="relative border-y border-ink-100 bg-white py-16">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-brand" />
            Працюємо з лідерами індустрії
          </span>
          <h3 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
            Партнери-виробники
          </h3>
        </div>
      </Container>

      <div className="mt-12 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-16 px-8">
          {row.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="group flex flex-col items-center"
            >
              <span className="font-display text-3xl font-bold tracking-tight text-ink-300 transition-colors duration-300 group-hover:text-ink-900 sm:text-4xl">
                {p.name}
              </span>
              <span className="mt-1 hidden text-[10px] uppercase tracking-[0.18em] text-ink-400 sm:block">
                {p.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
