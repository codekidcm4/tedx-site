import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tedxhuntingvalley.com";
  const today = new Date("2026-05-08");

  return [
    { url: base,                    lastModified: today, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/speakers`,      lastModified: today, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/apply`,         lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/press`,         lastModified: today, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/about`,         lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/media`,         lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/social`,        lastModified: today, changeFrequency: "weekly",  priority: 0.6 },
  ];
}
