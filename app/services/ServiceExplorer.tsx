"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type SyntheticEvent,
} from "react";
import { CatchChips } from "@/components/ui/CatchChips";
import {
  serviceCatalog,
  serviceStages,
  type ServiceGroup,
  type ServiceStage,
  type ServiceStageId,
} from "@/lib/content/services";
import {
  parseWorkflowBrief,
  WORKFLOW_BRIEF_STORAGE_KEY,
} from "@/lib/workflow-brief";
import { workflowBriefToDossier } from "@/lib/workflow-dossier";
import styles from "./page.module.css";

type ExplorerMode = "fallback" | "desktop" | "mobile";

type ServiceRecommendation = {
  stageId: ServiceStageId;
  waitingDeliverable: string;
  sourceOfTruth: string;
};

const stageEntries = serviceStages.flatMap((stage) => {
  const group = serviceCatalog.find((item) => item.id === stage.id);
  return group ? [{ stage, group }] : [];
});

function stageIdFromHash(hash: string): ServiceStageId | null {
  const candidate = hash.startsWith("#") ? hash.slice(1) : hash;
  return serviceStages.some((stage) => stage.id === candidate)
    ? (candidate as ServiceStageId)
    : null;
}

function stageForSource(sourceId: string): ServiceStageId {
  if (sourceId === "documents") return "structure";
  if (sourceId === "systems") return "build";
  return "assess";
}

function updateStageHash(stageId: ServiceStageId) {
  const nextUrl = `${window.location.pathname}${window.location.search}#${stageId}`;
  window.history.replaceState(window.history.state, "", nextUrl);
}

function scrollToStage(stageId: ServiceStageId) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.getElementById(stageId)?.scrollIntoView({ block: "start" });
    });
  });
}

function readRecommendation(): ServiceRecommendation | null {
  try {
    const stored = window.sessionStorage.getItem(WORKFLOW_BRIEF_STORAGE_KEY);
    if (!stored) return null;
    const brief = parseWorkflowBrief(JSON.parse(stored));
    const dossier = brief ? workflowBriefToDossier(brief) : null;
    if (!brief || !dossier) return null;

    return {
      stageId: stageForSource(brief.selections.source.id),
      waitingDeliverable: dossier.waitingDeliverable,
      sourceOfTruth: dossier.sourceOfTruth,
    };
  } catch {
    return null;
  }
}

function StageContent({
  stage,
  group,
}: {
  stage: ServiceStage;
  group: ServiceGroup;
}) {
  const metadata = [
    ["Deliverable", stage.deliverable],
    ["Accountable owners", stage.owners],
    ["Decision gate", stage.decision],
    ["Evidence retained", stage.evidence],
    ["Timing", stage.timing],
    ["Fixed-fee status", stage.fixedFee],
  ] as const;

  return (
    <div className={styles.stagePanelInner}>
      <header className={styles.stageHeader}>
        <span className={styles.groupNum} style={{ color: group.accent }}>
          {group.num}
        </span>
        <div>
          <h3 className={styles.groupName}>{group.name}</h3>
          <p className={styles.groupDesc}>{group.desc}</p>
        </div>
      </header>

      <dl className={styles.stageMetadata} aria-label={`${stage.name} stage`}>
        {metadata.map(([label, value]) => (
          <div key={label} className={styles.metadataItem}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.serviceGrid}>
        {group.services.map((service) => (
          <article key={service.name} className={styles.serviceCard}>
            <h4 className={styles.serviceName}>{service.name}</h4>
            <p className={styles.serviceDesc}>{service.desc}</p>
            <p
              className={styles.serviceFit}
              style={{ borderLeftColor: group.accent }}
            >
              <strong>For you if:</strong> {service.fit}
            </p>
            <p className={styles.deliverable}>
              <span>DELIVERABLE</span>
              {service.deliverable}
            </p>
            {service.catchTrail ? (
              <CatchChips
                steps={service.catchTrail}
                ariaLabel="What the supervision log records"
              />
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export function ServiceExplorer() {
  const [mode, setMode] = useState<ExplorerMode>("fallback");
  const [selectedId, setSelectedId] = useState<ServiceStageId>("assess");
  const [mobileOpenId, setMobileOpenId] =
    useState<ServiceStageId | null>("assess");
  const [recommendation, setRecommendation] =
    useState<ServiceRecommendation | null>(null);
  const tabRefs = useRef(new Map<ServiceStageId, HTMLAnchorElement>());
  const initialized = mode !== "fallback";

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const syncMode = () => setMode(media.matches ? "mobile" : "desktop");
    const syncHash = () => {
      const stageId = stageIdFromHash(window.location.hash);
      if (!stageId) return;
      setSelectedId(stageId);
      setMobileOpenId(stageId);
      scrollToStage(stageId);
    };

    setRecommendation(readRecommendation());
    syncMode();
    syncHash();
    media.addEventListener("change", syncMode);
    window.addEventListener("hashchange", syncHash);

    return () => {
      media.removeEventListener("change", syncMode);
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  const activateStage = (
    stageId: ServiceStageId,
    options: { focus?: boolean; scroll?: boolean } = {},
  ) => {
    setSelectedId(stageId);
    setMobileOpenId(stageId);
    updateStageHash(stageId);

    if (options.scroll) scrollToStage(stageId);
    if (options.focus) {
      window.requestAnimationFrame(() => tabRefs.current.get(stageId)?.focus());
    }
  };

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    if (mode !== "desktop") return;

    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % stageEntries.length;
    if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + stageEntries.length) % stageEntries.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = stageEntries.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      activateStage(stageEntries[nextIndex].stage.id, { focus: true });
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateStage(stageEntries[index].stage.id);
    }
  };

  const onDetailsToggle = (
    event: SyntheticEvent<HTMLDetailsElement>,
    stageId: ServiceStageId,
  ) => {
    if (mode !== "mobile") return;
    if (event.currentTarget.open) {
      setMobileOpenId(stageId);
      setSelectedId(stageId);
      updateStageHash(stageId);
      return;
    }

    setMobileOpenId((current) => (current === stageId ? null : current));
  };

  const recommendedStage = recommendation
    ? serviceStages.find((stage) => stage.id === recommendation.stageId)
    : null;

  return (
    <section
      className={styles.explorer}
      aria-labelledby="service-explorer-heading"
      data-service-explorer
      data-enhanced={initialized ? "true" : "false"}
      data-visual-ready={initialized ? "true" : "false"}
    >
      <div className={styles.explorerInner}>
        <header className={styles.explorerIntro}>
          <div>
            <p className="eyebrow">FIVE STAGES · ONE CLEAR DECISION AT A TIME</p>
            <h2 id="service-explorer-heading" className="h2">
              Inspect the stage, evidence, and decision before you choose a
              service.
            </h2>
          </div>
          <p>
            Each stage names what it produces, who remains accountable, and
            what must be reviewed before the work advances.
          </p>
        </header>

        {recommendation && recommendedStage ? (
          <aside
            className={styles.recommendation}
            aria-labelledby="service-recommendation-heading"
            data-service-recommendation={recommendation.stageId}
          >
            <div className={styles.recommendationCopy}>
              <p className={styles.recommendationEyebrow}>
                YOUR WORKFLOW STARTING POINT
              </p>
              <h3 id="service-recommendation-heading">
                Begin the service conversation at {recommendedStage.name}.
              </h3>
              <p>
                Your mapper identified “{recommendation.waitingDeliverable}” as
                the waiting deliverable, with {recommendation.sourceOfTruth} as
                the source of truth. This suggests where to begin the
                conversation. Scope is confirmed in the proposal.
              </p>
            </div>
            <button
              type="button"
              className={styles.recommendationAction}
              onClick={() =>
                activateStage(recommendation.stageId, {
                  focus: mode === "desktop",
                  scroll: mode === "mobile",
                })
              }
            >
              VIEW {recommendedStage.name.toUpperCase()} STAGE
            </button>
          </aside>
        ) : null}

        <nav className={styles.tabNav} aria-label="Service stages">
          <div
            className={styles.tabList}
            role={mode === "desktop" ? "tablist" : undefined}
            aria-label={mode === "desktop" ? "Choose a service stage" : undefined}
          >
            {stageEntries.map(({ stage }, index) => {
              const selected = selectedId === stage.id;
              return (
                <a
                  key={stage.id}
                  ref={(node) => {
                    if (node) tabRefs.current.set(stage.id, node);
                    else tabRefs.current.delete(stage.id);
                  }}
                  id={`service-tab-${stage.id}`}
                  href={stage.anchor}
                  className={styles.tab}
                  role={mode === "desktop" ? "tab" : undefined}
                  aria-selected={mode === "desktop" ? selected : undefined}
                  aria-controls={
                    mode === "desktop"
                      ? `service-panel-${stage.id}`
                      : undefined
                  }
                  tabIndex={mode === "desktop" ? (selected ? 0 : -1) : 0}
                  data-state={selected ? "active" : "inactive"}
                  onClick={(event) => {
                    if (mode !== "desktop") return;
                    event.preventDefault();
                    activateStage(stage.id);
                  }}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  <span className={styles.tabNum}>{stage.num}</span>
                  <span className={styles.tabName}>{stage.name}</span>
                  <span className={styles.tabQuestion}>{stage.q}</span>
                </a>
              );
            })}
          </div>
        </nav>

        <div className={styles.stageStack}>
          {stageEntries.map(({ stage, group }) => {
            const selected = selectedId === stage.id;
            const open =
              mode === "fallback" ||
              (mode === "desktop" ? selected : mobileOpenId === stage.id);

            return (
              <div
                key={stage.id}
                hidden={mode === "desktop" && !selected}
                role={mode === "desktop" ? "tabpanel" : undefined}
                id={
                  mode === "desktop"
                    ? `service-panel-${stage.id}`
                    : undefined
                }
                aria-labelledby={
                  mode === "desktop" ? `service-tab-${stage.id}` : undefined
                }
                tabIndex={mode === "desktop" && selected ? 0 : undefined}
              >
                <details
                  id={stage.id}
                  className={styles.stageDetails}
                  open={open}
                  data-service-stage={stage.id}
                  data-state={open ? "open" : "closed"}
                  onToggle={(event) => onDetailsToggle(event, stage.id)}
                >
                  <summary className={styles.stageSummary}>
                    <span className={styles.summaryNum}>{stage.num}</span>
                    <span className={styles.summaryCopy}>
                      <strong>{stage.name}</strong>
                      <span>{stage.q}</span>
                    </span>
                    <span className={styles.summaryIcon} aria-hidden="true" />
                  </summary>
                  <div>
                    <StageContent stage={stage} group={group} />
                  </div>
                </details>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
