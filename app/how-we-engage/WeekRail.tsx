"use client";

import { useEffect, useRef } from "react";
import { foundationWeeks } from "@/lib/content/engagement";
import styles from "./page.module.css";

/** The rail is complete in server HTML. Observation only adds reading context. */
export function WeekRail() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(
      list.querySelectorAll<HTMLElement>("[data-engagement-phase]"),
    );

    const showAll = () => {
      list.dataset.readingPhase = "all";
      rows.forEach((row) => row.setAttribute("data-active", "1"));
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      showAll();
      return;
    }

    const visibleRows = new Map<HTMLElement, number>();
    list.setAttribute("data-rail-enhanced", "1");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const row = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            row.setAttribute("data-active", "1");
            visibleRows.set(row, entry.intersectionRatio);
          } else {
            visibleRows.delete(row);
          }
        });

        const readingRow = [...visibleRows.entries()].sort(
          (a, b) => b[1] - a[1],
        )[0]?.[0];

        if (readingRow) {
          list.dataset.readingPhase =
            readingRow.dataset.engagementPhase ?? "none";
          rows.forEach((row) =>
            row.toggleAttribute("data-reading", row === readingRow),
          );
        }
      },
      {
        threshold: [0.25, 0.55, 0.8],
        rootMargin: "-12% 0px -28% 0px",
      },
    );
    rows.forEach((row) => io.observe(row));

    return () => {
      io.disconnect();
      visibleRows.clear();
    };
  }, []);

  return (
    <ol
      ref={listRef}
      className={styles.weekList}
      aria-label="90-day Foundation phases"
      data-engagement-rail
      data-reading-phase="none"
    >
      {foundationWeeks.map((w, i) => (
        <li
          key={w.label}
          className={styles.weekRow}
          data-engagement-phase={w.phase}
        >
          <span className={styles.weekNum} aria-hidden="true">
            0{i + 1}
          </span>
          <div className={styles.weekContent}>
            <div className={styles.weekPhase}>{w.phase}</div>
            <h3 className={styles.weekLabel}>{w.label}</h3>
            <p className={styles.weekDesc}>{w.desc}</p>
            <div className={styles.weekDeliverable}>
              <span>PLANNED DELIVERABLE</span>
              <strong>{w.tag}</strong>
            </div>
            <dl className={styles.weekDetails}>
              <div className={styles.weekDetail}>
                <dt>{w.gate ?? "OPERATING DECISION"}</dt>
                <dd>{w.decisionGate}</dd>
              </div>
              <div className={styles.weekDetail}>
                <dt>WHAT YOU RETAIN</dt>
                <dd>{w.retainedEvidence}</dd>
              </div>
            </dl>
          </div>
        </li>
      ))}
    </ol>
  );
}
