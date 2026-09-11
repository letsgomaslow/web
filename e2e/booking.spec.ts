import { expect, test, type Page } from "@playwright/test";
import {
  calCalls,
  mockCalEmbed,
  waitForCalCall,
  type CalMockMode,
} from "./helpers/cal";

const bookingUrl = "https://cal.com/maslow/30min";
const workflowBriefKey = "maslow.workflow-brief.v1";

async function openBooking(
  page: Page,
  route = "/contact",
  mode: CalMockMode = "ready",
) {
  await mockCalEmbed(page, mode);
  const contactRequests: string[] = [];
  await page.route("**/api/contact", async (request) => {
    contactRequests.push(request.request().method());
    await request.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ ok: false }),
    });
  });
  await page.goto(route);
  return { booking: page.getByTestId("booking-experience"), contactRequests };
}

async function seedWorkflowBrief(page: Page) {
  await page.addInitScript(
    ({ key, value }) => window.sessionStorage.setItem(key, JSON.stringify(value)),
    {
      key: workflowBriefKey,
      value: {
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
      },
    },
  );
}

test("contact and campaign use the same 30-minute Cal event without posting a lead form", async ({
  page,
}) => {
  for (const [route, source] of [
    ["/contact", "contact"],
    ["/campaigns/virtual-ai-employees#book", "campaign"],
  ] as const) {
    const { booking, contactRequests } = await openBooking(page, route);
    await expect(booking).toHaveAttribute("data-booking-source", source);
    await expect(booking.getByTestId("booking-state")).toHaveAttribute(
      "data-state",
      "ready",
    );
    await expect(booking.getByTestId("booking-external-link")).toHaveAttribute(
      "href",
      bookingUrl,
    );
    const inline = await waitForCalCall(page, "inline");
    expect(inline?.namespace).toMatch(new RegExp(`^maslow-${source}-`));
    expect(inline?.payload?.calLink).toBe("maslow/30min");
    expect(contactRequests).toEqual([]);
  }
});

for (const route of [
  "/blog/context-engineering",
  "/blog/what-makes-an-ai-employee-work",
  "/blog/context-memory-and-skills",
  "/blog/permissions-approvals-audit-trails",
  "/case-studies/infinite-ai-os",
  "/case-studies/agenthub",
]) {
  test(`${route} names its appointment action consistently`, async ({ page }) => {
    await mockCalEmbed(page);
    await page.goto(route);
    await expect(
      page
        .locator("main")
        .getByRole("link", { name: "TALK THROUGH A WORKFLOW" })
        .last(),
    ).toHaveAttribute("href", "/contact");
    await expect(
      page.getByRole("link", { name: "BOOK A WORKING SESSION" }),
    ).toHaveCount(0);
  });
}

test("the embedded calendar exposes no availability without changing the booking state", async ({
  page,
}) => {
  const { booking } = await openBooking(page, "/contact", "no-slots");
  await expect(booking.getByTestId("booking-state")).toHaveAttribute(
    "data-state",
    "ready",
  );
  await expect(
    booking
      .getByTestId("booking-embed")
      .frameLocator('iframe[title="Cal.com booking calendar"]')
      .getByText("No times available"),
  ).toBeVisible();
});

test("a failed embed offers keyboard retry and a normal external fallback", async ({
  page,
}) => {
  const { booking } = await openBooking(page, "/contact", "failure");
  const state = booking.getByTestId("booking-state");
  await expect(state).toHaveAttribute("data-state", "error");
  await expect(state).toHaveAttribute("aria-busy", "false");

  const retry = booking.getByTestId("booking-retry");
  await retry.focus();
  await expect(retry).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(state).toHaveAttribute("data-state", "ready");

  const fallback = booking.getByTestId("booking-external-link");
  await expect(fallback).toHaveAttribute("href", bookingUrl);
  await expect(fallback).toHaveAttribute("target", "_blank");
  await expect(fallback).toHaveAttribute("rel", /noopener/);
  await fallback.focus();
  await expect(fallback).toBeFocused();
});

for (const [status, message] of [
  ["accepted", "Your session is booked. Cal.com has the final details."],
  [
    "pending",
    "Your booking details were submitted. Follow the status and any next step shown by Cal.com.",
  ],
] as const) {
  test(`Cal ${status} completion uses accurate confirmation language`, async ({
    page,
  }) => {
    const { booking } = await openBooking(page, "/contact", "manual");
    await expect
      .poll(async () =>
        (await calCalls(page, "on")).some(
          (call) => call.payload?.action === "bookingSuccessfulV2",
        ),
      )
      .toBe(true);
    await page.evaluate((nextStatus) => {
      window.__calMock.emit("bookingSuccessfulV2", { status: nextStatus });
    }, status);
    await expect(booking.getByTestId("booking-state")).toHaveAttribute(
      "data-state",
      "completed",
    );
    await expect(booking.getByTestId("booking-completion")).toHaveText(message);
  });
}

test("the planner brief stays private until explicitly shared and survives embed remounts", async ({
  page,
}) => {
  await seedWorkflowBrief(page);
  const { booking } = await openBooking(page, "/contact", "failure");
  const editor = booking.getByTestId("booking-brief-editor");
  await expect(editor).toHaveValue(/Delayed deliverable: Estimate or quote/);
  await expect(booking).toContainText(
    "Your brief stays in this browser until you choose to add it to the booking.",
  );

  await expect(booking.getByTestId("booking-state")).toHaveAttribute(
    "data-state",
    "error",
  );
  expect(await calCalls(page, "inline")).toEqual([]);

  await editor.fill(`${await editor.inputValue()}\nEdited by buyer`);
  await page.reload();
  await expect(editor).toHaveValue(/Edited by buyer/);
  await expect(booking.getByTestId("booking-state")).toHaveAttribute(
    "data-state",
    "error",
  );
  expect(await calCalls(page, "inline")).toEqual([]);
  const inlineCountBeforeShare = (await calCalls(page, "inline")).length;
  await booking.getByTestId("booking-brief-use").focus();
  await page.keyboard.press("Enter");
  await expect(editor).toHaveValue(/Edited by buyer/);
  await expect(booking.getByTestId("booking-state")).toHaveAttribute(
    "data-state",
    "ready",
  );

  const sharedInline = await waitForCalCall(
    page,
    "inline",
    inlineCountBeforeShare,
  );
  expect(sharedInline?.namespace).toMatch(/^maslow-contact-1$/);
  expect(sharedInline?.payload?.config).toMatchObject({
    layout: "month_view",
    notes: expect.stringContaining("Edited by buyer"),
  });
  expect(
    await page.evaluate((key) => sessionStorage.getItem(key), workflowBriefKey),
  ).not.toBeNull();
});

test("approved entry topics reach Cal while arbitrary query text is ignored", async ({
  page,
}) => {
  const { booking } = await openBooking(
    page,
    "/contact?topic=ai-os-preview",
  );
  await expect(booking.getByTestId("booking-topic")).toHaveAttribute(
    "data-topic",
    "ai-os-preview",
  );
  expect((await waitForCalCall(page, "inline"))?.payload?.config).toMatchObject({
    notes: "Starting point: Maslow AI-OS preview",
    "metadata[maslowTopic]": "ai-os-preview",
  });

  await page.goto("/contact?topic=anything%20<script>alert(1)</script>");
  await expect(page.getByTestId("booking-topic")).toHaveCount(0);
  expect((await waitForCalCall(page, "inline"))?.payload?.config).toEqual({
    layout: "month_view",
  });
});

test("the mobile calendar iframe stays inside the booking surface", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  const { booking } = await openBooking(page);
  const [surfaceBox, frameBox] = await Promise.all([
    booking.getByTestId("booking-state").boundingBox(),
    booking.locator('iframe[title="Cal.com booking calendar"]').boundingBox(),
  ]);
  expect(surfaceBox).not.toBeNull();
  expect(frameBox).not.toBeNull();
  expect(frameBox!.x).toBeGreaterThanOrEqual(surfaceBox!.x - 1);
  expect(frameBox!.x + frameBox!.width).toBeLessThanOrEqual(
    surfaceBox!.x + surfaceBox!.width + 1,
  );
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    )
    .toBeLessThanOrEqual(1);
});


test("booking event listeners are removed when client navigation unmounts the calendar", async ({
  page,
}) => {
  const { booking } = await openBooking(page);
  await expect(booking.getByTestId("booking-state")).toHaveAttribute(
    "data-state",
    "ready",
  );
  const actions = ["linkReady", "linkFailed", "bookingSuccessfulV2"];
  await expect
    .poll(async () =>
      (await calCalls(page, "on")).filter((call) =>
        actions.includes(String(call.payload?.action)),
      ).length,
    )
    .toBe(3);

  await page
    .getByRole("banner")
    .getByRole("link", { name: "Maslow AI", exact: true })
    .click();
  await expect(page).toHaveURL(/\/$/);
  await expect
    .poll(async () =>
      (await calCalls(page, "off")).filter((call) =>
        actions.includes(String(call.payload?.action)),
      ).length,
    )
    .toBe(3);
});
