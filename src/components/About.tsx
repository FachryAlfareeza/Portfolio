import { SocialGlyph, ArrowUpRight } from "./icons";
import type { Profile, SocialLink } from "@/content";

export function About({
  profile,
  social,
}: {
  profile: Profile;
  social: SocialLink[];
}) {
  return (
    <div className="max-w-[740px]">
      <h2 className="mb-[18px] text-[clamp(28px,4vw,44px)] leading-[1.18] tracking-tighter2">
        Building <em className="font-serif font-normal not-italic text-blue-strong dark:text-orange">practical</em> software and data tools.
      </h2>
      <p className="max-w-[690px] text-[15px] text-muted dark:text-white/60">
        {profile.about}
      </p>

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
    </div>
  );
}
