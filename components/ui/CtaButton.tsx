import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={`${variant === "primary" ? "cta" : "cta-secondary"} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
