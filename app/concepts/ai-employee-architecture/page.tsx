import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureMap } from "@/components/explainers/ArchitectureMap";
import { ArchitectureTrackedLink } from "@/components/explainers/ArchitectureTrackedLink";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { concepts, homeCases } from "@/lib/content/home";
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
            <div className={styles.heroGrid}>
              <div>
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
              </div>
              <div className={styles.heroCopy}>
                <p
                  className={`${styles.lede} mz-rise`}
                  style={{ animationDelay: "0.3s" }}
                >
                  A model supplies intelligence. The surrounding system
                  receives work, assembles the right briefing, follows your
                  procedures, uses approved tools, pauses for decisions, and
                  records the result.
                </p>
                <div
                  className={`${styles.heroActions} mz-rise`}
                  style={{ animationDelay: "0.45s" }}
                >
                  <CtaButton href="#architecture-map">
                    EXPLORE THE SYSTEM
                  </CtaButton>
                  <Link href="#production" className="text-link">
                    SEE PRODUCTION WORK&nbsp;&nbsp;&gt;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.journeyBand} data-screen-label="Workflows">
          <div className={styles.journeyIntro}>
            <div className="eyebrow eyebrow-ice">
              ONE SYSTEM · THREE GUIDED VIEWS
            </div>
            <h2>See how the whole system carries the work.</h2>
            <p>
              Choose a view, apply a workflow, and open any node for the
              business outcome, technical mechanism, and review evidence.
            </p>
          </div>
          <ArchitectureMap />
        </section>

        <section className={styles.comparison} data-screen-label="Comparison">
          <div className="wrap">
            <Reveal className={styles.comparisonInner}>
              <div>
                <div className="eyebrow">THE OPERATING SYSTEM</div>
                <h2>
                  The model supplies reasoning. The system gives it a
                  responsibility.
                </h2>
              </div>
              <p>
                Channels bring the work in. Context and procedures shape the
                response. Approved access, human decisions, and a recorded
                result keep the responsibility inspectable.
              </p>
            </Reveal>
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
                Production engagements keep current status and measured results
                separate from the illustrative walkthroughs.
              </p>
            </Reveal>
            <div className={styles.productionGrid}>
              {productionCases.map((item) => (
                <Reveal key={item.href}>
                  <ArchitectureTrackedLink
                    href={item.href}
                    className={styles.productionCard}
                    eventName="Architecture production evidence clicked"
                    eventData={{ caseStudy: item.href }}
                  >
                    <span>{item.sector}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <strong>{item.result}</strong>
                    <em>VIEW CASE STUDY&nbsp;&nbsp;&gt;</em>
                  </ArchitectureTrackedLink>
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
          className={styles.articles}
          data-screen-label="Architecture Articles"
        >
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
            <ArchitectureTrackedLink
              href="/contact"
              className="cta cta-inverse"
              eventName="Architecture CTA clicked"
              eventData={{ location: "architecture-footer" }}
            >
              BOOK A WORKING SESSION
            </ArchitectureTrackedLink>
          </div>
        </section>
      </>
    </PageShell>
  );
}
