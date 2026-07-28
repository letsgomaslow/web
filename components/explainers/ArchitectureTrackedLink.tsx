"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";

type ArchitectureTrackedLinkProps = {
  href: string;
  className: string;
  eventName: string;
  eventData: Record<string, string>;
  children: React.ReactNode;
};

export function ArchitectureTrackedLink({
  href,
  className,
  eventName,
  eventData,
  children,
}: ArchitectureTrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track(eventName, eventData)}
    >
      {children}
    </Link>
  );
}
