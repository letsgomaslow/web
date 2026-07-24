export type ContextSourceDef = {
  key: string;
  name: string;
  meta: string;
  tag: "high" | "medium" | "stale";
  size: number;
  quality: number;
};

export const contextSources: ContextSourceDef[] = [
  {
    key: "contract",
    name: "Contract archive",
    meta: "MSAs, SOWs, amendments, via knowledge graph",
    tag: "high",
    size: 22,
    quality: 45,
  },
  {
    key: "crm",
    name: "Live CRM record",
    meta: "Vendor X account, current as of today",
    tag: "high",
    size: 8,
    quality: 25,
  },
  {
    key: "policies",
    name: "Company policies",
    meta: "Procurement & payment policy docs",
    tag: "medium",
    size: 14,
    quality: 15,
  },
  {
    key: "thread",
    name: "This email thread",
    meta: "The conversation that triggered the question",
    tag: "medium",
    size: 10,
    quality: 10,
  },
  {
    key: "wiki",
    name: "2023 team wiki",
    meta: "Unmaintained; contains the OLD net-30 terms",
    tag: "stale",
    size: 26,
    quality: -30,
  },
];

export const contextDiscipline: {
  num: string;
  accent: string;
  name: string;
  desc: string;
  link?: { href: string; label: string };
}[] = [
  {
    num: "01",
    accent: "var(--color-ice-text)",
    name: "Ingestion",
    desc: "Every file format, every silo, chunked with structure and metadata intact.",
  },
  {
    num: "02",
    accent: "var(--color-plum-text)",
    name: "Structuring",
    desc: "Vector DB for meaning, knowledge graph for facts:",
    link: { href: "/concepts/hybrid-rag", label: "hybrid RAG" },
  },
  {
    num: "03",
    accent: "var(--color-gold-text)",
    name: "Freshness",
    desc: "Sync pipelines so your AI never lives in last quarter. Stale data is worse than none.",
  },
  {
    num: "04",
    accent: "var(--color-navy)",
    name: "Routing",
    desc: "Per-task retrieval that decides which facts earn a place in the briefing.",
  },
];

export const localHardwareTiers = [
  {
    tag: "TIER 1",
    name: "Workstation",
    price: "from ~$15k",
    desc: "A single GPU workstation. Runs mid-size open models for a team: document Q&A, drafting, triage.",
    accent: "var(--color-ice-text)",
    featured: false,
  },
  {
    tag: "TIER 2",
    name: "Server",
    price: "from ~$45k",
    desc: "Rack-mounted multi-GPU inference. Department-scale AI employees with headroom for growth.",
    accent: "#FFF860",
    featured: true,
  },
  {
    tag: "TIER 3",
    name: "Cluster",
    price: "custom",
    desc: "Multi-node estate for org-wide workloads, fine-tuning and redundancy. Designed with your IT team.",
    accent: "var(--color-plum-text)",
    featured: false,
  },
];

export const localRunsLocally = [
  "Document Q&A over your knowledge graph",
  "Email & ticket triage, classification, routing",
  "Drafting from templates and precedent",
  "Anything touching regulated or client data",
];

export const localKeepFrontier = [
  "Novel multi-step reasoning on unfamiliar problems",
  "Long-horizon agentic work with many tools",
  "Low-volume tasks that never reach breakeven",
  "The harness routes each task to the right model automatically",
];

export const localCostDefaults = {
  cloudRatePerM: 8,
  hardwareCost: 42000,
  monthlyOpex: 700,
};

export type ChannelDef = {
  name: string;
  chromeTitle: string;
  chromeBg: string;
  chromeBar: string;
  chromeTitleColor: string;
  textPrimary: string;
  textBody: string;
  textFaint: string;
  bubbleHuman: string;
  bubbleAgent: string;
  humanAvatarBg: string;
  humanMeta: string;
  humanMsg: string;
  agentMsg: string;
  agentSources: string;
  approveLabel: string;
};

export const channelDemos: ChannelDef[] = [
  {
    name: "Teams",
    chromeTitle: "#ops-requests · Microsoft Teams",
    chromeBg: "#F5F5F5",
    chromeBar: "#E8E6F0",
    chromeTitleColor: "#3D3A57",
    textPrimary: "#252423",
    textBody: "#3B3A39",
    textFaint: "rgba(37,36,35,.5)",
    bubbleHuman: "#FFFFFF",
    bubbleAgent: "#E8EBFA",
    humanAvatarBg: "#6264A7",
    humanMeta: "10:42 AM",
    humanMsg:
      "@Riley can you check if invoice #4482 from Vendor X matches our contract terms?",
    agentMsg:
      "Checked. The invoice assumes net-30, but the 2024 MSA amendment (§7.2) sets net-45. I’ve drafted a correction reply to the vendor. Approve to send?",
    agentSources: "Sources: MSA_VendorX_2024.pdf · §7.2 · invoice-4482.pdf",
    approveLabel: "Approve & send",
  },
  {
    name: "Slack",
    chromeTitle: "#ops-requests · Slack",
    chromeBg: "#FFFFFF",
    chromeBar: "#4A154B",
    chromeTitleColor: "#FFFFFF",
    textPrimary: "#1D1C1D",
    textBody: "#1D1C1D",
    textFaint: "rgba(29,28,29,.5)",
    bubbleHuman: "#F8F8F8",
    bubbleAgent: "#EAF3FA",
    humanAvatarBg: "#E01E5A",
    humanMeta: "10:42",
    humanMsg:
      "hey @riley, does invoice 4482 from vendor x match what we agreed in the contract?",
    agentMsg:
      "It doesn’t: invoice assumes net-30 but the 2024 MSA amendment (§7.2) says net-45. Drafted a reply to the vendor. Want me to send it?",
    agentSources: "Sources: MSA_VendorX_2024.pdf · §7.2 · invoice-4482.pdf",
    approveLabel: "Send it",
  },
  {
    name: "Email",
    chromeTitle: "RE: Invoice #4482 · Vendor X · Outlook",
    chromeBg: "#FBFBFB",
    chromeBar: "#0F6CBD",
    chromeTitleColor: "#FFFFFF",
    textPrimary: "#242424",
    textBody: "#424242",
    textFaint: "rgba(36,36,36,.5)",
    bubbleHuman: "#FFFFFF",
    bubbleAgent: "#F0F6FB",
    humanAvatarBg: "#0F6CBD",
    humanMeta: "to: riley@yourfirm.com",
    humanMsg:
      "Riley, please verify invoice #4482 against the Vendor X contract before we pay it. Thanks, Dana",
    agentMsg:
      "Dana, the invoice assumes net-30; the governing 2024 MSA amendment (§7.2) sets net-45. Attached is a drafted correction to the vendor for your review. It will not send without your approval.",
    agentSources:
      "Attachments: draft_reply.eml · MSA_VendorX_2024.pdf (§7.2 highlighted)",
    approveLabel: "Approve draft",
  },
];

export const rileyDayTimeline = [
  {
    time: "07:00",
    accent: "var(--color-ice-text)",
    title: "Overnight triage",
    desc: "42 inbound emails sorted, classified and routed before anyone logs in.",
  },
  {
    time: "09:30",
    accent: "var(--color-plum-text)",
    title: "Grounded drafts",
    desc: "Replies drafted with citations, queued in Teams for one-tap approval.",
  },
  {
    time: "14:00",
    accent: "var(--color-gold-text)",
    title: "Smart escalation",
    desc: "A contract conflict it can't resolve goes to the right human, with full context attached.",
  },
  {
    time: "18:00",
    accent: "var(--color-navy)",
    title: "Shift report",
    desc: "What was handled, what's pending, what needs you tomorrow, posted to the channel.",
  },
];

export type SkillDef = {
  name: string;
  version: string;
  summary: string;
  meta: string;
  desc: string;
  steps: { num: string; text: string; tag: string }[];
  agents: string[];
  channels: string[];
};

export const skillLibrary: SkillDef[] = [
  {
    name: "Invoice reconciliation",
    version: "v1.3",
    summary: "Match invoices against contracted terms before payment.",
    meta: "UPDATED 12D AGO · 47 RUNS THIS WEEK",
    desc: "Given an inbound invoice, verify it against the governing agreement and flag discrepancies before anything is paid.",
    steps: [
      {
        num: "01",
        text: "Extract vendor, amount, terms and line items from the invoice",
        tag: "PARSE",
      },
      {
        num: "02",
        text: "Look up the governing agreement in the knowledge graph",
        tag: "CONTEXT",
      },
      {
        num: "03",
        text: "Compare payment terms, rates and scope clause-by-clause",
        tag: "REASON",
      },
      {
        num: "04",
        text: "Draft a correction reply if anything mismatches",
        tag: "DRAFT",
      },
      {
        num: "05",
        text: "Queue for human approval; never auto-send",
        tag: "GUARDRAIL",
      },
    ],
    agents: ["Riley · Ops"],
    channels: ["Teams", "Email"],
  },
  {
    name: "Client intake triage",
    version: "v2.0",
    summary: "Classify, prioritize and route new client requests.",
    meta: "UPDATED 3D AGO · 210 RUNS THIS WEEK",
    desc: "Every inbound request gets classified, checked for conflicts, and routed to the right person with context attached.",
    steps: [
      {
        num: "01",
        text: "Classify the request type and urgency",
        tag: "PARSE",
      },
      {
        num: "02",
        text: "Run a conflict check against the client graph",
        tag: "CONTEXT",
      },
      {
        num: "03",
        text: "Draft an acknowledgment with realistic timeline",
        tag: "DRAFT",
      },
      {
        num: "04",
        text: "Route to the right owner with a one-paragraph brief",
        tag: "ACT",
      },
      {
        num: "05",
        text: "Escalate anything ambiguous to a human",
        tag: "GUARDRAIL",
      },
    ],
    agents: ["Riley · Ops", "Sage · Intake"],
    channels: ["Email", "Slack"],
  },
  {
    name: "Contract term lookup",
    version: "v1.8",
    summary: "Answer term questions with clause-level citations.",
    meta: "UPDATED 8D AGO · 132 RUNS THIS WEEK",
    desc: "Plain-English questions about any agreement, answered from the governing document with the exact clause cited.",
    steps: [
      {
        num: "01",
        text: "Resolve which agreement governs the entity in question",
        tag: "CONTEXT",
      },
      {
        num: "02",
        text: "Retrieve candidate clauses via hybrid RAG",
        tag: "CONTEXT",
      },
      {
        num: "03",
        text: "Answer with section numbers and source file linked",
        tag: "DRAFT",
      },
      {
        num: "04",
        text: "Flag conflicts between documents instead of guessing",
        tag: "GUARDRAIL",
      },
    ],
    agents: ["Riley · Ops", "Sage · Intake"],
    channels: ["Teams", "Slack", "Email"],
  },
  {
    name: "Meeting brief",
    version: "v1.1",
    summary: "Assemble a one-page brief before every external meeting.",
    meta: "UPDATED 21D AGO · 38 RUNS THIS WEEK",
    desc: "Thirty minutes before an external meeting, a brief arrives: who you’re meeting, open threads, and what changed since last time.",
    steps: [
      {
        num: "01",
        text: "Pull attendees and history from calendar + CRM",
        tag: "CONTEXT",
      },
      {
        num: "02",
        text: "Summarise open items and recent correspondence",
        tag: "REASON",
      },
      {
        num: "03",
        text: "Post the brief to your channel 30 minutes ahead",
        tag: "ACT",
      },
    ],
    agents: ["Sage · Intake"],
    channels: ["Teams", "Slack"],
  },
];

export const gatewayBenefits = [
  {
    name: "No new app to adopt",
    desc: "Your team keeps working where they already work. Adoption stops being a change-management project.",
  },
  {
    name: "Scoped, least-privilege access",
    desc: "Each gateway grants exactly the permissions the workflow needs, and logs every message both ways.",
  },
  {
    name: "Skills compound",
    desc: "A skill written for the email agent works in Teams the same day. Your library becomes an asset that grows.",
  },
];

export type HarnessNode = {
  tag: string;
  label: string;
  title: string;
  desc: string;
  bullets: string[];
};

export const harnessNodes: HarnessNode[] = [
  {
    tag: "01 / CONTEXT",
    label: "CONTEXT",
    title: "Context",
    desc: "Everything the model sees before it acts: retrieved documents, live data, the state of the task. Engineered through hybrid RAG so the right facts arrive at the right moment.",
    bullets: [
      "Hybrid RAG over your vector DB + knowledge graph",
      "Freshness pipelines so your AI never lives in last quarter",
      "Citations back to source files on every answer",
    ],
  },
  {
    tag: "02 / SKILLS",
    label: "SKILLS",
    title: "Skills",
    desc: "Reusable, auditable procedures the agent can follow: your firm’s way of doing things, encoded once and shared across every agent.",
    bullets: [
      "Procedures written with your domain experts",
      "Versioned and testable like code",
      "Shared across all your AI employees",
    ],
  },
  {
    tag: "03 / TOOLS",
    label: "TOOLS",
    title: "Tools",
    desc: "The systems the agent can operate: CRM, ERP, calendars, document stores. Each tool is scoped: the agent gets exactly the access the task needs.",
    bullets: [
      "Least-privilege access per workflow",
      "Structured calls, not screen-scraping",
      "Every invocation logged",
    ],
  },
  {
    tag: "04 / MEMORY",
    label: "MEMORY",
    title: "Memory",
    desc: "What the agent retains across sessions: preferences, open threads, past decisions. Memory turns a stateless model into a teammate with continuity.",
    bullets: [
      "Task state that survives restarts",
      "Client and case history at hand",
      "Forgetting policies for compliance",
    ],
  },
  {
    tag: "05 / GUARDRAILS",
    label: "GUARDRAILS",
    title: "Guardrails",
    desc: "The boundaries: what requires human approval, what is off-limits, what gets escalated. Reliability is engineered here, not hoped for at the model layer.",
    bullets: [
      "Human approval on consequential actions",
      "Full audit trail of reads and writes",
      "Escalation paths designed with your team",
    ],
  },
  {
    tag: "06 / GATEWAYS",
    label: "GATEWAYS",
    title: "Gateways",
    desc: "The agent works through Microsoft Teams, Slack, and shared inboxes, so staff can use it inside their existing channels.",
    bullets: [
      "Teams, Slack and email connectors",
      "One agent, many channels",
      "Notifications and approvals in-flow",
    ],
  },
];

export const harnessPayoffs = [
  {
    accent: "var(--color-ice-text)",
    title: "Model-agnostic",
    desc: "Swap the core (frontier API today, local open model tomorrow) without rebuilding the workflow. The harness is the constant.",
  },
  {
    accent: "var(--color-plum-text)",
    title: "Controls you can inspect",
    desc: "The harness contains the guardrails, approvals, and audit trails used to review reliability.",
  },
  {
    accent: "var(--color-gold-text)",
    title: "Compounding asset",
    desc: "Every skill you add and every workflow you wire becomes reusable infrastructure; your AI capability compounds.",
  },
];

export const hybridRagStages = [
  {
    tag: "01 / INGEST",
    title: "Ingest & chunk",
    desc: "PDFs, emails, spreadsheets and chat logs are split into meaningful chunks; pages become passages.",
  },
  {
    tag: "02 / EMBED",
    title: "Embed into vectors",
    desc: "Each chunk becomes a point in space. Nearby points mean similar meaning: this is your vector database.",
  },
  {
    tag: "03 / CONNECT",
    title: "Extract the graph",
    desc: "Entities and relationships (people, contracts, dates, obligations) link into a knowledge graph. Hybrid RAG queries both.",
  },
];

export const hybridRagComparison = [
  {
    kind: "VECTOR DATABASE",
    accent: "var(--color-ice-text)",
    title: "Finds by meaning",
    desc: '"Find everything similar to this." Great for fuzzy questions, summaries, and discovering related material.',
    example: '"What do our contracts say about early termination?"',
    dark: false,
  },
  {
    kind: "KNOWLEDGE GRAPH",
    accent: "var(--color-plum-text)",
    title: "Finds by fact",
    desc: '"Which entities connect to which?" Exact answers across relationships: customers, contracts, dates, obligations.',
    example: '"Which vendors have net-45 terms AND an active NDA?"',
    dark: false,
  },
  {
    kind: "HYBRID RAG",
    accent: "#FFF860",
    title: "Both, routed automatically",
    desc: "Meaning when you need recall, facts when you need precision, and citations back to the source file either way.",
    example: '"Summarise our exposure if Vendor X terminates early."',
    dark: true,
  },
];

export type ExplainerMeta = {
  slug: string;
  crumb: string;
  badge: string;
  badgeColor: string;
  title: string;
  lede: string;
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
};

export const explainerPages: Record<string, ExplainerMeta> = {
  "context-engineering": {
    slug: "context-engineering",
    crumb: "Context engineering",
    badge: "TECHNOLOGY",
    badgeColor: "var(--color-ice-text)",
    title: "Your AI needs the right briefing.",
    lede: "Before a model acts, it receives a set of documents, instructions, and current data. Context engineering controls what is included. Build a briefing below and see how the answer changes.",
    next: { href: "/concepts/hybrid-rag", label: "Hybrid RAG →" },
  },
  "local-ai": {
    slug: "local-ai",
    crumb: "Local AI",
    badge: "TECHNOLOGY",
    badgeColor: "var(--color-ice-text)",
    title: "Own the hardware. Flatten the bill.",
    lede: "Cloud AI bills grow with every query. Local AI is an investment: buy the hardware once, run open models on it, and watch cost per query fall toward electricity. Use the calculator to find your breakeven.",
    prev: { href: "/concepts/agentic-harness", label: "← Agentic Harness" },
  },
  "virtual-ai-employees": {
    slug: "virtual-ai-employees",
    crumb: "AI employees & gateways",
    badge: "DESIGN + TECHNOLOGY",
    badgeColor: "var(--color-gold-text)",
    title: "One AI employee across your working channels.",
    lede: "The same AI employee can work through Microsoft Teams, Slack, and email while using the same knowledge, skills, and approval rules. Switch channels below to see the interaction.",
    prev: { href: "/concepts/agentic-harness", label: "← Agentic Harness" },
    next: {
      href: "/campaigns/virtual-ai-employees",
      label: "Campaign page →",
    },
  },
  "skills-and-gateways": {
    slug: "skills-and-gateways",
    crumb: "Skills & gateways",
    badge: "STRATEGY",
    badgeColor: "var(--color-plum-text)",
    title: "Write a procedure once, then reuse it across agents.",
    lede: "A skill records your firm's procedure in a versioned, testable format an agent can follow. Gateways make those skills available in Teams, Slack, and email. Browse the library below.",
    prev: { href: "/concepts/agentic-harness", label: "← Agentic Harness" },
    next: {
      href: "/concepts/virtual-ai-employees",
      label: "AI Employees →",
    },
  },
  "agentic-harness": {
    slug: "agentic-harness",
    crumb: "Harness engineering",
    badge: "STRATEGY + TECHNOLOGY",
    badgeColor: "var(--color-plum-text)",
    title: "A model needs a system around it.",
    lede: "An agentic harness connects the model to current context, approved tools, memory, guardrails, and working channels. Those components let it carry a workflow and leave an audit trail. Drag the model below and select a component.",
    prev: { href: "/concepts/hybrid-rag", label: "← Hybrid RAG" },
    next: { href: "/concepts/local-ai", label: "Local AI →" },
  },
  "hybrid-rag": {
    slug: "hybrid-rag",
    crumb: "Hybrid RAG",
    badge: "TECHNOLOGY",
    badgeColor: "var(--color-ice-text)",
    title: "Your files, turned into something an AI can reason over.",
    lede: "Most of your company's knowledge lives in unstructured files. Hybrid RAG converts them into two complementary structures: a vector database for meaning and a knowledge graph for facts. Scroll to watch it happen.",
    prev: {
      href: "/concepts/context-engineering",
      label: "← Context engineering",
    },
    next: { href: "/concepts/agentic-harness", label: "Agentic Harness →" },
  },
};

/**
 * "What breaks without it" ties each concept to the production failure it
 * prevents. Scar tissue, not vocabulary: a competitor's "our engineer could
 * DIY this in two weeks" lands unless the failure mode is named.
 */
export const conceptFailures: Record<
  string,
  { headline: string; body: string; demo?: string; production?: string }
> = {
  "agentic-harness": {
    headline: "The demo dies quietly by week six.",
    body: "A demo can start answering from stale files within weeks, with no record of which retrieval produced the response. A production harness adds versioned skills, approval records, staleness alerts, and a replaceable model interface. These controls are easy to miss in a demo and essential once people rely on the workflow.",
    demo: "Week one: the model answers everything, the room is impressed, and someone says it could take over the whole intake queue by Christmas.",
    production:
      "Week six: the files have gone stale, two answers were wrong, and nobody can identify which retrieval produced them. The pilot loses its users.",
  },
  "context-engineering": {
    headline: "The right answer, from the wrong year.",
    body: "A model can retrieve the 2021 specification, a superseded rate card, or a policy that is two revisions old. It cannot identify missing context unless the retrieval system supplies dates, authority, and exclusions. Context engineering gives each answer a traceable source and records which material was left out.",
  },
  "hybrid-rag": {
    headline: "Keyword search can't answer why.",
    body: 'Keyword search can find documents that mention the right terms, but it cannot reliably answer "Which contracts changed after the reorganization?" That question depends on relationships among people, projects, dates, and agreements. A vector database finds related language; a knowledge graph resolves the relationships and gives the answer traceable reasons.',
  },
  "local-ai": {
    headline: "The bill spikes the month adoption succeeds.",
    body: "A lightly used pilot can hide the cost of metered APIs. When adoption increases, teams may begin rationing queries to control the bill. For stable, high-volume workloads, local inference can replace per-token charges with hardware depreciation, electricity, and support costs while keeping data on site.",
  },
  "skills-and-gateways": {
    headline: "Your best prompt lives in one person's notes.",
    body: "A useful prompt stored in one person's notes has no version history, tests, or clear owner. Other teams copy and alter it, and the organization loses track of which version produced a result. Writing the procedure as a skill adds version control, tests for drift, and reuse across agents.",
  },
  "virtual-ai-employees": {
    headline: "A chatbot answers; nobody finishes.",
    body: "A chatbot can answer a question while leaving the underlying task untouched. The quote still waits for someone to open the ERP, copy the numbers, and route the approval. An AI employee carries the request through those steps under human supervision and reports the workflow status until the work is complete.",
  },
};
