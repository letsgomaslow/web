import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { ChannelDemo } from "@/components/explainers/ChannelDemo";
import { SectionAnchor } from "@/components/ui/SectionAnchor";
import {
  conceptFailures,
  explainerPages,
  rileyDayTimeline,
} from "@/lib/content/explainers";
import styles from "../concept.module.css";

const meta = explainerPages["virtual-ai-employees"];

export const metadata: Metadata = {
  title: "Virtual AI employees | Maslow AI",
  description: meta.lede,
};

export default function VirtualAiEmployeesPage() {
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
            A virtual AI employee isn&apos;t another app to log into. Through{" "}
            <strong>gateways</strong>, the same agent shows up in Microsoft
            Teams, Slack and email: same knowledge, same skills, same
            guardrails. Switch channels below.
          </p>
        </div>
      </section>

      <section className={styles.interactive}>
        <div className="wrap">
          <ChannelDemo />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">A SHIFT, NOT A CHAT</div>
            <h2 className="h2" style={{ marginBottom: 12 }}>
              A day with Riley
            </h2>
            <p className="lede" style={{ maxWidth: 560 }}>
              Not a chatbot waiting for questions. A teammate working a shift.
            </p>
          </Reveal>
          <div className={styles.points}>
            {rileyDayTimeline.map((item) => (
              <Reveal key={item.time}>
                <article
                  className={styles.point}
                  style={{ borderTop: `2px solid ${item.accent}` }}
                >
                  <span style={{ color: item.accent }}>{item.time}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.failure}>
            <div className="eyebrow">WHAT BREAKS WITHOUT IT</div>
            <h2 className={styles.failureHead} id="what-breaks">
              {conceptFailures["virtual-ai-employees"].headline}
              <SectionAnchor id="what-breaks" label="What breaks without it" />
            </h2>
            <p className={styles.failureBody}>
              {conceptFailures["virtual-ai-employees"].body}
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
