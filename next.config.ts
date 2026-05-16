import type { NextConfig } from "next";

/** `output: "export"` genera `out/` para Azure Static Web Apps (sin servidor Node en SWA). */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    // Evita que el lint de artefactos (.next) falle el build en CI
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
