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
    title: "Export-anytime, by design.",
    desc: "Vector stores, knowledge graphs, skills, and code live in your repositories in open formats from day one. Firing us is a permissions change, not a migration project.",
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

export const plainAnswers = [
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
    body: "We don't yet hold formal certifications; we're a boutique that wins on architecture. Ask us the hard questions at hello@maslow.ai and we'll answer in writing.",
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
    a: "Keeping Copilot is the right call — for personal productivity it's excellent, and rolling it out was a good decision. What it structurally can't do is own a workflow: it doesn't know your estimating logic, can't carry a quote from request to approval, and doesn't answer from a knowledge system you govern. We build that layer. Most clients run both, side by side: Copilot for individuals, AI employees for the workflows.",
  },
  {
    num: "02",
    q: "Do we need to hire ML engineers?",
    a: "No. That's the point. We build systems your existing IT team can run, we train them during the engagement, and if they're not ready at handover, managed operations covers the gap until they are.",
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
    a: "The model is the most replaceable part of the system. Your knowledge graph, your skills library, and your harness outlive any model release; when a better model ships, we swap it in and your system gets smarter overnight. That's why we engineer the harness instead of betting on a vendor.",
  },
  {
    num: "06",
    q: "Is our data used to train models?",
    a: "No. Never ours, never a provider's, under the configurations we deploy. The full detail, including where data lives and what we access, is on the Security page.",
  },
  {
    num: "07",
    q: "What if it doesn't work for us?",
    a: "Then we say so, in writing, at a gate, and you keep the workflow map, the architecture sketch, and everything built to that point. We'd rather lose an engagement than publish a case study we have to hedge.",
  },
  {
    num: "08",
    q: "Will you push us to cloud or local?",
    a: "Neither, on principle. The cost-and-privacy math decides: high-volume, sensitive workloads tend to earn local hardware; spiky, capability-hungry tasks tend to earn frontier APIs. Most clients end up hybrid, with routing rules instead of religion.",
  },
  {
    num: "09",
    q: "Who actually does the work?",
    a: "The founder, with specialist engineers from a small trusted bench. Two Foundation engagements at a time, maximum, so nobody gets handed to a junior team after the kickoff call.",
  },
  {
    num: "10",
    q: "What do you need from our side?",
    a: "A workflow owner for about two hours a week, a decision-maker at three milestone gates, and scoped read access to the systems the workflow touches. No war rooms, no steering committees.",
  },
  {
    num: "11",
    q: "Can our IT team maintain it after you leave?",
    a: "Yes, by design: open formats, documented skills, playbooks, and training in weeks 11 and 12. Handover is a milestone, not an afterthought.",
  },
  {
    num: "12",
    q: 'What does "no lock-in" mean, concretely?',
    a: "Everything lives in your repositories and your tenant from day one: code, pipelines, prompts, skills, vector stores, graphs. Open models where they clear the quality bar. Firing us is a permissions change. We put it in the contract.",
  },
  {
    num: "13",
    q: "What happens if Rakesh is unavailable mid-engagement?",
    a: "You're never stranded, by design. Every artifact — code, pipelines, skills, docs, and the weekly written status history — lives in your repositories from day one, current and complete. The bench engineers on your engagement work under the same four commitments. We won't pretend a bench engineer replaces his judgment overnight — but the system that de-risks your key people is the same system that de-risks us. That symmetry is deliberate.",
  },
] as const;

export const manufacturingBottlenecks = [
  {
    num: "01",
    title: "Every quote waits on the one person who knows the real numbers.",
    desc: "Your senior estimator isn't the problem — they're the ceiling on how much work you can take. Right now their judgment is trapped inside every quote's two-hour build. Free the judgment from the build, and the ceiling lifts.",
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

export const manufacturingMonday = [
  "A quote request lands. Your AI estimator drafts it from past jobs and current material costs, cites every source, and flags the two line items where costs moved since the last similar job. Your senior estimator reviews in minutes — catching what matters, because the digging is already done. Their name is still on the quote. Their judgment sets the standard the AI drafts to.",
  "A floor supervisor asks Teams where the rev-C drawing for a 2019 job lives. The answer arrives with the file, in seconds, with the change history.",
  "The weekly ops report assembles itself from your ERP and job tracker. Your supervisor reviews it over coffee instead of building it after dinner.",
] as const;
