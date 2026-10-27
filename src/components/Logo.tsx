import type { CSSProperties } from "react";

// Path to the swappable logomark asset. Overwrite the file at this path to
// change the mark; no code change needed. Kept as a constant so there's a
// single place to repoint it if the filename ever changes.
const LOGOMARK_SRC = "/brand/logomark.svg";

export function Logo({ showWordmark = true }: { showWordmark?: boolean }) {
  return (
    <a
      href="#top"
      aria-label="Home"
      className="group inline-flex items-center gap-2 transition-colors"
    >
      <span
        aria-hidden="true"
        className="brand-logomark h-7 w-7 text-blue-strong transition-colors dark:text-orange"
        style={{ "--logomark-src": `url(${LOGOMARK_SRC})` } as CSSProperties}
      />
      {showWordmark && (
        <span className="text-xl font-extrabold tracking-[-0.07em] text-ink transition-colors group-hover:text-blue-strong dark:text-[#F4EFEA] dark:group-hover:text-orange">
          FachryAlfareeza<span className="text-blue-strong dark:text-orange">.</span>
        </span>
      )}
    </a>
  );
}
