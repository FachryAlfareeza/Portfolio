// Numbered section label, e.g. "01 About" — matches legacy .section-label.
export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="pt-[10px] font-mono text-micro uppercase text-muted dark:text-white/50">
      <span className="pr-3 text-blue-strong dark:text-orange">{index}</span>
      {children}
    </p>
  );
}
