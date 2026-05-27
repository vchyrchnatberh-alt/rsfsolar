import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="RSF Solar — головна"
      className={cn(
        "group inline-flex items-center gap-2.5",
        className,
      )}
    >
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white shadow-[0_8px_24px_-8px_rgba(7,78,162,0.6)] transition-transform group-hover:scale-105">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_60%)]" />
        <svg
          viewBox="0 0 24 24"
          className="relative h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-bold tracking-tight",
            light ? "text-white" : "text-ink-900",
          )}
        >
          RSF<span className="text-brand"> Solar</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[10px] uppercase tracking-[0.22em]",
            light ? "text-white/50" : "text-ink-500",
          )}
        >
          Royal Sun Flower
        </span>
      </span>
    </Link>
  );
}
