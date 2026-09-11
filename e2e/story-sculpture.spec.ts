import { expect, test, type Page } from "@playwright/test";

const scenes = [
  ["knowledge", "/concepts/hybrid-rag"],
  ["knowledge", "/concepts/context-engineering"],
  ["infrastructure", "/concepts/shared-ai-infrastructure"],
  ["workflow", "/concepts/agentic-harness"],
  ["workflow", "/campaigns/virtual-ai-employees"],
  ["deployment", "/concepts/local-ai"],
  ["deployment", "/security"],
  ["delivery", "/concepts/skills-and-gateways"],
  ["scope", "/services"],
  ["engagement", "/how-we-engage"],
  ["evidence", "/case-studies/agenthub"],
  ["evidence", "/case-studies/infinite-ai-os"],
  ["manufacturing", "/manufacturing"],
] as const;

async function showSculpture(page: Page, route: string) {
  await page.goto(route);
  const sculpture = page.locator("[data-sculpture]").first();
  await sculpture.scrollIntoViewIfNeeded();
  await expect(sculpture).toHaveAttribute("data-ready", "true");
  return sculpture;
}

for (const [variant, route] of scenes) {
  test(`${route} renders its dimensional scene and changes chapter in both directions`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const sculpture = await showSculpture(page, route);
    await expect(sculpture).toHaveAttribute("data-sculpture", variant);
    const journey = page.locator("section[data-variant]").first();
    await journey.getByRole("button", { name: "Pause motion", exact: true }).click();
    const controls = journey.getByLabel("Choose a story stage").getByRole("button");
    const count = await controls.count();
    for (const index of [count - 1, 0]) {
      await controls.nth(index).click();
      await expect(controls.nth(index)).toHaveAttribute("aria-current", "step");
      // The renderer must actually receive the selected narrative state.
      await expect(sculpture.locator("canvas")).toHaveAttribute(
        "data-active-stage", (await journey.getAttribute("data-active-step"))!,
      );
    }
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });
}

test("a missing WebGL context leaves a readable, working story", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
      return original.apply(this, [type, ...args] as Parameters<typeof original>);
    } as typeof original;
  });
  await page.goto("/concepts/hybrid-rag");
  const journey = page.locator("#hybrid-story");
  await journey.getByRole("button", { name: "Show Use relationships to test exact facts." }).click();
  await expect(journey).toHaveAttribute("data-active-step", "graph");
  await expect(journey.locator("[data-sculpture]")).toHaveAttribute("data-ready", "false");
  await expect(journey.locator("svg")).toBeVisible();
  await expect(journey.getByRole("heading", { name: "Use relationships to test exact facts." })).toBeVisible();
});

test("small canvases reveal a close-up and wider canvases restore the whole flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const sculpture = await showSculpture(page, "/concepts/hybrid-rag");
  await expect(sculpture.locator("canvas")).toHaveAttribute("data-view", "detail");
  await page.setViewportSize({ width: 1440, height: 900 });
  await sculpture.scrollIntoViewIfNeeded();
  await expect(sculpture.locator("canvas")).toHaveAttribute("data-view", "whole");
  await page.setViewportSize({ width: 390, height: 844 });
  await sculpture.scrollIntoViewIfNeeded();
  await expect(sculpture.locator("canvas")).toHaveAttribute("data-view", "detail");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("context loss restores the fallback and the sculpture can recover", async ({ page }) => {
  const sculpture = await showSculpture(page, "/concepts/hybrid-rag");
  await sculpture.locator("canvas").evaluate((canvas) => {
    const gl = (canvas as HTMLCanvasElement).getContext("webgl2");
    const extension = gl?.getExtension("WEBGL_lose_context");
    if (!extension) throw new Error("Context-loss extension missing in test browser");
    Object.assign(window, { __storyRestore: () => extension.restoreContext() });
    extension.loseContext();
  });
  await expect(sculpture).toHaveAttribute("data-ready", "false");
  await expect(sculpture.locator("svg")).toBeVisible();
  await page.evaluate(() => (window as unknown as { __storyRestore: () => void }).__storyRestore());
  await expect(sculpture).toHaveAttribute("data-ready", "true");
});

test("reduced motion keeps the sculpture static and responds to direct selection", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const sculpture = await showSculpture(page, "/concepts/hybrid-rag");
  const journey = page.locator("#hybrid-story");
  await expect(journey).toHaveAttribute("data-paused", "true");
  await journey.getByRole("button", { name: "Show Use relationships to test exact facts." }).click();
  await sculpture.scrollIntoViewIfNeeded();
  await expect(sculpture.locator("canvas")).toHaveAttribute("data-active-stage", "graph");
  const first = await sculpture.locator("canvas").screenshot();
  await page.waitForTimeout(180);
  expect(await sculpture.locator("canvas").screenshot()).toEqual(first);
});

test("the renderer stops while hidden, off screen, paused, and after navigation", async ({ page }) => {
  await page.addInitScript(() => {
    const request = window.requestAnimationFrame.bind(window);
    const stats = { frames: 0 };
    Object.assign(window, { __storyFrames: stats });
    window.requestAnimationFrame = (callback) => request((time) => {
      stats.frames += 1;
      callback(time);
    });
  });
  const count = () => page.evaluate(() => (window as unknown as { __storyFrames: { frames: number } }).__storyFrames.frames);
  const expectStopped = async () => {
    await page.waitForTimeout(100);
    const start = await count();
    await page.waitForTimeout(160);
    expect((await count()) - start).toBeLessThanOrEqual(1);
  };
  const sculpture = await showSculpture(page, "/concepts/hybrid-rag");
  const start = await count();
  await expect.poll(count).toBeGreaterThan(start);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expectStopped();
  const hidden = await count();
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(count).toBeGreaterThan(hidden);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expectStopped();
  await sculpture.scrollIntoViewIfNeeded();
  await page.locator("#hybrid-story").getByRole("button", { name: "Pause motion", exact: true }).click();
  await expectStopped();
  await page.locator('footer a[href="/contact"]').first().click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator("[data-sculpture]")).toHaveCount(0);
  await expectStopped();
});
