# Roadmap: Vibe Coding Framework

## Overview

All content is complete. This milestone takes the existing MkDocs site from a local directory to a private, auto-deploying GitHub Pages website. Phase 1 establishes the GitHub repository with reproducible build configuration. Phase 2 wires up CI/CD, deploys the site, and locks down access — delivering a reviewable URL to collaborators.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Repository Setup** - Create private GitHub repo, push code, pin dependencies
- [ ] **Phase 2: CI/CD and Live Hosting** - GitHub Actions pipeline, Pages deployment, branch protection, verified private access

## Phase Details

### Phase 1: Repository Setup
**Goal**: The project code lives on GitHub in a private repository with reproducible build configuration
**Depends on**: Nothing (first phase)
**Requirements**: REPO-01, REPO-02, REPO-03
**Success Criteria** (what must be TRUE):
  1. The repository exists on GitHub and is set to private
  2. Local code is pushed and visible in the GitHub UI
  3. `site/` directory does not appear in the repository (excluded by .gitignore)
  4. `requirements.txt` exists and pins MkDocs and Material theme to specific versions so any fresh `pip install -r requirements.txt` produces an identical build environment
**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md — Create private GitHub repo, pin dependencies in requirements.txt, push all code

### Phase 2: CI/CD and Live Hosting
**Goal**: Every push to main automatically builds and deploys the site; the live URL is accessible only to invited collaborators
**Depends on**: Phase 1
**Requirements**: CICD-01, CICD-02, CICD-03, HOST-01, HOST-02, QUAL-01
**Success Criteria** (what must be TRUE):
  1. Pushing a commit to main triggers a GitHub Actions workflow that builds and deploys the site without manual intervention
  2. A broken build (e.g., bad mkdocs.yml) causes the workflow to fail visibly in GitHub Actions and does not update the live site
  3. The site is reachable at the GitHub Pages URL (e.g., `username.github.io/repo-name`) and renders the MkDocs Material theme correctly
  4. An unauthenticated browser session receives an access-denied response — the site is not publicly visible
  5. Branch protection on main prevents merging a PR if the CI workflow has not passed
**Plans**: TBD

Plans:
- [ ] 02-01: Create GitHub Actions workflow (build + deploy to gh-pages branch), enable GitHub Pages in repo settings
- [ ] 02-02: Verify live URL, confirm private access, configure branch protection rule on main

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Repository Setup | 0/1 | Not started | - |
| 2. CI/CD and Live Hosting | 0/2 | Not started | - |
