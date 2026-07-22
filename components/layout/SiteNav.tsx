"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { navLinks, ticks } from "@/lib/brand";
import styles from "./SiteNav.module.css";

type SiteNavProps = {
  highlightConcepts?: boolean;
  minimal?: boolean;
};

export function SiteNav({
  highlightConcepts = false,
  minimal = false,
}: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    document.documentElement.classList.toggle("mz-open", open);
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.classList.remove("mz-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  const isHere = (href: string) => {
    if (href.includes("#")) return false;
    return pathname === href;
  };

  return (
    <>
      <header className={styles.nav} data-screen-label="Nav">
        <Link href="/" className={styles.brand}>
          <Image
            src="/assets/maslow-mark-gradient.svg"
            alt="Maslow AI"
            width={36}
            height={23}
            priority
          />
          <span className={styles.brandName}>MASLOW</span>
          <span className={styles.brandSep}>|</span>
          <span className={styles.brandAi}>AI</span>
        </Link>

        {!minimal && (
          <nav className={styles.links} aria-label="Primary">
            {navLinks.map((link) => {
              const active =
                highlightConcepts && link.label === "CONCEPTS"
                  ? true
                  : isHere(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.link}
                  style={
                    active && link.label === "CONCEPTS"
                      ? { color: "#8A2752" }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" className={styles.book}>
              BOOK A CONSULTATION
            </Link>
          </nav>
        )}

        {minimal && (
          <Link href="/contact" className={styles.book}>
            BOOK A CONSULTATION
          </Link>
        )}
      </header>

      {!minimal && (
        <>
          <div className={styles.cluster}>
            <Link href="/contact" className={styles.bookMobile}>
              <span className={styles.bookLong}>BOOK A CALL</span>
              <span className={styles.bookShort}>BOOK</span>
            </Link>
            <button
              type="button"
              className={styles.burger}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={toggle}
            >
              <span className={styles.burgerInner}>
                <span className={`${styles.bar} ${styles.bar1}`} />
                <span className={`${styles.bar} ${styles.bar2}`} />
                <span className={`${styles.bar} ${styles.bar3}`} />
              </span>
            </button>
          </div>

          <div
            id={menuId}
            className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            aria-hidden={!open}
            {...(!open ? { inert: true } : {})}
          >
            <div className={styles.menuInner}>
              <Link href="/" className={styles.menuBrand} onClick={close}>
                <Image
                  src="/assets/maslow-mark-white.svg"
                  alt="Maslow AI"
                  width={36}
                  height={23}
                />
                <span>MASLOW</span>
                <span className={styles.brandSepMenu}>|</span>
                <span className={styles.brandAiMenu}>AI</span>
              </Link>

              <div className={styles.menuEyebrow}>NAVIGATE</div>

              <nav className={styles.menuNav}>
                {navLinks.map((link, i) => {
                  const here = isHere(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={styles.menuLink}
                      style={{ ["--d" as string]: `${0.14 + i * 0.055}s` }}
                      onClick={close}
                    >
                      <span style={{ color: ticks[i % ticks.length] }}>
                        0{i + 1}
                      </span>
                      <span style={{ color: here ? "#FFF860" : "#FFFFFF" }}>
                        {link.label}
                      </span>
                      <span className={here ? styles.here : styles.arrow}>
                        {here ? "YOU ARE HERE" : "↗"}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div
                className={styles.menuCtas}
                style={{
                  ["--d" as string]: `${0.14 + navLinks.length * 0.055 + 0.06}s`,
                }}
              >
                <Link href="/contact" className="cta" onClick={close}>
                  BOOK A CONSULTATION
                </Link>
                <Link
                  href="/assessment"
                  className={styles.menuSecondary}
                  onClick={close}
                >
                  TAKE THE 2-MINUTE ASSESSMENT
                </Link>
              </div>

              <div
                className={styles.menuMeta}
                style={{
                  ["--d" as string]: `${0.14 + navLinks.length * 0.055 + 0.12}s`,
                }}
              >
                <a href="mailto:hello@maslow.ai">hello@maslow.ai</a>
                <span>© 2026 MASLOW AI</span>
              </div>
            </div>
            <Image
              className={styles.menuWm}
              src="/assets/maslow-mark-white.svg"
              alt=""
              width={300}
              height={200}
            />
          </div>
        </>
      )}
    </>
  );
}
