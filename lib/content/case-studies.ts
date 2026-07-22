export const caseStudiesIndex = [
  {
    slug: "infinite-ai-os",
    sector: "MANUFACTURING · REAL ENGAGEMENT",
    art: "linear-gradient(140deg,#86E8CE,#E686B5)",
    metric: "1.33×",
    metricLabel: "base-case enterprise value path (appraisal math)",
    title:
      "Infinite AI OS: from tribal knowledge to an AI operating system in 90 days",
    challenge:
      "Estimating, quoting, reporting and file search all ran on manual effort and knowledge locked in people's heads: high cost to serve and high key-person risk.",
    solution:
      "Four named AI employees (a manager and three specialists) working in Microsoft Teams, standing on a six-layer root system: company memory, knowledge map, file intake, profiles, tool connectors and observability.",
    results: [
      "4 AI employees live in Teams",
      "3 core systems in production",
      "90 days idea → foundation",
    ],
    stack: ["VIRTUAL_EMPLOYEES", "KNOWLEDGE_GRAPH", "TEAMS_GATEWAY", "HARNESS"],
    href: "/case-studies/infinite-ai-os",
  },
  {
    slug: "agenthub",
    sector: "HEALTHCARE ENTERPRISE · REAL ENGAGEMENT",
    art: "linear-gradient(140deg,#4C4C4C,#F37779)",
    metric: "93%",
    metricLabel: "intent-routing accuracy across a 28-case live test suite",
    title: "AgentHub: an AI hub that reviews contracts, not just stores prompts",
    challenge:
      "Knowledge workers had no shared home for prompts that work, and no fast, trustworthy way to interrogate dense Statement-of-Work documents.",
    solution:
      "A department-organised prompt library as the front door; behind it, an agentic SOW reviewer with parallel vector + knowledge-graph retrieval, field-level citations, and a generative-UI chat that answers in charts, tables and drafted documents.",
    results: [
      "Field-level citations",
      "7 generative-UI widgets",
      "50-SOW grounded corpus",
    ],
    stack: ["HYBRID_RAG", "KNOWLEDGE_GRAPH", "GENERATIVE_UI", "INTENT_ROUTING"],
    href: "/case-studies/agenthub",
  },
  {
    slug: "financial-knowledge-graph",
    sector: "FINANCIAL SERVICES",
    art: "#121D35",
    metric: "−58%",
    metricLabel: "time-to-answer across compliance teams",
    title: "120,000 documents, one knowledge graph",
    challenge:
      "Decades of contracts, policies and memos scattered across shares. Compliance answers took days of manual digging and senior staff time.",
    solution:
      "Full ingestion pipeline: files chunked and embedded into a vector DB, entities and obligations extracted into a knowledge graph. Hybrid RAG with citations, deployed behind their firewall.",
    results: ["−58% time-to-answer", "100% citation coverage", "14-day ingestion"],
    stack: ["HYBRID_RAG", "KNOWLEDGE_GRAPH", "ON_PREM"],
    href: "#",
  },
  {
    slug: "virtual-paralegal",
    sector: "LEGAL",
    art: "#401877",
    metric: "3.2×",
    metricLabel: "client intake capacity, same headcount",
    title: "A virtual paralegal in the inbox",
    challenge:
      "Intake requests arrived by email at all hours. Partners triaged manually; slow responses were losing engagements to faster firms.",
    solution:
      "A virtual AI employee connected to the shared inbox via an email gateway. It triages intake, drafts engagement letters grounded in precedent, escalates edge cases with full audit trail.",
    results: ["3.2× intake capacity", "<15 min first response", "Zero unreviewed sends"],
    stack: ["VIRTUAL_EMPLOYEE", "EMAIL_GATEWAY", "HARNESS"],
    href: "#",
  },
  {
    slug: "local-ai-factory",
    sector: "MANUFACTURING",
    art: "#192332",
    metric: "−63%",
    metricLabel: "inference cost after moving on-prem",
    title: "Local AI on the factory floor",
    challenge:
      "Cloud AI costs scaled with every query, and sensitive process data was leaving the building to third-party APIs.",
    solution:
      "Right-sized GPU hardware on site, open models fine-tuned on their procedures, and an agentic harness wired into Teams for the floor supervisors.",
    results: ["−63% inference cost", "Zero data egress", "Flat monthly cost curve"],
    stack: ["LOCAL_AI", "OPEN_MODELS", "TEAMS_GATEWAY"],
    href: "#",
  },
];

// Alias for any parallel consumers
export const caseStudyIndex = caseStudiesIndex;

export const infiniteAiOs = {
  clientName: "a private manufacturing group",
  breadcrumb: "Manufacturing",
  tags: [
    { label: "CASE STUDY", variant: "solid" as const },
    { label: "MANUFACTURING", variant: "outline" as const },
    { label: "90-DAY ENGAGEMENT", variant: "navy" as const },
  ],
  title: "From tribal knowledge to an AI operating system, in 90 days.",
  lede:
    "How a private manufacturing group went from idea to a working AI foundation: four AI employees conversing in Microsoft Teams, a searchable company memory, and a defensible path to one-third more enterprise value.",
  metrics: [
    {
      value: "4",
      label: "AI employees hired: named, role-based, managed",
      accent: "#73C1AE",
      dark: false,
    },
    {
      value: "3",
      label: "core systems verified live in production",
      accent: "#A070A6",
      dark: false,
    },
    {
      value: "90",
      label: "days from kickoff to working foundation",
      accent: "#EBA93D",
      dark: false,
    },
    {
      value: "1.33×",
      label: "base-case enterprise value path (appraisal math)",
      accent: "#FFF860",
      dark: true,
    },
  ],
  challengeTitle: "The business ran on knowledge locked in people's heads",
  challengeBody: [
    "A private manufacturing group with one goal: **reduce the cost of operating the business**. Estimating, quoting, reporting and file search all depended on manual effort and tribal knowledge, and on the owner personally. That meant high cost to serve, high key-person risk, and a harder story to tell in any future diligence.",
    "The bet: AI becomes valuable when it's connected to company memory, approved tools and human approval gates, *not* when it's a chat window. So we didn't deploy a chatbot. We built an operating system.",
  ],
  phases: [
    {
      when: "APRIL · DISCOVERY",
      name: "Learn the work",
      desc: "Mapped the workflows, knowledge sources and risk boundaries where AI could remove the most cost.",
      q: "What work should AI support?",
    },
    {
      when: "MAY · PROOF OF CONCEPT",
      name: "Prove the value",
      desc: "Tested AI teammates in Teams and email: estimating support, file intake and report generation.",
      q: "Which patterns earn hardening?",
    },
    {
      when: "JUNE–JULY · BUILD",
      name: "Build the foundation",
      desc: "The durable root system: memory, knowledge map, profiles, tool connectors and observability.",
      q: "What makes AI repeatable?",
    },
  ],
  team: [
    {
      initial: "A",
      name: "Abby",
      role: "CHIEF OF STAFF · MANAGER",
      desc: "Assigns work, tracks evidence, reports up.",
      bg: "#121D35",
      fg: "#FFFFFF",
      border: "#121D35",
      avatarBg: "#73C1AE",
      avatarFg: "#121D35",
      roleColor: "#73C1AE",
    },
    {
      initial: "V",
      name: "Val",
      role: "ESTIMATOR",
      desc: "Turns RFQs and job history into estimate drafts and clarifying questions.",
      bg: "#FFFFFF",
      fg: "#333333",
      border: "#F1F1F1",
      avatarBg: "rgba(160,112,166,.18)",
      avatarFg: "#A070A6",
      roleColor: "#A070A6",
    },
    {
      initial: "J",
      name: "Jacob",
      role: "SCOPE REVIEWER",
      desc: "Red-teams every quote: scope gaps, risks and missing details before approval.",
      bg: "#FFFFFF",
      fg: "#333333",
      border: "#F1F1F1",
      avatarBg: "rgba(235,169,61,.18)",
      avatarFg: "#B06A1F",
      roleColor: "#EBA93D",
    },
    {
      initial: "L",
      name: "Lucy",
      role: "COMMUNICATIONS",
      desc: "Turns technical progress into client-ready reports, emails and updates.",
      bg: "#FFFFFF",
      fg: "#333333",
      border: "#F1F1F1",
      avatarBg: "rgba(115,193,174,.2)",
      avatarFg: "#3E8A75",
      roleColor: "#73C1AE",
    },
  ],
  roots: [
    {
      num: "01",
      name: "Company memory",
      desc: "Meaning-based search finds concepts, not just filenames.",
    },
    {
      num: "02",
      name: "Knowledge map",
      desc: "Connects people, projects, systems and decisions.",
    },
    {
      num: "03",
      name: "File intake",
      desc: "SharePoint and file drives flow into AI-usable context.",
    },
    {
      num: "04",
      name: "Employee profiles",
      desc: "Role-specific instructions, tools, boundaries and handoffs.",
    },
    {
      num: "05",
      name: "Tool connectors",
      desc: "Teams, email, Odoo, reporting. Approved access only.",
    },
    {
      num: "06",
      name: "Observability",
      desc: "Every AI action traced, scored and reviewable.",
    },
  ],
  status: [
    {
      name: "AI communication channels",
      desc: "All four AI employees responding on their Teams paths",
      badge: "LIVE",
      badgeBg: "rgba(44,213,82,.12)",
      badgeFg: "#1E9E3E",
      dot: "#2CD552",
    },
    {
      name: "Meaning-based company memory",
      desc: "Search engine verified in production, v1.18",
      badge: "LIVE",
      badgeBg: "rgba(44,213,82,.12)",
      badgeFg: "#1E9E3E",
      dot: "#2CD552",
    },
    {
      name: "Conversation continuity",
      desc: "AI employees remember context across sessions",
      badge: "LIVE",
      badgeBg: "rgba(44,213,82,.12)",
      badgeFg: "#1E9E3E",
      dot: "#2CD552",
    },
    {
      name: "Business system connectors (Odoo/ERP)",
      desc: "Built and connected; completing stability review before rollout",
      badge: "HARDENING",
      badgeBg: "rgba(235,169,61,.15)",
      badgeFg: "#B06A1F",
      dot: "#EBA93D",
    },
    {
      name: "Self-improvement scaffolding",
      desc: "Foundation in place; becomes the improvement engine next phase",
      badge: "PILOT",
      badgeBg: "#E6EAF3",
      badgeFg: "#4F3A6E",
      dot: "#A070A6",
    },
  ],
  valueScenarios: [
    {
      value: "1.12×",
      name: "Conservative",
      detail: "+5% EBITDA · 4.00× multiple",
      highlight: false,
      color: "#73C1AE",
    },
    {
      value: "1.33×",
      name: "Base case",
      detail: "+15% EBITDA · 4.35× multiple",
      highlight: true,
      color: "#FFF860",
    },
    {
      value: "1.65×",
      name: "Proven ROI",
      detail: "+30% EBITDA · 4.75× multiple",
      highlight: false,
      color: "#A070A6",
    },
  ],
  services: [
    { name: "Knowledge foundation build", href: "/services#structure" },
    { name: "Custom agentic harness", href: "/services#build" },
    { name: "Gateway integrations", href: "/services#build" },
    { name: "Virtual AI employee pilot", href: "/services#deploy" },
  ],
  quote:
    "The first 90 days built the root system. The next 90 turn it into measured business results.",
  quoteAttr: "90-DAY PROGRESS REPORT TO STAKEHOLDERS",
  ctaTitle: "Your business could have its own AI OS in 90 days.",
  ctaLede:
    "Same playbook: learn the work, prove the value, build only what earns it.",
};

export const agentHub = {
  clientName:
    "a global healthcare company's internal innovation program",
  breadcrumb: "Enterprise AI Hub",
  tags: [
    { label: "CASE STUDY", variant: "solid" as const },
    { label: "HEALTHCARE ENTERPRISE", variant: "outline" as const },
    { label: "AGENTHUB", variant: "navy" as const },
  ],
  title:
    "An enterprise AI hub that reviews contracts, not just stores prompts.",
  lede:
    "Built for a global healthcare company's internal innovation program under the Maslow AI brand: a department-organised prompt library as the front door; behind it, a Statement-of-Work review agent with graph-augmented retrieval, field-level citations, and a chat that answers in charts, tables and drafted documents instead of walls of text.",
  metrics: [
    {
      value: "7",
      label: "generative-UI widgets the agent can answer with",
      accent: "#73C1AE",
      dark: false,
    },
    {
      value: "93%",
      label: "intent-routing accuracy on a 28-case live test suite",
      accent: "#FFF860",
      dark: true,
    },
    {
      value: "50",
      label: "SOW corpus, chunked by document structure",
      accent: "#A070A6",
      dark: false,
    },
    {
      value: "11",
      label: "departments in the curated prompt library",
      accent: "#EBA93D",
      dark: false,
    },
  ],
  challengeTitle: "Two problems wearing one interface",
  challengeBody: [
    'Enterprise knowledge workers had no shared home for the prompts that actually work, and no fast, trustworthy way to interrogate dense Statement-of-Work documents. "What are the termination terms?" meant an afternoon of reading. "Where\'s the duplicate-spend risk across these vendors?" meant nobody checked.',
    "So AgentHub is two products in one: a curated, community-style **prompt library** organised by department as the front door, and an **agentic SOW reviewer** as the engine, grounded in the documents themselves.",
  ],
  departments: [
    "Marketing",
    "Legal",
    "R&D",
    "Finance",
    "Supply Chain",
    "+6 more",
  ],
  pipeline: [
    {
      num: "01",
      tag: "INGEST",
      name: "Structure-aware chunking",
      desc: "Contracts are chunked by document structure (not fixed token windows), with breadcrumb metadata (section path, field names) preserved on every chunk.",
    },
    {
      num: "02",
      tag: "EMBED",
      name: "3072-dim embeddings",
      desc: "Each chunk is embedded and stored behind a native vector index: cosine similarity over the full corpus.",
    },
    {
      num: "03",
      tag: "RETRIEVE ×2",
      name: "Two legs in parallel",
      desc: "Dense vector search (top-5) runs alongside a knowledge-graph query for matching entities (vendors, clients, deliverables) plus their one-hop neighbours.",
    },
    {
      num: "04",
      tag: "FUSE",
      name: "Grounded context fusion",
      desc: "Both result sets enter the prompt as labelled context sections, each vector hit carrying its similarity score and source path.",
    },
    {
      num: "05",
      tag: "GENERATE",
      name: "Agentic tool loop",
      desc: "The model answers in a multi-round tool loop, streaming tokens, reasoning and widgets live over server-sent events.",
    },
    {
      num: "06",
      tag: "CITE",
      name: "Field-level citations",
      desc: "Drafted documents cite per-section back to the exact field of the source SOW, auditable by a procurement or legal reviewer.",
    },
  ],
  widgets: [
    { tool: "show_chart", desc: "Bar, line, area and pie charts in brand colors" },
    { tool: "show_data_table", desc: "Sortable column/row comparisons" },
    { tool: "show_stats", desc: "KPI grid with deltas and trend arrows" },
    { tool: "show_plan", desc: "Vertical stepper with task states" },
    {
      tool: "show_options",
      desc: "Clickable choices that feed back into the chat",
    },
    {
      tool: "ask_questions",
      desc: "Multi-step clarifying wizard before drafting",
    },
    {
      tool: "generate_document",
      desc: "Editable sectioned docs with per-section citations",
    },
  ],
  services: [
    { name: "Knowledge foundation build", href: "/services#structure" },
    { name: "Custom agentic harness", href: "/services#build" },
    { name: "Skills authoring", href: "/services#build" },
    { name: "Team enablement", href: "/services#deploy" },
  ],
  quote:
    "The prompt library is the front door. The engineering story is a contract-review agent that shows its sources, down to the exact field.",
  quoteAttr:
    "Live demo deployed · 11-department library · 50-SOW corpus · adoption metrics in progress",
  ctaTitle:
    "Have documents your teams are afraid to ask questions of?",
  ctaLede:
    "We build grounded, citable, explainable review agents on your data, behind your walls.",
};
