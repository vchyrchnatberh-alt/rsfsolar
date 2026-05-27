"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navigation } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 px-4 pt-3 lg:px-6 lg:pt-5">
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-500 lg:pl-5 lg:pr-2.5",
            scrolled
              ? "border-ink-100 bg-white/90 shadow-[0_16px_50px_-16px_rgba(9,18,36,0.25)]"
              : "border-white/60 bg-white/80 shadow-[0_10px_40px_-16px_rgba(9,18,36,0.18)]",
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium text-ink-700 transition-colors hover:text-brand"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:-rotate-180" />
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                    >
                      <div className="min-w-[270px] overflow-hidden rounded-3xl border border-ink-100 bg-white/95 p-2 shadow-[0_30px_60px_-20px_rgba(9,18,36,0.25)] backdrop-blur-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-2xl px-4 py-2.5 text-sm text-ink-700 transition-colors hover:bg-brand/5 hover:text-brand"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher />
            <Link
              href="/kontakty"
              className="hidden items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-800 hover:shadow-[0_10px_30px_-8px_rgba(7,78,162,0.6)] active:scale-[0.98] lg:inline-flex"
            >
              <Phone className="h-4 w-4" />
              Контакти
            </Link>
            <button
              type="button"
              aria-label="Відкрити меню"
              onClick={() => setMobileOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-900 transition-colors hover:border-brand hover:text-brand lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.header>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
