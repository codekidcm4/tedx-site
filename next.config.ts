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
  // The student application program is retired. Permanently send any old bookmarks, shared links,
  // or search results for /apply and the application PDF to the home page instead of a 404.
  // Redirects are evaluated before the filesystem, so these catch the public PDF path too.
  async redirects() {
    return [
      { source: "/apply", destination: "/", permanent: true },
      { source: "/application.pdf", destination: "/", permanent: true },
      // Ticket sales are over; the box office now points at the talks.
      { source: "/tickets", destination: "/talks", permanent: false },
    ];
  },
};

export default nextConfig;
