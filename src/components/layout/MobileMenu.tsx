"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { navigation } from "@/lib/data";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="absolute right-0 top-0 flex h-full w-[min(420px,90vw)] flex-col overflow-y-auto bg-white"
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Закрити меню"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 text-ink-900 hover:border-brand hover:text-brand"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6">
              {navigation.map((item) => (
                <div key={item.href} className="py-1">
                  {item.children ? (
                    <>
                      <div className="flex items-center rounded-xl text-base font-medium text-ink-900 hover:bg-ink-50">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex-1 px-3 py-3"
                        >
                          {item.label}
                        </Link>
                        <button
                          aria-label="Розгорнути підменю"
                          onClick={() =>
                            setExpanded((p) => (p === item.label ? null : item.label))
                          }
                          className="grid h-11 w-11 place-items-center rounded-xl text-ink-500 hover:text-brand"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expanded === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-2 mt-1 border-l border-ink-100 pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={onClose}
                                  className="block rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-brand/5 hover:text-brand"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-xl px-3 py-3 text-base font-medium text-ink-900 hover:bg-ink-50"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="border-t border-ink-100 px-6 py-6">
              <Link
                href="/kontakty"
                onClick={onClose}
                className="btn-primary w-full justify-center"
              >
                <Phone className="h-4 w-4" />
                Отримати консультацію
              </Link>
              <p className="mt-4 text-center text-xs text-ink-500">
                +38 (066) 804 25 23 · Sales@rsf.com.ua
              </p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
