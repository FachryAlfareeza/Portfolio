"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getPortfolioData, UI_COPY, type UiCopy } from "@/content/i18n";
import type { Locale, PortfolioData } from "@/content";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  ui: UiCopy;
  data: PortfolioData;
}

const STORAGE_KEY = "locale";

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  toggleLocale: () => {},
  ui: UI_COPY.en,
  data: getPortfolioData("en"),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "id") {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "id" : "en");
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      ui: UI_COPY[locale],
      data: getPortfolioData(locale),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
