export const securityPrinciples = [
  {
    num: "01",
    title: "Make the data path visible.",
    desc: "We design around your existing tenant or infrastructure and document what runs locally, what connects to another service, and who has access.",
  },
  {
    num: "02",
    title: "Least-privilege, scoped, revocable.",
    desc: "Connector scopes and credentials are documented for the agreed workflow. Read access, action permissions, and revocation are separate configuration decisions.",
  },
  {
    num: "03",
    title: "Review the model configuration.",
    desc: "Maslow does not use client data to train its own models. External-provider training and retention terms are reviewed for the selected service, account, and configuration.",
  },
  {
    num: "04",
    title: "Humans approve, systems record.",
    desc: "For each workflow, we agree which actions require approval and what record must be retained. These controls must be implemented and tested for the connected tools.",
  },
  {
    num: "05",
    title: "Keep the system portable.",
    desc: "Ownership, access, export formats, documentation, and the handover path are agreed in the engagement. Third-party licenses and service dependencies remain visible.",
  },
] as const;

export const dataLocations = [
  {
    title: "IN YOUR TENANT",
    desc: "Documents, mailboxes, chat history, and the knowledge systems we build from them.",
  },
  {
    title: "IN TRANSIT, ENCRYPTED",
    desc: "Information sent to external models or services follows the configured routing and provider terms. The data path is reviewed as part of implementation.",
  },
  {
    title: "ON YOUR HARDWARE",
    desc: "Local models and services can run on your hardware. External tools, updates, telemetry, and API calls must be considered separately.",
  },
] as const;

export const plainAnswers: readonly {
  title: string;
  body: string;
  link?: { href: string; label: string };
}[] = [
  {
    title: "Paperwork",
    body: "We sign your NDA and DPA, and we'll complete your security questionnaire.",
  },
  {
    title: "Subprocessors",
    body: "Disclosed in writing before the engagement starts, updated if they change.",
  },
  {
    title: "Certifications",
    body: "We do not currently hold SOC 2 certification. Our diligence pack maps current controls to common security-questionnaire fields, lists subprocessors and retention terms, and documents exit paths. Each artifact has a current public status. If SOC 2 is mandatory for your procurement process, tell us early so we can confirm whether the requirement rules us out.",
    link: { href: "/diligence", label: "SEE THE DILIGENCE PACK" },
  },
  {
    title: "Incidents",
    body: "A named contact, a notification commitment in your contract, and a written post-incident report.",
  },
] as const;

export const faqItems = [
  {
    "num": "01",
    "q": "What is Maslow AI-OS?",
    "a": "A free Linux workspace in development, built on Omarchy and shaped for working with multiple AI agents. It brings a customizable desktop and agent setup work into one environment. The wider vision includes shared knowledge, skills, connections, and visibility; the preview page distinguishes current work from optional client implementations."
  },
  {
    "num": "02",
    "q": "What is free, and what do we pay for?",
    "a": "The OS is intended to be free. Maslow charges for discovery, setup, organizational knowledge systems, integrations, workflow implementation, training, and ongoing support. Hardware, model usage, and third-party licenses are separate costs."
  },
  {
    "num": "03",
    "q": "Can we download it today?",
    "a": "A public download is not offered through this website. We can discuss the current development candidate, your hardware, and a suitable evaluation scope. Broad hardware acceptance and a stable signed public release remain open milestones."
  },
  {
    "num": "04",
    "q": "Do we have to replace Windows or move everyone to Linux?",
    "a": "No. A technical champion can evaluate the workspace on a dedicated machine. We also deliver knowledge systems and workflows on existing infrastructure, including Ubuntu. Your team can continue using its existing business tools."
  },
  {
    "num": "05",
    "q": "Can we keep the AI tools we already use?",
    "a": "Yes. The goal is a useful shared foundation around supported tools, with Codex, Claude Code, and Hermes as the primary setup paths being developed. Each tool has its own sign-in, permissions, integrations, and compatibility requirements."
  },
  {
    "num": "06",
    "q": "What do you mean by a second brain?",
    "a": "A place to retain useful notes, decisions, and approved lessons so the next task can build on them. Sharing that knowledge across agents requires a configured knowledge store and access rules. It does not automatically combine private conversations or memories."
  },
  {
    "num": "07",
    "q": "Can we connect local drives, SharePoint, or older systems?",
    "a": "We scope connections around the sources and actions a workflow needs. That can include folders, network drives, SharePoint libraries, and business applications through APIs, MCP, or computer use. Access, document quality, and integration reliability are evaluated before rollout."
  },
  {
    "num": "08",
    "q": "Is every feature on the homepage included in the OS?",
    "a": "No. The homepage explains the foundation we are working toward and the systems we deliver for clients. Current preview capabilities, optional integrations, and illustrative workflows are labeled. Client implementations demonstrate delivery experience rather than the contents of a standard OS installation."
  },
  {
    "num": "09",
    "q": "How do we start a paid engagement?",
    "a": "Bring a use case or a point of friction. We can begin with discovery, a setup project, a knowledge system, or one workflow. A 90-Day Foundation is available for larger scopes. Fees, deliverables, decision points, and ownership are agreed before work starts."
  },
  {
    "num": "10",
    "q": "How quickly will we have something useful?",
    "a": "That depends on the sources, integrations, and scope. We agree a first test and acceptance criteria early, then use the result to decide whether to continue. The 90-day example on How We Engage describes a larger foundation project, not a universal delivery promise."
  },
  {
    "num": "11",
    "q": "Where does our information go?",
    "a": "The selected deployment and model configuration determine the data path. Local services can run on your hardware; an external model or connected application may receive scoped information. We document those paths with your IT counterpart. A Linux installation alone does not keep every agent action local."
  },
  {
    "num": "12",
    "q": "Is our data used to train models?",
    "a": "Maslow does not use client data to train its own models. External provider use, retention, and training terms depend on the selected service, account, and configuration. These are reviewed for the scoped deployment rather than assumed from the tool name."
  },
  {
    "num": "13",
    "q": "Who runs the system after implementation?",
    "a": "We agree whether your team operates it, Maslow provides scoped ongoing support, or responsibility is shared. Training, runbooks, monitoring, maintenance, and an exit path are part of that discussion."
  },
  {
    "num": "14",
    "q": "Can procurement review your security documents?",
    "a": "Yes. The diligence page shows which documents are available and which are in preparation. Send your requirements early so we can identify gaps. Maslow does not currently hold SOC 2 certification."
  },
  {
    "num": "15",
    "q": "Who will we work with?",
    "a": "Rakesh David leads the work with specialist engineers as the engagement needs them. You get a named accountable lead, documented scope, and progress you can inspect with your team."
  }
] as const;

export const manufacturingBottlenecks = [
  {
    num: "01",
    title: "Every quote waits on the one person who knows the numbers.",
    desc: "Your senior estimator may spend two hours assembling every quote before applying the judgment only they can provide. Automating the assembly gives them more time to review the work that affects margin and risk.",
  },
  {
    num: "02",
    title: "Decades of files, none of them findable.",
    desc: "Drawings, specs, POs, and email threads scattered across shares. The answer exists; nobody can produce it before the customer stops waiting.",
  },
  {
    num: "03",
    title: "Reporting eats your supervisors alive.",
    desc: "The people who should be running the floor spend Friday assembling numbers that were already sitting in five systems.",
  },
] as const;

export const manufacturingMonday: readonly {
  text: string;
  catchTrail?: readonly {
    label: string;
    tone: "flagged" | "caught" | "approved";
  }[];
}[] = [
  {
    text: "A quote request lands. Your AI estimator drafts it from past jobs and current material costs, cites every source, and flags the two line items where costs changed since the last similar job. Your senior estimator reviews the assumptions and catches what matters because the source work is already assembled. Their name remains on the quote, and their judgment sets the standard.",
    catchTrail: [
      { label: "AI FLAGGED · 2 LINE ITEMS MOVED", tone: "flagged" },
      { label: "ESTIMATOR CAUGHT · WHAT MATTERED", tone: "caught" },
      { label: "APPROVED · THEIR NAME ON THE QUOTE", tone: "approved" },
    ],
  },
  {
    text: "A floor supervisor asks Teams where the rev-C drawing for a 2019 job lives. The answer arrives with the file, in seconds, with the change history.",
  },
  {
    text: "The weekly ops report assembles itself from your ERP and job tracker. Your supervisor reviews it over coffee instead of building it after dinner.",
  },
] as const;

export const estimatorShare = {
  mailtoSubject: "Worth a look: AI drafting with your judgment on top",
  mailtoBody:
    "This vendor's pitch: the AI does the digging and drafting while the estimator's judgment sets the standard. Your name stays on the quote. If they are wrong about how our quoting works, I want to know why. https://maslow.ai/manufacturing",
} as const;
