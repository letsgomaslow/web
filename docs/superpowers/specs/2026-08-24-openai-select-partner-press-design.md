# OpenAI Select Partner Press Release Design

**Status:** Approved for implementation

**Date:** August 24, 2026

**Owner:** Maslow AI

## Goal

Add a reusable press release section to the Maslow AI website and publish the OpenAI-approved announcement as its first release. The published announcement must preserve the approved language exactly, except for the publication date, removal of the two draft labels, and presentation of the two production-evidence URLs as descriptive internal links.

## Scope

The implementation will add:

- `/press`, a press release index ordered newest first.
- `/press/openai-select-partner`, the first press release detail page.
- A typed content model and shared press release renderer that can support future partner announcements without duplicating page structure.
- A `Press Releases` link in the footer's Company navigation group.
- Both press routes in the sitemap.
- The supplied horizontal OpenAI Select Partner SVG, copied without modification into the site's public assets.
- Automated coverage for content integrity, navigation, accessibility, and responsive behavior.

The implementation will not add Press Releases to the primary navigation, change the homepage positioning, introduce unpublished partner claims, or publish/deploy the work without separate authorization.

## Information Architecture

### Press index

`/press` will be a restrained newsroom-style listing page with:

- One `h1`: `Press Releases`.
- A short neutral introduction: `Official announcements from Maslow AI.`
- Release cards ordered by publication date, newest first.
- Each card implemented as one semantic full-card link.
- Card content limited to release title, publication date, and `Read press release` so the approved release body is not paraphrased.

The index will be driven by the same typed content records used by detail pages. Adding a future release should require a content record and assets, not a new bespoke layout.

### Press release detail

`/press/openai-select-partner` will use the shared press release renderer and contain:

1. A press-release taxonomy label.
2. The exact approved title as the single `h1`.
3. The publication date, `August 25, 2026`.
4. The unchanged horizontal OpenAI Select Partner badge.
5. The approved body in its original order.
6. A clearly labeled Production evidence section with two descriptive internal links.
7. The OpenAI Partner Network external link.
8. The About Maslow AI and Media contact sections.

The page will use existing layout, typography, action, and taxonomy components and tokens. Buttons and action links will remain square. The partner badge is third-party proof and will not replace Maslow's own message or visual identity.

## Content Model

Create a typed press release content module with fields equivalent to:

```ts
type PressRelease = {
  slug: string;
  title: string;
  publishedAt: string;
  location: string;
  badge?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  sections: PressReleaseSection[];
};
```

The section union should support paragraphs, quotes with attribution, headings, link lists, and contact details. Content remains data, while layout and semantics stay in the shared renderer. The implementation should choose the smallest type surface needed for this release and avoid a general-purpose content management abstraction.

## Approved Copy Contract

The Google Doc shared with and approved by OpenAI is the source of truth. The public page may make only these approved presentation changes:

- Remove `DRAFT FOR OPENAI REVIEW`.
- Remove `NOT FOR PUBLICATION`.
- Change the dateline from `September 9, 2026` to `August 25, 2026`.
- Render the two raw Production evidence URLs with these labels while keeping their exact destinations:
  - `Infinite AI OS: an AI operating system in 90 days` links to `https://maslow.ai/case-studies/infinite-ai-os`.
  - `AgentHub: contracts you can question` links to `https://maslow.ai/case-studies/agenthub`.

No other wording, punctuation, paragraph order, quotation, capitalization, or claim may change. The exact approved text is:

> **Maslow AI Named an OpenAI Select Partner**
>
> Woodbridge, NJ, August 25, 2026: Maslow AI, a founder-led AI transformation company that builds supervised AI employees around the workflows and systems organizations already use, today announced that it has been named an OpenAI Select Partner within the OpenAI Partner Network.
>
> The OpenAI Partner Network is a global program for partners to build, sell, and deliver AI solutions with OpenAI. It brings together partners with deep industry expertise, delivery capabilities, and customer relationships while equipping them with resources, enablement, and support to help enterprises adopt OpenAI frontier models and products and turn them into measurable impact.
>
> As an OpenAI Select Partner, Maslow AI will continue working with OpenAI to help organizations build, deploy, and scale AI solutions responsibly and effectively. This work will help organizations get more useful work from every token and stronger performance per dollar with GPT-5.6, while using ChatGPT Work to turn ambitious goals into finished work.
>
> Maslow AI focuses on work that waits on overloaded owners, including estimating, contract review, compliance responses, client intake, and recurring operational reporting. Its systems bring governed company knowledge, reusable procedures, scoped tools, and human approval into the channels where teams already work.
>
> “Being named an OpenAI Select Partner gives Maslow a stronger path to combine OpenAI’s frontier capabilities with the workflow ownership, governed knowledge, and human review our clients need,” said Rakesh David, Founder and CEO of Maslow AI. “Our goal is to help a responsible owner move a waiting deliverable forward with better evidence, while keeping consequential decisions with people.”
>
> Maslow AI supports mid-market organizations with workflow discovery, knowledge-system design, context engineering, supervised AI employees, and production deployment. Published production work includes a manufacturing engagement that put four named AI employees into Microsoft Teams and established a working AI operating foundation in 90 days. It also includes a healthcare contract-review system grounded in a 50-document corpus with field-level citations.
>
> **Production evidence:**
>
> - Infinite AI OS: an AI operating system in 90 days
> - AgentHub: contracts you can question
>
> Looking ahead, Maslow AI plans to expand its OpenAI-related delivery capabilities, invest in partner enablement, and develop repeatable workflow patterns that help mid-market organizations translate AI ambition into measurable operational outcomes.
>
> **Learn more about the OpenAI Partner Network:**
>
> https://openai.com/business/partners/
>
> **About Maslow AI**
>
> Maslow AI builds AI employees for the work that waits on an organization’s busiest people. The company turns files into governed knowledge, procedures into reusable skills, and repeated work into supervised workflows with clear human decision points. Maslow AI’s systems run in the channels and infrastructure its clients control, with code, documentation, and operating artifacts delivered into client-owned repositories.
>
> Learn more at https://maslow.ai.
>
> **Media contact**
>
> Rakesh David
>
> Founder & CEO
>
> Maslow AI
>
> rakesh@maslow.ai

## Asset Handling

Use `/Users/kesh/Downloads/OpenAI_Select_Partner_Badge.svg` as the source. Copy it byte-for-byte to a descriptive location under `public/`. Do not redraw, recolor, crop, add effects, or combine it into a new co-branded mark. Verify the copied file against source SHA-256 `312a3c4767dcf6a51eab6b73f49143a54dee60a88899f4b0b2ca448547efac86`.

## Metadata and Discovery

- Give each route unique, accurate metadata.
- Use the exact release title for the detail page metadata title.
- Use a neutral description derived directly from the approved first paragraph without adding new claims.
- Add `/press` and `/press/openai-select-partner` to `app/sitemap.ts`.
- Add `Press Releases` to the footer Company links only.

## Verification and Acceptance Criteria

Implementation will be test-first. Tests must initially demonstrate the missing behavior, then pass after implementation.

Acceptance requires:

- The detail page contains the exact approved text and the August 25, 2026 dateline.
- Neither draft label appears in source or rendered public content.
- Both Production evidence labels link to the intended internal routes.
- The OpenAI Partner Network link is external and clearly named.
- The supplied badge is byte-identical to the source and has useful alt text.
- `/press` lists the release and links to its detail route.
- Footer navigation and sitemap include the new section.
- Both routes have one `h1`, semantic headings and links, keyboard-visible focus, and readable text contrast.
- The pages remain usable at 320, 768, 1024, and 1440 pixel viewport widths, with WCAG text spacing and reduced motion settings.
- `npm test`, `npm run lint`, `npm run build`, and the full Playwright suite pass.

## Delivery Boundary

Work will remain on `feature/openai-select-partner-press`. Implementation may be committed locally after verification. Pushing the branch, opening a pull request, merging, and deploying each require separate user authorization.
