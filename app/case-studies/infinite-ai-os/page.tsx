import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { infiniteAiOs as cs } from "@/lib/content/case-studies";
import styles from "../case-study.module.css";

export const metadata: Metadata = {
  title: "Infinite AI OS Case Study | Maslow AI",
  description: cs.lede,
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function InfiniteAiOsPage() {
  return (
    <PageShell footer="compact" showCtaBand={false}>
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div
              className={`${styles.crumb} mz-rise`}
              style={{ animationDelay: "0.05s" }}
            >
              <Link href="/case-studies">Case Studies</Link>
              {" / "}
              <span>{cs.breadcrumb}</span>
            </div>
            <div
              className={`${styles.tags} mz-rise`}
              style={{ animationDelay: "0.1s" }}
            >
              {cs.tags.map((t) => (
                <span
                  key={t.label}
                  className={styles.tag}
                  data-variant={t.variant}
                >
                  {t.label}
                </span>
              ))}
            </div>
            <h1
              className={`${styles.title} mz-rise`}
              style={{ animationDelay: "0.15s" }}
            >
              {cs.title}
            </h1>
            <p
              className={`${styles.lede} mz-rise`}
              style={{ animationDelay: "0.3s" }}
            >
              {cs.lede}
            </p>
            <div
              className={`${styles.metrics} mz-rise`}
              style={{ animationDelay: "0.45s" }}
            >
              {cs.metrics.map((m) => (
                <div
                  key={m.label}
                  className={m.dark ? styles.metricDark : styles.metric}
                  style={m.dark ? undefined : { borderTopColor: m.accent }}
                >
                  <div
                    className={styles.metricValue}
                    style={m.dark ? { color: m.accent } : undefined}
                  >
                    {m.value}
                  </div>
                  <div className={styles.metricLabel}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.challenge} data-screen-label="Challenge">
          <div className={styles.split}>
            <div>
              <div className="eyebrow">THE CHALLENGE</div>
              <h2 className={styles.sectionH2}>{cs.challengeTitle}</h2>
            </div>
            <div className={styles.prose}>
              {cs.challengeBody.map((p, i) => (
                <p key={i}>{renderInline(p)}</p>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.navy} data-screen-label="Approach">
          <div className="wrap">
            <div className="eyebrow eyebrow-ice">THE APPROACH</div>
            <h2 className={styles.navyH2}>
              Learn the work. Prove the value. Then build.
            </h2>
            <p className={styles.navyLede}>
              Infrastructure was only built for patterns that proved useful
              first. No speculative technology spend.
            </p>
            <div className={styles.phaseGrid}>
              {cs.phases.map((ph) => (
                <div key={ph.name} className={styles.phase}>
                  <div className={styles.phaseWhen}>{ph.when}</div>
                  <div className={styles.phaseName}>{ph.name}</div>
                  <div className={styles.phaseDesc}>{ph.desc}</div>
                  <div className={styles.phaseQ}>&ldquo;{ph.q}&rdquo;</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.built} data-screen-label="What We Built">
          <div className="wrap">
            <div className="eyebrow">WHAT WE BUILT</div>
            <h2 className="h2" style={{ marginBottom: 12 }}>
              An operating system for four AI employees
            </h2>
            <p className={styles.builtLede}>
              Above the line: four AI employees people actually talk to. Below
              it: the six-layer system that supplies context, tools, and review
              controls.
            </p>
            <div className={styles.osCard}>
              <div className={styles.osLabel}>
                THE SURFACE · WHAT PEOPLE SEE
              </div>
              <div className={styles.teamGrid}>
                {cs.team.map((t) => (
                  <div
                    key={t.name}
                    className={styles.teammate}
                    style={{
                      background: t.bg,
                      color: t.fg,
                      borderColor: t.border,
                    }}
                  >
                    <div
                      className={styles.avatar}
                      style={{ background: t.avatarBg, color: t.avatarFg }}
                    >
                      {t.initial}
                    </div>
                    <div className={styles.teammateName}>{t.name}</div>
                    <div
                      className={styles.teammateRole}
                      style={{ color: t.roleColor }}
                    >
                      {t.role}
                    </div>
                    <div className={styles.teammateDesc}>{t.desc}</div>
                  </div>
                ))}
              </div>
              <div className={styles.divider}>
                <span />
                <em>THE ROOT SYSTEM · WHAT MAKES THEM WORK</em>
                <span />
              </div>
              <div className={styles.roots}>
                {cs.roots.map((r) => (
                  <div key={r.num} className={styles.root}>
                    <span className={styles.rootNum}>{r.num}</span>
                    <div>
                      <div className={styles.rootName}>{r.name}</div>
                      <div className={styles.rootDesc}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className={styles.note}>
              Human oversight throughout: specialists execute and escalate
              uncertainty; final decisions stay with people. Anything sensitive
              or external requires owner approval.
            </p>
          </div>
        </section>

        <section className={styles.proof} data-screen-label="Proof">
          <div className="wrap">
            <div className="eyebrow">PROOF IT WORKS</div>
            <h2 className="h2" style={{ marginBottom: 40 }}>
              Working in production channels
            </h2>
            <div className={styles.proofGrid}>
              <div className={styles.proofCard}>
                <div className={styles.proofLabel}>ABBY · MICROSOFT TEAMS</div>
                <div className={styles.bubble}>
                  Abby, what&apos;s blocking this week?
                </div>
                <div className={styles.bubbleReply}>
                  Two items: the Westfield quote needs a material spec, and Val
                  is waiting on the RFQ drawings. I&apos;ve flagged both owners.
                </div>
                <div className={styles.proofNote}>
                  AI employees answer where people already work. No new app to
                  learn.
                </div>
              </div>
              <div className={styles.proofCard}>
                <div className={styles.proofLabel}>VAL · RFQ REVIEW</div>
                <div className={styles.check}>
                  <span>✓</span>Material spec confirmed
                </div>
                <div className={styles.check}>
                  <span>✓</span>Quantities match drawings
                </div>
                <div className={styles.check}>
                  <span>✓</span>Similar prior job found
                </div>
                <div className={styles.warn}>
                  <span>!</span>Finish spec missing: ask customer
                </div>
                <div className={styles.proofMono}>
                  3 OF 4 ESTIMATING INPUTS READY
                </div>
                <div className={styles.proofNote}>
                  RFQ review, assumptions and missing-input checklists drafted
                  in minutes.
                </div>
              </div>
              <div className={styles.proofCard}>
                <div className={styles.proofLabel}>LUCY · WEEKLY REPORT</div>
                <div className={styles.report}>
                  <div className={styles.reportHead}>
                    <span>Operations update · Week 12</span>
                    <span className={styles.sent}>
                      <i />
                      SENT
                    </span>
                  </div>
                  <div className={styles.bar} style={{ width: "90%" }} />
                  <div className={styles.bar} style={{ width: "75%" }} />
                  <div className={styles.bar} style={{ width: "82%" }} />
                  <div className={styles.reportFoot}>
                    Drafted from company files
                  </div>
                </div>
                <div className={styles.proofNote}>
                  Company files become polished, client-ready reports and
                  updates.
                </div>
              </div>
            </div>
            <p className={styles.caption}>
              Stylized recreations of proof-of-concept sessions from the May
              pilot phase.
            </p>
          </div>
        </section>

        <section className={styles.status} data-screen-label="Status">
          <div className={styles.split}>
            <div>
              <div className="eyebrow">CURRENT STATE</div>
              <h2 className={styles.sectionH2}>Current production status</h2>
              <p className={styles.statusLede}>
                Three systems verified live in production; two in structured
                review. The table separates working components from items still
                being hardened.
              </p>
            </div>
            <div className={styles.statusList}>
              {cs.status.map((s) => (
                <Reveal key={s.name} className={styles.statusRow}>
                  <div>
                    <div className={styles.statusName}>{s.name}</div>
                    <div className={styles.statusDesc}>{s.desc}</div>
                  </div>
                  <span
                    className={styles.badge}
                    style={{ background: s.badgeBg, color: s.badgeFg }}
                  >
                    <i style={{ background: s.dot }} />
                    {s.badge}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.value} data-screen-label="Value">
          <div className="wrap">
            <div className="eyebrow eyebrow-ice">WHAT IT IS WORTH</div>
            <h2 className={styles.navyH2}>
              A scenario model for future operating value
            </h2>
            <p className={styles.navyLede}>
              This model tests two possible drivers: EBITDA improvement from
              faster estimating, search, and reporting; and multiple expansion
              from lower key-person risk and cleaner diligence. It is a planning
              model, not a realized client result. The baseline uses a 3.75×
              multiple for small private manufacturing.
            </p>
            <div className={styles.valueGrid}>
              {cs.valueScenarios.map((v) => (
                <div
                  key={v.name}
                  className={
                    v.highlight ? styles.valueCardHot : styles.valueCard
                  }
                >
                  <div className={styles.valueNum} style={{ color: v.color }}>
                    {v.value}
                  </div>
                  <div className={styles.valueName}>{v.name}</div>
                  <div className={styles.valueDetail}>{v.detail}</div>
                </div>
              ))}
            </div>
            <p className={styles.valueNote}>
              The day-180 target is to replace assumptions with measured hours
              saved, quote-cycle changes, and rework avoided.
            </p>
          </div>
        </section>

        <section className={styles.services} data-screen-label="Services Used">
          <div className={styles.servicesInner}>
            <div>
              <div className="eyebrow">SERVICES USED</div>
              <h2 className={styles.sectionH2}>
                This engagement, as catalog services
              </h2>
              <div className={styles.serviceTags}>
                {cs.services.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    className={styles.serviceTag}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className={styles.quoteBox}>
              <span className={styles.quoteMark}>“</span>
              <div>
                <div className={styles.quoteText}>{cs.quote}</div>
                <div className={styles.quoteAttr}>{cs.quoteAttr}</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta} data-screen-label="CTA">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>{cs.ctaTitle}</h2>
              <p className={styles.ctaLede}>{cs.ctaLede}</p>
            </div>
            <CtaButton href="/contact" variant="inverse">
              BOOK A WORKING SESSION
            </CtaButton>
          </div>
          <div className={styles.ctaLinks}>
            <Link href="/case-studies">← All case studies</Link>
            <Link href="/services">Services</Link>
          </div>
        </section>
      </>
    </PageShell>
  );
}
