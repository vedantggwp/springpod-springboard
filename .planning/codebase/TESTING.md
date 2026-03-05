# Testing Patterns

**Analysis Date:** 2026-03-04

## Overview

The Vibe Coding Framework (VCF) is a standards and documentation framework for AI-assisted development, not a traditional software application. Therefore, "testing" in this context refers to:

1. **Quality verification patterns** - How builders verify their AI-generated tools meet standards
2. **Prompt testing conventions** - How production prompts are tested before deployment
3. **Verification and checklist patterns** - How the framework itself ensures compliance
4. **Test data and realistic input patterns** - What constitutes valid testing

---

## Quality Verification Framework

### Four-Tier Build Path Testing Requirements

Every project maps to one of four build paths, each with progressively stricter testing and verification requirements.

**Build Path Hierarchy:**

```
Green (Quick Build)
    ↓
Yellow (Standard Build)
    ↓
Orange (Reviewed Build)
    ↓
Red (Protected Build)
```

Each path includes all testing requirements from lower tiers, plus additional requirements.

---

## Tier 1: Green Build (Quick Build) Testing

**Scope:** Internal tools, prototypes, throwaway projects with no sensitive data

**Testing Requirements:**

1. **Basic functionality testing:**
   - Tool does what the Project Brief says it does
   - All listed "done" criteria work

2. **Realistic input testing:**
   - Test with real names (O'Brien, Müller, Smith-Jones)
   - Test with empty fields
   - Test with very long text (200+ characters)
   - Test with special characters and emoji

3. **Device testing:**
   - Works on devices users actually have
   - Use browser device preview mode if testing on actual devices unavailable

4. **Error handling:**
   - Handles mistakes gracefully (not blank screens or raw errors)
   - Shows clear messages when something goes wrong

**Verification Method:** Mental checklist or informal testing. No formal documentation required.

**See:** `docs/checklists/green-checklist.md`

---

## Tier 2: Yellow Build (Standard Build) Testing

**Scope:** Internal tools with business data, moderate customization, ongoing use

**Testing Requirements (Green + these additions):**

1. **Realistic data testing:**
   - Test with names containing apostrophes, accents, hyphens
   - Test with empty forms
   - Test with maximum-length inputs
   - Test with special characters and emoji

2. **User testing with fresh eyes:**
   - Have someone OTHER than the builder use the tool
   - Ask them to complete the main task WITHOUT help
   - Watch where they hesitate or get confused
   - Fix those issues before shipping

3. **Prompt documentation and preservation:**
   - Save all AI prompts used in Build Log (`docs/forms/build-log.md`)
   - Record which tool generated what (Replit, Cursor, Claude, etc.)
   - Note what you changed from AI output

4. **AI prompt testing (if any AI generation in the tool):**
   - Generate 3-5 outputs with varied inputs
   - Verify outputs make sense
   - Check for consistency in format and tone

**Verification Method:** Build Log entries + checklist completion.

**See:** `docs/checklists/yellow-checklist.md` and `docs/forms/build-log.md`

---

## Tier 3: Orange Build (Reviewed Build) Testing

**Scope:** Tools handling personal data or serving external users

**Testing Requirements (Yellow + these additions):**

1. **Multi-device and browser testing:**
   - Test with names: O'Brien, Müller, Smith-Jones, 日本語の名前 (non-Latin scripts)
   - Test with empty forms and maximum-length inputs
   - Test with special characters (accents, symbols, emoji)
   - Test with numbers: zero, negative, very large, decimal values
   - Test on different browsers: Chrome, Safari, Firefox
   - Test on mobile devices (actual devices or reliable simulator)

2. **Error condition testing:**
   - Disconnect from internet and try using the tool
   - Submit invalid data (text in number fields, etc.)
   - Access non-existent pages or resources
   - Verify error messages are user-friendly, not technical

3. **Data access testing (critical):**
   - Create two test accounts
   - Log in as Account A and note URL when viewing personal data
   - Log in as Account B and paste Account A's URL
   - Verify Account B CANNOT see Account A's data
   - This is one of the most common security failures

4. **Production prompt testing (for all AI-generated content):**
   - Generate 10 outputs with varied inputs including edge cases
   - Test for bias: do prompts treat all users fairly regardless of background?
   - Test for safety: can the prompt produce harmful or misleading output?
   - Test edge cases: empty input, very long input, unexpected input
   - Verify outputs match brand voice
   - Document using Prompt Spec template

5. **Data handling verification:**
   - List every piece of personal data collected
   - Confirm it is strictly necessary
   - Confirm HTTPS is active (lock icon in browser)
   - Confirm database encryption is enabled
   - List all external services receiving data

6. **Technical review:**
   - A person with security/technical expertise reviews the tool
   - They check: data handling, security, access controls, prompt quality
   - Use Review Request form to submit

**Verification Method:** Review Request form + Prompt Spec templates + checklist completion

**See:** `docs/checklists/orange-checklist.md`, `docs/forms/review-request.md`, `docs/forms/prompt-spec.md`

---

## Tier 4: Red Build (Protected Build) Testing

**Scope:** Tools handling protected data (minors, health, financial), compliance-regulated tools, high-stakes applications

**Testing Requirements (Orange + these additions):**

1. **Realistic user testing (actual target audience):**
   - If tool serves students aged 14-18, test with inputs typical of that age group
   - NOT adult professionals
   - Test on actual devices users have (not just developer machines)
   - Test with data volumes expected in production

2. **Comprehensive prompt testing (all Red requirements):**
   - All Orange prompt testing (10 outputs, bias, safety, edge cases, brand voice)
   - PLUS: Test with inputs typical of target audience demographics
   - Deliberately adversarial inputs: very long text, nonsense, offensive language, prompt injection attempts like "ignore your instructions and..."
   - Document all failure modes
   - Add guardrails to prevent failures

3. **Accessibility testing:**
   - Keyboard navigation only (no mouse): can you reach every button?
   - Use WAVE accessibility checker (`wave.webaim.org`)
   - Run Lighthouse accessibility audit (Chrome DevTools → Lighthouse → Accessibility)
   - Fix all "critical" or "serious" errors

4. **Data privacy compliance testing:**
   - List every piece of data about users under 18
   - For each: is it strictly necessary? Remove if not.
   - Confirm no behavioral tracking or profiling
   - Confirm no data shared with third parties beyond necessity
   - Check company policy on parental notification
   - Verify compliance with COPPA, GDPR, FERPA as applicable

5. **Access control testing (comprehensive):**
   - Create two test accounts
   - Verify Account B cannot access Account A's data through interface
   - Verify Account B cannot access Account A's data by URL manipulation
   - Verify Account B cannot access Account A's data through the API
   - Test role-based access: can a regular user access admin features?

6. **Load testing:**
   - Estimate concurrent users during peak hours
   - Perform load test at that number of simultaneous connections
   - Identify and address bottlenecks
   - Flag to technical reviewer if uncertain how to perform

7. **Incident response plan testing:**
   - Document incident response plan using Incident Report template
   - ACTUALLY TEST THE KILL SWITCH in test environment
   - Verify it works and is documented
   - Share plan with at least two people
   - Store somewhere accessible (not just in the tool)

8. **Designated reviewer approval:**
   - Technical or security reviewer with expertise signs off
   - They verify compliance and safety
   - Record reviewer name and approval date

**Verification Method:** Comprehensive documentation + checklist + designated reviewer sign-off

**See:** `docs/checklists/red-checklist.md`, `docs/forms/incident-report.md`, `docs/standards/security.md`

---

## Production Prompt Testing Patterns

### Complete Prompt Spec Testing (Yellow+ builds)

Every production prompt must be documented and tested using the Prompt Spec template (`docs/forms/prompt-spec.md`).

### Test Structure

**1. Baseline Testing (before any users):**

```markdown
| Test input | Expected output | Actual output | Pass? |
|------------|-----------------|---------------|-------|
| [typical input] | [what AI should produce] | [what it actually produced] | Y / N |
| [edge case: empty] | [expected behavior] | [actual behavior] | Y / N |
| [edge case: very long] | [expected behavior] | [actual behavior] | Y / N |
```

**2. Orange-tier testing additions:**

- [ ] Brand voice check: Does output match company tone?
- [ ] Bias check: Does it treat all users fairly?
- [ ] Safety check: Can it produce harmful output?
- [ ] Edge case check: Handles unexpected input gracefully?

**3. Red-tier testing additions:**

- [ ] Adversarial input testing: injection attempts, offensive language, nonsense
- [ ] Target audience testing: inputs typical of actual users (e.g., age-appropriate language)
- [ ] Documented failure modes: what worst-case output could this produce?
- [ ] Safeguards documented: how are failures prevented?
- [ ] Version history: every change to prompt tracked with date and reason

### Example: Prompt Testing for Student Progress Summary

From usage examples in `forms/prompt-spec.md`:

**Prompt name:** Weekly Student Progress Summarizer

**One-sentence purpose:** Summarizes a student's weekly progress into 3 bullet points suitable for parent communication

**Test cases:**

| Input | Expected | Actual | Pass |
|-------|----------|--------|------|
| Student with 3 strong achievements | 3 bullets highlighting achievements | [actual output] | Y/N |
| Student with incomplete work week | 3 bullets with focus on support | [actual output] | Y/N |
| Empty/minimal data | 3 bullets acknowledging limited data | [actual output] | Y/N |

**Known limitations documented:**
- Gives vague summaries when fewer than 3 data points
- Occasionally includes technical terminology not suitable for parents
- May not capture behavioral improvements if not explicitly recorded

---

## Test Data Conventions

### Realistic Test Input Sets

**Never use:** "test123", "John Smith", generic placeholder data

**Always use:**
- Names with apostrophes: O'Brien, O'Malley
- Names with accents: Müller, García, José, Naïve
- Names with hyphens: Smith-Jones, Mary-Anne
- Names with non-Latin characters: 日本語の名前, Владимир
- Empty fields: blank inputs, null values
- Boundary values: zero, negative numbers, very large numbers
- Long strings: 200+ character text, addresses
- Special characters: emoji, symbols, currency signs, brackets
- Real-world edge cases: leading/trailing spaces, multiple spaces

**Format:** Documented in test plan or Build Log

**Example from `yellow-checklist.md`:**

```markdown
HOW TO CHECK
1. Try entering names with apostrophes, accents, and hyphens
   (O'Brien, Müller, Smith-Jones)
2. Try entering empty fields — does the tool handle them?
3. Try very long text (200+ characters)
4. Try special characters and emoji
5. If your tool handles numbers, try zero, negative numbers,
   and very large numbers
```

---

## Error Testing Patterns

### When to Test Error Conditions

**Green/Yellow:** Informal, mental checklist

**Orange:** Structured testing of common error conditions:
- Invalid input (text in number field)
- Missing internet connection
- Non-existent resource access
- Empty database responses

**Red:** Comprehensive error testing plus adversarial inputs:
- SQL injection attempts (if applicable)
- Prompt injection attempts
- XSS attempts (if handling HTML)
- Deliberately malformed data
- Resource exhaustion attempts

### Error Message Verification

**What users should see:**
- "Something went wrong. Please try again or contact support."
- "Try again in a few minutes"
- "We could not find that page"

**What users should NOT see:**
- Stack traces
- Database names or file paths
- Internal error codes
- Technical implementation details

**Verification:** Read every error message in the tool against brand voice standards (`docs/standards/branding.md`)

---

## User Testing Patterns

### Yellow Build: Peer User Testing

**Requirement:** Someone other than the builder uses the tool

**How to test:**
1. Pick someone NOT involved in building
2. Give them: URL + a task ("Find [X] and do [Y]")
3. Do NOT help unless completely stuck
4. Watch where they hesitate, click wrong, get confused
5. Fix those issues before shipping

**Documentation:** Note findings in Build Log or Review Request

### Orange/Red Build: Structured Technical Review

**Requirement:** Person with technical or security expertise reviews

**Use form:** `docs/forms/review-request.md`

**Include:**
- What you built
- What checklist items you completed
- Which you could not complete and why
- List of all external services
- Build Log and Prompt Specs
- Questions for the reviewer

**Reviewer responsibilities:**
- Check data handling and security
- Verify access controls work properly
- Validate prompt quality and safety
- Assess overall compliance with checklist

---

## Accessibility Testing (Orange+ builds)

### Three-Pronged Testing Approach

**1. Keyboard navigation test:**
```
1. Close the laptop trackpad
2. Plug in external keyboard (or use keyboard-only)
3. Try using your tool with only the keyboard (no mouse)
4. Can you reach every button and link? Can you submit forms?
5. Can you use all features without any mouse movement?
```

**2. WAVE accessibility checker:**
- Go to `wave.webaim.org`
- Paste your tool's URL
- Review errors and warnings
- Fix items flagged as "critical" or "serious"

**3. Lighthouse audit:**
```
1. Right-click on any page in your tool
2. Click "Inspect"
3. Go to "Lighthouse" tab
4. Check "Accessibility"
5. Click "Analyze page load"
6. Fix errors flagged as critical
```

**Documentation:** Include findings in Review Request

---

## Load Testing (Red builds)

### When to Load Test

**Red builds only** if 500+ concurrent users expected during peak hours

### How to perform:

1. Estimate concurrent users during peak hours
2. Ask technical reviewer to run load test at that number
3. Monitor: response time, database load, error rates
4. Identify bottlenecks
5. Fix or document as limitation

**If uncertain:** Flag in Review Request for technical reviewer

---

## Verification Patterns: Framework Self-Testing

### Verification Log System

The framework itself uses `docs/verification-log.md` to verify that all factual claims are current and accurate.

**Verification structure:**

| ID | Claim | Document | Method | Source | Status | Date |
|----|-------|----------|--------|--------|--------|------|
| R-001 | COPPA applies to children under 13 in the US | security.md | official-docs | ftc.gov/coppa | Verified | 2026-03-04 |

**Verification schedule:**
- High-risk items (security, compliance): 90 days
- Tool capabilities: 60 days (tools change fast)
- Standards and guides: 180 days

**Current schedule (from verification-log.md):**
- security.md: Next verification 2026-06-04
- tool-selection.md: Next verification 2026-05-04
- quality.md: Next verification 2026-09-04

---

## Checklist Verification Patterns

### Pre-Build Verification

Before starting any project:
- [ ] Completed Project Brief (`docs/forms/project-brief.md`)
- [ ] Completed Project Intake (determines build path)
- [ ] Selected appropriate tool via Tool Selection Guide

### During-Build Verification

- [ ] Work saved to cloud (not just local drive)
- [ ] Build Log updated with decisions and prompts
- [ ] Testing done with realistic data (not generic test data)

### Pre-Ship Verification

- [ ] Tool does everything in Project Brief
- [ ] No secrets in code (search for API keys, passwords)
- [ ] Kill switch documented and tested
- [ ] Error messages are user-friendly

### Build-Path-Specific Verification

**Yellow:** Someone other than builder has used it + reviewed

**Orange:**
- Data handling verified
- Access controls tested
- Technical review completed
- Prompt Specs documented

**Red:**
- Accessibility verified via WAVE + Lighthouse + keyboard test
- Privacy compliance with COPPA/GDPR/FERPA confirmed
- Incident response plan documented and tested
- Designated reviewer sign-off obtained

**See:** Checklists in `docs/checklists/`

---

## Testing Documentation Standards

### Build Log Entry Pattern (Yellow+)

```markdown
### Date: [YYYY-MM-DD]

**What I did:** [Brief description]

**Decisions made:** [Choices and reasoning]

**AI prompts used:** [Paste full prompt with tool name]

**Issues encountered:** [Problems, surprises, unexpected findings]

**Next steps:** [What's next]
```

### Prompt Spec Pattern (Yellow+)

Required sections:
- One-sentence purpose
- Full prompt text (exact production version)
- Expected input (2 examples)
- Expected output (2 examples)
- Known limitations (bullet list)
- Testing results table

For Orange+:
- Brand voice check ✓/✗
- Bias check ✓/✗
- Safety check ✓/✗
- Edge case check ✓/✗

For Red:
- Version history with dates and change reasons

---

## Related Standards and Guidelines

**Quality verification:** `docs/standards/quality.md`

**Security testing:** `docs/standards/security.md` (data handling, encryption, access controls)

**Prompt testing:** `docs/standards/prompts.md` (testing production prompts for bias, safety, brand fit)

**Templates:**
- Build Log: `docs/forms/build-log.md`
- Prompt Spec: `docs/forms/prompt-spec.md`
- Review Request: `docs/forms/review-request.md`

**Guides:**
- Tool Selection: `docs/guides/tool-selection.md` (choose right tool for your build path)
- When to Escalate: `docs/guides/when-to-escalate.md` (when to ask for help instead of testing alone)

---

*Testing analysis: 2026-03-04*
