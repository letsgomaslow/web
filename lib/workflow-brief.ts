import {
  workflowMapperPatterns,
  workflowMapperQuestions,
  type WorkflowMapperQuestionId,
} from "@/lib/content/architecture";

export const WORKFLOW_BRIEF_STORAGE_KEY = "maslow.workflow-brief.v1";
export const WORKFLOW_MAPPER_STATE_STORAGE_KEY =
  "maslow.workflow-mapper-state.v1";
export const WORKFLOW_MAPPER_STATE_VERSION = 1 as const;
export const WORKFLOW_MAPPER_STATE_TTL_MS = 1000 * 60 * 60 * 24 * 7;

const questionIds = [
  "deliverable",
  "owner",
  "source",
  "boundary",
] as const satisfies ReadonlyArray<WorkflowMapperQuestionId>;

export type WorkflowMapperAnswers = Partial<
  Record<WorkflowMapperQuestionId, string>
>;

export type WorkflowMapperState = {
  version: typeof WORKFLOW_MAPPER_STATE_VERSION;
  updatedAt: number;
  expiresAt: number;
  completed: boolean;
  answers: WorkflowMapperAnswers;
};

export type WorkflowBriefSelection = {
  id: string;
  label: string;
};

export type WorkflowBrief = {
  version: 1;
  patternId: string;
  title: string;
  selections: Record<WorkflowMapperQuestionId, WorkflowBriefSelection>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowedKeys: readonly string[],
) {
  return Object.keys(value).every((key) => allowedKeys.includes(key));
}

function canonicalSelection(
  questionId: WorkflowMapperQuestionId,
  optionId: unknown,
): WorkflowBriefSelection | null {
  if (typeof optionId !== "string") return null;
  const question = workflowMapperQuestions.find(({ id }) => id === questionId);
  const option = question?.options.find(({ id }) => id === optionId);
  return option ? { id: option.id, label: option.label } : null;
}

function normalizeAnswers(value: unknown, requireComplete: boolean) {
  if (!isRecord(value) || !hasOnlyKeys(value, questionIds)) return null;

  const answers: WorkflowMapperAnswers = {};
  let foundGap = false;

  for (const questionId of questionIds) {
    const optionId = value[questionId];
    if (optionId === undefined) {
      foundGap = true;
      continue;
    }
    if (foundGap || !canonicalSelection(questionId, optionId)) return null;
    answers[questionId] = optionId as string;
  }

  const answerCount = Object.keys(answers).length;
  if (answerCount === 0 || (requireComplete && answerCount !== questionIds.length)) {
    return null;
  }
  return answers;
}

export function createWorkflowMapperState(
  answers: WorkflowMapperAnswers,
  completed = false,
  now = Date.now(),
): WorkflowMapperState | null {
  const normalized = normalizeAnswers(answers, completed);
  if (!normalized || !Number.isFinite(now) || now <= 0) return null;

  return {
    version: WORKFLOW_MAPPER_STATE_VERSION,
    updatedAt: now,
    expiresAt: now + WORKFLOW_MAPPER_STATE_TTL_MS,
    completed,
    answers: normalized,
  };
}

export function parseWorkflowMapperState(
  value: unknown,
  now = Date.now(),
): WorkflowMapperState | null {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, [
      "version",
      "updatedAt",
      "expiresAt",
      "completed",
      "answers",
    ]) ||
    value.version !== WORKFLOW_MAPPER_STATE_VERSION ||
    typeof value.completed !== "boolean" ||
    typeof value.updatedAt !== "number" ||
    typeof value.expiresAt !== "number" ||
    !Number.isFinite(value.updatedAt) ||
    !Number.isFinite(value.expiresAt) ||
    value.updatedAt <= 0 ||
    value.expiresAt <= value.updatedAt ||
    value.expiresAt - value.updatedAt > WORKFLOW_MAPPER_STATE_TTL_MS ||
    value.updatedAt > now ||
    value.expiresAt <= now
  ) {
    return null;
  }

  const answers = normalizeAnswers(value.answers, value.completed);
  if (!answers) return null;

  return {
    version: WORKFLOW_MAPPER_STATE_VERSION,
    updatedAt: value.updatedAt,
    expiresAt: value.expiresAt,
    completed: value.completed,
    answers,
  };
}

export function buildWorkflowBrief(
  answers: WorkflowMapperAnswers,
): WorkflowBrief | null {
  const normalized = normalizeAnswers(answers, true);
  if (!normalized) return null;

  const deliverable = canonicalSelection("deliverable", normalized.deliverable);
  const owner = canonicalSelection("owner", normalized.owner);
  const source = canonicalSelection("source", normalized.source);
  const boundary = canonicalSelection("boundary", normalized.boundary);
  if (!deliverable || !owner || !source || !boundary) return null;

  const pattern = workflowMapperPatterns.find(
    ({ deliverableId }) => deliverableId === deliverable.id,
  );
  if (!pattern) return null;

  return {
    version: 1,
    patternId: pattern.id,
    title: pattern.title,
    selections: { deliverable, owner, source, boundary },
  };
}

export function parseWorkflowBrief(value: unknown): WorkflowBrief | null {
  if (
    !isRecord(value) ||
    value.version !== 1 ||
    typeof value.patternId !== "string" ||
    !isRecord(value.selections)
  ) {
    return null;
  }

  const selectionIds: WorkflowMapperAnswers = {};
  for (const questionId of questionIds) {
    const selection = value.selections[questionId];
    if (!isRecord(selection) || typeof selection.id !== "string") return null;
    selectionIds[questionId] = selection.id;
  }

  const brief = buildWorkflowBrief(selectionIds);
  return brief?.patternId === value.patternId ? brief : null;
}

export function isWorkflowBrief(value: unknown): value is WorkflowBrief {
  const canonical = parseWorkflowBrief(value);
  if (!canonical || !isRecord(value) || !isRecord(value.selections)) return false;
  if (value.title !== canonical.title) return false;
  const selections = value.selections;

  return questionIds.every((questionId) => {
    const selection = selections[questionId];
    const expected = canonical.selections[questionId];
    return (
      isRecord(selection) &&
      selection.id === expected.id &&
      selection.label === expected.label
    );
  });
}

export function formatWorkflowBrief(brief: WorkflowBrief) {
  return [
    "Workflow mapper brief",
    `Delayed deliverable: ${brief.selections.deliverable.label}`,
    `Responsible owner: ${brief.selections.owner.label}`,
    `Current source: ${brief.selections.source.label}`,
    `Human decision boundary: ${brief.selections.boundary.label}`,
    `Suggested ownership path: ${brief.title}`,
  ].join("\n");
}
