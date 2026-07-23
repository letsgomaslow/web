import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { ArtifactManifest } from "@/components/diligence/ArtifactManifest";
import { DiligenceForm } from "@/components/forms/DiligenceForm";
import {
  diligenceClosing,
  diligenceHero,
  diligenceMeta,
} from "@/lib/content/diligence";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Diligence Pack | Maslow AI · Built for your vendor review",
  },
  description:
    "A current index of Maslow AI security, contracting, and exit documents for procurement, legal, and IT security review.",
};

export default function DiligencePage() {
  return (
    <PageShell footer="compact">
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              {diligenceHero.eyebrow}
            </div>
            <h1
              className="h1 mz-rise"
              style={{
                animationDelay: "0.15s",
                maxWidth: 860,
                marginBottom: 24,
              }}
            >
              {diligenceHero.h1}
            </h1>
            <p
              className="lede mz-rise"
              style={{ animationDelay: "0.3s", maxWidth: 640 }}
            >
              {diligenceHero.lede}
            </p>
            <p
              className={`${styles.packMeta} mz-rise`}
              style={{ animationDelay: "0.4s" }}
            >
              PACK {diligenceMeta.version.toUpperCase()} · UPDATED{" "}
              {diligenceMeta.updated.toUpperCase()} · CURRENT STATUS
            </p>
          </div>
        </section>

        <section className={styles.manifest} data-screen-label="Artifacts">
          <div className="wrap">
            <ArtifactManifest />
          </div>
        </section>

        <section className={styles.request} data-screen-label="Request">
          <div className="wrap">
            <div className={styles.requestGrid}>
              <Reveal>
                <div className="eyebrow eyebrow-ice">GET THE PACK</div>
                <h2 className="h2" style={{ color: "#fff", marginBottom: 16 }}>
                  Request the documents your review needs.
                </h2>
                <p className={styles.requestBody}>
                  Tell us what your review needs first. We will attach available
                  documents and identify what is still in preparation. Send your
                  questionnaire with the request and we will return written
                  answers.
                </p>
                <p className={styles.closing}>{diligenceClosing}</p>
              </Reveal>
              <Reveal className={styles.formCard}>
                <div className={styles.formTitle}>Request the pack</div>
                <DiligenceForm />
              </Reveal>
            </div>
          </div>
        </section>
      </>
    </PageShell>
  );
}
