# VCF v1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the complete VCF (Vibe Coding Framework) v1 as a set of production-ready markdown documents that can be licensed to clients.

**Architecture:** A modular documentation framework organized into 7 folders (01-07). Core framework (01-06) is universal; client config (07) is customized per engagement. Each document is self-contained and uses progressive disclosure (one-liner / WHY / HOW TO) for three audience profiles.

**Tech Stack:** Markdown (GitHub-flavored), collapsible `<details>` sections for progressive disclosure, Mermaid diagrams where helpful.

---

## Writing Standards (apply to ALL tasks)

Every document in VCF must follow these rules:

1. **Plain language.** Write for someone who has never coded. No jargon without a parenthetical explanation.
2. **Progressive disclosure.** Every checklist item and guide step uses three layers:
   - One-liner (Builder: reads and moves on)
   - `<details><summary>WHY</summary>` — one sentence consequence (Explorer)
   - `<details><summary>HOW TO CHECK</summary>` — step-by-step (Cautious)
3. **Self-contained.** Every file can be read independently. No "see section 3.2.1 first."
4. **Binary checks.** Every checklist item is yes/no. Not "ensure adequate" — instead "Have you checked X? Y/N."
5. **50/50 rule.** Each phase's guide/checklist has roughly equal accelerator items (save time) and safeguard items (reduce risk).
6. **Active voice, imperative mood.** "Check your code for secrets" not "The code should be checked for secrets."
7. **No emojis** unless the client config specifies otherwise.
8. **File length target:** 200-400 lines. Max 800.

---

## Task 1: Project Scaffolding & START-HERE.md

**Files:**
- Create: `SP-VibeFrame/framework/START-HERE.md`
- Create: `SP-VibeFrame/framework/01-intake/` (empty dir)
- Create: `SP-VibeFrame/framework/02-standards/` (empty dir)
- Create: `SP-VibeFrame/framework/03-build-guides/` (empty dir)
- Create: `SP-VibeFrame/framework/04-checklists/` (empty dir)
- Create: `SP-VibeFrame/framework/05-templates/` (empty dir)
- Create: `SP-VibeFrame/framework/06-guides/` (empty dir)
- Create: `SP-VibeFrame/framework/07-client-config/` (empty dir)

**Step 1: Create directory structure**

```bash
mkdir -p SP-VibeFrame/framework/{01-intake,02-standards,03-build-guides,04-checklists,05-templates,06-guides,07-client-config}
```

**Step 2: Write START-HERE.md**

This is the single most important document in the framework. It's what every builder reads first. It must:
- Explain what VCF is in 2 sentences
- Explain the builder's workflow in 4 steps: Intake → Build Guide → Build → Checklist
- Link to FIRST-BUILD.md for a walkthrough
- Link to WHEN-TO-ESCALATE.md for "I'm stuck"
- Be under 1 page (~60 lines)
- NOT use technical language — imagine a marketing coordinator reading this

Content structure:

```markdown
# Vibe Coding Framework (VCF)

## What is this?

[2 sentences: VCF is a system that helps you build AI-powered tools
quickly and safely. It guides you through every step so you don't
need to be a developer or remember every rule — the framework handles that.]

## How it works

[4-step visual flow]:
1. **Tell us what you're building** — Answer 5 quick questions → [PROJECT-INTAKE.md]
2. **Get your build path** — The framework picks the right level of guidance for your project
3. **Follow the guide** — Step-by-step instructions while you build → [03-build-guides/]
4. **Run the checklist** — Quick final check before going live → [04-checklists/]

## Your first time?

→ Start with [Your First Build](06-guides/FIRST-BUILD.md) — a guided walkthrough.

## Stuck or unsure?

→ Read [When to Escalate](06-guides/WHEN-TO-ESCALATE.md) — it's always okay to ask.

## What's in this framework?

[Brief table of contents linking to each folder with 1-line descriptions]
```

**Step 3: Commit**

```bash
git add SP-VibeFrame/framework/
git commit -m "feat: scaffold VCF framework structure and START-HERE.md"
```

---

## Task 2: Project Intake (Classification System)

**Files:**
- Create: `SP-VibeFrame/framework/01-intake/PROJECT-INTAKE.md`

**Step 1: Write PROJECT-INTAKE.md**

This document contains:
- A brief intro (3 lines): "Before you build anything, answer these 5 questions. The framework will tell you which build path to follow."
- The 5 intake questions (exact wording from design doc section 6.1)
- A scoring guide that maps answers to build paths (Green/Yellow/Orange/Red)
- The "highest trigger wins" rule explained in one sentence
- An example walkthrough (the student dashboard example from the design)
- What to do if you selected "I'm not sure" for any answer

Scoring guide (to include in the document):

```markdown
## How to find your build path

After answering all 5 questions, find your highest-scoring answer:

| Your highest answer | Your build path |
|---|---|
| All answers are the first option | **Green: Quick Build** |
| Any answer is the second option | **Yellow: Standard Build** |
| Any answer is the third option | **Orange: Reviewed Build** |
| Any answer is the fourth option | **Red: Protected Build** |

The highest one wins. If Q2 is "Internal business data" (Yellow)
but Q1 is "Students under 18" (Red), your path is **Red**.

Selected "I'm not sure" anywhere? That's fine — your path was
bumped up one level automatically. Flag it with [your reviewer]
to confirm before you start building.
```

**Step 2: Self-review checklist**

Verify:
- [ ] All 5 questions match the approved design
- [ ] Every question has an "I'm not sure" option with explicit bump-up behavior
- [ ] Scoring guide is unambiguous (no judgment calls needed)
- [ ] Example walkthrough included
- [ ] Language is plain enough for a non-technical person
- [ ] File is self-contained (doesn't require reading anything else first)
- [ ] Under 200 lines

**Step 3: Commit**

```bash
git add SP-VibeFrame/framework/01-intake/PROJECT-INTAKE.md
git commit -m "feat: add project intake with 5-question classification system"
```

---

## Task 3: Quality Standard

**Files:**
- Create: `SP-VibeFrame/framework/02-standards/QUALITY.md`

**Step 1: Write QUALITY.md**

This defines "what good looks like" for AI-built tools. It must be tool-agnostic and written for non-engineers.

Content sections:

```markdown
# Quality Standard

## What "good enough" means

[Intro: Not every tool needs to be perfect. But every tool needs
to meet a minimum bar. This document defines that bar.]

## Universal quality rules (all build paths)

1. **It does what it says it does.** If your project brief says
   "show student engagement metrics," it shows student engagement metrics.
   <details><summary>WHY</summary>...</details>
   <details><summary>HOW TO CHECK</summary>...</details>

2. **It handles mistakes gracefully.** If someone enters wrong info
   or the tool loses connection, it shows a clear message — not a
   blank screen or cryptic error.
   ...

3. **It looks intentional.** Consistent colors, aligned elements,
   readable text. Not polished — intentional.
   ...

4. **It works on the devices your users have.** If your users are
   on phones, it works on phones.
   ...

## Additional quality rules by build path

### Yellow+ (Standard Build and above)
- Tested with realistic data (not just "test123")
- Someone other than the builder has used it

### Orange+ (Reviewed Build and above)
- Matches company branding guidelines → see [BRANDING.md]
- Loads in under 5 seconds on a normal connection
- Works without JavaScript if content is primarily text

### Red (Protected Build)
- Accessible (keyboard nav, contrast, alt text, screen reader compatible)
- Tested with actual target users (not just colleagues)
- Performance tested under expected load
```

**Step 2: Self-review**
- [ ] Rules are binary/verifiable, not subjective
- [ ] Progressive disclosure on every rule
- [ ] Accelerator items included (template references, tool suggestions)
- [ ] Under 300 lines

**Step 3: Commit**

```bash
git add SP-VibeFrame/framework/02-standards/QUALITY.md
git commit -m "feat: add quality standard with progressive disclosure"
```

---

## Task 4: Security Standard

**Files:**
- Create: `SP-VibeFrame/framework/02-standards/SECURITY.md`

**Step 1: Write SECURITY.md**

This is the most critical standards document. It covers:

```markdown
# Security Standard

## The one rule

Never put sensitive information in your code. Not passwords, not
API keys, not secret tokens, not database URLs. Ever.

<details><summary>WHY</summary>
If sensitive information is in your code, anyone who can see the
code can access your accounts, your data, and your users' data.
</details>

<details><summary>HOW TO CHECK</summary>
1. Open your project
2. Search (Ctrl+F / Cmd+F) for: sk-, api_key, secret, password,
   token, DATABASE_URL, any long random string
3. If you find any: move them to environment variables
4. Not sure how? → [WHEN-TO-ESCALATE.md]
</details>

## Data handling rules

### All build paths
- Use HTTPS (the lock icon in the browser) for everything
- Don't store data you don't need
- Don't send data to services you haven't approved

### Yellow+ (Standard Build and above)
- All user inputs are validated before processing
- Error messages never show technical details to users

### Orange+ (Reviewed Build and above)
- Personal data is encrypted at rest and in transit
- Access controls: users can only see their own data
- Data retention: define how long data is kept and when it's deleted
- Third-party services: list every external service that receives data

### Red (Protected Build)
- Privacy impact assessment completed
- Age-appropriate design (for student-facing): no tracking, no
  data sharing, parental notification if required
- GDPR/COPPA compliance verified with [designated reviewer]
- Incident response plan documented → [incident-report.md template]
- Data processing agreement with all third-party services

## Authentication and access

### Orange+
- Users must log in to access personal/sensitive features
- Passwords: minimum 8 characters, no common passwords
- Sessions expire after inactivity

### Red
- Multi-factor authentication for admin access
- Audit log: who accessed what and when

## What to do if you think something is wrong

→ Stop. Don't try to fix security issues alone.
→ Read [WHEN-TO-ESCALATE.md] and contact your designated reviewer immediately.
```

**Step 2: Self-review**
- [ ] "The one rule" is memorably simple
- [ ] Progressive disclosure on every rule
- [ ] Data privacy for minors (14-18) explicitly covered in Red tier
- [ ] HOW TO CHECK sections include actual keystrokes, not vague instructions
- [ ] Escalation path is clear and non-judgmental
- [ ] Under 400 lines

**Step 3: Commit**

```bash
git add SP-VibeFrame/framework/02-standards/SECURITY.md
git commit -m "feat: add security standard with data privacy and minor protection"
```

---

## Task 5: Branding Standard

**Files:**
- Create: `SP-VibeFrame/framework/02-standards/BRANDING.md`

**Step 1: Write BRANDING.md**

This is a template document — mostly placeholders that get filled during client customization (07-client-config). The core framework version defines the STRUCTURE of branding standards, with example values.

```markdown
# Branding Standard

## Why this matters

Every tool your company puts in front of users represents your brand.
AI tools can generate beautiful UIs — but they default to generic
styling. This guide ensures everything looks and sounds like [Company Name].

## Visual identity

### Colors
[CLIENT: Insert primary, secondary, accent colors with hex codes]

| Usage | Color | Hex |
|-------|-------|-----|
| Primary (buttons, headers) | [e.g., Navy Blue] | [e.g., #1B3A5C] |
| Secondary (accents, links) | [e.g., Teal] | [e.g., #2ABFBF] |
| Background | [e.g., White] | [e.g., #FFFFFF] |
| Text | [e.g., Dark Gray] | [e.g., #333333] |
| Error/warning | [e.g., Red] | [e.g., #D32F2F] |

### Typography
[CLIENT: Insert font families and sizes]

### Logo usage
[CLIENT: Insert logo files and usage rules]

## Tone of voice

[CLIENT: Define how the brand speaks. Example:]

| Do | Don't |
|----|-------|
| "Let's get started" | "Please initiate the process" |
| "Something went wrong" | "Error 500: Internal Server Exception" |
| "You're all set!" | "Process completed successfully" |

## AI-generated content guidelines

When AI generates text that users see (chatbot responses, summaries,
recommendations), it must:
- Match the tone of voice above
- Not mention being AI unless required by policy
- Not make promises or guarantees
- Not use informal language unless the brand voice permits it

## Checking your build against brand

[Accelerator: Provide a simple visual comparison checklist]
```

**Step 2: Self-review**
- [ ] Template structure is clear — client knows exactly what to fill in
- [ ] `[CLIENT: ...]` markers are obvious and searchable
- [ ] AI-generated content guidelines section included
- [ ] Under 200 lines

**Step 3: Commit**

```bash
git add SP-VibeFrame/framework/02-standards/BRANDING.md
git commit -m "feat: add branding standard template with client customization markers"
```

---

## Task 6: Prompt Management Standard

**Files:**
- Create: `SP-VibeFrame/framework/02-standards/PROMPTS.md`

**Step 1: Write PROMPTS.md**

Two categories: Build Prompts (ephemeral) and Production Prompts (artifacts).

```markdown
# Prompt Management Standard

## Two kinds of prompts

### Build prompts (used to create your tool)
What you type into Replit, Cursor, Claude, or any AI tool to generate
code. These are your instructions to the AI while building.

### Production prompts (running inside your tool)
Prompts that your finished tool uses — like a chatbot's system prompt
or an AI summarizer's instructions. These affect what your users see.

**The rule:** Build prompts are temporary notes. Production prompts
are product decisions.

## Build prompt best practices

1. **Start from the prompt library** → [07-client-config/PROMPT-LIBRARY.md]
   <details><summary>WHY</summary>
   Tested prompts give better results faster than starting from scratch.
   </details>

2. **Be specific about what you want**
   - Bad: "Make a dashboard"
   - Good: "Create a dashboard that shows daily active users,
     weekly retention rate, and revenue per user. Use a line chart
     for trends and cards for current values. Use [brand colors]."

3. **Test with 3 variations** (Orange+ builds)
   Write your prompt 3 slightly different ways. Compare the outputs.
   Pick the one that's closest to what you need.

4. **Save your prompts alongside your project** (Yellow+ builds)
   If someone needs to modify your tool later, they need to know
   what instructions you gave the AI.

## Production prompt requirements

### Yellow+ (Standard Build and above)
- Document each production prompt using the
  [Prompt Spec Template](../05-templates/prompt-spec.md)

### Orange+ (Reviewed Build and above)
- All production prompts reviewed for:
  - [ ] Brand voice alignment → [BRANDING.md]
  - [ ] Bias: Does it treat all users fairly?
  - [ ] Safety: Can it produce harmful or misleading output?
  - [ ] Edge cases: What happens with unexpected input?

### Red (Protected Build)
- Production prompts tested with target audience demographics
- Prompt failure modes documented and mitigated
- Prompt version history maintained
```

**Step 2: Self-review**
- [ ] Build vs. production distinction is crystal clear
- [ ] Practical examples included (good/bad prompt comparison)
- [ ] Links to prompt-spec.md template and PROMPT-LIBRARY.md
- [ ] Progressive disclosure
- [ ] Under 250 lines

**Step 3: Commit**

```bash
git add SP-VibeFrame/framework/02-standards/PROMPTS.md
git commit -m "feat: add prompt management standard with build/production distinction"
```

---

## Task 7: All Five Templates

**Files:**
- Create: `SP-VibeFrame/framework/05-templates/project-brief.md`
- Create: `SP-VibeFrame/framework/05-templates/prompt-spec.md`
- Create: `SP-VibeFrame/framework/05-templates/review-request.md`
- Create: `SP-VibeFrame/framework/05-templates/incident-report.md`
- Create: `SP-VibeFrame/framework/05-templates/build-log.md`

**Step 1: Write project-brief.md**

```markdown
# Project Brief

## Fill this out before you start building.

**Project name:** ___

**Builder:** ___ (your name)

**Date:** ___

**Build path:** ___ (from your [Project Intake](../01-intake/PROJECT-INTAKE.md))

### What are you building?
[Describe in 2-3 sentences what this tool does and who it's for.]

### What problem does it solve?
[Why does this tool need to exist? What's the current pain point?]

### What does "done" look like?
[List 3-5 specific things this tool must do to be complete.]
1. ___
2. ___
3. ___

### What tools will you use?
[Which AI tool(s)? See [Tool Selection Guide](../06-guides/TOOL-SELECTION.md)]

### Who needs to know about this?
[Reviewer, stakeholder, anyone affected]

### Target go-live date: ___
```

**Step 2: Write prompt-spec.md**

```markdown
# Prompt Specification

## Use this template for every production prompt in your tool.

**Prompt name:** ___

**Tool/feature it belongs to:** ___

**Last updated:** ___

**Author:** ___

### What does this prompt do?
[One sentence: This prompt tells the AI to ___.]

### The prompt text
```
[Paste the full prompt here]
```

### Expected input
[What kind of data does this prompt receive? Example inputs.]

### Expected output
[What should the AI produce? Include 1-2 example outputs.]

### Known limitations
[When does this prompt give bad results? What inputs cause problems?]

### Testing results
| Test input | Expected output | Actual output | Pass? |
|---|---|---|---|
| [example] | [expected] | [actual] | Y/N |

### Review status
- [ ] Brand voice check → [BRANDING.md]
- [ ] Bias check
- [ ] Safety check
- [ ] Edge case check
```

**Step 3: Write review-request.md**

```markdown
# Review Request

## Fill this out when your build is ready for review.

**Project name:** ___

**Builder:** ___

**Build path:** ___ (Green / Yellow / Orange / Red)

**Reviewer:** ___

**Date submitted:** ___

### What to review
[Link to the tool or project. Brief description of what it does.]

### Checklist status
- [ ] I completed the [build checklist](../04-checklists/) for my path
- [ ] All items are checked or explained below

### Items I couldn't complete or wasn't sure about
[List any checklist items you skipped, and why.]

### Specific areas I want feedback on
[What are you most uncertain about?]

### Deadline for review: ___
```

**Step 4: Write incident-report.md**

```markdown
# Incident Report

## Fill this out when something goes wrong with a live tool.

**Tool name:** ___

**Reported by:** ___

**Date/time discovered:** ___

**Severity:**
- [ ] Low: cosmetic issue, no data affected
- [ ] Medium: functionality broken, workaround exists
- [ ] High: users affected, no workaround
- [ ] Critical: data exposed, safety risk, or legal concern

### What happened?
[Describe what went wrong in plain language.]

### Who is affected?
[Internal users? External users? Students? How many?]

### What did you do immediately?
[Steps taken so far. If you turned the tool off, say so.]

### Root cause (if known)
[What caused this? AI-generated code issue? Configuration? Data?]

### What needs to happen next?
[Steps to resolve. Who needs to be involved?]

### Lessons learned (fill in after resolution)
[What would prevent this from happening again?]
```

**Step 5: Write build-log.md**

```markdown
# Build Log

## Keep a running log of decisions and changes during your build.

**Project name:** ___

**Builder:** ___

**Build path:** ___

**Started:** ___

---

### Entry template (copy for each entry):

**Date:** ___

**What I did:**
[Brief description of work done]

**Decisions made:**
[Any choices you made and why. E.g., "Used Chart.js instead of
D3 because Chart.js was simpler for basic line charts."]

**AI prompts used:**
[Paste or summarize the prompts you gave the AI tool today]

**Issues encountered:**
[Anything that went wrong or surprised you]

**Next steps:**
[What you plan to do next]

---
```

**Step 6: Self-review all templates**
- [ ] Each template is fillable by a non-technical person
- [ ] No jargon without explanation
- [ ] Each template links to relevant framework docs where helpful
- [ ] Templates are concise — no fields that won't be used
- [ ] All have clear instructions at the top

**Step 7: Commit**

```bash
git add SP-VibeFrame/framework/05-templates/
git commit -m "feat: add all 5 framework templates (brief, prompt-spec, review, incident, build-log)"
```

---

## Task 8: Green Checklist + Green Build Guide

**Files:**
- Create: `SP-VibeFrame/framework/04-checklists/GREEN-CHECKLIST.md`
- Create: `SP-VibeFrame/framework/03-build-guides/GREEN-QUICK-BUILD.md`

**Step 1: Write GREEN-CHECKLIST.md (verification mode)**

The Green (Quick Build) checklist has ~6 items. These are universal minimums that apply to every project. Each item is yes/no with progressive disclosure.

```markdown
# Green: Quick Build Checklist

**Your build path:** Quick Build (internal + no sensitive data + throwaway/replaceable)

Complete every item before going live. Expand any item for details.

---

## Pre-Build

- [ ] **I've filled out a [Project Brief](../05-templates/project-brief.md)**
  <details><summary>WHY</summary>
  Even a quick build needs a sentence describing what it does.
  If you can't describe it, you're not ready to build it.
  </details>

## During Build

- [ ] **My work is saved somewhere recoverable**
  <details><summary>WHY</summary>
  If your laptop dies, can you get your work back? Save to a cloud
  tool (Replit, GitHub, Google Drive) — not just your desktop.
  </details>

- [ ] **I've tested it with realistic inputs (not just "test123")**
  <details><summary>WHY</summary>
  "test123" won't reveal problems. Use realistic names, numbers,
  and edge cases (empty fields, very long text, special characters).
  </details>

## Pre-Ship

- [ ] **It does what the project brief says it does**
  <details><summary>WHY</summary>
  Open your project brief. Walk through each "done" criterion.
  Does the tool do all of them?
  </details>

- [ ] **No secrets (API keys, passwords) are visible in the code**
  <details><summary>WHY</summary>
  Anyone who sees your code can use your accounts and your data.
  </details>
  <details><summary>HOW TO CHECK</summary>
  Search your code for: sk-, api_key, secret, password, token,
  any long random string. If you find any, move them to
  environment variables or ask for help.
  </details>

- [ ] **There's a way to turn it off if something goes wrong**
  <details><summary>WHY</summary>
  You need a kill switch. "I can delete the deployment" counts.
  Know how to do it before you need to.
  </details>

---

All checked? **You're good to go.**

Your tool starts as Green, but if it changes (handles new data,
gets new users, becomes more critical), re-run the
[Project Intake](../01-intake/PROJECT-INTAKE.md) to check if
your path has changed.
```

**Step 2: Write GREEN-QUICK-BUILD.md (learning mode)**

Same content as the checklist, but as a step-by-step guide with full instructions, accelerators, and teaching moments. This is what a first-time builder follows.

Structure:

```markdown
# Green: Quick Build Guide

You're building something quick — an internal tool, a prototype,
or a throwaway. This guide walks you through it step by step.

**Time estimate:** Most people finish a Green build in 1-4 hours
depending on complexity. The framework part takes about 15 minutes.

---

## Step 1: Define what you're building (5 min)

Fill out the [Project Brief](../05-templates/project-brief.md).

[Full instructions on how to fill it out, with an example of a
completed brief for a "team meeting notes dashboard"]

### Accelerator
Check with your team first — someone may have already built
something similar. A 2-minute Slack message could save you hours.

---

## Step 2: Pick your tool

[Reference TOOL-SELECTION.md, with a quick summary for Green builds:
"For a Quick Build, almost any tool works. Replit, Lovable, Bolt —
pick what you're most comfortable with. If you've never used any
of them, start with [recommendation from APPROVED-TOOLS.md]."]

---

## Step 3: Build it

[Prompt writing guidance specific to Green builds. Reference
PROMPT-LIBRARY.md. Include a concrete example of a good build
prompt for an internal dashboard.]

### Accelerator
Start from the prompt library: [link]. These prompts are tested
and produce better results than starting from scratch.

---

## Step 4: Test it

[Specific testing instructions for non-engineers. What to try,
what to look for, how to document issues.]

---

## Step 5: Secure it

[The secrets check from the checklist, but as a full walkthrough
with screenshots or detailed keystrokes.]

---

## Step 6: Ship it

[How to make it accessible to your team. Include the kill-switch
reminder.]

---

## Done!

You just completed your first VCF build. The checklist version of
everything you just did is at [GREEN-CHECKLIST.md] — next time,
you might prefer that instead.
```

**Step 3: Self-review**
- [ ] Checklist has exactly 6 items (matching design spec)
- [ ] Build guide covers the same 6 items as step-by-step instructions
- [ ] Guide includes accelerator items (prompt library, existing work check)
- [ ] Guide includes an example project throughout
- [ ] Both documents are self-contained
- [ ] Guide explicitly points to checklist for future use (graduation path)

**Step 4: Commit**

```bash
git add SP-VibeFrame/framework/03-build-guides/GREEN-QUICK-BUILD.md SP-VibeFrame/framework/04-checklists/GREEN-CHECKLIST.md
git commit -m "feat: add Green (Quick Build) guide and checklist"
```

---

## Task 9: Yellow Checklist + Yellow Build Guide

**Files:**
- Create: `SP-VibeFrame/framework/04-checklists/YELLOW-CHECKLIST.md`
- Create: `SP-VibeFrame/framework/03-build-guides/YELLOW-STANDARD-BUILD.md`

**Step 1: Write YELLOW-CHECKLIST.md**

Yellow (Standard Build) includes all Green items PLUS ~4 additional items:

Additional Yellow items (beyond Green's 6):
- [ ] **Someone other than me has used this tool and given feedback** (not "looked at" — USED it)
- [ ] **My AI prompts are documented** (saved alongside project or in build log)
- [ ] **It looks and feels like our company** (correct colors, logo, tone — see [BRANDING.md])
- [ ] **My peer has reviewed and approved it** (use [Review Request template](../05-templates/review-request.md))

Total: ~10 items. Each with progressive disclosure.

Format: Include all Green items first (clearly labeled as "Items 1-6: Same as Quick Build"), then Yellow-specific items.

**Step 2: Write YELLOW-STANDARD-BUILD.md**

Same pattern as Green guide but with additional steps for:
- Peer review process (how to request, what to expect)
- Prompt documentation (how to save prompts, where, why)
- Brand alignment check (how to verify against BRANDING.md)
- Example project: "team performance dashboard with business metrics"

**Step 3: Self-review**
- [ ] All Green items are included (superset)
- [ ] Additional items are clearly marked as Yellow-specific
- [ ] Peer review process is clear and non-intimidating
- [ ] Guide has accelerator items

**Step 4: Commit**

```bash
git add SP-VibeFrame/framework/03-build-guides/YELLOW-STANDARD-BUILD.md SP-VibeFrame/framework/04-checklists/YELLOW-CHECKLIST.md
git commit -m "feat: add Yellow (Standard Build) guide and checklist"
```

---

## Task 10: Orange Checklist + Orange Build Guide

**Files:**
- Create: `SP-VibeFrame/framework/04-checklists/ORANGE-CHECKLIST.md`
- Create: `SP-VibeFrame/framework/03-build-guides/ORANGE-REVIEWED-BUILD.md`

**Step 1: Write ORANGE-CHECKLIST.md**

Orange (Reviewed Build) includes all Yellow items PLUS ~4 additional items:

Additional Orange items (beyond Yellow's 10):
- [ ] **Data is handled correctly** (encrypted, not over-collected, not sent to unauthorized services)
- [ ] **It's accessible** (keyboard navigable, readable contrast, alt text, works on mobile — use WAVE or Lighthouse)
- [ ] **Someone with security/technical knowledge has reviewed it** (structured review using Review Request template)
- [ ] **There's an error page or fallback** (users see a helpful message, not a blank screen or raw error)

Total: ~14 items.

**Step 2: Write ORANGE-REVIEWED-BUILD.md**

Additional sections beyond Yellow guide:
- Data handling walkthrough (what to check, how to check it)
- Accessibility basics for non-engineers (with free tool recommendations)
- How to request a technical/security review
- Error handling: what good error pages look like
- Example project: "parent-facing communication portal"

**Step 3: Self-review**
- [ ] All Yellow items included (superset)
- [ ] Accessibility section is practical, not theoretical
- [ ] Data handling section covers the ed-tech use case (student data)
- [ ] Security review process doesn't require the builder to be technical

**Step 4: Commit**

```bash
git add SP-VibeFrame/framework/03-build-guides/ORANGE-REVIEWED-BUILD.md SP-VibeFrame/framework/04-checklists/ORANGE-CHECKLIST.md
git commit -m "feat: add Orange (Reviewed Build) guide and checklist"
```

---

## Task 11: Red Checklist + Red Build Guide

**Files:**
- Create: `SP-VibeFrame/framework/04-checklists/RED-CHECKLIST.md`
- Create: `SP-VibeFrame/framework/03-build-guides/RED-PROTECTED-BUILD.md`

**Step 1: Write RED-CHECKLIST.md**

Red (Protected Build) includes all Orange items PLUS ~4 additional items:

Additional Red items (beyond Orange's 14):
- [ ] **Data privacy compliance verified** (for students under 18: no tracking, no sharing, parental notification if required)
- [ ] **Incident response plan documented** (who gets notified, first action, where are credentials — use [incident-report.md template])
- [ ] **Designated reviewer has signed off** (named person, recorded date)
- [ ] **Re-intake date scheduled** (30 days or at first real usage milestone — put it in someone's calendar)

Total: ~18 items.

**Step 2: Write RED-PROTECTED-BUILD.md**

Additional sections beyond Orange guide:
- Privacy compliance walkthrough (COPPA/GDPR basics for ed-tech)
- Writing an incident response plan (with completed example)
- Working with a designated reviewer (what to expect, how to prepare)
- The re-intake process (why it matters, how to schedule it)
- Example project: "student-facing learning recommendation tool"

**Step 3: Self-review**
- [ ] All Orange items included (superset)
- [ ] Privacy for minors (14-18) is specifically addressed with actionable steps
- [ ] Incident response section includes a completed example, not just a template
- [ ] Re-intake trigger is the "silent escalation fix" from the design
- [ ] The Red path feels like "maximum support" not "maximum punishment"

**Step 4: Commit**

```bash
git add SP-VibeFrame/framework/03-build-guides/RED-PROTECTED-BUILD.md SP-VibeFrame/framework/04-checklists/RED-CHECKLIST.md
git commit -m "feat: add Red (Protected Build) guide and checklist"
```

---

## Task 12: Tool Selection Guide

**Files:**
- Create: `SP-VibeFrame/framework/06-guides/TOOL-SELECTION.md`

**Step 1: Write TOOL-SELECTION.md**

Content from design sections 8.1, 8.2, 8.3:
- The tiered tooling matrix (No-Code / Low-Code / Pro Tools)
- The tool selection flow (decision tree)
- Replit-specific assessment
- The "start low, escalate if needed" principle
- How tool choice interacts with build paths (Green/Yellow → any tool, Orange/Red → consider Pro Tools)

Must include:
- A concrete recommendation for each build path
- Exit strategy considerations (what happens when you outgrow a tool)
- Cost considerations at scale
- A [CLIENT: Insert approved tools here] section linking to 07-client-config/APPROVED-TOOLS.md

**Step 2: Self-review**
- [ ] Decision tree is unambiguous
- [ ] Replit assessment is balanced (strengths AND limits)
- [ ] Non-technical person can follow the tool selection flow
- [ ] Links to APPROVED-TOOLS.md for client-specific decisions
- [ ] Under 300 lines

**Step 3: Commit**

```bash
git add SP-VibeFrame/framework/06-guides/TOOL-SELECTION.md
git commit -m "feat: add tool selection guide with tiered strategy and Replit assessment"
```

---

## Task 13: Supporting Guides (FIRST-BUILD, WHEN-TO-ESCALATE, GLOSSARY)

**Files:**
- Create: `SP-VibeFrame/framework/06-guides/FIRST-BUILD.md`
- Create: `SP-VibeFrame/framework/06-guides/WHEN-TO-ESCALATE.md`
- Create: `SP-VibeFrame/framework/06-guides/GLOSSARY.md`

**Step 1: Write FIRST-BUILD.md**

A complete end-to-end walkthrough of building a simple internal tool using VCF. This is the "onboarding" experience.

Structure:
- "Welcome" (3 lines — what this walkthrough does)
- Step 1: Fill out the Project Intake (with pre-filled example answers)
- Step 2: See your build path (explains what just happened)
- Step 3: Fill out the Project Brief (with completed example)
- Step 4: Follow your Build Guide (walks through the Green guide)
- Step 5: Run the Checklist (walks through checking off items)
- Step 6: Ship it
- "What's next" (how to do your second build without this walkthrough)

Example project: "A simple team directory page that shows everyone's name, role, and contact info." (Green build — simplest possible.)

**Step 2: Write WHEN-TO-ESCALATE.md**

This document normalizes asking for help. It must feel like a safety net, not a failure admission.

```markdown
# When to Escalate

## This is not a failure page.

If you're here, you're doing exactly the right thing. Asking for
help early prevents problems. Not asking creates them.

## When to escalate

- [ ] **"I don't know which build path my project is."**
  → Re-run the [Project Intake]. If you're still unsure, message
  [escalation contact from ROLES.md].

- [ ] **"I'm stuck on a checklist item."**
  → Skip it and note it in your [Review Request]. Your reviewer
  will help you resolve it.

- [ ] **"I think there might be a security issue."**
  → Stop building. Contact [security contact from ROLES.md]
  immediately. Better safe than sorry.

- [ ] **"My tool is live and something went wrong."**
  → Fill out the [Incident Report](../05-templates/incident-report.md).
  If it's Critical severity, call [emergency contact] now.

- [ ] **"I'm not sure if AI-generated output is correct."**
  → Never trust AI output without checking. If you can't verify
  it yourself, ask someone who can.

- [ ] **"This framework doesn't cover my situation."**
  → That's expected — no framework covers everything. Message
  [framework contact] and we'll figure it out together.

## Who to contact

→ See [ROLES.md](../07-client-config/ROLES.md) for your company's
specific contacts.
```

**Step 3: Write GLOSSARY.md**

Plain-language definitions for every term used in VCF. Include both technical terms AND process terms.

Terms to include:
- Build path, Quick/Standard/Reviewed/Protected Build
- Project Intake, Project Brief, Build Log
- API key, environment variable, HTTPS, encryption
- Accessibility, COPPA, GDPR
- Production prompt, build prompt
- Kill switch, incident, escalation
- Peer review, designated reviewer
- Progressive disclosure (meta — explain the framework's own approach)

Format: Alphabetical, one paragraph each, cross-linked to relevant framework docs.

**Step 4: Self-review**
- [ ] FIRST-BUILD is a complete walkthrough a non-engineer can follow
- [ ] WHEN-TO-ESCALATE normalizes help-seeking (language is warm, not clinical)
- [ ] GLOSSARY covers every term used across all framework docs
- [ ] All three documents are self-contained

**Step 5: Commit**

```bash
git add SP-VibeFrame/framework/06-guides/
git commit -m "feat: add supporting guides (first build, escalation, glossary)"
```

---

## Task 14: Client Configuration Templates

**Files:**
- Create: `SP-VibeFrame/framework/07-client-config/COMPANY-CONTEXT.md`
- Create: `SP-VibeFrame/framework/07-client-config/APPROVED-TOOLS.md`
- Create: `SP-VibeFrame/framework/07-client-config/ROLES.md`
- Create: `SP-VibeFrame/framework/07-client-config/PROMPT-LIBRARY.md`

**Step 1: Write COMPANY-CONTEXT.md**

Template for client-specific values, policies, and constraints.

```markdown
# Company Context

## About [Company Name]

**Industry:** ___
**Size:** ___
**Primary AI use cases:** ___

## Company values that affect how we build

[CLIENT: What principles guide your work? E.g., "student safety
first," "move fast but don't break things," "everything is accessible"]

## Constraints

[CLIENT: What can't we do? E.g., "no tools hosted outside EU,"
"all student data stays on-premise," "no tools that require
credit card info from users"]

## Compliance requirements

[CLIENT: What regulations apply? E.g., COPPA, GDPR, FERPA,
industry-specific requirements]

## AI policy

[CLIENT: Company's position on AI usage. E.g., "AI is encouraged
for building tools but all outputs must be human-reviewed before
going to students"]
```

**Step 2: Write APPROVED-TOOLS.md**

```markdown
# Approved Tools

## AI coding tools approved for use

| Tool | Approved for | Not approved for | Notes |
|------|-------------|-----------------|-------|
| [e.g., Replit Agent] | Green, Yellow builds | Orange, Red builds | [reason] |
| [e.g., Cursor] | All build paths | — | [reason] |
| [CLIENT: Add tools] | | | |

## Requesting a new tool

If you want to use a tool not on this list:
1. [Process for requesting approval]
2. [Who approves]
3. [Criteria for approval]
```

**Step 3: Write ROLES.md**

```markdown
# Roles & Contacts

## Framework roles

| Role | Person | Contact | Responsibilities |
|------|--------|---------|-----------------|
| **Peer reviewer** | [any team member] | — | Reviews Yellow builds |
| **Technical reviewer** | [CLIENT: Name] | [CLIENT: email] | Reviews Orange builds for security/data |
| **Designated reviewer** | [CLIENT: Name] | [CLIENT: email] | Signs off Red builds |
| **Framework contact** | [CLIENT: Name] | [CLIENT: email] | Questions about VCF itself |
| **Emergency contact** | [CLIENT: Name] | [CLIENT: phone] | Critical incidents |
```

**Step 4: Write PROMPT-LIBRARY.md**

```markdown
# Prompt Library

## Tested prompts for common build tasks

These prompts have been tested and produce reliable results. Start
from these instead of writing from scratch.

### Internal dashboard
[Tested prompt for building a basic dashboard]

### Data entry form
[Tested prompt for building a form with validation]

### Landing page
[Tested prompt for building a branded landing page]

### Student-facing content page (Red path)
[Tested prompt with safety/privacy constraints built in]

---

## How to add to this library

Built a great prompt? Share it:
1. Document it using the [Prompt Spec Template](../05-templates/prompt-spec.md)
2. Submit it to [framework contact] for inclusion

[CLIENT: Add company-specific prompts here]
```

**Step 5: Self-review**
- [ ] All [CLIENT: ...] markers are obvious and searchable
- [ ] Templates are usable as-is for a DWY workshop
- [ ] ROLES.md covers all escalation paths referenced elsewhere
- [ ] PROMPT-LIBRARY.md has at least 4 starter prompts

**Step 6: Commit**

```bash
git add SP-VibeFrame/framework/07-client-config/
git commit -m "feat: add client configuration templates (context, tools, roles, prompt library)"
```

---

## Task 15: Cross-Document Consistency Review

**Files:**
- Modify: All files in `SP-VibeFrame/framework/`

**Step 1: Link audit**

Check every cross-reference link in every document. Verify:
- All `[text](../path/file.md)` links point to files that exist
- All references to ROLES.md, BRANDING.md, etc. are consistent
- No broken links, no orphaned references

**Step 2: Terminology audit**

Verify consistent terminology across all documents:
- "build path" (not "tier" or "level" or "track")
- "Green / Yellow / Orange / Red" (not "Tier 1-4")
- "Quick Build / Standard Build / Reviewed Build / Protected Build"
- "builder" (not "developer" or "user" or "employee")
- "designated reviewer" (not "approver" or "sign-off authority")

**Step 3: Progressive disclosure audit**

Check that every checklist item and critical guide step has:
- One-liner (always present)
- WHY section (always present)
- HOW TO CHECK section (present where the "how" isn't obvious)

**Step 4: Accelerator audit**

Check that each build guide has a roughly 50/50 split of:
- Accelerator items (save time: templates, library references, reuse checks)
- Safeguard items (reduce risk: security, review, compliance)

**Step 5: Commit**

```bash
git add SP-VibeFrame/framework/
git commit -m "fix: cross-document consistency pass (links, terms, disclosure, accelerators)"
```

---

## Task 15.5: Content Verification Pass

**Files:**
- Create: `SP-VibeFrame/framework/VERIFICATION-LOG.md`
- Modify: `SP-VibeFrame/framework/02-standards/SECURITY.md`
- Modify: `SP-VibeFrame/framework/02-standards/PROMPTS.md`
- Modify: `SP-VibeFrame/framework/03-build-guides/RED-PROTECTED-BUILD.md`
- Modify: `SP-VibeFrame/framework/04-checklists/RED-CHECKLIST.md`
- Modify: `SP-VibeFrame/framework/06-guides/TOOL-SELECTION.md`
- Modify: `SP-VibeFrame/framework/07-client-config/PROMPT-LIBRARY.md`

**Purpose:** Every factual claim in VCF that references regulations, tool capabilities, security practices, or industry standards must be verified against current sources and logged with an audit trail Ved can cross-check.

**Step 1: Create VERIFICATION-LOG.md**

This is the single audit artifact. Structure:

```markdown
# Verification Log

Last updated: YYYY-MM-DD

## How to read this log

Every factual claim in VCF that references external standards,
regulations, tool capabilities, or industry practices is logged
here. Each entry records: what was claimed, where it appears,
how it was verified, the source URL, and the verification date.

**To cross-verify:** Click any source link and confirm the claim
matches the source. If a source is outdated or contradicts the
claim, flag it for the next verification cycle.

---

## Entry format

| Field | Description |
|-------|-------------|
| **ID** | Sequential (R-001, T-001, S-001, P-001, A-001) |
| **Claim** | The specific factual statement made in VCF |
| **Document** | Which VCF file contains it (with line reference) |
| **Category** | Regulation / Tool / Security / Prompt / Accessibility |
| **Method** | How verified: official-docs, web-research, live-tested, expert-review |
| **Source** | URL or reference, with date accessed |
| **Verified by** | Who performed the verification |
| **Status** | Verified / Needs-Update / Unverified / Disputed |
| **Date** | YYYY-MM-DD of verification |
| **Notes** | Caveats, jurisdiction limits, version-specific info |

---

## Regulations & Compliance (R-xxx)

| ID | Claim | Document | Method | Source | Verified by | Status | Date | Notes |
|----|-------|----------|--------|--------|-------------|--------|------|-------|
| R-001 | [e.g., COPPA applies to...] | SECURITY.md:L42 | official-docs | [ftc.gov/...] (accessed YYYY-MM-DD) | Claude + Ved | Verified | YYYY-MM-DD | US jurisdiction only |
| ... | | | | | | | | |

## Tool Capabilities (T-xxx)

| ID | Claim | Document | Method | Source | Verified by | Status | Date | Notes |
|----|-------|----------|--------|--------|-------------|--------|------|-------|
| T-001 | [e.g., Replit supports env vars] | TOOL-SELECTION.md:L28 | official-docs + live-tested | [docs.replit.com/...] (accessed YYYY-MM-DD) | Claude + Ved | Verified | YYYY-MM-DD | As of Replit v[x] |
| ... | | | | | | | | |

## Security Practices (S-xxx)

| ID | Claim | Document | Method | Source | Verified by | Status | Date | Notes |
|----|-------|----------|--------|--------|-------------|--------|------|-------|
| ... | | | | | | | | |

## Prompt Engineering (P-xxx)

| ID | Claim | Document | Method | Source | Verified by | Status | Date | Notes |
|----|-------|----------|--------|--------|-------------|--------|------|-------|
| ... | | | | | | | | |

## Accessibility Standards (A-xxx)

| ID | Claim | Document | Method | Source | Verified by | Status | Date | Notes |
|----|-------|----------|--------|--------|-------------|--------|------|-------|
| ... | | | | | | | | |

---

## Verification Schedule

| Document | Risk Level | Verify Every | Next Due |
|----------|-----------|-------------|----------|
| SECURITY.md | High | 90 days | YYYY-MM-DD |
| RED-PROTECTED-BUILD.md | High | 90 days | YYYY-MM-DD |
| TOOL-SELECTION.md | High | 60 days (tools change fast) | YYYY-MM-DD |
| PROMPTS.md | Medium-High | 90 days | YYYY-MM-DD |
| PROMPT-LIBRARY.md | Medium-High | 90 days | YYYY-MM-DD |
| QUALITY.md | Low | 180 days | YYYY-MM-DD |
| BRANDING.md | Low | On client change only | N/A |
| GREEN/YELLOW checklists | Low-Medium | 180 days | YYYY-MM-DD |
| ORANGE checklist | Medium | 90 days | YYYY-MM-DD |
| RED checklist | High | 90 days | YYYY-MM-DD |
```

**Step 2: Research and verify SECURITY.md claims**

For each factual claim in SECURITY.md, perform targeted research:

- COPPA: Verify current FTC requirements, age thresholds, parental consent rules → source: ftc.gov/coppa
- GDPR for minors: Verify Article 8 thresholds, jurisdiction variations → source: gdpr-info.eu
- OWASP: Verify current top 10 and recommended practices → source: owasp.org
- Encryption standards: Verify current TLS/HTTPS recommendations → source: NIST
- Password requirements: Verify current NIST 800-63B guidance (not legacy "special char" rules) → source: NIST

For each claim: update the document if needed, add `<!-- Verified: [ID] -->` HTML comment inline, and log the entry in VERIFICATION-LOG.md.

**Step 3: Research and verify TOOL-SELECTION.md claims**

For each tool mentioned:
- Check official docs for current capabilities, pricing, limitations
- Verify the comparison matrix is accurate
- Check if any tools have been discontinued, rebranded, or significantly changed
- Update claims and log in VERIFICATION-LOG.md

Tools to check: Replit Agent, Lovable, Bolt, v0, Cursor, Claude Code

**Step 4: Research and verify RED guide and checklist claims**

- Privacy for minors: cross-reference with SECURITY.md verification
- Accessibility: verify WCAG version cited, testing tool recommendations (WAVE, Lighthouse current versions)
- Incident response: verify recommendations against current NIST incident response framework
- Log all entries

**Step 5: Research and verify PROMPTS.md and PROMPT-LIBRARY.md claims**

- Prompt engineering best practices: verify against current Anthropic, OpenAI, and Google documentation
- Testing methodology ("3 variations"): verify this is current recommended practice
- Prompt template examples: verify they produce reasonable results with current tool versions
- Log all entries

**Step 6: Add inline verification markers to all high-risk documents**

Every verified factual claim gets an HTML comment: `<!-- Verified: [ID] - see VERIFICATION-LOG.md -->`

This is invisible to builders but lets Ved (or a future auditor) trace any claim back to its source.

**Step 7: Self-review the verification log**
- [ ] Every factual claim in high-risk docs has a log entry
- [ ] Every entry has a clickable source URL
- [ ] Every entry has a verification date
- [ ] Verification schedule is populated with next-due dates
- [ ] No "Unverified" entries remain in high-risk documents

**Step 8: Commit**

```bash
git add SP-VibeFrame/framework/VERIFICATION-LOG.md SP-VibeFrame/framework/02-standards/ SP-VibeFrame/framework/03-build-guides/ SP-VibeFrame/framework/04-checklists/ SP-VibeFrame/framework/06-guides/ SP-VibeFrame/framework/07-client-config/
git commit -m "feat: add verification log and verify all high-risk content against current sources"
```

---

## Task 16: Framework README and Versioning

**Files:**
- Create: `SP-VibeFrame/framework/VERSION.md`
- Modify: `SP-VibeFrame/framework/START-HERE.md` (add version reference)

**Step 1: Write VERSION.md**

```markdown
# VCF Version History

## v1.0.0 (2026-03-XX)

Initial release of the Vibe Coding Framework.

### Included:
- Project Intake with 5-question classification
- 4 build paths (Green, Yellow, Orange, Red)
- Build Guides (learning mode) for all 4 paths
- Checklists (verification mode) for all 4 paths
- 4 standards (Quality, Security, Branding, Prompts)
- 5 templates (Brief, Prompt Spec, Review Request, Incident Report, Build Log)
- 4 supporting guides (First Build, Tool Selection, Escalation, Glossary)
- Client configuration templates

### Not yet included (planned for v1.1+):
- AI tool configurations (folder 08)
- Build registry
- Automated compliance tracking
- Web portal
```

**Step 2: Update START-HERE.md with version reference**

Add a footer line: `VCF v1.0.0 — [VERSION.md](VERSION.md)`

**Step 3: Final commit**

```bash
git add SP-VibeFrame/framework/
git commit -m "feat: add versioning and finalize VCF v1.0.0 framework"
```

---

## Summary: Task Dependency Order

```
Task 1:    Scaffolding + START-HERE.md
Task 2:    Project Intake (classification) ← depends on Task 1
Task 3:    Quality Standard ← depends on Task 1
Task 4:    Security Standard ← depends on Task 1
Task 5:    Branding Standard ← depends on Task 1
Task 6:    Prompt Management Standard ← depends on Task 1
Task 7:    All 5 Templates ← depends on Tasks 3-6 (references standards)
Task 8:    Green Guide + Checklist ← depends on Tasks 2, 3-6, 7
Task 9:    Yellow Guide + Checklist ← depends on Task 8 (superset)
Task 10:   Orange Guide + Checklist ← depends on Task 9 (superset)
Task 11:   Red Guide + Checklist ← depends on Task 10 (superset)
Task 12:   Tool Selection Guide ← depends on Task 1
Task 13:   Supporting Guides ← depends on Tasks 8-11 (references build paths)
Task 14:   Client Config Templates ← depends on Tasks 3-6 (references standards)
Task 15:   Cross-Document Consistency Review ← depends on all above
Task 15.5: Content Verification Pass ← depends on Task 15 (verifies finalized content)
Task 16:   Versioning + Final Packaging ← depends on Task 15.5
```

**Parallelizable groups:**
- Tasks 3, 4, 5, 6, 12 can run in parallel (independent standards + tool guide)
- Tasks 7, 14 can run in parallel after standards complete
- Tasks 8-11 are strictly sequential (each is a superset)
- Tasks 15, 15.5, 16 are strictly sequential (final passes)

**Total tasks: 17**
**Estimated commits: 17**

### Verification artifacts produced:
- `VERIFICATION-LOG.md` — audit trail with source URLs, methods, dates for every factual claim
- Inline `<!-- Verified: [ID] -->` markers in all high-risk documents
- Verification schedule with next-due dates per document
- All entries use format: Claim → Document:Line → Method → Source URL → Status → Date
