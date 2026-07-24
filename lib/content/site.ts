export const assessmentQuestions = [
  {
    title: "Where is AI in your organization today?",
    dim: "USAGE",
    options: [
      "Nowhere: we haven't started",
      "Individuals use chatbots informally",
      "A few pilots or experiments ran",
      "AI is in production in at least one workflow",
    ],
  },
  {
    title: "Where does your company knowledge live?",
    dim: "DATA & KNOWLEDGE",
    options: [
      "Scattered files, inboxes and heads",
      "Organised file shares, but only humans can search them",
      "Partly structured: a wiki, a DMS, some databases",
      "AI-queryable: vector DB and/or knowledge graph",
    ],
  },
  {
    title: "If an AI answered from your data today, would you trust it?",
    dim: "CONTEXT QUALITY",
    options: [
      "It has no access to our data",
      "It would answer from stale or wrong documents",
      "Decent answers, but no citations to sources",
      "Cited, current answers from governed sources",
    ],
  },
  {
    title: "How do your repetitive workflows run?",
    dim: "AUTOMATION",
    options: [
      "Entirely manual",
      "Scripts and rules handle fragments",
      "AI assists people (drafts, summaries)",
      "Agents own workflows with human approval",
    ],
  },
  {
    title: "Where do your models run?",
    dim: "INFRASTRUCTURE",
    options: [
      "We don't use models",
      "Public chatbot subscriptions",
      "Cloud APIs, metered per token",
      "Private cloud or on-prem hardware we control",
    ],
  },
  {
    title: "How mature is your AI governance?",
    dim: "GOVERNANCE",
    options: [
      "Nothing formal exists",
      "Informal norms, no policy",
      "Policies drafted, unevenly followed",
      "Approvals, audit trails and access controls in place",
    ],
  },
];

export const assessmentRecMap = [
  {
    name: "Workflow discovery",
    why: "Find where AI pays before building anything",
    href: "/services#assess",
  },
  {
    name: "Knowledge foundation build",
    why: "Turn your files into a vector DB + knowledge graph",
    href: "/services#structure",
  },
  {
    name: "Context audit",
    why: "Fix what your AI sees before blaming the model",
    href: "/services#structure",
  },
  {
    name: "AI employee pilot",
    why: "One agent, one workflow, live in weeks",
    href: "/services#deploy",
  },
  {
    name: "Local AI deployment",
    why: "Own the hardware, flatten the bill",
    href: "/services#own",
  },
  {
    name: "Custom agentic harness",
    why: "Guardrails, approvals and audit built in",
    href: "/services#build",
  },
];

export const assessmentStages = [
  {
    tag: "STAGE 0 / 4",
    name: "Exploring",
    desc: "You're before the starting line, which is the cheapest place to get this right. An end-to-end engagement takes you through every stage with one accountable team.",
  },
  {
    tag: "STAGE 1 / 4",
    name: "Experimenting",
    desc: "AI is present but unstructured, so value depends on which individual is using it. The next win is knowing where it pays and making your knowledge usable.",
  },
  {
    tag: "STAGE 2 / 4",
    name: "Building foundations",
    desc: "The pieces are forming. Structure your knowledge and get a harness around the model, and pilots stop being demos.",
  },
  {
    tag: "STAGE 3 / 4",
    name: "Operational",
    desc: "AI is doing real work. Now scale the roster, harden governance, and start moving high-volume workloads onto infrastructure you own.",
  },
  {
    tag: "STAGE 4 / 4",
    name: "Owning it",
    desc: "You're ahead of nearly everyone. The remaining gains are cost engineering, model routing and expanding the skill library.",
  },
];

export const assessmentLegend = [
  {
    tag: "STAGE 0",
    name: "Exploring",
    desc: "No AI in use yet. Everything is opportunity.",
  },
  {
    tag: "STAGE 1",
    name: "Experimenting",
    desc: "Individual chatbot use; no structure or strategy.",
  },
  {
    tag: "STAGE 2",
    name: "Building",
    desc: "Pilots ran; knowledge is being structured.",
  },
  {
    tag: "STAGE 3",
    name: "Operational",
    desc: "Agents own real workflows with human oversight.",
  },
  {
    tag: "STAGE 4",
    name: "Owning",
    desc: "Local models, flat costs, compounding skill library.",
  },
];

export const principles = [
  {
    num: "01",
    accent: "var(--color-ice-text)",
    name: "Run suitable workloads locally",
    desc: "When quality, volume, and security requirements support it, we run the workload on hardware you own.",
  },
  {
    num: "02",
    accent: "var(--color-plum-text)",
    name: "Keep every artifact portable",
    desc: "We use open models and standards where they meet the quality bar. Your data, code, and documentation remain exportable.",
  },
  {
    num: "03",
    accent: "var(--color-gold-text)",
    name: "Require approval for consequential actions",
    desc: "A person approves consequential actions, and each decision is recorded in an audit trail.",
  },
  {
    num: "04",
    accent: "var(--color-navy)",
    name: "Set a measurable workflow target",
    desc: "Every engagement starts with a workflow result and a baseline. If the economics do not work, we recommend stopping.",
  },
];

export const founder = {
  name: "Rakesh David",
  role: "Founder & CEO",
  bio: "Rakesh spent more than twenty years in enterprise technology, including CIO and CTO roles at Expedia and Aurobindo Pharma. He owned the budgets, legacy systems, and board questions that come with large technology programs. He founded Maslow after repeatedly seeing critical know-how locked in a few irreplaceable people and projects priced beyond the reach of mid-market companies. Today he builds knowledge graphs, agentic harnesses, and the AI employees they support.",
  pull: "You work directly with someone who has sat in your chair, on your side of the table.",
  bench:
    "For each engagement, Rakesh brings in specialist engineers from a small, trusted bench while retaining accountability for the work. Code, pipelines, skills, documentation, and status history live in your repositories from day one. That makes the engagement less dependent on any one person's availability, including his.",
  elsewhere:
    "Rakesh serves as Chief AI Officer at Rivalista, where the same operating model runs in a second industry, and writes about AI cognition.",
};

export const standingLine =
  "We run Maslow on the same system we build for you: our procedures are versioned skills, our engagements ship weekly written status, and our work product lives in your repos, not ours. The first proof of the product is the company.";

/** @deprecated Use founder. Kept temporarily for any residual imports. */
export const team = [{ role: founder.role, name: founder.name }];
