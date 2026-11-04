"use client";

import { useState } from "react";
import { SocialGlyph, ArrowUpRight } from "./icons";
import { GitHubActivity } from "./GitHubActivity";
import { useLanguage } from "./LanguageProvider";
import { playTick } from "@/lib/feedback";
import type { Profile, SocialLink } from "@/content";

type BioDepth = "quick" | "story";

export function About({
  profile: initialProfile,
  social,
}: {
  profile: Profile;
  social: SocialLink[];
}) {
  const { data, ui } = useLanguage();
  const profile = data.profile ?? initialProfile;
  const [depth, setDepth] = useState<BioDepth>("quick");

  const handleDepth = (next: BioDepth) => {
    if (next === depth) return;
    playTick();
    setDepth(next);
  };

  return (
    <div className="max-w-[740px]">
      <div className="mb-[18px] flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.18] tracking-tighter2">
          {ui.about.headingPrefix}
          <em className="font-serif font-normal not-italic text-blue-strong dark:text-orange">
            {ui.about.headingEm}
          </em>
          {ui.about.headingSuffix}
        </h2>

        {/* Segmented Bio Depth Toggle (Quick vs. Full story) */}
        <div
          role="group"
          aria-label={ui.about.depthLabel}
          className="inline-flex rounded-xs border border-line bg-panel/60 p-0.5 dark:border-white/15 dark:bg-night-800"
        >
          {(["quick", "story"] as const).map((mode) => {
            const active = depth === mode;
            const label =
              mode === "quick" ? ui.about.depthQuick : ui.about.depthStory;
            return (
              <button
                key={mode}
                type="button"
                aria-pressed={active}
                onClick={() => handleDepth(mode)}
                className={`min-h-[30px] rounded-xs px-2.5 font-mono text-[12px] font-medium transition-colors ${
                  active
                    ? "bg-blue-strong text-white dark:bg-orange dark:text-night-900"
                    : "text-muted hover:text-blue-strong dark:text-white/60 dark:hover:text-orange"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {depth === "quick" || !profile.aboutLong?.length ? (
        <p className="max-w-[690px] text-[15px] text-muted dark:text-white/60">
          {profile.about}
        </p>
      ) : (
        <div className="max-w-[690px] space-y-4 text-[15px] text-muted dark:text-white/65">
          {profile.aboutLong.map((paragraph, idx) => (
            <p
              key={idx}
              style={{ animationDelay: `${idx * 60}ms` }}
              className="animate-card-in"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <div className="mt-[23px] flex flex-wrap gap-[9px]">
        {social.map((item) => (
          <a
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-xs border border-line px-[11px] text-[12px] font-bold transition-colors hover:border-blue-strong hover:text-blue-strong dark:border-white/15 dark:hover:border-orange dark:hover:text-orange"
          >
            <SocialGlyph icon={item.icon} className="h-4 w-4" />
            {item.label}
            <ArrowUpRight className="h-3 w-3 opacity-70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
      </div>

      <GitHubActivity />
    </div>
  );
}
