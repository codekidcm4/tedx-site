import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project directory.
  // This prevents Next.js from being confused by other package-lock.json
  // files higher up in the filesystem (e.g. ~/package-lock.json).
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The student application program is retired. Permanently send any old bookmarks, shared links,
  // or search results for /apply and the application PDF to the home page instead of a 404.
  // Redirects are evaluated before the filesystem, so these catch the public PDF path too.
  async redirects() {
    return [
      { source: "/apply", destination: "/", permanent: true },
      { source: "/application.pdf", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
