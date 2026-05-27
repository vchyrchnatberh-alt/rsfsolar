"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { services } from "@/lib/data";

export function ServicesAccordion() {
  const [open, setOpen] = useState<string>(services[0].slug);

  return (
    <div className="space-y-3">
      {services.map((s) => {
        const Icon = s.icon;
        const isOpen = open === s.slug;
        return (
          <div
            key={s.slug}
            className="overflow-hidden rounded-3xl border border-ink-100 bg-white transition-colors"
          >
            <button
              onClick={() => setOpen(isOpen ? "" : s.slug)}
              className="flex w-full items-center gap-5 p-6 text-left lg:p-8"
            >
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-colors ${
                  isOpen ? "bg-brand text-white" : "bg-brand/10 text-brand"
                }`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-ink-500">{s.short}</p>
              </div>
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-200 transition-all ${
                  isOpen ? "rotate-180 border-brand text-brand" : "text-ink-500"
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-ink-100 px-6 py-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                      <p className="text-ink-600 leading-relaxed">{s.description}</p>
                      <ul className="space-y-3">
                        {s.benefits.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 text-sm text-ink-700"
                          >
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                              <Check className="h-3 w-3" />
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/posluhy/${s.slug}`}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-700"
                    >
                      Перейти на сторінку послуги
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
