import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AssessmentQuiz } from "@/components/explainers/AssessmentQuiz";
import { Reveal } from "@/components/ui/Reveal";
import { assessmentLegend } from "@/lib/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "AI Readiness Assessment | Maslow AI · Free, no email required",
  },
  description:
    "Answer six questions in two minutes. Get your AI readiness stage and the services that fit it. Your answers stay in your browser unless you request the report by email.",
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
              AI READINESS ASSESSMENT · FREE, NO EMAIL REQUIRED
            </div>
            <h1
              className="h1 mz-rise"
              style={{
                animationDelay: "0.15s",
                maxWidth: 800,
                marginBottom: 22,
              }}
            >
              What is your AI readiness stage?
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 640 }}
            >
              Answer six questions to get a readiness stage and a short list of
              relevant services. If the result recommends starting with the
              foundations, it will say so. Your answers stay in your browser
              unless you choose to email yourself the report.
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
