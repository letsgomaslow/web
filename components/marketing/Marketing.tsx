import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import styles from "./Marketing.module.css";

export function MarketingIntro({ eyebrow, title, body, secondaryHref, secondaryLabel }: { eyebrow: string; title: string; body: string; secondaryHref?: string; secondaryLabel?: string }) {
  return <section className={styles.intro}>
    <div className={styles.introRule} aria-hidden="true"><span /><span /><span /></div>
    <p className="eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    <div className={styles.introBottom}><p>{body}</p><div className={styles.actions}>
      <CtaButton href="/contact">Talk through a workflow</CtaButton>
      {secondaryHref && <Link className={styles.textAction} href={secondaryHref}>{secondaryLabel} <span aria-hidden="true">↗</span></Link>}
    </div></div>
  </section>;
}

export function NextStep({ title = "A useful place to begin.", body = "Bring the work you want to improve. We will explore the people, information, and systems it depends on, then agree on a sensible starting scope." }: { title?: string; body?: string }) {
  return <section className={styles.next}><div><p className="eyebrow eyebrow-ice">LET’S MAKE IT USEFUL</p><h2>{title}</h2><p>{body}</p></div><div className={styles.actions}><CtaButton href="/contact" variant="inverse">Talk through a workflow</CtaButton><Link href="/plan-workflow">Map a workflow first <span aria-hidden="true">↗</span></Link></div></section>;
}
