import * as THREE from "three";
import { chapters, storyAt } from "./scene-story-data.js";
import { toolBrands, logoImage } from "./scene-tool-brands.js";

export function createAssembly(canvas, wrap, story = true) {
  if (!canvas || !wrap) return null;
  let renderer;
  try {
    if (!new URLSearchParams(location.search).has("static"))
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
  } catch {
    /* The labelled static diagram remains available. */
  }
  if (!renderer) return null;
  const events = new AbortController();
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.24;
  const scene = new THREE.Scene();
  const camera = story
    ? new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 60)
    : new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(5.5, 5.0, 7.8);
  camera.lookAt(0, 0.65, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb2b7c4, 3.2));
  const key = new THREE.DirectionalLight(0xfffaf0, 4.6);
  key.position.set(-3, 8, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -6;
  key.shadow.camera.right = 6;
  key.shadow.camera.top = 6;
  key.shadow.camera.bottom = -6;
  key.shadow.normalBias = 0.025;
  key.shadow.bias = -0.0002;
  key.shadow.radius = 4;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe0e4ff, 1.8);
  fill.position.set(5, 3, -5);
  scene.add(fill);
  const rig = new THREE.Group();
  rig.rotation.y = -0.16;
  scene.add(rig);
  const mat = (color, roughness = 0.55, metalness = 0.06) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const ink = mat("#172338", 0.43, 0.2),
    teal = mat("#6DC4AD", 0.38, 0.18),
    pink = mat("#EE7BB3", 0.49, 0.09),
    white = mat("#fafbf9", 0.45, 0.08),
    silver = mat("#ccd2d7", 0.4, 0.22),
    dark = mat("#36414b", 0.52, 0.18);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.ShadowMaterial({ opacity: 0.1 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.57;
  floor.receiveShadow = true;
  scene.add(floor);
  function roundedPlate(width, depth, height, radius, material) {
    const x = -width / 2,
      y = -depth / 2,
      r = radius;
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y);
    shape.lineTo(x + width - r, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + r);
    shape.lineTo(x + width, y + depth - r);
    shape.quadraticCurveTo(x + width, y + depth, x + width - r, y + depth);
    shape.lineTo(x + r, y + depth);
    shape.quadraticCurveTo(x, y + depth, x, y + depth - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.025,
      curveSegments: 10,
    });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -height / 2, 0);
    const mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }
  function textTexture(text, color = "#172338", background = null, size = 54) {
    const element = document.createElement("canvas");
    element.width = 1024;
    element.height = 192;
    const ctx = element.getContext("2d");
    if (background) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, 1024, 192);
    }
    ctx.fillStyle = color;
    ctx.font = `600 ${size}px Manrope, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 512, 99);
    const texture = new THREE.CanvasTexture(element);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }
  function label(text, width, height, color, background, size) {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({
        map: textTexture(text, color, background, size),
        transparent: !background,
        depthWrite: false,
      }),
    );
    return mesh;
  }
  const layers = [];
  const layerSurfaces = [];
  const layerColors = ["#172338", "#d7c5d8", "#A070A6", "#6DC4AD"].map(
    (color) => new THREE.Color(color),
  );
  const layerNames = [
    "VISIBILITY + CONTROL",
    "CONNECTIONS",
    "SKILLS + WORKFLOWS",
    "KNOWLEDGE + MEMORY",
  ];
  const layerY = [-0.92, -0.51, -0.1, 0.31];
  const materials = [ink, mat("#d7c5d8"), mat("#A070A6"), teal];
  layerNames.forEach((name, i) => {
    const group = new THREE.Group();
    group.position.y = layerY[i];
    const plate = roundedPlate(4.2, 2.83, 0.22, 0.2, materials[i].clone());
    group.add(plate);
    layerSurfaces.push(plate);
    const front = label(
      name,
      2.0,
      0.28,
      i === 0 ? "#F6F7F9" : "#172338",
      null,
      50,
    );
    front.position.set(-0.43, -0.005, 1.452);
    group.add(front);
    // Small index marks give each physical layer a visual identity.
    for (let k = 0; k < 4; k++) {
      const mark = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.055, 0.013),
        k === i ? white : dark,
      );
      mark.position.set(1.27 + k * 0.14, 0.006, 1.453);
      group.add(mark);
    }
    for (const x of [-1.83, 1.83])
      for (const z of [-1.15, 1.15]) {
        const bolt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.035, 0.019, 12),
          i === 0 ? silver : ink,
        );
        bolt.position.set(x, 0.147, z);
        group.add(bolt);
      }
    rig.add(group);
    layers.push(group);
  });
  const railGroup = new THREE.Group();
  rig.add(railGroup);
  // Rails tie the layers to a common physical foundation.
  for (const x of [-1.63, 1.63])
    for (const z of [-0.96, 0.96]) {
      const rail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 1.4, 12),
        silver,
      );
      rail.position.set(x, -0.26, z);
      railGroup.add(rail);
    }
  const core = new THREE.Group();
  core.position.set(0, 0.64, 0.18);
  rig.add(core);
  const coreBody = roundedPlate(1.34, 1.12, 0.31, 0.17, white);
  core.add(coreBody);
  const coreTop = label("AI–OS", 0.97, 0.28, "#172338", null, 54);
  coreTop.rotation.x = -Math.PI / 2;
  coreTop.position.set(0, 0.19, 0.24);
  core.add(coreTop);
  new THREE.TextureLoader().load(
    "/assets/logos/maslow-symbol-full-color.png",
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const mark = new THREE.Mesh(
        new THREE.PlaneGeometry(0.59, 0.39),
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
        }),
      );
      mark.rotation.x = -Math.PI / 2;
      mark.position.set(0, 0.187, -0.12);
      core.add(mark);
      requestRender();
    },
  );
  const coreFront = label("MASLOW", 0.71, 0.15, "#172338", null, 57);
  coreFront.position.set(0, 0, 0.602);
  core.add(coreFront);
  // Engraved paths on the top layer and connection ports.
  const routing = new THREE.Group();
  rig.add(routing);
  const routes = [
    [-1.65, 0.75],
    [-1.65, -0.65],
    [1.64, 0.75],
    [1.64, -0.65],
  ];
  routes.forEach(([x, z]) => {
    const points = [
      new THREE.Vector3(x, 0.46, z),
      new THREE.Vector3(x * 0.55, 0.46, z),
      new THREE.Vector3(x * 0.36, 0.46, 0.18),
    ];
    routing.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: "#467967",
          transparent: true,
          opacity: 0.6,
        }),
      ),
    );
    const port = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.028, 16),
      ink,
    );
    port.position.set(x, 0.455, z);
    routing.add(port);
  });
  const agentGroups = [];
  const agentMats = [];
  const curves = [];
  const pulses = [];
  const annotations = [];
  const tubes = [];
  const agentPositions = [
    [-2.18, 1.93, 0.06],
    [0.02, 2.27, -1.53],
    [2.16, 1.83, -0.04],
  ];
  ["CODEX / OPENAI", "CLAUDE CODE", "HERMES"].forEach((name, i) => {
    const group = new THREE.Group();
    group.position.set(...agentPositions[i]);
    const agentMaterial = mat(i === 0 ? "#6DC4AD" : "#fafbf9", 0.36, 0.13);
    agentMats.push(agentMaterial);
    const block = roundedPlate(1.3, 1.02, 0.29, 0.15, agentMaterial);
    group.add(block);
    const brandKey = ["openai", "claude", "hermes"][i];
    new THREE.TextureLoader().load(toolBrands[brandKey].src, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const image = texture.image,
        ratio = image.width / image.height;
      const width = ratio >= 1 ? 0.46 : 0.46 * ratio,
        height = ratio >= 1 ? 0.46 / ratio : 0.46;
      const mark = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
        }),
      );
      mark.rotation.x = -Math.PI / 2;
      mark.position.set(0, 0.195, -0.09);
      group.add(mark);
      requestRender();
    });
    const title = label(name, 1.02, 0.19, "#172338", null, i === 0 ? 66 : 76);
    title.rotation.x = -Math.PI / 2;
    title.position.set(0, 0.19, 0.28);
    group.add(title);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.035, 0.02), ink);
    edge.position.set(0, 0, 0.558);
    group.add(edge);
    rig.add(group);
    agentGroups.push(group);
    const annotation = document.createElement("span");
    annotation.className = "agent-annotation";
    annotation.setAttribute("aria-hidden", "true");
    annotation.append(logoImage(brandKey), document.createTextNode(name));
    wrap.append(annotation);
    annotations.push(annotation);
    const p = new THREE.Vector3(...agentPositions[i]);
    p.y -= 0.15;
    const end = new THREE.Vector3(
      i === 0 ? -0.44 : i === 1 ? 0 : 0.44,
      0.82,
      0.18,
    );
    const curve = new THREE.CubicBezierCurve3(
      p,
      new THREE.Vector3(p.x, p.y - 0.5, p.z),
      new THREE.Vector3(end.x, 1.32, end.z),
      end,
    );
    curves.push(curve);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 40, 0.018, 6, false),
      dark,
    );
    rig.add(tube);
    tubes.push(tube);
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.074, 12, 8), pink);
    rig.add(bead);
    pulses.push(bead);
  });
  // A thin surveying ring frames the sculpture without obscuring the information.
  const ringPoints = [];
  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * Math.PI * 2;
    ringPoints.push(
      new THREE.Vector3(Math.cos(angle) * 3.16, -1.07, Math.sin(angle) * 2.57),
    );
  }
  const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
  const ring = new THREE.Line(
    ringGeo,
    new THREE.LineDashedMaterial({
      color: "#b1b9c2",
      dashSize: 0.055,
      gapSize: 0.075,
      transparent: true,
      opacity: 0.62,
    }),
  );
  ring.computeLineDistances();
  rig.add(ring);
  // Each physical layer carries a different, intentionally schematic work artifact.
  const props = layers.map((layer) => {
    const group = new THREE.Group();
    layer.add(group);
    return group;
  });
  function topLabel(text, x, y, z, width = 0.9, height = 0.22) {
    const m = label(text, width, height, "#172338", null, 70);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, y, z);
    return m;
  }
  function smallTile(group, x, y, z, text, w = 0.91, d = 0.89, h = 0.09) {
    const tile = roundedPlate(w, d, h, 0.06, white);
    tile.position.set(x, y, z);
    group.add(tile);
    group.add(topLabel(text, x, y + h / 2 + 0.03, z, w * 0.88, 0.19));
    return tile;
  }
  const knowledgeViews = [],
    sourceSheets = [],
    landmarks = [];
  function landmark(parent, text, position, mode, extra = "") {
    const anchor = new THREE.Object3D();
    anchor.position.set(...position);
    parent.add(anchor);
    const element = document.createElement("span");
    element.className = `story-landmark ${extra}`;
    element.textContent = text;
    element.setAttribute("aria-hidden", "true");
    wrap.append(element);
    landmarks.push({ anchor, element, mode });
  }
  const sharedSetup = new THREE.Group();
  rig.add(sharedSetup);
  if (story) {
    for (let i = 0; i < 3; i++) {
      const view = new THREE.Group();
      props[3].add(view);
      knowledgeViews.push(view);
    }
    // Source sheets gather into the same physical layer, retaining their origins.
    ["PDF", "IMAGE", "DOC"].forEach((text, i) => {
      const sheet = new THREE.Group();
      knowledgeViews[0].add(sheet);
      sourceSheets.push(sheet);
      smallTile(sheet, 0, 0.16, 0, text, 0.91, 1.32, 0.06);
      for (let k = 0; k < 3; k++) {
        const line = new THREE.Mesh(
          new THREE.BoxGeometry(0.56, 0.012, 0.025),
          silver,
        );
        line.position.set(0, 0.205, 0.16 + k * 0.14);
        sheet.add(line);
      }
      landmark(
        sheet,
        ["Local Drive", "Network Drive", "SharePoint"][i],
        [0, 0.63, -0.45],
        0,
        "source-landmark",
      );
    });
    // Search passages and a compact entity graph show two different kinds of context.
    const search = knowledgeViews[1];
    smallTile(search, -1.33, 0.29, 0.1, "SOURCE", 0.72, 1.18, 0.075);
    for (let k = 0; k < 3; k++) {
      const passage = new THREE.Mesh(
        new THREE.BoxGeometry(0.49, 0.02, 0.12),
        k === 1 ? teal : silver,
      );
      passage.position.set(-1.33, 0.355, -0.12 + k * 0.21);
      search.add(passage);
    }
    const graphPoints = [
      new THREE.Vector3(-0.26, 0.44, -0.69),
      new THREE.Vector3(1.18, 0.44, -0.22),
      new THREE.Vector3(0.35, 0.44, 0.91),
    ];
    const pairs = [
      [0, 1],
      [1, 2],
      [2, 0],
    ];
    pairs.forEach(([a, b]) =>
      search.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(
            new THREE.LineCurve3(graphPoints[a], graphPoints[b]),
            1,
            0.024,
            8,
            false,
          ),
          dark,
        ),
      ),
    );
    search.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.96, 0.39, 0.1),
          graphPoints[2],
        ]),
        new THREE.LineDashedMaterial({
          color: "#467967",
          dashSize: 0.06,
          gapSize: 0.045,
        }),
      ).computeLineDistances(),
    );
    graphPoints.forEach((point, i) => {
      const node = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.13, 32),
        i === 2 ? pink : white,
      );
      node.position.copy(point);
      search.add(node);
      const dot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.075, 0.145, 24),
        ink,
      );
      dot.position.copy(point);
      search.add(dot);
      landmark(
        search,
        ["Supplier", "Product", "Requirement"][i],
        [point.x, point.y + 0.21, point.z],
        1,
        "graph-landmark",
      );
    });
    // A living library holds the same sources, relationships, and a reviewed lesson.
    const library = knowledgeViews[2];
    const shelf = roundedPlate(3.16, 1.46, 0.18, 0.12, white);
    shelf.position.set(0, 0.25, 0.05);
    library.add(shelf);
    for (let i = 0; i < 5; i++) {
      const folder = new THREE.Group();
      folder.position.set(-1.03 + i * 0.5, 0.69, -0.02);
      folder.rotation.x = 0.13;
      library.add(folder);
      const page = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.8, 0.15),
        i === 4 ? teal : i === 3 ? pink : white,
      );
      folder.add(page);
      page.castShadow = true;
      const tab = new THREE.Mesh(
        new THREE.BoxGeometry(0.17, 0.085, 0.16),
        i === 4 ? teal : silver,
      );
      tab.position.set(-0.08, 0.44, 0);
      folder.add(tab);
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.028, 0.012),
        ink,
      );
      line.position.set(0, 0.2, 0.085);
      folder.add(line);
      if (i === 4) folder.userData.lesson = true;
    }
    landmark(
      library,
      "Sources + connections",
      [0, 1.4, -0.18],
      2,
      "library-landmark",
    );
    landmark(
      library,
      "✓ Request current certification",
      [0.08, 0.36, 1.1],
      2,
      "lesson-landmark",
    );
    // On the final reveal, the OS workspace connects to shared organization services.
    const monitor = new THREE.Group();
    monitor.position.set(-2.65, -0.68, 1.08);
    sharedSetup.add(monitor);
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.57, 0.08), ink);
    screen.position.y = 0.38;
    screen.castShadow = true;
    monitor.add(screen);
    const glass = new THREE.Mesh(
      new THREE.PlaneGeometry(0.73, 0.44),
      mat("#d8eee4"),
    );
    glass.position.set(0, 0.38, 0.046);
    monitor.add(glass);
    const stem = new THREE.Mesh(
      new THREE.BoxGeometry(0.075, 0.2, 0.08),
      silver,
    );
    stem.position.y = 0.02;
    monitor.add(stem);
    const base = roundedPlate(0.56, 0.37, 0.035, 0.04, silver);
    base.position.y = -0.1;
    monitor.add(base);
    const server = new THREE.Group();
    server.position.set(2.62, -0.61, 0.68);
    sharedSetup.add(server);
    for (let i = 0; i < 3; i++) {
      const tray = roundedPlate(0.81, 0.74, 0.16, 0.065, white);
      tray.position.y = i * 0.22;
      server.add(tray);
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), teal);
      led.position.set(0.23, i * 0.22, 0.39);
      server.add(led);
    }
    landmark(monitor, "Your workspace", [0, -0.29, 0.3], 6, "setup-landmark");
    landmark(server, "Shared services", [0, -0.32, 0.45], 6, "setup-landmark");
    for (const endpoint of [monitor.position, server.position]) {
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          endpoint,
          new THREE.Vector3(endpoint.x * 0.65, -0.83, endpoint.z),
          new THREE.Vector3(0, -0.83, 0.4),
        ]),
        new THREE.LineBasicMaterial({ color: "#739789" }),
      );
      sharedSetup.add(line);
    }

    // Skills: a three-step procedure is raised in a deliberate sequence.
    ["COMPARE", "CITE", "FLAG GAPS"].forEach((text, i) => {
      const height = 0.22 + i * 0.25,
        y = 0.16 + height / 2;
      smallTile(props[2], (i - 1) * 1.12, y, 0, text, 0.95, 0.95, height);
      const step = label(`0${i + 1}`, 0.29, 0.2, "#172338", null, 110);
      step.position.set((i - 1) * 1.12, y - 0.025, 0.51);
      props[2].add(step);
      landmark(
        props[2],
        text === "FLAG GAPS"
          ? "Flag gaps"
          : text === "CITE"
            ? "Cite"
            : "Compare",
        [(i - 1) * 1.12, y + height / 2 + 0.13, 0],
        3,
        "graph-landmark",
      );
    });
    // Connections: two scoped endpoints joined through an explicit connection.
    smallTile(props[1], -1.2, 0.4, 0, "ERP / CRM", 1.05, 0.94, 0.19);
    smallTile(props[1], 1.2, 0.4, 0, "LEGACY", 1.05, 0.94, 0.19);
    const bridge = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.66, 0.42, 0),
      new THREE.Vector3(-0.5, 1.2, 0),
      new THREE.Vector3(0.5, 1.2, 0),
      new THREE.Vector3(0.66, 0.42, 0),
    );
    props[1].add(
      new THREE.Mesh(new THREE.TubeGeometry(bridge, 35, 0.034, 8, false), teal),
    );
    smallTile(props[1], 0, 0.26, 0.68, "ACCESS", 0.66, 0.4, 0.1);
    landmark(props[1], "ERP / CRM", [-1.2, 0.72, 0], 4, "graph-landmark");
    landmark(props[1], "Legacy systems", [1.2, 0.72, 0], 4, "graph-landmark");
    // Observability: a path of trace events, rather than a decorative metric chart.
    const tracePoints = [
      new THREE.Vector3(-1.45, 0.34, 0.35),
      new THREE.Vector3(-0.73, 0.34, -0.4),
      new THREE.Vector3(0, 0.34, 0.25),
      new THREE.Vector3(0.73, 0.34, -0.4),
      new THREE.Vector3(1.45, 0.34, 0.35),
    ];
    props[0].add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(tracePoints),
        new THREE.LineBasicMaterial({ color: "#6DC4AD" }),
      ),
    );
    tracePoints.forEach((point, i) => {
      const peg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.105, 0.105, 0.17, 20),
        i === 4 ? pink : teal,
      );
      peg.position.copy(point);
      props[0].add(peg);
    });
    ["SOURCE", "RUN", "REVIEW"].forEach((text, i) => {
      const m = topLabel(text, (i - 1) * 1.35, 0.17, 0.92, 0.87, 0.18);
      m.material = new THREE.MeshBasicMaterial({
        map: textTexture(text, "#F6F7F9", null, 74),
        transparent: true,
      });
      props[0].add(m);
      landmark(
        props[0],
        text === "SOURCE"
          ? "Source"
          : text === "RUN"
            ? "Agent steps"
            : "Human review",
        [(i - 1) * 1.35, 0.56, 0.4],
        5,
        "graph-landmark",
      );
    });
  }
  const storyLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 33 }, () => new THREE.Vector3()),
    ),
    new THREE.LineBasicMaterial({
      color: "#6c9887",
      transparent: true,
      opacity: 0.85,
    }),
  );
  rig.add(storyLine);
  const storyPulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.064, 12, 8),
    pink,
  );
  rig.add(storyPulse);
  let selected = 0,
    paused = document.body.classList.contains("motion-paused"),
    visible = true,
    contextAvailable = true,
    destroyed = false,
    frame = 0,
    lastFrame = 0,
    scrollProgress = 0;
  const initialProgress = Number(
    document.querySelector(".layer-journey")?.dataset.progress || 0,
  );
  let storyPosition = storyAt(initialProgress).position;
  const pointer = { x: 0, y: 0 };
  let currentX = 0,
    currentY = 0,
    phase = 0;
  const fitPoint = new THREE.Vector3();
  const tealColor = new THREE.Color("#6DC4AD"),
    whiteColor = new THREE.Color("#fafbf9"),
    quietColor = new THREE.Color("#d9e2df");
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const smooth = (value) => {
    const x = clamp(value);
    return x * x * (3 - 2 * x);
  };
  function isVisibleInRig(object) {
    let current = object;
    while (current) {
      if (!current.visible) return false;
      if (current === rig) return true;
      current = current.parent;
    }
    return false;
  }
  function fitStoryCamera() {
    const width = wrap.clientWidth;
    const height = wrap.clientHeight;
    if (!width || !height) return;

    camera.position.set(7.2, 6.4, 10.5);
    camera.lookAt(0, 0.6, 0);
    camera.updateMatrixWorld(true);
    rig.updateWorldMatrix(true, true);

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    rig.traverse((object) => {
      if (!object.geometry || !isVisibleInRig(object)) return;
      if (!object.geometry.boundingBox) object.geometry.computeBoundingBox();
      const bounds = object.geometry.boundingBox;
      if (!bounds || bounds.isEmpty()) return;
      for (const x of [bounds.min.x, bounds.max.x]) {
        for (const y of [bounds.min.y, bounds.max.y]) {
          for (const z of [bounds.min.z, bounds.max.z]) {
            fitPoint
              .set(x, y, z)
              .applyMatrix4(object.matrixWorld)
              .applyMatrix4(camera.matrixWorldInverse);
            minX = Math.min(minX, fitPoint.x);
            maxX = Math.max(maxX, fitPoint.x);
            minY = Math.min(minY, fitPoint.y);
            maxY = Math.max(maxY, fitPoint.y);
          }
        }
      }
    });
    if (![minX, maxX, minY, maxY].every(Number.isFinite)) return;

    const pixelPadX = Math.min(120, Math.max(48, width * 0.055));
    const pixelPadY = Math.min(84, Math.max(24, height * 0.055));
    const topControlPad =
      storyPosition < 3 && innerWidth > 700
        ? Math.max(pixelPadY, 64)
        : pixelPadY;
    const safeWidth = Math.max(0.5, 1 - (pixelPadX * 2) / width);
    const safeHeight = Math.max(0.5, 1 - (topControlPad + pixelPadY) / height);
    const contentWidth = Math.max(0.1, maxX - minX);
    const contentHeight = Math.max(0.1, maxY - minY);
    let viewWidth = contentWidth / safeWidth;
    let viewHeight = contentHeight / safeHeight;
    const aspect = width / height;
    if (viewWidth / viewHeight > aspect) viewHeight = viewWidth / aspect;
    else viewWidth = viewHeight * aspect;

    const centerX = (minX + maxX) * 0.5;
    const centerY =
      (minY + maxY) * 0.5 +
      (viewHeight * (topControlPad - pixelPadY)) / (height * 2);
    camera.left = centerX - viewWidth * 0.5;
    camera.right = centerX + viewWidth * 0.5;
    camera.top = centerY + viewHeight * 0.5;
    camera.bottom = centerY - viewHeight * 0.5;
    camera.updateProjectionMatrix();

    canvas.dataset.frameLeft = ((minX - camera.left) / viewWidth).toFixed(3);
    canvas.dataset.frameRight = ((maxX - camera.left) / viewWidth).toFixed(3);
    canvas.dataset.frameTop = ((camera.top - maxY) / viewHeight).toFixed(3);
    canvas.dataset.frameBottom = ((camera.top - minY) / viewHeight).toFixed(3);
  }
  function layerPose(chapter, index) {
    if (chapter < 0 || chapter === 6)
      return { x: 0, y: layerY[index], z: 0, s: 1, focus: 1 };
    const active = index === chapters[chapter].layer;
    return active
      ? { x: 0.43, y: 0.12, z: 1.0, s: 1.06, focus: 1 }
      : { x: -1.55, y: -1.04 + index * 0.18, z: -1.4, s: 0.5, focus: 0.32 };
  }
  function resize() {
    if (destroyed || !contextAvailable) return;
    const w = wrap.clientWidth,
      h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    if (story) {
      camera.position.set(7.2, 6.4, 10.5);
      camera.lookAt(0, 0.6, 0);
    } else {
      camera.aspect = aspect;
      camera.position.set(5.5, 5.0, 7.8);
      camera.position.multiplyScalar(aspect < 1.04 ? 1.12 : 1);
      camera.lookAt(0, 0.65, 0);
    }
    camera.updateProjectionMatrix();
    requestRender();
  }
  function draw(timestamp = 0) {
    frame = 0;
    if (destroyed || !contextAvailable || !visible || document.hidden) return;
    const dt = Math.min((timestamp - lastFrame) / 1000, 0.05) || 0.016;
    lastFrame = timestamp;
    if (!paused) phase += dt;
    const lerp = paused ? 1 : Math.min(1, dt * 10);
    currentX += ((paused ? 0 : pointer.x) - currentX) * lerp;
    currentY += ((paused ? 0 : pointer.y) - currentY) * lerp;
    if (story) {
      const chapter = Math.floor(storyPosition),
        local = storyPosition - chapter;
      const blend = paused ? 1 : smooth(local / 0.24);
      const from = chapter === 0 ? -1 : chapter - 1;
      const fromOpen = from >= 0 && from < 6 ? 1 : 0,
        toOpen = chapter < 6 ? 1 : 0;
      const openness = THREE.MathUtils.lerp(fromOpen, toOpen, blend);
      const featuredChapter = blend < 0.5 ? Math.max(0, from) : chapter;
      rig.rotation.y = -0.16 + currentX * 0.08 - openness * 0.12;
      rig.rotation.x = currentY * 0.025;
      layers.forEach((layer, i) => {
        const a = layerPose(from, i),
          b = layerPose(chapter, i);
        const target = new THREE.Vector3(
          THREE.MathUtils.lerp(a.x, b.x, blend),
          THREE.MathUtils.lerp(a.y, b.y, blend),
          THREE.MathUtils.lerp(a.z, b.z, blend),
        );
        layer.position.lerp(target, lerp);
        layer.scale.setScalar(THREE.MathUtils.lerp(a.s, b.s, blend));
        const focus = THREE.MathUtils.lerp(a.focus, b.focus, blend);
        layerSurfaces[i].material.color
          .copy(quietColor)
          .lerp(layerColors[i], focus);
        const aProp =
            from >= 0 && from < 6 && i === chapters[from].layer ? 1 : 0,
          bProp = chapter < 6 && i === chapters[chapter].layer ? 1 : 0;
        props[i].scale.setScalar(
          Math.max(0.001, THREE.MathUtils.lerp(aProp, bProp, blend)),
        );
      });
      knowledgeViews.forEach((view, i) => {
        const appear =
          (from === i ? 1 - blend : 0) + (chapter === i ? blend : 0);
        view.visible = appear > 0.001;
        view.scale.setScalar(Math.max(0.001, appear));
      });
      sourceSheets.forEach((sheet, i) => {
        const gather = paused ? 1 : smooth((local - 0.18) / 0.7);
        sheet.position.set(
          (i - 1) * (1.48 - gather * 0.36),
          0.25 + (1 - gather) * (0.3 + (i % 2) * 0.23),
          (i % 2 ? -0.42 : 0.26) * (1 - gather),
        );
        sheet.rotation.y = (i - 1) * (0.16 - gather * 0.1);
      });
      const brainPhase = chapter === 2 ? local : from === 2 ? 1 : 0;
      const handoff = smooth((brainPhase - 0.6) / 0.2);
      const lessonLabel = landmarks.find(({ element }) =>
        element.classList.contains("lesson-landmark"),
      )?.element;
      const lessonText =
        brainPhase > 0.6
          ? "✓ Request current certification"
          : "Proposed: request certification";
      if (lessonLabel && lessonLabel.textContent !== lessonText)
        lessonLabel.textContent = lessonText;
      const lesson = knowledgeViews[2].children.find(
        (child) => child.userData.lesson,
      );
      if (lesson) {
        lesson.position.y =
          0.69 + (1 - (paused ? 1 : smooth(brainPhase / 0.42))) * 0.55;
      }
      core.scale.setScalar(Math.max(0.001, 1 - openness));
      railGroup.visible = openness < 0.15;
      routing.visible = openness < 0.15;
      ring.visible = openness < 0.5;
      sharedSetup.scale.setScalar(
        chapter === 6 ? Math.max(0.001, blend) : 0.001,
      );
      agentGroups.forEach((group, i) => {
        const origin = new THREE.Vector3(...agentPositions[i]);
        const brainActive = featuredChapter === 2;
        const participation = brainActive
          ? i === 0
            ? 1 - handoff
            : i === 2
              ? handoff
              : 0
          : i === 0
            ? 1
            : 0;
        const target = new THREE.Vector3(
          0.3 + (brainActive ? (i === 0 ? -handoff : 1 - handoff) * 1.25 : 0),
          2.6,
          -0.35,
        );
        group.position.copy(origin).lerp(target, openness);
        const size = 1 - openness + openness * participation;
        group.scale.setScalar(Math.max(0.001, size));
        agentMats[i].color.copy(
          i === (brainActive && handoff > 0.5 ? 2 : 0) ? tealColor : whiteColor,
        );
        annotations[i].style.display = size > 0.45 ? "" : "none";
        tubes[i].visible = openness < 0.15;
        pulses[i].visible = i === 0 && openness < 0.15;
        pulses[i].position.copy(
          curves[i].getPoint(paused ? 0.48 : (phase * 0.27 + i * 0.27) % 1),
        );
      });
      selected = featuredChapter === 2 && handoff > 0.5 ? 2 : 0;
      const activeLayer = layers[chapters[Math.min(featuredChapter, 5)].layer];
      storyLine.visible = openness > 0.15;
      storyPulse.visible = openness > 0.15;
      if (storyLine.visible) {
        const start = agentGroups[selected].position.clone();
        start.y -= 0.17;
        const end = activeLayer.position
          .clone()
          .add(new THREE.Vector3(0, 0.55, 0));
        const curve = new THREE.CubicBezierCurve3(
          start,
          new THREE.Vector3(start.x, start.y - 0.65, start.z),
          new THREE.Vector3(end.x, end.y + 0.9, end.z),
          end,
        );
        storyLine.geometry.setFromPoints(curve.getPoints(32));
        storyPulse.position.copy(
          curve.getPoint(paused ? 0.5 : (phase * 0.24) % 1),
        );
      }
      landmarks.forEach(({ element, mode }) => {
        element.hidden =
          mode !== featuredChapter || (chapter === mode && blend < 0.5);
      });
      canvas.dataset.pose = String(chapter);
      canvas.dataset.open = openness.toFixed(2);
      canvas.dataset.agent = selected === 2 ? "hermes" : "codex";
      fitStoryCamera();
    } else {
      rig.rotation.y =
        -0.16 +
        currentX * 0.11 +
        (paused ? 0 : Math.sin(phase * 0.32) * 0.025 - scrollProgress * 0.18);
      rig.rotation.x = currentY * 0.035;
      layers.forEach((layer, i) => {
        const target =
          layerY[i] - (paused ? 0 : scrollProgress * (3 - i) * 0.17);
        layer.position.y += (target - layer.position.y) * lerp;
      });
      props.forEach((prop) => (prop.visible = false));
      storyLine.visible = false;
      storyPulse.visible = false;
      agentGroups.forEach((group, i) => {
        agentMats[i].color.lerp(selected === i ? tealColor : whiteColor, lerp);
        pulses[i].visible = selected === i;
        pulses[i].position.copy(
          curves[i].getPoint(paused ? 0.48 : (phase * 0.27 + i * 0.27) % 1),
        );
      });
    }
    renderer.render(scene, camera);
    wrap.classList.add("is-ready");
    landmarks.forEach(({ anchor, element }) => {
      if (element.hidden) return;
      const point = anchor
        .getWorldPosition(new THREE.Vector3())
        .project(camera);
      element.style.left = (point.x + 1) * 0.5 * wrap.clientWidth + "px";
      element.style.top = (-point.y + 1) * 0.5 * wrap.clientHeight + "px";
    });
    agentGroups.forEach((group, i) => {
      const point = group
        .localToWorld(new THREE.Vector3(0, 0.47, 0))
        .project(camera);
      annotations[i].style.left = (point.x + 1) * 0.5 * wrap.clientWidth + "px";
      annotations[i].style.top =
        (-point.y + 1) * 0.5 * wrap.clientHeight + "px";
      annotations[i].classList.toggle("active", i === selected);
    });
    if (!paused) frame = requestAnimationFrame(draw);
  }
  function requestRender() {
    if (!destroyed && contextAvailable && !frame && visible && !document.hidden)
      frame = requestAnimationFrame(draw);
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(wrap);
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible) requestRender();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { rootMargin: "80px" },
  );
  intersectionObserver.observe(wrap);
  wrap.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch") return;
      const rect = wrap.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
      requestRender();
    },
    { passive: true, signal: events.signal },
  );
  wrap.addEventListener(
    "pointerleave",
    () => {
      pointer.x = 0;
      pointer.y = 0;
      requestRender();
    },
    { signal: events.signal },
  );
  const raycaster = new THREE.Raycaster();
  wrap.addEventListener(
    "click",
    (event) => {
      const rect = canvas.getBoundingClientRect();
      raycaster.setFromCamera(
        new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        ),
        camera,
      );
      const hits = raycaster.intersectObjects(agentGroups, true);
      if (hits.length && !story) {
        let group = hits[0].object;
        while (group.parent && group.parent !== rig) group = group.parent;
        const index = agentGroups.indexOf(group);
        if (index !== -1)
          document.querySelector(`[data-agent="${index}"]`).click();
      }
    },
    { signal: events.signal },
  );
  window.addEventListener(
    "agent-change",
    (event) => {
      if (!story) selected = event.detail;
      requestRender();
    },
    { signal: events.signal },
  );
  window.addEventListener(
    "journey-change",
    (event) => {
      if (story) {
        storyPosition = event.detail.position;
        requestRender();
      }
    },
    { signal: events.signal },
  );
  window.addEventListener(
    "motion-change",
    (event) => {
      paused = event.detail;
      requestRender();
    },
    { signal: events.signal },
  );
  window.addEventListener(
    "scroll",
    () => {
      scrollProgress = Math.max(0, Math.min(1, scrollY / 500));
      if (!paused) requestRender();
    },
    { passive: true, signal: events.signal },
  );
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else requestRender();
    },
    { signal: events.signal },
  );
  canvas.addEventListener(
    "webglcontextlost",
    (event) => {
      event.preventDefault();
      wrap.classList.remove("is-ready");
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      contextAvailable = false;
    },
    { signal: events.signal },
  );
  canvas.addEventListener(
    "webglcontextrestored",
    () => {
      contextAvailable = true;
      resize();
    },
    { signal: events.signal },
  );
  document.fonts.ready.then(() => {
    if (!destroyed) resize();
  });
  resize();
  return () => {
    destroyed = true;
    events.abort();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    if (frame) cancelAnimationFrame(frame);
    annotations.forEach((element) => element.remove());
    landmarks.forEach(({ element }) => element.remove());
    scene.traverse((object) => {
      if (object.geometry?.dispose) object.geometry.dispose();
      const objectMaterial = object.material;
      if (Array.isArray(objectMaterial))
        objectMaterial.forEach((item) => item.dispose());
      else if (objectMaterial?.dispose) objectMaterial.dispose();
    });
    renderer.dispose();
    wrap.classList.remove("is-ready");
  };
}
