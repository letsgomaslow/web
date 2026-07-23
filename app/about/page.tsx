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
  title: { absolute: "About | Maslow AI · Founder-led AI systems" },
  description:
    "Led by a former CIO/CTO with twenty years of enterprise technology behind him. Four commitments in writing, and a mission to reduce the cost of AI adoption.",
  openGraph: {
    title: "About | Maslow AI · Founder-led AI systems",
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
              Build AI around the systems your company already trusts.
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 640 }}
            >
              The hierarchy of needs behind our name shapes how we work. We
              begin with your data, workflows, risk limits, and infrastructure.
              Once that base is sound, an AI employee has something dependable
              to work from.
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
              Enterprise AI projects often bundle strategy, software, and
              infrastructure into one opaque price. We separate those decisions.
              Open models can reduce licensing costs, local hardware can lower
              high-volume inference costs, and a well-built harness can outlast
              any single model. Your proposal shows the scope and price of each.
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
              Work with a team that builds AI you can own.
            </h2>
            <CtaButton href="/contact">{ctaPrimaryLabel}</CtaButton>
          </div>
        </section>
      </>
    </PageShell>
  );
}
