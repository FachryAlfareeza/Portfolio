# Muhammad Fachry Alfareeza — Portfolio

A single-page portfolio for software engineering, data analysis, and applied AI work. Built with Next.js (App Router) and Tailwind CSS, rendered mostly as React Server Components so it ships little client JavaScript. Deployed on Vercel.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS** for styling, with the design tokens ported from the original hand-written CSS
- **Resend** for the contact form email
- Content lives in one typed JSON file — no CMS, no database

## Run locally

```powershell
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

- `npm run build` — production build
- `npm run start` — serve the production build locally
- `npm run lint` — type-check and lint

## Update content

All page content comes from `src/content/data.json`: profile, social links, grouped skills, projects, experience, education, training, and awards. Types live in `src/content/types.ts`, so edits are type-checked on build.

Guidelines for project entries:

- Lead with what the project does, then a short format label if it's a prototype or mockup.
- Keep technical specifics (libraries, techniques) concrete.
- `featured: true` highlights a card; `repo` and `demo` are optional links.

Replace `public/assets/Fachry-Alfareeza-ATS-CV.pdf` whenever the downloadable CV changes. The "Download CV" buttons link to this path.

## Project structure

```
src/
  app/
    layout.tsx          # root layout, fonts, no-flash theme script
    page.tsx            # page composition
    globals.css         # Tailwind layers + base resets
    api/contact/route.ts# contact form handler (Resend)
  components/           # Header, Hero, sections, Projects filter, ThemeToggle, etc.
  content/
    data.json           # all page content
    types.ts            # content types
    index.ts            # typed loader
public/assets/          # CV PDF
legacy/                 # the original static site, kept for reference
```

## Contact form

The form posts to `src/app/api/contact/route.ts`, which validates input (with a honeypot field for spam) and sends mail through Resend. It needs these environment variables:

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | From the [Resend dashboard](https://resend.com). Without it the API returns 503 and no mail is sent. |
| `CONTACT_TO_EMAIL` | no | Where messages are delivered. Defaults to the profile email in `data.json`. |
| `CONTACT_FROM_EMAIL` | no | Must be a verified sender/domain in Resend. Defaults to Resend's shared `onboarding@resend.dev`. |

For local testing, put them in `.env.local` (git-ignored):

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=you@example.com
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, import the repo. The framework is detected as Next.js — no build settings to change.
3. Under **Settings → Environment Variables**, add `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`).
4. Deploy. Every push to the connected branch triggers a new deployment, with preview URLs for other branches.

## Design and writing toolkit

The design polish and the human-sounding copy were shaped with these agent skills. They are optional tooling for future edits — install them in your own agent (Claude Code, Codex, Cursor, etc.) as needed:

- [make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better) — interface micro-details (hover states, optical alignment, hit areas)
  - `npx skills add jakubkrehel/make-interfaces-feel-better`
- [better-icons](https://github.com/better-auth/better-icons) — search and retrieve icons from 150+ collections
  - `npx skills add better-auth/better-icons`
- [humanizer](https://github.com/blader/humanizer) — removes signs of AI-generated writing
  - `npx skills add blader/humanizer --global --agent '*'`
- [no-ai-slop](https://github.com/petergyang/no-ai-slop) — removes 20+ AI-slop writing patterns
  - `npx skills add petergyang/no-ai-slop --skill no-ai-slop --global --yes`
- [anti-ai-slop-writing](https://github.com/jalaalrd/anti-ai-slop-writing) — eliminates detectable AI writing patterns
  - copy `SKILL.md` into your agent's skills directory
- [superdesign](https://github.com/superdesigndev/superdesign) — AI design agent for exploring UI mockups

> The icon set in `src/components/icons.tsx` was sourced following better-icons conventions (Lucide for UI glyphs, Simple Icons for brand marks) and inlined as components to avoid a runtime dependency.
