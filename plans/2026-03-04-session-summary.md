# VCF Session Summary — 2026-03-04

## Overview

Brainstorming, design, and implementation planning session for the **Vibe Coding Framework (VCF)** — a licensed, documentation-first framework that governs how companies build, review, and release AI-powered tools using vibe coding platforms (Replit, Lovable, Cursor, Claude Code, etc.).

---

## Key Concepts Covered

### 1. The Market Gap

- **Generation tools** (Replit, Lovable, Bolt, v0, Cursor) help people build
- **Review tools** (CodeRabbit, Qodo) check code after the fact
- **Governance platforms** (Credo AI, Holistic AI) manage model risk at enterprise scale
- **Nothing exists in the middle** — a packaged framework governing the entire AI-assisted development lifecycle as an internal operating standard
- Closest competitor: docs.vibe-coding-framework.com (unpaid whitepaper, no commercial entity)
- Superblocks ($23M raise) targets "enterprise vibe coding" but is a platform, not a framework

### 2. The Framework IS the Training

The core design insight: VCF doesn't require separate training. The framework teaches through use. Every checklist item, every guided step, every template is designed to build the builder's mental model through repetition. This is the **flight checklist model** — pilots don't stop using checklists after training.

### 3. Progressive Disclosure (Three Audience Profiles)

Three profiles inform content design but are never user-facing labels:

| Profile | Who | What they need |
|---------|-----|---------------|
| **Builder** | Has coded before, comfortable with AI tools | Structure, not hand-holding |
| **Explorer** | Non-technical but curious (PM, marketing, ops) | Guided steps, plain language |
| **Cautious** | Tech-averse, may be required to use this | Maximum safety, minimum jargon |

Implementation: every content item has three collapsible layers:
1. **One-liner** — Builder reads and moves on
2. **WHY** — Explorer reads for context
3. **HOW TO** — Cautious reads for step-by-step guidance

Nobody picks a profile. Users self-regulate by expanding what they need.

### 4. Dual-Mode Content

Each build phase exists in two modes:
- **Build Guide (learning mode):** Step-by-step with WHY and HOW. This IS the training.
- **Build Checklist (verification mode):** Compact yes/no. For builders who already know the steps.

Builders naturally graduate from Guide to Checklist over time.

### 5. 50% Accelerator, 50% Safeguard

The framework must make builders FASTER, not just safer. Each phase includes:
- **Accelerator items:** Prompt library shortcuts, starter templates, "has someone built this already?" checks
- **Safeguard items:** Security checks, privacy verification, review requirements

If the framework only decelerates, adoption dies.

### 6. Classification Model

Five plain-language intake questions assign every project to one of four build paths. Every question has an "I'm not sure" option that bumps up one tier and flags for review.

**Intake questions:**
1. Who will use this? (internal / partners / customers / students under 18)
2. What data does it touch? (none / business / personal / protected)
3. What happens if it breaks? (inconvenience / team slowed / users affected / legal consequences)
4. How long will this be used? (throwaway / ongoing / core to operations)
5. What role does AI play? (helped build it / generates user content / makes decisions affecting outcomes)

**Four build paths (highest trigger wins, additive):**

| Path | Color | Trigger | Items |
|------|-------|---------|-------|
| Quick Build | Green | Internal + no sensitive data + throwaway | ~6 |
| Standard Build | Yellow | Internal + business data, OR partner-facing | ~10 |
| Reviewed Build | Orange | Customer-facing, OR personal data, OR core ops | ~14 |
| Protected Build | Red | Minors, OR protected data, OR AI makes decisions | ~18 |

**Escalation rules:** Projects only move UP paths. Re-intake required at intervals (Red: 30 days, Orange: 90 days). Silent escalation fix: re-intake is mandatory before a project can drift.

### 7. Tiered Tooling Strategy

| Factor | No-Code (Lovable, Bolt, v0) | Low-Code (Replit Agent) | Pro Tools (Cursor, Claude Code) |
|--------|----------------------------|------------------------|-------------------------------|
| Best for | Landing pages, prototypes | Internal tools, dashboards | Complex logic, production |
| Builder skill | Can describe in words | Basic tech comfort | Has coded before |
| Data handling | Limited | Moderate | Full |
| Exit strategy | Hard (vendor lock-in) | Medium | Easy (standard code) |

**Replit verdict:** Good for Green/Yellow builds. Evaluate migration to Pro Tools at Orange/Red.

### 8. Prompt Management

Two categories:
- **Build prompts** (ephemeral) — what you type into the AI tool to generate code. Save alongside project for reproducibility.
- **Production prompts** (artifacts) — prompts running inside the finished tool. These are product decisions requiring documentation, review, and versioning.

Key principle: "If an AI prompt affects what a user sees, it's a product decision that needs documentation."

---

## Decisions Reached

| Decision | Rationale |
|----------|-----------|
| **Code-first, expand later** | Code generation has highest risk and highest value to standardize. Other AI workflows (content, analysis) become add-on modules. |
| **Approach B: "The Operating System"** | Docs + tool configs + enforcement. Not just policy docs (Approach A) and not a full SaaS platform (Approach C). |
| **Documentation-first product** | The framework IS the deliverable in v1. Tool configs and portals come later. The docs must be strong enough to stand alone. |
| **Tool-agnostic** | VCF wraps around the human, not the tool. Works with any AI coding tool. Tool-specific configs are optional accelerators. |
| **MkDocs Material for presentation** | Markdown-native, auto-navigation from folder structure, built-in search, dark mode. Professional enough to become client delivery format. |
| **Build site first, write into it** | Set up MkDocs before writing content so we can preview progressively and share early. |
| **Write-then-verify for content accuracy** | Write all docs first, then do a dedicated verification pass on high-risk docs with VERIFICATION-LOG.md as audit trail. |
| **Modularity for flexible pricing** | Core framework (folders 01-06) universal; client config (07) customized per engagement. Supports License Only through Managed tiers. |
| **`forms/` not `templates/`** | MkDocs reserves the `templates/` directory name internally. Renamed to avoid build conflicts. |

---

## Framework Structure (Deliverable)

```
SP-VibeFrame/
├── mkdocs.yml                          # Site configuration
├── docs/                               # MkDocs content root = the framework
│   ├── index.md                        # Homepage (written)
│   ├── intake/
│   │   └── project-intake.md           # 5 questions → build path
│   ├── standards/
│   │   ├── quality.md                  # What "good" looks like
│   │   ├── security.md                 # Data, secrets, auth, privacy
│   │   ├── branding.md                 # Visual + tone (client template)
│   │   └── prompts.md                  # Prompt writing, testing, documenting
│   ├── build-guides/                   # Learn-by-doing mode
│   │   ├── green-quick-build.md
│   │   ├── yellow-standard-build.md
│   │   ├── orange-reviewed-build.md
│   │   └── red-protected-build.md
│   ├── checklists/                     # Verification mode
│   │   ├── green-checklist.md
│   │   ├── yellow-checklist.md
│   │   ├── orange-checklist.md
│   │   └── red-checklist.md
│   ├── forms/                          # Fillable templates
│   │   ├── project-brief.md
│   │   ├── prompt-spec.md
│   │   ├── review-request.md
│   │   ├── incident-report.md
│   │   └── build-log.md
│   ├── guides/
│   │   ├── first-build.md              # Onboarding walkthrough
│   │   ├── tool-selection.md           # Which tool for which job
│   │   ├── when-to-escalate.md         # "I'm stuck" safety net
│   │   └── glossary.md                 # Every term explained
│   └── client-config/                  # Customized per client
│       ├── company-context.md
│       ├── approved-tools.md
│       ├── roles.md
│       └── prompt-library.md
└── plans/                              # Design docs (not served by site)
    ├── 2026-03-04-vibe-coding-framework-design.md
    ├── 2026-03-04-vcf-implementation-plan.md
    └── 2026-03-04-session-summary.md   # This file
```

---

## Service Tiers

| Tier | Deliverable | Engagement |
|------|------------|------------|
| **License Only** | Core framework (standards, guides, checklists, forms) + self-service customization guide | Write once, sell many |
| **Done With You** | Core + facilitated workshop to populate client config | 1-2 day engagement |
| **Done For You** | Core + full client config + AI tool configurations + team onboarding | 1-2 week engagement |
| **Managed** | Everything above + quarterly reviews, framework updates, compliance audits | Monthly retainer |

---

## Content Verification Approach

**VERIFICATION-LOG.md** tracks every factual claim with:

| Field | Purpose |
|-------|---------|
| ID | Unique per category (R-001, T-001, S-001, P-001, A-001) |
| Claim | The specific factual statement |
| Document | File and line number |
| Method | official-docs / web-research / live-tested / expert-review |
| Source | Clickable URL with access date |
| Status | Verified / Needs-Update / Unverified / Disputed |
| Date | When verified |

**Re-verification schedule:**
- High-risk docs (Security, Red guide, Tool Selection): every 60-90 days
- Medium-risk (Prompts, Orange checklist): every 90 days
- Low-risk (Quality, Green/Yellow): every 180 days

Inline HTML comments (`<!-- Verified: R-001 -->`) link each claim back to the log.

---

## Implementation Plan Summary

17 tasks, 18 commits. Full plan at `plans/2026-03-04-vcf-implementation-plan.md`.

**Status: ALL TASKS COMPLETE — VCF v1.0.0 merged to master on 2026-03-04.**

```
Task 1:    Scaffolding + START-HERE             ✅ DONE (merged into MkDocs setup, session 1)
Task 2:    Project Intake (classification)      ✅ DONE (session 2, commit 9252d09)
Task 3:    Quality Standard                     ✅ DONE (session 2, commit d3ace9a)
Task 4:    Security Standard                    ✅ DONE (session 2, commit a04a41d)
Task 5:    Branding Standard                    ✅ DONE (session 2, commit 185e13c)
Task 6:    Prompt Management Standard           ✅ DONE (session 2, commit d9d4bff)
Task 7:    All 5 Forms/Templates                ✅ DONE (session 2, commit f2f6228)
Task 8:    Green Guide + Checklist              ✅ DONE (session 2, commit 625225a)
Task 9:    Yellow Guide + Checklist             ✅ DONE (session 2, commit 5fa564c)
Task 10:   Orange Guide + Checklist             ✅ DONE (session 2, commit c649970)
Task 11:   Red Guide + Checklist                ✅ DONE (session 2, commit 4c12e9f)
Task 12:   Tool Selection Guide                 ✅ DONE (session 2, commit ef44a5d)
Task 13:   Supporting Guides                    ✅ DONE (session 2, commit 0c26764)
Task 14:   Client Config Templates              ✅ DONE (session 2, commit 1cf189b)
Task 15:   Cross-Document Consistency Review    ✅ DONE (session 2, no fixes needed)
Task 15.5: Content Verification Pass            ✅ DONE (session 2, commit e3e8984)
Task 16:   Versioning + Final Packaging         ✅ DONE (session 2, commit 9e4ceac)
```

Additional commits during implementation:
- `2054886` fix: refine NIST password guidance for accuracy (verification-driven fix)
- `02b18ae` fix: add new pages to nav and fix folder-level links (MkDocs build fix)

---

## Open Questions

### Resolved during implementation

4. ~~**FIRST-BUILD walkthrough tool choice?**~~ → Kept tool-agnostic. References Approved Tools list. Example uses Lovable for simplicity.
5. ~~**Glossary depth?**~~ → Both technical AND process terms. 35+ definitions including "build path," "designated reviewer," "progressive disclosure," "vibe coding."

### Still open

1. **Where does the framework repo live?** GitHub org, client-specific repos, or monorepo with branches per client?
2. **How are framework updates distributed?** Git pull, versioned releases, or manual push to client repos?
3. **First client engagement?** Which company validates v1? What's the timeline?
6. **Hosting for the MkDocs site?** GitHub Pages (free, public), Vercel (free, can be private), or Netlify? For client delivery, each client would need their own instance.
7. **Client branding of the site?** Should the MkDocs theme be customizable per client (their logo, colors) for the DFY/Managed tiers?
8. **Pricing specifics?** License fee, retainer amounts, workshop rates are still undefined.
9. **Legal review?** The SECURITY.md and RED guide make compliance claims (COPPA, GDPR) — does VCF itself need legal review before selling? Note: all claims verified against official sources in VERIFICATION-LOG.md.
10. **SP-VibeFrame as a dedicated Git repo?** Currently lives under the home directory master branch. Should be its own repo.

---

## Next Steps (Post-v1.0.0)

1. **Resolve remaining open questions** above (repo structure, hosting, pricing, legal)
2. **Run `mkdocs serve -a 127.0.0.1:8100`** from `SP-VibeFrame/` to preview the complete site
3. **Deploy the site** to chosen hosting (GitHub Pages, Vercel, or Netlify)
4. **First client engagement** — use VCF with a real client to validate and iterate
5. **v1.1 planning** — AI tool configurations (folder 08), build registry, automated compliance tracking
6. **Verification cycle** — tool-selection.md due for re-verification by 2026-05-04, high-risk docs by 2026-06-04 (see verification-log.md)

---

## Git History

### Session 1 (design + scaffolding)
```
21fc5ea feat: set up MkDocs Material site for VCF framework
2967f9c feat: add Task 15.5 content verification pass to implementation plan
4030aaf docs: VCF implementation plan with 16 tasks and dependency graph
d50ce82 docs: VCF (Vibe Coding Framework) design document
bd55cf1 docs: map existing codebase
```

### Session 2 (full implementation — all 16 tasks)
```
9252d09 feat: add project intake with 5-question classification system
d3ace9a feat: add quality standard with progressive disclosure
a04a41d feat: add security standard with data privacy and minor protection
185e13c feat: add branding standard template with client customization markers
d9d4bff feat: add prompt management standard with build/production distinction
ef44a5d feat: add tool selection guide with tiered strategy and Replit assessment
f2f6228 feat: add all 5 framework forms (brief, prompt-spec, review, incident, build-log)
1cf189b feat: add client configuration templates (context, tools, roles, prompt library)
625225a feat: add Green (Quick Build) guide and checklist
5fa564c feat: add Yellow (Standard Build) guide and checklist
c649970 feat: add Orange (Reviewed Build) guide and checklist
4c12e9f feat: add Red (Protected Build) guide and checklist
0c26764 feat: add supporting guides (first build walkthrough, escalation, glossary)
2054886 fix: refine NIST password guidance for accuracy
e3e8984 feat: add verification log with source-linked audit trail
9e4ceac feat: add versioning and finalize VCF v1.0.0
02b18ae fix: add new pages to nav and fix folder-level links
```

### Stats
- **36 files changed**, ~5,900 lines added
- **14 factual claims** verified against official sources
- **MkDocs builds cleanly** in strict mode
- **All cross-document links** verified (100+ links, 0 broken)
