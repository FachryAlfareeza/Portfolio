"use client";

import { useLanguage } from "./LanguageProvider";

export function SkipLink() {
  const { ui } = useLanguage();

  return (
    <a
      href="#about"
      className="absolute left-4 top-[-60px] z-[100] bg-white px-3 py-2 text-ink focus:top-3"
    >
      {ui.skipToContent}
    </a>
  );
}
