# Family Tree App Agent Guide

This file is for AI coding agents working in this repository.

## Quick Start

1. Install and run locally: `npm install`, then `npm run dev`.
2. Required checks before commit: `npm run lint` and `npm run build`.
3. Environment file required for auth flows: `.env.local` (see [README.md](README.md)).

## Stack and Non-Negotiables

- Next.js 16 App Router (`src/app/`), React 19, TypeScript strict mode.
- Tailwind v4 is configured, but UI implementation in this repo is primarily CSS Modules (`*.module.css`).
- Use `@/*` imports (alias to `src/*`).
- Prefer `next/image` over raw `<img>` in React components.
- Keep existing visual language unless user asks for redesign.

## Canonical Files to Follow

- App shell and metadata: [src/app/layout.tsx](src/app/layout.tsx)
- Protected home/dashboard route: [src/app/page.tsx](src/app/page.tsx)
- Auth callback completion: [src/app/auth/callback/page.tsx](src/app/auth/callback/page.tsx)
- Login/register patterns: [src/components/LoginPage.tsx](src/components/LoginPage.tsx), [src/components/RegisterPage.tsx](src/components/RegisterPage.tsx)
- Supabase client pattern (lazy singleton): [src/lib/supabaseClient.ts](src/lib/supabaseClient.ts)
- Dashboard family data shape: [src/data/dashboardFamilyMock.ts](src/data/dashboardFamilyMock.ts)
- Dashboard tree rendering/styles: [src/components/DashboardTree.tsx](src/components/DashboardTree.tsx), [src/components/DashboardTree.module.css](src/components/DashboardTree.module.css)

## Auth and Data Conventions

- Authentication is passwordless magic-link via Supabase.
- Keep callback flow intact: exchange code, load pending profile, update user/profile, redirect.
- Dashboard member mock schema currently uses:
  - `birthDate` (full date string)
  - `address` (full address)
  - `avatarUrl` (currently mock avatar URLs)
  - recursive `spouse` and `children`

## Styling and UI Conventions

- Use CSS Modules; avoid inline `style` props.
- Keep spacing hierarchy and readability consistent across card/tree components.
- Relationship line semantics matter: parent-child connectors must remain visually distinct from spouse connectors.

## Editing Rules

- Make minimal, focused edits; avoid broad refactors unless requested.
- Preserve existing file organization and naming.
- If adding terms that trigger cSpell warnings, update [.cspellrc.json](.cspellrc.json) instead of suppressing diagnostics.
- If using remote avatars/images with next/image, update image host allowlist in [next.config.ts](next.config.ts) under images.remotePatterns.
- After editing [next.config.ts](next.config.ts), restart dev server to apply config changes.

## Validation Checklist

Run after meaningful changes:

1. `npm run lint`
2. `npm run build`

If auth or dashboard behavior changed, also test in browser:

1. `/login` magic-link request flow
2. `/auth/callback` redirect/session completion
3. Home dashboard rendering and search/collapse interactions

## Reference Docs

- Project setup and usage: [README.md](README.md)
- Supplemental agent pointer file: [CLAUDE.md](CLAUDE.md)
