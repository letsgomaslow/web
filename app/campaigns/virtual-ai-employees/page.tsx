import Image from "next/image";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { BookForm } from "@/components/forms/BookForm";
import { CtaButton } from "@/components/ui/CtaButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Put Your First AI Employee to Work | Maslow AI",
  description:
    "An AI employee that triages your inbox, drafts responses from your documents, and routes decisions to your team in Teams, Slack, or email.",
};

const pains = [
  {
    num: "01",
    color: "#A070A6",
    title: "The inbox never empties",
    desc: "Skilled people spend hours on triage, routing and first drafts that follow the same pattern every day.",
  },
  {
    num: "02",
    color: "#73C1AE",
    title: "The answers exist, somewhere",
    desc: "Policies, contracts and precedent live in files nobody can search. Every answer is re-derived from scratch.",
  },
  {
    num: "03",
    color: "#EBA93D",
    title: "Chatbots didn't help",
    desc: "Generic AI tools answer generic questions. They don't know your clients, your terms or your way of working.",
  },
];

const steps = [
  {
    when: "WEEK 1–2",
    title: "We learn your workflow",
    desc: "Your files become a knowledge graph; your procedures become skills the agent can follow.",
  },
  {
    when: "WEEK 3–4",
    title: "Your teammate goes live",
    desc: "Connected to Teams, Slack or email. Every action gated by human approval while trust builds.",
  },
  {
    when: "ONGOING",
    title: "We improve quality and unit cost",
    desc: "Review feedback improves the workflow. When volume justifies it, we can move suitable models onto your hardware.",
  },
];

export default function VirtualAiEmployeesCampaignPage() {
  return (
    <PageShell footer="compact" minimalNav>
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <Image
            className={styles.float}
            src="/assets/maslow-mark-white.svg"
            alt=""
            width={300}
            height={193}
          />
          <div className={styles.heroInner}>
            <div>
              <div
                className={`${styles.audience} mz-rise`}
                style={{ animationDelay: "0.05s" }}
              >
                FOR PROFESSIONAL SERVICES FIRMS
              </div>
              <h1
                className={`${styles.title} mz-rise`}
                style={{ animationDelay: "0.15s" }}
              >
                Put your first AI employee to work.
              </h1>
              <p
                className={`${styles.subhead} mz-rise`}
                style={{ animationDelay: "0.3s" }}
              >
                It triages your inbox, drafts responses from your documents,
                and routes decisions to your team inside the tools your firm
                already uses.
              </p>
              <div
                className={`${styles.checks} mz-rise`}
                style={{ animationDelay: "0.45s" }}
              >
                <div>
                  <span>✓</span>Live in your Teams, Slack or email in weeks, not
                  quarters
                </div>
                <div>
                  <span>✓</span>Grounded in your documents, with citations on
                  every answer
                </div>
                <div>
                  <span>✓</span>Human approval on every consequential action
                </div>
              </div>
            </div>
            <div
              id="book"
              className={`${styles.bookCard} mz-rise`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className={styles.bookTitle}>
                Book a 30-minute consultation
              </div>
              <div className={styles.bookLede}>
                We&apos;ll map one workflow where an AI employee could pay for
                itself.
              </div>
              <BookForm ctaLabel="BOOK A WORKING SESSION" />
            </div>
          </div>
        </section>

        <section className={styles.pain} data-screen-label="Pain Points">
          <div className="wrap">
            <div className="eyebrow">THE PROBLEM</div>
            <h2 className="h2" style={{ marginBottom: 40, maxWidth: 640 }}>
              Sound familiar?
            </h2>
            <div className={styles.painGrid}>
              {pains.map((p) => (
                <div key={p.num} className={styles.painCard}>
                  <div className={styles.painNum} style={{ color: p.color }}>
                    {p.num}
                  </div>
                  <div className={styles.painTitle}>{p.title}</div>
                  <div className={styles.painDesc}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.path} data-screen-label="How It Works">
          <div className="wrap">
            <div className="eyebrow eyebrow-ice">THE PATH</div>
            <h2 className={styles.pathTitle}>
              What happens in the first four weeks
            </h2>
            <div className={styles.pathGrid}>
              {steps.map((s) => (
                <div key={s.when} className={styles.pathStep}>
                  <div className={styles.pathWhen}>{s.when}</div>
                  <div className={styles.pathName}>{s.title}</div>
                  <div className={styles.pathDesc}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.final} data-screen-label="Final CTA">
          <div className={styles.finalInner}>
            <h2 className={styles.finalTitle}>
              Start with the workflow already consuming your team&apos;s{" "}
              <span className={styles.hl}>time</span>.
            </h2>
            <p className={styles.finalLede}>
              Bring one workflow to a 30-minute session. We will estimate what
              an AI employee would cost and where the return could come from.
            </p>
            <CtaButton href="#book">BOOK A WORKING SESSION</CtaButton>
          </div>
        </section>
      </>
    </PageShell>
  );
}
