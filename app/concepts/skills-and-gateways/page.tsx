import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import {
  GatewayDiagram,
  SkillLibrary,
} from "@/components/explainers/SkillLibrary";
import { SectionAnchor } from "@/components/ui/SectionAnchor";
import {
  conceptFailures,
  explainerPages,
  gatewayBenefits,
} from "@/lib/content/explainers";
import styles from "../concept.module.css";

const meta = explainerPages["skills-and-gateways"];

export const metadata: Metadata = {
  title: "Skills & gateways | Maslow AI",
  description: meta.lede,
};

export default function SkillsAndGatewaysPage() {
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
            style={{ animationDelay: "0.15s", maxWidth: 920 }}
          >
            {meta.title}
          </h1>
          <p
            className={`${styles.heroLede} mz-rise`}
            style={{ animationDelay: "0.3s" }}
          >
            A <strong>skill</strong> is your firm&apos;s way of doing something,
            written down so an agent can follow it, versioned and testable like
            code, not buried in a prompt. <strong>Gateways</strong> carry those
            skills into Teams, Slack and email. Browse the library below.
          </p>
        </div>
      </section>

      <section className={styles.interactive}>
        <div className="wrap">
          <SkillLibrary />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">THE PLUMBING</div>
            <h2 className="h2" style={{ marginBottom: 12 }}>
              Gateways: how one agent lives everywhere
            </h2>
            <p className="lede" style={{ marginBottom: 44, maxWidth: 640 }}>
              A gateway is a secure two-way connector between a channel and the
              agent&apos;s harness. Messages, files and approvals flow both
              directions, so the agent behaves like a native member of each
              tool, while skills, memory and guardrails stay central.
            </p>
          </Reveal>
          <Reveal>
            <GatewayDiagram />
          </Reveal>
          <div className={styles.points3}>
            {gatewayBenefits.map((b) => (
              <Reveal key={b.name}>
                <article className={styles.point}>
                  <h3>{b.name}</h3>
                  <p>{b.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.failure}>
            <div className="eyebrow">WHAT BREAKS WITHOUT IT</div>
            <h2 className={styles.failureHead} id="what-breaks">
              {conceptFailures["skills-and-gateways"].headline}
              <SectionAnchor id="what-breaks" label="What breaks without it" />
            </h2>
            <p className={styles.failureBody}>
              {conceptFailures["skills-and-gateways"].body}
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
