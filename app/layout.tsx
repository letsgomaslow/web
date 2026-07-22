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
    default: "Maslow AI — AI transformation, without the transformation budget",
    template: "%s · Maslow AI",
  },
  description:
    "We vertically integrate AI into your business: your files become knowledge, your tools become skills, and virtual employees show up in Teams, Slack and email.",
  openGraph: {
    type: "website",
    siteName: "Maslow AI",
    title: "Maslow AI — AI transformation, without the transformation budget",
    description:
      "Vertically integrated AI transformation on models and hardware you own.",
    images: [{ url: "/assets/maslow-mark-gradient.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
