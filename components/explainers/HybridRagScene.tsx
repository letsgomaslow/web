"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { hybridRagStages } from "@/lib/content/explainers";
import styles from "./HybridRagScene.module.css";
import { useSceneActivity } from "./useSceneActivity";

type RenderState =
  | "initializing"
  | "ready"
  | "unavailable"
  | "context-lost";
type Point3 = [number, number, number];
type Color3 = [number, number, number];

type HybridRuntime = {
  contextLost: boolean;
  frameCount: number;
  manualPaused: boolean;
  simulationTime: number;
  render: (progress: number) => void;
  resize: () => void;
  dispose: () => void;
};

const GRAPH_NODE_COUNT = 42;
const MANUAL_PROGRESS = [0, 0.5, 1] as const;
const WHITE: Color3 = [1, 1, 1];
const TEAL: Color3 = [0.451, 0.757, 0.682];
const PURPLE: Color3 = [0.627, 0.439, 0.651];
const PINK: Color3 = [0.953, 0.467, 0.702];
const BLUE: Color3 = [0.275, 0.616, 0.733];
const SATELLITE: Color3 = [0.72, 0.77, 0.85];

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function createDocumentLayout(count: number, random: () => number) {
  return Array.from({ length: count }, (_, index): Point3 => {
    const documentIndex = index % 12;
    const row = Math.floor(documentIndex / 4);
    const column = documentIndex % 4;
    const originX = (column - 1.5) * 150;
    const originY = (1 - row) * 190;
    return [
      originX + (random() - 0.5) * 90,
      originY + (random() - 0.5) * 120,
      (random() - 0.5) * 20,
    ];
  });
}

function createClusterLayout(count: number, random: () => number) {
  const centers: Point3[] = [
    [-170, 110, -40],
    [150, 140, 60],
    [-120, -130, 40],
    [170, -110, -60],
  ];
  return Array.from({ length: count }, (_, index): Point3 => {
    const center = centers[index % centers.length];
    const spread = () => (random() + random() + random() - 1.5) * 62;
    return [
      center[0] + spread(),
      center[1] + spread(),
      center[2] + spread(),
    ];
  });
}

function createGraphNodes(random: () => number) {
  return Array.from({ length: GRAPH_NODE_COUNT }, (): Point3 => {
    const phi = Math.acos(2 * random() - 1);
    const theta = random() * Math.PI * 2;
    const radius = 150 + random() * 110;
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta) * 0.75,
      radius * Math.cos(phi),
    ];
  });
}

function createGraphLayout(
  count: number,
  nodes: Point3[],
  random: () => number,
) {
  return Array.from({ length: count }, (_, index): Point3 => {
    if (index < GRAPH_NODE_COUNT) return nodes[index];
    const node = nodes[index % GRAPH_NODE_COUNT];
    return [
      node[0] + (random() - 0.5) * 14,
      node[1] + (random() - 0.5) * 14,
      node[2] + (random() - 0.5) * 14,
    ];
  });
}

function createEdges(nodes: Point3[]) {
  const edges: [number, number][] = [];
  for (let first = 0; first < nodes.length; first += 1) {
    for (let second = first + 1; second < nodes.length; second += 1) {
      const a = nodes[first];
      const b = nodes[second];
      const distanceSquared =
        (a[0] - b[0]) ** 2 +
        (a[1] - b[1]) ** 2 +
        (a[2] - b[2]) ** 2;
      if (distanceSquared < 160 ** 2 && edges.length < 90) {
        edges.push([first, second]);
      }
    }
  }
  return edges;
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function easeInOut(amount: number) {
  return amount < 0.5
    ? 2 * amount * amount
    : 1 - (-2 * amount + 2) ** 2 / 2;
}

function createHybridRuntime(
  canvas: HTMLCanvasElement,
  host: HTMLDivElement,
  particleCount: number,
): HybridRuntime {
  const count = Math.max(48, Math.round(particleCount));
  const random = seededRandom(0x4d41534c);
  const documentLayout = createDocumentLayout(count, random);
  const clusterLayout = createClusterLayout(count, random);
  const graphNodes = createGraphNodes(random);
  const graphLayout = createGraphLayout(count, graphNodes, random);
  const edges = createEdges(graphNodes);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 1, 3000);
  camera.position.z = 560;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  pointGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const pointMaterial = new THREE.PointsMaterial({
    size: 5,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
  });
  scene.add(new THREE.Points(pointGeometry, pointMaterial));

  const linePositions = new Float32Array(edges.length * 6);
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(linePositions, 3),
  );
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x73c1ae,
    transparent: true,
    opacity: 0,
  });
  scene.add(new THREE.LineSegments(lineGeometry, lineMaterial));

  const runtime: HybridRuntime = {
    contextLost: false,
    frameCount: 0,
    manualPaused: false,
    simulationTime: 0,
    resize() {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    },
    render(progress) {
      const firstTransition = easeInOut(
        Math.min(1, Math.max(0, (progress - 0.18) / 0.32)),
      );
      const secondTransition = easeInOut(
        Math.min(1, Math.max(0, (progress - 0.55) / 0.3)),
      );
      const phase = runtime.simulationTime;
      const clusterColors = [TEAL, PURPLE, BLUE, PINK];

      for (let index = 0; index < count; index += 1) {
        const documentPoint = documentLayout[index];
        const clusterPoint = clusterLayout[index];
        const graphPoint = graphLayout[index];
        const clustered: Point3 = [
          lerp(documentPoint[0], clusterPoint[0], firstTransition),
          lerp(documentPoint[1], clusterPoint[1], firstTransition),
          lerp(documentPoint[2], clusterPoint[2], firstTransition),
        ];
        const offset = index * 3;
        positions[offset] =
          lerp(clustered[0], graphPoint[0], secondTransition) +
          Math.sin(phase + index) * 2.5;
        positions[offset + 1] =
          lerp(clustered[1], graphPoint[1], secondTransition) +
          Math.cos(phase * 1.3 + index) * 2.5;
        positions[offset + 2] = lerp(
          clustered[2],
          graphPoint[2],
          secondTransition,
        );

        const clusterColor = clusterColors[index % clusterColors.length];
        const nodeColor = index < GRAPH_NODE_COUNT ? TEAL : SATELLITE;
        colors[offset] = lerp(
          lerp(WHITE[0], clusterColor[0], firstTransition),
          nodeColor[0],
          secondTransition,
        );
        colors[offset + 1] = lerp(
          lerp(WHITE[1], clusterColor[1], firstTransition),
          nodeColor[1],
          secondTransition,
        );
        colors[offset + 2] = lerp(
          lerp(WHITE[2], clusterColor[2], firstTransition),
          nodeColor[2],
          secondTransition,
        );
      }

      pointGeometry.attributes.position.needsUpdate = true;
      pointGeometry.attributes.color.needsUpdate = true;
      edges.forEach(([first, second], edgeIndex) => {
        const lineOffset = edgeIndex * 6;
        const firstOffset = first * 3;
        const secondOffset = second * 3;
        linePositions.set(
          [
            positions[firstOffset],
            positions[firstOffset + 1],
            positions[firstOffset + 2],
            positions[secondOffset],
            positions[secondOffset + 1],
            positions[secondOffset + 2],
          ],
          lineOffset,
        );
      });
      lineGeometry.attributes.position.needsUpdate = true;
      lineMaterial.opacity = secondTransition * 0.45;
      scene.rotation.y =
        Math.sin(runtime.simulationTime * 0.1) * 0.15 +
        secondTransition * 0.2;
      renderer.render(scene, camera);
      runtime.frameCount += 1;
    },
    dispose() {
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      scene.clear();
      renderer.dispose();
    },
  };

  runtime.resize();
  return runtime;
}

function sceneStatus(
  renderState: RenderState,
  pauseReason: string | null,
  reducedMotion: boolean,
) {
  if (reducedMotion) return "Static view because reduced motion is enabled.";
  if (pauseReason === "capability-unavailable") {
    return "Static view because motion-safety detection is unavailable.";
  }
  if (renderState === "unavailable") return "Static view because WebGL is unavailable.";
  if (renderState === "context-lost") return "Static view while the graphics context recovers.";
  if (renderState === "initializing") return "Preparing the optional 3D view.";
  if (pauseReason === "user") return "Ambient motion paused.";
  if (pauseReason === "document-hidden") return "Ambient motion paused while this tab is hidden.";
  if (pauseReason === "offscreen") return "Ambient motion pauses outside the viewport.";
  return "Ambient motion running.";
}

export function HybridRagScene({
  particleCount = 240,
}: {
  particleCount?: number;
}) {
  const wrapRef = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<HybridRuntime | null>(null);
  const progressRef = useRef(0);
  const activity = useSceneActivity(wrapRef);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 980,
  );
  const [renderState, setRenderState] =
    useState<RenderState>("initializing");

  const manualMode =
    isCompact ||
    activity.prefersReducedMotion ||
    !activity.hasActivityCapabilities ||
    renderState === "unavailable" ||
    renderState === "context-lost";

  const renderCurrentFrame = useCallback(() => {
    const runtime = runtimeRef.current;
    if (!runtime || runtime.contextLost) return false;
    try {
      runtime.render(progressRef.current);
      wrapRef.current?.setAttribute(
        "data-scene-frame",
        String(runtime.frameCount),
      );
      wrapRef.current?.setAttribute(
        "data-simulation-time",
        runtime.simulationTime.toFixed(3),
      );
      return true;
    } catch {
      runtime.contextLost = true;
      setRenderState("unavailable");
      return false;
    }
  }, []);

  useEffect(() => {
    const updateCompactMode = () => setIsCompact(window.innerWidth <= 980);
    updateCompactMode();
    window.addEventListener("resize", updateCompactMode);
    return () => window.removeEventListener("resize", updateCompactMode);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || manualMode) {
      const nextProgress = MANUAL_PROGRESS[stage];
      progressRef.current = nextProgress;
      setProgress(nextProgress);
      renderCurrentFrame();
      return;
    }

    const onScroll = () => {
      const bounds = wrap.getBoundingClientRect();
      const distance = Math.max(bounds.height - window.innerHeight, 1);
      const nextProgress = Math.min(1, Math.max(0, -bounds.top / distance));
      const nextStage = nextProgress < 0.36 ? 0 : nextProgress < 0.72 ? 1 : 2;
      progressRef.current = nextProgress;
      setStage((current) => (current === nextStage ? current : nextStage));
      setProgress((current) =>
        Math.abs(current - nextProgress) > 0.02 ? nextProgress : current,
      );
      renderCurrentFrame();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [manualMode, renderCurrentFrame, stage]);

  useEffect(() => {
    if (
      !activity.initialized ||
      !activity.hasEnteredViewport ||
      !activity.hasActivityCapabilities ||
      activity.prefersReducedMotion
    ) {
      if (activity.prefersReducedMotion) setRenderState("initializing");
      return;
    }

    const canvas = canvasRef.current;
    const host = hostRef.current;
    const sceneRoot = wrapRef.current;
    if (!canvas || !host) return;

    let runtime: HybridRuntime;
    let resizeObserver: ResizeObserver | null = null;
    let disposed = false;
    try {
      runtime = createHybridRuntime(canvas, host, particleCount);
    } catch {
      setRenderState("unavailable");
      return;
    }

    runtimeRef.current = runtime;
    const renderAfterChange = () => {
      if (disposed || !renderCurrentFrame()) return;
      setRenderState("ready");
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      runtime.contextLost = true;
      setRenderState("context-lost");
    };
    const onContextRestored = () => {
      runtime.contextLost = false;
      setRenderState("initializing");
      renderAfterChange();
    };
    const onContextCreationError = () => {
      runtime.contextLost = true;
      setRenderState("unavailable");
    };
    const onResize = () => {
      if (disposed || runtime.contextLost) return;
      runtime.resize();
      renderAfterChange();
    };

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    canvas.addEventListener("webglcontextcreationerror", onContextCreationError);
    window.addEventListener("resize", onResize);
    if (typeof window.ResizeObserver === "function") {
      try {
        resizeObserver = new window.ResizeObserver(onResize);
        resizeObserver.observe(host);
      } catch {
        resizeObserver = null;
      }
    }
    renderAfterChange();

    return () => {
      disposed = true;
      runtime.contextLost = true;
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      canvas.removeEventListener(
        "webglcontextcreationerror",
        onContextCreationError,
      );
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
      runtime.dispose();
      if (runtimeRef.current === runtime) {
        runtimeRef.current = null;
        sceneRoot?.removeAttribute("data-scene-frame");
        sceneRoot?.removeAttribute("data-simulation-time");
      }
    };
  }, [
    activity.hasEnteredViewport,
    activity.hasActivityCapabilities,
    activity.initialized,
    activity.prefersReducedMotion,
    particleCount,
    renderCurrentFrame,
  ]);

  useEffect(() => {
    if (!activity.isActive || renderState !== "ready") return;
    wrapRef.current?.setAttribute("data-deterministic-frame", "false");
    let frame = 0;
    let lastTimestamp: number | null = null;
    const tick = (timestamp: number) => {
      const runtime = runtimeRef.current;
      if (!runtime || runtime.contextLost || runtime.manualPaused) return;
      if (lastTimestamp !== null) {
        runtime.simulationTime += Math.min(
          (timestamp - lastTimestamp) / 1000,
          0.05,
        );
      }
      lastTimestamp = timestamp;
      renderCurrentFrame();
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [activity.isActive, renderCurrentFrame, renderState]);

  const pauseAtCanonicalFrame = () => {
    const runtime = runtimeRef.current;
    if (runtime) {
      runtime.manualPaused = true;
      runtime.simulationTime = 0;
    }
    activity.setUserPaused(true);
    wrapRef.current?.setAttribute("data-deterministic-frame", "true");
    renderCurrentFrame();
  };

  const toggleAmbientMotion = () => {
    if (activity.isUserPaused) {
      if (runtimeRef.current) runtimeRef.current.manualPaused = false;
      wrapRef.current?.setAttribute("data-deterministic-frame", "false");
      activity.setUserPaused(false);
      return;
    }
    pauseAtCanonicalFrame();
  };

  const selectStage = (nextStage: number) => {
    const boundedStage = Math.min(2, Math.max(0, nextStage));
    const nextProgress = MANUAL_PROGRESS[boundedStage];
    setStage(boundedStage);
    progressRef.current = nextProgress;
    setProgress(nextProgress);
    if (renderState === "context-lost") {
      if (runtimeRef.current) runtimeRef.current.manualPaused = false;
      activity.setUserPaused(false);
      return;
    }
    pauseAtCanonicalFrame();
  };

  const status = sceneStatus(
    renderState,
    activity.pauseReason,
    activity.prefersReducedMotion,
  );
  const fallbackVisible =
    activity.prefersReducedMotion ||
    !activity.hasActivityCapabilities ||
    renderState !== "ready";
  const pauseDisabled =
    activity.prefersReducedMotion ||
    !activity.hasActivityCapabilities ||
    renderState === "unavailable" ||
    renderState === "context-lost";
  const rootClass =
    activity.prefersReducedMotion ||
    !activity.hasActivityCapabilities ||
    renderState === "unavailable"
      ? styles.wrapStatic
      : styles.scroller;

  return (
    <section
      ref={wrapRef}
      className={rootClass}
      aria-labelledby="hybrid-rag-scene-title"
      data-scene-state={renderState}
      data-webgl-state={renderState}
      data-visual-ready={
        renderState === "ready" &&
        activity.hasActivityCapabilities &&
        !activity.prefersReducedMotion
          ? "true"
          : "false"
      }
      data-scene-capabilities={
        activity.hasActivityCapabilities ? "available" : "unavailable"
      }
      data-scene-active={
        activity.isActive && renderState === "ready" ? "true" : "false"
      }
      data-pause-reason={activity.pauseReason ?? "none"}
      data-reduced-motion={activity.prefersReducedMotion ? "true" : "false"}
      data-stage={stage + 1}
    >
      <h2 id="hybrid-rag-scene-title" className="sr-only">
        How company files become retrieval structures
      </h2>
      <div className={styles.sticky}>
        <div className={styles.stages}>
          <div className={styles.stageList}>
            {hybridRagStages.map((item, index) => (
              <article
                key={item.tag}
                className={styles.stage}
                data-active={index === stage ? "true" : "false"}
                aria-current={index === stage ? "step" : undefined}
              >
                <div className={styles.stageTag}>{item.tag}</div>
                <div className={styles.stageTitle}>{item.title}</div>
                <p className={styles.stageDesc}>{item.desc}</p>
              </article>
            ))}
          </div>

          <div
            className={styles.stepControls}
            role="group"
            aria-label="Transformation steps"
          >
            <button
              type="button"
              onClick={() => selectStage(stage - 1)}
              disabled={stage === 0}
            >
              Previous step
            </button>
            <span aria-hidden="true">
              {stage + 1} / {hybridRagStages.length}
            </span>
            <button
              type="button"
              onClick={() => selectStage(stage + 1)}
              disabled={stage === hybridRagStages.length - 1}
            >
              Next step
            </button>
          </div>

          <div className={styles.sceneControls}>
            <button
              type="button"
              aria-pressed={activity.isUserPaused}
              onClick={toggleAmbientMotion}
              disabled={pauseDisabled}
            >
              {pauseDisabled
                ? "Static view"
                : activity.isUserPaused
                  ? "Resume ambient motion"
                  : "Pause ambient motion"}
            </button>
            <p
              id="hybrid-rag-scene-status"
              className={styles.status}
              role="status"
              aria-live="polite"
            >
              Step {stage + 1} of {hybridRagStages.length}: {hybridRagStages[stage].title}. {status}
            </p>
          </div>

          <p className={styles.progress} aria-hidden="true">
            {manualMode
              ? `STEP ${stage + 1} OF ${hybridRagStages.length}`
              : `SCROLL TO ADVANCE · ${Math.round(progress * 100)}%`}
          </p>
        </div>

        <div ref={hostRef} className={styles.visual}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-hidden="true"
          />
          <div
            className={styles.fallback}
            data-visible={fallbackVisible ? "true" : "false"}
            data-webgl-fallback={fallbackVisible ? "visible" : "hidden"}
            aria-hidden={!fallbackVisible}
          >
            <div className={styles.fallbackRail} aria-hidden="true">
              <span>FILES</span>
              <i>01</i>
              <span>MEANING</span>
              <i>02</i>
              <span>RELATIONSHIPS</span>
            </div>
            <strong>{hybridRagStages[stage].title}</strong>
            <p>{hybridRagStages[stage].desc}</p>
            <small>{status}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
