"use client";

import { useMemo, useState } from "react";
import snapshot from "@/content/github-contributions.json";
import { GitHubIcon, ArrowUpRight } from "./icons";
import { useLanguage } from "./LanguageProvider";

interface DayEntry {
  date: string;
  count: number;
  level: number;
}

const LEVEL_CLASSES: Record<number, string> = {
  0: "bg-panel dark:bg-white/[0.06]",
  1: "bg-blue/45 dark:bg-orange/30",
  2: "bg-blue/80 dark:bg-orange/55",
  3: "bg-blue-strong/85 dark:bg-orange/80",
  4: "bg-blue-deep dark:bg-orange",
};

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export function GitHubActivity() {
  const { locale, ui } = useLanguage();
  const [hovered, setHovered] = useState<DayEntry | null>(null);

  const { weeks, monthLabels } = useMemo(() => {
    const days = (snapshot.contributions ?? []) as DayEntry[];
    const cols: (DayEntry | null)[][] = [];
    let currentWeek: (DayEntry | null)[] = [];

    if (days.length > 0) {
      const firstDate = new Date(`${days[0].date}T00:00:00Z`);
      const padStart = firstDate.getUTCDay();
      for (let i = 0; i < padStart; i++) {
        currentWeek.push(null);
      }
    }

    for (const day of days) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      cols.push(currentWeek);
    }

    const months = locale === "id" ? MONTHS_ID : MONTHS_EN;
    const labels: { colIndex: number; text: string }[] = [];
    let lastMonth = -1;

    cols.forEach((week, colIndex) => {
      const firstValid = week.find((d) => d !== null);
      if (!firstValid) return;
      const monthIdx = Number(firstValid.date.slice(5, 7)) - 1;
      if (monthIdx !== lastMonth) {
        if (labels.length === 0 || colIndex - labels[labels.length - 1].colIndex >= 3) {
          labels.push({ colIndex, text: months[monthIdx] });
        }
        lastMonth = monthIdx;
      }
    });

    return { weeks: cols, monthLabels: labels };
  }, [locale]);

  const formatDayLabel = (day: DayEntry) => {
    try {
      const dt = new Date(`${day.date}T00:00:00Z`);
      const formatted = new Intl.DateTimeFormat(
        locale === "id" ? "id-ID" : "en-US",
        { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }
      ).format(dt);
      if (locale === "id") {
        return `${day.count} kontribusi pada ${formatted}`;
      }
      return `${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${formatted}`;
    } catch {
      return `${day.count} (${day.date})`;
    }
  };

  return (
    <div className="mt-8 rounded-sm2 border border-line bg-white p-5 dark:border-night-line dark:bg-night-800">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <GitHubIcon className="h-4 w-4 text-blue-strong dark:text-orange" />
          <a
            href={`https://github.com/${snapshot.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-mono text-[12px] font-bold text-ink transition-colors hover:text-blue-strong dark:text-[#F4EFEA] dark:hover:text-orange"
          >
            @{snapshot.username}
            <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <p
          aria-live="polite"
          className="font-mono text-[12px] text-muted dark:text-white/60"
        >
          {hovered ? (
            <span className="font-medium text-blue-strong dark:text-orange">
              {formatDayLabel(hovered)}
            </span>
          ) : (
            <>
              <strong className="font-bold text-ink dark:text-[#F4EFEA]">
                {snapshot.total}
              </strong>{" "}
              {ui.github.contributionsInYear}
            </>
          )}
        </p>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="inline-block min-w-max">
          {/* Month labels row */}
          <div
            className="relative mb-1.5 h-4 font-mono text-[11px] text-muted dark:text-white/45"
            aria-hidden="true"
          >
            {monthLabels.map((m) => (
              <span
                key={`${m.text}-${m.colIndex}`}
                style={{ left: `${m.colIndex * 13}px` }}
                className="absolute top-0"
              >
                {m.text}
              </span>
            ))}
          </div>

          {/* 53-week grid */}
          <div
            role="group"
            aria-label={ui.github.title}
            onMouseLeave={() => setHovered(null)}
            className="flex gap-[3px]"
          >
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.map((day, dIdx) =>
                  day ? (
                    <button
                      key={day.date}
                      type="button"
                      aria-label={formatDayLabel(day)}
                      onMouseEnter={() => setHovered(day)}
                      onFocus={() => setHovered(day)}
                      onBlur={() => setHovered(null)}
                      className={`h-[10px] w-[10px] rounded-[2px] transition-transform duration-150 hover:scale-125 focus-visible:scale-125 ${
                        LEVEL_CLASSES[day.level] ?? LEVEL_CLASSES[0]
                      }`}
                    />
                  ) : (
                    <span
                      key={`pad-${wIdx}-${dIdx}`}
                      aria-hidden="true"
                      className="h-[10px] w-[10px]"
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 font-mono text-[11px] text-muted dark:text-white/45">
        <span className="max-[600px]:inline hidden">{ui.github.scrollHint}</span>
        <span className="max-[600px]:hidden">{ui.github.title}</span>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span>{ui.github.less}</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              className={`h-[10px] w-[10px] rounded-[2px] ${LEVEL_CLASSES[lvl]}`}
            />
          ))}
          <span>{ui.github.more}</span>
        </div>
      </div>
    </div>
  );
}
