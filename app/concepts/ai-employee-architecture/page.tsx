import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureJourney } from "@/components/explainers/ArchitectureJourney";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { concepts, homeCases } from "@/lib/content/home";
import { architectureCapabilities } from "@/lib/content/architecture";
import { architectureArticles } from "@/lib/content/blog";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The system behind an AI employee",
  description:
    "Follow work through context, reusable procedures, approved tools, human decisions, and a reviewable record.",
};

const productionCases = homeCases.filter((item) => !item.openSlot);

export default function AiEmployeeArchitecturePage() {
  return (
    <PageShell highlightConcepts>
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div className={`${styles.crumb} mz-rise`}>
              <Link href="/#concepts">Concepts</Link> /{" "}
              <span>The system behind an AI employee</span>
            </div>
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              AI EMPLOYEE ARCHITECTURE
            </div>
            <h1
              className={`${styles.title} mz-rise`}
              style={{ animationDelay: "0.15s" }}
            >
              The system behind an AI employee.
            </h1>
            <p
              className={`${styles.lede} mz-rise`}
              style={{ animationDelay: "0.3s" }}
            >
              A model supplies intelligence. The surrounding system receives
              work, assembles the right briefing, follows your procedures, uses
              approved tools, pauses for decisions, and records what happened.
            </p>
            <div
              className={`${styles.heroActions} mz-rise`}
              style={{ animationDelay: "0.45s" }}
            >
              <CtaButton href="#workflow-rfq">FOLLOW A WORKFLOW</CtaButton>
              <Link href="#production" className="text-link">
                SEE PRODUCTION WORK&nbsp;&nbsp;&gt;
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.journeyBand} data-screen-label="Workflows">
          <div className={styles.journeyIntro}>
            <div className="eyebrow eyebrow-ice">ONE REQUEST · SIX RESPONSIBILITIES</div>
            <h2>Follow the work through the system.</h2>
            <p>
              Switch workflows to see how the same architecture supports
              different work while keeping the business and technical view in
              the same frame.
            </p>
          </div>
          <ArchitectureJourney />
        </section>

        <section className={styles.comparison} data-screen-label="Comparison">
          <div className="wrap">
            <Reveal className={styles.comparisonInner}>
              <div>
                <div className="eyebrow">THE OPERATING DIFFERENCE</div>
                <h2>A chatbot can answer. An AI employee carries the work.</h2>
              </div>
              <p>
                The useful unit is a tracked responsibility with an owner,
                current context, a procedure, approved access, decision rules,
                and a record. That is what lets your team inspect where the work
                stands and what still needs a person.
              </p>
            </Reveal>
          </div>
        </section>

        <section className={styles.inspect} data-screen-label="Architecture Responsibilities">
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow">WHAT YOUR TEAM CAN INSPECT</div>
                <h2 className="h2">Six responsibilities with visible boundaries</h2>
              </div>
              <p>Business purpose and technical mechanism stay together.</p>
            </Reveal>
            <div className={styles.capabilityGrid}>
              {architectureCapabilities.map((capability) => (
                <Reveal key={capability.id} as="article" className={styles.capability}>
                  <span
                    className={styles.capabilityNum}
                    style={{ color: capability.accent }}
                  >
                    {capability.num}
                  </span>
                  <h3>{capability.businessLabel}</h3>
                  <div className={styles.technicalLabel}>
                    {capability.technicalLabel}
                  </div>
                  <p>{capability.summary}</p>
                  <div className={styles.inspectRow}>
                    <span>INSPECT</span>
                    {capability.inspection}
                  </div>
                  <Link href={capability.relatedHref} className="text-link">
                    OPEN THE DEEP DIVE&nbsp;&nbsp;&gt;
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.deepDives} data-screen-label="Deep Dives">
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow">GO DEEPER</div>
                <h2 className="h2">Explore each part of the system</h2>
              </div>
              <p>Six interactive explainers, each focused on one question.</p>
            </Reveal>
            <div className={styles.deepDiveList}>
              {concepts.map((concept) => (
                <Reveal key={concept.href}>
                  <Link href={concept.href} className={styles.deepDiveRow}>
                    <span style={{ color: concept.tick }}>{concept.num}</span>
                    <strong>{concept.name}</strong>
                    <p>{concept.desc}</p>
                    <em>EXPLORE&nbsp;&nbsp;&gt;</em>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.production}
          id="production"
          data-screen-label="Production Work"
        >
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow eyebrow-ice">PRODUCTION WORK</div>
                <h2 className="h2">See which parts are working today</h2>
              </div>
              <p>
                These are production engagements with current status and
                measured results kept separate from the walkthroughs above.
              </p>
            </Reveal>
            <div className={styles.productionGrid}>
              {productionCases.map((item) => (
                <Reveal key={item.href}>
                  <Link href={item.href} className={styles.productionCard}>
                    <span>{item.sector}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <strong>{item.result}</strong>
                    <em>VIEW CASE STUDY&nbsp;&nbsp;&gt;</em>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.articles} data-screen-label="Architecture Articles">
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow">SUPPORTING ARTICLES</div>
                <h2 className="h2">Read the operating details</h2>
              </div>
              <Link href="/blog" className="text-link">
                VIEW ALL ARTICLES&nbsp;&nbsp;&gt;
              </Link>
            </Reveal>
            <div className={styles.articleGrid}>
              {architectureArticles.map((article) => (
                <Reveal key={article.slug}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className={styles.articleCard}
                  >
                    <span>
                      {article.cat} · {article.read}
                    </span>
                    <h3>{article.title}</h3>
                    <p>{article.desc}</p>
                    <em>READ THE ARTICLE&nbsp;&nbsp;&gt;</em>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta} data-screen-label="CTA">
          <div className={styles.ctaInner}>
            <div>
              <h2>Bring one workflow. We&apos;ll sketch the system around it.</h2>
              <p>
                A 30-minute working session maps the work, the required access,
                the human decisions, and the likely architecture.
              </p>
            </div>
            <CtaButton href="/contact" variant="inverse">
              BOOK A WORKING SESSION
            </CtaButton>
          </div>
        </section>
      </>
    </PageShell>
  );
}
