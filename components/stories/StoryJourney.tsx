"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import styles from "./StoryJourney.module.css";
import { StorySculpture } from "./StorySculpture";

export type StoryJourneyVariant =
  | "knowledge"
  | "memory"
  | "workflow"
  | "deployment"
  | "delivery"
  | "engagement"
  | "evidence"
  | "scope"
  | "infrastructure"
  | "manufacturing";

export type StoryJourneyItem = Readonly<{
  label: string;
  detail?: string;
}>;

export type StoryJourneyStep = Readonly<{
  id: string;
  label: string;
  title: string;
  body: string;
  items: readonly StoryJourneyItem[];
  result: string;
  status?: string;
}>;

export type StoryJourneyProps = Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  variant: StoryJourneyVariant;
  steps: readonly StoryJourneyStep[];
  afterHref?: string;
  afterLabel?: string;
}>;

const variantLabels: Record<StoryJourneyVariant, string> = {
  knowledge: "Knowledge path from source file to cited answer",
  memory: "Memory path from proposal to approved reuse",
  workflow: "Controlled workflow from scoped request to trace",
  deployment: "Data boundary between local and cloud systems",
  delivery: "Reusable skill delivered through connected tools",
  engagement:
    "Engagement path from question to proof, implementation, and handover",
  evidence: "Evidence path from event to reviewable record",
  scope:
    "Independent ways to begin with discovery, setup, knowledge, or a workflow",
  infrastructure:
    "Shared infrastructure connecting knowledge, memory, skills, tools, and visibility",
  manufacturing:
    "Manufacturing tasks for finding drawings, preparing quotes, and assembling reports",
};

type SceneProps = { active: number; count: number };

function phase(active: number, count: number, phases = 5) {
  return count <= 1 ? 0 : Math.round((active / (count - 1)) * (phases - 1));
}

function nodeClass(reached: boolean, current: boolean) {
  return `${styles.sceneNode} ${reached ? styles.reached : ""} ${
    current ? styles.current : ""
  }`;
}

function KnowledgeScene({ active, count }: SceneProps) {
  const current = phase(active, count);
  const dotX = [128, 225, 339, 524, 582][current];
  return (
    <svg viewBox="0 0 720 390" aria-hidden="true">
      <defs>
        <marker id="knowledge-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 8 4 0 8z" />
        </marker>
      </defs>
      <path className={styles.knowledgeRail} d="M128 195H225M296 195h43M414 122h56M414 267h56M524 195h58" />
      <path className={`${styles.dataRoute} ${current >= 2 ? styles.liveRoute : ""}`} d="M296 195c30 0 28-73 51-73m-51 73c30 0 28 72 51 72m67-145c75 0 42 73 110 73m-110 72c75 0 42-72 110-72" markerEnd="url(#knowledge-arrow)" />
      <g className={nodeClass(current >= 0, current === 0)} transform="translate(34 126)">
        <path className={styles.paperBack} d="M18 0h76l26 26v128H18z" />
        <path className={styles.paperFront} d="M0 20h76l26 26v128H0z" />
        <path d="M76 20v26h26M18 75h64M18 98h48M18 121h58" />
        <text x="8" y="205">SOURCE FILES</text>
      </g>
      <g className={nodeClass(current >= 1, current === 1)} transform="translate(225 135)">
        <rect width="72" height="120" /><path d="M15 28h42M15 51h31M15 74h45M15 97h25" />
        <text x="2" y="155">EXTRACT</text>
      </g>
      <g className={nodeClass(current >= 2, current === 2)} transform="translate(347 74)">
        <rect width="67" height="96" />
        <circle cx="20" cy="18" r="6" /><circle cx="44" cy="48" r="6" /><circle cx="20" cy="78" r="6" />
        <text x="-8" y="-18">VECTOR / MEANING</text>
      </g>
      <g className={nodeClass(current >= 2, current === 2)} transform="translate(347 220)">
        <rect width="67" height="96" />
        <path d="m15 28 35-10 2 57-37-9zM15 28l37 47M50 18 15 66" />
        <circle cx="15" cy="28" r="5" /><circle cx="50" cy="18" r="5" /><circle cx="52" cy="75" r="5" /><circle cx="15" cy="66" r="5" />
        <text x="-2" y="-18">GRAPH</text><text x="-21" y="123">RELATIONSHIPS</text>
      </g>
      <g className={nodeClass(current >= 3, current === 3)} transform="translate(470 148)">
        <path className={styles.mergeShape} d="M0 0h54v94H0z" /><path d="M13 25h28M13 47h28M13 69h28" />
        <text x="-4" y="127">BRIEFING</text>
      </g>
      <g className={nodeClass(current >= 4, current === 4)} transform="translate(582 119)">
        <rect className={styles.answerSheet} width="104" height="150" />
        <path d="M18 33h68M18 58h50M18 83h72" /><path className={styles.citationLine} d="M18 116h68" />
        <circle cx="88" cy="116" r="8" /><text x="-1" y="184">CITED ANSWER</text>
      </g>
      <circle className={styles.travelDot} cx={dotX} cy="195" r="8" />
    </svg>
  );
}

function WorkflowScene({ active, count }: SceneProps) {
  const current = phase(active, count);
  const dotX = [118, 213, 357, 524, 608][current];
  return (
    <svg viewBox="0 0 720 390" aria-hidden="true">
      <path className={styles.workflowRail} d="M118 196h95M295 196h62M449 196h75M579 196h29" />
      <g className={nodeClass(current >= 0, current === 0)} transform="translate(30 143)"><rect width="88" height="106" /><path d="M15 27h58M15 51h42M15 75h56" /><text x="7" y="140">SCOPED REQUEST</text></g>
      <g className={nodeClass(current >= 1, current === 1)} transform="translate(213 129)"><path className={styles.contextShape} d="M0 0h82v134H0z" /><path d="M15 28h52M15 53h37M15 78h52M15 103h31" /><text x="3" y="168">CONTEXT</text></g>
      <g className={nodeClass(current >= 2, current === 2)} transform="translate(357 153)"><path className={styles.toolShape} d="m46 0 46 27v54l-46 27L0 81V27z" /><path d="M24 54h44M46 32v44" /><text x="20" y="143">TOOLS</text></g>
      <g className={nodeClass(current >= 3, current === 3)} transform="translate(524 196)"><path className={styles.humanGate} d="m0-55 55 55-55 55-55-55z" /><path d="m-20 1 14 15 29-34" /><text x="-48" y="92">HUMAN DECISION</text></g>
      <g className={nodeClass(current >= 4, current === 4)} transform="translate(608 134)"><rect width="80" height="124" /><path d="M14 25h52M14 48h38M14 71h50M14 94h44" /><text x="17" y="158">TRACE</text></g>
      <circle className={styles.travelDot} cx={dotX} cy="196" r="8" />
    </svg>
  );
}

function ManufacturingScene({ active }: SceneProps) {
  const lanes = [
    ["DRAWING", "SOURCE + REVISION"],
    ["QUOTE", "COMPARABLES + GAPS"],
    ["REPORT", "FIELDS + REVIEW"],
  ] as const;
  return (
    <svg viewBox="0 0 720 390" aria-hidden="true">
      {lanes.map(([label, detail], index) => (
        <g key={label} className={nodeClass(index === active, index === active)} transform={`translate(${20 + index * 235} 64)`}>
          <rect className={styles.workbench} width="210" height="252" />
          <text x="18" y="31">0{index + 1} / {label}</text><text className={styles.microText} x="18" y="51">{detail}</text>
          {index === 0 ? <><path className={styles.drawingSheet} d="M31 86h130v96H31zM45 99h58v43H45zM116 99h31v70h-31z" /><path d="M42 202h116M63 191v22M139 191v22" /><circle cx="166" cy="196" r="22" /><text x="151" y="200">REV</text></> : null}
          {index === 1 ? <><path d="M33 100h142M33 139h142M33 178h142" /><rect x="46" y="88" width="28" height="24" /><rect x="97" y="127" width="42" height="24" /><rect x="67" y="166" width="86" height="24" /><path className={styles.openGap} d="M39 222h132" /><text x="55" y="216">HUMAN PRICE</text></> : null}
          {index === 2 ? <><rect x="34" y="87" width="142" height="107" /><path d="M34 119h142M34 151h142M78 87v107M129 87v107" /><path className={styles.reportCheck} d="m61 221 18 17 38-42" /><text x="119" y="224">REVIEW</text></> : null}
        </g>
      ))}
    </svg>
  );
}

function ScopeScene({ active }: SceneProps) {
  const scopes = [
    ["DISCOVERY", "Map the work"],
    ["SETUP", "Prepare the workspace"],
    ["KNOWLEDGE", "Connect sources"],
    ["WORKFLOW", "Reach a decision"],
  ] as const;
  const positions = [[55, 50], [482, 50], [55, 241], [482, 241]];
  return (
    <svg viewBox="0 0 720 390" aria-hidden="true">
      <path className={styles.scopeAxes} d="M360 64v262M98 195h524" />
      <g className={styles.scopeCenter} transform="translate(306 141)"><rect width="108" height="108" /><text x="21" y="49">CHOOSE</text><text x="31" y="69">ONE</text></g>
      {scopes.map(([label, detail], index) => {
        const [x, y] = positions[index];
        return <g key={label} className={nodeClass(index === active, index === active)} transform={`translate(${x} ${y})`}><rect width="184" height="96" /><text x="16" y="35">0{index + 1} / {label}</text><text className={styles.microText} x="16" y="60">{detail}</text><path d={index < 2 ? "M92 96v49" : "M92-46V0"} /></g>;
      })}
    </svg>
  );
}

function InfrastructureScene({ active, count }: SceneProps) {
  const current = phase(active, count);
  const layers = [
    ["KNOWLEDGE", "SOURCE + RETRIEVAL"],
    ["MEMORY", "APPROVED + SCOPED"],
    ["SKILLS", "VERSIONED PROCEDURE"],
    ["CONNECTIONS", "NARROW TOOL ACCESS"],
    ["VISIBILITY", "RUN + REVIEW TRACE"],
  ] as const;
  return (
    <svg viewBox="0 0 720 390" aria-hidden="true">
      <g transform="translate(230 91)"><path className={styles.foundationCore} d="M0 0h260v208H0z" /><path className={styles.coreOrbit} d="M63 104a67 67 0 1 0 134 0 67 67 0 1 0-134 0" /><circle className={styles.coreMark} cx="130" cy="104" r="34" /><text x="88" y="100">SHARED</text><text x="72" y="122">FOUNDATION</text></g>
      {layers.map(([name, detail], index) => {
        const side = index % 2 === 0 ? 0 : 538;
        const y = 38 + index * 68;
        return <g key={name} className={nodeClass(index <= current, index === current)} transform={`translate(${side} ${y})`}><rect width="182" height="52" /><text x="14" y="22">{name}</text><text className={styles.microText} x="14" y="39">{detail}</text><path d={side === 0 ? "M182 26h48" : "M-48 26h48"} /></g>;
      })}
      <circle className={styles.travelDot} cx={current % 2 === 0 ? 182 : 538} cy={64 + current * 68} r="8" />
    </svg>
  );
}

function MemoryScene({ active, count }: SceneProps) {
  const current = phase(active, count, 4);
  const dotX = [128, 223, 387, 568][current];
  return (
    <svg viewBox="0 0 720 390" aria-hidden="true">
      <path className={styles.memoryRail} d="M128 194h95M307 194h80M487 194h80" />
      <g className={nodeClass(current >= 0, current === 0)} transform="translate(35 119)"><path className={styles.proposalSheet} d="M0 0h93l25 25v139H0z" /><path d="M93 0v25h25M18 62h77M18 88h55M18 114h68" /><text x="7" y="199">PROPOSE</text></g>
      <g className={nodeClass(current >= 1, current === 1)} transform="translate(264 194)"><path className={styles.approvalGate} d="m0-58 58 58-58 58-58-58z" /><path d="m-22 1 15 16 31-36" /><text x="-43" y="100">APPROVE</text></g>
      <g className={nodeClass(current >= 2, current === 2)} transform="translate(387 105)"><path className={styles.vault} d="M0 0h100v178H0z" /><rect x="14" y="18" width="72" height="38" /><rect x="14" y="70" width="72" height="38" /><rect x="14" y="122" width="72" height="38" /><path className={styles.vaultLock} d="M39 84v-10a11 11 0 0 1 22 0v10" /><text x="9" y="211">STORE + SCOPE</text></g>
      <g className={nodeClass(current >= 3, current === 3)} transform="translate(568 98)"><circle cx="48" cy="38" r="30" /><circle cx="16" cy="132" r="24" /><circle cx="82" cy="132" r="24" /><path d="M48 68v30M48 98 16 108M48 98l34 10" /><text x="2" y="191">APPROVED AGENTS</text></g>
      <circle className={styles.travelDot} cx={dotX} cy="194" r="8" />
    </svg>
  );
}

function DeploymentScene({ active, count }: SceneProps) {
  const current = phase(active, count);
  return (
    <svg viewBox="0 0 720 390" aria-hidden="true">
      <rect className={styles.localZone} x="22" y="35" width="422" height="320" /><rect className={styles.cloudZone} x="484" y="35" width="214" height="320" /><path className={styles.boundary} d="M464 24v342" />
      <text x="44" y="69">YOUR CONTROLLED ENVIRONMENT</text><text x="513" y="69">APPROVED CLOUD</text>
      <g className={nodeClass(current >= 0, current === 0)} transform="translate(52 115)"><rect width="116" height="90" /><path d="M18 25h80M18 48h58M18 71h72" /><text x="2" y="123">PRIVATE DATA</text></g>
      <g className={nodeClass(current >= 1, current === 1)} transform="translate(244 108)"><path className={styles.chip} d="M0 0h120v120H0zM27 27h66v66H27z" /><path d="M-13 22H0M-13 58H0M-13 94H0M120 22h13M120 58h13M120 94h13" /><text x="13" y="153">LOCAL MODEL</text></g>
      <g className={nodeClass(current >= 2, current === 2)} transform="translate(525 126)"><path className={styles.cloud} d="M0 78c-30 0-35-44-5-53C4-6 57-7 67 23c34-5 49 55 8 55z" /><text x="5" y="114">SELECT TASKS</text></g>
      <g className={nodeClass(current >= 3, current === 3)} transform="translate(369 248)"><path className={styles.router} d="m46 0 46 46-46 46L0 46z" /><path d="M24 46h44M56 34l12 12-12 12" /><text x="3" y="124">POLICY ROUTER</text></g>
      <g className={nodeClass(current >= 4, current === 4)} transform="translate(55 271)"><path d="M0 46h24l18-29 23 56 22-42 20 15h60" /><text x="0" y="94">ROUTE + QUALITY TRACE</text></g>
      <path className={`${styles.dataRoute} ${current >= 2 ? styles.liveRoute : ""}`} d="M168 160h76m120 8h56c28 0 20 44 44 44s16-44 61-44" />
    </svg>
  );
}

const flowLabels = {
  delivery: ["PROCEDURE", "TEST", "GATEWAY", "APPROVE", "REUSE"],
  engagement: ["QUESTION", "PROOF", "IMPLEMENT", "HANDOVER"],
  evidence: ["EVENT", "SOURCE", "DECISION", "RECEIPT"],
} as const;

function FlowScene({
  active,
  count,
  variant,
}: SceneProps & { variant: "delivery" | "engagement" | "evidence" }) {
  const labels = flowLabels[variant];
  const current = phase(active, count, labels.length);
  const points = labels.map((_, index) => ({
    x: labels.length === 5 ? 56 + index * 145 : 76 + index * 180,
    y: index % 2 === 0 ? 96 : 204,
  }));
  return (
    <svg viewBox="0 0 720 390" aria-hidden="true">
      <path className={styles.flowRail} d={labels.length === 5 ? "M112 195h496" : "M134 195h540"} />
      {labels.map((label, index) => {
        const point = points[index];
        return <g key={label} className={nodeClass(index <= current, index === current)} transform={`translate(${point.x} ${point.y})`}><path className={styles.flowArtifact} d="M0 0h112v100H0z" /><text x="14" y="31">0{index + 1}</text><text x="14" y="60">{label}</text><path d={index % 2 === 0 ? "M56 100v-1" : "M56-9V0"} /></g>;
      })}
      <circle className={styles.travelDot} cx={points[current].x + 56} cy="195" r="8" />
    </svg>
  );
}

function JourneyDiagram({ variant, active, count }: SceneProps & { variant: StoryJourneyVariant }) {
  const props = { active, count };
  if (variant === "knowledge") return <KnowledgeScene {...props} />;
  if (variant === "workflow") return <WorkflowScene {...props} />;
  if (variant === "manufacturing") return <ManufacturingScene {...props} />;
  if (variant === "scope") return <ScopeScene {...props} />;
  if (variant === "infrastructure") return <InfrastructureScene {...props} />;
  if (variant === "memory") return <MemoryScene {...props} />;
  if (variant === "deployment") return <DeploymentScene {...props} />;
  if (variant === "delivery" || variant === "engagement" || variant === "evidence") {
    return <FlowScene {...props} variant={variant} />;
  }
  return <WorkflowScene {...props} />;
}

export function StoryJourney({
  id,
  eyebrow,
  title,
  description,
  variant,
  steps,
  afterHref,
  afterLabel,
}: StoryJourneyProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeStep = steps[active] ?? steps[0];
  const sceneVariant = variant;

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setPaused(query.matches);
      setReduceMotion(query.matches);
    };
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || reduceMotion) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (Number.isFinite(index)) setActive(index);
      },
      { rootMargin: "-28% 0px -46%", threshold: [0, 0.2, 0.5, 0.8] },
    );
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [steps.length, reduceMotion]);

  const selectStep = (index: number) => {
    setActive(index);
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 820px)").matches;
    if (!compact && !reduceMotion) {
      stepRefs.current[index]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    }
  };

  const onControlKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % steps.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + steps.length) % steps.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = steps.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectStep(next);
    controlRefs.current[next]?.focus({ preventScroll: true });
  };

  if (!activeStep) return null;

  return (
    <section
      className={styles.journey}
      id={id}
      data-variant={sceneVariant}
      data-paused={paused ? "true" : "false"}
      data-active-step={activeStep.id}
    >
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <a className={styles.skip} href={`#${id}-after`}>Skip the guided view</a>
      </div>
      <div className={styles.layout}>
        <aside className={styles.visual} aria-label="Story diagram">
          <div className={styles.visualTop}>
            <span>{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
            <span className={styles.liveLabel}><i /> INTERACTIVE</span>
            <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
              {paused ? "Resume motion" : "Pause motion"}
            </button>
          </div>
          <div className={styles.theater} data-scene={sceneVariant}>
            <div className={styles.sceneHeading}>
              <span>{activeStep.label}</span><strong>{activeStep.title}</strong>
            </div>
            <div className={styles.diagram} role="img" aria-label={variantLabels[sceneVariant]}>
              <StorySculpture variant={sceneVariant} steps={steps} active={active} paused={paused}>
                <JourneyDiagram variant={sceneVariant} active={active} count={steps.length} />
              </StorySculpture>
            </div>
          </div>
          <div className={styles.activeResult} aria-live="polite" aria-atomic="true">
            <span>{activeStep.label} / RESULT</span><strong>{activeStep.result}</strong>
          </div>
          <div className={styles.stepControls} aria-label="Choose a story stage">
            {steps.map((step, index) => (
              <button
                key={step.id}
                ref={(node) => { controlRefs.current[index] = node; }}
                type="button"
                aria-label={`Show ${step.title}`}
                aria-current={active === index ? "step" : undefined}
                onClick={() => selectStep(index)}
                onKeyDown={(event) => onControlKey(event, index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>{step.label}
              </button>
            ))}
          </div>
        </aside>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <article
              key={step.id}
              id={`${id}-${step.id}`}
              data-index={index}
              data-active={active === index ? "true" : "false"}
              ref={(node) => { stepRefs.current[index] = node; }}
            >
              <div className={styles.stepLabel}><span>{String(index + 1).padStart(2, "0")}</span>{step.label}</div>
              <h3>{step.title}</h3><p>{step.body}</p>
              <dl>{step.items.map((item) => <div key={item.label}><dt>{item.label}</dt>{item.detail ? <dd>{item.detail}</dd> : null}</div>)}</dl>
              <p className={styles.result}><span>Result</span>{step.result}</p>
              {step.status ? <p className={styles.status}>{step.status}</p> : null}
            </article>
          ))}
        </div>
      </div>
      <div className={styles.after} id={`${id}-after`} tabIndex={-1}>
        {afterHref && afterLabel ? <Link href={afterHref}>{afterLabel}<span aria-hidden="true"> →</span></Link> : <span>Continue below for the reference view.</span>}
      </div>
    </section>
  );
}
