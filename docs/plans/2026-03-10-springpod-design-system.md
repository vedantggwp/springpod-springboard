# Springpod Design System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the generic VCF theme with the full Springpod design system, add design system reference pages to SpringBoard, and generate Stitch reference screens.

**Architecture:** Three layers: (1) Update CSS tokens and component colors to match Springpod's live site design system, (2) Add `/design-system` pages to SpringBoard showing live-rendered tokens and components, (3) Generate Stitch reference screens for visual examples. All hardcoded hex colors in 24 component files get replaced with Tailwind token classes.

**Tech Stack:** Tailwind CSS v4 `@theme` tokens, Next.js 16 MDX, Google Fonts (Poppins + Inter), Stitch MCP for reference screens.

---

## Task 1: Update CSS Design Tokens

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Replace VCF tokens with Springpod tokens**

Rename all `vcf-*` tokens to `sp-*`. Add missing tokens from the live Springpod site extraction:

```css
@theme inline {
  /* ── Springpod Brand Colors ──────────────────────────── */
  --color-sp-teal: #0BB3B7;
  --color-sp-teal-dark: #0A8F93;
  --color-sp-teal-light: #9CF6F6;
  --color-sp-navy: #16254C;
  --color-sp-navy-light: #2D3B5E;
  --color-sp-navy-dark: #0f1a38;
  --color-sp-navy-hover: #0F1A35;
  --color-sp-blue: #446DF6;
  --color-sp-blue-2: #1C3DAE;

  /* ── Secondary Palette ──────────────────────────────── */
  --color-sp-orange: #F7936F;
  --color-sp-orange-dark: #D46A51;
  --color-sp-red: #FF475A;
  --color-sp-red-dark: #C80B1E;
  --color-sp-purple: #7F7EFF;
  --color-sp-focus: #4D65FF;

  /* ── Neutrals ───────────────────────────────────────── */
  --color-sp-gray: #E4ECF7;
  --color-sp-gray-light: #EEEEEF;
  --color-sp-gray-50: #F6F7F9;
  --color-sp-gray-100: #F7FAFC;
  --color-sp-gray-200: #EDF2F7;
  --color-sp-gray-300: #E2E8F0;
  --color-sp-gray-500: #A0AEC0;
  --color-sp-gray-600: #718096;
  --color-sp-gray-700: #4A5568;
  --color-sp-gray-800: #2D3748;
  --color-sp-text-secondary: #5C6682;
  --color-sp-text-muted: #8B92A6;
  --color-sp-border: #B9BEC9;
  --color-sp-surface: #E9E9ED;

  /* ── Status Colors ──────────────────────────────────── */
  --color-sp-success-light: #BFF3A5;
  --color-sp-success-dark: #357E10;
  --color-sp-warning-light: #FEE3AF;
  --color-sp-warning-dark: #8C5E03;
  --color-sp-info-light: #C2E1FF;
  --color-sp-info-dark: #004A8F;
  --color-sp-error-light: #f8b5bb;
  --color-sp-error-dark: #820D19;

  /* ── Typography ─────────────────────────────────────── */
  --font-heading: "Poppins", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  /* (keep existing shadcn semantic tokens and radius) */
}
```

**Step 2: Update `:root` layout tokens**

Rename `--vcf-*` to `--sp-*` in both `:root` and `.dark` blocks.

**Step 3: Add Springpod gradient tokens**

```css
:root {
  --sp-gradient-teal: linear-gradient(225deg, #40D5D5 0%, #09797B 100%);
  --sp-gradient-blue: linear-gradient(224.47deg, #A1B2EB 8.18%, #446DF6 95.84%);
  --sp-gradient-orange: linear-gradient(225deg, #FFEF5E 0%, #F7936F 100%);
  --sp-gradient-red: linear-gradient(225deg, #FA919B 0%, #C80B1E 100%);
}
```

**Step 4: Add Springpod shadow tokens**

```css
:root {
  --sp-shadow: 0 3px 8px -1px rgba(50, 50, 71, 0.05);
  --sp-shadow-input: 0 1px 2px rgba(50, 50, 71, 0.08), 0 0 1px rgba(50, 50, 71, 0.2);
  --sp-shadow-search: 0 0 1px rgba(12, 26, 75, 0.1), 0 4px 20px -2px rgba(50, 50, 71, 0.08);
  --sp-shadow-hover: 0 2px 2px rgba(2, 3, 3, 0.03), 0 3px 1px rgba(2, 3, 3, 0.02), 0 1px 5px rgba(2, 3, 3, 0.04);
}
```

**Step 5: Rename `.vcf-gradient-divider` to `.sp-gradient-divider`**

**Step 6: Verify build**

Run: `npm run build`
Expected: Build passes (no references to old tokens yet — components still use hardcoded hex)

**Step 7: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: replace VCF tokens with full Springpod design system"
```

---

## Task 2: Add Poppins Font

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add Poppins to Google Fonts link**

Change the font link to include Poppins:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&family=Poppins:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

**Step 2: Update metadata**

Change title from "Vibe Coding Framework" to "SpringBoard" and template from "VCF" to "SpringBoard":

```tsx
export const metadata: Metadata = {
  title: {
    default: "SpringBoard",
    template: "%s | SpringBoard",
  },
  description:
    "Springpod's AI knowledge base — standards, guides, and tools for building with AI.",
};
```

**Step 3: Replace `var(--vcf-bg)` with `var(--sp-bg)` in body style**

**Step 4: Add heading font utility to `globals.css` base layer**

```css
@layer base {
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
  }
}
```

**Step 5: Verify build**

Run: `npm run build`
Expected: Build passes, headings use Poppins

**Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: add Poppins heading font and rename to SpringBoard"
```

---

## Task 3: Update Header Branding

**Files:**
- Modify: `src/components/layout/DocHeader.tsx`

**Step 1: Replace VCF logo with SpringBoard branding**

Change the logo from "V" to "SP" and update the text from "Documentation" to "SpringBoard":

```tsx
{/* Logo */}
<Link href="/" className="flex items-center gap-2.5">
  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sp-navy to-sp-teal">
    <span className="text-[10px] font-bold text-white">SP</span>
  </div>
  <span
    className="bg-gradient-to-r from-sp-navy to-sp-teal bg-clip-text
      font-heading text-lg font-bold tracking-tight text-transparent
      dark:from-white dark:to-sp-teal"
  >
    SpringBoard
  </span>
</Link>
```

**Step 2: Replace all hardcoded hex colors with Tailwind token classes**

Throughout DocHeader.tsx, replace:
- `[#16254C]` → `sp-navy`
- `[#0BB3B7]` → `sp-teal`
- `[#5C6682]` → `sp-text-secondary`
- `[#8B92A6]` → `sp-text-muted`
- `[#E9E9ED]` → `sp-surface`
- `[#B9BEC9]` → `sp-border`

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/layout/DocHeader.tsx
git commit -m "feat: update header to SpringBoard branding with token classes"
```

---

## Task 4: Update Sidebar with v2 Badges

**Files:**
- Modify: `src/components/layout/DocSidebar.tsx`
- Modify: `src/lib/navigation.ts`

**Step 1: Add `isNew` flag to navigation type**

In `src/types/navigation.ts`, add optional `isNew?: boolean` to the nav item type.

**Step 2: Mark v2 pages as new in navigation.ts**

Add `isNew: true` to:
- Safeguarding & Under-18s
- Data Workflows
- Tooling Strategy (renamed from Tool Selection)
- Updates Feed

**Step 3: Render NEW badge in DocSidebar.tsx**

After the item title text, add:

```tsx
{item.isNew && (
  <span className="ml-auto rounded-full bg-sp-teal px-1.5 py-0.5 text-[10px] font-semibold text-white">
    NEW
  </span>
)}
```

**Step 4: Replace hardcoded hex colors in DocSidebar.tsx with token classes**

Same mapping as Task 3.

**Step 5: Add "Updates" and "Design System" icons to SECTION_ICONS map**

```tsx
Updates: Bell,
"Design System": Palette,
```

Import `Bell` and `Palette` from lucide-react.

**Step 6: Verify build**

Run: `npm run build`

**Step 7: Commit**

```bash
git add src/components/layout/DocSidebar.tsx src/lib/navigation.ts src/types/navigation.ts
git commit -m "feat: add NEW badges for v2 pages and update sidebar tokens"
```

---

## Task 5: Update All MDX Components to Use Token Classes

**Files:**
- Modify: `src/components/mdx/Admonition.tsx`
- Modify: `src/components/mdx/Card.tsx`
- Modify: `src/components/mdx/ChecklistItem.tsx`
- Modify: `src/components/mdx/Collapsible.tsx`
- Modify: `src/components/mdx/DecisionFlow.tsx`
- Modify: `src/components/mdx/HeroBadge.tsx`
- Modify: `src/components/mdx/StepCard.tsx`
- Modify: `src/components/mdx/mdx-components.tsx`

**Step 1: Replace hardcoded hex colors with Tailwind token classes**

Across all 8 files, apply this mapping:
- `[#16254C]` → `sp-navy`
- `[#2D3B5E]` → `sp-navy-light`
- `[#0BB3B7]` → `sp-teal`
- `[#9CF6F6]` → `sp-teal-light`
- `[#446DF6]` → `sp-blue`
- `[#FF475A]` → `sp-red`
- `[#5C6682]` → `sp-text-secondary`
- `[#8B92A6]` → `sp-text-muted`
- `[#B9BEC9]` → `sp-border`
- `[#E9E9ED]` → `sp-surface`
- `[#10B981]` → keep (this is Tailwind's emerald-500, used for "how" variant — fine as-is)

**Step 2: Replace hardcoded hex in layout components**

Same mapping applied to:
- `src/components/layout/DocBreadcrumbs.tsx`
- `src/components/layout/DocFooter.tsx`
- `src/components/layout/DocTableOfContents.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/search/SearchDialog.tsx`
- `src/components/theme/ThemeToggle.tsx`

**Step 3: Update `src/app/layout.tsx` body style**

`var(--vcf-bg)` → `var(--sp-bg)`

**Step 4: Verify build**

Run: `npm run build`
Expected: Build passes with 35 pages, all using token classes

**Step 5: Commit**

```bash
git add src/components/ src/app/layout.tsx
git commit -m "feat: replace all hardcoded colors with Springpod token classes"
```

---

## Task 6: Create Design System Color Palette Page

**Files:**
- Create: `src/content/design-system/colors.mdx`
- Modify: `src/lib/navigation.ts`

**Step 1: Add Design System section to navigation**

```tsx
{
  title: "Design System",
  items: [
    { title: "Color Palette", href: "/design-system/colors" },
    { title: "Typography", href: "/design-system/typography" },
    { title: "Components", href: "/design-system/components" },
  ],
},
```

Place after "Updates" section, before "Reference".

**Step 2: Create the colors MDX page**

Content structure:
- Primary colors (Teal, Navy, Blue) — show hex, usage, light/dark variants
- Secondary colors (Orange, Red, Purple) — show hex, usage
- Neutrals (gray scale) — show hex, usage
- Status colors (success, warning, info, error) — show hex, usage
- Gradients — show the 4 branded gradients with use cases
- Dark mode — explain how colors adapt

Use `<CardGrid>` to display color swatches. Each card shows:
- Color swatch (via inline style or bg class)
- Name, hex value, CSS variable name
- Usage guidance

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/content/design-system/colors.mdx src/lib/navigation.ts
git commit -m "feat: add design system color palette page"
```

---

## Task 7: Create Design System Typography Page

**Files:**
- Create: `src/content/design-system/typography.mdx`

**Step 1: Create typography MDX page**

Content structure:
- Font families — Poppins (headings), Inter (body), JetBrains Mono (code)
- Type scale — h1 through h6 with rendered examples
- Body text sizes — xlarge, large, base, small with rendered examples
- Font weights — 400, 500, 600, 700 with rendered examples
- Line heights — heading (1.15) vs body (1.5)
- Usage guidelines — when to use each font, weight, and size

Show live-rendered examples using inline HTML/MDX so the page IS the specimen.

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/content/design-system/typography.mdx
git commit -m "feat: add design system typography page"
```

---

## Task 8: Create Design System Components Page

**Files:**
- Create: `src/content/design-system/components.mdx`

**Step 1: Create components MDX page**

Show every MDX component available in SpringBoard with live examples:

- **Admonition** — all 6 types (info, note, warning, danger, tip, success)
- **Collapsible** — all 6 variants (info, warning, tip, example, why, how)
- **Card + CardGrid** — with and without icons, links
- **ChecklistItem** — checked and unchecked states
- **StepCard** — numbered steps
- **DecisionFlow** — decision tree example
- **HeroBadge** — version badge
- **DataTable** — if exists
- **Code blocks** — syntax highlighted examples

Each component section includes:
- When to use it
- Live rendered example
- MDX syntax to copy

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/content/design-system/components.mdx
git commit -m "feat: add design system components gallery page"
```

---

## Task 9: Generate Stitch Reference Screens

**Files:**
- None (Stitch is external)

**Step 1: Create Stitch project**

Use `mcp__stitch__create_project` with title "Springpod SpringBoard Design Kit"

**Step 2: Generate 4 reference screens**

Use `mcp__stitch__generate_screen_from_text` for each:

1. **Dashboard** — "A Springpod-branded internal dashboard showing employer engagement metrics. Use colors: Teal #0BB3B7 primary, Navy #16254C text, Blue #446DF6 accents. Font: Poppins for headings, Inter for body. Cards with rounded corners (12px), subtle shadows. Include metric cards, a line chart, and a data table."

2. **Form** — "A Springpod-branded form for submitting a project brief. Teal #0BB3B7 primary buttons with navy text, navy headings in Poppins font, Inter body text. Light gray #E4ECF7 input backgrounds, 12px border radius. Include text inputs, dropdowns, radio buttons, and a submit button."

3. **Card Layout** — "A Springpod-branded page showing a grid of experience cards (virtual work experience programmes). Each card has an employer logo area, programme title in Poppins, description in Inter, and a teal CTA button. Navy #16254C headings, white card backgrounds with #B9BEC9 borders."

4. **Knowledge Base Page** — "A Springpod-branded documentation page with sidebar navigation, breadcrumbs, a heading in Poppins font, body text in Inter, collapsible sections with teal left borders, and a table of contents. Navy #16254C primary text, teal #0BB3B7 accents, white content area on light gray #E4ECF7 background."

**Step 3: Review and save URLs/screenshots**

Save Stitch project URL to `docs/DESIGN-KIT.md` for team reference.

**Step 4: Commit**

```bash
git add docs/DESIGN-KIT.md
git commit -m "docs: add Stitch design kit reference"
```

---

## Task 10: Final Verification

**Step 1: Full build**

Run: `npm run build`
Expected: All pages pass (should be 38+ pages now — 35 existing + 3 design system)

**Step 2: Visual check**

Run: `npm run dev`
Verify in browser:
- [ ] Headings use Poppins font
- [ ] Header says "SpringBoard" with "SP" logo
- [ ] v2 pages show NEW badge in sidebar
- [ ] Color palette page renders correctly
- [ ] Typography page shows live specimens
- [ ] Components page shows all component types
- [ ] Dark mode works correctly
- [ ] No hardcoded VCF references remain

**Step 3: Search for any remaining VCF references**

Run: `grep -r "vcf" src/ --include="*.tsx" --include="*.ts" --include="*.css" -l`
Expected: No results (all renamed to sp-)

Run: `grep -r "Vibe Coding Framework" src/ -l`
Expected: No results

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Springpod design system — tokens, fonts, branding, reference pages"
```

---

## Summary

| Task | What | Files touched |
|------|------|---------------|
| 1 | CSS token system (VCF→SP, add missing tokens) | globals.css |
| 2 | Poppins font + metadata rename | layout.tsx, globals.css |
| 3 | Header branding (SpringBoard logo) | DocHeader.tsx |
| 4 | Sidebar v2 badges + token classes | DocSidebar.tsx, navigation.ts, types |
| 5 | All components → token classes | 14 component files |
| 6 | Design system: Colors page | colors.mdx, navigation.ts |
| 7 | Design system: Typography page | typography.mdx |
| 8 | Design system: Components page | components.mdx |
| 9 | Stitch reference screens | External + DESIGN-KIT.md |
| 10 | Final verification | — |
