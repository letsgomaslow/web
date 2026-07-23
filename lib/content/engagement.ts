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
    desc: "One accountable team runs assessment through deployment. The scope covers a knowledge system, an agentic harness, and your first supervised AI employee in a working channel. Go/no-go gates at weeks 2, 4, and 10 keep the engagement tied to one measurable workflow result.",
    fit: "you are ready to move one workflow into production",
    tag: FIXED_FEE_TAG,
    ctaLabel: "SEE HOW WE ENGAGE",
    ctaHref: "/how-we-engage",
  },
] as const;

export const foundationWeeks: readonly {
  label: string;
  desc: string;
  tag: string;
  gate?: string;
}[] = [
  {
    label: "WEEKS 1-2 · LEARN THE WORK",
    desc: "We shadow the people who do the job today, map the workflows, inventory knowledge sources, and document key-person risks. Technology choices come after this work.",
    tag: "WORKFLOW MAP + OPPORTUNITY RANKING",
    gate: "GO/NO-GO · END OF WEEK 2",
  },
  {
    label: "WEEKS 3-4 · PROVE THE VALUE",
    desc: "We build a working proof with your data and questions, then measure retrieval quality against an agreed baseline. If the result does not clear the bar at the first go/no-go gate, we stop and you keep the map.",
    tag: "PROOF OF VALUE + GO/NO-GO",
    gate: "GO/NO-GO · END OF WEEK 4",
  },
  {
    label: "WEEKS 5-10 · BUILD THE FOUNDATION",
    desc: "We build the knowledge system first, followed by the harness and then the AI employee. The first deployment runs in one channel with human approval for consequential actions.",
    tag: "PRODUCTION FOUNDATION + FIRST AI EMPLOYEE",
    gate: "GO/NO-GO · END OF WEEK 10",
  },
  {
    label: "WEEKS 11-12 · HAND OVER THE KEYS",
    desc: "Your team learns to direct, correct, and audit the system. We deliver playbooks and dashboards, then your IT team takes over or uses managed operations until it is ready.",
    tag: "TRAINING + PLAYBOOKS + OPS DECISION",
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
