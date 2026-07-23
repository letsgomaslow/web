import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionAnchor } from "@/components/ui/SectionAnchor";
import { ctaPrimaryLabel, engagementBadge } from "@/lib/brand";
import {
  expectations,
  foundationWeeks,
  pricingPrinciples,
  twoDoors,
} from "@/lib/content/engagement";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "How We Engage | Maslow AI · Fixed fees, named milestones",
  },
  description:
    "Two doors in: a fixed-fee Workflow Discovery or the 90-Day AI Foundation. Week-by-week anatomy, go/no-go gates, and a walk-away clause in writing.",
};

export default function HowWeEngagePage() {
  return (
    <PageShell footer="full">
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              HOW WE ENGAGE · FIXED FEES, NAMED MILESTONES
            </div>
            <h1
              className="h1 mz-rise"
              style={{
                animationDelay: "0.15s",
                maxWidth: 820,
                marginBottom: 24,
              }}
            >
              Two doors in. One accountable team.
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 640 }}
            >
              No open-ended retainers, no discovery that never ends. Every
              engagement has a fixed fee, a named deliverable, and a gate where
              you can stop. Here is exactly what happens after you say yes.
            </p>
          </div>
        </section>

        <section className={styles.doors} data-screen-label="Two Doors">
          <div className="wrap">
            <Reveal>
              <h2 className="h2" id="two-doors" style={{ marginBottom: 28 }}>
                Most clients start at one of two doors.
                <SectionAnchor id="two-doors" label="The two doors" />
              </h2>
            </Reveal>
            <div className={styles.doorGrid}>
              {twoDoors.map((door) => (
                <Reveal key={door.name}>
                  <div className={styles.doorCard}>
                    <div className={styles.doorName}>{door.name}</div>
                    <div className={styles.doorDesc}>{door.desc}</div>
                    <div className={styles.doorFit}>
                      <b>For you if:</b> {door.fit}
                    </div>
                    <div className={styles.doorTag}>{door.tag}</div>
                    <Link href={door.ctaHref} className="text-link">
                      {door.ctaLabel}&nbsp;&nbsp;&gt;
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.weeks} data-screen-label="90 Days">
          <div className="wrap">
            <Reveal>
              <h2 className="h2" id="ninety-days" style={{ marginBottom: 36 }}>
                Learn the work. Prove the value. Then build.
                <SectionAnchor id="ninety-days" label="The 90-day anatomy" />
              </h2>
            </Reveal>
            <div className={styles.weekList}>
              {foundationWeeks.map((w, i) => (
                <Reveal key={w.label}>
                  <div className={styles.weekRow}>
                    <span className={styles.weekNum}>0{i + 1}</span>
                    <div>
                      <div className={styles.weekLabel}>{w.label}</div>
                      <div className={styles.weekDesc}>{w.desc}</div>
                      <div className={styles.weekTag}>{w.tag}</div>
                      {w.gate ? (
                        <div className={styles.weekGate}>{w.gate}</div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.expect} data-screen-label="Expectations">
          <div className="wrap">
            <div className={styles.expectGrid}>
              <Reveal>
                <div className={styles.expectCol}>
                  <div className="eyebrow">WHAT YOU GET</div>
                  <p>{expectations.youGet}</p>
                </div>
              </Reveal>
              <Reveal>
                <div className={styles.expectCol}>
                  <div className="eyebrow">WHAT WE ASK</div>
                  <p>{expectations.weAsk}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.pricing} data-screen-label="Pricing">
          <div className="wrap">
            <Reveal>
              <h2
                className="h2"
                id="pricing"
                style={{ color: "#fff", marginBottom: 36 }}
              >
                Priced before we start. Gated so you can stop.
                <SectionAnchor id="pricing" label="Pricing principles" />
              </h2>
            </Reveal>
            <div className={styles.pricingList}>
              {pricingPrinciples.map((p) => {
                const walkAway = p.num === "03";
                const row = (
                  <div
                    className={`${styles.pricingRow} ${walkAway ? styles.walkAway : ""}`}
                  >
                    <span className={styles.pricingNum}>{p.num}</span>
                    <div>
                      <div className={styles.pricingTitle}>{p.title}</div>
                      <div className={styles.pricingBody}>{p.body}</div>
                    </div>
                  </div>
                );
                // The walk-away clause renders deliberately still: no reveal
                // animation, no hover response — the site's only static moment.
                return walkAway ? (
                  <div key={p.num}>{row}</div>
                ) : (
                  <Reveal key={p.num}>{row}</Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.capacity} data-screen-label="Capacity">
          <div className="wrap">
            <Reveal className={styles.capacityInner}>
              <p>
                We take a maximum of two Foundation engagements at a time.
                Currently: {engagementBadge}.
              </p>
              <CtaButton href="/contact">{ctaPrimaryLabel}</CtaButton>
            </Reveal>
          </div>
        </section>
      </>
    </PageShell>
  );
}
