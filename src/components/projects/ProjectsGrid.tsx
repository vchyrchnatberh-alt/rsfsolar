"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, X, Zap } from "lucide-react";
import { projects } from "@/lib/data";

const countries: Record<string, { name: string; flag: string }> = {
  ua: { name: "Україна", flag: "https://flagcdn.com/w40/ua.png" },
  pl: { name: "Польща", flag: "https://flagcdn.com/w40/pl.png" },
  de: { name: "Німеччина", flag: "https://flagcdn.com/w40/de.png" },
};

// Додаткові кадри для фотогалереї проєкту
const galleryPool = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=80",
];

const isHome = (type: string) => type.toLowerCase().includes("приват");
const categoryOf = (type: string) => (isHome(type) ? "home" : "commercial");
const categoryLabel = (type: string) =>
  isHome(type) ? "Домашній" : "Комерційний";

const catFilters = [
  { id: "all", label: "Всі проєкти" },
  { id: "commercial", label: "Комерційні" },
  { id: "home", label: "Домашні" },
];

function FlagImg({ code, className }: { code: string; className?: string }) {
  const c = countries[code];
  if (!c) return null;
  return (
    <Image
      src={c.flag}
      alt={c.name}
      width={20}
      height={14}
      className={`rounded-[2px] object-cover ${className ?? ""}`}
    />
  );
}

export function ProjectsGrid() {
  const [cat, setCat] = useState("all");
  const [country, setCountry] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  // Комерційні — першими
  const ordered = useMemo(
    () =>
      projects
        .map((p, idx) => ({ ...p, idx }))
        .sort(
          (a, b) =>
            (categoryOf(a.type) === "home" ? 1 : 0) -
            (categoryOf(b.type) === "home" ? 1 : 0),
        ),
    [],
  );

  const filtered = ordered.filter(
    (p) =>
      (cat === "all" || categoryOf(p.type) === cat) &&
      (!country || p.flag === country),
  );

  const availableCountries = Array.from(new Set(projects.map((p) => p.flag)));

  const openProject = (idx: number) => {
    setSelected(idx);
    setSlide(0);
  };

  const gallery = useMemo(() => {
    if (selected === null) return [];
    const cover = projects[selected].image;
    return Array.from(new Set([cover, ...galleryPool])).slice(0, 4);
  }, [selected]);

  return (
    <>
      {/* Фільтри: категорія + клікабельні прапорці країн */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {catFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setCat(f.id)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                cat === f.id
                  ? "border-brand bg-brand text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand/40 hover:text-brand"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="mr-1 text-xs uppercase tracking-wider text-ink-500">
            Країна:
          </span>
          {availableCountries.map((code) => (
            <button
              key={code}
              onClick={() => setCountry((c) => (c === code ? null : code))}
              title={countries[code]?.name}
              aria-pressed={country === code}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all ${
                country === code
                  ? "border-brand bg-brand/5 text-brand"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand/40"
              }`}
            >
              <FlagImg code={code} />
              <span className="hidden sm:inline">{countries[code]?.name}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.button
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              onClick={() => openProject(p.idx)}
              className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white text-left card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-ink-700">
                  <FlagImg code={p.flag} />
                  {categoryLabel(p.type)}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/85">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {p.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5 text-brand-300" />
                      {p.capacity}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink-500">
          Немає проєктів за обраними фільтрами.
        </p>
      )}

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Закрити"
                className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink-900 shadow hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Фотогалерея */}
              <div className="relative aspect-[16/9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={gallery[slide]}
                      alt={`${projects[selected].title} — фото ${slide + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />

                <button
                  onClick={() =>
                    setSlide((s) => (s - 1 + gallery.length) % gallery.length)
                  }
                  aria-label="Попереднє фото"
                  className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink-900 transition hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSlide((s) => (s + 1) % gallery.length)}
                  aria-label="Наступне фото"
                  className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink-900 transition hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-ink-800">
                  <FlagImg code={projects[selected].flag} />
                  {countries[projects[selected].flag]?.name}
                </span>
              </div>

              {/* Мініатюри */}
              <div className="flex gap-2 px-5 pt-4">
                {gallery.map((g, i) => (
                  <button
                    key={g}
                    onClick={() => setSlide(i)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      i === slide ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={g} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>

              <div className="grid gap-8 p-8 md:grid-cols-3 md:p-10">
                <div className="md:col-span-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                    {projects[selected].type} · {categoryLabel(projects[selected].type)}
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-semibold text-ink-900">
                    {projects[selected].title}
                  </h2>
                  <p className="mt-4 text-ink-600">
                    Спроектовано та змонтовано командою Royal Sun Flower. Об'єкт
                    оснащений системою онлайн-моніторингу з прогнозом генерації
                    та інтегрований з мережею оператора. Власна гарантія — 5 років.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-ink-100 bg-ink-50 p-4">
                    <p className="text-xs uppercase tracking-wider text-ink-500">
                      Локація
                    </p>
                    <p className="mt-1 font-medium text-ink-900">
                      {projects[selected].location}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-ink-100 bg-ink-50 p-4">
                    <p className="text-xs uppercase tracking-wider text-ink-500">
                      Потужність
                    </p>
                    <p className="mt-1 font-display text-xl font-bold text-brand">
                      {projects[selected].capacity}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <p className="text-xs uppercase tracking-wider text-ink-500">
                    Використане обладнання
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {projects[selected].equipment.map((eq) => (
                      <span
                        key={eq}
                        className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs text-ink-700"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
