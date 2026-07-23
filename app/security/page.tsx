import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionAnchor } from "@/components/ui/SectionAnchor";
import { contactEmail } from "@/lib/brand";
import {
  dataLocations,
  plainAnswers,
  securityPrinciples,
} from "@/lib/content/trust";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Security & Data Handling | Maslow AI" },
  description:
    "Your data stays in your tenant, on your infrastructure, under your control. Scoped access, no training on client data, audit trails, and export-anytime by design.",
};

export default function SecurityPage() {
  return (
    <PageShell footer="full">
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              SECURITY & DATA HANDLING
            </div>
            <h1
              className="h1 mz-rise"
              style={{
                animationDelay: "0.15s",
                maxWidth: 820,
                marginBottom: 24,
              }}
            >
              Your data is the asset. We treat it that way.
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 640 }}
            >
              We&apos;re a small firm, so we won&apos;t show you a wall of
              badges. We&apos;ll show you the architecture instead, and answer
              any question your IT team asks, in writing.
            </p>
          </div>
        </section>

        <section className={styles.principles} data-screen-label="Principles">
          <div className="wrap">
            <div className={styles.principleList}>
              {securityPrinciples.map((p) => (
                <Reveal key={p.num}>
                  <div className={styles.principleRow}>
                    <span className={styles.principleNum}>{p.num}</span>
                    <div>
                      <div className={styles.principleTitle}>{p.title}</div>
                      <div className={styles.principleDesc}>{p.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.locations} data-screen-label="Locations">
          <div className="wrap">
            <Reveal>
              <div className="eyebrow">WHERE YOUR DATA LIVES</div>
            </Reveal>
            <div className={styles.locationGrid}>
              {dataLocations.map((loc) => (
                <Reveal key={loc.title}>
                  <div className={styles.locationCard}>
                    <div className={styles.locationTitle}>{loc.title}</div>
                    <div className={styles.locationDesc}>{loc.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.answers} data-screen-label="Plain Answers">
          <div className="wrap">
            <Reveal>
              <div className="eyebrow">PLAIN ANSWERS</div>
              <h2
                className="h2"
                id="plain-answers"
                style={{ marginBottom: 28 }}
              >
                What buyers ask before kickoff.
                <SectionAnchor id="plain-answers" label="Plain answers" />
              </h2>
            </Reveal>
            <div className={styles.answerList}>
              {plainAnswers.map((a) => (
                <Reveal key={a.title}>
                  <div className={styles.answerRow}>
                    <div className={styles.answerTitle}>{a.title}</div>
                    <div className={styles.answerBody}>
                      {a.body}
                      {a.link ? (
                        <Link
                          href={a.link.href}
                          className="text-link"
                          style={{ display: "inline-flex", marginTop: 10 }}
                        >
                          {a.link.label}&nbsp;&nbsp;&gt;
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <Link
                href={`mailto:${contactEmail}`}
                className="text-link"
                style={{ marginTop: 28, display: "inline-flex" }}
              >
                QUESTIONS YOUR IT TEAM WILL ASK? SEND THEM OVER&nbsp;&nbsp;&gt;
              </Link>
            </Reveal>
          </div>
        </section>
      </>
    </PageShell>
  );
}
