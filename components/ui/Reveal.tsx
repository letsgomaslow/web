"use client";

import { useEffect, useRef } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type RuntimeState = "idle" | "ready" | "unavailable";

let runtimeState: RuntimeState = "idle";
let sharedObserver: IntersectionObserver | null = null;
let sharedMotionQuery: MediaQueryList | null = null;
let removeMotionListener: (() => void) | null = null;
let mountedRevealCount = 0;
let cleanupGeneration = 0;
const observedElements = new Set<HTMLElement>();

function unregisterElement(element: HTMLElement) {
  observedElements.delete(element);
  try {
    sharedObserver?.unobserve(element);
  } catch {
    // The content is already visible; a broken observer must not block it.
  }
}

function revealElement(element: HTMLElement) {
  element.setAttribute("data-mz-in", "1");
  unregisterElement(element);
}

function revealObservedElements() {
  for (const element of [...observedElements]) {
    revealElement(element);
  }
}

function resetRuntime(nextState: RuntimeState) {
  revealObservedElements();
  try {
    sharedObserver?.disconnect();
  } catch {
    // A failed observer is discarded below.
  }
  try {
    removeMotionListener?.();
  } catch {
    // A failed media-query listener is discarded below.
  }
  sharedObserver = null;
  sharedMotionQuery = null;
  removeMotionListener = null;
  runtimeState = nextState;
  try {
    document.body.classList.remove("mz-anim");
  } catch {
    // Resetting the runtime must never affect content visibility.
  }
}

function disableRuntime() {
  resetRuntime("unavailable");
}

function registerMountedReveal() {
  mountedRevealCount += 1;
  cleanupGeneration += 1;
}

function unregisterMountedReveal() {
  mountedRevealCount = Math.max(0, mountedRevealCount - 1);
  if (mountedRevealCount !== 0) return;

  const scheduledGeneration = ++cleanupGeneration;
  queueMicrotask(() => {
    if (
      mountedRevealCount === 0 &&
      cleanupGeneration === scheduledGeneration
    ) {
      resetRuntime("idle");
    }
  });
}

function handleIntersections(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      revealElement(entry.target as HTMLElement);
    }
  }
}

function ensureRuntime() {
  if (runtimeState !== "idle") return runtimeState === "ready";

  let nextObserver: IntersectionObserver | null = null;
  let detachListener: (() => void) | null = null;

  try {
    if (
      typeof window.matchMedia !== "function" ||
      typeof window.IntersectionObserver !== "function"
    ) {
      runtimeState = "unavailable";
      return false;
    }

    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) revealObservedElements();
    };

    nextObserver = new window.IntersectionObserver(handleIntersections, {
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px",
    });

    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", handleMotionChange);
      detachListener = () =>
        motionQuery.removeEventListener("change", handleMotionChange);
    } else if (typeof motionQuery.addListener === "function") {
      motionQuery.addListener(handleMotionChange);
      detachListener = () => motionQuery.removeListener(handleMotionChange);
    } else {
      nextObserver.disconnect();
      runtimeState = "unavailable";
      return false;
    }

    document.body.classList.add("mz-anim");
    sharedObserver = nextObserver;
    sharedMotionQuery = motionQuery;
    removeMotionListener = detachListener;
    runtimeState = "ready";
    return true;
  } catch {
    try {
      nextObserver?.disconnect();
    } catch {
      // The runtime stays unavailable and all reveal content stays visible.
    }
    try {
      detachListener?.();
    } catch {
      // The runtime stays unavailable and all reveal content stays visible.
    }
    sharedObserver = null;
    sharedMotionQuery = null;
    removeMotionListener = null;
    runtimeState = "unavailable";
    return false;
  }
}

function observeIfBelowViewport(element: HTMLElement) {
  if (!ensureRuntime() || !sharedMotionQuery || !sharedObserver) return;

  try {
    if (sharedMotionQuery.matches) return;

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const bounds = element.getBoundingClientRect();

    if (bounds.top < viewportHeight) return;

    observedElements.add(element);
    sharedObserver.observe(element);
    element.removeAttribute("data-mz-in");
  } catch {
    disableRuntime();
  }
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  style?: React.CSSProperties;
  id?: string;
};

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    registerMountedReveal();
    observeIfBelowViewport(element);

    return () => {
      revealElement(element);
      unregisterMountedReveal();
    };
  }, []);

  const revealOnFocus = () => {
    const element = ref.current;
    if (element) {
      element.setAttribute("data-mz-focus-revealed", "1");
      revealElement(element);
    }
  };

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`mz-reveal ${className}`.trim()}
      style={style}
      data-mz-in="1"
      onFocusCapture={revealOnFocus}
    >
      {children}
    </Tag>
  );
}
