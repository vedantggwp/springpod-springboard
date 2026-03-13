# Content Audit Design — SpringBoard Knowledge Base

**Date:** 2026-03-10
**Type:** Flag-only audit (no fixes)
**Version:** v1

## Goal

Verify all SpringBoard content for:
1. **Factual accuracy** — technical claims, regulations, tool capabilities still correct
2. **Springpod alignment** — content reflects real Springpod operations, team, tools
3. **Internal consistency** — no cross-file contradictions

## Audit Categories

| Category | Files | Risk | Audit Method |
|----------|-------|------|-------------|
| Regulatory/Legal | safeguarding, security, data-workflows | **High** | Web-verify against gov.uk, ICO, legislation |
| Tools & Platforms | tool-selection, approved-tools | **High** | Web-verify against tool websites |
| AI/Prompts | prompts, prompt-spec | **High** | Web-verify against current best practices |
| Springpod Identity | company-context, roles | **High** | Cross-ref springpod.com, yourfuture.com, ICO register |
| Brand & Prompts | branding, prompt-library | **Medium** | Cross-ref public properties |
| Security | security (technical claims) | **Medium** | Web-verify standards citations |
| Framework/Process | build guides, checklists, forms, guides | **Low** | Internal consistency check |

## Tag Taxonomy

| Tag | Meaning |
|-----|---------|
| `OUTDATED` | Was correct, no longer is |
| `INACCURATE` | Factually wrong |
| `INCONSISTENT` | Contradicts another file |
| `UNVERIFIABLE` | Cannot confirm from public sources |
| `MISSING-CITATION` | References standard/regulation without link or version |
| `NEEDS-REVIEW` | Plausible but requires internal stakeholder confirmation |

## Priority Levels

| Level | Meaning |
|-------|---------|
| P1 | Blocks compliance or safety |
| P2 | Factually wrong, user impact |
| P3 | Stale but low impact |
| P4 | Style/precision |

## Exclusions

- Design system pages (colors, typography, components) — internal UI reference
- Updates feed — timestamped news
- Verification log, version history — timestamped records
- Role entry pages — pass-through navigation, audit for link validity only

## Output

`docs/audits/2026-03-10-content-audit-v1.md`
- Per-file findings grouped by risk category
- Each finding: tag, priority, description, source link, suggested owner
- Summary table
- Recommended review cadence
- Baseline date statement

## Review Cadence (recommended)

- High-risk (regulatory, tools, company identity): every 6 months
- Medium-risk (brand, security standards): every 12 months
- Low-risk (process/framework): every 18 months or on framework revision
