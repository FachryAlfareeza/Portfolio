# Muhammad Fachry Alfareeza — Portfolio

A single-page portfolio for software engineering, data analysis, and applied AI work. Built with Next.js (App Router) and Tailwind CSS, rendered mostly as React Server Components so it ships little client JavaScript. Deployed on Vercel.

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

## Update content

All page content comes from `src/content/data.json`: profile, social links, grouped skills, projects, experience, education, training, and awards. Types live in `src/content/types.ts`, so edits are type-checked on build.

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

Two assets are placeholders to replace with the real mark:

- `public/brand/logomark.svg`: header logomark. It is drawn through a CSS mask, so use a single solid shape; the color follows the theme.
- `src/app/icon.svg`: the favicon.

The source brand kit (logos, patterns, font) is kept locally in `context/` and is git-ignored.

## Interactions and accessibility

Everything below is dependency-free and respects `prefers-reduced-motion`.

- **Scroll reveal** (`Reveal.tsx`): content is visible in the server HTML, so the page works without JavaScript. Below-the-fold blocks are hidden just before first paint and faded in by an `IntersectionObserver`.
- **Navigation**: scroll-spy highlights the current section (`NavLinks.tsx`, `nav.ts`); a mobile menu (`MobileNav.tsx`) replaces the desktop links under 600px. Section ids live in `nav.ts`.
- **Scroll progress bar** and a **back-to-top button** that returns keyboard focus to the page start.
- **Live local time** in the hero.
- **Project filter** replays a staggered card animation and announces results to screen readers.
- **Contact form**: inline validation, character counter, request timeout, and a mailto fallback when sending fails. "Copy email" sits next to the email button.
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
    cv/page.tsx           # unlisted CV working copy
    api/contact/route.ts  # contact form handler (Resend)
  components/             # header, sections, nav, motion widgets, /cv tooling, icons
  content/
    data.json             # all page content
    types.ts              # content types
    index.ts              # typed loader
    cvFormat.ts           # copy formatters used by /cv
public/
  assets/                 # downloadable CV PDF
  brand/logomark.svg      # header logomark (placeholder)
legacy/                   # the original static site, kept for reference
```

`.kiro/` (local agent notes) and `context/` (brand kit) are git-ignored.

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

Branches: the app lives on `nextjs-migration`; `main` still has the legacy GitHub Pages site. Set Vercel's Production Branch (**Settings → Git**) to the branch you want live. Changing it does not rebuild, so redeploy afterwards.

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
