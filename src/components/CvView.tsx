"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";
import {
  type CopyFormat,
  formatProject,
  formatProjectList,
  formatTimelineEntry,
  formatTimelineList,
  formatSimpleList,
} from "@/content/cvFormat";
import type { PortfolioData } from "@/content";

const FORMATS: { id: CopyFormat; label: string }[] = [
  { id: "prose", label: "Prose" },
  { id: "markdown", label: "Markdown" },
  { id: "bullet", label: "Bullet" },
];

export function CvView({ data }: { data: PortfolioData }) {
  const [format, setFormat] = useState<CopyFormat>("prose");
  const { profile, projects, experience, education, training, awards } = data;

  return (
    <div className="mx-auto w-[min(860px,calc(100%-40px))] py-16">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6 dark:border-night-line">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-[13px] text-muted dark:text-white/60">
            {profile.location} · {profile.email}
          </p>
          <p className="mt-1 text-[12px] text-muted dark:text-white/40">
            Working copy for pasting into CVs and portfolios. Edit{" "}
            <code className="font-mono">data.json</code> to update.
          </p>
        </div>

        {/* Format toggle */}
        <div
          role="group"
          aria-label="Copy format"
          className="flex gap-1"
        >
          {FORMATS.map((f) => {
            const active = f.id === format;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFormat(f.id)}
                className={`min-h-[32px] rounded-xs border px-3 text-[12px] font-bold transition-colors ${
                  active
                    ? "border-blue-strong bg-blue-strong text-white dark:border-orange dark:bg-orange dark:text-night-900"
                    : "border-line text-muted hover:border-blue-strong hover:text-blue-strong dark:border-night-line dark:text-white/60 dark:hover:border-orange dark:hover:text-orange"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </header>

      <Section
        title="Projects"
        copyAll={() => formatProjectList(projects, format)}
      >
        {projects.map((p) => (
          <Block key={p.name} copy={() => formatProject(p, format)}>
            <h3 className="text-[15px] font-semibold">
              {p.name}{" "}
              <span className="font-normal text-muted dark:text-white/50">
                — {p.track}
              </span>
            </h3>
            <p className="mt-1 text-[13px] leading-[1.7]">{p.description}</p>
            <p className="mt-1 font-mono text-[12px] text-muted dark:text-white/50">
              Tech: {p.tech.join(", ")}
            </p>
            {(p.repo || p.demo) && (
              <p className="mt-1 font-mono text-[12px] text-muted dark:text-white/50">
                {p.repo && <span className="mr-3">Repo: {p.repo}</span>}
                {p.demo && <span>Demo: {p.demo}</span>}
              </p>
            )}
          </Block>
        ))}
      </Section>

      <Section
        title="Experience"
        copyAll={() => formatTimelineList(experience, format)}
      >
        {experience.map((e) => (
          <Block key={`${e.title}-${e.date}`} copy={() => formatTimelineEntry(e, format)}>
            <TimelineBody entry={e} />
          </Block>
        ))}
      </Section>

      <Section
        title="Education"
        copyAll={() => formatTimelineList(education, format)}
      >
        {education.map((e) => (
          <Block key={`${e.title}-${e.date}`} copy={() => formatTimelineEntry(e, format)}>
            <TimelineBody entry={e} />
          </Block>
        ))}
      </Section>

      <Section
        title="Training"
        copyAll={() => formatSimpleList(training, format)}
      >
        <ul className="list-disc space-y-1 pl-5 text-[13px] leading-[1.7]">
          {training.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>

      <Section title="Awards" copyAll={() => formatSimpleList(awards, format)}>
        <ul className="list-disc space-y-1 pl-5 text-[13px] leading-[1.7]">
          {awards.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  copyAll,
  children,
}: {
  title: string;
  copyAll: () => string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center justify-between gap-4 border-b border-line pb-2 dark:border-night-line">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.12em] text-blue-strong dark:text-orange">
          {title}
        </h2>
        <CopyButton getText={copyAll} label={`Copy all ${title.toLowerCase()}`} className="print:hidden" />
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Block({
  copy,
  children,
}: {
  copy: () => string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-sm2 border border-transparent p-2 transition-colors hover:border-line hover:bg-black/[0.015] dark:hover:border-night-line dark:hover:bg-white/[0.02]">
      <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 print:hidden">
        <CopyButton getText={copy} />
      </div>
      {children}
    </div>
  );
}

function TimelineBody({ entry }: { entry: { title: string; organization: string; date: string; description: string } }) {
  return (
    <>
      <h3 className="text-[15px] font-semibold">
        {entry.title}{" "}
        <span className="font-normal text-muted dark:text-white/50">
          — {entry.organization}
        </span>
      </h3>
      <p className="mt-0.5 font-mono text-[12px] text-muted dark:text-white/50">
        {entry.date}
      </p>
      <p className="mt-1 text-[13px] leading-[1.7]">{entry.description}</p>
    </>
  );
}
