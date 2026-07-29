import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionAnchor } from "@/components/ui/SectionAnchor";
import { ctaPrimaryLabel, engagementBadge } from "@/lib/brand";
import {
  earlyWorkingSession,
  expectations,
  pricingPrinciples,
  twoDoors,
} from "@/lib/content/engagement";
import { WeekRail } from "./WeekRail";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "How We Engage | Maslow AI · Fixed fees, named milestones",
  },
  description:
    "Start with fixed-fee Workflow Discovery or the 90-Day AI Foundation. See the weekly deliverables, go/no-go gates, and walk-away terms.",
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
              Two ways to start, with one accountable team.
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 640 }}
            >
              Start with Workflow Discovery or the 90-Day AI Foundation. Each
              engagement has a fixed fee, a named deliverable, and decision
              points where you can stop. Here is what happens after kickoff.
            </p>
          </div>
        </section>

        <section className={styles.doors} data-screen-label="Two Doors">
          <div className="wrap">
            <Reveal>
              <h2 className="h2" id="two-doors" style={{ marginBottom: 28 }}>
                Most clients start with one of two scopes.
                <SectionAnchor id="two-doors" label="The two doors" />
              </h2>
            </Reveal>
            <div className={styles.doorGrid}>
              {twoDoors.map((door) => (
                <Reveal key={door.name}>
                  <div className={styles.doorCard}>
                    <h3 className={styles.doorName}>{door.name}</h3>
                    <div className={styles.doorDesc}>{door.desc}</div>
                    <div className={styles.doorFit}>
                      <b>For you if:</b> {door.fit}
                    </div>
                    <div className={styles.doorTag}>{door.tag}</div>
                    <Link
                      href={door.ctaHref}
                      className={`text-link ${styles.doorAction}`}
                    >
                      {door.ctaLabel}&nbsp;&nbsp;&gt;
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.earlyCta}
          aria-labelledby="engagement-early-title"
          data-engagement-early-cta
          data-screen-label="Working Session"
        >
          <div className="wrap">
            <Reveal className={styles.earlyCtaInner}>
              <div className={styles.earlyCopy}>
                <div className={styles.earlyEyebrow}>
                  {earlyWorkingSession.eyebrow}
                </div>
                <h2
                  className={styles.earlyTitle}
                  id="engagement-early-title"
                >
                  {earlyWorkingSession.heading}
                </h2>
                <p className={styles.earlyBody}>{earlyWorkingSession.body}</p>
              </div>
              <CtaButton
                href={earlyWorkingSession.ctaHref}
                variant="inverse"
                className={styles.earlyAction}
              >
                {earlyWorkingSession.ctaLabel}
              </CtaButton>
            </Reveal>
          </div>
        </section>

        <section className={styles.weeks} data-screen-label="90 Days">
          <div className="wrap">
            <Reveal>
              <h2
                className={`h2 ${styles.weeksHeading}`}
                id="ninety-days"
              >
                What happens across the 90-day Foundation.
                <SectionAnchor id="ninety-days" label="The 90-day anatomy" />
              </h2>
            </Reveal>
            <WeekRail />
          </div>
        </section>

        <section className={styles.expect} data-screen-label="Expectations">
          <div className="wrap">
            <div className={styles.expectGrid}>
              <Reveal>
                <div className={styles.expectCol}>
                  <h2 className={`eyebrow ${styles.expectHeading}`}>
                    WHAT YOU GET
                  </h2>
                  <p>{expectations.youGet}</p>
                </div>
              </Reveal>
              <Reveal>
                <div className={styles.expectCol}>
                  <h2 className={`eyebrow ${styles.expectHeading}`}>
                    WHAT WE ASK
                  </h2>
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
                Fixed fees and three decision points.
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
                // animation or hover response. It is the site's only static moment.
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
