"use client";

import { useEffect, useRef } from "react";
import { createAssembly } from "./scene-engine.js";

type Props = {
  position: number;
  paused: boolean;
  onReady: () => void;
  onFailure: () => void;
};

export default function FoundationScene({
  position,
  paused,
  onReady,
  onFailure,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return;
    const cleanup = createAssembly(canvas, wrap, true);
    if (!cleanup) {
      onFailure();
      return;
    }

    const lost = () => onFailure();
    const restored = () => onReady();
    canvas.addEventListener("webglcontextlost", lost);
    canvas.addEventListener("webglcontextrestored", restored);
    onReady();
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("webglcontextrestored", restored);
      cleanup();
    };
  }, [onFailure, onReady]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("journey-change", { detail: { position } }),
    );
  }, [position]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("motion-change", { detail: paused }));
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="foundation-canvas"
      aria-hidden="true"
    />
  );
}
