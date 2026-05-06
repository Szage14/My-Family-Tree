# My Family Tree

Interactive and scalable family tree web application built with Next.js, TypeScript, Tailwind CSS, React Flow, and Supabase.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env.local with Supabase credentials
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to login.

## Authentication

This app uses **passwordless magic-link authentication** powered by Supabase:
1. **Register** with email and full name
2. **Receive magic link** in your email
3. **Click link** to complete authentication
4. **Access dashboard** — your family network awaits

For full authentication architecture, see [AGENTS.md](AGENTS.md#supabase-authentication-flow).

## Tech Stack

- **Frontend**: Next.js 16.2.4, React 19.2.4, TypeScript 5
- **Styling**: Tailwind CSS v4 + CSS Modules
- **Backend**: Supabase (PostgreSQL + Row-Level Security)
- **Visualization**: React Flow
- **Linting**: ESLint 9

## Project Status

- ✅ Passwordless authentication (magic-link)
- ✅ User profiles & secure sessions
- ⚠️ Family tree visualization (framework ready)
- ⚠️ Multi-user collaboration

## Development

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build to .next/
npm start         # Serve production build
npm run lint      # Run ESLint validation
```

## Documentation

- **[AGENTS.md](AGENTS.md)** — Complete agent customization & development guide (frameworks, patterns, gotchas)
- **[Next.js Docs](https://nextjs.org/docs)** — Framework reference
- **[Supabase Docs](https://supabase.com/docs)** — Backend & authentication

## Environment Setup

Required `.env.local` (not checked in):
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Get these from your [Supabase Dashboard](https://app.supabase.com).

---

**Last Updated**: May 6, 2026
