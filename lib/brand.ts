export const colors = {
  navy: "#192332",
  ink: "#191F32",
  text: "#333333",
  muted: "#555555",
  soft: "#5C5C5C",
  line: "#E1E1E1",
  lineSoft: "#E6EAF3",
  offWhite: "#F6F7F9",
  white: "#FFFFFF",
  cta: "#9B2D5C",
  ctaLink: "#8A2752",
  ice: "#73C1AE",
  iceText: "#1F6F5F",
  purple: "#4F3A6E",
  plum: "#A070A6",
  plumText: "#6B4570",
  gold: "#EBA93D",
  goldText: "#7A5608",
  goldSolid: "#9A6F12",
  mint: "#86E8CE",
  yellow: "#FFF860",
  navyDeep: "#121D35",
  navyMid: "#1A2847",
  navySoft: "#243356",
  navyLine: "#3A4A6B",
  mist: "#B8C4D9",
  green: "#2CD552",
} as const;

export const ticks = [
  colors.ice,
  colors.plum,
  colors.gold,
  colors.ctaLink,
  colors.purple,
  colors.mint,
] as const;

export const navLinks = [
  { href: "/services", label: "SERVICES" },
  { href: "/#concepts", label: "CONCEPTS" },
  { href: "/case-studies", label: "CASE STUDIES" },
  { href: "/blog", label: "BLOG" },
  { href: "/about", label: "ABOUT" },
] as const;

export const conceptLinks = [
  { href: "/concepts/context-engineering", label: "Context engineering" },
  { href: "/concepts/agentic-harness", label: "Harness engineering" },
  { href: "/concepts/hybrid-rag", label: "Hybrid RAG" },
  { href: "/concepts/virtual-ai-employees", label: "Virtual AI employees" },
  { href: "/concepts/skills-and-gateways", label: "Skills & gateways" },
  { href: "/concepts/local-ai", label: "Local AI & hardware" },
] as const;

export const companyLinks = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const startLinks = [
  { href: "/assessment", label: "AI readiness assessment" },
  {
    href: "/campaigns/virtual-ai-employees",
    label: "Virtual employees campaign",
  },
  { href: "/contact", label: "Book a consultation" },
] as const;
