# OpenAI Select Partner Press Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable Maslow AI press release section and publish the exact OpenAI-approved announcement at `/press/openai-select-partner` with an August 25, 2026 publication date.

**Architecture:** Store published releases as typed data in `lib/content/press.ts`, render supported section types through one focused `PressReleaseBody` component, and use one dynamic detail route for current and future releases. The press index reads the same data set, while footer and sitemap changes make the section discoverable without changing the primary navigation.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, CSS Modules, Vitest with Testing Library, Playwright, Next Image, Maslow Brand OS tokens and components.

**Spec:** `docs/superpowers/specs/2026-08-24-openai-select-partner-press-design.md`

## Global Constraints

- Preserve the OpenAI-approved release language exactly, except for the August 25, 2026 date, removal of the two draft labels, and descriptive Production evidence link labels defined in the spec.
- Use `/Users/kesh/Downloads/OpenAI_Select_Partner_Badge.svg` unchanged and verify SHA-256 `312a3c4767dcf6a51eab6b73f49143a54dee60a88899f4b0b2ca448547efac86`.
- Use `TaxonomyCapsule` only for the passive Press Release classification label.
- Use square structural styling and existing semantic color tokens. Pink must not be a default action background.
- Do not add Press Releases to the primary navigation.
- Do not introduce em dashes, placeholder claims, metrics, testimonials, or unpublished partner claims.
- Keep all work on `feature/openai-select-partner-press` and do not push, open a pull request, merge, or deploy without separate authorization.
- Preserve all unrelated untracked files.

## File Structure

- Create `lib/content/press.ts`: typed release schema, approved OpenAI record, stable date formatter, published list, and slug lookup helpers.
- Modify `lib/content/content.test.ts`: immutable-copy, ordering, internal-link, draft-label, route, and asset-integrity tests.
- Create `components/press/PressReleaseBody.tsx`: semantic renderer for paragraphs, quotes, headings, link groups, and contact details.
- Create `components/press/PressReleaseBody.test.tsx`: renderer semantics and link behavior tests.
- Create `app/press/page.tsx`: press release index driven by the published list.
- Create `app/press/[slug]/page.tsx`: static params, metadata, lookup, 404 behavior, header, badge, and shared body renderer.
- Create `app/press/press.module.css`: index and detail presentation, responsive reflow, and visible link focus.
- Create `public/assets/partners/openai-select-partner.svg`: byte-identical supplied horizontal badge.
- Modify `lib/brand.ts`: add Press Releases to the footer Company links.
- Modify `app/sitemap.ts`: add both press URLs.
- Modify `e2e/site.spec.ts`: route smoke, exact public content, full-card press index link, footer discovery, accessibility, reduced-motion, responsive, and text-spacing coverage.

---

### Task 1: Protect the approved release in typed content

**Files:**
- Create: `lib/content/press.ts`
- Modify: `lib/content/content.test.ts`
- Create: `public/assets/partners/openai-select-partner.svg`

**Interfaces:**
- Consumes: The exact public copy and approved exceptions in the design spec.
- Produces: `PressRelease`, `PressReleaseSection`, `pressReleases`, `publishedPressReleases`, `getAllPressSlugs()`, `getPressRelease(slug)`, and `formatPressDate(isoDate)`.

- [ ] **Step 1: Write the failing content-contract tests**

Add the imports and the following `press releases` test group to `lib/content/content.test.ts`:

```ts
import { createHash } from "node:crypto";
import {
  formatPressDate,
  getAllPressSlugs,
  getPressRelease,
  publishedPressReleases,
} from "@/lib/content/press";

describe("press releases", () => {
  it("publishes the approved OpenAI release at the requested date", () => {
    const release = getPressRelease("openai-select-partner");

    expect(release?.title).toBe("Maslow AI Named an OpenAI Select Partner");
    expect(release?.publishedAt).toBe("2026-08-25");
    expect(formatPressDate(release!.publishedAt)).toBe("August 25, 2026");
    expect(release?.location).toBe("Woodbridge, NJ");
    expect(getAllPressSlugs()).toEqual(["openai-select-partner"]);
  });

  it("keeps the approved public copy free of draft labels", () => {
    const serialized = JSON.stringify(getPressRelease("openai-select-partner"));

    expect(serialized).not.toContain("DRAFT FOR OPENAI REVIEW");
    expect(serialized).not.toContain("NOT FOR PUBLICATION");
    expect(serialized).not.toContain("September 9, 2026");
    expect(serialized).toContain("Woodbridge, NJ, August 25, 2026:");
    expect(serialized).toContain(
      "Being named an OpenAI Select Partner gives Maslow a stronger path",
    );
  });

  it("uses descriptive internal production-evidence links", () => {
    const release = getPressRelease("openai-select-partner");
    const serialized = JSON.stringify(release?.sections);

    expect(serialized).toContain(
      "Infinite AI OS: an AI operating system in 90 days",
    );
    expect(serialized).toContain("/case-studies/infinite-ai-os");
    expect(serialized).toContain("AgentHub: contracts you can question");
    expect(serialized).toContain("/case-studies/agenthub");
  });

  it("orders published releases newest first", () => {
    expect(publishedPressReleases).toEqual(
      [...publishedPressReleases].sort((a, b) =>
        b.publishedAt.localeCompare(a.publishedAt),
      ),
    );
  });

  it("keeps the supplied partner badge byte-identical", () => {
    const bytes = readFileSync(
      join("public", "assets", "partners", "openai-select-partner.svg"),
    );
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(
      "312a3c4767dcf6a51eab6b73f49143a54dee60a88899f4b0b2ca448547efac86",
    );
  });
});
```

- [ ] **Step 2: Run the targeted test and confirm the expected failure**

Run:

```bash
npm test -- lib/content/content.test.ts
```

Expected: FAIL because `@/lib/content/press` and the committed badge do not exist.

- [ ] **Step 3: Copy and verify the approved badge**

Create the asset directory, copy the supplied horizontal SVG without transformation, and verify both hashes:

```bash
mkdir -p public/assets/partners
cp /Users/kesh/Downloads/OpenAI_Select_Partner_Badge.svg public/assets/partners/openai-select-partner.svg
shasum -a 256 /Users/kesh/Downloads/OpenAI_Select_Partner_Badge.svg public/assets/partners/openai-select-partner.svg
```

Expected: both lines start with `312a3c4767dcf6a51eab6b73f49143a54dee60a88899f4b0b2ca448547efac86`.

- [ ] **Step 4: Implement the minimal typed content module**

Create `lib/content/press.ts` with these exact public interfaces:

```ts
export type PressReleaseLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type PressReleaseSection =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "heading"; id: string; text: string }
  | { type: "links"; heading: string; links: readonly PressReleaseLink[] }
  | {
      type: "linkedParagraph";
      before: string;
      link: PressReleaseLink;
      after: string;
    }
  | {
      type: "contact";
      heading: string;
      name: string;
      title: string;
      company: string;
      email: string;
    };

export type PressRelease = {
  slug: string;
  title: string;
  publishedAt: string;
  location: string;
  description: string;
  badge?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  sections: readonly PressReleaseSection[];
};

export function formatPressDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
```

Add one `PressRelease` record whose section sequence is exactly:

- `description` is the complete approved Woodbridge dateline paragraph, unchanged.
- `badge` is `{ src: "/assets/partners/openai-select-partner.svg", alt: "OpenAI Select Partner", width: 375, height: 177 }`.

1. The August 25 Woodbridge dateline paragraph from the spec.
2. The OpenAI Partner Network program paragraph.
3. The Select Partner and GPT-5.6 paragraph.
4. The waiting-work paragraph.
5. The complete Rakesh David quotation as one `quote` section, including both quoted sentences and attribution exactly as approved.
6. The production-work paragraph.
7. A `links` section headed `Production evidence` containing the two specified internal labels and relative destinations.
8. The Looking ahead paragraph.
9. A `links` section headed `Learn more about the OpenAI Partner Network` containing `https://openai.com/business/partners/`, marked `external: true`.
10. A heading section with `id: "about-maslow-ai"` and `text: "About Maslow AI"`.
11. The approved About Maslow AI paragraph.
12. A `linkedParagraph` with `before: "Learn more at "`, link label and href `https://maslow.ai`, and `after: "."`.
13. The exact Media contact record.

Use this collection and helpers:

```ts
export const pressReleases: readonly PressRelease[] = [openAiSelectPartner];

export const publishedPressReleases = [...pressReleases].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function getAllPressSlugs() {
  return publishedPressReleases.map(({ slug }) => slug);
}

export function getPressRelease(slug: string) {
  return publishedPressReleases.find((release) => release.slug === slug);
}
```

Read the approved paragraphs directly from the spec while entering the record, then compare the finished serialized content with the spec line by line. Do not paraphrase any body text.

- [ ] **Step 5: Run the content test and the public-copy suite**

Run:

```bash
npm test -- lib/content/content.test.ts
npm test
```

Expected: both commands PASS, including the exact SHA-256 check and existing em-dash and placeholder guards.

- [ ] **Step 6: Commit the protected content contract**

```bash
git add lib/content/press.ts lib/content/content.test.ts public/assets/partners/openai-select-partner.svg
git commit -m "feat(press): add approved OpenAI release content"
```

---

### Task 2: Render reusable press index and detail routes

**Files:**
- Create: `components/press/PressReleaseBody.test.tsx`
- Create: `components/press/PressReleaseBody.tsx`
- Create: `app/press/page.tsx`
- Create: `app/press/[slug]/page.tsx`
- Create: `app/press/press.module.css`

**Interfaces:**
- Consumes: `PressRelease`, `PressReleaseSection`, `publishedPressReleases`, `getAllPressSlugs()`, `getPressRelease(slug)`, and `formatPressDate(isoDate)` from Task 1.
- Produces: `<PressReleaseBody sections={release.sections} />`, `/press`, and `/press/[slug]`.

- [ ] **Step 1: Write the failing semantic-renderer test**

Create `components/press/PressReleaseBody.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { PressReleaseBody } from "./PressReleaseBody";
import { getPressRelease } from "@/lib/content/press";

describe("PressReleaseBody", () => {
  it("renders approved sections with semantic links and contact details", () => {
    const release = getPressRelease("openai-select-partner");
    render(<PressReleaseBody sections={release!.sections} />);

    expect(
      screen.getByRole("heading", { name: "Production evidence" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: "Infinite AI OS: an AI operating system in 90 days",
      }),
    ).toHaveAttribute("href", "/case-studies/infinite-ai-os");
    expect(
      screen.getByRole("link", {
        name: "AgentHub: contracts you can question",
      }),
    ).toHaveAttribute("href", "/case-studies/agenthub");
    expect(
      screen.getByRole("link", { name: "https://openai.com/business/partners/" }),
    ).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("heading", { name: "Media contact" })).toBeVisible();
    expect(screen.getByRole("link", { name: "rakesh@maslow.ai" })).toHaveAttribute(
      "href",
      "mailto:rakesh@maslow.ai",
    );
  });
});
```

- [ ] **Step 2: Run the renderer test and confirm the expected failure**

Run:

```bash
npm test -- components/press/PressReleaseBody.test.tsx
```

Expected: FAIL because `PressReleaseBody.tsx` does not exist.

- [ ] **Step 3: Implement the semantic section renderer**

Create a server-safe component that switches exhaustively on `section.type`. Use `next/link` only when a link `href` starts with `/`; use `<a target="_blank" rel="noopener noreferrer">` only when `external` is true; and use an ordinary `<a>` for `mailto:`. The rendering contract is:

```tsx
type PressReleaseBodyProps = {
  sections: readonly PressReleaseSection[];
};

export function PressReleaseBody({ sections }: PressReleaseBodyProps) {
  return (
    <div className={styles.prose}>
      {sections.map((section, index) => {
        const key = `${section.type}-${index}`;
        if (section.type === "paragraph") {
          return <p key={key}>{section.text}</p>;
        }
        if (section.type === "quote") {
          return <blockquote key={key}>{section.text}</blockquote>;
        }
        if (section.type === "heading") {
          return <h2 key={key} id={section.id}>{section.text}</h2>;
        }
        if (section.type === "links") {
          return (
            <section key={key} aria-labelledby={`${section.heading.toLowerCase().replaceAll(" ", "-")}-${index}`}>
              <h2 id={`${section.heading.toLowerCase().replaceAll(" ", "-")}-${index}`}>{section.heading}</h2>
              <ul>{section.links.map((link) => <li key={link.href}>{renderPressLink(link)}</li>)}</ul>
            </section>
          );
        }
        if (section.type === "linkedParagraph") {
          return <p key={key}>{section.before}{renderPressLink(section.link)}{section.after}</p>;
        }
        return (
          <section key={key} aria-labelledby="media-contact">
            <h2 id="media-contact">{section.heading}</h2>
            <address>
              <span>{section.name}</span>
              <span>{section.title}</span>
              <span>{section.company}</span>
              <a href={`mailto:${section.email}`}>{section.email}</a>
            </address>
          </section>
        );
      })}
    </div>
  );
}
```

Put link selection in a focused local `renderPressLink(link: PressReleaseLink)` helper and place all styling in the press CSS module.

- [ ] **Step 4: Run the renderer test and confirm it passes**

Run:

```bash
npm test -- components/press/PressReleaseBody.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Create the shared press index**

Implement `app/press/page.tsx` with:

- Metadata title `Press Releases`.
- Metadata description and visible introduction `Official announcements from Maslow AI.`.
- `PageShell footer="full" showCtaBand={false}`.
- One `h1` with `Press Releases`.
- One full-card `Link` per `publishedPressReleases` record with `href={`/press/${release.slug}`}`.
- An article containing the formatted date, release title as `h2`, and a non-interactive `Read press release` text span.

Use this semantic card shape:

```tsx
{publishedPressReleases.map((release) => (
  <Link
    key={release.slug}
    href={`/press/${release.slug}`}
    className={styles.cardLink}
    aria-label={`Read press release: ${release.title}`}
  >
    <article className={styles.card} data-press-release={release.slug}>
      <time dateTime={release.publishedAt}>
        {formatPressDate(release.publishedAt)}
      </time>
      <h2>{release.title}</h2>
      <span aria-hidden>Read press release&nbsp;&nbsp;&gt;</span>
    </article>
  </Link>
))}
```

- [ ] **Step 6: Create the reusable dynamic detail page**

Implement `app/press/[slug]/page.tsx` following the existing blog dynamic-route conventions:

```tsx
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPressSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const release = getPressRelease(slug);
  if (!release) return { title: "Press Release" };
  return { title: release.title, description: release.description };
}
```

The page must call `notFound()` for an unknown slug. For a found release, render `PageShell footer="full"`, a passive `TaxonomyCapsule` containing `Press Release`, the exact title as the only `h1`, a `<time>` with the formatted publication date, the supplied badge through `next/image` using the record's dimensions and alt text, and `<PressReleaseBody sections={release.sections} />`.

- [ ] **Step 7: Add restrained responsive presentation**

Create `app/press/press.module.css` using these layout invariants:

```css
.hero,
.detailHeader,
.detailBody {
  padding-inline: var(--gutter);
  background: var(--color-white);
}

.heroInner,
.index,
.detailHeaderInner,
.detailBodyInner {
  width: min(100%, var(--max));
  margin-inline: auto;
}

.detailHeaderInner,
.detailBodyInner {
  max-width: 760px;
}

.card {
  border: 1px solid var(--color-line-soft);
  border-radius: var(--radius-structural);
  color: var(--color-text);
}

.cardLink:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 4px;
}

.badge {
  width: min(100%, 520px);
  height: auto;
}

.prose {
  overflow-wrap: anywhere;
  font: 400 17px/29px var(--font-sans);
  color: var(--color-text);
}

.prose address {
  display: flex;
  flex-direction: column;
  font-style: normal;
}

@media (max-width: 600px) {
  .detailTitle {
    font-size: 36px;
    line-height: 42px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

Use only semantic tokens already defined in `app/globals.css`. Keep card and content spacing in normal document flow and do not absolutely position metadata.

- [ ] **Step 8: Verify unit tests and production compilation**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all commands PASS, and the build output lists `/press` and `/press/[slug]` with the OpenAI slug statically generated.

- [ ] **Step 9: Commit the reusable routes**

```bash
git add components/press app/press
git commit -m "feat(press): add reusable press release pages"
```

---

### Task 3: Add footer, sitemap, and public-route coverage

**Files:**
- Modify: `lib/brand.ts`
- Modify: `app/sitemap.ts`
- Modify: `e2e/site.spec.ts`

**Interfaces:**
- Consumes: `/press` and `/press/openai-select-partner` from Task 2.
- Produces: Footer discovery, sitemap entries, press-specific browser assertions, and inclusion in the site-wide route matrix.

- [ ] **Step 1: Write failing press discovery and content browser tests**

Add a focused describe block to `e2e/site.spec.ts`:

```ts
test.describe("press releases", () => {
  test("press index links the full card to the approved release", async ({ page }) => {
    await page.goto("/press");
    const link = page.getByRole("link", {
      name: "Read press release: Maslow AI Named an OpenAI Select Partner",
    });
    const article = link.locator('[data-press-release="openai-select-partner"]');
    expect(await link.boundingBox()).toEqual(await article.boundingBox());
    await link.click({ position: { x: 24, y: 24 } });
    await expect(page).toHaveURL(/\/press\/openai-select-partner$/);
  });

  test("approved release shows exact status, evidence, and external resource", async ({ page }) => {
    await page.goto("/press/openai-select-partner");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Maslow AI Named an OpenAI Select Partner",
      }),
    ).toBeVisible();
    await expect(page.getByText("August 25, 2026", { exact: true })).toBeVisible();
    await expect(page.getByText(/DRAFT FOR OPENAI REVIEW/)).toHaveCount(0);
    await expect(page.getByText(/NOT FOR PUBLICATION/)).toHaveCount(0);
    await expect(
      page.getByRole("link", {
        name: "Infinite AI OS: an AI operating system in 90 days",
      }),
    ).toHaveAttribute("href", "/case-studies/infinite-ai-os");
    await expect(
      page.getByRole("link", { name: "AgentHub: contracts you can question" }),
    ).toHaveAttribute("href", "/case-studies/agenthub");
    await expect(
      page.getByRole("link", { name: "https://openai.com/business/partners/" }),
    ).toHaveAttribute("target", "_blank");
  });

  test("footer exposes the press section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("footer").getByRole("link", { name: "Press Releases" }),
    ).toHaveAttribute("href", "/press");
  });
});
```

- [ ] **Step 2: Build and run the focused browser tests to verify the footer failure**

Run:

```bash
npm run build
npx playwright test e2e/site.spec.ts --project=chromium-desktop --grep "press releases"
```

Expected: route tests pass and the footer test FAILS because `Press Releases` is absent.

- [ ] **Step 3: Add the footer Company link**

In `lib/brand.ts`, insert the press link after Blog and before About:

```ts
{ href: "/blog", label: "Blog" },
{ href: "/press", label: "Press Releases" },
{ href: "/about", label: "About" },
```

Do not modify `navLinks`.

- [ ] **Step 4: Add both routes to the sitemap**

In `app/sitemap.ts`, insert:

```ts
"/press",
"/press/openai-select-partner",
```

Keep the existing sitemap transformation and priorities unchanged.

- [ ] **Step 5: Add both routes to the shared Playwright route matrix**

In the top-level `routes` array in `e2e/site.spec.ts`, add:

```ts
"/press",
"/press/openai-select-partner",
```

This automatically applies route smoke, Axe, reduced-motion, 320/768/1024/1440 reflow, one-`h1`, and text-spacing tests to both routes.

- [ ] **Step 6: Rebuild and run focused discovery tests**

Run:

```bash
npm run build
npx playwright test e2e/site.spec.ts --project=chromium-desktop --grep "press releases"
```

Expected: all focused press tests PASS.

- [ ] **Step 7: Commit discovery and coverage**

```bash
git add lib/brand.ts app/sitemap.ts e2e/site.spec.ts
git commit -m "test(press): cover release discovery and approved copy"
```

---

### Task 4: Complete full-site verification and handoff

**Files:**
- Verify: all files changed in Tasks 1 through 3
- Do not modify unrelated untracked files

**Interfaces:**
- Consumes: the complete local press implementation.
- Produces: a verified local branch ready for user-authorized push and pull request.

- [ ] **Step 1: Verify the branch and intended diff**

Run:

```bash
git branch --show-current
git status --short
git diff main...HEAD --stat
git diff main...HEAD --check
```

Expected: branch is `feature/openai-select-partner-press`; no intended press file is unstaged; unrelated pre-existing untracked files remain untracked; diff check reports no whitespace errors.

- [ ] **Step 2: Recheck copy and badge invariants from source**

Run:

```bash
rg -n "DRAFT FOR OPENAI REVIEW|NOT FOR PUBLICATION|September 9, 2026|—" app/press components/press lib/content/press.ts
shasum -a 256 /Users/kesh/Downloads/OpenAI_Select_Partner_Badge.svg public/assets/partners/openai-select-partner.svg
```

Expected: the text scan prints nothing; both asset hashes equal `312a3c4767dcf6a51eab6b73f49143a54dee60a88899f4b0b2ca448547efac86`.

- [ ] **Step 3: Run every repository quality gate**

Run:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

Expected: all four commands PASS. The full Playwright run exercises both press routes on desktop and mobile projects, including the shared route-matrix accessibility and responsive tests.

- [ ] **Step 4: Inspect both rendered routes at launch breakpoints**

Use the running production build to inspect `/press` and `/press/openai-select-partner` at 320, 768, 1024, and 1440 pixels. Confirm the badge remains legible, the title and long URLs wrap without overflow, the full-card focus outline is visible, Production evidence links are recognizable as links, and the footer Press Releases link works.

Record any issue as a specific file-level correction, apply the smallest fix, and rerun the directly affected test plus `npm run test:all` before continuing.

- [ ] **Step 5: Report the local delivery boundary**

Report the branch name, commit list, verification results, local routes, and the fact that nothing was pushed, merged, or deployed. Ask for separate authorization before pushing and opening a pull request.
