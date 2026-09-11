import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { StoryJourney } from "@/components/stories/StoryJourney";
import { CtaButton } from "@/components/ui/CtaButton";
import { conceptStoryJourneys, explainerPages, harnessPayoffs } from "@/lib/content/explainers";
import styles from "../story-page.module.css";

const meta = explainerPages["agentic-harness"];
const story = conceptStoryJourneys.harness;
export const metadata: Metadata = {
  alternates: { canonical: "/concepts/agentic-harness" }, title: { absolute: "Agentic harness | Maslow AI" }, description: meta.lede };

export default function AgenticHarnessPage() {
  return <PageShell highlightConcepts><section className={styles.hero}><div className={styles.heroInner}><div className={styles.crumb}><Link href="/resources">Resources</Link> / <span>{meta.crumb}</span></div><div className={styles.heroGrid}><div><p className={styles.badge}>{meta.badge}</p><h1>{meta.title}</h1></div><div className={styles.heroAside}><p>{meta.lede}</p><div className={styles.actions}><CtaButton href="/contact">TALK THROUGH A WORKFLOW</CtaButton><a href="#harness-story">FOLLOW ONE RUN</a></div></div></div></div></section>
  <StoryJourney id="harness-story" {...story} afterHref="/concepts/skills-and-gateways" afterLabel="See how procedures and connections are reused" />
  <section className={styles.reference}><div className={styles.referenceInner}><details><summary>Open the deeper harness reference</summary><div className={styles.referenceBody}>{harnessPayoffs.map((item)=><article key={item.title}><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></details><div className={styles.referenceFoot}><p>A harness earns trust through scoped permissions, human decision points, and evidence from actual runs.</p><Link href="/contact">Review a workflow boundary →</Link></div></div></section></PageShell>;
}
