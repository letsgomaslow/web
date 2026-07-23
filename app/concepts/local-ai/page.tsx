import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { CostCalculator } from "@/components/explainers/CostCalculator";
import {
  explainerPages,
  localHardwareTiers,
  localKeepFrontier,
  localRunsLocally,
  conceptFailures,
} from "@/lib/content/explainers";
import { SectionAnchor } from "@/components/ui/SectionAnchor";
import styles from "../concept.module.css";

const meta = explainerPages["local-ai"];

export const metadata: Metadata = {
  title: "Local AI | Maslow AI",
  description: meta.lede,
};

export default function LocalAiPage() {
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
            style={{ animationDelay: "0.15s", maxWidth: 820 }}
          >
            {meta.title}
          </h1>
          <p
            className={`${styles.heroLede} mz-rise`}
            style={{ animationDelay: "0.3s" }}
          >
            {meta.lede}
          </p>
        </div>
      </section>

      <section className={styles.interactive}>
        <div className="wrap">
          <CostCalculator />
        </div>
      </section>

      <section className={styles.sectionAlt} style={{ paddingBottom: 56 }}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">THE HYBRID ESTATE</div>
            <h2 className="h2" style={{ marginBottom: 12 }}>
              Match each workload to the right model location
            </h2>
            <p className="lede" style={{ maxWidth: 620 }}>
              We design hybrid estates: high-volume, privacy-sensitive workloads
              run on your hardware; rare, hardest problems still call a frontier
              model.
            </p>
          </Reveal>
          <div className={styles.points2}>
            <Reveal>
              <article
                className={styles.point}
                style={{ borderTop: "2px solid #73C1AE", padding: 36 }}
              >
                <span style={{ color: "#73C1AE", letterSpacing: 2 }}>
                  RUNS BEAUTIFULLY LOCAL
                </span>
                <ul className={styles.checkList}>
                  {localRunsLocally.map((item) => (
                    <li key={item}>
                      <span style={{ color: "#2CD552", fontWeight: 700 }}>
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal>
              <article
                className={styles.point}
                style={{ borderTop: "2px solid #A5A5A5", padding: 36 }}
              >
                <span style={{ color: "#838383", letterSpacing: 2 }}>
                  KEEP ON FRONTIER (FOR NOW)
                </span>
                <ul className={styles.checkList}>
                  {localKeepFrontier.map((item) => (
                    <li key={item}>
                      <span style={{ color: "#A5A5A5" }}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt} style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <h2
              style={{
                margin: 0,
                font: "500 32px/40px var(--font-sans)",
                letterSpacing: "0.64px",
                color: "var(--color-navy)",
              }}
            >
              Hardware sized to the workload
            </h2>
          </Reveal>
          <div className={styles.tiers}>
            {localHardwareTiers.map((t) => (
              <Reveal key={t.name}>
                <article
                  className={styles.tier}
                  style={{
                    background: t.featured ? "#121D35" : "#fff",
                    color: t.featured ? "#fff" : "#1A1A1A",
                    borderColor: t.featured ? "#121D35" : "#F1F1F1",
                  }}
                >
                  <div className={styles.tierTag} style={{ color: t.accent }}>
                    {t.tag}
                  </div>
                  <h3>{t.name}</h3>
                  <div className={styles.tierPrice} style={{ color: t.accent }}>
                    {t.price}
                  </div>
                  <p>{t.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p
            style={{
              margin: "16px 4px 0",
              font: "400 12px var(--font-sans)",
              color: "#A5A5A5",
            }}
          >
            Indicative tiers; we spec against your actual workload during the
            assessment.
          </p>
          <Reveal className={styles.failure}>
            <div className="eyebrow">WHAT BREAKS WITHOUT IT</div>
            <h2 className={styles.failureHead} id="what-breaks">
              {conceptFailures["local-ai"].headline}
              <SectionAnchor id="what-breaks" label="What breaks without it" />
            </h2>
            <p className={styles.failureBody}>
              {conceptFailures["local-ai"].body}
            </p>
          </Reveal>
          <div className={styles.related}>
            {meta.prev && <Link href={meta.prev.href}>{meta.prev.label}</Link>}
            <Link href="/#concepts">All concepts</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
