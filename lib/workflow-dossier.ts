import {
  workflowMapperPatterns,
  workflowMapperQuestions,
  type WorkflowMapperQuestionId,
} from "@/lib/content/architecture";

export const WORKFLOW_DOSSIER_VERSION = 1 as const;

export type WorkflowDossier = {
  version: typeof WORKFLOW_DOSSIER_VERSION;
  waitingDeliverable: string;
  currentOwner: string;
  sourceOfTruth: string;
  recurringTrigger: string;
  humanDecision: string;
  evidenceRequired: string;
  recommendedNextStep: string;
};

type MapperSelection = {
  id: string;
};

type StoredWorkflowBrief = {
  version: unknown;
  patternId: unknown;
  title?: unknown;
  selections: unknown;
};

const dossierKeys = [
  "waitingDeliverable",
  "currentOwner",
  "sourceOfTruth",
  "recurringTrigger",
  "humanDecision",
  "evidenceRequired",
  "recommendedNextStep",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function getStoredBrief(value: unknown): StoredWorkflowBrief | null {
  if (!isRecord(value) || !isRecord(value.selections)) return null;
  return value as StoredWorkflowBrief;
}

function getSelection(
  selections: Record<string, unknown>,
  questionId: WorkflowMapperQuestionId,
): MapperSelection | null {
  const selection = selections[questionId];
  if (!isRecord(selection) || typeof selection.id !== "string") return null;
  return { id: selection.id };
}

function getCanonicalLabel(questionId: WorkflowMapperQuestionId, optionId: string) {
  const question = workflowMapperQuestions.find((item) => item.id === questionId);
  return question?.options.find((option) => option.id === optionId)?.label ?? null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isWorkflowDossier(value: unknown): value is WorkflowDossier {
  if (!isRecord(value) || value.version !== WORKFLOW_DOSSIER_VERSION) return false;
  return dossierKeys.every((key) => isNonEmptyString(value[key]));
}

/**
 * Converts a mapper brief into display-only, role-level context. It deliberately
 * does not add people, account data, or a guessed workflow trigger.
 */
export function workflowBriefToDossier(value: unknown): WorkflowDossier | null {
  const brief = getStoredBrief(value);
  if (!brief || brief.version !== 1 || typeof brief.patternId !== "string") {
    return null;
  }

  const selections = brief.selections as Record<string, unknown>;
  const deliverable = getSelection(selections, "deliverable");
  const owner = getSelection(selections, "owner");
  const source = getSelection(selections, "source");
  const boundary = getSelection(selections, "boundary");

  if (!deliverable || !owner || !source || !boundary) return null;

  const waitingDeliverable = getCanonicalLabel("deliverable", deliverable.id);
  const currentOwner = getCanonicalLabel("owner", owner.id);
  const sourceOfTruth = getCanonicalLabel("source", source.id);
  const humanDecision = getCanonicalLabel("boundary", boundary.id);
  const pattern = workflowMapperPatterns.find(
    (item) =>
      item.id === brief.patternId && item.deliverableId === deliverable.id,
  );

  if (
    !waitingDeliverable ||
    !currentOwner ||
    !sourceOfTruth ||
    !humanDecision ||
    !pattern
  ) {
    return null;
  }

  return {
    version: WORKFLOW_DOSSIER_VERSION,
    waitingDeliverable,
    currentOwner,
    sourceOfTruth,
    recurringTrigger: "To define in a working session",
    humanDecision,
    evidenceRequired:
      "Source references, assumptions, the reviewer decision, and the next owner.",
    recommendedNextStep: pattern.title,
  };
}
