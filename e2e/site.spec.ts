import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { legacyDestinations, publicRoutes } from "@/lib/routes";

const routes = [...publicRoutes];

test.describe("route smoke", () => {
  for (const route of routes) {
    test(`loads ${route}`, async ({ page }) => {
      const res = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(res?.ok() || res?.status() === 304).toBeTruthy();
      await expect(page.locator("body")).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://maslow.ai${route === "/" ? "" : route}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S.{35,}/);
      const links = await page.locator('main a[href^="/"]').evaluateAll(nodes => nodes.map(node => node.getAttribute("href")!.split("#")[0].split("?")[0]));
      expect(links.filter(href => Object.keys(legacyDestinations).includes(href))).toEqual([]);
      // Brand must be present
      await expect(
        page.getByRole("img", { name: "Maslow AI" }).first(),
      ).toBeVisible();
    });
  }

  for (const [legacyRoute, destination] of Object.entries(
    legacyDestinations,
  )) {
    test(`redirects ${legacyRoute} to ${destination}`, async ({ page }) => {
      const destinationPath = destination.split("#")[0];
      const destinationHash = destination.includes("#")
        ? `#${destination.split("#")[1]}`
        : "";

      await page.goto(legacyRoute, { waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(
        new RegExp(`${destinationPath.replaceAll("/", "\\/")}${destinationHash}$`),
      );
    });
  }
});

test.describe("navigation", () => {
  test("desktop nav links work", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop nav only");
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "HOW WE HELP" })
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
        .getByRole("link", { name: "HOW WE HELP" }),
    ).toHaveAttribute("aria-current", "page");
  });
});

test.describe("press releases", () => {
  test("press index links the full card to the approved release", async ({
    page,
  }) => {
    await page.goto("/press");
    const link = page.getByRole("link", {
      name: "Read press release: Maslow AI Named an OpenAI Select Partner",
    });
    const article = link.locator(
      '[data-press-release="openai-select-partner"]',
    );
    expect(await link.boundingBox()).toEqual(await article.boundingBox());
    await link.click({ position: { x: 24, y: 24 } });
    await expect(page).toHaveURL(/\/press\/openai-select-partner$/);
  });

  test("approved release shows exact status, evidence, and external resource", async ({
    page,
  }) => {
    await page.goto("/press/openai-select-partner");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Maslow AI Named an OpenAI Select Partner",
      }),
    ).toBeVisible();
    await expect(
      page.getByText("August 25, 2026", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(/DRAFT FOR OPENAI REVIEW/)).toHaveCount(0);
    await expect(page.getByText(/NOT FOR PUBLICATION/)).toHaveCount(0);
    const historicalBody = page.getByRole("region", {
      name: "Press release content",
    });
    await expect(
      page.getByRole("heading", {
        name: /The free AI-OS is the entry point/i,
      }),
    ).toBeVisible();
    await expect(
      historicalBody.getByText(/This note adds current product context/i),
    ).toHaveCount(0);
    await expect(
      historicalBody.getByRole("link", {
        name: "Infinite AI OS: an AI operating system in 90 days",
      }),
    ).toHaveAttribute("href", "/case-studies/infinite-ai-os");
    await expect(
      historicalBody.getByRole("link", {
        name: "AgentHub: contracts you can question",
      }),
    ).toHaveAttribute("href", "/case-studies/agenthub");
    await expect(
      historicalBody.getByRole("link", {
        name: "https://openai.com/business/partners/",
      }),
    ).toHaveAttribute("target", "_blank");
  });

  test("footer exposes the press section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("footer").getByRole("link", { name: "Press Releases" }),
    ).toHaveAttribute("href", "/press");
  });
});

test.describe("card interactions and layout", () => {
  test("homepage gives separate product and implementation paths", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");

    const nextMove = page.locator("section").filter({
      has: page.getByRole("heading", { name: /Bring your curiosity/i }),
    });
    await expect(
      nextMove.getByRole("link", { name: /Explore AI-OS preview/i }),
    ).toHaveAttribute("href", "/ai-os");
    await expect(
      nextMove.getByRole("link", { name: /Build a workflow with us/i }),
    ).toHaveAttribute("href", "/contact");
    await expect(
      page.getByText(/There is no public download from this page/i),
    ).toBeVisible();
  });

  test("the full production card is the case-study link", async ({ page }) => {
    await page.goto("/case-studies");

    const link = page.getByRole("link", {
      name: /View case study: Infinite AI OS/i,
    });
    const article = link.locator('article[data-card-slug="infinite-ai-os"]');
    const [linkBox, articleBox] = await Promise.all([
      link.boundingBox(),
      article.boundingBox(),
    ]);

    expect(linkBox).toEqual(articleBox);
    await link.click({ position: { x: 24, y: 24 } });
    await expect(page).toHaveURL(/\/case-studies\/infinite-ai-os/);
  });

  test("case-study index contains client implementations and sends examples to resources", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/case-studies");

    await expect(page.locator("[data-card-slug]")).toHaveCount(2);
    await expect(
      page.getByText("DEPLOYED CLIENT IMPLEMENTATIONS", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Explore resources/i }),
    ).toHaveAttribute("href", "/resources");
    await expect(page.getByText(/120,000 documents/i)).toHaveCount(0);
  });

  test("resources organizes the buyer journey around six questions", async ({
    page,
  }) => {
    await page.goto("/resources");

    const pathways = page.locator("section").filter({
      has: page.getByRole("heading", {
        name: "Six questions, one practical starting point",
      }),
    });
    await expect(pathways.getByRole("link")).toHaveCount(6);
    await expect(pathways.locator('a[href="/ai-os"]')).toHaveCount(1);
    await expect(pathways.locator('a[href="/plan-workflow"]')).toHaveCount(1);
    await expect(
      pathways.locator('a[href="/concepts/shared-ai-infrastructure"]'),
    ).toHaveCount(1);
    await expect(
      page.getByText(/illustrative patterns, with no client result/i),
    ).toBeVisible();
  });
});

test.describe("interactive islands", () => {
  test("services presents all four approved starting needs", async ({ page }) => {
    await page.goto("/services");

    const scopes = page.locator("#scopes");
    for (const startingPoint of [
      { id: "discover", href: "/plan-workflow", status: "PAID DISCOVERY" },
      { id: "setup", href: "/ai-os", status: "SCOPED SETUP" },
      {
        id: "knowledge",
        href: "/case-studies/agenthub",
        status: "CLIENT IMPLEMENTATION",
      },
      {
        id: "workflows",
        href: "/case-studies/infinite-ai-os",
        status: "CLIENT IMPLEMENTATION",
      },
    ]) {
      const card = scopes.locator(`#${startingPoint.id}`);
      await expect(card).toBeVisible();
      await expect(card).toContainText(startingPoint.status);
      await expect(card.getByRole("link")).toHaveAttribute(
        "href",
        startingPoint.href,
      );
    }
    await expect(
      scopes.getByText(/Maslow AI-OS is intended to be free/i),
    ).toBeVisible();
  });

  test("AI-OS preview keeps release and operating boundaries explicit", async ({
    page,
  }) => {
    await page.goto("/ai-os");

    await expect(page.getByText("In development.", { exact: true })).toBeVisible();
    await expect(
      page.getByText(/A public download is not available through this website/i),
    ).toBeVisible();
    await expect(
      page.getByText(/stable signed public release and broad hardware acceptance remain open milestones/i),
    ).toBeVisible();
    await expect(
      page.getByText(/Hardware, model subscriptions or API usage, third-party licenses, and Maslow implementation services are separate/i),
    ).toBeVisible();
    await expect(
      page.getByText(/This engagement evidence does not establish/i),
    ).toHaveCount(0);
  });

  test("workflow mapper builds and clears an editable contact brief", async ({
    page,
  }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await page.goto("/plan-workflow");

    const mapper = page.locator("#workflow-mapper");
    const choose = async (name: string, final = false) => {
      const radio = mapper.getByRole("radio", { name });
      await radio.check();
      await mapper
        .getByRole("button", {
          name: final ? "SHOW MY OWNERSHIP PATH" : "CONTINUE",
        })
        .click();
    };

    await choose("Estimate or quote");
    await choose("Operations or estimating lead");
    await choose("SharePoint, Drive, or file repository");
    await choose("Price or business commitment", true);

    const resultHeading = mapper.getByRole("heading", {
      name: "Request to estimator-reviewed draft",
    });
    await expect(resultHeading).toBeVisible();
    await expect(resultHeading).toBeFocused();
    await expect(mapper.getByText("PRODUCTION ENGAGEMENT")).toBeVisible();
    await mapper.getByRole("link", { name: "TALK THROUGH A WORKFLOW" }).click();

    await expect(page).toHaveURL(/\/contact$/);
    const message = page.getByLabel("Message");
    await expect(message).toHaveValue(/Delayed deliverable: Estimate or quote/);
    await message.fill(`${await message.inputValue()}\nEdited by buyer`);
    await page.getByLabel("Full name").fill("Test User");
    await page.getByLabel("Work email").fill("test@example.com");
    await page.getByLabel("Company").fill("Example Company");
    await page
      .getByLabel("What are you exploring?")
      .selectOption("Workflow implementation");
    await page
      .getByRole("button", { name: /REQUEST A WORKING SESSION/i })
      .click();

    await expect(
      page.getByText(/Your request is with Maslow/i),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() =>
          window.sessionStorage.getItem("maslow.workflow-brief.v1"),
        ),
      )
      .toBeNull();
  });

  test("contact form validates email", async ({ page }) => {
    await page.goto("/contact");
    await page.getByPlaceholder("Full name").fill("Test User");
    await page.getByPlaceholder("Work email").fill("not-an-email");
    await page
      .getByRole("button", { name: /REQUEST A WORKING SESSION/i })
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
      await page.waitForLoadState("load");
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise<void>((resolve) => {
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => resolve());
          });
        });
      });

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

      const revealMotion = await page.locator(".mz-reveal").evaluateAll(
        (elements) => {
          const seconds = (value: string) =>
            Math.max(
              ...value.split(",").map((part) => {
                const duration = Number.parseFloat(part);
                return part.trim().endsWith("ms") ? duration / 1_000 : duration;
              }),
            );

          return elements.flatMap((element) => {
            const style = getComputedStyle(element);
            const issues = [
              style.opacity !== "1" ? `opacity ${style.opacity}` : null,
              style.transform !== "none" ? `transform ${style.transform}` : null,
              seconds(style.transitionDuration) > 0.001
                ? `transition ${style.transitionDuration}`
                : null,
              seconds(style.transitionDelay) > 0.001
                ? `delay ${style.transitionDelay}`
                : null,
            ].filter(Boolean);
            return issues.length
              ? [`${element.tagName.toLowerCase()}.${element.className}: ${issues.join(", ")}`]
              : [];
          });
        },
      );
      if (revealMotion.length) {
        failures.push(`${route} reveal: ${revealMotion.join(", ")}`);
      }
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

test.describe("taxonomy capsule semantics", () => {
  for (const route of [
    "/blog",
    "/blog/what-makes-an-ai-employee-work",
    "/case-studies",
    "/case-studies/infinite-ai-os",
  ]) {
    test(`${route} distinguishes labels from actions`, async ({ page }) => {
      await page.goto(route);

      const labels = page.locator("[data-taxonomy-label]");
      expect(await labels.count()).toBeGreaterThanOrEqual(2);
      const semantics = await labels.evaluateAll((elements) =>
        elements.map((element) => {
          const html = element as HTMLElement;
          const style = getComputedStyle(html);
          return {
            tag: html.tagName,
            role: html.getAttribute("role"),
            href: html.getAttribute("href"),
            tabIndex: html.tabIndex,
            radius: style.borderRadius,
            cursor: style.cursor,
          };
        }),
      );

      for (const label of semantics) {
        expect(label).toEqual({
          tag: "SPAN",
          role: null,
          href: null,
          tabIndex: -1,
          radius: "9999px",
          cursor: "auto",
        });
      }

      const action = page.locator('a[href="/contact"]:visible').first();
      await expect(action).toBeVisible();
      await expect
        .poll(() =>
          action.evaluate((element) => ({
            tabIndex: (element as HTMLElement).tabIndex,
            radius: getComputedStyle(element).borderRadius,
          })),
        )
        .toEqual({ tabIndex: 0, radius: "0px" });
    });
  }
});

test.describe("founder and company identity", () => {
  test("publishes the founder photo and current contact destinations", async ({
    page,
  }) => {
    await page.goto("/about");
    await expect(
      page
        .locator('[data-screen-label="Founder"]')
        .getByRole("img", { name: /Rakesh David, Founder and CEO/i }),
    ).toBeVisible();

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
