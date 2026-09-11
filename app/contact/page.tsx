import Image from "next/image";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { BookingExperience } from "@/components/booking/BookingExperience";
import { contactEmail, founderHeadshot, socialLinks } from "@/lib/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: { absolute: "Book a workflow conversation | Maslow AI" },
  description: "Choose a time for a 30-minute conversation with Rakesh David. Explore an AI workflow, organizational knowledge, or the Maslow AI-OS preview using your existing systems.",
};

export default function ContactPage() {
  return (
    <PageShell footer="compact">
      <section className={styles.section} data-screen-label="Contact">
        <div className={styles.intro}>
          <div>
            <p className="eyebrow">LET’S TALK THROUGH A WORKFLOW / 30 MINUTES</p>
            <h1 className={styles.title}>Bring the work.<br /><span>We’ll find a starting point.</span></h1>
            <p className={styles.lede}>A recurring task, information that’s hard to find, or a question about AI-OS. Start with what your team needs and the systems you already have.</p>
            <a href="#booking" className={styles.jump}>Choose a time <span aria-hidden="true">↓</span></a>
          </div>
          <aside className={styles.host} aria-label="Your conversation with Maslow">
            <Image className={styles.hostPhoto} src={founderHeadshot.src} alt={founderHeadshot.alt} width={founderHeadshot.width} height={founderHeadshot.height} sizes="80px" />
            <div>
              <span className={styles.hostLabel}>YOUR CONVERSATION IS WITH</span>
              <a className={styles.hostName} href={socialLinks.founderLinkedIn} target="_blank" rel="noopener noreferrer">Rakesh David ↗</a>
              <span className={styles.hostRole}>Founder &amp; CEO, Maslow AI</span>
            </div>
            <p>We’ll discuss the task, where it gets stuck, and a useful next step. Implementation scope and fees are agreed separately.</p>
            <div className={styles.sessionFacts}><span>30 minutes</span><span>Google Meet</span></div>
          </aside>
        </div>
        <div className={styles.booking} id="booking">
          <div className={styles.bookingHeading}>
            <div><p className="eyebrow">YOUR NEXT STEP</p><h2>Make time for a useful conversation.</h2></div>
            <p>Choose a date and time, then add your details. The calendar shows times in your selected timezone.</p>
          </div>
          <BookingExperience source="contact" />
        </div>
        <div className={styles.links}>
          <div><h2>Prefer to write first?</h2><p>Send your question or a short outline of the work.</p></div>
          <a href={`mailto:${contactEmail}`}>{contactEmail} <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.profiles}>
          <a href={socialLinks.companyLinkedIn} target="_blank" rel="noopener noreferrer">Maslow AI on LinkedIn <span aria-hidden="true">↗</span></a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </PageShell>
  );
}
