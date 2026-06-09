"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, Gauge, Sparkles, Wifi, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const dashboardItems = [
  { icon: Zap, label: "Поточна потужність", value: "486", unit: "кВт", trend: "+12%" },
  { icon: Gauge, label: "Сумарно за день", value: "3 248", unit: "кВт·год", trend: "+4%" },
  { icon: Activity, label: "Стан інверторів", value: "12 / 12", unit: "online", trend: "OK" },
  { icon: Wifi, label: "Затримка телеметрії", value: "82", unit: "ms", trend: "stable" },
];

export function AIMonitoring() {
  return (
    <section className="section relative overflow-hidden bg-ink-950 text-white">
      <div aria-hidden className="absolute inset-0 -z-0 opacity-70">
        <div className="absolute -left-40 top-10 h-[400px] w-[400px] rounded-full bg-brand/30 blur-3xl" />
        <div className="absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute inset-0 bg-grid-dark bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader
              dark
              eyebrow="Онлайн-контроль"
              title="Моніторинг енергосистеми в реальному часі"
              description="Використання сучасних технологічних рішень дозволяє власнику енергосистеми моніторити стан об'єкту в реальному часі із будь-якої точки планети. Програмне забезпечення на основі штучного інтелекту в режимі онлайн аналізує стан об'єкту та глобальної мережі, адаптуючи поведінку генераційного та акумуляторного обладнання та максимізуючи ефективність використання та генерації енергії."
            />

            <ul className="mt-9 space-y-4">
              {[
                {
                  icon: Cpu,
                  title: "ML-прогноз генерації на 7 днів",
                  desc: "Точність до 96% з урахуванням погоди та інсоляції",
                },
                {
                  icon: Sparkles,
                  title: "Авто-діагностика інверторів",
                  desc: "Раннє виявлення деградації та проактивний сервіс",
                },
                {
                  icon: Activity,
                  title: "Дашборд клієнта 24/7",
                  desc: "Мобільний застосунок, веб-кабінет і API",
                },
              ].map((f) => (
                <li key={f.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/20 text-brand-300">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{f.title}</p>
                    <p className="text-sm text-ink-400">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-ink-900/80 to-ink-950/90 p-6 backdrop-blur-xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <p className="text-xs uppercase tracking-wider text-ink-400">
                  ROYALSUNFLOWER SCADA · object #2143
                </p>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {dashboardItems.map((it) => {
                  const Icon = it.icon;
                  return (
                    <div
                      key={it.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="h-4 w-4 text-brand-300" />
                        <span className="text-[10px] font-medium uppercase tracking-wider text-brand-300">
                          {it.trend}
                        </span>
                      </div>
                      <p className="mt-3 font-display text-2xl font-bold">
                        {it.value}
                        <span className="ml-1 text-xs font-medium text-ink-400">
                          {it.unit}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-ink-400">{it.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-ink-400">
                    Денний профіль · травень
                  </p>
                  <p className="text-xs text-brand-300">Прогноз ML</p>
                </div>

                <svg viewBox="0 0 320 80" className="mt-4 h-20 w-full">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0,70 C30,68 60,40 90,32 C120,22 150,18 180,22 C210,26 240,38 270,52 C290,60 305,66 320,68 L320,80 L0,80 Z"
                    fill="url(#g1)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  <motion.path
                    d="M0,70 C30,68 60,40 90,32 C120,22 150,18 180,22 C210,26 240,38 270,52 C290,60 305,66 320,68"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2 }}
                  />
                </svg>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-8 hidden rounded-2xl border border-white/15 bg-ink-900/80 p-4 backdrop-blur-xl md:block"
            >
              <p className="text-[10px] uppercase tracking-wider text-ink-400">
                Алерт системи
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Все працює оптимально
              </p>
              <p className="text-xs text-brand-300">0 критичних подій</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
