"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Sun,
  Gauge,
  Home,
  Building2,
  HelpCircle,
  Battery,
  Moon,
} from "lucide-react";

// ── Preseti ──────────────────────────────────────────────────────
const PRESETS = {
  home: {
    label: "Дім",
    icon: Home,
    tariff: 4.32,
    pricePerKw: 850,
    kwhRange: [50, 5000] as const,
    kwhDefault: 530,
    powerRange: [1, 30] as const,
    powerDefault: 5,
    kwhStep: 10,
    powerStep: 0.5,
  },
  business: {
    label: "Бізнес",
    icon: Building2,
    tariff: 7.5,
    pricePerKw: 780,
    kwhRange: [500, 100000] as const,
    kwhDefault: 15000,
    powerRange: [10, 500] as const,
    powerDefault: 30,
    kwhStep: 100,
    powerStep: 1,
  },
} as const;

const USD_TO_UAH = 42;

const fmt = (n: number, digits = 0) =>
  new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);

// Природний паттерн денного споживання (07:00-17:00) — дзвоноподібний
// Нічний паттерн — низький базлайн + вечірній пік (18-22)
function buildConsumption(dailyKwh: number, dayPct: number): number[] {
  const dayHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const nightHours = Array.from({ length: 24 }, (_, i) => i).filter(
    (h) => !dayHours.includes(h),
  );

  const dayTotal = (dailyKwh * dayPct) / 100;
  const nightTotal = dailyKwh - dayTotal;

  const dayWeights = dayHours.map((_, i) => {
    const t = i / (dayHours.length - 1);
    return 1 + 0.35 * Math.sin(t * Math.PI);
  });
  const daySum = dayWeights.reduce((s, w) => s + w, 0);

  const nightWeights = nightHours.map((h) => {
    if (h >= 18 && h <= 22) return 1.8; // вечірній пік
    if (h >= 5 && h <= 6) return 1.2; // ранковий підйом
    if (h >= 23 || h <= 4) return 0.55; // ніч
    return 1;
  });
  const nightSum = nightWeights.reduce((s, w) => s + w, 0);

  const result = Array(24).fill(0);
  dayHours.forEach((h, i) => {
    result[h] = (dayTotal * dayWeights[i]) / daySum;
  });
  nightHours.forEach((h, i) => {
    result[h] = (nightTotal * nightWeights[i]) / nightSum;
  });
  return result;
}

// Погодинна генерація СЕС (bell-крива з піком о 12:00)
function buildGeneration(powerKw: number): number[] {
  const start = 6;
  const end = 18;
  const span = end - start;
  return Array.from({ length: 24 }, (_, h) => {
    if (h < start || h > end) return 0;
    const t = (h - start) / span;
    return Math.max(0, powerKw * 0.45 * Math.sin(t * Math.PI));
  });
}

export function SolarCalculator() {
  const [mode, setMode] = useState<"home" | "business">("home");
  const preset = PRESETS[mode];

  const [monthlyKwh, setMonthlyKwh] = useState<number>(preset.kwhDefault);
  const [dayPct, setDayPct] = useState<number>(60);
  const [powerKw, setPowerKw] = useState<number>(preset.powerDefault);

  const switchMode = (next: "home" | "business") => {
    setMode(next);
    setMonthlyKwh(PRESETS[next].kwhDefault);
    setPowerKw(PRESETS[next].powerDefault);
  };

  const data = useMemo(() => {
    const dailyKwh = monthlyKwh / 30;
    const consumption = buildConsumption(dailyKwh, dayPct);
    const generation = buildGeneration(powerKw);
    const self = consumption.map((c, h) => Math.min(c, generation[h]));
    const gridExport = generation.map((g, h) => Math.max(0, g - consumption[h]));
    const gridImport = consumption.map((c, h) => Math.max(0, c - generation[h]));

    const sum = (arr: number[]) => arr.reduce((s, v) => s + v, 0);
    const totalGen = sum(generation);
    const totalSelf = sum(self);
    const totalExport = sum(gridExport);
    const totalImport = sum(gridImport);

    const selfPct = totalGen > 0 ? (totalSelf / totalGen) * 100 : 0;
    const coveragePct =
      dailyKwh > 0 ? (totalSelf / dailyKwh) * 100 : 0;

    const monthlySavings = totalSelf * 30 * preset.tariff;
    const yearlySavings = monthlySavings * 12;
    const investmentUah = powerKw * preset.pricePerKw * USD_TO_UAH;
    const payback = yearlySavings > 0 ? investmentUah / yearlySavings : 0;

    return {
      consumption,
      generation,
      self,
      totalConsumption: dailyKwh,
      totalGen,
      totalSelf,
      totalExport,
      totalImport,
      selfPct,
      coveragePct,
      monthlySavings,
      investmentUah,
      payback,
    };
  }, [monthlyKwh, dayPct, powerKw, preset]);

  return (
    <div className="space-y-6">
      {/* ── Mode switcher: Дім / Бізнес ────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-md items-center gap-1 rounded-full border border-ink-100 bg-ink-50 p-1">
        {(Object.keys(PRESETS) as Array<"home" | "business">).map((k) => {
          const p = PRESETS[k];
          const Icon = p.icon;
          const active = mode === k;
          return (
            <button
              key={k}
              onClick={() => switchMode(k)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                active
                  ? "bg-brand text-white shadow-[0_8px_20px_-8px_rgba(7,78,162,0.45)]"
                  : "text-ink-600 hover:text-brand"
              }`}
            >
              <Icon className="h-4 w-4" />
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-[28px] border border-ink-100 bg-white shadow-[0_10px_40px_-20px_rgba(9,18,36,0.12)]">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* ═════════════════════ SLIDERS ═════════════════════ */}
          <div className="space-y-5 border-b border-ink-100 p-6 lg:border-b-0 lg:border-r lg:p-8">
          <SliderInput
            label="Середнє місячне споживання"
            unit="кВт·год"
            value={monthlyKwh}
            min={preset.kwhRange[0]}
            max={preset.kwhRange[1]}
            step={preset.kwhStep}
            onChange={setMonthlyKwh}
            icon={Zap}
            tooltip="Вкажіть яку частину вашого середнього споживання ви використовуєте днем з 07:00 до 17:00"
            viz={
              <ConsumptionViz
                value={monthlyKwh}
                min={preset.kwhRange[0]}
                max={preset.kwhRange[1]}
              />
            }
          />

          <SliderInput
            label="Споживання у сонячну пору доби"
            unit="%"
            value={dayPct}
            min={10}
            max={95}
            step={1}
            onChange={setDayPct}
            icon={Sun}
            tooltip="Яку частину електроенергії ви споживаєте днем (07:00–17:00) — коли працює сонячна станція"
            viz={<DayNightViz value={dayPct} />}
          />

          <SliderInput
            label="Потужність станції"
            unit="кВт"
            value={powerKw}
            min={preset.powerRange[0]}
            max={preset.powerRange[1]}
            step={preset.powerStep}
            onChange={setPowerKw}
            icon={Gauge}
            decimals={powerKw < 10 ? 1 : 0}
            viz={
              <PowerViz
                value={powerKw}
                min={preset.powerRange[0]}
                max={preset.powerRange[1]}
              />
            }
          />

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-ink-100 pt-6">
            <MetricPill
              label="Покриття потреби"
              value={`${fmt(data.coveragePct)}%`}
              tone="green"
            />
            <MetricPill
              label="Самоспоживання"
              value={`${fmt(data.selfPct)}%`}
              tone="brand"
            />
            <MetricPill
              label="Економія / міс"
              value={`${fmt(data.monthlySavings)} грн`}
              tone="brand"
            />
            <MetricPill
              label="Окупність"
              value={`${data.payback.toFixed(1)} р.`}
              tone="yellow"
            />
          </div>

          {data.totalGen > data.totalConsumption && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-900"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-200/60 text-amber-700">
                <Battery className="h-4 w-4" />
              </span>
                <b>Генерація СЕС перевищує потреби.</b> 
            </motion.div>
          )}

          <Link
            href="/kontakty"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-800 hover:shadow-[0_10px_30px_-10px_rgba(7,78,162,0.6)] active:scale-[0.98]"
          >
            Отримати точний прорахунок
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

          {/* ═════════════════════ CHART ═════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex h-full flex-col justify-center bg-white p-6 lg:p-8"
          >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Погодинний баланс
              </p>
              <h3 className="mt-1.5 font-display text-2xl font-bold text-ink-900">
                Генерація і споживання за день
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <LegendChip color="#6366f1" label="Споживання" />
              <LegendChip color="#facc15" label="Генерація" />
              <LegendChip color="#22c55e" label="Самоспоживання" />
            </div>
          </div>

          <SmoothChart
            consumption={data.consumption}
            generation={data.generation}
            selfConsumed={data.self}
          />

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-ink-100 pt-6 sm:grid-cols-4">
            <StatBlock
              label="Спожили"
              value={fmt(data.totalConsumption, 1)}
              unit="кВт·год/день"
              color="#6366f1"
            />
            <StatBlock
              label="Згенерували"
              value={fmt(data.totalGen, 1)}
              unit="кВт·год/день"
              color="#facc15"
            />
            <StatBlock
              label="Купили з мережі"
              value={fmt(data.totalImport, 1)}
              unit="кВт·год/день"
              color="#94a3b8"
            />
            <StatBlock
              label="Віддали в мережу"
              value={fmt(data.totalExport, 1)}
              unit="кВт·год/день"
              color="#22c55e"
            />
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border-2 border-brand/25 bg-gradient-to-br from-brand/10 via-brand/5 to-white p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-700">
                  Орієнтовна інвестиція
                </p>
                <p className="mt-1.5 font-display text-4xl font-extrabold leading-none text-brand-900 sm:text-5xl">
                  {fmt(data.investmentUah)}
                  <span className="ml-1 text-lg font-bold text-brand-700">
                    грн
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-ink-500">
                  ≈ ${fmt(powerKw * preset.pricePerKw)}
                </p>
                <p className="mt-0.5 text-xs text-ink-500">
                  тариф {preset.tariff} грн/кВт·год
                </p>
              </div>
            </div>
          </div>

            <p className="mt-3 text-center text-[10px] text-ink-400">
              * Розрахунок орієнтовний і не є публічною офертою. Точні цифри
              після інженерного аудиту об'єкта.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── UI ─────────────────────────────────────────────────────────────

function SliderInput({
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
  icon: Icon,
  decimals = 0,
  tooltip,
  viz,
}: {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  icon: React.ComponentType<{ className?: string }>;
  decimals?: number;
  tooltip?: string;
  viz?: React.ReactNode;
}) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand/10 text-brand">
          <Icon className="h-4 w-4" />
        </span>
        <p className="flex flex-1 items-center gap-1.5 text-sm font-semibold text-ink-900">
          {label} <span className="text-ink-400">, {unit}</span>
          {tooltip && <Tooltip text={tooltip} />}
        </p>
      </div>

      {viz && <div className="mt-3">{viz}</div>}

      <div className="mt-3 flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-brand"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={Number(value.toFixed(decimals))}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isNaN(n)) onChange(clamp(n));
          }}
          className="w-24 rounded-xl border border-ink-200 bg-ink-50 px-3 py-2 text-right font-display text-base font-bold text-ink-900 outline-none transition-colors focus:border-brand focus:bg-white"
        />
      </div>

      <div className="mt-1 flex justify-between text-[10px] text-ink-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <HelpCircle className="h-3.5 w-3.5 cursor-help text-ink-400 transition-colors hover:text-brand" />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-64 -translate-x-1/2 rounded-xl bg-ink-900 px-3 py-2 text-[11px] font-medium leading-snug text-white shadow-[0_12px_30px_-12px_rgba(9,18,36,0.5)] group-hover:block sm:w-72">
        {text}
        <span
          aria-hidden
          className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-ink-900"
        />
      </span>
    </span>
  );
}

function MetricPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "brand" | "yellow";
}) {
  const toneClass =
    tone === "green"
      ? "bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200 text-emerald-900"
      : tone === "yellow"
        ? "bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200 text-amber-900"
        : "bg-gradient-to-br from-brand/8 to-brand/15 border-brand/20 text-brand-900";
  return (
    <div className={`rounded-2xl border p-3.5 ${toneClass}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-75">
        {label}
      </p>
      <p className="mt-1.5 font-display text-2xl font-extrabold leading-none">
        {value}
      </p>
    </div>
  );
}

function LegendChip({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-ink-50 px-2.5 py-1 font-medium text-ink-700">
      <span
        className="h-2.5 w-2.5 rounded-sm"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

function StatBlock({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-4 shadow-[0_2px_8px_-4px_rgba(9,18,36,0.08)]">
      {/* Кольорова смуга-акцент зверху */}
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: color }}
      />
      <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">
        {label}
      </p>
      <p
        className="mt-1.5 font-display text-2xl font-extrabold leading-none"
        style={{ color }}
      >
        {value}
      </p>
      <p className="mt-1 text-[11px] text-ink-500">{unit}</p>
    </div>
  );
}

// ── Smooth flowing SVG chart ─────────────────────────────────────

function SmoothChart({
  consumption,
  generation,
  selfConsumed,
}: {
  consumption: number[];
  generation: number[];
  selfConsumed: number[];
}) {
  const width = 820;
  const height = 300;
  const padLeft = 44;
  const padBottom = 32;
  const padTop = 16;
  const padRight = 12;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const maxVal = Math.max(...consumption, ...generation, 0.001);
  const yStep = niceStep(maxVal);
  const yMax = Math.max(yStep, Math.ceil(maxVal / yStep) * yStep);

  const scaleX = (h: number) => padLeft + (h / 23) * chartW;
  const scaleY = (v: number) => padTop + chartH - (v / yMax) * chartH;
  const baseline = scaleY(0);

  const yTicks: number[] = [];
  for (let v = 0; v <= yMax + 0.001; v += yStep) yTicks.push(v);

  const consArea = smoothArea(consumption, scaleX, scaleY, baseline);
  const genArea = smoothArea(generation, scaleX, scaleY, baseline);
  const selfArea = smoothArea(selfConsumed, scaleX, scaleY, baseline);
  const consLine = smoothLine(consumption, scaleX, scaleY);
  const genLine = smoothLine(generation, scaleX, scaleY);

  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ hour: number; xPx: number } | null>(
    null,
  );

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    // Map DOM pixels → SVG viewBox units
    const svgX = (relX / rect.width) * width;
    const chartX = svgX - padLeft;
    if (chartX < 0 || chartX > chartW) {
      setHover(null);
      return;
    }
    const rawHour = (chartX / chartW) * 23;
    const hour = Math.max(0, Math.min(23, Math.round(rawHour)));
    setHover({ hour, xPx: relX });
  };

  const nice = (v: number) => {
    if (v === 0) return "0";
    return new Intl.NumberFormat("uk-UA", {
      minimumFractionDigits: v < 1 ? 2 : 1,
      maximumFractionDigits: v < 1 ? 2 : 1,
    }).format(v);
  };

  // Where to place tooltip (avoid clipping at right edge)
  const containerW = wrapRef.current?.getBoundingClientRect().width ?? 820;
  const tooltipW = 200;
  let tooltipLeft = hover ? hover.xPx + 14 : 0;
  if (hover && tooltipLeft + tooltipW > containerW) {
    tooltipLeft = Math.max(0, hover.xPx - tooltipW - 14);
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setHover(null)}
      className="relative mt-6 overflow-x-auto"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[560px]"
        role="img"
        aria-label="Погодинна генерація і споживання"
      >
        <defs>
          <linearGradient id="calc-cons-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="calc-gen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#a3e635" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a3e635" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="calc-self-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Y-grid */}
        {yTicks.map((v) => (
          <g key={v}>
            <line
              x1={padLeft}
              x2={width - padRight}
              y1={scaleY(v)}
              y2={scaleY(v)}
              stroke="#e2e8f0"
              strokeDasharray={v === 0 ? "0" : "3 4"}
            />
            <text
              x={padLeft - 8}
              y={scaleY(v) + 4}
              textAnchor="end"
              className="fill-ink-400 text-[10px]"
            >
              {v.toFixed(v < 1 ? 2 : 1)}
            </text>
          </g>
        ))}

        {/* Areas */}
        <path d={consArea} fill="url(#calc-cons-grad)" />
        <path d={genArea} fill="url(#calc-gen-grad)" />
        <path d={selfArea} fill="url(#calc-self-grad)" />

        {/* Outlines */}
        <path
          d={consLine}
          fill="none"
          stroke="#6366f1"
          strokeWidth={2}
          strokeOpacity={0.85}
        />
        <path
          d={genLine}
          fill="none"
          stroke="#eab308"
          strokeWidth={2}
          strokeOpacity={0.9}
        />

        {/* Hover guide + dots */}
        {hover && (
          <g>
            <line
              x1={scaleX(hover.hour)}
              x2={scaleX(hover.hour)}
              y1={padTop}
              y2={baseline}
              stroke="#0f172a"
              strokeOpacity="0.35"
              strokeDasharray="3 4"
              strokeWidth="1"
            />
            <circle
              cx={scaleX(hover.hour)}
              cy={scaleY(consumption[hover.hour])}
              r="4"
              fill="#6366f1"
              stroke="white"
              strokeWidth="2"
            />
            <circle
              cx={scaleX(hover.hour)}
              cy={scaleY(generation[hover.hour])}
              r="4"
              fill="#eab308"
              stroke="white"
              strokeWidth="2"
            />
            {selfConsumed[hover.hour] > 0.001 && (
              <circle
                cx={scaleX(hover.hour)}
                cy={scaleY(selfConsumed[hover.hour])}
                r="4"
                fill="#22c55e"
                stroke="white"
                strokeWidth="2"
              />
            )}
          </g>
        )}

        {/* X ticks */}
        {[0, 3, 6, 9, 12, 15, 18, 21, 23].map((h) => (
          <text
            key={h}
            x={scaleX(h)}
            y={height - padBottom + 16}
            textAnchor="middle"
            className="fill-ink-500 text-[10px]"
          >
            {h.toString().padStart(2, "0")}
          </text>
        ))}

        <line
          x1={padLeft}
          x2={width - padRight}
          y1={baseline}
          y2={baseline}
          stroke="#cbd5e1"
        />

        <text
          x={padLeft - 34}
          y={padTop + chartH / 2}
          transform={`rotate(-90, ${padLeft - 34}, ${padTop + chartH / 2})`}
          textAnchor="middle"
          className="fill-ink-500 text-[10px]"
        >
          кВт·год/год
        </text>
      </svg>

      {/* Floating tooltip card */}
      {hover && (
        <div
          className="pointer-events-none absolute top-2 z-10 w-[200px] rounded-2xl border border-ink-100 bg-white/95 p-3 shadow-[0_16px_40px_-16px_rgba(9,18,36,0.25)] backdrop-blur"
          style={{ left: tooltipLeft }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-500">
            {hover.hour.toString().padStart(2, "0")}:00
          </p>
          <div className="mt-2 space-y-1.5 text-xs">
            <TooltipRow
              color="#6366f1"
              label="Споживання"
              value={nice(consumption[hover.hour])}
            />
            <TooltipRow
              color="#eab308"
              label="Генерація"
              value={nice(generation[hover.hour])}
            />
            <TooltipRow
              color="#22c55e"
              label="Самоспоживання"
              value={nice(selfConsumed[hover.hour])}
            />
          </div>
          <p className="mt-2 border-t border-ink-100 pt-1.5 text-[10px] text-ink-400">
            кВт·год за годину
          </p>
        </div>
      )}
    </div>
  );
}

function TooltipRow({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-2 text-ink-700">
        <span
          className="h-2.5 w-2.5 rounded-sm"
          style={{ backgroundColor: color }}
        />
        {label}
      </span>
      <span className="font-display font-bold text-ink-900">{value}</span>
    </div>
  );
}

// Catmull-Rom to Cubic Bezier smooth path
function smoothLine(
  values: number[],
  scaleX: (i: number) => number,
  scaleY: (v: number) => number,
): string {
  if (values.length === 0) return "";
  const pts: Array<[number, number]> = values.map((v, i) => [scaleX(i), scaleY(v)]);
  let d = `M ${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d;
}

function smoothArea(
  values: number[],
  scaleX: (i: number) => number,
  scaleY: (v: number) => number,
  baseline: number,
): string {
  const line = smoothLine(values, scaleX, scaleY);
  if (!line) return "";
  const lastX = scaleX(values.length - 1);
  const firstX = scaleX(0);
  return `${line} L ${lastX.toFixed(2)},${baseline.toFixed(2)} L ${firstX.toFixed(2)},${baseline.toFixed(2)} Z`;
}

function niceStep(max: number) {
  if (max <= 0) return 1;
  const rough = max / 5;
  const pow = Math.pow(10, Math.floor(Math.log10(rough || 1)));
  const rest = rough / pow;
  const nice = rest < 1.5 ? 1 : rest < 3 ? 2 : rest < 7 ? 5 : 10;
  return nice * pow;
}


// ══════════════════════ SLIDER VISUALIZATIONS ══════════════════════

// 1️⃣ Consumption — пульсуюча блискавка з іскрами і кільцем енергії
export function ConsumptionViz({
  value,
  min,
  max,
}: {
  value: number;
  min: number;
  max: number;
}) {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const glowSize = 60 + t * 60;
  const boltScale = 0.85 + t * 0.4;
  const intensity = 0.35 + t * 0.65;

  // Іскри летять на фіксовану відстань — швидкість реакції залежить лише від opacity
  const sparkDist = 30;

  return (
    <div
      aria-hidden
      className="relative flex h-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50"
    >
      {/* Meter tick marks (background pattern) */}
      <svg className="absolute inset-0 opacity-15" viewBox="0 0 200 80">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={10 + i * 17}
            y1={72}
            x2={10 + i * 17}
            y2={i % 3 === 0 ? 66 : 69}
            stroke="#0f172a"
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Energy glow — розмір через CSS, пульс через framer */}
      <motion.div
        className="absolute rounded-full will-change-transform"
        style={{
          width: glowSize,
          height: glowSize,
          background: `radial-gradient(circle, rgba(250,204,21,${intensity * 0.8}) 0%, transparent 65%)`,
          transition: "width 0.15s ease-out, height 0.15s ease-out, background 0.15s ease-out",
        }}
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lightning bolt — миттєва CSS-транзиція */}
      <div
        className="relative will-change-transform"
        style={{
          transform: `scale(${boltScale})`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <Zap
          className="h-11 w-11 text-yellow-500"
          fill="currentColor"
          strokeWidth={1.5}
          style={{
            filter: `drop-shadow(0 0 ${8 + t * 10}px rgba(250,204,21,${intensity}))`,
            transition: "filter 0.15s ease-out",
          }}
        />
      </div>

      {/* Sparks — batch-opacity через CSS-обгортку, орбіта через framer */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          opacity: intensity,
          transition: "opacity 0.15s ease-out",
        }}
      >
        {[0, 1, 2].map((i) => {
          const angle = (i * 120 + 30) * (Math.PI / 180);
          return (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-yellow-400"
              animate={{
                x: [0, Math.cos(angle) * sparkDist],
                y: [0, Math.sin(angle) * sparkDist],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.4],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// 2️⃣ Day % — розділ сцени: день/сонце ↔ ніч/місяць
export function DayNightViz({ value }: { value: number }) {
  const dayPct = value;
  return (
    <div
      aria-hidden
      className="relative flex h-20 overflow-hidden rounded-2xl"
    >
      {/* Day part — CSS-транзиція на flex-grow (миттєво реагує) */}
      <div
        className="relative flex items-center justify-center bg-gradient-to-b from-yellow-100 via-amber-100 to-orange-100"
        style={{
          flexGrow: dayPct,
          flexBasis: 0,
          transition: "flex-grow 0.18s ease-out",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sun
            className="h-8 w-8 text-yellow-500"
            fill="currentColor"
            strokeWidth={1.5}
            style={{ filter: "drop-shadow(0 0 8px rgba(250,204,21,0.5))" }}
          />
        </motion.div>
        <motion.span
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(250,204,21,0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Night part */}
      <div
        className="relative flex items-center justify-center bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-800"
        style={{
          flexGrow: 100 - dayPct,
          flexBasis: 0,
          transition: "flex-grow 0.18s ease-out",
        }}
      >
        <Moon
          className="h-7 w-7 text-slate-100"
          fill="currentColor"
          strokeWidth={1.5}
        />
        {[
          { x: "20%", y: "25%", d: 0 },
          { x: "70%", y: "18%", d: 0.4 },
          { x: "40%", y: "60%", d: 0.8 },
          { x: "80%", y: "50%", d: 1.2 },
        ].map((s, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{ left: s.x, top: s.y }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: s.d }}
          />
        ))}
      </div>
    </div>
  );
}

// 3️⃣ Power — ряд сонячних панелей що з'являються, з сонцем що яскравіє
export function PowerViz({
  value,
  min,
  max,
}: {
  value: number;
  min: number;
  max: number;
}) {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const totalPanels = 9;
  const activePanels = Math.max(1, Math.round(t * totalPanels));

  return (
    <div
      aria-hidden
      className="relative flex h-20 items-end justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-sky-100 via-blue-50 to-white"
    >
      {/* Ambient sun */}
      <motion.div
        className="absolute right-4 top-3 rounded-full"
        style={{
          width: 22,
          height: 22,
          background: "radial-gradient(circle, #fde047 0%, #facc15 70%, #eab308 100%)",
          boxShadow: `0 0 ${10 + t * 20}px rgba(250,204,21,${0.5 + t * 0.4})`,
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />

      {/* Sun rays (small strokes around sun) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <motion.span
          key={deg}
          className="absolute right-[calc(1rem+11px)] top-[calc(0.75rem+11px)] block h-2 w-[2px] origin-bottom bg-yellow-400"
          style={{
            transform: `translate(-50%, -100%) rotate(${deg}deg) translateY(-13px)`,
            opacity: 0.5 + t * 0.4,
          }}
          animate={{ scaleY: [0.6, 1, 0.6] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: (deg / 360) * 0.6,
          }}
        />
      ))}

      {/* Panels row along the bottom — CSS-транзиції, миттєва реакція */}
      <div className="relative z-10 mb-2 flex items-end gap-[3px]">
        {Array.from({ length: totalPanels }).map((_, i) => {
          const isActive = i < activePanels;
          return (
            <div
              key={i}
              className="relative overflow-hidden rounded-[3px] will-change-transform"
              style={{
                width: 18,
                height: 32,
                background: isActive
                  ? "linear-gradient(160deg, #1e3a8a 0%, #2563eb 45%, #60a5fa 100%)"
                  : "#94a3b8",
                transformOrigin: "bottom",
                opacity: isActive ? 1 : 0.18,
                transform: `perspective(120px) rotateX(35deg) scaleY(${
                  isActive ? 1 : 0.55
                }) translateY(${isActive ? 0 : 5}px)`,
                boxShadow: isActive ? "0 3px 8px rgba(30,58,138,0.35)" : "none",
                transition:
                  "opacity 0.14s ease-out, transform 0.16s ease-out, background 0.14s ease-out, box-shadow 0.14s ease-out",
              }}
            >
              {/* Cell grid pattern */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-0 top-[33%] h-px bg-white/40" />
                <div className="absolute inset-x-0 top-[66%] h-px bg-white/40" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-white/40" />
              </div>
              {/* Shine — тільки на активних */}
              {isActive && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 60%)",
                  }}
                  animate={{ opacity: [0.2, 0.55, 0.2] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.18,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Ground line */}
      <div className="absolute bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
    </div>
  );
}
