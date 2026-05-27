"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function CTABlock({
  title = "Обговоримо ваш проект?",
  description = "Залиште заявку та отримайте безкоштовну консультацію інженера RSF Solar протягом 24 годин.",
  primaryLabel = "Отримати консультацію",
  primaryHref = "/kontakty",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[32px] border border-ink-100 bg-ink-950 p-10 text-white lg:p-14"
        >
          <div aria-hidden className="absolute -right-32 -top-20 h-[360px] w-[360px] rounded-full bg-brand/30 blur-3xl" />
          <div aria-hidden className="absolute -bottom-20 -left-20 h-[280px] w-[280px] rounded-full bg-accent/20 blur-3xl" />
          <div aria-hidden className="absolute inset-0 bg-grid-dark bg-[size:40px_40px] opacity-30" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="heading text-display-md text-white text-balance">
                {title}
              </h3>
              <p className="mt-5 max-w-xl text-white/75">{description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <Link href={primaryHref} className="btn-primary px-7 py-3.5 text-base">
                <Phone className="h-4 w-4" />
                {primaryLabel}
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
