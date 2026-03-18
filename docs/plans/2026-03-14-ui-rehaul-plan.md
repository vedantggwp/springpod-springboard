# UI Rehaul Plan — Align SpringBoard to Springpod Design System

**Date:** 2026-03-14
**Status:** Ready to execute
**Branch:** `feat/springboard-ai` (current)

## Context

SpringBoard is Springpod's internal AI knowledge base — a Next.js SSG documentation site. A full UI audit was completed comparing the current implementation against the master design system tokens at `Design/Springpod -master-design-system-tokens.json`.

**Key finding:** The site was forked from a generic framework (VCF v1) and still carries its color palette, spacing, and typography. The design JSON from Springpod's Figma defines the canonical values. This plan aligns the codebase to those tokens.

## Architecture Decisions (Pre-resolved)

These decisions were made during the audit to avoid ambiguity during execution:

1. **Link color:** Change from teal to Blue 600 (`#1549f4`) per design tokens `Text.link`. Hover: Blue 700 (`#143ae1`).
2. **Primary button color:** Keep teal for CTA buttons on the docs site. The design JSON's "Navy primary button" is for the main Springpod product, not the knowledge base. Teal CTAs are intentional here.
3. **Typography sizes:** Do NOT adopt the design JSON heading sizes (72px h1, 56px h2). Those are for marketing pages. Keep current documentation-appropriate sizes. DO fix letter-spacing and line-height ratios.
4. **Page background:** Adopt Grey 100 (`#f7fafc`) from design tokens instead of current `rgba(233,233,237,0.3)`.

## Execution Waves

Work is split into 4 independent waves that can run as parallel agents. Each wave modifies different files with no overlap.

---

### Wave 1: Design Token Alignment (`globals.css` only)

**File:** `src/app/globals.css`
**Goal:** Update all CSS custom properties to match the design system JSON.

#### Color changes (in `@theme inline` block):

| Token | Current | New (from JSON) |
|---|---|---|
| `--color-sp-teal` | `#0BB3B7` | `#00a5ac` (Teal 600 Primary) |
| `--color-sp-teal-dark` | `#0A8F93` | `#088d96` (Teal 700) |
| `--color-sp-teal-light` | `#9CF6F6` | `#9cf6f6` (Light Blue 200 — same) |
| `--color-sp-blue` | `#446DF6` | `#1549f4` (Blue 600 Primary) |
| `--color-sp-blue-2` | `#1C3DAE` | `#143ae1` (Blue 700) |
| `--color-sp-gray-200` | `#EDF2F7` | `#e0e5ea` (Grey 200) |
| `--color-sp-gray-300` | `#E2E8F0` | `#cacfd9` (Grey 300) |
| `--color-sp-gray-500` | `#A0AEC0` | `#9da5b6` (Grey 500) |
| `--color-sp-gray-600` | `#718096` | `#8790a4` (Grey 600) |
| `--color-sp-gray-700` | `#4A5568` | `#5a6581` (Grey 700) |
| `--color-sp-gray-800` | `#2D3748` | `#43506f` (Grey 800) |
| `--color-sp-text-secondary` | `#5C6682` | `#5a6581` (Grey 700 — text secondary = grey 700) |
| `--color-sp-text-muted` | `#8B92A6` | `#8790a4` (Grey 600) |
| `--color-sp-border` | `#B9BEC9` | `#b3bac7` (Grey 400) |
| `--color-sp-surface` | `#E9E9ED` | `#e0e5ea` (Grey 200) |
| `--color-sp-gray-100` | `#F7FAFC` | `#f7fafc` (Grey 100 — same) |
| `--color-sp-gray-50` | `#F6F7F9` | `#f7fafc` (use Grey 100, remove 50 alias or keep) |

#### Add missing colors from JSON:

```
--color-sp-green: #42d2ab;       /* Secondary Green 400 */
--color-sp-green-dark: #089375;  /* Secondary Green 700 */
--color-sp-ruby: #d81159;        /* Secondary Ruby 700 */
--color-sp-yellow: #fac748;      /* Secondary Yellow 300 */
--color-sp-orange-secondary: #fe9000; /* Secondary Orange 600 */
```

#### `:root` light mode changes:

| Property | Current | New |
|---|---|---|
| `--sp-bg` | `rgba(233,233,237,0.3)` | `#f7fafc` (Grey 100, solid) |
| `--sp-card-border` | `#B9BEC9` | `#b3bac7` (Grey 400) |
| `--primary` | `#0BB3B7` | `#00a5ac` (match new teal) |
| `--ring` | `#0BB3B7` | `#00a5ac` |

#### Scrollbar fix:

Change hardcoded `#B9BEC9` in `::-webkit-scrollbar-thumb` to `var(--color-sp-border)`.

#### Letter-spacing:

Add to `@theme inline`:
```css
--tracking-tight: -0.025em;   /* ~-1px at 40px */
--tracking-tighter: -0.05em;  /* ~-2px at 40px */
```

#### Line-height fix:

In `@layer base`, change body `line-height` from `1.75` to `1.5` (matches design JSON `text-regular` line-height 24px / 16px = 1.5).

---

### Wave 2: Component Token Compliance (MDX + Layout components)

**Files:**
- `src/components/mdx/mdx-components.tsx`
- `src/components/mdx/DataTable.tsx`
- `src/components/layout/DocPage.tsx`

**Goal:** Fix non-compliant token usage and dead classes.

#### Task 2a: Fix DataTable tokens

In `src/components/mdx/DataTable.tsx`:
- Replace `bg-muted/50` → `bg-sp-gray-50`
- Replace `text-muted-foreground` → `text-sp-text-secondary dark:text-white/60`
- Replace bare `border` → `border-sp-border dark:border-white/10`

#### Task 2b: Fix link colors in mdx-components.tsx

In `src/components/mdx/mdx-components.tsx`, find the `a` element override:
- Change `text-sp-teal` → `text-sp-blue`
- Add `hover:text-sp-blue-2` (which now maps to Blue 700)
- Keep `dark:text-sp-teal` for dark mode links (teal on dark is more readable than blue)

#### Task 2c: Remove dead `prose-sp` class

In `src/components/layout/DocPage.tsx`:
- Remove `prose-sp` from the className string on the MDX content wrapper (around line 71). It's never defined.

#### Task 2d: Fix heading letter-spacing

In `src/components/mdx/mdx-components.tsx`:
- h1, h2, h3: add `tracking-tight` (negative letter spacing per design JSON)
- h6: change `tracking-wide` → `tracking-normal` (design JSON doesn't use positive tracking)

---

### Wave 3: Accessibility — Focus Rings

**Files:**
- `src/components/layout/DocHeader.tsx`
- `src/components/layout/DocSidebar.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/mdx/Collapsible.tsx`
- `src/components/search/SearchDialog.tsx`
- `src/components/theme/ThemeToggle.tsx`

**Goal:** Add consistent focus ring styling to all interactive elements.

**Pattern to apply:**
```
focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-teal focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0d1117]
```

Use `focus-visible` (not `focus`) so mouse clicks don't show the ring, only keyboard navigation.

#### Task 3a: DocHeader.tsx
- Hamburger button (the menu toggle)
- Search button / search trigger
- Theme toggle button (or delegate to ThemeToggle.tsx)

#### Task 3b: DocSidebar.tsx
- Section toggle buttons (the collapsible section headers)
- Navigation links (sidebar items)

#### Task 3c: MobileNav.tsx
- Close button
- Section toggle buttons
- Navigation links

#### Task 3d: Collapsible.tsx
- The `<button>` that toggles the collapsible content

#### Task 3e: SearchDialog.tsx
- Result item links (the clickable search results)
- Search input (verify it has focus ring)

#### Task 3f: ThemeToggle.tsx
- The toggle button

---

### Wave 4: Font Loading + Shadow Tokens

**Files:**
- `src/app/layout.tsx`
- `src/app/globals.css` (shadow variables only — no overlap with Wave 1 color tokens)

**Goal:** Switch to `next/font` and map shadow utilities.

#### Task 4a: Switch to next/font

In `src/app/layout.tsx`:
1. Remove the Google Fonts `<link>` tag
2. Import fonts via `next/font/google`:
```tsx
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-heading" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
```
3. Apply CSS variables to `<body>`:
```tsx
<body className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} antialiased`}>
```
4. In `globals.css` `@theme inline`, update font-family declarations to reference the CSS variables:
```css
--font-heading: var(--font-heading), ui-sans-serif, system-ui, sans-serif;
--font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-mono), ui-monospace, SFMono-Regular, monospace;
```

**IMPORTANT:** The `@theme inline` font declarations and `next/font` CSS variable names will collide. To resolve:
- Use different variable names in `next/font`: `--font-sans-nf`, `--font-heading-nf`, `--font-mono-nf`
- Then reference them in `@theme inline`:
```css
--font-heading: var(--font-heading-nf), "Poppins", ui-sans-serif, system-ui, sans-serif;
--font-sans: var(--font-sans-nf), "Inter", ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-mono-nf), "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
```
And in layout.tsx:
```tsx
const inter = Inter({ subsets: ["latin"], variable: "--font-sans-nf" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-heading-nf" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-nf" });
```

#### Task 4b: Shadow token mapping

**This modifies `globals.css` but ONLY the shadow section — no overlap with Wave 1 color work.**

The CSS already defines `--sp-shadow-box`, `--sp-shadow-search`, `--sp-shadow-input`. But components use generic Tailwind shadows. Add Tailwind utility mappings in `@theme inline`:

```css
--shadow-sp-box: 0 3px 8px -1px rgba(50, 50, 71, 0.05);
--shadow-sp-search: 0 0 1px rgba(12, 26, 75, 0.1), 0 4px 20px -2px rgba(50, 50, 71, 0.08);
--shadow-sp-input: 0 1px 2px rgba(50, 50, 71, 0.08), 0 0 1px rgba(50, 50, 71, 0.2);
--shadow-sp-hover: 0 8px 24px -4px rgba(22, 37, 76, 0.12);
```

Then in Card.tsx, SearchDialog.tsx, etc., replace `shadow-lg` → `shadow-sp-box`, `hover:shadow-lg` → `hover:shadow-sp-hover`.

**Files for shadow class replacement:**
- `src/components/mdx/Card.tsx` — `hover:shadow-lg` → `hover:shadow-sp-hover`
- `src/components/search/SearchDialog.tsx` — `shadow-2xl` → `shadow-sp-search`

---

## Wave Dependency Map

```
Wave 1 (globals.css colors)     ─┐
Wave 2 (component tokens)       ─┤── all independent, run in parallel
Wave 3 (focus rings)            ─┤
Wave 4 (fonts + shadows)        ─┘
```

**Conflict zone:** Waves 1 and 4 both touch `globals.css`. Wave 1 modifies the `@theme inline` color section and `:root`/`.dark` blocks. Wave 4 modifies fonts (in `@theme inline`) and adds shadow tokens. To avoid merge conflicts:
- Wave 1 agent should ONLY touch color-related lines
- Wave 4 agent should ONLY touch font-family lines and add shadow lines

**Alternative (safer):** Run Waves 1+4 sequentially, Waves 2+3 in parallel.

## Verification (after all waves)

```bash
npm run build          # Must succeed (43 pages)
npm run typecheck      # Must pass
npm run lint           # Must pass
npm run dev &          # Start dev server
node test-site.mjs     # Run Playwright screenshots — verify no FOUC, no hydration errors, visual sanity
```

## Files Modified Summary

| Wave | Files |
|---|---|
| 1 | `globals.css` |
| 2 | `mdx-components.tsx`, `DataTable.tsx`, `DocPage.tsx` |
| 3 | `DocHeader.tsx`, `DocSidebar.tsx`, `MobileNav.tsx`, `Collapsible.tsx`, `SearchDialog.tsx`, `ThemeToggle.tsx` |
| 4 | `layout.tsx`, `globals.css` (fonts/shadows only), `Card.tsx`, `SearchDialog.tsx` (shadow class only) |
