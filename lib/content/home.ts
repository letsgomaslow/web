export const metrics: {
  value: string;
  label: string;
  tick: string;
  gates?: string[];
}[] = [
  {
    value: "90 days",
    label:
      "from idea to working foundation, with go/no-go gates at weeks 2, 4, and 10",
    tick: "var(--color-ice-text)",
    gates: ["W2", "W4", "W10"],
  },
  {
    value: "4 AI employees",
    label: "live in one client's Microsoft Teams today",
    tick: "var(--color-plum-text)",
  },
  {
    value: "100%",
    label: "of what we build is yours. No lock-in.",
    tick: "var(--color-gold-text)",
  },
  {
    value: "Fixed fees",
    label: "priced in writing before we start",
    tick: "var(--color-cta-link)",
  },
];

export const whoWeWorkWith = [
  {
    num: "01",
    tick: "var(--color-ice-text)",
    title: "You run on Microsoft 365 or Google Workspace.",
    desc: "Teams, Slack, email, shared drives. Your AI should show up there, not in another tab nobody opens.",
  },
  {
    num: "02",
    tick: "var(--color-plum-text)",
    title: "Your know-how lives in a few senior people.",
    desc: "Estimating, quoting, client intake, compliance answers. These people help you win work, but every request still waits for their time.",
  },
  {
    num: "03",
    tick: "var(--color-gold-text)",
    title: "You don't have an ML team, and you shouldn't need one.",
    desc: "We build systems your existing IT can run, and we stay until they can.",
  },
];

export const concepts = [
  {
    num: "01",
    tick: "var(--color-ice-text)",
    name: "Context engineering",
    desc: "Deciding exactly what your AI sees: the right data, structured and retrievable, at the right moment.",
    href: "/concepts/context-engineering",
  },
  {
    num: "02",
    tick: "var(--color-plum-text)",
    name: "Harness engineering",
    desc: "The scaffolding around a model (skills, tools, memory, and guardrails) that turns raw intelligence into dependable work.",
    href: "/concepts/agentic-harness",
  },
  {
    num: "03",
    tick: "var(--color-ice-text)",
    name: "Hybrid RAG",
    desc: "Your unstructured files, converted into vector databases and knowledge graphs your AI can actually reason over.",
    href: "/concepts/hybrid-rag",
  },
  {
    num: "04",
    tick: "var(--color-gold-text)",
    name: "AI employees",
    desc: "Agents that live where your team works (Teams, Slack, email) and carry whole workflows, not just chats.",
    href: "/concepts/virtual-ai-employees",
  },
  {
    num: "05",
    tick: "var(--color-plum-text)",
    name: "Skills & gateways",
    desc: "Your procedures, written once as reusable skills, shared by every agent, delivered through the channels you already run on.",
    href: "/concepts/skills-and-gateways",
  },
  {
    num: "06",
    tick: "var(--color-ice-text)",
    name: "Local AI",
    desc: "Models on your own hardware: private by default, with a flat monthly cost instead of a metered bill.",
    href: "/concepts/local-ai",
  },
];

export const stages = [
  {
    num: "1",
    name: "Assess",
    desc: "Find where AI actually pays.",
    href: "/services#assess",
  },
  {
    num: "2",
    name: "Structure",
    desc: "Files become a vector DB + knowledge graph.",
    href: "/services#structure",
  },
  {
    num: "3",
    name: "Build",
    desc: "Engineer the agentic harness.",
    href: "/services#build",
  },
  {
    num: "4",
    name: "Deploy",
    desc: "AI employees in your channels.",
    href: "/services#deploy",
  },
  {
    num: "5",
    name: "Own",
    desc: "Local models, flat cost curve.",
    href: "/services#own",
  },
];

export const homeCases = [
  {
    sector: "MANUFACTURING · REAL ENGAGEMENT",
    art: "linear-gradient(140deg,#86E8CE,#E686B5)",
    title: "Infinite AI OS: an AI operating system in 90 days",
    desc: "Four named AI employees working in Microsoft Teams on a six-layer system: company memory, knowledge map, file intake, employee profiles, tool connectors, and observability.",
    result: "4 AI employees live · 90 days to foundation",
    href: "/case-studies/infinite-ai-os",
    cta: "VIEW CASE STUDY",
    openSlot: false,
  },
  {
    sector: "HEALTHCARE ENTERPRISE · REAL ENGAGEMENT",
    art: "linear-gradient(140deg,#4C4C4C,#F37779)",
    title: "AgentHub: contracts you can question",
    desc: "A shared prompt library paired with a contract-review agent that uses hybrid retrieval and cites each answer.",
    result: "Field-level citations · 50-document grounded corpus",
    href: "/case-studies/agenthub",
    cta: "VIEW CASE STUDY",
    openSlot: false,
  },
  {
    sector: "YOUR OPERATION",
    art: "#121D35",
    title: "Your operation could be the third card here.",
    desc: "One workflow, one channel, live in weeks. We'll map where AI pays in a 30-minute working session.",
    result: "",
    href: "/contact",
    cta: "BOOK A WORKING SESSION",
    openSlot: true,
  },
];

export const copilotSection = {
  eyebrow: "IF YOU ALREADY PAY FOR COPILOT",
  h2: "Keep Copilot. Add the layer it's missing.",
  body: "Copilot is strong at personal productivity, and most clients should keep it. It does not know your estimating logic, carry a quote from request to approval across systems, or answer from a knowledge base you govern. We build that workflow layer. Copilot assists individuals; AI employees carry the workflow.",
  ctaLabel: "SEE WHAT THE LAYER CONTAINS",
  ctaHref: "/concepts/virtual-ai-employees",
} as const;

export const costOfWaiting = {
  eyebrow: "THE OTHER OPTION",
  h2: "Doing nothing has a price too.",
  body: "Every quarter you wait, quotes still queue behind one person. The know-how you most need gets closer to walking out the door, while files keep piling up in formats only humans can search. Those costs rarely appear as a line item, so the work gets deferred. The assessment takes two minutes and tells you whether AI is likely to pay in your operation.",
  ctaLabel: "TAKE THE 2-MINUTE ASSESSMENT",
  ctaHref: "/assessment",
} as const;

export const founderStrip = {
  body: "Maslow is led by Rakesh David, a former CIO and CTO with twenty years in enterprise technology. He founded Maslow after repeatedly seeing critical work depend on a few overloaded people. You work directly with someone who has owned the budgets, systems, and board questions. Everything we build lands in your repositories from day one, so the resulting system does not depend on any one person, including him.",
  href: "/about",
  cta: "MEET THE FOUNDER",
};
