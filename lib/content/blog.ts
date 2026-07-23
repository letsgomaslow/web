export const catColors: Record<string, string> = {
  CONCEPTS: "#73C1AE",
  COST: "#EBA93D",
  ENGINEERING: "#A070A6",
  "LOCAL AI": "#469DBB",
  "CASE NOTES": "#654C8F",
};

export const featuredPost = {
  slug: "context-engineering",
  cat: "CONCEPTS",
  read: "6 MIN READ",
  date: "JUL 2026",
  title: "Context engineering, explained for operators",
  desc: "Why the quality of what your AI sees matters more than which model you pick, and how to audit the context your systems are actually working with.",
};

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
        text: "Model choice matters, but it cannot compensate for missing or outdated source material. Before comparing models, ask: **what does the model get to see?**",
      },
      {
        type: "p",
        text: "Context engineering determines which information is available when your AI acts. The source material should be current, relevant, structured, and complete enough for the task.",
      },
      { type: "h2", text: "The context window is a budget" },
      {
        type: "p",
        text: "A model's context window is finite. Treat it like a briefing for a new employee before a meeting. Including every available document can bury the decisive sentence, while careful selection makes the relevant facts easier to use.",
      },
      {
        type: "quote",
        text: "A better model cannot recover a fact that the retrieval system never supplied.",
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
        text: "The agentic harness, reusable skills, and AI employees all depend on this retrieval layer. Fixing it first reduces rework in every later stage.",
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
