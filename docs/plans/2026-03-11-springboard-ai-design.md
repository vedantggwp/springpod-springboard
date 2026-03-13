# SpringBoard AI — Technical Design Document

**Date:** 2026-03-11 (revised 2026-03-13)
**Status:** Draft v2 — post-review revision
**Author:** Ved + Claude

---

## 1. Overview

SpringBoard AI is a Slack-native prompt enhancer. Its primary job is to turn rough employee intent into a materially better prompt — one that's compliant with Springpod's standards, uses the right design tokens, and follows the correct build path — without the employee needing to read any documentation.

Employees dump what they're working on into Slack. The system infers context, applies deterministic policy rules, selects the right design/compliance context, and returns an enhanced prompt with citations. The full interaction is logged as an intentional governance layer: when employees push sensitive or protected data through the system, Springpod needs to know exactly what happened.

**Core principles:**
1. The LLM infers. The policy engine decides. Follow-up questions are a last resort.
2. The primary output is a better prompt, not a docs answer.
3. Raw logs are retained deliberately for audit/governance — with strict access controls.
4. All policy rules are compiled from the SpringBoard repo, never hand-maintained separately.

### 1.1 Architecture Summary

```
SpringBoard MDX (source of truth)
  -> build script (extends existing pipeline)
    -> policy-bundle.json     (rules, thresholds, escalation paths)
    -> content-bundle.json    (guides, templates, prompt library)
    -> design-bundle.json     (brand voice, colors, typography, components)
    -> tools-bundle.json      (approved tools per use case + restrictions)
    -> roles-bundle.json      (role guidance, approval chains, contacts)
    -> bundle-manifest.json   (SHA-256 hashes, versions, build timestamp)

Slack: user sends message
  -> Slack Bolt app (Vercel serverless)
    -> LLM intent + intake extractor (Claude Haiku)
        emits: IntakeAssessment (typed JSON, not prose)
    -> Deterministic policy engine (pure TypeScript)
        emits: BuildPathDecision
    -> Content selector (metadata-filtered bundle lookup)
        emits: InjectedContext
    -> Prompt composer (assembles enhanced prompt)
    -> LLM response generator (Claude Sonnet)
        emits: FormattedResponse with citations
    -> Supabase logging (full audit trail)
    -> Slack response (formatted with Block Kit)
```

---

## 2. Inference Schema

The LLM must always emit a typed `IntakeAssessment` object. Never loose prose.

### 2.1 Top-Level Schema

```typescript
interface IntakeAssessment {
  intent: Intent
  task_type: TaskType
  output_target: OutputTarget
  intake: {
    audience: DimensionAssessment<Audience>
    data_type: DimensionAssessment<DataType>
    impact: DimensionAssessment<Impact>
    lifespan: DimensionAssessment<Lifespan>
    ai_role: DimensionAssessment<AIRole>
  }
  missing_fields: IntakeDimension[]
  followup_required: boolean
  followup_questions: string[]        // empty if followup_required is false
  raw_user_input: string
}
```

### 2.2 Intent Enum

```typescript
type Intent =
  | "prompt_enhancement"       // user wants an improved prompt for a task
  | "build_path_assessment"    // user wants to know which path applies
  | "policy_question"          // user asks about a specific policy/standard
  | "tool_recommendation"      // user asks which tool to use
  | "template_request"         // user wants a form/template
  | "checklist_request"        // user wants a specific checklist
  | "escalation_guidance"      // user needs to know who to contact
  | "general_question"         // anything else about SpringBoard content
```

### 2.3 Task Type Enum

```typescript
type TaskType =
  | "landing_page"
  | "dashboard"
  | "data_entry_form"
  | "internal_tool"
  | "student_facing_feature"
  | "vwe_module"
  | "email_campaign"
  | "marketing_content"
  | "report_generation"
  | "ai_chatbot"
  | "data_pipeline"
  | "api_integration"
  | "content_page"
  | "school_report"
  | "employer_dashboard"
  | "automation_script"
  | "other"
```

### 2.4 Dimension Assessment

```typescript
interface DimensionAssessment<T> {
  value: T | null               // null = could not infer
  confidence: number            // 0.0 to 1.0
  evidence: string[]            // quotes/phrases from user input that support this
}

type IntakeDimension = "audience" | "data_type" | "impact" | "lifespan" | "ai_role"
```

### 2.5 Dimension Enums

Each dimension maps directly to the 5 intake questions in the SpringBoard framework.

#### Audience (Q1: Who will use this?)

```typescript
type Audience =
  | "internal_staff"            // -> Green
  | "partners_vendors"          // -> Yellow
  | "external_customers"        // -> Orange
  | "students_or_minors"        // -> Red
```

#### DataType (Q2: What data does it touch?)

```typescript
type DataType =
  | "no_real_data"              // -> Green (mockups, test data, public info)
  | "internal_business_data"    // -> Yellow (reports, metrics, aggregates)
  | "personal_data"             // -> Orange (names, emails, accounts)
  | "protected_data"            // -> Red (student records, health, financial)
```

#### Impact (Q3: What happens if it breaks?)

```typescript
type Impact =
  | "minor_inconvenience"       // -> Green (easy workaround)
  | "team_slowed"               // -> Yellow (workaround exists)
  | "external_users_affected"   // -> Orange (users confused/impacted)
  | "legal_safety_financial"    // -> Red (legal, safety, or financial consequences)
```

#### Lifespan (Q4: How long will this be used?)

```typescript
type Lifespan =
  | "throwaway"                 // -> Green (one-time, disposable)
  | "ongoing_replaceable"       // -> Yellow (ongoing but can be swapped)
  | "core_to_operations"        // -> Orange/Red (core to ops or product)
```

#### AIRole (Q5: What role does AI play?)

```typescript
type AIRole =
  | "ai_built_logic_defined"    // -> Green (AI helped build, logic is deterministic)
  | "ai_generates_content"      // -> Yellow/Orange (AI generates user-visible content)
  | "ai_makes_decisions"        // -> Orange/Red (AI scores, filters, recommends)
```

### 2.6 Output Target

Determines how design context is injected — critical for avoiding the token-first violation.

```typescript
type OutputTarget =
  | "springboard_repo"      // building within the SpringBoard/Springpod codebase
  | "external_builder"      // using Lovable, Bolt.new, Replit, v0, or similar
  | "copy_only"             // writing copy, email, content — no design injection needed
  | "unknown"               // could not determine — ask if design injection is relevant
```

**How it affects design bundle injection:**

| Output Target | Design Bundle Format |
|---------------|---------------------|
| `springboard_repo` | Token class names only: `sp-teal`, `bg-card`, `text-sp-navy`, `font-heading`. **Never raw hex values.** |
| `external_builder` | Raw values: `#0BB3B7`, `Poppins SemiBold 600`, `16px`, `#16254C`. External tools don't know `sp-*` tokens. |
| `copy_only` | No design bundle injected. Tone/voice from branding standard only. |
| `unknown` | No design bundle injected until clarified. |

**Normalization rules:**

| User says | Inferred value |
|-----------|----------------|
| "in Lovable", "using Bolt", "on Replit", "in v0", "no-code" | `external_builder` |
| "adding to the site", "new component", "in the repo", "PR", "Cursor" | `springboard_repo` |
| "email", "copy", "blog post", "social media", "Slack message" | `copy_only` |
| No tool or output context mentioned | `unknown` (infer from task_type if possible) |

### 2.7 Normalization Rules

The LLM maps freeform user language to these enums using these rules:

| User says | Inferred value |
|-----------|----------------|
| "internal", "for the team", "for us", "staff only" | `audience: "internal_staff"` |
| "for a school", "employer-facing", "partner" | `audience: "partners_vendors"` |
| "for users", "public", "customers", "external" | `audience: "external_customers"` |
| "for students", "student-facing", "young people", "under 18", "Year X" | `audience: "students_or_minors"` |
| "no data", "prototype", "mockup", "test", "demo" | `data_type: "no_real_data"` |
| "metrics", "KPIs", "reports", "analytics" | `data_type: "internal_business_data"` |
| "emails", "names", "user accounts", "contacts" | `data_type: "personal_data"` |
| "student data", "student records", "assessment", "safeguarding" | `data_type: "protected_data"` |
| "quick thing", "experiment", "hack day" | `lifespan: "throwaway"` |
| "we'll use it for a while", "ongoing" | `lifespan: "ongoing_replaceable"` |
| "production", "core feature", "critical", "replaces X" | `lifespan: "core_to_operations"` |

When a phrase is ambiguous (e.g. "landing page for a programme" — is the audience students or schools?), the LLM must set `confidence < 0.5` and include the phrase in `evidence` so the policy engine can decide whether to ask.

### 2.7 Example: Full Extraction

**User input:** "I need to make a landing page for our new Year 12 nursing programme with King's College"

```json
{
  "intent": "prompt_enhancement",
  "task_type": "landing_page",
  "intake": {
    "audience": {
      "value": "external_customers",
      "confidence": 0.72,
      "evidence": ["landing page", "Year 12 nursing programme"]
    },
    "data_type": {
      "value": "no_real_data",
      "confidence": 0.85,
      "evidence": ["landing page", "no mention of data collection"]
    },
    "impact": {
      "value": "external_users_affected",
      "confidence": 0.78,
      "evidence": ["King's College", "partner-facing"]
    },
    "lifespan": {
      "value": "ongoing_replaceable",
      "confidence": 0.60,
      "evidence": ["programme"]
    },
    "ai_role": {
      "value": null,
      "confidence": 0.15,
      "evidence": []
    }
  },
  "missing_fields": ["ai_role"],
  "followup_required": true,
  "followup_questions": [
    "Are you looking for help with the copy, the design, or the full page build?"
  ],
  "raw_user_input": "I need to make a landing page for our new Year 12 nursing programme with King's College"
}
```

Note: `audience` is `external_customers` (not `students_or_minors`) because a landing page is typically viewed by prospective applicants and school staff — but `confidence: 0.72` reflects the ambiguity. If the page were to collect student data or be accessed by logged-in students, the policy engine would escalate on the `data_type` dimension instead.

---

## 3. Finalization Rules (State Machine)

### 3.1 States

```
RAW_MESSAGE
  -> INTAKE_ASSESSED
    -> FINALIZED (build path determined, proceed to content selection)
    -> NEEDS_CLARIFICATION (specific questions asked)
      -> CLARIFICATION_RECEIVED
        -> FINALIZED
        -> PROVISIONAL (user didn't reply or still ambiguous)
    -> PROVISIONAL (low confidence but non-blocking)
```

### 3.2 Build Path Calculation

The policy engine is pure TypeScript. No LLM involvement. **Critically, the engine does not contain its own copy of the rules.** It loads `policy-bundle.json`, which is compiled from the SpringBoard repo's intake MDX at build time.

#### 3.2.1 How Policy Rules Are Compiled (No Hand-Transcription)

```
Source of truth:
  src/content/intake/project-intake.mdx
    → defines 5 questions, each with options mapped to paths
    → defines "I'm not sure" fallback rules per question

Build step (scripts/build-bundles.ts):
  → parses project-intake.mdx
  → extracts option→path mappings for each question
  → extracts "I'm not sure" defaults
  → outputs policy-bundle.json:

{
  "version_hash": "sha256:abc123...",
  "built_from_commit": "049105b",
  "built_at": "2026-03-13T10:00:00Z",
  "path_mappings": {
    "audience": {
      "internal_staff": "green",
      "partners_vendors": "yellow",
      "external_customers": "orange",
      "students_or_minors": "red"
    },
    "data_type": { ... },
    "impact": { ... },
    "lifespan": { ... },
    "ai_role": { ... }
  },
  "unsure_defaults": {
    "audience": "external_customers",
    "data_type": "personal_data",
    "impact": "external_users_affected",
    "lifespan": "ongoing_replaceable",
    "ai_role": "ai_generates_content"
  }
}
```

Note: The current intake MDX specifies Q5 "I'm not sure" = "Generates content users see" which maps to Orange. The `unsure_defaults` are extracted directly from the MDX — if the MDX changes, the next build inherits the change. The policy engine never overrides these.

#### 3.2.2 Runtime Engine

```typescript
import policyBundle from "../../../public/policy-bundle.json"

function calculateBuildPath(
  intake: IntakeAssessment["intake"]
): BuildPathResult {
  const rank = { green: 1, yellow: 2, orange: 3, red: 4 }
  const triggering: string[] = []
  const defaultsUsed: Record<string, string> = {}

  let highest = "green"

  for (const [dimension, assessment] of Object.entries(intake)) {
    // Resolve value: use inferred value, or inject default answer if null
    let value = assessment.value
    if (value === null) {
      const defaultAnswer = policyBundle.unsure_defaults[dimension]
      if (defaultAnswer) {
        value = defaultAnswer
        defaultsUsed[dimension] = defaultAnswer
      } else {
        continue
      }
    }

    // Map answer value → path severity via the compiled mappings
    const path = policyBundle.path_mappings[dimension]?.[value]
    if (path && rank[path] > rank[highest]) {
      highest = path
      triggering.length = 0
    }
    if (path && rank[path] === rank[highest]) {
      triggering.push(dimension)
    }
  }

  return {
    path: highest,
    triggering_dimensions: triggering,
    defaults_used: Object.keys(defaultsUsed).length > 0
      ? defaultsUsed : null,
    policy_version: policyBundle.version_hash
  }
}
```

**Contract:** `unsure_defaults` stores **answer enum values** (e.g. `"external_customers"`), not path severities (e.g. `"orange"`). The engine always resolves answers through `path_mappings` — there is exactly one code path, whether the value was inferred by the LLM or injected as a default. This eliminates ambiguity about whether to short-circuit to a severity or re-run the mapping.

The engine has zero hardcoded rules. If someone edits `project-intake.mdx` to change a mapping or a default, the next `npm run build:bundles` produces a new `policy-bundle.json`, and the agent inherits the change automatically.

**Rule: highest trigger wins.** If any dimension maps to Red, the build path is Red.

### 3.3 Confidence Thresholds

| Condition | Action |
|-----------|--------|
| All dimensions have `confidence >= 0.6` | **FINALIZE immediately.** No follow-up. |
| A low-confidence dimension (`< 0.6`) does NOT affect the final path | **FINALIZE.** The ambiguity is irrelevant to the outcome. |
| A low-confidence dimension (`< 0.6`) WOULD change the final path if resolved differently | **ASK.** This ambiguity matters. |
| A `null` dimension does NOT affect the final path (other dimensions already push higher) | **FINALIZE.** Default the null dimension conservatively and proceed. |
| A `null` dimension WOULD change the final path | **ASK.** |
| User never replies to clarification (timeout: 5 minutes in Slack) | **PROVISIONAL.** Default upward in risk. Null/ambiguous dimensions treated as: see 3.4. |

**Key insight:** The system only asks when the answer would actually change the output. If someone mentions "student data" (Red on data_type), it doesn't matter that ai_role is unknown — the path is already Red.

### 3.4 Default-Upward Rules (When Ambiguity Remains)

When the system cannot resolve ambiguity (user doesn't reply, or answer is still vague), apply these conservative defaults:

Default-upward values are loaded from `policyBundle.unsure_defaults`, not hardcoded here. They are **answer enum values**, not path severities — the engine injects them as if the LLM had inferred them, then resolves through `path_mappings` normally.

The current values (compiled from `project-intake.mdx`) are:

| Dimension | Default answer injected | Resolves to path via `path_mappings` | Source in MDX |
|-----------|------------------------|--------------------------------------|---------------|
| `audience` | `"external_customers"` | Orange | Q1 "I'm not sure" → "Customers or end-users" |
| `data_type` | `"personal_data"` | Orange | Q2 "I'm not sure" → "Personal data" |
| `impact` | `"external_users_affected"` | Orange | Q3 "I'm not sure" → "External users affected" |
| `lifespan` | `"ongoing_replaceable"` | Yellow | Q4 "I'm not sure" → "Ongoing but replaceable" |
| `ai_role` | `"ai_generates_content"` | Orange | Q5 "I'm not sure" → "Generates content users see" |

**If the MDX intake doc changes these defaults, the next build inherits the change.** The policy engine reads `policyBundle.unsure_defaults` at runtime — it never overrides the repo.

These defaults mean an unresolved query defaults to **Orange** (Reviewed Build) at minimum. This is deliberate — Springpod handles under-18 data, and defaulting low is unacceptable.

### 3.5 Provisional Answers

When the system finalizes provisionally (due to defaults), the response includes a clear flag:

```
⚠️ Provisional assessment — I assumed [audience: external, data: personal].
    If this is actually internal-only with no real data, reply "internal only"
    and I'll update the path.
```

The user can correct at any time. Corrections re-trigger the policy engine and update the logged assessment.

### 3.6 State Machine Diagram

```
                    ┌──────────────┐
                    │ RAW_MESSAGE   │
                    └──────┬───────┘
                           │
                    LLM extracts IntakeAssessment
                           │
                    ┌──────▼───────┐
                    │INTAKE_ASSESSED│
                    └──────┬───────┘
                           │
              ┌────────────┼────────────────┐
              │            │                │
     all dims >= 0.6   low-conf dims    low-conf dims
     OR low-conf       WOULD change     null but
     doesn't matter    the path         won't change path
              │            │                │
              ▼            ▼                ▼
        ┌──────────┐ ┌──────────────┐ ┌──────────┐
        │FINALIZED │ │NEEDS_CLARIFY │ │FINALIZED │
        └──────────┘ └──────┬───────┘ │(defaults)│
                            │         └──────────┘
                   ┌────────┼────────┐
                   │                 │
              user replies      5 min timeout
                   │                 │
                   ▼                 ▼
            ┌──────────┐      ┌─────────────┐
            │FINALIZED │      │ PROVISIONAL │
            └──────────┘      │ (default up)│
                              └─────────────┘
```

---

## 4. Prompt Composition Rules

The prompt composer injects only the relevant bundles based on the assessed `task_type` and `intent`. This is a deterministic mapping, not LLM-chosen.

### 4.1 Bundle Injection Matrix

| Task Type | Bundles Injected |
|-----------|-----------------|
| `landing_page` | design-bundle, content-bundle (branding standard), tools-bundle |
| `dashboard` | design-bundle (colors only), tools-bundle, content-bundle (data workflows) |
| `data_entry_form` | design-bundle (colors, typography), content-bundle (security, data workflows) |
| `internal_tool` | tools-bundle, content-bundle (security, quality) |
| `student_facing_feature` | design-bundle, content-bundle (safeguarding, security, quality), roles-bundle (escalation) |
| `vwe_module` | design-bundle, content-bundle (safeguarding, branding, quality), roles-bundle |
| `email_campaign` | content-bundle (branding, content-bundle:pecr), tools-bundle |
| `marketing_content` | content-bundle (branding standard, brand voice), design-bundle (colors, typography) |
| `report_generation` | design-bundle (colors), content-bundle (data workflows, quality) |
| `ai_chatbot` | content-bundle (prompts standard, safeguarding, security), tools-bundle |
| `data_pipeline` | content-bundle (data workflows, security), tools-bundle |
| `api_integration` | content-bundle (security, data workflows), tools-bundle |
| `content_page` | design-bundle, content-bundle (branding, quality) |
| `school_report` | design-bundle (colors), content-bundle (data workflows, safeguarding), roles-bundle |
| `employer_dashboard` | design-bundle (colors), content-bundle (data workflows, quality) |
| `automation_script` | content-bundle (security, data workflows), tools-bundle |
| `other` | content-bundle (quality standard only), tools-bundle |

### 4.2 Build-Path-Driven Additions

In addition to the task-type mapping, the build path adds mandatory context:

| Build Path | Always Injected |
|------------|----------------|
| Green | Green checklist, green build guide (steps) |
| Yellow | Yellow checklist, yellow build guide, build log template, review request template |
| Orange | Orange checklist, orange build guide, prompt spec template (if AI involved), technical reviewer contact |
| Red | Red checklist, red build guide, DPIA guidance, incident response template, designated reviewer contact, safeguarding standard (full) |

### 4.3 Intent-Driven Overrides

Some intents bypass the task-type matrix entirely:

| Intent | Bundles Injected |
|--------|-----------------|
| `policy_question` | Deterministic topic→standard mapping (see 4.3.1 below). No LLM discretion. |
| `tool_recommendation` | tools-bundle (full) + standards matched by topic keywords |
| `template_request` | The requested template only (project-brief, build-log, review-request, prompt-spec, incident-report) |
| `checklist_request` | The requested checklist only |
| `escalation_guidance` | roles-bundle (contacts and approval chain) |

#### 4.3.1 Policy Question → Standard Mapping (Deterministic)

The LLM does NOT choose which standards to inject. Keyword matching against the user's message determines injection. If multiple topic groups match, all relevant standards are injected (no cap).

| Topic keywords in user message | Standards injected |
|-------------------------------|-------------------|
| "GDPR", "data protection", "privacy", "DPA", "PECR", "consent" | security, data-workflows |
| "student", "minor", "under 18", "safeguarding", "children", "young people", "age" | safeguarding, security |
| "brand", "logo", "colors", "colour", "tone", "voice", "font", "Poppins" | branding |
| "tool", "approved", "which tool", "Lovable", "Cursor", "Bolt", "Replit", "ChatGPT" | tools-bundle (full) |
| "prompt", "system prompt", "AI testing", "hallucination", "injection" | prompts |
| "quality", "checklist", "review", "testing", "accessibility" | quality |
| "data", "database", "warehouse", "backup", "pipeline", "export", "import" | data-workflows |
| "escalate", "who to contact", "reviewer", "approval", "sign off" | roles-bundle |
| "incident", "breach", "security issue", "vulnerability" | security, roles-bundle (emergency contacts) |

If no keywords match, inject the quality standard as a safe default and log a content gap signal.

### 4.4 Prompt Library Injection

When the task type matches a prompt in the prompt library, the matching prompt template is included as a starting point. The LLM enhances it with the user's specific context rather than generating from scratch.

| Task Type | Prompt Library Match |
|-----------|---------------------|
| `landing_page` | "Branded Landing Page" template |
| `dashboard` | "Internal Dashboard" template |
| `data_entry_form` | "Data Entry Form" template |
| `student_facing_feature` | "Student-Facing Content Page" template |
| `vwe_module` | "VWE Module Page" template |
| `employer_dashboard` | "Employer Impact Dashboard" template |
| `school_report` | "School Partnership Report" template |
| `ai_chatbot` | "AI Interview Coach" system prompt (as reference) |

When no prompt library match exists, the LLM composes from the injected bundles alone.

**Asset audit (what exists vs what must be created before V1):**

| Template | Exists in `prompt-library.mdx`? | Status |
|----------|--------------------------------|--------|
| "Branded Landing Page" | Yes | Ready |
| "Internal Dashboard" | Yes | Ready |
| "Data Entry Form" | Yes | Ready |
| "Student-Facing Content Page" | Yes (Red path) | Ready |
| "VWE Module Page" | Yes | Ready |
| "Employer Impact Dashboard" | Yes | Ready |
| "School Partnership Report" | Yes | Ready |
| "AI Interview Coach" | Yes (system prompt) | Ready |
| Standalone PECR compliance doc | **No** — scattered across security + data-workflows | **Must extract into addressable chunk** |
| "Email Campaign" template | **No** | **Must create or map to branding + PECR chunks** |
| "Marketing Content" template | **No** | **Must create or map to branding standard** |
| "Automation Script" template | **No** | Not critical — falls back to security + data-workflows bundles |

**Resolution:** The build script for `content-bundle.json` will extract PECR-relevant sections from security and data-workflows standards into a dedicated addressable chunk (`content-bundle:pecr`). This avoids creating a new MDX doc while making the content independently injectable. Email and marketing templates should be added to `prompt-library.mdx` before V1 launch — they are the most common marketing team use cases.

### 4.5 Design Bundle Format (Token-First Compliance)

The design bundle contains two parallel representations, selected by `output_target`:

```json
{
  "tokens": {
    "primary": "bg-sp-teal / text-sp-teal",
    "primary_dark": "bg-sp-teal-dark",
    "secondary": "bg-sp-blue / text-sp-blue",
    "text": "text-sp-navy",
    "text_secondary": "text-[--color-sp-text-secondary]",
    "text_muted": "text-[--color-sp-text-muted]",
    "background": "bg-background",
    "card": "bg-card",
    "border": "border-[--color-sp-border]",
    "error": "text-sp-red",
    "success": "text-sp-teal-dark",
    "heading_font": "font-[family-name:var(--font-heading)]",
    "body_font": "font-sans"
  },
  "raw": {
    "primary": "#0BB3B7",
    "primary_dark": "#0A8F93",
    "secondary": "#446DF6",
    "text": "#16254C",
    "text_secondary": "#5C6682",
    "background": "#FFFFFF",
    "surface": "#E4ECF7",
    "error": "#FF475A",
    "success": "#0A8F93",
    "orange_accent": "#F7936F",
    "purple_accent": "#7F7EFF",
    "heading_font": "Poppins SemiBold 600",
    "heading_sizes": ["32px", "24px", "20px"],
    "body_font": "Inter Regular 400",
    "body_size": "16px",
    "small_size": "14px",
    "ui_font": "Inter Medium 500, 14px"
  }
}
```

**These token names are verified against the actual codebase:**
- Colors: `--color-sp-teal`, `--color-sp-navy`, etc. defined in `src/app/globals.css` lines 9-51
- Fonts: `--font-heading` (Poppins) and `--font-sans` (Inter) defined in `src/app/globals.css` lines 74-75
- Semantic tokens: `bg-background`, `bg-card`, etc. via CSS custom properties
- The `tokens` object uses Tailwind utility classes as they appear in actual component code
```

The prompt composer selects which representation to inject:

| `output_target` | Injected | Example in enhanced prompt |
|-----------------|----------|---------------------------|
| `springboard_repo` | `tokens` only | "Use `className='bg-sp-teal text-white font-sans'`" |
| `external_builder` | `raw` only | "Primary color: #0BB3B7, heading font: Poppins SemiBold" |
| `copy_only` | Neither | Tone/voice guidance only, no visual design |
| `unknown` | Neither | Prompt asks user to clarify tool before adding design context |

**This prevents the token-first violation:** engineers building in the repo never see raw hex values in their enhanced prompts, while employees using Lovable/Bolt get the raw values those tools need.

### 4.6 Role-Aware Filtering

If the user's role is known (from `user_roles` table in Supabase), the response adapts tone and detail level:

| Role | Adaptation |
|------|-----------|
| `marketing` | Emphasize brand voice, PECR compliance, avoid technical jargon |
| `curriculum_designer` | Emphasize safeguarding, age-appropriate design, Gatsby Benchmarks |
| `ops_partnerships` | Emphasize data workflows, partner-facing standards, reporting |
| `product_engineering` | Include technical implementation details, security specifics, code examples |
| `leadership` | High-level summary, focus on risk and compliance posture, link to details |

Role is advisory — it adjusts tone and emphasis, not policy. A marketing person building a student-facing tool still gets Red path requirements.

---

## 5. Audit & Log Contract

Every interaction is persisted end-to-end in Supabase Postgres. Nothing is ephemeral. **Raw logging is intentional** — the point is to know when employees push sensitive or protected data through SpringAgent, preserve a full audit trail, and understand exactly what the system saw and returned.

### 5.0 Raw Log Security Controls

Because raw logs may contain personal or protected data, the following controls are mandatory:

#### 5.0.1 Access Controls

- Raw log tables (`messages`, `prompt_runs`, `intake_assessments`) use Supabase Row Level Security (RLS)
- Application service role: **write-only** to raw log tables (can insert, cannot read back)
- Admin role: **read + write** — restricted to designated admin users only
- Derived analytics views (aggregated, no raw text) are readable by the reporting role
- No raw log data is ever returned to the Slack bot or web chat — logging is fire-and-forget

#### 5.0.2 Encryption

- Supabase encrypts all data at rest (AES-256) — this is the baseline
- The `messages.content` and `prompt_runs.system_prompt` / `prompt_runs.raw_response` columns are the most sensitive — if Supabase supports column-level encryption in the future, apply it there first

#### 5.0.3 Access Audit Trail

```sql
CREATE TABLE log_access_audit (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accessed_by     TEXT NOT NULL,       -- admin user ID
  table_accessed  TEXT NOT NULL,       -- which raw log table
  record_ids      UUID[] NOT NULL,     -- which specific records
  access_reason   TEXT,                -- optional justification
  accessed_at     TIMESTAMPTZ DEFAULT now()
);
```

Every raw log read by an admin is itself logged. This table is append-only (no UPDATE or DELETE).

#### 5.0.4 Sensitive Data Detection (Async)

After every write to `messages` (user role), an async Supabase Edge Function scans the content for likely PII/protected data:

**Detection patterns:**
- Email addresses (regex)
- Phone numbers (regex)
- UK postcodes (regex)
- Names paired with identifiers ("student ID", "DOB", "NHS number")
- Known sensitive keywords: "safeguarding", "incident", "health", "disability"

**When detected:**

```sql
CREATE TABLE data_sensitivity_flags (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id      UUID REFERENCES messages(id),
  flag_type       TEXT NOT NULL,       -- 'email' | 'phone' | 'student_identifier'
                                      -- | 'health_data' | 'safeguarding_mention'
  confidence      FLOAT NOT NULL,      -- 0.0-1.0
  detected_at     TIMESTAMPTZ DEFAULT now(),
  reviewed        BOOLEAN DEFAULT false,
  reviewed_by     TEXT,
  reviewed_at     TIMESTAMPTZ
);
```

- High-confidence flags (>0.8) trigger an alert to the designated admin Slack channel
- Alert format: "SpringBoard AI: Possible [flag_type] detected in query from [user_display_name]. Review required."
- Flags are reviewed by an admin who marks them as `reviewed: true`
- This does NOT block the user's interaction — detection is async, post-write

#### 5.0.5 Derived Analytics Views (Safe for Reporting)

```sql
-- Safe view: no raw text, only aggregates
CREATE VIEW analytics_weekly AS
SELECT
  date_trunc('week', c.created_at) AS week,
  count(DISTINCT c.id) AS total_conversations,
  count(DISTINCT c.slack_user_id) AS unique_users,
  bpd.build_path,
  count(*) AS path_count,
  avg(CASE WHEN f.signal_type = 'thumbs_up' THEN 1
           WHEN f.signal_type = 'thumbs_down' THEN 0
           ELSE NULL END) AS satisfaction_rate
FROM conversations c
LEFT JOIN build_path_decisions bpd ON bpd.conversation_id = c.id
LEFT JOIN feedback f ON f.conversation_id = c.id
GROUP BY week, bpd.build_path;

-- Safe view: content gaps (includes query text, but these are
-- explicitly questions about docs, not employee work product)
CREATE VIEW content_gaps_weekly AS
SELECT
  date_trunc('week', created_at) AS week,
  gap_type,
  inferred_topic,
  count(*) AS occurrences
FROM content_gaps
GROUP BY week, gap_type, inferred_topic
ORDER BY occurrences DESC;
```

The weekly digest (Section 9) reads from these views, never from raw log tables.

### 5.1 Database Schema

```sql
-- Conversations: one per Slack thread or web chat session
CREATE TABLE conversations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slack_channel   TEXT,
  slack_thread_ts TEXT,
  slack_user_id   TEXT NOT NULL,
  user_role       TEXT,                -- from user_roles table, nullable
  user_team       TEXT,                -- from user_roles table, nullable
  session_source  TEXT NOT NULL,       -- 'slack' | 'web'
  state           TEXT NOT NULL,       -- 'active' | 'finalized' | 'provisional' | 'abandoned'
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Messages: every message in a conversation
CREATE TABLE messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  role            TEXT NOT NULL,       -- 'user' | 'assistant' | 'system'
  content         TEXT NOT NULL,       -- raw text
  message_type    TEXT NOT NULL,       -- 'initial_query' | 'clarification_question'
                                      -- | 'clarification_answer' | 'final_response'
                                      -- | 'correction' | 'followup'
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Intake assessments: the LLM's structured extraction
CREATE TABLE intake_assessments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  message_id      UUID REFERENCES messages(id),  -- which user message triggered this
  assessment      JSONB NOT NULL,                 -- full IntakeAssessment object
  model_used      TEXT NOT NULL,                  -- e.g. 'claude-haiku-4-5-20251001'
  input_tokens    INT,
  output_tokens   INT,
  latency_ms      INT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Build path decisions: deterministic engine output
CREATE TABLE build_path_decisions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  assessment_id   UUID REFERENCES intake_assessments(id),
  build_path      TEXT NOT NULL,       -- 'green' | 'yellow' | 'orange' | 'red'
  decision_type   TEXT NOT NULL,       -- 'final' | 'provisional' | 'corrected'
  triggering_dims JSONB NOT NULL,      -- which dimensions drove the path
  defaults_used   JSONB,              -- which dimensions used default-upward, null if none
  policy_version  TEXT NOT NULL,       -- SHA-256 of policy-bundle.json
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Content retrievals: what SpringBoard content was injected
CREATE TABLE content_retrievals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  decision_id     UUID REFERENCES build_path_decisions(id),
  bundles_used    JSONB NOT NULL,      -- ["design-bundle", "content-bundle:branding"]
  chunks_injected JSONB NOT NULL,      -- [{slug, heading, token_count}]
  prompt_template TEXT,                -- prompt library match, if any
  content_version TEXT NOT NULL,       -- SHA-256 of content-bundle.json
  design_version  TEXT NOT NULL,       -- SHA-256 of design-bundle.json
  tools_version   TEXT NOT NULL,       -- SHA-256 of tools-bundle.json
  total_tokens    INT NOT NULL,        -- total context tokens injected
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Prompt runs: the final LLM call that generates the response
CREATE TABLE prompt_runs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  retrieval_id    UUID REFERENCES content_retrievals(id),
  system_prompt   TEXT NOT NULL,       -- full system prompt sent to LLM
  user_context    TEXT NOT NULL,       -- assembled user context
  raw_response    TEXT NOT NULL,       -- full LLM output before formatting
  formatted_resp  TEXT NOT NULL,       -- what the user actually saw
  model_used      TEXT NOT NULL,       -- e.g. 'claude-sonnet-4-6'
  input_tokens    INT,
  output_tokens   INT,
  latency_ms      INT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Feedback: explicit user signals
CREATE TABLE feedback (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  prompt_run_id   UUID REFERENCES prompt_runs(id),
  signal_type     TEXT NOT NULL,       -- 'thumbs_up' | 'thumbs_down' | 'correction'
                                      -- | 'report_outdated' | 'slack_reaction'
  signal_value    TEXT,                -- reaction emoji, correction text, etc.
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- User roles: Slack identity -> role mapping
CREATE TABLE user_roles (
  slack_user_id   TEXT PRIMARY KEY,
  display_name    TEXT,
  role            TEXT,                -- 'marketing' | 'curriculum_designer'
                                      -- | 'ops_partnerships' | 'product_engineering'
                                      -- | 'leadership'
  team            TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Content gap signals: queries where retrieval failed
CREATE TABLE content_gaps (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  query_text      TEXT NOT NULL,
  gap_type        TEXT NOT NULL,       -- 'no_match' | 'low_confidence_answer'
                                      -- | 'user_reported_outdated' | 'thumbs_down'
  inferred_topic  TEXT,                -- LLM's best guess at what topic is missing
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Policy overrides: when a reviewer overrides a decision
CREATE TABLE overrides (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id     UUID REFERENCES build_path_decisions(id),
  override_by     TEXT NOT NULL,       -- slack_user_id of reviewer
  original_path   TEXT NOT NULL,
  new_path        TEXT NOT NULL,
  reason          TEXT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Bundle versions: tracks every build of every bundle
CREATE TABLE bundle_versions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_name     TEXT NOT NULL,       -- 'policy' | 'content' | 'design' | 'tools' | 'roles'
  version_hash    TEXT NOT NULL,       -- SHA-256
  file_count      INT NOT NULL,
  total_tokens    INT NOT NULL,
  built_at        TIMESTAMPTZ NOT NULL,
  git_commit      TEXT                 -- commit SHA that triggered the build
);
```

### 5.2 What Gets Logged (Per Interaction)

Every interaction produces this chain of records:

```
1. conversation     <- session context (user, channel, source)
2. message          <- raw user input (initial_query)
3. intake_assessment <- LLM extraction (full JSON, model, tokens, latency)
4. build_path_decision <- policy engine output (path, triggers, defaults, policy version)
5. content_retrieval <- what bundles/chunks were injected (with version hashes)
6. prompt_run       <- full LLM call (system prompt, user context, response, model, tokens)
7. message          <- formatted response shown to user (final_response)
8. feedback         <- user reaction (when it happens, async)
```

If clarification is needed, steps 2-3 repeat before step 4.

If the user corrects a provisional answer, a new `build_path_decision` with `decision_type: 'corrected'` is created, and steps 5-7 re-run.

### 5.3 Version Traceability

Every response can be traced to exact content versions:

```
Response R was generated using:
  - policy-bundle v{hash} (built from commit {sha})
  - content-bundle v{hash}
  - design-bundle v{hash}
  - tools-bundle v{hash}
  - model: claude-sonnet-4-6
  - at: 2026-03-11T14:23:01Z
```

When bundles are rebuilt (content updated), the `bundle_versions` table records the new hash. Old responses remain tied to the versions that generated them. This enables:
- "Which answers would change if we re-ran them against current policy?" (compare policy_version)
- "When did we last update the safeguarding content?" (bundle_versions history)
- "Show me all Red path assessments from before the March policy update" (join on version hash)

### 5.4 Retention Policy

| Data | Retention |
|------|-----------|
| Conversations + messages | 2 years (compliance audit trail) |
| Intake assessments | 2 years |
| Build path decisions | 2 years |
| Content retrievals | 1 year (can be reconstructed from bundle versions) |
| Prompt runs | 1 year |
| Feedback | 2 years |
| Content gaps | Indefinite (drives content improvement) |
| Bundle versions | Indefinite (version history) |
| Overrides | 2 years (audit trail) |

---

## 6. LLM Boundaries

### 6.1 LLM Is Allowed To

- Extract intent and intake dimensions from user input
- Ask clarifying questions (only when finalization rules require it)
- Rewrite prompts with injected context
- Summarize standards and guidelines
- Explain build path rationale in plain language
- Suggest next actions based on the build path

### 6.2 LLM Is NOT Allowed To

- Finalize or override the build path (deterministic engine only)
- Override approved tool policy (tools-bundle is authoritative)
- Invent standards or policies not in the bundles
- Decide escalation rules (roles-bundle is authoritative)
- Skip checklist items
- Recommend unapproved tools
- Claim something is compliant without the policy engine confirming it

### 6.3 Enforcement

The LLM never sees the policy engine's decision logic. The flow is:

1. LLM extracts → emits `IntakeAssessment` JSON
2. Policy engine processes `IntakeAssessment` → emits `BuildPathDecision`
3. Content selector uses `BuildPathDecision` + task type → assembles context
4. LLM receives the **decision and context as facts** → composes response

The LLM in step 4 is told: "The build path is Yellow. The relevant standards are [X]. The approved tools are [Y]. Compose the enhanced prompt and explain the rationale." It cannot argue with or override these inputs.

---

## 7. Source-of-Truth Compilation (Anti-Drift)

All policy rules, prompt templates, design tokens, approved tools, and role definitions are compiled from the SpringBoard repo — never hand-maintained in the agent service. This is the primary defense against drift.

### 7.1 What Gets Compiled and From Where

| Bundle | Compiled from | Parser extracts |
|--------|--------------|-----------------|
| `policy-bundle.json` | `src/content/intake/project-intake.mdx` | 5 intake questions, option→path mappings, "I'm not sure" defaults, escalation rules |
| `content-bundle.json` | `src/content/standards/*.mdx` + `src/content/build-guides/*.mdx` + `src/content/checklists/*.mdx` + `src/content/forms/*.mdx` | Standards text (chunked by heading), checklists (as structured arrays), build guide steps, form templates. PECR content extracted as a dedicated addressable chunk. |
| `design-bundle.json` | `src/content/design-system/*.mdx` + `src/content/standards/branding.mdx` | Colors (both token names and raw hex), typography, tone of voice, logo rules, AI content disclosure rules |
| `tools-bundle.json` | `src/content/client-config/approved-tools.mdx` | Approved tools with per-tool: tier, approved build paths, restrictions, notes |
| `roles-bundle.json` | `src/content/client-config/roles.mdx` + `src/content/roles/*.mdx` | Approval chain, contacts, response times, role-specific guidance |
| `prompts-bundle.json` | `src/content/client-config/prompt-library.mdx` | Prompt templates with metadata (task type match, build path, placeholder fields) |
| `bundle-manifest.json` | All of the above | SHA-256 hash per bundle, total token count, file count, git commit SHA, build timestamp |

### 7.2 Build Step

```bash
npm run build:bundles
# runs scripts/build-bundles.ts
# reads src/content/**/*.mdx
# outputs public/*.bundle.json + public/bundle-manifest.json
```

This runs as part of `npm run build` (alongside the existing `build:search` and `build:dates` steps). It also runs in GitHub Actions on push to `main` when `src/content/**` changes, triggering a re-deploy of the agent service.

### 7.3 Drift Detection

At agent startup (and on every Vercel cold start), the agent loads `bundle-manifest.json` and logs the version hashes. If a bundle hash doesn't match the last-known hash in Supabase `bundle_versions`, a new version record is created.

This means:
- Every response is pinned to a specific set of bundle versions
- You can query: "show me all responses generated before the March safeguarding update"
- You can detect: "the policy bundle hasn't been rebuilt in 30 days — is the repo ahead?"

---

## 8. Infrastructure

### 8.1 Phase 1: Context Stuffing (Current → ~150 docs)

All MDX content (~55K tokens today) fits in Claude's 200K context window. No vector DB needed.

- **Build step:** `npm run build:bundles` produces typed JSON bundles
- **Runtime:** Content selector loads relevant bundle slices, injects as context prefix
- **Prompt caching:** Anthropic's prompt caching on the system prompt + bundle prefix (90% cost reduction on repeated patterns)
- **LLM calls:** Haiku for extraction (~$0.001/query), Sonnet for response generation (~$0.01/query)

### 8.2 Phase 2: Hybrid RAG (150+ docs)

When content exceeds the context window:

- **Supabase pgvector:** Add vector column to content chunks table
- **Hybrid search:** pgvector similarity + Postgres `tsvector` full-text search
- **Re-ranking:** Cohere Rerank 3.5 on top-20 results → top-5 injected
- **Incremental indexing:** SHA-256 hash per MDX file, only re-embed changed files
- **GitHub Actions:** Trigger re-indexing on push to main when `src/content/**` changes

The content selector API stays the same — downstream components don't know whether context came from bundle loading or RAG retrieval.

### 8.3 Estimated Costs (80 Users, Phase 1)

| Item | Monthly Cost |
|------|-------------|
| Claude API (Haiku extraction + Sonnet generation) | $20-50 |
| Supabase (free tier → Pro at $25 if needed) | $0-25 |
| PostHog (free tier, 1M events) | $0 |
| Vercel Pro (serverless functions for Slack bot) | $20 |
| **Total** | **$40-95/month** |

---

## 9. Surfaces

### 9.1 Slack (Primary)

- **Slash command:** `/springboard <message>` — one-shot query
- **DM:** Message the SpringBoard AI bot directly — conversational (supports follow-ups)
- **Thread-aware:** Bot responds in-thread when mentioned in a channel
- **Reactions:** Thumbs up/down on bot messages → logged as feedback
- **Block Kit formatting:** Structured responses with sections, links, collapsible details

### 9.2 Web Chat Widget (Secondary)

- Floating chat widget on the SpringBoard docs site
- Vercel AI SDK `useChat` hook for streaming
- Same `/api/ask` endpoint as Slack
- Authenticated via company SSO (or anonymous with limited features)

### 9.3 Future: Browser Extension (V2+)

- Detects when employee opens ChatGPT/Claude directly
- Offers: "Want SpringBoard context? Ask here instead."
- Injects SpringBoard AI as a sidebar

---

## 10. Content Gap Detection

### 10.1 Automatic Signals

A content gap is logged when:
- No bundle chunk scores above relevance threshold for the query
- The LLM response includes hedging language ("I'm not sure", "I don't have specific guidance")
- A user gives thumbs-down feedback
- A user reports content as outdated

### 10.2 Weekly Digest

Every Monday, a Slack message posts to a designated admin channel:

```
📊 SpringBoard AI — Weekly Report (Mar 4-10)

Queries: 187 (↑12% vs last week)
Satisfaction: 84% thumbs up
Build paths: 🟢 62  🟡 48  🟠 31  🔴 8  ⚠️ Provisional: 38

Top 5 questions:
1. "How do I handle GDPR for school partnerships?" (14 queries)
2. "What tools can I use for email automation?" (11 queries)
3. "Brand guidelines for social media posts" (9 queries)
4. "Student data in Supabase — what's allowed?" (8 queries)
5. "How to request a technical review" (7 queries)

🚨 Content gaps (no good answer):
1. "Social media brand templates" — 6 queries, no doc exists
2. "Slack integration best practices" — 4 queries
3. "Budget approval process for tools" — 3 queries

📉 Lowest-rated docs:
1. "Data Workflows Standard" — 2 thumbs down, 1 outdated report
```

---

## 11. What V1 Does NOT Include

Deferred to V2:
- Vector search / hybrid RAG (not needed until ~150 docs)
- Re-ranking (Cohere Rerank)
- Multi-agent orchestration
- Advanced admin dashboard (web UI)
- Browser extension
- Long-running workflow graphs
- Gamification / leaderboards
- Automated content generation from gaps

---

## 12. Build Order

| Step | What | Depends On |
|------|------|-----------|
| 1 | `scripts/build-bundles.ts` — MDX → typed JSON bundles with version hashes | Existing build pipeline |
| 2 | Supabase project setup — tables from section 5.1 | Nothing |
| 3 | Policy engine — `src/lib/policy-engine.ts` — pure TypeScript, deterministic | Bundle schema (step 1) |
| 4 | `/api/ask` route — extraction → policy → content selection → response | Steps 1-3 |
| 5 | Slack Bolt app — `/springboard` command + DM + thread mentions | Step 4 |
| 6 | PostHog integration — page analytics on docs site | Nothing |
| 7 | Web chat widget — `useChat` on docs site | Step 4 |
| 8 | Weekly digest cron — Supabase query → Slack webhook | Step 2 |
| 9 | User roles seeding — admin populates `user_roles` table | Step 2 |
