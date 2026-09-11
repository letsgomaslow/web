export type ToolKey =
  | "openai"
  | "claude"
  | "hermes"
  | "qdrant"
  | "semantica"
  | "obsidian"
  | "gbrain"
  | "langfuse"
  | "mcp";

export const toolBrands: Record<
  ToolKey,
  { name: string; logo?: string; href: string }
> = {
  openai: {
    name: "Codex / OpenAI",
    logo: "/assets/ai-os/tool-logos/openai-blossom.svg",
    href: "https://openai.com/codex/",
  },
  claude: {
    name: "Claude Code / Anthropic",
    logo: "/assets/ai-os/tool-logos/anthropic-mark.svg",
    href: "https://www.anthropic.com/claude-code",
  },
  hermes: {
    name: "Hermes",
    logo: "/assets/ai-os/tool-logos/hermes-agent.png",
    href: "https://github.com/NousResearch/hermes-agent",
  },
  qdrant: {
    name: "Qdrant",
    logo: "/assets/ai-os/tool-logos/qdrant-mark.svg",
    href: "https://qdrant.tech/",
  },
  semantica: {
    name: "Semantica",
    logo: "/assets/ai-os/tool-logos/semantica-mark.svg",
    href: "https://github.com/semantica-agi/semantica",
  },
  obsidian: {
    name: "Obsidian",
    href: "https://obsidian.md/",
  },
  gbrain: {
    name: "GBrain",
    href: "https://github.com/garrytan/gbrain",
  },
  langfuse: {
    name: "Langfuse",
    logo: "/assets/ai-os/tool-logos/langfuse-mark.svg",
    href: "https://langfuse.com/",
  },
  mcp: {
    name: "MCP",
    logo: "/assets/ai-os/tool-logos/mcp-mark.svg",
    href: "https://modelcontextprotocol.io/",
  },
};

export const heroAgents = [
  {
    key: "openai" as const,
    shortName: "Codex",
    tabName: "Codex / OpenAI",
    role: "Review the evidence",
    caption:
      "Codex reviews the evidence. The brief, approved knowledge, and review skill stay in place.",
  },
  {
    key: "claude" as const,
    shortName: "Claude Code",
    tabName: "Claude Code",
    role: "Refine the workflow",
    caption:
      "Claude Code refines the workflow. The brief, approved knowledge, and review skill stay in place.",
  },
  {
    key: "hermes" as const,
    shortName: "Hermes",
    tabName: "Hermes",
    role: "Prepare the next step",
    caption:
      "Hermes prepares the next step. The brief, approved knowledge, and review skill stay in place.",
  },
];

export type JourneyChapter = {
  key: string;
  weight: number;
  layer: number;
  nav: number;
  label: string;
  title: string;
  accent: string;
  description: string;
  from: string;
  to: string;
  caption: string;
  object: string;
  scene: string;
  detail: {
    kicker: string;
    title: string;
    intro: string;
    rows: [string, string][];
    tags: string[];
  };
};

export const journeyChapters: JourneyChapter[] = [
  {
    key: "sources",
    weight: 0.7,
    layer: 3,
    nav: 0,
    label: "KNOWLEDGE & MEMORY",
    title: "Your knowledge.",
    accent: "Already here.",
    description:
      "The brief on a local drive. Photos on the network. Policies in SharePoint. Start with the information your team already uses.",
    from: "Files across your business",
    to: "A connected starting point",
    caption: "One supplier review, beginning with the original sources.",
    object: "Local Drive · Network Drive · SharePoint",
    scene:
      "Source documents move from a local drive, a network drive, and SharePoint toward the shared knowledge layer.",
    detail: {
      kicker: "SOURCES / WHAT THE WORK STARTS WITH",
      title: "Start with material people already trust.",
      intro:
        "Begin with approved files and records, keeping a path back to the originals.",
      rows: [
        [
          "Source locations",
          "Local Drive, Network Drive, and SharePoint can remain the places people manage their working material.",
        ],
        [
          "Unstructured material",
          "Process PDFs, scanned documents, images, and office files into useful text and structure before indexing.",
        ],
        [
          "Access",
          "Each source is connected with an explicit scope so the workflow only sees what it needs.",
        ],
      ],
      tags: ["Local Drive", "Network Drive", "SharePoint"],
    },
  },
  {
    key: "knowledge",
    weight: 1.1,
    layer: 3,
    nav: 0,
    label: "KNOWLEDGE & MEMORY",
    title: "Find answers.",
    accent: "See connections.",
    description:
      "Make documents searchable by meaning. Connect suppliers, products, and requirements so an answer comes with useful context and its source.",
    from: "Brief + quality policy",
    to: "A missing certification",
    caption: "Search finds the passage. Relationships explain why it matters.",
    object: "The answer, its relationships, its source.",
    scene:
      "Document passages connect to a graph linking a supplier to a product and its certification requirement. The original source stays attached.",
    detail: {
      kicker: "KNOWLEDGE / HOW MATERIAL BECOMES USEFUL",
      title: "Shape source material into working knowledge.",
      intro:
        "Find relevant passages by meaning and use relationships to understand how the pieces fit.",
      rows: [
        [
          "Ingestion and structure",
          "Semantica can support ingestion and knowledge-graph workflows, with the graph backend chosen separately for the organization.",
        ],
        [
          "Semantic retrieval",
          "Qdrant provides vector search using embeddings from the chosen model. It helps find relevant material beyond an exact keyword match.",
        ],
        [
          "Agent retrieval",
          "Models can retrieve relevant context while the approved source remains traceable.",
        ],
      ],
      tags: ["Qdrant", "Semantica", "Vector search", "Knowledge graph"],
    },
  },
  {
    key: "brain",
    weight: 1.5,
    layer: 3,
    nav: 0,
    label: "KNOWLEDGE & MEMORY",
    title: "A second brain.",
    accent: "For your team.",
    description:
      "Keep approved knowledge and reviewed decisions beyond one conversation. Give each configured agent a starting point your team has shaped.",
    from: "A reviewed decision",
    to: "Knowledge worth keeping",
    caption: "Remember: request current certification before approval.",
    object: "Configured agents. Shared approved knowledge.",
    scene:
      "Codex proposes a lesson, your team approves what stays, and Hermes retrieves approved knowledge through configured access. The shared library remains in place.",
    detail: {
      kicker: "MEMORY / WHAT EACH SYSTEM REMEMBERS",
      title: "Build a second brain your team can shape.",
      intro:
        "Documents are the beginning. Reviewed decisions, corrections, and useful lessons make the knowledge more valuable over time.",
      rows: [
        [
          "Shared memory",
          "GBrain can make selected knowledge available to configured agents. A useful lesson can become context for the next task.",
        ],
        [
          "Human knowledge",
          "Obsidian can hold readable Markdown notes that people review and shape over time.",
        ],
        [
          "Agent choice",
          "Our work starts with a Hermes second brain. Extending it to other agents means configuring access to the same approved knowledge; private memory stays separate.",
        ],
      ],
      tags: ["GBrain", "Obsidian", "Markdown"],
    },
  },
  {
    key: "skills",
    weight: 1,
    layer: 2,
    nav: 1,
    label: "SKILLS & WORKFLOWS",
    title: "Your know-how.",
    accent: "Put to work.",
    description:
      "Turn a good way of working into a reusable skill. Compare the evidence, cite the sources, and flag what still needs a person’s attention.",
    from: "Supplier review skill",
    to: "A sourced review draft",
    caption: "Compare → cite → flag gaps. A process your team can refine.",
    object: "One process. Useful across compatible agents.",
    scene:
      "Three steps rise from the skills layer: compare, cite, and flag gaps. The second brain supplies the approved context.",
    detail: {
      kicker: "SKILLS / HOW THE WORK GETS REPEATED",
      title: "Turn a good approach into a reusable practice.",
      intro:
        "A skill can capture the steps, standards, and tools behind work that should be done consistently.",
      rows: [
        [
          "Working method",
          "The skill describes what to check, what evidence to use, and where a person needs to make the call.",
        ],
        [
          "Agent use",
          "Skills can be shared with compatible agents after each agent is configured for the required tools and format.",
        ],
        [
          "Review",
          "The organization can improve the method as people learn what produces a better result.",
        ],
      ],
      tags: ["Shared skills", "Configured agents", "Human review"],
    },
  },
  {
    key: "connections",
    weight: 1,
    layer: 1,
    nav: 2,
    label: "CONNECTIONS",
    title: "Your systems.",
    accent: "In the flow.",
    description:
      "Bring the review into the systems your team uses. Connect business apps and legacy software around the job, with the access it needs.",
    from: "A gap in the review",
    to: "A proposed follow-up",
    caption: "Prepare a request for the supplier’s current certification.",
    object: "Business apps · Legacy systems · Scoped access",
    scene:
      "A connection joins the supplier review to existing ERP, CRM, and legacy systems. A follow-up request is prepared for human review.",
    detail: {
      kicker: "CONNECTIONS / HOW WORK REACHES BUSINESS SYSTEMS",
      title: "Connect the right system with a clear scope.",
      intro:
        "A useful connection includes a supported path to the system, the right account, and boundaries people can understand.",
      rows: [
        [
          "Supported integrations",
          "MCP connectors need a supported backing integration before an agent can rely on them.",
        ],
        [
          "Computer use",
          "Where a direct integration is unavailable, computer use can handle selected interface steps with suitable review.",
        ],
        [
          "Account scope",
          "Accounts and permissions are chosen for the workflow. Access is not automatically synchronized across every agent.",
        ],
      ],
      tags: ["MCP", "Computer use", "Scoped accounts"],
    },
  },
  {
    key: "observability",
    weight: 1,
    layer: 0,
    nav: 3,
    label: "VISIBILITY & CONTROL",
    title: "See the work.",
    accent: "Keep the say.",
    description:
      "Trace a proposed action back to the steps and sources behind it. Review the result, decide what happens next, and improve the workflow.",
    from: "Proposed supplier request",
    to: "Your team’s review",
    caption: "Inspect the evidence before approving the next step.",
    object: "Source → agent steps → human review",
    scene:
      "The proposed supplier request traces backward through the agent steps to the source. A person reviews the next action before it is approved.",
    detail: {
      kicker: "VISIBILITY / HOW PEOPLE FOLLOW THE WORK",
      title: "Make the path to a result inspectable.",
      intro:
        "Visibility comes from configured tracing and a human review process around the work that matters.",
      rows: [
        [
          "Configured traces",
          "The workflow records the useful steps, tool activity, and source references its tracing setup supports.",
        ],
        [
          "Human review",
          "A person can inspect the evidence, catch gaps, and decide what should change.",
        ],
        [
          "Practical boundary",
          "Coverage depends on the tools in the workflow and the tracing configured for them.",
        ],
      ],
      tags: ["Langfuse", "Tracing", "Human review"],
    },
  },
  {
    key: "together",
    weight: 0.7,
    layer: -1,
    nav: 4,
    label: "THE FOUNDATION, TOGETHER",
    title: "Your agents.",
    accent: "More connected.",
    description:
      "A workspace for your people. Shared services for your organization. Maslow brings the pieces together around work that matters to you.",
    from: "A free OS to start",
    to: "Maslow to help you build",
    caption: "From the first useful workflow to an organization-wide setup.",
    object: "Your workspace + shared organization services",
    scene:
      "All four layers reassemble beneath Codex, Claude Code, and Hermes. A personal workspace and shared organization services connect to the foundation.",
    detail: {
      kicker: "TOGETHER / THE WORKSPACE AND THE IMPLEMENTATION",
      title: "A free Linux workspace, shaped around real work.",
      intro:
        "AI-OS brings the workspace direction together. Maslow helps organizations build the client infrastructure that makes a specific workflow useful.",
      rows: [
        [
          "The workspace",
          "A free Linux environment for agents, knowledge, skills, connections, and visibility to live closer together.",
        ],
        [
          "The client work",
          "The approaches shown here come from how we build with clients on Ubuntu and around their existing systems.",
        ],
        [
          "The fit",
          "The final tools, models, accounts, and review points are selected for the organization and its use case.",
        ],
      ],
      tags: ["Linux", "Ubuntu", "Client infrastructure"],
    },
  },
];

export const workspaceModes = {
  focus: {
    label: "Focus",
    title: "Room to focus.",
    src: "/assets/ai-os/workspace-focus-ai.png",
    alt: "AI-generated workspace concept: Codex reviews a supplier brief beside an Obsidian-style second brain with approved standards and source relationships.",
    caption:
      "Codex keeps the task in focus, with your second brain and source material close by.",
  },
  split: {
    label: "Side by side",
    title: "Different agents. Common ground.",
    src: "/assets/ai-os/workspace-split-ai.png",
    alt: "AI-generated workspace concept: Codex prepares a supplier follow-up beside Hermes, with approved project knowledge below.",
    caption:
      "Codex and Hermes work side by side, with approved project knowledge in reach.",
  },
  desktop: {
    label: "Desktop",
    title: "A little more you.",
    src: "/assets/ai-os/maslow-wallpaper-quiet-field.webp",
    alt: "Gradient Bridge Quiet Field, a Maslow AI-OS wallpaper with teal and pink light reflected across a dark navy landscape.",
    caption:
      "Gradient Bridge Quiet Field. From the Maslow AI-OS wallpaper collection.",
  },
} as const;

export const wallpapers = {
  quiet: {
    name: "Gradient Bridge Quiet Field",
    src: "/assets/ai-os/maslow-wallpaper-quiet-field.webp",
    alt: "Gradient Bridge Quiet Field, a Maslow AI-OS wallpaper with teal and pink light reflected across a dark navy landscape.",
  },
  topographic: {
    name: "Topographic Ascent",
    src: "/assets/ai-os/maslow-wallpaper-topographic.webp",
    alt: "Topographic Ascent, a Maslow AI-OS wallpaper with sculpted navy contours and subtle teal and pink light.",
  },
  signal: {
    name: "Signal Over Water",
    src: "/assets/ai-os/maslow-wallpaper-signal.webp",
    alt: "Signal Over Water, a Maslow AI-OS wallpaper with a luminous teal and pink horizon reflected over dark water.",
  },
} as const;

export const workflowRecipes = {
  knowledge: {
    number: "01",
    title: "Find the answer",
    note: "Inside the documents you already have.",
    question: "“Where is the policy that answers this?”",
    input: "PDFs, images, and documents across your drives and SharePoint.",
    outcome: "An answer you can check against its source.",
    service:
      "Prepare the data, scope access, connect retrieval, and test answers with your team.",
    tone: "teal",
    tools: [
      ["qdrant", "Find relevant passages"],
      ["semantica", "Structure knowledge and relationships"],
      ["openai", "Work with the retrieved context"],
    ] as [ToolKey, string][],
  },
  knowhow: {
    number: "02",
    title: "Keep what works",
    note: "Beyond the person or conversation.",
    question: "“What did we learn the last time we did this?”",
    input:
      "Project notes, reviewed decisions, and the lessons people choose to keep.",
    outcome: "A second brain the next person or configured agent can use.",
    service:
      "Shape the knowledge library, agree what gets retained, and configure access for your chosen agents.",
    tone: "purple",
    tools: [
      ["obsidian", "Readable notes your team can shape"],
      ["gbrain", "Selected knowledge for configured agents"],
      ["hermes", "Use an approved lesson in the next task"],
    ] as [ToolKey, string][],
  },
  workflow: {
    number: "03",
    title: "Give a routine a head start",
    note: "From a checklist to a reviewable draft.",
    question: "“Can we stop starting this review from scratch?”",
    input:
      "A recurring checklist, the source material, and a person who owns the decision.",
    outcome: "A sourced first draft, with gaps flagged for a person to review.",
    service:
      "Turn the checklist into a skill, connect the required systems, and evaluate the workflow before wider use.",
    tone: "pink",
    tools: [
      ["openai", "Apply the review method"],
      ["mcp", "Reach supported business-system connections"],
      ["langfuse", "Inspect configured steps and traces"],
    ] as [ToolKey, string][],
  },
} as const;
