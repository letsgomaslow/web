import type { Metadata } from "next";
import Link from "next/link";
import { HybridRagSceneLazy } from "@/components/explainers/HybridRagSceneLazy";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionAnchor } from "@/components/ui/SectionAnchor";
import {
  conceptFailures,
  explainerPages,
  hybridRagComparison,
} from "@/lib/content/explainers";
import styles from "../concept.module.css";

const meta = explainerPages["hybrid-rag"];

export const metadata: Metadata = {
  title: "Hybrid RAG | Maslow AI",
  description: meta.lede,
};

export default function HybridRagPage() {
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
            style={{ animationDelay: "0.15s", maxWidth: 860 }}
          >
            {meta.title}
          </h1>
          <p
            className={`${styles.heroLede} mz-rise`}
            style={{ animationDelay: "0.3s", maxWidth: 620 }}
          >
            Most of your company&apos;s knowledge lives in unstructured files.
            Hybrid RAG converts them into two complementary structures: a{" "}
            <strong>vector database</strong> for meaning and a{" "}
            <strong>knowledge graph</strong> for facts. Scroll to watch it
            happen.
          </p>
        </div>
      </section>

      <HybridRagSceneLazy />

      <section className={styles.sectionAlt}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">THE INSIGHT</div>
            <h2 className="h2" style={{ marginBottom: 12 }}>
              Why both?
            </h2>
            <p className="lede" style={{ maxWidth: 560 }}>
              Each structure answers a different kind of question. Hybrid RAG
              routes every query to the right one, or both.
            </p>
          </Reveal>
          <div className={styles.points3}>
            {hybridRagComparison.map((c) => (
              <Reveal key={c.kind}>
                <article
                  className={styles.point}
                  style={{
                    padding: 32,
                    background: c.dark ? "#121D35" : "#fff",
                    color: c.dark ? "#fff" : undefined,
                    border: c.dark ? "none" : undefined,
                  }}
                >
                  <span style={{ color: c.accent, letterSpacing: 2 }}>
                    {c.kind}
                  </span>
                  <h3 style={{ color: c.dark ? "#fff" : "#1A1A1A" }}>
                    {c.title}
                  </h3>
                  <p style={{ color: c.dark ? "#B8C4D9" : undefined }}>
                    {c.desc}
                  </p>
                  <div
                    style={{
                      marginTop: 18,
                      font: "600 13px/19px var(--font-sans)",
                      color: c.dark ? "#fff" : "#333",
                      background: c.dark ? "#1A2847" : "#F6F7F9",
                      borderLeft: `2px solid ${c.accent}`,
                      borderRadius: "0 4px 4px 0",
                      padding: "12px 14px",
                    }}
                  >
                    {c.example}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.failure}>
            <div className="eyebrow">WHAT BREAKS WITHOUT IT</div>
            <h2 className={styles.failureHead} id="what-breaks">
              {conceptFailures["hybrid-rag"].headline}
              <SectionAnchor id="what-breaks" label="What breaks without it" />
            </h2>
            <p className={styles.failureBody}>
              {conceptFailures["hybrid-rag"].body}
            </p>
          </Reveal>
          <div className={styles.related}>
            {meta.prev && <Link href={meta.prev.href}>{meta.prev.label}</Link>}
            {meta.next && <Link href={meta.next.href}>{meta.next.label}</Link>}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
