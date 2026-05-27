import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { ServicesAccordion } from "@/components/services/ServicesAccordion";
import { CTABlock } from "@/components/shared/CTABlock";
import { DesignProcess } from "@/components/home/DesignProcess";

export const metadata: Metadata = {
  title: "Послуги",
  description:
    "Послуги RSF Solar — будівництво СЕС, монтаж BESS, резервні генератори, електромонтажні роботи та сервісне обслуговування об'єктів альтернативної енергетики.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Послуги"
        title="Інженерні рішення для альтернативної енергетики"
        description="Закриваємо повний цикл потреб бізнесу: проектування, постачання, монтаж, пусконалагодження та сервіс. Об'єкти від 30 кВт до 10 МВт."
        breadcrumbs={[{ label: "Послуги" }]}
      />

      <section className="bg-white pb-20">
        <Container>
          <ServicesAccordion />
        </Container>
      </section>

      <DesignProcess />
      <CTABlock />
    </>
  );
}
