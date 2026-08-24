import Link from "next/link";
import type {
  PressReleaseLink,
  PressReleaseSection,
} from "@/lib/content/press";
import styles from "@/app/press/press.module.css";

type PressReleaseBodyProps = {
  sections: readonly PressReleaseSection[];
};

function renderPressLink(link: PressReleaseLink) {
  if (link.href.startsWith("/")) {
    return <Link href={link.href}>{link.label}</Link>;
  }

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }

  return <a href={link.href}>{link.label}</a>;
}

function sectionId(heading: string, index: number) {
  const slug = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${slug}-${index}`;
}

function renderSection(section: PressReleaseSection, index: number) {
  const key = `${section.type}-${index}`;

  if (section.type === "paragraph") {
    return <p key={key}>{section.text}</p>;
  }
  if (section.type === "quote") {
    return <blockquote key={key}>{section.text}</blockquote>;
  }
  if (section.type === "heading") {
    return (
      <h2 key={key} id={section.id}>
        {section.text}
      </h2>
    );
  }
  if (section.type === "links") {
    const id = sectionId(section.heading, index);
    return (
      <section key={key} aria-labelledby={id}>
        <h2 id={id}>{section.heading}</h2>
        <ul>
          {section.links.map((link) => (
            <li key={link.href}>{renderPressLink(link)}</li>
          ))}
        </ul>
      </section>
    );
  }
  if (section.type === "linkedParagraph") {
    return (
      <p key={key}>
        {section.before}
        {renderPressLink(section.link)}
        {section.after}
      </p>
    );
  }

  return (
    <section key={key} aria-labelledby="media-contact">
      <h2 id="media-contact">{section.heading}</h2>
      <address>
        <span>{section.name}</span>
        <span>{section.title}</span>
        <span>{section.company}</span>
        <a href={`mailto:${section.email}`}>{section.email}</a>
      </address>
    </section>
  );
}

export function PressReleaseBody({ sections }: PressReleaseBodyProps) {
  return <div className={styles.prose}>{sections.map(renderSection)}</div>;
}
