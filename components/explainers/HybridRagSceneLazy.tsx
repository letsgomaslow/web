"use client";

import dynamic from "next/dynamic";

const HybridRagScene = dynamic(
  () =>
    import("@/components/explainers/HybridRagScene").then(
      (m) => m.HybridRagScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "60vh",
          background: "#121D35",
          color: "#B8C4D9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading retrieval scene…
      </div>
    ),
  },
);

export function HybridRagSceneLazy() {
  return <HybridRagScene />;
}
