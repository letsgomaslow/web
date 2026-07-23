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
    accent: "#73C1AE",
    name: "Ingestion",
    desc: "Every file format, every silo, chunked with structure and metadata intact.",
  },
  {
    num: "02",
    accent: "#A070A6",
    name: "Structuring",
    desc: "Vector DB for meaning, knowledge graph for facts:",
    link: { href: "/concepts/hybrid-rag", label: "hybrid RAG" },
  },
  {
    num: "03",
    accent: "#EBA93D",
    name: "Freshness",
    desc: "Sync pipelines so your AI never lives in last quarter. Stale data is worse than none.",
  },
  {
    num: "04",
    accent: "#469DBB",
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
    accent: "#73C1AE",
    featured: false,
  },
  {
    tag: "TIER 2",
    name: "Server",
    price: "from ~$45k",
    desc: "Rack-mounted multi-GPU inference. Department-scale virtual employees with headroom for growth.",
    accent: "#FFF860",
    featured: true,
  },
  {
    tag: "TIER 3",
    name: "Cluster",
    price: "custom",
    desc: "Multi-node estate for org-wide workloads, fine-tuning and redundancy. Designed with your IT team.",
    accent: "#A070A6",
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
    accent: "#73C1AE",
    title: "Overnight triage",
    desc: "42 inbound emails sorted, classified and routed before anyone logs in.",
  },
  {
    time: "09:30",
    accent: "#A070A6",
    title: "Grounded drafts",
    desc: "Replies drafted with citations, queued in Teams for one-tap approval.",
  },
  {
    time: "14:00",
    accent: "#EBA93D",
    title: "Smart escalation",
    desc: "A contract conflict it can't resolve goes to the right human, with full context attached.",
  },
  {
    time: "18:00",
    accent: "#469DBB",
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
    summary: "Classify, prioritise and route new client requests.",
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
      "Shared across all your virtual employees",
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
    desc: "Where the agent meets your organisation: Microsoft Teams, Slack, shared inboxes. No new app to learn; the AI shows up where work already happens.",
    bullets: [
      "Teams, Slack and email connectors",
      "One agent, many channels",
      "Notifications and approvals in-flow",
    ],
  },
];

export const harnessPayoffs = [
  {
    accent: "#73C1AE",
    title: "Model-agnostic",
    desc: "Swap the core (frontier API today, local open model tomorrow) without rebuilding the workflow. The harness is the constant.",
  },
  {
    accent: "#A070A6",
    title: "Dependable by design",
    desc: "Guardrails, approvals and audit trails live in the harness, so reliability is engineered, not hoped for.",
  },
  {
    accent: "#EBA93D",
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
    accent: "#73C1AE",
    title: "Finds by meaning",
    desc: '"Find everything similar to this." Great for fuzzy questions, summaries, and discovering related material.',
    example: '"What do our contracts say about early termination?"',
    dark: false,
  },
  {
    kind: "KNOWLEDGE GRAPH",
    accent: "#A070A6",
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
    badgeColor: "#73C1AE",
    title: "Your AI is only as smart as its briefing.",
    lede: "Before a model acts, it reads a briefing: the context. Context engineering decides what earns a place in it. Try it yourself: build the briefing below and watch the answer change.",
    next: { href: "/concepts/hybrid-rag", label: "Hybrid RAG →" },
  },
  "local-ai": {
    slug: "local-ai",
    crumb: "Local AI",
    badge: "TECHNOLOGY",
    badgeColor: "#73C1AE",
    title: "Own the hardware. Flatten the bill.",
    lede: "Cloud AI bills grow with every query. Local AI is an investment: buy the hardware once, run open models on it, and watch cost per query fall toward electricity. Use the calculator to find your breakeven.",
    prev: { href: "/concepts/agentic-harness", label: "← Agentic Harness" },
  },
  "virtual-ai-employees": {
    slug: "virtual-ai-employees",
    crumb: "Virtual AI employees & gateways",
    badge: "DESIGN + TECHNOLOGY",
    badgeColor: "#EBA93D",
    title: "One teammate. Every channel your business runs on.",
    lede: "A virtual AI employee isn't another app to log into. Through gateways, the same agent shows up in Microsoft Teams, Slack and email: same knowledge, same skills, same guardrails. Switch channels below.",
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
    badgeColor: "#A070A6",
    title: "Teach it once. Every agent knows it. Every channel has it.",
    lede: "A skill is your firm's way of doing something, written down so an agent can follow it, versioned and testable like code, not buried in a prompt. Gateways carry those skills into Teams, Slack and email. Browse the library below.",
    prev: { href: "/concepts/agentic-harness", label: "← Agentic Harness" },
    next: {
      href: "/concepts/virtual-ai-employees",
      label: "Virtual AI Employees →",
    },
  },
  "agentic-harness": {
    slug: "agentic-harness",
    crumb: "Harness engineering",
    badge: "STRATEGY + TECHNOLOGY",
    badgeColor: "#A070A6",
    title: "What surrounds the model matters more than the model.",
    lede: "A raw model is potential, not performance. The agentic harness is the engineered structure around it (context, skills, tools, memory, guardrails and gateways) that turns intelligence into dependable work. Drag the model below; tap any component.",
    prev: { href: "/concepts/hybrid-rag", label: "← Hybrid RAG" },
    next: { href: "/concepts/local-ai", label: "Local AI →" },
  },
  "hybrid-rag": {
    slug: "hybrid-rag",
    crumb: "Hybrid RAG",
    badge: "TECHNOLOGY",
    badgeColor: "#73C1AE",
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
 * "What breaks without it" — each concept tied to the production failure it
 * prevents. Scar tissue, not vocabulary: a competitor's "our engineer could
 * DIY this in two weeks" lands unless the failure mode is named.
 */
export const conceptFailures: Record<
  string,
  { headline: string; body: string }
> = {
  "agentic-harness": {
    headline: "The demo dies quietly by week six.",
    body: "Without a harness, the demo that wowed the boardroom answers from stale files by week six, nobody can say why, and the pilot dies quietly. The harness is what makes AI boring enough to trust: versioned skills you can diff, approvals that leave an audit trail, staleness alerts before wrong answers ship, and a model you can swap without rebuilding anything. DIY stacks skip this part first — it's invisible in a demo and load-bearing in production.",
  },
  "context-engineering": {
    headline: "The right answer, from the wrong year.",
    body: "Without context discipline, the model retrieves the right answer from the wrong year: the 2021 spec, the superseded rate card, the policy two revisions old. Every answer sounds confident, because the model can't know what it wasn't shown. Context engineering is the difference between an assistant that happens to be right and a system that can say where its answer came from — and what it deliberately left out.",
  },
  "hybrid-rag": {
    headline: "Keyword search can't answer why.",
    body: 'Without hybrid retrieval you get keyword search with better manners: it finds documents that mention the words, then goes quiet the moment you ask why. "Which contracts changed after the reorg?" needs relationships — people, projects, dates — not string matches. Pure-vector stacks hit the same wall from the other side: everything is vaguely similar and nothing is precisely true. The graph is what lets an answer cite its reasons.',
  },
  "local-ai": {
    headline: "The bill spikes the month adoption succeeds.",
    body: "The pilot was cheap because nobody used it; the rollout is expensive because everyone does. On metered APIs the bill spikes in exactly the month adoption succeeds, so teams start rationing questions — quietly killing the habit the whole project existed to build. Local inference flips the curve: flat cost, privacy that's physics, and success stops being the expensive outcome.",
  },
  "skills-and-gateways": {
    headline: "Your best prompt lives in one person's notes.",
    body: "Without a skills library, your best prompt is unversioned, untested, and gone when its author is. Every team reinvents it a little worse, and nobody can say which version produced last quarter's numbers. Written as skills, procedures get what code got decades ago: versions you can diff, tests that catch drift, and reuse across every agent instead of heroics in one chat window.",
  },
  "virtual-ai-employees": {
    headline: "A chatbot answers; nobody finishes.",
    body: "A chatbot answers questions all day and finishes nothing: the quote still waits for someone to open the ERP, paste the numbers, and route the approval. An AI employee is accountable for the outcome — it carries the request from intake to approved, under a person's supervision, and the workflow's status is its problem. That's the difference between answering about work and doing it.",
  },
};
