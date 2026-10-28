"use client";

import { NAV_LINKS, useActiveSection } from "./nav";

// Desktop primary navigation with scroll-spy highlight and animated underline.
export function NavLinks() {
  const active = useActiveSection();

  return (
    <nav
      aria-label="Primary"
      className="ml-auto mr-10 flex gap-[34px] max-[800px]:mr-5 max-[800px]:gap-[18px] max-[600px]:hidden"
    >
      {NAV_LINKS.map((link) => {
        const isActive = active === link.id;
        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            aria-current={isActive ? "location" : undefined}
            className={`relative py-2 text-[12px] font-bold tracking-[0.02em] transition-colors after:absolute after:inset-x-0 after:bottom-0.5 after:h-[2px] after:origin-left after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
              isActive
                ? "text-blue-strong after:scale-x-100 dark:text-orange"
                : "text-muted after:scale-x-0 hover:text-blue-strong dark:text-white/60 dark:hover:text-orange"
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
