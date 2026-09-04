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
    // YouTube poster frames for the click-to-play talk embeds.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  // The event is over. Every pre-event and organizer-only route has been retired; old bookmarks,
  // QR tickets, shared links, and search results land somewhere useful instead of a 404.
  // Redirects are evaluated before the filesystem, so these catch the old public PDF path too.
  async redirects() {
    return [
      { source: "/apply", destination: "/", permanent: true },
      { source: "/application.pdf", destination: "/", permanent: true },
      { source: "/tickets", destination: "/talks", permanent: true },
      { source: "/tickets/:path*", destination: "/talks", permanent: true },
      { source: "/ticket/:path*", destination: "/talks", permanent: true },
      { source: "/scan", destination: "/talks", permanent: true },
      { source: "/setup", destination: "/", permanent: true },
      { source: "/sponsors", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
