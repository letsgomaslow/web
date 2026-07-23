import { FIXED_FEE_MONTHLY_TAG, FIXED_FEE_TAG } from "./pricing";

export const serviceStages = [
  { num: "01", name: "Assess", q: "Where does AI pay?", anchor: "#assess" },
  {
    num: "02",
    name: "Structure",
    q: "Make your data usable",
    anchor: "#structure",
  },
  { num: "03", name: "Build", q: "Engineer the harness", anchor: "#build" },
  { num: "04", name: "Deploy", q: "Put agents to work", anchor: "#deploy" },
  { num: "05", name: "Own", q: "Bring it in-house", anchor: "#own" },
];

export const serviceCatalog = [
  {
    id: "assess",
    num: "01",
    accent: "#A070A6",
    name: "Assess & plan",
    desc: "Before anything is built: find where AI actually pays in your business, and what it will really cost.",
    services: [
      {
        name: "AI readiness assessment",
        desc: "A structured review of your data, workflows, tooling, and governance, scored against the transformation journey.",
        fit: "you don't know where to start",
        deliverable: "READINESS REPORT + STAGE SCORE",
      },
      {
        name: "Workflow discovery",
        desc: 'We shadow your teams, map the workflows, and rank them by AI payback: effort vs. impact, with honest "don\'t bother"s.',
        fit: "you suspect AI could help but can't name where",
        deliverable: `RANKED OPPORTUNITY MAP · ${FIXED_FEE_TAG}`,
      },
      {
        name: "Cost & architecture sketch",
        desc: "For a chosen workflow: the harness design, data pipeline, and cloud-vs-local cost curve on one page.",
        fit: "you need a business case the board will read",
        deliverable: "1-PAGE ARCHITECTURE + COST CURVE",
      },
    ],
  },
  {
    id: "structure",
    num: "02",
    accent: "#73C1AE",
    name: "Structure your knowledge",
    desc: "Your unstructured files become infrastructure: a vector database for meaning, a knowledge graph for facts.",
    services: [
      {
        name: "Knowledge foundation build",
        desc: "Full ingestion of your files, shares, and mailboxes into a hybrid RAG stack: chunked, embedded, entity-extracted, cited.",
        fit: "answers exist somewhere but nobody can find them",
        deliverable: "VECTOR DB + KNOWLEDGE GRAPH",
      },
      {
        name: "Freshness pipelines",
        desc: "Continuous sync so your AI never lives in last quarter: connectors, change detection, staleness monitoring.",
        fit: "you built RAG once and it quietly rotted",
        deliverable: "LIVE SYNC + STALENESS ALERTS",
      },
      {
        name: "Context audit",
        desc: "We trace ten real questions through your existing AI setup and show exactly where retrieval fails, and why.",
        fit: "you have AI but the answers disappoint",
        deliverable: "RETRIEVAL GAP REPORT",
      },
    ],
  },
  {
    id: "build",
    num: "03",
    accent: "#EBA93D",
    name: "Build the harness",
    desc: "The engineering around the model: skills, tools, memory, and guardrails that turn intelligence into dependable work.",
    services: [
      {
        name: "Custom agentic harness",
        desc: "A harness engineered for your workflow: model-agnostic, with approvals, audit trail, and escalation built in.",
        fit: "off-the-shelf agents don't fit how you work",
        deliverable: "PRODUCTION HARNESS",
      },
      {
        name: "Skills authoring",
        desc: "Your procedures, written with your domain experts as versioned, testable skills, reusable across every agent.",
        fit: "your know-how lives in a few people's heads",
        deliverable: "SKILL LIBRARY (VERSIONED)",
      },
      {
        name: "Gateway integrations",
        desc: "Secure connectors into Microsoft Teams, Slack, and email, plus your CRM, ERP, and document systems as scoped tools.",
        fit: "AI should show up where work already happens",
        deliverable: "CHANNEL + TOOL CONNECTORS",
      },
    ],
  },
  {
    id: "deploy",
    num: "04",
    accent: "#469DBB",
    name: "Deploy AI employees",
    desc: "Agents go to work inside your channels: supervised, cited, and measured against the workflow they own.",
    services: [
      {
        name: "Virtual AI employee pilot",
        desc: "One agent, one workflow, one channel: live in weeks, with human approval on every consequential action.",
        fit: "you want proof before commitment",
        deliverable: "6-WEEK SUPERVISED PILOT",
      },
      {
        name: "Workforce rollout",
        desc: "Scale from one agent to a roster: shared skills, shared memory, per-team guardrails, and usage analytics.",
        fit: "the pilot worked and teams are asking for more",
        deliverable: "MULTI-AGENT DEPLOYMENT",
      },
      {
        name: "Team enablement",
        desc: "Training for the humans: how to direct, correct, and audit AI employees, turning skeptics into operators.",
        fit: "adoption is your bottleneck, not technology",
        deliverable: "TRAINING + PLAYBOOKS",
      },
    ],
  },
  {
    id: "own",
    num: "05",
    accent: "#192332",
    name: "Own your infrastructure",
    desc: "The mission made literal: models on your hardware, costs on a flat line, data that never leaves the building.",
    services: [
      {
        name: "Local AI deployment",
        desc: "Hardware sizing, procurement guidance, and open models tuned to your workload, run entirely on premises.",
        fit: "metered bills or data egress keep you up at night",
        deliverable: "ON-PREM INFERENCE STACK",
      },
      {
        name: "Hybrid model estate",
        desc: "Routing between local and frontier models per task: privacy and cost locally, peak capability when it pays.",
        fit: "you want the best of both, automatically",
        deliverable: "MODEL ROUTER + POLICY",
      },
      {
        name: "Managed operations",
        desc: "We run what we built (monitoring, model upgrades, skill maintenance) until your team is ready to take the keys.",
        fit: "no in-house ML ops team (yet)",
        deliverable: FIXED_FEE_MONTHLY_TAG,
      },
    ],
  },
];
