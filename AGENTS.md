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
- ✅ `@supabase/supabase-js` (v2.105.3) — Supabase client for auth & database
- ✅ `reactflow` (v11.11.4) — Family tree visualization framework
- ✅ `node_modules/` present and ready

### Environment Configuration
Create `.env.local` with Supabase credentials (not checked in):
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
See [Supabase Authentication](#supabase-authentication-flow) for setup details.

## Supabase Authentication Flow

### Passwordless Magic-Link Authentication
The project implements **passwordless authentication** using Supabase Magic Links:

1. **Registration** (`src/components/RegisterPage.tsx`):
   - Collect: full name + email
   - Call: `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo } })`
   - Save pending profile to LocalStorage for later attachment
   - Show verification pending screen

2. **Login** (`src/components/LoginPage.tsx`):
   - Collect: email only
   - Call: `supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } })`
   - Show verification pending screen

3. **Callback** (`src/app/auth/callback/page.tsx`):
   - Exchange code for session: `supabase.auth.exchangeCodeForSession(code)`
   - Apply pending profile data (full name)
   - Redirect authenticated user to home

### Database Schema
**profiles** table (auto-created on signup via trigger):
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
-- RLS policies: Users can read/insert/update own profile only
```

### Key Files
- **lib/supabaseClient.ts** — Lazy Supabase client initialization (prevents build-time env requirement)
- **lib/pendingProfile.ts** — LocalStorage helpers for signup name during callback flow
- **app/auth/callback/** — PKCE flow completion and session establishment

## Common Patterns & Best Practices

### File Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts & metadata
│   ├── page.tsx                # Protected home screen
│   ├── globals.css             # Tailwind directives
│   ├── auth/
│   │   └── callback/page.tsx   # Magic-link callback handler
│   ├── login/page.tsx          # Login route (wrapper)
│   └── register/page.tsx       # Register route (wrapper)
├── components/
│   ├── LoginPage.tsx           # Login UI component
│   ├── RegisterPage.tsx        # Signup UI component
│   ├── VerificationPending.tsx # Magic-link confirmation screen
│   └── FamilyTree.tsx          # Family tree visualization
├── lib/
│   ├── supabaseClient.ts       # Lazy Supabase client
│   └── pendingProfile.ts       # LocalStorage for signup flow
├── types/
│   └── family.ts               # TypeScript interfaces
└── data/
    └── familyMock.ts           # Mock data for development
```

### Component Pattern (React 19)
```tsx
// ✅ Server Components by default (most components)
export default function Page() {
  return <div>Server component</div>
}

// ⚠️ Client Components only when needed (interactive forms, hooks)
'use client'
import { useState } from 'react'

export default function InteractiveForm() {
  const [state, setState] = useState(null)
  return <div>{state}</div>
}

// ✅ Protected page pattern
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function ProtectedPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = getSupabaseClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace('/login')
    })
  }, [router])

  return <div>Protected content</div>
}
```

## Gotchas & Debugging Tips

| Issue | Solution |
|-------|----------|
| **Supabase client undefined at build time** | Use lazy getter (`getSupabaseClient()`) — prevents env requirement during `npm run build` |
| **Auth callback fails after magic-link click** | Ensure `NEXT_PUBLIC_SITE_URL` matches redirect domain; check `.env.local` |
| **Type errors with React 19** | Ensure `@types/react@^19` is installed |
| **Tailwind classes not applying** | Check `.next/static/css/` after build; v4 uses CSS variables |
| **cSpell unknown words** | Add custom terms to `.cspellrc.json` (e.g., "supabase", "Supabase") |
| **Build fails silently** | Run `npm run lint` first — ESLint catches issues early |
| **React Compiler issues** | If unexpected behavior, add `'use no memo'` to component |
| **Environment variables not loading** | Create `.env.local` (not `.env`) and restart dev server |
| **Module not found errors** | Check `tsconfig.json` for path aliases; restart TypeScript server |

## Git Workflow

- **Main branch** → Production
- CTesting the Authentication Flow

### Local Testing Checklist
1. **Setup**: `npm install` → `.env.local` with Supabase credentials
2. **Dev server**: `npm run dev` → navigate to http://localhost:3000
3. **Flow**: 
   - Register with name + email → receive magic link in email
   - Click link → callback completes session → redirected to home
   - Home page shows authenticated user info
   - Sign out → redirected to login
4. **Build**: `npm run build` → verify all routes static (prerendered)

### Troubleshooting Auth
- **Stuck on verification page**: Check browser console for callback errors
- **"Session not created" after link click**: Verify redirect URL matches `NEXT_PUBLIC_SITE_URL`
- **Email not received**: Check Supabase email provider settings (Dashboard → Authentication → Email)

## Next Steps for Agent

**When adding features**:
- For **UI components**: Create in `src/components/`, export in stories if Storybook added
- For **pages/routes**: Add under `src/app/`, use route groups `(feature-name)` for organization
- For **authentication checks**: Use the protected page pattern (see Components section)
- For **database access**: Use lazy `getSupabaseClient()` to query from Server Components or API routes
- **Always test**: `npm run lint` → `npm run build` → manual testing before committing

**Planned features** (not yet implemented):
- ✅ Passwordless authentication (complete)
- ⚠️ Family tree visualization (React Flow wired, needs implementation)
- ⚠️ Multi-user collaboration & permissions
- ⚠️ Mobile-responsive family tree interactions

---

**Last Updated**: May 6, 2026 | **Next.js Version**: 16.2.4 | **React**: 19.2.4 | **Supabase Auth**: Passwordless Magic-Link
---

**Last Updated**: April 30, 2026 | **Next.js Version**: 16.2.4 | **React**: 19.2.4
