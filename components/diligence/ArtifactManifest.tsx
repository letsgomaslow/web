import { Reveal } from "@/components/ui/Reveal";
import { SectionAnchor } from "@/components/ui/SectionAnchor";
import { ticks } from "@/lib/brand";
import { diligenceArtifacts } from "@/lib/content/diligence";
import styles from "./ArtifactManifest.module.css";

/**
 * The readiness matrix as UI: numbered artifacts with current status chips.
 * Rows are individually linkable so a champion can forward one artifact.
 */
export function ArtifactManifest() {
  return (
    <ol className={styles.manifest}>
      {diligenceArtifacts.map((a, i) => (
        <Reveal as="li" key={a.num}>
          <div className={styles.row} id={`artifact-${a.num}`}>
            <span
              className={styles.num}
              style={{ color: ticks[i % ticks.length] }}
            >
              {a.num}
            </span>
            <div className={styles.body}>
              <div className={styles.name}>
                {a.name}
                <SectionAnchor id={`artifact-${a.num}`} label={a.name} />
              </div>
              <div className={styles.desc}>{a.desc}</div>
            </div>
            <span className={styles.status} data-status={a.status}>
              {a.status}
            </span>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
