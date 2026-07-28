"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  architectureMapEdges,
  architectureMapNodes,
  architectureScenarioOverlays,
  architectureViews,
  type ArchitectureMapNode,
  type ArchitectureMapNodeId,
  type ArchitectureScenarioOverlay,
  type ArchitectureView,
  type ArchitectureViewId,
} from "@/lib/content/architecture";
import styles from "./ArchitectureMap.module.css";

const defaultView = architectureViews[0];
const defaultScenario = architectureScenarioOverlays[0];

const initialNodes: Record<ArchitectureViewId, ArchitectureMapNodeId> = {
  run: "intake",
  control: "identity",
  improve: "observe",
};

type Coordinate = { x: number; y: number };

const connectorCoordinates: Record<
  ArchitectureViewId,
  Partial<Record<ArchitectureMapNodeId, Coordinate>>
> = {
  run: {
    intake: { x: 8, y: 31 },
    briefing: { x: 25, y: 31 },
    procedure: { x: 42, y: 31 },
    access: { x: 58, y: 31 },
    decision: { x: 75, y: 31 },
    record: { x: 92, y: 31 },
    model: { x: 50, y: 82 },
  },
  control: {
    identity: { x: 8, y: 40 },
    boundaries: { x: 25, y: 40 },
    execution: { x: 42, y: 40 },
    decision: { x: 58, y: 40 },
    record: { x: 75, y: 40 },
    recovery: { x: 92, y: 40 },
  },
  improve: {
    observe: { x: 10, y: 45 },
    pattern: { x: 30, y: 45 },
    proposal: { x: 50, y: 45 },
    review: { x: 70, y: 45 },
    activation: { x: 90, y: 45 },
  },
};

function nodeById(id: ArchitectureMapNodeId) {
  const node = architectureMapNodes.find((item) => item.id === id);
  if (!node) throw new Error(`Unknown architecture node: ${id}`);
  return node;
}

function viewById(id: ArchitectureViewId) {
  return architectureViews.find((view) => view.id === id) ?? defaultView;
}

function hashSelection() {
  if (typeof window === "undefined") return {};
  const hash = window.location.hash.slice(1);
  const scenarioId = hash.replace("workflow-", "");
  const scenario = architectureScenarioOverlays.find(
    (item) => item.id === scenarioId,
  );
  if (scenario) return { viewId: "run" as const, scenarioId: scenario.id };

  const viewId = hash.replace("view-", "");
  const view = architectureViews.find((item) => item.id === viewId);
  return view ? { viewId: view.id } : {};
}

function nextTabIndex(
  event: React.KeyboardEvent<HTMLAnchorElement>,
  current: number,
  length: number,
) {
  if (event.key === "ArrowRight") return current === length - 1 ? 0 : current + 1;
  if (event.key === "ArrowLeft") return current === 0 ? length - 1 : current - 1;
  if (event.key === "Home") return 0;
  if (event.key === "End") return length - 1;
  return null;
}

function recordEvent(name: string, values: Record<string, string>) {
  track(name, values);
}

function ConnectorLayer({ view }: { view: ArchitectureView }) {
  const coordinates = connectorCoordinates[view.id];
  const edges = architectureMapEdges.filter((edge) => edge.viewId === view.id);

  return (
    <svg
      className={styles.connectors}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <marker
          id={`arrow-${view.id}`}
          markerWidth="5"
          markerHeight="5"
          refX="4"
          refY="2.5"
          orient="auto"
        >
          <path d="M0,0 L5,2.5 L0,5 Z" />
        </marker>
      </defs>
      {edges.map((edge) => {
        const from = coordinates[edge.from];
        const to = coordinates[edge.to];
        if (!from || !to) return null;
        const feedback = edge.kind === "feedback";
        const support = edge.kind === "support";
        const path = feedback
          ? `M ${from.x} ${from.y} C ${from.x} 5, ${to.x} 5, ${to.x} ${to.y}`
          : support
            ? `M ${from.x} ${from.y} C ${from.x} 62, ${to.x} 62, ${to.x} ${to.y}`
            : `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
        return (
          <path
            key={edge.id}
            d={path}
            className={styles[edge.kind]}
            markerEnd={`url(#arrow-${view.id})`}
            data-edge={`${edge.from}-${edge.to}`}
          />
        );
      })}
    </svg>
  );
}

function scenarioExample(
  scenario: ArchitectureScenarioOverlay,
  viewId: ArchitectureViewId,
  nodeId: ArchitectureMapNodeId,
) {
  if (viewId === "run") {
    const step = scenario.steps.find((item) => item.capabilityId === nodeId);
    if (step) return `${step.title}. ${step.body}`;
  }
  return scenario.examples[viewId]?.[nodeId] ?? scenario.lede;
}

function NodeDetail({
  node,
  view,
  scenario,
}: {
  node: ArchitectureMapNode;
  view: ArchitectureView;
  scenario: ArchitectureScenarioOverlay;
}) {
  return (
    <article
      id={`architecture-detail-${view.id}-${node.id}`}
      className={styles.detail}
      aria-labelledby={`architecture-detail-heading-${view.id}-${node.id}`}
      data-node-detail={node.id}
    >
      <div className={styles.detailHeading}>
        <span style={{ color: node.accent }}>{node.num}</span>
        <div>
          <h4 id={`architecture-detail-heading-${view.id}-${node.id}`}>
            {node.businessLabel}
          </h4>
          <p>{node.technicalLabel}</p>
        </div>
      </div>
      <p className={styles.outcome}>{node.outcome}</p>
      <div className={styles.detailGrid}>
        <div>
          <span>HOW IT WORKS</span>
          <p>{node.mechanism}</p>
        </div>
        <div>
          <span>IN THIS WALKTHROUGH</span>
          <p>{scenarioExample(scenario, view.id, node.id)}</p>
        </div>
        <div>
          <span>WHAT YOU CAN INSPECT</span>
          <p>{node.inspection}</p>
        </div>
      </div>
      {node.relatedHref && node.relatedLabel ? (
        <Link
          href={node.relatedHref}
          className={styles.detailLink}
          onClick={() =>
            recordEvent("Architecture detail clicked", {
              view: view.id,
              node: node.id,
            })
          }
        >
          {node.relatedLabel}&nbsp;&nbsp;&gt;
        </Link>
      ) : null}
    </article>
  );
}

function ViewPanel({
  view,
  scenario,
  activeNodeId,
  enhanced,
  onSelectNode,
}: {
  view: ArchitectureView;
  scenario: ArchitectureScenarioOverlay;
  activeNodeId: ArchitectureMapNodeId;
  enhanced: boolean;
  onSelectNode: (node: ArchitectureMapNode) => void;
}) {
  const nodes = view.nodeIds.map(nodeById);

  return (
    <section
      id={`view-${view.id}`}
      className={styles.viewPanel}
      role={enhanced ? "tabpanel" : undefined}
      aria-labelledby={enhanced ? `view-tab-${view.id}` : undefined}
      data-architecture-view={view.id}
    >
      <div className={styles.viewHeading}>
        <div>
          <div className={styles.viewEyebrow}>{view.eyebrow}</div>
          <h3>{view.title}</h3>
          <p>{view.summary}</p>
        </div>
        {view.statusLabel ? (
          <span className={styles.viewStatus}>{view.statusLabel}</span>
        ) : null}
      </div>

      <div className={styles.mapFrame}>
        <div className={styles.boundaryLabels}>
          <span>{view.entryLabel}</span>
          <span>{view.returnLabel}</span>
        </div>
        <div className={styles.canvas} data-view-canvas={view.id}>
          <ConnectorLayer view={view} />
          <ol className={`${styles.nodeGrid} ${styles[`nodeGrid_${view.id}`]}`}>
            {nodes.map((node) => {
              const selected = node.id === activeNodeId;
              return (
                <li key={node.id} data-node-id={node.id}>
                  <a
                    id={`architecture-node-${view.id}-${node.id}`}
                    href={`#architecture-detail-${view.id}-${node.id}`}
                    className={styles.node}
                    role={enhanced ? "button" : undefined}
                    aria-expanded={enhanced ? selected : undefined}
                    aria-controls={
                      enhanced
                        ? `architecture-detail-${view.id}-${node.id}`
                        : undefined
                    }
                    onClick={(event) => {
                      if (!enhanced) return;
                      event.preventDefault();
                      onSelectNode(node);
                    }}
                    onKeyDown={(event) => {
                      if (!enhanced || event.key !== " ") return;
                      event.preventDefault();
                      onSelectNode(node);
                    }}
                  >
                    <span className={styles.nodeNumber} style={{ color: node.accent }}>
                      {node.num}
                    </span>
                    <strong>{node.businessLabel}</strong>
                    <span className={styles.nodeTechnical}>{node.technicalLabel}</span>
                    <span className={styles.nodeExample}>
                      {scenarioExample(scenario, view.id, node.id).split(".")[0]}
                    </span>
                    <span className={styles.nodeState}>{selected ? "OPEN" : "EXPLORE"}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className={styles.details} aria-live={enhanced ? "polite" : undefined}>
        {nodes.map((node) => (
          <div key={node.id} hidden={enhanced && node.id !== activeNodeId}>
            <NodeDetail node={node} view={view} scenario={scenario} />
          </div>
        ))}
      </div>
    </section>
  );
}

function StaticScenarioContent({ scenario }: { scenario: ArchitectureScenarioOverlay }) {
  return (
    <div className={styles.staticScenarioContent}>
      <h4>Run the work</h4>
      <ol>
        {scenario.steps.map((step) => (
          <li key={step.capabilityId}>
            <strong>{step.title}</strong>
            <span>{step.body}</span>
          </li>
        ))}
      </ol>
      {(["control", "improve"] as const).map((viewId) => (
        <div key={viewId}>
          <h4>{viewById(viewId).tabLabel}</h4>
          <ul>
            {viewById(viewId).nodeIds.map((nodeId) => (
              <li key={nodeId}>{scenarioExample(scenario, viewId, nodeId)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ArchitectureMap() {
  const [enhanced, setEnhanced] = useState(false);
  const [activeViewId, setActiveViewId] = useState<ArchitectureViewId>(
    defaultView.id,
  );
  const [activeScenarioId, setActiveScenarioId] = useState<
    ArchitectureScenarioOverlay["id"]
  >(defaultScenario.id);
  const [activeNodes, setActiveNodes] = useState(initialNodes);
  const viewTabRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const scenarioTabRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const syncHash = () => {
      const selection = hashSelection();
      if (selection.viewId) setActiveViewId(selection.viewId);
      if (selection.scenarioId) setActiveScenarioId(selection.scenarioId);
    };
    setEnhanced(true);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const activeScenario =
    architectureScenarioOverlays.find((item) => item.id === activeScenarioId) ??
    defaultScenario;

  const selectView = (view: ArchitectureView, focusIndex?: number) => {
    setActiveViewId(view.id);
    window.history.replaceState(null, "", `#view-${view.id}`);
    recordEvent("Architecture view selected", { view: view.id });
    if (focusIndex !== undefined) viewTabRefs.current[focusIndex]?.focus();
  };

  const selectScenario = (
    scenario: ArchitectureScenarioOverlay,
    focusIndex?: number,
  ) => {
    setActiveScenarioId(scenario.id);
    if (activeViewId === "run") {
      window.history.replaceState(null, "", `#workflow-${scenario.id}`);
    }
    recordEvent("Architecture scenario selected", { scenario: scenario.id });
    if (focusIndex !== undefined) scenarioTabRefs.current[focusIndex]?.focus();
  };

  const selectNode = (node: ArchitectureMapNode) => {
    setActiveNodes((current) => ({ ...current, [activeViewId]: node.id }));
    recordEvent("Architecture node opened", {
      view: activeViewId,
      node: node.id,
      scenario: activeScenario.id,
    });
  };

  return (
    <div
      id="architecture-map"
      className={styles.map}
      data-enhanced={enhanced ? "true" : "false"}
    >
      <div className={styles.controls}>
        <div>
          <span className={styles.controlLabel}>CHOOSE A VIEW</span>
          <div
            className={styles.viewTabs}
            role={enhanced ? "tablist" : undefined}
            aria-label={enhanced ? "Choose an architecture view" : undefined}
          >
            {architectureViews.map((view, index) => {
              const selected = view.id === activeViewId;
              return (
                <a
                  key={view.id}
                  ref={(node) => {
                    viewTabRefs.current[index] = node;
                  }}
                  id={`view-tab-${view.id}`}
                  href={`#view-${view.id}`}
                  role={enhanced ? "tab" : undefined}
                  aria-selected={enhanced ? selected : undefined}
                  aria-controls={enhanced ? `view-${view.id}` : undefined}
                  tabIndex={enhanced ? (selected ? 0 : -1) : undefined}
                  onClick={(event) => {
                    if (!enhanced) return;
                    event.preventDefault();
                    selectView(view);
                  }}
                  onKeyDown={(event) => {
                    const next = nextTabIndex(event, index, architectureViews.length);
                    if (next === null) return;
                    event.preventDefault();
                    selectView(architectureViews[next], next);
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {view.tabLabel}
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <span className={styles.controlLabel}>APPLY A WALKTHROUGH</span>
          <div
            className={styles.scenarioTabs}
            role={enhanced ? "tablist" : undefined}
            aria-label={enhanced ? "Choose an illustrative workflow" : undefined}
          >
            {architectureScenarioOverlays.map((scenario, index) => {
              const selected = scenario.id === activeScenario.id;
              return (
                <a
                  key={scenario.id}
                  ref={(node) => {
                    scenarioTabRefs.current[index] = node;
                  }}
                  id={`scenario-tab-${scenario.id}`}
                  href={`#workflow-${scenario.id}`}
                  role={enhanced ? "tab" : undefined}
                  aria-selected={enhanced ? selected : undefined}
                  aria-controls={enhanced ? `workflow-${scenario.id}` : undefined}
                  tabIndex={enhanced ? (selected ? 0 : -1) : undefined}
                  onClick={(event) => {
                    if (!enhanced) return;
                    event.preventDefault();
                    selectScenario(scenario);
                  }}
                  onKeyDown={(event) => {
                    const next = nextTabIndex(
                      event,
                      index,
                      architectureScenarioOverlays.length,
                    );
                    if (next === null) return;
                    event.preventDefault();
                    selectScenario(architectureScenarioOverlays[next], next);
                  }}
                >
                  {scenario.tabLabel}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.scenarioPanels}>
        {architectureScenarioOverlays.map((scenario) => (
          <section
            key={scenario.id}
            id={`workflow-${scenario.id}`}
            className={styles.scenarioPanel}
            role={enhanced ? "tabpanel" : undefined}
            aria-labelledby={enhanced ? `scenario-tab-${scenario.id}` : undefined}
            hidden={enhanced && scenario.id !== activeScenario.id}
            data-workflow-panel={scenario.id}
          >
            <div>
              <span className={styles.sector}>{scenario.sector}</span>
              <h3>{scenario.title}</h3>
              <p>{scenario.lede}</p>
            </div>
            <div className={styles.scenarioMeta}>
              <span className={styles.scenarioStatus}>{scenario.statusLabel}</span>
              <div className={styles.scenarioLinks}>
                <Link href={scenario.relatedHref}>{scenario.relatedLabel}&nbsp;&nbsp;&gt;</Link>
                {scenario.proofHref && scenario.proofLabel ? (
                  <Link
                    href={scenario.proofHref}
                    onClick={() =>
                      recordEvent("Architecture production evidence clicked", {
                        scenario: scenario.id,
                      })
                    }
                  >
                    {scenario.proofLabel}&nbsp;&nbsp;&gt;
                  </Link>
                ) : null}
              </div>
            </div>
            <StaticScenarioContent scenario={scenario} />
          </section>
        ))}
      </div>

      <div className={styles.viewPanels}>
        {architectureViews.map((view) => (
          <div key={view.id} hidden={enhanced && view.id !== activeViewId}>
            <ViewPanel
              view={view}
              scenario={activeScenario}
              activeNodeId={activeNodes[view.id]}
              enhanced={enhanced}
              onSelectNode={selectNode}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
