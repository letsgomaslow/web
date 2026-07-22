"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { hybridRagStages } from "@/lib/content/explainers";
import styles from "./HybridRagScene.module.css";

export function HybridRagScene({
  particleCount = 240,
}: {
  particleCount?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const host = hostRef.current;
    const wrap = wrapRef.current;
    if (!host || !wrap || !host.clientWidth) return;

    const N = Math.round(particleCount);
    const GN = 42;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      host.clientWidth / host.clientHeight,
      1,
      3000,
    );
    camera.position.z = 560;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const layoutA: number[][] = [];
    const layoutB: number[][] = [];
    const layoutC: number[][] = [];
    const docsPerRow = 4;
    const docW = 90;
    const docH = 120;
    const gapX = 150;
    const gapY = 190;

    for (let i = 0; i < N; i++) {
      const d = i % 12;
      const r = Math.floor(d / docsPerRow);
      const c = d % docsPerRow;
      const ox = (c - (docsPerRow - 1) / 2) * gapX;
      const oy = (2 - r - 1) * gapY;
      layoutA.push([
        ox + (Math.random() - 0.5) * docW,
        oy + (Math.random() - 0.5) * docH,
        (Math.random() - 0.5) * 20,
      ]);
    }

    const centers = [
      [-170, 110, -40],
      [150, 140, 60],
      [-120, -130, 40],
      [170, -110, -60],
    ];
    for (let i = 0; i < N; i++) {
      const ctr = centers[i % 4];
      const g = () =>
        (Math.random() + Math.random() + Math.random() - 1.5) * 62;
      layoutB.push([ctr[0] + g(), ctr[1] + g(), ctr[2] + g()]);
    }

    const nodePos: number[][] = [];
    for (let i = 0; i < GN; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const rad = 150 + Math.random() * 110;
      nodePos.push([
        rad * Math.sin(phi) * Math.cos(theta),
        rad * Math.sin(phi) * Math.sin(theta) * 0.75,
        rad * Math.cos(phi),
      ]);
    }
    for (let i = 0; i < N; i++) {
      if (i < GN) layoutC.push(nodePos[i]);
      else {
        const n = nodePos[i % GN];
        layoutC.push([
          n[0] + (Math.random() - 0.5) * 14,
          n[1] + (Math.random() - 0.5) * 14,
          n[2] + (Math.random() - 0.5) * 14,
        ]);
      }
    }

    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
    });
    scene.add(new THREE.Points(geo, mat));

    const edges: [number, number][] = [];
    for (let i = 0; i < GN; i++) {
      for (let j = i + 1; j < GN; j++) {
        const a = nodePos[i];
        const b = nodePos[j];
        const d2 = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
        if (d2 < 160 * 160 && edges.length < 90) edges.push([i, j]);
      }
    }
    const linePos = new Float32Array(edges.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x73c1ae,
      transparent: true,
      opacity: 0,
    });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    const white = [1, 1, 1];
    const teal = [0.451, 0.757, 0.682];
    const purple = [0.627, 0.439, 0.651];
    const pink = [0.953, 0.467, 0.702];
    const blue = [0.275, 0.616, 0.733];
    const clusterCols = [teal, purple, blue, pink];
    const satellite = [0.72, 0.77, 0.85];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    let scrollProgress = 0;
    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      scrollProgress = Math.min(1, Math.max(0, -r.top / Math.max(total, 1)));
      const next = scrollProgress < 0.36 ? 0 : scrollProgress < 0.72 ? 1 : 2;
      setStage((p) => (p !== next ? next : p));
      setProgress((p) =>
        Math.abs(scrollProgress - p) > 0.05 ? scrollProgress : p,
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(host);

    let raf = 0;
    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);
      const p = scrollProgress;
      const t1 = ease(Math.min(1, Math.max(0, (p - 0.18) / 0.32)));
      const t2 = ease(Math.min(1, Math.max(0, (p - 0.55) / 0.3)));
      const jitter = now * 0.001;

      for (let i = 0; i < N; i++) {
        const A = layoutA[i];
        const B = layoutB[i];
        const C = layoutC[i];
        let x = lerp(A[0], B[0], t1);
        let y = lerp(A[1], B[1], t1);
        let z = lerp(A[2], B[2], t1);
        x = lerp(x, C[0], t2);
        y = lerp(y, C[1], t2);
        z = lerp(z, C[2], t2);
        positions[i * 3] = x + Math.sin(jitter + i) * 2.5;
        positions[i * 3 + 1] = y + Math.cos(jitter * 1.3 + i) * 2.5;
        positions[i * 3 + 2] = z;
        const cc = clusterCols[i % 4];
        const cr = lerp(white[0], cc[0], t1);
        const cg = lerp(white[1], cc[1], t1);
        const cb = lerp(white[2], cc[2], t1);
        const nodeCol = i < GN ? teal : satellite;
        colors[i * 3] = lerp(cr, nodeCol[0], t2);
        colors[i * 3 + 1] = lerp(cg, nodeCol[1], t2);
        colors[i * 3 + 2] = lerp(cb, nodeCol[2], t2);
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;

      for (let e = 0; e < edges.length; e++) {
        const [i, j] = edges[e];
        linePos[e * 6] = positions[i * 3];
        linePos[e * 6 + 1] = positions[i * 3 + 1];
        linePos[e * 6 + 2] = positions[i * 3 + 2];
        linePos[e * 6 + 3] = positions[j * 3];
        linePos[e * 6 + 4] = positions[j * 3 + 1];
        linePos[e * 6 + 5] = positions[j * 3 + 2];
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineMat.opacity = t2 * 0.45;
      scene.rotation.y = Math.sin(now * 0.0001) * 0.15 + t2 * 0.2;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [particleCount, reduced]);

  return (
    <div
      ref={wrapRef}
      className={reduced ? styles.wrapStatic : styles.scroller}
    >
      <div className={styles.sticky}>
        <div className={styles.stages}>
          {hybridRagStages.map((s, i) => (
            <div
              key={s.tag}
              className={styles.stage}
              data-active={i === stage ? "1" : "0"}
            >
              <div className={styles.stageTag}>{s.tag}</div>
              <div className={styles.stageTitle}>{s.title}</div>
              <div className={styles.stageDesc}>{s.desc}</div>
            </div>
          ))}
          <div className={styles.progress}>
            {reduced
              ? "STATIC OVERVIEW"
              : `SCROLL TO ADVANCE · ${Math.round(progress * 100)}%`}
          </div>
        </div>
        {reduced ? (
          <div className={styles.fallback} aria-hidden>
            <p>docs → vectors → graph</p>
          </div>
        ) : (
          <div ref={hostRef} className={styles.canvas} />
        )}
      </div>
    </div>
  );
}
