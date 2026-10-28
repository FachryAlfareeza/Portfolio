"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Phase = "ssr" | "hidden" | "shown";

// Fades + lifts children into view as they enter the viewport.
//
// Progressive enhancement: the server render has NO hidden state, so content
// is visible without JavaScript. On mount (before first paint) we hide the
// element, then an IntersectionObserver reveals it. With prefers-reduced-motion
// the element is never hidden and nothing animates.
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("ssr");

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // stay in "ssr" phase: visible, no transition classes
    }

    setPhase("hidden");

    // threshold 0 + a bottom inset: fires as soon as any part enters the
    // viewport, so very tall sections can never get stuck hidden.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase("shown");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const motionClass =
    phase === "ssr"
      ? ""
      : `transition-[opacity,transform] duration-700 ease-out ${
          phase === "shown" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`;

  return (
    <Tag
      ref={ref as never}
      style={delay && phase !== "ssr" ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${motionClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
