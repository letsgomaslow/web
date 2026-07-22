"use client";

import Link from "next/link";
import { useState } from "react";
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
            <Link href="/services" className={styles.secondary}>
              BROWSE ALL SERVICES
            </Link>
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
