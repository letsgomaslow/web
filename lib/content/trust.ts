export const securityPrinciples = [
  {
    num: "01",
    title: "Your data stays in your house.",
    desc: "Wherever possible, systems run inside your Microsoft 365 or cloud tenant, or on hardware you own. We build in your environment, not ours.",
  },
  {
    num: "02",
    title: "Least-privilege, scoped, revocable.",
    desc: "Connectors get read access to exactly the systems a workflow needs, nothing else. You can see the scope list and revoke it at any time.",
  },
  {
    num: "03",
    title: "Your data trains nothing.",
    desc: "Client data is never used to train models, ours or anyone's. Model providers we route to are configured for zero retention where the provider supports it.",
  },
  {
    num: "04",
    title: "Humans approve, systems record.",
    desc: "Every consequential action an AI employee takes requires human approval and lands in an audit trail you own.",
  },
  {
    num: "05",
    title: "Keep the system portable.",
    desc: "Vector stores, knowledge graphs, skills, and code live in your repositories in open formats from day one. Ending our access requires a permissions change, without a separate migration project.",
  },
] as const;

export const dataLocations = [
  {
    title: "IN YOUR TENANT",
    desc: "Documents, mailboxes, chat history, and the knowledge systems we build from them.",
  },
  {
    title: "IN TRANSIT, ENCRYPTED",
    desc: "Calls to model APIs when a task routes to a frontier model, under the retention terms above. TLS everywhere.",
  },
  {
    title: "ON YOUR HARDWARE",
    desc: "For local deployments: models, weights, and inference logs never leave the building.",
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
    num: "01",
    q: "We already pay for Microsoft Copilot. Why isn't that enough?",
    a: "Copilot is strong at personal productivity, and most clients should keep it. It does not know your estimating logic, carry a quote from request to approval, or answer from a knowledge system you govern. We build that workflow layer. Copilot assists individuals; AI employees carry the workflow.",
  },
  {
    num: "02",
    q: "Do we need to hire ML engineers?",
    a: "No. We build systems your existing IT team can run and train them during the engagement. If the team is not ready at handover, managed operations covers the gap until it is.",
  },
  {
    num: "03",
    q: "How is this priced?",
    a: "Fixed fees, quoted before we start. Workflow Discovery, the 90-Day Foundation (scoped to one measurable workflow result), and managed operations. Go/no-go gates mean you can stop at weeks 2, 4, or 10 and keep everything produced.",
  },
  {
    num: "04",
    q: "How fast until something is actually live?",
    a: "A supervised AI employee in one channel typically inside six weeks. A full foundation (knowledge systems, harness, first agent in production) in ninety days. We publish the week-by-week anatomy on the How We Engage page.",
  },
  {
    num: "05",
    q: "Models keep changing. Won't this be obsolete in a year?",
    a: "The model is the most replaceable part of the system. Your knowledge graph, skills library, and harness can outlive a model release. When a better model becomes available, we test it against the same workflow before changing the production route.",
  },
  {
    num: "06",
    q: "Is our data used to train models?",
    a: "No. Never ours, never a provider's, under the configurations we deploy. The full detail, including where data lives and what we access, is on the Security page.",
  },
  {
    num: "07",
    q: "What if it doesn't work for us?",
    a: "We document the result at a gate and recommend stopping. You keep the workflow map, architecture sketch, and everything built to that point.",
  },
  {
    num: "08",
    q: "Will you push us to cloud or local?",
    a: "The workload decides. High-volume or sensitive work often favors local hardware, while infrequent tasks that need the strongest available model may favor frontier APIs. Many deployments use both with documented routing rules.",
  },
  {
    num: "09",
    q: "Who actually does the work?",
    a: "Rakesh leads the work with specialist engineers from a small trusted bench. Maslow accepts no more than two Foundation engagements at a time, which keeps him directly involved after kickoff. If both slots are full, we give you the next available start date and can complete Workflow Discovery beforehand.",
  },
  {
    num: "10",
    q: "What do you need from our side?",
    a: "A workflow owner for about two hours a week, a decision-maker at three milestone gates, and scoped read access to the systems the workflow touches. No war rooms, no steering committees.",
  },
  {
    num: "11",
    q: "Can our IT team maintain it after you leave?",
    a: "Yes. We use open formats, document the skills, provide playbooks, and train your team in weeks 11 and 12. Handover is part of the engagement plan.",
  },
  {
    num: "12",
    q: 'What does "no lock-in" mean, concretely?',
    a: "Everything lives in your repositories and your tenant from day one: code, pipelines, prompts, skills, vector stores, graphs. Open models where they clear the quality bar. Firing us is a permissions change. We put it in the contract.",
  },
  {
    num: "13",
    q: "What happens if Rakesh is unavailable mid-engagement?",
    a: "Code, pipelines, skills, documentation, and weekly status history live in your repositories from day one. Specialist engineers on the engagement work under the same commitments and can continue against that record. A substitute cannot replace Rakesh's judgment overnight, but the work remains accessible and documented while availability is resolved.",
  },
  {
    num: "14",
    q: "Our procurement team has a security questionnaire. Will you fill it in?",
    a: "Yes. Send it early. The diligence pack maps our controls to standard questionnaire fields, lists subprocessors and retention terms, and documents exit paths. We return written answers for anything the current pack does not cover.",
  },
] as const;

export const manufacturingBottlenecks = [
  {
    num: "01",
    title: "Every quote waits on the one person who knows the real numbers.",
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
