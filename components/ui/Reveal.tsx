"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  style?: React.CSSProperties;
  id?: string;
};

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.classList.add("mz-anim");
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      el.setAttribute("data-mz-in", "1");
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) reveal();
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );

    io.observe(el);

    const sweep = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 40 && r.bottom > -40) reveal();
    };

    const timers = [900, 2200, 4500].map((t) => setTimeout(sweep, t));
    let st: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(st);
      st = setTimeout(sweep, 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      clearTimeout(st);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`mz-reveal ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
