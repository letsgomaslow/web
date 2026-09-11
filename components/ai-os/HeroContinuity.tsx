"use client";

import { useEffect, useRef, useState } from "react";
import { heroAgents } from "@/lib/content/ai-os-home";
import { ToolMark } from "./ToolMark";
import styles from "./AIOSHome.module.css";

export function HeroContinuity() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const agent = heroAgents[selected];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.heroExperience}
      data-testid="hero-agent-continuity"
      data-agent={agent.key}
      data-selected={selected}
      data-paused={paused || !inView ? "true" : "false"}
      role="group"
      aria-label="Try changing the agent while keeping the project context"
      aria-describedby="agent-concept-description"
    >
      <p id="agent-concept-description" className={styles.srOnly}>
        Choose Codex, Claude Code, or Hermes. The selected agent and its role
        change; the supplier brief, approved knowledge, and review skill stay in
        place. This is an illustration of configured shared access.
      </p>
      <div className={styles.sceneTop}>
        <span>NEW AGENT. SAME STARTING POINT.</span>
        <button
          className={styles.motionButton}
          type="button"
          aria-label={paused ? "Play animation" : "Pause animation"}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        </button>
      </div>
      <div
        className={styles.agentPicker}
        role="group"
        aria-label="Choose an agent in the concept"
      >
        {heroAgents.map((item, index) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <ToolMark tool={item.key} size={20} />
            <span>{item.tabName}</span>
          </button>
        ))}
      </div>
      <div className={styles.continuityStage}>
        <span className={styles.continuityCoordinate} aria-hidden="true">
          YOUR TOOLS CAN CHANGE
        </span>
        <div className={styles.agentCard} aria-hidden="true">
          <span>
            <ToolMark tool={agent.key} size={44} />
          </span>
          <div>
            <strong>{agent.shortName}</strong>
            <small>{agent.role}</small>
          </div>
          <i />
        </div>
        <div className={styles.continuityLink} aria-hidden="true">
          <i />
          <span>CONFIGURED ACCESS</span>
        </div>
        <div className={styles.folio}>
          <span>YOUR TEAM’S CONTEXT</span>
          <div className={styles.folioHeader}>
            <span>PROJECT / 001</span>
            <b>MASLOW AI-OS</b>
          </div>
          <p className={styles.folioTitle}>Supplier review</p>
          {[
            ["↳", "The source material", "Supplier brief + quality policy"],
            ["◉", "What your team knows", "Approved standards + decisions"],
            ["↗", "Your way of working", "The supplier review skill"],
          ].map(([glyph, title, copy]) => (
            <div className={styles.folioRow} key={title}>
              <i aria-hidden="true">{glyph}</i>
              <div>
                <strong>{title}</strong>
                <small>{copy}</small>
              </div>
              <b>STAYS</b>
            </div>
          ))}
          <div className={styles.folioFooter}>
            <i /> Same project. Ready for the next tool.
          </div>
        </div>
      </div>
      <div className={styles.sceneCaption} aria-live="polite">
        <i />
        <p>
          <strong>{agent.caption.split(". ")[0]}.</strong>{" "}
          {agent.caption.split(". ").slice(1).join(". ")}
        </p>
        <span>INTERACTIVE CONCEPT</span>
      </div>
    </div>
  );
}
