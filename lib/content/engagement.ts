import { FIXED_FEE_TAG } from "./pricing";

export const twoDoors = [
  {
    name: "Workflow Discovery",
    desc: "Over two to three weeks, we shadow your teams, map the workflows, and rank them by expected AI payback. The fixed-fee engagement gives you a ranked opportunity map and one architecture-and-cost sketch before you decide whether to fund a build. You keep both deliverables.",
    fit: "you want to see how we think before funding a build",
    tag: FIXED_FEE_TAG,
    ctaLabel: "BOOK A WORKING SESSION",
    ctaHref: "/contact",
  },
  {
    name: "The 90-Day AI Foundation",
    desc: "One accountable team runs assessment through deployment. The scope covers a governed knowledge system, controlled workflow execution, and your first supervised AI employee in a working channel. Go/no-go gates at weeks 2, 4, and 10 keep the engagement tied to one measurable workflow result.",
    fit: "you are ready to move one workflow into production",
    tag: FIXED_FEE_TAG,
    ctaLabel: "EXPLORE THE 90-DAY FOUNDATION",
    ctaHref: "/how-we-engage#ninety-days",
  },
] as const;

export const earlyWorkingSession = {
  eyebrow: "CHOOSE THE RIGHT STARTING SCOPE",
  heading: "Frame one waiting workflow before you choose an engagement.",
  body: "A working session identifies the accountable owner, source systems, human decision, and evidence needed to recommend a starting scope. The recommendation can be Workflow Discovery, the 90-Day Foundation, or a decision to wait.",
  ctaLabel: "PLAN ONE WORKFLOW",
  ctaHref: "/contact",
} as const;

export const foundationWeeks: readonly {
  label: string;
  phase: string;
  desc: string;
  tag: string;
  decisionGate: string;
  retainedEvidence: string;
  gate?: string;
}[] = [
  {
    label: "WEEKS 1-2 · LEARN THE WORK",
    phase: "DISCOVER",
    desc: "We shadow the people who do the job today, map the workflows, inventory knowledge sources, and document key-person risks. Technology choices come after this work.",
    tag: "WORKFLOW MAP + OPPORTUNITY RANKING",
    decisionGate:
      "Choose whether to fund a proof around the highest-ranked workflow, refine the scope, or stop with the map.",
    retainedEvidence:
      "The workflow map, source inventory, and opportunity ranking produced to date.",
    gate: "GO/NO-GO · END OF WEEK 2",
  },
  {
    label: "WEEKS 3-4 · PROVE THE VALUE",
    phase: "VALIDATE",
    desc: "We build a working proof with your data and questions, then measure retrieval quality against an agreed baseline. If the result does not clear the bar at the week 4 go/no-go gate, we stop and you keep the map.",
    tag: "PROOF OF VALUE + GO/NO-GO",
    decisionGate:
      "Continue only if the working proof clears the agreed retrieval-quality baseline.",
    retainedEvidence:
      "The working proof, evaluation questions, baseline definition, and results produced to date.",
    gate: "GO/NO-GO · END OF WEEK 4",
  },
  {
    label: "WEEKS 5-10 · BUILD THE FOUNDATION",
    phase: "BUILD",
    desc: "We build the knowledge system first, followed by controlled workflow execution and then the AI employee. The first deployment runs in one channel with human approval for consequential actions.",
    tag: "PRODUCTION FOUNDATION + FIRST AI EMPLOYEE",
    decisionGate:
      "Approve the first supervised production workflow only when ownership, controls, and human approval boundaries are agreed.",
    retainedEvidence:
      "Knowledge-system and workflow-control artifacts, deployment configuration, and documentation produced to date.",
    gate: "GO/NO-GO · END OF WEEK 10",
  },
  {
    label: "WEEKS 11-12 · HAND OVER THE KEYS",
    phase: "HAND OVER",
    desc: "Your team learns to direct, correct, and audit the system. We deliver playbooks and dashboards, then your IT team takes over or uses managed operations until it is ready.",
    tag: "TRAINING + PLAYBOOKS + OPS DECISION",
    decisionGate:
      "Choose client-operated ownership or managed operations after the training and handover review.",
    retainedEvidence:
      "Training playbooks, dashboards, code, pipelines, skills, and operating documentation in your repositories.",
  },
] as const;

export const expectations = {
  youGet:
    "A single accountable team led by the founder. Weekly written status you can forward to your board. Every artifact (code, pipelines, skills, docs) in your repositories from day one, not handed over at the end.",
  weAsk:
    "We ask for a workflow owner for about two hours a week, a decision-maker at the three milestone gates, and scoped, revocable read access to the systems the workflow touches.",
} as const;

export const pricingPrinciples = [
  {
    num: "01",
    title: "Fixed fee, in writing.",
    body: "Workflow Discovery, the 90-Day Foundation (scoped to one measurable workflow result), and managed operations. Quoted before we start. No surprise invoices, ever.",
  },
  {
    num: "02",
    title: "Go/no-go gates.",
    body: "Weeks 2, 4, and 10. If the value isn't proving out, either of us can stop, and you keep everything produced to that point.",
  },
  {
    num: "03",
    title: "The walk-away clause.",
    body: "If we conclude AI won't pay in your workflow, we say so in writing and recommend you spend your money elsewhere. It has happened. It will happen again.",
  },
] as const;
