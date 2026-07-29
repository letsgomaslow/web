import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureMap } from "@/components/explainers/ArchitectureMap";
import {
  ArchitectureTrackedLink,
  ArchitectureTrackedView,
} from "@/components/explainers/ArchitectureTrackedLink";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { concepts, homeCases } from "@/lib/content/home";
import { architectureArticles } from "@/lib/content/blog";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "AI employee architecture technical reference",
  description:
    "Inspect the operating loop, control plane, governed improvement path, illustrative workflows, and related production evidence behind an AI employee.",
};

const productionCases = homeCases.filter((item) => !item.openSlot);

export default function AiEmployeeArchitectureTechnicalPage() {
  return (
    <PageShell highlightConcepts>
      <>
        <ArchitectureTrackedView
          eventName="Technical architecture opened"
          eventData={{ location: "technical-route" }}
        />
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div className={`${styles.crumb} mz-rise`}>
              <Link href="/concepts/ai-employee-architecture">
                AI employee architecture
              </Link>{" "}
              / <span>Technical reference</span>
            </div>
            <div className={styles.heroGrid}>
              <div>
                <div
                  className="eyebrow mz-rise"
                  style={{ animationDelay: "0.05s" }}
                >
                  TECHNICAL REFERENCE
                </div>
                <h1
                  className={`${styles.title} mz-rise`}
                  style={{ animationDelay: "0.15s" }}
                >
                  The technical system behind an AI employee.
                </h1>
              </div>
              <div className={styles.heroCopy}>
                <p
                  className={`${styles.lede} mz-rise`}
                  style={{ animationDelay: "0.3s" }}
                >
                  Inspect how work moves through context, procedures, approved
                  capabilities, human decisions, review records, and controlled
                  improvement.
                </p>
                <div
                  className={`${styles.heroActions} mz-rise`}
                  style={{ animationDelay: "0.45s" }}
                >
                  <Link
                    href="/concepts/ai-employee-architecture"
                    className="cta"
                  >
                    RETURN TO THE BUYER VIEW
                  </Link>
                  <ArchitectureTrackedLink
                    href="/contact"
                    className="text-link"
                    eventName="Working session CTA clicked"
                    eventData={{ location: "architecture-technical-hero" }}
                  >
                    BOOK A WORKING SESSION&nbsp;&nbsp;&gt;
                  </ArchitectureTrackedLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.journeyBand} data-screen-label="Technical Map">
          <div className={styles.journeyIntro}>
            <div className="eyebrow eyebrow-ice">
              ONE SYSTEM · THREE GUIDED VIEWS
            </div>
            <h2>Inspect how the whole system carries the work.</h2>
            <p>
              Choose a view, apply an illustrative workflow, and open any node
              for the business outcome, technical mechanism, and review
              evidence.
            </p>
          </div>
          <ArchitectureMap />
        </section>

        <section className={styles.production} data-screen-label="Production Evidence">
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow eyebrow-ice">PRODUCTION EVIDENCE</div>
                <h2 className="h2">Compare the reference with current systems.</h2>
              </div>
              <p>
                Production engagements stay distinct from the illustrative
                workflows used inside the map.
              </p>
            </Reveal>
            <div className={styles.productionGrid}>
              {productionCases.map((item) => (
                <Reveal key={item.href}>
                  <ArchitectureTrackedLink
                    href={item.href}
                    className={styles.productionCard}
                    eventName="Architecture production evidence clicked"
                    eventData={{ caseStudy: item.href, location: "technical" }}
                  >
                    <span>PRODUCTION ENGAGEMENT · {item.sector.split(" · ")[0]}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <strong>{item.result}</strong>
                    <em>VIEW PRODUCTION EVIDENCE&nbsp;&nbsp;&gt;</em>
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
                <div className="eyebrow">TECHNICAL LIBRARY</div>
                <h2 className="h2">Open the part you need to inspect.</h2>
              </div>
              <p>Six focused explainers connect the map to implementation choices.</p>
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

        <section className={styles.articles} data-screen-label="Architecture Articles">
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow">SUPPORTING ARTICLES</div>
                <h2 className="h2">Read the operating details.</h2>
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
              <h2>Bring one workflow. We will sketch the system around it.</h2>
              <p>
                A 30-minute working session maps the work, required access,
                human decisions, evidence, and likely architecture.
              </p>
            </div>
            <ArchitectureTrackedLink
              href="/contact"
              className="cta cta-inverse"
              eventName="Working session CTA clicked"
              eventData={{ location: "architecture-technical-footer" }}
            >
              BOOK A WORKING SESSION
            </ArchitectureTrackedLink>
          </div>
        </section>
      </>
    </PageShell>
  );
}
