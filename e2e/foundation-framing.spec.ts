import { expect, test, type Locator, type Page } from "@playwright/test";

const viewports = [
  ["ultrawide", 3273, 1430],
  ["wide", 2560, 1440],
  ["full-hd", 1920, 1080],
  ["desktop", 1440, 900],
  ["tablet", 1024, 768],
  ["short", 805, 472],
  ["phone", 453, 472],
  ["narrow", 320, 800],
] as const;

const chapters = [
  ["Files", "sources", "0", "knowledge"],
  ["Knowledge", "knowledge", "1", "knowledge"],
  ["Second brain", "brain", "2", "knowledge"],
  ["02 Skills", "skills", "3", "layers"],
  ["03 Connections", "connections", "4", "layers"],
  ["04 Visibility", "observability", "5", "layers"],
  ["↗ Together", "together", "6", "layers"],
] as const;

test.beforeEach(({}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "Framing uses one canonical Chromium project and explicit viewport sizes.",
  );
});

test.describe.configure({ mode: "serial" });

async function chooseChapter(
  journey: Locator,
  name: string,
  group: "knowledge" | "layers",
) {
  const controls =
    group === "knowledge"
      ? journey.getByRole("group", { name: "Explore knowledge and memory" })
      : journey.getByRole("navigation", { name: "Foundation layers" });
  await controls.getByRole("button", { name, exact: true }).click();
}

async function framing(page: Page) {
  return page.evaluate(() => {
    const stage = document.querySelector<HTMLElement>(
      '[data-testid="foundation-journey"] [role="img"]',
    );
    const canvas = document.querySelector<HTMLCanvasElement>(
      '[data-testid="foundation-canvas"]',
    );
    if (!stage || !canvas) throw new Error("Foundation scene not found");
    const stageRect = stage.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const visibleLabels = Array.from(
      stage.querySelectorAll<HTMLElement>(".agent-annotation, .story-landmark"),
    ).filter((label) => {
      const style = getComputedStyle(label);
      return !label.hidden && style.display !== "none" && style.opacity !== "0";
    });
    return {
      viewport: { width: innerWidth, height: innerHeight },
      footerTop: document.querySelector('[aria-label="Foundation layers"]')?.parentElement?.getBoundingClientRect().top,
      copyTop: document.querySelector('#journey-title')?.parentElement?.getBoundingClientRect().top,
      copyBottom: document.querySelector('#journey-title')?.parentElement?.getBoundingClientRect().bottom,
      stage: {
        left: stageRect.left,
        top: stageRect.top,
        right: stageRect.right,
        bottom: stageRect.bottom,
        width: stageRect.width,
        height: stageRect.height,
      },
      canvas: {
        left: canvasRect.left,
        top: canvasRect.top,
        right: canvasRect.right,
        bottom: canvasRect.bottom,
      },
      frame: {
        left: Number(canvas.dataset.frameLeft),
        right: Number(canvas.dataset.frameRight),
        top: Number(canvas.dataset.frameTop),
        bottom: Number(canvas.dataset.frameBottom),
      },
      labels: visibleLabels.map((label) => {
        const rect = label.getBoundingClientRect();
        return {
          text: label.textContent?.trim() || "label",
          agent: label.classList.contains("agent-annotation"),
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
        };
      }),
      controls: (() => {
        const element = document.querySelector<HTMLElement>(
          '[aria-label="Explore knowledge and memory"]',
        );
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
        };
      })(),
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    };
  });
}

for (const [label, width, height] of viewports) {
  test(`fits every foundation chapter at ${label} ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    const journey = page.getByTestId("foundation-journey");
    const canvas = journey.getByTestId("foundation-canvas");
    await expect(canvas).toBeAttached();
    await journey.getByRole("button", { name: /pause motion/i }).click();
    await expect(journey).toHaveAttribute("data-paused", "true");

    for (const [name, key, pose, group] of chapters) {
      await chooseChapter(journey, name, group);
      await expect(journey).toHaveAttribute("data-chapter", key);
      await expect(canvas).toHaveAttribute("data-pose", pose);
      await expect
        .poll(async () => {
          const result = await framing(page);
          return Object.values(result.frame).every(Number.isFinite);
        })
        .toBe(true);

      const result = await framing(page);
      expect(result.overflow).toBeLessThanOrEqual(1);
      expect(result.stage.left).toBeGreaterThanOrEqual(-1);
      expect(result.stage.right).toBeLessThanOrEqual(width + 1);
      if (key !== "sources") {
        expect(result.stage.top).toBeGreaterThanOrEqual(82);
      expect(result.stage.bottom).toBeLessThanOrEqual(height + 1);
      expect(result.stage.bottom).toBeLessThanOrEqual((result.footerTop ?? height) + 1);
      expect(result.copyTop ?? 0).toBeGreaterThanOrEqual(82);
      expect(result.copyBottom ?? height).toBeLessThanOrEqual((result.footerTop ?? height) + 1);
      }
      expect(result.stage.width).toBeGreaterThan(width * 0.48);
      expect(result.stage.height).toBeGreaterThanOrEqual(
        Math.min(130, height * 0.25),
      );
      expect(Math.abs(result.canvas.left - result.stage.left)).toBeLessThan(2);
      expect(Math.abs(result.canvas.top - result.stage.top)).toBeLessThan(2);
      expect(Math.abs(result.canvas.right - result.stage.right)).toBeLessThan(
        2,
      );
      expect(Math.abs(result.canvas.bottom - result.stage.bottom)).toBeLessThan(
        2,
      );

      expect(result.frame.left).toBeGreaterThanOrEqual(0.04);
      expect(result.frame.right).toBeLessThanOrEqual(0.96);
      expect(result.frame.top).toBeGreaterThanOrEqual(0.04);
      expect(result.frame.bottom).toBeLessThanOrEqual(0.96);
      expect(
        Math.max(
          result.frame.right - result.frame.left,
          result.frame.bottom - result.frame.top,
        ),
      ).toBeGreaterThan(0.5);

      for (const visible of result.labels) {
        expect
          .soft(visible.left, `${visible.text} left`)
          .toBeGreaterThanOrEqual(result.stage.left - 2);
        expect
          .soft(visible.top, `${visible.text} top`)
          .toBeGreaterThanOrEqual(result.stage.top - 2);
        expect
          .soft(visible.right, `${visible.text} right`)
          .toBeLessThanOrEqual(result.stage.right + 2);
        expect(visible.bottom, `${visible.text} bottom`).toBeLessThanOrEqual(
          result.stage.bottom + 2,
        );
        if (visible.agent && result.controls && width > 700) {
          const overlapsControls = !(
            visible.right <= result.controls.left ||
            visible.left >= result.controls.right ||
            visible.bottom <= result.controls.top ||
            visible.top >= result.controls.bottom
          );
          expect
            .soft(overlapsControls, `${visible.text} avoids chapter tabs`)
            .toBe(false);
        }
      }
    }

    await journey.evaluate((section) => {
      const element = section as HTMLElement;
      window.scrollTo(0, element.offsetTop + 4);
    });
    await expect(journey).toHaveAttribute("data-chapter", "sources");
    await journey.evaluate((section) => {
      const element = section as HTMLElement;
      window.scrollTo(
        0,
        element.offsetTop + element.offsetHeight - innerHeight - 4,
      );
    });
    await expect(journey).toHaveAttribute("data-chapter", "together");
    await journey.evaluate((section) => {
      const element = section as HTMLElement;
      window.scrollTo(0, element.offsetTop + 4);
    });
    await expect(journey).toHaveAttribute("data-chapter", "sources");
  });
}
