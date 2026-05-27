"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const team = [
  {
    name: "Олексій Романенко",
    role: "Засновник, CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Ірина Шевчук",
    role: "Технічний директор",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Дмитро Коваль",
    role: "Керівник інженерного відділу",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Марія Петренко",
    role: "Керівник відділу продажу",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
];

export function Team() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Команда"
          title="Інженери, які роблять складне простим"
          description="45 спеціалістів — сертифіковані проектувальники, електромонтажники, інженери-консультанти та сервісні бригади."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white card-hover"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-900 opacity-0 transition-opacity group-hover:opacity-100">
                  <Linkedin className="h-4 w-4" />
                </span>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-xs text-white/75">{p.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
