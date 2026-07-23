import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CatchChips } from "@/components/ui/CatchChips";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { ctaPrimaryLabel } from "@/lib/brand";
import { twoDoors } from "@/lib/content/engagement";
import { serviceCatalog, serviceStages } from "@/lib/content/services";
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

        <section className={styles.journey} data-screen-label="Journey Map">
          <div className={styles.journeyInner}>
            <div className={styles.stages}>
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
                  stroke="rgba(115,193,174,.5)"
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
              {serviceStages.map((st) => (
                <a key={st.num} href={st.anchor} className={styles.stage}>
                  <div className={styles.stageNum}>{st.num}</div>
                  <div className={styles.stageName}>{st.name}</div>
                  <div className={styles.stageQ}>{st.q}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.catalog} data-screen-label="Service Catalog">
          <div className={styles.catalogInner}>
            {serviceCatalog.map((grp) => (
              <Reveal key={grp.id} id={grp.id} className={styles.group}>
                <div className={styles.groupHead}>
                  <span
                    className={styles.groupNum}
                    style={{ color: grp.accent }}
                  >
                    {grp.num}
                  </span>
                  <h2 className={styles.groupName}>{grp.name}</h2>
                </div>
                <p className={styles.groupDesc}>{grp.desc}</p>
                <div className={styles.serviceGrid}>
                  {grp.services.map((s) => (
                    <div key={s.name} className={styles.serviceCard}>
                      <div className={styles.serviceName}>{s.name}</div>
                      <div className={styles.serviceDesc}>{s.desc}</div>
                      <div
                        className={styles.serviceFit}
                        style={{ borderLeftColor: grp.accent }}
                      >
                        <b>For you if:</b> {s.fit}
                      </div>
                      <div className={styles.deliverable}>{s.deliverable}</div>
                      {s.catchTrail ? (
                        <CatchChips
                          steps={s.catchTrail}
                          ariaLabel="What the supervision log records"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

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
              <CtaButton href="/contact">{ctaPrimaryLabel}</CtaButton>
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
