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
};

export default nextConfig;
