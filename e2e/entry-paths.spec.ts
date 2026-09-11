import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicRoutes } from "@/lib/routes";

test("AI-OS evaluation paths explain the existing-infrastructure option", async ({ page }) => {
  await page.goto("/ai-os");
  const choice = page.getByRole("button", { name: /Build on existing infrastructure/ });
  await choice.focus();
  await page.keyboard.press("Enter");
  await expect(choice).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "Start with the systems you have." })).toBeVisible();
  await expect(page.getByText("Installing Maslow AI-OS across the business is not required.", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: /Explore the Linux preview/ }).click();
  await expect(page.getByRole("heading", { name: "Start with a technical champion." })).toBeVisible();
});

for (const succeeds of [true, false]) {
  test(`campaign request ${succeeds ? "receipt" : "failure"} is accurate and never reaches delivery`, async ({ page }) => {
    const submissions: unknown[] = [];
    await page.route("**/api/contact", async route => {
      submissions.push(route.request().postDataJSON());
      await route.fulfill({ status: succeeds ? 200 : 503, contentType: "application/json", body: JSON.stringify(succeeds ? { ok: true } : { ok: false, error: "Delivery temporarily unavailable. Please try again." }) });
    });
    await page.goto("/campaigns/virtual-ai-employees#book");
    await page.getByLabel("Full name").fill("Website QA");
    await page.getByLabel("Work email").fill("qa@example.com");
    await page.getByLabel("Company", { exact: true }).fill("Preview test");
    await page.getByLabel("Which workflow would you like to improve?").selectOption({ label: "Document review" });
    await page.getByRole("button", { name: "REQUEST A WORKING SESSION" }).click();
    expect(submissions).toHaveLength(1);
    if (succeeds) {
      await expect(page.getByRole("status")).toContainText("a session has not been booked yet");
    } else {
      await expect(page.locator("form").getByRole("alert")).toContainText("Delivery temporarily unavailable");
      await expect(page.getByLabel("Work email")).toHaveValue("qa@example.com");
      await expect(page.getByRole("button", { name: "REQUEST A WORKING SESSION" })).toBeEnabled();
    }
  });
}

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
