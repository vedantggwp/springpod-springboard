# CLAUDE.md

## Project Overview

**SpringBoard** — Springpod's internal AI knowledge base. Documentation site, NOT an application. No backend, no database, no API routes. All content is MDX rendered as a static site via Next.js SSG on Vercel.

**Springpod:** EdTech company — virtual work experience for students aged 13+. 80 employees, London. Key compliance: UK GDPR, DPA 2018, PECR, under-18 safeguarding.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server
npm run build        # Build search index + Next.js site (38 pages)
npm run typecheck    # TypeScript
npm run lint         # ESLint
node test-site.mjs   # Playwright verification (26 screenshots, checks dark mode/hydration/console errors)
```

Run `node test-site.mjs` after any component or theme changes. It catches hydration errors, FOUC, broken dark mode, and console warnings that won't show up in `npm run build`.

## Content Structure

All content in `src/content/**/*.mdx`. Navigation defined in `src/lib/navigation.ts` (single source of truth for sidebar + mobile nav).

**When adding a new page:** update `src/lib/navigation.ts`, create the `.mdx` file, then `npm run build` (rebuilds search index via `scripts/build-search-index.ts`).

## Design Token Rules

IMPORTANT: All colors use `sp-*` token classes defined in `src/app/globals.css`. Dark mode uses CSS variable overrides in a `.dark` block.

- **NEVER use hardcoded hex colors** like `bg-[#161b22]` — use semantic tokens (`dark:bg-card`, `dark:bg-background`)
- **NEVER use generic Tailwind grays** like `text-gray-700`, `border-gray-200` — use `sp-*` equivalents (`text-sp-gray-700`, `border-border`)
- Brand colors: `sp-teal` (primary), `sp-navy` (text/headers), `sp-blue` (accent)
- The Springpod logo SVGs are sacred — never alter them, only swap between light/dark variants

## Dark Mode Architecture

Three-layer system — all three must stay in sync:

1. **Blocking `<script>` in `<head>`** (`src/app/layout.tsx`) reads `localStorage('sp-theme')` / `prefers-color-scheme` and applies `.dark` to `<html>` before paint. This prevents FOUC.
2. **CSS variables** in `:root` (light) and `.dark` (dark) blocks in `globals.css`
3. **ThemeProvider** (`src/components/theme/ThemeProvider.tsx`) initializes as `"light"` (SSR-safe), syncs real theme after mount via `useEffect`

If you change the storage key, theme values, or class strategy, update ALL THREE layers.

## Gotchas (These Have Caused Real Bugs)

- **StepCard and similar wrappers:** Use `<div>` not `<p>` for children containers. MDX generates `<p>` tags → nested `<p>` is invalid HTML → hydration failure.
- **ThemeProvider:** NEVER call `localStorage` during render/initialization. Always init as `"light"` and sync in `useEffect`. SSR returns "light", client may have "dark" → hydration mismatch.
- **Heading slug deduplication:** Both `src/components/mdx/mdx-components.tsx` AND `src/lib/toc.ts` must use identical dedup logic (track seen slugs, append `-2`, `-3`). If they diverge, TOC links break and React throws duplicate key warnings.
- **ChecklistItem:** Uses `useSyncExternalStore` (not `useEffect`) for localStorage persistence to avoid hydration errors.

## Constraints

- **No unit tests.** Quality verified via Playwright screenshots (`test-site.mjs`) + manual review.
- **SSG only.** All 38 pages pre-built via `generateStaticParams`. No server-side rendering or API routes.
- **Token-first styling.** Architecture must support easy theme swaps — no component should depend on specific color values.
