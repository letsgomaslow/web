import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AssessmentQuiz } from "@/components/explainers/AssessmentQuiz";
import { Reveal } from "@/components/ui/Reveal";
import { assessmentLegend } from "@/lib/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Readiness Assessment | Maslow AI · Free, no email required",
  description:
    "Six questions, two minutes, instant result. Get your stage on the AI transformation journey and the services that fit it. Nothing sent anywhere unless you ask.",
};

export default function AssessmentPage() {
  return (
    <PageShell footer="compact">
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              AI TRANSFORMATION ASSESSMENT · FREE, NO EMAIL REQUIRED
            </div>
            <h1
              className="h1 mz-rise"
              style={{
                animationDelay: "0.15s",
                maxWidth: 800,
                marginBottom: 22,
              }}
            >
              Where are you on the journey?
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 640 }}
            >
              Six questions, two minutes. You&apos;ll get a stage on the
              transformation journey and the services that fit it, including
              &ldquo;start with everything&rdquo; if that&apos;s the honest
              answer. Your answers stay in your browser unless you choose to
              email yourself the report.
            </p>
          </div>
        </section>

        <section className={styles.quiz} data-screen-label="Assessment">
          <div className="wrap">
            <AssessmentQuiz />
          </div>
        </section>

        <section className={styles.legend} data-screen-label="Stages Legend">
          <div className="wrap">
            <div className="eyebrow">THE SCALE</div>
            <h2 className="h2" style={{ marginBottom: 36 }}>
              The five stages we score against
            </h2>
            <div className={styles.legendGrid}>
              {assessmentLegend.map((l) => (
                <Reveal key={l.tag} className={styles.legendCard}>
                  <div className={styles.legendTag}>{l.tag}</div>
                  <div className={styles.legendName}>{l.name}</div>
                  <div className={styles.legendDesc}>{l.desc}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </>
    </PageShell>
  );
}
