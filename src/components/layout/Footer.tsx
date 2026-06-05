import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { services } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(45,102,191,0.22),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-50" />
      <div className="relative">
        <div className="container-wrap pb-12 pt-20 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo light />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-400">
                Royal Sun Flower — українська інжинірингова компанія, що
                проектує та будує об'єкти альтернативної енергетики й системи
                зберігання під ключ. Сертифіковані інженери, преміум обладнання,
                європейські стандарти.
              </p>
              <div className="mt-7 flex items-center gap-3">
                <Link
                  href="https://t.me/rsfsolar"
                  aria-label="Telegram"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-brand hover:bg-brand/20 hover:text-brand-300"
                >
                  <Send className="h-4 w-4" />
                </Link>
                <Link
                  href="viber://chat?number=+380668042523"
                  aria-label="Viber"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-brand hover:bg-brand/20 hover:text-brand-300"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M11.4 0C7.7.1 3.7 1.5 1.9 4.5 0 7.8 0 12.4 1.8 16.2c.5 1 1.1 1.8 1.8 2.5l-.7 2.7c0 .2.2.4.5.3l3-1c2.1.4 4.4.4 6.5-.1 4.5-1 7.1-4.9 7.1-9.5C20 6 16.6 1 11.4 0z" />
                  </svg>
                </Link>
                <Link
                  href="mailto:Sales@rsf.com.ua"
                  aria-label="Email"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-brand hover:bg-brand/20 hover:text-brand-300"
                >
                  <Mail className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Послуги
              </h4>
              <ul className="mt-5 space-y-3 text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/posluhy/${s.slug}`}
                      className="text-ink-400 transition-colors hover:text-brand-300"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Компанія
              </h4>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link href="/pro-nas" className="text-ink-400 hover:text-brand-300">
                    Про нас
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pro-nas/sertyfikaty"
                    className="text-ink-400 hover:text-brand-300"
                  >
                    Сертифікати
                  </Link>
                </li>
                <li>
                  <Link href="/pro-nas/partnery" className="text-ink-400 hover:text-brand-300">
                    Партнери
                  </Link>
                </li>
                <li>
                  <Link href="/pro-nas/kariera" className="text-ink-400 hover:text-brand-300">
                    Кар&apos;єра
                  </Link>
                </li>
                <li>
                  <Link href="/proekty" className="text-ink-400 hover:text-brand-300">
                    Проєкти
                  </Link>
                </li>
                <li>
                  <Link href="/novyny" className="text-ink-400 hover:text-brand-300">
                    Новини
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Контакти
              </h4>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-brand-400" />
                  <div>
                    <p className="text-white">+38 (066) 804 25 23</p>
                    <p className="text-xs text-ink-500">Відділ продажу · Пн–Пт 9:00–19:00</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-brand-400" />
                  <div>
                    <p className="text-white">+38 (099) 154 54 32</p>
                    <p className="text-xs text-ink-500">Сервісний відділ · 24/7</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-brand-400" />
                  <p className="text-ink-300">Sales@rsf.com.ua</p>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-brand-400" />
                  <p className="text-ink-300">
                    вул. Рильського 9
                    <br />
                    Житомир, Україна
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-ink-200">
                <span className="flex h-3.5 w-5 flex-col overflow-hidden rounded-[2px] ring-1 ring-white/20">
                  <span className="h-1/2 w-full bg-[#0057B7]" />
                  <span className="h-1/2 w-full bg-[#FFD700]" />
                </span>
                Українська компанія
              </span>
              <p className="text-xs text-ink-500">
                © {year} RSF Solar. Всі права захищено.
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs text-ink-500">
              <Link href="/privacy" className="hover:text-brand-300">
                Політика конфіденційності
              </Link>
              <span>·</span>
              <Link
                href="https://anthropic.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-300"
              >
                Розробка: Claude Studio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
