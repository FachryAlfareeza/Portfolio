"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { MoonIcon, SunIcon } from "./icons";
import { useLanguage } from "./LanguageProvider";
import { playPop } from "@/lib/feedback";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const { ui } = useLanguage();

  // Read the theme the no-flash script already resolved on the html element,
  // and follow OS-level changes until the user picks a theme explicitly.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {
        /* storage unavailable: treat as no stored preference */
      }
      if (stored) return; // an explicit choice always wins
      const next: Theme = event.matches ? "dark" : "light";
      setTheme(next);
      applyTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    playPop(next === "light");

    const commitTheme = () => {
      setTheme(next);
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        // ignore storage failures (private mode, etc.)
      }
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!doc.startViewTransition || prefersReducedMotion) {
      commitTheme();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      commitTheme();
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 450,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        /* ignore aborted view transition */
      });
  };

  const label =
    theme === "dark" ? ui.controls.switchToLight : ui.controls.switchToDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-sm2 border border-line text-muted transition-colors hover:border-blue-strong hover:text-blue-strong dark:border-white/15 dark:text-white/70 dark:hover:border-orange dark:hover:text-orange"
    >
      {/* Render both and toggle with CSS so there's no icon flash before hydration */}
      <SunIcon className="hidden h-[18px] w-[18px] dark:block" />
      <MoonIcon className="h-[18px] w-[18px] dark:hidden" />
    </button>
  );
}
