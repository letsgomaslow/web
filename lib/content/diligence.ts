import { contactEmail } from "@/lib/brand";

/**
 * The diligence pack index. Statuses are public claims: nothing may say
 * AVAILABLE until the artifact actually exists and has been reviewed —
 * flipping a status is a deliberate act, refreshed quarterly.
 */
export type ArtifactStatus = "AVAILABLE" | "ON REQUEST" | "IN PREPARATION";

export const diligenceMeta = {
  version: "v1",
  updated: "July 2026",
} as const;

export const diligenceHero = {
  eyebrow: "BUILT FOR YOUR VENDOR REVIEW",
  h1: "Everything your review will ask for, in one place.",
  lede: "Mid-market boards run real vendor reviews. Good. This page is the pack your champion can forward to procurement, legal, and IT security without translating anything.",
} as const;

export const diligenceArtifacts: readonly {
  num: string;
  name: string;
  desc: string;
  status: ArtifactStatus;
}[] = [
  {
    num: "01",
    name: "Security questionnaire answers",
    desc: "Our controls mapped to SIG-Lite/CAIQ-style questionnaire fields, in a format your vendor-risk platform can ingest.",
    status: "IN PREPARATION",
  },
  {
    num: "02",
    name: "Subprocessor table",
    desc: "Every model provider we route to, with the zero-retention configuration and contractual terms per provider.",
    status: "IN PREPARATION",
  },
  {
    num: "03",
    name: "Certificate of insurance",
    desc: "E&O and cyber coverage, with stated minimums.",
    status: "IN PREPARATION",
  },
  {
    num: "04",
    name: "Decommissioning runbook",
    desc: 'The tested procedure behind "firing us is a permissions change."',
    status: "IN PREPARATION",
  },
  {
    num: "05",
    name: "IP schedule",
    desc: "Ownership of all work product across every exit path: completion, stop-at-gate, and early termination alike.",
    status: "IN PREPARATION",
  },
  {
    num: "06",
    name: "Healthcare annex",
    desc: "PHI-handling posture and BAA availability.",
    status: "IN PREPARATION",
  },
  {
    num: "07",
    name: "Incident commitments",
    desc: "A named contact, a notification window in your contract, and a written post-incident report.",
    status: "AVAILABLE",
  },
];

export const diligenceClosing =
  `We're a boutique that wins on architecture, and we'd rather show you the controls than ask you to trust the adjectives. Anything this page doesn't answer: ${contactEmail}, answered in writing.`;
