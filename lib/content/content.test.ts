import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assessmentQuestions,
  assessmentRecMap,
  assessmentStages,
} from "@/lib/content/site";
import { serviceCatalog, serviceStages } from "@/lib/content/services";
import { concepts, metrics } from "@/lib/content/home";
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
import { foundationWeeks, twoDoors } from "@/lib/content/engagement";
import { conceptFailures } from "@/lib/content/explainers";
import {
  architectureCapabilities,
  architectureMapEdges,
  architectureMapNodes,
  architectureScenarioOverlays,
  architectureViews,
} from "@/lib/content/architecture";
import { copilotSection, costOfWaiting } from "@/lib/content/home";
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
  it("has six assessment questions with four options each", () => {
    expect(assessmentQuestions).toHaveLength(6);
    assessmentQuestions.forEach((q) => {
      expect(q.options).toHaveLength(4);
      expect(q.title.length).toBeGreaterThan(5);
    });
  });

  it("assessment stages and rec map are complete", () => {
    expect(assessmentStages).toHaveLength(5);
    expect(assessmentRecMap).toHaveLength(6);
  });

  it("services catalog covers five stages", () => {
    expect(serviceStages).toHaveLength(5);
    expect(serviceCatalog).toHaveLength(5);
    serviceCatalog.forEach((g) => {
      expect(g.services).toHaveLength(3);
      expect(g.id).toBeTruthy();
    });
  });

  it("home concepts and metrics are populated", () => {
    expect(concepts).toHaveLength(6);
    expect(metrics).toHaveLength(4);
    concepts.forEach((c) => expect(c.href.startsWith("/concepts/")).toBe(true));
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

  it("trust content carries the copy-v3 invariants", () => {
    expect(faqItems).toHaveLength(14);
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

  it("homepage copilot and cost-of-waiting sections are populated", () => {
    expect(copilotSection.h2).toMatch(/Keep Copilot/);
    expect(copilotSection.body).toMatch(/personal productivity/);
    expect(costOfWaiting.body).toMatch(/quotes still queue/);
    expect(costOfWaiting.ctaHref).toBe("/assessment");
  });

  it("engagement gates are surfaced, conservatively", () => {
    expect(twoDoors).toHaveLength(2);
    expect(foundationWeeks).toHaveLength(4);
    // Gates named on the first metric and the Foundation scope; the billing
    // sentence stays out until the mechanics are verified.
    expect(metrics[0].label).toMatch(/gates at weeks 2, 4, and 10/);
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
      "Her" + "mes",
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

  it("labels scenario cards without fabricated performance numbers", () => {
    const scenarios = caseStudiesIndex.filter((study) => study.illustrative);
    expect(scenarios.length).toBeGreaterThan(0);
    scenarios.forEach((study) => {
      expect(study.metric).toBe("SCENARIO");
      expect(study.metricLabel).toMatch(/not a client result/i);
      expect(study.href).toBeTruthy();
    });
    expect(scenarios.map(({ href }) => href)).toEqual([
      "/concepts/ai-employee-architecture#workflow-compliance",
      "/concepts/ai-employee-architecture#workflow-intake",
      "/concepts/local-ai",
    ]);
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
    expect(globals).toMatch(/--color-action-primary:\s*#192332;/i);
    expect(globals).toMatch(/--color-action-inverse:\s*#ffffff;/i);
    expect(globals).toMatch(/--color-action-signal:\s*#ee7bb3;/i);
    expect(globals).toMatch(/--radius-structural:\s*0px;/i);
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

describe("assessment scoring logic", () => {
  function stageFromAnswers(answers: number[]) {
    const total = answers.reduce((s, x) => s + x, 0);
    if (total <= 3) return 0;
    if (total <= 7) return 1;
    if (total <= 11) return 2;
    if (total <= 15) return 3;
    return 4;
  }

  it("maps low totals to exploring", () => {
    expect(stageFromAnswers([0, 0, 0, 0, 0, 0])).toBe(0);
    expect(stageFromAnswers([0, 0, 1, 0, 1, 0])).toBe(0);
  });

  it("maps mid/high totals to later stages", () => {
    expect(stageFromAnswers([1, 1, 1, 1, 1, 1])).toBe(1);
    expect(stageFromAnswers([2, 2, 2, 2, 2, 2])).toBe(3);
    expect(stageFromAnswers([3, 3, 3, 3, 3, 3])).toBe(4);
  });
});
