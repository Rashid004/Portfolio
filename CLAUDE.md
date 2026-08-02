# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: pnpm.

- `pnpm dev` — dev server (Next.js + Turbopack)
- `pnpm build` — production build
- `pnpm start` — run production build
- `pnpm lint` — ESLint (`next lint`)
- `pnpm svgr:icons` — regenerate React icon components from `components/icons/svgs/*.svg` into `components/icons/` (typed, no dimensions, title prop)

No test suite configured.

## Architecture

Next.js 15 App Router portfolio site, single owner/content author (Rashid).

**Content is centralized in `lib/data.ts`** — `GENERAL_INFO`, `SOCIAL_LINKS`, `MY_STACK` (tech stack grouped by category: frontend/backend/database/devops/genai/tools, icons either local `/public/logo/*` or remote CDN via `next.config.ts` `remotePatterns`), `PROJECTS` (array of `IProject`, typed in `types/index.ts`), and `MY_EXPERIENCE`. Adding/editing a project or stack entry means editing this file, not creating new data files. Project `description`/`role` fields are raw HTML strings rendered via `html-react-parser`.

**Routing**: `app/page.tsx` is the single-page home (sections: Banner, AboutMe, Skills, Experiences, ProjectList as `app/_components/*`). `app/projects/[slug]/page.tsx` renders a project detail page by looking up `slug` against `PROJECTS` in `lib/data.ts`.

**Layout composition** (`app/layout.tsx`): global chrome — `Navbar`, `Footer`, `CustomCursor`, `Preloader`, `ScrollProgressIndicator`, `ParticleBackground`, `StickyEmail` — is mounted once in the root layout, outside `{children}`. `app/template.tsx` runs a GSAP page-transition animation (`.page-transition` overlay wipe) on every route change since `template.tsx` remounts per navigation while `layout.tsx` doesn't.

**Animation stack**: GSAP + `@gsap/react`'s `useGSAP` hook for scroll/transition animations, Lenis (`lenis/react`) for smooth scroll wrapping the whole app in `ReactLenis` in the root layout.

**Styling**: Tailwind CSS with a custom design system in `tailwind.config.ts` (custom color tokens, fonts via `--font-anton`/`--font-roboto-flex` CSS variables set in `layout.tsx`). shadcn/ui is configured (`components.json`, default style, neutral base, no prefix) but the `components/ui` directory doesn't exist yet — add shadcn components there if/when used. Path alias `@/*` maps to repo root (`tsconfig.json`).

**Icons**: SVGs live in `components/icons/svgs/`; run `pnpm svgr:icons` to generate matching typed React components in `components/icons/`, re-exported via `components/icons/index.ts`. Don't hand-write icon components for new SVGs — add the SVG and regenerate.

## Notes

- React 19 RC + Next 15 — some deps (`@types/react`, `@types/react-dom`) are pinned to v18 types intentionally; don't "fix" this mismatch without checking it's not load-bearing.
- ESLint: `no-unused-vars` is a warning (ignores `_`-prefixed args), `react-hooks/exhaustive-deps` is off, `@typescript-eslint/no-explicit-any` is off — this codebase permits `any` and doesn't enforce hook deps.
- Formatting uses `.prettierrc.json` (check it before assuming default Prettier settings).
