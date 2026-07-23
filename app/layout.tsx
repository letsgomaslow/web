import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

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
    "AI employees in Teams, Slack, and email, standing on knowledge systems and infrastructure you own. AI transformation without the transformation budget: fixed fees, 90-day foundations, no lock-in.",
  openGraph: {
    type: "website",
    siteName: "Maslow AI",
    title:
      "Maslow AI | AI employees for the work that waits on your busiest people",
    description:
      "AI employees in Teams, Slack, and email, standing on knowledge systems and infrastructure you own. AI transformation without the transformation budget: fixed fees, 90-day foundations, no lock-in.",
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
      <body>{children}</body>
    </html>
  );
}
