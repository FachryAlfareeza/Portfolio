"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content";

export function Projects({ projects }: { projects: Project[] }) {
  const filters = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.track)))],
    [projects]
  );
  const [active, setActive] = useState("All");

  const shown = projects.filter(
    (p) => active === "All" || p.track === active
  );

  return (
    <>
      <div className="mb-6 flex items-end justify-between gap-[30px] max-[800px]:block">
        <h2 className="text-[31px] tracking-tighter2">Selected work</h2>
        <div className="flex flex-wrap justify-end gap-[5px] max-[800px]:mt-[17px] max-[800px]:justify-start">
          {filters.map((filter) => {
            const pressed = filter === active;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={pressed}
                onClick={() => setActive(filter)}
                className={`min-h-[36px] rounded-xs border px-[10px] text-[10px] transition-colors ${
                  pressed
                    ? "border-green bg-green text-white dark:border-lime dark:bg-lime dark:text-forest-900"
                    : "border-line text-muted hover:border-green hover:text-green dark:border-white/15 dark:text-white/60 dark:hover:border-lime dark:hover:text-lime"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[14px] max-[600px]:grid-cols-1">
        {shown.map((project) => (
          <article
            key={project.name}
            className={`flex min-h-[255px] flex-col border border-line p-[22px_23px] transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-[#aabaae] dark:border-white/10 dark:hover:border-white/25 ${
              project.featured
                ? "bg-[#e9efe5] dark:bg-white/5"
                : "bg-white dark:bg-white/[0.03]"
            } max-[600px]:min-h-[235px]`}
          >
            <div className="flex justify-between gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-green dark:text-lime">
                {project.track}
              </span>
              {project.featured && (
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-green dark:text-lime">
                  Featured
                </span>
              )}
            </div>

            <h3 className="mb-[7px] mt-3 text-[20px] tracking-[-0.04em]">
              {project.name}
            </h3>
            <p className="m-0 text-[12px] leading-[1.75] text-muted dark:text-white/60">
              {project.description}
            </p>

            <div className="my-[18px] flex flex-wrap gap-[6px]">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-white/70 px-[7px] py-1 font-mono text-[9px] text-[#58685c] dark:bg-white/10 dark:text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto flex gap-4 pt-[11px] text-[11px] font-bold text-green dark:text-lime">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Source code ↗
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Live preview ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
