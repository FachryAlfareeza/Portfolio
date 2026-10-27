import type { SkillGroup } from "@/content";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <>
      <div className="mb-6 flex items-end justify-between gap-[30px]">
        <h2 className="text-[31px] tracking-tighter2">Toolbox</h2>
      </div>
      <div className="grid grid-cols-2 border-t border-line dark:border-white/10 max-[600px]:grid-cols-1">
        {groups.map((group, i) => (
          <div
            key={group.name}
            className={`border-b border-line py-5 pr-6 dark:border-white/10 ${
              i % 2 === 1
                ? "border-l pl-[25px] max-[600px]:border-l-0 max-[600px]:pl-0"
                : ""
            }`}
          >
            <h3 className="mb-[10px] text-[13px]">{group.name}</h3>
            <div className="flex flex-wrap gap-[7px]">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xs bg-panel px-2 py-1 text-[11px] text-[#44556a] dark:bg-white/10 dark:text-white/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
