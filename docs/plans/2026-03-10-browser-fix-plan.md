# Browser Fix Plan — 2026-03-10

Verified with Playwright (26 screenshots in `/tmp/springboard-screenshots/`).

## Phase 1 — Fix Dark Mode (CRITICAL)

The biggest visible breakage. Most content is invisible in dark mode.

### 1.1 FOUC fix — blocking script in `<head>`
- **File:** `src/app/layout.tsx`
- **Problem:** `.dark` class is applied via `useEffect` in `ThemeProvider.tsx` (after hydration). Users see white flash, and CSS variables don't resolve correctly on first paint.
- **Fix:** Add inline `<script>` in `<head>` that reads `localStorage('sp-theme')` or `prefers-color-scheme` and applies `.dark` to `<html>` before React hydrates. This is the standard pattern (next-themes, etc.).

### 1.2 ThemeProvider hydration mismatch
- **File:** `src/components/theme/ThemeProvider.tsx`
- **Problem:** `getInitialTheme()` reads localStorage during SSR (returns "light"), but client may have "dark" saved. This causes `ThemeToggle` to render moon icon on server, sun icon on client → hydration error.
- **Fix:** Initialize theme state as `null` or `"light"` and only apply real theme after mount (or rely on the blocking script to set it before hydration).

### 1.3 Body background transparency
- **File:** `src/app/layout.tsx:34`
- **Problem:** `style={{ background: "var(--sp-bg)" }}` — Playwright measured `rgba(0,0,0,0)` for body bg in dark mode because the CSS variable hasn't resolved when `.dark` isn't applied yet.
- **Fix:** The blocking script (1.1) should fix this. May also need to ensure `globals.css` base layer sets body bg correctly.

## Phase 2 — Fix Hydration Errors

### 2.1 `<p>` inside `<p>` in StepCard
- **File:** `src/components/mdx/StepCard.tsx:47`
- **Problem:** Wraps `{children}` in `<p>`, but MDX content generates `<p>` tags inside. HTML forbids `<p>` in `<p>` → hydration failure on every page with StepCards (homepage, build guides, design-system/components).
- **Fix:** Change `<p>` to `<div>` with same styling classes.

### 2.2 Duplicate heading keys
- **Files:** MDX content files, `src/components/mdx/mdx-components.tsx`
- **Problem:** Multiple headings with same text (e.g., "accelerator", "orange-reviewed-build-and-above") produce duplicate IDs/keys from `slugify()`.
- **Fix:** Track seen slugs and append `-2`, `-3` etc. for duplicates, or use a different key strategy.

## Phase 3 — Branding Cleanup

### 3.1 MobileNav VCF branding (CRITICAL — visible on every mobile page)
- **File:** `src/components/layout/MobileNav.tsx:100-110`
- **Problem:** Shows "V" icon in gradient circle + "Documentation" text. Desktop header already shows Springpod logo + "SpringBoard".
- **Fix:** Replace with Springpod logo + "SpringBoard" matching `DocHeader.tsx`.

### 3.2 MobileNav missing section icons
- **File:** `src/components/layout/MobileNav.tsx:21-31`
- **Problem:** Missing "For Your Role" (Users), "Updates" (Bell), "Design System" (Palette) icons. Falls back to generic Folder icon.
- **Fix:** Add missing entries to match `DocSidebar.tsx:23-36`.

### 3.3 MobileNav always-expanded bug
- **File:** `src/components/layout/MobileNav.tsx:155`
- **Problem:** `useState(hasActiveChild || true)` — `|| true` makes all sections always expanded.
- **Fix:** Change to `useState(hasActiveChild)` to match DocSidebar behavior.

### 3.4 GitHub link
- **File:** `src/components/layout/DocHeader.tsx:95`
- **Fix:** Update URL from `vedantggwp/SP-VibeFrame` to correct repo (or remove if not public yet).

### 3.5 README.md
- **Problem:** Still says "Vibe Coding Framework (VCF)" everywhere, links to `sp-vibe-frame.vercel.app`.
- **Fix:** Rewrite for SpringBoard.

### 3.6 package.json
- **Line 2:** `"name": "sp-vibeframe"` → `"springpod-springboard"`

### 3.7 CLAUDE.md
- **Lines 7, 14, 66:** Still references "VCF", old `vcf-*` token names.
- **Fix:** Update to match current codebase (SpringBoard, `sp-*` tokens).

### 3.8 Content VCF references
- `src/content/updates/feed.mdx:53` — "generic VCF content"
- `src/content/reference/version.mdx:5` — "Vibe Coding Framework"
- **Fix:** Reword to remove VCF mentions.

## Phase 4 — Polish

### 4.1 Custom 404 page
- **Problem:** Default Next.js 404 is unstyled, looks jarring with dark sidebar.
- **Fix:** Create `src/app/not-found.tsx` with SpringBoard branding.

### 4.2 Hardcoded colors → tokens
- **Files:** DocHeader, DocSidebar, MobileNav, Card, StepCard, DecisionFlow, SearchDialog, mdx-components, Collapsible
- **Problem:** `#0d1117`, `#161b22`, `#dddde1`, `#10B981` hardcoded instead of using `sp-*` tokens or CSS variables (`var(--background)`, `var(--card)`).
- **Fix:** Replace with token classes. Add missing tokens to globals.css if needed (e.g., `sp-surface-hover` for `#dddde1`).

### 4.3 Inconsistent Tailwind grays
- **Files:** mdx-components, DocHeader, DocSidebar, MobileNav, DocBreadcrumbs
- **Problem:** Uses `text-gray-700`, `border-gray-200`, `bg-gray-50` instead of `sp-*` tokens.
- **Fix:** Replace with corresponding sp- tokens.

### 4.4 Card.tsx uses `<a>` instead of `<Link>`
- **File:** `src/components/mdx/Card.tsx:37`
- **Fix:** Import and use Next.js `<Link>` for internal hrefs.

### 4.5 SearchDialog uses `window.location.href`
- **File:** `src/components/search/SearchDialog.tsx:119`
- **Fix:** Use Next.js `useRouter().push()` for client-side navigation.

### 4.6 Missing page meta descriptions
- **File:** `src/app/[...slug]/page.tsx:24`
- **Fix:** Pass `description` from MDX frontmatter to `generateMetadata`.

### 4.7 ESLint warnings
- `layout.tsx:27` — Google Fonts via `<link>` instead of `next/font`
- `DocHeader.tsx:39,44` — `<img>` instead of `<Image>`

---

## Test Screenshots Reference
All in `/tmp/springboard-screenshots/`:
- `01-homepage-light.png` — light mode baseline (looks good)
- `02-homepage-dark.png` — BROKEN: invisible headings/text
- `14-green-build-dark.png` — BROKEN: entire page content invisible
- `20-mobile-nav-open.png` — shows "V" icon + "Documentation"
- `22-mobile-nav-dark.png` — mobile dark mode
- `24-fouc-test.png` — confirms FOUC (light mode flash)
- `26-404-page.png` — unstyled default 404
