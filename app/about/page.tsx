import Image from "next/image";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import {
  ctaPrimaryLabel,
  founderHeadshot,
  socialLinks,
} from "@/lib/brand";
import { founder, principles, standingLine } from "@/lib/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: { absolute: "About | Maslow AI · Founder-led AI systems" },
  description:
    "Led by a former CIO/CTO with twenty years of enterprise technology behind him. Four commitments in writing, and a mission to reduce the cost of AI adoption.",
  openGraph: {
    title: { absolute: "About | Maslow AI · Founder-led AI systems" },
    description:
      "Led by a former CIO/CTO with twenty years of enterprise technology behind him. Four commitments in writing, and a mission to reduce the cost of AI adoption.",
    images: [
      {
        url: founderHeadshot.src,
        alt: founderHeadshot.alt,
        width: founderHeadshot.width,
        height: founderHeadshot.height,
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <PageShell footer="compact" showCtaBand={false}>
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <Image
            className={styles.float}
            src="/assets/logos/maslow-symbol-full-color.png"
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
              Make useful AI easier to put to work.
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 640 }}
            >
              Client work keeps bringing us back to the same foundations: usable
              knowledge, connected tools, reusable skills, and a way to see what
              happened. Maslow AI-OS is our free starting point for that work,
              alongside the implementation help that makes it fit an organization.
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
              We want more of an implementation budget to go toward the work
              that is specific to your business. Maslow AI-OS brings a
              customizable Linux workspace into that effort. Our client work
              connects the information, systems, and review steps around a
              useful task. The OS is in development; client projects can start
              on the infrastructure you already have.
            </p>
          </div>
        </section>

        <section className={styles.principles} data-screen-label="Principles">
          <div className="wrap">
            <div className="eyebrow">HOW WE WORK</div>
            <h2 className="h2" style={{ marginBottom: 44 }}>
              The decisions we build around
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
            <Reveal className={styles.standing}>
              <div className="eyebrow">HOW WE RUN</div>
              <p className={styles.standingBody}>{standingLine}</p>
            </Reveal>
          </div>
        </section>

        <section className={styles.team} data-screen-label="Founder">
          <div className="wrap">
            <div className="eyebrow">WHO YOU&apos;LL WORK WITH</div>
            <h2 className="h2" style={{ marginBottom: 36 }}>
              Work directly with the founder.
            </h2>
            <Reveal className={styles.founder}>
              <Image
                className={styles.founderPhoto}
                src={founderHeadshot.src}
                alt={founderHeadshot.alt}
                width={founderHeadshot.width}
                height={founderHeadshot.height}
                sizes="200px"
              />
              <div>
                <div className={styles.founderName}>
                  {founder.name} · {founder.role}
                </div>
                <a
                  className={styles.founderLink}
                  href={socialLinks.founderLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RAKESH ON LINKEDIN&nbsp;&nbsp;↗
                </a>
                <p className={styles.founderBio}>{founder.bio}</p>
                <p className={styles.founderPull}>{founder.pull}</p>
                <p className={styles.founderBench}>{founder.bench}</p>
              </div>
            </Reveal>
            <Reveal className={styles.elsewhere}>
              <span className="eyebrow">ELSEWHERE</span>
              <p>{founder.elsewhere}</p>
            </Reveal>
          </div>
        </section>

        <section className={styles.ctaBand} data-screen-label="CTA">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>
              Bring your work. We’ll bring the experience.
            </h2>
            <CtaButton href="/contact" variant="inverse">
              {ctaPrimaryLabel}
            </CtaButton>
          </div>
        </section>
      </>
    </PageShell>
  );
}
