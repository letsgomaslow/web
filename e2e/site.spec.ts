import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/services",
  "/how-we-engage",
  "/assessment",
  "/about",
  "/contact",
  "/blog",
  "/blog/context-engineering",
  "/case-studies",
  "/case-studies/infinite-ai-os",
  "/case-studies/agenthub",
  "/manufacturing",
  "/security",
  "/faq",
  "/diligence",
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

  test("mobile menu traps focus and restores it to the trigger", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    const burger = page.getByRole("button", { name: /open menu/i });
    await expect(burger).toBeVisible();
    await burger.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveClass(/mz-open/);
    const dialog = page.getByRole("dialog", { name: /site menu/i });
    await expect(dialog).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() =>
          Boolean(document.activeElement?.closest('[role="dialog"]')),
        ),
      )
      .toBe(true);

    await page.keyboard.press("Shift+Tab");
    await expect
      .poll(() =>
        page.evaluate(() =>
          Boolean(document.activeElement?.closest('[role="dialog"]')),
        ),
      )
      .toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(burger).toBeFocused();
  });

  test("current page is exposed to assistive technology", async ({
    page,
    isMobile,
  }) => {
    test.skip(!!isMobile, "desktop nav only");
    await page.goto("/services");
    await expect(
      page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: "SERVICES" }),
    ).toHaveAttribute("aria-current", "page");
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
    await page
      .getByRole("button", { name: /BOOK MY WORKING SESSION/i })
      .click();
    // HTML5 validation should prevent submit - still on contact
    await expect(page).toHaveURL(/\/contact/);
  });
});

test.describe("accessibility", () => {
  for (const route of routes) {
    test(`WCAG 2.2 AA and accessibility best practices on ${route}`, async ({
      page,
    }) => {
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

      const results = await new AxeBuilder({ page })
        .withTags([
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22aa",
          "best-practice",
        ])
        .analyze();

      const violationSummary = results.violations
        .flatMap((violation) =>
          violation.nodes.map((node) => {
            const detail = node.any[0]?.data as
              | { fgColor?: string; bgColor?: string; contrastRatio?: number }
              | undefined;
            const colors = detail?.fgColor
              ? ` ${detail.fgColor} on ${detail.bgColor} (${detail.contrastRatio})`
              : "";
            return `${violation.id}: ${node.target.join(" ")}${colors}`;
          }),
        )
        .join("\n");

      expect(results.violations.length, violationSummary).toBe(0);
    });
  }

  test("skip link bypasses repeated navigation", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: /skip to main content/i });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main-content")).toBeFocused();
  });

  test("form labels and keyboard focus remain visible", async ({ page }) => {
    for (const route of ["/contact", "/diligence"]) {
      await page.goto(route);
      await expect(page.getByText("Full name", { exact: true })).toBeVisible();
      const input = page.getByLabel("Full name");
      await input.focus();
      const focusStyle = await input.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          outlineStyle: style.outlineStyle,
          outlineWidth: Number.parseFloat(style.outlineWidth),
        };
      });
      expect(focusStyle.outlineStyle).not.toBe("none");
      expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(2);
    }
  });

  test("reduced motion disables persistent animation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const failures: string[] = [];

    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const animated = await page.locator("body *").evaluateAll((elements) =>
        elements
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return (
              rect.width > 0 &&
              rect.height > 0 &&
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              style.animationName !== "none" &&
              Number.parseFloat(style.animationDuration) > 0.01
            );
          })
          .map((element) => {
            const style = getComputedStyle(element);
            return `${element.tagName.toLowerCase()}.${element.className}: ${style.animationName}`;
          }),
      );
      if (animated.length) failures.push(`${route}: ${animated.join(", ")}`);
    }

    expect(failures, failures.join("\n")).toEqual([]);
  });
});

test.describe("responsive layout", () => {
  for (const viewport of [
    { width: 320, height: 800 },
    { width: 768, height: 900 },
    { width: 1024, height: 900 },
    { width: 1440, height: 900 },
  ]) {
    test(`all routes reflow at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      const failures: string[] = [];

      for (const route of routes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        const layout = await page.evaluate(() => {
          const clientWidth = document.documentElement.clientWidth;
          const offenders = Array.from(
            document.querySelectorAll<HTMLElement>("body *"),
          )
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return rect.right > clientWidth + 1 || rect.left < -1;
            })
            .slice(0, 5)
            .map(
              (element) =>
                `${element.tagName.toLowerCase()}.${String(element.className)}`,
            );
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth,
            h1Count: document.querySelectorAll("h1").length,
            offenders,
          };
        });
        if (
          layout.scrollWidth > layout.clientWidth + 1 ||
          layout.h1Count !== 1
        ) {
          failures.push(
            `${route}: ${layout.scrollWidth}/${layout.clientWidth}px, h1=${layout.h1Count}, ${layout.offenders.join(", ")}`,
          );
        }
      }

      expect(failures, failures.join("\n")).toEqual([]);
    });
  }

  test("WCAG text spacing does not clip or introduce page scrolling", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    const failures: string[] = [];

    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.addStyleTag({
        content: `
          body * {
            line-height: 1.5 !important;
            letter-spacing: 0.12em !important;
            word-spacing: 0.16em !important;
          }
          body p { margin-bottom: 2em !important; }
        `,
      });
      const layout = await page.evaluate(() => {
        const clientWidth = document.documentElement.clientWidth;
        const offenders = Array.from(
          document.querySelectorAll<HTMLElement>("body *"),
        )
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return (
              rect.right > clientWidth + 1 ||
              rect.left < -1 ||
              (element.scrollWidth > element.clientWidth + 1 &&
                style.overflowX === "visible")
            );
          })
          .slice(0, 5)
          .map(
            (element) =>
              `${element.tagName.toLowerCase()}.${String(element.className)}[${element.scrollWidth}/${element.clientWidth}]`,
          );
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth,
          offenders,
        };
      });
      if (layout.scrollWidth > layout.clientWidth + 1) {
        failures.push(
          `${route}: ${layout.scrollWidth}/${layout.clientWidth}px, ${layout.offenders.join(", ")}`,
        );
      }
    }

    expect(failures, failures.join("\n")).toEqual([]);
  });
});

test.describe("founder and company identity", () => {
  test("publishes the founder photo and current contact destinations", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page
        .locator('[data-screen-label="Founder"]')
        .getByRole("img", { name: /Rakesh David, Founder and CEO/i }),
    ).toBeVisible();

    await page.goto("/about");
    await expect(
      page.getByRole("link", { name: /Rakesh on LinkedIn/i }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/rakeshdavid/");

    await page.goto("/contact");
    await expect(
      page.getByRole("link", { name: /Rakesh David/i }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/rakeshdavid/");
    await expect(
      page.getByRole("link", { name: /Maslow AI on LinkedIn/i }),
    ).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/letsgomaslow/",
    );
    await expect(
      page
        .locator('[data-screen-label="Contact"]')
        .getByRole("link", { name: /GitHub/i }),
    ).toHaveAttribute("href", "https://github.com/letsgomaslow");
    await expect(
      page.getByRole("main").locator('a[href="mailto:rakesh@maslow.ai"]'),
    ).toHaveCount(2);
  });
});

test.describe("forwardable sections", () => {
  test("faq deep link opens the target question", async ({ page }) => {
    await page.goto("/faq#q-07");
    await expect(page.locator("#q-07")).toHaveJSProperty("open", true);
  });

  test("copy anchor reports its copied state", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: async () => undefined },
        configurable: true,
      });
    });
    await page.goto("/faq");
    const anchor = page
      .getByRole("button", { name: /copy link to/i })
      .first();
    await anchor.click();
    await expect(anchor).toContainText("COPIED");
  });
});
