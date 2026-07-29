"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { DecisionReceipt } from "@/components/dossier/DecisionReceipt";
import { WorkflowDossierTray } from "@/components/dossier/WorkflowDossierTray";
import { EvidenceReceipt } from "@/components/evidence/EvidenceReceipt";
import { DepthDisclosure } from "@/components/ui/DepthDisclosure";
import {
  workflowMapperPatterns,
  workflowMapperQuestions,
  type WorkflowMapperOption,
  type WorkflowMapperQuestion,
  type WorkflowMapperQuestionId,
} from "@/lib/content/architecture";
import type { EvidenceReceiptData } from "@/lib/content/evidence";
import {
  WORKFLOW_BRIEF_STORAGE_KEY,
  WORKFLOW_MAPPER_STATE_STORAGE_KEY,
  buildWorkflowBrief,
  createWorkflowMapperState,
  formatWorkflowBrief,
  parseWorkflowMapperState,
  type WorkflowBrief,
  type WorkflowMapperAnswers,
} from "@/lib/workflow-brief";
import { workflowBriefToDossier } from "@/lib/workflow-dossier";
import styles from "./WorkflowMapper.module.css";

function selectedOption(
  questionId: WorkflowMapperQuestionId,
  answers: WorkflowMapperAnswers,
) {
  const question = workflowMapperQuestions.find(({ id }) => id === questionId);
  return question?.options.find(({ id }) => id === answers[questionId]);
}

function evidenceForPattern(
  pattern: (typeof workflowMapperPatterns)[number],
): EvidenceReceiptData {
  const production = pattern.evidenceStatus === "PRODUCTION ENGAGEMENT";
  return {
    claim: pattern.evidenceDescription,
    scope: `Suggested ownership path: ${pattern.title}.`,
    status: production ? "production" : "illustrative",
    owner: "Maslow AI",
    limitations: production
      ? "This engagement evidence does not establish measured results for the workflow you mapped."
      : "The sources, controls, owner, and review boundary require validation before production use.",
    href: pattern.evidenceHref,
    linkLabel: pattern.evidenceLabel,
  };
}

function QuestionStep({
  question,
  selectedId,
  onSelect,
  headingRef,
}: {
  question: WorkflowMapperQuestion;
  selectedId?: string;
  onSelect: (option: WorkflowMapperOption) => void;
  headingRef: RefObject<HTMLLegendElement | null>;
}) {
  return (
    <fieldset className={styles.fieldset}>
      <legend ref={headingRef} tabIndex={-1}>
        <span className={styles.eyebrow}>{question.eyebrow}</span>
        <span className={styles.questionTitle}>{question.title}</span>
      </legend>
      <p className={styles.help}>{question.help}</p>
      <div className={styles.options}>
        {question.options.map((option) => (
          <label key={option.id} className={styles.option}>
            <input
              type="radio"
              name={question.id}
              value={option.id}
              checked={selectedId === option.id}
              onChange={() => onSelect(option)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function AnswerSummary({
  answers,
  step,
  onEdit,
}: {
  answers: WorkflowMapperAnswers;
  step: number;
  onEdit: (step: number) => void;
}) {
  const priorAnswers = workflowMapperQuestions.slice(0, step).flatMap((item) => {
    const option = selectedOption(item.id, answers);
    return option ? [{ question: item, option }] : [];
  });

  if (priorAnswers.length === 0) return null;

  return (
    <section className={styles.answerSummary} aria-label="Your prior answers">
      <span>YOUR ANSWERS</span>
      <ul>
        {priorAnswers.map(({ question, option }, index) => (
          <li key={question.id}>
            <span>{option.label}</span>
            <button
              type="button"
              onClick={() => onEdit(index)}
              aria-label={`Edit ${question.eyebrow.toLowerCase()}: ${option.label}`}
            >
              EDIT
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ResultPath({ brief }: { brief: WorkflowBrief }) {
  const pattern = workflowMapperPatterns.find(({ id }) => id === brief.patternId);
  if (!pattern) return null;

  return (
    <ol className={styles.path} aria-label="Suggested ownership path">
      <li>
        <span>01</span>
        <div>
          <strong>Work arrives</strong>
          <p>
            {brief.selections.deliverable.label} is prepared from {brief.selections.source.label.toLowerCase()}.
          </p>
        </div>
      </li>
      <li>
        <span>02</span>
        <div>
          <strong>The AI prepares</strong>
          <p>{pattern.prepare}</p>
        </div>
      </li>
      <li>
        <span>03</span>
        <div>
          <strong>A person decides or stops</strong>
          <p>
            {brief.selections.owner.label} keeps authority over {brief.selections.boundary.label.toLowerCase()}.
          </p>
        </div>
      </li>
      <li>
        <span>04</span>
        <div>
          <strong>The result stays reviewable</strong>
          <p>{pattern.record}</p>
        </div>
      </li>
    </ol>
  );
}

export function WorkflowMapper() {
  const [answers, setAnswers] = useState<WorkflowMapperAnswers>({});
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const [announcement, setAnnouncement] = useState("");
  const started = useRef(false);
  const completed = useRef(false);
  const result = useRef<HTMLDivElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const questionContext = useRef<HTMLDivElement>(null);
  const questionHeading = useRef<HTMLLegendElement>(null);
  const shouldFocusQuestion = useRef(false);
  const shouldFocusResult = useRef(false);
  const question = workflowMapperQuestions[step];
  const brief = buildWorkflowBrief(answers);
  const pattern = workflowMapperPatterns.find(({ id }) => id === brief?.patternId);
  const dossier = workflowBriefToDossier(brief);
  const evidence = pattern ? evidenceForPattern(pattern) : null;

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(
        WORKFLOW_MAPPER_STATE_STORAGE_KEY,
      );
      if (!stored) return;
      const restored = parseWorkflowMapperState(JSON.parse(stored));
      if (!restored) {
        window.sessionStorage.removeItem(WORKFLOW_MAPPER_STATE_STORAGE_KEY);
        return;
      }

      setAnswers(restored.answers);
      started.current = true;
      if (restored.completed) {
        completed.current = true;
        setStep(workflowMapperQuestions.length - 1);
        setShowResult(true);
        return;
      }
      const firstUnanswered = workflowMapperQuestions.findIndex(
        ({ id }) => !restored.answers[id],
      );
      setStep(
        firstUnanswered === -1
          ? workflowMapperQuestions.length - 1
          : firstUnanswered,
      );
    } catch {
      try {
        window.sessionStorage.removeItem(WORKFLOW_MAPPER_STATE_STORAGE_KEY);
      } catch {
        // The mapper remains useful when storage is unavailable.
      }
    }
  }, []);

  useEffect(() => {
    if (!showResult || !brief || completed.current) return;
    completed.current = true;
    track("Workflow mapper completed");
  }, [brief, showResult]);

  useEffect(() => {
    if (!showResult || !shouldFocusResult.current) return;
    shouldFocusResult.current = false;
    const frame = window.requestAnimationFrame(() => {
      result.current?.scrollIntoView({ block: "start" });
      resultHeading.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [showResult]);

  useEffect(() => {
    if (showResult || !shouldFocusQuestion.current) return;
    shouldFocusQuestion.current = false;
    let focusFrame = 0;
    const scrollFrame = window.requestAnimationFrame(() => {
      questionContext.current?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
      focusFrame = window.requestAnimationFrame(() => {
        questionHeading.current?.focus({ preventScroll: true });
      });
    });
    return () => {
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [showResult, step]);

  const persistProgress = (
    nextAnswers: WorkflowMapperAnswers,
    isCompleted = false,
  ) => {
    try {
      const state = createWorkflowMapperState(nextAnswers, isCompleted);
      if (!state) return;
      window.sessionStorage.setItem(
        WORKFLOW_MAPPER_STATE_STORAGE_KEY,
        JSON.stringify(state),
      );
    } catch {
      // The mapper remains useful when storage is unavailable.
    }
  };

  const select = (option: WorkflowMapperOption) => {
    if (!started.current) {
      started.current = true;
      track("Workflow mapper started", { source: "architecture" });
    }
    const nextAnswers = { ...answers, [question.id]: option.id };
    setAnswers(nextAnswers);
    persistProgress(nextAnswers);
  };

  const editStep = (nextStep: number) => {
    shouldFocusQuestion.current = true;
    completed.current = false;
    persistProgress(answers, false);
    setShowResult(false);
    setStep(nextStep);
    setCopyStatus("idle");
    setAnnouncement("");
  };

  const continueMapper = () => {
    if (!answers[question.id]) return;
    if (step < workflowMapperQuestions.length - 1) {
      shouldFocusQuestion.current = true;
      setStep((current) => current + 1);
      return;
    }
    persistProgress(answers, true);
    shouldFocusResult.current = true;
    setAnnouncement("Ownership path ready.");
    setShowResult(true);
  };

  const persistBrief = () => {
    if (!brief) return;
    try {
      window.sessionStorage.setItem(
        WORKFLOW_BRIEF_STORAGE_KEY,
        JSON.stringify(brief),
      );
    } catch {
      // The contact page still works when storage is unavailable.
    }
    track("Workflow mapper CTA clicked");
  };

  const copyBrief = async () => {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(formatWorkflowBrief(brief));
      setCopyStatus("copied");
      setAnnouncement("Workflow brief copied.");
    } catch {
      setCopyStatus("error");
      setAnnouncement("Copy failed. Select the copy action to try again.");
    }
  };

  if (showResult && brief && pattern && dossier && evidence) {
    return (
      <div
        ref={result}
        className={styles.result}
        data-workflow-result
        data-visual-ready
      >
        <p className="sr-only" role="status" aria-live="polite" aria-atomic>
          {announcement}
        </p>
        <div className={styles.resultHead}>
          <div>
            <span className={styles.eyebrow}>YOUR OWNERSHIP PATH</span>
            <h3 ref={resultHeading} tabIndex={-1}>
              {brief.title}
            </h3>
          </div>
          <button
            type="button"
            className={styles.edit}
            onClick={() => editStep(0)}
          >
            EDIT ANSWERS
          </button>
        </div>

        <div className={styles.resultContext}>
          <DecisionReceipt
            dossier={dossier}
            title="What you mapped"
            description="A compact record of the work, owner, human boundary, and recommended starting path."
            headingLevel="h4"
          />
          <WorkflowDossierTray
            dossier={dossier}
            title="Review the full workflow dossier"
            dossierTitle="Workflow context to validate"
            headingLevel="h4"
          />
        </div>

        <ResultPath brief={brief} />

        <div className={styles.resultEvidence}>
          <EvidenceReceipt
            evidence={evidence}
            title={pattern.evidenceStatus}
            headingLevel="h4"
          />
        </div>

        <DepthDisclosure
          className={styles.validationDisclosure}
          collapsedLabel="Review questions to validate"
          expandedLabel="Hide validation questions"
        >
          <div className={styles.openQuestions}>
            <span>QUESTIONS TO VALIDATE IN A WORKING SESSION</span>
            <ul>
              <li>
                Which source is current and complete enough to govern the work?
              </li>
              <li>
                What exact condition triggers the human decision or stop?
              </li>
              <li>Who owns recovery when a source or system is unavailable?</li>
            </ul>
          </div>
        </DepthDisclosure>

        <div className={styles.resultActions}>
          <Link href="/contact" className="cta" onClick={persistBrief}>
            BOOK A WORKING SESSION
          </Link>
          <button type="button" className={styles.copy} onClick={copyBrief}>
            {copyStatus === "copied"
              ? "BRIEF COPIED"
              : copyStatus === "error"
                ? "COPY FAILED"
                : "COPY WORKFLOW BRIEF"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapper} data-workflow-mapper data-visual-ready>
      <div
        className={styles.progress}
        role="progressbar"
        aria-label="Workflow mapper progress"
        aria-valuemin={0}
        aria-valuemax={workflowMapperQuestions.length}
        aria-valuenow={step + 1}
        aria-valuetext={`Question ${step + 1} of ${workflowMapperQuestions.length}: ${question.title}`}
      >
        <span>90-SECOND WORKFLOW MAPPER</span>
        <span>
          {step + 1} / {workflowMapperQuestions.length}
        </span>
      </div>
      <div className={styles.progressTrack} aria-hidden="true">
        <span
          style={{ width: `${((step + 1) / workflowMapperQuestions.length) * 100}%` }}
        />
      </div>

      <div ref={questionContext} className={styles.questionContext}>
        <AnswerSummary answers={answers} step={step} onEdit={editStep} />

        <QuestionStep
          question={question}
          selectedId={answers[question.id]}
          onSelect={select}
          headingRef={questionHeading}
        />
      </div>

      <div className={styles.navigation}>
        {step > 0 ? (
          <button
            type="button"
            className={styles.back}
            onClick={() => editStep(step - 1)}
          >
            BACK
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          className={styles.next}
          disabled={!answers[question.id]}
          onClick={continueMapper}
        >
          {step === workflowMapperQuestions.length - 1
            ? "SHOW MY OWNERSHIP PATH"
            : "CONTINUE"}
        </button>
      </div>
      <p className={styles.privacy}>
        No email required. These category choices stay in this browser unless
        you carry the brief into the contact form.
      </p>
    </div>
  );
}
