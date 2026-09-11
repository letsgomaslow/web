import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { HeroContinuity } from "@/components/ai-os/HeroContinuity";
import { FoundationJourney } from "@/components/ai-os/FoundationJourney";
import { WorkspaceExplorer } from "@/components/ai-os/WorkspaceExplorer";
import { RecipeExplorer } from "@/components/ai-os/RecipeExplorer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Maslow AI-OS | Your agents. One shared foundation" },
  description:
    "Explore the Maslow AI-OS vision: a free, customizable Linux environment in development, informed by Maslow's client AI workflow and infrastructure work.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Maslow AI",
    title: { absolute: "Maslow AI-OS | Your agents. One shared foundation" },
    description:
      "Explore a free, customizable Linux environment in development and the shared AI foundation behind it.",
    images: [
      {
        url: "/assets/ai-os/workspace-focus-ai.png",
        width: 1672,
        height: 941,
        alt: "Maslow AI-OS workspace concept",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <PageShell footer="full">
      <div className={styles.home}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              MASLOW AI-OS <small>/ FREE LINUX OS · IN DEVELOPMENT</small>
            </p>
            <h1 id="home-title">
              Your agents.
              <br />
              One shared
              <br />
              <em>foundation.</em>
            </h1>
            <p className={styles.heroDescription}>
              A free Linux environment being developed to keep your team’s
              knowledge and tools within reach of the supported agents your team
              chooses.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#foundation">
                See how it comes together <span aria-hidden="true">↓</span>
              </a>
              <Link className={styles.textAction} href="/ai-os">
                Explore the AI-OS preview <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className={styles.heroFor}>
              Maslow also builds paid AI workflows around your existing systems.
            </p>
          </div>
          <HeroContinuity />
          <div className={styles.heroFoot}>
            <span>TRY THE HANDOFF ABOVE</span>
            <p>Then scroll to see what makes it possible.</p>
            <a href="#foundation" aria-label="Scroll to the foundation">
              ↓
            </a>
          </div>
        </section>

        <FoundationJourney />
        <WorkspaceExplorer />

        <section
          className={styles.ecosystem}
          id="ecosystem"
          aria-labelledby="ecosystem-title"
        >
          <div className={styles.sectionTop}>
            <p>03 / MAKE IT USEFUL</p>
            <span>Start with one job worth doing.</span>
          </div>
          <div className={styles.sectionIntro}>
            <h2 id="ecosystem-title">
              Choose what helps.
              <br />
              <em>Know how it fits.</em>
            </h2>
            <p>
              Open-source projects give you the pieces. Maslow helps choose,
              connect, and shape them around a job your team needs done.
            </p>
          </div>
          <RecipeExplorer />
          <div className={styles.recipeNext}>
            <p>
              The free OS is a place to start. We can build the workflow with
              you, including on your existing infrastructure.
            </p>
            <Link href="/contact">
              Shape a workflow with us <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className={styles.boundary}>
            These are example combinations, configured for each organization.
            Some tools run locally; others use connected services. Catalog setup
            through <strong>Maslow Hub</strong> and connections through{" "}
            <strong>Maslow Connect</strong> are evolving.{" "}
            <Link href="/ai-os">See what’s in the current preview ↗</Link>
          </p>
        </section>

        <section
          className={styles.clientBridge}
          aria-labelledby="client-bridge-title"
        >
          <div>
            <p className={styles.eyebrow}>BUILT FROM THE WORK WE DO</p>
            <h2 id="client-bridge-title">
              This is how we help
              <br />
              <em>AI find its place.</em>
            </h2>
          </div>
          <div>
            <p>
              We build knowledge systems and AI workflows with clients on their
              existing infrastructure, including Ubuntu servers. Maslow AI-OS
              brings that experience into a free Linux environment that is
              easier to get started with.
            </p>
            <a href="#work">
              See the client work <span aria-hidden="true">↗</span>
            </a>
            <small>
              The workflow above is illustrative. OS packaging and integrations
              are evolving.
            </small>
          </div>
        </section>

        <section className={styles.work} id="work" aria-labelledby="work-title">
          <div className={styles.sectionTop}>
            <p>04 / FROM INFRASTRUCTURE TO IMPACT</p>
            <Link href="/services">
              Explore our services <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className={styles.sectionIntro}>
            <h2 id="work-title">
              A foundation is the start.
              <br />
              <em>The work is what matters.</em>
            </h2>
            <p>
              We help organizations find a worthwhile use case, connect the
              right systems, and build a workflow people can actually use.
            </p>
          </div>
          <div className={styles.caseStudies}>
            <Link
              className={styles.caseStudy}
              href="/case-studies/infinite-ai-os"
            >
              <div
                className={`${styles.caseArt} ${styles.caseManufacturing}`}
                aria-hidden="true"
              >
                <span>
                  FROM COMPANY KNOWLEDGE
                  <br />
                  TO DAILY WORK
                </span>
                <div>
                  {Array.from({ length: 6 }, (_, index) => (
                    <i key={index} />
                  ))}
                </div>
                <b>M / 01</b>
              </div>
              <div className={styles.caseMeta}>
                <span>MANUFACTURING</span>
                <span>CASE STUDY ↗</span>
              </div>
              <h3>
                Company knowledge.
                <br />
                Put to work.
              </h3>
              <p>
                AI employees and connected knowledge systems for a manufacturing
                operation.
              </p>
            </Link>
            <Link className={styles.caseStudy} href="/case-studies/agenthub">
              <div
                className={`${styles.caseArt} ${styles.caseHealthcare}`}
                aria-hidden="true"
              >
                <span>
                  FROM COMPLEX DOCUMENTS
                  <br />
                  TO CLEARER ANSWERS
                </span>
                <div className={styles.citationShape}>
                  <i />
                  <i />
                  <i />
                  <b>↗</b>
                </div>
                <strong>M / 02</strong>
              </div>
              <div className={styles.caseMeta}>
                <span>HEALTHCARE ENTERPRISE</span>
                <span>CASE STUDY ↗</span>
              </div>
              <h3>
                Complex contracts.
                <br />
                Clearer answers.
              </h3>
              <p>
                A shared prompt library and contract review with source
                citations.
              </p>
            </Link>
          </div>
          <p className={styles.evidenceNote}>
            These are Maslow client engagements, not deployments of the Linux
            AI-OS.
          </p>
        </section>

        <section className={styles.start} aria-labelledby="start-title">
          <div>
            <p className={styles.eyebrow}>YOUR NEXT MOVE</p>
            <h2 id="start-title">
              Bring your curiosity.
              <br />
              <em>Let’s build something useful.</em>
            </h2>
            <div className={styles.startPaths}>
              <article>
                <span>EXPLORE THE PRODUCT</span>
                <h3>Your environment. Your possibilities.</h3>
                <p>
                  See the free Linux environment being developed and review what
                  the current preview includes.
                </p>
                <Link className={styles.primaryAction} href="/ai-os">
                  Explore AI-OS preview <span aria-hidden="true">↗</span>
                </Link>
              </article>
              <article>
                <span>PUT AI TO WORK</span>
                <h3>Have a workflow in mind?</h3>
                <p>
                  We’ll map the opportunity and scope a practical paid
                  implementation on the systems you already use.
                </p>
                <Link className={styles.outlineAction} href="/contact">
                  Build a workflow with us <span aria-hidden="true">↗</span>
                </Link>
              </article>
            </div>
            <p className={styles.freeNote}>
              Maslow AI-OS is intended to be free. There is no public download
              from this page. Model usage, hardware, third-party licenses, and
              Maslow implementation services are separate.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
