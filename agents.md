# Project Steering — Portfolio app (Next.js + Tailwind)

This document is read by local AI agents working on this portfolio project. It is committed alongside `.kiro/` so any agent cloning this repo can reproduce the same constraints; keep the two in sync with the project itself.

## Source of truth

- **Content**: `src/content/data.json` (single source of truth; `legacy/data.json` is the old static site's copy and is not kept in sync). Types in `src/content/types.ts`. UI strings and the Indonesian translation live in `src/content/i18n.ts`. No CMS, no database.
- **GitHub activity**: `src/content/github-contributions.json` is a snapshot written by `npm run sync:github` (`scripts/sync-github.mjs`). With `GITHUB_TOKEN` in `.env.local` it also counts private-repo contributions. Re-run it to refresh the heatmap; never hand-edit the file.
- **Brand**: colors in `tailwind.config.ts` tokens (`paper`, `ink`, `blue`, `blue-strong`, `orange`, etc.). Assets used by the site live in `public/brand/` (`logomark.svg`, `pattern-eja.svg`) and `src/app/icon.svg`. Hero portraits are `public/assets/Me-2.webp` (light) and `Me-1.webp` (dark), set via `profile.photo` in `data.json`; `public/brand/profile-placeholder*.svg` are unused fallbacks. Source brand kit is git-ignored under `context/`.
- **UI components**: everything under `src/components/`. Client components use `"use client"` and never add runtime deps. All interactive widgets respect `prefers-reduced-motion`.
- **Steering files**: `agents.md` (this file), `.kiro/steering.json` (status), `.kiro/steering/product.md` and `tech.md` (product and tech notes).

## Rules

1. No new runtime dependencies. Every interactive widget must be zero-dep: `feedback.ts` synth audio + haptics, `Reveal.tsx` IntersectionObserver, custom scroll-spy.
2. Fonts are Google Fonts via `next/font`: `Manrope` (sans, headings and body) and `DM Mono` (mono). Keep only these two families. The brand font (Visby) is not used and its local files have been removed.
3. Content lives in one JSON file; formatting (i18n, `aboutLong`, GitHub contributions) is type-checked via `tsc --noEmit` on every build.
4. `/llms.txt` is a force-static route served from `src/app/llms.txt/route.ts`; it is generated from `data.json` and must not drift from it.
5. Brand assets used by the site are committed in `public/brand/` and `src/app/icon.svg`. Do NOT move the brand kit into tracked directories; it belongs in `context/` (git-ignored) and is copied as needed.
6. The contact form posts to `src/app/api/contact/route.ts` (Resend). Keys go in `.env.local` (git-ignored): `RESEND_API_KEY` for the form, `GITHUB_TOKEN` for `npm run sync:github`. Honeypot field named `company`, visually hidden off the tab order, tabIndex `-1`.
7. Sections have ids defined in `src/components/nav.ts`; navigation scrolls to them, section labels follow i18n keys, screen readers get `aria-current="location"`.
8. Before any push: run `npx tsc --noEmit`, then `npm run build`. Lint passes by default.
9. Before pushing code, first commit locally to `main`, then `git push origin main` (or the dev branch `nextjs-migration`). Deploy URL comes from Vercel's connected repo. Keep `main` and `nextjs-migration` in step: never commit different work to each, or they diverge and need a merge.
10. This is not a WCAG conformance claim. Full validation needs manual testing with assistive technology. Don't claim WCAG.

## Pending features (agent backlog)

- [x] **Scroll-responsive nav** — done in `Header.tsx`: single passive scroll listener, header slides up on scroll down past 700px and returns on scroll up.
- [ ] **Marquee skills display** — replace the static skills grid with horizontally scrolling tech badges using CSS `@keyframes marquee`. No JS animation lib; keyboard pause on hover. Follow `skills.heading` copy.
- [ ] **About section redesign** — large portrait, decorative background text, achievement cards. Per the reference site `kuchikamizake.me`.
- [ ] **Hero text reveals** — staggered reveal with blinking cursor effect.
- [ ] **Background pointer-responsive effects** — mesh gradient following cursor; glassmorphism cards.

## Commits style

Single-feature commits, one logical change per message. Conventional commits (`feat:`, `chore:`, `fix:`, `refactor:`). After any large change, update `agents.md` and push twice (one update before the feature, one update after).
