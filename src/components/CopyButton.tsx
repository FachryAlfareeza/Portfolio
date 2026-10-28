"use client";

import { useEffect, useRef, useState } from "react";

const TONES = {
  default:
    "border-line hover:border-blue-strong hover:text-blue-strong dark:border-night-line dark:hover:border-orange dark:hover:text-orange",
  // For use on the dark/blue contact panel.
  onDark: "border-white/25 text-white hover:border-orange hover:text-orange",
} as const;

export function CopyButton({
  getText,
  text,
  label = "Copy",
  className = "",
  tone = "default",
}: {
  /** Lazy text source. Only usable from client components (functions cannot cross the server boundary). */
  getText?: () => string;
  /** Static text. Use this when rendering from a server component. */
  text?: string;
  label?: string;
  className?: string;
  tone?: keyof typeof TONES;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function flash() {
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  }

  async function handleCopy() {
    const value = getText ? getText() : (text ?? "");
    try {
      await navigator.clipboard.writeText(value);
      flash();
    } catch {
      // Fallback for older browsers / insecure contexts.
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        if (document.execCommand("copy")) flash();
      } catch {
        /* give up silently */
      }
      document.body.removeChild(ta);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex min-h-[32px] items-center rounded-xs border px-3 text-[12px] font-bold transition-colors ${TONES[tone]} ${className}`}
    >
      {copied ? "Copied ✓" : label}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
