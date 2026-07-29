import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { ctaPrimaryLabel } from "@/lib/brand";
import { twoDoors } from "@/lib/content/engagement";
import { ServiceExplorer } from "./ServiceExplorer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Services | Maslow AI · Five stages, fifteen services" },
  description:
    "Enter at any stage: Assess, Structure, Build, Deploy, or Own. Fixed fees, named deliverables, and a 90-day path from idea to working AI foundation.",
};

export default function ServicesPage() {
  return (
    <PageShell footer="full">
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <Image
            className={styles.float}
            src="/assets/maslow-mark-gradient.svg"
            alt=""
            width={230}
            height={148}
          />
          <div className="wrap" style={{ position: "relative" }}>
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              SERVICES · ENTER AT ANY STAGE
            </div>
            <h1
              className="h1 mz-rise"
              style={{
                animationDelay: "0.15s",
                maxWidth: 820,
                marginBottom: 24,
              }}
            >
              Choose the stage you need. Each service has its own price.
            </h1>
            <p
              className="lede mz-rise"
              style={{
                animationDelay: "0.3s",
                maxWidth: 640,
                marginBottom: 36,
              }}
            >
              Each service has a named deliverable and a fixed fee quoted before
              work begins. Start with one service or combine the stages into a
              90-day Foundation.
            </p>
            <div
              className={`${styles.heroCta} mz-rise`}
              style={{ animationDelay: "0.45s" }}
            >
              <CtaButton
                href="/assessment"
                variant="secondary"
                className={styles.assessPill}
              >
                <span className={styles.assessLong}>
                  NOT SURE WHERE YOU ARE? TAKE THE ASSESSMENT
                </span>
                <span className={styles.assessShort}>
                  TAKE THE 2-MINUTE ASSESSMENT
                </span>
              </CtaButton>
              <span className={styles.heroHint}>
                2 minutes · get a stage + recommended services
              </span>
            </div>
          </div>
        </section>

        <section className={styles.doors} data-screen-label="Two Doors">
          <div className="wrap">
            <Reveal>
              <h2 className="h2" style={{ marginBottom: 28 }}>
                Most clients start with one of two scopes.
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

        <ServiceExplorer />

        <section className={styles.e2e} data-screen-label="End to End">
          <Image
            className={styles.e2eMark}
            src="/assets/maslow-mark-white.svg"
            alt=""
            width={320}
            height={206}
          />
          <div className={styles.e2eInner}>
            <div>
              <div className="eyebrow eyebrow-ice">
                START FROM ZERO
              </div>
              <h2 className="h2" style={{ color: "#fff", marginBottom: 14 }}>
                One 90-day engagement across all five stages
              </h2>
              <p className={styles.e2eBody}>
                We run assessment through deployment with one accountable team
                and milestones you can hold us to. We take a maximum of two
                Foundation engagements at a time, so the founder remains directly
                involved in every one.
              </p>
            </div>
            <div className={styles.e2eActions}>
              <CtaButton href="/contact" variant="inverse">
                {ctaPrimaryLabel}
              </CtaButton>
              <Link href="/assessment" className={styles.e2eSecondary}>
                START WITH THE ASSESSMENT
              </Link>
            </div>
          </div>
        </section>
      </>
    </PageShell>
  );
}
