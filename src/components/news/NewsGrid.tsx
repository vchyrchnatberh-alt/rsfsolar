"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { news } from "@/lib/data";

function formatDate(d: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(d));
}

export function NewsGrid() {
  const [featured, ...rest] = news;

  return (
    <div className="space-y-10">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="group relative grid overflow-hidden rounded-[32px] border border-ink-100 bg-white lg:grid-cols-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-ink-700">
            Топ новина
          </span>
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-500">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(featured.date)}
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-ink-900 text-balance">
            {featured.title}
          </h2>
          <p className="mt-4 text-ink-600 leading-relaxed">
            {featured.excerpt}
          </p>
          <Link
            href={`/novyny/${featured.slug}`}
            className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium text-brand hover:text-brand-700"
          >
            Читати повністю
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.article>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((n, i) => (
          <motion.article
            key={n.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="group overflow-hidden rounded-3xl border border-ink-100 bg-white card-hover"
          >
            <Link href={`/novyny/${n.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(n.date)}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">
                  {n.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-500">
                  {n.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  Читати повністю
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
