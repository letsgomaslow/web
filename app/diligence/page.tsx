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
    "The pack your champion can forward to procurement, legal, and IT security: questionnaire mappings, subprocessors, exit paths, and incident commitments — with honest status on each.",
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
              {diligenceMeta.updated.toUpperCase()} · STATUSES BELOW ARE LIVE,
              NOT ASPIRATIONAL
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
                  Send it to your review, not your inbox pile.
                </h2>
                <p className={styles.requestBody}>
                  Tell us what your review needs first and the pack arrives
                  assembled for it — available artifacts attached,
                  in-preparation items with their expected shape named. Send
                  your own questionnaire along and it comes back answered, in
                  writing.
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
