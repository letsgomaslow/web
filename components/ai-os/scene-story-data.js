// One ordered story drives copy, navigation, accessibility text, and 3D staging.
export const chapters = [
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
      "Codex proposes a lesson, your team approves what stays, and Hermes retrieves the approved knowledge through configured access. The shared library remains in place.",
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
  },
];
const total = chapters.reduce((sum, chapter) => sum + chapter.weight, 0);
let cursor = 0;
chapters.forEach((chapter) => {
  chapter.start = cursor / total;
  cursor += chapter.weight;
  chapter.end = cursor / total;
});
export function storyAt(progress) {
  const found = chapters.findIndex((chapter) => progress < chapter.end);
  const index = found < 0 ? chapters.length - 1 : found;
  const chapter = chapters[index];
  const local = Math.max(
    0,
    Math.min(
      0.9999,
      (progress - chapter.start) / (chapter.end - chapter.start),
    ),
  );
  return { index, local, position: index + local };
}
