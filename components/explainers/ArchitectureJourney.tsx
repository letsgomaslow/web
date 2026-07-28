"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  architectureCapabilities,
  architectureWorkflows,
  type ArchitectureWorkflow,
} from "@/lib/content/architecture";
import styles from "./ArchitectureJourney.module.css";

const defaultWorkflow = architectureWorkflows[0];

function workflowFromHash() {
  if (typeof window === "undefined") return defaultWorkflow.id;
  const id = window.location.hash.replace("#workflow-", "");
  return architectureWorkflows.some((workflow) => workflow.id === id)
    ? (id as ArchitectureWorkflow["id"])
    : defaultWorkflow.id;
}

export function ArchitectureJourney() {
  const [activeId, setActiveId] = useState<ArchitectureWorkflow["id"]>(
    defaultWorkflow.id,
  );
  const [enhanced, setEnhanced] = useState(false);
  const tabRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const syncHash = () => setActiveId(workflowFromHash());
    setEnhanced(true);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const selectWorkflow = (workflow: ArchitectureWorkflow, index?: number) => {
    setActiveId(workflow.id);
    window.history.replaceState(null, "", `#workflow-${workflow.id}`);
    if (index !== undefined) tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    const last = architectureWorkflows.length - 1;
    let next = index;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    selectWorkflow(architectureWorkflows[next], next);
  };

  return (
    <div
      className={styles.journey}
      data-enhanced={enhanced ? "true" : "false"}
    >
      <div
        className={styles.tabs}
        role={enhanced ? "tablist" : undefined}
        aria-label={enhanced ? "Choose a workflow" : undefined}
      >
        {architectureWorkflows.map((workflow, index) => {
          const selected = workflow.id === activeId;
          return (
            <a
              key={workflow.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`tab-${workflow.id}`}
              href={`#workflow-${workflow.id}`}
              className={styles.tab}
              role={enhanced ? "tab" : undefined}
              aria-selected={enhanced ? selected : undefined}
              aria-controls={enhanced ? `workflow-${workflow.id}` : undefined}
              tabIndex={enhanced ? (selected ? 0 : -1) : undefined}
              onClick={(event) => {
                if (!enhanced) return;
                event.preventDefault();
                selectWorkflow(workflow);
              }}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {workflow.tabLabel}
            </a>
          );
        })}
      </div>

      <div className={styles.panels}>
        {architectureWorkflows.map((workflow) => {
          const selected = workflow.id === activeId;
          return (
            <section
              key={workflow.id}
              id={`workflow-${workflow.id}`}
              className={styles.panel}
              role={enhanced ? "tabpanel" : undefined}
              aria-labelledby={enhanced ? `tab-${workflow.id}` : undefined}
              hidden={enhanced && !selected}
              tabIndex={enhanced ? 0 : undefined}
              data-workflow-panel={workflow.id}
            >
              <div className={styles.panelHeader}>
                <div>
                  <div className={styles.sector}>{workflow.sector}</div>
                  <h3>{workflow.title}</h3>
                  <p>{workflow.lede}</p>
                </div>
                <span className={styles.status}>{workflow.statusLabel}</span>
              </div>

              <div className={styles.stepsWrap}>
                <div className={styles.flowLine} aria-hidden="true" />
                <ol className={styles.steps}>
                  {workflow.steps.map((step) => {
                    const capability = architectureCapabilities.find(
                      (item) => item.id === step.capabilityId,
                    );
                    if (!capability) return null;
                    return (
                      <li key={step.capabilityId} className={styles.step}>
                        <span
                          className={styles.stepNumber}
                          style={{ borderColor: capability.accent }}
                        >
                          {capability.num}
                        </span>
                        <div className={styles.labels}>
                          <strong>{capability.businessLabel}</strong>
                          <span>{capability.technicalLabel}</span>
                        </div>
                        <h4>{step.title}</h4>
                        <p>{step.body}</p>
                        <div className={styles.record}>
                          <span>REVIEWABLE RECORD</span>
                          {step.record}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className={styles.panelLinks}>
                <Link href={workflow.relatedHref} className={styles.proofLink}>
                  {workflow.relatedLabel}&nbsp;&nbsp;&gt;
                </Link>
                {workflow.proofHref && workflow.proofLabel ? (
                  <Link href={workflow.proofHref} className={styles.proofLink}>
                    {workflow.proofLabel}&nbsp;&nbsp;&gt;
                  </Link>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
