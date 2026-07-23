"use client";

import { FormEvent, useState } from "react";
import styles from "./forms.module.css";

type Status = "idle" | "loading" | "success" | "error";

type NewsletterFormProps = {
  source?: "newsletter";
  showName?: boolean;
};

export function NewsletterForm({
  source = "newsletter",
  showName = false,
}: NewsletterFormProps) {
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
          source,
          email: String(data.get("email") || "").trim(),
          name: String(data.get("name") || "").trim() || undefined,
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
    <form className={styles.newsletter} onSubmit={onSubmit} noValidate>
      {showName && (
        <label className={styles.newsletterField}>
          <span className={styles.srOnly}>Your name</span>
          <input
            className={styles.newsletterInput}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-label="Your name"
            disabled={status === "loading"}
          />
        </label>
      )}
      <label className={styles.newsletterField}>
        <span className={styles.srOnly}>Work email</span>
        <input
          className={styles.newsletterInput}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          aria-label="Work email"
          disabled={status === "loading"}
        />
      </label>
      <button
        type="submit"
        className={styles.newsletterSubmit}
        disabled={status === "loading"}
      >
        {status === "loading" ? "…" : "SUBSCRIBE"}
      </button>
      {status === "success" && (
        <p
          className={`${styles.newsletterStatus} ${styles.newsletterStatusOk}`}
        >
          You&apos;re on the list. One useful email a month.
        </p>
      )}
      {status === "error" && (
        <p
          className={`${styles.newsletterStatus} ${styles.newsletterStatusErr}`}
        >
          {error}
        </p>
      )}
    </form>
  );
}
