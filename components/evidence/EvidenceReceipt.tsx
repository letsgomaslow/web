import Link from "next/link";
import { useId } from "react";
import {
  evidenceStatusLabel,
  type EvidenceReceiptData,
} from "@/lib/content/evidence";
import styles from "./EvidenceReceipt.module.css";

type EvidenceReceiptProps = {
  evidence: EvidenceReceiptData;
  title?: string;
  headingLevel?: "h2" | "h3" | "h4";
};

export function EvidenceReceipt({
  evidence,
  title = "Evidence receipt",
  headingLevel = "h3",
}: EvidenceReceiptProps) {
  const statusLabel = evidenceStatusLabel[evidence.status];
  const headingId = useId();
  const Heading = headingLevel;

  return (
    <aside
      className={styles.receipt}
      data-evidence-receipt
      data-visual-ready
      aria-labelledby={headingId}
    >
      <div className={styles.heading}>
        <Heading className={styles.eyebrow} id={headingId}>
          {title}
        </Heading>
        <p className={styles.status} data-evidence-status={evidence.status}>
          {statusLabel}
        </p>
      </div>
      <dl className={styles.fields}>
        <div>
          <dt>Claim</dt>
          <dd>{evidence.claim}</dd>
        </div>
        <div>
          <dt>Scope</dt>
          <dd>{evidence.scope}</dd>
        </div>
        <div>
          <dt>Owner</dt>
          <dd>{evidence.owner}</dd>
        </div>
        <div>
          <dt>Limitations</dt>
          <dd>{evidence.limitations}</dd>
        </div>
      </dl>
      {evidence.href ? (
        <Link className={styles.link} href={evidence.href}>
          {evidence.linkLabel ?? "VIEW SUPPORTING MATERIAL"}
        </Link>
      ) : null}
    </aside>
  );
}
