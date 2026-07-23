import styles from "./QueueMotif.module.css";

/**
 * Abstract queue growing quarter over quarter. Deliberately number-free:
 * fabricating quantities would break the honest-numbers register the section
 * argues from.
 */
const BARS = [34, 46, 58, 72, 88, 100];

export function QueueMotif() {
  return (
    <div className={styles.queue} aria-hidden="true">
      {BARS.map((w, i) => (
        <span
          key={w}
          className={styles.bar}
          style={{ width: `${w}%`, ["--i" as string]: i }}
        />
      ))}
      <span className={styles.caption}>THE QUEUE, LEFT ALONE</span>
    </div>
  );
}
