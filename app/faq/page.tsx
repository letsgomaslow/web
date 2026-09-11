import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { ctaPrimaryLabel } from "@/lib/brand";
import { faqItems } from "@/lib/content/trust";
import { FaqList } from "./FaqList";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: { absolute: "FAQ | Maslow AI · Straight answers" },
  description:
    'Free versus paid, preview availability, existing-system compatibility, agents, second brain, implementation, and data handling.',
};

export default function FaqPage() {
  return (
    <PageShell footer="full">
      <>
        <section className={styles.hero} data-screen-label="Hero">
          <div className="wrap">
            <div
              className="eyebrow mz-rise"
              style={{ animationDelay: "0.05s" }}
            >
              FAQ
            </div>
            <h1
              className="h1 mz-rise"
              style={{ animationDelay: "0.15s", marginBottom: 20 }}
            >
              The questions buyers actually ask.
            </h1>
            <nav
              className={`${styles.index} mz-rise`}
              style={{ animationDelay: "0.3s" }}
              aria-label="Question index"
            >
              {faqItems.map((item) => (
                <a
                  key={item.num}
                  href={`#q-${item.num}`}
                  className={styles.indexLink}
                >
                  <span>{item.num}</span>
                  {item.q}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className={styles.list} data-screen-label="FAQ List">
          <div className="wrap">
            <FaqList />
          </div>
        </section>

        <section className={styles.close} data-screen-label="CTA">
          <div className="wrap">
            <Reveal className={styles.closeInner}>
              <p>
                A question we didn&apos;t answer? Ask it in a working session;
                the first conversation is free.
              </p>
              <CtaButton href="/contact">{ctaPrimaryLabel}</CtaButton>
            </Reveal>
          </div>
        </section>
      </>
    </PageShell>
  );
}
