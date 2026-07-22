export const blogCategories = [
  "All",
  "Concepts",
  "Cost",
  "Engineering",
  "Local AI",
  "Case Notes",
] as const;

export const catColors: Record<string, string> = {
  CONCEPTS: "#1F6F5F",
  COST: "#7A5608",
  ENGINEERING: "#6B4570",
  "LOCAL AI": "#2A6A82",
  "CASE NOTES": "#4F3A6E",
};

export const featuredPost = {
  slug: "context-engineering",
  cat: "CONCEPTS",
  read: "6 MIN READ",
  date: "JUL 2026",
  title: "Context engineering, explained for operators",
  desc: "Why the quality of what your AI sees matters more than which model you pick, and how to audit the context your systems are actually working with.",
};

export const blogPosts = [
  {
    slug: "when-local-models-beat-the-api-bill",
    cat: "COST",
    read: "5 MIN",
    date: "Jun 2026",
    title: "When local models beat the API bill",
    desc: "A framework for deciding what belongs on your hardware and what stays in the cloud.",
  },
  {
    slug: "anatomy-of-an-agentic-harness",
    cat: "ENGINEERING",
    read: "8 MIN",
    date: "Jun 2026",
    title: "Anatomy of an agentic harness",
    desc: "Skills, tools, memory, guardrails: how the pieces fit around a model to produce dependable work.",
  },
  {
    slug: "vector-database-or-knowledge-graph",
    cat: "CONCEPTS",
    read: "4 MIN",
    date: "May 2026",
    title: "Vector database or knowledge graph?",
    desc: "Meaning vs facts: what each structure is for, and why serious retrieval uses both.",
  },
  {
    slug: "deploying-a-virtual-employee-into-a-shared-inbox",
    cat: "CASE NOTES",
    read: "6 MIN",
    date: "May 2026",
    title: "Deploying a virtual employee into a shared inbox",
    desc: "What we learned shipping an AI teammate into email triage at a professional services firm.",
  },
  {
    slug: "sizing-hardware-for-on-prem-inference",
    cat: "LOCAL AI",
    read: "7 MIN",
    date: "Apr 2026",
    title: "Sizing hardware for on-prem inference",
    desc: "GPUs, quantisation and throughput: a practical sizing guide for your first local deployment.",
  },
  {
    slug: "what-skills-actually-are",
    cat: "CONCEPTS",
    read: "5 MIN",
    date: "Apr 2026",
    title: "What “skills” actually are",
    desc: "Reusable, auditable procedures your agents share, and why they beat prompt libraries.",
  },
];

export const blogArticles: Record<
  string,
  {
    slug: string;
    title: string;
    lede: string;
    cat: string;
    date: string;
    read: string;
    tags: string[];
    explainerHref: string;
    ctaTitle: string;
    body: Array<
      | { type: "p"; text: string }
      | { type: "h2"; text: string }
      | { type: "quote"; text: string }
      | { type: "callout"; label: string; text: string }
    >;
  }
> = {
  "context-engineering": {
    slug: "context-engineering",
    title: "Context engineering, explained for operators",
    lede: "Why the quality of what your AI sees matters more than which model you pick.",
    cat: "CONCEPTS",
    date: "JULY 2026",
    read: "6 MIN READ",
    tags: ["Context engineering", "Hybrid RAG"],
    explainerHref: "/concepts/context-engineering",
    ctaTitle: "Want an audit of what your AI actually sees?",
    body: [
      {
        type: "p",
        text: "Every AI vendor will tell you their model is smarter. Almost none will ask the question that actually determines whether your deployment works: **what does the model get to see?**",
      },
      {
        type: "p",
        text: "A frontier model with poor context loses to a modest model with great context. Reliably, and by a wide margin. Context engineering is the discipline of making sure that at the moment your AI acts, it is looking at the right information: fresh, relevant, structured and complete.",
      },
      { type: "h2", text: "The context window is a budget" },
      {
        type: "p",
        text: "A model's context window is finite. Think of it as a briefing you hand a new employee before a meeting. Stuff it with everything and the important sentence drowns. Curate it and even a junior performs like a veteran.",
      },
      {
        type: "quote",
        text: "The model is the engine. Context is the fuel, and most enterprises are running on fumes.",
      },
      {
        type: "p",
        text: "In practice, that budget is spent across retrieved documents, conversation history, tool outputs and instructions. Each one competes for space. The engineering question is a routing question: *which facts earn their place?*",
      },
      { type: "h2", text: "Three audits to run this quarter" },
      {
        type: "p",
        text: "**1. The retrieval audit.** Pick ten real questions your team asked last month. Trace what your system retrieved for each. Was the answer in there at all?",
      },
      {
        type: "p",
        text: "**2. The staleness audit.** How old is the newest document your AI can see? If your knowledge base was last synced in March, your AI lives in March.",
      },
      {
        type: "p",
        text: "**3. The structure audit.** Are you feeding raw PDF text, or chunks with titles, dates and ownership attached? Metadata is the difference between a pile and a library.",
      },
      {
        type: "callout",
        label: "RULE OF THUMB",
        text: "If a competent new hire couldn't answer the question from the same briefing, neither can the model. Fix the briefing before you blame the model.",
      },
      { type: "h2", text: "Where this goes next" },
      {
        type: "p",
        text: "Context engineering is the foundation the rest of the stack stands on: the agentic harness, skills, and virtual employees all inherit their competence from it. Start here, and everything downstream gets easier and cheaper.",
      },
    ],
  },
};

export function getBlogArticle(slug: string) {
  return blogArticles[slug] ?? null;
}

export function getAllBlogSlugs() {
  return Object.keys(blogArticles);
}

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? featuredPost;
}
