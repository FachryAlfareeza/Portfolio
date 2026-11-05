"use client";

import { useLanguage } from "./LanguageProvider";

// Splits "Silver Medal — Event Name 2024" into rank, event and year.
function parseAward(award: string) {
  const [rank, ...rest] = award.split(" — ");
  const detail = rest.join(" — ");
  const year = detail.match(/(\d{4})\s*$/)?.[1];
  const event = year ? detail.slice(0, -year.length).trim() : detail;
  return { rank, event, year };
}

// Featured awards from `featuredAwards` in data.json, shown as cards in About.
export function AwardHighlights() {
  const { data, ui } = useLanguage();
  const featured = (data.featuredAwards ?? [])
    .map((index) => data.awards[index])
    .filter((award): award is string => Boolean(award))
    .map(parseAward);

  if (featured.length === 0) return null;

  return (
    <section aria-label={ui.about.highlightsLabel} className="mt-[26px]">
      <p className="mb-2.5 font-mono text-micro uppercase text-muted dark:text-white/50">
        {ui.about.highlightsLabel}
      </p>
      <ul className="grid grid-cols-3 gap-[9px] max-[600px]:grid-cols-1">
        {featured.map((award) => (
          <li
            key={`${award.rank}-${award.event}`}
            className="flex flex-col rounded-xs border border-line bg-panel/50 px-4 py-[14px] transition-colors hover:border-blue-strong dark:border-white/10 dark:bg-night-800 dark:hover:border-orange"
          >
            <span className="text-[17px] font-extrabold leading-tight tracking-[-0.02em] text-blue-strong dark:text-orange">
              {award.rank}
            </span>
            <span className="mt-1.5 text-[13px] leading-snug text-ink dark:text-white/80">
              {award.event}
            </span>
            {award.year && (
              <span className="mt-auto pt-2.5 font-mono text-[12px] text-muted dark:text-white/45">
                {award.year}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
