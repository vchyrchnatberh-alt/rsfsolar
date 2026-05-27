"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Send,
  ShoppingBag,
} from "lucide-react";
import { ConsultationForm } from "@/components/home/ConsultationForm";

const departments = [
  {
    icon: ShoppingBag,
    title: "Відділ продажу",
    phone: "+380 (44) 222 33 44",
    email: "sales@rsfsolar.com",
    hours: "Пн–Пт 09:00–19:00 · Сб 10:00–15:00",
    accent: "from-brand-500 to-brand-700",
  },
  {
    icon: Headphones,
    title: "Сервісний відділ",
    phone: "+380 (67) 555 66 77",
    email: "service@rsfsolar.com",
    hours: "Цілодобово · 24/7",
    accent: "from-ink-700 to-ink-900",
  },
];

export function ContactsContent() {
  return (
    <>
      <section className="bg-white pb-20">
        <div className="container-wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-5">
              {departments.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-7"
                >
                  <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${d.accent} opacity-15 blur-2xl`} />
                  <span className={`relative inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${d.accent} text-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.4)]`}>
                    <d.icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 font-display text-xl font-semibold text-ink-900">
                    {d.title}
                  </h3>
                  <ul className="relative mt-4 space-y-3 text-sm">
                    <li className="flex items-center gap-3 text-ink-700">
                      <Phone className="h-4 w-4 text-brand" />
                      <Link href={`tel:${d.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                        {d.phone}
                      </Link>
                    </li>
                    <li className="flex items-center gap-3 text-ink-700">
                      <Mail className="h-4 w-4 text-brand" />
                      <Link href={`mailto:${d.email}`} className="hover:text-brand">
                        {d.email}
                      </Link>
                    </li>
                    <li className="flex items-center gap-3 text-ink-500">
                      <Clock className="h-4 w-4 text-brand" />
                      {d.hours}
                    </li>
                  </ul>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-3xl border border-ink-100 bg-ink-950 p-7 text-white"
              >
                <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-brand/20 text-brand-300">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  Головний офіс
                </h3>
                <p className="mt-3 text-sm text-ink-300">
                  вул. Антоновича 102, БЦ "Step"
                  <br />
                  офіс 412, Київ, 03150
                </p>
                <div className="mt-5 flex gap-3">
                  <Link
                    href="https://t.me/rsfsolar"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium hover:border-brand hover:bg-brand/20"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Telegram
                  </Link>
                  <Link
                    href="viber://chat?number=+380442223344"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium hover:border-brand hover:bg-brand/20"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                      <path d="M11.4 0C7.7.1 3.7 1.5 1.9 4.5 0 7.8 0 12.4 1.8 16.2c.5 1 1.1 1.8 1.8 2.5l-.7 2.7c0 .2.2.4.5.3l3-1c2.1.4 4.4.4 6.5-.1 4.5-1 7.1-4.9 7.1-9.5C20 6 16.6 1 11.4 0z" />
                    </svg>
                    Viber
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-ink-100 lg:col-span-7 lg:aspect-auto"
          >
            <iframe
              title="RSF Solar на карті"
              src="https://www.openstreetmap.org/export/embed.html?bbox=30.4900%2C50.4250%2C30.5500%2C50.4550&layer=mapnik&marker=50.4400%2C30.5200"
              className="absolute inset-0 h-full w-full grayscale-[20%]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute left-5 top-5 rounded-2xl border border-white/40 bg-white/95 px-4 py-3 shadow-[0_20px_40px_-12px_rgba(15,23,42,0.25)] backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-500">
                    Головний офіс
                  </p>
                  <p className="text-sm font-semibold text-ink-900">
                    Київ, БЦ "Step"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ConsultationForm />
    </>
  );
}
