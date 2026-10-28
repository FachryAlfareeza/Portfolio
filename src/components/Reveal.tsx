"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fades + lifts children into view on scroll. Respects prefers-reduced-motion:
// when reduced motion is requested, content renders immediately with no animation.
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
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setReduced(true);
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const motionClass = reduced
    ? ""
    : `transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`;

  return (
    <Tag
      ref={ref as never}
      style={delay && !reduced ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${motionClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
