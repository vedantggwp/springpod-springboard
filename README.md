# SpringBoard

Springpod's internal AI knowledge base — standards, guides, and tools for building with AI.

## What is SpringBoard?

SpringBoard helps Springpod teams build AI-powered tools — quickly, safely, and consistently. Answer 5 questions about your project, get assigned a build path (Green/Yellow/Orange/Red), and follow step-by-step guidance tailored to your risk level.

No backend, no database. All content is MDX rendered as a static site.

### Framework layers

1. **Intake** — 5-question classifier that assigns your build path
2. **Standards** — Quality, security, branding, safeguarding, and prompt guidelines
3. **Build Guides** — Step-by-step walkthroughs for each path
4. **Checklists** — Binary verification before going live
5. **Forms & Templates** — Project briefs, reviews, incidents, build logs
6. **Guides** — First build walkthrough, tool selection, escalation, glossary
7. **Client Config** — Organization-specific customization templates

## Tech Stack

- **Next.js 16** (App Router, SSG)
- **Tailwind CSS v4** with Springpod design tokens (`sp-*`)
- **next-mdx-remote** + **remark-gfm** for MDX rendering
- **shiki** for syntax highlighting
- **Fuse.js** for client-side search (Cmd+K)
- **TypeScript**
- **Vercel** deployment

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build (includes search index + content bundles)
npm run build

# Type check
npm run typecheck

# Lint
npm run lint

# E2E tests (149 tests, desktop + mobile)
npx playwright test
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages + globals.css
├── components/
│   ├── layout/       # DocHeader, DocSidebar, DocPage, NavSection, etc.
│   ├── mdx/          # Collapsible, Admonition, CardGrid, StepCard, variant-styles, etc.
│   ├── feedback/     # FeedbackWidget (per-page vote + comment)
│   ├── search/       # SearchDialog (Cmd+K, Fuse.js)
│   └── theme/        # ThemeProvider, ThemeToggle (3-layer dark mode)
├── content/          # All MDX source content (40 pages)
│   ├── intake/
│   ├── standards/
│   ├── build-guides/
│   ├── checklists/
│   ├── forms/
│   ├── guides/
│   ├── client-config/
│   ├── roles/
│   ├── updates/
│   ├── design-system/
│   └── reference/
├── lib/              # Navigation config, content utilities
└── types/            # TypeScript type definitions
e2e/                  # Playwright E2E tests (7 spec files)
scripts/              # Build scripts (search index, content bundles, dates)
```

## License

All rights reserved.
