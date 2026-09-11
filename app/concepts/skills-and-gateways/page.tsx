import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { StoryJourney } from "@/components/stories/StoryJourney";
import { CtaButton } from "@/components/ui/CtaButton";
import { conceptStoryJourneys, explainerPages, gatewayBenefits } from "@/lib/content/explainers";
import styles from "../story-page.module.css";

const meta = explainerPages["skills-and-gateways"];
const story = conceptStoryJourneys.skills;
export const metadata: Metadata = {
  alternates: { canonical: "/concepts/skills-and-gateways" }, title: { absolute: "Skills and gateways | Maslow AI" }, description: meta.lede };

export default function SkillsAndGatewaysPage() {
  return <PageShell highlightConcepts><section className={styles.hero}><div className={styles.heroInner}><div className={styles.crumb}><Link href="/resources">Resources</Link> / <span>{meta.crumb}</span></div><div className={styles.heroGrid}><div><p className={styles.badge}>{meta.badge}</p><h1>{meta.title}</h1></div><div className={styles.heroAside}><p>{meta.lede}</p><div className={styles.actions}><CtaButton href="/contact">TALK THROUGH A WORKFLOW</CtaButton><a href="#skills-story">FOLLOW THE DELIVERY PATH</a></div></div></div></div></section>
  <StoryJourney id="skills-story" {...story} afterHref="/concepts/shared-ai-infrastructure" afterLabel="See the shared organizational foundation" />
  <section className={styles.reference}><div className={styles.referenceInner}><details><summary>Open the deeper skills and connections reference</summary><div className={styles.referenceBody}>{gatewayBenefits.map((item)=><article key={item.name}><h3>{item.name}</h3><p>{item.desc}</p></article>)}</div></details><div className={styles.referenceFoot}><p>Connections are configured per system and workflow. Availability, permissions, and provider terms are verified during implementation.</p><Link href="/contact">Bring us a recurring procedure →</Link></div></div></section></PageShell>;
}
