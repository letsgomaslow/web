import type { EvidenceReceiptData } from "@/lib/content/evidence";

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
  mechanism: string;
  inspection: string;
  relatedHref: string;
  accent: string;
};

export type ArchitectureViewId = "run" | "control" | "improve";

export type ArchitectureMapNodeId =
  | ArchitectureCapabilityId
  | "model"
  | "identity"
  | "boundaries"
  | "execution"
  | "recovery"
  | "observe"
  | "pattern"
  | "proposal"
  | "review"
  | "activation";

export type ArchitectureClaimStatus =
  | "OPERATING PATTERN"
  | "ILLUSTRATIVE CAPABILITY · NOT A PRODUCTION CLAIM";

export type ArchitectureMapNode = {
  id: ArchitectureMapNodeId;
  num: string;
  businessLabel: string;
  technicalLabel: string;
  outcome: string;
  mechanism: string;
  inspection: string;
  viewIds: ArchitectureViewId[];
  claimStatus: ArchitectureClaimStatus;
  relatedHref?: string;
  relatedLabel?: string;
  accent: string;
};

export type ArchitectureMapEdge = {
  id: string;
  viewId: ArchitectureViewId;
  from: ArchitectureMapNodeId;
  to: ArchitectureMapNodeId;
  kind: "primary" | "support" | "feedback";
};

export type ArchitectureView = {
  id: ArchitectureViewId;
  tabLabel: string;
  eyebrow: string;
  title: string;
  summary: string;
  nodeIds: ArchitectureMapNodeId[];
  defaultNodeId: ArchitectureMapNodeId;
  statusLabel?: ArchitectureClaimStatus;
  entryLabel?: string;
  returnLabel?: string;
};

export type ArchitectureWorkflowStep = {
  capabilityId: ArchitectureCapabilityId;
  title: string;
  body: string;
  record: string;
};

export type ArchitectureScenarioOverlay = {
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
  examples: Partial<
    Record<
      ArchitectureViewId,
      Partial<Record<ArchitectureMapNodeId, string>>
    >
  >;
};

export const architectureOverview = {
  eyebrow: "START WITH ONE WAITING WORKFLOW",
  title: "See what the AI prepares, where a person decides, and what remains.",
  desc: "Follow a delayed deliverable from intake to a supervised, reviewable result, then map the same ownership path around your work.",
  href: "/concepts/ai-employee-architecture",
  cta: "SEE THE BUYER VIEW",
  technicalHref: "/concepts/ai-employee-architecture/technical",
  technicalCta: "BROWSE THE TECHNICAL LIBRARY",
} as const;

export type BuyerArchitectureStage = {
  num: string;
  title: string;
  summary: string;
  inspect: string;
};

export const buyerArchitectureStages: BuyerArchitectureStage[] = [
  {
    num: "01",
    title: "Work arrives",
    summary:
      "A request, file, event, or schedule becomes a tracked responsibility with an owner and due state.",
    inspect: "Request, source, due date, owner",
  },
  {
    num: "02",
    title: "The AI prepares",
    summary:
      "Current source material and the approved procedure are assembled before the system drafts or acts.",
    inspect: "Sources, procedure, open questions",
  },
  {
    num: "03",
    title: "A person decides or stops",
    summary:
      "A named owner keeps authority over pricing, risk, exceptions, and external commitments.",
    inspect: "Decision, approver, exception",
  },
  {
    num: "04",
    title: "The result stays reviewable",
    summary:
      "The output returns with its sources, approvals, status, and next owner attached.",
    inspect: "Result, evidence, approval, next step",
  },
];

export const architectureOwnershipEvidence: EvidenceReceiptData = {
  claim:
    "The four-stage ownership path is Maslow's working model for mapping an AI employee workflow.",
  scope:
    "A buyer-facing method for identifying the waiting deliverable, responsible owner, human decision, and review record.",
  status: "illustrative",
  owner: "Maslow AI",
  limitations:
    "Each workflow still requires validation of its sources, controls, decision authority, and recovery path.",
};

const architectureProductionEvidenceByHref: Record<
  string,
  EvidenceReceiptData
> = {
  "/case-studies/infinite-ai-os": {
    claim:
      "The Infinite AI OS engagement includes four named AI employees, company memory, file intake, tool connectors, approval gates, and observable work state.",
    scope: "Published case study for one manufacturing engagement.",
    status: "production",
    owner: "Maslow AI delivery team",
    limitations:
      "The engagement demonstrates delivered architecture and a 90-day foundation. It does not predict results for another workflow.",
    href: "/case-studies/infinite-ai-os",
    linkLabel: "VIEW THE CASE STUDY",
  },
  "/case-studies/agenthub": {
    claim:
      "The AgentHub engagement includes contract retrieval, field-level citations, controlled tool routing, and a visible activity record.",
    scope: "Published case study for one healthcare enterprise engagement.",
    status: "production",
    owner: "Maslow AI delivery team",
    limitations:
      "The case documents a 50-document grounded corpus. It does not predict accuracy or results for a different corpus.",
    href: "/case-studies/agenthub",
    linkLabel: "VIEW THE CASE STUDY",
  },
};

export function architectureProductionEvidenceFor(href: string) {
  return architectureProductionEvidenceByHref[href] ?? null;
}

export type WorkflowMapperQuestionId =
  | "deliverable"
  | "owner"
  | "source"
  | "boundary";

export type WorkflowMapperOption = {
  id: string;
  label: string;
};

export type WorkflowMapperQuestion = {
  id: WorkflowMapperQuestionId;
  eyebrow: string;
  title: string;
  help: string;
  options: WorkflowMapperOption[];
};

export const workflowMapperQuestions: WorkflowMapperQuestion[] = [
  {
    id: "deliverable",
    eyebrow: "THE WAITING WORK",
    title: "Which deliverable keeps getting delayed?",
    help: "Choose the closest pattern. You can add the specific details in a working session.",
    options: [
      { id: "estimate", label: "Estimate or quote" },
      { id: "knowledge-answer", label: "Contract or document answer" },
      { id: "client-response", label: "Client or compliance response" },
      { id: "internal-report", label: "Internal report or approval" },
    ],
  },
  {
    id: "owner",
    eyebrow: "THE RESPONSIBLE PERSON",
    title: "Whose judgment is the work waiting for?",
    help: "Name the role that owns the consequential decision, not the person doing the research.",
    options: [
      { id: "operations", label: "Operations or estimating lead" },
      { id: "finance", label: "Finance leader" },
      { id: "legal", label: "Legal or compliance reviewer" },
      { id: "service", label: "Client or service owner" },
    ],
  },
  {
    id: "source",
    eyebrow: "THE SOURCE OF TRUTH",
    title: "Where does the current information live?",
    help: "The first system can be simple. What matters is that the team agrees which source governs the work.",
    options: [
      { id: "channels", label: "Email, Teams, or Slack" },
      { id: "documents", label: "SharePoint, Drive, or file repository" },
      { id: "systems", label: "CRM, ERP, or business system" },
      { id: "multiple", label: "Several systems and repositories" },
    ],
  },
  {
    id: "boundary",
    eyebrow: "THE HUMAN BOUNDARY",
    title: "What must never happen without a person?",
    help: "This answer defines the stop point before any workflow is designed for production.",
    options: [
      { id: "commitment", label: "Price or business commitment" },
      { id: "interpretation", label: "Risk or policy interpretation" },
      { id: "external", label: "External message or submission" },
      { id: "exception", label: "Exception or missing information" },
    ],
  },
];

export type WorkflowEvidenceStatus =
  | "PRODUCTION ENGAGEMENT"
  | "ILLUSTRATIVE PATTERN";

export type WorkflowMapperPattern = {
  id: string;
  deliverableId: string;
  title: string;
  prepare: string;
  record: string;
  evidenceStatus: WorkflowEvidenceStatus;
  evidenceDescription: string;
  evidenceHref: string;
  evidenceLabel: string;
};

export const workflowMapperPatterns: WorkflowMapperPattern[] = [
  {
    id: "estimate-review",
    deliverableId: "estimate",
    title: "Request to estimator-reviewed draft",
    prepare:
      "The AI employee assembles the request, similar work, rate information, and missing-input questions into an estimate draft.",
    record:
      "The draft returns with its assumptions, sources, estimator decision, and next owner.",
    evidenceStatus: "PRODUCTION ENGAGEMENT",
    evidenceDescription:
      "The Infinite AI OS engagement demonstrates file intake, company memory, role instructions, tool connectors, human approval gates, and observable work state.",
    evidenceHref: "/case-studies/infinite-ai-os",
    evidenceLabel: "VIEW PRODUCTION EVIDENCE",
  },
  {
    id: "cited-answer",
    deliverableId: "knowledge-answer",
    title: "Question to cited, reviewable answer",
    prepare:
      "The AI employee retrieves the governing documents, assembles the relevant facts, and drafts an answer with source-level citations.",
    record:
      "The answer keeps its citations, reviewer changes, and the source versions used at the time.",
    evidenceStatus: "PRODUCTION ENGAGEMENT",
    evidenceDescription:
      "The AgentHub engagement demonstrates contract retrieval, field-level citations, controlled tool routing, and a visible activity record.",
    evidenceHref: "/case-studies/agenthub",
    evidenceLabel: "VIEW PRODUCTION EVIDENCE",
  },
  {
    id: "reviewed-response",
    deliverableId: "client-response",
    title: "Shared request to owner-reviewed response",
    prepare:
      "The AI employee collects the required facts, checks approved precedent, identifies missing details, and prepares a response for review.",
    record:
      "The approved draft, decision basis, and next handoff return to the shared queue before anything is sent.",
    evidenceStatus: "ILLUSTRATIVE PATTERN",
    evidenceDescription:
      "This ownership path is an illustrative workflow. It is not presented as a client deployment or measured result.",
    evidenceHref:
      "/concepts/ai-employee-architecture/technical#workflow-intake",
    evidenceLabel: "OPEN THE ILLUSTRATIVE WALKTHROUGH",
  },
  {
    id: "controlled-report",
    deliverableId: "internal-report",
    title: "Source records to owner-approved report",
    prepare:
      "The AI employee assembles current records, applies the reporting procedure, and marks unsupported or conflicting inputs.",
    record:
      "The report remains attached to the source set, owner decision, unresolved exceptions, and next reporting date.",
    evidenceStatus: "ILLUSTRATIVE PATTERN",
    evidenceDescription:
      "This ownership path is an illustrative workflow. The exact sources, controls, and evidence would need to be validated for the operation.",
    evidenceHref:
      "/concepts/ai-employee-architecture/technical#view-control",
    evidenceLabel: "OPEN THE CONTROL REFERENCE",
  },
];

export const architectureFitBoundaries = [
  {
    status: "START WITH OWNERSHIP",
    title: "No one owns the final decision",
    body: "Name the person who can approve, change, or stop the result before automating the preparation around that decision.",
  },
  {
    status: "PREPARE THE FOUNDATION",
    title: "The source material cannot be trusted",
    body: "Fix ownership, currency, and retrieval of the governing records before asking an AI employee to use them.",
  },
  {
    status: "DO NOT DEPLOY YET",
    title: "There is no review boundary",
    body: "Consequential actions need a defined human decision, escalation path, and work record before production use.",
  },
] as const;

export const architectureCapabilities: ArchitectureCapability[] = [
  {
    id: "intake",
    num: "01",
    businessLabel: "Work arrives",
    technicalLabel: "Channels + triggers + schedules",
    summary:
      "The AI employee receives a message, file, system event, or scheduled responsibility through a channel your team already uses.",
    mechanism:
      "Gateways and event adapters turn each request into a tracked responsibility with an owner and due state.",
    inspection: "Authorized sender, trigger, channel, and task owner",
    relatedHref: "/concepts/skills-and-gateways",
    accent: "var(--color-ice-text)",
  },
  {
    id: "briefing",
    num: "02",
    businessLabel: "Build the briefing",
    technicalLabel: "Context + session and durable memory",
    summary:
      "Current source material, prior decisions, and live task state are assembled before the model responds or acts.",
    mechanism:
      "Retrieval, session recall, and durable memory assemble only the material required for the responsibility.",
    inspection: "Sources included, dates, exclusions, and prior state",
    relatedHref: "/concepts/context-engineering",
    accent: "var(--color-plum-text)",
  },
  {
    id: "procedure",
    num: "03",
    businessLabel: "Apply the procedure",
    technicalLabel: "Skills + orchestration",
    summary:
      "Versioned instructions define the steps, checks, handoffs, and specialist roles used to carry the work forward.",
    mechanism:
      "A reusable skill coordinates the approved sequence, checks, and specialist handoffs for the work.",
    inspection: "Procedure version, assigned role, checks, and next step",
    relatedHref: "/concepts/skills-and-gateways",
    accent: "var(--color-gold-text)",
  },
  {
    id: "access",
    num: "04",
    businessLabel: "Use approved capabilities",
    technicalLabel: "Tools + connectors + delegation",
    summary:
      "Scoped connectors let the AI employee read or update only the systems and records required for the task.",
    mechanism:
      "A governed capability library exposes approved tools, connectors, and specialist tasks to the procedure.",
    inspection: "System, permission, requested operation, and result",
    relatedHref: "/concepts/agentic-harness",
    accent: "var(--color-ice-text)",
  },
  {
    id: "decision",
    num: "05",
    businessLabel: "Reach a decision",
    technicalLabel: "Rules + approvals + escalation",
    summary:
      "Rules define what the AI employee may complete, where it must pause, and who has authority to approve an exception.",
    mechanism:
      "Policy checks compare the work with defined authority and route exceptions to the designated reviewer.",
    inspection: "Boundary reached, exception raised, approver, and decision",
    relatedHref: "/security",
    accent: "var(--color-plum-text)",
  },
  {
    id: "record",
    num: "06",
    businessLabel: "Return the result",
    technicalLabel: "State + trace + checkpoints",
    summary:
      "Task state, sources, tool calls, approvals, and the final result remain available for review and the next handoff.",
    mechanism:
      "Persistent state and checkpoints retain the result, supporting evidence, current status, and next owner.",
    inspection: "Status, evidence, actions, approvals, and next owner",
    relatedHref: "/concepts/virtual-ai-employees",
    accent: "var(--color-gold-text)",
  },
];

const operatingStatus: ArchitectureClaimStatus = "OPERATING PATTERN";
const illustrativeStatus: ArchitectureClaimStatus =
  "ILLUSTRATIVE CAPABILITY · NOT A PRODUCTION CLAIM";

export const architectureMapNodes: ArchitectureMapNode[] = [
  ...architectureCapabilities.map((capability) => ({
    id: capability.id,
    num: capability.num,
    businessLabel: capability.businessLabel,
    technicalLabel: capability.technicalLabel,
    outcome: capability.summary,
    mechanism: capability.mechanism,
    inspection: capability.inspection,
    viewIds:
      capability.id === "decision" || capability.id === "record"
        ? (["run", "control"] as ArchitectureViewId[])
        : (["run"] as ArchitectureViewId[]),
    claimStatus: operatingStatus,
    relatedHref: capability.relatedHref,
    relatedLabel: "OPEN THE DEEP DIVE",
    accent: capability.accent,
  })),
  {
    id: "model",
    num: "M",
    businessLabel: "Model intelligence",
    technicalLabel: "Reasoning engine",
    outcome:
      "The model interprets the assembled briefing and helps produce the next useful step.",
    mechanism:
      "The surrounding system supplies context, instructions, tools, and decision boundaries before requesting reasoning.",
    inspection: "Briefing supplied, requested task, model response, and next action",
    viewIds: ["run"],
    claimStatus: operatingStatus,
    relatedHref: "/concepts/agentic-harness",
    relatedLabel: "EXPLORE HARNESS ENGINEERING",
    accent: "var(--color-plum-text)",
  },
  {
    id: "identity",
    num: "C1",
    businessLabel: "Scoped identity",
    technicalLabel: "Credentials + permissions",
    outcome:
      "Each responsibility operates with a defined identity and the minimum access required for its work.",
    mechanism:
      "Credential stores and role policies scope which systems and operations are available to the AI employee.",
    inspection: "Identity used, permission granted, expiration, and requested operation",
    viewIds: ["control"],
    claimStatus: operatingStatus,
    relatedHref: "/security",
    relatedLabel: "EXPLORE SECURITY",
    accent: "var(--color-ice-text)",
  },
  {
    id: "boundaries",
    num: "C2",
    businessLabel: "Data boundaries",
    technicalLabel: "Retrieval scope + secret handling",
    outcome:
      "The system limits which records enter the briefing and keeps credentials outside the working context.",
    mechanism:
      "Retrieval filters, tenant boundaries, and secret references constrain data before the model receives it.",
    inspection: "Repositories searched, filters applied, records excluded, and secret reference",
    viewIds: ["control"],
    claimStatus: operatingStatus,
    relatedHref: "/concepts/context-engineering",
    relatedLabel: "EXPLORE CONTEXT ENGINEERING",
    accent: "var(--color-plum-text)",
  },
  {
    id: "execution",
    num: "C3",
    businessLabel: "Controlled action",
    technicalLabel: "Isolated execution + tool policies",
    outcome:
      "Approved actions run inside a bounded environment with explicit tool and network policies.",
    mechanism:
      "Execution boundaries separate the task from unrelated systems and restrict the operations a tool can perform.",
    inspection: "Runtime boundary, tool policy, network scope, operation, and result",
    viewIds: ["control"],
    claimStatus: operatingStatus,
    relatedHref: "/concepts/local-ai",
    relatedLabel: "EXPLORE LOCAL AI",
    accent: "var(--color-gold-text)",
  },
  {
    id: "recovery",
    num: "C6",
    businessLabel: "Review and recovery",
    technicalLabel: "Trace + checkpoints + rollback",
    outcome:
      "A reviewer can see what happened, resume interrupted work, or return to an earlier approved state.",
    mechanism:
      "Traces and checkpoints preserve inputs, decisions, state transitions, and restorable versions.",
    inspection: "Checkpoint, interruption, prior state, recovery action, and reviewer",
    viewIds: ["control"],
    claimStatus: operatingStatus,
    relatedHref: "/blog/permissions-approvals-audit-trails",
    relatedLabel: "READ ABOUT REVIEW RECORDS",
    accent: "var(--color-ice-text)",
  },
  {
    id: "observe",
    num: "I1",
    businessLabel: "Observe outcomes",
    technicalLabel: "Results + reviewer feedback",
    outcome:
      "Completed work and reviewer changes can reveal where the operating system needs attention.",
    mechanism:
      "Outcome records collect corrections, exceptions, and approval decisions for later analysis.",
    inspection: "Result, reviewer change, exception, and source record",
    viewIds: ["improve"],
    claimStatus: illustrativeStatus,
    accent: "var(--color-ice-text)",
  },
  {
    id: "pattern",
    num: "I2",
    businessLabel: "Find a repeatable pattern",
    technicalLabel: "Pattern detection + evaluation",
    outcome:
      "Repeated corrections can be separated from one-off preferences before any system change is proposed.",
    mechanism:
      "Evaluation compares similar outcomes and identifies a bounded, evidence-backed opportunity for improvement.",
    inspection: "Examples reviewed, recurrence, exclusions, and confidence basis",
    viewIds: ["improve"],
    claimStatus: illustrativeStatus,
    accent: "var(--color-plum-text)",
  },
  {
    id: "proposal",
    num: "I3",
    businessLabel: "Propose an update",
    technicalLabel: "Memory + skill refinement",
    outcome:
      "The system can draft a specific memory or procedure change without activating it.",
    mechanism:
      "A proposed update names the affected memory or skill, its evidence, and the expected behavior change.",
    inspection: "Proposed diff, evidence, affected responsibilities, and expected outcome",
    viewIds: ["improve"],
    claimStatus: illustrativeStatus,
    relatedHref: "/blog/context-memory-and-skills",
    relatedLabel: "READ ABOUT MEMORY AND SKILLS",
    accent: "var(--color-gold-text)",
  },
  {
    id: "review",
    num: "I4",
    businessLabel: "Review the change",
    technicalLabel: "Human validation + approval",
    outcome:
      "An accountable owner evaluates the proposal, its evidence, and its operating impact.",
    mechanism:
      "The review gate supports approval, revision, rejection, or a limited trial before release.",
    inspection: "Reviewer, decision, edits, test scope, and approval record",
    viewIds: ["improve"],
    claimStatus: illustrativeStatus,
    relatedHref: "/blog/permissions-approvals-audit-trails",
    relatedLabel: "READ ABOUT APPROVALS",
    accent: "var(--color-plum-text)",
  },
  {
    id: "activation",
    num: "I5",
    businessLabel: "Version and monitor",
    technicalLabel: "Release + observation + rollback",
    outcome:
      "An approved update can enter service as a named version with monitoring and a recovery path.",
    mechanism:
      "Versioned activation records what changed, where it applies, how it performs, and how to reverse it.",
    inspection: "Version, release scope, observed results, owner, and rollback point",
    viewIds: ["improve"],
    claimStatus: illustrativeStatus,
    accent: "var(--color-ice-text)",
  },
];

export const architectureViews: ArchitectureView[] = [
  {
    id: "run",
    tabLabel: "Run the work",
    eyebrow: "THE OPERATING LOOP",
    title: "Follow one responsibility from request to result.",
    summary:
      "The architecture stays fixed while the selected workflow changes the example inside each step.",
    nodeIds: [
      "intake",
      "briefing",
      "procedure",
      "access",
      "decision",
      "record",
      "model",
    ],
    defaultNodeId: "intake",
    entryLabel: "REQUEST, EVENT, OR SCHEDULE",
    returnLabel: "DELIVERABLE + WORK RECORD",
  },
  {
    id: "control",
    tabLabel: "Control the work",
    eyebrow: "THE CONTROL PLANE",
    title: "See the boundaries around every action.",
    summary:
      "Identity, data scope, execution policy, human authority, and recovery remain inspectable across the responsibility.",
    nodeIds: [
      "identity",
      "boundaries",
      "execution",
      "decision",
      "record",
      "recovery",
    ],
    defaultNodeId: "identity",
    entryLabel: "DEFINED AUTHORITY",
    returnLabel: "REVIEWABLE STATE",
  },
  {
    id: "improve",
    tabLabel: "Improve the system",
    eyebrow: "A GOVERNED LEARNING LOOP",
    title: "See how review signals could become a safer procedure.",
    summary:
      "This illustrative view shows a possible path from outcomes to a reviewed, versioned system update.",
    nodeIds: ["observe", "pattern", "proposal", "review", "activation"],
    defaultNodeId: "observe",
    statusLabel: illustrativeStatus,
    entryLabel: "WORK RECORD + REVIEWER FEEDBACK",
    returnLabel: "APPROVED MEMORY + PROCEDURE VERSION",
  },
];

export const architectureMapEdges: ArchitectureMapEdge[] = [
  { id: "run-1", viewId: "run", from: "intake", to: "briefing", kind: "primary" },
  { id: "run-2", viewId: "run", from: "briefing", to: "procedure", kind: "primary" },
  { id: "run-3", viewId: "run", from: "procedure", to: "access", kind: "primary" },
  { id: "run-4", viewId: "run", from: "access", to: "decision", kind: "primary" },
  { id: "run-5", viewId: "run", from: "decision", to: "record", kind: "primary" },
  { id: "run-model-1", viewId: "run", from: "model", to: "briefing", kind: "support" },
  { id: "run-model-2", viewId: "run", from: "model", to: "procedure", kind: "support" },
  { id: "run-model-3", viewId: "run", from: "model", to: "access", kind: "support" },
  { id: "control-1", viewId: "control", from: "identity", to: "boundaries", kind: "primary" },
  { id: "control-2", viewId: "control", from: "boundaries", to: "execution", kind: "primary" },
  { id: "control-3", viewId: "control", from: "execution", to: "decision", kind: "primary" },
  { id: "control-4", viewId: "control", from: "decision", to: "record", kind: "primary" },
  { id: "control-5", viewId: "control", from: "record", to: "recovery", kind: "primary" },
  { id: "improve-1", viewId: "improve", from: "observe", to: "pattern", kind: "primary" },
  { id: "improve-2", viewId: "improve", from: "pattern", to: "proposal", kind: "primary" },
  { id: "improve-3", viewId: "improve", from: "proposal", to: "review", kind: "primary" },
  { id: "improve-4", viewId: "improve", from: "review", to: "activation", kind: "primary" },
  { id: "improve-loop", viewId: "improve", from: "activation", to: "observe", kind: "feedback" },
];

export const architectureScenarioOverlays: ArchitectureScenarioOverlay[] = [
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
    examples: {
      run: {
        model:
          "The model reasons over the assembled job briefing and drafts the next estimating step.",
      },
      control: {
        identity:
          "The estimating role receives read access to job history and inventory for this request.",
        boundaries:
          "Retrieval stays within approved suppliers, rate cards, and prior-job records.",
        execution:
          "Inventory and prior-job lookups run through approved read-only connectors.",
        decision:
          "Pricing assumptions pause with the designated estimator before the draft advances.",
        record:
          "The system retains the sources, open assumptions, approval, and next owner.",
        recovery:
          "An interrupted estimate can resume from the last recorded checkpoint without repeating approved work.",
      },
      improve: {
        observe:
          "Estimator edits and approval outcomes could become signals for a later system review.",
        pattern:
          "Repeated missing finish specifications could surface as a recurring intake gap.",
        proposal:
          "The system could propose a required-field check for the estimating procedure.",
        review:
          "An estimating owner would evaluate the proposed check and the examples behind it.",
        activation:
          "An approved check could be released as a named procedure version with a rollback point.",
      },
    },
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
    examples: {
      run: {
        model:
          "The model reasons over the approved client briefing and prepares the next intake step.",
      },
      control: {
        identity:
          "The intake role receives access to the shared queue and permitted relationship records.",
        boundaries:
          "The briefing excludes unrelated client matters and records outside the requester's scope.",
        execution:
          "CRM, precedent, and scheduling lookups run through scoped connectors.",
        decision:
          "The relationship decision remains with the designated practice owner.",
        record:
          "The system retains the approved draft, decision basis, and handoff state.",
        recovery:
          "A paused inquiry can resume from its last reviewed state with the same supporting record.",
      },
      improve: {
        observe:
          "Partner edits and routing changes could become signals for a later intake review.",
        pattern:
          "Repeated requests for the same missing detail could reveal a checklist gap.",
        proposal:
          "The system could propose a new intake question and routing instruction.",
        review:
          "A practice owner would assess the proposal against representative inquiries.",
        activation:
          "An approved revision could enter service as a monitored checklist version.",
      },
    },
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
    examples: {
      run: {
        model:
          "The model reasons over cited governing sources and drafts the next supported finding.",
      },
      control: {
        identity:
          "The compliance role receives access to the approved corpus for the requester's scope.",
        boundaries:
          "Retrieval filters limit sources by jurisdiction, effective date, and permitted repository.",
        execution:
          "Search and relationship resolution run inside the approved knowledge environment.",
        decision:
          "Interpretive findings pause with the designated reviewer before distribution.",
        record:
          "The answer retains citations, source versions, reviewer changes, and approval state.",
        recovery:
          "A later review can return to the cited source set and the prior approval checkpoint.",
      },
      improve: {
        observe:
          "Reviewer corrections and citation changes could become signals for a later system review.",
        pattern:
          "Repeated source-version conflicts could reveal a retrieval or procedure gap.",
        proposal:
          "The system could propose an effective-date check for the review procedure.",
        review:
          "A policy owner would evaluate the change against approved examples and exceptions.",
        activation:
          "An approved check could be released as a monitored procedure version with rollback history.",
      },
    },
  },
];
