import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata: Metadata = {
  title: "Проекти",
  description:
    "Реалізовані проекти RSF Solar — комерційні, промислові та приватні СЕС в Україні, Польщі та Німеччині.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Проекти"
        title="Об'єкти, які щодня генерують альтернативну енергію"
        description="Більше 240 реалізованих проектів — від приватних домогосподарств до промислових СЕС потужністю 2.5 МВт. Працюємо в Україні та Європі."
        breadcrumbs={[{ label: "Проекти" }]}
      />

      <section className="bg-white pb-20">
        <Container>
          <ProjectsGrid />
        </Container>
      </section>

      <CTABlock />
    </>
  );
}
