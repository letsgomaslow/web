"use client";

import { FormEvent, useState } from "react";
import styles from "./forms.module.css";

const FOCUS = [
  "Inbox / email triage",
  "Client intake",
  "Document review",
  "Internal Q&A",
  "Reporting / status updates",
  "Something else",
];

type Status = "idle" | "loading" | "success" | "error";

type BookFormProps = {
  ctaLabel?: string;
};

export function BookForm({
  ctaLabel = "BOOK A WORKING SESSION",
}: BookFormProps) {
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
          source: "book",
          name: String(data.get("name") || "").trim(),
          email: String(data.get("email") || "").trim(),
          company: String(data.get("company") || "").trim(),
          interest: String(data.get("interest") || "").trim(),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(
          json.error ||
            "That didn't send. Try again, or just email hello@maslow.ai. We're not precious about channels.",
        );
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "That didn't send. Try again, or just email hello@maslow.ai. We're not precious about channels.",
      );
    }
  }

  return (
    <form className={styles.stack} onSubmit={onSubmit} noValidate>
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
        <span className={styles.srOnly}>
          Where would an AI teammate help most?
        </span>
        <select
          className={styles.select}
          name="interest"
          required
          defaultValue=""
          aria-label="Where would an AI teammate help most?"
          disabled={status === "loading"}
        >
          <option value="" disabled>
            Where would an AI teammate help most?
          </option>
          {FOCUS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className={styles.submit}
        disabled={status === "loading"}
      >
        {status === "loading" ? "SENDING…" : ctaLabel}
      </button>
      {status === "idle" && (
        <p className={styles.hint}>
          No commitment. We reply within one business day.
        </p>
      )}
      {status === "success" && (
        <p className={`${styles.status} ${styles.statusOk}`}>
          Got it. A real person replies within one business day.
        </p>
      )}
      {status === "error" && (
        <p className={`${styles.status} ${styles.statusErr}`}>{error}</p>
      )}
    </form>
  );
}
