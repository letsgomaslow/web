import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { StoryJourney } from "@/components/stories/StoryJourney";
import { CtaButton } from "@/components/ui/CtaButton";
import { conceptStoryJourneys, explainerPages, hybridRagComparison } from "@/lib/content/explainers";
import styles from "../story-page.module.css";

const meta = explainerPages["hybrid-rag"];
const story = conceptStoryJourneys.hybrid;
export const metadata: Metadata = {
  alternates: { canonical: "/concepts/hybrid-rag" }, title: { absolute: "Hybrid RAG | Maslow AI" }, description: meta.lede };

export default function HybridRagPage() {
  return <PageShell highlightConcepts><section className={styles.hero}><div className={styles.heroInner}><div className={styles.crumb}><Link href="/resources">Resources</Link> / <span>{meta.crumb}</span></div><div className={styles.heroGrid}><div><p className={styles.badge}>{meta.badge}</p><h1>{meta.title}</h1></div><div className={styles.heroAside}><p>{meta.lede}</p><div className={styles.actions}><CtaButton href="/contact">TALK THROUGH A WORKFLOW</CtaButton><a href="#hybrid-story">COMPARE THE PATHS</a></div></div></div></div></section>
  <StoryJourney id="hybrid-story" {...story} afterHref="/concepts/agentic-harness" afterLabel="Place retrieval inside a controlled workflow" />
  <section className={styles.reference}><div className={styles.referenceInner}><details><summary>Compare vector, graph, and hybrid retrieval in one view</summary><div className={styles.referenceBody}>{hybridRagComparison.map((item)=><article key={item.kind}><h3>{item.kind}</h3><p>{item.desc} {item.example}</p></article>)}</div></details><div className={styles.referenceFoot}><p>The strongest retrieval design follows the questions people need to answer and the evidence those answers require.</p><Link href="/contact">Bring us a difficult knowledge question →</Link></div></div></section></PageShell>;
}
