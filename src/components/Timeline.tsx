import type { TimelineEntry } from "@/content";

export function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <div className="border-t border-line dark:border-white/10">
      {items.map((item) => (
        <article
          key={`${item.title}-${item.date}`}
          className="grid grid-cols-[170px_1fr] gap-6 border-b border-line py-[22px] dark:border-white/10 max-[600px]:grid-cols-1 max-[600px]:gap-[5px] max-[600px]:py-[18px]"
        >
          <div className="pt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-muted dark:text-white/50 max-[600px]:pt-0">
            {item.date}
          </div>
          <div>
            <h3 className="mb-1 text-[15px] leading-[1.35]">{item.title}</h3>
            <div className="mb-2 text-[12px] font-bold text-blue-strong dark:text-orange">
              {item.organization}
            </div>
            <p className="max-w-[640px] text-[12px] text-muted dark:text-white/60">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
