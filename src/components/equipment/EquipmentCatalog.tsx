"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BatteryCharging, Check, Cpu, SunMedium, Zap } from "lucide-react";
import { equipment } from "@/lib/data";

const tabs = [
  { id: "panels", label: "Сонячні панелі", icon: SunMedium },
  { id: "inverters", label: "Інвертори", icon: Cpu },
  { id: "batteries", label: "Акумулятори", icon: BatteryCharging },
  { id: "generators", label: "Генератори", icon: Zap },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function EquipmentCatalog() {
  const [active, setActive] = useState<TabId>("panels");
  const items = equipment[active];

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "border-brand bg-brand text-white shadow-[0_10px_30px_-10px_rgba(7,78,162,0.6)]"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand/40 hover:text-brand"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-10 grid gap-6 lg:grid-cols-3"
        >
          {items.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-ink-700">
                  {item.brand}
                </span>
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-ink-500">
                  {item.type}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink-900">
                  {item.title}
                </h3>

                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-ink-100 pt-5 text-sm">
                  {Object.entries(item.specs).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] uppercase tracking-wider text-ink-500">
                        {k}
                      </dt>
                      <dd className="mt-1 font-medium text-ink-900">{v}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-5 space-y-2 border-t border-ink-100 pt-5">
                  {item.advantages.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2 text-sm text-ink-600"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
