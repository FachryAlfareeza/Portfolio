# Muhammad Fachry Alfareeza — Portfolio

A single-page portfolio for software engineering, data analysis, and applied AI work, in English and Indonesian. Built with Next.js (App Router) and Tailwind CSS, with every page statically prerendered. Deployed on Vercel.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS 3**, with design tokens from the Eja brand palette
- **Resend** for the contact form email
- Content lives in one typed JSON file: no CMS, no database

## Run locally

```powershell
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

- `npm run build`: production build (also type-checks and lints)
- `npm run start`: serve the production build locally (restart it after each rebuild)
- `npm run lint`: lint
- `npx tsc --noEmit`: type-check only
- `npm run sync:github`: refresh the GitHub contributions heatmap (see below)

## Update content

All page content comes from `src/content/data.json`: profile, social links, grouped skills, projects, experience, education, training, and awards. Types live in `src/content/types.ts`, so edits are type-checked on build.

Both languages live in that one file. A text field is either a plain string, when it reads the same in English and Indonesian (names, URLs, tech stacks), or an object with one value per language:

```json
"description": {
  "en": "Scores small-business micro-loans from daily cash flow.",
  "id": "Menilai kelayakan kredit mikro UMKM dari arus kas harian."
}
```

If `id` is missing, the English text is shown. Adding a project, job or award is one edit, in one place. `src/content/index.ts` resolves the fields per language; `/cv`, `/llms.txt` and the share image use English.

`src/content/i18n.ts` holds only the interface text (nav labels, buttons, screen-reader labels), in both languages.

The About section shows a GitHub contributions heatmap from `src/content/github-contributions.json`. Don't edit that file by hand: run `npm run sync:github` to regenerate it. With a `GITHUB_TOKEN` in `.env.local` (classic token with `repo` scope, or fine-grained with Contents + Metadata read) the count includes private repos; without one it uses public contributions only.

`/llms.txt` serves a plain-text summary of the same content for LLM crawlers.

Notes:

- `profile.headline` is the short hero title; `profile.tagline` is the sentence under it.
- `profile.timezone` is an IANA name (for example `Asia/Jakarta`) and drives the live local time in the hero.
- Project entries: lead with what the project does, then a short format label if it's a prototype or mockup. Keep technical specifics concrete. `featured: true` highlights a card; `repo` and `demo` are optional links.

Replace `public/assets/Fachry-Alfareeza-ATS-CV.pdf` whenever the downloadable CV changes. The "Download CV" buttons link to this path.

## CV working copy (`/cv`)

`/cv` is a private page for pasting content into CVs and portfolio PDFs. It renders the same `data.json` as the site, so the two never drift. Pick Prose, Markdown, or Bullet, then copy a single item or a whole section. The page is not linked from the site, is marked `noindex`, and is disallowed in `robots.txt`. The "Download CV" buttons still point at the real PDF above.

## Brand and swappable assets

Light mode is blue on white; dark mode is orange on near-black. Colors are Tailwind tokens in `tailwind.config.ts`:

| Token | Value | Use |
| --- | --- | --- |
| `paper` / `ink` | `#FDFDFD` / `#0F1C2E` | light background / text |
| `blue` / `blue-strong` / `blue-deep` | `#89CFF0` / `#2176AE` / `#18567F` | brand blue (decorative) / links and buttons / hover and panels |
| `orange` / `orange-strong` | `#F4A261` / `#E07B39` | dark-mode accent / hover |
| `night-900` / `800` / `700` | `#0A0A0B` / `#161618` / `#201E1C` | dark background / cards / hero card |

Brand assets:

- `public/brand/logomark.svg`: the Eja ambigram logomark, used in the header and over the hero blob. It is drawn through a CSS mask, so keep it a single solid shape; the color follows the theme.
- `src/app/icon.svg`: the default favicon (follows the OS color scheme). Once the page loads, `ThemeToggle.tsx` swaps it for `public/brand/icon-light.svg` or `icon-dark.svg` so the tab icon matches the theme picked on the site. If the mark changes, update all three.
- Hero portraits: `public/assets/Me-2.webp` (light) and `Me-1.webp` (dark), set by `profile.photo.src` and `profile.photo.srcDark` in `data.json`. Use transparent cutouts (PNG or WebP, 4:5, subject anchored to the bottom edge, same framing in both). `srcDark` and `splitDark` are optional; without `srcDark` the light photo is used in both modes. The head pops out of a morphing blob; tune `profile.photo.split` (0-100, percent from the top) so the cut sits just above the shoulders. The blob drifts, follows the pointer on hover, and spins faster as you scroll (`HeroPortrait.tsx`); all of it stops under `prefers-reduced-motion`. `public/brand/profile-placeholder*.svg` are unused leftovers.

The source brand kit (logos, patterns, font) is kept locally in `context/` and is git-ignored.

## Interactions and accessibility

Everything below is dependency-free and respects `prefers-reduced-motion`.

- **Scroll reveal** (`Reveal.tsx`): content is visible in the server HTML, so the page works without JavaScript. Below-the-fold blocks are hidden just before first paint and faded in by an `IntersectionObserver`.
- **Navigation**: scroll-spy highlights the current section (`NavLinks.tsx`, `nav.ts`); a mobile menu (`MobileNav.tsx`) replaces the desktop links under 600px. Section ids live in `nav.ts`. The header slides away when you scroll down past 700px and comes back when you scroll up.
- **Language**: English/Indonesian toggle in the header; your choice is stored in `localStorage`.
- **Sound**: subtle synthesized click sounds and haptics (`src/lib/feedback.ts`), with a mute toggle.
- **Scroll progress bar** and a **back-to-top button** that returns keyboard focus to the page start.
- **Live local time** in the hero.
- **Project filter** replays a staggered card animation and announces results to screen readers.
- **Contact form**: inline validation, character counter, request timeout, and a mailto fallback when sending fails. "Copy email" sits next to the email button.
- **Command menu**: Ctrl+K (⌘K on Mac), or the header button on wide screens. Jump to a section, switch theme, language or sound, copy the email, or open the CV and social links.
- **Award highlights**: the awards listed in `featuredAwards` (positions in `awards`, in `data.json`) show as cards in About.
- **Link previews**: `opengraph-image.tsx` renders the share card from `data.json`; `sitemap.ts` and `robots.ts` point crawlers at the home page. Set `NEXT_PUBLIC_SITE_URL` once there is a custom domain; on Vercel the production domain is used automatically.
- **Theme**: follows the OS until you pick a theme with the toggle; your choice is stored in `localStorage`.
- **Keyboard focus** uses a visible 2px ring (blue on light, orange on dark and on the contact panel).
- **Minimum font size** is 12px everywhere.
- **Site files**: `not-found.tsx` (branded 404) and `robots.ts` (blocks `/cv` and `/api/`).

This is not a WCAG conformance claim. Full validation needs manual testing with assistive technology.

## Project structure

```
src/
  app/
    layout.tsx            # root layout, fonts, metadata, no-flash theme script
    page.tsx              # page composition
    globals.css           # Tailwind layers, base resets, focus rings
    icon.svg              # favicon (placeholder)
    not-found.tsx         # 404 page
    robots.ts             # robots.txt
    sitemap.ts            # sitemap.xml
    opengraph-image.tsx   # social share card
    llms.txt/route.ts     # plain-text content summary
    cv/page.tsx           # unlisted CV working copy
    api/contact/route.ts  # contact form handler (Resend)
  components/             # header, sections, nav, motion widgets, /cv tooling, icons
  content/
    data.json             # all page content
    types.ts              # content types
    index.ts              # typed loader
    cvFormat.ts           # copy formatters used by /cv and /llms.txt
    i18n.ts               # interface strings (EN/ID)
    github-contributions.json  # heatmap snapshot (generated)
  lib/feedback.ts         # UI sounds and haptics
scripts/sync-github.mjs   # regenerates the heatmap snapshot
public/
  assets/                 # CV PDF, brand guidelines PDF, hero portraits
  brand/                  # logomark, background pattern
legacy/                   # the original static site, kept for reference
```

`context/` (brand kit) is git-ignored.

## Contact form

The form posts to `src/app/api/contact/route.ts`, which validates input (with a honeypot field for spam) and sends mail through Resend. It needs these environment variables:

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | From the [Resend dashboard](https://resend.com). Without it the API returns 503 and no mail is sent. |
| `CONTACT_TO_EMAIL` | no | Where messages are delivered. Defaults to the profile email in `data.json`. |
| `CONTACT_FROM_EMAIL` | no | Must be a verified sender/domain in Resend. Defaults to Resend's shared `onboarding@resend.dev`. |

For local testing, put them in `.env.local`. All `.env*` files are git-ignored except a future `.env.example`.

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=you@example.com
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, import the repo. Leave **Framework Preset** on **Next.js**, **Root Directory** at the repo root, and **Output Directory** empty.
3. Under **Settings → Environment Variables**, add `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`).
4. Deploy. Every push to the connected branch triggers a new deployment, with preview URLs for other branches.

Branches: both `main` and `nextjs-migration` hold the Next.js app (the old static site is under `legacy/`). Set Vercel's Production Branch (**Settings → Git**) to the branch you want live. Changing it does not rebuild, so redeploy afterwards.

Troubleshooting: if a deployment shows **Ready** but its own URL returns a 404, check that Framework Preset is Next.js and that no Output Directory or wrong Root Directory is set.

## Design and writing toolkit

The design polish and the human-sounding copy were shaped with these agent skills. They are optional tooling for future edits. Install them in your own agent (Claude Code, Codex, Cursor, etc.) as needed:

- [make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better): interface micro-details (hover states, optical alignment, hit areas)
  - `npx skills add jakubkrehel/make-interfaces-feel-better`
- [better-icons](https://github.com/better-auth/better-icons): search and retrieve icons from 150+ collections
  - `npx skills add better-auth/better-icons`
- [humanizer](https://github.com/blader/humanizer): removes signs of AI-generated writing
  - `npx skills add blader/humanizer --global --agent '*'`
- [no-ai-slop](https://github.com/petergyang/no-ai-slop): removes 20+ AI-slop writing patterns
  - `npx skills add petergyang/no-ai-slop --skill no-ai-slop --global --yes`
- [anti-ai-slop-writing](https://github.com/jalaalrd/anti-ai-slop-writing): eliminates detectable AI writing patterns
  - copy `SKILL.md` into your agent's skills directory
- [superdesign](https://github.com/superdesigndev/superdesign): AI design agent for exploring UI mockups

> The icon set in `src/components/icons.tsx` was sourced following better-icons conventions (Lucide for UI glyphs, Simple Icons for brand marks) and inlined as components to avoid a runtime dependency.
