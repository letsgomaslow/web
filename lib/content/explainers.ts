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
    desc: "Sync pipelines to reduce stale knowledge through change detection and staleness monitoring.",
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
  "Approved sensitive-data work that passes local quality checks",
];

export const localKeepFrontier = [
  "Novel multi-step reasoning on unfamiliar problems",
  "Long-horizon agentic work with many tools",
  "Low-volume tasks unlikely to justify dedicated local infrastructure",
  "Approved routing can send a defined task to a selected model",
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
    desc: "A reviewed procedure can be adapted for more than one approved channel. Your library becomes an asset that grows.",
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
      "Freshness pipelines that reduce dependence on out-of-date files",
      "Citations on answers grounded in source files",
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
    title: "Both, routed by the task",
    desc: "Meaning for recall, facts for precision, with source references when the retrieval path supplies them.",
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
    title: "Turn scattered files into a briefing you can inspect.",
    lede: "Context engineering decides which source material reaches a model, how current it is, and which citation comes back with the answer.",
    next: { href: "/concepts/hybrid-rag", label: "Hybrid RAG →" },
  },
  "local-ai": {
    slug: "local-ai",
    crumb: "Local AI",
    badge: "TECHNOLOGY",
    badgeColor: "var(--color-ice-text)",
    title: "Choose where each workload and its data should run.",
    lede: "Local AI can keep selected data and model work inside infrastructure you control. Cloud services can remain available for approved tasks. The useful design is a visible boundary between them.",
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
    title: "Turn a working procedure into a reusable capability.",
    lede: "A skill records a repeatable workflow. Gateways connect that procedure to approved systems, with permissions and human decisions kept visible.",
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
    title: "Give the model a controlled path through real work.",
    lede: "An agentic harness scopes the context and tools, pauses for consequential decisions, and records what happened so the workflow can be reviewed.",
    prev: { href: "/concepts/hybrid-rag", label: "← Hybrid RAG" },
    next: { href: "/concepts/local-ai", label: "Local AI →" },
  },
  "hybrid-rag": {
    slug: "hybrid-rag",
    crumb: "Hybrid RAG",
    badge: "TECHNOLOGY",
    badgeColor: "var(--color-ice-text)",
    title: "Ask one question across meaning and facts.",
    lede: "Hybrid RAG can search passages by meaning, follow exact relationships in a knowledge graph, and return the source material used for an answer.",
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
    headline: "The deployment boundary disappears when the demo scales.",
    body: "A lightly used pilot can hide where data travels, how provider terms apply, and what happens when workload volume increases. A production design classifies workloads, records allowed destinations, and measures quality, capacity, failures, and operating cost on the selected infrastructure.",
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

export const conceptStoryJourneys = {
  context: {
    eyebrow: "FROM SOURCE TO BRIEFING",
    title: "What happens before the answer appears?",
    description: "Follow a contract question through the preparation work that makes a grounded answer possible.",
    variant: "knowledge" as const,
    steps: [
      { id: "question", label: "Question", title: "Start with the decision someone needs to make.", body: "An operations lead asks whether invoice 4482 follows the current payment terms. The question defines the task before any source is retrieved.", items: [{ label: "Question", detail: "Does invoice 4482 match the active Vendor X agreement?" }, { label: "Owner", detail: "Operations lead" }], result: "A bounded question with a named owner.", status: "ILLUSTRATIVE WORKFLOW" },
      { id: "sources", label: "Sources", title: "Gather the files that could govern the answer.", body: "The invoice, master agreement, amendment, and current vendor record enter the candidate set with dates and source identity intact.", items: [{ label: "Invoice PDF" }, { label: "2024 MSA amendment" }, { label: "Current vendor record" }], result: "A traceable source set before relevance is decided." },
      { id: "extract", label: "Extraction", title: "Turn pages into usable passages and facts.", body: "Text, tables, headings, dates, parties, and clause references are extracted. Each chunk keeps a path back to its file and page.", items: [{ label: "Passages", detail: "Terms and surrounding clauses" }, { label: "Entities", detail: "Vendor, invoice, agreement, dates" }], result: "Structured material with source locations." },
      { id: "briefing", label: "Briefing", title: "Select current evidence and expose conflicts.", body: "Retrieval ranks relevant passages, resolves the governing agreement, and surfaces the amendment that replaces an older term.", items: [{ label: "Included", detail: "Current amendment section 7.2" }, { label: "Flagged", detail: "Older net-30 reference" }], result: "A compact briefing that shows why each fact was included." },
      { id: "answer", label: "Cited answer", title: "Return an answer that a person can check.", body: "The response states the mismatch and points back to the governing clause. The operations lead keeps the decision to approve the correction.", items: [{ label: "Finding", detail: "Invoice says net-30; current agreement says net-45" }, { label: "Citation", detail: "MSA amendment, section 7.2" }], result: "A reviewable answer and a clear human next step." },
    ],
  },
  hybrid: {
    eyebrow: "VECTOR + GRAPH",
    title: "Why does one question need two kinds of retrieval?",
    description: "Select each stage to see where meaning, relationships, and citations contribute.",
    variant: "knowledge" as const,
    steps: [
      { id: "file", label: "File", title: "Preserve the structure of the source.", body: "A contract PDF becomes headings, clauses, tables, and page references instead of one undifferentiated block of text.", items: [{ label: "Preserved", detail: "Section names, page numbers, parties" }], result: "Source-aware chunks ready for indexing.", status: "ILLUSTRATIVE TECHNICAL PATTERN" },
      { id: "vector", label: "Vector", title: "Use meaning to find likely passages.", body: "Vector search handles fuzzy language. A question about ending an agreement can find clauses titled termination, cancellation, or notice.", items: [{ label: "Best for", detail: "Similarity, themes, broad recall" }, { label: "Limit", detail: "A nearby passage is not automatically a verified fact" }], result: "A ranked set of semantically relevant passages." },
      { id: "graph", label: "Graph", title: "Use relationships to test exact facts.", body: "The graph connects Vendor X to its active agreement, amendment, dates, obligations, and governing clauses.", items: [{ label: "Best for", detail: "Entities, relationships, exact filters" }, { label: "Limit", detail: "Accuracy depends on extraction and upkeep" }], result: "A fact path that can confirm which document governs." },
      { id: "combine", label: "Hybrid", title: "Combine recall with a precise relationship path.", body: "Vector candidates and graph relationships are used together, then only the evidence relevant to this question enters the briefing.", items: [{ label: "Vector", detail: "Candidate clauses" }, { label: "Graph", detail: "Active agreement and amendment" }], result: "A smaller evidence set with fewer unresolved conflicts." },
      { id: "cite", label: "Cite", title: "Make the retrieval path inspectable.", body: "The answer links its claim to the source clause and identifies uncertainty when the available records do not resolve the question.", items: [{ label: "Answer" }, { label: "Source file and section" }, { label: "Uncertainty flag when needed" }], result: "A response a reviewer can verify at the source." },
    ],
  },
  harness: {
    eyebrow: "CONTROLLED EXECUTION",
    title: "Where does human judgment sit in an agent workflow?",
    description: "Follow one request through scoped context, approved tools, a human decision, and a retained trace.",
    variant: "workflow" as const,
    steps: [
      { id: "scope", label: "Scope", title: "Define the task and its stopping point.", body: "The harness receives a request to reconcile one invoice. It knows the permitted sources, expected output, and action it cannot take alone.", items: [{ label: "May", detail: "Read invoice and contract" }, { label: "May not", detail: "Send or approve payment" }], result: "A bounded run with explicit permissions.", status: "ILLUSTRATIVE CONTROL PATTERN" },
      { id: "context", label: "Context", title: "Load only the evidence needed for this run.", body: "Current contract terms and invoice details enter the working context with source references. Irrelevant client files stay outside it.", items: [{ label: "Current contract clause" }, { label: "Invoice line items" }], result: "A task-specific briefing with visible provenance." },
      { id: "tools", label: "Tools", title: "Use narrow capabilities for specific work.", body: "The agent can read approved records and draft a correction. A separate permission boundary blocks sending or changing the accounting record.", items: [{ label: "Read", detail: "Contract and invoice" }, { label: "Draft", detail: "Correction note" }, { label: "Blocked", detail: "Send and payment approval" }], result: "Prepared work without an unauthorized side effect." },
      { id: "decision", label: "Decision", title: "Pause where responsibility changes hands.", body: "The operations lead sees the discrepancy, source clause, and drafted correction before choosing whether to proceed.", items: [{ label: "Decision owner", detail: "Operations lead" }, { label: "Evidence", detail: "Invoice, clause, proposed response" }], result: "A consequential action remains with its accountable person." },
      { id: "trace", label: "Trace", title: "Return a record of the run.", body: "The trace records what was read, which skill version ran, what was proposed, who decided, and what happened next.", items: [{ label: "Inputs" }, { label: "Tool calls" }, { label: "Decision and outcome" }], result: "A run that can be reviewed and improved." },
    ],
  },
  local: {
    eyebrow: "DEPLOYMENT BOUNDARIES",
    title: "Which data stays local, and what may reach the cloud?",
    description: "Inspect the routing decision. The answer depends on the workload, policy, hardware, and approved services.",
    variant: "deployment" as const,
    steps: [
      { id: "classify", label: "Classify", title: "Start with data and decision risk.", body: "Identify sensitive records, latency needs, model capability, expected volume, and the action the output may influence.", items: [{ label: "Data", detail: "Client-confidential documents" }, { label: "Workload", detail: "Repeat document classification" }], result: "A routing requirement grounded in the work.", status: "ILLUSTRATIVE DEPLOYMENT PATTERN" },
      { id: "local", label: "Local", title: "Keep selected work inside your boundary.", body: "A local model can handle repeatable work when measured quality meets the requirement. Documents and prompts remain within the approved local environment.", items: [{ label: "Candidate", detail: "High-volume repeat classification" }, { label: "Verify", detail: "Quality, capacity, recovery" }], result: "A local path with a testable service boundary." },
      { id: "cloud", label: "Cloud", title: "Use an approved service for selected tasks.", body: "A cloud model may fit when a task needs capability or elasticity unavailable locally. Data policy and provider terms still set the boundary.", items: [{ label: "Candidate", detail: "Approved low-volume complex reasoning" }, { label: "Verify", detail: "Data handling, retention, cost" }], result: "A deliberate exception with recorded conditions." },
      { id: "route", label: "Route", title: "Apply policy before selecting a model.", body: "The router checks the workload class and allowed destinations. Ambiguous requests stop for review instead of silently crossing a boundary.", items: [{ label: "Allowed", detail: "Local document classification" }, { label: "Escalate", detail: "Unclassified data or new cloud destination" }], result: "A visible decision at the local and cloud boundary." },
      { id: "observe", label: "Observe", title: "Measure the boundary in operation.", body: "Teams inspect quality, latency, capacity, failures, and route decisions to check whether deployment still matches policy.", items: [{ label: "Quality and latency" }, { label: "Route and failure logs" }, { label: "Human overrides" }], result: "Evidence for tuning without relying on a savings promise." },
    ],
  },
  skills: {
    eyebrow: "SKILL TO SYSTEM",
    title: "How does one approved procedure travel across tools?",
    description: "The reusable asset is the procedure, its permissions, and its review history. Each connection remains separately scoped.",
    variant: "delivery" as const,
    steps: [
      { id: "capture", label: "Capture", title: "Write down the procedure people trust.", body: "A subject-matter owner defines the inputs, sequence, exceptions, output, and decisions for invoice reconciliation.", items: [{ label: "Owner", detail: "Accounts payable lead" }, { label: "Procedure", detail: "Invoice reconciliation" }], result: "A procedure that can be reviewed before automation.", status: "ILLUSTRATIVE DELIVERY PATTERN" },
      { id: "test", label: "Test", title: "Exercise representative and edge cases.", body: "Known matches, discrepancies, missing records, and ambiguous terms reveal where instructions or a human stop need work.", items: [{ label: "Expected cases" }, { label: "Edge cases" }, { label: "Escalation cases" }], result: "A versioned skill with known behavior and limits." },
      { id: "connect", label: "Connect", title: "Give each system only the access the job needs.", body: "CRM can expose vendor identity. The document store can provide the contract. Email can accept a draft without granting send access.", items: [{ label: "CRM", detail: "Read vendor" }, { label: "Documents", detail: "Read agreement" }, { label: "Email", detail: "Create draft" }], result: "Separate least-privilege connections around one skill." },
      { id: "decide", label: "Decide", title: "Keep the consequential step with a person.", body: "The accounts payable lead reviews the mismatch and source before approving a correction or payment change.", items: [{ label: "Human owner" }, { label: "Source evidence" }, { label: "Proposed action" }], result: "The workflow moves after an accountable decision." },
      { id: "reuse", label: "Reuse", title: "Offer the reviewed skill to another approved agent.", body: "The procedure can support an inbox or operations agent when each new channel and permission set is reviewed.", items: [{ label: "Shared", detail: "Procedure and tests" }, { label: "Reviewed again", detail: "Channel, permissions, owner" }], result: "Reusable operating knowledge with scoped access." },
    ],
  },
  infrastructure: {
    eyebrow: "SHARED AI INFRASTRUCTURE",
    title: "Give approved agents the same organizational foundation.",
    description: "Knowledge, memory, skills, connections, and visibility can be managed as shared infrastructure instead of rebuilt inside each agent.",
    variant: "memory" as const,
    steps: [
      { id: "knowledge", label: "Knowledge", title: "Connect the sources the organization governs.", body: "PDFs, images, documents, drives, SharePoint, and business systems can feed a controlled knowledge layer when connectors and indexing are configured.", items: [{ label: "Sources", detail: "Documents, drives, approved systems" }, { label: "Structures", detail: "Search, vectors, knowledge graph" }], result: "A source layer with paths back to origin.", status: "PROPOSED ORGANIZATIONAL SETUP" },
      { id: "memory", label: "Memory", title: "Approve memory before it becomes shared context.", body: "An agent proposes a durable fact or preference. A policy or human reviewer approves it, stores it with scope and provenance, and makes it available to approved agents.", items: [{ label: "Proposed", detail: "Client prefers weekly PDF status" }, { label: "Approved", detail: "Project owner or policy" }, { label: "Scope", detail: "Client project agents" }], result: "Approved memory that keeps its origin visible." },
      { id: "skills", label: "Skills", title: "Store procedures as versioned assets.", body: "A reviewed skill captures how the team performs a recurring job, including exceptions, tests, and the moment a person must decide.", items: [{ label: "Procedure" }, { label: "Tests and version" }, { label: "Decision point" }], result: "One governed procedure for approved agents." },
      { id: "connections", label: "Connections", title: "Connect legacy and modern systems with scoped interfaces.", body: "MCP servers, application APIs, and controlled computer use can expose specific actions from CRM, ERP, email, files, and older tools.", items: [{ label: "Preferred", detail: "Structured API or MCP tool" }, { label: "Fallback", detail: "Controlled computer use where needed" }], result: "A narrow capability map instead of broad access." },
      { id: "visibility", label: "Visibility", title: "See what every run used, proposed, and changed.", body: "Shared traces connect runs to knowledge sources, skill versions, tool calls, approvals, failures, and outcomes.", items: [{ label: "Observe", detail: "Runs, latency, failures" }, { label: "Review", detail: "Sources, actions, decisions" }, { label: "Improve", detail: "Skill and route revisions" }], result: "One review surface for operating the system." },
    ],
  },
} as const;
