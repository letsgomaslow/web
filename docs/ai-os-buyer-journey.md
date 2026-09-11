# AI-OS buyer journey website

## Scope and source

This redesign starts from website commit `09b5b3bd363d7835d58b7b113a87ceb694e7ffbe` and the accepted `concepts/ai-os-landing-v2` prototype in the Maslow OS repository. The records below distinguish the original local preview from the subsequent website release preparation. Publishing the website does not release the AI-OS product.

The company remains Maslow AI. Maslow AI-OS is the free Linux product in development; discovery, configuration, organizational knowledge, workflow implementation, training, and support are separately scoped services. Clients can use their existing infrastructure. The primary audience is a business leader and their IT counterpart.

The pinned Brand OS package and approved complete logos remain unchanged. The user explicitly permitted departures from structural design conventions when they strengthen the visual story. Brand identity, accessible behavior, and claim accuracy remain requirements.

## Journey and content

- The homepage preserves the distinct agent handoff, seven foundation chapters, original detailed Three.js sculpture, approved workspace art, tool combinations, client bridge, and separate product/service next steps.
- AI-OS provides practical development status, evaluation fit, separate costs, and a visual comparison of the workspace and existing organizational infrastructure.
- Services offers four independent starting needs. How We Engage explains scoped delivery and retains the 90-Day Foundation as optional detail.
- Client Work contains two actual client engagements. Infinite AI OS is identified as a custom client system, distinct from the Linux product. AgentHub is a deployed client implementation; 93% refers only to expected first-tool selection in 26 of 28 tests.
- Resources groups material by the visitor's question. The four article URLs and publication dates remain; substantial editorial updates are dated September 11, 2026. The approved historical OpenAI announcement remains separate from current product claims.
- Knowledge, second brain, skills, agent controls, local/cloud boundaries, service delivery, and client evidence use interactive stories with readable source text.
- `/plan-workflow` preserves the four-question mapper, editable brief, session restoration, and contact handoff. It does not calculate a maturity score or prescribe a large engagement.
- Contact and campaign forms use the existing `/api/contact` contract. Receipts describe requests, not calendar bookings or automatic PDF delivery.

## URL continuity

`lib/routes.ts` is the public route inventory and redirect map. The sitemap and page canonical links use the same canonical domain. Old assessment and buyer architecture URLs lead directly to `/plan-workflow`; the technical architecture URL leads to `/concepts/shared-ai-infrastructure`; the generic AI-employee concept leads to `/services#workflows`. The existing campaign URL remains a focused workflow entry point. Historical HTML redirects are retained, with the old assessment redirect updated to avoid a chain.

## Review and cutover

The original implementation was local. The user subsequently authorized a pull request, merge to `main`, and the repository's automatic Vercel deployment. Deployment settings and provider credentials remain unchanged, and review submissions must not reach a live inbox.

The original content/design scope left inherited dependency advisories for the release stage. Release preparation updates Next.js and its ESLint configuration from 15.5.21 to 15.5.25, Vitest to 4.1.11, and affected transitive dependencies. PostCSS is overridden to 8.5.28 because Next.js 15 still pins an affected version. The pinned Brand OS package remains unchanged. A clean `npm ci` and `npm audit` report no known vulnerabilities; the production build and browser regression suite must run against this patched dependency tree before merge.

## Verification record, September 11, 2026

- `npm run brand:check`: 3 passed. The pinned package and complete-logo hashes are unchanged.
- `npm test`: 28 passed, including the brand checks and updated content/evidence invariants.
- `npm run lint`: passed.
- `npm run build`: passed. Essential page copy is prerendered; the homepage reports 128 kB first-load JavaScript, with its Three.js scene loaded separately.
- `npm run test:e2e -- --workers=4`: 267 passed, 45 intentionally skipped by desktop/mobile or canonical-snapshot ownership. No failed tests. The final run compares snapshots; it does not update them.
- The complete browser run used Playwright Chromium 149 against the production build. Earlier exploratory worker runs used system Google Chrome against a development server and are not substituted for this final run.
- Browser coverage includes every public route, 320/768/1024/1440 reflow, text spacing, normal and reduced motion, active scene accessibility, keyboard navigation, forward/reverse storytelling, WebGL loss/fallback, animation cleanup, wallpaper/image-dialog zoom and focus, mapper restoration, and mocked contact/campaign success and failure.
- Sixteen current first-viewport snapshots cover the homepage, services, a concept, and a case study at desktop, phone, narrow phone, and 805 x 472. Retired snapshots tied to removed interactions were replaced.
- Direct visual review covered the homepage, foundation chapters, workspace, practical AI-OS evaluation, services, retrieval, manufacturing, and client work. This review led to fixed-header/short-window corrections, clearer active scenes, visible mobile selectors, contrast improvements, and improved text wrapping.
- An additional HTML link audit checked 1,026 internal links across 29 pages: no missing destinations or fragment targets.
- `git diff --check`: passed.

At this preview checkpoint, the website ran locally at `http://localhost:3000` from branch `codex/ai-os-buyer-journey` and had not been pushed or deployed. No review form submission reached a live inbox.

## Dimensional storytelling revision

The foundation now uses the available screen width instead of a fixed 1376px container. Its camera fits the visible sculpture, with space for object labels and chapter controls. Canvas edges soften the floor shadow. Short landscape layouts constrain both the copy and canvas above the bottom navigation.

The concept and delivery stories now use dimensional Three.js scenes, with ceramic surfaces, physical documents, cables, review gates, and restrained pointer response. Knowledge separates vector similarity from graph relationships. Services presents four independent starting points, deployment separates local and cloud environments, manufacturing distinguishes drawings, quote preparation, and reports, and case studies use a sequence of evidence. Infinite AI OS now uses the evidence illustration rather than the reusable-skill illustration.

Small canvases show a close-up of the selected physical object or group; larger canvases restore the complete composition. Chapter buttons and native scrolling drive the same typed narrative state. Graphics load as the story approaches the viewport. Hidden, paused, reduced-motion, and unmounted scenes stop their animation loops. Context loss restores the readable SVG fallback, and source text remains server-rendered.

The visual review included 3273 x 1430, 2560 x 1440, 1920 x 1080, 1440 x 900, 1024 x 768, 805 x 472, 453 x 472, and 320 x 800 foundation views, plus desktop and phone concept scenes. Review found and corrected clipped sculptures, hard shadow edges, chapter-label collisions, short-window copy overflow, microscopic phone labels, and mismatched scene/chapter mappings. Two first-viewport snapshots were reviewed and updated for the wider story introduction and new background treatment.

Final verification for this revision: 28 unit/content/brand tests passed; lint and the production build passed; the full Playwright run passed 311 tests with 53 intentional project/snapshot-ownership skips and no failures. The final run compared snapshots without updating them. New coverage exercises all seven foundation chapters at eight viewport sizes, checks the canvas and copy against navigation bounds, and verifies rendered sculptures across 13 page contexts, responsive close-ups, reverse selection, reduced motion, context loss/recovery, and animation cleanup. Contact and campaign delivery remained mocked.

## Release verification, September 11, 2026

The release candidate includes the dependency patches described above and uses the Obsidian name without its logo while commercial mark permission remains unresolved. The artwork provenance record now reflects the complete approved Maslow AI logos and the website asset paths. A separate release audit found no sensitive-data patterns, runtime localhost links, missing tracked fonts, or unlabeled product-availability claims in the changed scope.

After a clean `npm ci`, `npm audit` reported zero known vulnerabilities. The final candidate passed all 28 unit/content/brand tests, lint, the production build, and the complete Playwright suite: 311 passed, 53 intentional project/snapshot-ownership skips, no failures, and no snapshot update flag. The desktop and phone homepage captures were visually reviewed after the dependency changes. Form delivery remained mocked.

The authorized release path is a reviewed pull request into `main`, followed by the existing Vercel integration. The pull request and deployment records are the authority for the merged revision and actual production status; a passing local build alone does not establish deployment.
