import styles from "./CatchChips.module.css";

export type CatchStep = {
  label: string;
  tone: "flagged" | "caught" | "approved";
};

/**
 * The show-the-catch guardrail as UI: what the AI surfaced, what the human
 * caught, and the approval that carries their name. Approval must read as
 * judgment applied, never a rubber stamp.
 */
export function CatchChips({
  steps,
  ariaLabel = "Approval trail",
}: {
  steps: readonly CatchStep[];
  ariaLabel?: string;
}) {
  return (
    <ol className={styles.chips} aria-label={ariaLabel}>
      {steps.map((s, i) => (
        <li
          key={s.label}
          className={styles.step}
          style={{ ["--i" as string]: i }}
        >
          <span className={styles.pill} data-tone={s.tone}>
            {s.label}
          </span>
        </li>
      ))}
    </ol>
  );
}
