import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { services } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.short,
    openGraph: { title: s.title, description: s.short, images: [s.image] },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow="Послуга"
        title={service.title}
        description={service.short}
        breadcrumbs={[
          { label: "Послуги", href: "/posluhy" },
          { label: service.title },
        ]}
      />

      <section className="bg-white pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-ink-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-ink-800">
                  <Icon className="h-4 w-4 text-brand" />
                  {service.title}
                </span>
              </div>

              <div className="mt-10 max-w-2xl">
                <h2 className="heading text-display-md text-ink-900 text-balance">
                  Що входить у послугу
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-600">
                  {service.description}
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((b) => (
                  <div
                    key={b}
                    className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white px-5 py-4 card-hover"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm text-ink-700">{b}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-3xl border border-ink-100 bg-ink-50 p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">
                    Чому RSF
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-ink-600">
                    <li>· Понад 240 реалізованих об'єктів</li>
                    <li>· Сертифіковані Tier-1 виробники</li>
                    <li>· Власна гарантія від інженерів</li>
                    <li>· Договір з фіксованим бюджетом</li>
                  </ul>
                  <Link
                    href="/kontakty"
                    className="btn-primary mt-6 w-full justify-center"
                  >
                    Замовити прорахунок
                  </Link>
                </div>

                <div className="rounded-3xl border border-ink-100 bg-white p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-ink-500">
                    Інші послуги
                  </p>
                  <ul className="mt-4 space-y-2">
                    {others.map((o) => (
                      <li key={o.slug}>
                        <Link
                          href={`/posluhy/${o.slug}`}
                          className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:border-brand/20 hover:bg-brand/5 hover:text-brand"
                        >
                          {o.title}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CTABlock
        title={`Готові обговорити ${service.title.toLowerCase()}?`}
        description="Інженер RSF підготує попередній прорахунок, специфікацію обладнання та терміни реалізації проекту."
      />
    </>
  );
}
