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
    "A working session, not a sales call. Thirty minutes, one workflow, and a map of where AI pays in it — you keep the map either way.",
};

const steps = [
  {
    num: "01",
    color: "#73C1AE",
    title: "We listen first",
    desc: "Your workflow, your constraints, your data reality.",
  },
  {
    num: "02",
    color: "#A070A6",
    title: "You get a sketch, free",
    desc: "A one-page architecture and cost estimate within two business days.",
  },
  {
    num: "03",
    color: "#EBA93D",
    title: "No lock-in, ever",
    desc: "Everything we build is yours: models, pipelines, hardware.",
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
              A working session, not a sales call.
            </h1>
            <p
              className={`${styles.lede} mz-rise`}
              style={{ animationDelay: "0.3s" }}
            >
              Thirty minutes. Bring one workflow that annoys you — quoting,
              intake, reporting, anything that queues behind a busy person.
              We&apos;ll map where AI pays in it, and tell you plainly if it
              doesn&apos;t. You leave with the map either way.
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
