# Coding Conventions

**Analysis Date:** 2026-03-04

## Overview

The Vibe Coding Framework (VCF) is not a traditional application codebase but rather a structured documentation and standards framework for AI-assisted development. Therefore, "coding conventions" in this context refer to documentation patterns, form structures, and content organization standards that builders follow when using VCF.

---

## Documentation Conventions

### File and Folder Naming

**Pattern:** All markdown files and directories use UPPERCASE with hyphens for multi-word names.

**Examples:**
- `PROJECT-BRIEF.md` - templates
- `BUILD-LOG.md` - forms
- `GREEN-CHECKLIST.md` - checklists
- `QUALITY-STANDARD.md` - standards
- `PROJECT-INTAKE.md` - intake forms

**Directory names:** lowercase with hyphens

Examples from structure:
- `build-guides/` - contains build path guides
- `client-config/` - contains client-specific configuration
- `forms/` - form templates

### Content Structure

Every substantive item follows **progressive disclosure** with three layers:

1. **Summary (one-liner):** Required. States the rule/requirement in one sentence.
2. **WHY details-block:** Collapsible. Explains the reasoning.
3. **HOW TO CHECK details-block:** Collapsible. Step-by-step verification instructions.

**Example from `security.md`:**
```
- [ ] **Use HTTPS (the lock icon in the browser) for everything**

    Every page of your tool should show a lock icon in the browser's address bar.

    <details><summary>WHY</summary>
    Without HTTPS, anyone on the same network (a coffee shop, a school) can read the data...
    </details>

    <details><summary>HOW TO CHECK</summary>
    1. Open your tool in a browser
    2. Look at the address bar...
    </details>
```

### Tone and Voice

**Style:** Conversational, direct, avoiding jargon. When jargon is necessary, it is defined in the [Glossary](docs/guides/glossary.md).

**Example patterns:**
- "Do not" instead of "must not"
- "Something went wrong" instead of "error occurred"
- "You are all set!" instead of "process completed successfully"
- Second person ("you") throughout

**See:** `docs/standards/branding.md` for complete tone of voice guidelines.

---

## Form and Template Conventions

### Standard Template Structure

All form templates (`docs/forms/`) follow this structure:

1. **Header section:** Project name, builder name, date fields
2. **Required content sections:** Specific to the form type
3. **Related documents:** Cross-links to relevant standards and guides
4. **Entry templates:** For forms requiring repeated entries (e.g., Build Log)

**Examples:**
- `docs/forms/project-brief.md` - What you are building, why, what done looks like
- `docs/forms/build-log.md` - Decision log per session with prompts and issues
- `docs/forms/prompt-spec.md` - Full specification for production prompts
- `docs/forms/review-request.md` - Structured submission for technical review
- `docs/forms/incident-report.md` - Incident response and documentation

### Field Naming Conventions

**Underscores for blanks:** `___` indicates a fill-in-the-blank field.

Example from `project-brief.md`:
```markdown
**Project name:** ___

**Builder:** ___ (your name)

**Date:** ___
```

### Example Usage

All templates include placeholder examples using block quotes with `>`. Builders can see exactly what they should provide.

Example from `build-log.md`:
```markdown
> Example: "Used Chart.js instead of D3 because Chart.js was simpler for basic
> line charts and had better documentation for beginners."
```

---

## Checklist Conventions

### Checkbox Format

All checklists use standard markdown checkboxes: `- [ ]`

**Pattern:** Checkbox precedes bolded requirement statement, followed by WHY and HOW TO CHECK details.

Example from `yellow-checklist.md`:
```markdown
- [ ] **Someone other than me has used this tool and given feedback**

    Not "looked at" — actually used it...

    <details><summary>WHY</summary>
    You already know how your tool works...
    </details>

    <details><summary>HOW TO DO THIS</summary>
    1. Pick someone who was not involved...
    </details>
```

### Build Path Organization

Checklists organized hierarchically by requirement level:

- **Items 1-6:** Quick Build Foundations (same across Green, Yellow, Orange, Red)
- **Items 7-10:** Standard Build Additions (Yellow+)
- **Items 11-14:** Reviewed Build Additions (Orange+)
- **Items 15-18:** Protected Build Additions (Red only)

This reflects the superset model: each path includes all requirements from lower paths.

---

## Naming Patterns

### Build Path Colors

- **Green:** Quick Build (internal, throwaway, no sensitive data)
- **Yellow:** Standard Build (internal business data, peer review)
- **Orange:** Reviewed Build (customer data, technical review required)
- **Red:** Protected Build (minors, protected data, compliance required)

Used consistently throughout all documents and file names.

### Security and Data Terms

**Data classification terminology:**
- **Personal data:** Names, emails, accounts, identifiable information
- **Protected data:** Student records, health info, financial data, data about minors
- **Sensitive information/secrets:** API keys, passwords, tokens, database URLs, credentials

**Example from `security.md`:**
- `API_KEY` - environment variable naming pattern
- `sk-` - prefix search for OpenAI keys
- `DATABASE_URL` - environment variable pattern

---

## Verification and Documentation Patterns

### Verification Log Format

Reference document `docs/verification-log.md` follows this structure:

| Column | Content |
|--------|---------|
| ID | Reference identifier (e.g., R-001, T-001, S-001) |
| Claim | The factual statement being verified |
| Document | Which framework document contains the claim |
| Method | How it was verified (official-docs, manual-test, etc.) |
| Source | URL or reference link |
| Status | Verified, Outdated, Needs Review |
| Date | Verification date (YYYY-MM-DD format) |
| Notes | Additional context |

**ID Prefixes:**
- R-xxx: Regulations and Compliance
- T-xxx: Tool Capabilities
- S-xxx: Security Practices
- A-xxx: Accessibility Standards

---

## Cross-Referencing Conventions

### Link Format

All cross-references use relative markdown links:

```markdown
See [Project Brief](../forms/project-brief.md) for template.
See the [Security Standard](../standards/security.md) for details.
```

### Link Organization

- Within `docs/` tree: Use relative paths (`../`, `./`)
- To forms: `../forms/[name].md`
- To standards: `../standards/[name].md`
- To guides: `../guides/[name].md`
- To checklists: `../checklists/[name].md`

---

## Comments and Documentation

### When to Add Notes

**Use `<details><summary>` blocks for:**
- Contextual "why" explanations
- Step-by-step "how to check" instructions
- Examples and sample inputs/outputs
- Caveats and special cases

**Use regular prose for:**
- Overview statements
- Pattern descriptions
- Key definition statements

### Example Formatting

From `prompt-spec.md`:
```markdown
## What does this prompt do?

One sentence: This prompt tells the AI to ___.

> Example: "This prompt tells the AI to summarize a student's
> weekly progress into 3 bullet points suitable for parent communication."
```

---

## Error and Edge Case Handling

### Error Message Conventions

Per `branding.md` and `security.md`, error messages follow brand voice standards:

| Do | Do not |
|----|--------|
| "Something went wrong" | "Error 500: Internal Server Exception" |
| "Try again in a few minutes" | "Service temporarily unavailable" |
| "We could not find that page" | "404 Not Found" |
| Show helpful context | Show stack traces or database names |

### Known Limitations Documentation

In `prompt-spec.md`, known limitations are documented as bulleted list:

```markdown
## Known limitations

When does this prompt give bad results? What inputs cause problems?

- ___
- ___
- ___

> Example: "Gives vague summaries when input contains fewer than 3 data points..."
```

---

## Production Prompt Conventions

### Prompt Documentation Requirements

For Yellow+ builds, every production prompt must be documented using `docs/forms/prompt-spec.md` template.

**Required fields:**
- Prompt name (descriptive identifier)
- One-sentence purpose statement
- Full prompt text (exactly as runs in production)
- Expected input and output (with 2 examples each)
- Known limitations
- Testing results table

**Testing results table format:**

| Test input | Expected output | Actual output | Pass? |
|------------|-----------------|---------------|-------|
| ___ | ___ | ___ | Y / N |

### Build vs. Production Prompts

**Build prompts** (temporary):
- Used while creating the tool in Replit, Cursor, Claude, etc.
- Not documented beyond project's Build Log
- Yellow+: Save in `prompts.md` or Build Log alongside project

**Production prompts** (permanent):
- Run inside finished tool and affect user outputs
- Yellow+: Document using Prompt Spec template
- Orange+: Review for brand voice, bias, safety, edge cases
- Red: Maintain version history with dates and change reasons

---

## Constants and Configuration

### Environment Variables

**Naming convention:** UPPERCASE_WITH_UNDERSCORES

**Examples from `security.md` search patterns:**
- `API_KEY`
- `DATABASE_URL`
- `HTTPS` (protocol indicator)
- Any `sk-` prefixed string (OpenAI pattern)

**Never in code:** All sensitive values moved to environment variables before shipping.

---

## File Size and Granularity

### Document Length Guidelines

- **Checklists:** 1-2 pages (compact verification mode)
- **Standards:** 3-5 pages (reference depth)
- **Guides:** 5-8 pages (learning mode with examples)
- **Forms/Templates:** 1-3 pages (fill-in-the-blank structure)
- **Glossary:** Reference, searchable alphabetically

---

## Consistency Patterns Across Documents

### Build Path Coverage

Every substantial standard covers all four build paths hierarchically:

| Build path | Section pattern |
|------------|-----------------|
| Green | Implied (base level) |
| Yellow | "Yellow: Standard Build (and above)" |
| Orange | "Orange: Reviewed Build (and above)" |
| Red | "Red: Protected Build" |

**Note:** "And above" means Yellow requirements are in Green+Yellow+Orange+Red.

### Date Format

ISO 8601 format: YYYY-MM-DD

- Used in verification log: `2026-03-04`
- Used in file names: `2026-03-04-vcf-implementation-plan.md`
- Used in document headers: `**Date:** 2026-03-04`

---

## Related Standards

For complete guidance on related topics:
- **Quality Standards:** `docs/standards/quality.md`
- **Security Standards:** `docs/standards/security.md`
- **Prompt Standards:** `docs/standards/prompts.md`
- **Branding Standards:** `docs/standards/branding.md`

---

*Convention analysis: 2026-03-04*
