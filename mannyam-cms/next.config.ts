import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this project folder so Next.js does not get
  // confused by a stray package-lock.json in a parent directory on the VPS.
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    // Allow production builds to complete even if ESLint has errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Do not fail the production build on type errors. Type-check separately
    // in development with `npx tsc --noEmit`.
    ignoreBuildErrors: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
