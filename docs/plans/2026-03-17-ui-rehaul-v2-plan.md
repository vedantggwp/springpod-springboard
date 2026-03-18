# UI Rehaul v2 — Implementation Plan

**Date:** 2026-03-17
**Status:** Ready to execute
**Branch:** `feat/springboard-ai` (current)
**Depends on:** UI Rehaul v1 (completed, uncommitted on same branch)

## Context

Two expert reviews produced 30 items (15 Creative Director + 15 Lead Design Engineer). The bundle build system has a critical content-stripping bug. Five quick-win upgrades were identified from web research. This plan organizes all work into 6 waves by dependency and file overlap.

## Principles

- **Structural confidence over decorative confidence** — typography + whitespace do the work, not gradients
- **Fix bugs before polish** — P0/P1 items first
- **No new dependencies** unless they replace existing code (cmdk replaces custom SearchDialog internals)
- **Every wave must pass:** `npm run build`, `npm run typecheck`, `npm run lint`, `node test-site.mjs`

---

## Wave 1: Critical Bugs (P0)

**Goal:** Fix SSG-corrupting slug bug and make SearchDialog accessible.

### 1A: Fix module-level seenSlugs Map (Engineer Review #2)

**File:** `src/components/mdx/mdx-components.tsx`

The `seenSlugs` Map at module scope accumulates across SSG pages during build. Page N's heading IDs are corrupted by pages 1..N-1.

**Fix:** Move slug tracking inside the `createHeading` factory so each page render gets a fresh Map. Since `mdx-components.tsx` exports a plain object (`mdxComponents`) consumed by `MDXRemote`, and each `MDXRemote` invocation creates fresh component instances per page, the simplest fix is to reset the Map at the module boundary — but that doesn't work in SSG because all pages share one process.

**Correct approach:** Use a React context or a WeakMap keyed by render. Simpler: move `seenSlugs` inside each Heading render using a closure that resets per-page. Actually simplest: since `extractToc` in `toc.ts` already duplicates the logic correctly (function-scoped `seen` Map), refactor `mdx-components.tsx` to use a `useRef` inside each heading component — but headings are server components.

**Actual fix:** Reset the Map at the start of each `DocPage` render. Add `resetSeenSlugs()` export from `mdx-components.tsx`, call it at the top of `DocPage`.

```tsx
// mdx-components.tsx — add export
export function resetSeenSlugs() {
  seenSlugs.clear();
}

// DocPage.tsx — call before MDXRemote
import { resetSeenSlugs } from "@/components/mdx/mdx-components";
// ...
resetSeenSlugs();
<MDXRemote ... />
```

### 1B: SearchDialog accessibility (Engineer Review #1)

**File:** `src/components/search/SearchDialog.tsx`

Add:
- `role="dialog"` + `aria-modal="true"` on the dialog container
- `aria-label="Search documentation"` on the dialog
- Focus trap: on Tab at last focusable element, wrap to first (input). On Shift+Tab at input, wrap to last.
- Return focus to trigger element on close

```tsx
// On the dialog div:
role="dialog"
aria-modal="true"
aria-label="Search documentation"

// Focus trap in handleKeyDown:
if (e.key === "Tab") {
  // ... trap focus within dialog
}

// On close, restore focus to document.activeElement saved on open
```

### 1C: MobileNav overlay ARIA fix (Engineer Review #4)

**File:** `src/components/layout/MobileNav.tsx`

Change overlay from `role="button" tabIndex={-1}` to `aria-hidden="true"`. Remove `onKeyDown` handler (redundant — Escape is handled by the drawer itself). The overlay is decorative click-to-close, not a semantic button.

```tsx
// Before:
role="button"
tabIndex={-1}
aria-label="Close navigation"
onKeyDown={(e) => { if (e.key === "Escape") close(); }}

// After:
aria-hidden="true"
// Keep onClick={close} — click-to-dismiss is fine without role
```

---

## Wave 2: Visual Refinement — Creative Direction

**Goal:** Shift from "re-skinned docs template" to "structurally confident knowledge base."

### 2A: Flatten Admonition/Collapsible backgrounds (CD #1, #7)

**Files:** `src/components/mdx/Admonition.tsx`, `src/components/mdx/Collapsible.tsx`

**Admonition:** Replace gradient backgrounds with flat tinted background.
```
// Before: "bg-gradient-to-r from-sp-teal-light/30 to-sp-teal/10"
// After:  "bg-sp-teal/[0.04]"
// Keep: border-l-4 (does the visual work)
```

**Collapsible:** Same treatment. Additionally:
- When collapsed: no background, no border — just the chevron + title text (CD #7)
- When expanded: show the tinted background + border-l-4
- Remove emoji from titles (CD #13) — delete `variantEmoji` map entirely. The chevron is sufficient.

### 2B: Card refinement (CD #2)

**File:** `src/components/mdx/Card.tsx`

- Remove visible border: `border-sp-border` → `border-transparent`
- Add subtle shadow baseline: add `shadow-sp-box`
- Keep hover: `hover:shadow-sp-hover` (already correct)
- Dark mode: keep `dark:border-white/10` (needed for contrast)

### 2C: Header slimming (CD #3)

**File:** `src/components/layout/DocHeader.tsx`

- `h-16` (64px) → `h-12` (48px)
- Beta pill: simplify from `bg-sp-teal/10 px-2 py-0.5` to `text-[10px] text-sp-text-muted` (plain text, no background pill)
- Update sidebar `top-16` → `top-12` in `DocSidebar.tsx`
- Update MobileNav drawer header `h-16` → `h-12`

**Also touches:** `DocSidebar.tsx` (line 47: `top-16` → `top-12`), `MobileNav.tsx` (line 103: `h-16` → `h-12`)

### 2D: Sidebar breathing room (CD #4)

**File:** `src/components/layout/DocSidebar.tsx`

- Section items: `py-2` → `py-2.5`
- Section groups: add `mt-6` between sections (currently `mb-1`)
- Expand item padding slightly

### 2E: StepCard timeline refinement (CD #5)

**File:** `src/components/mdx/StepCard.tsx`

- Number circle: `h-10 w-10` → `h-8 w-8`, `text-base` → `text-sm`
- Border: `border-2` → remove, use solid fill: `bg-sp-teal text-white` (no outline style)
- Connector line: `w-0.5 bg-sp-teal/20` → `w-px bg-sp-border`
- **Fix `<a>` → `<Link>` (Engineer Review #10):** import next/link, replace raw `<a href>` with `<Link href>`

### 2F: Standardize border-radius (CD #6)

**Files:** All components

Audit and standardize to two values:
- `rounded-xl` → `rounded-lg` for containers (cards, admonitions, collapsibles, code blocks, search dialog)
- `rounded-md` stays for interactive elements (buttons, inputs, badges)

Components to update: Card, Admonition, Collapsible, StepCard, SearchDialog, mdx-components (pre), DataTable.

### 2G: Body text sizing (CD #9)

**File:** `src/components/mdx/mdx-components.tsx`

- Body `<p>` currently inherits 16px from globals.css `body` — confirm this is correct (it is, via `line-height: 1.5` and `font-size` browser default)
- Add `leading-[1.625]` (relaxed) to paragraph component: change `leading-relaxed` to explicit `leading-[1.625]`
- This is already `leading-relaxed` — Tailwind's `leading-relaxed` = 1.625. No change needed. Verify.

### 2H: TOC quieter presence (CD #10)

**File:** `src/components/layout/DocTableOfContents.tsx`

- Font size: → `text-xs`
- Color: → `text-sp-text-muted`
- Idle opacity: `opacity-60`, hover: `hover:opacity-100`

### 2I: Search input focus ring inside modal (CD #11)

**File:** `src/components/search/SearchDialog.tsx`

Remove focus ring from the input inside the modal (it's redundant — the modal itself provides context):
```
// Before: focus-visible:ring-2 focus-visible:ring-sp-teal ...
// After:  focus:outline-none (just outline removal, no ring)
```

### 2J: Transition speed tokens (CD #15)

**File:** `src/app/globals.css`

Add CSS custom properties:
```css
--sp-duration-fast: 100ms;
--sp-duration-normal: 150ms;
```

Replace `duration-200` with `duration-150` across components. Replace `ease-in-out` with `ease-out` (faster perceived performance).

Components: Collapsible, Card, StepCard, SearchDialog, DocSidebar, MobileNav, ThemeToggle.

---

## Wave 3: Engineering Quality (P1–P2)

**Goal:** Fix hardcoded values, accessibility gaps, and code duplication.

### 3A: Ring-offset CSS variable (Engineer Review #3)

**File:** `src/app/globals.css` + all components with `ring-offset-[#0d1117]`

Define:
```css
:root {
  --sp-ring-offset: #ffffff;
}
.dark {
  --sp-ring-offset: #0d1117;
}
```

Then find-and-replace across all components:
```
// Before: dark:focus-visible:ring-offset-[#0d1117]
// After:  ring-offset-[var(--sp-ring-offset)]
```

**Files affected:** DocHeader, DocSidebar, MobileNav, Collapsible, SearchDialog, ThemeToggle (6 files, ~15 instances).

### 3B: prefers-reduced-motion (Engineer Review #5, #13)

**File:** `src/app/globals.css`

Add:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Also update `html { scroll-behavior: smooth; }` to respect this:
```css
html {
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

### 3C: DataTable dark mode (Engineer Review #6)

**File:** `src/components/mdx/DataTable.tsx`

- `DataTableHead`: `bg-sp-gray-50` → `bg-sp-gray-50 dark:bg-white/5`
- `DataTableRow`: `hover:bg-muted/50` → `hover:bg-sp-gray-50 dark:hover:bg-white/5`
- `DataTableHeader`: `text-foreground` → `text-sp-navy dark:text-white/90`

### 3D: Card link focus-visible (Engineer Review #7)

**File:** `src/components/mdx/Card.tsx`

Add focus-visible ring to the `<Link>` wrapper:
```tsx
<Link href={href} className="block no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-teal focus-visible:ring-offset-2 ring-offset-[var(--sp-ring-offset)]">
```

### 3E: Extract shared NavSection (Engineer Review #8)

**New file:** `src/components/layout/NavSection.tsx`

DocSidebar and MobileNav duplicate ~120 lines of section rendering logic. Extract:
- `SECTION_ICONS` map
- `NavSectionItem` component (renders a single nav link with active state)
- `NavSectionGroup` component (renders expandable section with toggle)

Then both DocSidebar and MobileNav import from NavSection.

### 3F: Extract variant styles (Engineer Review #9)

**New file:** `src/components/mdx/variant-styles.ts`

Collapsible and Admonition duplicate variant config (gradient, border, icon color). Extract shared:
```ts
export const variantStyles = { info: {...}, warning: {...}, ... };
```

Both components import from this file.

### 3G: ChecklistItem checkmark → pure CSS (Engineer Review #11)

**File:** `src/components/mdx/ChecklistItem.tsx`

Replace the inline `style={{ backgroundImage: "url(data:image/svg+xml,...)" }}` with a CSS class:

```css
/* globals.css */
input[type="checkbox"].sp-check:checked {
  background-image: url("data:image/svg+xml,...");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
```

Then in the component: add `className="sp-check"` and remove the `style` prop.

### 3H: Logo explicit dimensions (Engineer Review #12)

**Files:** `DocHeader.tsx`, `MobileNav.tsx`

Add `width` and `height` attributes to logo `<img>` tags to prevent CLS:
```tsx
<img src="/springpod-logo.svg" alt="Springpod" width={120} height={32} className="h-8 w-auto dark:hidden" />
```

Measure actual SVG dimensions first.

---

## Wave 4: Bundle System Fix

**Goal:** Fix content-stripping bug so Spring Agent gets complete knowledge.

### 4A: Rewrite stripMdxComponents to extract text

**File:** `scripts/build-bundles.ts`

Replace the destructive regex-based stripping with text extraction:

```ts
function extractTextFromComponents(text: string): string {
  // ChecklistItem: <ChecklistItem id="..." label="Do X">Optional detail</ChecklistItem>
  // → "- [ ] Do X\n  Optional detail"
  text = text.replace(
    /<ChecklistItem[^>]*\blabel="([^"]*)"[^>]*(?:\/>|>([\s\S]*?)<\/ChecklistItem>)/g,
    (_, label, children) => `- [ ] ${label}${children ? '\n  ' + children.trim() : ''}`
  );

  // Collapsible: <Collapsible title="Why?" variant="why">Content</Collapsible>
  // → "**Why?**\nContent"
  text = text.replace(
    /<Collapsible[^>]*\btitle="([^"]*)"[^>]*>([\s\S]*?)<\/Collapsible>/g,
    (_, title, content) => `**${title}**\n${content.trim()}`
  );

  // StepCard: <StepCard number={1} title="Do this">Detail</StepCard>
  // → "**Step 1: Do this**\nDetail"
  text = text.replace(
    /<StepCard[^>]*\bnumber=\{?(\d+)\}?[^>]*\btitle="([^"]*)"[^>]*>([\s\S]*?)<\/StepCard>/g,
    (_, num, title, content) => `**Step ${num}: ${title}**\n${content.trim()}`
  );

  // DecisionStep: <DecisionStep condition="..." result="..." action="..." />
  // → "If [condition] → [result]: [action]"
  text = text.replace(
    /<DecisionStep[^>]*\bcondition="([^"]*)"[^>]*\bresult="([^"]*)"[^>]*\baction="([^"]*)"[^>]*\/>/g,
    (_, condition, result, action) => `If ${condition} → ${result}: ${action}`
  );

  // DecisionFlow wrapper — just unwrap
  text = text.replace(/<\/?DecisionFlow>/g, '');

  // Remaining self-closing custom components (HeroBadge, CardGrid, etc.) — remove
  text = text.replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, '');
  // Remaining paired custom components — extract inner text
  text = text.replace(/<[A-Z][a-zA-Z]*[^>]*>([\s\S]*?)<\/[A-Z][a-zA-Z]*>/g, '$1');

  return text;
}
```

### 4B: Add guides directory to content bundle

**File:** `scripts/build-bundles.ts`

Add `src/content/guides/*.mdx` files to the content bundle:
```ts
const guideFiles = [
  "guides/when-to-escalate.mdx",
  "guides/ai-incident-response.mdx",
  "guides/prompt-writing.mdx",
  "guides/review-checklist.mdx",
];
```

Add `guides` key to the return object alongside `standards`, `build_guides`, etc.

### 4C: Update design bundle raw hex values

**File:** `scripts/build-bundles.ts`

The `raw` object in `buildDesignBundle` has stale v1 hex values. Update to match the v1 rehaul token changes:
```ts
const raw = {
  primary: "#00a5ac",        // was #0BB3B7
  primary_dark: "#088d96",   // was #0A8F93
  secondary: "#1549f4",      // was #446DF6
  text_secondary: "#5a6581", // was #5C6682
  surface: "#e0e5ea",        // was #E4ECF7
  // ... etc
};
```

---

## Wave 5: Quick Wins

**Goal:** Low-effort, high-impact improvements.

### 5A: View Transitions API

**File:** `next.config.ts`

```ts
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  experimental: {
    viewTransition: true,
  },
};
```

### 5B: Skip-to-content link (WCAG 2.2)

**File:** `src/app/layout.tsx`

Add before the header:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
    focus:rounded-lg focus:bg-sp-teal focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
>
  Skip to content
</a>
```

And add `id="main-content"` to the `<main>` element in the page layout.

### 5C: scroll-padding-top

**File:** `src/app/globals.css`

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 4rem; /* accounts for sticky header */
}
```

### 5D: Dark mode card surface bump (CD #8)

**File:** `src/app/globals.css`

Change `--card: #161b22` → `--card: #1c2128` in `.dark` block. This creates more contrast between card and background (`#0d1117`).

---

## Wave 6: Homepage Polish (CD #12, #14)

**Goal:** Visual break on homepage, mobile edge-to-edge cards.

### 6A: Homepage hero divider

**File:** `src/content/index.mdx` (or whichever file renders the homepage)

Add `mb-12` and a `<hr>` (which uses the styled `hr` from mdx-components) after the hero section, before "How it works."

### 6B: Mobile edge-to-edge cards (CD #14)

**File:** `src/components/mdx/Card.tsx`

Below `sm:` breakpoint, remove border and border-radius:
```tsx
"rounded-lg border border-transparent sm:rounded-lg sm:border-transparent"
// On mobile: full-width, no rounded corners
// becomes:
"max-sm:rounded-none max-sm:border-x-0"
```

---

## Wave Dependency Map

```
Wave 1 (P0 bugs)           ─── must be first (slug bug affects build output)
Wave 2 (visual refinement) ─┐
Wave 3 (engineering)        ─┤── independent of each other, can run in parallel
Wave 4 (bundle fix)         ─┘
Wave 5 (quick wins)         ─── independent, can run any time
Wave 6 (homepage)           ─── after Wave 2 (needs Card changes from 2B)
```

**Recommended execution order:** 1 → [2, 3, 4] parallel → 5 → 6

## File Overlap Matrix

| File | Waves |
|---|---|
| `globals.css` | 2J, 3A, 3B, 3G, 5C, 5D |
| `SearchDialog.tsx` | 1B, 2F, 2I |
| `DocHeader.tsx` | 2C, 3H |
| `DocSidebar.tsx` | 2C, 2D |
| `MobileNav.tsx` | 1C, 2C, 3H |
| `mdx-components.tsx` | 1A |
| `DocPage.tsx` | 1A |
| `Collapsible.tsx` | 2A, 2F |
| `Admonition.tsx` | 2A, 2F |
| `Card.tsx` | 2B, 2F, 3D, 6B |
| `StepCard.tsx` | 2E, 2F |
| `DataTable.tsx` | 3C |
| `ChecklistItem.tsx` | 3G |
| `build-bundles.ts` | 4A, 4B, 4C |
| `next.config.ts` | 5A |
| `layout.tsx` | 5B |

## Items NOT included (deferred)

- **cmdk/shadcn Command replacement for SearchDialog** — too large for this wave. The a11y fix (1B) addresses the immediate gap. A full cmdk migration can happen later.
- **Container queries on CardGrid/DocPage** — requires Tailwind v4 container query setup. Defer to a CSS-focused pass.
- **Checklist progress dashboard** — new feature, not a rehaul item. Track separately.
- **Sidebar expand/collapse animation + state persistence (Engineer #15)** — polish item, can be done post-rehaul.
- **Body scroll lock improvement (Engineer #14)** — current approach works, edge cases are rare. Defer.

## Verification (after each wave)

```bash
npm run build          # Must succeed (43+ pages)
npm run typecheck      # Must pass
npm run lint           # Must pass
node test-site.mjs     # Playwright screenshots — verify no FOUC, hydration errors, visual regression
```

## Estimated Scope

- **New files:** 2 (`NavSection.tsx`, `variant-styles.ts`)
- **Modified files:** ~16
- **Deleted files:** 0
- **Total items:** 30 (from reviews) + 4 (bundle) + 5 (quick wins) = 39
