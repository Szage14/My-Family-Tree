# Family Tree App — Agent Customization

## ⚠️ Critical: Next.js 16 — Breaking Changes

This project uses **Next.js 16.2.4**, which has significant breaking changes from older versions:
- **App Router is default** — no Pages directory
- **React 19.2.4** with React Compiler enabled (auto-memoization)
- **Tailwind CSS v4** with new `@tailwindcss/postcss` package (CSS-first approach)
- **APIs and conventions differ significantly** from training data

**Before writing any code**, review:
- Next.js 16 docs in `node_modules/next/dist/docs/`
- [React 19 Features](https://react.dev/) and Compiler considerations
- [Tailwind CSS v4 Migration](https://tailwindcss.com/docs) for PostCSS changes

## Project Overview

**Family Tree App**: Interactive and scalable family tree web application with React Flow visualization and Supabase backend.

| Aspect | Details |
|--------|---------|
| **Framework** | Next.js 16.2.4 (App Router) |
| **Runtime** | React 19.2.4 + React Compiler |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 (@tailwindcss/postcss) |
| **Linting** | ESLint 9 |
| **Status** | Early-stage boilerplate — ready for feature development |

## Development Commands

```bash
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Production build to .next/
npm start         # Serve production build
npm run lint      # Run ESLint validation
```

## Project Structure & Conventions

### Directory Layout
```
src/app/                    # App Router root (Next.js 16 standard)
├── layout.tsx              # Root layout with metadata, fonts
├── page.tsx                # Home page (/ route)
├── globals.css             # Tailwind directives and base styles
src/                        # Path alias: @/* → src/*
public/                     # Static assets (SVGs)
```

### TypeScript & Path Aliases
- **Strict Mode Enabled** — No implicit `any`, full type safety
- **Path Alias**: `@/*` points to `./src/*` for clean imports
  ```tsx
  // ✅ Import like this:
  import { Component } from '@/app/components/Component'
  ```

### Styling with Tailwind v4
- **New PostCSS integration** — Different from v3
- **Dark mode** — Configured and ready to use (`dark:` classes)
- **Responsive design** — Use `sm:`, `md:`, `lg:` prefixes
- **CSS variables** — Tailwind v4 uses CSS variables (no more theme colors in classes)

### React 19 & Compiler
- **React Compiler enabled** — Auto-memoizes components (be careful with side effects)
- **Use modern hooks** — `useTransition`, `useActionState`, etc.
- **Avoid manual memoization** unless needed (Compiler handles it)

## Installation & Setup

### Dependencies Already Installed
- ✅ Next.js 16, React 19, TypeScript, Tailwind CSS v4, ESLint
- ✅ `node_modules/` present and ready

### Planned Dependencies (Not Yet Installed)
- ❌ `react-flow-renderer` — For family tree visualization
- ❌ `@supabase/supabase-js` — For backend & database
- ❌ `.env.local` — Environment variables (not checked in)

**If adding these**, run:
```bash
npm install react-flow-renderer @supabase/supabase-js
```

Then create `.env.local` with Supabase keys.

## Common Patterns & Best Practices

### File Structure Example
```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── (auth)/              # Route groups for features
│   └── api/                 # API routes (if needed)
├── components/              # Reusable components
├── utils/                   # Utility functions
├── hooks/                   # Custom React hooks
└── types/                   # TypeScript type definitions
```

### Component Pattern (React 19)
```tsx
// ✅ Use async components (Server Components by default)
export default async function Page() {
  return <div>Server component</div>
}

// ⚠️ Use 'use client' sparingly for interactive UI only
'use client'
import { useState } from 'react'
export default function InteractiveComponent() {
  const [state, setState] = useState(null)
  return <div>{state}</div>
}
```

## Gotchas & Debugging Tips

| Issue | Solution |
|-------|----------|
| **Type errors with React 19** | Ensure `@types/react@^19` is installed |
| **Tailwind classes not applying** | Check `.next/static/css/` after build; v4 uses CSS variables |
| **Build fails silently** | Run `npm run lint` first — ESLint might catch issues |
| **React Compiler issues** | If unexpected behavior, add `'use no memo'` to component |
| **Environment variables not loading** | Create `.env.local` (not `.env`) and restart dev server |
| **Module not found errors** | Check `tsconfig.json` for path aliases; restart TypeScript server |

## Git Workflow

- **Main branch** → Production
- Commit before running `git push`
- Resolve merge conflicts manually (check README.md if conflicts occur)

## Next Steps for Agent

1. **Run the dev server**: `npm run dev` and verify http://localhost:3000 loads
2. **Review the layout**: Check `src/app/layout.tsx` for current setup
3. **Explore type definitions**: Open `tsconfig.json` for path aliases and compiler options
4. **When adding features**: 
   - Create components in `src/components/` if not Server Components
   - Use `src/app/` for pages and API routes
   - Follow TypeScript strict mode (no implicit any)
   - Test with `npm run lint` before committing

---

**Last Updated**: April 30, 2026 | **Next.js Version**: 16.2.4 | **React**: 19.2.4
