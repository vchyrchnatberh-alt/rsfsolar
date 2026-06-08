import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { CertificatesGallery } from "@/components/about/CertificatesGallery";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata: Metadata = {
  title: "Сертифікати",
  description:
    "Сертифікати та ліцензії RSF — ISO 9001, ISO 14001, авторизація Huawei, BYD, Jinko та інших виробників.",
};

export default function CertificatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Сертифікати"
        title="Підтверджена якість та компетенція"
        description="Колекція сертифікатів, авторизацій та ліцензій RSF — від міжнародних стандартів якості до партнерських статусів виробників обладнання."
        breadcrumbs={[
          { label: "Про компанію", href: "/pro-nas" },
          { label: "Сертифікати" },
        ]}
      />

      <section className="bg-white pb-20">
        <Container>
          <CertificatesGallery />
        </Container>
      </section>

      <CTABlock />
    </>
  );
}
