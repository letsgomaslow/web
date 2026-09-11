"use client";

import type { EmbedEvent } from "@calcom/embed-react";
import { track } from "@vercel/analytics";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { contactEmail } from "@/lib/brand";
import {
  BOOKING_CAL_LINK,
  BOOKING_BRIEF_DRAFT_MAX_LENGTH,
  BOOKING_BRIEF_DRAFT_STORAGE_KEY,
  BOOKING_LOAD_TIMEOUT_MS,
  BOOKING_URL,
  buildBookingNotes,
  bookingStatusMessage,
  createBookingBriefDraft,
  parseBookingBriefDraft,
  parseBookingTopic,
  type BookingEmbedState,
  type BookingSource,
  type BookingTopic,
} from "@/lib/booking";
import {
  WORKFLOW_BRIEF_STORAGE_KEY,
  formatWorkflowBrief,
  parseWorkflowBrief,
} from "@/lib/workflow-brief";
import styles from "./BookingExperience.module.css";

const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => null,
});

const calTheme = {
  theme: "light" as const,
  hideEventTypeDetails: false,
  styles: {
    body: { background: "#ffffff" },
    branding: { brandColor: "#192332" },
  },
  cssVarsPerTheme: {
    light: {
      "cal-brand": "#192332",
      "cal-brand-emphasis": "#247967",
      "cal-brand-text": "#ffffff",
      "cal-brand-subtle": "#d9f2eb",
      "cal-brand-accent": "#6dc4ad",
      "cal-text": "#333333",
      "cal-text-emphasis": "#192332",
      "cal-text-subtle": "#666666",
      "cal-text-muted": "#6f6f6f",
      "cal-text-inverted": "#ffffff",
      "cal-bg": "#ffffff",
      "cal-bg-emphasis": "#e6f5f1",
      "cal-bg-subtle": "#f6f7f9",
      "cal-bg-muted": "#f6f7f9",
      "cal-bg-inverted": "#192332",
      "cal-border": "#cbd1d8",
      "cal-border-emphasis": "#247967",
      "cal-border-subtle": "#dfe3e7",
      "cal-border-muted": "#eef0f2",
      "cal-border-booker": "transparent",
      "cal-border-booker-width": "0px",
      radius: "0px",
    },
    dark: {
      "cal-brand": "#6dc4ad",
      "cal-brand-emphasis": "#89d0bd",
      "cal-brand-text": "#192332",
      "cal-brand-subtle": "#247967",
      "cal-brand-accent": "#192332",
      "cal-text": "#eef2f4",
      "cal-text-emphasis": "#ffffff",
      "cal-text-subtle": "#cbd1d8",
      "cal-text-muted": "#aeb7c1",
      "cal-text-inverted": "#192332",
      "cal-bg": "#192332",
      "cal-bg-emphasis": "#263549",
      "cal-bg-subtle": "#202d3e",
      "cal-bg-muted": "#1d2938",
      "cal-bg-inverted": "#ffffff",
      "cal-border": "#526174",
      "cal-border-emphasis": "#6dc4ad",
      "cal-border-subtle": "#405064",
      "cal-border-muted": "#334257",
      "cal-border-booker": "transparent",
      "cal-border-booker-width": "0px",
      radius: "0px",
    },
  },
};

export type BookingExperienceProps = {
  source: BookingSource;
  className?: string;
};

export function BookingExperience({
  source,
  className,
}: BookingExperienceProps) {
  const [attempt, setAttempt] = useState(0);
  const [embedState, setEmbedState] =
    useState<BookingEmbedState>("loading");
  const [bookingMessage, setBookingMessage] = useState("");
  const [topic, setTopic] = useState<BookingTopic | null>(null);
  const [queryReady, setQueryReady] = useState(false);
  const [mountedNamespace, setMountedNamespace] = useState<string | null>(null);
  const [briefText, setBriefText] = useState("");
  const [hasBrief, setHasBrief] = useState(false);
  const [sharedBrief, setSharedBrief] = useState("");
  const openedTracked = useRef(false);
  const completedTracked = useRef(false);
  const workflowBrief = useRef<
    ReturnType<typeof parseWorkflowBrief>
  >(null);
  const namespace = useMemo(
    () => `maslow-${source}-${attempt}`,
    [attempt, source],
  );

  const bookingNotes = buildBookingNotes(topic, sharedBrief);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setTopic(parseBookingTopic(query.get("topic")));
    setQueryReady(true);
  }, []);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(WORKFLOW_BRIEF_STORAGE_KEY);
      if (!stored) {
        window.sessionStorage.removeItem(BOOKING_BRIEF_DRAFT_STORAGE_KEY);
        return;
      }

      const parsed: unknown = JSON.parse(stored);
      const brief = parseWorkflowBrief(parsed);
      if (!brief) {
        window.sessionStorage.removeItem(WORKFLOW_BRIEF_STORAGE_KEY);
        window.sessionStorage.removeItem(BOOKING_BRIEF_DRAFT_STORAGE_KEY);
        return;
      }

      workflowBrief.current = brief;
      let nextBriefText = formatWorkflowBrief(brief);
      const storedDraft = window.sessionStorage.getItem(
        BOOKING_BRIEF_DRAFT_STORAGE_KEY,
      );

      if (storedDraft) {
        try {
          const draft = parseBookingBriefDraft(JSON.parse(storedDraft), brief);
          if (draft) {
            nextBriefText = draft.text;
          } else {
            window.sessionStorage.removeItem(
              BOOKING_BRIEF_DRAFT_STORAGE_KEY,
            );
          }
        } catch {
          window.sessionStorage.removeItem(BOOKING_BRIEF_DRAFT_STORAGE_KEY);
        }
      }

      setBriefText(nextBriefText);
      setHasBrief(true);
    } catch {
      try {
        window.sessionStorage.removeItem(WORKFLOW_BRIEF_STORAGE_KEY);
        window.sessionStorage.removeItem(BOOKING_BRIEF_DRAFT_STORAGE_KEY);
      } catch {
        // Booking remains available when session storage is unavailable.
      }
    }
  }, []);

  useEffect(() => {
    if (!queryReady) return;

    let active = true;
    let disconnected = false;
    let api:
      | Awaited<ReturnType<typeof import("@calcom/embed-react")["getCalApi"]>>
      | undefined;

    const onReady = () => {
      if (!active) return;
      window.clearTimeout(timeout);
      setEmbedState("ready");

      if (!openedTracked.current) {
        openedTracked.current = true;
        track("Booking opened", { source });
      }
    };

    const onFailure = () => {
      if (!active) return;
      setEmbedState("error");
      setMountedNamespace(null);
      disconnect();
    };

    const onBookingSuccess = (
      event: EmbedEvent<"bookingSuccessfulV2">,
    ) => {
      if (!active) return;
      setBookingMessage(bookingStatusMessage(event.detail.data.status));
      setEmbedState("completed");

      if (!completedTracked.current) {
        completedTracked.current = true;
        track("Booking completed", { source });
      }

      disconnect();
    };

    function disconnect() {
      if (disconnected) return;
      disconnected = true;
      active = false;
      window.clearTimeout(timeout);
      if (!api) return;
      api("off", { action: "linkReady", callback: onReady });
      api("off", { action: "linkFailed", callback: onFailure });
      api("off", {
        action: "bookingSuccessfulV2",
        callback: onBookingSuccess,
      });
    }

    const timeout = window.setTimeout(onFailure, BOOKING_LOAD_TIMEOUT_MS);

    async function connectToEmbed() {
      try {
        const { getCalApi } = await import("@calcom/embed-react");
        const nextApi = await getCalApi({ namespace });
        if (!active) return;
        api = nextApi;
        api("ui", calTheme);
        api("on", { action: "linkReady", callback: onReady });
        api("on", { action: "linkFailed", callback: onFailure });
        api("on", {
          action: "bookingSuccessfulV2",
          callback: onBookingSuccess,
        });
        setMountedNamespace(namespace);
      } catch {
        if (!active) return;
        setEmbedState("error");
        setMountedNamespace(null);
        disconnect();
      }
    }

    void connectToEmbed();

    return disconnect;
  }, [namespace, queryReady, source]);

  const briefIsCurrent =
    sharedBrief.length > 0 && sharedBrief === briefText.trim();

  const briefPrivacyMessage = sharedBrief
    ? briefIsCurrent
      ? "This version is now added to the Cal.com booking form. The draft stays in this browser until you remove it."
      : "Your latest edits are still only in this browser. Choose Update brief for booking to share them."
    : "Your brief stays in this browser until you choose to add it to the booking.";

  function retryEmbed() {
    setBookingMessage("");
    setEmbedState("loading");
    setMountedNamespace(null);
    setAttempt((current) => current + 1);
  }

  function updateBriefText(nextText: string) {
    setBriefText(nextText);
    if (!workflowBrief.current) return;

    const draft = createBookingBriefDraft(workflowBrief.current, nextText);
    if (!draft) return;

    try {
      window.sessionStorage.setItem(
        BOOKING_BRIEF_DRAFT_STORAGE_KEY,
        JSON.stringify(draft),
      );
    } catch {
      // Editing remains available when session storage is unavailable.
    }
  }

  function useBriefForBooking() {
    const nextBrief = briefText.trim();
    if (!nextBrief) return;
    setSharedBrief(nextBrief);
    retryEmbed();
  }

  function removeBrief() {
    try {
      window.sessionStorage.removeItem(WORKFLOW_BRIEF_STORAGE_KEY);
      window.sessionStorage.removeItem(BOOKING_BRIEF_DRAFT_STORAGE_KEY);
    } catch {
      // Removing the visible brief does not depend on storage access.
    }

    const needsEmbedRefresh = sharedBrief.length > 0;
    setBriefText("");
    setHasBrief(false);
    setSharedBrief("");
    workflowBrief.current = null;
    if (needsEmbedRefresh) retryEmbed();
  }

  const rootClassName = className
    ? `${styles.experience} ${className}`
    : styles.experience;

  return (
    <section
      className={rootClassName}
      aria-label="Schedule a 30-minute working session"
      data-testid="booking-experience"
      data-booking-source={source}
    >
      {hasBrief ? (
        <div className={styles.brief} data-testid="booking-brief">
          <div className={styles.briefHeader}>
            <div>
              <p className={styles.eyebrow}>YOUR WORKFLOW BRIEF</p>
              <h2 className={styles.briefTitle}>Bring your starting point.</h2>
            </div>
            <button
              className={styles.removeButton}
              type="button"
              onClick={removeBrief}
              data-testid="booking-brief-remove"
            >
              Remove brief
            </button>
          </div>
          <label className={styles.briefField}>
            <span>Review or edit before sharing with Cal.com</span>
            <textarea
              value={briefText}
              onChange={(event) => updateBriefText(event.target.value)}
              rows={7}
              maxLength={BOOKING_BRIEF_DRAFT_MAX_LENGTH}
              data-testid="booking-brief-editor"
            />
          </label>
          <div className={styles.briefActions}>
            <button
              className={styles.useBriefButton}
              type="button"
              onClick={useBriefForBooking}
              disabled={!briefText.trim() || briefIsCurrent}
              data-testid="booking-brief-use"
            >
              {briefIsCurrent
                ? "Brief ready for booking"
                : sharedBrief
                  ? "Update brief for booking"
                  : "Use this brief for booking"}
            </button>
            <p className={styles.briefPrivacy}>
              {briefPrivacyMessage}
            </p>
          </div>
        </div>
      ) : null}

      {topic ? (
        <div
          className={styles.topic}
          data-testid="booking-topic"
          data-topic={topic.id}
        >
          <span>Starting point</span>
          <strong>{topic.label}</strong>
        </div>
      ) : null}

      <div
        className={styles.embedFrame}
        data-testid="booking-state"
        data-state={embedState}
        aria-busy={embedState === "loading"}
      >
        {embedState === "loading" ? (
          <div className={styles.loading} role="status">
            <span className={styles.loadingMark} aria-hidden="true" />
            <span>Opening the calendar…</span>
          </div>
        ) : null}

        {mountedNamespace === namespace && embedState !== "error" ? (
          <Cal
            key={namespace}
            namespace={namespace}
            calLink={BOOKING_CAL_LINK}
            config={{
              layout: "month_view",
              ...(bookingNotes ? { notes: bookingNotes } : {}),
              ...(topic ? { "metadata[maslowTopic]": topic.id } : {}),
            }}
            className={styles.embed}
            data-testid="booking-embed"
          />
        ) : null}

        {embedState === "error" ? (
          <div className={styles.error} role="alert">
            <p className={styles.errorTitle}>The calendar did not load.</p>
            <p>
              Try it once more, or use the scheduling link below to continue on
              Cal.com.
            </p>
            <button
              className={styles.retryButton}
              type="button"
              onClick={retryEmbed}
              data-testid="booking-retry"
            >
              Try calendar again
            </button>
          </div>
        ) : null}
      </div>

      {bookingMessage ? (
        <p
          className={styles.completion}
          role="status"
          data-testid="booking-completion"
        >
          {bookingMessage}
        </p>
      ) : null}

      <p className={styles.fallback}>
        Prefer a separate window?{" "}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="booking-external-link"
        >
          Open the 30-minute calendar
        </a>
        . You can also email{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>
    </section>
  );
}
