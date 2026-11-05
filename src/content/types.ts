export type Locale = "en" | "id";

export type SocialIcon = "github" | "linkedin" | "email";

export interface ProfilePhoto {
  /** Public path to a transparent cutout (PNG/WebP/SVG), e.g. "/brand/profile.png". */
  src: string;
  /** Optional dark-mode cutout. Falls back to `src` when omitted. Keep the same 4:5 framing. */
  srcDark?: string;
  alt: string;
  /**
   * 0-100. Percent of the photo's height, measured from the top, above which
   * the cutout "pops out" of the blob. Below this line the photo is clipped to
   * the blob. Tune it to sit just above the shoulders.
   */
  split: number;
  /** Optional split for the dark-mode photo. Falls back to `split`. */
  splitDark?: number;
}

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
  /** Multi-paragraph narrative shown when the user selects "Full story" in the About section. */
  aboutLong?: string[];
  email: string;
  /** Hero portrait: transparent cutout shown in front of the morphing blob. */
  photo: ProfilePhoto;
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
  /** "Rank — Event Year", e.g. "Silver Medal — Hong Kong International Science Olympiads 2024". */
  awards: string[];
  /** Indexes into `awards` shown as highlight cards in About (order kept). */
  featuredAwards?: number[];
}
