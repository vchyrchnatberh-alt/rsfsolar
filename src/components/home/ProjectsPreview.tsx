"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/lib/data";

const flagMap: Record<string, string> = {
  ua: "🇺🇦",
  pl: "🇵🇱",
  de: "🇩🇪",
};

export function ProjectsPreview() {
  return (
    <section className="section relative bg-white">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Реалізовані проекти"
            title="Більше 240 СЕС, які щодня генерують енергію"
            description="Комерційні, аграрні та приватні об'єкти від 30 кВт до 2.5 МВт. Кожен — спроектований і змонтований командою ROYALSUNFLOWER."
          />
          <Link
            href="/proekty"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-700"
          >
            Дивитись всі проекти
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-ink-700 shadow-sm">
                  <span>{flagMap[p.flag] ?? "🌍"}</span>
                  {p.type}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/85">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {p.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5 text-brand-300" />
                      {p.capacity}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
