"use client";

import { useCopyFeedback } from "./useCopyFeedback";
import styles from "./ShareBlock.module.css";

/** Explicit forwarding actions: copy the page link, or send it by email. */
export function ShareBlock({
  mailtoSubject,
  mailtoBody,
}: {
  mailtoSubject: string;
  mailtoBody: string;
}) {
  const { copied, copy } = useCopyFeedback();
  const mailto = `mailto:?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.action}
        onClick={() => copy(window.location.href)}
      >
        {copied ? "LINK COPIED" : "COPY LINK TO THIS PAGE"}
      </button>
      <a className={styles.action} href={mailto}>
        FORWARD BY EMAIL
      </a>
    </div>
  );
}
