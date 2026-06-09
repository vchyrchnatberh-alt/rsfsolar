import type { Metadata } from "next";
import { Bell, BookOpen, Coffee, GraduationCap, Heart, Trophy } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { CareerForm } from "@/components/about/CareerForm";

export const metadata: Metadata = {
  title: "Кар'єра",
  description:
    "Робота в ROYALSUNFLOWER — приєднуйтесь до команди інженерів, що розвиває альтернативну енергетику в Україні та Європі.",
};

const perks = [
  { icon: Trophy, title: "Прозора система бонусів", desc: "Від результату — без стелі" },
  { icon: GraduationCap, title: "Навчання та сертифікації", desc: "Huawei, BYD, Sungrow за рахунок компанії" },
  { icon: Heart, title: "Медичне страхування", desc: "Для співробітника та родини" },
  { icon: Coffee, title: "Гнучкий графік", desc: "Гібрид: офіс / польові / віддалено" },
  { icon: BookOpen, title: "Сучасний стек", desc: "AutoCAD, PVsyst, MATLAB, власна SCADA" },
  { icon: Bell, title: "Внутрішні івенти", desc: "Тімбілдинги, інженерні мітапи, форуми" },
];

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Кар'єра"
        title="Будуйте енергонезалежне майбутнє разом з ROYALSUNFLOWER"
        description="Ми шукаємо інженерів, проектувальників, електромонтажників та менеджерів. Якщо вас драйвить альтернативна енергетика — нам по дорозі."
        breadcrumbs={[
          { label: "Про компанію", href: "/pro-nas" },
          { label: "Кар'єра" },
        ]}
      />

      <section className="bg-white pb-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="heading text-display-md text-ink-900 text-balance">
                Чому в ROYALSUNFLOWER
              </h2>
              <p className="mt-5 text-ink-600 leading-relaxed">
                Команда ROYALSUNFLOWER — це 45 спеціалістів, які люблять інженерію та
                поважають енергонезалежність. Працюємо за прозорими процесами,
                цінуємо результат, інвестуємо в розвиток співробітників.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {perks.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-ink-100 bg-ink-50 p-4"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 font-display text-sm font-semibold text-ink-900">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-500">{p.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-brand/20 bg-brand/5 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-brand">
                  Слідкуйте за оновленнями
                </p>
                <p className="mt-2 text-sm text-ink-700">
                  Підпишіться на наш Telegram-канал — там ми публікуємо
                  актуальні вакансії та інженерні матеріали.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <CareerForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
