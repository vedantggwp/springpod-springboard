# Codebase Structure

**Analysis Date:** 2026-03-04

## Directory Layout

```
SP-VibeFrame/
├── docs/                          # Core framework documentation (universal)
│   ├── intake/                    # Project intake form
│   │   └── project-intake.md      # 5 questions → build path assignment
│   ├── standards/                 # What "good" looks like
│   │   ├── quality.md             # Quality checklist items & guidance
│   │   ├── security.md            # Security rules for all build paths
│   │   ├── branding.md            # Visual & tone standards
│   │   └── prompts.md             # How to write, test, document AI prompts
│   ├── build-guides/              # Step-by-step learning mode (THE TRAINING)
│   │   ├── green-quick-build.md   # 6 steps for internal/throwaway projects
│   │   ├── yellow-standard-build.md # 9 steps for internal business tools
│   │   ├── orange-reviewed-build.md # 9+ steps for personal/external data
│   │   └── red-protected-build.md # 10+ steps for minors/protected data
│   ├── checklists/                # Binary verification mode (QUICK AUDIT)
│   │   ├── green-checklist.md     # 6 items to verify before shipping
│   │   ├── yellow-checklist.md    # 10 items to verify
│   │   ├── orange-checklist.md    # 14 items to verify
│   │   └── red-checklist.md       # 18+ items to verify
│   ├── forms/                     # Structured templates for capture
│   │   ├── project-brief.md       # Define project scope & done criteria
│   │   ├── prompt-spec.md         # Document production AI prompts
│   │   ├── review-request.md      # Request peer/technical review
│   │   ├── incident-report.md     # Report issues post-launch
│   │   └── build-log.md           # Track decisions during build
│   ├── guides/                    # Cross-cutting guidance
│   │   ├── first-build.md         # Walkthrough for first time users
│   │   ├── tool-selection.md      # How to pick an AI coding tool
│   │   ├── when-to-escalate.md    # When to ask for help
│   │   └── glossary.md            # Plain-language explanations
│   ├── client-config/             # CUSTOMIZED PER CLIENT (not universal)
│   │   ├── company-context.md     # Company values, constraints, policies
│   │   ├── approved-tools.md      # Which AI tools are approved & tiers
│   │   ├── roles.md               # Who reviews, escalation contacts
│   │   └── prompt-library.md      # Company-tested prompt templates
│   ├── index.md                   # Landing page overview
│   └── version.md                 # Version history
├── plans/                         # Planning & design documents
│   ├── 2026-03-04-vibe-coding-framework-design.md   # Design document & vision
│   └── 2026-03-04-vcf-implementation-plan.md        # Implementation phases
├── mkdocs.yml                     # Site navigation & theme config
├── site/                          # Generated documentation site (built from docs/)
│   ├── index.html                 # Home page
│   ├── forms/                     # Rendered form templates
│   ├── checklists/                # Rendered checklists
│   ├── build-guides/              # Rendered build guides
│   ├── standards/                 # Rendered standards
│   └── [... other generated content]
└── .planning/                     # This project's GSD planning
    ├── codebase/                  # Codebase analysis docs (this folder)
    │   ├── ARCHITECTURE.md        # This document
    │   ├── STRUCTURE.md           # This document
    │   ├── CONVENTIONS.md         # Not applicable (docs framework)
    │   ├── TESTING.md             # Not applicable (docs framework)
    │   ├── STACK.md               # Not applicable (docs framework)
    │   └── INTEGRATIONS.md        # Not applicable (docs framework)
    └── [other planning files]
```

---

## Directory Purposes

**docs/** (Core Framework - Universal)
- Purpose: The complete VCF framework, same for every client
- Contains: Intake, standards, build guides, checklists, forms, guides
- Key files: `project-intake.md` (entry point), `green-quick-build.md` through `red-protected-build.md` (main guides)
- Maintained by: VCF team
- Version controlled: Yes
- Distributed to clients: Yes (as-is, no modification)

**docs/intake/**
- Purpose: Classify new projects into build paths
- Contains: `project-intake.md` - single 5-question form
- Key element: Questions map deterministically to Green/Yellow/Orange/Red paths
- Usage: First step for every new project
- Versioned: Yes (questions may change in future versions)

**docs/standards/**
- Purpose: Define quality bars and rules across all build paths
- Contains: 4 standards documents
  - `quality.md`: What "done" looks like (universal + path-specific)
  - `security.md`: Secrets, data handling, encryption rules (universal + path-specific)
  - `branding.md`: Visual/tone consistency expectations
  - `prompts.md`: How to write, test, document AI prompts
- Used by: Build guides reference these; checklists verify against these
- Pattern: Universal rules first, then Yellow+, Orange+, Red+ additions
- Example: Quality.md has 4 universal rules, then Yellow-specific, Orange-specific, Red-specific additions

**docs/build-guides/**
- Purpose: Step-by-step walkthrough while building (learning mode)
- Contains: 4 guides (one per build path)
- Key structure: Each guide has 6-10 steps; each step includes:
  - What to do (clear action)
  - Accelerators (shortcuts, templates, tools to use)
  - Explanations (WHY this step matters)
- Used by: First-time builders on that path
- Progression: Green (6 steps) < Yellow (9 steps) < Orange (9+ steps) < Red (10+ steps)
- Superset pattern: Orange and Red guides say "Follow Yellow for steps 1-3, then add these steps"

**docs/checklists/**
- Purpose: Binary yes/no verification before shipping (verification mode)
- Contains: 4 checklists (one per build path)
- Key structure: Each item is "Have you..." format
  - Simple checkbox format
  - Uses progressive disclosure (WHY, HOW TO CHECK)
  - Groups items by phase (Pre-Build, During Build, Pre-Ship)
- Used by: Experienced builders doing repeat projects; also as final audit before shipping
- Progression: Green (6 items) < Yellow (10 items) < Orange (14 items) < Red (18+ items)
- Relationship to guides: Checklist items map 1:1 to guide topics (just condensed)

**docs/forms/**
- Purpose: Structured templates for capturing decisions and context
- Contains: 5 forms
  - `project-brief.md`: Define scope before building (What, Why, Done criteria, Tool choice)
  - `prompt-spec.md`: Document production prompts in detail (purpose, input/output, failure modes, tests)
  - `review-request.md`: Package build for peer/technical review (context, artifacts, what to check)
  - `incident-report.md`: Document issues post-launch (what happened, impact, resolution)
  - `build-log.md`: Capture prompts & decisions during build (reproducibility)
- Filled during: Different phases of build process
- Examples: Each form includes completed example
- Self-contained: Each form can be read/filled independently

**docs/guides/**
- Purpose: Answer cross-cutting questions and provide direction
- Contains: 4 guides
  - `first-build.md`: Complete walkthrough with concrete example project
  - `tool-selection.md`: Explains 3 tool tiers (No-Code, Low-Code, Pro) with decision flow
  - `when-to-escalate.md`: When to ask for help and who to ask
  - `glossary.md`: Plain-language explanations of all terms
- Used by: Builders encountering obstacles, making decisions, or new to VCF
- Pattern: Each guide is self-contained and reference-able

**docs/client-config/** (PER-CLIENT CUSTOMIZATION)
- Purpose: Customize core framework for specific organization
- Contains: 4 documents
  - `company-context.md`: Company values, constraints, policies, approval process
  - `approved-tools.md`: Which AI tools are approved at which tiers (No-Code / Low-Code / Pro)
  - `roles.md`: Who fills each review role (peer reviewer, technical reviewer, designated reviewer) with contact details
  - `prompt-library.md`: Collection of company-tested prompt templates by use case
- Customized per: Client engagement (DWY or DFY)
- Not modified by: Individual projects
- Referenced by: Build guides say "Check your company's Approved Tools list" etc.
- Version controlled: Yes (per client repo or per client branch)
- This is where DFY/DWY value lives

**plans/** (Design & Implementation Documentation)
- Purpose: Capture the thinking behind VCF
- Contains:
  - `2026-03-04-vibe-coding-framework-design.md`: Vision, market context, design principles, success criteria
  - `2026-03-04-vcf-implementation-plan.md`: Phased rollout plan with writing standards
- Serves as: Reference for contributors, rationale for design choices
- Version controlled: Yes
- Used by: Not consumed by builders (more for maintainers/team)

**site/** (Generated Documentation Site)
- Purpose: Rendered HTML version of docs/ for web viewing
- Contains: Built HTML and assets (generated by MkDocs)
- Generated from: docs/ folder
- Build tool: MkDocs (configured in mkdocs.yml)
- Not hand-edited: Generated via `mkdocs build` command
- Served by: Usually deployed to web (docs.vibe-coding-framework.com or similar)

**mkdocs.yml** (Site Configuration)
- Purpose: Configure documentation site structure, navigation, theme
- Contains: Theme settings, navigation structure, markdown extensions
- Navigation structure mirrors docs/ folder structure
- Theme: Material design with custom colors (indigo primary, teal accent)
- Extensions: Progressive disclosure via `<details>`, admonitions, superfences, tables

---

## Key File Locations

**Entry Points:**

- **For new projects:** `docs/intake/project-intake.md`
  - First file builders read
  - Determines which build path to follow
  - 5 questions with plain-language explanations

- **For new to VCF:** `docs/guides/first-build.md`
  - Complete walkthrough with example project
  - Best starting point before diving into specific path

- **For tool selection:** `docs/guides/tool-selection.md`
  - Decision matrix: No-Code vs. Low-Code vs. Pro
  - Replit-specific assessment
  - Tiers mapped to build paths

- **For "I'm stuck":** `docs/guides/when-to-escalate.md`
  - When to ask for help
  - How to contact support
  - Escalation decision flow

**Standards (What's Good):**

- **Quality:** `docs/standards/quality.md`
  - 4 universal rules + path-specific additions
  - Maps to checklist items in each path

- **Security:** `docs/standards/security.md`
  - "Never put secrets in code" rule
  - Data handling rules by path
  - Specific checks (HTTPS, validation, error messages, encryption, access control)

- **Branding:** `docs/standards/branding.md`
  - Visual consistency (colors, fonts, logo)
  - Tone of voice standards
  - Brand compliance checklist

- **Prompts:** `docs/standards/prompts.md`
  - Build prompts vs. production prompts
  - Prompt testing protocol
  - Prompt Spec template reference

**Build Process (How to Execute):**

- **Green Quick Build:** `docs/build-guides/green-quick-build.md`
  - 6 steps: Define → Pick tool → Build → Test → Secure → Ship
  - ~1-4 hours total
  - Target: Internal, throwaway, no sensitive data

- **Yellow Standard Build:** `docs/build-guides/yellow-standard-build.md`
  - 9 steps: Define → Pick tool → Build → Test → Brand → Secure → Document → Review → Ship
  - ~1-3 days
  - Target: Internal business tools with ongoing use

- **Orange Reviewed Build:** `docs/build-guides/orange-reviewed-build.md`
  - 9+ steps: Standard foundation + Data handling → Accessible → Error handling → Brand → Test → Technical review
  - ~3-7 days
  - Target: Personal data, external users

- **Red Protected Build:** `docs/build-guides/red-protected-build.md`
  - 10+ steps: Reviewed foundation + Privacy compliance → Incident response → Real user testing → Production prompt review → Sign-off
  - ~1-3 weeks
  - Target: Minors, protected data, legal requirements

**Verification (Audit Before Ship):**

- **Green Checklist:** `docs/checklists/green-checklist.md` (6 items)
- **Yellow Checklist:** `docs/checklists/yellow-checklist.md` (10 items)
- **Orange Checklist:** `docs/checklists/orange-checklist.md` (14 items)
- **Red Checklist:** `docs/checklists/red-checklist.md` (18+ items)

**Form Templates (Capture Context):**

- **Project Brief:** `docs/forms/project-brief.md`
  - Filled: Before building starts (Step 1 of any guide)
  - Captures: Project name, what it does, problem solved, done criteria, tool choice

- **Build Log:** `docs/forms/build-log.md`
  - Filled: During Yellow+ builds
  - Captures: Prompts used, decisions made, issues encountered

- **Prompt Spec:** `docs/forms/prompt-spec.md`
  - Filled: For production prompts in Yellow+ builds
  - Captures: Purpose, input/output, failure modes, test results, bias checks

- **Review Request:** `docs/forms/review-request.md`
  - Filled: Before review (Step 8 of Yellow, Step 9 of Orange, Step 11 of Red)
  - Captures: Project context, what was built, what to check

- **Incident Report:** `docs/forms/incident-report.md`
  - Filled: When something goes wrong post-launch
  - Captures: What happened, impact, resolution, prevention

**Client Configuration (Company-Specific):**

- **Company Context:** `docs/client-config/company-context.md`
  - Customized per: Client
  - Contains: Company values, policies, approval workflows, escalation contacts

- **Approved Tools:** `docs/client-config/approved-tools.md`
  - Customized per: Client
  - Contains: Which AI tools approved at No-Code / Low-Code / Pro tiers
  - Maps tools to build paths

- **Roles:** `docs/client-config/roles.md`
  - Customized per: Client
  - Contains: Definitions of peer reviewer, technical reviewer, designated reviewer with contact details

- **Prompt Library:** `docs/client-config/prompt-library.md`
  - Customized per: Client
  - Contains: Collection of prompt templates by use case (team directory, dashboard, student-facing, etc.)
  - Tested and known to work for that company

---

## Naming Conventions

**Files:**
- Markdown files: `kebab-case.md` (e.g., `project-intake.md`, `green-quick-build.md`)
- Directories: lowercase with hyphens (e.g., `build-guides/`, `client-config/`)
- Configuration: `mkdocs.yml`

**Document Titles:**
- Build paths: `[Color]: [Path Name]` (e.g., "Green: Quick Build Guide")
- Checklists: `[Color]: [Path Name] Checklist` (e.g., "Green: Quick Build Checklist")
- Standards: Plain descriptive title (e.g., "Quality Standard", "Security Standard")
- Forms: Type of form (e.g., "Project Brief", "Prompt Spec", "Review Request")

**Content Structure:**
- Top-level headings: Use "# " for document title (one per file)
- Section headings: Use "## " for major sections
- Subsection headings: Use "### " for details within sections
- Progressive disclosure uses `<details><summary>LABEL</summary>` tags (not markdown headers)

**Links:**
- Relative links within docs: `../path/file.md` or `../forms/project-brief.md`
- MkDocs navigation: Reference files by path as shown in mkdocs.yml

---

## Where to Add New Code

**This is a documentation framework, not a software codebase.** Adding new content follows a different pattern than typical code projects.

**Adding a new standard:**
1. Create file: `docs/standards/[topic].md`
2. Structure: Universal rules, then Yellow+, Orange+, Red+ additions
3. Use progressive disclosure: One-liner, then `<details><summary>WHY</summary>`, then `<details><summary>HOW TO CHECK</summary>`
4. Update: `mkdocs.yml` navigation to include new standard under Standards section
5. Link from: Relevant build guides that should reference it

**Adding a new form template:**
1. Create file: `docs/forms/[name].md`
2. Structure: Title, description, sections with fields and explanations, example completion
3. Use progressive disclosure for non-obvious fields
4. Update: `mkdocs.yml` navigation under Forms & Templates section
5. Reference from: Build guides at the step where this form is filled

**Adding a new guide:**
1. Create file: `docs/guides/[topic].md`
2. Self-contained: Can be read independently without context
3. Use progressive disclosure liberally for complex topics
4. Update: `mkdocs.yml` navigation under Guides section
5. Link from: Build guides and When to Escalate if relevant

**Adding a new build path step (e.g., if Green becomes 7 steps):**
1. Edit: `docs/build-guides/green-quick-build.md` (add step and content)
2. Edit: `docs/checklists/green-checklist.md` (add corresponding checklist item)
3. Update: Any overlapping Orange/Red guides that reference Green steps
4. Update: `docs/guides/first-build.md` if it uses Green as example

**Customizing for a new client:**
1. Create: `docs/client-config/company-context.md` (customize template)
2. Create: `docs/client-config/approved-tools.md` (choose which tools + tiers)
3. Create: `docs/client-config/roles.md` (map roles to actual people + contact details)
4. Create: `docs/client-config/prompt-library.md` (add company-tested prompts)
5. Note: All other docs (01-06) remain unchanged

---

## Special Directories

**docs/forms/** (templates for capture)
- Committed: Yes
- Generated: No
- Filled: By individual projects (not committed, stored separately)
- Purpose: Templates are source; filled versions are project artifacts

**docs/client-config/** (customization)
- Committed: Yes
- Generated: No
- Per client: Different branch or separate repo per client
- Purpose: Customize framework without modifying core (folders 01-06)

**site/** (generated documentation site)
- Committed: Sometimes (depends on deployment strategy)
- Generated: Yes (via `mkdocs build`)
- Build command: `mkdocs build` (or `mkdocs serve` for local dev)
- Contains: HTML, CSS, JavaScript for web viewing
- Deployment: Usually served from GitHub Pages, Netlify, or similar

**plans/** (design & implementation docs)
- Committed: Yes
- Generated: No
- Purpose: Reasoning and planning, not user-facing
- Used by: VCF maintainers and contributors

**mkdocs.yml** (site configuration)
- Committed: Yes
- Generated: No
- Edits required when: Adding/removing docs, changing navigation structure, updating theme
- Purpose: Single source of truth for site structure and appearance

---

## Document Length Targets

**Build guides:** 200-400 lines each
- Green: shortest (6 steps, less detail)
- Yellow: medium (9 steps, moderate detail)
- Orange: longer (9+ steps, more safety details)
- Red: longest (10+ steps, comprehensive compliance details)

**Checklists:** 50-100 lines each
- Compact yes/no items with progressive disclosure
- Shorter than guides but same total information

**Standards:** 150-300 lines each
- Universal rules first, path-specific additions after
- Progressive disclosure on all non-obvious items

**Forms:** 80-150 lines each
- Field descriptions, examples, explanations
- Self-contained; can be filled independently

**Guides:** 100-250 lines each
- Self-contained reference material
- Progressive disclosure on complex topics

---

## Cross-Project File References

All links within docs/ are relative path-based:

```
From build-guides/yellow-standard-build.md, reference:
- Forms: ../forms/project-brief.md, ../forms/build-log.md
- Standards: ../standards/quality.md, ../standards/security.md, ../standards/branding.md
- Client config: ../client-config/branding.md, ../client-config/approved-tools.md, ../client-config/prompt-library.md
- Guides: ../guides/tool-selection.md, ../guides/when-to-escalate.md
- Intake: ../intake/project-intake.md
- Checklists: ../checklists/yellow-checklist.md
```

This pattern allows the entire docs/ tree to be:
- Moved or renamed as a unit
- Served from any path or domain
- Deployed to multiple locations
- Forked per-client without breaking links

---

*Structure analysis: 2026-03-04*
