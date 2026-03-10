# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Avant is a Next.js 15 marketing website for an AI consulting firm targeting Ontario B2B businesses. It uses the App Router, React 19, TypeScript, and SASS/CSS Modules for styling.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint (Next.js config)
- No test framework is configured

## Architecture

### Routing

Next.js App Router with a `(frontend)` route group containing all public pages. The route group has its own layout (`src/app/(frontend)/layout.tsx`) that wraps pages with Navbar and Footer.

Key routes: `/`, `/blog`, `/blog/[slug]`, `/services`, `/industries`, `/about`, `/contact`

### CMS & Content

**Keystatic** (cloud mode, project `landship/avant`) manages blog content. Config is in `keystatic.config.ts`. Blog posts are stored as Markdoc files in `content/posts/`. The CMS editor UI is at `/keystatic`.

Posts have: title, excerpt, coverImage, category, author, tags, publishedAt, draft flag, and Markdoc body content.

### Styling System

Dark theme with CSS custom properties defined in `src/app/globals.css`:
- Colors: charcoal backgrounds (`--charcoal-*`), ivory text (`--ivory`), blue accent (`--accent`)
- Fonts: Outfit (display) and DM Sans (body), loaded in `(frontend)/layout.tsx` via next/font
- CSS Modules per component (`.module.css` files alongside `.tsx`)
- Utility classes: `.container`, `.section`, `.card`, `.glass`, `.btn-primary`, `.btn-secondary`
- Mobile breakpoint: 768px

### 3D / Animations

- `MorphBlob.tsx` — Three.js morphing blob with Perlin noise, mouse tracking, orbiting particles. Has hardware detection and mobile optimizations.
- `GlobeBackground.tsx` — 3D globe visualization
- `ScrollReveal` component + `useReveal` hook — IntersectionObserver-based fade-in animations

### API Routes

- `/api/contact` — Contact form submission (validation implemented, Supabase DB insert is TODO)
- `/api/keystatic/[...params]` — Keystatic CMS API

### Backend

Supabase is configured (PostgreSQL) but the contact form DB integration is not yet wired up. Environment variables for Supabase are in `.env`.

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Key Dependencies

- `@keystatic/core` + `@keystatic/next` — CMS
- `@supabase/supabase-js` + `@supabase/ssr` — Database client
- `three` + `@react-three/fiber` + `@react-three/drei` — 3D rendering
- `@vercel/analytics` — Analytics
- `sass` — SCSS/CSS Modules
