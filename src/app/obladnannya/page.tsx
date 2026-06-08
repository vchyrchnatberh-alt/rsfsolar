import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { EquipmentCatalog } from "@/components/equipment/EquipmentCatalog";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata: Metadata = {
  title: "Каталог обладнання",
  description:
    "Каталог обладнання RSF: сонячні панелі, інвертори, акумуляторні системи та генератори від провідних світових виробників.",
};

export default function EquipmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Каталог обладнання"
        title="Обладнання Tier-1 для альтернативної енергетики"
        description="Прямі контракти з Huawei, BYD, Jinko Solar, LONGi, Sungrow та іншими виробниками. Кожна позиція — з підтвердженою якістю і повним сервісом."
        breadcrumbs={[{ label: "Каталог" }]}
      />

      <section className="bg-white pb-20">
        <Container>
          <EquipmentCatalog />
          <p className="mt-10 max-w-2xl text-sm text-ink-500">
            * Ціни на обладнання залежать від комплектації та обсягу замовлення.
            Для отримання комерційної пропозиції зв'яжіться з відділом продажу.
          </p>
        </Container>
      </section>

      <CTABlock
        title="Потрібна допомога з підбором обладнання?"
        description="Інженер RSF безкоштовно підбере оптимальну конфігурацію під ваш об'єкт і бюджет."
      />
    </>
  );
}
