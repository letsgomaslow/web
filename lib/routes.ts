export const publicRoutes = [
  "/", "/ai-os", "/services", "/how-we-engage", "/plan-workflow", "/about", "/contact", "/resources",
  "/blog", "/blog/context-engineering", "/blog/what-makes-an-ai-employee-work", "/blog/context-memory-and-skills", "/blog/permissions-approvals-audit-trails",
  "/press", "/press/openai-select-partner", "/case-studies", "/case-studies/infinite-ai-os", "/case-studies/agenthub", "/manufacturing", "/security", "/faq", "/diligence",
  "/concepts/shared-ai-infrastructure", "/concepts/context-engineering", "/concepts/agentic-harness", "/concepts/hybrid-rag", "/concepts/local-ai", "/concepts/skills-and-gateways", "/campaigns/virtual-ai-employees",
] as const;
export const legacyDestinations = {
  "/assessment": "/plan-workflow",
  "/concepts/ai-employee-architecture": "/plan-workflow",
  "/concepts/ai-employee-architecture/technical": "/concepts/shared-ai-infrastructure",
  "/concepts/virtual-ai-employees": "/services#workflows",
} as const;
