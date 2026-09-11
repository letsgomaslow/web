"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { wallpapers, workspaceModes } from "@/lib/content/ai-os-home";
import styles from "./AIOSHome.module.css";

type Mode = keyof typeof workspaceModes;
type Wallpaper = keyof typeof wallpapers;
const modes = Object.keys(workspaceModes) as Mode[];
const wallpaperKeys = Object.keys(wallpapers) as Wallpaper[];

export function WorkspaceExplorer() {
  const [mode, setMode] = useState<Mode>("focus");
  const [wallpaper, setWallpaper] = useState<Wallpaper>("quiet");
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const selected =
    mode === "desktop"
      ? {
          title: wallpapers[wallpaper].name,
          src: wallpapers[wallpaper].src,
          alt: wallpapers[wallpaper].alt,
          caption: `${wallpapers[wallpaper].name}. From the Maslow AI-OS wallpaper collection.`,
        }
      : workspaceModes[mode];

  const selectMode = (nextMode: Mode, focus = false) => {
    setMode(nextMode);
    if (focus)
      document
        .getElementById(`workspace-tab-${nextMode}`)
        ?.focus({ preventScroll: true });
  };
  const onTabKey = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % modes.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + modes.length) % modes.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = modes.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectMode(modes[next], true);
  };
  const open = (event: React.MouseEvent<HTMLButtonElement>) => {
    returnFocus.current = event.currentTarget;
    setZoomed(false);
    dialogRef.current?.showModal();
    requestAnimationFrame(() =>
      closeRef.current?.focus({ preventScroll: true }),
    );
  };
  const close = () => dialogRef.current?.close();
  const pan = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!zoomed || !stageRef.current) return;
    const amount = event.shiftKey ? 180 : 60;
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    )
      return;
    event.preventDefault();
    stageRef.current.scrollBy({
      left:
        event.key === "ArrowLeft"
          ? -amount
          : event.key === "ArrowRight"
            ? amount
            : 0,
      top:
        event.key === "ArrowUp"
          ? -amount
          : event.key === "ArrowDown"
            ? amount
            : 0,
      behavior: "smooth",
    });
  };
  const trapDialog = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "button, [tabindex='0']",
      ),
    );
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <section
      className={styles.workspaceSection}
      id="workspace"
      aria-labelledby="workspace-title"
      data-testid="workspace-explorer"
      data-workspace-mode={mode}
      data-wallpaper={wallpaper}
    >
      <div className={styles.workspaceInner}>
        <div className={styles.workspaceHeading}>
          <div>
            <p>02 / AN OS THAT FEELS LIKE YOURS</p>
            <h2 id="workspace-title">
              Make room
              <br />
              for your <em>way.</em>
            </h2>
          </div>
          <div>
            <p>
              Keep your agent, approved context, and review material in one
              considered workspace.
            </p>
            <small>
              Built on Omarchy. A keyboard-first Linux desktop with flexible
              layouts and a setup you can make your own.
            </small>
          </div>
        </div>
        <div className={styles.workspaceControls}>
          <div
            role="tablist"
            aria-label="Workspace screen concepts and Maslow wallpapers"
          >
            {modes.map((item, index) => (
              <button
                key={item}
                id={`workspace-tab-${item}`}
                type="button"
                role="tab"
                aria-selected={mode === item}
                aria-controls="workspace-panel"
                tabIndex={mode === item ? 0 : -1}
                onClick={() => selectMode(item)}
                onKeyDown={(event) => onTabKey(event, index)}
              >
                <span>0{index + 1}</span>
                {workspaceModes[item].label}
              </button>
            ))}
          </div>
          <button type="button" data-testid="workspace-expand" onClick={open}>
            Take a closer look <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div
          className={styles.workspacePanel}
          id="workspace-panel"
          role="tabpanel"
          aria-labelledby={`workspace-tab-${mode}`}
          tabIndex={0}
        >
          <div className={styles.workspaceLabel}>
            <span aria-hidden="true" />
            {mode === "desktop"
              ? "Maslow AI-OS / wallpaper collection"
              : "AI-generated workspace concept"}
          </div>
          <div className={styles.workspaceImage}>
            <Image
              key={selected.src}
              src={selected.src}
              width={mode === "desktop" ? 3840 : 1672}
              height={mode === "desktop" ? 2160 : 941}
              alt={selected.alt}
              sizes="(max-width: 700px) calc(100vw - 40px), min(1280px, calc(100vw - 112px))"
            />
          </div>
          {mode === "desktop" ? (
            <div
              className={styles.wallpaperPicker}
              role="group"
              aria-label="Choose a Maslow wallpaper"
            >
              <span>MAKE IT YOURS</span>
              {wallpaperKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  data-wallpaper-choice={key}
                  aria-pressed={wallpaper === key}
                  onClick={() => setWallpaper(key)}
                >
                  <i
                    style={{ backgroundImage: `url(${wallpapers[key].src})` }}
                    aria-hidden="true"
                  />
                  {key === "quiet"
                    ? "Quiet field"
                    : key === "topographic"
                      ? "Topographic"
                      : "Signal"}
                </button>
              ))}
            </div>
          ) : null}
          <div className={styles.workspaceCaption} aria-live="polite">
            <p>{selected.caption}</p>
            <span>
              {mode === "desktop"
                ? "EXISTING MASLOW ARTWORK"
                : "ILLUSTRATIVE SCREEN · NOT A LIVE CAPTURE"}
            </span>
          </div>
        </div>
        <div
          className={styles.workspaceDetails}
          aria-label="Workspace qualities"
        >
          <article>
            <span aria-hidden="true">⌘</span>
            <div>
              <h3>Less window wrangling.</h3>
              <p>
                Keep your working material together and move through layouts
                with the keyboard.
              </p>
            </div>
          </article>
          <article>
            <span aria-hidden="true">▦</span>
            <div>
              <h3>Choose the right view.</h3>
              <p>
                Give one agent the room or bring a second tool alongside when
                the work calls for it.
              </p>
            </div>
          </article>
          <article>
            <span aria-hidden="true">◐</span>
            <div>
              <h3>Make the system yours.</h3>
              <p>
                Shape themes, shortcuts, menus, and desktop tools around the way
                you work.
              </p>
            </div>
          </article>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className={styles.workspaceDialog}
        data-testid="workspace-dialog"
        aria-labelledby="workspace-dialog-title"
        aria-describedby="workspace-dialog-description"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={trapDialog}
        onClose={() => returnFocus.current?.focus({ preventScroll: true })}
      >
        <header>
          <div>
            <p>
              {mode === "desktop"
                ? "MASLOW AI-OS / WALLPAPER COLLECTION"
                : "AI-GENERATED WORKSPACE CONCEPT"}
            </p>
            <h2 id="workspace-dialog-title">{selected.title}</h2>
          </div>
          <div>
            <button
              type="button"
              data-testid="workspace-zoom"
              aria-pressed={zoomed}
              onClick={() => setZoomed((value) => !value)}
            >
              {zoomed ? "Fit image −" : "Zoom in ＋"}
            </button>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close expanded workspace"
              onClick={close}
            >
              ×
            </button>
          </div>
        </header>
        <p id="workspace-dialog-description">
          {zoomed
            ? "Use arrow keys, Shift plus arrow keys, or swipe to explore the image."
            : selected.caption}
        </p>
        <div
          ref={stageRef}
          className={styles.dialogStage}
          data-testid="workspace-dialog-stage"
          data-zoomed={zoomed}
          tabIndex={0}
          role="region"
          aria-label="Enlarged workspace image"
          onKeyDown={pan}
        >
          <Image
            src={selected.src}
            width={mode === "desktop" ? 3840 : 1672}
            height={mode === "desktop" ? 2160 : 941}
            alt={selected.alt}
            sizes="100vw"
          />
        </div>
      </dialog>
    </section>
  );
}
