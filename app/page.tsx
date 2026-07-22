import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { concepts, homeCases, metrics, stages } from "@/lib/content/home";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <PageShell footer="full">
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <Image
            className={styles.floatLg}
            src="/assets/maslow-mark-gradient.svg"
            alt=""
            width={280}
            height={180}
          />
          <Image
            className={styles.floatSm}
            src="/assets/maslow-mark-gradient.svg"
            alt=""
            width={130}
            height={84}
          />
          <div className="wrap" style={{ position: "relative" }}>
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              AI TRANSFORMATION, VERTICALLY INTEGRATED
            </div>
            <h1
              className="h1 mz-rise"
              style={{
                animationDelay: "0.15s",
                maxWidth: 880,
                marginBottom: 28,
              }}
            >
              AI transformation, without the{" "}
              <span className="highlight">transformation budget</span>.
            </h1>
            <p
              className="lede mz-rise"
              style={{
                animationDelay: "0.3s",
                maxWidth: 560,
                marginBottom: 40,
              }}
            >
              We vertically integrate AI into your business: your files become
              knowledge, your tools become skills, and virtual employees show up
              in Teams, Slack and email.
            </p>
            <div
              className={`${styles.ctaRow} mz-rise`}
              style={{ animationDelay: "0.45s" }}
            >
              <CtaButton href="/contact">BOOK A CONSULTATION</CtaButton>
              <CtaButton href="/assessment" variant="secondary">
                TAKE THE 2-MINUTE ASSESSMENT
              </CtaButton>
            </div>
          </div>
        </section>

        <section className={styles.metrics} data-screen-label="Metrics">
          <Reveal className={styles.metricsGrid}>
            {metrics.map((m) => (
              <div key={m.label} className={styles.metric}>
                <span className={styles.tick} style={{ background: m.tick }} />
                <div className={styles.metricValue}>{m.value}</div>
                <div className={styles.metricLabel}>{m.label}</div>
              </div>
            ))}
          </Reveal>
        </section>

        <section className="section" id="concepts" data-screen-label="Concepts">
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow">THE CONCEPTS</div>
                <h2 className="h2">Plain language, interactive proof</h2>
              </div>
              <span className={styles.aside}>
                Each opens an interactive explainer
              </span>
            </Reveal>
            <div className={styles.conceptList}>
              {concepts.map((c) => (
                <Reveal key={c.num}>
                  <Link href={c.href} className={styles.conceptRow}>
                    <span
                      style={{
                        color: c.tick,
                        font: "700 12px var(--font-display)",
                        letterSpacing: 1,
                      }}
                    >
                      {c.num}
                    </span>
                    <span className={styles.conceptName}>{c.name}</span>
                    <span className={styles.conceptDesc}>{c.desc}</span>
                    <span className="text-link">EXPLORE&nbsp;&nbsp;&gt;</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.journey} data-screen-label="Journey">
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow eyebrow-ice">THE JOURNEY</div>
                <h2 className="h2" style={{ color: "#fff", maxWidth: 520 }}>
                  Five stages. Enter at any of them.
                </h2>
              </div>
              <Link href="/services" className="text-link">
                BROWSE ALL SERVICES&nbsp;&nbsp;&gt;
              </Link>
            </Reveal>
            <Reveal className={styles.stages}>
              <svg
                className={styles.stageLine}
                viewBox="0 0 100 2"
                preserveAspectRatio="none"
                aria-hidden
              >
                <line
                  x1="0"
                  y1="1"
                  x2="100"
                  y2="1"
                  stroke="rgba(115,193,174,.4)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  style={{ animation: "mzDash 3s linear infinite" }}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {stages.map((st) => (
                <Link key={st.num} href={st.href} className={styles.stage}>
                  <div className={styles.stageNum}>{st.num}</div>
                  <div className={styles.stageName}>{st.name}</div>
                  <div className={styles.stageDesc}>{st.desc}</div>
                </Link>
              ))}
            </Reveal>
            <Reveal className={styles.centerCta}>
              <CtaButton href="/assessment">
                NOT SURE WHERE YOU ARE? TAKE THE ASSESSMENT
              </CtaButton>
            </Reveal>
          </div>
        </section>

        <section className={styles.cases} data-screen-label="Case Studies">
          <div className="wrap">
            <Reveal className={styles.sectionHead} style={{ marginBottom: 40 }}>
              <div>
                <div className="eyebrow">PROOF</div>
                <h2 className="h2">Real engagements, honest numbers</h2>
              </div>
              <Link href="/case-studies" className="text-link">
                ALL CASE STUDIES&nbsp;&nbsp;&gt;
              </Link>
            </Reveal>
            <div className={styles.caseGrid}>
              {homeCases.map((cs) => (
                <Reveal key={cs.title}>
                  <Link href={cs.href} className={styles.caseCard}>
                    <div
                      className={styles.caseArt}
                      style={{ background: cs.art }}
                    >
                      <span>{cs.sector}</span>
                    </div>
                    <div className={styles.caseBody}>
                      <div className={styles.caseTitle}>{cs.title}</div>
                      <div className={styles.caseDesc}>{cs.desc}</div>
                      <div className={styles.caseResult}>{cs.result}</div>
                      <span className="text-link">
                        VIEW CASE STUDY&nbsp;&nbsp;&gt;
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" data-screen-label="Mission">
          <Reveal className={styles.mission}>
            <div className={styles.quoteMark}>“</div>
            <div className={styles.missionQuote}>
              Extraordinary AI shouldn&apos;t require an{" "}
              <span
                className="highlight"
                style={{ ["--hl-h" as string]: "10px" }}
              >
                extraordinary budget
              </span>
              .
            </div>
            <p className={styles.missionBody}>
              Our mission is to reduce the cost of AI adoption, through open
              models, local hardware and engineering that lasts.
            </p>
            <CtaButton href="/contact">BOOK A CONSULTATION</CtaButton>
          </Reveal>
        </section>
      </>
    </PageShell>
  );
}
