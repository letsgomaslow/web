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
  type SculptureState,
  type SculptureStep,
} from "../sculpture-kit";

export type { SculptureScene } from "../sculpture-kit";

type Step = SculptureStep;
type Variant = "knowledge" | "memory" | "infrastructure";
type FocusableScene = SculptureScene & {
  focus(state: SculptureState): THREE.Object3D[];
};

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

function glass(color: THREE.ColorRepresentation, opacity = 0.3) {
  return new THREE.MeshPhysicalMaterial({
    color,
    transparent: true,
    opacity,
    roughness: 0.2,
    metalness: 0.02,
    transmission: 0.18,
    depthWrite: false,
  });
}

function addLabel(
  parent: THREE.Object3D,
  text: string,
  position: THREE.Vector3,
  width = 1.3,
  color = palette.ink,
) {
  const sprite = label(text, width, color);
  sprite.position.copy(position);
  parent.add(sprite);
  return sprite;
}

function baseY(group: THREE.Group) {
  group.userData.baseY = group.position.y;
  return group;
}

function emphasize(group: THREE.Group, amount: number) {
  const base = Number(group.userData.baseY ?? group.position.y);
  group.position.y = base + amount * 0.12;
  group.scale.setScalar(1 + amount * 0.055);
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];
    for (const material of materials) {
      if (
        material instanceof THREE.MeshStandardMaterial ||
        material instanceof THREE.MeshPhysicalMaterial
      ) {
        material.emissive.copy(new THREE.Color(palette.teal));
        material.emissiveIntensity = amount * 0.16;
      }
    }
  });
}

function pulse(object: THREE.Object3D, amount: number, time: number) {
  const scale = 1 + amount * (0.035 + Math.sin(time * 2.4) * 0.018);
  object.scale.setScalar(scale);
}

function pathMarker(color: THREE.ColorRepresentation) {
  const marker = orb(0.075, color);
  marker.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.castShadow = false;
  });
  return marker;
}

function pageStack(
  labels: readonly string[],
  color: THREE.ColorRepresentation = palette.cream,
) {
  const group = new THREE.Group();
  labels.forEach((_, index) => {
    const sheet = paper(0.72, 0.94, undefined, index === 0 ? color : palette.white);
    sheet.position.set(index * 0.12, index * 0.06, -index * 0.11);
    sheet.rotation.y = -0.08 + index * 0.06;
    group.add(sheet);
  });
  return group;
}

function smallPerson(color: THREE.ColorRepresentation) {
  const person = new THREE.Group();
  const body = roundedBox(0.38, 0.54, 0.3, color, 0.13);
  body.position.y = 0.29;
  const head = orb(0.17, palette.cream);
  head.position.y = 0.76;
  person.add(body, head);
  return person;
}

function agentToken(color: THREE.ColorRepresentation) {
  const agent = new THREE.Group();
  const body = roundedBox(0.58, 0.34, 0.46, color, 0.15);
  body.position.y = 0.23;
  const core = orb(0.12, palette.cream);
  core.position.set(0, 0.46, 0.02);
  const orbit = ring(0.24, palette.teal);
  orbit.rotation.x = Math.PI / 2;
  orbit.position.y = 0.46;
  agent.add(body, core, orbit);
  return agent;
}

function createVectorCluster() {
  const group = new THREE.Group();
  const points = [
    [-0.4, 0.2, 0.18],
    [-0.15, 0.66, -0.16],
    [0.18, 0.3, 0.06],
    [0.42, 0.74, 0.2],
    [0.47, 0.12, -0.18],
    [-0.43, 0.88, 0.04],
    [0.05, 1.04, 0.22],
  ] as const;
  points.forEach(([x, y, z], index) => {
    const point = orb(
      index === 2 ? 0.16 : 0.1,
      index === 2 ? palette.pink : index % 2 ? palette.mint : palette.teal,
    );
    point.position.set(x, y, z);
    group.add(point);
  });
  const halo = ring(0.76, palette.teal);
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.52;
  group.add(halo);
  return group;
}

function createGraphConstellation() {
  const group = new THREE.Group();
  const points = [
    v(-0.48, 0.2, 0.05),
    v(-0.22, 0.82, -0.14),
    v(0.26, 1.0, 0.1),
    v(0.48, 0.48, -0.08),
    v(0.08, 0.27, 0.22),
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [1, 4],
  ] as const;
  edges.forEach(([from, to]) =>
    group.add(cable([points[from], points[to]], palette.purple, 0.015)),
  );
  points.forEach((point, index) => {
    const node = orb(
      index === 4 ? 0.17 : 0.11,
      index === 4 ? palette.pink : index % 2 ? palette.purple : palette.cream,
    );
    node.position.copy(point);
    group.add(node);
  });
  return group;
}

function buildKnowledgeScene(steps: readonly Step[]): FocusableScene {
  const root = new THREE.Group();
  const foundation = platform(7.7, 3.45, palette.navy);
  foundation.position.y = 0;
  root.add(foundation);

  const sources = baseY(new THREE.Group());
  sources.position.set(-3.15, 0.22, 0);
  sources.userData.baseY = sources.position.y;
  const sourceStack = pageStack(["INVOICE", "AMENDMENT", "AGREEMENT"]);
  sourceStack.rotation.y = 0.12;
  sources.add(sourceStack);
  addLabel(sources, "SOURCE FILES", v(0.2, 1.28, 0), 1.4);
  root.add(sources);

  const extraction = baseY(new THREE.Group());
  extraction.position.set(-1.7, 0.18, 0);
  extraction.userData.baseY = extraction.position.y;
  const tunnel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.48, 0.48, 0.9, 24, 1, true),
    glass(palette.mint, 0.23),
  );
  tunnel.rotation.z = Math.PI / 2;
  tunnel.position.y = 0.48;
  extraction.add(tunnel);
  for (let index = 0; index < 4; index += 1) {
    const slice = roundedBox(
      0.12,
      0.52,
      0.68,
      index % 2 ? palette.white : palette.mint,
      0.035,
    );
    slice.position.set(-0.32 + index * 0.22, 0.48, 0);
    extraction.add(slice);
  }
  addLabel(extraction, "EXTRACT", v(0, 1.23, 0), 1.0);
  root.add(extraction);

  const vector = baseY(createVectorCluster());
  vector.position.set(-0.1, 0.18, -0.85);
  vector.userData.baseY = vector.position.y;
  addLabel(vector, "VECTOR / MEANING", v(0, 1.36, 0), 1.5);
  root.add(vector);

  const graph = baseY(createGraphConstellation());
  graph.position.set(-0.05, 0.18, 0.85);
  graph.userData.baseY = graph.position.y;
  addLabel(graph, "GRAPH / RELATIONSHIPS", v(-0.36, 1.48, 0), 1.72);
  root.add(graph);

  const briefing = baseY(new THREE.Group());
  briefing.position.set(1.42, 0.18, 0);
  briefing.userData.baseY = briefing.position.y;
  const tray = roundedBox(0.88, 0.16, 1.22, palette.purple, 0.08);
  tray.position.y = 0.18;
  briefing.add(tray);
  ["CURRENT", "CONFLICT", "SOURCE"].forEach((_, index) => {
    const card = paper(0.58, 0.34, undefined, index === 1 ? palette.pink : palette.cream);
    card.position.set(-0.18 + index * 0.13, 0.36 + index * 0.18, 0);
    card.rotation.y = -0.08 + index * 0.08;
    briefing.add(card);
  });
  addLabel(briefing, "BRIEFING", v(0, 1.3, 0), 1.08);
  root.add(briefing);

  const answer = baseY(new THREE.Group());
  answer.position.set(3.0, 0.18, 0);
  answer.userData.baseY = answer.position.y;
  const answerPaper = paper(1.0, 1.28, undefined, palette.cream);
  answerPaper.position.y = 0.02;
  const citation = roundedBox(0.72, 0.08, 0.08, palette.pink, 0.02);
  citation.position.set(0, 0.36, 0.08);
  const citationPin = orb(0.09, palette.pink);
  citationPin.position.set(0.42, 0.36, 0.09);
  answer.add(answerPaper, citation, citationPin);
  addLabel(answer, "CITED RESPONSE", v(0, 1.58, 0), 1.42);
  root.add(answer);

  const routes = [
    cable([v(-2.55, 0.58, 0), v(-2.14, 0.58, 0), v(-1.98, 0.58, 0)], palette.teal),
    cable([v(-1.22, 0.58, 0), v(-0.8, 0.58, -0.6), v(-0.48, 0.58, -0.78)], palette.teal),
    cable([v(-1.22, 0.58, 0), v(-0.8, 0.58, 0.6), v(-0.48, 0.58, 0.78)], palette.purple),
    cable([v(0.56, 0.58, -0.82), v(0.9, 0.58, -0.48), v(1.03, 0.58, 0)], palette.teal),
    cable([v(0.56, 0.58, 0.82), v(0.9, 0.58, 0.48), v(1.03, 0.58, 0)], palette.purple),
    cable([v(1.86, 0.58, 0), v(2.32, 0.58, 0), v(2.48, 0.58, 0)], palette.pink),
  ];
  root.add(...routes);

  const marker = pathMarker(palette.pink);
  root.add(marker);
  const markerPath = new THREE.CatmullRomCurve3([
    v(-2.65, 0.67, 0),
    v(-1.72, 0.67, 0),
    v(-0.1, 0.72, -0.76),
    v(1.42, 0.72, 0),
    v(2.98, 0.72, 0),
  ]);

  const stepIndex = new Map(steps.map((step, index) => [step.id, index]));
  const vectorIndex = stepIndex.get("vector");
  const graphIndex = stepIndex.get("graph");

  return {
    root,
    focus(state) {
      const id = state.id.toLowerCase();
      if (["question", "sources", "file"].includes(id)) return [sources];
      if (id === "extract") return [extraction];
      if (id === "vector") return [vector];
      if (id === "graph") return [graph];
      if (["briefing", "combine"].includes(id)) return [vector, graph, briefing];
      if (["answer", "cite"].includes(id)) return [answer];
      return [sources];
    },
    update(state) {
      const normalized = clamp(state.progress / Math.max(1, steps.length - 1));
      const point = markerPath.getPoint(normalized);
      marker.position.copy(point);

      const id = state.id.toLowerCase();
      const sourceActive = ["question", "sources", "file"].includes(id);
      const extractActive = id === "extract";
      const vectorActive = id === "vector";
      const graphActive = id === "graph";
      const briefingActive = ["briefing", "combine"].includes(id);
      const answerActive = ["answer", "cite"].includes(id);
      emphasize(sources, sourceActive ? 1 : 0);
      emphasize(extraction, extractActive ? 1 : 0);
      emphasize(
        vector,
        vectorActive || briefingActive
          ? 1
          : vectorIndex !== undefined && state.active > vectorIndex
            ? 0.3
            : 0,
      );
      emphasize(
        graph,
        graphActive || briefingActive
          ? 1
          : graphIndex !== undefined && state.active > graphIndex
            ? 0.3
            : 0,
      );
      emphasize(briefing, briefingActive ? 1 : 0);
      emphasize(answer, answerActive ? 1 : 0);

      const time = state.reducedMotion ? 0 : state.time;
      vector.rotation.y = Math.sin(time * 0.42) * 0.08;
      graph.rotation.y = -Math.sin(time * 0.36) * 0.07;
      pulse(citationPin, answerActive ? 1 : 0, time);
      pulse(marker, 0.7, time);
    },
  };
}

function createMemoryScene(steps: readonly Step[]): FocusableScene {
  const root = new THREE.Group();
  const foundation = platform(7.6, 3.35, palette.navy);
  root.add(foundation);

  const proposal = baseY(new THREE.Group());
  proposal.position.set(-3.0, 0.2, 0.1);
  proposal.userData.baseY = proposal.position.y;
  const proposalPaper = paper(1.0, 1.24, undefined, palette.cream);
  proposal.add(proposalPaper);
  const proposedChip = roundedBox(0.62, 0.12, 0.18, palette.pink, 0.04);
  proposedChip.position.set(0, 0.35, 0.12);
  proposal.add(proposedChip);
  addLabel(proposal, "PROPOSED LESSON", v(0, 1.52, 0), 1.55);
  root.add(proposal);

  const review = baseY(new THREE.Group());
  review.position.set(-1.35, 0.18, 0);
  review.userData.baseY = review.position.y;
  const reviewer = smallPerson(palette.purple);
  reviewer.position.set(0, 0.12, 0.1);
  const reviewRing = ring(0.64, palette.pink);
  reviewRing.rotation.x = Math.PI / 2;
  reviewRing.position.y = 0.18;
  review.add(reviewer, reviewRing);
  const approval = roundedBox(0.48, 0.1, 0.26, palette.teal, 0.05);
  approval.position.set(0, 0.28, -0.52);
  review.add(approval);
  addLabel(review, "HUMAN REVIEW", v(0, 1.35, 0), 1.3);
  root.add(review);

  const library = baseY(new THREE.Group());
  library.position.set(0.45, 0.18, 0);
  library.userData.baseY = library.position.y;
  const shelf = roundedBox(1.35, 0.14, 1.35, palette.purple, 0.1);
  shelf.position.y = 0.16;
  library.add(shelf);
  for (let row = 0; row < 3; row += 1) {
    const slab = roundedBox(1.16, 0.1, 0.34, palette.cream, 0.04);
    slab.position.set(0, 0.34 + row * 0.27, -0.34 + row * 0.34);
    library.add(slab);
  }
  const retained = orb(0.14, palette.pink);
  retained.position.set(0.36, 0.97, 0.34);
  library.add(retained);
  addLabel(library, "RETAINED LIBRARY", v(0, 1.42, 0), 1.48);
  root.add(library);

  const firstAgent = baseY(agentToken(palette.teal));
  firstAgent.position.set(2.55, 0.22, -0.8);
  firstAgent.userData.baseY = firstAgent.position.y;
  addLabel(firstAgent, "AGENT A", v(0, 1.03, 0), 0.82);
  root.add(firstAgent);

  const secondAgent = baseY(agentToken(palette.purple));
  secondAgent.position.set(2.55, 0.22, 0.8);
  secondAgent.userData.baseY = secondAgent.position.y;
  addLabel(secondAgent, "AGENT B", v(0, 1.03, 0), 0.82);
  root.add(secondAgent);

  root.add(
    cable([v(-2.46, 0.65, 0), v(-1.94, 0.65, 0), v(-1.72, 0.65, 0)], palette.pink),
    cable([v(-0.93, 0.65, 0), v(-0.37, 0.65, 0), v(-0.2, 0.65, 0)], palette.teal),
    cable([v(1.12, 0.65, 0), v(1.65, 0.65, -0.64), v(2.18, 0.65, -0.76)], palette.teal),
    cable([v(1.12, 0.65, 0), v(1.65, 0.65, 0.64), v(2.18, 0.65, 0.76)], palette.purple),
  );

  const lesson = roundedBox(0.24, 0.16, 0.18, palette.pink, 0.05);
  root.add(lesson);
  const lessonPath = new THREE.CatmullRomCurve3([
    v(-2.75, 0.72, 0),
    v(-1.35, 0.72, 0),
    v(0.45, 0.88, 0),
    v(2.48, 0.72, 0.78),
  ]);

  return {
    root,
    focus(state) {
      const id = state.id.toLowerCase();
      if (/propos|lesson|capture|knowledge/.test(id)) return [proposal];
      if (/approv|review|decision/.test(id)) return [review];
      if (/stor|retain|memory|library/.test(id)) return [library];
      if (/reuse|agent|share/.test(id)) return [firstAgent, secondAgent];
      const fallback = [proposal, review, library, secondAgent];
      return [fallback[Math.min(state.active, fallback.length - 1)]];
    },
    update(state) {
      const id = state.id.toLowerCase();
      const current = clamp(state.progress / Math.max(1, steps.length - 1));
      lesson.position.copy(lessonPath.getPoint(current));
      const proposalActive = /propos|lesson|capture|knowledge/.test(id);
      const reviewActive = /approv|review|decision/.test(id);
      const libraryActive = /stor|retain|memory|library/.test(id);
      const reuseActive = /reuse|agent|share/.test(id);
      emphasize(proposal, proposalActive ? 1 : 0);
      emphasize(review, reviewActive ? 1 : 0);
      emphasize(library, libraryActive ? 1 : 0);
      emphasize(firstAgent, reuseActive ? 0.75 : 0);
      emphasize(secondAgent, reuseActive ? 1 : 0);
      const time = state.reducedMotion ? 0 : state.time;
      reviewRing.rotation.z = time * 0.18;
      pulse(retained, libraryActive ? 1 : 0, time);
      pulse(lesson, 0.65, time);
    },
  };
}

function knowledgeModule() {
  const group = new THREE.Group();
  const sheets = pageStack(["FILES", "IMAGES"], palette.cream);
  sheets.scale.setScalar(0.68);
  sheets.position.set(-0.22, 0.18, 0);
  const cluster = createVectorCluster();
  cluster.scale.setScalar(0.46);
  cluster.position.set(0.38, 0.1, 0);
  group.add(sheets, cluster);
  addLabel(group, "KNOWLEDGE", v(0, 1.17, 0), 1.02);
  return group;
}

function memoryModule() {
  const group = new THREE.Group();
  const vault = roundedBox(0.96, 0.78, 0.88, palette.purple, 0.12);
  vault.position.y = 0.45;
  group.add(vault);
  [0.25, 0.45, 0.65].forEach((y, index) => {
    const drawer = roundedBox(0.72, 0.1, 0.08, index === 1 ? palette.pink : palette.cream, 0.025);
    drawer.position.set(0, y, 0.47);
    group.add(drawer);
  });
  addLabel(group, "APPROVED MEMORY", v(0, 1.17, 0), 1.38);
  return group;
}

function skillsModule() {
  const group = new THREE.Group();
  for (let index = 0; index < 3; index += 1) {
    const block = roundedBox(0.62, 0.2 + index * 0.17, 0.58, index === 2 ? palette.pink : palette.cream, 0.07);
    block.position.set(-0.52 + index * 0.52, 0.13 + (0.2 + index * 0.17) / 2, 0);
    group.add(block);
  }
  addLabel(group, "VERSIONED SKILLS", v(0, 1.17, 0), 1.28);
  return group;
}

function connectionsModule() {
  const group = new THREE.Group();
  const gateway = roundedBox(0.82, 0.68, 0.82, palette.teal, 0.16);
  gateway.position.y = 0.38;
  group.add(gateway);
  for (let index = 0; index < 4; index += 1) {
    const angle = (index / 4) * Math.PI * 2;
    const port = orb(0.1, index % 2 ? palette.purple : palette.cream);
    port.position.set(Math.cos(angle) * 0.58, 0.4, Math.sin(angle) * 0.58);
    group.add(port);
  }
  addLabel(group, "CONNECTIONS", v(0, 1.17, 0), 1.12);
  return group;
}

function visibilityModule() {
  const group = new THREE.Group();
  const traceRing = ring(0.58, palette.teal);
  traceRing.rotation.x = Math.PI / 2;
  traceRing.position.y = 0.46;
  group.add(traceRing);
  const points = [
    [-0.43, 0.42, 0],
    [0, 0.42, -0.43],
    [0.43, 0.42, 0],
    [0, 0.42, 0.43],
  ] as const;
  points.forEach(([x, y, z], index) => {
    const peg = orb(0.1, index === 3 ? palette.pink : palette.mint);
    peg.position.set(x, y, z);
    group.add(peg);
  });
  addLabel(group, "VISIBILITY", v(0, 1.17, 0), 1.22);
  return group;
}

function createInfrastructureScene(): FocusableScene {
  const root = new THREE.Group();
  const foundation = platform(7.7, 3.7, palette.navy);
  root.add(foundation);

  const layerStack = new THREE.Group();
  const layerColors = [
    palette.ink,
    palette.purple,
    palette.teal,
    palette.mint,
    palette.cream,
  ];
  layerColors.forEach((color, index) => {
    const layer = roundedBox(2.1, 0.18, 1.58, color, 0.12);
    layer.position.y = 0.18 + index * 0.2;
    layerStack.add(layer);
  });
  layerStack.position.set(0, 0.12, 0);
  const core = orb(0.34, palette.pink);
  core.position.y = 1.42;
  const coreRing = ring(0.68, palette.teal);
  coreRing.rotation.x = Math.PI / 2;
  coreRing.position.y = 1.42;
  layerStack.add(core, coreRing);
  addLabel(layerStack, "SHARED FOUNDATION", v(0, 2.05, 0), 1.65);
  root.add(layerStack);

  const modules = [
    baseY(knowledgeModule()),
    baseY(memoryModule()),
    baseY(skillsModule()),
    baseY(connectionsModule()),
    baseY(visibilityModule()),
  ];
  const positions = [
    v(-3.0, 0.18, -0.95),
    v(-3.0, 0.18, 0.92),
    v(1.72, 0.18, -1.16),
    v(3.02, 0.18, -0.36),
    v(2.72, 0.18, 1.02),
  ];
  modules.forEach((module, index) => {
    module.position.copy(positions[index]);
    module.userData.baseY = module.position.y;
    const selector = ring(0.72, palette.pink);
    selector.rotation.x = Math.PI / 2;
    selector.position.y = 0.08;
    selector.visible = false;
    module.add(selector);
    module.userData.selector = selector;
    root.add(module);
    root.add(
      cable(
        [
          v(module.position.x * 0.72, 0.54, module.position.z * 0.72),
          v(module.position.x * 0.46, 0.7, module.position.z * 0.46),
          v(module.position.x * 0.27, 0.82, module.position.z * 0.27),
        ],
        index % 2 ? palette.purple : palette.teal,
        0.017,
      ),
    );
  });

  const agents = new THREE.Group();
  const agentA = agentToken(palette.teal);
  const agentB = agentToken(palette.purple);
  agentA.position.set(-0.52, 0, 0);
  agentB.position.set(0.52, 0, 0);
  agents.position.set(0, 0.2, 1.38);
  agents.add(agentA, agentB);
  addLabel(agents, "APPROVED AGENTS", v(0, 1.06, 0), 1.4);
  root.add(agents);
  root.add(
    cable([v(-0.4, 0.75, 0.72), v(-0.52, 0.75, 1.17)], palette.teal),
    cable([v(0.4, 0.75, 0.72), v(0.52, 0.75, 1.17)], palette.purple),
  );

  const routeMarkers = modules.map((_, index) => {
    const marker = pathMarker(index % 2 ? palette.purple : palette.teal);
    root.add(marker);
    return marker;
  });

  const idToModule = new Map([
    ["knowledge", 0],
    ["memory", 1],
    ["skills", 2],
    ["connections", 3],
    ["visibility", 4],
  ]);

  return {
    root,
    focus(state) {
      const selected = idToModule.get(state.id.toLowerCase()) ?? state.active;
      return [modules[Math.min(selected, modules.length - 1)]];
    },
    update(state) {
      const selected = idToModule.get(state.id.toLowerCase()) ?? state.active;
      modules.forEach((module, index) => {
        const active = index === selected;
        emphasize(module, active ? 1 : 0);
        const selector = module.userData.selector as THREE.Mesh | undefined;
        if (selector) selector.visible = active;
      });
      const time = state.reducedMotion ? 0 : state.time;
      routeMarkers.forEach((marker, index) => {
        const source = positions[index];
        const travel = state.reducedMotion
          ? 0.58
          : (time * 0.12 + index * 0.17) % 1;
        marker.position.set(
          THREE.MathUtils.lerp(source.x * 0.72, source.x * 0.27, travel),
          0.62 + Math.sin(travel * Math.PI) * 0.18,
          THREE.MathUtils.lerp(source.z * 0.72, source.z * 0.27, travel),
        );
        marker.visible = index === selected || state.active >= index;
      });
      coreRing.rotation.z = time * 0.14;
      pulse(core, 0.65, time);
      agents.position.y = 0.2 + Math.sin(time * 0.7) * 0.018;
    },
  };
}

export function createKnowledgeScene(
  variant: Variant,
  steps: readonly Step[],
): SculptureScene {
  if (variant === "memory") return createMemoryScene(steps);
  if (variant === "infrastructure") return createInfrastructureScene();
  return buildKnowledgeScene(steps);
}
