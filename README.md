# Vibe Coding Framework (VCF)

A documentation-only framework that guides non-technical builders through AI-powered tool development using risk-appropriate processes.

**[Live Site →](https://sp-vibe-frame.vercel.app)**

## What is VCF?

VCF helps you build AI-powered tools — quickly, safely, and consistently. Answer 5 questions about your project, get assigned a build path (Green/Yellow/Orange/Red), and follow step-by-step guidance tailored to your risk level.

No backend, no database. All content is MDX rendered as a static site.

### Framework layers

1. **Intake** — 5-question classifier that assigns your build path
2. **Standards** — Quality, security, branding, and prompt guidelines
3. **Build Guides** — Step-by-step walkthroughs for each path
4. **Checklists** — Binary verification before going live
5. **Forms & Templates** — Project briefs, reviews, incidents, build logs
6. **Guides** — First build walkthrough, tool selection, escalation, glossary
7. **Client Config** — Organization-specific customization templates

## Tech Stack

- **Next.js 16** (App Router, SSG)
- **Tailwind CSS v4** with custom design tokens
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

# Production build (includes search index)
npm run build

# Type check
npm run typecheck

# Lint
npm run lint
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── layout/       # DocHeader, DocSidebar, DocPage, etc.
│   ├── mdx/          # Collapsible, Admonition, CardGrid, StepCard, etc.
│   ├── search/       # SearchDialog (Cmd+K)
│   └── theme/        # ThemeProvider, ThemeToggle
├── content/          # All MDX source content
│   ├── intake/
│   ├── standards/
│   ├── build-guides/
│   ├── checklists/
│   ├── forms/
│   ├── guides/
│   └── client-config/
├── lib/              # Navigation config, content utilities
└── types/            # TypeScript type definitions
```

## License

All rights reserved.
