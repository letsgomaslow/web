"use client";

import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { harnessNodes } from "@/lib/content/explainers";
import styles from "./HarnessScene.module.css";
import { useSceneActivity } from "./useSceneActivity";

type RenderState =
  | "initializing"
  | "ready"
  | "unavailable"
  | "context-lost";

type HarnessRuntime = {
  contextLost: boolean;
  frameCount: number;
  manualPaused: boolean;
  simulationTime: number;
  render: (selected: number) => void;
  resize: () => void;
  rotateBy: (deltaX: number, deltaY: number) => void;
  setCanonicalPose: (selected: number) => void;
  dispose: () => void;
};

function createHarnessRuntime(
  canvas: HTMLCanvasElement,
  host: HTMLDivElement,
  buttonRefs: MutableRefObject<Array<HTMLButtonElement | null>>,
): HarnessRuntime {
  const width = () => Math.max(host.clientWidth, 1);
  const height = () => Math.max(host.clientHeight, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width() / height(), 1, 2000);
  camera.position.z = 520;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(item: T) => {
    disposables.push(item);
    return item;
  };
  const group = new THREE.Group();
  scene.add(group);

  const core = new THREE.Mesh(
    track(new THREE.IcosahedronGeometry(62, 1)),
    track(
      new THREE.MeshBasicMaterial({
        color: 0x73c1ae,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      }),
    ),
  );
  group.add(core);
  const innerCore = new THREE.Mesh(
    track(new THREE.IcosahedronGeometry(40, 1)),
    track(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      }),
    ),
  );
  group.add(innerCore);

  const radius = 190;
  const nodeMeshes = harnessNodes.map((_, index) => {
    const angle = (index / harnessNodes.length) * Math.PI * 2;
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      index % 2 === 0 ? 46 : -46,
      Math.sin(angle) * radius,
    );
    const mesh = new THREE.Mesh(
      track(new THREE.SphereGeometry(11, 20, 20)),
      track(new THREE.MeshBasicMaterial({ color: 0xa070a6 })),
    );
    mesh.position.copy(position);
    group.add(mesh);

    const lineGeometry = track(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        position.clone(),
      ]),
    );
    const lineMaterial = track(
      new THREE.LineBasicMaterial({
        color: 0x654c8f,
        transparent: true,
        opacity: 0.5,
      }),
    );
    group.add(new THREE.Line(lineGeometry, lineMaterial));
    return mesh;
  });

  const ringGeometry = track(
    new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 90 }, (_, index) => {
        const angle = (index / 89) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius,
        );
      }),
    ),
  );
  const ringMaterial = track(
    new THREE.LineBasicMaterial({
      color: 0x73c1ae,
      transparent: true,
      opacity: 0.18,
    }),
  );
  group.add(new THREE.Line(ringGeometry, ringMaterial));

  const projected = new THREE.Vector3();
  let rotationY = 0.6;
  let rotationX = 0.12;
  const runtime: HarnessRuntime = {
    contextLost: false,
    frameCount: 0,
    manualPaused: false,
    simulationTime: 0,
    resize() {
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      renderer.setSize(width(), height(), false);
    },
    rotateBy(deltaX, deltaY) {
      rotationY += deltaX * 0.006;
      rotationX = Math.max(
        -0.7,
        Math.min(0.7, rotationX + deltaY * 0.003),
      );
    },
    setCanonicalPose(selected) {
      const selectedAngle = (selected / harnessNodes.length) * Math.PI * 2;
      rotationY = 0.6 - selectedAngle;
      rotationX = 0.12;
      runtime.simulationTime = 0;
    },
    render(selected) {
      group.rotation.y = rotationY;
      group.rotation.x = rotationX;
      core.rotation.y = runtime.simulationTime * 0.4;
      innerCore.rotation.y = -runtime.simulationTime * 0.6;
      group.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);

      nodeMeshes.forEach((mesh, index) => {
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.color.setHex(index === selected ? 0x73c1ae : 0xa070a6);
        const pulse = Math.sin(runtime.simulationTime * 4) * 0.1;
        mesh.scale.setScalar(index === selected ? 1.45 + pulse : 1);
        projected
          .copy(mesh.position)
          .applyMatrix4(group.matrixWorld)
          .project(camera);
        const button = buttonRefs.current[index];
        if (!button) return;
        button.style.left = `${(projected.x * 0.5 + 0.5) * width()}px`;
        button.style.top = `${(-projected.y * 0.5 + 0.5) * height()}px`;
        button.style.opacity = "1";
        button.style.zIndex = projected.z > 0.994 ? "1" : "3";
      });
      renderer.render(scene, camera);
      runtime.frameCount += 1;
    },
    dispose() {
      disposables.forEach((item) => item.dispose());
      scene.clear();
      renderer.dispose();
    },
  };
  runtime.resize();
  return runtime;
}

function sceneStatus(
  state: RenderState,
  pauseReason: string | null,
  reducedMotion: boolean,
  autoRotate: boolean,
) {
  if (reducedMotion) return "Static view because reduced motion is enabled.";
  if (pauseReason === "capability-unavailable") {
    return "Static view because motion-safety detection is unavailable.";
  }
  if (state === "unavailable") return "Static view because WebGL is unavailable.";
  if (state === "context-lost") return "Static view while the graphics context recovers.";
  if (state === "initializing") return "Preparing the optional 3D view.";
  if (!autoRotate) return "Static 3D view. Component controls remain available.";
  if (pauseReason === "user") return "Rotation paused.";
  if (pauseReason === "document-hidden") return "Rotation paused while this tab is hidden.";
  if (pauseReason === "offscreen") return "Rotation pauses outside the viewport.";
  return "Slow rotation running.";
}

export function HarnessScene({ autoRotate = true }: { autoRotate?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const runtimeRef = useRef<HarnessRuntime | null>(null);
  const selectedRef = useRef(0);
  const activity = useSceneActivity(rootRef);
  const setUserPaused = activity.setUserPaused;
  const [selected, setSelected] = useState(0);
  const [renderState, setRenderState] =
    useState<RenderState>("initializing");

  const renderCurrentFrame = useCallback(() => {
    const runtime = runtimeRef.current;
    if (!runtime || runtime.contextLost) return false;
    try {
      runtime.render(selectedRef.current);
      rootRef.current?.setAttribute(
        "data-scene-frame",
        String(runtime.frameCount),
      );
      rootRef.current?.setAttribute(
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
    selectedRef.current = selected;
    renderCurrentFrame();
  }, [renderCurrentFrame, selected]);

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
    const sceneRoot = rootRef.current;
    if (!canvas || !host) return;

    let runtime: HarnessRuntime;
    let resizeObserver: ResizeObserver | null = null;
    let disposed = false;
    try {
      runtime = createHarnessRuntime(canvas, host, buttonRefs);
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

    let activePointerId: number | null = null;
    let previousX = 0;
    let previousY = 0;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      activePointerId = event.pointerId;
      previousX = event.clientX;
      previousY = event.clientY;
      setUserPaused(true);
      runtime.manualPaused = true;
      rootRef.current?.setAttribute("data-deterministic-frame", "false");
      canvas.setPointerCapture(event.pointerId);
      canvas.dataset.dragging = "true";
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      runtime.rotateBy(event.clientX - previousX, event.clientY - previousY);
      previousX = event.clientX;
      previousY = event.clientY;
      renderCurrentFrame();
    };
    const finishPointer = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      activePointerId = null;
      delete canvas.dataset.dragging;
    };

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    canvas.addEventListener("webglcontextcreationerror", onContextCreationError);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", finishPointer);
    canvas.addEventListener("pointercancel", finishPointer);
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
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", finishPointer);
      canvas.removeEventListener("pointercancel", finishPointer);
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
    setUserPaused,
    renderCurrentFrame,
  ]);

  useEffect(() => {
    if (!activity.isActive || !autoRotate || renderState !== "ready") return;
    rootRef.current?.setAttribute("data-deterministic-frame", "false");
    let frame = 0;
    let lastTimestamp: number | null = null;
    const tick = (timestamp: number) => {
      const runtime = runtimeRef.current;
      if (!runtime || runtime.contextLost || runtime.manualPaused) return;
      if (lastTimestamp !== null) {
        const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
        runtime.simulationTime += delta;
        runtime.rotateBy(delta * 7.9, 0);
      }
      lastTimestamp = timestamp;
      renderCurrentFrame();
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [activity.isActive, autoRotate, renderCurrentFrame, renderState]);

  const pauseAtCanonicalPose = () => {
    const runtime = runtimeRef.current;
    if (runtime) {
      runtime.manualPaused = true;
      runtime.setCanonicalPose(selectedRef.current);
    }
    setUserPaused(true);
    rootRef.current?.setAttribute("data-deterministic-frame", "true");
    renderCurrentFrame();
  };

  const toggleRotation = () => {
    if (activity.isUserPaused) {
      if (runtimeRef.current) runtimeRef.current.manualPaused = false;
      rootRef.current?.setAttribute("data-deterministic-frame", "false");
      setUserPaused(false);
      return;
    }
    pauseAtCanonicalPose();
  };

  const selectNode = (index: number) => {
    selectedRef.current = index;
    setSelected(index);
    const runtime = runtimeRef.current;
    if (runtime) {
      runtime.manualPaused = true;
      runtime.setCanonicalPose(index);
    }
    setUserPaused(true);
    rootRef.current?.setAttribute("data-deterministic-frame", "true");
    renderCurrentFrame();
  };

  const node = harnessNodes[selected];
  const status = sceneStatus(
    renderState,
    activity.pauseReason,
    activity.prefersReducedMotion,
    autoRotate,
  );
  const fallbackVisible =
    activity.prefersReducedMotion ||
    !activity.hasActivityCapabilities ||
    renderState !== "ready";
  const pauseDisabled =
    !autoRotate ||
    activity.prefersReducedMotion ||
    !activity.hasActivityCapabilities ||
    renderState === "unavailable" ||
    renderState === "context-lost";

  return (
    <section
      ref={rootRef}
      className={styles.root}
      aria-labelledby="harness-scene-title"
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
        activity.isActive && autoRotate && renderState === "ready"
          ? "true"
          : "false"
      }
      data-pause-reason={activity.pauseReason ?? "none"}
      data-reduced-motion={activity.prefersReducedMotion ? "true" : "false"}
    >
      <h2 id="harness-scene-title" className="sr-only">
        The six parts surrounding an AI model
      </h2>
      <div className={styles.canvasCol}>
        <div ref={hostRef} className={styles.canvasFrame}>
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
            <div className={styles.staticCore} aria-hidden="true">
              MODEL
            </div>
            <strong>Six operating controls surround the model</strong>
            <p>{status}</p>
          </div>
          <div
            className={styles.nodeLayer}
            data-ready={!fallbackVisible ? "true" : "false"}
            role="group"
            aria-label="Harness components"
          >
            {harnessNodes.map((item, index) => (
              <button
                key={item.label}
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                type="button"
                className={styles.nodeLabel}
                data-active={index === selected ? "true" : "false"}
                aria-pressed={index === selected}
                aria-controls="harness-detail-panel"
                onClick={() => selectNode(index)}
                onFocus={pauseAtCanonicalPose}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.sceneControls}>
          <button
            type="button"
            aria-pressed={activity.isUserPaused}
            onClick={toggleRotation}
            disabled={pauseDisabled}
          >
            {pauseDisabled
              ? "Static view"
              : activity.isUserPaused
                ? "Resume rotation"
                : "Pause rotation"}
          </button>
          <p role="status" aria-live="polite">
            {status}
          </p>
        </div>
      </div>

      <aside
        id="harness-detail-panel"
        className={styles.panel}
        aria-labelledby="harness-node-title"
      >
        <div className={styles.tag}>{node.tag}</div>
        <h3 id="harness-node-title" className={styles.title}>
          {node.title}
        </h3>
        <p className={styles.desc}>{node.desc}</p>
        <ul className={styles.bullets}>
          {node.bullets.map((bullet) => (
            <li key={bullet}>
              <span aria-hidden="true">✓</span>
              {bullet}
            </li>
          ))}
        </ul>
        <p className={styles.hint}>
          {fallbackVisible
            ? "Choose a component to inspect its role. The static view keeps the full system map available."
            : (
                <>
                  Choose a component to inspect its role.
                  <span className={styles.dragHint}>
                    {" "}
                    Drag the 3D view to change the angle.
                  </span>
                </>
              )}
        </p>
      </aside>
    </section>
  );
}
