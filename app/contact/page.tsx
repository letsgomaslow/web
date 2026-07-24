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
  title: { absolute: "Contact | Maslow AI · Book a working session" },
  description:
    "Bring one workflow to a 30-minute working session. Leave with a map of where AI could pay and what the first build would require.",
};

const steps = [
  {
    num: "01",
    color: "var(--color-ice-text)",
    title: "We listen first",
    desc: "Your workflow, your constraints, your data reality.",
  },
  {
    num: "02",
    color: "var(--color-plum-text)",
    title: "You get a sketch, free",
    desc: "A one-page architecture and cost estimate within two business days.",
  },
  {
    num: "03",
    color: "var(--color-gold-text)",
    title: "You keep the work",
    desc: "Code, pipelines, documentation, and configured infrastructure remain yours.",
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
              Bring one workflow. Leave with a plan.
            </h1>
            <p
              className={`${styles.lede} mz-rise`}
              style={{ animationDelay: "0.3s" }}
            >
              Bring quoting, intake, reporting, or another task that keeps
              queuing behind a busy person. In 30 minutes, we will map the
              workflow, identify where AI could help, and outline the first
              build. You keep the map even if we recommend no further work.
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
            <div className={styles.cardTitle}>Book a working session</div>
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
