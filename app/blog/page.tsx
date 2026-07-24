import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { catColors, featuredPost } from "@/lib/content/blog";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog | Maslow AI",
  description:
    "Plain-language writing on production AI systems: what works, what it costs, and how to own it.",
};

export default function BlogPage() {
  return (
    <PageShell footer="compact">
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              BLOG · INSIGHTS &amp; EXPLAINERS
            </div>
            <h1
              className="h1 mz-rise"
              style={{ animationDelay: "0.15s", marginBottom: 20 }}
            >
              Latest thinking
            </h1>
            <p
              className="lede mz-rise"
              style={{
                animationDelay: "0.3s",
                maxWidth: 560,
                marginBottom: 36,
              }}
            >
              Plain-language writing on production AI systems: what works, what
              it costs, and how to own it.
            </p>
          </div>
        </section>

        <section className={styles.featured} data-screen-label="Featured Post">
          <div className="wrap">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className={styles.featuredCard}
            >
              <div className={styles.featuredArt}>
                <span className={styles.featuredBadge}>FEATURED</span>
                <Image
                  className={styles.featuredMark}
                  src="/assets/maslow-mark-white.svg"
                  alt=""
                  width={280}
                  height={180}
                />
                <svg
                  viewBox="0 0 400 200"
                  className={styles.featuredSvg}
                  aria-hidden
                >
                  <g stroke="rgba(115,193,174,.5)" strokeWidth="1" fill="none">
                    <line x1="40" y1="160" x2="150" y2="80" />
                    <line x1="150" y1="80" x2="280" y2="120" />
                    <line x1="280" y1="120" x2="360" y2="40" />
                    <line x1="150" y1="80" x2="240" y2="30" />
                  </g>
                  <g fill="#73C1AE">
                    <circle cx="40" cy="160" r="6" />
                    <circle cx="150" cy="80" r="9" />
                    <circle cx="280" cy="120" r="7" />
                    <circle cx="360" cy="40" r="5" />
                    <circle cx="240" cy="30" r="5" />
                  </g>
                </svg>
              </div>
              <div className={styles.featuredBody}>
                <div className={styles.meta}>
                  <span
                    style={{
                      color:
                        catColors[featuredPost.cat] ||
                        "var(--color-ice-text)",
                      fontWeight: 700,
                    }}
                  >
                    {featuredPost.cat}
                  </span>
                  <span>·</span>
                  <span>{featuredPost.read}</span>
                  <span>·</span>
                  <span>{featuredPost.date}</span>
                </div>
                <div className={styles.featuredTitle}>{featuredPost.title}</div>
                <div className={styles.featuredDesc}>{featuredPost.desc}</div>
                <span className="text-link">
                  READ THE ARTICLE&nbsp;&nbsp;&gt;
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section className={styles.newsletter} data-screen-label="Newsletter">
          <div className={styles.newsletterInner}>
            <div>
              <h2 className={styles.newsletterTitle}>
                One useful email a month
              </h2>
              <p className={styles.newsletterLede}>
                What we built, what it cost, what broke. No announcements about
                our announcements.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </>
    </PageShell>
  );
}
