import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/resources" },
  title: { absolute: "AI-OS Resources | Maslow AI" },
  description:
    "Choose a practical path into Maslow AI-OS, organizational knowledge, memory, skills, integrations, client evidence, and workflow planning.",
};

const questions = [
  {
    number: "01",
    question: "What can I try myself?",
    title: "Start with the free Maslow AI-OS",
    body: "See the developing Linux product, what it inherits from Omarchy, and which shared-infrastructure capabilities are still being tested.",
    href: "/ai-os",
    label: "Explore Maslow AI-OS",
  },
  {
    number: "02",
    question: "Where should we start?",
    title: "Map one waiting workflow",
    body: "Name the responsible owner, source knowledge, repeated procedure, human decision, and evidence that would make the work reviewable.",
    href: "/plan-workflow",
    label: "Plan the first workflow",
  },
  {
    number: "03",
    question: "What needs to be shared?",
    title: "Understand the infrastructure layer",
    body: "Follow how company context, memory, skills, connections, observability, and lifecycle controls fit around several AI tools.",
    href: "/concepts/shared-ai-infrastructure",
    label: "See the shared infrastructure",
  },
  {
    number: "04",
    question: "How does company knowledge become usable?",
    title: "Design the briefing before choosing the model",
    body: "Learn how source quality, retrieval, metadata, freshness, and ownership determine what an agent can actually use.",
    href: "/concepts/context-engineering",
    label: "Understand company context",
  },
  {
    number: "05",
    question: "How does AI connect to the work?",
    title: "Turn procedures into skills and scoped access",
    body: "Separate reusable operating instructions from the approved system connections and human decisions required for each workflow.",
    href: "/concepts/skills-and-gateways",
    label: "Explore skills and connections",
  },
  {
    number: "06",
    question: "What has been delivered for clients?",
    title: "Review implementation evidence",
    body: "See the client problem, what Maslow built, the demonstrated scope, and the measurements that remain open.",
    href: "/case-studies",
    label: "View client implementations",
  },
] as const;

const concepts = [
  {
    title: "Shared AI infrastructure",
    body: "Five managed capabilities that can serve many approved agents and workflows.",
    href: "/concepts/shared-ai-infrastructure",
  },
  {
    title: "Context engineering",
    body: "The sources, retrieval rules, and task briefing that shape each answer.",
    href: "/concepts/context-engineering",
  },
  {
    title: "Skills and gateways",
    body: "Reusable procedures and the bounded connections they may use.",
    href: "/concepts/skills-and-gateways",
  },
  {
    title: "Agentic harness",
    body: "The runtime that gives models tools, state, approvals, and execution loops.",
    href: "/concepts/agentic-harness",
  },
  {
    title: "Local AI",
    body: "When local models and infrastructure fit the workload and data boundary.",
    href: "/concepts/local-ai",
  },
] as const;

const illustrativeExamples = [
  {
    sector: "FINANCIAL SERVICES",
    title: "Search contracts, policies, and memos as connected knowledge",
    body: "An illustrative pattern for hybrid retrieval with citations and a deployment boundary selected around the organization's requirements.",
    href: "/concepts/hybrid-rag",
  },
  {
    sector: "LEGAL SERVICES",
    title: "Prepare shared-inbox intake for human review",
    body: "An illustrative pattern for classifying incoming work, retrieving approved precedent, drafting a response, and escalating exceptions.",
    href: "/plan-workflow#workflow-mapper",
  },
  {
    sector: "MANUFACTURING",
    title: "Evaluate local AI for a factory workflow",
    body: "An illustrative pattern for comparing workload, hardware, data location, and operating cost before selecting local infrastructure.",
    href: "/concepts/local-ai",
  },
] as const;

export default function ResourcesPage() {
  return (
    <PageShell footer="compact" showCtaBand={false}>
      <>
        <section className={styles.hero} data-screen-label="Resources Hero">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className="eyebrow eyebrow-ice">MASLOW AI RESOURCES</div>
              <h1 className={styles.title}>
                Start with the question your team is already asking.
              </h1>
              <p className={styles.lede}>
                Try the developing AI-OS, inspect the infrastructure behind it,
                or map a business workflow. The free product is an entry point.
                Organizational knowledge and workflow implementation are scoped
                client engagements.
              </p>
              <div className={styles.heroActions}>
                <CtaButton href="/ai-os" variant="inverse">
                  EXPLORE THE FREE AI-OS
                </CtaButton>
                <CtaButton href="/plan-workflow" variant="secondary">
                  MAP A WORKFLOW
                </CtaButton>
              </div>
            </div>
            <div className={styles.heroMark} aria-hidden="true">
              <Image
                src="/assets/logos/maslow-symbol-white.png"
                alt=""
                width={360}
                height={360}
                priority
              />
              <span>QUESTION → SYSTEM → EVIDENCE</span>
            </div>
          </div>
        </section>

        <section className={styles.pathways} aria-labelledby="resource-pathways">
          <div className={styles.sectionIntro}>
            <div className="eyebrow">CHOOSE YOUR PATH</div>
            <h2 id="resource-pathways">Six questions, one practical starting point</h2>
            <p>
              Each path starts in business language and opens the level of
              technical detail needed for the next decision.
            </p>
          </div>
          <div className={styles.questionGrid}>
            {questions.map((item) => (
              <Link key={item.number} href={item.href} className={styles.questionLink}>
                <article className={styles.questionCard}>
                  <div className={styles.questionTopline}>
                    <span>{item.number}</span>
                    <span>{item.question}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className={styles.cardCta} aria-hidden="true">
                    {item.label}&nbsp;&nbsp;&gt;
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.concepts} aria-labelledby="concept-library">
          <div className={styles.conceptsInner}>
            <div className={styles.conceptLead}>
              <div className="eyebrow eyebrow-ice">CONCEPT LIBRARY</div>
              <h2 id="concept-library">Read the system one layer at a time</h2>
              <p>
                Use these five explainers to give business and IT leaders a
                shared vocabulary before implementation decisions begin.
              </p>
            </div>
            <div className={styles.conceptList}>
              {concepts.map((concept, index) => (
                <Link key={concept.href} href={concept.href} className={styles.conceptLink}>
                  <span className={styles.conceptNumber}>0{index + 1}</span>
                  <span>
                    <strong>{concept.title}</strong>
                    <small>{concept.body}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.examples} aria-labelledby="illustrative-examples">
          <div className={styles.sectionIntro}>
            <div className="eyebrow">ILLUSTRATIVE EXAMPLES</div>
            <h2 id="illustrative-examples">Patterns to discuss, separate from client proof</h2>
            <p>
              These examples show how the concepts could be applied. They are
              illustrative patterns, with no client result or performance claim.
            </p>
          </div>
          <div className={styles.exampleGrid}>
            {illustrativeExamples.map((example) => (
              <Link key={example.title} href={example.href} className={styles.exampleLink}>
                <article className={styles.exampleCard}>
                  <span className={styles.exampleStatus}>ILLUSTRATIVE EXAMPLE</span>
                  <span className={styles.exampleSector}>{example.sector}</span>
                  <h3>{example.title}</h3>
                  <p>{example.body}</p>
                  <span className={styles.cardCta} aria-hidden="true">
                    Explore the pattern&nbsp;&nbsp;&gt;
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.cta} data-screen-label="Resources CTA">
          <div className={styles.ctaInner}>
            <div>
              <div className="eyebrow eyebrow-ice">FROM READING TO WORKING SESSION</div>
              <h2>Bring one workflow your team keeps carrying by hand.</h2>
              <p>
                We will map the knowledge, procedure, connections, controls, and
                evidence needed to make it repeatable.
              </p>
            </div>
            <CtaButton href="/plan-workflow" variant="inverse">
              PLAN THE FIRST WORKFLOW
            </CtaButton>
          </div>
        </section>
      </>
    </PageShell>
  );
}
