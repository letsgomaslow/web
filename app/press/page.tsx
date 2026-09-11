import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import {
  formatPressDate,
  publishedPressReleases,
} from "@/lib/content/press";
import styles from "./press.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/press" },
  title: "Press Releases",
  description:
    "Official announcements from Maslow AI, preserved with their publication dates and current product context where useful.",
};

export default function PressPage() {
  return (
    <PageShell footer="full" showCtaBand={false}>
      <>
        <section className={styles.hero} data-screen-label="Press Header">
          <div className={styles.heroInner}>
            <div className="eyebrow">PRESS RELEASES</div>
            <h1 className={`h1 ${styles.heroTitle}`}>Press Releases</h1>
            <p className={`lede ${styles.heroLede}`}>
              Official announcements preserved as published, with current
              product context kept outside the historical release.
            </p>
          </div>
        </section>

        <section
          className={styles.indexSection}
          aria-label="Published press releases"
        >
          <div className={styles.index}>
            {publishedPressReleases.map((release) => (
              <Link
                key={release.slug}
                href={`/press/${release.slug}`}
                className={styles.cardLink}
                aria-label={`Read press release: ${release.title}`}
              >
                <article
                  className={styles.card}
                  data-press-release={release.slug}
                >
                  <time
                    className={styles.cardDate}
                    dateTime={release.publishedAt}
                  >
                    {formatPressDate(release.publishedAt)}
                  </time>
                  <h2 className={styles.cardTitle}>{release.title}</h2>
                  <span className={styles.cardCta} aria-hidden>
                    Read press release&nbsp;&nbsp;&gt;
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </>
    </PageShell>
  );
}
