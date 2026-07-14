import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { CTABlock } from "@/components/shared/CTABlock";
import { JobList } from "@/components/vacancies/JobList";

export const metadata: Metadata = {
  title: "Вакансії",
  description:
    "Актуальні вакансії компанії ROYALSUNFLOWER — приєднуйтесь до команди лідерів альтернативної енергетики в Україні.",
};

export default function VacanciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Кар'єра"
        title="Приєднуйся до команди ROYALSUNFLOWER"
        description="Ми шукаємо амбітних професіоналів, які готові будувати енергонезалежне майбутнє разом з нами. Ознайомтесь з нашими актуальними вакансіями."
        breadcrumbs={[
          { label: "Про компанію", href: "/pro-nas" },
          { label: "Вакансії" },
        ]}
      />

      <section className="bg-white pb-20">
        <Container>
          <JobList />
        </Container>
      </section>

      <CTABlock
        title="Не знайшли свою вакансію?"
        description="Надішліть своє резюме — ми завжди раді талановитим спеціалістам і зв'яжемося з вами, коли з'явиться відповідна позиція."
        primaryLabel="Надіслати резюме"
        primaryHref="/pro-nas/kariera"
      />
    </>
  );
}
