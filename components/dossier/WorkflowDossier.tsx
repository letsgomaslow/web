import type { WorkflowDossier as WorkflowDossierData } from "@/lib/workflow-dossier";
import styles from "./WorkflowDossier.module.css";

type WorkflowDossierProps = {
  dossier: WorkflowDossierData;
  title?: string;
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
};

const fields = [
  ["Waiting deliverable", "waitingDeliverable"],
  ["Current owner", "currentOwner"],
  ["Source of truth", "sourceOfTruth"],
  ["Recurring trigger", "recurringTrigger"],
  ["Human decision", "humanDecision"],
  ["Evidence required", "evidenceRequired"],
  ["Recommended next step", "recommendedNextStep"],
] as const satisfies ReadonlyArray<
  readonly [string, keyof WorkflowDossierData]
>;

export function WorkflowDossier({
  dossier,
  title = "Your workflow context",
  headingLevel = "h3",
  className = "",
}: WorkflowDossierProps) {
  const Heading = headingLevel;

  return (
    <section
      className={`${styles.dossier} ${className}`.trim()}
      data-dossier
      data-visual-ready
      aria-label={title}
    >
      <p className={styles.eyebrow}>WORKFLOW DOSSIER</p>
      <Heading className={styles.title}>{title}</Heading>
      <dl className={styles.fields}>
        {fields.map(([label, key]) => (
          <div className={styles.field} key={key}>
            <dt>{label}</dt>
            <dd>{dossier[key]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
