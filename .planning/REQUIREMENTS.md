# Requirements: Vibe Coding Framework

**Defined:** 2026-03-05
**Core Value:** Framework must be browsable as a real website for author and peer review

## v1 Requirements

### Repository Setup

- [x] **REPO-01**: Private GitHub repository created with project code pushed
- [x] **REPO-02**: `.gitignore` excludes `site/` build output and other generated files
- [x] **REPO-03**: `requirements.txt` pins MkDocs and Material theme versions for reproducible builds

### CI/CD

- [x] **CICD-01**: GitHub Actions workflow builds MkDocs site on push to main
- [x] **CICD-02**: GitHub Actions workflow deploys built site to GitHub Pages automatically
- [x] **CICD-03**: Build failure prevents deployment (workflow fails visibly)

### Hosting

- [x] **HOST-01**: Site is accessible at GitHub Pages URL (e.g., `username.github.io/repo-name`)
- [x] **HOST-02**: Site is private — only repository collaborators can view it

### Quality

- [x] **QUAL-01**: Branch protection on main requires CI to pass before merge

## v2 Requirements

### Access & Sharing

- **SHARE-01**: Custom domain for the site
- **SHARE-02**: Invite-by-email for non-GitHub users

### Content

- **CONT-01**: Content edits based on peer review feedback
- **CONT-02**: Additional build path documentation

## Out of Scope

| Feature | Reason |
|---------|--------|
| Content editing/rewriting | This milestone is deployment only — content review comes after hosting |
| Public access | Must remain private for internal review |
| Custom domain | Not needed for initial review phase |
| Authentication beyond GitHub | GitHub repo permissions sufficient for now |
| Analytics/tracking | Not needed for review phase |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| REPO-01 | Phase 1 | Complete |
| REPO-02 | Phase 1 | Complete |
| REPO-03 | Phase 1 | Complete |
| CICD-01 | Phase 2 | Complete |
| CICD-02 | Phase 2 | Complete |
| CICD-03 | Phase 2 | Complete |
| HOST-01 | Phase 2 | Complete |
| HOST-02 | Phase 2 | Complete |
| QUAL-01 | Phase 2 | Complete |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0

---
*Requirements defined: 2026-03-05*
*Last updated: 2026-03-05 after roadmap creation*
