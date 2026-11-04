"use client";

import { useLanguage } from "./LanguageProvider";

type SectionNavKey = "about" | "skills" | "projects" | "experience" | "credentials";

// Numbered section label, e.g. "01 About" — matches legacy .section-label.
export function SectionLabel({
  index,
  labelKey,
  children,
}: {
  index: string;
  labelKey?: SectionNavKey;
  children: string;
}) {
  const { ui } = useLanguage();
  const text = labelKey ? ui.nav[labelKey] : children;

  return (
    <p className="pt-[10px] font-mono text-micro uppercase text-muted dark:text-white/50">
      <span className="pr-3 text-blue-strong dark:text-orange">{index}</span>
      {text}
    </p>
  );
}
