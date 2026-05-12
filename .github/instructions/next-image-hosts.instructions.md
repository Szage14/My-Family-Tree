---
description: "Use when working with next/image, remote avatars, or external image URLs in React components. Enforces image host allowlist updates and dev-server restart guidance."
applyTo: "**/*.{ts,tsx,js,jsx}"
---

# Next Image Host Guardrails

When adding or changing image URLs rendered by `next/image`:

1. Check whether the source is remote (for example `https://...`).
2. If remote, update `images.remotePatterns` in [next.config.ts](next.config.ts).
3. Keep host patterns minimal and explicit (no broad wildcards unless required).
4. If image host config changed, remind to restart `npm run dev`.

## Expected Validation

1. Run `npm run lint`.
2. Run `npm run build`.
3. If this is a runtime issue, verify the affected page in the browser.

## Notes

- Prefer `next/image` over raw `<img>` unless there is a strong reason not to.
- Keep existing project styling patterns and avoid unrelated refactors.
