import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  contactEmail,
  founderHeadshot,
  socialLinks,
} from "@/lib/brand";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Maslow AI",
  url: "https://maslow.ai",
  email: contactEmail,
  sameAs: [socialLinks.companyLinkedIn, socialLinks.github],
  founder: {
    "@type": "Person",
    name: "Rakesh David",
    jobTitle: "Founder & CEO",
    image: `https://maslow.ai${founderHeadshot.src}`,
    sameAs: [socialLinks.founderLinkedIn],
  },
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maslow.ai"),
  title: {
    default:
      "Maslow AI | AI employees for the work that waits on your busiest people",
    template: "%s · Maslow AI",
  },
  description:
    "AI employees in Teams, Slack, and email, built on knowledge systems and infrastructure you own. Fixed fees, 90-day foundations, and no lock-in.",
  openGraph: {
    type: "website",
    siteName: "Maslow AI",
    title:
      "Maslow AI | AI employees for the work that waits on your busiest people",
    description:
      "AI employees in Teams, Slack, and email, built on knowledge systems and infrastructure you own. Fixed fees, 90-day foundations, and no lock-in.",
    images: [{ url: "/assets/maslow-mark-gradient.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
