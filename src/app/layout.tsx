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
  metadataBase: new URL("https://rsfsolar.com"),
  title: {
    default: "ROYALSUNFLOWER — Альтернативна енергетика в Україні",
    template: "%s | ROYALSUNFLOWER",
  },
  description:
    "ROYALSUNFLOWER — будівництво сонячних електростанцій, монтаж БЕСС, резервні генератори та електромонтажні роботи в Україні та Європі. Понад 240 реалізованих об'єктів.",
  keywords: [
    "сонячні електростанції",
    "СЕС під ключ",
    "БЕСС",
    "BESS",
    "альтернативна енергетика",
    "ROYALSUNFLOWER",
    "сонячні панелі",
    "монтаж СЕС",
  ],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://rsfsolar.com",
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
  return (
    <html lang="uk" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-white text-ink-900 antialiased">
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
