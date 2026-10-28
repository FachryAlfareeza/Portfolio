"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { NAV_LINKS, useActiveSection } from "./nav";

// Mobile menu (<=600px). The desktop nav is hidden at this width, so without
// this component small screens would have no navigation at all.
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape (returning focus to the button) and on outside press.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const linkClass =
    "flex min-h-[48px] items-center border-b border-line px-1 text-[15px] font-bold transition-colors dark:border-night-line";

  return (
    <div className="hidden max-[600px]:block">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-sm2 border border-line text-muted transition-colors hover:border-blue-strong hover:text-blue-strong dark:border-white/15 dark:text-white/70 dark:hover:border-orange dark:hover:text-orange"
      >
        {open ? <CloseIcon className="h-[18px] w-[18px]" /> : <MenuIcon className="h-[18px] w-[18px]" />}
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        // `inert` removes the closed panel from the tab order and a11y tree.
        inert={!open}
        className={`absolute inset-x-0 top-full border-b border-line bg-paper px-[18px] pb-3 shadow-lg transition-[opacity,transform,visibility] duration-200 dark:border-night-line dark:bg-night-900 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              aria-current={active === link.id ? "location" : undefined}
              className={`${linkClass} ${
                active === link.id
                  ? "text-blue-strong dark:text-orange"
                  : "text-ink dark:text-[#F4EFEA]"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`${linkClass} border-b-0 text-blue-strong dark:text-orange`}
          >
            Get in touch
          </a>
        </nav>
      </div>
    </div>
  );
}
