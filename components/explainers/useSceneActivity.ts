"use client";

import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ScenePauseReason =
  | "initializing"
  | "reduced-motion"
  | "capability-unavailable"
  | "document-hidden"
  | "offscreen"
  | "user"
  | null;

export type SceneActivity = {
  initialized: boolean;
  hasEnteredViewport: boolean;
  isInViewport: boolean;
  isDocumentVisible: boolean;
  prefersReducedMotion: boolean;
  hasActivityCapabilities: boolean;
  isUserPaused: boolean;
  isActive: boolean;
  pauseReason: ScenePauseReason;
  setUserPaused: Dispatch<SetStateAction<boolean>>;
  toggleUserPaused: () => void;
};

type EnvironmentState = Omit<
  SceneActivity,
  "isUserPaused" | "isActive" | "pauseReason" | "setUserPaused" | "toggleUserPaused"
>;

const INITIAL_ENVIRONMENT: EnvironmentState = {
  initialized: false,
  hasEnteredViewport: false,
  isInViewport: false,
  isDocumentVisible: true,
  prefersReducedMotion: false,
  hasActivityCapabilities: false,
};

function elementIsNearViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const margin = 160;
  return rect.bottom >= -margin && rect.top <= window.innerHeight + margin;
}

export function useSceneActivity<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
): SceneActivity {
  const [environment, setEnvironment] =
    useState<EnvironmentState>(INITIAL_ENVIRONMENT);
  const [isUserPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    let observer: IntersectionObserver | null = null;
    let mediaQuery: MediaQueryList | null = null;
    let removeMediaListener = () => {};
    let hasMotionPreferenceCapability = false;
    let hasViewportObservationCapability = false;

    const isDocumentVisible = document.visibilityState !== "hidden";
    let prefersReducedMotion = false;

    try {
      if (typeof window.matchMedia === "function") {
        mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        prefersReducedMotion = mediaQuery.matches;
      }
    } catch {
      mediaQuery = null;
    }

    const isInViewport = target ? elementIsNearViewport(target) : false;

    const onVisibilityChange = () => {
      setEnvironment((current) => ({
        ...current,
        isDocumentVisible: document.visibilityState !== "hidden",
      }));
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (mediaQuery) {
      const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
        setEnvironment((current) => ({
          ...current,
          prefersReducedMotion: event.matches,
        }));
      };

      try {
        mediaQuery.addEventListener("change", onMotionPreferenceChange);
        hasMotionPreferenceCapability = true;
        removeMediaListener = () =>
          mediaQuery?.removeEventListener("change", onMotionPreferenceChange);
      } catch {
        const legacyQuery = mediaQuery as MediaQueryList & {
          addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
          removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
        };
        if (legacyQuery.addListener && legacyQuery.removeListener) {
          legacyQuery.addListener(onMotionPreferenceChange);
          hasMotionPreferenceCapability = true;
          removeMediaListener = () =>
            legacyQuery.removeListener?.(onMotionPreferenceChange);
        }
      }
    }

    if (target && typeof window.IntersectionObserver === "function") {
      try {
        observer = new window.IntersectionObserver(
          ([entry]) => {
            if (!entry) return;
            setEnvironment((current) => ({
              ...current,
              hasEnteredViewport:
                current.hasEnteredViewport || entry.isIntersecting,
              isInViewport: entry.isIntersecting,
            }));
          },
          { rootMargin: "160px 0px", threshold: 0 },
        );
        observer.observe(target);
        hasViewportObservationCapability = true;
      } catch {
        observer = null;
      }
    }

    const hasActivityCapabilities =
      hasMotionPreferenceCapability && hasViewportObservationCapability;
    setEnvironment({
      initialized: true,
      hasEnteredViewport: isInViewport || !hasActivityCapabilities,
      isInViewport: hasActivityCapabilities ? isInViewport : false,
      isDocumentVisible,
      prefersReducedMotion,
      hasActivityCapabilities,
    });

    return () => {
      observer?.disconnect();
      removeMediaListener();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [targetRef]);

  const toggleUserPaused = useCallback(() => {
    setUserPaused((current) => !current);
  }, []);

  return useMemo(() => {
    let pauseReason: ScenePauseReason = null;
    if (!environment.initialized) pauseReason = "initializing";
    else if (environment.prefersReducedMotion) pauseReason = "reduced-motion";
    else if (!environment.hasActivityCapabilities)
      pauseReason = "capability-unavailable";
    else if (!environment.isDocumentVisible) pauseReason = "document-hidden";
    else if (!environment.isInViewport) pauseReason = "offscreen";
    else if (isUserPaused) pauseReason = "user";

    return {
      ...environment,
      isUserPaused,
      isActive: pauseReason === null,
      pauseReason,
      setUserPaused,
      toggleUserPaused,
    };
  }, [environment, isUserPaused, toggleUserPaused]);
}
