"use client";

import { Container } from "./Container";
import { ArrowUpRight, DownloadIcon } from "./icons";
import { Reveal } from "./Reveal";
import { LocalTime } from "./LocalTime";
import { HeroPortrait } from "./HeroPortrait";
import { useLanguage } from "./LanguageProvider";
import type { Profile } from "@/content";

const CV_PATH = "/assets/Fachry-Alfareeza-ATS-CV.pdf";

export function Hero({ profile: initialProfile }: { profile: Profile }) {
  const { data, ui } = useLanguage();
  const profile = data.profile ?? initialProfile;

  return (
    <Container className="grid min-h-[620px] grid-cols-[1.15fr_0.85fr] items-center gap-[9%] pb-28 pt-[126px] max-[800px]:min-h-0 max-[800px]:grid-cols-1 max-[800px]:gap-10 max-[800px]:pt-[86px] max-[600px]:pb-[86px] max-[600px]:pt-[72px]">
      <div className="max-w-[610px]">
        <Reveal>
          <p className="mb-[22px] flex items-center gap-[10px] font-mono text-micro font-medium text-blue-strong dark:text-orange">
            <span
              aria-hidden="true"
              className="h-[7px] w-[7px] rounded-full bg-blue-strong shadow-dot dark:bg-orange dark:shadow-none"
            />
            {profile.availability}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mb-5 font-sans text-[clamp(43px,6.1vw,74px)] font-extrabold leading-[1.06] tracking-tightest">
            {profile.headline}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="max-w-[500px] text-[16px] leading-[1.8] text-muted dark:text-white/60">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-[30px] flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex min-h-[47px] items-center gap-[17px] rounded-sm2 bg-blue-strong px-[18px] text-[12px] font-bold text-white transition-[transform,background] duration-200 hover:-translate-y-0.5 hover:bg-blue-deep dark:bg-orange dark:text-night-900 dark:hover:bg-orange-strong"
            >
              {ui.hero.emailMe}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-[47px] items-center rounded-sm2 border border-line px-[18px] text-[12px] font-bold transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/15"
            >
              {ui.hero.viewProjects}
            </a>
            <a
              href={CV_PATH}
              download
              className="inline-flex min-h-[47px] items-center gap-[10px] rounded-sm2 border border-line px-[18px] text-[12px] font-bold transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/15"
            >
              {ui.hero.downloadCv}
              <DownloadIcon className="h-[15px] w-[15px] text-blue-strong dark:text-orange" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-[42px] font-mono text-micro tracking-[0.04em] text-muted dark:text-white/50">
            {profile.location}
            <LocalTime timeZone={profile.timezone} />
          </p>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <HeroPortrait photo={profile.photo} />
      </Reveal>
    </Container>
  );
}
