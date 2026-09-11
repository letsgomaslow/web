# Booking and CTA setup

## Booking destination

The user supplied `https://cal.com/maslow/30min` for the public website. Keep `/contact` as the stable website scheduling destination so existing navigation, articles, case studies, and campaign links continue to work. The campaign also embeds the same event at its existing `#book` anchor. Cal.com manages availability and booking details; the website does not proxy the booking API or need a private Cal API key.

Public inspection on September 11, 2026 verified Rakesh David, the event title `30 Min Meeting`, a 30-minute duration, Google Meet, a timezone selector, and returned available time slots. The public event data reports `requiresConfirmation: false`. This is public configuration evidence, not a test of calendar writes, invitation delivery, conferencing creation, reminders, or the account's private settings. No real appointment was made during review.

## CTA map

| Visitor intent | Website action | Destination and behavior |
| --- | --- | --- |
| Discuss work with Maslow | Talk through a workflow, Let's talk, or a contextual discussion link | `/contact` with the embedded 30-minute Cal event |
| Campaign workflow conversation | Talk through a workflow or Discuss your own workflow | The campaign's existing `#book` section and the same Cal event |
| Evaluate AI-OS | Explore the preview | `/ai-os`, with clear development status and no public-download claim |
| Discuss a selected evaluation path | Talk through this starting point | `/contact` carrying a whitelisted preview or existing-infrastructure topic |
| Shape a workflow | Map a workflow first | `/plan-workflow`; the optional brief can be reviewed and explicitly shared when booking |
| Read delivery evidence | Client-work and case-study actions | The appropriate case study, with scheduling available as a next step |
| Learn about a concept | Resource, article, and interactive-story actions | The relevant content or story chapter, with scheduling available separately |
| Request procurement material | Request available materials | The diligence email request, with availability and gaps confirmed by Maslow |
| Write instead of scheduling | Email Maslow | `mailto:rakesh@maslow.ai` |
| Visit a project or partner | Official project/source links | The named third-party website |

There is no published newsletter signup. The dormant NewsletterForm would only send an inbox notification, not create a mailing-list subscription; it must not be reintroduced as a functioning subscription until an email platform and unsubscribe handling are connected. The retired assessment's report form is not reachable. No new newsletter, PDF automation, CRM, or public product download is implied by this change.

## Design and integration

Use the official React embed, loaded in the booking area. Keep the site's approved complete company logo, typography, and page composition. Cal's supported embed variables control colors, surfaces, borders, spacing, and corner radii; its internal typography and structural booking controls remain governed by Cal's supported customization. Do not inject CSS into the cross-origin frame or hide required provider attribution.

The planner brief is editable before sharing. Pass it through supported booking configuration only after the visitor chooses to use it, keep personal or workflow text out of the website's URL and analytics, and preserve it when loading fails. Cal's native completion screen is the authority for confirmed versus pending state. A booking-success browser event is not by itself proof of confirmed delivery.

Keep a direct Cal.com link and email fallback available if the embed fails or is blocked. Retain the diligence API and existing Resend configuration for actual document requests.

## Cal.com account settings to verify

- Rename the generic `30 Min Meeting` event to `Workflow conversation with Maslow AI`, and add a short description of the first conversation. Keep the duration at 30 minutes unless the website copy is updated with it.
- Verify connected calendars for conflict checking and the destination calendar receiving bookings. Availability hours alone do not establish either integration.
- Confirm Google Meet is the intended meeting location and its account connection is active.
- Review minimum notice, before/after buffers, booking horizon, and daily limits against the host's preferences; the website does not override these settings.
- Check confirmation/invitation emails, cancellation and rescheduling links, and reminder workflows. These require an end-to-end appointment test using the host's chosen test attendee.
- If removing Cal.com attribution is desired, confirm the account's plan and branding entitlement. The website retains provider branding unless the account permits removing it.
- The separate diligence request still depends on a configured Resend API key, a verified sender, and the intended recipient inbox. No private production values were read or changed during this work.

Official references: [embed appearance](https://cal.com/docs/developing/guides/embeds/customize-embed-css-variables), [embed instructions](https://cal.com/help/embedding/embed-instructions), [prefill fields](https://cal.com/help/embedding/prefill-booking-form-embed), [booking events](https://cal.com/help/embedding/embed-events), and [Cal.com branding FAQ](https://cal.com/scheduling/frequently-asked-questions).

## Verification for this implementation

On September 11, 2026, lint, the production build, and all 28 unit/content/brand tests passed. The full Playwright suite passed with 339 tests and 53 existing project/viewport skips. An unchanged scroll-story test was intermittent in an earlier parallel run; it passed three isolated reruns and the subsequent complete suite. Two concept-page screenshots were reviewed and updated only for the intended secondary CTA copy change.

The live Cal embed was inspected locally at 1440×1100, 390×844, 768×1024, and 805×472. It rendered the supplied event, available dates and times, timezone control, Maslow color variables, and responsive layout without horizontal overflow or page errors. The date-to-details step and approved topic prefill were also checked on desktop and phone. Automated booking success/failure, brief handoff, and diligence delivery use mocks. No appointment was confirmed and no review email was sent.

The private Cal.com and Vercel settings were not accessible without sign-in. Account-level calendar conflicts, conferencing, reminders, invitation delivery, and the separate production email configuration remain the owner's checks. Deployment status and the final production smoke result are recorded in the pull request.
