"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { useEffect, useRef } from "react";

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

type ArchitectureTrackedViewProps = {
  eventName: string;
  eventData: Record<string, string>;
};

export function ArchitectureTrackedView({
  eventName,
  eventData,
}: ArchitectureTrackedViewProps) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    track(eventName, eventData);
  }, [eventData, eventName]);

  return null;
}
