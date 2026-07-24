import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { getAllBlogSlugs, getBlogArticle } from "@/lib/content/blog";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return { title: "Article | Maslow AI" };
  return {
    title: `${article.title} | Maslow AI`,
    description: article.lede,
  };
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  return (
    <PageShell footer="compact" showCtaBand={false}>
      <>
        <section className={styles.header} data-screen-label="Article Header">
          <div className={styles.headerInner}>
            <div
              className={`${styles.badges} mz-rise`}
              style={{ animationDelay: "0.05s" }}
            >
              <span className={styles.badgeArticle}>ARTICLE</span>
              <span className={styles.badgeCat}>{article.cat}</span>
            </div>
            <h1
              className={`${styles.title} mz-rise`}
              style={{ animationDelay: "0.15s" }}
            >
              {article.title}
            </h1>
            <p
              className={`${styles.lede} mz-rise`}
              style={{ animationDelay: "0.25s" }}
            >
              {article.lede}
            </p>
            <div
              className={`${styles.byline} mz-rise`}
              style={{ animationDelay: "0.35s" }}
            >
              <div className={styles.avatar}>
                <Image
                  src="/assets/maslow-mark-white.svg"
                  alt=""
                  width={20}
                  height={13}
                />
              </div>
              <div>
                <div className={styles.author}>Maslow AI Team</div>
                <div className={styles.date}>
                  {article.date} · {article.read}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.body} data-screen-label="Article Body">
          <div className={styles.prose}>
            {article.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className={styles.h2}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <div key={i} className={styles.quote}>
                    <span className={styles.quoteMark}>“</span>
                    <span className={styles.quoteText}>{block.text}</span>
                  </div>
                );
              }
              if (block.type === "callout") {
                return (
                  <div key={i} className={styles.callout}>
                    <div className={styles.calloutLabel}>{block.label}</div>
                    <div className={styles.calloutText}>{block.text}</div>
                  </div>
                );
              }
              return (
                <p key={i} className={styles.p}>
                  {renderInline(block.text)}
                </p>
              );
            })}
          </div>
        </section>

        <section className={styles.footer} data-screen-label="Article Footer">
          <div className={styles.footerInner}>
            <div className={styles.tags}>
              {article.tags.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
            <Link href={article.explainerHref} className="text-link">
              OPEN THE INTERACTIVE EXPLAINER&nbsp;&nbsp;&gt;
            </Link>
          </div>
        </section>

        <section className={styles.cta} data-screen-label="CTA">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>{article.ctaTitle}</h2>
            <CtaButton href="/contact" variant="inverse">
              BOOK A WORKING SESSION
            </CtaButton>
          </div>
        </section>
      </>
    </PageShell>
  );
}
