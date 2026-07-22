import type { Metadata } from "next";
import Link from "next/link";
import { HarnessSceneLazy } from "@/components/explainers/HarnessSceneLazy";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { explainerPages, harnessPayoffs } from "@/lib/content/explainers";
import styles from "../concept.module.css";

const meta = explainerPages["agentic-harness"];

export const metadata: Metadata = {
  title: "Agentic harness | Maslow AI",
  description: meta.lede,
};

export default function AgenticHarnessPage() {
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
            A raw model is potential, not performance. The{" "}
            <strong>agentic harness</strong> is the engineered structure around
            it (context, skills, tools, memory, guardrails and gateways) that
            turns intelligence into dependable work. Drag the model below; tap
            any component.
          </p>
        </div>
      </section>

      <section className={styles.navyBandFlush}>
        <HarnessSceneLazy />
      </section>

      <section className={styles.sectionAlt}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">THE PAYOFF</div>
            <h2 className="h2" style={{ marginBottom: 12 }}>
              Why the harness beats the model
            </h2>
            <p className="lede" style={{ maxWidth: 600 }}>
              Models improve every quarter, and your harness carries those gains
              forward. It&apos;s the part you own.
            </p>
          </Reveal>
          <div className={styles.points3}>
            {harnessPayoffs.map((p) => (
              <Reveal key={p.title}>
                <article
                  className={styles.point}
                  style={{ borderTop: `2px solid ${p.accent}`, padding: 32 }}
                >
                  <h3 style={{ fontSize: 22 }}>{p.title}</h3>
                  <p>{p.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className={styles.related}>
            {meta.prev && <Link href={meta.prev.href}>{meta.prev.label}</Link>}
            {meta.next && <Link href={meta.next.href}>{meta.next.label}</Link>}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
