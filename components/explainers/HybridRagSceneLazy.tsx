"use client";

import dynamic from "next/dynamic";
import { hybridRagStages } from "@/lib/content/explainers";
import styles from "./HybridRagScene.module.css";

function HybridRagPlaceholder() {
  return (
    <section
      className={styles.lazyFallback}
      aria-label="Hybrid RAG transformation"
    >
      <div className={styles.lazySteps}>
        {hybridRagStages.map((stage) => (
          <article key={stage.tag} className={styles.lazyStep}>
            <span>{stage.tag}</span>
            <strong>{stage.title}</strong>
            <p>{stage.desc}</p>
          </article>
        ))}
      </div>
      <p role="status">
        This static explanation is available now. Supported browsers can add an
        optional 3D view.
      </p>
    </section>
  );
}

const HybridRagScene = dynamic(
  () =>
    import("@/components/explainers/HybridRagScene").then(
      (module) => module.HybridRagScene,
    ),
  { ssr: false, loading: HybridRagPlaceholder },
);

export function HybridRagSceneLazy() {
  return <HybridRagScene />;
}
