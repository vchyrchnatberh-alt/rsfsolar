import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ContactsContent } from "@/components/contacts/ContactsContent";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Контакти RSF Solar — відділ продажу, сервіс, головний офіс у Києві. Telegram, Viber, корпоративна пошта.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакти"
        title="Зв'яжіться з нами зручним для вас способом"
        description="Відділ продажу, сервісна служба, офіси та форма зворотного зв'язку. Відповідаємо протягом 24 годин."
        breadcrumbs={[{ label: "Контакти" }]}
      />
      <ContactsContent />
    </>
  );
}
