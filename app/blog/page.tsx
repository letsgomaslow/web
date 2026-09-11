import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { TaxonomyCapsule } from "@/components/ui/TaxonomyCapsule";
import { featuredPost, secondaryPosts } from "@/lib/content/blog";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog",
  description:
    "Plain-language guides to shared company knowledge, memory, skills, context, workflow controls, and AI implementation.",
};

function updatedLabel(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

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
              FIELD GUIDES · SHARED AI INFRASTRUCTURE
            </div>
            <h1
              className="h1 mz-rise"
              style={{ animationDelay: "0.15s", marginBottom: 20 }}
            >
              Make company knowledge usable across AI tools
            </h1>
            <p
              className="lede mz-rise"
              style={{
                animationDelay: "0.3s",
                maxWidth: 560,
                marginBottom: 36,
              }}
            >
              Practical guidance for business and IT leaders deciding what
              belongs in context, memory, skills, connections, controls, and the
              work record.
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
                <TaxonomyCapsule
                  tone="gold"
                  className={styles.featuredCapsule}
                >
                  Featured
                </TaxonomyCapsule>
                <Image
                  className={styles.featuredMark}
                  src="/assets/logos/maslow-symbol-white.png"
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
                  <TaxonomyCapsule tone="teal" size="compact">
                    {featuredPost.cat}
                  </TaxonomyCapsule>
                  <span>·</span>
                  <span>{featuredPost.read}</span>
                  <span>·</span>
                  <span>{featuredPost.date}</span>
                  <span>·</span>
                  <span>UPDATED {updatedLabel(featuredPost.modifiedAt)}</span>
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

        <section className={styles.articles} data-screen-label="Articles">
          <div className="wrap">
            <div className={styles.articlesHead}>
              <div className="eyebrow">ALL ARTICLES</div>
              <h2 className="h2">Four layers to align before implementation</h2>
            </div>
            <div className={styles.articleList}>
              {secondaryPosts.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className={styles.articleCard}
                >
                  <div className={styles.articleMeta}>
                    <TaxonomyCapsule tone="teal" size="compact">
                      {article.cat}
                    </TaxonomyCapsule>
                    <span>{article.read}</span>
                    <span>{article.date}</span>
                    <span>UPDATED {updatedLabel(article.modifiedAt)}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.desc}</p>
                  <span className="text-link">
                    READ THE ARTICLE&nbsp;&nbsp;&gt;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.newsletter} data-screen-label="Resources">
          <div className={styles.newsletterInner}>
            <div>
              <h2 className={styles.newsletterTitle}>
                Start with the question in front of your team
              </h2>
              <p className={styles.newsletterLede}>
                Use the resource hub to try Maslow AI-OS, understand the shared
                infrastructure, review client evidence, or map a workflow.
              </p>
            </div>
            <CtaButton href="/resources" variant="inverse">
              EXPLORE RESOURCES
            </CtaButton>
          </div>
        </section>
      </>
    </PageShell>
  );
}
