export const colors = {
  navy: "#192332",
  ink: "#191F32",
  text: "#333333",
  muted: "#666666",
  soft: "#666666",
  line: "#E1E1E1",
  lineSoft: "#E6EAF3",
  offWhite: "#F6F7F9",
  white: "#FFFFFF",
  cta: "#192332",
  ctaInk: "#FFFFFF",
  ctaEmphasis: "#EE7BB3",
  ctaInverse: "#FFFFFF",
  ctaInverseInk: "#192332",
  ctaLink: "#9D4B8E",
  ctaLinkHover: "#654C8F",
  ice: "#73C1AE",
  iceText: "#2C6E5C",
  purple: "#654C8F",
  plum: "#A070A6",
  plumText: "#654C8F",
  gold: "#EBA93D",
  goldText: "#7A5410",
  goldSolid: "#EBA93D",
  mint: "#86E8CE",
  yellow: "#FFF860",
  navyDeep: "#121D35",
  navyMid: "#1A2847",
  navySoft: "#243356",
  navyLine: "#3A4A6B",
  mist: "#B8C4D9",
  green: "#2CD552",
  error: "#B42318",
  successText: "#1E7C38",
  focus: "#401877",
} as const;

export const actionTheme = {
  primaryBackground: colors.cta,
  primaryForeground: colors.ctaInk,
  inverseBackground: colors.ctaInverse,
  inverseForeground: colors.ctaInverseInk,
  signal: colors.ctaEmphasis,
  structuralRadius: 0,
} as const;

export const ticks = [
  colors.iceText,
  colors.plumText,
  colors.goldText,
  colors.ctaLink,
  colors.purple,
  colors.navy,
] as const;

export const ctaPrimaryLabel = "BOOK A WORKING SESSION";
export const ctaContactSubmitLabel = "BOOK MY WORKING SESSION";
export const engagementBadge = "TAKING TWO NEW ENGAGEMENTS FOR Q4 2026";

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
  { href: "/services", label: "SERVICES" },
  { href: "/how-we-engage", label: "HOW WE ENGAGE" },
  { href: "/case-studies", label: "CASE STUDIES" },
  { href: "/blog", label: "BLOG" },
  { href: "/about", label: "ABOUT" },
] as const;

export const conceptLinks = [
  { href: "/concepts/context-engineering", label: "Context engineering" },
  { href: "/concepts/agentic-harness", label: "Harness engineering" },
  { href: "/concepts/hybrid-rag", label: "Hybrid RAG" },
  { href: "/concepts/virtual-ai-employees", label: "AI employees" },
  { href: "/concepts/skills-and-gateways", label: "Skills & gateways" },
  { href: "/concepts/local-ai", label: "Local AI & hardware" },
] as const;

export const companyLinks = [
  { href: "/services", label: "Services" },
  { href: "/how-we-engage", label: "How We Engage" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
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
  { href: "/assessment", label: "Assessment" },
  { href: "/contact", label: "Book a working session" },
] as const;
