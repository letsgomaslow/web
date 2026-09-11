import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { MarketingIntro, NextStep } from "@/components/marketing/Marketing";
import { StoryJourney } from "@/components/stories/StoryJourney";
import { startingPoints } from "@/lib/content/starting-points";
import styles from "@/components/marketing/Marketing.module.css";
export const metadata: Metadata = { title: { absolute: "How We Help | Maslow AI" }, description: "Start with discovery, AI setup, organizational knowledge, or one useful workflow. Maslow works with your existing systems and the AI-OS preview where it fits.", alternates: { canonical: "/services" } };
export default function ServicesPage() {
  return <PageShell footer="full"><MarketingIntro eyebrow="HOW WE HELP / START WHERE YOU ARE" title="Your tools are a start. Let’s make them useful together." body="A shared foundation becomes valuable when it fits your organization. We help you choose a use case, connect the information behind it, and put a working setup in your team’s hands." secondaryHref="/plan-workflow" secondaryLabel="Map a workflow first" />
    <StoryJourney id="starting-points" eyebrow="FOUR WAYS TO BEGIN" title="Choose the part you need." description="These are independent starting scopes. You can begin with one, combine them, or bring us an existing setup that needs help." variant="scope" steps={startingPoints} afterHref="#scopes" afterLabel="See deliverables and client work" />
    <section className={styles.section} id="scopes"><p className="eyebrow">A CLEAR PIECE OF WORK</p><h2>Something useful to leave with.</h2><div className={styles.grid}>{startingPoints.map((point, index) => <article key={point.id} className={styles.row} id={point.id}><span className={styles.tag}>0{index + 1} / {point.status}</span><h3>{point.label}</h3><p>{point.result}</p><Link href={point.href}>{point.proof} <span aria-hidden="true">↗</span></Link></article>)}</div>
    <p className={styles.note}>Maslow AI-OS is intended to be free. Discovery, setup, integrations, workflow implementation, training, and ongoing support are paid services. Model usage, hardware, and third-party licenses are separate.</p>
    <div className={styles.row} id="own"><h3>Keep it working as your team grows.</h3><p>We can scope training, knowledge-source maintenance, workflow reviews, and ongoing operations. Ownership and support responsibilities are agreed in your proposal.</p><Link href="/how-we-engage">How we work together ↗</Link></div>
    <div id="assess" /><div id="structure" /><div id="build" /><div id="deploy" />
    </section><NextStep title="Start with the work in front of you." /></PageShell>;
}
