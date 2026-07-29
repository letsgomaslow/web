import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceReceipt } from "@/components/evidence/EvidenceReceipt";
import { WorkflowMapper } from "@/components/explainers/WorkflowMapper";
import { ArchitectureTrackedLink } from "@/components/explainers/ArchitectureTrackedLink";
import { PageShell } from "@/components/layout/PageShell";
import { DepthDisclosure } from "@/components/ui/DepthDisclosure";
import { Reveal } from "@/components/ui/Reveal";
import {
  architectureFitBoundaries,
  architectureOwnershipEvidence,
  architectureOverview,
  architectureProductionEvidenceFor,
  buyerArchitectureStages,
} from "@/lib/content/architecture";
import {
  evidenceStatusLabel,
  type EvidenceReceiptData,
} from "@/lib/content/evidence";
import { homeCases } from "@/lib/content/home";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "How an AI employee carries a workflow",
  description:
    "See what an AI employee prepares, where a person decides, and what evidence remains before you map one waiting workflow.",
};

const productionCases = homeCases.filter((item) => !item.openSlot);

function CompactEvidenceReceipt({
  evidence,
}: {
  evidence: EvidenceReceiptData;
}) {
  return (
    <article
      className={styles.compactEvidence}
      data-evidence-receipt
      data-visual-ready
    >
      <div className={styles.compactEvidenceHeading}>
        <h4>Evidence receipt</h4>
        <span data-evidence-status={evidence.status}>
          {evidenceStatusLabel[evidence.status]}
        </span>
      </div>
      <dl>
        <div>
          <dt>Scope</dt>
          <dd>{evidence.scope}</dd>
        </div>
        <div>
          <dt>Limitations</dt>
          <dd>{evidence.limitations}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function AiEmployeeArchitecturePage() {
  return (
    <PageShell highlightConcepts>
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div className={`${styles.crumb} mz-rise`}>
              <Link href="/#concepts">Concepts</Link> /{" "}
              <span>How an AI employee carries work</span>
            </div>
            <div className={styles.heroGrid}>
              <div>
                <div
                  className="eyebrow mz-rise"
                  style={{ animationDelay: "0.05s" }}
                >
                  AI EMPLOYEE ARCHITECTURE
                </div>
                <h1
                  className={`${styles.title} mz-rise`}
                  style={{ animationDelay: "0.15s" }}
                >
                  Turn one waiting workflow into supervised, reviewable work.
                </h1>
              </div>
              <div className={styles.heroCopy}>
                <p
                  className={`${styles.lede} mz-rise`}
                  style={{ animationDelay: "0.3s" }}
                >
                  Start with the delayed deliverable. The AI employee prepares
                  the work, a named person keeps the consequential decision,
                  and the result returns with its evidence and next owner.
                </p>
                <div
                  className={`${styles.heroActions} mz-rise`}
                  style={{ animationDelay: "0.45s" }}
                  data-screen-label="CTA"
                >
                  <ArchitectureTrackedLink
                    href="/contact"
                    className="cta"
                    eventName="Working session CTA clicked"
                    eventData={{ location: "architecture-hero" }}
                  >
                    BOOK A WORKING SESSION
                  </ArchitectureTrackedLink>
                  <Link href="#workflow-mapper" className="text-link">
                    MAP A WAITING WORKFLOW&nbsp;&nbsp;&gt;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ownership} data-screen-label="Ownership Path">
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow">ONE WORKFLOW · FOUR RESPONSIBILITIES</div>
                <h2 className="h2">See the ownership boundary first.</h2>
              </div>
              <p>
                The technical components matter after the team agrees who owns
                the result, which decision stays human, and what evidence must
                remain.
              </p>
            </Reveal>
            <ol className={styles.ownershipPath}>
              {buyerArchitectureStages.map((stage) => (
                <li key={stage.num}>
                  <span>{stage.num}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.summary}</p>
                </li>
              ))}
            </ol>
            <div className={styles.ownershipContext}>
              <DepthDisclosure
                className={styles.inspectionDisclosure}
                collapsedLabel="Review what each stage should expose"
                expandedLabel="Hide the stage inspection cues"
              >
                <dl className={styles.inspectionList}>
                  {buyerArchitectureStages.map((stage) => (
                    <div key={stage.num}>
                      <dt>
                        {stage.num} · {stage.title}
                      </dt>
                      <dd>{stage.inspect}</dd>
                    </div>
                  ))}
                </dl>
              </DepthDisclosure>
              <EvidenceReceipt
                evidence={architectureOwnershipEvidence}
                title="OWNERSHIP MODEL STATUS"
                headingLevel="h3"
              />
            </div>
          </div>
        </section>

        <section
          className={styles.production}
          id="production"
          data-screen-label="Production Evidence"
        >
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow eyebrow-ice">PRODUCTION EVIDENCE</div>
                <h2 className="h2">Inspect what is working today.</h2>
              </div>
              <p>
                These are current engagements. The mapper labels patterns
                without matching production evidence as illustrative.
              </p>
            </Reveal>
            <div className={styles.productionGrid}>
              {productionCases.map((item) => {
                const evidence = architectureProductionEvidenceFor(item.href);
                return (
                  <Reveal className={styles.productionItem} key={item.href}>
                    <ArchitectureTrackedLink
                      href={item.href}
                      className={styles.productionCard}
                      eventName="Architecture production evidence clicked"
                      eventData={{ caseStudy: item.href, location: "buyer-view" }}
                    >
                      <span>
                        PRODUCTION ENGAGEMENT · {item.sector.split(" · ")[0]}
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                      <strong>{item.result}</strong>
                      <em>VIEW PRODUCTION EVIDENCE&nbsp;&nbsp;&gt;</em>
                    </ArchitectureTrackedLink>
                    {evidence ? (
                      <CompactEvidenceReceipt evidence={evidence} />
                    ) : null}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className={styles.mapperSection}
          id="workflow-mapper"
          data-screen-label="Workflow Mapper"
        >
          <div className="wrap">
            <Reveal className={styles.mapperIntro}>
              <div className="eyebrow">90-SECOND WORKFLOW MAPPER</div>
              <h2 className="h2">Find the work waiting on a busy person.</h2>
              <p>
                Four category choices produce a first ownership path. No email
                is required, and the direct booking option remains available at
                every stage.
              </p>
            </Reveal>
            <WorkflowMapper />
          </div>
        </section>

        <section className={styles.boundaries} data-screen-label="Fit Boundaries">
          <div className="wrap">
            <Reveal className={styles.sectionHead}>
              <div>
                <div className="eyebrow">WHEN TO STOP</div>
                <h2 className="h2">Some workflows are not ready to deploy.</h2>
              </div>
              <p>
                A useful assessment can recommend ownership or knowledge work
                before it recommends an AI employee.
              </p>
            </Reveal>
            <div className={styles.boundaryGrid}>
              {architectureFitBoundaries.map((boundary) => (
                <article key={boundary.status}>
                  <span>{boundary.status}</span>
                  <h3>{boundary.title}</h3>
                  <p>{boundary.body}</p>
                </article>
              ))}
            </div>
            <Link href="/assessment" className="text-link">
              TAKE THE 2-MINUTE READINESS ASSESSMENT&nbsp;&nbsp;&gt;
            </Link>
          </div>
        </section>

        <section className={styles.technicalBand} data-screen-label="Technical Reference">
          <div className={styles.technicalInner}>
            <div>
              <div className="eyebrow eyebrow-ice">OPTIONAL TECHNICAL DEPTH</div>
              <h2>Need the components, controls, and improvement loop?</h2>
              <p>
                Open the full three-view reference, illustrative workflows, and
                supporting architecture articles.
              </p>
            </div>
            <ArchitectureTrackedLink
              href={architectureOverview.technicalHref}
              className="cta cta-inverse"
              eventName="Technical architecture opened"
              eventData={{ location: "architecture-buyer-view" }}
            >
              OPEN THE TECHNICAL REFERENCE
            </ArchitectureTrackedLink>
          </div>
        </section>

        <section className={styles.cta} data-screen-label="CTA">
          <div className={styles.ctaInner}>
            <div>
              <h2>Bring one delayed deliverable. Leave with an ownership map.</h2>
              <p>
                A 30-minute working session identifies the source material,
                preparation work, human decision, and evidence the workflow
                requires.
              </p>
            </div>
            <ArchitectureTrackedLink
              href="/contact"
              className="cta cta-inverse"
              eventName="Working session CTA clicked"
              eventData={{ location: "architecture-footer" }}
            >
              BOOK A WORKING SESSION
            </ArchitectureTrackedLink>
          </div>
        </section>
      </>
    </PageShell>
  );
}
