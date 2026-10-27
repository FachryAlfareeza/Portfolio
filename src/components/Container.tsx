import type { ReactNode } from "react";

// Matches legacy .container: width:min(1100px, calc(100% - 56px)); centered.
// On narrow screens the gutter tightens (handled via responsive padding).
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-[min(1100px,calc(100%-56px))] max-[600px]:w-[calc(100%-36px)] ${className}`}
    >
      {children}
    </div>
  );
}
