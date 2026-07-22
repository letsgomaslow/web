"use client";

import dynamic from "next/dynamic";

const HarnessScene = dynamic(
  () =>
    import("@/components/explainers/HarnessScene").then((m) => m.HarnessScene),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 420,
          background: "#121D35",
          borderRadius: 4,
          color: "#B8C4D9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading harness…
      </div>
    ),
  },
);

export function HarnessSceneLazy() {
  return <HarnessScene />;
}
