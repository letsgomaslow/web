import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell footer="compact">
      <section
        style={{
          padding: "120px var(--gutter)",
          background: "var(--color-white)",
        }}
      >
        <div className="wrap" style={{ maxWidth: 640 }}>
          <div className="eyebrow">404</div>
          <h1 className="h1" style={{ marginBottom: 18 }}>
            We couldn&apos;t find that page.
          </h1>
          <p className="lede" style={{ marginBottom: 28 }}>
            Check the address or return to the homepage.
          </p>
          <Link href="/" className="text-link">
            BACK TO HOME&nbsp;&nbsp;&gt;
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
