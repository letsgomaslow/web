import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";

type PageShellProps = {
  children: React.ReactNode;
  footer?: "full" | "compact" | "none";
  showCtaBand?: boolean;
  highlightConcepts?: boolean;
  minimalNav?: boolean;
};

export function PageShell({
  children,
  footer = "full",
  showCtaBand = false,
  highlightConcepts = false,
  minimalNav = false,
}: PageShellProps) {
  return (
    <>
      <SiteNav highlightConcepts={highlightConcepts} minimal={minimalNav} />
      <main>{children}</main>
      {footer !== "none" && (
        <SiteFooter variant={footer} showCtaBand={showCtaBand} />
      )}
    </>
  );
}
