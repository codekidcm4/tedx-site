import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tedxhuntingvalley.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/speakers`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/apply`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/press`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/media`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/social`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];
}
