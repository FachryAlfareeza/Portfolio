import { Timeline } from "./Timeline";
import type { TimelineEntry } from "@/content";

export function Credentials({
  education,
  training,
  awards,
}: {
  education: TimelineEntry[];
  training: string[];
  awards: string[];
}) {
  return (
    <>
      <div className="mb-6 flex items-end justify-between gap-[30px]">
        <h2 className="text-[31px] tracking-tighter2">Education &amp; recognition</h2>
      </div>

      <Timeline items={education} />

      <div className="mt-9 grid grid-cols-2 gap-9 max-[600px]:grid-cols-1">
        <CredentialList title="Training" items={training} />
        <CredentialList title="Awards" items={awards} />
      </div>
    </>
  );
}

function CredentialList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-line pt-[15px] dark:border-white/10">
      <h3 className="mb-[10px] text-[13px]">{title}</h3>
      <ul className="m-0 list-none p-0">
        {items.map((item) => (
          <li
            key={item}
            className="border-b border-line py-2 text-[12px] leading-[1.55] text-muted dark:border-white/10 dark:text-white/60"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
