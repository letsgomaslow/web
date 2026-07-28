export type ArchitectureCapabilityId =
  | "intake"
  | "briefing"
  | "procedure"
  | "access"
  | "decision"
  | "record";

export type ArchitectureCapability = {
  id: ArchitectureCapabilityId;
  num: string;
  businessLabel: string;
  technicalLabel: string;
  summary: string;
  inspection: string;
  relatedHref: string;
  accent: string;
};

export type ArchitectureWorkflowStep = {
  capabilityId: ArchitectureCapabilityId;
  title: string;
  body: string;
  record: string;
};

export type ArchitectureWorkflow = {
  id: "rfq" | "intake" | "compliance";
  tabLabel: string;
  sector: string;
  title: string;
  lede: string;
  statusLabel: "ILLUSTRATIVE WALKTHROUGH · NOT A CLIENT RESULT";
  steps: ArchitectureWorkflowStep[];
  relatedHref: string;
  relatedLabel: string;
  proofHref?: string;
  proofLabel?: string;
};

export const architectureOverview = {
  eyebrow: "START WITH THE WHOLE SYSTEM",
  title: "The system behind an AI employee",
  desc: "Follow one request through context, procedure, approved tools, human decisions, and a reviewable work record.",
  href: "/concepts/ai-employee-architecture",
  cta: "EXPLORE THE ARCHITECTURE",
} as const;

export const architectureCapabilities: ArchitectureCapability[] = [
  {
    id: "intake",
    num: "01",
    businessLabel: "Work intake",
    technicalLabel: "Gateways + triggers",
    summary:
      "The AI employee receives a message, file, system event, or scheduled responsibility through a channel your team already uses.",
    inspection: "Authorized sender, trigger, channel, and task owner",
    relatedHref: "/concepts/skills-and-gateways",
    accent: "var(--color-ice-text)",
  },
  {
    id: "briefing",
    num: "02",
    businessLabel: "Company briefing",
    technicalLabel: "Context + memory",
    summary:
      "Current source material, prior decisions, and live task state are assembled before the model responds or acts.",
    inspection: "Sources included, dates, exclusions, and prior state",
    relatedHref: "/concepts/context-engineering",
    accent: "var(--color-plum-text)",
  },
  {
    id: "procedure",
    num: "03",
    businessLabel: "Company procedure",
    technicalLabel: "Skills + orchestration",
    summary:
      "Versioned instructions define the steps, checks, handoffs, and specialist roles used to carry the work forward.",
    inspection: "Procedure version, assigned role, checks, and next step",
    relatedHref: "/concepts/skills-and-gateways",
    accent: "var(--color-gold-text)",
  },
  {
    id: "access",
    num: "04",
    businessLabel: "Approved access",
    technicalLabel: "Tools + connectors",
    summary:
      "Scoped connectors let the AI employee read or update only the systems and records required for the task.",
    inspection: "System, permission, requested operation, and result",
    relatedHref: "/concepts/agentic-harness",
    accent: "var(--color-ice-text)",
  },
  {
    id: "decision",
    num: "05",
    businessLabel: "Decision point",
    technicalLabel: "Guardrails + approvals",
    summary:
      "Rules define what the AI employee may complete, where it must pause, and who has authority to approve an exception.",
    inspection: "Boundary reached, exception raised, approver, and decision",
    relatedHref: "/security",
    accent: "var(--color-plum-text)",
  },
  {
    id: "record",
    num: "06",
    businessLabel: "Work record",
    technicalLabel: "State + observability",
    summary:
      "Task state, sources, tool calls, approvals, and the final result remain available for review and the next handoff.",
    inspection: "Status, evidence, actions, approvals, and next owner",
    relatedHref: "/concepts/virtual-ai-employees",
    accent: "var(--color-gold-text)",
  },
];

export const architectureWorkflows: ArchitectureWorkflow[] = [
  {
    id: "rfq",
    tabLabel: "RFQ + estimating",
    sector: "MANUFACTURING",
    title: "RFQ received to approved estimate draft",
    lede:
      "A request arrives with drawings and a due date. The AI employee assembles the job history, follows the estimating procedure, checks approved systems, and pauses when an assumption needs an estimator.",
    statusLabel: "ILLUSTRATIVE WALKTHROUGH · NOT A CLIENT RESULT",
    relatedHref: "/concepts/agentic-harness",
    relatedLabel: "EXPLORE HARNESS ENGINEERING",
    proofHref: "/case-studies/infinite-ai-os",
    proofLabel: "RELATED PRODUCTION WORK",
    steps: [
      {
        capabilityId: "intake",
        title: "Request arrives",
        body: "The shared inbox receives drawings, quantities, and the requested delivery date. The queue assigns an owner and due time.",
        record: "Sender, files, due date, owner",
      },
      {
        capabilityId: "briefing",
        title: "Relevant job history is assembled",
        body: "Current specifications, similar prior jobs, rate cards, and open questions are retrieved with source dates attached.",
        record: "Sources used and material excluded",
      },
      {
        capabilityId: "procedure",
        title: "The estimating procedure runs",
        body: "The AI employee follows the approved checklist, identifies missing inputs, and prepares the work for specialist review.",
        record: "Skill version, checks, exceptions",
      },
      {
        capabilityId: "access",
        title: "Approved systems are queried",
        body: "Read-only connectors retrieve inventory, supplier, and prior-job data required for the draft.",
        record: "Systems queried and returned fields",
      },
      {
        capabilityId: "decision",
        title: "The estimator reviews the exceptions",
        body: "A missing finish specification and any pricing assumption are routed to the estimator before the draft can move forward.",
        record: "Question, approver, response",
      },
      {
        capabilityId: "record",
        title: "The draft returns to the queue",
        body: "The estimate draft, open assumptions, citations, and approval history are stored with the next action and owner.",
        record: "Draft, evidence, status, next owner",
      },
    ],
  },
  {
    id: "intake",
    tabLabel: "Shared inbox intake",
    sector: "PROFESSIONAL SERVICES",
    title: "Client inquiry to partner-reviewed response",
    lede:
      "A new inquiry reaches the shared inbox. The AI employee collects the required facts, applies the intake procedure, drafts from approved precedent, and escalates the relationship decision.",
    statusLabel: "ILLUSTRATIVE WALKTHROUGH · NOT A CLIENT RESULT",
    relatedHref: "/concepts/skills-and-gateways",
    relatedLabel: "EXPLORE SKILLS AND GATEWAYS",
    steps: [
      {
        capabilityId: "intake",
        title: "Inquiry enters the shared queue",
        body: "The email, attachments, sender, and response deadline become one tracked intake item.",
        record: "Sender, attachments, deadline, queue",
      },
      {
        capabilityId: "briefing",
        title: "The client briefing is assembled",
        body: "The AI employee retrieves service criteria, relevant precedent, and any permitted relationship history.",
        record: "Criteria, precedent, source dates",
      },
      {
        capabilityId: "procedure",
        title: "The intake checklist runs",
        body: "Required details are extracted, missing questions are drafted, and the inquiry is routed to the right practice owner.",
        record: "Checklist version, gaps, route",
      },
      {
        capabilityId: "access",
        title: "Approved records are checked",
        body: "Scoped connectors read the CRM, precedent library, and scheduling system without exposing unrelated records.",
        record: "Records read and access scope",
      },
      {
        capabilityId: "decision",
        title: "The practice owner decides",
        body: "The AI employee presents the facts, open risks, and a draft response. The owner approves, edits, or declines.",
        record: "Decision, edits, approver",
      },
      {
        capabilityId: "record",
        title: "The response and handoff are recorded",
        body: "The approved draft, decision basis, and next owner return to the shared queue before anything is sent.",
        record: "Approved draft, status, handoff",
      },
    ],
  },
  {
    id: "compliance",
    tabLabel: "Compliance answer",
    sector: "REGULATED KNOWLEDGE WORK",
    title: "Policy question to cited answer",
    lede:
      "A team member asks how a current obligation applies. The AI employee retrieves the governing sources, resolves the relevant relationships, drafts a cited answer, and routes it for review.",
    statusLabel: "ILLUSTRATIVE WALKTHROUGH · NOT A CLIENT RESULT",
    relatedHref: "/concepts/context-engineering",
    relatedLabel: "EXPLORE CONTEXT ENGINEERING",
    proofHref: "/case-studies/agenthub",
    proofLabel: "RELATED PRODUCTION WORK",
    steps: [
      {
        capabilityId: "intake",
        title: "The question is captured",
        body: "The request, business context, jurisdiction, and response deadline enter a controlled work queue.",
        record: "Question, requester, scope, deadline",
      },
      {
        capabilityId: "briefing",
        title: "Governing sources are retrieved",
        body: "Current policies, agreements, amendments, and related entities are assembled with citations and effective dates.",
        record: "Sources, dates, relationships",
      },
      {
        capabilityId: "procedure",
        title: "The review procedure runs",
        body: "The AI employee applies the approved issue checklist and separates supported findings from unresolved questions.",
        record: "Checklist version, findings, gaps",
      },
      {
        capabilityId: "access",
        title: "Authorized repositories are queried",
        body: "Search and knowledge connectors read the approved corpus and return only records within the requester's scope.",
        record: "Repositories, filters, returned records",
      },
      {
        capabilityId: "decision",
        title: "A reviewer checks the interpretation",
        body: "The cited draft and unresolved points go to the designated reviewer before the answer is distributed.",
        record: "Reviewer, changes, approval",
      },
      {
        capabilityId: "record",
        title: "The answer remains traceable",
        body: "The final answer keeps its citations, review history, and the source versions used at the time.",
        record: "Answer, citations, review, source versions",
      },
    ],
  },
];
