import { expect, test } from "@playwright/test";

const route = "/concepts/shared-ai-infrastructure";

test.describe("story journey interaction", () => {
  test("stage buttons work from the keyboard and motion can be paused", async ({ page }) => {
    await page.goto(route);
    const journey = page.locator("#infrastructure-story");
    const memory = journey.getByRole("button", {
      name: "Show Approve memory before it becomes shared context.",
    });

    await memory.focus();
    await page.keyboard.press("Enter");
    await expect(memory).toHaveAttribute("aria-current", "step");
    await expect(journey.locator('[data-index="1"]')).toHaveAttribute(
      "data-active",
      "true",
    );

    const pause = journey.getByRole("button", { name: "Pause motion" });
    await pause.click();
    await expect(journey.getByRole("button", { name: "Resume motion" })).toHaveAttribute("aria-pressed", "true");
    await expect(journey).toHaveAttribute("data-paused", "true");
  });

  test("native scrolling selects stages in both directions", async ({ page }) => {
    await page.goto(route);
    const journey = page.locator("#infrastructure-story");
    const first = journey.locator('[data-index="0"]');
    const third = journey.locator('[data-index="2"]');

    await third.evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "auto" }),
    );
    await expect(third).toHaveAttribute("data-active", "true");

    await first.evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "auto" }),
    );
    await expect(first).toHaveAttribute("data-active", "true");
  });

  test("skip link bypasses the guided stages", async ({ page }) => {
    await page.goto(route);
    const skip = page.getByRole("link", { name: "Skip the guided view" });
    await skip.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#infrastructure-story-after$/);
  });

  test("reduced motion presents a compact static reading view", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    const journey = page.locator("#infrastructure-story");
    const visual = journey.getByLabel("Story diagram");
    const stages = journey.locator("[data-index]");

    await expect(visual).toHaveCSS("position", "relative");
    await expect(stages).toHaveCount(5);
    for (const stage of await stages.all()) {
      await expect(stage).toHaveCSS("opacity", "1");
      await expect(stage).toHaveCSS("min-height", "0px");
    }
  });

  test("mobile visual stays within one viewport", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(route);
    const visual = page.locator("#infrastructure-story").getByLabel("Story diagram");
    await visual.scrollIntoViewIfNeeded();
    const box = await visual.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeLessThan(800);
  });
});

test.describe("story journey diagrams", () => {
  const diagrams = [
    ["/concepts/hybrid-rag", "Knowledge path from source file to cited answer"],
    ["/concepts/shared-ai-infrastructure", "Shared infrastructure connecting knowledge, memory, skills, tools, and visibility"],
    ["/concepts/agentic-harness", "Controlled workflow from scoped request to trace"],
    ["/concepts/local-ai", "Data boundary between local and cloud systems"],
    ["/concepts/skills-and-gateways", "Reusable skill delivered through connected tools"],
    ["/how-we-engage", "Engagement path from question to proof, implementation, and handover"],
    ["/case-studies/agenthub", "Evidence path from event to reviewable record"],
  ] as const;

  for (const [path, label] of diagrams) {
    test(`${path} exposes the diagram meaning`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("img", { name: label })).toBeAttached();
    });
  }

  test("hybrid retrieval keeps vector and graph contributions visible", async ({ page }) => {
    await page.goto("/concepts/hybrid-rag");
    const journey = page.locator("#hybrid-story");
    const diagram = journey.getByRole("img", {
      name: "Knowledge path from source file to cited answer",
    });

    await journey.getByRole("button", { name: "Show Use meaning to find likely passages." }).click();
    await expect(journey).toHaveAttribute("data-active-step", "vector");
    await expect(diagram.locator("svg")).toContainText("VECTOR");
    await expect(diagram.locator("svg")).toContainText("GRAPH");

    await journey.getByRole("button", { name: "Show Use relationships to test exact facts." }).click();
    await expect(journey).toHaveAttribute("data-active-step", "graph");
    await expect(diagram.locator("svg")).toContainText("CITED ANSWER");
  });
});
