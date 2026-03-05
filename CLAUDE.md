# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Vibe Coding Framework (VCF)** — a documentation-only framework that guides non-technical builders through AI-powered tool development using risk-appropriate processes. Content is organized into build paths (Green/Yellow/Orange/Red) with progressive disclosure.

This is **not an application**. There is no backend, no database, no application code. All content is Markdown rendered as a static site.

## Tech Stack

- **MkDocs 1.6.1** + **Material for MkDocs 9.7.4** (static site generator)
- **Python 3.x** runtime (for MkDocs only)
- **GitHub Actions** CI/CD → **GitHub Pages** deployment
- Dependencies pinned in `requirements.txt`

## Build & Development Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Local development server (hot reload)
mkdocs serve

# Build static site (outputs to /site/, gitignored)
mkdocs build

# Deploy to GitHub Pages (CI does this automatically)
mkdocs gh-deploy --force
```

## CI/CD Pipeline

Push to `main` triggers `.github/workflows/ci.yml`:
1. Checkout → Setup Python 3.x → Cache → Install deps → `mkdocs gh-deploy --force`
2. Branch protection requires the `deploy` status check to pass before merge.

Live site: https://vedantggwp.github.io/SP-VibeFrame/

## Content Architecture

All source content lives in `docs/`. The site navigation is defined in `mkdocs.yml` under `nav:`.

**7-layer progressive framework:**
1. **Intake** (`docs/intake/`) — 5-question classifier → assigns build path
2. **Standards** (`docs/standards/`) — Quality, Security, Branding, Prompts (universal + path-specific)
3. **Build Guides** (`docs/build-guides/`) — Step-by-step walkthroughs per path
4. **Checklists** (`docs/checklists/`) — Binary verification per path
5. **Forms** (`docs/forms/`) — Project Brief, Prompt Spec, Review Request, Incident Report, Build Log
6. **Guides** (`docs/guides/`) — First Build, Tool Selection, Escalation, Glossary
7. **Client Config** (`docs/client-config/`) — Organization-specific customization templates

**Content pattern:** Uses `<details>` collapsibles for WHY/HOW TO sections (progressive disclosure).

## Planning & Audit Trail

`.planning/` contains the full project audit trail:
- `PROJECT.md` — Project definition
- `REQUIREMENTS.md` — v1 requirements with traceability matrix
- `ROADMAP.md` — Phase planning
- `STATE.md` — Current state, decisions, velocity
- `phases/` — Per-phase PLAN, RESEARCH, VALIDATION, VERIFICATION, SUMMARY docs
- `codebase/` — Architecture analysis docs

## Key Constraints

- **No tests** — This is documentation, not code. Quality is verified via manual checklists in `.planning/phases/*/VERIFICATION.md`.
- **Site is publicly accessible** — GitHub Pages on personal Pro accounts cannot restrict access. Source repo is private, but the rendered site is public. Accepted as v1 trade-off.
- **Custom theme** — `docs/stylesheets/extra.css` overrides Material theme with navy/teal design language (design tokens from Figma). Covers colors, admonitions, code blocks, tables, sidebar, typography, and dark mode.
- **Markdown extensions** — Content uses admonitions, tabbed content, superfences, emoji, and details (configured in `mkdocs.yml` under `markdown_extensions`).
