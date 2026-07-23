import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { ctaPrimaryLabel, founderHeadshot } from "@/lib/brand";
import { LayerDiagram } from "@/components/home/LayerDiagram";
import { QueueMotif } from "@/components/home/QueueMotif";
import {
  concepts,
  copilotSection,
  costOfWaiting,
  founderStrip,
  homeCases,
  metrics,
  stages,
  whoWeWorkWith,
} from "@/lib/content/home";
import styles from "./page.module.css";

/** Gate positions along the 90-day (≈13-week) rail, as percentages. */
const GATE_POSITIONS = [15.5, 31, 77.5];

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
              OWNED INFRASTRUCTURE · KNOWLEDGE SYSTEMS · AI EMPLOYEES
            </div>
            <h1
              className="h1 mz-rise"
              style={{
                animationDelay: "0.15s",
                maxWidth: 880,
                marginBottom: 28,
              }}
            >
              AI employees for the work that waits on your{" "}
              <span className="highlight">busiest people</span>.
            </h1>
            <p
              className="lede mz-rise"
              style={{
                animationDelay: "0.3s",
                maxWidth: 620,
                marginBottom: 40,
              }}
            >
              Your files become knowledge your AI can cite. Your procedures
              become skills it can reuse. AI employees take on real workflows in
              Teams, Slack, and email under accounts you control. A person
              approves every consequential action, and everything we build runs
              on foundations you own.
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

        <section className={styles.metrics} data-screen-label="Metrics">
          <Reveal className={styles.metricsGrid}>
            {metrics.map((m) => (
              <div key={m.value} className={styles.metric}>
                <span className={styles.tick} style={{ background: m.tick }} />
                <div className={styles.metricValue}>{m.value}</div>
                <div className={styles.metricLabel}>{m.label}</div>
                {m.gates ? (
                  <div className={styles.gateRail} aria-hidden="true">
                    {m.gates.map((g, gi) => (
                      <span
                        key={g}
                        className={styles.gateTick}
                        style={{
                          left: `${GATE_POSITIONS[gi]}%`,
                          ["--i" as string]: gi,
                        }}
                      >
                        <i />
                        {g}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </Reveal>
        </section>

        <section className="section" data-screen-label="Who We Work With">
          <div className="wrap">
            <Reveal>
              <div className="eyebrow">WHO WE WORK WITH</div>
              <h2 className="h2" style={{ marginBottom: 32 }}>
                Built for the mid-market.
              </h2>
            </Reveal>
            <div className={styles.icpGrid}>
              {whoWeWorkWith.map((item) => (
                <Reveal key={item.num}>
                  <div className={styles.icpCard}>
                    <span
                      className={styles.icpNum}
                      style={{ color: item.tick }}
                    >
                      {item.num}
                    </span>
                    <div className={styles.icpTitle}>{item.title}</div>
                    <div className={styles.icpDesc}>{item.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className={styles.icpFoot}>
              <p className={styles.icpMicro}>
                Typically $20M to $500M in revenue. If you need a global SI with
                a thousand consultants, we are unlikely to fit. If your board
                runs a full vendor review,{" "}
                <Link href="/diligence" className={styles.icpLink}>
                  our diligence pack
                </Link>{" "}
                is ready for it.
              </p>
              <Link href="/assessment" className="text-link">
                NOT SURE IF THAT&apos;S YOU? TAKE THE ASSESSMENT&nbsp;&nbsp;&gt;
              </Link>
            </Reveal>
          </div>
        </section>

        <section className={styles.copilot} data-screen-label="Keep Copilot">
          <div className="wrap">
            <div className={styles.copilotGrid}>
              <Reveal>
                <div className="eyebrow">{copilotSection.eyebrow}</div>
                <h2 className="h2" style={{ marginBottom: 18 }}>
                  {copilotSection.h2}
                </h2>
                <p className={styles.copilotBody}>{copilotSection.body}</p>
                <Link href={copilotSection.ctaHref} className="text-link">
                  {copilotSection.ctaLabel}&nbsp;&nbsp;&gt;
                </Link>
              </Reveal>
              <Reveal className={styles.copilotViz}>
                <LayerDiagram />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section" id="concepts" data-screen-label="Concepts">
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow">THE CONCEPTS</div>
                <h2 className="h2">See how each system works</h2>
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
                <div className="eyebrow eyebrow-ice">FIVE STAGES</div>
                <h2 className="h2" style={{ color: "#fff", maxWidth: 520 }}>
                  Start at the stage your operation needs.
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
              <div className={styles.gateMarks} aria-hidden="true">
                {[20, 40, 80].map((x) => (
                  <span key={x} style={{ left: `${x}%` }} />
                ))}
              </div>
              {stages.map((st) => (
                <Link key={st.num} href={st.href} className={styles.stage}>
                  <div className={styles.stageNum}>{st.num}</div>
                  <div className={styles.stageName}>{st.name}</div>
                  <div className={styles.stageDesc}>{st.desc}</div>
                </Link>
              ))}
            </Reveal>
            <Reveal>
              <p className={styles.gateLine}>
                GO/NO-GO GATES AT WEEKS 2, 4, AND 10 · STOP AT A GATE, KEEP
                EVERYTHING PRODUCED
              </p>
            </Reveal>
            <Reveal className={styles.centerCta}>
              <CtaButton href="/assessment" className={styles.assessPill}>
                <span className={styles.assessLong}>
                  NOT SURE WHERE YOU ARE? TAKE THE ASSESSMENT
                </span>
                <span className={styles.assessShort}>
                  TAKE THE 2-MINUTE ASSESSMENT
                </span>
              </CtaButton>
            </Reveal>
          </div>
        </section>

        <section className={styles.cases} data-screen-label="Case Studies">
          <div className="wrap">
            <Reveal className={styles.sectionHead} style={{ marginBottom: 40 }}>
              <div>
                <div className="eyebrow">PROOF</div>
                <h2 className="h2">Production work, status, and numbers</h2>
              </div>
              <Link href="/case-studies" className="text-link">
                ALL CASE STUDIES&nbsp;&nbsp;&gt;
              </Link>
            </Reveal>
            <div className={styles.caseGrid}>
              {homeCases.map((cs) => (
                <Reveal key={cs.title}>
                  <Link
                    href={cs.href}
                    className={`${styles.caseCard} ${cs.openSlot ? styles.caseOpen : ""}`}
                  >
                    <div
                      className={styles.caseArt}
                      style={{ background: cs.art }}
                    >
                      <span>{cs.sector}</span>
                    </div>
                    <div className={styles.caseBody}>
                      <div className={styles.caseTitle}>{cs.title}</div>
                      <div className={styles.caseDesc}>{cs.desc}</div>
                      {cs.result ? (
                        <div className={styles.caseResult}>{cs.result}</div>
                      ) : null}
                      <span className="text-link">
                        {cs.cta}&nbsp;&nbsp;&gt;
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.founder} data-screen-label="Founder">
          <div className="wrap">
            <Reveal className={styles.founderInner}>
              <Image
                className={styles.founderPhoto}
                src={founderHeadshot.src}
                alt={founderHeadshot.alt}
                width={founderHeadshot.width}
                height={founderHeadshot.height}
                sizes="120px"
              />
              <div>
                <div className="eyebrow">WHO YOU&apos;LL WORK WITH</div>
                <p className={styles.founderBody}>{founderStrip.body}</p>
                <Link href={founderStrip.href} className="text-link">
                  {founderStrip.cta}&nbsp;&nbsp;&gt;
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.waiting} data-screen-label="Cost of Waiting">
          <div className="wrap">
            <div className={styles.waitingGrid}>
              <Reveal>
                <div className="eyebrow">{costOfWaiting.eyebrow}</div>
                <h2 className="h2" style={{ marginBottom: 18 }}>
                  {costOfWaiting.h2}
                </h2>
                <p className={styles.waitingBody}>{costOfWaiting.body}</p>
                <div className={styles.waitingCta}>
                  <CtaButton href={costOfWaiting.ctaHref} variant="secondary">
                    {costOfWaiting.ctaLabel}
                  </CtaButton>
                </div>
              </Reveal>
              <Reveal className={styles.waitingViz}>
                <QueueMotif />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section" data-screen-label="Mission">
          <Reveal className={styles.mission}>
            <div className={styles.quoteMark}>“</div>
            <div className={styles.missionQuote}>
              Useful AI should fit a{" "}
              <span
                className="highlight"
                style={{ ["--hl-h" as string]: "10px" }}
              >
                mid-market budget
              </span>
              .
            </div>
            <p className={styles.missionBody}>
              We reduce adoption costs with open models, right-sized hardware,
              and engineering that outlasts any single model.
            </p>
            <CtaButton href="/contact">{ctaPrimaryLabel}</CtaButton>
          </Reveal>
        </section>
      </>
    </PageShell>
  );
}
