"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const locales = [
  { code: "UA", label: "Українська" },
  { code: "EN", label: "English" },
];

export function LanguageSwitcher() {
  const [active, setActive] = useState("UA");
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-2 text-xs font-semibold tracking-wide text-ink-700 transition-colors hover:border-brand hover:text-brand"
      >
        <Globe className="h-3.5 w-3.5" />
        {active}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full pt-2"
          >
            <div className="min-w-[160px] rounded-xl border border-ink-100 bg-white p-1.5 shadow-[0_20px_40px_-12px_rgba(15,23,42,0.18)]">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setActive(l.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    active === l.code
                      ? "bg-brand/5 text-brand"
                      : "text-ink-700 hover:bg-ink-50",
                  )}
                >
                  <span>{l.label}</span>
                  <span className="text-[11px] font-semibold tracking-wider">
                    {l.code}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
