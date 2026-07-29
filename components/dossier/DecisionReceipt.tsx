import type { WorkflowDossier as WorkflowDossierData } from "@/lib/workflow-dossier";
import styles from "./WorkflowDossier.module.css";

type DecisionReceiptProps = {
  dossier: WorkflowDossierData;
  title?: string;
  description?: string;
  headingLevel?: "h2" | "h3" | "h4";
};

const receiptFields = [
  ["Waiting work", "waitingDeliverable"],
  ["Decision owner", "currentOwner"],
  ["Human boundary", "humanDecision"],
  ["Next step", "recommendedNextStep"],
] as const satisfies ReadonlyArray<
  readonly [string, keyof WorkflowDossierData]
>;

export function DecisionReceipt({
  dossier,
  title = "Decision receipt",
  description = "Use this summary to start a focused working session.",
  headingLevel = "h3",
}: DecisionReceiptProps) {
  const Heading = headingLevel;

  return (
    <section className={styles.receipt} data-decision-receipt data-visual-ready>
      <p className={styles.receiptEyebrow}>DECISION RECEIPT</p>
      <Heading className={styles.receiptTitle}>{title}</Heading>
      <p className={styles.receiptText}>{description}</p>
      <ul className={styles.receiptList}>
        {receiptFields.map(([label, key]) => (
          <li key={key}>
            <strong>{label}</strong>
            <span>{dossier[key]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
