export const evidenceStatuses = [
  "production",
  "illustrative",
  "in-preparation",
] as const;

export type EvidenceStatus = (typeof evidenceStatuses)[number];

export type EvidenceReceiptData = {
  claim: string;
  scope: string;
  status: EvidenceStatus;
  owner: string;
  limitations: string;
  href?: string;
  linkLabel?: string;
};

export const evidenceStatusLabel: Record<EvidenceStatus, string> = {
  production: "PRODUCTION EVIDENCE",
  illustrative: "ILLUSTRATIVE PATTERN",
  "in-preparation": "IN PREPARATION",
};
