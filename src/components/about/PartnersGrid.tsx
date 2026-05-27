"use client";

import { motion } from "framer-motion";
import { partners } from "@/lib/data";

export function PartnersGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {partners.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.04 }}
          className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 card-hover"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-bold text-ink-900">
              {p.name}
            </span>
            <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
              Tier-1
            </span>
          </div>
          <p className="mt-4 text-sm text-ink-500">{p.description}</p>
          <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-brand to-accent" />
        </motion.div>
      ))}
    </div>
  );
}
