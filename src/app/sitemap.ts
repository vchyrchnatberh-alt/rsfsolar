import type { MetadataRoute } from "next";
import { news, services } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rsfsolar.com";
  const now = new Date();

  const staticPaths = [
    "",
    "/posluhy",
    "/proekty",
    "/pro-nas",
    "/pro-nas/sertyfikaty",
    "/pro-nas/partnery",
    "/pro-nas/kariera",
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
  ];
}
