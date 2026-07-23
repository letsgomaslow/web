import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assessmentQuestions,
  assessmentRecMap,
  assessmentStages,
} from "@/lib/content/site";
import { serviceCatalog, serviceStages } from "@/lib/content/services";
import { concepts, metrics } from "@/lib/content/home";
import { getBlogArticle, getAllBlogSlugs } from "@/lib/content/blog";
import { caseStudiesIndex } from "@/lib/content/case-studies";
import {
  faqItems,
  manufacturingBottlenecks,
  manufacturingMonday,
} from "@/lib/content/trust";
import { foundationWeeks, twoDoors } from "@/lib/content/engagement";
import { conceptFailures } from "@/lib/content/explainers";
import { copilotSection, costOfWaiting } from "@/lib/content/home";
import {
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

  it("blog article generates for featured slug", () => {
    expect(getAllBlogSlugs()).toContain("context-engineering");
    const article = getBlogArticle("context-engineering");
    expect(article?.title).toMatch(/Context engineering/i);
    expect(article?.body.length).toBeGreaterThan(3);
  });

  it("case studies index has real engagement hrefs", () => {
    expect(caseStudiesIndex.length).toBeGreaterThanOrEqual(2);
    const linked = caseStudiesIndex.filter((c) => c.href !== "#");
    expect(linked.some((c) => c.href.includes("infinite-ai-os"))).toBe(true);
    expect(linked.some((c) => c.href.includes("agenthub"))).toBe(true);
  });

  it("only publishes articles that have a complete body", () => {
    expect(getAllBlogSlugs()).toEqual(["context-engineering"]);
    getAllBlogSlugs().forEach((slug) => {
      expect(getBlogArticle(slug)?.body.length).toBeGreaterThan(3);
    });
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
    });
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
