# Architecture

**Analysis Date:** 2026-03-04

## Pattern Overview

**Overall:** Tiered Progressive Framework with Progressive Disclosure

VCF is a structured intake-to-delivery framework for organizations adopting AI-powered tool development. It operates on a classification model that maps project characteristics to one of four build paths, each with corresponding guides, checklists, standards, and templates. The framework guides builders (regardless of technical skill) through risk-appropriate processes while teaching best practices through repetition.

**Key Characteristics:**
- **Intake-driven classification:** Every project starts with 5 plain-language questions that determine build path
- **Superset architecture:** Each build path is a complete superset of the one below it (Green < Yellow < Orange < Red)
- **Progressive disclosure:** All content uses three layers (one-liner for experts, WHY for context, HOW TO for step-by-step guidance)
- **Dual-mode learning:** Each phase has both a Guide (learning-by-doing) and Checklist (verification) format
- **50/50 balance:** Each phase balances accelerators (save time) with safeguards (reduce risk)
- **Tool-agnostic but integrated:** Guides work with any AI tool; client-specific configs support tool enforcement

---

## Layers

**Classification & Routing Layer:**
- Purpose: Assess project characteristics and route to appropriate build path
- Location: `docs/intake/project-intake.md`
- Contains: 5-question intake form with plain-language explanations
- Depends on: User context (audience, data, criticality, duration, AI role)
- Used by: Every project before any building begins
- Triggers: Project intake assessment → build path assignment (Green/Yellow/Orange/Red)

**Standards Layer:**
- Purpose: Define "good enough" for each concern across all build paths
- Location: `docs/standards/`
- Contains: Quality, Security, Branding, Prompts standards
- Depends on: Build path (standards accumulate as path increases)
- Used by: Build guides and checklists to know what to check
- Pattern: Universal rules (all paths) + path-specific additions (Yellow+, Orange+, Red)

**Build Execution Layer (Guides):**
- Purpose: Step-by-step walkthrough while building (learning mode)
- Location: `docs/build-guides/`
- Contains: Green (6 steps), Yellow (9 steps), Orange (9+ steps), Red (10+ steps)
- Depends on: Project Brief form, Branding Standard, Approved Tools, Prompt Library
- Used by: Builders on first projects or unfamiliar paths
- Pattern: Each step includes accelerators (shortcuts) + explanations (WHY things matter)

**Verification Layer (Checklists):**
- Purpose: Binary yes/no verification before shipping (verification mode)
- Location: `docs/checklists/`
- Contains: Green (6 items), Yellow (10 items), Orange (14 items), Red (18+ items)
- Depends on: Standards to know what to verify
- Used by: Builders on repeat projects or experienced builders
- Pattern: Each item uses progressive disclosure (WHY, HOW TO CHECK)

**Template Layer:**
- Purpose: Structured forms for capturing project definition and decisions
- Location: `docs/forms/`
- Contains: Project Brief, Prompt Spec, Review Request, Incident Report, Build Log
- Depends on: Build guides for step references
- Used by: At specific phases in the build lifecycle
- Pattern: Self-contained forms with examples and explanatory text

**Guidance Layer:**
- Purpose: Answer "how do I..." and "when do I escalate?" questions
- Location: `docs/guides/`
- Contains: First Build walkthrough, Tool Selection guide, Escalation guidance, Glossary
- Depends on: All other layers
- Used by: Builders encountering obstacles or making decisions

**Client Config Layer:**
- Purpose: Customize core framework for specific organization
- Location: `docs/client-config/`
- Contains: Company Context, Approved Tools, Roles & Contacts, Prompt Library
- Depends on: Core framework (builds on top without modifying)
- Used by: Build guides reference these for company-specific details
- Note: Core framework (folders 01-06) same for all clients; this layer is customized per engagement

---

## Data Flow

**Project Initiation Flow:**

1. Builder encounters new project
2. Opens `project-intake.md` and answers 5 questions
3. Answers map to build path (Green → Yellow → Orange → Red, highest wins)
4. Builder fills out `project-brief.md` to define scope
5. Framework routes to appropriate build guide

**Build Path Execution Flow (example: Yellow):**

1. **Step 1:** Fill Project Brief (define what building, why, what done looks like)
2. **Step 2:** Pick tool (reference Tool Selection guide + Approved Tools)
3. **Step 3:** Build it (reference Prompt Library, keep Build Log)
4. **Step 4:** Test with realistic data and fresh eyes
5. **Step 5:** Match branding (reference Branding Standard)
6. **Step 6:** Secure it (reference Security Standard)
7. **Step 7:** Document prompts (Build Log or Prompt Spec)
8. **Step 8:** Request peer review (fill Review Request form)
9. **Step 9:** Ship it (go live)

At any step, if builder is stuck, they reference:
- Progressive disclosure sections (WHY, HOW TO CHECK) in the current guide
- Related standard document (Security, Quality, Branding, Prompts)
- When to Escalate guide
- Tool Selection guide
- Glossary for definitions

**Escalation Trigger Flow:**

- If intake answer is "I'm not sure" → automatically bump up one level
- If during build a requirement emerges → re-run intake to check if path changed
- If review feedback indicates problems → may need to move to higher path
- Projects only move UP paths, never down

**State Management:**

- **Pre-build state:** Project brief completed, intake answers recorded
- **During-build state:** Build log maintained with prompts, decisions, issues
- **Pre-ship state:** All checklist items verified, review complete (if required)
- **Post-ship state:** Tool deployed, kill switch tested, monitoring in place
- **Change state:** If tool's use changes (data type, users, criticality), re-run intake

---

## Key Abstractions

**Build Path:**
- Purpose: Represents an abstraction over risk profile, not a technology choice
- Examples: `docs/build-guides/green-quick-build.md`, `docs/build-guides/yellow-standard-build.md`, etc.
- Pattern: Each path is a complete workflow (intake → guide → checklist → standards)
- Key insight: Path determined by audience, data, impact, duration, AI role — not by tool chosen

**Progressive Disclosure:**
- Purpose: Serve three audience profiles without user-facing labels
- Examples: Every checklist item uses `<details><summary>WHY</summary>` and `<details><summary>HOW TO CHECK</summary>`
- Pattern: Builder reads one-liner and skips; Explorer reads WHY for context; Cautious reads HOW TO for steps
- Enables single document serving different skill levels simultaneously

**Accelerator & Safeguard Pair:**
- Purpose: Balance speed with safety in every phase
- Examples:
  - Accelerator: "Check Prompt Library for tested templates" (saves time)
  - Safeguard: "Search code for exposed secrets" (reduces risk)
- Pattern: Each guide step includes ~50% accelerators, 50% safeguards

**Prompt as Artifact:**
- Purpose: Distinguish build-time prompts (ephemeral) from production prompts (artifacts)
- Examples:
  - Build prompt: "Create a dashboard showing team metrics" (used to generate code)
  - Production prompt: "You are a student progress assistant..." (defined in tool, affects user experience)
- Pattern: Build prompts documented in Build Log; production prompts documented in Prompt Spec

---

## Entry Points

**For New Projects:**
- Location: `docs/intake/project-intake.md`
- Triggers: New tool or feature request
- Responsibilities: Route project to correct build path via 5-question form

**For First Time with Framework:**
- Location: `docs/guides/first-build.md`
- Triggers: Builder has never used VCF
- Responsibilities: Walk through entire process with concrete example

**For Experienced Builders on New Project:**
- Location: `docs/build-guides/[green|yellow|orange|red]-[quick|standard|reviewed|protected]-build.md`
- Triggers: Intake completed, build path determined
- Responsibilities: Step-by-step guidance for that specific path

**For Builders Doing Repeat Projects:**
- Location: `docs/checklists/[green|yellow|orange|red]-checklist.md`
- Triggers: Builder familiar with this path
- Responsibilities: Quick verification checklist instead of full guide

**For Decision-Making:**
- Location: `docs/guides/tool-selection.md`
- Triggers: Choosing AI tool for project
- Responsibilities: Explain three tool tiers and decision flow

**For Escalation/Help:**
- Location: `docs/guides/when-to-escalate.md`
- Triggers: Builder stuck or unsure
- Responsibilities: Explain when to ask for help and who to ask

---

## Error Handling

**Strategy:** Assume uncertainty is normal; bump escalation and flag for review

**Patterns:**

1. **Intake Uncertainty:** If builder answers "I'm not sure" to any intake question → automatically move to higher path + flag for human review
2. **Missing Context:** If builder cannot complete a step (e.g., "I don't know how to move secrets to environment variables") → reference When to Escalate guide + provide escalation contact
3. **Specification Mismatch:** If during building the tool's requirements change (new data type, new user type, becomes business-critical) → re-run intake to check if path changed
4. **Review Feedback:** If peer or technical review surfaces issues → may trigger path escalation + additional requirements
5. **Tool Limitations:** If chosen tool cannot meet path requirements (e.g., No-Code tool for Orange build) → guide recommends alternative tool tier with clear explanation

---

## Cross-Cutting Concerns

**Logging/Documentation:**
- Build Log form captures each prompt used, decisions made, issues resolved
- Purpose: Enable future modifications when original builder is unavailable
- Mandatory for: Yellow+ (optional for Green)
- Pattern: Short structured entries during build, not lengthy writeups

**Validation:**
- Pre-build: Project Brief validates that builder can articulate scope before starting
- Intake: 5 questions validate that builder understands their project's risk profile
- During-build: Standards documents list specific checks (WAVE accessibility, secret scanning, etc.)
- Pre-ship: Checklists validate all items completed before going live
- Pattern: Binary yes/no checks, not vague "ensure adequate" language

**Authentication & Authorization:**
- Not built into framework itself; delegated to client config (Roles document)
- Roles document defines who can review (peer vs. technical vs. designated)
- Prompt Library may include auth-specific prompt templates
- Security Standard defines access control checks (users can only see own data)

**Escalation:**
- Clear escalation paths defined in When to Escalate guide
- Roles document maps role names to contact details
- Intake "I'm not sure" answers automatically escalate
- Checklists flag items that require escalation if not met
- Incident Report form for documenting issues post-launch

---

## Bridge Between Layers

**Intake → Build Path:** 5 questions deterministically map to one of 4 paths

**Build Path → Guide:** Selected path references its corresponding guide document

**Guide → Standards:** Each guide step points to relevant standard (Quality, Security, Branding, Prompts)

**Guide → Templates:** Each guide step references relevant form (Project Brief, Build Log, Review Request, etc.)

**Guide → Checklist:** Guide teaches the "why" and "how"; checklist is the verification version

**Client Config → Guides:** Guides reference company-specific config at decision points:
- "Check your company's [Approved Tools](../client-config/approved-tools.md) list"
- "Reference the [Branding Standard](../standards/branding.md)"
- "See your [Roles](../client-config/roles.md) to find your technical reviewer"
- "Start with [Prompt Library](../client-config/prompt-library.md) templates"

**Standards → Templates:** Standards explain what; templates capture the evidence

---

*Architecture analysis: 2026-03-04*
