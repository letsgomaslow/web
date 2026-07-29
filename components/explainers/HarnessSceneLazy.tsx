"use client";

import dynamic from "next/dynamic";
import { harnessNodes } from "@/lib/content/explainers";
import styles from "./HarnessScene.module.css";

function HarnessPlaceholder() {
  return (
    <section
      className={styles.lazyFallback}
      aria-label="Agentic harness components"
    >
      <div className={styles.lazyMap}>
        {harnessNodes.map((node) => (
          <article key={node.label} className={styles.lazyNode}>
            <span>{node.tag}</span>
            <strong>{node.title}</strong>
            <p>{node.desc}</p>
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

const HarnessScene = dynamic(
  () =>
    import("@/components/explainers/HarnessScene").then(
      (module) => module.HarnessScene,
    ),
  { ssr: false, loading: HarnessPlaceholder },
);

export function HarnessSceneLazy() {
  return <HarnessScene />;
}
