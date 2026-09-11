import Image from "next/image";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  contactEmail,
  founderHeadshot,
  socialLinks,
} from "@/lib/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: { absolute: "Contact | Maslow AI · Request a working session" },
  description:
    "Bring one workflow to a 30-minute working session. Leave with a map of where AI could pay and what the first build would require.",
};

const steps = [
  {
    num: "01",
    color: "var(--color-ice-text)",
    title: "We listen first",
    desc: "Your team, the work, and the systems you already use.",
  },
  {
    num: "02",
    color: "var(--color-plum-text)",
    title: "We agree on a starting point",
    desc: "A first conversation to explore fit. Any implementation scope and fee are agreed separately.",
  },
  {
    num: "03",
    color: "var(--color-gold-text)",
    title: "You keep the work",
    desc: "For paid work, ownership, documentation, and handover are defined in the proposal.",
  },
];

export default function ContactPage() {
  return (
    <PageShell footer="compact">
      <section className={styles.section} data-screen-label="Contact">
        <div className={styles.grid}>
          <div>
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              CONTACT · 30-MINUTE WORKING SESSION
            </div>
            <h1
              className={`${styles.title} mz-rise`}
              style={{ animationDelay: "0.15s" }}
            >
              Let’s find your next useful step.
            </h1>
            <p
              className={`${styles.lede} mz-rise`}
              style={{ animationDelay: "0.3s" }}
            >
              Bring a workflow, a pile of hard-to-find information, or questions
              about the AI-OS preview. We will explore what is useful, what your
              team already has, and where to begin. You can work with Maslow on
              your existing systems without installing a new operating system.
            </p>
            <div
              className={`${styles.steps} mz-rise`}
              style={{ animationDelay: "0.45s" }}
            >
              {steps.map((s) => (
                <div key={s.num} className={styles.step}>
                  <span className={styles.stepNum} style={{ color: s.color }}>
                    {s.num}
                  </span>
                  <div>
                    <div className={styles.stepTitle}>{s.title}</div>
                    <div className={styles.stepDesc}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.links}>
              <a href={`mailto:${contactEmail}`} className={styles.email}>
                {contactEmail}
              </a>
              <a
                href={socialLinks.companyLinkedIn}
                className={styles.social}
                target="_blank"
                rel="noopener noreferrer"
              >
                Maslow AI on LinkedIn ↗
              </a>
              <a
                href={socialLinks.github}
                className={styles.social}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          <div
            className={`${styles.card} mz-rise`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className={styles.cardTitle}>Request a working session</div>
            <div className={styles.host}>
              <Image
                className={styles.hostPhoto}
                src={founderHeadshot.src}
                alt={founderHeadshot.alt}
                width={founderHeadshot.width}
                height={founderHeadshot.height}
                sizes="56px"
              />
              <div>
                <span className={styles.hostLabel}>YOUR SESSION IS WITH</span>
                <a
                  className={styles.hostName}
                  href={socialLinks.founderLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rakesh David ↗
                </a>
                <span className={styles.hostRole}>Founder &amp; CEO</span>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
