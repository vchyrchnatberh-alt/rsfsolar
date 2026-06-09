import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { CTABlock } from "@/components/shared/CTABlock";
import { PartnersGrid } from "@/components/about/PartnersGrid";

export const metadata: Metadata = {
  title: "Партнери",
  description:
    "Партнери ROYALSUNFLOWER — Huawei, BYD, Jinko Solar, LONGi, Sungrow та інші Tier-1 виробники обладнання.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Партнери"
        title="Працюємо з лідерами індустрії"
        description="Прямі контракти з провідними виробниками обладнання гарантують найкращі ціни, оригінальність та сервіс для наших клієнтів."
        breadcrumbs={[
          { label: "Про компанію", href: "/pro-nas" },
          { label: "Партнери" },
        ]}
      />

      <section className="bg-white pb-20">
        <Container>
          <PartnersGrid />
        </Container>
      </section>

      <CTABlock
        title="Хочете стати нашим партнером?"
        description="Запрошуємо дистриб'юторів, виробників та проектні бюро до взаємовигідної співпраці."
        primaryLabel="Запропонувати співпрацю"
      />
    </>
  );
}
