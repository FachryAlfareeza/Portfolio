"use client";

import { useEffect, useState } from "react";

// Single source for primary navigation. `id` must match the section id.
export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Credentials" },
] as const;

// Sections observed for scroll-spy. "contact" is tracked so the nav clears
// its highlight once the user reaches the contact panel.
const OBSERVED = [...NAV_LINKS.map((l) => l.id), "contact"];

// Returns the id of the section crossing a thin band at the middle of the
// viewport, or null while in the hero/footer.
export function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = OBSERVED.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (els.length === 0) return;

    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        // Prefer the last section in document order that is in the band.
        const current = [...OBSERVED].reverse().find((id) => inBand.has(id)) ?? null;
        setActive(current);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
