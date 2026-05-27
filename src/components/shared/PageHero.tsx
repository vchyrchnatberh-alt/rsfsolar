"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-white pb-16 pt-32 lg:pb-20 lg:pt-44",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[1100px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-br from-brand-100/80 via-brand-50/60 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-grid-light bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
      </div>

      <Container className="relative">
        {breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1.5 text-xs text-ink-500"
          >
            <Link href="/" className="hover:text-brand">
              Головна
            </Link>
            {breadcrumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-brand">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink-900">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            <span className="size-1.5 rounded-full bg-brand" />
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="heading mt-5 max-w-3xl text-display-lg text-balance"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600"
          >
            {description}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
