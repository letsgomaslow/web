import {
  actionTheme as brandActions,
  brandVersion,
  tokens as brandTokens,
} from "@maslow-ai/brand-os/tokens";

const palette = brandTokens.color;

export const maslowBrandVersion = brandVersion;

export const colors = {
  navy: palette.navy,
  ink: palette.ink,
  text: palette.text,
  muted: palette.muted,
  soft: palette.muted,
  line: palette.line,
  lineSoft: palette.lineSoft,
  offWhite: palette.offWhite,
  white: palette.white,
  cta: brandActions.primary,
  ctaInk: brandActions.primaryInk,
  ctaEmphasis: brandActions.signal,
  ctaInverse: brandActions.inverse,
  ctaInverseInk: brandActions.inverseInk,
  ctaLink: brandActions.link,
  ctaLinkHover: brandActions.linkHover,
  ice: palette.teal,
  iceText: palette.tealText,
  purple: palette.purple,
  plum: palette.plum,
  plumText: palette.purple,
  gold: palette.gold,
  goldText: palette.goldText,
  goldSolid: palette.gold,
  mint: palette.duotoneTeal,
  yellow: palette.yellow,
  navyDeep: palette.navyDeep,
  navyMid: palette.darkSurface,
  navySoft: palette.darkSurfaceRaised,
  navyLine: palette.darkLine,
  mist: palette.darkText,
  green: palette.statusOpen,
  error: palette.error,
  successText: palette.success,
  focus: brandActions.focus,
} as const;

export const actionTheme = {
  primaryBackground: brandActions.primary,
  primaryForeground: brandActions.primaryInk,
  inverseBackground: brandActions.inverse,
  inverseForeground: brandActions.inverseInk,
  signal: brandActions.signal,
  structuralRadius: Number.parseInt(brandTokens.radius.structural, 10),
} as const;

export const shapeTheme = {
  structuralRadius: Number.parseInt(brandTokens.radius.structural, 10),
  taxonomyCapsuleRadius: Number.parseInt(brandTokens.radius.capsule, 10),
} as const;

export const ticks = [
  colors.iceText,
  colors.plumText,
  colors.goldText,
  colors.ctaLink,
  colors.purple,
  colors.navy,
] as const;

export const ctaPrimaryLabel = "TALK THROUGH A WORKFLOW";
export const ctaContactSubmitLabel = "REQUEST A WORKING SESSION";
export const engagementBadge = "FREE FOUNDATION · PRACTICAL IMPLEMENTATION";

export const contactEmail = "rakesh@maslow.ai";

export const socialLinks = {
  founderLinkedIn: "https://www.linkedin.com/in/rakeshdavid/",
  companyLinkedIn: "https://www.linkedin.com/company/letsgomaslow/",
  github: "https://github.com/letsgomaslow",
} as const;

export const founderHeadshot = {
  src: "/assets/rakesh-david-founder.jpg",
  alt: "Rakesh David, Founder and CEO of Maslow AI",
  width: 1200,
  height: 1200,
} as const;

export const navLinks = [
  { href: "/ai-os", label: "AI-OS" },
  { href: "/services", label: "HOW WE HELP" },
  { href: "/case-studies", label: "CLIENT WORK" },
  { href: "/resources", label: "RESOURCES" },
  { href: "/about", label: "ABOUT" },
] as const;

export const conceptLinks = [
  {
    href: "/concepts/shared-ai-infrastructure",
    label: "Shared AI infrastructure",
  },
  { href: "/concepts/context-engineering", label: "Context engineering" },
  { href: "/concepts/agentic-harness", label: "Harness engineering" },
  { href: "/concepts/hybrid-rag", label: "Hybrid RAG" },
  { href: "/concepts/skills-and-gateways", label: "Shared skills & connections" },
  { href: "/concepts/local-ai", label: "Local AI & hardware" },
] as const;

export const companyLinks = [
  { href: "/services", label: "How We Help" },
  { href: "/how-we-engage", label: "How We Engage" },
  { href: "/case-studies", label: "Client Work" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press Releases" },
  { href: "/about", label: "About" },
  { href: "/diligence", label: "Diligence Pack" },
  { href: "/contact", label: "Contact" },
] as const;

export const trustLinks = [
  { href: "/security", label: "Security & Data" },
  { href: "/faq", label: "FAQ" },
  { href: "/manufacturing", label: "Manufacturing" },
] as const;

export const startLinks = [
  { href: "/ai-os", label: "Explore the preview" },
  { href: "/plan-workflow", label: "Map a workflow" },
  { href: "/contact", label: "Talk through a workflow" },
] as const;
