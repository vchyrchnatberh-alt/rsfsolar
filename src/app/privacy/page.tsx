import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description:
    "Політика конфіденційності ROYALSUNFLOWER — як ми збираємо, обробляємо та зберігаємо ваші персональні дані.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Документ"
        title="Політика конфіденційності"
        description="Цей документ описує, як ROYALSUNFLOWER збирає, обробляє та зберігає персональні дані користувачів сайту та клієнтів."
        breadcrumbs={[{ label: "Політика конфіденційності" }]}
      />

      <section className="bg-white pb-24">
        <Container>
          <article className="prose-custom mx-auto max-w-3xl space-y-6 text-ink-700 leading-relaxed">
            <p>
              ROYALSUNFLOWER дотримується вимог Закону України "Про захист
              персональних даних" та GDPR при роботі з відвідувачами сайту з
              ЄС. Ми збираємо мінімально необхідний обсяг даних та
              використовуємо їх виключно для зв'язку з клієнтом і
              підготовки комерційної пропозиції.
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink-900">
              Які дані ми збираємо
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Ім'я та прізвище (для звернення)</li>
              <li>Контактні дані: телефон, email</li>
              <li>Інформація про об'єкт (тип, потужність, локація)</li>
              <li>Технічна інформація: cookies, IP-адреса</li>
            </ul>
            <h2 className="font-display text-2xl font-semibold text-ink-900">
              Як ми використовуємо дані
            </h2>
            <p>
              Виключно для зв'язку, підготовки комерційної пропозиції,
              надсилання технічної інформації за вашою згодою. Ми не передаємо
              ваші дані третім сторонам без вашої письмової згоди.
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink-900">
              Ваші права
            </h2>
            <p>
              Ви маєте право запросити, виправити або видалити ваші персональні
              дані. Для цього напишіть нам на Sales@rsf.com.ua.
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
