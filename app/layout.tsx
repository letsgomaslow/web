import type { Metadata } from "next";
import localFont from "next/font/local";
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

const manrope = localFont({ src: "../vendor/maslow-brand-os/assets/fonts/Manrope-Variable.ttf", variable: "--font-manrope", display: "swap" });
const dmSans = localFont({ src: "../vendor/maslow-brand-os/assets/fonts/DMSans-Variable.ttf", variable: "--font-dm-sans", display: "swap" });
const ibmPlexMono = localFont({ src: [{ path: "../vendor/maslow-brand-os/assets/fonts/IBMPlexMono-Regular.ttf", weight: "400" }, { path: "../vendor/maslow-brand-os/assets/fonts/IBMPlexMono-Medium.ttf", weight: "500" }], variable: "--font-ibm-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://maslow.ai"),
  title: {
    default:
      "Maslow AI | A shared foundation for AI work",
    template: "%s · Maslow AI",
  },
  description:
    "Explore Maslow AI-OS and connect your organization’s knowledge, tools, and workflows with help from Maslow AI.",
  icons: {
    icon: {
      url: "/assets/logos/maslow-symbol-webflow-full-color.png",
      type: "image/png",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Maslow AI",
    title:
      "Maslow AI | A shared foundation for AI work",
    description:
      "Explore Maslow AI-OS and connect your organization’s knowledge, tools, and workflows with help from Maslow AI.",
    images: [{ url: "/assets/logos/maslow-complete-full-color.png" }],
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
