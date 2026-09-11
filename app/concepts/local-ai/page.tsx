import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { StoryJourney } from "@/components/stories/StoryJourney";
import { CtaButton } from "@/components/ui/CtaButton";
import { conceptStoryJourneys, explainerPages, localKeepFrontier, localRunsLocally } from "@/lib/content/explainers";
import styles from "../story-page.module.css";

const meta = explainerPages["local-ai"];
const story = conceptStoryJourneys.local;
export const metadata: Metadata = {
  alternates: { canonical: "/concepts/local-ai" }, title: { absolute: "Local AI | Maslow AI" }, description: meta.lede };

export default function LocalAiPage() {
  return <PageShell highlightConcepts><section className={styles.hero}><div className={styles.heroInner}><div className={styles.crumb}><Link href="/resources">Resources</Link> / <span>{meta.crumb}</span></div><div className={styles.heroGrid}><div><p className={styles.badge}>{meta.badge}</p><h1>{meta.title}</h1></div><div className={styles.heroAside}><p>{meta.lede}</p><div className={styles.actions}><CtaButton href="/contact">TALK THROUGH A WORKFLOW</CtaButton><a href="#local-story">COMPARE LOCAL AND CLOUD</a></div></div></div></div></section>
  <StoryJourney id="local-story" {...story} afterHref="/contact" afterLabel="Discuss a workload and deployment boundary" />
  <section className={styles.reference}><div className={styles.referenceInner}><details><summary>Open example workload routing considerations</summary><div className={styles.referenceBody}><article><h3>Potential local candidates</h3><p>{localRunsLocally.join(" · ")}</p></article><article><h3>Potential cloud candidates</h3><p>{localKeepFrontier.join(" · ")}</p></article><article><h3>Decision evidence</h3><p>Measure quality, volume, latency, data handling, support, recovery, and total operating cost for the chosen design.</p></article></div></details><div className={styles.referenceFoot}><p>Maslow AI-OS is a free, customizable Linux AI-OS in development preview. Organization-level deployments, integrations, and operating support are optional paid engagements scoped to the environment.</p><Link href="/contact">Discuss an organization setup →</Link></div></div></section></PageShell>;
}
