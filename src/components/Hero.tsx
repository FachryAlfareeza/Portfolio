import { Container } from "./Container";
import { ArrowUpRight, DownloadIcon } from "./icons";
import { Reveal } from "./Reveal";
import type { Profile } from "@/content";

const CV_PATH = "/assets/Fachry-Alfareeza-ATS-CV.pdf";

const focusItems = [
  {
    number: "01",
    title: "Software engineering",
    body: "Web apps, APIs, and applied AI prototypes.",
  },
  {
    number: "02",
    title: "Data & analytics",
    body: "Python workflows, dashboards, and exploratory analysis.",
  },
  {
    number: "03",
    title: "Research",
    body: "Geospatial risk, energy, and decision support.",
  },
];

export function Hero({ profile }: { profile: Profile }) {
  return (
    <Container className="grid min-h-[620px] grid-cols-[1.15fr_0.85fr] items-center gap-[9%] pb-28 pt-[126px] max-[800px]:min-h-0 max-[800px]:grid-cols-1 max-[800px]:gap-10 max-[800px]:pt-[86px] max-[600px]:pb-[86px] max-[600px]:pt-[72px]">
      <Reveal className="max-w-[610px]">
        <p className="mb-[22px] flex items-center gap-[10px] font-mono text-micro font-medium text-green dark:text-lime">
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] rounded-full bg-[#54a96d] shadow-dot"
          />
          {profile.availability}
        </p>

        <h1 className="mb-5 text-[clamp(43px,6.1vw,74px)] font-bold leading-[1.06] tracking-tightest">
          {profile.tagline}
        </h1>

        <div className="mt-[30px] flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-[47px] items-center gap-[17px] rounded-sm2 bg-green px-[18px] text-[12px] font-bold text-white transition-[transform,background] duration-200 hover:-translate-y-0.5 hover:bg-green-deep"
          >
            Email me
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="#projects"
            className="inline-flex min-h-[47px] items-center rounded-sm2 border border-line px-[18px] text-[12px] font-bold transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/15"
          >
            View projects
          </a>
          <a
            href={CV_PATH}
            download
            className="inline-flex min-h-[47px] items-center gap-[10px] rounded-sm2 border border-line px-[18px] text-[12px] font-bold transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/15"
          >
            Download CV
            <DownloadIcon className="h-[15px] w-[15px] text-green dark:text-lime" />
          </a>
        </div>

        <p className="mt-[42px] font-mono text-micro tracking-[0.04em] text-muted dark:text-white/50">
          {profile.location}
        </p>
      </Reveal>

      <aside
        aria-hidden="true"
        className="relative min-h-[355px] overflow-hidden bg-forest-800 p-[25px_27px] text-[#eff3e9] shadow-card dark:shadow-[18px_18px_0_rgba(214,239,157,0.08)] max-[800px]:max-w-[520px]"
      >
        <span className="pointer-events-none absolute -right-[155px] -top-[115px] h-[280px] w-[280px] rounded-full border border-lime/20 shadow-[0_0_0_27px_rgba(214,239,157,0.03),0_0_0_55px_rgba(214,239,157,0.025)]" />
        <div className="flex justify-between font-mono text-[9px] tracking-[0.08em] text-[#a6b6a8]">
          <span>PORTFOLIO</span>
          <span className="text-[20px] text-lime">◍</span>
        </div>

        <div className="my-[21px] mt-[27px]">
          {focusItems.map((item) => (
            <div
              key={item.number}
              className="flex items-start gap-[17px] border-b border-[rgba(229,239,228,0.14)] py-[14px]"
            >
              <span className="pt-1 font-mono text-[9px] tracking-[0.08em] text-lime">
                {item.number}
              </span>
              <p className="m-0 text-[11px] leading-[1.55] text-[#a6b6a8]">
                <strong className="block text-[13px] font-semibold text-[#f1f3eb]">
                  {item.title}
                </strong>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-3 font-mono text-[9px] tracking-[0.08em] text-[#a6b6a8]">
          <span>BUILD</span>
          <span>EXPLORE</span>
        </div>
      </aside>
    </Container>
  );
}
