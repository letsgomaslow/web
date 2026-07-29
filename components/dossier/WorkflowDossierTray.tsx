import type { WorkflowDossier as WorkflowDossierData } from "@/lib/workflow-dossier";
import { WorkflowDossier } from "./WorkflowDossier";
import styles from "./WorkflowDossier.module.css";

type WorkflowDossierTrayProps = {
  dossier: WorkflowDossierData;
  title?: string;
  dossierTitle?: string;
  headingLevel?: "h2" | "h3" | "h4";
  open?: boolean;
};

export function WorkflowDossierTray({
  dossier,
  title = "Review workflow context",
  dossierTitle,
  headingLevel,
  open = false,
}: WorkflowDossierTrayProps) {
  return (
    <details className={styles.tray} data-dossier-tray open={open}>
      <summary className={styles.traySummary}>{title}</summary>
      <div className={styles.trayBody}>
        <WorkflowDossier
          dossier={dossier}
          title={dossierTitle}
          headingLevel={headingLevel}
        />
      </div>
    </details>
  );
}
