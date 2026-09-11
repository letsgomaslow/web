import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { TaxonomyCapsule } from "@/components/ui/TaxonomyCapsule";
import { ctaPrimaryLabel } from "@/lib/brand";
import { caseStudiesIndex } from "@/lib/content/case-studies";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/case-studies" },
  title: { absolute: "Client Work | Maslow AI" },
  description:
    "Deployed client implementations with the problem, delivery path, current evidence, limitations, and next measurement kept visible.",
};

function CaseCard({ cs }: { cs: (typeof caseStudiesIndex)[number] }) {
  const inner = (
    <>
      <div className={styles.art} style={{ background: cs.art }}>
        <div className={styles.artMeta}>
          <TaxonomyCapsule
            tone="inverse"
            size="compact"
            data={{
              "data-card-evidence-status": "production",
            }}
          >
            {cs.evidenceLabel}
          </TaxonomyCapsule>
          <TaxonomyCapsule
            tone="inverse"
            size="compact"
            className={styles.sectorCapsule}
            data={{ "data-card-sector": "true" }}
          >
            {cs.sector}
          </TaxonomyCapsule>
        </div>
        <div className={styles.metricBlock}>
          <div className={styles.metric}>{cs.metric}</div>
          <div className={styles.metricLabel}>{cs.metricLabel}</div>
          {cs.metricGloss ? (
            <div className={styles.metricGloss}>{cs.metricGloss}</div>
          ) : null}
        </div>
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{cs.title}</h2>
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
            <TaxonomyCapsule key={r} tone="soft">
              {r}
            </TaxonomyCapsule>
          ))}
        </div>
        <div className={styles.foot}>
          <div className={styles.stack}>
            {cs.stack.map((t) => (
              <TaxonomyCapsule key={t} tone="outline" size="compact">
                {t}
              </TaxonomyCapsule>
            ))}
          </div>
          {cs.href ? (
            <span className={`${styles.caseStudyCta} text-link`} aria-hidden>
              VIEW CASE STUDY
              &nbsp;&nbsp;&gt;
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  const card = (
    <article
      className={`${styles.card} ${cs.href ? styles.linkedCard : ""}`}
      data-card-kind="case-study"
      data-card-slug={cs.slug}
    >
      {inner}
    </article>
  );

  if (!cs.href) return card;

  return (
    <Link
      href={cs.href}
      className={styles.cardLink}
      aria-label={`View case study: ${cs.title}`}
    >
      {card}
    </Link>
  );
}

export default function CaseStudiesPage() {
  return (
    <PageShell footer="compact" showCtaBand={false}>
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              DEPLOYED CLIENT IMPLEMENTATIONS
            </div>
            <h1
              className="h1 mz-rise"
              style={{ animationDelay: "0.15s", marginBottom: 20 }}
            >
              What changed, what shipped, and what remains
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 680 }}
            >
              Two client systems with the problem, delivery path, evidence
              boundary, and next measurement kept visible.
            </p>
          </div>
        </section>

        <section className={styles.list} data-screen-label="Case Blocks">
          <div className={styles.listInner}>
            {caseStudiesIndex.map((cs) => (
              <Reveal key={cs.slug}>
                <CaseCard cs={cs} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.examples} data-screen-label="Illustrative Examples">
          <div className={styles.examplesInner}>
            <div>
              <div className="eyebrow eyebrow-ice">ILLUSTRATIVE EXAMPLES</div>
              <h2 className={styles.examplesTitle}>
                Exploring what this could look like in your organization?
              </h2>
              <p className={styles.examplesLede}>
                Resources keeps representative workflow patterns separate from
                client evidence, with every example labeled by status.
              </p>
            </div>
            <CtaButton href="/resources" variant="inverse">
              EXPLORE RESOURCES
            </CtaButton>
          </div>
        </section>

        <section className={styles.cta} data-screen-label="CTA">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>
                Which waiting workflow should move first?
              </h2>
              <p className={styles.ctaLede}>
                Start with a working session. We will map the owner, source
                knowledge, procedure, controls, and evidence needed to move it.
              </p>
            </div>
            <CtaButton href="/contact" variant="inverse">
              {ctaPrimaryLabel}
            </CtaButton>
          </div>
        </section>
      </>
    </PageShell>
  );
}
