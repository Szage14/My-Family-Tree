---
name: preflight-check
description: "Run readiness checks before commit: lint, build, image host config sanity, and environment quick checks. Use when asked to verify project readiness or pre-merge stability."
---

# Preflight Check

Use this workflow before commit, push, or PR updates.

## Inputs

Optional context:

- Files changed
- Whether auth flow or dashboard tree was touched

## Workflow

1. Run `npm run lint`.
2. Run `npm run build`.
3. If any file uses `next/image` with remote URLs, verify `images.remotePatterns` in [next.config.ts](next.config.ts).
4. If auth flow changed, verify `.env.local` still has:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
5. If dashboard rendering changed, sanity-check [src/components/DashboardTree.tsx](src/components/DashboardTree.tsx) and [src/data/dashboardFamilyMock.ts](src/data/dashboardFamilyMock.ts) compatibility.

## Output Format

Return a concise checklist:

- Lint: pass/fail
- Build: pass/fail
- Config issues found: yes/no (with exact file)
- Recommended next action

## Scope

This skill does not implement features. It validates readiness and reports blockers clearly.
