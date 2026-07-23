import { FIXED_FEE_TAG } from "./pricing";

export const twoDoors = [
  {
    name: "Workflow Discovery",
    desc: 'Two to three weeks. We shadow your teams, map the workflows, and rank them by AI payback, with honest "don\'t bother"s. A deliberately small, fixed price to learn what the real project would cost — before anyone asks you to commit to one. You leave with a ranked opportunity map and one architecture-and-cost sketch, whether or not we ever work together again.',
    fit: "you want proof of thinking before proof of concept",
    tag: FIXED_FEE_TAG,
    ctaLabel: "BOOK A WORKING SESSION",
    ctaHref: "/contact",
  },
  {
    name: "The 90-Day AI Foundation",
    desc: "One accountable team runs assessment through deployment: knowledge systems, agentic harness, and your first AI employee live in a real channel, supervised. Scoped around one measurable workflow result, with go/no-go gates at weeks 2, 4, and 10.",
    fit: "you're done piloting and want something real",
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
    desc: "We shadow the people who do the job today. Workflows mapped, knowledge sources inventoried, key-person risks named. No technology decisions yet, on purpose.",
    tag: "WORKFLOW MAP + OPPORTUNITY RANKING",
    gate: "GO/NO-GO · END OF WEEK 2",
  },
  {
    label: "WEEKS 3-4 · PROVE THE VALUE",
    desc: "A working proof on your real data, not a demo on ours. We test retrieval quality against questions your own team wrote, measure a baseline, and hold the first go/no-go gate: if the numbers don't clear the bar, we stop, and you keep the map.",
    tag: "PROOF OF VALUE + GO/NO-GO",
    gate: "GO/NO-GO · END OF WEEK 4",
  },
  {
    label: "WEEKS 5-10 · BUILD THE FOUNDATION",
    desc: "Knowledge systems first (vector DB, knowledge graph, freshness pipelines), then the harness (skills, tools, approvals, audit trail), then your first AI employee, live in one channel, supervised on every consequential action.",
    tag: "PRODUCTION FOUNDATION + FIRST AI EMPLOYEE",
    gate: "GO/NO-GO · END OF WEEK 10",
  },
  {
    label: "WEEKS 11-12 · HAND OVER THE KEYS",
    desc: "Your team learns to direct, correct, and audit the system. Playbooks written, dashboards live, and a decision point: your IT runs it, or we do under a managed operations agreement until they're ready.",
    tag: "TRAINING + PLAYBOOKS + OPS DECISION",
  },
] as const;

export const expectations = {
  youGet:
    "A single accountable team led by the founder. Weekly written status you can forward to your board. Every artifact (code, pipelines, skills, docs) in your repositories from day one, not handed over at the end.",
  weAsk:
    "A workflow owner for about two hours a week. A decision-maker at the three milestone gates. Read access to the systems the workflow touches, scoped and revocable. That's the whole list.",
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
