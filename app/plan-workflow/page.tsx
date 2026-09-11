import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { WorkflowMapper } from "@/components/explainers/WorkflowMapper";
import { MarketingIntro } from "@/components/marketing/Marketing";
import styles from "@/components/marketing/Marketing.module.css";
export const metadata: Metadata = { title: { absolute: "Map a Workflow | Maslow AI" }, description: "Four questions to name the work, its owner, its sources, and the human decision. Make an editable brief without an email address or readiness score.", alternates: { canonical: "/plan-workflow" } };
export default function PlanWorkflowPage() { return <PageShell footer="compact"><MarketingIntro eyebrow="A WORKFLOW PLANNER / NO EMAIL REQUIRED" title="Give your first idea a shape." body="Name the work, the person responsible, the information it needs, and the decision a human should keep. You will have an editable brief to share with your team or bring to Maslow." secondaryHref="#workflow-mapper" secondaryLabel="Build my brief" /><section className={styles.section} id="workflow-mapper"><WorkflowMapper /></section></PageShell>; }
