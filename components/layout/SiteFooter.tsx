import Image from "next/image";
import Link from "next/link";
import { companyLinks, conceptLinks, startLinks } from "@/lib/brand";
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
        <section className="cta-band">
          <h2>Ready to find where AI pays?</h2>
          <p>
            A 30-minute working session. Bring one painful workflow; we&apos;ll
            sketch the harness, the data pipeline and the cost curve.
          </p>
          <Link href="/contact" className="cta">
            BOOK A CONSULTATION
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
                  Vertically integrated AI transformation, on models and
                  hardware you own.
                </p>
                <span className={styles.badge}>
                  <span className={styles.dot} />
                  Open for new engagements
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
                <span className={styles.colTitle}>Start</span>
                {startLinks.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.bottom}>
              <span>© 2026 Maslow AI · Transform with purpose.</span>
              <a href="mailto:hello@maslow.ai">hello@maslow.ai</a>
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
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
