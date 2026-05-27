import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center bg-white pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-100/80 via-brand-50/60 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-grid-light bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]" />
      </div>
      <Container className="text-center">
        <p className="font-display text-[clamp(6rem,15vw,12rem)] font-bold leading-none gradient-text">
          404
        </p>
        <h1 className="heading mt-4 text-display-md text-ink-900">
          Сторінку не знайдено
        </h1>
        <p className="mx-auto mt-5 max-w-md text-ink-500">
          Можливо, посилання застаріло або сторінка переїхала. Поверніться на
          головну, щоб продовжити.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" />
            На головну
          </Link>
          <Link href="/kontakty" className="btn-secondary">
            Зв'язатися з нами
          </Link>
        </div>
      </Container>
    </section>
  );
}
