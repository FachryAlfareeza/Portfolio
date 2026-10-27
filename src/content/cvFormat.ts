import type { Project, TimelineEntry } from "./types";

export type CopyFormat = "prose" | "markdown" | "bullet";

// Pure formatters that turn structured content into copy-paste-ready plain text.
// Kept free of React so they are easy to reason about and reuse.

function projectLinks(project: Project): string[] {
  const links: string[] = [];
  if (project.repo) links.push(`Repo: ${project.repo}`);
  if (project.demo) links.push(`Demo: ${project.demo}`);
  return links;
}

export function formatProject(project: Project, format: CopyFormat): string {
  const tech = project.tech.join(", ");
  const links = projectLinks(project);

  switch (format) {
    case "markdown": {
      const lines = [`**${project.name}** — ${project.track}`, "", project.description];
      lines.push("", `_Tech:_ ${tech}`);
      for (const link of links) lines.push(link);
      return lines.join("\n");
    }
    case "bullet": {
      // One tight resume bullet.
      const linkText = links.length ? ` (${links.join("; ")})` : "";
      return `- ${project.name} (${project.track}): ${project.description} Tech: ${tech}.${linkText}`;
    }
    case "prose":
    default: {
      const parts = [`${project.name} — ${project.track}.`, project.description, `Tech: ${tech}.`];
      if (links.length) parts.push(links.join(" "));
      return parts.join(" ");
    }
  }
}

export function formatTimelineEntry(entry: TimelineEntry, format: CopyFormat): string {
  switch (format) {
    case "markdown":
      return [
        `**${entry.title}** — ${entry.organization}`,
        `_${entry.date}_`,
        "",
        entry.description,
      ].join("\n");
    case "bullet":
      return `- ${entry.title}, ${entry.organization} (${entry.date}): ${entry.description}`;
    case "prose":
    default:
      return `${entry.title} — ${entry.organization} (${entry.date}). ${entry.description}`;
  }
}

export function formatSimpleItem(item: string, format: CopyFormat): string {
  return format === "bullet" || format === "markdown" ? `- ${item}` : item;
}

export function formatProjectList(projects: Project[], format: CopyFormat): string {
  const sep = format === "prose" ? "\n\n" : "\n\n";
  return projects.map((p) => formatProject(p, format)).join(sep);
}

export function formatTimelineList(entries: TimelineEntry[], format: CopyFormat): string {
  return entries.map((e) => formatTimelineEntry(e, format)).join("\n\n");
}

export function formatSimpleList(items: string[], format: CopyFormat): string {
  return items.map((i) => formatSimpleItem(i, format)).join("\n");
}
