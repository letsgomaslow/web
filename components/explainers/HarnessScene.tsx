"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { harnessNodes } from "@/lib/content/explainers";
import styles from "./HarnessScene.module.css";

export function HarnessScene({ autoRotate = true }: { autoRotate?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(0);
  const [selected, setSelected] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    if (reduced) return;
    const host = hostRef.current;
    if (!host) return;

    const W = () => host.clientWidth;
    const H = () => host.clientHeight;
    if (!W() || !H()) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W() / H(), 1, 2000);
    camera.position.z = 520;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W(), H());
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(obj: T) => {
      disposables.push(obj);
      return obj;
    };

    const coreGeo = track(new THREE.IcosahedronGeometry(62, 1));
    const coreMat = track(
      new THREE.MeshBasicMaterial({
        color: 0x73c1ae,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      }),
    );
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const innerGeo = track(new THREE.IcosahedronGeometry(40, 1));
    const innerMat = track(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      }),
    );
    const coreInner = new THREE.Mesh(innerGeo, innerMat);
    group.add(coreInner);

    const R = 190;
    const nodeMeshes: THREE.Mesh[] = [];
    harnessNodes.forEach((_, i) => {
      const a = (i / harnessNodes.length) * Math.PI * 2;
      const y = i % 2 === 0 ? 46 : -46;
      const pos = new THREE.Vector3(Math.cos(a) * R, y, Math.sin(a) * R);
      const geo = track(new THREE.SphereGeometry(11, 20, 20));
      const mat = track(new THREE.MeshBasicMaterial({ color: 0xa070a6 }));
      const m = new THREE.Mesh(geo, mat);
      m.position.copy(pos);
      group.add(m);
      nodeMeshes.push(m);
      const lineGeo = track(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          pos.clone(),
        ]),
      );
      group.add(
        new THREE.Line(
          lineGeo,
          track(
            new THREE.LineBasicMaterial({
              color: 0x654c8f,
              transparent: true,
              opacity: 0.5,
            }),
          ),
        ),
      );
    });

    const ringGeo = track(
      new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 90 }, (_, i) => {
          const a = (i / 89) * Math.PI * 2;
          return new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R);
        }),
      ),
    );
    group.add(
      new THREE.Line(
        ringGeo,
        track(
          new THREE.LineBasicMaterial({
            color: 0x73c1ae,
            transparent: true,
            opacity: 0.18,
          }),
        ),
      ),
    );

    const labels = harnessNodes.map((n, i) => {
      const el = document.createElement("button");
      el.type = "button";
      el.textContent = n.label;
      el.className = styles.nodeLabel;
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelected(i);
      });
      host.appendChild(el);
      return el;
    });

    let dragging = false;
    let px = 0;
    let py = 0;
    let rotY = 0.6;
    let rotX = 0.12;
    const vy = autoRotate ? 0.0022 : 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      host.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      rotY += (e.clientX - px) * 0.006;
      rotX = Math.max(-0.7, Math.min(0.7, rotX + (e.clientY - py) * 0.003));
      px = e.clientX;
      py = e.clientY;
    };
    const onUp = () => {
      dragging = false;
      host.style.cursor = "grab";
    };
    host.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    const onResize = () => {
      if (!W() || !H()) return;
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    };
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(host);

    const v = new THREE.Vector3();
    let raf = 0;
    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);
      if (!dragging) rotY += vy;
      group.rotation.y = rotY;
      group.rotation.x = rotX;
      core.rotation.y = now * 0.0004;
      coreInner.rotation.y = -now * 0.0006;
      const sel = selectedRef.current;
      nodeMeshes.forEach((m, i) => {
        (m.material as THREE.MeshBasicMaterial).color.setHex(
          i === sel ? 0x73c1ae : 0xa070a6,
        );
        m.scale.setScalar(i === sel ? 1.45 + Math.sin(now * 0.004) * 0.12 : 1);
        v.copy(m.position).applyMatrix4(group.matrixWorld).project(camera);
        const x = (v.x * 0.5 + 0.5) * W();
        const y = (-v.y * 0.5 + 0.5) * H();
        const behind = v.z > 0.994;
        const el = labels[i];
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.opacity = behind ? "0.25" : "1";
        el.style.zIndex = behind ? "1" : "3";
        el.dataset.active = i === sel ? "1" : "0";
      });
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      labels.forEach((el) => el.remove());
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate, reduced]);

  const n = harnessNodes[selected];

  return (
    <div className={styles.root}>
      <div className={styles.canvasCol}>
        {reduced ? (
          <div className={styles.fallback}>
            {harnessNodes.map((node, i) => (
              <button
                key={node.label}
                type="button"
                className={styles.fallbackBtn}
                data-active={i === selected ? "1" : "0"}
                onClick={() => setSelected(i)}
              >
                {node.label}
              </button>
            ))}
          </div>
        ) : (
          <div ref={hostRef} className={styles.canvasHost} />
        )}
      </div>
      <aside className={styles.panel}>
        <div className={styles.tag}>{n.tag}</div>
        <h2 className={styles.title}>{n.title}</h2>
        <p className={styles.desc}>{n.desc}</p>
        <ul className={styles.bullets}>
          {n.bullets.map((b) => (
            <li key={b}>
              <span>✓</span>
              {b}
            </li>
          ))}
        </ul>
        <p className={styles.hint}>
          {reduced
            ? "TAP A LABEL TO INSPECT"
            : "DRAG TO ROTATE · CLICK A LABEL TO INSPECT"}
        </p>
      </aside>
    </div>
  );
}
