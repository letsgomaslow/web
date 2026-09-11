import type { WorkflowBrief } from "@/lib/workflow-brief";

export const BOOKING_URL = "https://cal.com/maslow/30min";
export const BOOKING_CAL_LINK = "maslow/30min";
export const BOOKING_LOAD_TIMEOUT_MS = 15_000;
export const BOOKING_BRIEF_DRAFT_STORAGE_KEY =
  "maslow.booking-brief-draft.v1";
export const BOOKING_BRIEF_DRAFT_MAX_LENGTH = 4_000;

export type BookingSource = "contact" | "campaign";

export const BOOKING_TOPICS = {
  "ai-os-preview": "Maslow AI-OS preview",
  "existing-infrastructure": "AI work on existing infrastructure",
} as const;

export type BookingTopicId = keyof typeof BOOKING_TOPICS;

export type BookingTopic = {
  id: BookingTopicId;
  label: (typeof BOOKING_TOPICS)[BookingTopicId];
};

export type BookingEmbedState =
  | "loading"
  | "ready"
  | "error"
  | "completed";

export type BookingBriefDraft = {
  version: 1;
  briefId: string;
  text: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function workflowBriefId(brief: WorkflowBrief) {
  return [
    brief.version,
    brief.patternId,
    brief.selections.deliverable.id,
    brief.selections.owner.id,
    brief.selections.source.id,
    brief.selections.boundary.id,
  ].join(":");
}

export function createBookingBriefDraft(
  brief: WorkflowBrief,
  text: string,
): BookingBriefDraft | null {
  if (text.length > BOOKING_BRIEF_DRAFT_MAX_LENGTH) return null;

  return {
    version: 1,
    briefId: workflowBriefId(brief),
    text,
  };
}

/**
 * Restores edits only for the current canonical planner brief. Sharing consent
 * is deliberately absent, so a reload never forwards the draft to Cal.com.
 */
export function parseBookingBriefDraft(
  value: unknown,
  brief: WorkflowBrief,
): BookingBriefDraft | null {
  if (
    !isRecord(value) ||
    Object.keys(value).some(
      (key) => !["version", "briefId", "text"].includes(key),
    ) ||
    value.version !== 1 ||
    value.briefId !== workflowBriefId(brief) ||
    typeof value.text !== "string" ||
    value.text.length > BOOKING_BRIEF_DRAFT_MAX_LENGTH
  ) {
    return null;
  }

  return {
    version: 1,
    briefId: value.briefId,
    text: value.text,
  };
}

export function parseBookingTopic(value: string | null): BookingTopic | null {
  if (
    !value ||
    !Object.prototype.hasOwnProperty.call(BOOKING_TOPICS, value)
  ) {
    return null;
  }

  const id = value as BookingTopicId;
  return { id, label: BOOKING_TOPICS[id] };
}

export function buildBookingNotes(
  topic: BookingTopic | null,
  workflowBrief: string,
) {
  return [
    topic ? `Starting point: ${topic.label}` : "",
    workflowBrief.trim(),
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function bookingStatusMessage(status?: string) {
  const normalizedStatus = status?.trim().toLowerCase();

  if (normalizedStatus === "accepted" || normalizedStatus === "confirmed") {
    return "Your session is booked. Cal.com has the final details.";
  }

  return "Your booking details were submitted. Follow the status and any next step shown by Cal.com.";
}
