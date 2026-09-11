import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicRoutes } from "@/lib/routes";
import { mockCalEmbed, waitForCalCall } from "./helpers/cal";

test.beforeEach(async ({ page }) => {
  await mockCalEmbed(page);
});

test("AI-OS evaluation paths explain the existing-infrastructure option", async ({ page }) => {
  await page.goto("/ai-os");
  const choice = page.getByRole("button", { name: /Build on existing infrastructure/ });
  await choice.focus();
  await page.keyboard.press("Enter");
  await expect(choice).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "Start with the systems you have." })).toBeVisible();
  await expect(page.getByText("Installing Maslow AI-OS across the business is not required.", { exact: false })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Talk through this starting point/ }),
  ).toHaveAttribute("href", "/contact?topic=existing-infrastructure");
  await page.getByRole("button", { name: /Explore the Linux preview/ }).click();
  await expect(page.getByRole("heading", { name: "Start with a technical champion." })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Talk through this starting point/ }),
  ).toHaveAttribute("href", "/contact?topic=ai-os-preview");
});

test("campaign action reaches the shared Cal booking experience", async ({
  page,
}) => {
  const contactRequests: string[] = [];
  await page.route("**/api/contact", async route => {
    contactRequests.push(route.request().method());
    await route.abort();
  });
  await page.goto("/campaigns/virtual-ai-employees");
  const campaignAction = page
    .locator("main")
    .getByRole("link", { name: "Talk through a workflow" })
    .first();
  await expect(campaignAction).toHaveAttribute("href", "#book");
  await campaignAction.click();
  await expect(page).toHaveURL(/#book$/);
  const booking = page.getByTestId("booking-experience");
  await expect(booking).toHaveAttribute("data-booking-source", "campaign");
  await expect(booking.getByTestId("booking-state")).toHaveAttribute(
    "data-state",
    "ready",
  );
  expect((await waitForCalCall(page, "inline"))?.payload?.calLink).toBe(
    "maslow/30min",
  );
  expect(contactRequests).toEqual([]);
});

test("diligence remains a materials request with accurate follow-up copy", async ({
  page,
}) => {
  await page.route("**/api/contact", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
  await page.goto("/diligence");
  await expect(page.getByText(/confirm which materials are available/i)).toBeVisible();
  await page.getByLabel("Full name").fill("Website QA");
  await page.getByLabel("Work email").fill("qa@example.com");
  await page.getByRole("button", { name: "REQUEST AVAILABLE MATERIALS" }).click();
  await expect(page.locator("form").getByRole("status")).toContainText(
    "follow up about the available materials and any gaps",
  );
  await expect(page.getByText(/within one business day/i)).toHaveCount(0);
});

test("sitemap contains the public buyer journey and omits redirect-only routes", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const sitemap = await response.text();
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  expect(locations.sort()).toEqual(publicRoutes.map(route => `https://maslow.ai${route === "/" ? "" : route}`).sort());
});

for (const path of ["/concepts/hybrid-rag", "/concepts/shared-ai-infrastructure", "/concepts/local-ai", "/concepts/skills-and-gateways", "/services", "/manufacturing"]) {
  test(`active story remains accessible without reduced motion on ${path}`, async ({ page }) => {
    await page.goto(path);
    const story = page.locator("[data-active-step]");
    await story.getByRole("button", { name: "Pause motion", exact: true }).click();
    await story.locator('[aria-label="Choose a story stage"] button').nth(2).click();
    await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; }" });
    const results = await new AxeBuilder({ page }).include("[data-active-step]").withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
    expect(results.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target), summary: v.nodes.map(n => n.failureSummary) }))).toEqual([]);
  });
}
