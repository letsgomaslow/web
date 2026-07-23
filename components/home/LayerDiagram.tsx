import styles from "./LayerDiagram.module.css";

/**
 * The Copilot argument as a picture: keep what they have, add the layer it's
 * missing. Decorative — the section body carries the claim for readers and AT.
 */
export function LayerDiagram() {
  return (
    <div className={styles.stack} aria-hidden="true">
      <div className={styles.keepBand}>
        <span className={styles.bandLabel}>COPILOT · PERSONAL ASSISTANT</span>
        <span className={styles.keepBadge}>KEEP IT</span>
      </div>
      <div className={styles.addBand}>
        <span className={styles.bandLabel}>
          THE WORKFLOW LAYER · AI EMPLOYEES
        </span>
        <span className={styles.addBadge}>WHAT WE BUILD</span>
      </div>
      <div className={styles.baseBand}>
        <span className={styles.bandLabel}>
          YOUR KNOWLEDGE · YOUR ACCOUNTS · YOUR REPOS
        </span>
      </div>
    </div>
  );
}
