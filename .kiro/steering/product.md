# Product

A single-page personal portfolio for **Muhammad Fachry Alfareeza**, covering software engineering, data analysis, and applied AI work.

- One page, several sections: hero, about, skills, projects (with a track filter), experience/education/training/awards timelines, and a contact form.
- Deployed on Vercel. `main` still serves the legacy GitHub Pages site (`index.html`); migration work lives on a separate branch (`nextjs-migration`) until the Vercel cutover. Set Vercel's Production Branch to the desired branch (**Settings → Git**) and redeploy.
- Rendered mostly as React Server Components so it ships little client JavaScript.

## Content model

All page content is data-driven from a single typed JSON file. There is no CMS or database.

- `src/content/data.json` — the source of truth: profile, social links, grouped skills, projects, experience, education, training, awards.
- `src/content/types.ts` — the content types. Edits to `data.json` are type-checked on build.
- `src/content/index.ts` — the typed loader components import.
- `src/content/cvFormat.ts` — copy formatters used by the `/cv` page.

Editing content means editing `data.json`, not the components.

### Key `profile` fields

- `headline` — short, punchy hero H1 (e.g. `"Software, data, and applied AI."`). Keep it short; do not promote `tagline` into it.
- `tagline` — a longer supporting sentence shown muted under the headline.
- `timezone` — IANA name (e.g. `"Asia/Jakarta"`), drives the live local time in the hero.
- `photo.src` / `photo.srcDark` — transparent cutout paths (PNG/WebP/SVG, 4:5, subject anchored to the bottom edge). `srcDark` is optional; falls back to `src`. Point these at files in `public/brand/`.
- `photo.split` / `photo.splitDark` — 0–100, percent from the top where the portrait "pops out" of the morphing blob. Tune to sit just above the shoulders.

### Writing conventions for content

- Copy follows anti-AI-slop principles: lead with the outcome, cut rule-of-three filler, avoid article-first openers.
- Project entries: lead with what the project does, then an optional short format label (prototype/mockup). Keep technical specifics concrete. `featured: true` highlights a card; `repo` and `demo` are optional links.
- The downloadable CV lives at `public/assets/Fachry-Alfareeza-ATS-CV.pdf`; "Download CV" buttons link to this path. Replace that file to update the CV.

## Swappable brand assets (placeholders)

Two assets currently use placeholders and should be swapped for the real mark when ready:

- `public/brand/logomark.svg` — header logomark. Drawn through a CSS mask; use a single solid shape (color follows the theme).
- `src/app/icon.svg` — favicon.
- `public/brand/profile-placeholder.svg` / `profile-placeholder-dark.svg` — hero portraits. Drop in the real transparent cutouts and update `profile.photo.src` / `profile.photo.srcDark` in `data.json`.

The source brand kit (logos, font) lives in `context/` locally and is git-ignored.

## `/cv` page

`/cv` is an unlisted working copy for pasting content into CVs and portfolio PDFs. It renders the same `data.json` as the site so the two never drift. Pick Prose, Markdown, or Bullet format and copy a single item or a whole section. The page is `noindex` and disallowed in `robots.txt`; it is not linked from the site.

## Deferred / out of scope

- AI "ask my CV" chatbot.
- Blog / writing section.
- Hero "focus card" (01 Software engineering, 02 Data & analytics, 03 Research) — parked as a commented-out block in `Hero.tsx` until a new home is picked.
