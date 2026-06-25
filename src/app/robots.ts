import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /setup is an organizer-only admin guide; /apply is retired and now redirects home.
      disallow: ["/setup", "/apply"],
    },
    sitemap: "https://tedxhuntingvalley.com/sitemap.xml",
  };
}
