import Image from "next/image";
import Link from "next/link";
import {
  companyLinks,
  conceptLinks,
  contactEmail,
  ctaPrimaryLabel,
  engagementBadge,
  socialLinks,
  startLinks,
  trustLinks,
} from "@/lib/brand";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = {
  variant?: "full" | "compact";
  showCtaBand?: boolean;
};

export function SiteFooter({
  variant = "full",
  showCtaBand = false,
}: SiteFooterProps) {
  return (
    <>
      {showCtaBand && (
        <section className="cta-band" aria-labelledby="site-cta-heading">
          <h2 id="site-cta-heading">Ready to find where AI pays?</h2>
          <p>
            A 30-minute working session. Bring one painful workflow; we&apos;ll
            sketch the harness, the data pipeline and the cost curve.
          </p>
          <Link href="/contact" className="cta cta-inverse">
            {ctaPrimaryLabel}
          </Link>
        </section>
      )}

      {variant === "full" ? (
        <footer className={styles.full}>
          <div className={styles.wrap}>
            <div className={styles.grid}>
              <div>
                <div className={styles.brandRow}>
                  <Image
                    src="/assets/maslow-mark-white.svg"
                    alt=""
                    width={28}
                    height={19}
                  />
                  <span>MASLOW</span>
                </div>
                <p className={styles.blurb}>
                  AI employees built on knowledge systems and infrastructure
                  your company owns.
                </p>
                <span className={styles.badge}>
                  <span className={styles.dot} />
                  {engagementBadge}
                </span>
              </div>

              <div className={styles.col}>
                <span className={styles.colTitle}>Concepts</span>
                {conceptLinks.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className={styles.col}>
                <span className={styles.colTitle}>Company</span>
                {companyLinks.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className={styles.col}>
                <span className={styles.colTitle}>Trust</span>
                {trustLinks.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className={styles.col}>
                <span className={styles.colTitle}>Start</span>
                {startLinks.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.bottom}>
              <span>© 2026 Maslow AI · AI systems your company owns.</span>
              <div className={styles.bottomLinks}>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                <a
                  href={socialLinks.companyLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </footer>
      ) : (
        <footer className={styles.compact}>
          <div className={styles.compactInner}>
            <div className={styles.brandRow}>
              <Image
                src="/assets/maslow-mark-white.svg"
                alt=""
                width={28}
                height={19}
              />
              <span>MASLOW</span>
            </div>
            <div className={styles.compactLinks}>
              <Link href="/">Home</Link>
              <Link href="/services">Services</Link>
              <Link href="/contact">Contact</Link>
              <a
                href={socialLinks.companyLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
