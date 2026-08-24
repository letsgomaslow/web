export type PressReleaseLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type PressReleaseSection =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "heading"; id: string; text: string }
  | { type: "links"; heading: string; links: readonly PressReleaseLink[] }
  | {
      type: "linkedParagraph";
      before: string;
      link: PressReleaseLink;
      after: string;
    }
  | {
      type: "contact";
      heading: string;
      name: string;
      title: string;
      company: string;
      email: string;
    };

export type PressRelease = {
  slug: string;
  title: string;
  publishedAt: string;
  location: string;
  description: string;
  badge?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  sections: readonly PressReleaseSection[];
};

const openAiSelectPartner: PressRelease = {
  slug: "openai-select-partner",
  title: "Maslow AI Named an OpenAI Select Partner",
  publishedAt: "2026-08-25",
  location: "Woodbridge, NJ",
  description:
    "Woodbridge, NJ, August 25, 2026: Maslow AI, a founder-led AI transformation company that builds supervised AI employees around the workflows and systems organizations already use, today announced that it has been named an OpenAI Select Partner within the OpenAI Partner Network.",
  badge: {
    src: "/assets/partners/openai-select-partner.svg",
    alt: "OpenAI Select Partner",
    width: 375,
    height: 177,
  },
  sections: [
    {
      type: "paragraph",
      text: "Woodbridge, NJ, August 25, 2026: Maslow AI, a founder-led AI transformation company that builds supervised AI employees around the workflows and systems organizations already use, today announced that it has been named an OpenAI Select Partner within the OpenAI Partner Network.",
    },
    {
      type: "paragraph",
      text: "The OpenAI Partner Network is a global program for partners to build, sell, and deliver AI solutions with OpenAI. It brings together partners with deep industry expertise, delivery capabilities, and customer relationships while equipping them with resources, enablement, and support to help enterprises adopt OpenAI frontier models and products and turn them into measurable impact.",
    },
    {
      type: "paragraph",
      text: "As an OpenAI Select Partner, Maslow AI will continue working with OpenAI to help organizations build, deploy, and scale AI solutions responsibly and effectively. This work will help organizations get more useful work from every token and stronger performance per dollar with GPT-5.6, while using ChatGPT Work to turn ambitious goals into finished work.",
    },
    {
      type: "paragraph",
      text: "Maslow AI focuses on work that waits on overloaded owners, including estimating, contract review, compliance responses, client intake, and recurring operational reporting. Its systems bring governed company knowledge, reusable procedures, scoped tools, and human approval into the channels where teams already work.",
    },
    {
      type: "quote",
      text: "“Being named an OpenAI Select Partner gives Maslow a stronger path to combine OpenAI’s frontier capabilities with the workflow ownership, governed knowledge, and human review our clients need,” said Rakesh David, Founder and CEO of Maslow AI. “Our goal is to help a responsible owner move a waiting deliverable forward with better evidence, while keeping consequential decisions with people.”",
    },
    {
      type: "paragraph",
      text: "Maslow AI supports mid-market organizations with workflow discovery, knowledge-system design, context engineering, supervised AI employees, and production deployment. Published production work includes a manufacturing engagement that put four named AI employees into Microsoft Teams and established a working AI operating foundation in 90 days. It also includes a healthcare contract-review system grounded in a 50-document corpus with field-level citations.",
    },
    {
      type: "links",
      heading: "Production evidence",
      links: [
        {
          label: "Infinite AI OS: an AI operating system in 90 days",
          href: "/case-studies/infinite-ai-os",
        },
        {
          label: "AgentHub: contracts you can question",
          href: "/case-studies/agenthub",
        },
      ],
    },
    {
      type: "paragraph",
      text: "Looking ahead, Maslow AI plans to expand its OpenAI-related delivery capabilities, invest in partner enablement, and develop repeatable workflow patterns that help mid-market organizations translate AI ambition into measurable operational outcomes.",
    },
    {
      type: "links",
      heading: "Learn more about the OpenAI Partner Network",
      links: [
        {
          label: "https://openai.com/business/partners/",
          href: "https://openai.com/business/partners/",
          external: true,
        },
      ],
    },
    {
      type: "heading",
      id: "about-maslow-ai",
      text: "About Maslow AI",
    },
    {
      type: "paragraph",
      text: "Maslow AI builds AI employees for the work that waits on an organization’s busiest people. The company turns files into governed knowledge, procedures into reusable skills, and repeated work into supervised workflows with clear human decision points. Maslow AI’s systems run in the channels and infrastructure its clients control, with code, documentation, and operating artifacts delivered into client-owned repositories.",
    },
    {
      type: "linkedParagraph",
      before: "Learn more at ",
      link: {
        label: "https://maslow.ai",
        href: "https://maslow.ai",
      },
      after: ".",
    },
    {
      type: "contact",
      heading: "Media contact",
      name: "Rakesh David",
      title: "Founder & CEO",
      company: "Maslow AI",
      email: "rakesh@maslow.ai",
    },
  ],
};

export const pressReleases: readonly PressRelease[] = [openAiSelectPartner];

export const publishedPressReleases = [...pressReleases].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function formatPressDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function getAllPressSlugs() {
  return publishedPressReleases.map(({ slug }) => slug);
}

export function getPressRelease(slug: string) {
  return publishedPressReleases.find((release) => release.slug === slug);
}
