import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { SolarCalculator } from "@/components/calculator/SolarCalculator";

export const metadata: Metadata = {
  title: "Калькулятор сонячної станції",
  description:
    "Онлайн-калькулятор сонячної електростанції: розрахуйте потужність, вартість, окупність та економію за 30 секунд. Точні цифри для України.",
};

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Калькулятор"
        title="Скільки коштуватиме ваша сонячна станція"
        description="Заповніть 4 поля і за 30 секунд отримайте орієнтовну потужність, вартість, окупність та економію. Розрахунок для реалій українського ринку 2026 року."
        breadcrumbs={[{ label: "Калькулятор" }]}
      />

      <section className="bg-white pb-24">
        <Container>
          <SolarCalculator />
        </Container>
      </section>
    </>
  );
}
