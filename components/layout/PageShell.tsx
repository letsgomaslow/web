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
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteNav highlightConcepts={highlightConcepts} minimal={minimalNav} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {footer !== "none" && (
        <SiteFooter variant={footer} showCtaBand={showCtaBand} />
      )}
    </>
  );
}
