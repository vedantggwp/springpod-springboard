# Codebase Concerns

**Analysis Date:** 2026-03-04

## Incomplete Client Configuration

**Area:** Client customization for framework rollout

**Issue:** The framework is production-ready for distribution, but client config sections contain 59 unfilled `[CLIENT: ...]` placeholders that block actual implementation.

**Files affected:**
- `docs/client-config/company-context.md` (17 placeholders)
- `docs/client-config/roles.md` (15 placeholders)
- `docs/client-config/approved-tools.md` (19 placeholders)
- `docs/standards/branding.md` (7 placeholders)
- `docs/client-config/prompt-library.md` (1 placeholder)

**Impact:**
- Each deployment requires manual fill-in of 59+ fields
- Risk of inconsistent implementations across clients
- No validation that all placeholders are completed before rollout
- Error-prone handoff process between framework team and client implementation team

**Current state:** These files are marked "customizable per engagement" in the implementation plan but have no automation or checklist for completion.

**Fix approach:**
1. Create a CLIENT-SETUP.md checklist that lists all 59 required fields
2. Build a validation script that scans client config directories for unfilled `[CLIENT: ...]` markers
3. Create a pre-deployment verification process that ensures no placeholders reach production
4. Consider a client config template with example values filled in (e.g., a SampleSchool or SampleTech config)

---

## Critical Dependency on External Verification

**Area:** Security, compliance, and tool information accuracy

**Issue:** The framework makes factual claims about regulations (COPPA, GDPR, FERPA, CCPA), tool capabilities, and security practices. These must stay current, but verification schedule is documented with manual intervals and no automation.

**Files affected:**
- `docs/verification-log.md` (tracks claimed facts)

**Evidence:**
- Verification log shows 46 claims across 6 categories verified as of 2026-03-04
- High-risk items (security, regulations) are scheduled for re-verification every 60-90 days
- Tool capabilities (T-002, T-003) are especially volatile — tools release updates faster than manual verification cycles
- No automated reminders or accountability for missed verification dates

**Impact:**
- Outdated tool recommendations (e.g., "Replit Agent is Low-Code" if Replit changes pricing/capabilities)
- Stale compliance guidance (e.g., GDPR 2024 amendments, COPPA 2025 rule changes noted but not incorporated)
- Builders could follow outdated instructions without realizing it
- Verification log itself says "Next due: 2026-06-04" but no process to enforce this

**Current mitigation:**
- Verification log is comprehensive and well-organized (shows high rigor)
- Claims are heavily sourced to official documents
- But: no continuous monitoring, no webhook integration with source documents, no automated alerts

**Fix approach:**
1. Establish a quarterly verification task that spans the full verification log
2. Create an automated tool that checks tool pricing/capabilities against official sources (via APIs where available)
3. Subscribe to regulatory change feeds (FTC COPPA, GDPR guidance, state privacy laws)
4. Add a "Verified on: [date]" badge to each document that displays verification status
5. Escalate to version release cycle: don't merge updates to high-risk docs unless verification is current

---

## Missing Cross-Reference Validation

**Area:** Documentation completeness and consistency

**Issue:** The framework is structured as self-contained documents, but this creates maintenance risks where changes to one section aren't reflected across all references.

**Files affected:**
- All docs/build-guides/ (reference other files)
- All docs/checklists/ (reference build guides and forms)
- docs/forms/ (reference standards and roles)

**Examples of cross-references requiring validation:**
- Green/Yellow/Orange/Red build guides link to their corresponding checklists — if a checklist changes, the guide should be updated to match
- All checklists reference "See [Roles]" for reviewer types — if roles change, every checklist needs updating
- Prompt library items reference hex colors from branding standard — if colors change, prompts may become inconsistent
- When-to-escalate.md links to 5 specific contacts — if roles.md changes, this becomes stale

**Impact:**
- A builder could follow a build guide and then fail items on the checklist that weren't mentioned in the guide
- Reviewer names might change but guides still reference old roles
- Orphaned links in updated documents

**Discovered by:** Reading all guides, checklists, and forms in sequence — many cross-references but no validation that they stay in sync

**Fix approach:**
1. Create a "Documentation Map" that lists all inter-document references
2. Add a pre-commit hook that checks markdown links are valid
3. When updating any framework document, scan for all references to that document and flag potential updates needed
4. Create a test suite that verifies consistency (e.g., every checklist's reviewer type must exist in roles.md)

---

## Escalation Process Incompletely Specified

**Area:** Operational readiness

**Issue:** Escalation guides are thorough and helpful, but lack specific operational details needed for first deployment.

**Files affected:**
- `docs/guides/when-to-escalate.md` (guidance is good)
- `docs/client-config/roles.md` (contact details unfilled)

**Gaps:**
1. **Emergency Contact Response SLA:** The guide says "Call the Emergency contact now" for critical severity, but no SLA defined. How fast must they respond? What if they don't answer? Is there a backup escalation path?
2. **Out-of-Hours Coverage:** Red builds need 24/7 incident response capability. Framework doesn't specify whether Emergency contact must be available nights/weekends or just business hours.
3. **Escalation Authority:** The guide doesn't specify who has authority to override a builder's decision. Can the Framework Contact approve something a Technical Reviewer rejected? Can Technical Reviewer override Designated Reviewer?
4. **Audit Trail:** No requirement to log escalations. If something goes wrong after an escalation, there's no record of who approved it and when.

**Impact:**
- First client using Red builds might discover mid-incident that escalation process isn't defined
- Disputes over who has authority to decide
- No accountability for escalation decisions

**Fix approach:**
1. Expand roles.md with explicit sections for:
   - Out-of-hours coverage requirements
   - Escalation authority matrix (who can override whom)
   - Response time SLAs by severity
2. Create an Incident Log template for recording all escalations
3. Document escalation decision criteria: what makes something escalate vs. handled at current level

---

## Security Standard Gaps for High-Risk Scenarios

**Area:** Security completeness

**Issue:** Security Standard covers most scenarios well, but has edge cases for Red builds that could be interpreted multiple ways.

**Files affected:**
- `docs/standards/security.md` (good but incomplete for Red)

**Specific gaps:**
1. **AI-Generated Content Safety:** The Red build guide mentions "production prompt review," but Security Standard doesn't explicitly require testing for harmful output generation. Only checks "bias" and "safety" generically.
   - Example: A chatbot for minors that could generate grooming-like responses isn't explicitly forbidden by current standards
   - Mitigation: Add requirement for adversarial input testing with age-appropriate examples

2. **Data Residency:** Standard says "approve by [Approved Tools]" but doesn't specify how to verify where a service stores data geographically.
   - Example: A builder using a "US-based SaaS" might not realize it uses a global CDN or has EU data centers
   - Mitigation: Add explicit data residency verification checklist

3. **Third-Party Audit Rights:** Standard requires "Data Processing Agreement" for Red builds, but doesn't specify DPA must include right to audit or inspect the service's security practices.
   - Impact: Builder could sign agreement that doesn't give company visibility into how third party handles data

4. **Credential Rotation:** Standard covers "no hardcoded secrets," but doesn't require periodic rotation of secrets used by deployed tools.
   - Scenario: API key used by live tool has been the same for 6 months. If key is compromised, attacker has full access.

**Fix approach:**
1. Add "AI-Generated Content Safeguards" section to Red build security requirements
2. Create Data Residency Verification Checklist
3. Add DPA minimum requirements (audit rights, compliance certifications)
4. Specify credential rotation frequency (e.g., quarterly for Red builds, annually for Orange)

---

## Test Coverage Gaps in Checklists

**Area:** Testing guidance

**Issue:** Build guides emphasize "test with realistic data," but don't define what "realistic" means or provide consistent test scenarios.

**Files affected:**
- `docs/build-guides/green-quick-build.md` (section "Step 4: Test it")
- `docs/build-guides/yellow-standard-build.md` (section "Step 4: Test it")
- `docs/checklists/green-checklist.md` (testing item)
- `docs/checklists/yellow-checklist.md` (testing item)

**Gap:** All guides say "test with realistic names like O'Brien, Müller" but don't define:
- What constitutes "edge case"?
- How many test cases are enough?
- What specific data types should be tested (emails, phone numbers, dates, currency)?
- How to test with accessibility in mind (keyboard navigation, screen readers)?
- How to verify behavior on the specific browsers/devices users actually have?

**Current guidance example from green-checklist.md:**
```
1. Try entering a name with an apostrophe (e.g., "O'Brien")
2. Try entering an empty form — does it handle it?
3. Try entering a very long string (200+ characters)
4. Try entering special characters (accents, emoji, symbols)
```

This is helpful but incomplete:
- No guidance on numeric input testing (zero, negative, very large)
- No guidance on date/time testing (leap years, timezone edge cases)
- No guidance on internationalization (right-to-left text, mixed-direction content)
- No guidance on accessibility testing specifics

**Impact:**
- Builders do minimal testing and call it "realistic"
- Red builds (student-facing) could have untested edge cases
- Accessibility requirements mentioned in Orange builds but not tested

**Fix approach:**
1. Create a "Testing Scenarios" template document with comprehensive test cases by data type
2. Create accessibility testing checklist specific to build paths (required for Orange+)
3. Add "Browser Compatibility Matrix" showing which browsers to test (browsers used by actual students, not just Chrome)
4. Link to existing testing tools (Accessibility Checker, Lighthouse, BrowserStack for multi-device testing)

---

## Fragile Prompt Library

**Area:** Prompt management

**Issue:** Prompt Library exists with 3 example prompts, but has no versioning, no quality assurance, and no process for adding/updating prompts.

**Files affected:**
- `docs/client-config/prompt-library.md` (3 example prompts only)
- `docs/standards/prompts.md` (Prompt Management Standard - references library but library is incomplete)

**Gaps:**
1. **No Versioning:** Prompts show no date, no version number. If a prompt is updated and a builder is mid-project using old version, there's no way to know prompts have changed.
2. **No Quality Assurance:** Prompts are "tested" by editorial review but no verification that they actually work with the tools they recommend.
   - Example: "Internal dashboard" prompt assumes JSON API, but doesn't test against actual Replit Agent
   - Impact: Builder could follow prompt exactly and get unexpected output
3. **No Feedback Loop:** No mechanism for builders to report "this prompt didn't work" or suggest improvements
4. **No Specialized Prompts:** Library has 3 generic prompts but none for high-risk scenarios:
   - Student-facing content (referenced in Red guide but no special prompt)
   - Accessible form design (required for Orange but no specific guidance)
   - Handling minors' data (Red builds but no prompt template)
5. **Incomplete Examples:** Prompts in library have `[bracketed placeholders]` for customization, but no worked examples showing what happens when you fill them in.

**Impact:**
- Builders using library prompts get inconsistent results
- When a prompt needs updating (e.g., new tool version), framework team has no way to notify users
- High-risk prompts (student-facing) lack domain-specific guidance

**Fix approach:**
1. Add version numbers and last-verified dates to every prompt
2. Create Prompt QA process: test each prompt against each recommended tool before release
3. Add Prompt Feedback form (link in footer of prompt library)
4. Create specialized prompts for Red builds: "Student-facing content page," "Accessible form for minors," etc.
5. Create worked examples showing input → expected output for each prompt
6. Build Prompt Changelog showing when prompts were updated and why

---

## Verification Log Doesn't Cover Everything

**Area:** Documentation trust

**Issue:** Verification log is thorough but only covers a subset of factual claims. Many claims are unmeasured.

**Files affected:**
- `docs/verification-log.md` (46 verified claims)
- All other docs (many unverified claims)

**Examples of claims without verification entries:**
- "VCF is designed for companies 20-500 employees" (from design doc, not verified against market research)
- "The framework pays for itself in 2-3 months" (design doc section 4, no source)
- "Peer review takes 15-30 minutes" (mentioned in yellow-standard-build, yellow-checklist, no measurement)
- "Tools change fast" (mentioned in verification schedule, no data on actual change velocity)
- "Minimum 8 character passwords" is verified, but the claim that "15+ recommended" is not sourced

**Impact:**
- Marketing claims in design doc are unverified
- Time estimates (1-4 hours for Green, 1-3 days for Yellow, etc.) have no basis
- Builders might make decisions based on unverified guidance

**Fix approach:**
1. Expand verification log to include ALL factual claims, not just compliance/tool/security items
2. Add "Estimation Basis" category for time estimates (Green: 1-4 hours — based on what? pilot data? customer feedback?)
3. For unverified claims, either:
   - Find sources and add to log
   - Remove or rewrite as opinion/guidance rather than fact
4. Add monthly verification task to re-check high-impact claims (e.g., time estimates)

---

## Missing Implementation Status Tracking

**Area:** Framework readiness

**Issue:** Implementation plan (2026-03-04) exists but there's no public tracking of what's complete vs. in progress.

**Files affected:**
- `plans/2026-03-04-vcf-implementation-plan.md` (comprehensive plan with 13+ tasks)
- No status board or tracking document

**Current state:**
- Plan is detailed and well-organized (13 tasks from scaffolding through rollout)
- All documentation mentioned in plan is present and complete in docs/
- But: No indication of which tasks are done, in progress, or blocked
- No README explaining "v1.0.0 is production-ready for framework licensing"

**Impact:**
- Anyone reviewing the repo doesn't know if VCF is ready to deploy or still in development
- No visibility into blockers or risks
- Potential client asks "Is this ready to use?" without clear answer

**Fix approach:**
1. Create PROJECT_STATUS.md showing completion of each implementation task
2. Add version/release status to docs/index.md (currently just says "VCF v1.0.0" with no context)
3. Create DEPLOYMENT_CHECKLIST.md for pre-rollout verification
4. Document any known limitations or beta status

---

## Standards Exist but Not All Areas Covered

**Area:** Framework completeness

**Issue:** Framework defines standards for Quality, Security, Branding, and Prompts, but several important areas lack explicit standards.

**Files affected:**
- `docs/standards/` (4 standards defined)

**Gaps:**
1. **No Testing Standard:** Testing is mentioned in guides/checklists but no standard defining what "good" test coverage means for each build path
2. **No Accessibility Standard:** Accessibility is required for Orange+ builds, but no dedicated standard. Guidance scattered across Red guide and orange-reviewed-build.md
3. **No Performance Standard:** No guidance on acceptable load times, uptime, or resource limits for each build path
4. **No Documentation Standard:** Framework emphasizes "document your prompts" and "keep a Build Log," but no standard for what good documentation looks like
5. **No Maintenance Standard:** No guidance on how long to maintain live tools, when to archive/delete them, or how to handle security updates

**Impact:**
- Builders interpret "good test coverage" differently
- Orange builds say "loads in under 5 seconds" but no standard definition of acceptable performance
- No guidance on when to retire a tool or update it with security patches

**Fix approach:**
1. Create TESTING_STANDARD.md defining coverage % by build path
2. Create ACCESSIBILITY_STANDARD.md (consolidate from orange-reviewed-build and red-protected-build)
3. Create PERFORMANCE_STANDARD.md with load time, uptime, and resource baselines
4. Create DOCUMENTATION_STANDARD.md for Build Logs, Prompt Specs, and README templates
5. Create MAINTENANCE_STANDARD.md for tool lifecycle, security updates, and archival

---

## Tool Selection Guide May Be Outdated

**Area:** External dependency

**Issue:** Tool Selection Guide recommends specific tools (Lovable, Bolt, v0, Replit Agent, Cursor, Claude Code), but these tools change rapidly.

**Files affected:**
- `docs/guides/tool-selection.md` (tool recommendations)
- `docs/verification-log.md` (T-001 through T-005 verify tool status)

**Current status:**
- Guide last verified 2026-03-04
- Tools are active as of that date
- But verification schedule says "verify every 60 days" for tool capabilities
- Next due date: 2026-05-04 (which is 2 months away)

**Risk scenarios:**
- Lovable/Bolt/v0 announce pricing changes between now and May 2026
- Replit releases Agent 4 with breaking changes
- Claude Code or Cursor release security vulnerabilities requiring pause in recommendations
- A recommended tool shuts down

**Impact:**
- Builders follow guide recommending a tool that's now problematic
- Framework loses credibility if recommendations become stale
- No automated notification system if a recommended tool changes

**Fix approach:**
1. Establish automated tool monitoring for pricing/status changes
2. Set up alerts if a recommended tool changes major versions, pricing, or policies
3. Create rapid-response process for updating tool guide if a tool becomes problematic
4. Link tool guide to verification log so builders can see "Last verified: 2026-03-04"

---

## No Runbook for First Client Implementation

**Area:** Operational readiness

**Issue:** Framework is designed to be licensed and deployed to clients, but no documented process for first deployment.

**Current state:**
- Client config files have clear `[CLIENT: ...]` placeholders
- But: No step-by-step guide for implementation team on how to fill them in
- No checklist for verifying a client is ready to use VCF
- No template for "SampleSchool" or "SampleTech" showing what a filled-in client config looks like

**Impact:**
- First deployment will take longer as implementation team figures out process
- Risk of incomplete customization (forgot to fill one section)
- Missed opportunity to gather feedback on client setup process

**Fix approach:**
1. Create IMPLEMENTATION_RUNBOOK.md with step-by-step process for each engagement tier
2. Create SAMPLE_CLIENT_SCHOOL.md showing a fully-customized version for an education client
3. Create SAMPLE_CLIENT_TECH.MD for a tech company client
4. Add pre-implementation validation checklist (verify all client config fields filled, roles exist, tools are approved, etc.)

---

## Compliance Guidance Assumes US/EU Context

**Area:** International applicability

**Issue:** Framework mentions COPPA (US), GDPR (EU), FERPA (US), CCPA (California), but no guidance for other jurisdictions.

**Files affected:**
- `docs/standards/security.md` (mentions COPPA, GDPR, FERPA)
- `docs/build-guides/red-protected-build.md` (compliance section)
- `docs/client-config/company-context.md` (compliance table)

**Gap:** What if client is:
- In Canada (PIPEDA, AODA)?
- In UK (post-GDPR, UK DPA 2018)?
- In India (DPDP Act)?
- In Australia (Privacy Act)?
- In schools subject to state-specific regulations (Texas HB 4127, Utah law, etc.)?

**Current guidance:** Framework says "Check your [Company Context] for your specific compliance requirements" but Company Context is empty (no examples for non-US/EU).

**Impact:**
- International clients must do their own legal analysis
- Framework appears US/EU-centric (may limit market appeal)
- Red builds for non-US/EU clients lack specific compliance guidance

**Fix approach:**
1. Create COMPLIANCE_JURISDICTIONS.md showing guidance for top 10 jurisdictions
2. Add regulatory checklist templates for Canada, UK, India, Australia, APAC
3. Update Company Context template with PIPEDA, AODA, UK DPA examples
4. Create escalation guidance: "If your jurisdiction is not listed, contact your Designated Reviewer"

---

## No Metrics for Framework Success

**Area:** Accountability

**Issue:** Framework defines what success looks like for tools built with VCF, but doesn't define what success looks like for VCF itself.

**Gap:** How will we know if VCF is working?

**Potential metrics not captured:**
- Time to build by path (is Green still 1-4 hours? Is Yellow still 1-3 days?)
- Review rejection rate (what % of builds are rejected on first review?)
- Security issues found in production (should be zero for Red builds)
- Builder satisfaction (do builders like the framework?)
- Adoption rate (how many clients renew vs. abandon?)
- Cost per build (does VCF actually save money?)

**Impact:**
- Framework team has no feedback loop for improvements
- Can't measure if framework is achieving its mission
- Can't identify which sections need updating

**Fix approach:**
1. Create FRAMEWORK_METRICS.md defining success criteria
2. Add telemetry points (if framework is deployed digitally):
   - Time to complete each phase
   - Which documents are most accessed
   - Which checklist items are most skipped
3. Establish feedback loop with clients:
   - Post-build survey for builders
   - Quarterly client health checks
   - Incident postmortems to identify framework gaps

---

## Documentation Has No Search Indexing

**Area:** Usability

**Issue:** Docs are well-organized but no search function. A builder looking for "email validation" or "minors data" has to browse manually.

**Current state:**
- Docs organized in 7 folders with clear hierarchy
- Each section has cross-links
- No full-text search

**Impact:**
- Builder doesn't know if framework covers their question
- Might miss relevant guidance hidden in different section
- Longer time to find answers increases abandonment risk

**Fix approach:**
1. Deploy docs to searchable platform (e.g., GitHub Pages with search, ReadTheDocs, etc.)
2. Create a searchable FAQ that indexes key terms (email, accessibility, minors, compliance, etc.)
3. Add glossary.md with key terms and where to find them
4. Consider embedding search in future web portal

---

## Incident Report Form Incomplete for Some Scenarios

**Area:** Operational readiness

**Issue:** Incident Report form is good for "something is broken," but inadequate for "we discovered a security vulnerability" or "data exposure."

**Files affected:**
- `docs/forms/incident-report.md`

**Gap:** Red build incidents involving minors' data require immediate escalation, but form doesn't have:
- Section for "Notify parents/guardians?" (required for student data exposure)
- Section for "Regulatory notification required?" (FERPA, COPPA, GDPR all have breach notification timelines)
- Decision tree for "Should tool be taken offline immediately?"
- Chain of custody for evidence (if security incident, need preserved logs)

**Example gap:** A builder discovers student data exposed due to access control bug. Current form guides them to fill out the incident report, but doesn't tell them:
1. This requires immediate phone call to Emergency Contact (not email)
2. Parents may need notification within 24 hours (FERPA)
3. Data controller may need notification within 72 hours (GDPR)
4. Tool should be offline during investigation
5. Logs must be preserved for forensics

**Impact:**
- First data breach could be mishandled due to inadequate incident process
- Notification deadlines could be missed
- No playbook for coordinated response

**Fix approach:**
1. Create INCIDENT_PLAYBOOK.md with decision trees for different incident types
2. Expand Incident Report with:
   - Regulatory notification checklist
   - Parent/guardian notification requirements
   - Data preservation steps
   - Timeline for each severity level
3. Link to When-to-Escalate.md for critical incidents
4. Create post-incident retrospective template

---

## .planning/codebase/ Directory Structure Not Clear

**Area:** Framework itself

**Issue:** This CONCERNS.md file is being written to `.planning/codebase/` but this directory's purpose and organization aren't documented.

**Impact:**
- Unclear if this is for framework developers, for clients, or both
- No README explaining what goes in this directory
- Other GSD tools may expect different structure

**Fix approach:**
1. Create `.planning/codebase/README.md` explaining:
   - This directory contains codebase analysis documents
   - Who should read them (framework developers, not clients)
   - How to keep them updated
2. Add to .gitignore or document they're internal-only

---

*Concerns audit: 2026-03-04*
