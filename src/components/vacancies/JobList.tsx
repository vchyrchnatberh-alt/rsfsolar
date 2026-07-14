"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Banknote,
  Clock,
  Briefcase,
  ArrowRight,
  Flame,
} from "lucide-react";
import { vacancies } from "@/lib/vacancies";

export function JobList() {
  return (
    <div className="space-y-5">

      {vacancies.map((job, i) => (
        <motion.div
          key={job.slug}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <Link
            href={`/vakansii/${job.slug}`}
            className="group relative block overflow-hidden rounded-[24px] border border-ink-100 bg-white p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_20px_50px_-16px_rgba(7,78,162,0.15)] sm:p-8"
          >

            <div className="pr-20">
              <p className="text-xs font-medium uppercase tracking-wider text-brand">
                {job.department}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink-900 transition-colors group-hover:text-brand sm:text-2xl">
                {job.title}
              </h2>
            </div>

            <p className="mt-3 line-clamp-2 text-ink-500">
              {job.shortDescription}
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-ink-50 px-3 py-1.5 text-xs text-ink-600">
                <MapPin className="h-3.5 w-3.5 text-brand" />
                {job.location}
              </span>
              {job.salary && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-ink-50 px-3 py-1.5 text-xs text-ink-600">
                  <Banknote className="h-3.5 w-3.5 text-brand" />
                  {job.salary}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-ink-50 px-3 py-1.5 text-xs text-ink-600">
                <Clock className="h-3.5 w-3.5 text-brand" />
                {job.employment}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-ink-50 px-3 py-1.5 text-xs text-ink-600">
                <Briefcase className="h-3.5 w-3.5 text-brand" />
                {job.experience}
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-5">
              <span className="text-xs text-ink-400">
                Опубліковано:{" "}
                {new Date(job.publishedAt).toLocaleDateString("uk-UA", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors group-hover:text-brand-800">
                Детальніше
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
