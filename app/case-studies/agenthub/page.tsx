import Link from "next/link";
import type { Metadata } from "next";
import { EvidenceReceipt } from "@/components/evidence/EvidenceReceipt";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { DepthDisclosure } from "@/components/ui/DepthDisclosure";
import { agentHub as cs } from "@/lib/content/case-studies";
import { architectureCapabilities } from "@/lib/content/architecture";
import { CaseStudyChapterNav } from "../CaseStudyChapterNav";
import styles from "../case-study.module.css";

export const metadata: Metadata = {
  title: "AgentHub Case Study | Maslow AI",
  description: cs.lede,
};

const chapters = [
  { id: "challenge", label: "Challenge" },
  { id: "experience", label: "Experience" },
  { id: "retrieval", label: "Retrieval" },
  { id: "routing", label: "Routing" },
  { id: "review-controls", label: "Review controls" },
] as const;

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function AgentHubPage() {
  return (
    <PageShell footer="compact" showCtaBand={false}>
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div
              className={`${styles.crumb} mz-rise`}
              style={{ animationDelay: "0.05s" }}
            >
              <Link href="/case-studies">Case Studies</Link>
              {" / "}
              <span>{cs.breadcrumb}</span>
            </div>
            <div
              className={`${styles.tags} mz-rise`}
              style={{ animationDelay: "0.1s" }}
            >
              {cs.tags.map((t) => (
                <span
                  key={t.label}
                  className={styles.tag}
                  data-variant={t.variant}
                >
                  {t.label}
                </span>
              ))}
            </div>
            <h1
              className={`${styles.title} mz-rise`}
              style={{ animationDelay: "0.15s" }}
            >
              {cs.title}
            </h1>
            <p
              className={`${styles.lede} mz-rise`}
              style={{ animationDelay: "0.3s" }}
            >
              {cs.lede}
            </p>
            <div
              className={`${styles.metrics} mz-rise`}
              style={{ animationDelay: "0.45s" }}
            >
              {cs.metrics.map((m) => (
                <div
                  key={m.label}
                  className={m.dark ? styles.metricDark : styles.metric}
                  style={m.dark ? undefined : { borderTopColor: m.accent }}
                >
                  <div
                    className={styles.metricValue}
                    style={m.dark ? { color: m.accent } : undefined}
                  >
                    {m.value}
                  </div>
                  <div className={styles.metricLabel}>{m.label}</div>
                  <div className={styles.metricEvidence}>{m.evidenceLabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.summary}
          data-case-summary
          data-screen-label="Executive Summary"
        >
          <div className={styles.summaryInner}>
            <div className={styles.summaryIntro}>
              <div className="eyebrow">EXECUTIVE SUMMARY</div>
              <h2 className={styles.sectionH2}>The case in four decisions</h2>
            </div>
            <dl className={styles.summaryGrid}>
              <div>
                <dt>Waiting work</dt>
                <dd>{cs.executiveSummary.waitingWork}</dd>
              </div>
              <div>
                <dt>What changed</dt>
                <dd>{cs.executiveSummary.whatChanged}</dd>
              </div>
              <div>
                <dt>Human decision</dt>
                <dd>{cs.executiveSummary.humanDecision}</dd>
              </div>
              <div>
                <dt>Evidence state</dt>
                <dd>{cs.executiveSummary.evidenceState}</dd>
              </div>
            </dl>
            <EvidenceReceipt
              evidence={cs.evidence.implementation}
              title="Implementation evidence"
              headingLevel="h3"
            />
          </div>
        </section>

        <div className={styles.chapterNavBand}>
          <CaseStudyChapterNav chapters={chapters} />
        </div>

        <section
          className={styles.challenge}
          style={{ paddingBottom: 56 }}
          data-screen-label="Challenge"
        >
          <div className={styles.split}>
            <div>
              <div className="eyebrow">THE CHALLENGE</div>
              <h2
                className={`${styles.sectionH2} ${styles.chapterHeading}`}
                id="challenge"
                tabIndex={-1}
                data-chapter-heading
              >
                {cs.challengeTitle}
              </h2>
            </div>
            <div className={styles.prose}>
              {cs.challengeBody.map((p, i) => (
                <p key={i}>{renderInline(p)}</p>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.twoLayers} data-screen-label="Two Layers">
          <div className={styles.chapterSectionIntro}>
            <div className="eyebrow">THE EXPERIENCE</div>
            <h2
              className={`${styles.sectionH2} ${styles.chapterHeading}`}
              id="experience"
              tabIndex={-1}
              data-chapter-heading
            >
              A prompt-library front door with a grounded review engine
            </h2>
          </div>
          <div className={styles.twoGrid}>
            <div className={styles.layerCard}>
              <div className={styles.layerLabel}>THE FRONT DOOR</div>
              <div className={styles.layerTitle}>Department prompt library</div>
              <div className={styles.layerBody}>
                Eleven color-coded departments, live search, likes and comments,
                public/private prompts, per-author categories. Every prompt
                opens straight into the AI chat; the library is how people
                discover what the review system can do.
              </div>
              <div className={styles.pills}>
                {cs.departments.map((d) => (
                  <span key={d} className={styles.pill}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.layerCardDark}>
              <div className={styles.layerLabel}>THE ENGINE</div>
              <div className={styles.layerTitle}>SOW review system</div>
              <div className={styles.layerBody}>
                Ask a contract corpus questions in plain English (&ldquo;compare
                the day rates across these SOWs&rdquo;) and get grounded answers
                with citations to the exact field in the source document, via
                parallel dense-vector and knowledge-graph retrieval.
              </div>
              <div className={styles.monoList}>
                <span>▸ VECTOR SEARCH · top-5 · 3072-dim embeddings</span>
                <span>▸ KNOWLEDGE GRAPH · entities + one-hop neighbors</span>
                <span>▸ CITATIONS · down to the exact jsonPath field</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.navy} data-screen-label="RAG Pipeline">
          <div className="wrap">
            <div className="eyebrow eyebrow-ice">DEEP DIVE · HYBRID RAG</div>
            <h2
              className={`${styles.navyH2} ${styles.chapterHeading}`}
              id="retrieval"
              tabIndex={-1}
              data-chapter-heading
            >
              From 50 contracts to field-level answers
            </h2>
            <p className={styles.navyLede}>
              Parallel dense-vector and knowledge-graph retrieval, fused as
              grounded context. Drafted document sections can cite the exact
              source field. If the graph is unavailable, retrieval degrades
              gracefully to vector-only.
            </p>
            <DepthDisclosure
              collapsedLabel="EXPLORE THE SIX-STEP RETRIEVAL PIPELINE"
              expandedLabel="HIDE THE SIX-STEP RETRIEVAL PIPELINE"
              className={`${styles.chapterDisclosure} ${styles.darkDisclosure}`}
            >
              <div className={styles.pipelineGrid}>
                {cs.pipeline.map((p) => (
                  <div key={p.num} className={styles.pipelineCard}>
                    <div className={styles.pipelineHead}>
                      <span className={styles.pipelineNum}>{p.num}</span>
                      <span className={styles.pipelineTag}>{p.tag}</span>
                    </div>
                    <div className={styles.pipelineName}>{p.name}</div>
                    <div className={styles.pipelineDesc}>{p.desc}</div>
                  </div>
                ))}
              </div>
              <div className={styles.provenance}>
                <span className={styles.provenanceLabel}>
                  EXAMPLE TELEMETRY
                </span>
                <span className={styles.provenanceBody}>
                  A data-source badge can show a vector result count and top
                  score or a graph entity count. The Activity Panel displays
                  retrieval searches, tool rounds, and source paths during a
                  review.
                </span>
              </div>
            </DepthDisclosure>
            <div className={styles.evidenceReceiptWrap}>
              <EvidenceReceipt
                evidence={cs.evidence.retrieval}
                title="Retrieval implementation evidence"
                headingLevel="h3"
              />
            </div>
          </div>
        </section>

        <section
          className={styles.intent}
          data-screen-label="Intent Engineering"
        >
          <div className="wrap">
            <div className="eyebrow">
              DEEP DIVE · INTENT ENGINEERING &amp; GENERATIVE UI
            </div>
            <h2
              className={`h2 ${styles.chapterHeading}`}
              id="routing"
              tabIndex={-1}
              data-chapter-heading
              style={{ marginBottom: 12, maxWidth: 780 }}
            >
              The review system selects <em>what kind</em> of response to give
            </h2>
            <p className={styles.builtLede}>
              Every message is routed through a deterministic intent layer: tool
              request, document drafting, data-heavy, narrative, off-topic or
              conversational. That classification gates which tools the model is
              offered. Conversational turns keep chart tools unavailable.
            </p>
            <DepthDisclosure
              collapsedLabel="EXPLORE RESPONSE ROUTING AND TOOL EXAMPLES"
              expandedLabel="HIDE RESPONSE ROUTING AND TOOL EXAMPLES"
              className={styles.chapterDisclosure}
            >
              <div className={styles.intentGrid}>
                <div>
                  <div className={styles.osLabel}>SEVEN WAYS TO ANSWER</div>
                  <div className={styles.widgetGrid}>
                    {cs.widgets.map((w) => (
                      <div key={w.tool} className={styles.widget}>
                        <span className={styles.widgetTool}>{w.tool}</span>
                        <span className={styles.widgetDesc}>{w.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.testPanel}>
                  <div className={styles.osLabel}>LIVE TEST RESULT</div>
                  <div className={styles.testScore}>26 / 28</div>
                  <div className={styles.testBody}>
                    Cases routed to the expected first tool through the live
                    streaming pipeline (92.9%).
                  </div>
                  <div className={styles.testCases}>
                    <div className={styles.testCase}>
                      &ldquo;put the comparison in a table&rdquo; →{" "}
                      <code>show_data_table</code>
                    </div>
                    <div className={styles.testCase}>
                      &ldquo;draft a PRD&rdquo; → <code>ask_questions</code>{" "}
                      first, then the document
                    </div>
                    <div className={styles.testCase}>
                      &ldquo;what&apos;s the weather in Boston?&rdquo; → text
                      only, no tool
                    </div>
                  </div>
                </div>
              </div>
            </DepthDisclosure>
            <div className={styles.evidenceReceiptWrap}>
              <EvidenceReceipt
                evidence={cs.evidence.routing}
                title="First-tool routing evidence"
                headingLevel="h3"
              />
            </div>
          </div>
        </section>

        <section className={styles.trust} data-screen-label="Trust and Stack">
          <div className={styles.trustIntro}>
            <div className="eyebrow">REVIEW CONTROLS</div>
            <h2
              className={`${styles.sectionH2} ${styles.chapterHeading}`}
              id="review-controls"
              tabIndex={-1}
              data-chapter-heading
            >
              Traceable implementation controls for human review
            </h2>
          </div>
          <div className={styles.trustGrid}>
            <div className={styles.trustCard}>
              <div
                className={styles.trustTitle}
                style={{ color: "var(--color-ice-text)" }}
              >
                REVIEW CONTROLS IN THIS IMPLEMENTATION
              </div>
              <div className={styles.trustList}>
                {[
                  [
                    "Visible retrieval record",
                    "the Activity Panel displays retrieval steps, tool calls, and source paths",
                  ],
                  [
                    "Field-level citations",
                    "auditability that procurement and legal reviewers can check",
                  ],
                  [
                    "Graceful degradation",
                    "if the graph is unavailable, the system records a vector-only fallback",
                  ],
                  [
                    "Tool availability control",
                    "function-calling disabled for conversational turns",
                  ],
                  [
                    "Routing regression coverage",
                    "the 28-case intent test suite plus browser test specs, run against the live pipeline",
                  ],
                ].map(([title, desc]) => (
                  <div key={title} className={styles.trustItem}>
                    <span>✓</span>
                    <span>
                      <strong>{title}</strong>: {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <EvidenceReceipt
              evidence={cs.evidence.trustControls}
              title="Review-control evidence"
              headingLevel="h3"
            />
          </div>
          <DepthDisclosure
            collapsedLabel="EXPLORE THE IMPLEMENTATION STACK"
            expandedLabel="HIDE THE IMPLEMENTATION STACK"
            className={styles.chapterDisclosure}
          >
            <div className={styles.stackCard}>
              <div
                className={styles.trustTitle}
                style={{ color: "var(--color-plum-text)" }}
              >
                UNDER THE HOOD
              </div>
              <div className={styles.stackList}>
                <div>
                  <span style={{ fontWeight: 700 }}>Frontend:</span> React +
                  TypeScript, Tailwind, assistant-ui with a custom streaming
                  runtime, Recharts
                </div>
                <div>
                  <span style={{ fontWeight: 700 }}>Data:</span> Convex reactive
                  DB with native vector index · Neo4j knowledge graph · Clerk
                  auth with post-sign-in intent replay
                </div>
                <div>
                  <span style={{ fontWeight: 700 }}>AI:</span> Gemini 3 Flash
                  (chat, thinking, tool-calling) · gemini-embedding-001 at 3072
                  dimensions · optional MCP tool discovery at runtime
                </div>
                <div>
                  <span style={{ fontWeight: 700 }}>Delivery:</span> serverless;
                  the whole chat/RAG/tool loop runs as one streaming action
                </div>
              </div>
              <div className={styles.stackNote}>
                The system provides field-level citations for graph-augmented
                SOW review and uses intent routing to select response tools.
                Dense and graph retrieval are combined into one context packet;
                the intent route uses deterministic orchestration.
              </div>
            </div>
          </DepthDisclosure>
        </section>

        <section
          className={styles.architecture}
          data-screen-label="How It Was Built"
        >
          <div className="wrap">
            <div className="eyebrow">
              HOW IT WAS BUILT · DEPLOYED IMPLEMENTATION
            </div>
            <h2 className={styles.sectionH2}>
              The demonstrated components in shared language
            </h2>
            <p className={styles.architectureLede}>
              This map is scoped to components demonstrated in the deployed
              AgentHub implementation. Open the optional detail to compare the
              responsibilities.
            </p>
            <DepthDisclosure
              collapsedLabel="VIEW THE DEPLOYED ARCHITECTURE MAPPING"
              expandedLabel="HIDE THE DEPLOYED ARCHITECTURE MAPPING"
              className={styles.chapterDisclosure}
            >
              <div className={styles.architectureGrid}>
                {cs.architectureMap.map((item) => {
                  const capability = architectureCapabilities.find(
                    ({ id }) => id === item.capabilityId,
                  );
                  if (!capability) return null;
                  return (
                    <article key={item.capabilityId}>
                      <span>{capability.businessLabel}</span>
                      <h3>{capability.technicalLabel}</h3>
                      <p>{item.evidence}</p>
                    </article>
                  );
                })}
              </div>
            </DepthDisclosure>
            <Link href={cs.architectureHref} className="text-link">
              {cs.architectureLabel}&nbsp;&nbsp;&gt;
            </Link>
          </div>
        </section>

        <section className={styles.services} data-screen-label="Services Used">
          <div className={styles.servicesInner}>
            <div>
              <div className="eyebrow">SERVICES USED</div>
              <h2 className={styles.sectionH2}>
                This engagement, as catalog services
              </h2>
              <div className={styles.serviceTags}>
                {cs.services.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    className={styles.serviceTag}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className={styles.quoteBoxDark}>
              <div>
                <div className={styles.deliverySummaryLabel}>
                  MASLOW DELIVERY SUMMARY
                </div>
                <div className={styles.quoteText}>{cs.quote}</div>
                <div className={styles.quoteAttr}>{cs.quoteAttr}</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta} data-screen-label="CTA">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>{cs.ctaTitle}</h2>
              <p className={styles.ctaLede}>{cs.ctaLede}</p>
            </div>
            <CtaButton href="/contact" variant="inverse">
              BOOK A WORKING SESSION
            </CtaButton>
          </div>
          <div className={styles.ctaLinks}>
            <Link href="/case-studies/infinite-ai-os">← Infinite AI OS</Link>
            <Link href="/case-studies">All case studies</Link>
          </div>
        </section>
      </>
    </PageShell>
  );
}
