import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PressReleaseBody } from "@/components/press/PressReleaseBody";
import { TaxonomyCapsule } from "@/components/ui/TaxonomyCapsule";
import {
  formatPressDate,
  getAllPressSlugs,
  getPressRelease,
} from "@/lib/content/press";
import styles from "../press.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPressSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const release = getPressRelease(slug);
  if (!release) return { title: "Press Release" };

  return {
    title: release.title,
    alternates: { canonical: `/press/${slug}` },
    openGraph: { type: "article", title: release.title, description: release.description, url: `/press/${slug}`, publishedTime: release.publishedAt },
    description: release.description,
  };
}

export default async function PressReleasePage({ params }: Props) {
  const { slug } = await params;
  const release = getPressRelease(slug);
  if (!release) notFound();

  return (
    <PageShell footer="full" showCtaBand={false}>
      <>
        <header
          className={styles.detailHeader}
          data-screen-label="Press Release Header"
        >
          <div className={styles.detailHeaderInner}>
            <div className={styles.classification}>
              <TaxonomyCapsule tone="soft">Press Release</TaxonomyCapsule>
            </div>
            <h1 className={styles.detailTitle}>{release.title}</h1>
            <div className={styles.detailMeta}>
              <time
                className={styles.detailDate}
                dateTime={release.publishedAt}
              >
                {formatPressDate(release.publishedAt)}
              </time>
            </div>
            {release.badge ? (
              <div className={styles.badgeFrame}>
                <Image
                  className={styles.badge}
                  src={release.badge.src}
                  alt={release.badge.alt}
                  width={release.badge.width}
                  height={release.badge.height}
                  priority
                  sizes="(max-width: 600px) calc(100vw - 40px), 520px"
                />
              </div>
            ) : null}
          </div>
        </header>

        {release.slug === "openai-select-partner" ? (
          <aside className={styles.position} aria-labelledby="current-position">
            <div className={styles.positionInner}>
              <div className={styles.positionLabel}>CURRENT POSITION · SEPTEMBER 2026</div>
              <h2 id="current-position">
                The free AI-OS is the entry point to organizational implementation.
              </h2>
              <p>
                Maslow AI-OS is a developing Linux product for working with AI
                tools. Client engagements focus on turning company knowledge
                and procedures into shared context, memory, skills, controlled
                connections, and reviewable workflows in client-owned systems.
                This note adds current product context. The announcement below
                remains unchanged from August 25, 2026.
              </p>
              <div className={styles.positionLinks}>
                <Link href="/ai-os">Explore Maslow AI-OS</Link>
                <Link href="/resources">Browse resources</Link>
              </div>
            </div>
          </aside>
        ) : null}

        <section
          className={styles.detailBody}
          data-screen-label="Press Release Body"
          aria-label="Press release content"
        >
          <div className={styles.detailBodyInner}>
            <PressReleaseBody sections={release.sections} />
          </div>
        </section>
      </>
    </PageShell>
  );
}
