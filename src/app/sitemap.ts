import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://latconservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/agenda`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
