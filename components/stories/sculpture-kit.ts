import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export const palette = {
  navy: "#24354b",
  teal: "#73c1ae",
  mint: "#c8e8dc",
  cream: "#eeeade",
  purple: "#a79abd",
  pink: "#dfa7c5",
  white: "#f7f8f4",
  ink: "#23364b",
} as const;

export type SculptureState = {
  active: number;
  id: string;
  /** A continuous stage index, interpolated as the reader moves between chapters. */
  progress: number;
  time: number;
  reducedMotion: boolean;
};

export type SculptureScene = {
  root: THREE.Group;
  update: (state: SculptureState) => void;
  /** Direct children that form a readable close-up of the current chapter. */
  focus?: (state: SculptureState) => THREE.Object3D[];
};

export type SculptureStep = Readonly<{ id: string; label: string; title: string }>;

export function roundedBox(
  width: number,
  height: number,
  depth: number,
  color: THREE.ColorRepresentation,
  radius = 0.08,
) {
  const mesh = new THREE.Mesh(
    new RoundedBoxGeometry(width, height, depth, 3, Math.min(radius, width / 2, height / 2, depth / 2)),
    new THREE.MeshStandardMaterial({ color, roughness: 0.43, metalness: 0.06 }),
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** Short, camera-facing object labels. All essential descriptions also exist as HTML. */
export function label(text: string, width = 1.4, color: THREE.ColorRepresentation = palette.ink) {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 144;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#eeeade";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#a8b8b3";
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
  ctx.fillStyle = new THREE.Color(color).getStyle();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const fontSize = Math.min(70, 1400 / Math.max(text.length, 1));
  ctx.font = `600 ${fontSize}px "Manrope", sans-serif`;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width - 52);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: texture, transparent: true, depthTest: false, toneMapped: false,
  }));
  sprite.scale.set(width, width * (canvas.height / canvas.width), 1);
  sprite.renderOrder = 5;
  return sprite;
}

/** A physical sheet with a folded corner, printed lines, and an optional caption. */
export function paper(width: number, height: number, text?: string, color: THREE.ColorRepresentation = palette.white) {
  const group = new THREE.Group();
  const body = roundedBox(width, height, 0.065, color, 0.024);
  body.position.y = height / 2;
  group.add(body);
  const tab = roundedBox(width * 0.21, height * 0.17, 0.032, palette.mint, 0.012);
  tab.position.set(width * 0.32, height * 0.88, 0.05);
  group.add(tab);
  [0.66, 0.52, 0.38].forEach((y, index) => {
    const line = roundedBox(width * (index === 1 ? 0.48 : 0.64), 0.025, 0.012, palette.navy, 0.004);
    line.position.set(index === 1 ? -width * 0.08 : 0, height * y, 0.043);
    group.add(line);
  });
  if (text) {
    const caption = label(text, width * 1.28);
    caption.position.set(0, height + 0.23, 0);
    group.add(caption);
  }
  return group;
}

export function cable(points: THREE.Vector3[], color: THREE.ColorRepresentation, radius = 0.018) {
  const curve = new THREE.CatmullRomCurve3(points);
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 40, radius, 7, false),
    new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.1 }),
  );
  mesh.castShadow = true;
  return mesh;
}

export function orb(radius: number, color: THREE.ColorRepresentation) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 20, 16),
    new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.12 }),
  );
  mesh.castShadow = true;
  return mesh;
}

export function ring(radius: number, color: THREE.ColorRepresentation) {
  const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.024, 8, 64),
    new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.12 }),
  );
  mesh.castShadow = true;
  return mesh;
}

export function platform(width: number, depth: number, color: THREE.ColorRepresentation) {
  const group = new THREE.Group();
  const base = roundedBox(width, 0.22, depth, color, 0.105);
  base.position.y = 0.11;
  group.add(base);
  const top = roundedBox(width - 0.16, 0.035, depth - 0.16, palette.white, 0.017);
  top.position.y = 0.237;
  group.add(top);
  for (const x of [-1, 1]) for (const z of [-1, 1]) {
    const screw = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.012, 8),
      new THREE.MeshStandardMaterial({ color: palette.navy, metalness: 0.65, roughness: 0.3 }),
    );
    screw.position.set(x * (width / 2 - 0.2), 0.26, z * (depth / 2 - 0.2));
    group.add(screw);
  }
  return group;
}
