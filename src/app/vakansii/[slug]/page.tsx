import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Banknote,
  Clock,
  Briefcase,
  Calendar,
  Send,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { CTABlock } from "@/components/shared/CTABlock";
import { vacancies } from "@/lib/vacancies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return vacancies.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = vacancies.find((v) => v.slug === slug);
  if (!vacancy) return {};
  return {
    title: vacancy.title,
    description: vacancy.shortDescription,
  };
}

export default async function VacancyPage({ params }: PageProps) {
  const { slug } = await params;
  const vacancy = vacancies.find((v) => v.slug === slug);
  if (!vacancy) notFound();

  return (
    <>
      <PageHero
        eyebrow={vacancy.department}
        title={vacancy.title}
        description={vacancy.shortDescription}
        breadcrumbs={[
          { label: "Про компанію", href: "/pro-nas" },
          { label: "Вакансії", href: "/vakansii" },
          { label: vacancy.title },
        ]}
      />

      <section className="bg-white pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Main content */}
            <div className="lg:col-span-8">
              {/* Meta badges */}
              <div className="mb-8 flex flex-wrap gap-3">
                {vacancy.location && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-ink-50 px-4 py-2 text-sm text-ink-700">
                    <MapPin className="h-4 w-4 text-brand" />
                    {vacancy.location}
                  </span>
                )}
                {vacancy.salary && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-ink-50 px-4 py-2 text-sm text-ink-700">
                    <Banknote className="h-4 w-4 text-brand" />
                    {vacancy.salary}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-ink-50 px-4 py-2 text-sm text-ink-700">
                  <Clock className="h-4 w-4 text-brand" />
                  {vacancy.employment}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-ink-50 px-4 py-2 text-sm text-ink-700">
                  <Briefcase className="h-4 w-4 text-brand" />
                  {vacancy.experience}
                </span>
              </div>

              {/* Description */}
              <div className="prose-brand">
                <h2 className="heading text-2xl text-ink-900">Опис вакансії</h2>
                <p className="mt-4 leading-relaxed text-ink-600">
                  {vacancy.description}
                </p>

                <h3 className="heading mt-10 text-xl text-ink-900">
                  Обов&apos;язки
                </h3>
                <ul className="mt-4 space-y-3">
                  {vacancy.responsibilities.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-3 text-ink-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {r}
                    </li>
                  ))}
                </ul>

                <h3 className="heading mt-10 text-xl text-ink-900">Вимоги</h3>
                <ul className="mt-4 space-y-3">
                  {vacancy.requirements.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-3 text-ink-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {r}
                    </li>
                  ))}
                </ul>

                <h3 className="heading mt-10 text-xl text-ink-900">
                  Ми пропонуємо
                </h3>
                <ul className="mt-4 space-y-3">
                  {vacancy.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-ink-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                {/* Apply card */}
                <div className="overflow-hidden rounded-[24px] border border-ink-100 bg-white p-6 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]">
                  <h3 className="font-display text-lg font-semibold text-ink-900">
                    Відгукнутися на вакансію
                  </h3>
                  <p className="mt-2 text-sm text-ink-500">
                    Надішліть своє резюме та ми зв&apos;яжемося з вами протягом
                    3 робочих днів.
                  </p>
                  <Link
                    href="/pro-nas/kariera"
                    className="btn-primary mt-5 w-full justify-center py-3.5 text-base"
                  >
                    <Send className="h-4 w-4" />
                    Надіслати резюме
                  </Link>
                </div>

                {/* Company info card */}
                <div className="rounded-[24px] border border-ink-100 bg-ink-50/50 p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-ink-400">
                    Компанія
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-ink-900">
                    ROYALSUNFLOWER
                  </p>
                  <p className="mt-2 text-sm text-ink-500">
                    Українська інжинірингова компанія з 12-річним досвідом
                    будівництва об&apos;єктів альтернативної енергетики.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-ink-600">
                    <Calendar className="h-4 w-4 text-brand" />
                    <span>
                      Опубліковано:{" "}
                      {new Date(vacancy.publishedAt).toLocaleDateString(
                        "uk-UA",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Back link */}
          <div className="mt-12">
            <Link
              href="/vakansii"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Усі вакансії
            </Link>
          </div>
        </Container>
      </section>

      <CTABlock
        title="Маєте запитання?"
        description="Зверніться до нашого HR-відділу для отримання додаткової інформації про вакансію та умови роботи."
        primaryLabel="Зв'язатися з нами"
        primaryHref="/kontakty"
      />
    </>
  );
}
