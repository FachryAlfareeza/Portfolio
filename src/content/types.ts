export type SocialIcon = "github" | "linkedin" | "email";

export interface Profile {
  name: string;
  /** Short, punchy hero headline. */
  headline: string;
  /** Supporting sentence shown under the headline. */
  tagline: string;
  availability: string;
  location: string;
  /** IANA timezone (e.g. "Asia/Jakarta") used for the live local time in the hero. */
  timezone: string;
  about: string;
  email: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: SocialIcon;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface Project {
  name: string;
  track: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
  featured?: boolean;
}

export interface TimelineEntry {
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface PortfolioData {
  profile: Profile;
  social: SocialLink[];
  skillGroups: SkillGroup[];
  projects: Project[];
  experience: TimelineEntry[];
  education: TimelineEntry[];
  training: string[];
  awards: string[];
}
