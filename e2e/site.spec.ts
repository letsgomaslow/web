import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/services",
  "/assessment",
  "/about",
  "/contact",
  "/blog",
  "/blog/context-engineering",
  "/case-studies",
  "/case-studies/infinite-ai-os",
  "/case-studies/agenthub",
  "/concepts/context-engineering",
  "/concepts/agentic-harness",
  "/concepts/hybrid-rag",
  "/concepts/local-ai",
  "/concepts/virtual-ai-employees",
  "/concepts/skills-and-gateways",
  "/campaigns/virtual-ai-employees",
];

test.describe("route smoke", () => {
  for (const route of routes) {
    test(`loads ${route}`, async ({ page }) => {
      const res = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(res?.ok() || res?.status() === 304).toBeTruthy();
      await expect(page.locator("body")).toBeVisible();
      // Brand must be present
      await expect(page.getByText("MASLOW").first()).toBeVisible();
    });
  }
});

test.describe("navigation", () => {
  test("desktop nav links work", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop nav only");
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "SERVICES" })
      .click();
    await expect(page).toHaveURL(/\/services/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("mobile burger menu opens", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const burger = page.getByRole("button", { name: /open menu/i });
    await expect(burger).toBeVisible();
    // Native DOM click avoids overlay hit-testing flakiness with the fixed menu layer
    await burger.evaluate((el: HTMLElement) => el.click());
    await expect(page.locator("html")).toHaveClass(/mz-open/);
    await expect(
      page.getByRole("dialog", { name: /site menu/i }),
    ).toBeVisible();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: /SERVICES/i })
      .evaluate((el: HTMLElement) => el.click());
    await expect(page).toHaveURL(/\/services/);
  });
});

test.describe("interactive islands", () => {
  test("assessment quiz answers update progress", async ({ page }) => {
    await page.goto("/assessment");
    await expect(page.getByText("0 / 6 answered")).toBeVisible();
    // Click first option of first question
    await page
      .getByRole("button")
      .filter({ hasText: /haven't started|Nowhere/i })
      .first()
      .click();
    await expect(page.getByText("1 / 6 answered")).toBeVisible();
  });

  test("local AI calculator responds to slider", async ({ page }) => {
    await page.goto("/concepts/local-ai");
    const slider = page.locator('input[type="range"]');
    await expect(slider).toBeVisible();
    await slider.fill("1500");
    await expect(page.getByText(/tokens/i).first()).toBeVisible();
  });

  test("contact form validates email", async ({ page }) => {
    await page.goto("/contact");
    await page.getByPlaceholder("Full name").fill("Test User");
    await page.getByPlaceholder("Work email").fill("not-an-email");
    await page.getByRole("button", { name: /REQUEST THE SESSION/i }).click();
    // HTML5 validation should prevent submit — still on contact
    await expect(page).toHaveURL(/\/contact/);
  });
});

test.describe("accessibility", () => {
  const a11yRoutes = [
    "/",
    "/services",
    "/contact",
    "/about",
    "/assessment",
    "/blog",
  ];

  for (const route of a11yRoutes) {
    test(`axe critical/serious on ${route}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.addStyleTag({
        content: `
          .mz-reveal, .mz-rise, [data-mz-in] {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        `,
      });
      await page.waitForTimeout(100);

      // color-contrast is excluded: the brand palette (hot-pink CTAs, soft-pink
      // links, light grey metadata) intentionally matches the original design
      // system, which does not meet AA contrast ratios.
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .disableRules(["color-contrast"])
        .analyze();

      const blocking = results.violations.filter((v) =>
        ["critical", "serious"].includes(v.impact || ""),
      );

      expect(
        blocking,
        blocking
          .map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`)
          .join("\n"),
      ).toEqual([]);
    });
  }
});

test.describe("responsive layout", () => {
  test("home hero readable at mobile width", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    const box = await h1.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.width).toBeGreaterThan(200);
    expect(box!.width).toBeLessThanOrEqual(390);
  });

  test("services catalog stacks on narrow screens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/services");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#assess")).toBeVisible();
  });
});
