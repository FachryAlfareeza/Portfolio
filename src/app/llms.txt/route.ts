import { portfolio } from "@/content";
import {
  formatProjectList,
  formatSimpleList,
  formatTimelineList,
} from "@/content/cvFormat";

export const dynamic = "force-static";

export function GET() {
  const {
    profile,
    social,
    skillGroups,
    projects,
    experience,
    education,
    training,
    awards,
  } = portfolio;

  const sections: string[] = [
    `# ${profile.name}`,
    "",
    `> ${profile.headline} ${profile.tagline}`,
    "",
    `- **Location:** ${profile.location} (${profile.timezone})`,
    `- **Availability:** ${profile.availability}`,
    `- **Email:** ${profile.email}`,
    ...social.map((s) => `- **${s.label}:** ${s.url}`),
    `- **CV (PDF):** /assets/Fachry-Alfareeza-ATS-CV.pdf`,
    "",
    "## Summary",
    "",
    profile.about,
    "",
    ...(profile.aboutLong?.length
      ? ["## Background & Story", "", ...profile.aboutLong.flatMap((p) => [p, ""])]
      : []),
    "## Skills",
    "",
    ...skillGroups.map((g) => `- **${g.name}:** ${g.items.join(", ")}`),
    "",
    "## Selected Projects",
    "",
    formatProjectList(projects, "markdown"),
    "",
    "## Experience",
    "",
    formatTimelineList(experience, "markdown"),
    "",
    "## Education",
    "",
    formatTimelineList(education, "markdown"),
    "",
    "## Training & Certifications",
    "",
    formatSimpleList(training, "markdown"),
    "",
    "## Honors & Awards",
    "",
    formatSimpleList(awards, "markdown"),
    "",
  ];

  return new Response(sections.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
