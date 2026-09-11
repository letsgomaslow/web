"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SculptureControls } from "./sculpture-engine";
import type { StoryJourneyStep, StoryJourneyVariant } from "./StoryJourney";
import styles from "./StoryJourney.module.css";

export function StorySculpture({ variant, steps, active, paused, children }: {
  variant: StoryJourneyVariant;
  steps: readonly StoryJourneyStep[];
  active: number;
  paused: boolean;
  children: ReactNode;
}) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const controls = useRef<SculptureControls | null>(null);
  const selection = useRef({ active, paused });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    selection.current = { active, paused };
    controls.current?.select(active, paused);
  }, [active, paused]);

  useEffect(() => {
    if (!host.current || !canvas.current) return;
    let disposed = false;
    let started = false;
    const target = host.current;
    const element = canvas.current;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      try {
        // Essential content and a readable diagram arrive before the graphics module.
        const { createSculpture } = await import("./sculpture-engine");
        if (disposed) return;
        controls.current = createSculpture(element, target, variant, steps, (value) => {
          if (!disposed) setReady(value);
        });
        controls.current?.select(selection.current.active, selection.current.paused);
      } catch {
        if (!disposed) setReady(false);
      }
    }, { rootMargin: "240px" });
    observer.observe(target);
    return () => {
      disposed = true;
      observer.disconnect();
      controls.current?.destroy();
      controls.current = null;
    };
  }, [variant, steps]);

  return (
    <div ref={host} className={styles.sculpture} data-sculpture={variant} data-ready={ready}>
      <div className={styles.sculptureFallback}>{children}</div>
      <canvas ref={canvas} className={styles.sculptureCanvas} aria-hidden="true" data-testid="story-sculpture" />
    </div>
  );
}
