"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "./icons";

// Floating "back to top" button, shown after scrolling past the first screen.
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      // `inert` keeps the hidden button out of the tab order.
      inert={!visible}
      onClick={() => {
        window.scrollTo({ top: 0 });
        // The button hides itself once at the top, which would drop keyboard
        // focus to <body>. Move focus to the page start so Tab continues from
        // there instead of from the bottom of the document.
        document.getElementById("top")?.focus({ preventScroll: true });
      }}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-blue-strong text-white shadow-lg transition-[opacity,transform,background] duration-300 hover:-translate-y-0.5 hover:bg-blue-deep dark:bg-orange dark:text-night-900 dark:hover:bg-orange-strong print:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-[18px] w-[18px]" />
    </button>
  );
}
