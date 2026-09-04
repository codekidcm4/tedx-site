import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tedxhuntingvalley.com";
  // The event is over and the talks are published; the site is in its final state.
  const final = new Date("2026-09-04");

  return [
    { url: base,                lastModified: final, changeFrequency: "yearly",  priority: 1.0 },
    { url: `${base}/talks`,     lastModified: final, changeFrequency: "yearly",  priority: 0.9 },
    { url: `${base}/speakers`,  lastModified: final, changeFrequency: "yearly",  priority: 0.9 },
    { url: `${base}/schedule`,  lastModified: final, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/press`,     lastModified: final, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${base}/media`,     lastModified: final, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/about`,     lastModified: final, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${base}/social`,    lastModified: final, changeFrequency: "yearly",  priority: 0.4 },
  ];
}
