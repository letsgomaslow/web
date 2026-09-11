import type { ArchitectureCapabilityId } from "@/lib/content/architecture";
import type { EvidenceReceiptData } from "@/lib/content/evidence";

export type ArchitectureEvidence = {
  capabilityId: ArchitectureCapabilityId;
  evidence: string;
};

export type CaseStudyJourney = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  variant:
    | "knowledge"
    | "memory"
    | "workflow"
    | "deployment"
    | "delivery"
    | "evidence";
  steps: readonly {
    id: string;
    label: string;
    title: string;
    body: string;
    items: readonly { label: string; detail?: string }[];
    result: string;
    status?: string;
  }[];
  afterHref?: string;
  afterLabel?: string;
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
      "Infinite AI OS: a custom manufacturing system built in 90 days",
    challenge:
      "Estimating, quoting, reporting, and file search all ran on manual effort and knowledge locked in people's heads: high cost to serve, and high key-person risk.",
    solution:
      "A custom client system with four named AI employees working in Microsoft Teams across company memory, a knowledge map, file intake, profiles, tool connectors, and observability.",
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
    sector: "HEALTHCARE ENTERPRISE · DEPLOYED CLIENT IMPLEMENTATION",
    art: "linear-gradient(140deg,#4C4C4C,#F37779)",
    metric: "93%",
    metricLabel: "expected first-tool routing",
    metricGloss:
      "26 of 28 test cases routed to the expected first tool call through the live streaming pipeline (92.9%).",
    evidenceLabel: "DEPLOYED IMPLEMENTATION",
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
];

// Alias for any parallel consumers
export const caseStudyIndex = caseStudiesIndex;

export const infiniteAiOs = {
  architectureHref: "/concepts/shared-ai-infrastructure",
  architectureLabel: "EXPLORE THE SHARED INFRASTRUCTURE",
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
  title: "From tribal knowledge to a custom AI operating system in 90 days.",
  lede: "Infinite AI OS is a custom client implementation for a private manufacturing group. It is distinct from Maslow AI-OS, the free Linux product. The engagement delivered four AI employees in Microsoft Teams, searchable company memory, and a foundation for measuring operating value over the next 90 days.",
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
  journey: {
    id: "infinite-ai-os-delivery",
    eyebrow: "CLIENT DELIVERY JOURNEY",
    title: "What moved from owner-held knowledge into a working system",
    description:
      "This progression describes one custom client implementation. Each stage separates delivered scope from the work still being hardened or measured.",
    variant: "evidence",
    steps: [
      {
        id: "problem",
        label: "01 · PROBLEM",
        title: "Important work waited on a few people",
        body: "Estimating, quoting, reporting, and file search depended on manual effort and knowledge held by the owner and experienced staff.",
        items: [
          { label: "Responsible owner", detail: "Client workflow owners" },
          { label: "Waiting work", detail: "Quotes, reports, and file retrieval" },
          { label: "Risk", detail: "High cost to serve and key-person dependence" },
        ],
        result: "A bounded 90-day foundation was selected for delivery.",
        status: "DISCOVERY COMPLETE",
      },
      {
        id: "build",
        label: "02 · BUILD",
        title: "The team made knowledge and procedures reusable",
        body: "Maslow built four role-based AI employees in Teams around shared company memory, a knowledge map, file intake, employee profiles, approved tool connectors, and observability.",
        items: [
          { label: "Manager", detail: "Assigns work and reports status" },
          { label: "Specialists", detail: "Estimate, review scope, and prepare communications" },
          { label: "Operating layer", detail: "Memory, connections, and reviewable activity" },
        ],
        result: "The custom client foundation reached production in 90 days.",
        status: "DELIVERED",
      },
      {
        id: "delivered",
        label: "03 · DELIVERED",
        title: "Four AI employees began responding in Microsoft Teams",
        body: "The production snapshot records four named AI employees and three core systems live. Meaning-based company memory and conversation continuity were verified in the client environment.",
        items: [
          { label: "4", detail: "Named AI employees responding in Teams" },
          { label: "3", detail: "Core systems verified live" },
          { label: "90 days", detail: "Kickoff to working foundation" },
        ],
        result: "A working foundation replaced a collection of disconnected experiments.",
        status: "PRODUCTION EVIDENCE",
      },
      {
        id: "remaining",
        label: "04 · REMAINING",
        title: "Hardening and operating-value measurement continue",
        body: "Business-system connectors remain in hardening, self-improvement remains a pilot, and operating-value measurement is planned for the next phase.",
        items: [
          { label: "Odoo and ERP connections", detail: "Built and connected; stability review continues" },
          { label: "Self-improvement", detail: "Foundation in place; still a pilot" },
          { label: "Operating value", detail: "Future measurement, not a reported result" },
        ],
        result: "The next decision is which proven workflow earns further rollout.",
        status: "IN PROGRESS",
      },
    ],
    afterHref: "/plan-workflow",
    afterLabel: "Map a workflow like this",
  } satisfies CaseStudyJourney,
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
  architectureHref: "/concepts/shared-ai-infrastructure",
  architectureLabel: "EXPLORE THE SHARED INFRASTRUCTURE",
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
      "The deployed implementation and 26-of-28 first-tool routing result are documented implementation evidence. Adoption and business-impact measurement are still in progress.",
  },
  journey: {
    id: "agenthub-delivery",
    eyebrow: "CLIENT DELIVERY JOURNEY",
    title: "How a shared prompt library became a deployed review system",
    description:
      "This progression covers the deployed client implementation and keeps the first-tool routing test separate from answer accuracy and business outcomes.",
    variant: "evidence",
    steps: [
      {
        id: "problem",
        label: "01 · PROBLEM",
        title: "Reviewed prompts and contract knowledge had no shared home",
        body: "Knowledge workers needed one place to find working prompts and a faster way to review dense Statements of Work with traceable source fields.",
        items: [
          { label: "Responsible owners", detail: "Innovation, procurement, and legal reviewers" },
          { label: "Waiting work", detail: "Contract questions, comparisons, and drafted sections" },
          { label: "Required evidence", detail: "Source fields a reviewer can inspect" },
        ],
        result: "The engagement joined discovery and review in one experience.",
        status: "CLIENT PROBLEM",
      },
      {
        id: "build",
        label: "02 · BUILD",
        title: "The team connected retrieval, routing, and structured responses",
        body: "Maslow built an 11-department prompt library with a 50-SOW corpus, parallel vector and graph retrieval, field-level citations, and seven structured response widgets.",
        items: [
          { label: "Knowledge", detail: "Structure-aware contract ingestion and retrieval" },
          { label: "Workflow", detail: "Deterministic intent-to-tool routing" },
          { label: "Review", detail: "Visible activity and source paths" },
        ],
        result: "The system was deployed for the client's internal innovation program.",
        status: "DEPLOYED CLIENT IMPLEMENTATION",
      },
      {
        id: "delivered",
        label: "03 · DELIVERED",
        title: "The live pipeline selected the expected first tool in 26 of 28 cases",
        body: "The 92.9% result, displayed as 93%, measures expected first-tool selection through the live streaming pipeline. It is one routing test for this implementation.",
        items: [
          { label: "26 / 28", detail: "Cases with the expected first tool" },
          { label: "7", detail: "Structured response widgets" },
          { label: "50", detail: "SOWs in the current grounded corpus" },
        ],
        result: "The deployed implementation demonstrates routing and review controls against its current corpus.",
        status: "DEPLOYED IMPLEMENTATION TEST RESULT",
      },
      {
        id: "remaining",
        label: "04 · REMAINING",
        title: "Accuracy, adoption, and business impact require separate evidence",
        body: "The routing test does not establish answer correctness, citation accuracy, retrieval quality, unseen-query reliability, legal accuracy, organization-wide adoption, or business impact.",
        items: [
          { label: "Answer quality", detail: "Outside the first-tool routing test" },
          { label: "Adoption", detail: "Measurement remains in progress" },
          { label: "Business impact", detail: "No outcome percentage is claimed" },
        ],
        result: "The next review should measure the decisions and work products the system supports.",
        status: "MEASUREMENT IN PROGRESS",
      },
    ],
    afterHref: "/plan-workflow",
    afterLabel: "Map a document workflow",
  } satisfies CaseStudyJourney,
  evidence: {
    implementation: {
      claim:
        "The deployed AgentHub includes an 11-department prompt library, a 50-SOW corpus, and seven structured response widgets.",
      scope:
        "The current Maslow-branded deployment for the internal innovation program.",
      status: "implementation",
      owner: "Maslow AI delivery team",
      limitations:
        "This records deployed implementation scope. Adoption and business-impact measures are still in progress.",
    } satisfies EvidenceReceiptData,
    retrieval: {
      claim:
        "The deployed SOW reviewer combines vector and graph retrieval with field-level citations and a recorded vector-only fallback.",
      scope: "The current 50-SOW corpus and live streaming review pipeline.",
      status: "implementation",
      owner: "Maslow AI delivery team",
      limitations:
        "Answer quality, adoption, and business impact are outside this implementation evidence.",
    } satisfies EvidenceReceiptData,
    routing: {
      claim:
        "26 of 28 live-pipeline cases selected the expected first tool, displayed as 93% after rounding.",
      scope:
        "A 28-case intent-to-first-tool test suite run through the live streaming pipeline.",
      status: "implementation",
      owner: "Maslow AI delivery team",
      limitations:
        "The test suite checks expected first-tool selection only. It does not test answer correctness, citation accuracy, retrieval quality, unseen-query reliability, adoption, or business impact.",
    } satisfies EvidenceReceiptData,
    trustControls: {
      claim:
        "The deployed implementation demonstrates contract retrieval, source-field citations, controlled tool routing, and a visible activity record against a 50-SOW corpus.",
      scope:
        "One deployed AgentHub implementation in a healthcare-enterprise engagement.",
      status: "implementation",
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
      evidenceLabel: "DEPLOYED CLIENT IMPLEMENTATION",
    },
    {
      value: "93%",
      label: "expected first-tool routing on a 28-case live test suite",
      accent: "#FFF860",
      dark: true,
      evidenceLabel: "DEPLOYED IMPLEMENTATION TEST RESULT",
    },
    {
      value: "50",
      label: "SOW corpus, chunked by document structure",
      accent: "#A070A6",
      dark: false,
      evidenceLabel: "DEPLOYED CLIENT IMPLEMENTATION",
    },
    {
      value: "11",
      label: "departments in the curated prompt library",
      accent: "#EBA93D",
      dark: false,
      evidenceLabel: "DEPLOYED CLIENT IMPLEMENTATION",
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
    "Deployed client implementation · 11-department library · 50-SOW corpus · adoption metrics in progress",
  ctaTitle: "Have documents your teams are afraid to ask questions of?",
  ctaLede:
    "We build grounded, citable review systems within the agreed data and access boundary.",
};
