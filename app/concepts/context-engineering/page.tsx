import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { BriefingBuilder } from "@/components/explainers/BriefingBuilder";
import { SectionAnchor } from "@/components/ui/SectionAnchor";
import {
  conceptFailures,
  contextDiscipline,
  explainerPages,
} from "@/lib/content/explainers";
import styles from "../concept.module.css";

const meta = explainerPages["context-engineering"];

export const metadata: Metadata = {
  title: "Context engineering | Maslow AI",
  description: meta.lede,
};

export default function ContextEngineeringPage() {
  return (
    <PageShell highlightConcepts showCtaBand>
      <section className={styles.hero}>
        <div className="wrap">
          <div className={`${styles.crumb} mz-rise`}>
            <Link href="/#concepts">Concepts</Link> /{" "}
            <span className={styles.crumbCurrent}>{meta.crumb}</span>{" "}
            <span className={styles.badge} style={{ color: meta.badgeColor }}>
              {meta.badge}
            </span>
          </div>
          <h1
            className={`${styles.heroTitle} mz-rise`}
            style={{ animationDelay: "0.15s" }}
          >
            {meta.title}
          </h1>
          <p
            className={`${styles.heroLede} mz-rise`}
            style={{ animationDelay: "0.3s" }}
          >
            Before a model acts, it reads a briefing: the{" "}
            <strong>context</strong>. Context engineering decides what earns a
            place in it. Try it yourself: build the briefing below and watch the
            answer change.
          </p>
        </div>
      </section>

      <section className={styles.interactive}>
        <div className="wrap">
          <BriefingBuilder />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">THE DISCIPLINE</div>
            <h2 className="h2" style={{ marginBottom: 12 }}>
              What context engineering actually involves
            </h2>
            <p className="lede" style={{ maxWidth: 600 }}>
              It&apos;s a pipeline, not a prompt. We build and run every stage.
            </p>
          </Reveal>
          <div className={styles.points}>
            {contextDiscipline.map((c) => (
              <Reveal key={c.num}>
                <article className={styles.point}>
                  <span style={{ color: c.accent }}>{c.num}</span>
                  <h3>{c.name}</h3>
                  <p>
                    {c.desc}
                    {c.link ? (
                      <>
                        {" "}
                        <Link href={c.link.href}>{c.link.label}</Link>.
                      </>
                    ) : null}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.failure}>
            <div className="eyebrow">WHAT BREAKS WITHOUT IT</div>
            <h2 className={styles.failureHead} id="what-breaks">
              {conceptFailures["context-engineering"].headline}
              <SectionAnchor id="what-breaks" label="What breaks without it" />
            </h2>
            <p className={styles.failureBody}>
              {conceptFailures["context-engineering"].body}
            </p>
          </Reveal>
          {meta.next && (
            <div className={styles.related}>
              <Link href={meta.next.href}>{meta.next.label}</Link>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
