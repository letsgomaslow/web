import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { MarketingIntro, NextStep } from "@/components/marketing/Marketing";
import { StoryJourney } from "@/components/stories/StoryJourney";
import { deliverySteps } from "@/lib/content/starting-points";
import { foundationWeeks } from "@/lib/content/engagement";
import { WeekRail } from "./WeekRail";
import styles from "@/components/marketing/Marketing.module.css";
export const metadata: Metadata = { title: { absolute: "How We Engage | Maslow AI" }, description: "From one useful test to a working foundation. Explore discovery, validation, implementation, and handover, with scope and fees agreed before work begins.", alternates: { canonical: "/how-we-engage" } };
export default function HowWeEngagePage() {
 return <PageShell footer="full"><MarketingIntro eyebrow="HOW WE ENGAGE / BUILD WITH A PURPOSE" title="One useful step. Then the next." body="A setup project can be small. A knowledge system needs more discovery. We agree on a scope, a fee, and what would make the work worthwhile before implementation begins." secondaryHref="/services" secondaryLabel="Explore starting scopes" />
 <StoryJourney id="delivery" eyebrow="FROM A QUESTION TO A WORKING SYSTEM" title="See how the work takes shape." description="An engagement uses the parts of this process its scope needs. Every phase ends with something your team can inspect." variant="engagement" steps={deliverySteps} afterHref="#engagement-details" afterLabel="Explore scope and handover" />
 <section className={styles.section} id="engagement-details"><div className={styles.grid}><article className={styles.row}><p className="eyebrow">YOUR PART</p><h2>Bring the people who know the work.</h2><p>A workflow owner, a technical counterpart, and access to representative information make the first test useful. We agree the time commitment and access needed for your scope.</p></article><article className={styles.row}><p className="eyebrow">OUR PART</p><h2>Keep the work visible.</h2><p>You work with a founder-led team. Progress, decisions, evaluation results, and deliverables are documented so your team can understand what has been built and what comes next.</p></article></div>
 <details className={styles.detail} id="ninety-days"><summary>A larger option: the 90-Day Foundation</summary><p>For organizations ready to connect a knowledge system and a first supervised workflow, we offer a scoped 90-Day Foundation. Its decision gates sit at weeks 2, 4, and 10. It is one engagement option; smaller scopes do not inherit this timeline.</p><WeekRail /><p>{foundationWeeks.length} phases, with a go/no-go decision before expanding the work. Scope, fees, ownership, and exit terms are set out in your proposal.</p></details>
 <div className={styles.note} id="pricing">Fixed fees are quoted before work begins. Ongoing operations is scoped separately. Hardware, model usage, and third-party services are identified as separate costs.</div></section><NextStep title="Let’s agree on a sensible first scope." /></PageShell>;
}
