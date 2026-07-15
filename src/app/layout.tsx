import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rsf.com.ua"),
  title: {
    default:
      "Сонячні панелі та СЕС під ключ в Україні — Royal Sun Flower",
    template: "%s | Royal Sun Flower",
  },
  description:
    "Встановлення сонячних електростанцій під ключ від $850/кВт. Монтаж сонячних панелей для дому та бізнесу, гібридні СЕС з БЕСС, гарантія 25 років. Понад 240 об'єктів по всій Україні.",
  keywords: [
    // Основні запити
    "сонячні панелі",
    "сонячні панелі Україна",
    "сонячні панелі ціна",
    "сонячні електростанції",
    "сонячні електростанції під ключ",
    "СЕС для дому",
    "СЕС для бізнесу",
    "СЕС під ключ",
    "монтаж сонячних панелей",
    "монтаж СЕС",
    "встановлення сонячних панелей",
    "купити сонячні панелі",
    "сонячна батарея на дах",
    // Обладнання
    "БЕСС",
    "BESS",
    "накопичувач енергії",
    "гібридна сонячна станція",
    "гібридна СЕС",
    "акумулятори для дому",
    // Тарифи і послуги
    "зелений тариф",
    "альтернативна енергетика",
    "автономне живлення",
    "резервне живлення",
    "проектування СЕС",
    // Регіони
    "сонячні панелі Київ",
    "сонячні панелі Житомир",
    "сонячні панелі Львів",
    "сонячні панелі Дніпро",
    "сонячні панелі Одеса",
    // Бренди-партнери (люди шукають конкретні бренди)
    "LONGi Україна",
    "Huawei інвертор",
    "Deye інвертор",
    // Компанія
    "Royal Sun Flower",
    "ROYALSUNFLOWER",
  ],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://rsf.com.ua",
    title: "ROYALSUNFLOWER — Альтернативна енергетика в Україні",
    description:
      "Будівництво СЕС, BESS, резервне живлення та електромонтажні роботи від інженерів ROYALSUNFLOWER.",
    siteName: "ROYALSUNFLOWER",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROYALSUNFLOWER — Альтернативна енергетика",
    description:
      "Будівництво СЕС, BESS, резервне живлення та електромонтажні роботи.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#074EA2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Royal Sun Flower",
    alternateName: "ROYALSUNFLOWER",
    description:
      "Встановлення сонячних електростанцій під ключ, монтаж сонячних панелей для дому та бізнесу, гібридні СЕС з БЕСС.",
    url: "https://rsf.com.ua",
    telephone: ["+380668042523", "+380991545432"],
    email: "Sales@rsf.com.ua",
    address: {
      "@type": "PostalAddress",
      streetAddress: "вул. Рильського, 9",
      addressLocality: "Житомир",
      addressCountry: "UA",
    },
    areaServed: {
      "@type": "Country",
      name: "Україна",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
    sameAs: [],
  };

  return (
    <html lang="uk" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-white text-ink-900 antialiased">
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GTGP4TSX5N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GTGP4TSX5N');
          `}
        </Script>

        <ScrollProgress />
        <Header />
        <main className="overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
