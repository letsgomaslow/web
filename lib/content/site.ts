export const assessmentQuestions = [
  {
    title: "Where is AI in your organisation today?",
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
    name: "Virtual AI employee pilot",
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
    accent: "#73C1AE",
    name: "Local-first, by default",
    desc: "If a workload can run on hardware you own, we put it there. Privacy stops being a policy and becomes physics.",
  },
  {
    num: "02",
    accent: "#A070A6",
    name: "Open over locked-in",
    desc: "Open models, open standards, exportable data. You should be able to fire us without losing anything we built.",
  },
  {
    num: "03",
    accent: "#EBA93D",
    name: "Humans in the loop",
    desc: "Every consequential action our agents take is approved by a person. Trust is earned in increments, with an audit trail.",
  },
  {
    num: "04",
    accent: "#469DBB",
    name: "Outcomes over hype",
    desc: "We scope engagements around a measurable workflow result, not model demos. If it doesn't pay, we tell you.",
  },
];

export const team = [
  { role: "Founder & CEO", name: "NAME GOES HERE" },
  { role: "Head of Engineering", name: "NAME GOES HERE" },
  { role: "Head of AI Transformation", name: "NAME GOES HERE" },
  { role: "Head of Infrastructure", name: "NAME GOES HERE" },
];
