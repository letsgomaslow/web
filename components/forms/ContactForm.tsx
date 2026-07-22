"use client";

import { FormEvent, useState } from "react";
import styles from "./forms.module.css";

const INTERESTS = [
  "AI readiness assessment",
  "Virtual AI employee pilot",
  "Knowledge foundation / Hybrid RAG",
  "Custom agentic harness",
  "Local AI / on-prem",
  "End-to-end transformation",
  "Something else",
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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
          json.error || "Something went wrong. Please try again.",
        );
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form className={styles.stack} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.srOnly}>Full name</span>
          <input
            className={styles.input}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full name"
            aria-label="Full name"
            disabled={status === "loading"}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.srOnly}>Work email</span>
          <input
            className={styles.input}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Work email"
            aria-label="Work email"
            disabled={status === "loading"}
          />
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.srOnly}>Company</span>
        <input
          className={styles.input}
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company"
          aria-label="Company"
          disabled={status === "loading"}
        />
      </label>
      <label className={styles.field}>
        <span className={styles.srOnly}>What are you exploring?</span>
        <select
          className={styles.select}
          name="interest"
          required
          defaultValue=""
          aria-label="What are you exploring?"
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
        <span className={styles.srOnly}>Message</span>
        <textarea
          className={styles.textarea}
          name="message"
          placeholder="Tell us about the workflow (optional)"
          aria-label="Message"
          disabled={status === "loading"}
        />
      </label>
      <button
        type="submit"
        className={styles.submit}
        disabled={status === "loading"}
      >
        {status === "loading" ? "SENDING…" : "REQUEST THE SESSION"}
      </button>
      {status === "idle" && (
        <p className={styles.hint}>We reply within one business day.</p>
      )}
      {status === "success" && (
        <p className={`${styles.status} ${styles.statusOk}`}>
          Thanks — we&apos;ll be in touch within one business day.
        </p>
      )}
      {status === "error" && (
        <p className={`${styles.status} ${styles.statusErr}`}>{error}</p>
      )}
    </form>
  );
}
