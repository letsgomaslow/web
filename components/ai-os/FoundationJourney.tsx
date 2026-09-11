"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { journeyChapters } from "@/lib/content/ai-os-home";
import styles from "./AIOSHome.module.css";
import { ToolMark } from "./ToolMark";

const FoundationScene = dynamic(() => import("./FoundationScene"), {
  ssr: false,
});
const navStops = [0, 3, 4, 5, 6];

function chapterStops() {
  const total = journeyChapters.reduce(
    (sum, chapter) => sum + chapter.weight,
    0,
  );
  let cursor = 0;
  return journeyChapters.map((chapter) => {
    const start = cursor / total;
    cursor += chapter.weight;
    return { start, end: cursor / total };
  });
}

export function FoundationJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const stops = useMemo(chapterStops, []);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const chapter = journeyChapters[active];
  const localProgress = Math.max(
    0,
    Math.min(
      0.9999,
      (progress - stops[active].start) /
        (stops[active].end - stops[active].start),
    ),
  );
  const scenePosition = active + localProgress;
  const brainState =
    localProgress > 0.72
      ? {
          key: "hermes",
          tool: "hermes" as const,
          label: "Hermes retrieves the approved lesson",
        }
      : localProgress > 0.4
        ? {
            key: "review",
            tool: null,
            label: "Your team approves what stays",
          }
        : {
            key: "codex",
            tool: "openai" as const,
            label: "Codex proposes a lesson",
          };
  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
    setSceneFailed(false);
  }, []);
  const handleSceneFailure = useCallback(() => {
    setSceneReady(false);
    setSceneFailed(true);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let queued = false;
    const update = () => {
      queued = false;
      const section = sectionRef.current;
      if (!section) return;
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const nextProgress = Math.max(
        0,
        Math.min(0.9999, -section.getBoundingClientRect().top / distance),
      );
      const nextActive = stops.findIndex((stop) => nextProgress < stop.end);
      setProgress(nextProgress);
      setActive(nextActive < 0 ? journeyChapters.length - 1 : nextActive);
    };
    const schedule = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    const observer = new ResizeObserver(schedule);
    if (sectionRef.current) observer.observe(sectionRef.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [stops]);

  const jump = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;
      const stop = stops[index];
      const top = window.scrollY + section.getBoundingClientRect().top;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: top + travel * (stop.start + (stop.end - stop.start) * 0.38),
        behavior: paused ? "auto" : "smooth",
      });
    },
    [paused, stops],
  );

  const onNavKey = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    items: number[],
    position: number,
  ) => {
    let next: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (position + 1) % items.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (position - 1 + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    jump(items[next]);
    const group = event.currentTarget.parentElement;
    (
      group?.querySelectorAll("button")[next] as HTMLButtonElement | undefined
    )?.focus({ preventScroll: true });
  };

  const openDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    returnFocus.current = event.currentTarget;
    dialogRef.current?.showModal();
    requestAnimationFrame(() =>
      closeRef.current?.focus({ preventScroll: true }),
    );
  };
  const closeDetails = () => dialogRef.current?.close();

  return (
    <section
      ref={sectionRef}
      className={styles.journey}
      id="foundation"
      aria-labelledby="journey-title"
      data-testid="foundation-journey"
      data-chapter={chapter.key}
      data-scene-index={active}
      data-progress={progress.toFixed(5)}
      data-paused={paused}
    >
      <div className={styles.journeySticky}>
        <div className={styles.journeyTop}>
          <p>01 / INSIDE THE FOUNDATION</p>
          <div>
            <span>HOW THE PIECES CONNECT · ILLUSTRATIVE WORKFLOW</span>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
            >
              {paused ? "Play motion ▷" : "Pause motion Ⅱ"}
            </button>
          </div>
        </div>
        <div className={styles.journeyBody}>
          <div className={styles.journeyCopy}>
            <p className={styles.journeyOverline}>
              <span>0{active + 1} / 07</span>
              <span>{chapter.label}</span>
            </p>
            <h2 id="journey-title">
              {chapter.title}
              <br />
              <em>{chapter.accent}</em>
            </h2>
            <p className={styles.journeyDescription}>{chapter.description}</p>
            <div className={styles.journeyProof}>
              <span>FOLLOW ONE JOB / A SUPPLIER REVIEW</span>
              <div>
                <span>{chapter.from}</span>
                <i aria-hidden="true">→</i>
                <strong>{chapter.to}</strong>
              </div>
              <small>{chapter.caption}</small>
            </div>
            {active === 2 ? (
              <div
                className={styles.brainHandoff}
                data-agent={brainState.key}
                aria-label="Example knowledge approval sequence: Codex proposes a lesson, your team approves what stays, and Hermes retrieves the approved lesson."
              >
                <span>A LESSON WORTH KEEPING / EXAMPLE</span>
                <strong aria-live="polite">
                  {brainState.tool ? (
                    <ToolMark tool={brainState.tool} size={17} />
                  ) : null}
                  {brainState.label}
                </strong>
                <small>Request current certification before approval.</small>
                <div>
                  <span>Propose</span>
                  <i>→</i>
                  <span>Approve</span>
                  <i>→</i>
                  <span>Reuse</span>
                </div>
              </div>
            ) : null}
            <button
              className={styles.journeyDetails}
              type="button"
              onClick={openDetails}
            >
              Explore this layer <span aria-hidden="true">+</span>
            </button>
          </div>
          <div
            className={styles.journeyStage}
            role="img"
            aria-label={chapter.scene}
            data-ready={sceneReady && !sceneFailed ? "true" : "false"}
          >
            <div className={styles.staticAssembly} aria-hidden="true">
              <div>KNOWLEDGE & MEMORY</div>
              <div>SKILLS & WORKFLOWS</div>
              <div>CONNECTIONS</div>
              <div>VISIBILITY & CONTROL</div>
              <b>MASLOW AI-OS</b>
            </div>
            <FoundationScene
              position={scenePosition}
              paused={paused}
              onReady={handleSceneReady}
              onFailure={handleSceneFailure}
            />
            <div className={styles.objectCaption} aria-hidden="true">
              <i />
              <span>{chapter.object}</span>
            </div>
          </div>
          {active <= 2 ? (
            <div
              className={styles.knowledgeControls}
              role="group"
              aria-label="Explore knowledge and memory"
            >
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => jump(index)}
                  onKeyDown={(event) => onNavKey(event, [0, 1, 2], index)}
                >
                  {["Files", "Knowledge", "Second brain"][index]}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.journeyBottom}>
          <nav aria-label="Foundation layers">
            {navStops.map((index, position) => (
              <button
                key={index}
                type="button"
                aria-current={chapter.nav === position ? "step" : undefined}
                onClick={() => jump(index)}
                onKeyDown={(event) => onNavKey(event, navStops, position)}
              >
                <span>{position === 4 ? "↗" : `0${position + 1}`}</span>
                {
                  [
                    "Knowledge",
                    "Skills",
                    "Connections",
                    "Visibility",
                    "Together",
                  ][position]
                }
              </button>
            ))}
          </nav>
          <button
            className={styles.journeyNext}
            type="button"
            aria-label={
              active === 6
                ? "Continue to your workspace"
                : `Next: ${journeyChapters[active + 1].label.toLowerCase()}`
            }
            onClick={() =>
              active < 6
                ? jump(active + 1)
                : document
                    .getElementById("workspace")
                    ?.scrollIntoView({ behavior: paused ? "auto" : "smooth" })
            }
          >
            →
          </button>
          <div className={styles.journeyTrack} aria-hidden="true">
            <span style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
      <div className={styles.srOnly}>
        <h3>How the foundation connects</h3>
        <ol>
          {journeyChapters.map((item) => (
            <li key={item.key}>
              <strong>
                {item.title} {item.accent}
              </strong>{" "}
              {item.description} {item.scene}
            </li>
          ))}
        </ol>
        <p>
          This illustration draws on Maslow’s client implementation work. AI-OS
          packaging is evolving; integrations and access are configured for each
          organization.
        </p>
      </div>
      <noscript>
        <div className={styles.noJsTranscript}>
          <h2>How the foundation connects</h2>
          <ol>
            {journeyChapters.map((item) => (
              <li key={item.key}>
                <strong>
                  {item.title} {item.accent}
                </strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
          <p>
            This illustration draws on Maslow’s client implementation work.
            AI-OS packaging is evolving; integrations and access are configured
            for each organization.
          </p>
        </div>
      </noscript>
      <dialog
        ref={dialogRef}
        className={styles.detailDialog}
        aria-labelledby="layer-detail-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDetails();
        }}
        onClose={() => returnFocus.current?.focus({ preventScroll: true })}
      >
        <div className={styles.detailSheet}>
          <header>
            <div>
              <p>{chapter.detail.kicker}</p>
              <h2 id="layer-detail-title">{chapter.detail.title}</h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close layer details"
              onClick={closeDetails}
            >
              ×
            </button>
          </header>
          <p className={styles.detailIntro}>{chapter.detail.intro}</p>
          <div className={styles.detailRows}>
            {chapter.detail.rows.map(([title, copy]) => (
              <section key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </section>
            ))}
          </div>
          <div
            className={styles.detailTags}
            aria-label="Tools and concepts in this layer"
          >
            {chapter.detail.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <aside>
            <strong>How we build with clients</strong>
            <p>
              We use these approaches in client work on Ubuntu and around
              existing systems. AI-OS packaging is evolving; tools and access
              are configured for each organization.
            </p>
          </aside>
          <p className={styles.detailBoundary}>
            The layer shows a practical direction. It does not mean every tool
            is preinstalled or every system is automatically connected.
          </p>
        </div>
      </dialog>
    </section>
  );
}
