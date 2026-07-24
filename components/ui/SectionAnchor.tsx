"use client";

import { useCopyFeedback } from "./useCopyFeedback";
import styles from "./SectionAnchor.module.css";

/**
 * Copy-link affordance for forwardable sections. Pages are ammunition for the
 * forwarded-to reader; this makes forwarding a one-click act.
 */
export function SectionAnchor({ id, label }: { id: string; label: string }) {
  const { copied, copy } = useCopyFeedback();

  return (
    <button
      type="button"
      className={styles.anchor}
      data-copied={copied || undefined}
      aria-label={`Copy link to “${label}”`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copy(`${window.location.origin}${window.location.pathname}#${id}`);
      }}
    >
      <span aria-hidden="true">{copied ? "COPIED" : "#"}</span>
      <span className={styles.srOnly} aria-live="polite" role="status">
        {copied ? "Link copied" : ""}
      </span>
    </button>
  );
}
