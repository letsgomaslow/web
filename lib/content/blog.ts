export const catColors: Record<string, string> = {
  CONCEPTS: "var(--color-ice-text)",
  ARCHITECTURE: "var(--color-plum-text)",
  CONTROLS: "var(--color-gold-text)",
  COST: "var(--color-gold-text)",
  ENGINEERING: "var(--color-plum-text)",
  "LOCAL AI": "var(--color-navy)",
  "CASE NOTES": "#654C8F",
};

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "callout"; label: string; text: string };

export type BlogArticle = {
  slug: string;
  title: string;
  lede: string;
  desc: string;
  cat: string;
  date: string;
  read: string;
  tags: string[];
  explainerHref: string;
  ctaTitle: string;
  order: number;
  featured: boolean;
  published: boolean;
  cluster?: "ai-employee-architecture";
  body: BlogBlock[];
};

export const blogArticles: Record<string, BlogArticle> = {
  "what-makes-an-ai-employee-work": {
    slug: "what-makes-an-ai-employee-work",
    title: "What makes an AI employee work",
    lede:
      "A practical look at the operating loop around the model, from receiving a request to leaving a reviewable work record.",
    desc: "Follow the six responsibilities that turn a model into a system that can carry a company workflow.",
    cat: "ARCHITECTURE",
    date: "JULY 2026",
    read: "8 MIN READ",
    tags: ["AI employees", "Architecture", "Workflow design"],
    explainerHref: "/concepts/ai-employee-architecture",
    ctaTitle: "Which waiting workflow should we map first?",
    order: 1,
    featured: true,
    published: true,
    cluster: "ai-employee-architecture",
    body: [
      {
        type: "p",
        text: "A useful AI employee is more than a model with a job title. The model supplies language and reasoning ability. The surrounding system gives that ability a place to receive work, the information to understand it, a procedure to follow, and clear limits on what happens next.",
      },
      {
        type: "p",
        text: "For an operator, the architecture is easiest to understand as six responsibilities. Each one answers a question your team can inspect during design, approval, and day-to-day use.",
      },
      { type: "h2", text: "1. How does the work enter?" },
      {
        type: "p",
        text: "Work intake connects the AI employee to an operational queue. A request might arrive through email, Teams, Slack, a form, a system event, or a schedule. The intake layer captures the request, the attachments, the due date, and the person who owns the outcome.",
      },
      {
        type: "callout",
        label: "OPERATING QUESTION",
        text: "Can the team see what entered the queue, why it started, and who is responsible for the next handoff?",
      },
      { type: "h2", text: "2. What briefing does it receive?" },
      {
        type: "p",
        text: "Company briefing assembles the current facts for this task. That can include source documents, account history, prior decisions, live system state, and the conversation so far. Sources and dates should travel with the briefing so a reviewer can see what informed the work.",
      },
      { type: "h2", text: "3. Which procedure does it follow?" },
      {
        type: "p",
        text: "Company procedure turns repeated know-how into a versioned sequence. It defines the checks, specialist roles, handoffs, and exception paths for the workflow. When the procedure changes, the team can update it once and know which version governed a completed task.",
      },
      { type: "h2", text: "4. Which systems may it use?" },
      {
        type: "p",
        text: "Approved access connects the workflow to the specific records and operations it needs. A connector might read inventory, create a draft in a CRM, retrieve a policy, or place an item in a review queue. Its scope should reflect the task and the identity under which the action runs.",
      },
      { type: "h2", text: "5. Where does a person decide?" },
      {
        type: "p",
        text: "Decision points define the boundary between preparation and authority. The AI employee can surface an assumption, cite the supporting record, and route the decision to the right person. The approver sees the issue in context and chooses whether the work advances, changes, or stops.",
      },
      { type: "h2", text: "6. What record remains?" },
      {
        type: "p",
        text: "The work record holds the current state, sources, tool activity, approvals, output, and next owner. It lets another person resume the task and gives reviewers a concrete trail when they need to understand how a result was produced.",
      },
      {
        type: "quote",
        text: "The architecture becomes useful when every responsibility maps to something your team can inspect.",
      },
      { type: "h2", text: "Start with one workflow" },
      {
        type: "p",
        text: "Choose work that already has an intake channel, recognizable source material, a repeated procedure, and a named owner. Map the six responsibilities around that workflow. The result is a concrete system sketch your operators, technical team, and reviewers can challenge together.",
      },
    ],
  },
  "context-memory-and-skills": {
    slug: "context-memory-and-skills",
    title: "Context, memory, and skills do different jobs",
    lede:
      "Three continuity mechanisms shape an AI employee. Each stores a different kind of knowledge and enters the workflow at a different moment.",
    desc: "See what belongs in a task briefing, durable memory, and a reusable procedure, plus the failure mode of mixing them together.",
    cat: "ARCHITECTURE",
    date: "JULY 2026",
    read: "7 MIN READ",
    tags: ["Context engineering", "Memory", "Skills"],
    explainerHref: "/concepts/context-engineering",
    ctaTitle: "Where does your operating knowledge live today?",
    order: 2,
    featured: false,
    published: true,
    cluster: "ai-employee-architecture",
    body: [
      {
        type: "p",
        text: "Context, memory, and skills all help an AI employee continue work over time. They are often grouped together because each influences the next response. Operationally, they carry different kinds of knowledge and need different review rules.",
      },
      { type: "h2", text: "Context is the briefing for this task" },
      {
        type: "p",
        text: "Context is the material assembled for the current step. It can include the request, recent messages, retrieved documents, tool results, dates, and the state of the active task. Its purpose is immediate relevance.",
      },
      {
        type: "p",
        text: "A pricing question may need the latest rate card and the customer's requested volume. A policy question may need the current agreement, amendments, jurisdiction, and effective date. Each briefing is built around the decision in front of the system.",
      },
      {
        type: "callout",
        label: "INSPECT CONTEXT",
        text: "Review which sources entered the briefing, which were excluded, how current they are, and whether the decisive fact was present.",
      },
      { type: "h2", text: "Memory carries durable continuity" },
      {
        type: "p",
        text: "Memory preserves information that should remain available across sessions or handoffs. Useful examples include a confirmed preference, an unresolved task, a prior approval, or a summary of an ongoing relationship. Each memory item needs a source, scope, and reason to persist.",
      },
      {
        type: "p",
        text: "Retention should match the work. A temporary assumption may belong only to one task. An approved account preference may remain useful across future work. Clear boundaries make memory easier to correct, expire, and review.",
      },
      { type: "h2", text: "Skills hold the procedure" },
      {
        type: "p",
        text: "A skill is a reusable instruction set for carrying out a class of work. It defines the sequence, required checks, available tools, expected output, and escalation points. Skills turn operating knowledge into a procedure that can be versioned and tested.",
      },
      {
        type: "p",
        text: "A shared-inbox skill might identify the sender, classify the request, check required fields, retrieve approved precedent, draft a response, and route it to the relationship owner. The active email belongs in context. A lasting client preference may belong in memory. The checklist belongs in the skill.",
      },
      { type: "h2", text: "What fails when they are conflated" },
      {
        type: "p",
        text: "When temporary context is stored as durable memory, old assumptions can follow later work. When memory is embedded inside a procedure, changing one client fact can require editing operating instructions. When the procedure is improvised inside the prompt, teams lose a clear version to test and approve.",
      },
      {
        type: "quote",
        text: "Context answers what matters now. Memory preserves what should carry forward. Skills define how the work proceeds.",
      },
      { type: "h2", text: "Give each layer an owner" },
      {
        type: "p",
        text: "Assign an owner for source quality, an owner for memory policy, and an owner for the procedure. Define how each layer is updated and reviewed. That division creates a practical way to diagnose errors: inspect the briefing, the retained facts, and the procedure separately.",
      },
    ],
  },
  "permissions-approvals-audit-trails": {
    slug: "permissions-approvals-audit-trails",
    title: "Permissions, approvals, and audit trails",
    lede:
      "How scoped tools, human decision points, isolation, escalation, and review records shape controlled AI employee work.",
    desc: "A plain-language guide to the boundaries that determine what an AI employee can access, decide, and leave behind for review.",
    cat: "CONTROLS",
    date: "JULY 2026",
    read: "8 MIN READ",
    tags: ["Permissions", "Approvals", "Audit trails"],
    explainerHref: "/concepts/ai-employee-architecture",
    ctaTitle: "Which actions should your workflow prepare, approve, or prevent?",
    order: 3,
    featured: false,
    published: true,
    cluster: "ai-employee-architecture",
    body: [
      {
        type: "p",
        text: "An AI employee becomes operational when it can use company systems. That access creates a design responsibility: define which identity it uses, which records it can reach, which actions it can request, and which decisions still belong to a person.",
      },
      { type: "h2", text: "Start with scoped tools" },
      {
        type: "p",
        text: "A tool should expose the smallest useful operation for the workflow. Reading an approved set of inventory fields is a narrower capability than unrestricted database access. Creating a draft for review carries a different risk than sending the final message.",
      },
      {
        type: "p",
        text: "Scope can be expressed through account permissions, connector configuration, record filters, allowed operations, and environment boundaries. The system should make that scope visible to the people approving the workflow.",
      },
      {
        type: "callout",
        label: "ACCESS REVIEW",
        text: "For every tool, record the identity, permitted systems, allowed operations, data scope, and the owner who can change that access.",
      },
      { type: "h2", text: "Place approvals at consequential decisions" },
      {
        type: "p",
        text: "Approval design starts with consequences. A person may need to approve a price assumption, external message, policy interpretation, financial commitment, or change to a system of record. The workflow can prepare the evidence and draft while reserving authority for the named reviewer.",
      },
      {
        type: "p",
        text: "A useful approval request includes the proposed action, the facts supporting it, unresolved assumptions, and the effect of each choice. This gives the reviewer a decision package instead of another research task.",
      },
      { type: "h2", text: "Design escalation as part of the procedure" },
      {
        type: "p",
        text: "Escalation handles uncertainty, missing data, conflicts, unavailable systems, and policy exceptions. Define who receives each kind of issue, how urgent work is marked, and what happens while the workflow waits. A clear waiting state prevents silent completion and silent abandonment.",
      },
      { type: "h2", text: "Use isolation to contain impact" },
      {
        type: "p",
        text: "Isolation separates environments, clients, datasets, credentials, and tool sessions where the work requires it. The specific boundary depends on the workflow and its data. The design goal is to keep one task's access and state from leaking into another task's operating space.",
      },
      { type: "h2", text: "Keep a reviewable trail" },
      {
        type: "p",
        text: "The work record should connect the request, sources, procedure version, tool activity, exceptions, approvals, output, and final status. Reviewers can then reconstruct the work and identify which layer needs correction when the result is challenged.",
      },
      {
        type: "quote",
        text: "Control is a chain of visible boundaries from identity and access through decision and record.",
      },
      { type: "h2", text: "Review the whole chain" },
      {
        type: "p",
        text: "A permission review alone cannot show whether an approval arrived at the right time. An approval log alone cannot show whether the connector exposed too much data. Review the chain as one workflow: intake, context, procedure, access, decision, and record.",
      },
    ],
  },
  "context-engineering": {
    slug: "context-engineering",
    title: "Context engineering, explained for operators",
    lede:
      "Why the quality of what your AI sees matters more than which model you pick.",
    desc: "Why the quality of what your AI sees matters more than which model you pick, and how to audit the context your systems are actually working with.",
    cat: "CONCEPTS",
    date: "JULY 2026",
    read: "6 MIN READ",
    tags: ["Context engineering", "Hybrid RAG"],
    explainerHref: "/concepts/context-engineering",
    ctaTitle: "Want an audit of what your AI actually sees?",
    order: 4,
    featured: false,
    published: true,
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
        text: "**1. The retrieval audit.** Pick ten questions your team asked last month. Trace what your system retrieved for each. Was the answer in there at all?",
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

export const publishedArticles = Object.values(blogArticles)
  .filter((article) => article.published)
  .sort((a, b) => a.order - b.order);

export const featuredPost =
  publishedArticles.find((article) => article.featured) ?? publishedArticles[0];

export const secondaryPosts = publishedArticles.filter(
  (article) => article.slug !== featuredPost.slug,
);

export const architectureArticles = publishedArticles.filter(
  (article) => article.cluster === "ai-employee-architecture",
);

export function getBlogArticle(slug: string) {
  const article = blogArticles[slug];
  return article?.published ? article : null;
}

export function getAllBlogSlugs() {
  return publishedArticles.map(({ slug }) => slug);
}
