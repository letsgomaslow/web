import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { ctaPrimaryLabel } from "@/lib/brand";
import { caseStudiesIndex } from "@/lib/content/case-studies";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Case Studies | Maslow AI · Proof, not promises" },
  description:
    "Real engagements with honest numbers: AI employees in Microsoft Teams, contract review with citations, and 90-day foundations you can audit.",
};

function CaseCard({ cs }: { cs: (typeof caseStudiesIndex)[number] }) {
  const inner = (
    <>
      <div className={styles.art} style={{ background: cs.art }}>
        {cs.illustrative ? (
          <span className={styles.illustrativePill}>
            ILLUSTRATIVE SCENARIO · NOT A CLIENT
          </span>
        ) : null}
        <span className={styles.sector}>{cs.sector}</span>
        <div className={styles.metricBlock}>
          <div className={styles.metric}>{cs.metric}</div>
          <div className={styles.metricLabel}>{cs.metricLabel}</div>
          {cs.metricGloss ? (
            <div className={styles.metricGloss}>{cs.metricGloss}</div>
          ) : null}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{cs.title}</div>
        <div className={styles.cols}>
          <div>
            <div className={styles.colLabel} data-tone="plum">
              CHALLENGE
            </div>
            <div className={styles.colText}>{cs.challenge}</div>
          </div>
          <div>
            <div className={styles.colLabel} data-tone="ice">
              SOLUTION
            </div>
            <div className={styles.colText}>{cs.solution}</div>
          </div>
        </div>
        <div className={styles.results}>
          {cs.results.map((r) => (
            <span key={r} className={styles.result}>
              {r}
            </span>
          ))}
        </div>
        <div className={styles.foot}>
          <div className={styles.stack}>
            {cs.stack.map((t) => (
              <span key={t} className={styles.stackTag}>
                {t}
              </span>
            ))}
          </div>
          {cs.href !== "#" && (
            <span className="text-link">VIEW CASE STUDY&nbsp;&nbsp;&gt;</span>
          )}
        </div>
      </div>
    </>
  );

  if (cs.href === "#") {
    return <div className={styles.card}>{inner}</div>;
  }

  return (
    <Link href={cs.href} className={styles.card}>
      {inner}
    </Link>
  );
}

export default function CaseStudiesPage() {
  const real = caseStudiesIndex.filter((c) => !c.illustrative);
  const illustrative = caseStudiesIndex.filter((c) => c.illustrative);

  return (
    <PageShell footer="compact" showCtaBand={false}>
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              CASE STUDIES
            </div>
            <h1
              className="h1 mz-rise"
              style={{ animationDelay: "0.15s", marginBottom: 20 }}
            >
              Proof, not promises
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 680 }}
            >
              How real organizations used context engineering, agentic harnesses,
              and owned infrastructure to change what a workday looks like.
              Every number below survived contact with production.
            </p>
          </div>
        </section>

        <section className={styles.list} data-screen-label="Case Blocks">
          <div className={styles.listInner}>
            {real.map((cs) => (
              <Reveal key={cs.slug}>
                <CaseCard cs={cs} />
              </Reveal>
            ))}

            <Reveal>
              <div className={styles.illustrativeIntro}>
                <h2 className={styles.illustrativeTitle}>
                  What a typical engagement looks like.
                </h2>
                <p className={styles.illustrativeBody}>
                  The scenarios below are illustrative composites: real
                  architectures, representative numbers, no named client behind
                  them. We publish them so you can see the shape of the work.
                  The two engagements above are real and referenceable.
                </p>
              </div>
            </Reveal>

            {illustrative.map((cs) => (
              <Reveal key={cs.slug}>
                <CaseCard cs={cs} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.cta} data-screen-label="CTA">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>
                Your operation could be the next one here.
              </h2>
              <p className={styles.ctaLede}>
                Start with a 30-minute working session. We&apos;ll map where AI
                pays in your workflows, and tell you plainly if it doesn&apos;t
                yet.
              </p>
            </div>
            <CtaButton href="/contact">{ctaPrimaryLabel}</CtaButton>
          </div>
        </section>
      </>
    </PageShell>
  );
}
