import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { concepts } from "@/lib/content/home";
import {
  blogArticles,
  featuredPost,
  getBlogArticle,
  getAllBlogSlugs,
  publishedArticles,
} from "@/lib/content/blog";
import {
  agentHub,
  caseStudiesIndex,
  infiniteAiOs,
} from "@/lib/content/case-studies";
import {
  faqItems,
  manufacturingBottlenecks,
  manufacturingMonday,
} from "@/lib/content/trust";
import { startingPoints } from "./starting-points";
import { heroAgents, journeyChapters, workflowRecipes } from "./ai-os-home";
import { legacyDestinations, publicRoutes } from "@/lib/routes";
import { foundationWeeks, twoDoors } from "@/lib/content/engagement";
import { conceptFailures } from "@/lib/content/explainers";
import {
  architectureCapabilities,
  architectureFitBoundaries,
  architectureMapEdges,
  architectureMapNodes,
  architectureScenarioOverlays,
  architectureViews,
  buyerArchitectureStages,
  workflowMapperPatterns,
  workflowMapperQuestions,
} from "@/lib/content/architecture";
import {
  formatPressDate,
  getAllPressSlugs,
  getPressRelease,
  publishedPressReleases,
} from "@/lib/content/press";
import {
  actionTheme,
  colors,
  contactEmail,
  founderHeadshot,
  socialLinks,
} from "@/lib/brand";

function sourceFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(entry.name) ? [path] : [];
  });
}

function styleFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    if (entry.isDirectory()) return styleFiles(path);
    return entry.name.endsWith(".css") ? [path] : [];
  });
}

function publicRouteExists(href: string): boolean {
  const [pathname] = href.split("#");

  if (pathname.startsWith("/blog/")) {
    return Boolean(getBlogArticle(pathname.replace("/blog/", "")));
  }

  return existsSync(join("app", pathname.replace(/^\//, ""), "page.tsx"));
}

describe("content modules", () => {




  it("offers independently scoped starting points with useful destinations", () => {
    expect(startingPoints.map(point => point.id)).toEqual(["discover", "setup", "knowledge", "workflows"]);
    startingPoints.forEach(point => {
      expect(publicRouteExists(point.href)).toBe(true);
      expect(point.result.length).toBeGreaterThan(40);
      expect(point.status).toMatch(/PAID|SCOPED|CLIENT/);
    });
  });

  it("keeps the seven teaching moments and multi-agent promise", () => {
    expect(journeyChapters).toHaveLength(7);
    expect(new Set(journeyChapters.map(chapter => chapter.key)).size).toBe(7);
    expect(heroAgents.map(agent => agent.key)).toEqual(["openai", "claude", "hermes"]);
    expect(Object.keys(workflowRecipes)).toHaveLength(3);
    const copy = JSON.stringify(journeyChapters);
    expect(copy).toMatch(/SharePoint/);
    expect(copy).toMatch(/Qdrant/);
    expect(copy).toMatch(/Semantica/i);
    expect(copy).toMatch(/approv/i);
  });

  it("architecture views and scenarios cover the shared operating system", () => {
    const capabilityIds = architectureCapabilities.map(({ id }) => id);
    const capabilityIdSet = new Set<string>(capabilityIds);
    const nodeIds = architectureMapNodes.map(({ id }) => id);
    expect(architectureCapabilities).toHaveLength(6);
    expect(new Set(capabilityIds)).toHaveLength(6);
    expect(new Set(nodeIds)).toHaveLength(architectureMapNodes.length);
    expect(architectureViews.map(({ id }) => id)).toEqual([
      "run",
      "control",
      "improve",
    ]);
    expect(architectureScenarioOverlays).toHaveLength(3);

    architectureScenarioOverlays.forEach((scenario) => {
      expect(scenario.steps.map(({ capabilityId }) => capabilityId)).toEqual(
        capabilityIds,
      );
      expect(scenario.statusLabel).toMatch(/not a client result/i);
      expect(scenario.relatedHref).toMatch(/^\/concepts\//);
      if (scenario.proofHref) {
        expect(scenario.proofHref).toMatch(/^\/case-studies\//);
      }

      architectureViews.forEach((view) => {
        view.nodeIds.forEach((nodeId) => {
          const coveredByStep =
            view.id === "run" && capabilityIdSet.has(nodeId);
          expect(
            coveredByStep || Boolean(scenario.examples[view.id]?.[nodeId]),
            `${scenario.id} does not explain ${view.id}:${nodeId}`,
          ).toBe(true);
        });
      });
    });

    architectureViews.forEach((view) => {
      expect(view.nodeIds).toContain(view.defaultNodeId);
      view.nodeIds.forEach((nodeId) => expect(nodeIds).toContain(nodeId));
    });
    architectureMapEdges.forEach((edge) => {
      expect(nodeIds).toContain(edge.from);
      expect(nodeIds).toContain(edge.to);
      const view = architectureViews.find(({ id }) => id === edge.viewId);
      expect(view?.nodeIds).toContain(edge.from);
      expect(view?.nodeIds).toContain(edge.to);
    });

    const improveView = architectureViews.find(({ id }) => id === "improve");
    expect(improveView?.statusLabel).toMatch(/not a production claim/i);
    improveView?.nodeIds.forEach((nodeId) => {
      expect(
        architectureMapNodes.find(({ id }) => id === nodeId)?.claimStatus,
      ).toMatch(/not a production claim/i);
    });
  });

  it("keeps the buyer path short, categorical, and evidence-labeled", () => {
    expect(buyerArchitectureStages).toHaveLength(4);
    expect(architectureFitBoundaries).toHaveLength(3);
    expect(workflowMapperQuestions.map(({ id }) => id)).toEqual([
      "deliverable",
      "owner",
      "source",
      "boundary",
    ]);
    workflowMapperQuestions.forEach((question) => {
      expect(question.options).toHaveLength(4);
    });

    const deliverableIds = workflowMapperQuestions
      .find(({ id }) => id === "deliverable")
      ?.options.map(({ id }) => id);
    expect(workflowMapperPatterns.map(({ deliverableId }) => deliverableId)).toEqual(
      deliverableIds,
    );
    workflowMapperPatterns.forEach((pattern) => {
      expect(["PRODUCTION ENGAGEMENT", "CLIENT IMPLEMENTATION", "ILLUSTRATIVE PATTERN"]).toContain(
        pattern.evidenceStatus,
      );
      expect(pattern.evidenceDescription.length).toBeGreaterThan(40);
      expect(pattern.evidenceLabel.length).toBeGreaterThan(10);
      expect(publicRouteExists(pattern.evidenceHref)).toBe(true);
    });
  });

  it("resolves every architecture deep dive and evidence destination", () => {
    architectureMapNodes.forEach((node) => {
      if (node.relatedHref) expect(publicRouteExists(node.relatedHref)).toBe(true);
    });

    architectureScenarioOverlays.forEach((scenario) => {
      expect(publicRouteExists(scenario.relatedHref)).toBe(true);
      if (scenario.proofHref) {
        expect(publicRouteExists(scenario.proofHref)).toBe(true);
      }
    });
  });

  it("keeps product-specific research terms out of architecture content", () => {
    const content = JSON.stringify({
      architectureCapabilities,
      architectureMapNodes,
      architectureScenarioOverlays,
      architectureViews,
    });

    ["Her" + "mes", "C" + "LI", "T" + "UI", "bill" + "ing", "pe" + "ts"].forEach(
      (term) => {
        expect(content).not.toMatch(new RegExp(`\\b${term}\\b`, "i"));
      },
    );
  });

  it("blog article generates for featured slug", () => {
    expect(getAllBlogSlugs()).toContain("context-engineering");
    const article = getBlogArticle("context-engineering");
    expect(article?.title).toMatch(/Context engineering/i);
    expect(article?.body.length).toBeGreaterThan(3);
  });

  it("case studies index has real engagement hrefs", () => {
    expect(caseStudiesIndex.length).toBeGreaterThanOrEqual(2);
    const linked = caseStudiesIndex.filter((c) => Boolean(c.href));
    expect(linked.some((c) => c.href?.includes("infinite-ai-os"))).toBe(true);
    expect(linked.some((c) => c.href?.includes("agenthub"))).toBe(true);
  });

  it("only publishes articles that have a complete body", () => {
    expect(getAllBlogSlugs()).toEqual([
      "what-makes-an-ai-employee-work",
      "context-memory-and-skills",
      "permissions-approvals-audit-trails",
      "context-engineering",
    ]);
    getAllBlogSlugs().forEach((slug) => {
      expect(getBlogArticle(slug)?.body.length).toBeGreaterThan(10);
    });
    expect(featuredPost.featured).toBe(true);
    expect(publishedArticles.every((article) => article.published)).toBe(true);
    expect(publishedArticles).toHaveLength(
      Object.values(blogArticles).filter((article) => article.published).length,
    );
  });

  it("trust copy answers product, cost, compatibility, and data questions", () => {
    const questions = faqItems.map(item => item.q).join(" ");
    expect(questions).toMatch(/free/);
    expect(questions).toMatch(/replace Windows/);
    expect(questions).toMatch(/second brain/);
    expect(questions).toMatch(/download/);
    faqItems.forEach((f, i) => {
      expect(f.num).toBe(String(i + 1).padStart(2, "0"));
      expect(f.a.length).toBeGreaterThan(40);
    });
    expect(manufacturingBottlenecks).toHaveLength(3);
    expect(manufacturingMonday).toHaveLength(3);
    // Show-the-catch: the estimator scenario names what the approval caught.
    expect(manufacturingMonday[0].catchTrail).toHaveLength(3);
    expect(manufacturingMonday[0].catchTrail?.map((c) => c.tone)).toEqual([
      "flagged",
      "caught",
      "approved",
    ]);
  });

  it("every concept names its failure mode", () => {
    const slugs = concepts.map((c) => c.href.replace("/concepts/", ""));
    expect(Object.keys(conceptFailures).sort()).toEqual([...slugs].sort());
    Object.values(conceptFailures).forEach((f) => {
      expect(f.headline.length).toBeGreaterThan(10);
      expect(f.body.length).toBeGreaterThan(100);
    });
  });

  it("retired entry points lead to the new public journey", () => {
    Object.values(legacyDestinations).forEach(destination => {
      expect(publicRoutes).toContain(destination.split("#")[0]);
      expect(publicRouteExists(destination)).toBe(true);
    });
    expect(publicRoutes).not.toContain("/assessment");
  });

  it("engagement gates are surfaced, conservatively", () => {
    expect(twoDoors).toHaveLength(2);
    expect(foundationWeeks).toHaveLength(4);
    // The optional larger scope keeps explicit decision gates.
    expect(twoDoors[1].desc).toMatch(/weeks 2, 4, and 10/);
    expect(twoDoors[1].desc).not.toMatch(/billed/i);
    expect(foundationWeeks.filter((w) => w.gate)).toHaveLength(3);
  });

  it("publishes the current founder and company identity", () => {
    expect(contactEmail).toBe("rakesh@maslow.ai");
    expect(founderHeadshot.src).toBe("/assets/rakesh-david-founder.jpg");
    expect(socialLinks).toEqual({
      founderLinkedIn: "https://www.linkedin.com/in/rakeshdavid/",
      companyLinkedIn: "https://www.linkedin.com/company/letsgomaslow/",
      github: "https://github.com/letsgomaslow",
    });
  });

  it("keeps public source free of copy scaffolding and em dashes", () => {
    const roots = ["app", "components", "lib/content"];
    const forbidden = [
      String.fromCodePoint(0x2014),
      "Placeholder" + " metrics",
      "swap per" + " campaign",
      "93 of" + " 100",
      "virtual AI" + " employee",
      "organi" + "sation",
      "organi" + "sed",
      "priori" + "tise",
      "quanti" + "sation",
      "neigh" + "bours",
      "data cen" + "tre",
      "colour-" + "coded",
    ];

    roots.flatMap(sourceFiles).forEach((file) => {
      const source = readFileSync(file, "utf8");
      const normalizedSource = source.replace(/\s+/g, " ");
      forbidden.forEach((fragment) => {
        expect(normalizedSource, `${file} contains ${fragment}`).not.toContain(
          fragment,
        );
      });
    });
  });

  it("keeps illustrative examples out of client proof", () => {
    expect(caseStudiesIndex.map(study => study.slug)).toEqual(["infinite-ai-os", "agenthub"]);
    expect(caseStudiesIndex.every(study => !study.illustrative)).toBe(true);
    const agent = caseStudiesIndex.find(study => study.slug === "agenthub");
    expect(agent?.metricGloss).toMatch(/26 of 28/);
    expect(agent?.metricLabel).toMatch(/first-tool routing/);
    expect(infiniteAiOs.lede).toMatch(/distinct from Maslow AI-OS/);
  });

  it("maps only named production evidence to architecture capabilities", () => {
    const capabilityIds = new Set(
      architectureCapabilities.map(({ id }) => id),
    );

    [infiniteAiOs, agentHub].forEach((study) => {
      expect(study.architectureMap.length).toBeGreaterThan(0);
      expect(new Set(study.architectureMap.map(({ capabilityId }) => capabilityId))).toHaveLength(
        study.architectureMap.length,
      );
      study.architectureMap.forEach(({ capabilityId, evidence }) => {
        expect(capabilityIds.has(capabilityId)).toBe(true);
        expect(evidence.length).toBeGreaterThan(30);
      });
    });
  });
});

describe("brand design system", () => {
  it("locks the navy primary action hierarchy and square structural shape", () => {
    expect(actionTheme).toEqual({
      primaryBackground: colors.navy,
      primaryForeground: colors.white,
      inverseBackground: colors.white,
      inverseForeground: colors.navy,
      signal: "#EE7BB3",
      structuralRadius: 0,
    });

    const globals = readFileSync(join("app", "globals.css"), "utf8");
    expect(globals).toMatch(/--color-action-primary:\s*var\(--maslow-action-primary\);/i);
    expect(globals).toMatch(/--color-action-inverse:\s*var\(--maslow-action-inverse\);/i);
    expect(globals).toMatch(/--color-action-signal:\s*var\(--maslow-action-signal\);/i);
    expect(globals).toMatch(/--radius-structural:\s*var\(--maslow-radius-structural\);/i);
  });

  it("reserves pink backgrounds for pseudo-element interaction signals", () => {
    const pinkBackground =
      /background(?:-color)?\s*:\s*(?:#(?:ee7bb3|da85b2)|rgb\(\s*(?:238\s*,\s*123\s*,\s*179|218\s*,\s*133\s*,\s*178)\s*\)|var\(--color-(?:cta|action-signal)\))/i;
    const offenders: string[] = [];

    ["app", "components"].flatMap(styleFiles).forEach((file) => {
      const css = readFileSync(file, "utf8");
      for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        const selector = match[1].trim();
        const declarations = match[2];
        if (
          pinkBackground.test(declarations) &&
          !/::(?:before|after)/i.test(selector)
        ) {
          offenders.push(`${file}: ${selector}`);
        }
      }
    });

    expect(
      offenders,
      "Pink is reserved for small pseudo-element signals, not element fills.",
    ).toEqual([]);
  });
});

describe("press releases", () => {
  it("publishes the approved OpenAI release at the requested date", () => {
    const release = getPressRelease("openai-select-partner");

    expect(release?.title).toBe("Maslow AI Named an OpenAI Select Partner");
    expect(release?.publishedAt).toBe("2026-08-25");
    expect(formatPressDate(release!.publishedAt)).toBe("August 25, 2026");
    expect(release?.location).toBe("Woodbridge, NJ");
    expect(getAllPressSlugs()).toEqual(["openai-select-partner"]);
  });

  it("keeps the approved public copy free of draft labels", () => {
    const serialized = JSON.stringify(getPressRelease("openai-select-partner"));

    expect(serialized).not.toContain("DRAFT FOR OPENAI REVIEW");
    expect(serialized).not.toContain("NOT FOR PUBLICATION");
    expect(serialized).not.toContain("September 9, 2026");
    expect(serialized).toContain("Woodbridge, NJ, August 25, 2026:");
    expect(serialized).toContain(
      "Being named an OpenAI Select Partner gives Maslow a stronger path",
    );
  });

  it("uses descriptive internal production-evidence links", () => {
    const release = getPressRelease("openai-select-partner");
    const serialized = JSON.stringify(release?.sections);

    expect(serialized).toContain(
      "Infinite AI OS: an AI operating system in 90 days",
    );
    expect(serialized).toContain("/case-studies/infinite-ai-os");
    expect(serialized).toContain("AgentHub: contracts you can question");
    expect(serialized).toContain("/case-studies/agenthub");
  });

  it("orders published releases newest first", () => {
    expect(publishedPressReleases).toEqual(
      [...publishedPressReleases].sort((a, b) =>
        b.publishedAt.localeCompare(a.publishedAt),
      ),
    );
  });

  it("keeps the supplied partner badge byte-identical", () => {
    const bytes = readFileSync(
      join("public", "assets", "partners", "openai-select-partner.svg"),
    );
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(
      "312a3c4767dcf6a51eab6b73f49143a54dee60a88899f4b0b2ca448547efac86",
    );
  });
});
