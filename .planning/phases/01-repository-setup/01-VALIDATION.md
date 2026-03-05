---
phase: 1
slug: repository-setup
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-03-05
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | CLI verification (gh, git, pip) |
| **Config file** | none — infrastructure phase |
| **Quick run command** | `gh repo view --json isPrivate,name` |
| **Full suite command** | `gh repo view --json isPrivate,name && git remote -v && test -f requirements.txt && pip install -r requirements.txt --dry-run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `gh repo view --json isPrivate,name`
- **After every plan wave:** Run full suite command
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | REPO-01 | cli | `gh repo view --json isPrivate,name` | N/A | ⬜ pending |
| 1-01-02 | 01 | 1 | REPO-02 | cli | `git ls-files site/ \| wc -l` (must be 0) | N/A | ⬜ pending |
| 1-01-03 | 01 | 1 | REPO-03 | cli | `pip install -r requirements.txt --dry-run` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — this is a setup phase with CLI-based verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Code visible in GitHub UI | REPO-01 | Requires browser verification | Open repo URL in browser, confirm files visible |
| Repo set to private | REPO-02 | GitHub setting, verified via API | `gh repo view --json isPrivate` returns `true` |

---

## Validation Sign-Off

- [x] All tasks have automated verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
