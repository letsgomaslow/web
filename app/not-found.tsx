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
            This page doesn&apos;t exist. Yet.
          </h1>
          <p className="lede" style={{ marginBottom: 28 }}>
            Like most things here, it could probably be built in 90 days.
          </p>
          <Link href="/" className="text-link">
            BACK TO HOME&nbsp;&nbsp;&gt;
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
