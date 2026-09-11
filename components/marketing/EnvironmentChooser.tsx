"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./EnvironmentChooser.module.css";

export function EnvironmentChooser() {
  const [path, setPath] = useState<"preview" | "existing">("preview");
  return <section className={styles.section} aria-labelledby="environment-title" data-path={path}>
    <div className={styles.heading}>
      <p className="eyebrow">TWO PLACES TO BEGIN</p>
      <h2 id="environment-title">Your workspace.<br />Your organization’s world.</h2>
      <p>The free OS is one entry point. The services your organization needs can also run on infrastructure you already have.</p>
    </div>
    <div className={styles.controls} role="group" aria-label="Choose an evaluation path">
      <button type="button" aria-pressed={path === "preview"} onClick={() => setPath("preview")}><span>01</span> Explore the Linux preview</button>
      <button type="button" aria-pressed={path === "existing"} onClick={() => setPath("existing")}><span>02</span> Build on existing infrastructure</button>
    </div>
    <div className={styles.theater}>
      <div className={styles.workstation}>
        <div className={styles.screen}><Image src="/assets/ai-os/maslow-wallpaper-quiet-field.webp" alt="Approved Maslow desktop wallpaper" width={1000} height={625} /><span>MASLOW AI-OS / DEVELOPMENT PREVIEW</span></div>
        <div className={styles.stand} aria-hidden="true" />
        <h3>A dedicated workspace</h3><p>Your agents, tools, and desktop conventions.</p>
      </div>
      <div className={styles.bridge} aria-hidden="true"><span /><i /><span /></div>
      <div className={styles.services}>
        <div className={styles.server} aria-hidden="true"><span>KNOWLEDGE</span><span>CONNECTIONS</span><span>ACTIVITY & CONTROLS</span></div>
        <h3>Shared organization services</h3><p>Configured sources, access, and workflow infrastructure.</p>
      </div>
      <div className={styles.team}><span aria-hidden="true">↳</span><p>Your team keeps its familiar tools.</p><span>Browser · Business apps · Existing devices</span></div>
    </div>
    <div className={styles.pathDetail} aria-live="polite">
      <span>{path === "preview" ? "PREVIEW EVALUATION" : "CLIENT IMPLEMENTATION"}</span>
      <h3>{path === "preview" ? "Start with a technical champion." : "Start with the systems you have."}</h3>
      <p>{path === "preview" ? "Explore the development build on a dedicated x86_64 test machine. Agent accounts, permissions, and shared services are configured separately. This is not a public download or a company-wide migration." : "Maslow can configure organizational knowledge and workflows on existing infrastructure, including Ubuntu. We scope the hosting, integrations, access, and handover around your team. Installing Maslow AI-OS across the business is not required."}</p>
      <a href={`/contact?topic=${path === "preview" ? "ai-os-preview" : "existing-infrastructure"}`}>Talk through this starting point <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}
