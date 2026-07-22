import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://maslow.ai";
  const routes = [
    "",
    "/services",
    "/assessment",
    "/about",
    "/contact",
    "/blog",
    "/blog/context-engineering",
    "/case-studies",
    "/case-studies/infinite-ai-os",
    "/case-studies/agenthub",
    "/concepts/agentic-harness",
    "/concepts/hybrid-rag",
    "/concepts/context-engineering",
    "/concepts/local-ai",
    "/concepts/virtual-ai-employees",
    "/concepts/skills-and-gateways",
    "/campaigns/virtual-ai-employees",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
