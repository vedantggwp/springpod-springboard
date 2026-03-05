---
phase: 02
slug: ci-cd-and-live-hosting
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-05
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no application code; all validation is shell smoke checks via GitHub API, git refs, and HTTP endpoints |
| **Config file** | N/A |
| **Quick run command** | `gh run list --workflow ci.yml --limit 1 --json status,conclusion --jq '.[0]'` |
| **Full suite command** | Run all smoke checks in Per-Task Verification Map below |
| **Estimated runtime** | ~30 seconds (API calls + curl) |

---

## Sampling Rate

- **After every task commit:** Run `gh run list --workflow ci.yml --limit 1 --json conclusion --jq '.[0].conclusion'`
- **After every plan wave:** Run full suite (all smoke checks)
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | CICD-01, CICD-02, CICD-03 | smoke | `gh run list --workflow ci.yml --limit 1 --json event,conclusion --jq '.[0]'` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | HOST-01 | smoke | `curl -s -o /dev/null -w "%{http_code}" https://vedantggwp.github.io/SP-VibeFrame/` (must be 200) | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | HOST-02 | smoke | `curl -s -o /dev/null -w "%{http_code}" https://vedantggwp.github.io/SP-VibeFrame/` (documents public visibility) | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | QUAL-01 | smoke | `gh api repos/vedantggwp/SP-VibeFrame/branches/main/protection --jq '.required_status_checks.contexts'` (must contain "deploy") | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.github/workflows/ci.yml` — CI/CD workflow (CICD-01, CICD-02, CICD-03)
- [ ] GitHub Pages enabled in repo settings — HOST-01 (after first deploy)
- [ ] Branch protection rule configured — QUAL-01 (after first successful CI run)

*No test framework installation needed — all validation is shell smoke checks.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Broken build fails visibly and does not update live site | CICD-03 | Requires intentionally breaking mkdocs.yml, pushing, observing failure, then restoring | 1. Break mkdocs.yml (add invalid YAML) 2. Push to main 3. Verify CI fails in Actions tab 4. Verify live site still shows old content 5. Restore mkdocs.yml and push |
| Site renders MkDocs Material theme correctly | HOST-01 | Visual verification required | Open Pages URL in browser, verify Material theme renders with navigation, search, and styling |
| Unauthenticated access response | HOST-02 | Platform limitation — expected to return 200 (public) on personal GitHub Pro | Open Pages URL in incognito browser (not logged in to GitHub). Document whether 200 (public) or 403 (private). |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
