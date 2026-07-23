import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { ctaPrimaryLabel } from "@/lib/brand";
import {
  manufacturingBottlenecks,
  manufacturingMonday,
} from "@/lib/content/trust";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "AI for Manufacturers | Maslow AI · Tribal knowledge into infrastructure" },
  description:
    "Estimating, quoting, and file search run on knowledge locked in senior heads. We turn it into AI employees in Microsoft Teams, in 90 days, on systems you own.",
};

export default function ManufacturingPage() {
  return (
    <PageShell footer="full">
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div className="eyebrow mz-rise" style={{ animationDelay: "0.05s" }}>
              FOR MANUFACTURERS · BUILT IN THE TRI-STATE, WORKS ANYWHERE
            </div>
            <h1
              className="h1 mz-rise"
              style={{
                animationDelay: "0.15s",
                maxWidth: 880,
                marginBottom: 24,
              }}
            >
              Tribal knowledge is running your plant. Let&apos;s make it
              infrastructure.
            </h1>
            <p
              className="lede mz-rise"
              style={{
                animationDelay: "0.3s",
                maxWidth: 640,
                marginBottom: 36,
              }}
            >
              Your best estimator is a bottleneck. Your drawings archive is a
              black hole. Your Friday reports eat a supervisor&apos;s afternoon.
              We&apos;ve fixed exactly this, for a manufacturer like you, in 90
              days.
            </p>
            <div
              className={`${styles.ctaRow} mz-rise`}
              style={{ animationDelay: "0.45s" }}
            >
              <CtaButton href="/contact">{ctaPrimaryLabel}</CtaButton>
              <CtaButton href="/assessment" variant="secondary">
                TAKE THE 2-MINUTE ASSESSMENT
              </CtaButton>
            </div>
          </div>
        </section>

        <section className={styles.pains} data-screen-label="Bottlenecks">
          <div className="wrap">
            <div className={styles.painGrid}>
              {manufacturingBottlenecks.map((b) => (
                <Reveal key={b.num}>
                  <div className={styles.painCard}>
                    <span className={styles.painNum}>{b.num}</span>
                    <div className={styles.painTitle}>{b.title}</div>
                    <div className={styles.painDesc}>{b.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.proof} data-screen-label="Proof">
          <div className="wrap">
            <Reveal>
              <div className="eyebrow">REAL ENGAGEMENT · MANUFACTURING</div>
              <h2 className="h2" style={{ marginBottom: 18, maxWidth: 720 }}>
                Infinite AI OS: an AI operating system in 90 days.
              </h2>
              <p className={styles.proofBody}>
                A private manufacturing group came to us with estimating,
                quoting, reporting, and file search all running on manual
                effort. Ninety days later: four named AI employees working in
                Microsoft Teams (a manager and three specialists), standing on
                company memory, a knowledge map, file intake, tool connectors,
                and observability. Three core systems in production, every
                consequential action approved by a human.
              </p>
              <div className={styles.chips}>
                <span>4 AI employees in Teams</span>
                <span>3 systems in production</span>
                <span>90 days idea to foundation</span>
              </div>
              <Link
                href="/case-studies/infinite-ai-os"
                className="text-link"
                style={{ marginTop: 20, display: "inline-flex" }}
              >
                READ THE FULL CASE STUDY&nbsp;&nbsp;&gt;
              </Link>
            </Reveal>
          </div>
        </section>

        <section className={styles.monday} data-screen-label="Monday">
          <div className="wrap">
            <Reveal>
              <h2 className="h2" style={{ marginBottom: 28 }}>
                What this looks like on an ordinary Monday.
              </h2>
              <ul className={styles.mondayList}>
                {manufacturingMonday.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className={styles.local} data-screen-label="Local AI">
          <div className="wrap">
            <Reveal>
              <h2 className="h2" style={{ color: "#fff", marginBottom: 14 }}>
                Process data that never leaves the building.
              </h2>
              <p className={styles.localBody}>
                For manufacturers with sensitive process knowledge, we run open
                models on hardware you own: flat monthly cost, zero data egress,
                and privacy that&apos;s physics instead of policy.
              </p>
              <Link href="/security" className="text-link">
                HOW WE HANDLE YOUR DATA&nbsp;&nbsp;&gt;
              </Link>
            </Reveal>
          </div>
        </section>

        <section className={styles.close} data-screen-label="CTA">
          <div className="wrap">
            <Reveal className={styles.closeInner}>
              <div>
                <h2 className="h2" style={{ marginBottom: 12 }}>
                  Bring us one painful workflow.
                </h2>
                <p>
                  A 30-minute working session. We&apos;ll sketch the fix and the
                  cost curve, and tell you plainly if AI won&apos;t pay there
                  yet.
                </p>
              </div>
              <CtaButton href="/contact">{ctaPrimaryLabel}</CtaButton>
            </Reveal>
          </div>
        </section>
      </>
    </PageShell>
  );
}
