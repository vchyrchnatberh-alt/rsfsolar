import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { news } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = news.find((x) => x.slug === slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.excerpt,
    openGraph: { title: n.title, description: n.excerpt, images: [n.image] },
  };
}

function formatDate(d: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(d));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  if (!article) notFound();

  const others = news.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={formatDate(article.date)}
        title={article.title}
        description={article.excerpt}
        breadcrumbs={[
          { label: "Новини", href: "/novyny" },
          { label: article.title.slice(0, 36) + "…" },
        ]}
      />

      <section className="bg-white pb-20">
        <Container>
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[28px] border border-ink-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
              priority
            />
          </div>

          <article className="prose-custom mx-auto mt-12 max-w-3xl text-lg leading-relaxed text-ink-700">
            <p>
              {article.excerpt} У цій статті інженери RSF Solar детально
              розповідають про деталі реалізації, технічні рішення та результати,
              які отримав замовник.
            </p>
            <h2 className="mt-10 font-display text-2xl font-semibold text-ink-900">
              Контекст проекту
            </h2>
            <p className="mt-4">
              Замовник звернувся з потребою зменшити витрати на електроенергію
              та забезпечити резервне живлення критичних процесів. Команда RSF
              Solar провела комплексний енергоаудит, спроектувала рішення під
              ключ та реалізувала його з дотриманням європейських стандартів.
            </p>
            <h2 className="mt-10 font-display text-2xl font-semibold text-ink-900">
              Використані технології
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Сонячні модулі Jinko Tiger Neo з ККД 22.5%</li>
              <li>Інвертори Huawei SUN2000 з AI-моніторингом</li>
              <li>Промислові акумулятори BYD Battery-Box</li>
              <li>Хмарна SCADA-платформа RSF Sense</li>
            </ul>
            <h2 className="mt-10 font-display text-2xl font-semibold text-ink-900">
              Результати
            </h2>
            <p className="mt-4">
              За перший місяць експлуатації об'єкт згенерував 121 МВт·год
              чистої енергії, що дозволило замовнику покрити 78% власного
              споживання. Прогноз окупності — 4.3 роки.
            </p>

            <div className="mt-12 flex items-center justify-between rounded-2xl border border-ink-100 bg-ink-50 px-6 py-4">
              <div className="flex items-center gap-3 text-sm text-ink-700">
                <Calendar className="h-4 w-4 text-brand" />
                {formatDate(article.date)} · RSF Solar
              </div>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-brand">
                <Share2 className="h-4 w-4" />
                Поділитися
              </button>
            </div>
          </article>

          {others.length > 0 && (
            <div className="mx-auto mt-20 max-w-5xl">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold text-ink-900">
                  Інші публікації
                </h3>
                <Link
                  href="/novyny"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Всі новини
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/novyny/${o.slug}`}
                    className="group overflow-hidden rounded-3xl border border-ink-100 bg-white card-hover"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={o.image}
                        alt={o.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-wider text-ink-500">
                        {formatDate(o.date)}
                      </p>
                      <p className="mt-2 line-clamp-2 font-display text-base font-semibold text-ink-900">
                        {o.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <CTABlock />
    </>
  );
}
