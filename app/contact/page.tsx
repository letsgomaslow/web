import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ContactForm } from "@/components/forms/ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact | Maslow AI",
  description:
    "Book a 30-minute working session. Bring one painful workflow — we'll sketch the harness, data pipeline and cost curve.",
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
    desc: "A one-page architecture and cost estimate within two days.",
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
              Let&apos;s find where AI pays in your business.
            </h1>
            <p
              className={`${styles.lede} mz-rise`}
              style={{ animationDelay: "0.3s" }}
            >
              A 30-minute working session, not a sales pitch. Bring one painful
              workflow; we&apos;ll sketch the harness, the data pipeline and the
              cost curve on the call.
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
              <a href="mailto:hello@maslow.ai" className={styles.email}>
                hello@maslow.ai
              </a>
              <span className={styles.social}>LinkedIn ↗</span>
              <span className={styles.social}>GitHub ↗</span>
            </div>
          </div>

          <div
            className={`${styles.card} mz-rise`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className={styles.cardTitle}>Book a consultation</div>
            <ContactForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
