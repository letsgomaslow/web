import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/Maslow Homepage.dc.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/Services.dc.html",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/Contact.dc.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/About.dc.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/Assessment.dc.html",
        destination: "/assessment",
        permanent: true,
      },
      {
        source: "/Blog.dc.html",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/Case Studies.dc.html",
        destination: "/case-studies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
