"use client";

import { useLanguage } from "./LanguageProvider";
import { playPop } from "@/lib/feedback";

export function LanguageToggle() {
  const { locale, toggleLocale, ui } = useLanguage();

  const handleClick = () => {
    playPop(locale === "en");
    toggleLocale();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ui.controls.switchLanguage}
      title={ui.controls.switchLanguage}
      className="inline-flex h-[44px] min-w-[44px] items-center justify-center rounded-sm2 border border-line px-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-muted transition-colors hover:border-blue-strong hover:text-blue-strong dark:border-white/15 dark:text-white/70 dark:hover:border-orange dark:hover:text-orange"
    >
      <span className={locale === "en" ? "font-bold text-blue-strong dark:text-orange" : "opacity-55"}>
        EN
      </span>
      <span aria-hidden="true" className="mx-1 opacity-35">
        /
      </span>
      <span className={locale === "id" ? "font-bold text-blue-strong dark:text-orange" : "opacity-55"}>
        ID
      </span>
    </button>
  );
}
