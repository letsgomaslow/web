# Maslow UI and UX Transformation Plan

## Objective

Turn the current content-rich Maslow site into an intentional buyer journey that:

- makes dense ideas easy to scan before asking for deeper attention;
- carries a visitor's workflow context across the architecture, services, proof, and contact journey;
- places evidence beside the claims it supports;
- uses micro-interactions to clarify state, ownership, and consequence;
- adds immersive WebGL moments only where they improve understanding;
- remains fast, accessible, credible, and recognizably Maslow.

This plan is implementation work on the existing `feature/icp-content-path` branch. Existing uncommitted architecture, mapper, contact, case-study, and homepage work is part of the baseline and must be preserved.

## Non-negotiable constraints

### Brand and copy

- Preserve the homepage position: "AI employees for the work that waits on your busiest people."
- Lead with the waiting workflow, accountable owner, human decision, evidence status, and next action.
- Do not invent metrics, client claims, testimonials, or production evidence.
- Use US English and "AI employee" consistently.
- Do not add em dashes to public copy.
- Keep diligence artifacts at `IN PREPARATION` until they exist and have been reviewed.
- Use navy for default primary actions, white for inverse actions on dark surfaces, and pink only as a small interaction signal.
- Keep all interface surfaces at `0px` radius except meaningful circles such as status dots and step markers.

### Technical system

- Keep the existing CSS Modules and Maslow token architecture.
- Do not initialize Tailwind or add Shadcn as a runtime dependency.
- Translate Shadcn behavior contracts into Maslow-native components:
  - tabs for desktop stage selection;
  - accordions for mobile stage selection;
  - collapsibles for reader-controlled depth;
  - progress and radio-group behavior for the workflow mapper;
  - item and badge semantics for evidence receipts;
  - an in-flow dossier tray instead of a modal sheet unless a modal is proven necessary.
- Do not add a general animation dependency.
- Keep server-rendered content complete before JavaScript runs.
- Keep browser storage categorical, versioned, corrupt-safe, and free of sensitive free text.
- Do not create global mutable personalization state.

### Interaction and accessibility

- Every interaction must communicate one of: current state, relationship, progress, consequence, or recovery.
- Preserve visible focus, semantic controls, keyboard order, and one `h1` per route.
- Tabs must support arrow-key movement, Home, End, and focus visibility.
- Accordions and disclosures must use native or equivalent accessible semantics.
- Motion must stop or simplify under `prefers-reduced-motion`.
- Content order and meaning must remain intact when motion and WebGL are unavailable.
- Touch targets must be at least 44 by 44 CSS pixels where practical.

### Motion principles

- Use Jakub-style production polish as the primary standard: stateful feedback, continuity, and careful interruption handling.
- Use Emil-style speed and restraint as the secondary standard: short durations, small distances, and no decorative waiting.
- Reserve expressive Jhey-style moments for one or two concept explainers where the interaction teaches the concept.
- Prefer 160 to 240ms for local state changes and 240 to 360ms for structural changes.
- Prefer 4 to 12px of travel. Avoid generic long fade-up entrances.
- Do not animate text or controls that a visitor is already trying to use.

## Visual acceptance process

Every phase passes three gates before the next phase begins:

1. Functional gate
   - focused unit or browser behavior checks;
   - keyboard and reduced-motion behavior;
   - corrupt or absent storage handling where applicable.
2. Automated visual gate
   - bounded component screenshots, not unstable full-page screenshots;
   - geometry checks for CTA placement, wrapping, overflow, and control size;
   - animations disabled and caret hidden for deterministic captures.
3. Human visual gate
   - inspect 1440, 1024, 768, and 320 pixel widths;
   - inspect default and reduced-motion modes;
   - inspect keyboard focus and touch-like operation;
   - compare hierarchy, rhythm, crop, contrast, and section transitions against the saved baseline.

Stable visual hooks:

- `[data-dossier]`
- `[data-decision-receipt]`
- `[data-evidence-receipt]`
- `[data-evidence-status]`
- `[data-depth-control]`
- `[data-webgl-state]`
- `[data-webgl-fallback]`
- `[data-visual-ready]`

## Task 1: Shared buyer-context and evidence primitives

### File ownership

Create only:

- `lib/workflow-dossier.ts`
- `lib/content/evidence.ts`
- `components/dossier/WorkflowDossier.tsx`
- `components/dossier/WorkflowDossier.module.css`
- `components/dossier/WorkflowDossierTray.tsx`
- `components/dossier/DecisionReceipt.tsx`
- `components/evidence/EvidenceReceipt.tsx`
- `components/evidence/EvidenceReceipt.module.css`
- `components/ui/DepthDisclosure.tsx`
- `components/ui/DepthDisclosure.module.css`

### Work

- Define a versioned, privacy-safe workflow dossier schema.
- Add a strict adapter from the current workflow brief to the dossier.
- Define typed evidence statuses: `production`, `illustrative`, and `in-preparation`.
- Build a compact workflow dossier that shows:
  - waiting deliverable;
  - current owner;
  - recurring trigger;
  - human decision;
  - evidence required;
  - recommended next step.
- Build an in-flow dossier tray that can collapse without changing document order.
- Build a decision receipt for mapper results and high-intent summaries.
- Build an evidence receipt that names claim, scope, status, owner, limitations, and link when available.
- Build a reader-controlled depth disclosure with clear expanded and collapsed labels.

### Acceptance

- All components render useful content without storage or client hydration.
- Status is always expressed in text, never color alone.
- No fabricated proof is introduced.
- All new surfaces use Maslow tokens, square geometry, and native focus treatment.
- `npm test` and `npm run lint` pass.

## Task 2: Architecture and workflow mapper vertical slice

### File ownership

- `components/explainers/WorkflowMapper.tsx`
- `components/explainers/WorkflowMapper.module.css`
- `lib/workflow-brief.ts`
- `components/forms/ContactForm.tsx`
- `components/forms/forms.module.css`
- `app/concepts/ai-employee-architecture/page.tsx`
- `app/concepts/ai-employee-architecture/page.module.css`
- `lib/content/architecture.ts`

### Work

- Persist categorical mapper progress after each choice using the versioned schema.
- Restore valid partial progress after hydration.
- Ignore malformed, expired, or incompatible stored state.
- Show prior answers in a compact, editable summary before the current question.
- Replace the result-only summary with the shared decision receipt.
- Keep the existing final workflow brief handoff to the contact page.
- Clear the completed workflow brief only after confirmed contact submission.
- Add evidence receipts beside architecture claims.
- Add the dossier tray before the deepest technical content.
- Use depth disclosures to make technical elaboration optional without hiding the buyer path.
- Keep the working-session CTA before the reference layer on mobile.

### Acceptance

- A visitor can answer, reload, continue, revise, complete, and carry the result to contact.
- No sensitive free text enters browser storage.
- The mobile CTA remains fully visible in the first 800px at 320px width.
- Evidence status is visible beside each supported claim.
- Keyboard, reduced-motion, and no-storage behavior pass.
- Focused Playwright behavior checks, bounded screenshots, `npm test`, and `npm run lint` pass.

## Task 3: Homepage intent path

### File ownership

- `app/page.tsx`
- `app/page.module.css`
- `lib/content/home.ts`

### Work

- Keep the current hero position and evidence-led tone.
- Ensure the primary working-session CTA is completely visible in the first mobile viewport.
- Turn the metric band into a legible two-by-two mobile proof grid.
- Add a compact workflow dossier preview that explains what a visitor will leave the assessment with.
- Add one contextual action before the longest reference content.
- Use depth disclosures for optional explanatory chapters.
- Tighten section transitions so each section answers the question created by the previous section.
- Remove hover-only affordances from non-interactive cards.

### Acceptance

- The first 800px at 320px includes the full primary CTA.
- Metrics render as a stable two-by-two grid at narrow widths.
- No horizontal overflow at 320, 768, 1024, or 1440.
- The page remains understandable with JavaScript disabled.
- Focused screenshots and geometry checks pass at 320, 768, and 1440.

## Task 4: Services as a stage explorer

### File ownership

- `app/services/page.tsx`
- `app/services/page.module.css`
- `app/services/ServiceExplorer.tsx`
- `lib/content/services.ts`

### Work

- Convert the service sequence into an accessible desktop tab interface.
- Use native accordion behavior on mobile.
- Keep all service content in document order as the no-JavaScript fallback.
- Update the URL hash when a stage is selected.
- Show deliverable, owner, decision, evidence, timing, and fixed-fee status in each stage panel.
- Carry a completed workflow dossier into the recommended stage without changing public content for visitors without a dossier.
- Remove decorative lift from static cards.

### Acceptance

- Tabs support click, arrow keys, Home, End, and visible focus.
- Mobile accordions work with keyboard and touch.
- Direct hash links open the correct stage.
- All content remains available without JavaScript.
- The recommended stage is an enhancement, not hidden personalization.
- Focused behavior and visual checks pass at 320, 1024, and 1440.

## Task 5: Engagement and proof routes

### File ownership

- `app/how-we-engage/page.tsx`
- `app/how-we-engage/page.module.css`
- `app/how-we-engage/WeekRail.tsx`
- `app/case-studies/page.tsx`
- `app/case-studies/page.module.css`
- `app/case-studies/infinite-ai-os/page.tsx`
- `app/case-studies/agenthub/page.tsx`
- `app/case-studies/CaseStudyChapterNav.tsx`
- `app/case-studies/case.module.css`
- `app/case-studies/case-study.module.css`
- `lib/content/engagement.ts`
- `lib/content/case-studies.ts`

### Work

- Add an early, page-specific working-session action after the engagement entry choices.
- Make the engagement rail communicate current phase, decision gate, and retained evidence.
- Add an executive summary and chapter navigation to case-study pages.
- Place evidence receipts beside exact claims.
- Keep detailed implementation chapters in reader-controlled depth sections.
- Preserve full-card links and non-interactive status metadata.
- Clearly separate production evidence from illustrative patterns.

### Acceptance

- Every proof claim has an adjacent, truthful status.
- Case-study cards have one semantic destination and no nested interactive links.
- The early CTA appears before deep implementation detail.
- Chapter navigation restores focus and does not obscure headings.
- Visual checks pass at 320 and 1440, including keyboard focus.

## Task 6: Intentional WebGL explainers

### File ownership

- `components/explainers/useSceneActivity.ts`
- `components/explainers/HybridRagScene.tsx`
- `components/explainers/HybridRagScene.module.css`
- `components/explainers/HybridRagSceneLazy.tsx`
- `components/explainers/HarnessScene.tsx`
- `components/explainers/HarnessScene.module.css`
- `components/explainers/HarnessSceneLazy.tsx`
- `app/concepts/hybrid-rag/page.tsx`
- `app/concepts/agentic-harness/page.tsx`

### Work

- Add a shared scene-activity hook for document visibility, viewport visibility, reduced motion, and user pause.
- Add explicit pause and resume controls.
- Add deterministic scene state so visual snapshots do not drift.
- Add mobile step controls that let the visitor move through the Hybrid RAG transformation.
- Pause decorative rotation while a visitor is reading or interacting.
- Provide a meaningful static fallback when WebGL is unavailable or the context is lost.
- Keep content and actions outside the canvas.

### Acceptance

- Scenes stop when hidden, offscreen, reduced-motion, or manually paused.
- Mobile step controls are at least 44px and work without hover.
- Context loss or unavailable WebGL reveals the static explanation.
- The first hydrated paint does not flash an empty or broken canvas.
- No animation loop continues after unmount.
- Functional and visual checks pass at 320 and 1440.

## Task 7: Shared reveal and motion refinement

### File ownership

- `components/ui/Reveal.tsx`
- `app/globals.css`
- `components/ui/CatchChips.module.css`
- `components/home/LayerDiagram.module.css`
- `components/home/QueueMotif.module.css`
- `app/page.module.css` (motion timing rules only)

### Work

- Replace per-element observation with a shared observer strategy while keeping the public API compatible.
- Use restrained motion tokens for distance, duration, and easing.
- Reveal related groups with small intentional sequencing.
- Stop all non-essential reveal motion under reduced motion.
- Ensure content is visible when observation APIs are unavailable.

### Acceptance

- Existing routes require no call-site rewrite.
- Reveal never blocks reading or interaction.
- Reduced-motion mode has no entrance translation.
- There is no accumulating observer or event-listener leak.
- Cross-route visual inspection confirms the tighter motion does not flatten hierarchy.

## Task 8: Regression suite and final visual verification

### File ownership

- `e2e/visual.spec.ts`
- `e2e/site.spec.ts`
- generated, bounded Playwright snapshot files

### Work

- Add stable geometry and interaction assertions for each phase.
- Add bounded component screenshots for dossier, evidence, mapper, services, engagement, case study, and WebGL fallback states.
- Add corrupt-storage, reload, reduced-motion, keyboard, and no-WebGL coverage.
- Run manual browser inspection at all required breakpoints.
- Compare final views to the saved baseline and correct visual discrepancies before completion.

### Required final verification

1. `npm test`
2. `npm run lint`
3. `npm run build`
4. focused visual and behavior Playwright tests
5. full Playwright suite
6. manual inspection at 1440, 1024, 768, and 320
7. reduced-motion and keyboard inspection
8. final `git diff --check`

## Completion rules

- Do not report completion from an agent report alone.
- Do not report completion from technical tests alone.
- A phase is complete only after the implementation, specification review, code-quality review, automated checks, and human visual review agree.
- If the visual result contradicts an earlier assumption, correct the design and rerun the phase gates.
- Leave changes uncommitted unless the user separately authorizes staging, committing, pushing, or opening a pull request.
