import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { StoryJourney } from "@/components/stories/StoryJourney";
import { CtaButton } from "@/components/ui/CtaButton";
import { conceptStoryJourneys, contextDiscipline, explainerPages } from "@/lib/content/explainers";
import styles from "../story-page.module.css";

const meta = explainerPages["context-engineering"];
const story = conceptStoryJourneys.context;
export const metadata: Metadata = {
  alternates: { canonical: "/concepts/context-engineering" }, title: { absolute: "Context engineering | Maslow AI" }, description: meta.lede };

export default function ContextEngineeringPage() {
  return <PageShell highlightConcepts><section className={styles.hero}><div className={styles.heroInner}>
    <div className={styles.crumb}><Link href="/resources">Resources</Link> / <span>{meta.crumb}</span></div>
    <div className={styles.heroGrid}><div><p className={styles.badge}>{meta.badge}</p><h1>{meta.title}</h1></div><div className={styles.heroAside}><p>{meta.lede}</p><div className={styles.actions}><CtaButton href="/contact">TALK THROUGH A WORKFLOW</CtaButton><a href="#context-story">SEE THE PATH</a></div></div></div>
  </div></section><StoryJourney id="context-story" {...story} afterHref="/concepts/hybrid-rag" afterLabel="Compare vector and graph retrieval" />
  <section className={styles.reference}><div className={styles.referenceInner}><details><summary>Open the deeper context engineering reference</summary><div className={styles.referenceBody}>{contextDiscipline.map((item)=><article key={item.num}><h3>{item.num} · {item.name}</h3><p>{item.desc}</p></article>)}</div></details><div className={styles.referenceFoot}><p>Context quality depends on current sources, clear ownership, and retrieval that leaves a path back to evidence.</p><Link href="/contact">Discuss your source landscape →</Link></div></div></section></PageShell>;
}
