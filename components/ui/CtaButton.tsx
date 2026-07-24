import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "inverse";
  className?: string;
};

const variantClass = {
  primary: "cta",
  secondary: "cta-secondary",
  inverse: "cta cta-inverse",
} as const;

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={`${variantClass[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
