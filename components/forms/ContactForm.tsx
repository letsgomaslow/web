"use client";

import { track } from "@vercel/analytics";
import { FormEvent, useEffect, useRef, useState } from "react";
import { contactEmail, ctaContactSubmitLabel } from "@/lib/brand";
import {
  WORKFLOW_BRIEF_STORAGE_KEY,
  WORKFLOW_MAPPER_STATE_STORAGE_KEY,
  formatWorkflowBrief,
  parseWorkflowBrief,
} from "@/lib/workflow-brief";
import styles from "./forms.module.css";

const sendError = `That didn't send. Try again, or just email ${contactEmail}. We're not precious about channels.`;

const INTERESTS = [
  "AI readiness assessment",
  "AI employee pilot",
  "Knowledge foundation / Hybrid RAG",
  "Custom workflow system",
  "Local AI / on-prem",
  "90-Day AI Foundation",
  "Something else",
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [hasWorkflowBrief, setHasWorkflowBrief] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(WORKFLOW_BRIEF_STORAGE_KEY);
      if (!stored) return;
      const parsed: unknown = JSON.parse(stored);
      const brief = parseWorkflowBrief(parsed);
      if (!brief) {
        window.sessionStorage.removeItem(WORKFLOW_BRIEF_STORAGE_KEY);
        return;
      }
      setMessage(formatWorkflowBrief(brief));
      setHasWorkflowBrief(true);
    } catch {
      try {
        window.sessionStorage.removeItem(WORKFLOW_BRIEF_STORAGE_KEY);
      } catch {
        // The form remains usable when session storage is unavailable.
      }
    }
  }, []);

  const trackStart = () => {
    if (started.current) return;
    started.current = true;
    track("Working session form started", {
      source: hasWorkflowBrief ? "workflow-mapper" : "contact",
    });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          name: String(data.get("name") || "").trim(),
          email: String(data.get("email") || "").trim(),
          company: String(data.get("company") || "").trim(),
          interest: String(data.get("interest") || "").trim(),
          message: String(data.get("message") || "").trim(),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(
          json.error || sendError,
        );
      }
      setStatus("success");
      track("Working session submitted", {
        source: hasWorkflowBrief ? "workflow-mapper" : "contact",
      });
      if (hasWorkflowBrief) {
        try {
          window.sessionStorage.removeItem(WORKFLOW_BRIEF_STORAGE_KEY);
          window.sessionStorage.removeItem(WORKFLOW_MAPPER_STATE_STORAGE_KEY);
        } catch {
          // A successful submission does not depend on browser storage access.
        }
      }
      setHasWorkflowBrief(false);
      setMessage("");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : sendError,
      );
    }
  }

  return (
    <form
      className={styles.stack}
      onSubmit={onSubmit}
      onFocusCapture={trackStart}
      aria-busy={status === "loading"}
    >
      {hasWorkflowBrief ? (
        <div className={styles.workflowContext} role="status">
          <strong>WORKFLOW MAPPER BRIEF ADDED</strong>
          <span>Review or edit it in the message field before sending.</span>
        </div>
      ) : null}
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Full name</span>
          <input
            className={styles.input}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full name"
            disabled={status === "loading"}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Work email</span>
          <input
            className={styles.input}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Work email"
            disabled={status === "loading"}
          />
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Company</span>
        <input
          className={styles.input}
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company"
          disabled={status === "loading"}
        />
      </label>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>What are you exploring?</span>
        <select
          className={styles.select}
          name="interest"
          required
          defaultValue=""
          disabled={status === "loading"}
        >
          <option value="" disabled>
            What are you exploring?
          </option>
          {INTERESTS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Message</span>
        <textarea
          className={styles.textarea}
          name="message"
          placeholder="Tell us about the workflow (optional)"
          disabled={status === "loading"}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      <button
        type="submit"
        className={styles.submit}
        disabled={status === "loading"}
      >
        {status === "loading" ? "SENDING…" : ctaContactSubmitLabel}
      </button>
      {status === "idle" && (
        <p className={styles.hint}>
          We reply within one business day. Prefer email?{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      )}
      {status === "success" && (
        <p className={`${styles.status} ${styles.statusOk}`} role="status">
          Got it. A member of our team replies within one business day.
        </p>
      )}
      {status === "error" && (
        <p className={`${styles.status} ${styles.statusErr}`} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
