import type { Metadata } from "next";
import { ForumInvitation } from "@/components/forum/ForumInvitation";

export const metadata: Metadata = {
  title: "Всеукраїнський енергетичний форум — 03 липня 2026",
  description:
    "Енергетична безпека країни. Житомирська область. Ключова подія регіону для інвесторів, підприємців та представників державного сектору — 03 липня 2026, Звягель Центр.",
  openGraph: {
    title: "Всеукраїнський енергетичний форум — 03 липня 2026",
    description:
      "Енергетична безпека країни. Житомирська область. 200+ учасників, 10+ спікерів. Звягель Центр.",
    type: "website",
  },
};

export default function ForumPage() {
  return <ForumInvitation />;
}
