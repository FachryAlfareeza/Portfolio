import data from "./data.json";
import { LOCALES, type Locale, type Localizable, type PortfolioData } from "./types";

// Single typed content source for the whole site. Edit data.json to change content:
// write a text field as { "en": "...", "id": "..." } when it differs by language,
// or as a plain string when it doesn't.
const source = data as Localizable<PortfolioData>;

function isLocalizedText(value: unknown): value is { en: string } & Partial<Record<Locale, string>> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return (
    typeof (value as { en?: unknown }).en === "string" &&
    keys.every((key) => (LOCALES as readonly string[]).includes(key))
  );
}

// Walks the content and swaps each { en, id } field for the requested language.
function localize(value: unknown, locale: Locale): unknown {
  if (isLocalizedText(value)) return value[locale] ?? value.en;
  if (Array.isArray(value)) return value.map((item) => localize(item, locale));
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localize(item, locale)])
    );
  }
  return value;
}

const BY_LOCALE = Object.fromEntries(
  LOCALES.map((locale) => [locale, localize(source, locale) as PortfolioData])
) as Record<Locale, PortfolioData>;

/** English content, for server-only output: /cv, /llms.txt, metadata, share image. */
export const portfolio: PortfolioData = BY_LOCALE.en;

/** Content for the language the visitor picked. */
export function getPortfolioData(locale: Locale): PortfolioData {
  return BY_LOCALE[locale];
}

export * from "./types";
