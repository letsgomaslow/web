"use client";

import { useState } from "react";
import styles from "./ChannelDemo.module.css";

const channels = [
  {
    name: "Teams",
    chromeTitle: "#ops-requests · Microsoft Teams",
    chromeBar: "#E8E6F0",
    chromeTitleColor: "#3D3A57",
    chromeBg: "#F5F5F5",
    bubbleHuman: "#FFFFFF",
    bubbleAgent: "#E8EBFA",
    humanAvatarBg: "#6264A7",
    textFaint: "#666666",
    humanMeta: "10:42 AM",
    humanMsg:
      "@Riley can you check if invoice #4482 from Vendor X matches our contract terms?",
    agentMsg:
      "Checked. The invoice assumes net-30, but the 2024 MSA amendment (§7.2) sets net-45. I've drafted a correction reply to the vendor. Approve to send?",
    agentSources: "Sources: MSA_VendorX_2024.pdf · §7.2 · invoice-4482.pdf",
    approveLabel: "Approve & send",
  },
  {
    name: "Slack",
    chromeTitle: "#ops-requests · Slack",
    chromeBar: "#4A154B",
    chromeTitleColor: "#FFFFFF",
    chromeBg: "#FFFFFF",
    bubbleHuman: "#F8F8F8",
    bubbleAgent: "#EAF3FA",
    humanAvatarBg: "#E01E5A",
    textFaint: "#666666",
    humanMeta: "10:42",
    humanMsg:
      "hey @riley, does invoice 4482 from vendor x match what we agreed in the contract?",
    agentMsg:
      "It doesn't: invoice assumes net-30 but the 2024 MSA amendment (§7.2) says net-45. Drafted a reply to the vendor. Want me to send it?",
    agentSources: "Sources: MSA_VendorX_2024.pdf · §7.2 · invoice-4482.pdf",
    approveLabel: "Send it",
  },
  {
    name: "Email",
    chromeTitle: "RE: Invoice #4482 · Vendor X · Outlook",
    chromeBar: "#0F6CBD",
    chromeTitleColor: "#FFFFFF",
    chromeBg: "#FBFBFB",
    bubbleHuman: "#FFFFFF",
    bubbleAgent: "#F0F6FB",
    humanAvatarBg: "#0F6CBD",
    textFaint: "#666666",
    humanMeta: "to: riley@yourfirm.com",
    humanMsg:
      "Riley, please verify invoice #4482 against the Vendor X contract before we pay it. Thanks, Dana",
    agentMsg:
      "Dana, the invoice assumes net-30; the governing 2024 MSA amendment (§7.2) sets net-45. Attached is a drafted correction to the vendor for your review. It will not send without your approval.",
    agentSources:
      "Attachments: draft_reply.eml · MSA_VendorX_2024.pdf (§7.2 highlighted)",
    approveLabel: "Approve draft",
  },
];

const timeline = [
  { t: "09:00", e: "Inbox triage & conflict checks" },
  { t: "11:30", e: "Draft responses queued for approval" },
  { t: "14:00", e: "Contract lookups with citations" },
  { t: "16:45", e: "Day summary posted to the channel" },
];

export function ChannelDemo() {
  const [i, setI] = useState(0);
  const c = channels[i];

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        {channels.map((ch, idx) => (
          <button
            key={ch.name}
            type="button"
            className={styles.tab}
            style={{
              background: idx === i ? "#73C1AE" : "transparent",
              color: idx === i ? "#121D35" : "#B8C4D9",
              borderColor: idx === i ? "#73C1AE" : "#3A4A6B",
            }}
            onClick={() => setI(idx)}
          >
            {ch.name}
          </button>
        ))}
      </div>

      <div className={styles.chrome} style={{ background: c.chromeBg }}>
        <div
          className={styles.bar}
          style={{ background: c.chromeBar, color: c.chromeTitleColor }}
        >
          {c.chromeTitle}
        </div>
        <div className={styles.thread}>
          <div className={styles.msg}>
            <span
              className={styles.avatar}
              style={{ background: c.humanAvatarBg }}
            >
              D
            </span>
            <div>
              <div className={styles.meta} style={{ color: c.textFaint }}>
                {c.humanMeta}
              </div>
              <div
                className={styles.bubble}
                style={{ background: c.bubbleHuman }}
              >
                {c.humanMsg}
              </div>
            </div>
          </div>
          <div className={styles.msg}>
            <span className={styles.avatar} style={{ background: "#73C1AE" }}>
              R
            </span>
            <div>
              <div className={styles.meta} style={{ color: c.textFaint }}>
                Riley · AI employee
              </div>
              <div
                className={styles.bubble}
                style={{ background: c.bubbleAgent }}
              >
                {c.agentMsg}
              </div>
              <div className={styles.sources} style={{ color: c.textFaint }}>
                {c.agentSources}
              </div>
              <button type="button" className={styles.approve}>
                {c.approveLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.tlLabel}>A DAY WITH RILEY</div>
        {timeline.map((item) => (
          <div key={item.t} className={styles.tlItem}>
            <span>{item.t}</span>
            <span>{item.e}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
