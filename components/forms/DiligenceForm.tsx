"use client";

import { FormEvent, useState } from "react";
import { contactEmail } from "@/lib/brand";
import styles from "./forms.module.css";

const sendError = `That didn't send. Try again, or email ${contactEmail} directly.`;

type Status = "idle" | "loading" | "success" | "error";

/**
 * Pack requests are procurement-stage signals: the send goes to a person,
 * not a drip sequence.
 */
export function DiligenceForm() {
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
          source: "diligence",
          name: String(data.get("name") || "").trim(),
          email: String(data.get("email") || "").trim(),
          company: String(data.get("company") || "").trim(),
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
        <span className={styles.srOnly}>What does your review need first?</span>
        <textarea
          className={styles.textarea}
          name="message"
          placeholder="What does your review need first? (optional)"
          aria-label="What does your review need first?"
          disabled={status === "loading"}
        />
      </label>
      <button
        type="submit"
        className={styles.submit}
        disabled={status === "loading"}
      >
        {status === "loading" ? "SENDING…" : "REQUEST THE PACK"}
      </button>
      {status === "idle" && (
        <p className={styles.hint}>
          The pack goes out from a real person within one business day.
        </p>
      )}
      {status === "success" && (
        <p className={`${styles.status} ${styles.statusOk}`}>
          Got it. The pack goes out from a real person within one business day.
        </p>
      )}
      {status === "error" && (
        <p className={`${styles.status} ${styles.statusErr}`}>{error}</p>
      )}
    </form>
  );
}
