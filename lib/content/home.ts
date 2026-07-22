export const metrics = [
  { value: "90 days", label: "idea → working AI foundation", tick: "#1F6F5F" },
  { value: "1.33×", label: "base-case enterprise value path", tick: "#6B4570" },
  {
    value: "93%",
    label: "intent-routing accuracy, live test suite",
    tick: "#7A5608",
  },
  {
    value: "100%",
    label: "of what we build is yours, no lock-in",
    tick: "#8A2752",
  },
];

export const concepts = [
  {
    num: "01",
    tick: "#1F6F5F",
    name: "Context engineering",
    desc: "Deciding exactly what your AI sees: the right data, structured and retrievable, at the right moment.",
    href: "/concepts/context-engineering",
  },
  {
    num: "02",
    tick: "#6B4570",
    name: "Harness engineering",
    desc: "The scaffolding around a model (skills, tools, memory and guardrails) that turns raw intelligence into dependable work.",
    href: "/concepts/agentic-harness",
  },
  {
    num: "03",
    tick: "#1F6F5F",
    name: "Hybrid RAG",
    desc: "Your unstructured files, converted into vector databases and knowledge graphs your AI can actually reason over.",
    href: "/concepts/hybrid-rag",
  },
  {
    num: "04",
    tick: "#7A5608",
    name: "Virtual AI employees",
    desc: "Agents that live where your team works (Teams, Slack, email) and carry whole workflows, not just chats.",
    href: "/concepts/virtual-ai-employees",
  },
  {
    num: "05",
    tick: "#6B4570",
    name: "Skills & gateways",
    desc: "Reusable skills your agents share, connected through the channels your business already runs on.",
    href: "/concepts/skills-and-gateways",
  },
  {
    num: "06",
    tick: "#1F6F5F",
    name: "Local AI",
    desc: "Models on your own hardware: private by default, with predictable cost instead of a metered bill.",
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
    desc: "Files → vector DB + knowledge graph.",
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
    desc: "AI teammates in your channels.",
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
    sector: "MANUFACTURING",
    art: "linear-gradient(140deg,#86E8CE,#E686B5)",
    title: "Infinite AI OS: an AI operating system in 90 days",
    desc: "Four named AI employees in Microsoft Teams, standing on a six-layer root system: memory, knowledge map, connectors, observability.",
    result: "1.33× enterprise value path",
    href: "/case-studies/infinite-ai-os",
  },
  {
    sector: "HEALTHCARE ENTERPRISE",
    art: "linear-gradient(140deg,#4C4C4C,#F37779)",
    title: "AgentHub: contracts you can question",
    desc: "A prompt library as the front door; behind it, an SOW review agent with hybrid retrieval and field-level citations.",
    result: "93% intent-routing accuracy",
    href: "/case-studies/agenthub",
  },
  {
    sector: "LEGAL",
    art: "#121D35",
    title: "A virtual paralegal in the inbox",
    desc: "A mid-size firm deployed an AI employee into email to triage intake, draft engagement letters and cite precedent.",
    result: "3.2× intake capacity",
    href: "/case-studies",
  },
];
