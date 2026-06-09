import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { NewsGrid } from "@/components/news/NewsGrid";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata: Metadata = {
  title: "Новини",
  description:
    "Новини альтернативної енергетики, кейси та інженерні матеріали від команди ROYALSUNFLOWER.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Новини та блог"
        title="Інсайти, кейси та новини індустрії"
        description="Запуски нових проектів, експертні матеріали від інженерів ROYALSUNFLOWER та новини світу альтернативної енергетики."
        breadcrumbs={[{ label: "Новини" }]}
      />

      <section className="bg-white pb-20">
        <Container>
          <NewsGrid />
        </Container>
      </section>

      <CTABlock />
    </>
  );
}
