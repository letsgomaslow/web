import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { StoryJourney } from "@/components/stories/StoryJourney";
import { CtaButton } from "@/components/ui/CtaButton";
import { conceptStoryJourneys } from "@/lib/content/explainers";
import styles from "./page.module.css";

const story = conceptStoryJourneys.infrastructure;

export const metadata: Metadata = {
  alternates: { canonical: "/concepts/shared-ai-infrastructure" },
  title: { absolute: "Shared AI infrastructure | Maslow AI" },
  description: "See how organizational knowledge, approved memory, reusable skills, scoped connections, and run visibility can support many agents.",
};

const layers = [
  { number: "01", name: "Knowledge", body: "Documents and systems become a governed source layer with citations back to origin.", tools: "Qdrant for vector search · knowledge graphs for relationships" },
  { number: "02", name: "Memory", body: "Durable context is proposed, approved, stored with scope, and shared only with approved agents.", tools: "Project memory · organization memory · retention policy" },
  { number: "03", name: "Skills", body: "Reviewed procedures, tests, exceptions, and human decision points become reusable assets.", tools: "Versioned skill library · evaluation cases · owners" },
  { number: "04", name: "Connections", body: "Specific actions are exposed from business systems without granting every agent broad access.", tools: "MCP · application APIs · controlled computer use" },
  { number: "05", name: "Visibility", body: "Sources, tool calls, approvals, failures, and outcomes stay connected in one operating record.", tools: "OpenTelemetry · Langfuse · workflow evidence" },
] as const;

export default function SharedAiInfrastructurePage() {
  return <PageShell highlightConcepts>
    <section className={styles.hero}><div className={styles.heroInner}>
      <div className={styles.crumb}><Link href="/resources">Resources</Link> / Shared AI infrastructure</div>
      <div className={styles.heroGrid}><div><p className={styles.eyebrow}>THE ORGANIZATION LAYER</p><h1>Build the foundation once. Let approved agents share it.</h1></div><div className={styles.heroAside}><p>Each new agent should not need a new copy of your knowledge, procedures, system connections, and operating controls. Shared infrastructure turns those pieces into managed organizational capabilities.</p><div className={styles.actions}><CtaButton href="/contact">TALK THROUGH A WORKFLOW</CtaButton><Link href="/plan-workflow">MAP A WORKFLOW</Link></div></div></div>
    </div></section>
    <StoryJourney id="infrastructure-story" {...story} variant="infrastructure" afterHref="/plan-workflow" afterLabel="Map the first workflow this foundation should support" />
    <section className={styles.layers}><div className={styles.layersInner}><div className={styles.layersHead}><div><p className={styles.eyebrow}>ONE FOUNDATION · FIVE CAPABILITIES</p><h2>See what is shared and what remains scoped.</h2></div><p>Tool names indicate useful roles in a possible implementation. The final stack depends on source systems, security requirements, deployment boundaries, and the workflow being supported.</p></div><ol>{layers.map((layer)=><li key={layer.number}><span>{layer.number}</span><div><h3>{layer.name}</h3><p>{layer.body}</p></div><small>{layer.tools}</small></li>)}</ol></div></section>
    <section className={styles.offer}><div><p className={styles.eyebrow}>CURRENT OFFER</p><h2>A free AI desktop, with optional organization setup.</h2><p>Maslow AI-OS is a free, customizable Linux AI-OS in development preview. Organizations can separately engage Maslow AI to design shared knowledge, memory, skills, connections, and visibility for a defined workflow. Scope, providers, data boundaries, and acceptance evidence are agreed for each engagement.</p></div><div className={styles.offerActions}><CtaButton href="/contact">DISCUSS AN ORGANIZATION SETUP</CtaButton><CtaButton href="/plan-workflow" variant="secondary">PLAN A WORKFLOW FIRST</CtaButton></div></section>
  </PageShell>;
}
