"use client";

import { useState } from "react";
import styles from "./FailureToggle.module.css";

/** The same system, two moments: what the demo shows and what production reveals. */
export function FailureToggle({
  demo,
  production,
}: {
  demo: string;
  production: string;
}) {
  const [mode, setMode] = useState<"demo" | "production">("demo");

  return (
    <div className={styles.toggle}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={styles.tab}
          aria-pressed={mode === "demo"}
          onClick={() => setMode("demo")}
        >
          IN THE DEMO
        </button>
        <button
          type="button"
          className={`${styles.tab} ${styles.tabProd}`}
          aria-pressed={mode === "production"}
          onClick={() => setMode("production")}
        >
          IN PRODUCTION
        </button>
      </div>
      <p className={styles.panel} aria-live="polite">
        {mode === "demo" ? demo : production}
      </p>
    </div>
  );
}
