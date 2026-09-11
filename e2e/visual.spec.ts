import { expect, test, type Page } from "@playwright/test";
import { calCalls, mockCalEmbed, waitForCalCall } from "./helpers/cal";

const plannerRoute = "/plan-workflow";
const mapperStateKey = "maslow.workflow-mapper-state.v1";
const workflowBriefKey = "maslow.workflow-brief.v1";
const sevenDays = 1000 * 60 * 60 * 24 * 7;
const screenshotOptions = {
  animations: "disabled" as const,
  caret: "hide" as const,
  threshold: 0.1,
};

test.beforeEach(({}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "This suite owns one canonical Chromium snapshot set and sets its own viewports.",
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
  now = Date.now(),
): MapperState {
  return {
    version: 1,
    updatedAt: now,
    expiresAt: now + sevenDays,
    completed,
    answers,
  };
}

async function seedSession(page: Page, key: string, value: unknown) {
  await page.goto("/");
  await page.evaluate(
    ({ storageKey, storageValue }) =>
      window.sessionStorage.setItem(storageKey, storageValue),
    { storageKey: key, storageValue: JSON.stringify(value) },
  );
}

async function seedRawSession(page: Page, key: string, value: string) {
  await page.goto("/");
  await page.evaluate(
    ({ storageKey, storageValue }) =>
      window.sessionStorage.setItem(storageKey, storageValue),
    { storageKey: key, storageValue: value },
  );
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

async function stabilize(page: Page) {
  await page.addStyleTag({
    content: `
      nextjs-portal, [data-next-badge-root], [data-nextjs-toast] { display: none !important; }
      *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
      .mz-reveal { opacity: 1 !important; transform: none !important; }
    `,
  });
  await page.evaluate(async () => document.fonts.ready);
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    )
    .toBeLessThanOrEqual(1);
}

async function installRafTracker(page: Page) {
  await page.addInitScript(() => {
    const request = window.requestAnimationFrame.bind(window);
    const cancel = window.cancelAnimationFrame.bind(window);
    const pending = new Set<number>();
    const stats = { scheduled: 0, executed: 0, cancelled: 0 };
    Object.defineProperty(window, "__maslowRafStats", {
      configurable: true,
      value: { stats, pending },
    });
    window.requestAnimationFrame = (callback) => {
      let id = 0;
      id = request((time) => {
        pending.delete(id);
        stats.executed += 1;
        callback(time);
      });
      pending.add(id);
      stats.scheduled += 1;
      return id;
    };
    window.cancelAnimationFrame = (id) => {
      if (pending.delete(id)) stats.cancelled += 1;
      cancel(id);
    };
  });
}

async function rafStats(page: Page) {
  return page.evaluate(() => {
    const tracker = (
      window as typeof window & {
        __maslowRafStats: {
          stats: { scheduled: number; executed: number; cancelled: number };
          pending: Set<number>;
        };
      }
    ).__maslowRafStats;
    return { ...tracker.stats, pending: tracker.pending.size };
  });
}

async function setVisibility(page: Page, state: "hidden" | "visible") {
  await page.evaluate((next) => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => next,
    });
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => next === "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  }, state);
}

test.describe("workflow planner persistence and recovery", () => {
  test("restores a canonical partial state within its seven-day lifetime", async ({
    page,
  }) => {
    await seedSession(
      page,
      mapperStateKey,
      mapperState({ deliverable: "estimate", owner: "operations" }),
    );
    await page.goto(plannerRoute);
    const mapper = page.locator("[data-workflow-mapper]");
    await expect(
      mapper.getByText("Where does the current information live?", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(mapper.getByLabel("Your prior answers")).toContainText(
      "Estimate or quote",
    );
    const saved = await page.evaluate(
      (key) => JSON.parse(sessionStorage.getItem(key)!),
      mapperStateKey,
    );
    expect(saved.expiresAt - saved.updatedAt).toBe(sevenDays);
  });

  for (const invalid of [
    {
      label: "expired",
      value: {
        ...mapperState({ deliverable: "estimate" }),
        expiresAt: Date.now() - 1,
      },
    },
    {
      label: "future",
      value: mapperState(
        { deliverable: "estimate" },
        false,
        Date.now() + 60_000,
      ),
    },
    {
      label: "wrong version",
      value: { ...mapperState({ deliverable: "estimate" }), version: 9 },
    },
    {
      label: "wrong answer id",
      value: mapperState({ deliverable: "invented" }),
    },
    {
      label: "skipped question",
      value: mapperState({ deliverable: "estimate", source: "documents" }),
    },
    {
      label: "overlong lifetime",
      value: {
        ...mapperState({ deliverable: "estimate" }),
        expiresAt: Date.now() + sevenDays + 60_000,
      },
    },
  ]) {
    test(`discards ${invalid.label} state`, async ({ page }) => {
      await seedSession(page, mapperStateKey, invalid.value);
      await page.goto(plannerRoute);
      await expect(
        page.getByText("Which deliverable keeps getting delayed?", {
          exact: true,
        }),
      ).toBeVisible();
      await expect
        .poll(() =>
          page.evaluate((key) => sessionStorage.getItem(key), mapperStateKey),
        )
        .toBeNull();
    });
  }

  test("discards malformed JSON", async ({ page }) => {
    await seedRawSession(page, mapperStateKey, "{bad-json");
    await page.goto(plannerRoute);
    await expect(
      page.getByText("Which deliverable keeps getting delayed?", {
        exact: true,
      }),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate((key) => sessionStorage.getItem(key), mapperStateKey),
      )
      .toBeNull();
  });

  test("keyboard answers persist and restore after reload", async ({
    page,
  }) => {
    await page.goto(plannerRoute);
    const mapper = page.locator("[data-workflow-mapper]");
    const answer = mapper.getByRole("radio", { name: "Estimate or quote" });
    await answer.focus();
    await page.keyboard.press("Space");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(
      mapper.getByText("Whose judgment is the work waiting for?", {
        exact: true,
      }),
    ).toBeVisible();
    await page.reload();
    await expect(mapper.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "2",
    );
    await expect(mapper.getByLabel("Your prior answers")).toContainText(
      "Estimate or quote",
    );
  });

  test("remains usable when session storage throws", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      for (const method of ["getItem", "setItem", "removeItem"] as const) {
        const original = Storage.prototype[method];
        Object.defineProperty(Storage.prototype, method, {
          configurable: true,
          value(...args: string[]) {
            if (this === window.sessionStorage)
              throw new DOMException("Unavailable", "SecurityError");
            return Reflect.apply(original, this, args);
          },
        });
      }
    });
    await page.goto(plannerRoute);
    await completeMapper(page);
    await expect(page.locator("[data-workflow-result]")).toContainText(
      "Request to estimator-reviewed draft",
    );
    expect(errors).toEqual([]);
  });

  test("restores a completed result with its optional dossier", async ({
    page,
  }) => {
    await seedSession(
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
    await page.goto(plannerRoute);
    const result = page.locator("[data-workflow-result]");
    await expect(result).toContainText("Request to estimator-reviewed draft");
    const tray = result.locator("[data-dossier-tray]");
    await expect(tray).not.toHaveAttribute("open", "");
    await tray.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(tray).toHaveAttribute("open", "");
    await expect(tray.locator("[data-dossier]")).toContainText(
      "To define in a working session",
    );
  });

  test("failed booking load preserves the mapped state and editable brief", async ({
    page,
  }) => {
    await mockCalEmbed(page, "failure");
    await page.goto(plannerRoute);
    await completeMapper(page);
    await page
      .locator("[data-workflow-result]")
      .getByRole("link", { name: "TALK THROUGH A WORKFLOW" })
      .click();
    await expect(page).toHaveURL(/\/contact$/);
    const booking = page.getByTestId("booking-experience");
    await expect(booking.getByTestId("booking-state")).toHaveAttribute(
      "data-state",
      "error",
    );
    const editor = booking.getByTestId("booking-brief-editor");
    await expect(editor).toHaveValue(/Delayed deliverable: Estimate or quote/);
    await editor.fill(`${await editor.inputValue()}\nEdited after load failure`);
    expect(await calCalls(page, "inline")).toEqual([]);
    const inlineCountBeforeShare = (await calCalls(page, "inline")).length;
    await booking.getByTestId("booking-brief-use").click();
    await expect(editor).toHaveValue(/Edited after load failure/);
    await expect(booking.getByTestId("booking-state")).toHaveAttribute(
      "data-state",
      "ready",
    );
    expect((await waitForCalCall(page, "inline", inlineCountBeforeShare))?.payload?.config).toMatchObject({
      notes: expect.stringContaining("Edited after load failure"),
    });
    const stored = await page.evaluate(
      ([stateKey, briefKey]) => [
        sessionStorage.getItem(stateKey),
        sessionStorage.getItem(briefKey),
      ],
      [mapperStateKey, workflowBriefKey],
    );
    expect(stored[0]).not.toBeNull();
    expect(stored[1]).not.toBeNull();
  });
});

test.describe("AI-OS homepage interaction contracts", () => {
  test("agent selection changes the tool while stable project context remains", async ({
    page,
  }) => {
    await page.goto("/");
    const hero = page.getByRole("group", {
      name: "Try changing the agent while keeping the project context",
    });
    const invariant = [
      "Supplier brief + quality policy",
      "Approved standards + decisions",
      "The supplier review skill",
    ];
    for (const text of invariant)
      await expect(hero.getByText(text, { exact: true })).toBeVisible();
    for (const [index, name] of ["Codex", "Claude Code", "Hermes"].entries()) {
      const button = hero.getByRole("button", { name });
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(hero).toHaveAttribute("data-selected", String(index));
      for (const text of invariant)
        await expect(hero.getByText(text, { exact: true })).toBeVisible();
    }
  });

  test("all seven foundation chapters are directly reachable and keyboard navigation reverses", async ({
    page,
  }) => {
    await page.goto("/");
    const journey = page.locator("#foundation");
    await journey.getByRole("button", { name: /pause motion/i }).click();
    const knowledgeControls = journey.getByRole("group", {
      name: "Explore knowledge and memory",
    });
    for (const [name, chapter] of [
      ["Files", "sources"],
      ["Knowledge", "knowledge"],
      ["Second brain", "brain"],
    ] as const) {
      await knowledgeControls
        .getByRole("button", { name, exact: true })
        .click();
      await expect(journey).toHaveAttribute("data-chapter", chapter);
    }
    const layerControls = journey.getByRole("navigation", {
      name: "Foundation layers",
    });
    for (const [name, chapter] of [
      ["02 Skills", "skills"],
      ["03 Connections", "connections"],
      ["04 Visibility", "observability"],
      ["↗ Together", "together"],
    ] as const) {
      await layerControls.getByRole("button", { name, exact: true }).click();
      await expect(journey).toHaveAttribute("data-chapter", chapter);
    }
    const together = layerControls.getByRole("button", {
      name: "↗ Together",
      exact: true,
    });
    await together.focus();
    await page.keyboard.press("ArrowLeft");
    await expect(
      layerControls.getByRole("button", { name: "04 Visibility", exact: true }),
    ).toBeFocused();
    await expect(journey).toHaveAttribute("data-chapter", "observability");
  });

  test("native scroll selects the final chapter and reverses to the first", async ({
    page,
  }) => {
    await page.goto("/");
    const journey = page.locator("#foundation");
    await journey.getByRole("button", { name: /pause motion/i }).click();
    await journey.evaluate((section) => {
      const element = section as HTMLElement;
      window.scrollTo(
        0,
        element.offsetTop + element.scrollHeight - innerHeight - 4,
      );
    });
    await expect(journey).toHaveAttribute("data-chapter", "together");
    await journey.evaluate((section) => {
      const element = section as HTMLElement;
      window.scrollTo(0, element.offsetTop + 4);
    });
    await expect(journey).toHaveAttribute("data-chapter", "sources");
  });

  test("pause and reduced motion stop ambient motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const journey = page.locator("#foundation");
    await expect(
      journey.getByRole("button", { name: /play motion/i }),
    ).toHaveAttribute("aria-pressed", "true");
    const hero = page.getByRole("group", { name: /changing the agent/i });
    await expect(hero).toHaveAttribute("data-paused", "true");
  });

  test("WebGL failure keeps the complete static foundation explanation", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const getContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        ...args
      ) {
        return String(args[0]).startsWith("webgl")
          ? null
          : getContext.apply(this, args as never);
      } as typeof getContext;
    });
    await page.goto("/");
    const journey = page.locator("#foundation");
    await expect(
      journey.getByRole("heading", { name: /Your knowledge/ }),
    ).toBeVisible();
    await expect(
      journey.getByText("How the foundation connects", { exact: true }),
    ).toBeAttached();
    await expect(journey.getByRole("img")).toHaveAttribute(
      "data-ready",
      "false",
    );
    await expect(journey.getByTestId("foundation-canvas")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  test("WebGL context loss exposes fallback and restoration resumes the scene", async ({
    page,
  }) => {
    await page.goto("/");
    const journey = page.locator("#foundation");
    const canvas = journey.getByTestId("foundation-canvas");
    await expect(canvas).toBeAttached();
    await expect(journey.getByRole("img")).toHaveAttribute(
      "data-ready",
      "true",
    );
    await canvas.evaluate((node) =>
      node.dispatchEvent(new Event("webglcontextlost")),
    );
    await expect(journey.getByRole("img")).toHaveAttribute(
      "data-ready",
      "false",
    );
    await canvas.evaluate((node) =>
      node.dispatchEvent(new Event("webglcontextrestored")),
    );
    await expect(journey.getByRole("img")).toHaveAttribute(
      "data-ready",
      "true",
    );
  });

  test("hidden and unmounted scenes stop requesting animation frames", async ({
    page,
  }) => {
    await installRafTracker(page);
    await page.goto("/");
    const canvas = page.getByTestId("foundation-canvas");
    await expect(canvas).toBeAttached();
    await canvas.scrollIntoViewIfNeeded();
    await expect(
      page.getByTestId("foundation-journey").getByRole("img"),
    ).toHaveAttribute("data-ready", "true");
    await setVisibility(page, "hidden");
    await page.waitForTimeout(60);
    const hiddenStart = await rafStats(page);
    await page.waitForTimeout(150);
    const hiddenEnd = await rafStats(page);
    expect(hiddenEnd.executed - hiddenStart.executed).toBeLessThanOrEqual(1);
    await setVisibility(page, "visible");
    await expect
      .poll(async () => (await rafStats(page)).executed)
      .toBeGreaterThan(hiddenEnd.executed);
    const beforeUnmount = await rafStats(page);
    await page.locator('a[href="/services"]').first().click();
    await expect(page).toHaveURL(/\/services$/);
    await expect
      .poll(async () => (await rafStats(page)).cancelled)
      .toBeGreaterThan(beforeUnmount.cancelled);
    await page.waitForTimeout(100);
    const unmountedStart = await rafStats(page);
    await page.waitForTimeout(150);
    const afterUnmount = await rafStats(page);
    expect(
      afterUnmount.scheduled - unmountedStart.scheduled,
    ).toBeLessThanOrEqual(1);
  });

  test("workspace tabs, wallpapers, modal zoom, pan, trap, and focus return work", async ({
    page,
  }) => {
    await page.goto("/");
    const workspace = page.locator("#workspace");
    const focusTab = workspace.getByRole("tab", { name: /Focus/ });
    await focusTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      workspace.getByRole("tab", { name: /Side by side/ }),
    ).toBeFocused();
    await page.keyboard.press("End");
    const desktop = workspace.getByRole("tab", { name: /Desktop/ });
    await expect(desktop).toBeFocused();
    await expect(desktop).toHaveAttribute("aria-selected", "true");
    const signal = workspace.getByRole("button", { name: "Signal" });
    await signal.click();
    await expect(signal).toHaveAttribute("aria-pressed", "true");
    await expect(workspace.getByRole("tabpanel")).toContainText(
      "Signal Over Water",
    );
    const trigger = workspace.getByRole("button", {
      name: /Take a closer look/,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Signal Over Water" });
    const close = dialog.getByRole("button", {
      name: "Close expanded workspace",
    });
    await expect(close).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect
      .poll(() =>
        page.evaluate(() => Boolean(document.activeElement?.closest("dialog"))),
      )
      .toBe(true);
    const zoom = dialog.getByTestId("workspace-zoom");
    await expect(zoom).toHaveAccessibleName(/Zoom in/);
    await zoom.click();
    await expect(dialog.getByTestId("workspace-zoom")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const stage = dialog.getByRole("region", {
      name: "Enlarged workspace image",
    });
    await stage.focus();
    await page.keyboard.press("Shift+ArrowRight");
    await expect
      .poll(() => stage.evaluate((node) => node.scrollLeft))
      .toBeGreaterThan(0);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

test.describe("optional engagement and case-study evidence", () => {
  test("the 90-Day Foundation stays optional and opens from the keyboard", async ({
    page,
  }) => {
    await page.goto("/how-we-engage");
    const details = page.locator("#ninety-days");
    await expect(details).not.toHaveAttribute("open", "");
    await expect(
      details.getByRole("list", { name: "90-day Foundation phases" }),
    ).not.toBeVisible();
    const summary = details.locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(details).toHaveAttribute("open", "");
    await expect(details).toContainText("It is one engagement option");
    await expect(
      details.getByRole("list", { name: "90-day Foundation phases" }),
    ).toBeVisible();
  });

  for (const [route, chapter, heading] of [
    [
      "/case-studies/infinite-ai-os",
      "Value model",
      "Explore the operating-value assumptions",
    ],
    ["/case-studies/agenthub", "Routing", /selects what kind of response/i],
  ] as const) {
    test(`${route} chapter links move focus to the selected evidence`, async ({
      page,
    }) => {
      await page.goto(route);
      const link = page
        .getByRole("navigation", { name: "Case study chapters" })
        .getByRole("link", { name: new RegExp(chapter, "i") });
      await link.focus();
      await page.keyboard.press("Enter");
      const target = page.getByRole("heading", { name: heading });
      await expect(target).toBeFocused();
      await expect(page).toHaveURL(
        new RegExp(
          `#${await link.getAttribute("href").then((href) => href?.slice(1))}$`,
        ),
      );
    });
  }

  test("case-study deep details remain optional and keyboard operable", async ({
    page,
  }) => {
    await page.goto("/case-studies/agenthub");
    for (const label of [
      "EXPLORE THE SIX-STEP RETRIEVAL PIPELINE",
      "EXPLORE RESPONSE ROUTING AND TOOL EXAMPLES",
      "EXPLORE THE IMPLEMENTATION STACK",
      "VIEW THE DEPLOYED ARCHITECTURE MAPPING",
    ]) {
      const summary = page.locator("summary").filter({ hasText: label });
      const details = summary.locator("xpath=..");
      await expect(details).not.toHaveAttribute("open", "");
      await summary.focus();
      await expect(summary).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(details).toHaveAttribute("open", "");
    }
  });

  test("Infinite AI OS keeps delivered evidence separate from pilot and value assumptions", async ({
    page,
  }) => {
    await page.goto("/case-studies/infinite-ai-os");
    await expect(page.locator('[data-screen-label="Hero"]')).toContainText(
      "It is distinct from Maslow AI-OS, the free Linux product.",
    );
    const delivered = page
      .locator("[data-case-summary]")
      .locator("[data-evidence-receipt]");
    await expect(delivered).toContainText(
      "The engagement reached a working 90-day foundation with four named AI employees responding in Teams and three listed foundation components live.",
    );
    await expect(delivered).toContainText(
      "Connectors remained in hardening, self-improvement remained a pilot, and operating-value measurement was targeted for day 180.",
    );
    const pilot = page.locator('[data-screen-label="Proof"]');
    await expect(pilot).toContainText("PILOT PATTERNS · ILLUSTRATIVE");
    await expect(
      pilot.getByText("ILLUSTRATIVE PATTERN", { exact: true }),
    ).toBeVisible();
    const value = page.locator('[data-screen-label="Value"]');
    await expect(value).toContainText("PLANNING MODEL · ILLUSTRATIVE");
    await expect(value).toContainText("not a realized client result");
    await expect(
      value.getByText("ILLUSTRATIVE PATTERN", { exact: true }),
    ).toBeVisible();
  });

  test("AgentHub scopes the 26 of 28 result to first-tool routing", async ({
    page,
  }) => {
    await page.goto("/case-studies/agenthub");
    const section = page.locator('[data-screen-label="Intent Engineering"]');
    await section
      .getByText("EXPLORE RESPONSE ROUTING AND TOOL EXAMPLES", { exact: true })
      .click();
    await expect(section).toContainText("26 / 28");
    await expect(section).toContainText("expected first tool");
    const receipt = section.locator("[data-evidence-receipt]");
    await expect(receipt).toContainText("First-tool routing evidence");
    await expect(receipt).toContainText("DEPLOYED CLIENT IMPLEMENTATION");
  });
});

test.describe("accepted first-viewport snapshots", () => {
  const routes = [
    ["home", "/"],
    ["services", "/services"],
    ["concept", "/concepts/shared-ai-infrastructure"],
    ["case", "/case-studies/agenthub"],
  ] as const;
  const viewports = [
    ["1440", 1440, 900],
    ["390", 390, 844],
    ["short", 805, 472],
    ["320", 320, 800],
  ] as const;

  for (const [slug, route] of routes) {
    for (const [size, width, height] of viewports) {
      test(`${slug} first viewport at ${size}`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.goto(route);
        await stabilize(page);
        await expectNoHorizontalOverflow(page);
        await expect(page).toHaveScreenshot(
          `${slug}-first-viewport-${size}.png`,
          screenshotOptions,
        );
      });
    }
  }
});
