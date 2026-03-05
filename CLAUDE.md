# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Vibe Coding Framework (VCF)** — a documentation-only framework that guides non-technical builders through AI-powered tool development using risk-appropriate processes. Content is organized into build paths (Green/Yellow/Orange/Red) with progressive disclosure.

This is **not an application**. There is no backend, no database. All content is MDX rendered as a static site.

## Tech Stack

- **Next.js 16** (App Router, static export via `output: 'export'`)
- **Tailwind CSS v4** with VCF design tokens
- **next-mdx-remote** for rendering MDX content
- **shiki** for code syntax highlighting
- **Fuse.js** for client-side search
- **lucide-react** for icons
- **TypeScript**
- **Vercel** deployment

## Build & Development Commands

```bash
# Install dependencies
npm install

# Local development server (hot reload)
npm run dev

# Build search index + static site (outputs to /out/, gitignored)
npm run build

# Type checking
npm run typecheck

# Lint
npm run lint
```

## Content Architecture

All source content lives in `src/content/` as `.mdx` files. Navigation is defined in `src/lib/navigation.ts`.

**7-layer progressive framework:**
1. **Intake** (`src/content/intake/`) — 5-question classifier → assigns build path
2. **Standards** (`src/content/standards/`) — Quality, Security, Branding, Prompts
3. **Build Guides** (`src/content/build-guides/`) — Step-by-step walkthroughs per path
4. **Checklists** (`src/content/checklists/`) — Binary verification per path
5. **Forms** (`src/content/forms/`) — Project Brief, Prompt Spec, Review Request, Incident Report, Build Log
6. **Guides** (`src/content/guides/`) — First Build, Tool Selection, Escalation, Glossary
7. **Client Config** (`src/content/client-config/`) — Organization-specific customization templates

**Content components:** MDX files use `<Collapsible>`, `<ChecklistItem>`, `<CardGrid>`, `<Card>`, `<Admonition>` components for interactive content.

## Component Architecture

- `src/components/layout/` — DocHeader, DocSidebar, DocFooter, DocBreadcrumbs, DocTableOfContents, MobileNav, DocPage
- `src/components/mdx/` — Collapsible, Admonition, CardGrid, Card, Checklist, ChecklistItem, CodeBlock, DataTable, HeroBadge, StepCard, mdx-components
- `src/components/search/` — SearchDialog (Cmd+K)
- `src/components/theme/` — ThemeProvider (class strategy, localStorage), ThemeToggle

## Design Tokens

Navy/teal theme defined as Tailwind CSS v4 `@theme` tokens in `src/app/globals.css`:
- `vcf-navy` (#16254C), `vcf-teal` (#0BB3B7), `vcf-blue` (#446DF6)
- Dark mode uses CSS variables with `.dark` class strategy

## Planning & Audit Trail

`.planning/` contains the full project audit trail:
- `PROJECT.md` — Project definition
- `REQUIREMENTS.md` — v1 requirements with traceability matrix
- `ROADMAP.md` — Phase planning
- `STATE.md` — Current state, decisions, velocity
- `phases/` — Per-phase PLAN, RESEARCH, VALIDATION, VERIFICATION, SUMMARY docs
- `codebase/` — Architecture analysis docs

## Key Constraints

- **No tests** — This is documentation, not code. Quality is verified via manual checklists.
- **Custom theme** — Navy/teal design language from Figma. Design tokens in `globals.css`, component styling via Tailwind.
- **Static export** — `output: 'export'` in next.config.ts. No server-side features (API routes, middleware, etc.).
