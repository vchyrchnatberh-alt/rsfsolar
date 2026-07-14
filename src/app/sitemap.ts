import type { MetadataRoute } from "next";
import { news, services } from "@/lib/data";
import { vacancies } from "@/lib/vacancies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rsf.com.ua";
  const now = new Date();

  const staticPaths = [
    "",
    "/posluhy",
    "/proekty",
    "/kalkulyator",
    "/pro-nas",
    "/pro-nas/sertyfikaty",
    "/pro-nas/partnery",
    "/pro-nas/kariera",
    "/vakansii",
    "/forum",
    "/obladnannya",
    "/novyny",
    "/kontakty",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${base}/posluhy/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...news.map((n) => ({
      url: `${base}/novyny/${n.slug}`,
      lastModified: new Date(n.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...vacancies.map((v) => ({
      url: `${base}/vakansii/${v.slug}`,
      lastModified: new Date(v.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
