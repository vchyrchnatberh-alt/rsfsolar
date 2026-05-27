import { Hero } from "@/components/home/Hero";
import { ServicesCarousel } from "@/components/home/ServicesCarousel";
import { DesignProcess } from "@/components/home/DesignProcess";
import { AIMonitoring } from "@/components/home/AIMonitoring";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { ConsultationForm } from "@/components/home/ConsultationForm";
import { CooperationCTA } from "@/components/home/CooperationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="posluhy" className="scroll-mt-24">
        <ServicesCarousel />
      </section>

      <DesignProcess />

      <AIMonitoring />

      <section id="proekty" className="scroll-mt-24">
        <ProjectsPreview />
      </section>

      <PartnersStrip />

      <section id="kontakty" className="scroll-mt-24">
        <ConsultationForm />
      </section>

      <CooperationCTA />
    </>
  );
}
