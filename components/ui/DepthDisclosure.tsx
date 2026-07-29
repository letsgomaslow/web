import type { ReactNode } from "react";
import styles from "./DepthDisclosure.module.css";

type DepthDisclosureProps = {
  children: ReactNode;
  collapsedLabel?: string;
  expandedLabel?: string;
  open?: boolean;
  className?: string;
};

export function DepthDisclosure({
  children,
  collapsedLabel = "Show detailed reference",
  expandedLabel = "Hide detailed reference",
  open = false,
  className = "",
}: DepthDisclosureProps) {
  return (
    <details
      className={`${styles.disclosure} ${className}`.trim()}
      data-depth-control
      open={open}
    >
      <summary className={styles.summary}>
        <span className={styles.collapsedLabel}>{collapsedLabel}</span>
        <span className={styles.expandedLabel}>{expandedLabel}</span>
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
