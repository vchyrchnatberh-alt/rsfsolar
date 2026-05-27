"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Maximize2, X } from "lucide-react";
import { certificates } from "@/lib/data";

export function CertificatesGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) => (
          <motion.button
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onClick={() => setActive(i)}
            className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white text-left card-hover"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink-900 opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/20 text-brand-300 backdrop-blur">
                    <Award className="h-4 w-4" />
                  </span>
                  <span className="text-xs text-white/70">{c.year} · {c.issuer}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{c.title}</h3>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/85 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[28px] bg-white"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Закрити"
                className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink-900 shadow"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-[3/4] md:aspect-[4/3]">
                <Image
                  src={certificates[active].image}
                  alt={certificates[active].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="border-t border-ink-100 p-7">
                <p className="text-xs uppercase tracking-wider text-ink-500">
                  {certificates[active].issuer} · {certificates[active].year}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink-900">
                  {certificates[active].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
