import * as THREE from "three";
import {
  cable,
  label,
  orb,
  palette,
  paper,
  platform,
  ring,
  roundedBox,
  type SculptureScene,
} from "../sculpture-kit";

export type OperatingSceneVariant =
  | "workflow"
  | "deployment"
  | "delivery"
  | "engagement"
  | "evidence"
  | "scope"
  | "manufacturing";

type SceneStep = Readonly<{
  id: string;
  label: string;
  title: string;
}>;

type SceneState = Parameters<SculptureScene["update"]>[0];

const TAU = Math.PI * 2;

function material(
  color: string,
  roughness = 0.52,
  metalness = 0.06,
  opacity = 1,
) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    transparent: opacity < 1,
    opacity,
  });
}

function customBox(
  width: number,
  height: number,
  depth: number,
  color: string,
) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    material(color),
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function cylinder(
  radius: number,
  height: number,
  color: string,
  sides = 24,
) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, sides),
    material(color, 0.42, 0.12),
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function plaque(text: string, width = 1.28) {
  const sprite = label(text, width, palette.ink);
  sprite.position.y = 0.12;
  return sprite;
}

function addPlatform(root: THREE.Group, width = 7.2, depth = 3.5) {
  const base = platform(width, depth, palette.cream);
  base.position.y = 0;
  root.add(base);
  return base;
}

function addStage(
  root: THREE.Group,
  position: THREE.Vector3,
  contents: THREE.Object3D[],
) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.add(...contents);
  root.add(group);
  return group;
}

function stageIndex(state: SceneState, steps: readonly SceneStep[]) {
  const byId = steps.findIndex((step) => step.id === state.id);
  return THREE.MathUtils.clamp(
    byId >= 0 ? byId : state.active,
    0,
    Math.max(0, steps.length - 1),
  );
}

function animateStages(
  stages: readonly THREE.Group[],
  bases: readonly THREE.Vector3[],
  progress: number,
  active: number,
  independent = false,
) {
  stages.forEach((stage, index) => {
    const proximity = independent
      ? index === active
        ? 1
        : 0
      : 1 - THREE.MathUtils.clamp(Math.abs(index - progress), 0, 1);
    const scale = 0.94 + proximity * 0.09;
    stage.position.set(
      bases[index].x,
      bases[index].y + proximity * 0.2,
      bases[index].z,
    );
    stage.scale.setScalar(scale);
  });
}

function pointOnRoute(points: readonly THREE.Vector3[], ordinal: number) {
  if (points.length === 1) return points[0].clone();
  const clamped = THREE.MathUtils.clamp(ordinal, 0, points.length - 1);
  const left = Math.min(Math.floor(clamped), points.length - 2);
  return points[left]
    .clone()
    .lerp(points[left + 1], clamped - left);
}

function mappedStageProgress(progress: number, stageOrder: readonly number[]) {
  if (stageOrder.length <= 1) return stageOrder[0] ?? 0;
  const clamped = THREE.MathUtils.clamp(progress, 0, stageOrder.length - 1);
  const left = Math.min(Math.floor(clamped), stageOrder.length - 2);
  return THREE.MathUtils.lerp(
    stageOrder[left],
    stageOrder[left + 1],
    clamped - left,
  );
}

function finishScene(
  root: THREE.Group,
  stages: readonly THREE.Group[],
  steps: readonly SceneStep[],
  options: {
    independent?: boolean;
    stageOrder?: readonly number[];
    route?: readonly THREE.Vector3[];
    traveler?: THREE.Object3D;
    moving?: readonly THREE.Object3D[];
    update?: (state: SceneState, progress: number, active: number) => void;
  } = {},
): SculptureScene {
  const bases = stages.map((stage) => stage.position.clone());
  const activeStage = (state: SceneState) => {
    const stepActive = stageIndex(state, steps);
    return THREE.MathUtils.clamp(
      options.stageOrder?.[stepActive] ?? stepActive,
      0,
      Math.max(0, stages.length - 1),
    );
  };

  const scene = {
    root,
    focus(state: SceneState): THREE.Object3D[] {
      const stage = stages[activeStage(state)];
      return stage ? [stage] : [];
    },
    update(state: SceneState) {
      const max = Math.max(0, stages.length - 1);
      const active = activeStage(state);
      const progress = options.independent
        ? active
        : THREE.MathUtils.clamp(
            options.stageOrder
              ? mappedStageProgress(state.progress, options.stageOrder)
              : state.progress,
            0,
            max,
          );
      animateStages(
        stages,
        bases,
        progress,
        Math.min(active, max),
        options.independent,
      );

      if (options.route && options.traveler) {
        options.traveler.position.copy(pointOnRoute(options.route, progress));
        options.traveler.position.y += state.reducedMotion
          ? 0
          : 0.05 * Math.sin(state.time * 2.1);
      }

      if (!state.reducedMotion) {
        options.moving?.forEach((object, index) => {
          object.rotation.y = state.time * (0.16 + index * 0.035);
        });
      }
      options.update?.(state, progress, active);
    },
  };
  return scene;
}

function createWorkflowScene(steps: readonly SceneStep[]) {
  const root = new THREE.Group();
  addPlatform(root);

  const requestPaper = paper(0.9, 1.16, "SCOPE", palette.white);
  requestPaper.position.y = 0.68;
  requestPaper.rotation.y = 0.12;
  const requestTray = roundedBox(1.15, 0.18, 0.9, palette.mint, 0.12);
  const request = addStage(root, new THREE.Vector3(-2.85, 0.22, 0.18), [
    requestTray,
    requestPaper,
  ]);

  const contextStack = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const sheet = paper(0.58, 0.74, index === 2 ? "CONTEXT" : undefined, palette.white);
    sheet.position.set(index * 0.12, 0.48 + index * 0.07, -index * 0.08);
    contextStack.add(sheet);
  }
  const contextBase = roundedBox(1.08, 0.16, 0.86, palette.teal, 0.1);
  const context = addStage(root, new THREE.Vector3(-1.45, 0.18, -0.2), [
    contextBase,
    contextStack,
  ]);

  const toolBody = roundedBox(1.08, 0.76, 0.92, palette.purple, 0.16);
  toolBody.position.y = 0.47;
  const toolCore = orb(0.2, palette.white);
  toolCore.position.set(0, 0.48, 0.49);
  const toolLabel = plaque("TOOLS", 1.12);
  toolLabel.position.set(0, 1.1, 0.04);
  const tool = addStage(root, new THREE.Vector3(0, 0.18, 0.04), [
    toolBody,
    toolCore,
    toolLabel,
  ]);

  const reviewRing = ring(0.52, palette.pink);
  reviewRing.position.y = 0.72;
  const decision = roundedBox(0.64, 0.17, 0.64, palette.white, 0.12);
  decision.position.y = 0.42;
  const decisionOrb = orb(0.16, palette.navy);
  decisionOrb.position.y = 0.53;
  const reviewLabel = plaque("DECIDE", 1.2);
  reviewLabel.position.set(0, 1.38, 0);
  const review = addStage(root, new THREE.Vector3(1.45, 0.15, -0.16), [
    reviewRing,
    decision,
    decisionOrb,
    reviewLabel,
  ]);

  const ledger = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const sheet = paper(0.74, 0.92, index === 0 ? "TRACE" : undefined, palette.white);
    sheet.position.set(index * 0.11, 0.52 + index * 0.08, -index * 0.1);
    sheet.rotation.y = -0.1 + index * 0.04;
    ledger.add(sheet);
  }
  const traceBase = roundedBox(1.18, 0.18, 0.96, palette.teal, 0.11);
  const trace = addStage(root, new THREE.Vector3(2.85, 0.18, 0.06), [
    traceBase,
    ledger,
  ]);

  const route = [
    new THREE.Vector3(-2.85, 0.42, 0.82),
    new THREE.Vector3(-1.45, 0.42, 0.76),
    new THREE.Vector3(0, 0.42, 0.78),
    new THREE.Vector3(1.45, 0.42, 0.76),
    new THREE.Vector3(2.85, 0.42, 0.72),
  ];
  root.add(cable(route, palette.navy, 0.028));
  const traveler = orb(0.12, palette.pink);
  root.add(traveler);
  const stageById: Readonly<Record<string, number>> = {
    scope: 0,
    context: 1,
    tools: 2,
    decision: 3,
    trace: 4,
    request: 0,
    prepare: 2,
    review: 3,
  };
  return finishScene(root, [request, context, tool, review, trace], steps, {
    stageOrder: steps.map((step, index) => stageById[step.id] ?? index),
    route,
    traveler,
    moving: [reviewRing],
  });
}

function createDeploymentScene(steps: readonly SceneStep[]) {
  const root = new THREE.Group();
  const localIsland = platform(3.25, 3.15, palette.cream);
  localIsland.position.x = -1.95;
  const cloudIsland = platform(3.25, 3.15, palette.mint);
  cloudIsland.position.x = 1.95;
  root.add(localIsland, cloudIsland);

  const rack = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const server = roundedBox(1.16, 0.38, 0.8, index === 1 ? palette.teal : palette.navy, 0.1);
    server.position.y = 0.28 + index * 0.48;
    for (let port = 0; port < 3; port += 1) {
      const light = orb(0.045, port === index ? palette.pink : palette.mint);
      light.position.set(-0.36 + port * 0.17, server.position.y, 0.43);
      rack.add(light);
    }
    rack.add(server);
  }
  const localLabel = plaque("LOCAL", 1.3);
  localLabel.position.set(0, 1.92, 0);
  rack.add(localLabel);
  const local = addStage(root, new THREE.Vector3(-1.62, 0.12, -0.28), [rack]);

  const dataStack = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const sheet = paper(0.58, 0.76, index === 0 ? "CLASSIFY" : undefined, palette.white);
    sheet.position.set(index * 0.1, 0.48 + index * 0.07, index * 0.07);
    dataStack.add(sheet);
  }
  const data = addStage(root, new THREE.Vector3(-2.85, 0.18, 0.55), [dataStack]);

  const boundary = new THREE.Group();
  const boundaryPanel = customBox(0.09, 2.4, 2.55, palette.purple);
  boundaryPanel.material.transparent = true;
  boundaryPanel.material.opacity = 0.52;
  boundaryPanel.position.y = 1.23;
  const gate = ring(0.5, palette.mint);
  gate.rotation.y = Math.PI / 2;
  gate.position.set(0, 1.0, 0.25);
  const scopeLabel = plaque("SCOPED", 1.42);
  scopeLabel.position.set(0, 2.72, 0);
  boundary.add(boundaryPanel, gate, scopeLabel);
  const gateStage = addStage(root, new THREE.Vector3(0, 0, 0), [boundary]);

  const cloud = new THREE.Group();
  [
    [-0.42, 0, 0],
    [0.06, 0.2, 0.05],
    [0.47, 0.02, -0.02],
    [0.15, -0.15, 0.08],
  ].forEach(([x, y, z], index) => {
    const puff = orb(0.46 - index * 0.035, index === 1 ? palette.pink : palette.white);
    puff.position.set(x, y, z);
    cloud.add(puff);
  });
  const cloudShelf = roundedBox(1.55, 0.18, 1.08, palette.white, 0.18);
  cloudShelf.position.y = -0.55;
  cloud.scale.setScalar(0.82);
  cloud.position.y = 1.25;
  const cloudLabel = plaque("CLOUD", 1.35);
  cloudLabel.position.set(0, 2.1, 0);
  const remote = addStage(root, new THREE.Vector3(1.42, 0.14, -0.32), [
    cloudShelf,
    cloud,
    cloudLabel,
  ]);

  const dashboard = roundedBox(1.05, 1.05, 0.18, palette.navy, 0.12);
  dashboard.position.y = 0.72;
  const observeLabel = plaque("OBSERVE", 1.28);
  observeLabel.position.y = 1.55;
  const statusLights: THREE.Object3D[] = [];
  [palette.teal, palette.purple, palette.pink].forEach((color, index) => {
    const bar = roundedBox(0.56 - index * 0.08, 0.08, 0.05, color, 0.025);
    bar.position.set(-0.12 + index * 0.04, 0.92 - index * 0.23, 0.13);
    statusLights.push(bar);
  });
  const observe = addStage(root, new THREE.Vector3(2.78, 0.14, 0.58), [
    dashboard,
    observeLabel,
    ...statusLights,
  ]);

  const route = [
    new THREE.Vector3(-2.85, 0.52, 0.92),
    new THREE.Vector3(-1.62, 0.52, 0.66),
    new THREE.Vector3(1.42, 0.68, 0.62),
    new THREE.Vector3(0, 1.0, 0.8),
    new THREE.Vector3(2.78, 0.62, 0.9),
  ];
  root.add(
    cable(route, palette.pink, 0.025),
    cable(
      [
        new THREE.Vector3(-1.62, 0.48, 0.35),
        new THREE.Vector3(0, 0.92, 0.38),
        new THREE.Vector3(1.42, 0.58, 0.36),
      ],
      palette.navy,
      0.032,
    ),
  );
  const capsule = roundedBox(0.26, 0.16, 0.18, palette.pink, 0.08);
  root.add(capsule);
  const stageById: Readonly<Record<string, number>> = {
    classify: 0,
    local: 1,
    cloud: 2,
    route: 3,
    observe: 4,
    sources: 0,
    processing: 2,
    action: 3,
  };
  return finishScene(root, [data, local, remote, gateStage, observe], steps, {
    stageOrder: steps.map((step, index) => stageById[step.id] ?? index),
    route,
    traveler: capsule,
    moving: [gate],
  });
}

function createDeliveryScene(steps: readonly SceneStep[]) {
  const root = new THREE.Group();
  addPlatform(root, 7.2, 3.55);

  const instruction = paper(0.92, 1.25, "CAPTURE", palette.white);
  instruction.position.y = 0.72;
  instruction.rotation.y = 0.12;
  const clip = roundedBox(0.45, 0.14, 0.18, palette.pink, 0.06);
  clip.position.set(0, 1.51, 0.03);
  const skill = addStage(root, new THREE.Vector3(-2.85, 0.17, 0.15), [
    instruction,
    clip,
  ]);

  const testStand = roundedBox(1.02, 0.22, 0.92, palette.mint, 0.13);
  const gauge = ring(0.4, palette.navy);
  gauge.position.set(0, 0.66, 0.08);
  const needle = customBox(0.04, 0.36, 0.04, palette.pink);
  needle.position.set(0.08, 0.7, 0.12);
  needle.rotation.z = -0.55;
  const checked = addStage(root, new THREE.Vector3(-1.45, 0.19, -0.18), [
    testStand,
    gauge,
    needle,
  ]);

  const toolbox = roundedBox(1.08, 0.76, 0.9, palette.purple, 0.15);
  toolbox.position.y = 0.49;
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.05, 12, 32, Math.PI),
    material(palette.navy, 0.35, 0.18),
  );
  handle.position.y = 0.9;
  const toolOrb = orb(0.17, palette.white);
  toolOrb.position.set(0, 0.5, 0.49);
  const tool = addStage(root, new THREE.Vector3(0, 0.15, 0.1), [
    toolbox,
    handle,
    toolOrb,
  ]);

  const reviewRing = ring(0.46, palette.pink);
  reviewRing.position.y = 0.68;
  const reviewBase = roundedBox(0.72, 0.17, 0.66, palette.white, 0.12);
  reviewBase.position.y = 0.4;
  const reviewer = cylinder(0.14, 0.34, palette.navy, 20);
  reviewer.position.y = 0.72;
  const reviewerHead = orb(0.16, palette.navy);
  reviewerHead.position.y = 1.04;
  const decideLabel = plaque("DECIDE", 1.15);
  decideLabel.position.y = 1.42;
  const review = addStage(root, new THREE.Vector3(1.45, 0.15, -0.14), [
    reviewRing,
    reviewBase,
    reviewer,
    reviewerHead,
    decideLabel,
  ]);

  const output = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const tray = roundedBox(0.96, 0.15, 0.66, index === 2 ? palette.teal : palette.white, 0.08);
    tray.position.set(0.12 * index, 0.3 + index * 0.27, -0.08 * index);
    output.add(tray);
  }
  const resultLabel = plaque("RESULT", 1.45);
  resultLabel.position.set(0.12, 1.42, 0);
  output.add(resultLabel);
  const result = addStage(root, new THREE.Vector3(2.85, 0.15, -0.05), [output]);

  const route = [
    new THREE.Vector3(-2.85, 0.5, 0.82),
    new THREE.Vector3(-1.45, 0.48, 0.76),
    new THREE.Vector3(0, 0.5, 0.78),
    new THREE.Vector3(1.45, 0.5, 0.76),
    new THREE.Vector3(2.85, 0.52, 0.72),
  ];
  root.add(cable(route, palette.navy, 0.026));
  const traveler = orb(0.115, palette.pink);
  root.add(traveler);
  return finishScene(root, [skill, checked, tool, review, result], steps, {
    route,
    traveler,
    moving: [gauge, reviewRing],
  });
}

function checkMark(color: string) {
  const group = new THREE.Group();
  const stroke = cable(
    [
      new THREE.Vector3(-0.42, 0.02, 0),
      new THREE.Vector3(-0.12, -0.24, 0),
      new THREE.Vector3(0.46, 0.42, 0),
    ],
    color,
    0.065,
  );
  group.add(stroke);
  return group;
}

function createEngagementScene(steps: readonly SceneStep[]) {
  const root = new THREE.Group();
  addPlatform(root, 7.5, 3.65);

  const questionRing = ring(0.58, palette.purple);
  questionRing.position.y = 0.82;
  const questionOrb = orb(0.22, palette.pink);
  questionOrb.position.y = 0.82;
  const questionPointer = roundedBox(0.07, 0.42, 0.07, palette.navy, 0.025);
  questionPointer.position.set(0.08, 0.83, 0.1);
  questionPointer.rotation.z = -0.55;
  const askLabel = plaque("ASK", 0.95);
  askLabel.position.set(0, 1.62, 0);
  const discovery = addStage(root, new THREE.Vector3(-2.65, 0.16, 0.15), [
    questionRing,
    questionOrb,
    questionPointer,
    askLabel,
  ]);

  const proofFrame = roundedBox(1.18, 1.18, 0.18, palette.white, 0.15);
  proofFrame.position.y = 0.78;
  const proofCheck = checkMark(palette.teal);
  proofCheck.position.set(0, 0.76, 0.18);
  const proof = addStage(root, new THREE.Vector3(-0.88, 0.18, -0.18), [
    proofFrame,
    proofCheck,
  ]);

  const build = new THREE.Group();
  [
    [-0.34, 0.3, 0.16, palette.navy],
    [0.34, 0.3, 0.16, palette.mint],
    [-0.34, 0.82, -0.04, palette.purple],
    [0.34, 0.82, -0.04, palette.pink],
  ].forEach(([x, y, z, color]) => {
    const block = roundedBox(0.58, 0.48, 0.62, color as string, 0.1);
    block.position.set(x as number, y as number, z as number);
    build.add(block);
  });
  const implementation = addStage(root, new THREE.Vector3(0.92, 0.14, 0.12), [build]);

  const handoverBox = roundedBox(1.48, 0.74, 1.05, palette.teal, 0.16);
  handoverBox.position.y = 0.48;
  const handoverPaper = paper(0.82, 1.05, "YOURS", palette.white);
  handoverPaper.position.y = 1.18;
  const handover = addStage(root, new THREE.Vector3(2.62, 0.16, -0.05), [
    handoverBox,
    handoverPaper,
  ]);

  const bridgeSegments: THREE.Object3D[] = [];
  [-1.75, 0, 1.77].forEach((x, index) => {
    const bridge = roundedBox(1.12, 0.12, 0.34, index === 1 ? palette.purple : palette.navy, 0.06);
    bridge.position.set(x, 0.32, 0.82);
    root.add(bridge);
    bridgeSegments.push(bridge);
  });
  const route = [
    new THREE.Vector3(-2.65, 0.55, 0.85),
    new THREE.Vector3(-0.88, 0.55, 0.82),
    new THREE.Vector3(0.92, 0.55, 0.82),
    new THREE.Vector3(2.62, 0.55, 0.78),
  ];
  const traveler = orb(0.12, palette.pink);
  root.add(traveler);

  return finishScene(root, [discovery, proof, implementation, handover], steps, {
    route,
    traveler,
    moving: [questionRing],
    update(_state, progress) {
      bridgeSegments.forEach((segment, index) => {
        const assembled = THREE.MathUtils.clamp(progress - index, 0, 1);
        segment.position.y = 0.16 + assembled * 0.16;
        segment.rotation.z = (1 - assembled) * (index % 2 ? -0.22 : 0.22);
      });
    },
  });
}

function createEvidenceScene(steps: readonly SceneStep[]) {
  const root = new THREE.Group();

  const folioPage = (color: string, tabColor: string) => {
    const folio = new THREE.Group();
    const page = roundedBox(1.5, 0.1, 2.26, color, 0.045);
    page.position.y = 0.2;
    const spine = roundedBox(0.08, 0.055, 1.86, palette.navy, 0.022);
    spine.position.set(-0.66, 0.28, 0);
    const foldedCorner = roundedBox(0.34, 0.045, 0.34, tabColor, 0.025);
    foldedCorner.position.set(0.53, 0.28, -0.88);
    foldedCorner.rotation.y = -0.22;
    const indexTab = roundedBox(0.34, 0.08, 0.48, tabColor, 0.04);
    indexTab.position.set(0.72, 0.24, 0.5);
    folio.add(page, spine, foldedCorner, indexTab);
    return folio;
  };

  const problemPile = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const sheet = paper(0.86, 1.02, index === 2 ? "PROBLEM" : undefined, palette.white);
    sheet.position.set(index * 0.12, 0.52 + index * 0.09, index * -0.08);
    sheet.rotation.z = -0.08 + index * 0.06;
    problemPile.add(sheet);
  }
  const problem = addStage(root, new THREE.Vector3(-2.7, 0.1, 0.12), [
    folioPage(palette.white, palette.pink),
    problemPile,
  ]);
  problem.rotation.y = -0.045;

  const scopeBase = roundedBox(1.28, 0.16, 1.18, palette.mint, 0.12);
  scopeBase.position.y = 0.26;
  const scopeRing = ring(0.52, palette.navy);
  scopeRing.position.y = 0.9;
  const scopeOrb = orb(0.18, palette.purple);
  scopeOrb.position.y = 0.9;
  const scope = addStage(root, new THREE.Vector3(-0.9, 0.1, -0.1), [
    folioPage(palette.cream, palette.purple),
    scopeBase,
    scopeRing,
    scopeOrb,
  ]);
  scope.rotation.y = 0.035;

  const delivered = new THREE.Group();
  const deliveredBase = roundedBox(1.36, 0.22, 1.16, palette.purple, 0.13);
  deliveredBase.position.y = 0.28;
  const deliveredCore = roundedBox(0.78, 0.78, 0.72, palette.white, 0.16);
  deliveredCore.position.y = 0.72;
  const deliveredCheck = checkMark(palette.teal);
  deliveredCheck.scale.setScalar(0.52);
  deliveredCheck.position.set(0, 0.76, 0.39);
  delivered.add(deliveredBase, deliveredCore, deliveredCheck);
  const shipped = addStage(root, new THREE.Vector3(0.9, 0.1, 0.12), [
    folioPage(palette.white, palette.teal),
    delivered,
  ]);
  shipped.rotation.y = -0.03;

  const remaining = new THREE.Group();
  const frameBottom = roundedBox(1.4, 0.14, 0.18, palette.navy, 0.05);
  const frameLeft = roundedBox(0.16, 1.1, 0.18, palette.navy, 0.05);
  const frameRight = roundedBox(0.16, 0.7, 0.18, palette.pink, 0.05);
  frameBottom.position.y = 0.4;
  frameLeft.position.set(-0.62, 0.91, 0);
  frameRight.position.set(0.62, 0.71, 0);
  const openRing = ring(0.34, palette.pink);
  openRing.position.set(0.28, 1.38, 0);
  remaining.add(frameBottom, frameLeft, frameRight, openRing);
  const open = addStage(root, new THREE.Vector3(2.7, 0.1, -0.08), [
    folioPage(palette.cream, palette.pink),
    remaining,
  ]);
  open.rotation.y = 0.045;

  [-1.8, 0, 1.8].forEach((x, index) => {
    const stitch = cable(
      [
        new THREE.Vector3(x - 0.18, 0.34, index % 2 ? -0.64 : 0.64),
        new THREE.Vector3(x, 0.48, 0),
        new THREE.Vector3(x + 0.18, 0.34, index % 2 ? 0.64 : -0.64),
      ],
      index === 1 ? palette.purple : palette.teal,
      0.024,
    );
    root.add(stitch);
  });

  const route = [
    new THREE.Vector3(-2.7, 0.56, 0.84),
    new THREE.Vector3(-0.9, 0.56, 0.82),
    new THREE.Vector3(0.9, 0.56, 0.84),
    new THREE.Vector3(2.7, 0.56, 0.8),
  ];
  const receipt = roundedBox(0.3, 0.18, 0.22, palette.pink, 0.07);
  root.add(receipt);
  return finishScene(root, [problem, scope, shipped, open], steps, {
    route,
    traveler: receipt,
    moving: [scopeRing, openRing],
  });
}

function createScopeScene(steps: readonly SceneStep[]) {
  const root = new THREE.Group();

  const center = cylinder(0.52, 0.26, palette.navy, 32);
  center.position.y = 0.34;
  const selectorRing = ring(0.58, palette.pink);
  selectorRing.rotation.x = Math.PI / 2;
  selectorRing.position.y = 0.5;
  const selector = roundedBox(0.1, 0.1, 0.58, palette.white, 0.035);
  selector.position.set(0, 0.56, 0.29);
  const chooseLabel = plaque("CHOOSE", 1.18);
  chooseLabel.position.y = 1.15;
  root.add(center, selectorRing, selector, chooseLabel);

  [
    [-0.78, 0, palette.teal],
    [0, -0.78, palette.purple],
    [0.78, 0, palette.pink],
    [0, 0.78, palette.navy],
  ].forEach(([x, z, color]) => {
    const marker = orb(0.065, color as string);
    marker.position.set(x as number, 0.34, z as number);
    root.add(marker);
  });

  const discoverIsland = platform(2.35, 1.48, palette.cream);
  const compassRing = ring(0.5, palette.purple);
  compassRing.position.y = 0.74;
  const compassNeedle = customBox(0.08, 0.66, 0.08, palette.pink);
  compassNeedle.position.y = 0.74;
  compassNeedle.rotation.z = -0.58;
  const discoverLabel = plaque("FIND", 1.05);
  discoverLabel.position.y = 1.56;
  const discover = addStage(root, new THREE.Vector3(-2.2, 0, 0.96), [
    discoverIsland,
    compassRing,
    compassNeedle,
    discoverLabel,
  ]);

  const setupIsland = platform(2.35, 1.48, palette.mint);
  const consoleBase = roundedBox(1.55, 0.14, 0.9, palette.purple, 0.08);
  consoleBase.position.y = 0.42;
  const monitor = roundedBox(1.18, 0.78, 0.14, palette.navy, 0.1);
  monitor.position.set(-0.1, 0.92, 0.05);
  const screen = roundedBox(0.94, 0.56, 0.035, palette.mint, 0.035);
  screen.position.set(-0.1, 0.92, 0.13);
  const terminalLines: THREE.Object3D[] = [];
  [0.23, 0, -0.23].forEach((offset, index) => {
    const line = roundedBox(0.54 - index * 0.08, 0.045, 0.018, index === 2 ? palette.pink : palette.navy, 0.012);
    line.position.set(-0.18, 1.08 + offset, 0.16);
    terminalLines.push(line);
  });
  const keyboard = roundedBox(0.84, 0.08, 0.38, palette.white, 0.04);
  keyboard.position.set(0.28, 0.5, 0.55);
  keyboard.rotation.x = -0.16;
  const consolePort = orb(0.075, palette.pink);
  consolePort.position.set(0.6, 0.44, 0.48);
  const setupLabel = plaque("SET UP", 1.25);
  setupLabel.position.y = 1.7;
  const setup = addStage(root, new THREE.Vector3(-2.2, 0, -0.96), [
    setupIsland,
    consoleBase,
    monitor,
    screen,
    keyboard,
    consolePort,
    ...terminalLines,
    setupLabel,
  ]);

  const knowledgeIsland = platform(2.35, 1.48, palette.cream);
  const knowledge = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const sheet = paper(0.76, 0.95, index === 2 ? "KNOW" : undefined, palette.white);
    sheet.position.set(index * 0.14, 0.5 + index * 0.1, -index * 0.08);
    knowledge.add(sheet);
  }
  const knowledgeCore = orb(0.17, palette.teal);
  knowledgeCore.position.set(-0.5, 0.66, 0.25);
  const connect = addStage(root, new THREE.Vector3(2.2, 0, -0.96), [
    knowledgeIsland,
    knowledge,
    knowledgeCore,
  ]);

  const buildIsland = platform(2.35, 1.48, palette.mint);
  const workflowRail = cable(
    [
      new THREE.Vector3(-0.76, 0.52, 0.3),
      new THREE.Vector3(-0.22, 0.72, 0.18),
      new THREE.Vector3(0.34, 0.72, 0.18),
      new THREE.Vector3(0.78, 0.52, 0.3),
    ],
    palette.navy,
    0.035,
  );
  const workflowStart = paper(0.42, 0.54, undefined, palette.white);
  workflowStart.position.set(-0.78, 0.44, 0.22);
  const stepOne = roundedBox(0.36, 0.34, 0.38, palette.purple, 0.07);
  stepOne.position.set(-0.22, 0.54, 0.14);
  const stepTwo = roundedBox(0.36, 0.5, 0.38, palette.teal, 0.07);
  stepTwo.position.set(0.28, 0.62, 0.14);
  const humanGate = ring(0.32, palette.pink);
  humanGate.position.set(0.72, 0.82, 0.1);
  const humanBody = cylinder(0.1, 0.26, palette.navy, 18);
  humanBody.position.set(0.72, 0.69, 0.14);
  const humanHead = orb(0.11, palette.navy);
  humanHead.position.set(0.72, 0.92, 0.14);
  const buildLabel = plaque("BUILD", 1.1);
  buildLabel.position.y = 1.54;
  const build = addStage(root, new THREE.Vector3(2.2, 0, 0.96), [
    buildIsland,
    workflowRail,
    workflowStart,
    stepOne,
    stepTwo,
    humanGate,
    humanBody,
    humanHead,
    buildLabel,
  ]);

  const stages = [discover, setup, connect, build];
  return finishScene(root, stages, steps, {
    independent: true,
    moving: [compassRing, humanGate],
    update(state, _progress, active) {
      const choiceAngles = [-Math.PI / 4, (-3 * Math.PI) / 4, (3 * Math.PI) / 4, Math.PI / 4];
      selector.rotation.y = choiceAngles[active] ?? 0;
      selectorRing.scale.setScalar(
        state.reducedMotion ? 1 : 1 + Math.sin(state.time * 1.8) * 0.025,
      );
    },
  });
}

function createManufacturingScene(steps: readonly SceneStep[]) {
  const root = new THREE.Group();

  const findIsland = platform(2.4, 2.7, palette.cream);
  const drawingTable = roundedBox(1.28, 0.2, 1.18, palette.mint, 0.1);
  drawingTable.position.set(-0.28, 0.52, 0);
  drawingTable.rotation.z = -0.06;
  const drawing = new THREE.Group();
  const drawingSheet = roundedBox(0.92, 1.12, 0.065, palette.white, 0.024);
  drawingSheet.position.y = 0.56;
  const drawingTab = roundedBox(0.2, 0.18, 0.032, palette.mint, 0.012);
  drawingTab.position.set(0.29, 0.98, 0.05);
  const drawingLines = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-0.28, 0.27, 0.045),
      new THREE.Vector3(0.16, 0.27, 0.045),
      new THREE.Vector3(0.16, 0.27, 0.045),
      new THREE.Vector3(0.16, 0.43, 0.045),
      new THREE.Vector3(0.16, 0.43, 0.045),
      new THREE.Vector3(0.3, 0.43, 0.045),
      new THREE.Vector3(0.3, 0.43, 0.045),
      new THREE.Vector3(0.3, 0.8, 0.045),
      new THREE.Vector3(0.3, 0.8, 0.045),
      new THREE.Vector3(-0.28, 0.8, 0.045),
      new THREE.Vector3(-0.28, 0.8, 0.045),
      new THREE.Vector3(-0.28, 0.27, 0.045),
      new THREE.Vector3(-0.34, 0.91, 0.045),
      new THREE.Vector3(0.3, 0.91, 0.045),
      new THREE.Vector3(-0.34, 0.87, 0.045),
      new THREE.Vector3(-0.34, 0.95, 0.045),
      new THREE.Vector3(0.3, 0.87, 0.045),
      new THREE.Vector3(0.3, 0.95, 0.045),
      new THREE.Vector3(0.39, 0.27, 0.045),
      new THREE.Vector3(0.39, 0.8, 0.045),
      new THREE.Vector3(0.35, 0.27, 0.045),
      new THREE.Vector3(0.43, 0.27, 0.045),
      new THREE.Vector3(0.35, 0.8, 0.045),
      new THREE.Vector3(0.43, 0.8, 0.045),
    ]),
    new THREE.LineBasicMaterial({ color: palette.navy }),
  );
  const holeA = ring(0.075, palette.purple);
  holeA.position.set(-0.1, 0.48, 0.055);
  const holeB = ring(0.075, palette.purple);
  holeB.position.set(0.12, 0.68, 0.055);
  drawing.add(drawingSheet, drawingTab, drawingLines, holeA, holeB);
  drawing.position.set(-0.28, 0.94, 0.08);
  drawing.rotation.x = -0.22;

  const gear = new THREE.Group();
  const gearRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.48, 0.13, 12, 32),
    material(palette.purple, 0.34, 0.25),
  );
  gearRing.position.y = 0.78;
  gear.add(gearRing);
  for (let index = 0; index < 8; index += 1) {
    const tooth = roundedBox(0.16, 0.28, 0.18, palette.purple, 0.04);
    const angle = (index / 8) * TAU;
    tooth.position.set(Math.cos(angle) * 0.62, 0.78 + Math.sin(angle) * 0.62, 0);
    tooth.rotation.z = angle;
    gear.add(tooth);
  }
  gear.scale.setScalar(0.58);
  gear.position.set(0.5, 0.42, 0.28);
  const findLabel = plaque("FIND", 1.1);
  findLabel.position.set(0, 1.72, 0);
  const find = addStage(root, new THREE.Vector3(-2.5, 0, 0.08), [
    findIsland,
    drawingTable,
    drawing,
    gear,
    findLabel,
  ]);

  const quoteIsland = platform(2.15, 2.7, palette.mint);
  const quoteBody = roundedBox(1.34, 0.82, 1.05, palette.navy, 0.14);
  quoteBody.position.y = 0.54;
  const quoteSheet = paper(0.82, 1.02, "QUOTE", palette.white);
  quoteSheet.position.y = 1.22;
  const estimateDial = ring(0.3, palette.pink);
  estimateDial.position.set(0.42, 0.72, 0.58);
  const quote = addStage(root, new THREE.Vector3(0, 0, -0.08), [
    quoteIsland,
    quoteBody,
    quoteSheet,
    estimateDial,
  ]);

  const reportIsland = platform(2.4, 2.7, palette.cream);
  const report = new THREE.Group();
  const reportSheet = paper(1.16, 1.42, "REPORT", palette.white);
  reportSheet.position.y = 0.84;
  report.add(reportSheet);
  [0.3, 0.55, 0.8].forEach((height, index) => {
    const bar = roundedBox(0.16, height, 0.12, [palette.teal, palette.purple, palette.pink][index], 0.04);
    bar.position.set(-0.3 + index * 0.3, 0.52 + height / 2, 0.1);
    report.add(bar);
  });
  const result = addStage(root, new THREE.Vector3(2.5, 0, 0.08), [
    reportIsland,
    report,
  ]);

  const stageById: Readonly<Record<string, number>> = {
    find: 0,
    quote: 1,
    report: 2,
  };
  return finishScene(root, [find, quote, result], steps, {
    independent: true,
    stageOrder: steps.map((step, index) => stageById[step.id] ?? index),
    update(state) {
      gear.rotation.z = state.reducedMotion ? 0 : -state.time * 0.28;
    },
  });
}

export function createOperatingScene(
  variant: OperatingSceneVariant,
  steps: readonly SceneStep[],
): SculptureScene {
  if (variant === "deployment") return createDeploymentScene(steps);
  if (variant === "delivery") return createDeliveryScene(steps);
  if (variant === "engagement") return createEngagementScene(steps);
  if (variant === "evidence") return createEvidenceScene(steps);
  if (variant === "scope") return createScopeScene(steps);
  if (variant === "manufacturing") return createManufacturingScene(steps);
  return createWorkflowScene(steps);
}
