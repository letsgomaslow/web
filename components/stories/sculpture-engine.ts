import * as THREE from "three";
import type { StoryJourneyVariant } from "./StoryJourney";
import type { SculptureScene, SculptureState, SculptureStep } from "./sculpture-kit";
import { createKnowledgeScene } from "./scenes/knowledge-scenes";
import { createOperatingScene } from "./scenes/operating-scenes";

export type SculptureControls = {
  select: (active: number, paused: boolean) => void;
  destroy: () => void;
};

/** Fit the camera against projected geometry, including camera-facing labels. */
function projectedBounds(root: THREE.Object3D, camera: THREE.Camera, bounds: THREE.Box2) {
  root.updateWorldMatrix(true, true);
  const inverse = camera.matrixWorldInverse;
  const point = new THREE.Vector3();
  root.traverse((object) => {
    if (object instanceof THREE.Sprite) {
      const center = object.getWorldPosition(new THREE.Vector3()).applyMatrix4(inverse);
      const scale = object.getWorldScale(new THREE.Vector3());
      bounds.expandByPoint(new THREE.Vector2(center.x - scale.x / 2, center.y - scale.y / 2));
      bounds.expandByPoint(new THREE.Vector2(center.x + scale.x / 2, center.y + scale.y / 2));
    } else if (object instanceof THREE.Mesh) {
      if (!object.geometry.boundingBox) object.geometry.computeBoundingBox();
      const box = object.geometry.boundingBox;
      if (!box) return;
      for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
        point.set(x, y, z).applyMatrix4(object.matrixWorld).applyMatrix4(inverse);
        bounds.expandByPoint(new THREE.Vector2(point.x, point.y));
      }
    }
  });
}

export function createSculpture(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  variant: StoryJourneyVariant,
  steps: readonly SculptureStep[],
  onReady: (ready: boolean) => void,
): SculptureControls | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    onReady(false);
    return null;
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 0.1, 100);
  camera.position.set(8, 6.5, 12);
  camera.lookAt(0, 1, 0);
  camera.updateMatrixWorld();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8697ad, 2.8));
  const key = new THREE.DirectionalLight(0xfff6e9, 4);
  key.position.set(-4, 10, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -10, right: 10, top: 8, bottom: -8 });
  key.shadow.normalBias = 0.04;
  key.shadow.bias = -0.00015;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xcac5ff, 2.5);
  rim.position.set(5, 4, -5);
  scene.add(rim);

  const sculpture: SculptureScene = variant === "knowledge" || variant === "memory" || variant === "infrastructure"
    ? createKnowledgeScene(variant, steps)
    : createOperatingScene(variant, steps);
  scene.add(sculpture.root);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.18 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.12;
  floor.receiveShadow = true;
  scene.add(floor);

  // Use every chapter's geometry so a taller or wider later stage never gets clipped.
  const bounds = new THREE.Box2();
  steps.forEach((step, active) => {
    for (const time of [0, 1.5, 3]) {
      sculpture.update({ active, id: step.id, progress: active, time, reducedMotion: true });
      projectedBounds(sculpture.root, camera, bounds);
    }
  });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state: SculptureState = { active: 0, id: steps[0]?.id ?? "", progress: 0, time: 0, reducedMotion: reducedMotion.matches };
  let paused = false;
  let inView = false;
  let contextLost = false;
  let destroyed = false;
  let frame = 0;
  let previousTime = 0;
  const pointer = new THREE.Vector2();
  const hiddenChildren = new Map<THREE.Object3D, boolean>();
  const canAnimate = () => !destroyed && !contextLost && inView && !document.hidden && !paused && !state.reducedMotion;
  const stop = () => { cancelAnimationFrame(frame); frame = 0; previousTime = 0; };

  function draw() {
    if (destroyed || contextLost) return;
    hiddenChildren.forEach((visible, object) => { object.visible = visible; });
    hiddenChildren.clear();
    sculpture.update(state);
    const focused = host.clientWidth < 520 ? sculpture.focus?.(state) : undefined;
    if (focused?.length) {
      const detailBounds = new THREE.Box2();
      focused.forEach((object) => projectedBounds(object, camera, detailBounds));
      sculpture.root.children.forEach((object) => {
        if (!focused.includes(object)) {
          hiddenChildren.set(object, object.visible);
          object.visible = false;
        }
      });
      fitCamera(detailBounds);
      canvas.dataset.view = "detail";
    } else {
      fitCamera(bounds);
      canvas.dataset.view = "whole";
    }
    renderer.render(scene, camera);
    canvas.dataset.activeStage = state.id;
    onReady(true);
  }

  function tick(now: number) {
    frame = 0;
    if (!canAnimate()) return;
    const delta = previousTime ? Math.min((now - previousTime) / 1000, 0.05) : 0;
    previousTime = now;
    state.time += delta;
    state.progress += (state.active - state.progress) * (1 - Math.exp(-delta * 6));
    sculpture.root.rotation.y += (pointer.x * 0.055 - sculpture.root.rotation.y) * (1 - Math.exp(-delta * 5));
    sculpture.root.rotation.x += (pointer.y * 0.025 - sculpture.root.rotation.x) * (1 - Math.exp(-delta * 5));
    if (Math.abs(state.active - state.progress) < 0.001) state.progress = state.active;
    draw();
    frame = requestAnimationFrame(tick);
  }

  function refresh() {
    stop();
    if (destroyed || contextLost || !inView || document.hidden) return;
    if (paused || state.reducedMotion) {
      state.progress = state.active;
      sculpture.root.rotation.set(0, 0, 0);
    }
    draw();
    if (canAnimate()) frame = requestAnimationFrame(tick);
  }

  function fitCamera(frameBounds: THREE.Box2) {
    if (frameBounds.isEmpty()) return;
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    const center = frameBounds.getCenter(new THREE.Vector2());
    const size = frameBounds.getSize(new THREE.Vector2());
    const aspect = width / height;
    const halfHeight = Math.max(size.y / 2, size.x / (2 * aspect)) * 1.16;
    camera.left = center.x - halfHeight * aspect;
    camera.right = center.x + halfHeight * aspect;
    camera.top = center.y + halfHeight;
    camera.bottom = center.y - halfHeight;
    camera.updateProjectionMatrix();
  }

  function resize() {
    if (destroyed || contextLost) return;
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75, Math.sqrt(3_000_000 / (width * height))));
    renderer.setSize(width, height, false);
    refresh();
  }

  const intersection = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; refresh(); }, { threshold: 0 });
  intersection.observe(host);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const visibility = () => refresh();
  const preference = () => { state.reducedMotion = reducedMotion.matches; refresh(); };
  const loseContext = (event: Event) => { event.preventDefault(); contextLost = true; stop(); onReady(false); };
  const restoreContext = () => { contextLost = false; resize(); };
  const movePointer = (event: PointerEvent) => {
    if (event.pointerType === "touch" || paused || state.reducedMotion) return;
    const rect = host.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, (event.clientY - rect.top) / rect.height * 2 - 1);
  };
  const leavePointer = () => pointer.set(0, 0);
  document.addEventListener("visibilitychange", visibility);
  reducedMotion.addEventListener("change", preference);
  canvas.addEventListener("webglcontextlost", loseContext);
  canvas.addEventListener("webglcontextrestored", restoreContext);
  host.addEventListener("pointermove", movePointer);
  host.addEventListener("pointerleave", leavePointer);
  resize();

  return {
    select(active, isPaused) {
      state.active = active;
      state.id = steps[active]?.id ?? state.id;
      paused = isPaused;
      refresh();
    },
    destroy() {
      destroyed = true;
      stop();
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reducedMotion.removeEventListener("change", preference);
      canvas.removeEventListener("webglcontextlost", loseContext);
      canvas.removeEventListener("webglcontextrestored", restoreContext);
      host.removeEventListener("pointermove", movePointer);
      host.removeEventListener("pointerleave", leavePointer);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) geometries.add(object.geometry);
        if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
          for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
        }
      });
      materials.forEach((material) => {
        Object.values(material).forEach((value) => { if (value instanceof THREE.Texture) textures.add(value); });
        material.dispose();
      });
      geometries.forEach((geometry) => geometry.dispose());
      textures.forEach((texture) => texture.dispose());
      key.shadow.map?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
