# Project Steering — Portfolio app (Next.js + Tailwind)

This document is read by local AI agents working on this portfolio project. It is git-ignored; keep it in sync with `.kiro/` and the project itself so any agent cloning this repo can reproduce the same constraints.

## Source of truth

- **Content**: `src/content/data.json` (single source of truth, generated from `legacy/data.json` if ever drifted). Types in `src/content/types.ts`. No CMS, no database.
- **Brand**: colors in `tailwind.config.ts` tokens (`paper`, `ink`, `blue`, `blue-strong`, `orange`, etc.). Swappable assets live in `public/brand/` (`logomark.svg`, `pattern-eja.svg`, `profile-placeholder*.svg`) and `src/app/icon.svg`. Source brand kit is git-ignored under `context/`.
- **UI components**: everything under `src/components/`. All client components use `"use client"` and never add runtime deps. All interactive widgets respect `prefers-reduced-motion`.
- **Steering files**: `agents.md` (this file), `.kiro/` (per-session agent notes).

## Rules

1. No new runtime dependencies. Every interactive widget must be zero-dep: `feedback.ts` synth audio + haptics, `Reveal.tsx` IntersectionObserver, custom scroll-spy.
2. Fonts are swapped away from brand fonts (`--font-visby`) in favor of Google Fonts (`Manrope`, `DM Mono`) plus the original headings use `font-sans`. Keep only two Google font families. Drop local font files for brand fonts when no longer needed.
3. Content lives in one JSON file; formatting (i18n, `aboutLong`, GitHub contributions) is type-checked via `tsc --noEmit` on every build.
4. `/llms.txt` is a force-static route served from `src/app/llms.txt/route.ts`; it mirrors the site content and must not drift from `data.json`.
5. Brand assets used by the site are committed in `public/brand/` and `src/app/icon.svg`. Do NOT move brand kit into tracked directories; it belongs in `context/` (git-ignored) and is copied as needed.
6. The contact form posts to `src/app/api/contact/route.ts` (Resend). Test keys in `.env.local`. Honeypot field named `company`, visually hidden off the tab order, tabIndex `-1`.
7. Sections have ids defined in `src/components/nav.ts`; navigation scrolls to them, section labels follow i18n keys, screens readers get `aria-current="location"`.
8. Before any push: run `npx tsc --noEmit`, then `npm run build`. Lint passes by default.
9. Before pushing code, first commit locally to `main`, then `git push origin main` (or the dev branch `nextjs-migration`). Deploy URL comes from Vercel's connected repo.
10. This is not a WCAG conformance claim. Full validation needs manual testing with assistive technology. Don't claim WCAG.

## Pending features (agent backlog)

- [ ] **Scroll-responsive nav** — hide the header on scroll down (smooth opacity/transform transition), reappear on scroll up. Trigger after first ~800px. Zero dep: single scroll listener + CSS state class. Reads `@content/i18n` for toggles.
- [ ] **Marquee skills display** — replace the static skills grid with horizontally scrolling tech badges using CSS `@keyframes marquee`. No JS animation lib; keyboard pause on hover. Follow `skills.heading` copy.
- [ ] **About section redesign** — large portrait, decorative background text, achievement cards. Per the reference site `kuchikamizake.me`.
- [ ] **Hero text reveals** — staggered reveal with blinking cursor effect.
- [ ] **Background pointer-responsive effects** — mesh gradient following cursor; glassmorphism cards.

## Commits style

Single-feature commits, one logical change per message. Conventional commits (`feat:`, `chore:`, `fix:`, `refactor:`). After any large change, update `agents.md` and push twice (one update before the feature, one update after).
