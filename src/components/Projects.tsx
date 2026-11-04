"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { useLanguage } from "./LanguageProvider";
import { playTick } from "@/lib/feedback";
import type { Project } from "@/content";

export function Projects({ projects: initialProjects }: { projects: Project[] }) {
  const { data, ui } = useLanguage();
  const projects = data.projects ?? initialProjects;

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.track)))],
    [projects]
  );
  const [active, setActive] = useState("All");

  // Reset to "All" if the language changes and the active track label changed.
  useEffect(() => {
    if (!filters.includes(active)) {
      setActive("All");
    }
  }, [filters, active]);

  const shown = projects.filter(
    (p) => active === "All" || p.track === active
  );

  const handleCardPointerMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <div className="mb-6 flex items-end justify-between gap-[30px] max-[800px]:block">
        <h2 className="text-[31px] tracking-tighter2">{ui.projects.heading}</h2>
        <div className="flex flex-wrap justify-end gap-[5px] max-[800px]:mt-[17px] max-[800px]:justify-start">
          {filters.map((filter) => {
            const pressed = filter === active;
            const displayLabel =
              filter === "All" ? ui.projects.allFilter : filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={pressed}
                onClick={() => {
                  if (filter !== active) playTick();
                  setActive(filter);
                }}
                className={`min-h-[36px] rounded-xs border px-[10px] text-[12px] transition-colors ${
                  pressed
                    ? "border-blue-strong bg-blue-strong text-white dark:border-orange dark:bg-orange dark:text-night-900"
                    : "border-line text-muted hover:border-blue-strong hover:text-blue-strong dark:border-white/15 dark:text-white/60 dark:hover:border-orange dark:hover:text-orange"
                }`}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Announce filter results to assistive tech. */}
      <p role="status" aria-live="polite" className="sr-only">
        {ui.projects.showingSr(shown.length, projects.length, active)}
      </p>

      <div className="grid grid-cols-2 gap-[14px] max-[600px]:grid-cols-1">
        {shown.map((project, index) => (
          <article
            key={`${active}-${project.name}`}
            onMouseMove={handleCardPointerMove}
            style={{ animationDelay: `${index * 70}ms` }}
            className={`group/card animate-card-in relative flex min-h-[255px] flex-col overflow-hidden border p-[22px_23px] transition-[transform,border-color] duration-200 hover:-translate-y-[3px] ${
              project.featured
                ? "border-blue-strong bg-blue/15 hover:border-blue-deep dark:border-orange dark:bg-orange/15 dark:hover:border-orange-strong"
                : "border-line bg-white hover:border-blue/60 dark:border-night-line dark:bg-night-800 dark:hover:border-orange/40"
            } max-[600px]:min-h-[235px]`}
          >
            {/* Cursor-tracking spotlight glow */}
            <div
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), currentColor, transparent 70%)",
              }}
              className="pointer-events-none absolute inset-0 text-blue-strong/[0.06] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 dark:text-orange/[0.08]"
            />

            {/* Subtle Eja monogram pattern revealed under cursor on featured cards */}
            {project.featured && (
              <div
                aria-hidden="true"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(220px circle at var(--spot-x, 85%) var(--spot-y, 20%), black, transparent 75%)",
                  maskImage:
                    "radial-gradient(220px circle at var(--spot-x, 85%) var(--spot-y, 20%), black, transparent 75%)",
                }}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
              >
                <div className="brand-pattern h-full w-full text-blue-strong/[0.09] dark:text-orange/[0.11]" />
              </div>
            )}

            <div className="relative z-10 flex justify-between gap-3">
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-blue-strong dark:text-orange">
                {project.track}
              </span>
              {project.featured && (
                <span className="rounded-full bg-blue-strong px-2 py-[2px] font-mono text-[12px] uppercase tracking-[0.08em] text-white dark:bg-orange dark:text-night-900">
                  {ui.projects.featuredBadge}
                </span>
              )}
            </div>

            <h3 className="relative z-10 mb-[7px] mt-3 text-[20px] tracking-[-0.04em]">
              {project.name}
            </h3>
            <p className="relative z-10 m-0 text-[12px] leading-[1.75] text-muted dark:text-white/60">
              {project.description}
            </p>

            <div className="relative z-10 my-[18px] flex flex-wrap gap-[6px]">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-black/[0.04] px-[7px] py-1 font-mono text-[12px] text-[#44556a] dark:bg-white/10 dark:text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="relative z-10 mt-auto flex gap-4 pt-[11px] text-[12px] font-bold text-blue-strong dark:text-orange">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {ui.projects.sourceCode}
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {ui.projects.livePreview}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
