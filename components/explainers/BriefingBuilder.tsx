"use client";

import { useMemo, useState } from "react";
import styles from "./BriefingBuilder.module.css";

const defs = [
  {
    key: "contract",
    name: "Contract archive",
    meta: "MSAs, SOWs, amendments, via knowledge graph",
    tag: "high",
    size: 22,
    quality: 45,
  },
  {
    key: "crm",
    name: "Live CRM record",
    meta: "Vendor X account, current as of today",
    tag: "high",
    size: 8,
    quality: 25,
  },
  {
    key: "policies",
    name: "Company policies",
    meta: "Procurement & payment policy docs",
    tag: "medium",
    size: 14,
    quality: 15,
  },
  {
    key: "thread",
    name: "This email thread",
    meta: "The conversation that triggered the question",
    tag: "medium",
    size: 10,
    quality: 10,
  },
  {
    key: "wiki",
    name: "2023 team wiki",
    meta: "Unmaintained; contains the OLD net-30 terms",
    tag: "stale",
    size: 26,
    quality: -30,
  },
] as const;

const colors = {
  high: "#73C1AE",
  medium: "#A070A6",
  stale: "#EBA93D",
} as const;

type Key = (typeof defs)[number]["key"];

export function BriefingBuilder() {
  const [on, setOn] = useState<Record<Key, boolean>>({
    contract: true,
    crm: false,
    policies: false,
    thread: false,
    wiki: false,
  });

  const {
    used,
    quality,
    segments,
    answer,
    answerNote,
    qualityLabel,
    qualityColor,
  } = useMemo(() => {
    let used = 0;
    let quality = 5;
    const segments: { w: string; color: string; label: string }[] = [];
    defs.forEach((d) => {
      if (on[d.key]) {
        used += d.size;
        quality += d.quality;
        segments.push({
          w: `${d.size}%`,
          color: colors[d.tag],
          label: d.name.split(" ")[0].toUpperCase(),
        });
      }
    });
    quality = Math.max(0, Math.min(100, quality));

    let answer: string;
    let answerNote: string;
    if (!on.contract && !on.crm && !on.policies && !on.thread && !on.wiki) {
      answer =
        "“Payment terms vary by vendor and agreement. I don’t have access to your contracts, so I can’t say what applies to Vendor X. Typically, terms range from net-30 to net-60…”";
      answerNote = "No sources: the model can only produce generic filler.";
    } else if (on.wiki && !on.contract) {
      answer =
        "“According to the team wiki, Vendor X is on net-30 terms.” ⚠ Confidently wrong: the wiki predates the 2014 amendment that moved Vendor X to net-45.";
      answerNote =
        "Stale context is worse than none: the model has no way to know the wiki is outdated.";
    } else if (on.contract && on.wiki) {
      answer =
        "“Sources conflict: the 2024 MSA amendment (§7.2) says net-45, but the team wiki says net-30. The MSA is the governing document (net-45), but you should retire that wiki page.”";
      answerNote =
        "Good retrieval surfaces the conflict instead of silently picking one.";
    } else if (on.contract && on.crm) {
      answer =
        "“Net-45, per the 2024 MSA amendment §7.2 (MSA_VendorX_2024.pdf). CRM shows the last three invoices were paid on day 43–44, so you’re operating close to the limit. Early-payment discount of 1.5% applies before day 20.”";
      answerNote =
        "Contract facts + live data: precise, cited, and actionable.";
    } else if (on.contract) {
      answer =
        "“Net-45, per the 2024 MSA amendment §7.2 (MSA_VendorX_2024.pdf). An early-payment discount of 1.5% applies before day 20.”";
      answerNote =
        "The governing document alone answers correctly, with a citation.";
    } else {
      answer =
        "“Your procurement policy defaults to net-30, and this thread mentions an invoice, but I can’t confirm Vendor X’s actual contracted terms without the agreement itself.”";
      answerNote =
        "Adjacent context helps the model know what it doesn’t know.";
    }

    return {
      used,
      quality,
      segments,
      answer,
      answerNote,
      qualityLabel:
        quality >= 60 ? "Precise" : quality >= 30 ? "Partial" : "Unreliable",
      qualityColor:
        quality >= 60 ? "#73C1AE" : quality >= 30 ? "#EBA93D" : "#F37779",
    };
  }, [on]);

  return (
    <div className={styles.root}>
      <div className={styles.sources}>
        <div className={styles.label}>TOGGLE SOURCES</div>
        {defs.map((d) => {
          const active = on[d.key];
          return (
            <button
              key={d.key}
              type="button"
              className={styles.source}
              style={{
                borderColor: active ? "#73C1AE" : "#3A4A6B",
                background: active ? "rgba(115,193,174,.1)" : "transparent",
              }}
              onClick={() => setOn((s) => ({ ...s, [d.key]: !s[d.key] }))}
            >
              <span
                className={styles.check}
                style={{
                  background: active ? "#73C1AE" : "transparent",
                  borderColor: active ? "#73C1AE" : "#3A4A6B",
                }}
              >
                {active ? "✓" : ""}
              </span>
              <div>
                <div className={styles.sourceName}>{d.name}</div>
                <div className={styles.sourceMeta}>{d.meta}</div>
              </div>
              <span
                className={styles.tag}
                style={{
                  color:
                    d.tag === "stale"
                      ? "#EBA93D"
                      : d.tag === "high"
                        ? "#73C1AE"
                        : "#B8C4D9",
                }}
              >
                {d.tag === "stale"
                  ? "STALE · 2023"
                  : d.tag === "high"
                    ? "HIGH VALUE"
                    : "SUPPORTING"}
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.panel}>
        <div className={styles.label}>CONTEXT BUDGET</div>
        <div className={styles.budgetBar}>
          {segments.map((s) => (
            <div
              key={s.label + s.w}
              style={{ width: s.w, background: s.color }}
              title={s.label}
            />
          ))}
        </div>
        <div className={styles.budgetMeta}>
          <span>{used}% of budget used</span>
          <span>
            {used > 60
              ? "Getting crowded: every low-value token dilutes the important ones."
              : "Curated and lean: the key facts stand out."}
          </span>
        </div>

        <div className={styles.qualityRow}>
          <span>Answer quality</span>
          <strong style={{ color: qualityColor }}>{qualityLabel}</strong>
        </div>
        <div className={styles.qualityTrack}>
          <div style={{ width: `${quality}%`, background: qualityColor }} />
        </div>

        <div className={styles.answer}>{answer}</div>
        <div className={styles.note}>{answerNote}</div>
      </div>
    </div>
  );
}
