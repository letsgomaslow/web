import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const architectureRoute = "/concepts/ai-employee-architecture";
const homepageRoute = "/";
const servicesRoute = "/services";
const engagementRoute = "/how-we-engage";
const caseIndexRoute = "/case-studies";
const hybridRagRoute = "/concepts/hybrid-rag";
const harnessRoute = "/concepts/agentic-harness";
const webglSceneCases = [
  {
    slug: "hybrid-rag",
    route: hybridRagRoute,
    placeholderLabel: "Hybrid RAG transformation",
    fallbackText: "How company files become retrieval structures",
    fallbackHeading: "Ingest & chunk",
    pauseLabel: "Pause ambient motion",
    resumeLabel: "Resume ambient motion",
  },
  {
    slug: "agentic-harness",
    route: harnessRoute,
    placeholderLabel: "Agentic harness components",
    fallbackText: "Six operating controls surround the model",
    fallbackHeading: "Six operating controls surround the model",
    pauseLabel: "Pause rotation",
    resumeLabel: "Resume rotation",
  },
] as const;
const caseDetailRoutes = [
  {
    slug: "infinite-ai-os",
    route: "/case-studies/infinite-ai-os",
    chapterLabel: "Value model",
    chapterId: "value-model",
  },
  {
    slug: "agenthub",
    route: "/case-studies/agenthub",
    chapterLabel: "Routing",
    chapterId: "routing",
  },
] as const;
const mapperStateKey = "maslow.workflow-mapper-state.v1";
const workflowBriefKey = "maslow.workflow-brief.v1";
const screenshotOptions = {
  animations: "disabled" as const,
  caret: "hide" as const,
  // Keep anti-aliasing tolerance while still detecting large, low-contrast
  // layout regressions such as a white grid item exposing a #e1e1e1 cell.
  threshold: 0.1,
};

test.beforeEach(({}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "The visual suite sets its own 320-1440px breakpoint matrix and owns one canonical Chromium baseline set.",
  );
});

type MapperState = {
  version: number;
  updatedAt: number;
  expiresAt: number;
  completed: boolean;
  answers: Record<string, string>;
};

function mapperState(
  answers: Record<string, string>,
  completed = false,
): MapperState {
  const now = Date.now();
  return {
    version: 1,
    updatedAt: now - 1_000,
    expiresAt: now + 60 * 60 * 1_000,
    completed,
    answers,
  };
}

async function setSessionItem(page: Page, key: string, value: unknown) {
  await setRawSessionItem(page, key, JSON.stringify(value));
}

async function setRawSessionItem(page: Page, key: string, value: string) {
  await page.goto("/");
  await page.evaluate(
    ({ storageKey, storageValue }) => {
      window.sessionStorage.setItem(storageKey, storageValue);
    },
    { storageKey: key, storageValue: value },
  );
}

async function stabilizeVisualPage(page: Page) {
  await page.addStyleTag({
    content: `
      nextjs-portal,
      [data-next-badge-root],
      [data-nextjs-toast] {
        display: none !important;
      }

      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }

      .mz-reveal {
        opacity: 1 !important;
        transform: none !important;
      }
    `,
  });
}

async function waitForServiceExplorer(page: Page) {
  const explorer = page.locator("[data-service-explorer]");
  await expect(explorer).toHaveAttribute("data-visual-ready", "true");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  return explorer;
}

async function hidePersistentChromeForCapture(page: Page) {
  await page.addStyleTag({
    content: `
      html {
        scroll-behavior: auto !important;
      }

      header[data-screen-label="Nav"],
      a[href="#main-content"] {
        visibility: hidden !important;
      }
    `,
  });
}

async function removePersistentChromeForCapture(page: Page) {
  await page.addStyleTag({
    content: `
      html {
        scroll-behavior: auto !important;
      }

      header[data-screen-label="Nav"],
      a[href="#main-content"],
      nextjs-portal,
      [data-next-badge-root],
      [data-nextjs-toast] {
        display: none !important;
      }
    `,
  });
}

async function expectTwoByTwo(cards: ReturnType<Page["locator"]>) {
  await expect(cards).toHaveCount(4);
  const boxes = await cards.evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
      };
    }),
  );

  expect(boxes[0].x).toBe(boxes[2].x);
  expect(boxes[1].x).toBe(boxes[3].x);
  expect(boxes[0].y).toBe(boxes[1].y);
  expect(boxes[2].y).toBe(boxes[3].y);
  expect(boxes[2].y).toBeGreaterThan(boxes[0].y);
  expect(new Set(boxes.map(({ width }) => width)).size).toBe(1);
}

async function completeMapper(page: Page) {
  const mapper = page.locator("[data-workflow-mapper]");
  const choose = async (name: string, final = false) => {
    await mapper.getByRole("radio", { name }).check();
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
}

async function waitForWebglScene(
  page: Page,
  route: string,
  expectedState: "ready" | "unavailable" = "ready",
) {
  await page.goto(route);
  const scene = page.locator("[data-webgl-state]");
  await expect(scene).toBeAttached();
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-webgl-state", expectedState, {
    timeout: 10_000,
  });
  if (expectedState === "ready") {
    await expect(scene).toHaveAttribute("data-visual-ready", "true");
  }
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  return scene;
}

async function expectMinimumTargetSize(
  controls: ReturnType<Page["locator"]>,
  minimum = 44,
) {
  const sizes = await controls.evaluateAll((elements) =>
    elements.map((element) => {
      const bounds = element.getBoundingClientRect();
      return { height: bounds.height, width: bounds.width };
    }),
  );
  expect(sizes.length).toBeGreaterThan(0);
  for (const size of sizes) {
    expect(size.width).toBeGreaterThanOrEqual(minimum);
    expect(size.height).toBeGreaterThanOrEqual(minimum);
  }
}

async function expectVisibleFocus(control: ReturnType<Page["locator"]>) {
  await control.focus();
  await expect(control).toBeFocused();
  const focusStyle = await control.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
    };
  });
  expect(focusStyle.outlineStyle).not.toBe("none");
  expect(focusStyle.outlineWidth).toBeGreaterThan(0);
}

async function installAnimationFrameTracker(page: Page) {
  await page.addInitScript({
    content: `
      (() => {
        const request = window.requestAnimationFrame.bind(window);
        const cancel = window.cancelAnimationFrame.bind(window);
        const pending = new Set();
        let scheduled = 0;
        let executed = 0;
        let cancelled = 0;

        Object.defineProperty(window, "__maslowRafStats", {
          configurable: true,
          value: {
            get pending() { return pending.size; },
            get scheduled() { return scheduled; },
            get executed() { return executed; },
            get cancelled() { return cancelled; },
          },
        });

        window.requestAnimationFrame = (callback) => {
          let id = 0;
          id = request((timestamp) => {
            pending.delete(id);
            executed += 1;
            callback(timestamp);
          });
          pending.add(id);
          scheduled += 1;
          return id;
        };

        window.cancelAnimationFrame = (id) => {
          if (pending.delete(id)) cancelled += 1;
          cancel(id);
        };
      })();
    `,
  });
}

async function animationFrameStats(page: Page) {
  return page.evaluate(() => {
    const stats = (
      window as typeof window & {
        __maslowRafStats?: {
          pending: number;
          scheduled: number;
          executed: number;
          cancelled: number;
        };
      }
    ).__maslowRafStats;
    if (!stats) throw new Error("Animation-frame tracker was not installed");
    return {
      pending: stats.pending,
      scheduled: stats.scheduled,
      executed: stats.executed,
      cancelled: stats.cancelled,
    };
  });
}

async function disableWebgl(page: Page) {
  await page.addInitScript({
    content: `
      (() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (...args) {
          const kind = String(args[0]);
          if (kind === "webgl" || kind === "webgl2" || kind === "experimental-webgl") {
            return null;
          }
          return original.apply(this, args);
        };
      })();
    `,
  });
}

async function removeSceneActivityCapabilities(page: Page) {
  await page.addInitScript({
    content: `
      Object.defineProperty(window, "IntersectionObserver", {
        configurable: true,
        value: undefined,
      });
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        value: undefined,
      });
    `,
  });
}

async function setDocumentVisibility(
  page: Page,
  visibilityState: "hidden" | "visible",
) {
  await page.evaluate((nextVisibilityState) => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => nextVisibilityState,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  }, visibilityState);
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(
    dimensions.clientWidth + 1,
  );
}

test.describe("architecture visual and recovery contracts", () => {
  test("320 hero keeps the working-session action entirely in view", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(architectureRoute);
    await stabilizeVisualPage(page);

    const hero = page.locator('[data-screen-label="Hero"]');
    const cta = hero.getByRole("link", { name: "BOOK A WORKING SESSION" });
    const box = await cta.boundingBox();

    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(800);
    await expect(hero).toHaveScreenshot("architecture-hero-320.png", screenshotOptions);
  });

  test("a canonical partial state resumes at the first unanswered question", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await setSessionItem(
      page,
      mapperStateKey,
      mapperState({ deliverable: "estimate", owner: "operations" }),
    );
    await page.goto(architectureRoute);
    await stabilizeVisualPage(page);

    const mapper = page.locator("[data-workflow-mapper]");
    await expect(
      mapper.getByText("Where does the current information live?", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(mapper.getByLabel("Your prior answers")).toContainText(
      "Estimate or quote",
    );
    await expect(mapper.getByRole("button", { name: /edit the waiting work/i })).toBeVisible();
    await expect(mapper).toHaveScreenshot(
      "workflow-mapper-partial-768.png",
      screenshotOptions,
    );
  });

  for (const [label, state] of [
    [
      "malformed",
      { version: 1, updatedAt: "not-a-date", expiresAt: 1, completed: false },
    ],
    [
      "skipped-order",
      mapperState({ deliverable: "estimate", source: "documents" }),
    ],
    [
      "unknown-version",
      { ...mapperState({ deliverable: "estimate" }), version: 2 },
    ],
    [
      "expired",
      {
        ...mapperState({ deliverable: "estimate" }),
        updatedAt: Date.now() - 7_200_000,
        expiresAt: Date.now() - 3_600_000,
      },
    ],
  ] as const) {
    test(`${label} saved state is removed and starts at question one`, async ({
      page,
    }) => {
      await setSessionItem(page, mapperStateKey, state);
      await page.goto(architectureRoute);

      const mapper = page.locator("[data-workflow-mapper]");
      await expect(
        mapper.getByText("Which deliverable keeps getting delayed?", {
          exact: true,
        }),
      ).toBeVisible();
      await expect(mapper.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        "1",
      );
      await expect
        .poll(() => page.evaluate((key) => window.sessionStorage.getItem(key), mapperStateKey))
        .toBeNull();
    });
  }

  test("invalid JSON saved state is removed and starts at question one", async ({
    page,
  }) => {
    await setRawSessionItem(page, mapperStateKey, "{not-valid-json");
    await page.goto(architectureRoute);

    const mapper = page.locator("[data-workflow-mapper]");
    await expect(
      mapper.getByText("Which deliverable keeps getting delayed?", {
        exact: true,
      }),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate((key) => window.sessionStorage.getItem(key), mapperStateKey),
      )
      .toBeNull();
  });

  test("a keyboard answer persists and resumes after reload", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto(architectureRoute);

    const mapper = page.locator("[data-workflow-mapper]");
    const estimate = mapper.getByRole("radio", { name: "Estimate or quote" });
    const next = mapper.getByRole("button", { name: "CONTINUE" });
    await estimate.focus();
    await page.keyboard.press("Space");
    await expect(estimate).toBeChecked();
    await page.keyboard.press("Tab");
    await expect(next).toBeFocused();
    await page.keyboard.press("Enter");

    const ownerQuestion = mapper.locator("legend").filter({
      hasText: "Whose judgment is the work waiting for?",
    });
    await expect(ownerQuestion).toBeFocused();
    await page.reload();
    await expect(ownerQuestion).toBeVisible();
    await expect(mapper.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "2",
    );
    await expect(mapper.getByLabel("Your prior answers")).toContainText(
      "Estimate or quote",
    );
  });

  test("the mapper remains usable when session storage is unavailable", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.addInitScript({
      content: `
        for (const method of ["getItem", "setItem", "removeItem"]) {
          const original = Storage.prototype[method];
          Object.defineProperty(Storage.prototype, method, {
            configurable: true,
            value(...args) {
              if (this === window.sessionStorage) {
                throw new DOMException("Storage unavailable", "SecurityError");
              }
              return original.apply(this, args);
            },
          });
        }
      `,
    });
    await page.goto(architectureRoute);
    await completeMapper(page);
    await expect(
      page.getByRole("heading", {
        name: "Request to estimator-reviewed draft",
      }),
    ).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  test("a completed categorical state restores the mapped decision receipt", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await setSessionItem(
      page,
      mapperStateKey,
      mapperState(
        {
          deliverable: "estimate",
          owner: "operations",
          source: "documents",
          boundary: "commitment",
        },
        true,
      ),
    );
    await page.goto(architectureRoute);
    await page.reload();
    await stabilizeVisualPage(page);

    const result = page.locator("[data-workflow-result]");
    const receipt = result.locator("[data-decision-receipt]");
    await expect(result.getByRole("heading", { name: "Request to estimator-reviewed draft" })).toBeVisible();
    await expect(receipt).toContainText("Estimate or quote");
    await expect(receipt).toHaveScreenshot(
      "workflow-decision-receipt-1024.png",
      screenshotOptions,
    );

    const tray = result.locator("[data-dossier-tray]");
    const traySummary = tray.locator("summary");
    await expectVisibleFocus(traySummary);
    await page.keyboard.press("Enter");
    await expect(tray).toHaveAttribute("open", "");
    const dossier = tray.locator("[data-dossier]");
    await expect(dossier).toContainText("To define in a working session");
    await expect(dossier).toHaveScreenshot(
      "workflow-dossier-open-1024.png",
      screenshotOptions,
    );
    const accessibility = await new AxeBuilder({ page })
      .include("[data-dossier-tray]")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      accessibility.violations,
      accessibility.violations.map(({ id }) => id).join(", "),
    ).toHaveLength(0);
  });

  test("a failed contact submit keeps the saved mapper progress and brief", async ({
    page,
  }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "Unable to send" }),
      });
    });
    await page.goto(architectureRoute);
    await completeMapper(page);
    await page
      .locator("[data-workflow-result]")
      .getByRole("link", { name: "BOOK A WORKING SESSION" })
      .click();
    await expect(page).toHaveURL(/\/contact$/);

    await page.getByLabel("Full name").fill("Test User");
    await page.getByLabel("Work email").fill("test@example.com");
    await page.getByLabel("Company").fill("Example Company");
    await page.getByLabel("What are you exploring?").selectOption("AI employee pilot");
    await page.getByRole("button", { name: /book my working session/i }).click();

    await expect(page.getByText("Unable to send", { exact: true })).toBeVisible();
    const [savedState, savedBrief] = await page.evaluate(([stateKey, briefKey]) => [
      window.sessionStorage.getItem(stateKey),
      window.sessionStorage.getItem(briefKey),
    ], [mapperStateKey, workflowBriefKey]);
    expect(savedState).not.toBeNull();
    expect(savedBrief).not.toBeNull();
  });

  test("production evidence remains paired with its case study card", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(architectureRoute);
    await stabilizeVisualPage(page);

    const pairing = page.locator('[data-evidence-receipt]').filter({ hasText: "PRODUCTION" }).first().locator("..");
    await expect(pairing.getByRole("link", { name: /infinite ai os/i })).toBeVisible();
    await expect(
      pairing.locator('[data-evidence-status="production"]'),
    ).toHaveText("PRODUCTION EVIDENCE");
    await expect(pairing).toHaveScreenshot(
      "production-evidence-pairing-1440.png",
      screenshotOptions,
    );
  });

  test("buyer guidance and the direct action remain available without JavaScript", async ({
    browser,
  }, testInfo) => {
    const baseURL = String(
      testInfo.project.use.baseURL ?? "http://localhost:3000",
    );
    const context = await browser.newContext({
      baseURL,
      javaScriptEnabled: false,
      viewport: { width: 320, height: 900 },
    });
    const page = await context.newPage();

    try {
      await page.goto(architectureRoute);
      await expect(
        page.getByText("Which deliverable keeps getting delayed?", {
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page
          .locator('[data-screen-label="Hero"]')
          .getByRole("link", { name: "BOOK A WORKING SESSION" }),
      ).toHaveAttribute("href", "/contact");
    } finally {
      await context.close();
    }
  });
});

test.describe("homepage intent-path visual contracts", () => {
  test("320 first viewport contains the complete primary action", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(homepageRoute);
    await stabilizeVisualPage(page);

    const primaryAction = page
      .locator('[data-screen-label="Hero"]')
      .getByRole("link", { name: "BOOK A WORKING SESSION", exact: true });
    const box = await primaryAction.boundingBox();

    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(800);
    await expect(page).toHaveScreenshot(
      "homepage-first-viewport-320.png",
      screenshotOptions,
    );
  });

  test("320 metrics form an exact two-by-two proof grid", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(homepageRoute);
    await stabilizeVisualPage(page);

    const metrics = page
      .locator('[data-screen-label="Metrics"]')
      .locator(":scope > div > div");
    await expect(metrics).toHaveCount(4);
    const boxes = await metrics.evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
        };
      }),
    );
    const gridBox = await metrics.first().locator("..").boundingBox();

    expect(gridBox).not.toBeNull();
    expect(boxes[0].x).toBe(boxes[2].x);
    expect(boxes[1].x).toBe(boxes[3].x);
    expect(boxes[0].y).toBe(boxes[1].y);
    expect(boxes[2].y).toBe(boxes[3].y);
    expect(boxes[2].y).toBeGreaterThan(boxes[0].y);
    expect(boxes.map(({ x }) => x)).toEqual([
      Math.round(gridBox!.x),
      Math.round(gridBox!.x + gridBox!.width / 2),
      Math.round(gridBox!.x),
      Math.round(gridBox!.x + gridBox!.width / 2),
    ]);
    expect(new Set(boxes.map(({ width }) => width))).toEqual(
      new Set([Math.round(gridBox!.width / 2)]),
    );
    await page.addStyleTag({
      content: `
        header,
        a[href="#main-content"] {
          visibility: hidden !important;
        }
      `,
    });
    await expect(metrics.first().locator("..")).toHaveScreenshot(
      "homepage-metrics-320.png",
      screenshotOptions,
    );
  });

  for (const width of [320, 768, 1024, 1440]) {
    test(`${width}px homepage has no horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(homepageRoute);
      await stabilizeVisualPage(page);

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(
        dimensions.clientWidth + 1,
      );
    });
  }

  for (const viewport of [
    { width: 320, height: 1000 },
    { width: 768, height: 1000 },
    { width: 1440, height: 1000 },
  ]) {
    test(`${viewport.width}px workflow context stays decision-ready`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto(homepageRoute);
      await stabilizeVisualPage(page);

      const workflowContext = page.locator(
        '[data-screen-label="Workflow Context"]',
      );
      await expect(
        workflowContext.getByRole("heading", {
          name: "Turn one waiting workflow into a decision-ready brief.",
        }),
      ).toBeVisible();
      await expect(workflowContext).toContainText("ILLUSTRATIVE PATTERN");
      await expect(workflowContext).toContainText(
        "A working-session starting point",
      );
      await page.addStyleTag({
        content: `
          header,
          a[href="#main-content"] {
            visibility: hidden !important;
          }
        `,
      });
      await expect(workflowContext).toHaveScreenshot(
        `homepage-workflow-context-${viewport.width}.png`,
        screenshotOptions,
      );
    });
  }

  test("Copilot depth stays optional and opens from the keyboard", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1000 });
    await page.goto(homepageRoute);
    await stabilizeVisualPage(page);

    const section = page.locator('[data-screen-label="Keep Copilot"]');
    const disclosure = section.locator("[data-depth-control]");
    const summary = disclosure.locator("summary");
    const optionalDetail = section.getByText(
      /It does not know your estimating logic/,
    );

    await expect(disclosure).not.toHaveAttribute("open", "");
    await expect(optionalDetail).toBeHidden();
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(disclosure).toHaveAttribute("open", "");
    await expect(optionalDetail).toBeVisible();
    await expect(section).toHaveScreenshot(
      "homepage-copilot-open-768.png",
      screenshotOptions,
    );
  });

  test("core homepage content remains readable without JavaScript", async ({
    browser,
  }, testInfo) => {
    const baseURL = String(
      testInfo.project.use.baseURL ?? "http://localhost:3000",
    );
    const context = await browser.newContext({
      baseURL,
      javaScriptEnabled: false,
    });
    const page = await context.newPage();

    try {
      await page.goto(homepageRoute);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: /AI employees for the work that waits/,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", {
          name: "BOOK A WORKING SESSION",
          exact: true,
        }).first(),
      ).toBeVisible();
      await expect(page.getByText("90 days", { exact: true })).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: "Turn one waiting workflow into a decision-ready brief.",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: "Keep Copilot. Add the layer it's missing.",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", {
          name: "See how one waiting workflow moves",
        }),
      ).toBeVisible();
    } finally {
      await context.close();
    }
  });
});

test.describe("services stage explorer contracts", () => {
  test("desktop tabs support click, Arrow keys, Home, End, and panel selection", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto(servicesRoute);
    await stabilizeVisualPage(page);
    const explorer = await waitForServiceExplorer(page);
    const tabs = explorer.getByRole("tab");
    const structureTab = explorer.getByRole("tab", { name: /Structure/ });

    await expect(tabs).toHaveCount(5);
    await structureTab.click();
    await expect(page).toHaveURL(/\/services#structure$/);
    await expect(structureTab).toHaveAttribute("aria-selected", "true");
    await expect(
      explorer.locator('[data-service-stage="structure"]'),
    ).toBeVisible();

    await structureTab.focus();
    await page.keyboard.press("ArrowRight");
    const buildTab = explorer.getByRole("tab", { name: /Build/ });
    await expect(buildTab).toBeFocused();
    await expect(buildTab).toHaveAttribute("aria-selected", "true");
    await expect(page).toHaveURL(/\/services#build$/);
    await expect(explorer.locator('[data-service-stage="build"]')).toBeVisible();

    await page.keyboard.press("Home");
    const assessTab = explorer.getByRole("tab", { name: /Assess/ });
    await expect(assessTab).toBeFocused();
    await expect(assessTab).toHaveAttribute("aria-selected", "true");
    await expect(page).toHaveURL(/\/services#assess$/);

    await page.keyboard.press("End");
    const ownTab = explorer.getByRole("tab", { name: /Own/ });
    await expect(ownTab).toBeFocused();
    await expect(ownTab).toHaveAttribute("aria-selected", "true");
    await expect(page).toHaveURL(/\/services#own$/);
    await expect(explorer.locator('[data-service-stage="own"]')).toBeVisible();
  });

  test("a direct build hash exposes the correct panel and complete tab row below the sticky header", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto(`${servicesRoute}#build`);
    await stabilizeVisualPage(page);
    const explorer = await waitForServiceExplorer(page);
    const tabList = explorer.getByRole("tablist");
    const buildTab = explorer.getByRole("tab", { name: /Build/ });
    const buildPanel = explorer.locator('[data-service-stage="build"]');

    await expect(buildTab).toHaveAttribute("aria-selected", "true");
    await expect(buildPanel).toBeVisible();
    await expect(buildPanel).not.toHaveAttribute("hidden", "");
    await expect(buildPanel).toContainText("A testable workflow system");
    await expect(tabList.getByRole("tab")).toHaveCount(5);

    await expect
      .poll(
        async () => {
          const [headerBox, tabListBox] = await Promise.all([
            page.locator('header[data-screen-label="Nav"]').boundingBox(),
            tabList.boundingBox(),
          ]);
          if (!headerBox || !tabListBox) return false;
          const headerBottom = headerBox.y + headerBox.height;
          const tabListBottom = tabListBox.y + tabListBox.height;
          return tabListBox.y >= headerBottom - 1 && tabListBottom <= 900;
        },
        { timeout: 1_200, intervals: [100] },
      )
      .toBe(true);

    await hidePersistentChromeForCapture(page);
    await expect(explorer).toHaveScreenshot(
      "services-desktop-tabs-build-1024.png",
      screenshotOptions,
    );
  });

  test("1440 desktop explorer preserves the full tab and panel hierarchy", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${servicesRoute}#deploy`);
    await stabilizeVisualPage(page);
    const explorer = await waitForServiceExplorer(page);

    await expect(explorer.getByRole("tab", { name: /Deploy/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(explorer.locator('[data-service-stage="deploy"]')).toBeVisible();
    await hidePersistentChromeForCapture(page);
    await expect(explorer).toHaveScreenshot(
      "services-desktop-tabs-deploy-1440.png",
      screenshotOptions,
    );
  });

  test("320 native accordion permits one open stage and a close-all state", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(servicesRoute);
    await stabilizeVisualPage(page);
    const explorer = await waitForServiceExplorer(page);
    const stages = explorer.locator("[data-service-stage]");
    const summaries = stages.locator("summary");

    await expect(stages).toHaveCount(5);
    await expect(stages.first()).toHaveAttribute("open", "");
    expect(
      await stages.evaluateAll((elements) =>
        elements.filter((element) => (element as HTMLDetailsElement).open)
          .length,
      ),
    ).toBe(1);

    const targets = await summaries.evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      }),
    );
    for (const target of targets) {
      expect(target.width).toBeGreaterThanOrEqual(44);
      expect(target.height).toBeGreaterThanOrEqual(44);
    }

    await summaries.nth(1).click();
    await expect(stages.nth(0)).not.toHaveAttribute("open", "");
    await expect(stages.nth(1)).toHaveAttribute("open", "");
    expect(
      await stages.evaluateAll((elements) =>
        elements.filter((element) => (element as HTMLDetailsElement).open)
          .length,
      ),
    ).toBe(1);
    await expect(page).toHaveURL(/\/services#structure$/);

    await hidePersistentChromeForCapture(page);
    await expect(explorer.locator(":scope > div")).toHaveScreenshot(
      "services-mobile-accordion-320.png",
      screenshotOptions,
    );

    await summaries.nth(1).click();
    expect(
      await stages.evaluateAll((elements) =>
        elements.filter((element) => (element as HTMLDetailsElement).open)
          .length,
      ),
    ).toBe(0);

    await page.keyboard.press("Tab");
    const buildSummary = summaries.nth(2);
    await expect(buildSummary).toBeFocused();
    const focusStyle = await buildSummary.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: Number.parseFloat(style.outlineWidth),
      };
    });
    expect(focusStyle.outlineStyle).not.toBe("none");
    expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(3);
    await expect(buildSummary).toHaveScreenshot(
      "services-mobile-summary-focus-320.png",
      screenshotOptions,
    );

    await page.keyboard.press("Enter");
    await expect(stages.nth(2)).toHaveAttribute("open", "");
    expect(
      await stages.evaluateAll((elements) =>
        elements.filter((element) => (element as HTMLDetailsElement).open)
          .length,
      ),
    ).toBe(1);
  });

  for (const width of [320, 768, 1024, 1440]) {
    test(`${width}px services page has no horizontal overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(servicesRoute);
      await stabilizeVisualPage(page);
      await waitForServiceExplorer(page);

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(
        dimensions.clientWidth + 1,
      );
    });
  }

  test("all five stages and their service content remain reachable without JavaScript", async ({
    browser,
  }, testInfo) => {
    const baseURL = String(
      testInfo.project.use.baseURL ?? "http://localhost:3000",
    );
    const context = await browser.newContext({
      baseURL,
      javaScriptEnabled: false,
      viewport: { width: 1024, height: 900 },
    });
    const page = await context.newPage();

    try {
      await page.goto(servicesRoute);
      const explorer = page.locator("[data-service-explorer]");
      const stages = explorer.locator("[data-service-stage]");
      await expect(stages).toHaveCount(5);
      await expect(explorer.locator("article")).toHaveCount(15);

      for (const [index, name] of [
        "Assess",
        "Structure",
        "Build",
        "Deploy",
        "Own",
      ].entries()) {
        await expect(stages.nth(index)).toHaveAttribute("open", "");
        await expect(
          stages.nth(index).getByRole("heading", { name: new RegExp(name) }),
        ).toBeVisible();
      }
    } finally {
      await context.close();
    }
  });

  test("a canonical documents brief recommends Structure and activates it", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await setSessionItem(page, workflowBriefKey, {
      version: 1,
      patternId: "estimate-review",
      title: "Request to estimator-reviewed draft",
      selections: {
        deliverable: { id: "estimate", label: "Estimate or quote" },
        owner: {
          id: "operations",
          label: "Operations or estimating lead",
        },
        source: {
          id: "documents",
          label: "SharePoint, Drive, or file repository",
        },
        boundary: {
          id: "commitment",
          label: "Price or business commitment",
        },
      },
    });
    await page.goto(servicesRoute);
    await stabilizeVisualPage(page);
    const explorer = await waitForServiceExplorer(page);
    const recommendation = explorer.locator(
      '[data-service-recommendation="structure"]',
    );

    await expect(recommendation).toBeVisible();
    await expect(recommendation).toContainText(
      "Begin the service conversation at Structure.",
    );
    await expect(recommendation).toContainText("Estimate or quote");
    await expect(recommendation).toContainText(
      "SharePoint, Drive, or file repository",
    );
    await recommendation
      .getByRole("button", { name: "VIEW STRUCTURE STAGE" })
      .click();
    await expect(page).toHaveURL(/\/services#structure$/);
    await expect(explorer.getByRole("tab", { name: /Structure/ })).toBeFocused();
    await expect(explorer.locator('[data-service-stage="structure"]')).toBeVisible();

    await hidePersistentChromeForCapture(page);
    await expect(recommendation).toHaveScreenshot(
      "services-recommendation-structure-1024.png",
      screenshotOptions,
    );
  });

  test("invalid saved workflow data does not create a service recommendation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await setSessionItem(page, workflowBriefKey, {
      version: 1,
      patternId: "estimate-review",
      selections: {
        deliverable: { id: "estimate", label: "Estimate or quote" },
        owner: {
          id: "operations",
          label: "Operations or estimating lead",
        },
        source: { id: "invented", label: "Untrusted repository" },
        boundary: {
          id: "commitment",
          label: "Price or business commitment",
        },
      },
    });
    await page.goto(servicesRoute);
    await waitForServiceExplorer(page);

    await expect(page.locator("[data-service-recommendation]")).toHaveCount(0);
    await expect(
      page.getByText("Begin the service conversation at", { exact: false }),
    ).toHaveCount(0);
  });
});

test.describe("engagement decision-rail contracts", () => {
  test("the working-session action precedes the 90-day rail in DOM order", async ({
    page,
  }) => {
    await page.goto(engagementRoute);

    const earlyAction = page.locator("[data-engagement-early-cta]");
    const rail = page.locator("[data-engagement-rail]");

    await expect(earlyAction).toBeVisible();
    await expect(rail).toBeVisible();
    expect(
      await page
        .locator("[data-engagement-early-cta], [data-engagement-rail]")
        .evaluateAll((elements) =>
          elements.map((element) =>
            element.hasAttribute("data-engagement-early-cta")
              ? "action"
              : "rail",
          ),
        ),
    ).toEqual(["action", "rail"]);
  });

  test("the 90-day door deep-links to the decision rail", async ({ page }) => {
    await page.goto(engagementRoute);

    const doors = page.locator('[data-screen-label="Two Doors"]');
    await expect(
      doors.getByRole("link", { name: "EXPLORE THE 90-DAY FOUNDATION" }),
    ).toHaveAttribute("href", "/how-we-engage#ninety-days");
  });

  for (const viewport of [
    { width: 320, height: 1000 },
    { width: 1440, height: 1000 },
  ]) {
    test(`${viewport.width}px keeps the early action and first decision phase visually bounded`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(engagementRoute);
      await stabilizeVisualPage(page);
      await hidePersistentChromeForCapture(page);

      const earlyAction = page.locator("[data-engagement-early-cta]");
      const firstPhase = page.locator("[data-engagement-phase]").first();

      await expect(earlyAction).toContainText(
        "Frame one waiting workflow before you choose an engagement.",
      );
      await expect(firstPhase).toContainText("GO/NO-GO · END OF WEEK 2");
      await expect(earlyAction).toHaveScreenshot(
        `engagement-early-action-${viewport.width}.png`,
        screenshotOptions,
      );
      await expect(firstPhase).toHaveScreenshot(
        `engagement-first-phase-${viewport.width}.png`,
        screenshotOptions,
      );
    });
  }

  test("every phase exposes its decision and retained evidence", async ({
    page,
  }) => {
    await page.goto(engagementRoute);

    const phases = page.locator("[data-engagement-phase]");
    await expect(phases).toHaveCount(4);
    for (let index = 0; index < 4; index += 1) {
      const phase = phases.nth(index);
      const details = phase.locator("dl > div");

      await expect(details).toHaveCount(2);
      await expect(details.nth(0).locator("dt")).toContainText(
        /GO\/NO-GO|OPERATING DECISION/,
      );
      await expect(details.nth(0).locator("dd")).not.toBeEmpty();
      await expect(details.nth(1).locator("dt")).toHaveText(
        "WHAT YOU RETAIN",
      );
      await expect(details.nth(1).locator("dd")).not.toBeEmpty();
    }
  });

  test("engagement actions preserve 44px minimum targets", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 1000 });
    await page.goto(engagementRoute);

    const actions = page.locator(
      '[data-screen-label="Two Doors"] a, [data-engagement-early-cta] a',
    );
    await expect(actions).toHaveCount(3);
    const sizes = await actions.evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      }),
    );
    for (const size of sizes) {
      expect(size.width).toBeGreaterThanOrEqual(44);
      expect(size.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("the rail fails open when IntersectionObserver is unavailable", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.addInitScript("delete window.IntersectionObserver");
    await page.goto(engagementRoute);

    const rail = page.locator("[data-engagement-rail]");
    const phases = rail.locator("[data-engagement-phase]");
    await expect(rail).toHaveAttribute("data-reading-phase", "all");
    await expect(phases).toHaveCount(4);
    expect(
      await phases.evaluateAll((elements) =>
        elements.every((element) => element.dataset.active === "1"),
      ),
    ).toBe(true);
    await expect(phases.last()).toContainText("WHAT YOU RETAIN");
    expect(pageErrors).toEqual([]);
  });

  test("reduced motion exposes every rail phase without scroll-driven emphasis", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(engagementRoute);

    const rail = page.locator("[data-engagement-rail]");
    const phases = rail.locator("[data-engagement-phase]");
    await expect(rail).toHaveAttribute("data-reading-phase", "all");
    await expect(rail).not.toHaveAttribute("data-rail-enhanced", "1");
    expect(
      await phases.evaluateAll((elements) =>
        elements.every((element) => element.dataset.active === "1"),
      ),
    ).toBe(true);
  });

  for (const width of [320, 768, 1024, 1440]) {
    test(`${width}px engagement page has no horizontal overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(engagementRoute);

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(
        dimensions.clientWidth + 1,
      );
    });
  }

  test("all four decision phases remain readable without JavaScript", async ({
    browser,
  }, testInfo) => {
    const baseURL = String(
      testInfo.project.use.baseURL ?? "http://localhost:3000",
    );
    const context = await browser.newContext({
      baseURL,
      javaScriptEnabled: false,
      viewport: { width: 320, height: 900 },
    });
    const page = await context.newPage();

    try {
      await page.goto(engagementRoute);
      const phases = page.locator("[data-engagement-phase]");
      await expect(phases).toHaveCount(4);
      for (let index = 0; index < 4; index += 1) {
        await expect(phases.nth(index)).toContainText("WHAT YOU RETAIN");
      }
    } finally {
      await context.close();
    }
  });
});

test.describe("case-study proof hierarchy contracts", () => {
  test("index cards keep one semantic destination and status-only metadata", async ({
    page,
  }) => {
    await page.goto(caseIndexRoute);

    const linkedCards = page.locator("a:has(> article[data-card-kind])");
    const productionCards = page.locator(
      'article[data-card-kind="case-study"]',
    );
    const scenarioCards = page.locator('article[data-card-kind="scenario"]');

    await expect(linkedCards).toHaveCount(5);
    await expect(productionCards).toHaveCount(2);
    await expect(scenarioCards).toHaveCount(3);

    for (let index = 0; index < 5; index += 1) {
      const link = linkedCards.nth(index);
      const card = link.locator(":scope > article");
      await expect(card).toHaveCount(1);
      await expect(card.locator("a, button")).toHaveCount(0);

      const [linkBox, cardBox] = await Promise.all([
        link.boundingBox(),
        card.boundingBox(),
      ]);
      expect(linkBox).not.toBeNull();
      expect(cardBox).not.toBeNull();
      expect(Math.round(linkBox!.width)).toBe(Math.round(cardBox!.width));
      expect(Math.round(linkBox!.height)).toBe(Math.round(cardBox!.height));
    }

    const scenarioMetadata = page.locator("[data-scenario-status]");
    await expect(scenarioMetadata).toHaveCount(3);
    expect(
      await scenarioMetadata.evaluateAll((elements) =>
        elements.every(
          (element) =>
            element.tagName === "SPAN" &&
            element.querySelector("a, button") === null &&
            window.getComputedStyle(element).position === "static" &&
            element.getBoundingClientRect().height > 0,
        ),
      ),
    ).toBe(true);
    await expect(
      productionCards.locator('[data-card-evidence-status="production"]'),
    ).toHaveCount(2);
    await expect(
      scenarioCards.locator('[data-card-evidence-status="illustrative"]'),
    ).toHaveCount(3);
  });

  for (const viewport of [
    { width: 320, height: 1000 },
    { width: 1440, height: 1000 },
  ]) {
    test(`${viewport.width}px index makes the production-to-illustrative boundary explicit`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(caseIndexRoute);
      await stabilizeVisualPage(page);
      await hidePersistentChromeForCapture(page);

      const productionCard = page
        .locator('article[data-card-kind="case-study"]')
        .last();
      const transition = page.getByRole("heading", {
        name: "What a typical engagement looks like.",
      });
      const firstScenario = page
        .locator('article[data-card-kind="scenario"]')
        .first();
      await expect(productionCard).toContainText("PRODUCTION EVIDENCE");
      await expect(transition).toBeVisible();
      await expect(firstScenario).toContainText("ILLUSTRATIVE SCENARIO");

      const [productionBox, scenarioBox] = await Promise.all([
        productionCard.boundingBox(),
        firstScenario.boundingBox(),
      ]);
      expect(productionBox).not.toBeNull();
      expect(scenarioBox).not.toBeNull();
      const transitionHeight =
        scenarioBox!.y + Math.min(scenarioBox!.height, 340) - productionBox!.y;
      await page.setViewportSize({
        width: viewport.width,
        height: Math.ceil(transitionHeight) + 2,
      });
      await productionCard.evaluate((element) => {
        window.scrollTo(
          0,
          window.scrollY + element.getBoundingClientRect().top,
        );
      });
      const [scrolledProductionBox, scrolledScenarioBox] = await Promise.all([
        productionCard.boundingBox(),
        firstScenario.boundingBox(),
      ]);
      expect(scrolledProductionBox).not.toBeNull();
      expect(scrolledScenarioBox).not.toBeNull();
      const clipY = Math.max(0, scrolledProductionBox!.y);
      const clipBottom =
        scrolledScenarioBox!.y + Math.min(scrolledScenarioBox!.height, 340);
      await expect(page).toHaveScreenshot(
        `case-index-proof-transition-${viewport.width}.png`,
        {
          ...screenshotOptions,
          clip: {
            x: 0,
            y: clipY,
            width: viewport.width,
            height: clipBottom - clipY,
          },
        },
      );
    });
  }

  for (const detail of caseDetailRoutes) {
    for (const viewport of [
      { width: 320, height: 1000 },
      { width: 1440, height: 1000 },
    ]) {
      test(`${detail.slug} ${viewport.width}px preserves hero, executive summary, and chapter hierarchy`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(detail.route);
        await stabilizeVisualPage(page);
        await hidePersistentChromeForCapture(page);

        const hero = page.locator('[data-screen-label="Hero"]');
        const summary = page.locator("[data-case-summary]");
        const chapterNav = page.locator("[data-chapter-nav]");
        await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(
          summary.locator(":scope > div > dl > div > dt"),
        ).toHaveCount(4);
        await expect(
          summary.locator('[data-evidence-status="production"]'),
        ).toHaveText("PRODUCTION EVIDENCE");
        await expect(chapterNav.locator("[data-chapter-link]")).toHaveCount(
          detail.slug === "infinite-ai-os" ? 6 : 5,
        );

        await expect(hero).toHaveScreenshot(
          `case-${detail.slug}-hero-${viewport.width}.png`,
          screenshotOptions,
        );
        await expect(summary).toHaveScreenshot(
          `case-${detail.slug}-summary-${viewport.width}.png`,
          screenshotOptions,
        );
        await expect(chapterNav).toHaveScreenshot(
          `case-${detail.slug}-chapter-nav-${viewport.width}.png`,
          screenshotOptions,
        );
      });
    }
  }

  test("Infinite AI OS keeps May recreations and value assumptions illustrative", async ({
    page,
  }) => {
    await page.goto("/case-studies/infinite-ai-os");

    const summary = page.locator("[data-case-summary]");
    const pilot = page.locator('[data-screen-label="Proof"]');
    const value = page.locator('[data-screen-label="Value"]');
    await expect(page.locator("[data-evidence-receipt]")).toHaveCount(3);
    await expect(
      summary.locator('[data-evidence-status="production"]'),
    ).toHaveText("PRODUCTION EVIDENCE");
    await expect(pilot).toContainText("PILOT PATTERNS · ILLUSTRATIVE");
    await expect(pilot).toContainText(
      "Stylized recreations from the May pilot",
    );
    await expect(
      pilot.locator('[data-evidence-status="illustrative"]'),
    ).toHaveText("ILLUSTRATIVE PATTERN");
    await expect(value).toContainText("PLANNING MODEL · ILLUSTRATIVE");
    await expect(
      value.locator('[data-evidence-status="illustrative"]'),
    ).toHaveText("ILLUSTRATIVE PATTERN");
    await expect(value).toContainText("not a realized client result");
  });

  test("AgentHub scopes the production routing result to first-tool selection", async ({
    page,
  }) => {
    await page.goto("/case-studies/agenthub");

    const routing = page.locator('[data-screen-label="Intent Engineering"]');
    const receipt = routing.locator("[data-evidence-receipt]");
    const evidenceSections = [
      page.locator("[data-case-summary]"),
      page.locator('[data-screen-label="RAG Pipeline"]'),
      routing,
      page.locator('[data-screen-label="Trust and Stack"]'),
    ];
    await expect(page.locator("[data-evidence-receipt]")).toHaveCount(4);
    for (const section of evidenceSections) {
      await expect(section.locator("[data-evidence-receipt]")).toHaveCount(1);
      await expect(
        section.locator('[data-evidence-status="production"]'),
      ).toHaveText("PRODUCTION EVIDENCE");
    }
    await expect(receipt.locator('[data-evidence-status="production"]')).toHaveText(
      "PRODUCTION EVIDENCE",
    );
    await expect(receipt).toContainText(
      "26 of 28 live-pipeline cases selected the expected first tool, displayed as 93% after rounding.",
    );
    await expect(receipt).toContainText(
      "The test suite checks expected first-tool selection only. It does not test answer correctness, citation accuracy, retrieval quality, unseen-query reliability, adoption, or business impact.",
    );
  });

  for (const detail of caseDetailRoutes) {
    test(`${detail.slug} chapter links move keyboard focus below the sticky header`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto(detail.route);

      const link = page
        .locator("[data-chapter-nav]")
        .getByRole("link", { name: new RegExp(detail.chapterLabel, "i") });
      const target = page.locator(`#${detail.chapterId}`);
      await link.focus();
      await page.keyboard.press("Enter");

      await expect(page).toHaveURL(new RegExp(`#${detail.chapterId}$`));
      await expect(target).toBeFocused();
      await expect
        .poll(
          () =>
            page.evaluate((id) => {
              const header = document.querySelector(
                'header[data-screen-label="Nav"]',
              );
              const heading = document.getElementById(id);
              if (!(header instanceof HTMLElement) || !heading) return false;
              const headerBottom = header.getBoundingClientRect().bottom;
              const headingTop = heading.getBoundingClientRect().top;
              return (
                headingTop >= headerBottom - 1 && headingTop < window.innerHeight
              );
            }, detail.chapterId),
          { timeout: 3_000, intervals: [100, 150, 250] },
        )
        .toBe(true);
    });
  }

  for (const detail of caseDetailRoutes) {
    test(`${detail.slug} depth disclosure opens from the keyboard with visible focus`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 320, height: 1000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(detail.route);
      await stabilizeVisualPage(page);

      const disclosure = page.locator("details[data-depth-control]").first();
      const summary = disclosure.locator("summary");
      const body = disclosure.locator(":scope > div");
      await expect(disclosure).not.toHaveAttribute("open", "");
      await expect(body).toBeHidden();
      await summary.focus();
      const focusStyle = await summary.evaluate((element) => {
        const style = window.getComputedStyle(element);
        return {
          outlineStyle: style.outlineStyle,
          outlineWidth: Number.parseFloat(style.outlineWidth),
        };
      });
      expect(focusStyle.outlineStyle).not.toBe("none");
      expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(3);
      await page.keyboard.press("Enter");
      await expect(disclosure).toHaveAttribute("open", "");
      await expect(body).toBeVisible();

      if (detail.slug === "agenthub") {
        await hidePersistentChromeForCapture(page);
        await expect(summary).toHaveScreenshot(
          "case-agenthub-depth-open-focus-320.png",
          screenshotOptions,
        );
        await expect(body).toHaveScreenshot(
          "case-agenthub-depth-open-body-320.png",
          screenshotOptions,
        );
      }
    });
  }

  test("native depth disclosures stay operable without JavaScript", async ({
    browser,
  }, testInfo) => {
    const baseURL = String(
      testInfo.project.use.baseURL ?? "http://localhost:3000",
    );

    for (const detail of caseDetailRoutes) {
      const context = await browser.newContext({
        baseURL,
        javaScriptEnabled: false,
        viewport: { width: 320, height: 900 },
      });
      const page = await context.newPage();
      try {
        await page.goto(detail.route);
        const disclosure = page.locator("details[data-depth-control]").first();
        const body = disclosure.locator(":scope > div");
        await expect(disclosure.locator("summary")).toBeVisible();
        await expect(body).toBeHidden();
        await disclosure.locator("summary").click();
        await expect(disclosure).toHaveAttribute("open", "");
        await expect(body).toBeVisible();
      } finally {
        await context.close();
      }
    }
  });

  for (const detail of caseDetailRoutes) {
    for (const width of [320, 768]) {
      test(`${detail.slug} ${width}px hero metrics form a two-by-two grid`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(detail.route);
        const metricCards = page.locator(
          '[data-screen-label="Hero"] > div > div:last-child > div',
        );
        await expectTwoByTwo(metricCards);
      });
    }
  }

  for (const width of [320, 768, 1024, 1440]) {
    test(`${width}px case-study routes have no horizontal overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of [
        caseIndexRoute,
        ...caseDetailRoutes.map((detail) => detail.route),
      ]) {
        await page.goto(route);
        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }));
        expect(
          dimensions.scrollWidth,
          `${route} overflowed at ${width}px`,
        ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
      }
    });
  }
});

test.describe("intentional WebGL explainer contracts", () => {
  for (const sceneCase of webglSceneCases) {
    for (const viewport of [
      { width: 320, height: 900 },
      { width: 1440, height: 1000 },
    ]) {
      test(`${sceneCase.slug} ${viewport.width}px first paint stays meaningful without JavaScript`, async ({
        browser,
      }, testInfo) => {
        const baseURL = String(
          testInfo.project.use.baseURL ?? "http://localhost:3000",
        );
        const context = await browser.newContext({
          baseURL,
          javaScriptEnabled: false,
          viewport,
        });
        const page = await context.newPage();

        try {
          await page.goto(sceneCase.route);
          const placeholder = page.locator(
            `section[aria-label="${sceneCase.placeholderLabel}"]`,
          );
          await expect(placeholder).toBeVisible();
          await expect(placeholder).toContainText("optional 3D view");
          if (sceneCase.slug === "hybrid-rag") {
            await expect(placeholder.locator("strong")).toHaveCount(3);
          } else {
            await expect(placeholder.locator("span")).toHaveCount(6);
          }
          await expectNoHorizontalOverflow(page);
          await page
            .locator('header[data-screen-label="Nav"], a[href="#main-content"]')
            .evaluateAll((elements) => {
              elements.forEach((element) => {
                (element as HTMLElement).style.display = "none";
              });
            });
          await expect(placeholder).toHaveScreenshot(
            `${sceneCase.slug}-first-paint-${viewport.width}.png`,
            screenshotOptions,
          );
        } finally {
          await context.close();
        }
      });
    }
  }

  for (const sceneCase of webglSceneCases) {
    test(`${sceneCase.slug} hydration never exposes an empty initializing canvas`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 320, height: 900 });
      await page.addInitScript(
        ({ placeholderLabel }) => {
          type PaintRecord = {
            kind: "placeholder" | "scene";
            state: string | null;
            fallback: string | null;
            meaningful: boolean;
          };
          const records: PaintRecord[] = [];
          (
            window as typeof window & {
              __maslowScenePaints?: PaintRecord[];
            }
          ).__maslowScenePaints = records;

          const record = () => {
            const placeholder = document.querySelector(
              `section[aria-label="${placeholderLabel}"]`,
            );
            const scene = document.querySelector("[data-webgl-state]");
            const fallback = document.querySelector("[data-webgl-fallback]");
            if (placeholder) {
              records.push({
                kind: "placeholder",
                state: null,
                fallback: null,
                meaningful: (placeholder.textContent?.trim().length ?? 0) > 40,
              });
            }
            if (scene) {
              records.push({
                kind: "scene",
                state: scene.getAttribute("data-webgl-state"),
                fallback: fallback?.getAttribute("data-webgl-fallback") ?? null,
                meaningful: (scene.textContent?.trim().length ?? 0) > 40,
              });
            }
          };

          new MutationObserver(record).observe(document, {
            attributes: true,
            childList: true,
            subtree: true,
          });
          document.addEventListener("DOMContentLoaded", record, { once: true });
        },
        { placeholderLabel: sceneCase.placeholderLabel },
      );

      await waitForWebglScene(page, sceneCase.route);
      const records = await page.evaluate(() =>
        (
          window as typeof window & {
            __maslowScenePaints?: Array<{
              kind: "placeholder" | "scene";
              state: string | null;
              fallback: string | null;
              meaningful: boolean;
            }>;
          }
        ).__maslowScenePaints ?? [],
      );
      expect(records.length).toBeGreaterThan(0);
      expect(records.some((record) => record.meaningful)).toBe(true);
      expect(
        records.some(
          (record) =>
            record.kind === "placeholder" ||
            (record.kind === "scene" && record.fallback === "visible"),
        ),
      ).toBe(true);
      expect(
        records
          .filter(
            (record) =>
              record.kind === "scene" && record.state !== "ready",
          )
          .every((record) => record.fallback === "visible"),
      ).toBe(true);
    });
  }

  for (const sceneCase of webglSceneCases) {
    for (const viewport of [
      { width: 320, height: 900 },
      { width: 1440, height: 1000 },
    ]) {
      test(`${sceneCase.slug} ${viewport.width}px exposes a deterministic keyboard-operable ready state`, async ({
        page,
      }) => {
        const pageErrors: string[] = [];
        page.on("pageerror", (error) => pageErrors.push(error.message));
        await installAnimationFrameTracker(page);
        await page.setViewportSize(viewport);
        const scene = await waitForWebglScene(page, sceneCase.route);
        await expect(scene).toHaveAttribute("data-scene-capabilities", "available");
        await expect(scene.locator("[data-webgl-fallback]")).toHaveAttribute(
          "data-webgl-fallback",
          "hidden",
        );

        if (sceneCase.slug === "hybrid-rag") {
          if (viewport.width === 320) {
            const stepControls = scene.getByRole("group", {
              name: "Transformation steps",
            });
            const stepButtons = stepControls.getByRole("button");
            await expect(stepButtons).toHaveCount(2);
            await expectMinimumTargetSize(stepButtons);
            const next = stepControls.getByRole("button", {
              name: "Next step",
            });
            await expectVisibleFocus(next);
            await page.keyboard.press("Enter");
            await expect(scene).toHaveAttribute("data-stage", "2");
            await expect(
              scene.locator('[aria-current="step"]'),
            ).toContainText("Embed into vectors");
          } else {
            await scene.evaluate((element) => {
              const bounds = element.getBoundingClientRect();
              const distance = Math.max(bounds.height - window.innerHeight, 1);
              window.scrollTo(0, window.scrollY + bounds.top + distance / 2);
            });
            await expect(scene).toHaveAttribute("data-stage", "2");
            const pause = scene.getByRole("button", {
              name: sceneCase.pauseLabel,
            });
            await expectMinimumTargetSize(pause);
            await expectVisibleFocus(pause);
            await page.keyboard.press("Enter");
          }
        } else {
          const nodeGroup = scene.getByRole("group", {
            name: "Harness components",
          });
          const nodeButtons = nodeGroup.getByRole("button");
          await expect(nodeButtons).toHaveCount(6);
          await expectMinimumTargetSize(nodeButtons);
          await expectMinimumTargetSize(
            scene.getByRole("button", { name: sceneCase.pauseLabel }),
          );
          const guardrails = nodeGroup.getByRole("button", {
            name: "GUARDRAILS",
          });
          await expectVisibleFocus(guardrails);
          await page.keyboard.press("Enter");
          await expect(guardrails).toHaveAttribute("aria-pressed", "true");
          await expect(
            scene.getByRole("heading", { name: "Guardrails" }),
          ).toBeVisible();
          const touchAction = await scene.locator("canvas").evaluate(
            (canvas) => window.getComputedStyle(canvas).touchAction,
          );
          expect(touchAction).toContain("pan-y");
        }

        await expect(scene).toHaveAttribute("data-pause-reason", "user");
        await expect(scene).toHaveAttribute("data-scene-active", "false");
        await expect(scene).toHaveAttribute("data-deterministic-frame", "true");
        await expect
          .poll(async () => (await animationFrameStats(page)).pending)
          .toBe(0);

        const frameBefore = await scene.getAttribute("data-scene-frame");
        const timeBefore = await scene.getAttribute("data-simulation-time");
        expect(frameBefore).not.toBeNull();
        expect(timeBefore).toBe("0.000");
        const canvas = scene.locator("canvas");
        const canvasDataBefore = await canvas.evaluate((element) =>
          (element as HTMLCanvasElement).toDataURL("image/png"),
        );
        const statsBefore = await animationFrameStats(page);
        await page.waitForTimeout(250);
        const canvasDataAfter = await canvas.evaluate((element) =>
          (element as HTMLCanvasElement).toDataURL("image/png"),
        );
        const statsAfter = await animationFrameStats(page);
        const frameAfter = await scene.getAttribute("data-scene-frame");
        expect(frameAfter).not.toBeNull();
        // ResizeObserver and scroll handlers may repaint an identical paused
        // frame. Stable pixels, simulation time, and RAF counts are the motion
        // invariants; the diagnostic render counter only needs to stay monotonic.
        expect(Number(frameAfter)).toBeGreaterThanOrEqual(Number(frameBefore));
        expect(await scene.getAttribute("data-simulation-time")).toBe(timeBefore);
        expect(canvasDataAfter).toBe(canvasDataBefore);
        expect(statsAfter.pending).toBe(0);
        expect(statsAfter.scheduled).toBe(statsBefore.scheduled);
        expect(statsAfter.executed).toBe(statsBefore.executed);

        const capture =
          sceneCase.slug === "hybrid-rag"
            ? scene.locator(":scope > div").first()
            : scene;
        await removePersistentChromeForCapture(page);
        await capture.scrollIntoViewIfNeeded();
        if (sceneCase.slug === "hybrid-rag" && viewport.width === 1440) {
          await scene.evaluate((element) => {
            const bounds = element.getBoundingClientRect();
            const sceneTop = window.scrollY + bounds.top;
            window.scrollTo(0, sceneTop);
          });
          await expect(scene.locator('p[aria-hidden="true"]')).toHaveText(
            "SCROLL TO ADVANCE · 0%",
          );
          await scene.evaluate((element) => {
            const bounds = element.getBoundingClientRect();
            const sceneTop = window.scrollY + bounds.top;
            const distance = Math.max(bounds.height - window.innerHeight, 1);
            window.scrollTo(0, sceneTop + distance / 2);
          });
          await expect
            .poll(async () => {
              const text = await scene
                .locator('p[aria-hidden="true"]')
                .textContent();
              const progress = Number(text?.match(/(\d+)%/)?.[1]);
              return progress >= 49 && progress <= 51;
            })
            .toBe(true);
        }
        await expect(capture).toHaveScreenshot(
          `${sceneCase.slug}-ready-${viewport.width}.png`,
          screenshotOptions,
        );
        await expectNoHorizontalOverflow(page);

        const resume = scene.getByRole("button", {
          name: sceneCase.resumeLabel,
        });
        await expectVisibleFocus(resume);
        await page.keyboard.press("Enter");
        await expect(scene).toHaveAttribute("data-pause-reason", "none");
        await expect(scene).toHaveAttribute("data-scene-active", "true");
        await expect(scene).toHaveAttribute("data-deterministic-frame", "false");
        await expect
          .poll(async () => Number(await scene.getAttribute("data-scene-frame")))
          .toBeGreaterThan(Number(frameBefore));
        expect(pageErrors).toEqual([]);
      });
    }
  }

  for (const sceneCase of webglSceneCases) {
    const viewport =
      sceneCase.slug === "hybrid-rag"
        ? { width: 320, height: 900 }
        : { width: 1440, height: 1000 };
    test(`${sceneCase.slug} reduced motion keeps the full static explanation operable`, async ({
      page,
    }) => {
      await installAnimationFrameTracker(page);
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(sceneCase.route);
      const scene = page.locator("[data-webgl-state]");
      await expect(scene).toBeAttached();
      await scene.scrollIntoViewIfNeeded();
      await expect(scene).toHaveAttribute("data-pause-reason", "reduced-motion");
      await expect(scene).toHaveAttribute("data-reduced-motion", "true");
      await expect(scene).toHaveAttribute("data-scene-active", "false");
      await expect(scene).toHaveAttribute("data-visual-ready", "false");
      await expect(scene.locator("[data-webgl-fallback]")).toHaveAttribute(
        "data-webgl-fallback",
        "visible",
      );
      await expect(scene.getByRole("button", { name: "Static view" })).toBeDisabled();

      if (sceneCase.slug === "hybrid-rag") {
        const next = scene.getByRole("button", { name: "Next step" });
        await expectMinimumTargetSize(
          scene
            .getByRole("group", { name: "Transformation steps" })
            .getByRole("button"),
        );
        await expectVisibleFocus(next);
        await page.keyboard.press("Enter");
        await expect(scene).toHaveAttribute("data-stage", "2");
      } else {
        const nodes = scene
          .getByRole("group", { name: "Harness components" })
          .getByRole("button");
        await expectMinimumTargetSize(nodes);
        const memory = nodes.filter({ hasText: "MEMORY" });
        await expectVisibleFocus(memory);
        await page.keyboard.press("Enter");
        await expect(memory).toHaveAttribute("aria-pressed", "true");
        await expect(scene.getByRole("heading", { name: "Memory" })).toBeVisible();
      }

      const stats = await animationFrameStats(page);
      expect(stats.pending).toBe(0);
      expect(await scene.getAttribute("data-scene-frame")).toBeNull();
      const capture =
        sceneCase.slug === "hybrid-rag"
          ? scene.locator(":scope > div").first()
          : scene;
      await stabilizeVisualPage(page);
      await removePersistentChromeForCapture(page);
      await capture.scrollIntoViewIfNeeded();
      await expect(capture).toHaveScreenshot(
        `${sceneCase.slug}-reduced-motion-${viewport.width}.png`,
        screenshotOptions,
      );
      await expectNoHorizontalOverflow(page);
    });
  }

  for (const sceneCase of webglSceneCases) {
    test(`${sceneCase.slug} fails open when activity capabilities are missing`, async ({
      page,
    }) => {
      const pageErrors: string[] = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));
      await installAnimationFrameTracker(page);
      await removeSceneActivityCapabilities(page);
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto(sceneCase.route);
      const scene = page.locator("[data-webgl-state]");
      await expect(scene).toBeAttached();
      await scene.scrollIntoViewIfNeeded();

      await expect(scene).toHaveAttribute("data-scene-capabilities", "unavailable");
      await expect(scene).toHaveAttribute(
        "data-pause-reason",
        "capability-unavailable",
      );
      await expect(scene).toHaveAttribute("data-scene-active", "false");
      await expect(scene).toHaveAttribute("data-visual-ready", "false");
      await expect(scene.locator("[data-webgl-fallback]")).toHaveAttribute(
        "data-webgl-fallback",
        "visible",
      );
      await expect(scene).toContainText(sceneCase.fallbackText);
      await expect(scene.getByRole("button", { name: "Static view" })).toBeDisabled();
      expect((await animationFrameStats(page)).pending).toBe(0);
      expect(await scene.getAttribute("data-scene-frame")).toBeNull();
      expect(pageErrors).toEqual([]);
    });
  }

  for (const sceneCase of webglSceneCases) {
    const viewport =
      sceneCase.slug === "hybrid-rag"
        ? { width: 320, height: 900 }
        : { width: 1440, height: 1000 };
    test(`${sceneCase.slug} unavailable WebGL shows a meaningful static fallback`, async ({
      page,
    }) => {
      const pageErrors: string[] = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));
      await installAnimationFrameTracker(page);
      await disableWebgl(page);
      await page.setViewportSize(viewport);
      const scene = await waitForWebglScene(
        page,
        sceneCase.route,
        "unavailable",
      );

      await expect(scene).toHaveAttribute("data-scene-active", "false");
      await expect(scene).toHaveAttribute("data-visual-ready", "false");
      const fallback = scene.locator("[data-webgl-fallback]");
      await expect(fallback).toHaveAttribute("data-webgl-fallback", "visible");
      await expect(fallback).toContainText("WebGL is unavailable");
      await expect(fallback).toContainText(sceneCase.fallbackHeading);
      await expect(scene.getByRole("button", { name: "Static view" })).toBeDisabled();
      expect((await animationFrameStats(page)).pending).toBe(0);

      if (sceneCase.slug === "hybrid-rag") {
        const rail = fallback.locator(":scope > div").first();
        const liveStatus = scene.getByRole("status");
        const progressLabel = scene.locator('p[aria-hidden="true"]');
        await expect(liveStatus).toContainText("Step 1 of 3");
        await expect(progressLabel).toHaveText("STEP 1 OF 3");
        await expect(rail).toContainText("FILES");
        await expect(rail).toContainText("RELATIONSHIPS");
        const [sceneBox, statusBox, progressBox, railBox] = await Promise.all([
          scene.boundingBox(),
          liveStatus.boundingBox(),
          progressLabel.boundingBox(),
          rail.boundingBox(),
        ]);
        expect(sceneBox).not.toBeNull();
        for (const box of [statusBox, progressBox, railBox]) {
          expect(box).not.toBeNull();
          expect(box!.x).toBeGreaterThanOrEqual(sceneBox!.x);
          expect(box!.x + box!.width).toBeLessThanOrEqual(
            sceneBox!.x + sceneBox!.width,
          );
        }
      }

      const capture =
        sceneCase.slug === "hybrid-rag"
          ? scene.locator(":scope > div").first()
          : scene;
      await stabilizeVisualPage(page);
      await removePersistentChromeForCapture(page);
      await capture.scrollIntoViewIfNeeded();
      await expect(capture).toHaveScreenshot(
        `${sceneCase.slug}-webgl-unavailable-${viewport.width}.png`,
        screenshotOptions,
      );
      await expectNoHorizontalOverflow(page);
      expect(pageErrors).toEqual([]);
    });
  }

  for (const sceneCase of webglSceneCases) {
    test(`${sceneCase.slug} context loss reveals the fallback and restoration recovers`, async ({
      page,
    }) => {
      const pageErrors: string[] = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));
      await installAnimationFrameTracker(page);
      await page.setViewportSize({ width: 1440, height: 1000 });
      const scene = await waitForWebglScene(page, sceneCase.route);
      await expect(scene).toHaveAttribute("data-scene-active", "true");
      const frameBeforeLoss = Number(
        await scene.getAttribute("data-scene-frame"),
      );

      await scene.locator("canvas").dispatchEvent("webglcontextlost", {
        cancelable: true,
      });
      await expect(scene).toHaveAttribute("data-webgl-state", "context-lost");
      await expect(scene).toHaveAttribute("data-scene-active", "false");
      await expect(scene.locator("[data-webgl-fallback]")).toHaveAttribute(
        "data-webgl-fallback",
        "visible",
      );
      await expect(scene.locator("[data-webgl-fallback]")).toContainText(
        "graphics context recovers",
      );
      if (sceneCase.slug === "hybrid-rag") {
        const initialStage = Number(await scene.getAttribute("data-stage"));
        const direction = initialStage === 3 ? -1 : 1;
        const step = scene.getByRole("button", {
          name: direction === 1 ? "Next step" : "Previous step",
        });
        await expectMinimumTargetSize(step);
        await expectVisibleFocus(step);
        await page.keyboard.press("Enter");
        await expect(scene).toHaveAttribute(
          "data-stage",
          String(initialStage + direction),
        );
        await page.waitForTimeout(150);
        await expect(scene).toHaveAttribute(
          "data-stage",
          String(initialStage + direction),
        );
      }
      await expect
        .poll(async () => (await animationFrameStats(page)).pending)
        .toBe(0);
      const lostFrame = await scene.getAttribute("data-scene-frame");
      await page.waitForTimeout(200);
      expect(await scene.getAttribute("data-scene-frame")).toBe(lostFrame);

      await scene.locator("canvas").dispatchEvent("webglcontextrestored");
      await expect(scene).toHaveAttribute("data-webgl-state", "ready");
      await expect(scene).toHaveAttribute("data-visual-ready", "true");
      await expect(scene.locator("[data-webgl-fallback]")).toHaveAttribute(
        "data-webgl-fallback",
        "hidden",
      );
      await expect(scene).toHaveAttribute("data-scene-active", "true");
      await expect
        .poll(async () => Number(await scene.getAttribute("data-scene-frame")))
        .toBeGreaterThan(Math.max(frameBeforeLoss, Number(lostFrame)));
      expect(pageErrors).toEqual([]);
    });
  }

  for (const sceneCase of webglSceneCases) {
    test(`${sceneCase.slug} pauses while hidden and offscreen`, async ({
      page,
    }) => {
      await installAnimationFrameTracker(page);
      await page.setViewportSize({ width: 1440, height: 1000 });
      const scene = await waitForWebglScene(page, sceneCase.route);
      await expect(scene).toHaveAttribute("data-scene-active", "true");

      await setDocumentVisibility(page, "hidden");
      await expect(scene).toHaveAttribute("data-pause-reason", "document-hidden");
      await expect(scene).toHaveAttribute("data-scene-active", "false");
      await expect
        .poll(async () => (await animationFrameStats(page)).pending)
        .toBe(0);
      const hiddenFrame = await scene.getAttribute("data-scene-frame");
      await page.waitForTimeout(200);
      expect(await scene.getAttribute("data-scene-frame")).toBe(hiddenFrame);

      await setDocumentVisibility(page, "visible");
      await expect(scene).toHaveAttribute("data-pause-reason", "none");
      await expect(scene).toHaveAttribute("data-scene-active", "true");
      await page.locator("footer").scrollIntoViewIfNeeded();
      await expect(scene).toHaveAttribute("data-pause-reason", "offscreen");
      await expect(scene).toHaveAttribute("data-scene-active", "false");
      await expect
        .poll(async () => (await animationFrameStats(page)).pending)
        .toBe(0);
      const offscreenFrame = await scene.getAttribute("data-scene-frame");
      await page.waitForTimeout(200);
      expect(await scene.getAttribute("data-scene-frame")).toBe(offscreenFrame);
    });
  }

  for (const sceneCase of webglSceneCases) {
    test(`${sceneCase.slug} cancels its animation loop when client navigation unmounts it`, async ({
      page,
    }) => {
      const pageErrors: string[] = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));
      await installAnimationFrameTracker(page);
      await page.setViewportSize({ width: 1440, height: 1000 });
      const scene = await waitForWebglScene(page, sceneCase.route);
      await expect(scene).toHaveAttribute("data-scene-active", "true");
      await expect
        .poll(async () => (await animationFrameStats(page)).pending)
        .toBeGreaterThan(0);

      await page
        .locator('header[data-screen-label="Nav"]')
        .getByRole("link", { name: "SERVICES", exact: true })
        .click();
      await expect(page).toHaveURL(/\/services$/);
      await expect(page.locator("[data-webgl-state]")).toHaveCount(0);
      await expect
        .poll(async () => (await animationFrameStats(page)).pending)
        .toBe(0);
      const settled = await animationFrameStats(page);
      await page.waitForTimeout(200);
      const afterWait = await animationFrameStats(page);
      expect(afterWait.scheduled).toBe(settled.scheduled);
      expect(afterWait.executed).toBe(settled.executed);
      expect(pageErrors).toEqual([]);
    });
  }

  for (const width of [320, 1440]) {
    test(`${width}px WebGL explainer routes have no horizontal overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const sceneCase of webglSceneCases) {
        await page.goto(sceneCase.route);
        await expect(page.locator("[data-webgl-state]")).toBeAttached();
        await expectNoHorizontalOverflow(page);
      }
    });
  }
});
