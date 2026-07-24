# Repository guidance

## Public copy

- Protect the homepage position: "AI employees for the work that waits on your busiest people."
- Lead with a buyer's workflow, constraint, deliverable, or measured result.
- Do not use em dashes in public copy. Rewrite the sentence instead of swapping punctuation mechanically.
- Do not publish placeholder articles, metrics, testimonials, or client results.
- Label production evidence, modeled outcomes, and illustrative scenarios distinctly.
- Avoid self-certifying words such as "honest," "real," "plainly," and "by design." Show the evidence or current status instead.
- Use no more than one contrast construction such as "X, not Y" on a page.
- Keep technical metaphors such as harnesses and gateways inside technical explainers. Sales pages should describe the workflow and ownership model directly.
- Use US English and "AI employee" consistently in visible copy.
- Keep diligence artifact statuses at "IN PREPARATION" until the artifact exists and has been reviewed.

## Action hierarchy

- Use navy `#192332` for default primary buttons on light surfaces and white for inverse primary buttons on dark surfaces.
- Keep pink `#EE7BB3` as a sparse interaction signal or exceptional emphasis. Do not use it as the default button fill.
- New pages must use `components/ui/CtaButton.tsx` or the semantic `--color-action-*` tokens for filled actions. Never use `--color-cta`, `--color-action-signal`, `#EE7BB3`, or `#DA85B2` as an element background.
- Use a `0px` border radius for buttons, cards, panels, inputs, navigation controls, pills, and badges. Preserve circles only for avatars, status dots, step markers, and small interaction signals whose shape carries meaning.

## Copy verification

- Run `npm test` after copy changes. The content suite rejects em dashes and known placeholder markers.
- Check page metadata, shared content modules, and inline JSX together; public copy lives in all three places.

## Accessibility and responsive verification

- Use the semantic `*-text` color tokens for readable text on light surfaces. Keep brighter accent tokens for decoration, borders, backgrounds, and text on dark surfaces.
- Keep visible form labels, visible keyboard focus, a working skip link, and one `h1` on every public route.
- Modal navigation must move focus inside, trap Tab and Shift+Tab, close on Escape, and restore focus to its trigger.
- Do not place buttons or links inside a `<summary>`. Keep interactive controls available when the related `<details>` element is closed.
- Run `npm test`, `npm run lint`, `npm run build`, and the full Playwright suite after accessibility or responsive changes.
- Keep Playwright coverage for every public route at 320, 768, 1024, and 1440 pixels, plus WCAG text spacing and reduced-motion modes.
