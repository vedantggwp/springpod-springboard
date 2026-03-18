# SpringBoard Content Architecture

**Purpose:** Map every content block to its intent, audience, and placement rationale — so anyone designing, building, or extending SpringBoard knows *why* things are where they are.

**Date:** 2026-03-14

---

## The Core Design Thesis

SpringBoard solves one problem: **80 non-technical employees at an EdTech company want to build with AI, but the company handles data for children under 18.** The framework must let low-risk work move fast while ensuring high-risk work gets proportional scrutiny.

The entire site is organized around a single principle: **risk-proportional friction.** A curriculum designer making a quiz formatter should not endure the same process as a product engineer shipping student-facing AI. Every content block exists to either (a) classify risk, (b) guide proportional action, or (c) verify proportional compliance.

---

## User Personas (5 Roles)

| Role | Typical risk | Mental model | What they need from the framework |
|------|-------------|--------------|-----------------------------------|
| **Curriculum Designer** | Green/Yellow | "I make educational content. I want AI to help format, generate quizzes, summarize." | Permission to move fast + clear guardrails for student-facing content |
| **Ops & Partnerships** | Green/Yellow | "I manage dashboards, reports, partner data. I want automation." | Data handling clarity (what's PII, what's not) + partner confidentiality rules |
| **Product & Engineering** | Orange/Red | "I build platform features. I know code. I need the compliance checklist." | Technical review process + security/safeguarding standards + incident planning |
| **Marketing** | Green/Yellow | "I write copy and run campaigns. I want AI to help with content." | Brand voice rules + age-appropriate language + quick approval path |
| **Leadership** | Reads all | "I approve budgets and own risk. I need the overview." | Risk exposure summary + escalation paths + who approves what |

---

## The User Journey (Content Blocks as Waypoints)

```
┌─────────────┐
│  Entry       │  Role page or homepage
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Classify    │  Intake quiz (5 ChecklistItems)
└──────┬──────┘
       │  → Assigns: Green / Yellow / Orange / Red
       ▼
┌─────────────┐
│  Plan        │  Project Brief form (ChecklistItems + tables)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Build       │  Build Guide for assigned path (StepCards + Collapsibles)
│              │  + Approved Tools + Prompt Library
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Verify      │  Checklist for assigned path (ChecklistItems + Collapsibles)
│              │  + Standards pages (referenced from checklist items)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Review      │  Review Request form → peer / technical / designated
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Ship        │  Build Log + kill switch documentation
└─────────────┘
```

Each box above corresponds to a *content phase*. The blocks within each phase are chosen to match the user's cognitive state at that moment.

---

## Content Block Inventory

### 1. ChecklistItem (Interactive Checkbox)

**What it is:** A persistent checkbox that saves state to `localStorage`. Each has a unique ID (e.g., `green-1`, `intake-q1`). State survives browser refreshes.

**Where it appears and why:**

| Location | Count | Purpose | Who uses it |
|----------|-------|---------|-------------|
| **Intake quiz** | 5 | Risk classification questions — each answer raises or maintains risk level | Everyone (first visit) |
| **Green Checklist** | 6 | Minimum viable verification for low-risk builds | Self-builders doing Green path |
| **Yellow Checklist** | 10 | Green items + peer review + brand match + prompt docs | Team members doing Yellow path |
| **Orange Checklist** | 14 | Yellow items + data handling + access control + technical review | Builders with external-facing tools |
| **Red Checklist** | 18 | Orange items + privacy compliance + incident plan + designated reviewer | Engineers building for students |
| **Project Brief** | ~5 | Stakeholder identification, scope definition | Everyone before building |
| **Prompt Spec** | ~6 | Production prompt testing verification | Red path builders |
| **Incident Report** | ~8 | Severity classification, root cause, action tracking | Anyone reporting an incident |
| **Review Request** | ~4 | Pre-submission completion check | Yellow+ builders requesting review |
| **Standards pages** | ~20 | Individual requirement tracking per standard | Builders verifying compliance |

**Design rationale:**
- Checkboxes create a **completion contract**. When you check a box, you're asserting "I did this." That's psychologically different from reading a bullet point.
- `localStorage` persistence means a user can close the tab, come back tomorrow, and resume where they left off. This matters because Orange/Red builds span multiple days.
- The cumulative pattern (Green's 6 items appear inside Yellow's 10, inside Orange's 14, inside Red's 18) means the framework **never asks you to do less than the path below you.** This is the core risk-proportional design.

**Key insight:** Checkboxes on the **intake page** serve a completely different function than checkboxes on **checklists**. Intake checkboxes are *diagnostic* (classify risk). Checklist checkboxes are *assertive* (verify compliance). They use the same component but serve opposite cognitive purposes.

---

### 2. Collapsible (Expandable Section)

**What it is:** An accordion that hides content behind a click. Six variants with distinct visual treatments:

| Variant | Color | Icon | Purpose |
|---------|-------|------|---------|
| `why` | Teal | Lightbulb | Explains the reasoning behind a requirement |
| `how` | Blue | Wrench | Step-by-step verification instructions |
| `tip` | Teal | Star | Best practice, optional improvement |
| `example` | Gray | Code | Concrete illustration |
| `warning` | Red | Alert | Caution about common mistake |
| `info` | Teal | Info | Supplementary context |

**Where it appears and why:**

| Location | Dominant variants | Purpose |
|----------|-------------------|---------|
| **Standards pages** | `why` + `how` (paired) | Every requirement has "why does this matter?" and "how do I check?" |
| **Build Guides** | `tip` + `example` | Expand guidance for complex steps without overwhelming the main flow |
| **Checklists** | `why` + `how` (nested inside ChecklistItems) | Let experienced users skip explanations, let newcomers dig in |
| **Role pages** | `tip` | "Common scenarios" for each role — e.g., "I want to generate quiz questions" |
| **Forms** | `example` | Show a filled-out example of the form |

**Design rationale:**
- The `why` / `how` pair is the backbone of the entire framework. It solves the tension between **policy** (you must do X) and **education** (here's why X matters and how to verify it). Without collapsibles, every standards page would be 3x longer and unreadable.
- **Progressive disclosure** is essential because the audience ranges from leadership (who needs the "why" but not the "how") to engineers (who need the "how" but already know the "why").
- Collapsibles inside ChecklistItems create a **three-layer depth**: checkbox label (assertion) → why (reasoning) → how (procedure). Users self-select their depth.

**Key insight:** The `why` variant is the most important content in the entire framework. It's what turns compliance theater into genuine understanding. A curriculum designer who reads "WHY: A tool that only partially works creates confusion — people assume it's complete" will internalize the standard. One who just checks a box won't.

---

### 3. StepCard (Numbered Sequential Step)

**What it is:** A numbered circle connected by a vertical line to the next step. Contains a title, description, and optional CTA link.

**Where it appears:**

| Location | Steps | Purpose |
|----------|-------|---------|
| **Homepage** | 4 | The entire framework summarized: Tell us → Get path → Follow guide → Run checklist |
| **Design System Components** | 3 | Educational example showing how StepCards work |

**Design rationale:**
- StepCards exist **only on the homepage** because the homepage's job is to make the framework feel simple. Four steps. That's it. The visual connector line creates a sense of inevitability — step 1 leads to step 2 leads to step 3.
- They are deliberately NOT used inside build guides. Build guides use numbered headings (`## Step 1: ...`) instead. Why? Because StepCards imply a linear, no-branching flow. Build guides have branching (collapsibles, conditional sections), so headings are more honest.

**Key insight:** The homepage StepCards are a **trust signal**. They tell a non-technical employee: "This process has four steps. You can do this." The framework's biggest risk is that people skip it entirely because it looks bureaucratic. StepCards counter that by making it feel lightweight.

---

### 4. Card + CardGrid (Content Navigation Tiles)

**What it is:** A linked tile with title, icon, and description. Grouped in responsive 2- or 3-column grids.

**Where it appears:**

| Location | Cards | Purpose |
|----------|-------|---------|
| **Homepage "What's in this framework?"** | 7 | Site map — one card per major section |
| **Role pages** | 6-9 per page | Curated links to the 4-5 most relevant pages for that role |
| **Design System** | Color/typography cards | Visual reference tiles |
| **Guides** | Scattered | Cross-links to related content |

**Design rationale:**
- Cards solve the **"where do I go?"** problem. A sidebar lists everything alphabetically. Cards list things **by relevance to your current context.** A curriculum designer's role page shows 6 cards, not 38 pages.
- The 2-column grid is used for detailed cards (role pages). The 3-column grid is used for overview cards (homepage). This isn't arbitrary — wider cards accommodate longer descriptions.

**Key insight:** Role pages are **curated entry points**, not content pages. They contain almost no original content — just CardGrids pointing elsewhere. This is intentional: roles change, but standards don't. By keeping role pages as thin routing layers, the framework can add a new role (e.g., "Data Analyst") without duplicating any standards content.

---

### 5. Admonition (Callout Box)

**What it is:** A colored box with icon, optional title, and content. Six types (info, tip, warning, danger, note, success).

**Where it appears:**

| Location | Type | Purpose |
|----------|------|---------|
| **Homepage** | `info` | "First time here? Start with Your First Build" — onboarding nudge |
| **Homepage** | `tip` | "Stuck or unsure? Read When to Escalate" — safety net |
| **Build Guides** | `warning` | Common mistakes (e.g., "Don't skip the brief even for Green builds") |
| **Standards** | `danger` | Non-negotiable rules (e.g., "Never store student data in plaintext") |
| **Color Palette** | `tip` | Usage guidance for design tokens |

**Design rationale:**
- Admonitions break the monotony of body text. They signal **"this is different from the surrounding content — pay attention."**
- The homepage uses exactly two admonitions: one for newcomers ("First time?") and one for the stuck ("Unsure?"). These are the two emotional states of someone landing on a governance framework. The first thinks "I've never done this before." The second thinks "I'm in the middle and something's wrong."
- `danger` admonitions are rare (3-4 across the whole site) and reserved for rules where violation has legal consequences. Overusing them would dilute their impact.

**Key insight:** The homepage's two admonitions are positioned *after* the StepCards, not before. This is intentional — you first see "this is simple" (StepCards), then you see "and there's help if you need it" (Admonitions). Reversing the order would make the framework feel daunting.

---

### 6. DataTable (Structured Reference Data)

**What it is:** A responsive table with header styling, alternating rows, and mobile scroll.

**Where it appears:**

| Location | Content | Purpose |
|----------|---------|---------|
| **Branding Standard** | Color palette (hex, usage) | Visual reference for brand compliance |
| **Branding Standard** | Tone of voice examples (do/don't) | Voice compliance — paired examples |
| **Approved Tools** | Tool tier matrix (tool, tier, approved-for, not-approved, notes) | Decision support for tool selection |
| **When to Escalate** | Escalation contacts (situation, person, method) | Emergency reference |
| **Forms** (Brief, Incident) | Blank fillable tables (stakeholder, action, timeline) | Structured data capture |

**Design rationale:**
- Tables are used ONLY for reference data that users will scan, not read linearly. If content is sequential, it uses StepCards or numbered headings. If it's comparative, it uses tables.
- The Approved Tools table is arguably the most-referenced page on the entire site. It's where someone goes to answer "Can I use Lovable for this?" before building anything. Its table format enables quick scanning by tool name.
- Fillable tables in forms (blank cells with `___`) create a template that can be copied into a Google Doc or Notion page. The framework doesn't have form submission — it's a reference site.

---

### 7. DecisionFlow (Branching Decision Tree)

**What it is:** A vertical timeline with YES/NO branching. Each step poses a question, and answers route to outcomes or the next question.

**Where it appears:** Only in the Design System Components page (as an educational example).

**Design rationale:**
- DecisionFlow exists but is underused. The intake quiz *could* be a DecisionFlow instead of 5 independent checkboxes. The current ChecklistItem approach was chosen because it's simpler to implement and the intake questions are independent (each raises risk independently, they don't branch).
- The component is available for future content that genuinely branches (e.g., "Should I retrain this model?" → YES → "Does it use student data?" → YES → "Red path required").

---

## Content Placement Patterns

### Pattern 1: The Requirement Sandwich

Used across all Standards pages:

```
ChecklistItem (the requirement)
  └─ Collapsible variant="why" (reasoning)
  └─ Collapsible variant="how" (verification steps)
```

**Why this order:** The checkbox is the commitment. The "why" justifies the commitment. The "how" operationalizes it. A user who already understands can check and move on. A newcomer can expand both. An auditor can verify the "how" was followed.

### Pattern 2: The Role Router

Used across all Role pages:

```
Brief intro (1-2 paragraphs, "here's what matters for your role")
CardGrid: "Start Here" (intake, first build, relevant guide)
CardGrid: "Your Standards" (3-4 most relevant standards)
CardGrid: "Your Tools" (approved tools, prompt library)
Collapsible variant="tip": "Common Scenarios" (3-5 role-specific situations)
```

**Why this order:** Start with action (cards that link elsewhere), end with nuance (collapsible tips). The role page should take 30 seconds to scan and route the user to the right place. It should NOT be a content destination.

### Pattern 3: The Build Guide Scaffold

Used across all Build Guide pages:

```
Metadata block (time estimate, what you'll need, who this is for)
Numbered Steps (h2 headings, not StepCards)
  └─ Each step: 2-3 paragraphs + Collapsible tips + Admonition warnings
  └─ Links to relevant forms/templates
Final section: "Done" (what to do after shipping)
Optional: "What if things change?" (re-intake guidance)
```

**Why this order:** Build guides are **procedural documentation** — they're followed step by step, often with the guide open in one tab and the tool in another. Numbered headings create TOC anchors so users can jump back to where they left off. StepCards wouldn't support this (no anchor IDs, no TOC entries).

### Pattern 4: The Checklist Sprint

Used across all Checklist pages:

```
Intro (1 paragraph: "This is for experienced builders who know the process")
Phase grouping (Pre-Build / During Build / Pre-Ship)
  └─ ChecklistItems with nested why/how Collapsibles
```

**Why this order:** Checklists are for repeat users. The intro explicitly says "if this is your first time, use the Build Guide instead." This prevents newcomers from skipping the educational content and just checking boxes. The phase grouping (pre/during/pre-ship) maps to the natural workflow — you don't check "tested with realistic data" before you've built anything.

---

## Content Block Decision Matrix

When adding new content, use this to choose the right block:

| If you need to... | Use | Not |
|-------------------|-----|-----|
| State a requirement users must fulfill | ChecklistItem | Bullet point (no commitment signal) |
| Explain reasoning behind a requirement | Collapsible `why` | Inline paragraph (creates wall of text) |
| Give step-by-step verification | Collapsible `how` | Numbered list (no progressive disclosure) |
| Show a sequential process | Numbered headings (h2) | StepCards (no TOC anchors, no branching) |
| Summarize a flow for newcomers | StepCards | Paragraphs (no visual progression) |
| Route users to relevant pages | CardGrid | Bullet list of links (no visual hierarchy) |
| Present reference/lookup data | DataTable | Paragraphs (not scannable) |
| Warn about common mistakes | Admonition `warning` | Bold text (easy to miss) |
| Flag non-negotiable rules | Admonition `danger` | Admonition `warning` (wrong severity) |
| Show concrete examples | Collapsible `example` | Inline code (clutters main flow) |
| Offer optional best practices | Collapsible `tip` | Admonition `tip` (admonitions interrupt flow; collapsibles don't) |

---

## Metrics That Would Validate This Architecture

If SpringBoard had analytics (it doesn't — it's a static site), these are the signals that would tell you the content architecture is working:

1. **Intake completion rate** — Are people finishing all 5 questions? Low completion = questions are confusing or feel invasive.
2. **Checklist completion by path** — Green should be ~90% (it's only 6 items). Red completion below 60% means it's too burdensome.
3. **Collapsible open rate** — If "why" collapsibles are rarely opened, either the requirements are self-evident (good) or people don't care about reasoning (bad).
4. **Role page bounce rate** — Role pages should have near-zero time-on-page because they're routers. High time = people are lost.
5. **Cross-page navigation from checklists** — If checklist users frequently click through to the build guide, they're using checklists prematurely (they need the full guide).
6. **Kill switch documentation rate** — Every shipped build should have a documented kill switch. If not, the framework's most critical safety requirement is failing.

---

## Open Questions for Future Design

1. **Should intake be a DecisionFlow instead of independent checkboxes?** The current design treats each question independently (highest risk wins). A decision tree could create a more guided experience but would be harder to maintain.

2. **Should checklists have a "submit" action?** Currently, checking all boxes is self-reported with no verification. A completion action (even just "I confirm I've completed all items") would create a stronger commitment signal.

3. **Should role pages show the user's assigned path?** If intake state were stored (it's in localStorage), role pages could say "You're on the Orange path — here's what matters for you." This would make role pages dynamic rather than static routers.

4. **Should the framework track completion across sessions?** Currently each page's checkboxes are independent. A global progress bar ("You've completed 12 of 14 Orange checklist items") would create momentum. Trade-off: adds complexity to a deliberately simple static site.

5. **Is the cumulative checklist pattern scaling?** Red has 18 items. If a future "Black" path were added (e.g., AI making autonomous decisions about minors), it would inherit all 18 + new items. At some point, the checklist becomes a burden rather than a guide.
