"use client";

import styles from "./case-study.module.css";

export type CaseStudyChapter = {
  id: string;
  label: string;
};

type CaseStudyChapterNavProps = {
  chapters: readonly CaseStudyChapter[];
};

export function CaseStudyChapterNav({ chapters }: CaseStudyChapterNavProps) {
  function focusChapter(id: string) {
    window.requestAnimationFrame(() => {
      const heading = document.getElementById(id);
      if (heading instanceof HTMLElement) {
        heading.focus({ preventScroll: true });
      }
    });
  }

  return (
    <nav
      className={styles.chapterNav}
      aria-label="Case study chapters"
      data-chapter-nav
    >
      <span className={styles.chapterNavLabel}>ON THIS CASE STUDY</span>
      <div className={styles.chapterLinks}>
        {chapters.map((chapter, index) => (
          <a
            key={chapter.id}
            className={styles.chapterLink}
            href={`#${chapter.id}`}
            onClick={() => focusChapter(chapter.id)}
            data-chapter-link
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {chapter.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
