"use client";

import { useEffect } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionAnchor } from "@/components/ui/SectionAnchor";
import { faqItems } from "@/lib/content/trust";
import styles from "./page.module.css";

/**
 * The native <details> accordion, made forwardable: every question has a
 * stable #q-NN anchor, and arriving on one opens it. Champions forward
 * answers, not pages.
 */
export function FaqList() {
  useEffect(() => {
    const openFromHash = () => {
      const match = window.location.hash.match(/^#(q-\d{2})$/);
      if (!match) return;
      const el = document.getElementById(match[1]);
      if (!(el instanceof HTMLDetailsElement)) return;
      el.open = true;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.setTimeout(() => {
        el.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
      }, 80);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div className={styles.faqList}>
      {faqItems.map((item) => (
        <Reveal key={item.num}>
          <div className={styles.itemWrap}>
            <details className={styles.item} id={`q-${item.num}`}>
              <summary className={styles.summary}>
                <span className={styles.num}>{item.num}</span>
                <span className={styles.question}>{item.q}</span>
                <span className={styles.chevron} aria-hidden>
                  +
                </span>
              </summary>
              <div className={styles.answer}>{item.a}</div>
            </details>
            <SectionAnchor id={`q-${item.num}`} label={item.q} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
