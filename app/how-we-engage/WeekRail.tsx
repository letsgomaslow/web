"use client";

import { useEffect, useRef } from "react";
import { foundationWeeks } from "@/lib/content/engagement";
import styles from "./page.module.css";

/**
 * The 90-day anatomy as a rail that fills checkpoint by checkpoint: each row
 * activates as it enters view, so the line pauses at every gate — the
 * stop-unless-it-clears mechanics, felt in the scroll. Reduced motion and
 * missing JS both land on the fully-lit state.
 */
export function WeekRail() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(list.children);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rows.forEach((r) => r.setAttribute("data-active", "1"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-active", "1");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -18% 0px" },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={listRef} className={styles.weekList}>
      {foundationWeeks.map((w, i) => (
        <li key={w.label} className={styles.weekRow}>
          <span className={styles.weekNum}>0{i + 1}</span>
          <div>
            <div className={styles.weekLabel}>{w.label}</div>
            <div className={styles.weekDesc}>{w.desc}</div>
            <div className={styles.weekTag}>{w.tag}</div>
            {w.gate ? <div className={styles.weekGate}>{w.gate}</div> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
