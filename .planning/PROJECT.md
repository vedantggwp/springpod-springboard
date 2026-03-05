# Vibe Coding Framework (VCF)

## What This Is

A structured documentation framework for building AI-powered tools — quickly, safely, and consistently. Built with MkDocs + Material theme, it guides non-developers through risk-appropriate build paths (Green/Yellow/Orange/Red) with intake forms, step-by-step guides, checklists, and templates. The immediate goal is to deploy it as a private website on GitHub Pages for peer review and self-review.

## Core Value

The framework must be browsable as a real website so the author and peers can review the content as it would be presented to users — not as raw markdown files.

## Requirements

### Validated

- ✓ Four-tier build path system (Green/Yellow/Orange/Red) — existing
- ✓ 5-question project intake form — existing
- ✓ Step-by-step build guides for all 4 paths — existing
- ✓ Verification checklists for all 4 paths — existing
- ✓ Standards documents (Quality, Security, Branding, Prompts) — existing
- ✓ Forms and templates (Project Brief, Prompt Spec, Review Request, Incident Report, Build Log) — existing
- ✓ Onboarding guides (First Build, Tool Selection, Escalation, Glossary) — existing
- ✓ Client configuration templates (Company Context, Approved Tools, Roles, Prompt Library) — existing
- ✓ MkDocs Material theme with light/dark mode, search, navigation — existing
- ✓ Progressive disclosure pattern (WHY/HOW TO CHECK collapsibles) — existing

### Active

- [ ] Deploy as private GitHub Pages site
- [ ] GitHub Actions CI/CD for automatic build and deploy on push
- [ ] Private repository with restricted access for peer reviewers

### Out of Scope

- Custom domain — not needed for initial review phase
- Public access — site must be private (GitHub Pro used for private Pages)
- Content editing/rewriting — this milestone is about hosting, not content changes
- Backend or API — pure static site deployment

## Context

- MkDocs builds successfully (`mkdocs build --strict` passes in 0.27s)
- All 29 documentation files are complete and linked in `mkdocs.yml` nav
- Material for MkDocs theme is configured with navigation, search, dark/light mode
- No `requirements.txt` exists yet (MkDocs + Material installed globally via pip)
- No GitHub remote configured yet — repo is local-only
- User has GitHub Pro/Team plan, enabling private GitHub Pages

## Constraints

- **Hosting**: GitHub Pages (private) — user's chosen platform
- **Access**: Restricted to invited collaborators only
- **Stack**: MkDocs + Material theme — already configured and working
- **No content changes**: This milestone is deployment only

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| GitHub Pages over Vercel/Netlify | User preference, integrated with GitHub, free with Pro plan | — Pending |
| Private access via GitHub repo permissions | Simplest approach with GitHub Pro — repo collaborators can view Pages | — Pending |
| GitHub Actions for CI/CD | Standard MkDocs deployment pattern, auto-deploys on push to main | — Pending |

---
*Last updated: 2026-03-05 after initialization*
