import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Compass, Heart, Target } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { Stats } from "@/components/about/Stats";
import { Timeline } from "@/components/about/Timeline";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata: Metadata = {
  title: "Про компанію",
  description:
    "RSF — українська інжинірингова компанія з 12-річним досвідом будівництва альтернативної енергетики.",
};

const values = [
  {
    icon: Target,
    title: "Місія",
    text: "Робити альтернативну енергетику доступною та надійною для українського бізнесу і кожної родини.",
  },
  {
    icon: Compass,
    title: "Бачення",
    text: "Стати найбільш технологічною EPC-компанією в Центральній Європі до 2030 року.",
  },
  {
    icon: Heart,
    title: "Цінності",
    text: "Інженерна точність, чесність у комерції та постійна турбота про клієнта після здачі об'єкту.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Про компанію"
        title="Інжиніринг альтернативної енергетики з 2014 року"
        description="RSF — українська компанія, яка проектує та будує об'єкти відновлюваної енергетики. Понад 240 завершених проектів в Україні та Європі."
        breadcrumbs={[{ label: "Про компанію" }]}
      />

      <section className="bg-white pb-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] lg:col-span-5">
              <Image
                src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80"
                alt="Команда RSF на об'єкті"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-7">
              <h2 className="heading text-display-md text-ink-900 text-balance">
                Ми будуємо інфраструктуру, на якій тримається енергонезалежність
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-600">
                RSF народилася у 2014 році, коли троє інженерів зрозуміли:
                Україні потрібен новий стандарт у альтернативній енергетиці —
                чесний, технологічний, без посередників. За 12 років ми
                розрослись до команди з 45 спеціалістів і відкрили офіси у Києві,
                Львові та Варшаві.
              </p>
              <p className="mt-5 text-ink-600 leading-relaxed">
                Сьогодні RSF — це EPC-підрядник з власним проектним бюро,
                сервісною службою та R&D-командою, яка розробляє внутрішні
                інструменти моніторингу та прогнозування генерації.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className="rounded-2xl border border-ink-100 bg-white p-5 card-hover"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                      <v.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 font-display text-base font-semibold text-ink-900">
                      {v.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-500">{v.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/pro-nas/sertyfikaty" className="btn-secondary">
                  Сертифікати
                </Link>
                <Link href="/pro-nas/partnery" className="btn-secondary">
                  Партнери
                </Link>
                <Link href="/pro-nas/kariera" className="btn-secondary">
                  Кар&apos;єра
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Stats />
      <Timeline />
      <CTABlock />
    </>
  );
}
