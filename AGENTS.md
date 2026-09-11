# Repository guidance

## Public copy

- Lead with Maslow AI-OS, our free Linux workspace in development, and connect it to Maslow AI's paid knowledge, infrastructure, and workflow implementation services.
- Lead with a buyer's workflow, constraint, deliverable, or measured result.
- Do not use em dashes in public copy. Rewrite the sentence instead of swapping punctuation mechanically.
- Do not publish placeholder articles, metrics, testimonials, or client results.
- Label production evidence, modeled outcomes, and illustrative scenarios distinctly.
- Avoid self-certifying words such as "honest," "real," "plainly," and "by design." Show the evidence or current status instead.
- Use no more than one contrast construction such as "X, not Y" on a page.
- Keep technical metaphors such as harnesses and gateways inside technical explainers. Sales pages should describe the workflow and ownership model directly.
- Use US English. Use Maslow AI for the company, Maslow AI-OS for the product, and agent for the tools it supports. Historical client and press terminology may remain with context.
- Address a business leader and their IT counterpart. Distinguish current preview capabilities, optional client integrations, illustrative workflows, and future direction. An OS installation is not required to engage Maslow on existing infrastructure.
- Preserve immersive, purposeful storytelling across dense concepts, with native scrolling, direct controls, and readable reduced-motion and no-WebGL alternatives.
- Keep diligence artifact statuses at "IN PREPARATION" until the artifact exists and has been reviewed.

## Creative direction

- For this buyer-journey redesign, the user authorizes departures from layout, shape, and motion conventions when they strengthen the visual story. Preserve approved company identity, recognizable brand colors and typography, accessible controls, and accurate claims. The pinned Brand OS package and approved assets remain unchanged.

## Action hierarchy

- Use navy `#192332` for default primary buttons on light surfaces and white for inverse primary buttons on dark surfaces.
- Keep pink `#EE7BB3` as a sparse interaction signal or exceptional emphasis. Do not use it as the default button fill.
- New pages must use `components/ui/CtaButton.tsx` or the semantic `--color-action-*` tokens for filled actions. Never use `--color-cta`, `--color-action-signal`, `#EE7BB3`, or `#DA85B2` as an element background.
- Use a `0px` border radius for buttons, action links, cards, panels, inputs, navigation controls, interactive filters, interactive chips, and interactive badges.
- Use `var(--radius-capsule)` only for non-interactive taxonomy or content-classification labels. Render those labels with `components/ui/TaxonomyCapsule.tsx`; do not give them links, button roles, click handlers, focus targets, or pointer cursors.
- Preserve circles only for avatars, status dots, step markers, and small interaction signals whose shape carries meaning.

## Copy verification

- Run `npm test` after copy changes. The content suite rejects em dashes and known placeholder markers.
- Check page metadata, shared content modules, and inline JSX together; public copy lives in all three places.

## Buyer and evaluator paths

- Buyer-facing concept routes must lead with the waiting workflow, responsible owner, human decision, evidence status, and next action. Keep comprehensive technical maps on a secondary evaluator route.
- Put a page-specific working-session action before deep reference content. Technical exploration must never be required before booking.
- Label production evidence and illustrative patterns beside the exact claim they support.

## Card interaction and layout

- When a card has a destination, use one semantic link for the full card and keep nested CTA text non-interactive. Cards without a destination must stay non-interactive and use `null`, never `"#"`, for missing routes.
- Keep repeated card labels and status metadata in normal layout flow with explicit gaps. Do not absolutely position metadata that must scale to new sectors, statuses, or viewport widths.
- Give responsive card elements a local CSS-module class when their grid placement changes. Do not rely on styling a global utility class through a scoped CSS-module selector.

## Accessibility and responsive verification

- Use the semantic `*-text` color tokens for readable text on light surfaces. Keep brighter accent tokens for decoration, borders, backgrounds, and text on dark surfaces.
- Keep visible form labels, visible keyboard focus, a working skip link, and one `h1` on every public route.
- Modal navigation must move focus inside, trap Tab and Shift+Tab, close on Escape, and restore focus to its trigger.
- Do not place buttons or links inside a `<summary>`. Keep interactive controls available when the related `<details>` element is closed.
- Run `npm test`, `npm run lint`, `npm run build`, and the full Playwright suite after accessibility or responsive changes.
- Keep Playwright coverage for every public route at 320, 768, 1024, and 1440 pixels, plus WCAG text spacing and reduced-motion modes.
