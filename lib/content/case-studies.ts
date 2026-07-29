import type { ArchitectureCapabilityId } from "@/lib/content/architecture";
import type { EvidenceReceiptData } from "@/lib/content/evidence";

export type ArchitectureEvidence = {
  capabilityId: ArchitectureCapabilityId;
  evidence: string;
};

export const caseStudiesIndex = [
  {
    slug: "infinite-ai-os",
    sector: "MANUFACTURING · PRODUCTION ENGAGEMENT",
    art: "linear-gradient(140deg,#86E8CE,#E686B5)",
    metric: "90 days",
    metricLabel: "idea to foundation",
    metricGloss: "",
    evidenceLabel: "PRODUCTION EVIDENCE",
    illustrative: false,
    title:
      "Infinite AI OS: from tribal knowledge to an AI operating system in 90 days",
    challenge:
      "Estimating, quoting, reporting, and file search all ran on manual effort and knowledge locked in people's heads: high cost to serve, and high key-person risk.",
    solution:
      "Four named AI employees (a manager and three specialists) working in Microsoft Teams on a six-layer system: company memory, knowledge map, file intake, profiles, tool connectors, and observability.",
    results: [
      "4 AI employees live in Teams",
      "3 core systems in production",
      "90 days idea to foundation",
    ],
    stack: [
      "AI_EMPLOYEES",
      "KNOWLEDGE_GRAPH",
      "TEAMS_CONNECTION",
      "WORKFLOW_SYSTEM",
    ],
    href: "/case-studies/infinite-ai-os",
  },
  {
    slug: "agenthub",
    sector: "HEALTHCARE ENTERPRISE · DEPLOYED DEMO",
    art: "linear-gradient(140deg,#4C4C4C,#F37779)",
    metric: "93%",
    metricLabel: "expected first-tool routing",
    metricGloss:
      "26 of 28 test cases routed to the expected first tool call through the live streaming pipeline (92.9%).",
    evidenceLabel: "PRODUCTION EVIDENCE",
    illustrative: false,
    title: "AgentHub: a prompt library with a contract-review system",
    challenge:
      "Knowledge workers had no shared home for prompts that work, and no fast, trustworthy way to interrogate dense Statement-of-Work documents.",
    solution:
      "A department-organized prompt library paired with an SOW review system. Parallel vector and knowledge-graph retrieval supports field-level citations, while the chat can return charts, tables, and drafted documents.",
    results: [
      "Field-level citations in drafted SOW sections",
      "50-SOW grounded corpus",
      "7 generative-UI widgets",
    ],
    stack: ["HYBRID_RAG", "KNOWLEDGE_GRAPH", "GENERATIVE_UI", "INTENT_ROUTING"],
    href: "/case-studies/agenthub",
  },
  {
    slug: "financial-knowledge-graph",
    sector: "FINANCIAL SERVICES",
    art: "#121D35",
    metric: "SCENARIO",
    metricLabel: "representative workflow pattern",
    metricGloss: "",
    evidenceLabel: "ILLUSTRATIVE PATTERN",
    illustrative: true,
    title: "120,000 documents, one knowledge graph",
    challenge:
      "Decades of contracts, policies and memos scattered across shares. Compliance answers took days of manual digging and senior staff time.",
    solution:
      "Full ingestion pipeline: files chunked and embedded into a vector DB, entities and obligations extracted into a knowledge graph. Hybrid RAG with citations, deployed behind their firewall.",
    results: [
      "Illustrative time-to-answer model",
      "Citation-backed retrieval",
      "On-prem deployment pattern",
    ],
    stack: ["HYBRID_RAG", "KNOWLEDGE_GRAPH", "ON_PREM"],
    href: "/concepts/ai-employee-architecture/technical#workflow-compliance",
  },
  {
    slug: "virtual-paralegal",
    sector: "LEGAL",
    art: "#401877",
    metric: "SCENARIO",
    metricLabel: "representative workflow pattern",
    metricGloss: "",
    evidenceLabel: "ILLUSTRATIVE PATTERN",
    illustrative: true,
    title: "An AI intake employee in the shared inbox",
    challenge:
      "Intake requests arrived by email at all hours. Partners triaged manually; slow responses were losing engagements to faster firms.",
    solution:
      "An AI employee connected to the shared inbox through an approved email connection. It triages intake, drafts engagement letters from precedent, and escalates edge cases with a full audit trail.",
    results: [
      "Human-reviewed intake",
      "Cited draft responses",
      "Documented escalation path",
    ],
    stack: ["AI_EMPLOYEE", "EMAIL_CONNECTION", "WORKFLOW_SYSTEM"],
    href: "/concepts/ai-employee-architecture/technical#workflow-intake",
  },
  {
    slug: "local-ai-factory",
    sector: "MANUFACTURING",
    art: "#192332",
    metric: "SCENARIO",
    metricLabel: "representative workflow pattern",
    metricGloss: "",
    evidenceLabel: "ILLUSTRATIVE PATTERN",
    illustrative: true,
    title: "Local AI on the factory floor",
    challenge:
      "Cloud AI costs scaled with every query, and sensitive process data was leaving the building to third-party APIs.",
    solution:
      "Right-sized GPU hardware on site, open models fine-tuned on their procedures, and a controlled workflow system connected to Teams for floor supervisors.",
    results: [
      "Modeled cost comparison",
      "No external data transfer",
      "Workload-based capacity plan",
    ],
    stack: ["LOCAL_AI", "OPEN_MODELS", "TEAMS_CONNECTION"],
    href: "/concepts/local-ai",
  },
];

// Alias for any parallel consumers
export const caseStudyIndex = caseStudiesIndex;

export const infiniteAiOs = {
  architectureHref: "/concepts/ai-employee-architecture/technical#workflow-rfq",
  architectureLabel: "FOLLOW THE RFQ ARCHITECTURE",
  architectureMap: [
    {
      capabilityId: "intake",
      evidence: "Teams paths and file intake receive work and source files.",
    },
    {
      capabilityId: "briefing",
      evidence:
        "Company memory and the knowledge map assemble relevant context.",
    },
    {
      capabilityId: "procedure",
      evidence:
        "Employee profiles define roles, instructions, boundaries, and handoffs.",
    },
    {
      capabilityId: "access",
      evidence: "Tool connectors provide approved access to business systems.",
    },
    {
      capabilityId: "decision",
      evidence: "Human approval gates hold consequential actions for review.",
    },
    {
      capabilityId: "record",
      evidence: "Observability makes AI activity traceable and reviewable.",
    },
  ] satisfies ArchitectureEvidence[],
  clientName: "a private manufacturing group",
  breadcrumb: "Manufacturing",
  tags: [
    { label: "CASE STUDY", variant: "solid" as const },
    { label: "MANUFACTURING", variant: "outline" as const },
    { label: "90-DAY ENGAGEMENT", variant: "navy" as const },
  ],
  title: "From tribal knowledge to an AI operating system, in 90 days.",
  lede: "How a private manufacturing group went from idea to a working AI foundation: four AI employees in Microsoft Teams, a searchable company memory, and a plan to measure operating value over the next 90 days.",
  executiveSummary: {
    waitingWork:
      "Estimating, quoting, reporting, and file search depended on manual effort and knowledge held by a few people.",
    whatChanged:
      "A 90-day foundation introduced four named AI employees in Teams, shared company memory, file intake, tool connectors, and an observable operating layer.",
    humanDecision:
      "People retain final approval for sensitive or external actions and decide which pilot patterns move into production.",
    evidenceState:
      "The production foundation and current deployment status are documented. The May proof panels are stylized recreations. Operating-value scenarios remain illustrative.",
  },
  evidence: {
    foundation: {
      claim:
        "The engagement reached a working 90-day foundation with four named AI employees responding in Teams and three listed foundation components live.",
      scope:
        "One private manufacturing engagement and its delivery-status snapshot after the first 90 days.",
      status: "production",
      owner: "Maslow AI delivery team with client workflow owners",
      limitations:
        "Connectors remained in hardening, self-improvement remained a pilot, and operating-value measurement was targeted for day 180.",
    } satisfies EvidenceReceiptData,
    pilotRecreations: {
      claim:
        "These cards recreate workflow patterns explored during the May proof-of-concept phase.",
      scope: "Illustrative Teams, RFQ-review, and reporting interactions.",
      status: "illustrative",
      owner: "Maslow AI delivery team",
      limitations:
        "Names, messages, checklist details, status states, and timing are recreations. Production records and measured outcomes are outside their scope.",
    } satisfies EvidenceReceiptData,
    valueModel: {
      claim:
        "The displayed 1.12x, 1.33x, and 1.65x multipliers model possible future operating-value scenarios.",
      scope:
        "Planning cases that vary EBITDA improvement and valuation multiple assumptions for a small private manufacturer.",
      status: "illustrative",
      owner: "Maslow AI planning model",
      limitations:
        "Realized client results, forecasts, and valuation advice are outside this scenario evidence.",
    } satisfies EvidenceReceiptData,
  },
  metrics: [
    {
      value: "4",
      label: "named, role-based AI employees responding in Teams",
      accent: "#73C1AE",
      dark: false,
      evidenceLabel: "PRODUCTION EVIDENCE",
    },
    {
      value: "3",
      label: "core systems verified live in production",
      accent: "#A070A6",
      dark: false,
      evidenceLabel: "PRODUCTION EVIDENCE",
    },
    {
      value: "90",
      label: "days from kickoff to working foundation",
      accent: "#EBA93D",
      dark: false,
      evidenceLabel: "PRODUCTION EVIDENCE",
    },
    {
      value: "Day 180",
      label: "target for measured operating results",
      accent: "#FFF860",
      dark: true,
      evidenceLabel: "MEASUREMENT IN PROGRESS",
    },
  ],
  challengeTitle: "The business ran on knowledge locked in people's heads",
  challengeBody: [
    "A private manufacturing group with one goal: **reduce the cost of operating the business**. Estimating, quoting, reporting and file search all depended on manual effort and tribal knowledge, and on the owner personally. That meant high cost to serve, high key-person risk, and a harder story to tell in any future diligence.",
    "The bet: AI becomes valuable when it is connected to company memory, approved tools, and human approval gates. A standalone chat window was insufficient, so we built an operating system.",
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
      desc: "Tested AI employees in Teams and email: estimating support, file intake, and report generation.",
      q: "Which patterns earn hardening?",
    },
    {
      when: "JUNE–JULY · BUILD",
      name: "Build the foundation",
      desc: "The production system: company memory, knowledge map, file intake, employee profiles, tool connectors, and observability.",
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
      roleColor: "var(--color-plum-text)",
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
      roleColor: "var(--color-gold-text)",
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
      roleColor: "var(--color-ice-text)",
    },
  ],
  roots: [
    {
      num: "01",
      name: "Company memory",
      desc: "Meaning-based search finds concepts across filenames and folders.",
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
      badgeFg: "#1E7C38",
      dot: "#2CD552",
    },
    {
      name: "Meaning-based company memory",
      desc: "Search engine verified in production, v1.18",
      badge: "LIVE",
      badgeBg: "rgba(44,213,82,.12)",
      badgeFg: "#1E7C38",
      dot: "#2CD552",
    },
    {
      name: "Conversation continuity",
      desc: "AI employees remember context across sessions",
      badge: "LIVE",
      badgeBg: "rgba(44,213,82,.12)",
      badgeFg: "#1E7C38",
      dot: "#2CD552",
    },
    {
      name: "Business system connectors (Odoo/ERP)",
      desc: "Built and connected; completing stability review before rollout",
      badge: "HARDENING",
      badgeBg: "rgba(235,169,61,.15)",
      badgeFg: "#7A5410",
      dot: "#EBA93D",
    },
    {
      name: "Self-improvement scaffolding",
      desc: "Foundation in place; becomes the improvement engine next phase",
      badge: "PILOT",
      badgeBg: "#E6EAF3",
      badgeFg: "#654C8F",
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
      name: "Illustrative high case",
      detail: "+30% EBITDA · 4.75× multiple",
      highlight: false,
      color: "#A070A6",
    },
  ],
  services: [
    { name: "Knowledge foundation build", href: "/services#structure" },
    { name: "Custom workflow system", href: "/services#build" },
    { name: "Channel and system connections", href: "/services#build" },
    { name: "AI employee pilot", href: "/services#deploy" },
  ],
  quote:
    "The first 90 days built the production system. The next 90 measure how it changes operating work.",
  quoteAttr: "DELIVERY STATUS · OPERATING MEASUREMENT IN PROGRESS",
  ctaTitle: "What could a 90-day foundation include for your business?",
  ctaLede:
    "Same playbook: learn the work, prove the value, build only what earns it.",
};

export const agentHub = {
  architectureHref:
    "/concepts/ai-employee-architecture/technical#workflow-compliance",
  architectureLabel: "FOLLOW THE COMPLIANCE ARCHITECTURE",
  architectureMap: [
    {
      capabilityId: "intake",
      evidence:
        "A chat request enters the live streaming pipeline with its task intent.",
    },
    {
      capabilityId: "briefing",
      evidence: "Vector and graph retrieval assemble cited contract context.",
    },
    {
      capabilityId: "procedure",
      evidence:
        "Deterministic intent routing governs the multi-round tool loop.",
    },
    {
      capabilityId: "access",
      evidence:
        "The classified request gates which response tools are available.",
    },
    {
      capabilityId: "record",
      evidence:
        "The Activity Panel exposes searches, tool rounds, and source paths.",
    },
  ] satisfies ArchitectureEvidence[],
  clientName: "a global healthcare company's internal innovation program",
  breadcrumb: "Enterprise AI Hub",
  tags: [
    { label: "CASE STUDY", variant: "solid" as const },
    { label: "HEALTHCARE ENTERPRISE", variant: "outline" as const },
    { label: "AGENTHUB", variant: "navy" as const },
  ],
  title: "An enterprise prompt library with a contract-review system.",
  lede: "Built for a global healthcare company's internal innovation program under the Maslow AI brand: a department-organized prompt library backed by a Statement-of-Work review system with graph retrieval, field-level citations, and structured answers.",
  executiveSummary: {
    waitingWork:
      "Knowledge workers lacked a shared prompt library and a fast way to review dense Statements of Work with traceable source fields.",
    whatChanged:
      "A department prompt library and SOW reviewer now combine vector and graph retrieval, structured response tools, and field-level citations.",
    humanDecision:
      "Procurement and legal reviewers inspect cited source fields and decide whether drafted answers or documents can move forward.",
    evidenceState:
      "The deployed implementation and 26-of-28 first-tool routing result are production evidence. Adoption and business-impact measurement are still in progress.",
  },
  evidence: {
    implementation: {
      claim:
        "The deployed AgentHub includes an 11-department prompt library, a 50-SOW corpus, and seven structured response widgets.",
      scope:
        "The current Maslow-branded deployment for the internal innovation program.",
      status: "production",
      owner: "Maslow AI delivery team",
      limitations:
        "This records deployed implementation scope. Adoption and business-impact measures are still in progress.",
    } satisfies EvidenceReceiptData,
    retrieval: {
      claim:
        "The deployed SOW reviewer combines vector and graph retrieval with field-level citations and a recorded vector-only fallback.",
      scope: "The current 50-SOW corpus and live streaming review pipeline.",
      status: "production",
      owner: "Maslow AI delivery team",
      limitations:
        "Answer quality, adoption, and business impact are outside this implementation evidence.",
    } satisfies EvidenceReceiptData,
    routing: {
      claim:
        "26 of 28 live-pipeline cases selected the expected first tool, displayed as 93% after rounding.",
      scope:
        "A 28-case intent-to-first-tool test suite run through the live streaming pipeline.",
      status: "production",
      owner: "Maslow AI delivery team",
      limitations:
        "The test suite checks expected first-tool selection only. It does not test answer correctness, citation accuracy, retrieval quality, unseen-query reliability, adoption, or business impact.",
    } satisfies EvidenceReceiptData,
    trustControls: {
      claim:
        "The deployed implementation demonstrates contract retrieval, source-field citations, controlled tool routing, and a visible activity record against a 50-SOW corpus.",
      scope:
        "One deployed AgentHub implementation in a healthcare-enterprise engagement.",
      status: "production",
      owner: "Maslow AI delivery team",
      limitations:
        "Legal accuracy, independent security or regulatory certification, organization-wide adoption, and performance on another corpus are outside its scope.",
    } satisfies EvidenceReceiptData,
  },
  metrics: [
    {
      value: "7",
      label: "generative-UI widgets available for structured responses",
      accent: "#73C1AE",
      dark: false,
      evidenceLabel: "PRODUCTION EVIDENCE",
    },
    {
      value: "93%",
      label: "expected first-tool routing on a 28-case live test suite",
      accent: "#FFF860",
      dark: true,
      evidenceLabel: "PRODUCTION TEST RESULT",
    },
    {
      value: "50",
      label: "SOW corpus, chunked by document structure",
      accent: "#A070A6",
      dark: false,
      evidenceLabel: "PRODUCTION EVIDENCE",
    },
    {
      value: "11",
      label: "departments in the curated prompt library",
      accent: "#EBA93D",
      dark: false,
      evidenceLabel: "PRODUCTION EVIDENCE",
    },
  ],
  challengeTitle: "The product needed to support two jobs",
  challengeBody: [
    'Enterprise knowledge workers had no shared home for reviewed prompts, and no fast, trustworthy way to interrogate dense Statement-of-Work documents. "What are the termination terms?" meant an afternoon of reading. "Where\'s the duplicate-spend risk across these vendors?" meant nobody checked.',
    "AgentHub combines a curated **prompt library**, organized by department, with an **SOW review system** grounded in the source documents.",
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
      desc: "Contracts follow their document structure during chunking, with breadcrumb metadata (section path and field names) preserved on every chunk.",
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
      desc: "Dense vector search (top-5) runs alongside a knowledge-graph query for matching entities (vendors, clients, deliverables) plus their one-hop neighbors.",
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
      name: "Multi-step response loop",
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
    {
      tool: "show_chart",
      desc: "Bar, line, area and pie charts in brand colors",
    },
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
    { name: "Custom workflow system", href: "/services#build" },
    { name: "Skills authoring", href: "/services#build" },
    { name: "Team enablement", href: "/services#deploy" },
  ],
  quote:
    "The prompt library is the front door. The engineering story is a contract-review system that shows its sources, down to the exact field.",
  quoteAttr:
    "Live demo deployed · 11-department library · 50-SOW corpus · adoption metrics in progress",
  ctaTitle: "Have documents your teams are afraid to ask questions of?",
  ctaLede:
    "We build grounded, citable review systems within the agreed data and access boundary.",
};
