"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  assessmentQuestions,
  assessmentRecMap,
  assessmentStages,
} from "@/lib/content/site";
import styles from "./AssessmentQuiz.module.css";

export function AssessmentQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    assessmentQuestions.map(() => null),
  );
  const [showEmail, setShowEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [emailError, setEmailError] = useState("");

  const answered = answers.filter((x) => x !== null).length;
  const done = answered === 6;
  const total = answers.reduce<number>((s, x) => s + (x ?? 0), 0);

  let stageIdx = 0;
  if (done) {
    stageIdx =
      total <= 3 ? 0 : total <= 7 ? 1 : total <= 11 ? 2 : total <= 15 ? 3 : 4;
  }
  const stage = assessmentStages[stageIdx];

  let recs: { name: string; why: string; href: string }[] = [];
  if (done) {
    if (total <= 3) {
      recs = [
        {
          name: "End-to-end AI transformation",
          why: "All five stages, one accountable team",
          href: "/services",
        },
        {
          name: "AI readiness assessment",
          why: "The deeper, on-site version of this quiz",
          href: "/services#assess",
        },
        {
          name: "Cost & architecture sketch",
          why: "A board-ready business case first",
          href: "/services#assess",
        },
      ];
    } else {
      recs = answers
        .map((v, i) => ({ v: v ?? 0, i }))
        .sort((x, y) => x.v - y.v)
        .slice(0, 3)
        .map(({ i }) => assessmentRecMap[i]);
    }
  }

  const stagePct = done
    ? `${((stageIdx + 1) / 5) * 100}%`
    : `${(answered / 6) * 20}%`;

  async function onEmailReport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailStatus("loading");
    setEmailError("");
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "assessment-report",
          name: "Assessment report request",
          email,
          message: `Stage: ${stage.tag} ${stage.name}\nScore total: ${total}\nRecommended: ${recs.map((r) => r.name).join(", ")}`,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "That didn't send. Try again.");
      }
      setEmailStatus("success");
      form.reset();
    } catch (err) {
      setEmailStatus("error");
      setEmailError(
        err instanceof Error ? err.message : "That didn't send. Try again.",
      );
    }
  }

  return (
    <div className={styles.layout}>
      <div className={styles.questions}>
        {assessmentQuestions.map((q, qi) => (
          <div key={q.dim} className={styles.question}>
            <div className={styles.qHead}>
              <span className={styles.qNum}>0{qi + 1}</span>
              <div>
                <div className={styles.qTitle}>{q.title}</div>
                <div className={styles.qDim}>{q.dim}</div>
              </div>
            </div>
            <div className={styles.options}>
              {q.options.map((text, oi) => {
                const sel = answers[qi] === oi;
                return (
                  <button
                    key={text}
                    type="button"
                    className={styles.option}
                    data-selected={sel || undefined}
                    onClick={() =>
                      setAnswers((prev) => {
                        const next = prev.slice();
                        next[qi] = oi;
                        return next;
                      })
                    }
                  >
                    {text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <aside className={styles.panel}>
        <div className={styles.panelHead}>
          <span>YOUR RESULT</span>
          <span className={styles.progress}>{answered} / 6 answered</span>
        </div>
        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: stagePct }} />
        </div>

        {done ? (
          <div>
            <div className={styles.stageTag}>{stage.tag}</div>
            <div className={styles.stageName}>{stage.name}</div>
            <div className={styles.stageDesc}>{stage.desc}</div>
            <p className={styles.candor}>
              If your score says AI doesn&apos;t pay here yet, that&apos;s a
              real answer — take it. The stages above tell you what would change
              it.
            </p>
            <div className={styles.recLabel}>RECOMMENDED FOR YOU</div>
            <div className={styles.recs}>
              {recs.map((r) => (
                <Link key={r.name} href={r.href} className={styles.rec}>
                  <div>
                    <div className={styles.recName}>{r.name}</div>
                    <div className={styles.recWhy}>{r.why}</div>
                  </div>
                  <span className={styles.recArrow}>&gt;</span>
                </Link>
              ))}
            </div>
            <Link href="/contact" className={styles.primary}>
              DISCUSS YOUR RESULT WITH US
            </Link>
            <button
              type="button"
              className={styles.secondary}
              onClick={() => setShowEmail((v) => !v)}
            >
              EMAIL ME MY REPORT
            </button>
            <Link href="/services" className={styles.textCta}>
              BROWSE ALL SERVICES&nbsp;&nbsp;&gt;
            </Link>

            {showEmail ? (
              <div className={styles.emailCapture}>
                <div className={styles.emailTitle}>
                  Want this as a one-pager?
                </div>
                <p className={styles.emailBody}>
                  We&apos;ll send your stage, the dimension breakdown, and the
                  recommended path as a single PDF. One useful email, no drip
                  sequence, unsubscribe is one click.
                </p>
                {emailStatus === "success" ? (
                  <p className={styles.emailOk}>
                    Got it. A real person replies within one business day.
                  </p>
                ) : (
                  <form className={styles.emailForm} onSubmit={onEmailReport}>
                    <input
                      className={styles.emailInput}
                      name="email"
                      type="email"
                      required
                      placeholder="Work email"
                      aria-label="Work email"
                      disabled={emailStatus === "loading"}
                    />
                    <button
                      type="submit"
                      className={styles.emailSubmit}
                      disabled={emailStatus === "loading"}
                    >
                      {emailStatus === "loading"
                        ? "SENDING…"
                        : "SEND MY REPORT"}
                    </button>
                  </form>
                )}
                <button
                  type="button"
                  className={styles.emailSkip}
                  onClick={() => setShowEmail(false)}
                >
                  No thanks, just show me here
                </button>
                {emailStatus === "error" ? (
                  <p className={styles.emailErr}>{emailError}</p>
                ) : null}
                <p className={styles.emailPrivacy}>
                  We never share your email.{" "}
                  <Link href="/security">
                    See how we handle data&nbsp;&nbsp;&gt;
                  </Link>
                </p>
              </div>
            ) : null}
          </div>
        ) : (
          <p className={styles.placeholder}>
            Answer the six questions and your stage, dimension breakdown and
            recommended services appear here instantly. Nothing sent anywhere.
          </p>
        )}
      </aside>
    </div>
  );
}
