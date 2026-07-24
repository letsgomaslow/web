"use client";

import { FormEvent, useState } from "react";
import { contactEmail } from "@/lib/brand";
import styles from "./forms.module.css";

const sendError = `That didn't send. Try again, or just email ${contactEmail}. We're not precious about channels.`;

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
    <form
      className={styles.newsletter}
      onSubmit={onSubmit}
      aria-busy={status === "loading"}
    >
      {showName && (
        <label className={styles.newsletterField}>
          <span className={styles.fieldLabel}>Your name</span>
          <input
            className={styles.newsletterInput}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            disabled={status === "loading"}
          />
        </label>
      )}
      <label className={styles.newsletterField}>
        <span className={styles.fieldLabel}>Work email</span>
        <input
          className={styles.newsletterInput}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
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
          role="status"
        >
          You&apos;re on the list. One useful email a month.
        </p>
      )}
      {status === "error" && (
        <p
          className={`${styles.newsletterStatus} ${styles.newsletterStatusErr}`}
          role="alert"
        >
          {error}
        </p>
      )}
    </form>
  );
}
