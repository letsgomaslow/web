"use client";

import { useState } from "react";
import styles from "./SkillLibrary.module.css";

const lib = [
  {
    name: "Invoice reconciliation",
    version: "v1.3",
    summary: "Match invoices against contracted terms before payment.",
    meta: "UPDATED 12D AGO · 47 RUNS THIS WEEK",
    desc: "Given an inbound invoice, verify it against the governing agreement and flag discrepancies before anything is paid.",
    steps: [
      {
        num: "01",
        text: "Extract vendor, amount, terms and line items from the invoice",
        tag: "PARSE",
      },
      {
        num: "02",
        text: "Look up the governing agreement in the knowledge graph",
        tag: "CONTEXT",
      },
      {
        num: "03",
        text: "Compare payment terms, rates and scope clause-by-clause",
        tag: "REASON",
      },
      {
        num: "04",
        text: "Draft a correction reply if anything mismatches",
        tag: "DRAFT",
      },
      {
        num: "05",
        text: "Queue for human approval; never auto-send",
        tag: "GUARDRAIL",
      },
    ],
    agents: ["Riley · Ops"],
    channels: ["Teams", "Email"],
  },
  {
    name: "Client intake triage",
    version: "v2.0",
    summary: "Classify, prioritise and route new client requests.",
    meta: "UPDATED 3D AGO · 210 RUNS THIS WEEK",
    desc: "Every inbound request gets classified, checked for conflicts, and routed to the right person with context attached.",
    steps: [
      {
        num: "01",
        text: "Classify the request type and urgency",
        tag: "PARSE",
      },
      {
        num: "02",
        text: "Run a conflict check against the client graph",
        tag: "CONTEXT",
      },
      {
        num: "03",
        text: "Draft an acknowledgment with realistic timeline",
        tag: "DRAFT",
      },
      {
        num: "04",
        text: "Route to the right owner with a one-paragraph brief",
        tag: "ACT",
      },
      {
        num: "05",
        text: "Escalate anything ambiguous to a human",
        tag: "GUARDRAIL",
      },
    ],
    agents: ["Riley · Ops", "Sage · Intake"],
    channels: ["Email", "Slack"],
  },
  {
    name: "Contract term lookup",
    version: "v1.8",
    summary: "Answer term questions with clause-level citations.",
    meta: "UPDATED 8D AGO · 132 RUNS THIS WEEK",
    desc: "Plain-English questions about any agreement, answered from the governing document with the exact clause cited.",
    steps: [
      {
        num: "01",
        text: "Resolve which agreement governs the entity in question",
        tag: "CONTEXT",
      },
      {
        num: "02",
        text: "Retrieve candidate clauses via hybrid RAG",
        tag: "CONTEXT",
      },
      {
        num: "03",
        text: "Answer with section numbers and source file linked",
        tag: "DRAFT",
      },
      {
        num: "04",
        text: "Flag conflicts between documents instead of guessing",
        tag: "GUARDRAIL",
      },
    ],
    agents: ["Riley · Ops", "Sage · Intake"],
    channels: ["Teams", "Slack", "Email"],
  },
  {
    name: "Meeting brief",
    version: "v1.1",
    summary: "Assemble a one-page brief before every external meeting.",
    meta: "UPDATED 21D AGO · 38 RUNS THIS WEEK",
    desc: "Thirty minutes before an external meeting, a brief arrives: who you're meeting, open threads, and what changed since last time.",
    steps: [
      {
        num: "01",
        text: "Pull attendees and history from calendar + CRM",
        tag: "CONTEXT",
      },
      {
        num: "02",
        text: "Summarise open items and recent correspondence",
        tag: "REASON",
      },
      {
        num: "03",
        text: "Post the brief to your channel 30 minutes ahead",
        tag: "ACT",
      },
    ],
    agents: ["Sage · Intake"],
    channels: ["Teams", "Slack"],
  },
];

const tagColors: Record<string, string> = {
  GUARDRAIL: "#EBA93D",
  CONTEXT: "#73C1AE",
  PARSE: "#B8C4D9",
  REASON: "#B8C4D9",
  DRAFT: "#B8C4D9",
  ACT: "#B8C4D9",
};

export function SkillLibrary() {
  const [selected, setSelected] = useState(0);
  const sel = lib[selected];

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {lib.map((s, i) => (
          <button
            key={s.name}
            type="button"
            className={styles.item}
            style={{
              borderColor: i === selected ? "#73C1AE" : "#3A4A6B",
              background:
                i === selected ? "rgba(115,193,174,.1)" : "transparent",
            }}
            onClick={() => setSelected(i)}
          >
            <div className={styles.itemName}>
              {s.name} <span>{s.version}</span>
            </div>
            <div className={styles.itemSummary}>{s.summary}</div>
          </button>
        ))}
      </div>
      <div className={styles.detail}>
        <div className={styles.meta}>{sel.meta}</div>
        <h3>{sel.name}</h3>
        <p>{sel.desc}</p>
        <div className={styles.steps}>
          {sel.steps.map((st) => (
            <div key={st.num} className={styles.step}>
              <span>{st.num}</span>
              <span>{st.text}</span>
              <em style={{ color: tagColors[st.tag] }}>{st.tag}</em>
            </div>
          ))}
        </div>
        <div className={styles.gateway}>
          <div>
            <span>Agents</span>
            {sel.agents.join(" · ")}
          </div>
          <div>
            <span>Channels</span>
            {sel.channels.join(" · ")}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GatewayDiagram() {
  return (
    <div className={styles.diagramCard}>
      <svg viewBox="0 0 1120 340" className={styles.svg} aria-hidden>
        <g
          stroke="#73C1AE"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          fill="none"
          className={styles.dash}
        >
          <path d="M 190 80 C 300 80 320 170 430 170" />
          <path d="M 190 170 L 430 170" />
          <path d="M 190 260 C 300 260 320 170 430 170" />
          <path d="M 620 170 L 760 170" />
        </g>
        <g>
          <rect x="60" y="52" width="130" height="56" rx="4" fill="#FFFFFF" stroke="#E1E1E1" />
          <text x="125" y="86" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="15" fontWeight="700" fill="#192332">Teams</text>
          <rect x="60" y="142" width="130" height="56" rx="4" fill="#FFFFFF" stroke="#E1E1E1" />
          <text x="125" y="176" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="15" fontWeight="700" fill="#192332">Slack</text>
          <rect x="60" y="232" width="130" height="56" rx="4" fill="#FFFFFF" stroke="#E1E1E1" />
          <text x="125" y="266" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="15" fontWeight="700" fill="#192332">Email</text>
        </g>
        <rect x="430" y="128" width="190" height="84" rx="4" fill="#121D35" />
        <text x="525" y="164" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="16" fontWeight="700" fill="#FFFFFF">Gateway</text>
        <text x="525" y="186" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="10" fill="#73C1AE">AUTH · TRANSLATION · AUDIT</text>
        <rect x="760" y="96" width="300" height="148" rx="4" fill="#FFFFFF" stroke="#192332" strokeWidth="1.5" />
        <text x="910" y="130" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="16" fontWeight="700" fill="#192332">Agent harness</text>
        <g fontFamily="'IBM Plex Mono',monospace" fontSize="10.5" fill="#192332">
          <rect x="786" y="150" width="76" height="26" rx="2" fill="none" stroke="#73C1AE" />
          <text x="824" y="167" textAnchor="middle">SKILLS</text>
          <rect x="872" y="150" width="76" height="26" rx="2" fill="none" stroke="#A070A6" />
          <text x="910" y="167" textAnchor="middle">MEMORY</text>
          <rect x="958" y="150" width="82" height="26" rx="2" fill="none" stroke="#EBA93D" />
          <text x="999" y="167" textAnchor="middle">CONTEXT</text>
          <rect x="786" y="186" width="120" height="26" rx="2" fill="none" stroke="#469DBB" />
          <text x="846" y="203" textAnchor="middle">GUARDRAILS</text>
          <rect x="916" y="186" width="124" height="26" rx="2" fill="none" stroke="#E1E1E1" />
          <text x="978" y="203" textAnchor="middle">MODEL CORE</text>
        </g>
        <g fontFamily="Manrope,sans-serif" fontSize="11.5" fill="#A5A5A5">
          <text x="310" y="150" textAnchor="middle">messages · files</text>
          <text x="310" y="196" textAnchor="middle">approvals · replies</text>
          <text x="690" y="160" textAnchor="middle">one secure link</text>
        </g>
      </svg>
    </div>
  );
}
