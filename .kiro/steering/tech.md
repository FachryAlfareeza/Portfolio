# Tech & Conventions

## Stack

- **Next.js 15** (App Router) with **React 19** and **TypeScript** (`strict: true`).
- **Tailwind CSS 3** for styling, class-based dark mode.
- **Resend** for contact-form email.
- Fonts: **Manrope** (sans) and **DM Mono** (mono), loaded via `next/font`.

Next.js is pinned to the `15.x` patched line (not 16) to avoid a breaking major. Remaining `npm audit` warnings are dev-only build-tooling (postcss) issues, not a runtime risk.

## Commands

```powershell
npm install           # install deps
npm run dev           # dev server at http://localhost:3000
npm run build         # production build (also type-checks and lints)
npm run start         # serve the production build (restart after each rebuild)
npm run lint          # lint (`next lint`; deprecated in Next 16, fine on 15)
npx tsc --noEmit      # type-check only
npm run sync:github   # refresh src/content/github-contributions.json (reads GITHUB_TOKEN from .env.local)
```

Run `npm run build` to verify a change compiles and type-checks. Do not leave `npm run dev` running as a blocking command.

## Project structure

```
src/
  app/
    layout.tsx            # root layout, fonts, metadata, no-flash theme script
    page.tsx              # page composition
    globals.css           # Tailwind layers, base resets, focus rings
    icon.svg              # favicon (Eja logomark)
    not-found.tsx         # 404 page
    robots.ts             # robots.txt (blocks /cv and /api/)
    llms.txt/route.ts     # force-static plain-text summary generated from data.json
    cv/page.tsx           # unlisted CV working copy
    api/contact/route.ts  # contact form handler (Resend)
  components/             # header, sections, nav, motion widgets, /cv tooling, icons
    nav.ts                # section ids (shared between NavLinks and scroll-spy)
    Header.tsx            # sticky header; hides on scroll down past 700px
    HeroPortrait.tsx      # morphing blob + portrait: pointer-follow, drift, scroll spin
    LanguageProvider.tsx  # EN/ID context (localStorage key `locale`)
    LanguageToggle.tsx    # EN/ID switch
    SoundToggle.tsx       # mutes UI sounds (localStorage key `sound-muted`)
    SkipLink.tsx          # translated "skip to content" link
    GitHubActivity.tsx    # contributions heatmap from the JSON snapshot
    NavLinks.tsx          # desktop nav with scroll-spy
    MobileNav.tsx         # mobile hamburger menu
    BackToTop.tsx         # back-to-top button
    ScrollProgress.tsx    # scroll progress bar
    LocalTime.tsx         # live local time in the hero
    CopyButton.tsx        # "copy email" button
    CvView.tsx            # /cv page rendering and format switcher
    Reveal.tsx            # scroll-reveal (IntersectionObserver)
    ThemeToggle.tsx       # light/dark toggle
    icons.tsx             # all SVG icons as components
    ...                   # About, Contact, ContactForm, Credentials, Footer, Header,
                          # Hero, Projects, Section, SectionLabel, Skills, Timeline
  content/
    data.json             # all page content (source of truth)
    types.ts              # content types
    index.ts              # typed loader
    cvFormat.ts           # copy formatters for /cv and /llms.txt
    i18n.ts               # UI strings (EN/ID) and Indonesian content overrides
    github-contributions.json  # heatmap snapshot (generated, don't hand-edit)
  lib/
    feedback.ts           # synth click sounds + haptics (zero-dep)
scripts/
  sync-github.mjs         # writes github-contributions.json
public/
  assets/                 # CV PDF, brand guidelines PDF, hero portraits (Me-1/Me-2.webp)
  brand/                  # logomark.svg, pattern-eja.svg, unused profile placeholder SVGs
legacy/                   # original static site, kept for reference
```

- Import alias: `@/*` maps to `./src/*`.
- `legacy/` is reference only — excluded from TypeScript and not part of the app.
- `context/` is git-ignored. `agents.md` and `.kiro/` are committed.

## Design tokens

Defined in `tailwind.config.ts`. Use token names, not raw hex. Light mode is blue-on-white; dark mode is orange-on-near-black.

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#FDFDFD` | light background |
| `ink` | `#0F1C2E` | light text |
| `blue` | `#89CFF0` | brand blue (decorative) |
| `blue-strong` | `#2176AE` | links and buttons |
| `blue-deep` | `#18567F` | hover and panels |
| `orange` | `#F4A261` | dark-mode accent |
| `orange-strong` | `#E07B39` | dark-mode hover |
| `night-900` | `#0A0A0B` | dark background |
| `night-800` | `#161618` | dark cards |
| `night-700` | `#201E1C` | dark hero card |

## Conventions

- Prefer React Server Components for anything that shows no translated copy and has no interactivity (`Container`, `Section`, `icons`, `page.tsx`). Components that render UI strings need `useLanguage()` and so are client components; that is why most of `src/components/` is `"use client"`. Pages are still statically prerendered.
- Dark mode is class-based. A no-flash inline script in `layout.tsx` applies the stored theme (`localStorage` key `theme`) before paint; the OS preference is followed until the user picks a theme.
- Keyboard focus uses a visible 2 px ring — blue on light, orange on dark and the contact panel.
- Minimum font size is 12 px everywhere.
- All interactive widgets (scroll-reveal, hero portrait drift/scroll animation, project filter stagger, header hide, UI sounds/haptics) respect `prefers-reduced-motion`. `globals.css` also disables all transitions and animations under it.
- Icons are inlined as components in `src/components/icons.tsx` (Lucide for UI glyphs, Simple Icons for brand marks) — add new icons there rather than pulling a package.
- Section ids are centralised in `src/components/nav.ts`; reference that file rather than hardcoding strings in components.
- Scroll reveal (`Reveal.tsx`): content is in the server HTML so the page works without JS. Below-the-fold blocks are hidden just before first paint and faded in by `IntersectionObserver`.

## Contact form & environment

The form (`src/components/ContactForm.tsx`) posts to `src/app/api/contact/route.ts`, which validates input and sends mail via Resend. A `company` honeypot field is accepted silently (returns 200, sends nothing) to defeat bots. The form has inline validation, a character counter, request timeout, and a mailto fallback when sending fails.

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Missing → API returns 503 and no mail is sent. |
| `CONTACT_TO_EMAIL` | no | Delivery address. Defaults to `profile.email` in `data.json`. |
| `CONTACT_FROM_EMAIL` | no | Must be a verified Resend sender. Defaults to `onboarding@resend.dev`. |
| `GITHUB_TOKEN` | no | Only for `npm run sync:github`. Lets the heatmap include private-repo contributions (classic: `repo` scope; fine-grained: Contents + Metadata read). Not needed at runtime. |

Local: put these in `.env.local` (git-ignored; all `.env*` files are ignored except a future `.env.example`). Production: set them in the Vercel dashboard.

## Windows / PowerShell notes

- Git writes progress to stderr, so `git push`/`commit` through PowerShell may surface a `NativeCommandError` even on success — verify with `git status -sb` / `git log`.
- Use PowerShell command syntax (`;` to chain, `$env:NAME` for env vars), not cmd syntax.
