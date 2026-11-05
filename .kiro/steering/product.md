# Product

A single-page personal portfolio for **Muhammad Fachry Alfareeza**, covering software engineering, data analysis, and applied AI work.

- One page, several sections: hero, about (with a GitHub contributions heatmap), skills, projects (with a track filter), experience/education/training/awards timelines, and a contact form.
- Bilingual: English and Indonesian, switched with the header language toggle (choice stored in `localStorage` key `locale`).
- Deployed on Vercel. Both `main` and `nextjs-migration` hold the Next.js app (the old static site is kept under `legacy/` for reference). Set Vercel's Production Branch to the desired branch (**Settings → Git**) and redeploy.
- Every route except `/api/contact` is statically prerendered. Most components are client components because the language toggle swaps copy at runtime.
- `/llms.txt` serves a plain-text summary of the site content for LLM crawlers, generated from `data.json`.

## Content model

All page content is data-driven from a single typed JSON file. There is no CMS or database.

- `src/content/data.json` — the source of truth: profile, social links, grouped skills, projects, experience, education, training, awards.
- `src/content/types.ts` — the content types. Edits to `data.json` are type-checked on build.
- `src/content/index.ts` — the typed loader components import.
- `src/content/cvFormat.ts` — copy formatters used by the `/cv` page and `/llms.txt`.
- `src/content/i18n.ts` — UI strings in both languages plus the Indonesian content overrides.
- `src/content/github-contributions.json` — heatmap snapshot written by `npm run sync:github`; don't hand-edit.

Editing content means editing `data.json`, not the components.

### Key `profile` fields

- `headline` — short, punchy hero H1 (e.g. `"Software, data, and applied AI."`). Keep it short; do not promote `tagline` into it.
- `tagline` — a longer supporting sentence shown muted under the headline.
- `timezone` — IANA name (e.g. `"Asia/Jakarta"`), drives the live local time in the hero.
- `photo.src` / `photo.srcDark` — transparent cutout paths (PNG/WebP/SVG, 4:5, subject anchored to the bottom edge). `srcDark` is optional; falls back to `src`. Currently `/assets/Me-2.webp` (light) and `/assets/Me-1.webp` (dark).
- `photo.split` / `photo.splitDark` — 0–100, percent from the top where the portrait "pops out" of the morphing blob. Tune to sit just above the shoulders.

### Writing conventions for content

- Copy follows anti-AI-slop principles: lead with the outcome, cut rule-of-three filler, avoid article-first openers.
- Project entries: lead with what the project does, then an optional short format label (prototype/mockup). Keep technical specifics concrete. `featured: true` highlights a card; `repo` and `demo` are optional links.
- The downloadable CV lives at `public/assets/Fachry-Alfareeza-ATS-CV.pdf`; "Download CV" buttons link to this path. Replace that file to update the CV.

## Brand assets

- `public/brand/logomark.svg` — the Eja ambigram logomark, used in the header and over the hero blob. Drawn through a CSS mask; keep it a single solid shape (color follows the theme).
- `src/app/icon.svg` — favicon (same mark, blue in light mode and orange in dark).
- `public/brand/pattern-eja.svg` — background pattern, applied as a CSS mask.
- `public/assets/Fachry-Alfareeza-Brand-Guidelines.pdf` — linked from the logo menu.
- `public/brand/profile-placeholder.svg` / `profile-placeholder-dark.svg` — unused fallbacks from before the real portraits were added.

The source brand kit (logos, font) lives in `context/` locally and is git-ignored.

## `/cv` page

`/cv` is an unlisted working copy for pasting content into CVs and portfolio PDFs. It renders the same `data.json` as the site so the two never drift. Pick Prose, Markdown, or Bullet format and copy a single item or a whole section. The page is `noindex` and disallowed in `robots.txt`; it is not linked from the site.

## Deferred / out of scope

- AI "ask my CV" chatbot.
- Blog / writing section.
- Hero "focus card" (01 Software engineering, 02 Data & analytics, 03 Research) — removed from `Hero.tsx`; recover it from git history if a new home is picked.
