import Image from "next/image";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { principles, team } from "@/lib/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About | Maslow AI",
  description:
    "AI should meet your needs, not the other way around. Our mission is to reduce the cost of AI adoption.",
};

export default function AboutPage() {
  return (
    <PageShell footer="compact" showCtaBand={false}>
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <Image
            className={styles.float}
            src="/assets/maslow-mark-gradient.svg"
            alt=""
            width={280}
            height={180}
          />
          <div className="wrap" style={{ position: "relative" }}>
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              ABOUT MASLOW AI
            </div>
            <h1
              className="h1 mz-rise"
              style={{
                animationDelay: "0.15s",
                maxWidth: 860,
                marginBottom: 26,
              }}
            >
              AI should meet your needs, not the other way around.
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 640 }}
            >
              We named ourselves after the hierarchy of needs for a reason: AI
              adoption fails when companies chase the peak before securing the
              base. We build from the foundation up: your data, your workflows,
              your hardware, so the impressive parts actually stand on
              something.
            </p>
          </div>
        </section>

        <section className={styles.mission} data-screen-label="Mission">
          <div className={styles.missionInner}>
            <div>
              <div className="eyebrow eyebrow-ice">OUR MISSION</div>
              <h2 className="h2" style={{ color: "#fff" }}>
                Reduce the cost of AI adoption.
              </h2>
            </div>
            <p className={styles.missionBody}>
              Enterprise AI is priced like magic. It isn&apos;t. It&apos;s
              engineering. Open models close the capability gap every quarter,
              local hardware flattens the metered bill, and a well-built harness
              outlives any single model. We pass all three of those savings on
              to you, and we put them in writing.
            </p>
          </div>
        </section>

        <section className={styles.principles} data-screen-label="Principles">
          <div className="wrap">
            <div className="eyebrow">HOW WE WORK</div>
            <h2 className="h2" style={{ marginBottom: 44 }}>
              Four commitments, in writing
            </h2>
            <div className={styles.principleGrid}>
              {principles.map((p) => (
                <Reveal key={p.num} className={styles.principle}>
                  <span
                    className={styles.principleNum}
                    style={{ color: p.accent }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <div className={styles.principleName}>{p.name}</div>
                    <div className={styles.principleDesc}>{p.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.team} data-screen-label="Team">
          <div className="wrap">
            <div className="eyebrow">THE TEAM</div>
            <h2 className="h2" style={{ marginBottom: 12 }}>
              Engineers and operators
            </h2>
            <p className={styles.teamLede}>
              People who&apos;ve shipped AI inside real enterprises.{" "}
              <span className={styles.teamHint}>
                (Drop your team photos onto the placeholders.)
              </span>
            </p>
            <div className={styles.teamGrid}>
              {team.map((m) => (
                <div key={m.role} className={styles.member}>
                  <div className={styles.photo} aria-hidden />
                  <div>
                    <div className={styles.memberRole}>{m.role}</div>
                    <div className={styles.memberName}>{m.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaBand} data-screen-label="CTA">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>
              Work with a team that builds AI you can own.
            </h2>
            <CtaButton href="/contact">BOOK A CONSULTATION</CtaButton>
          </div>
        </section>
      </>
    </PageShell>
  );
}
