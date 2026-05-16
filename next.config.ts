import type { NextConfig } from "next";

/** `output: "export"` genera `out/` para Azure Static Web Apps (sin servidor Node en SWA). */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
