import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /apply is retired and redirects home.
      disallow: ["/apply"],
    },
    sitemap: [
      "https://tedxhuntingvalley.com/sitemap.xml",
      "https://tedxhuntingvalley.com/video-sitemap.xml",
    ],
  };
}
