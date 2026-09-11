import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/routes";
export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({ url: `https://maslow.ai${path === "/" ? "" : path}`, lastModified: "2026-09-11", changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 }));
}
