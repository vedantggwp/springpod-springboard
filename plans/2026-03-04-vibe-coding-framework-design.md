# VCF: Vibe Coding Framework - Design Document

**Date:** 2026-03-04
**Status:** Approved
**Author:** Ved (framework creator) + Claude (design partner)

---

## 1. Vision & Mission

**Mission:** Define how companies build, review, and release AI-powered and rapid-built tools in a way that preserves speed but improves consistency, safety, and scalability.

**Core question:** How should a company adopt AI coding tools so that anyone - coders, non-technical staff, and tech-averse employees - can produce uniform, reliable, safe, brand-consistent outputs without individual training overhead?

---

## 2. Market Context

### The Gap

The market has tools on both ends but nothing in the middle:
- **Generation tools** (Replit Agent, Lovable, Bolt, v0, Cursor, Claude Code) help people build
- **Review tools** (CodeRabbit, Qodo) check code after the fact
- **Governance platforms** (Credo AI, Holistic AI) manage model risk at enterprise scale

**What's missing:** A packaged, commercially available framework governing the entire AI-assisted development lifecycle as an internal operating standard. VCF fills this gap.

### Competitive Landscape

- **docs.vibe-coding-framework.com** exists as an unpaid whitepaper with no commercial entity behind it
- **Superblocks** ($23M raise, May 2025) targets "enterprise vibe coding" but is a platform, not a framework
- **Big 4 consulting** (McKinsey, Accenture, BCG, Deloitte) run bespoke AI adoption engagements at $500K-$5M+ but don't sell packaged frameworks
- **Spec-Driven Development tools** (Kiro by AWS, Tessl, GitHub Spec Kit) constrain what AI builds but don't address organizational process

**VCF's positioning:** The ISO 27001 of AI-assisted development - a standard companies adopt, customize, and operate within.

---

## 3. Target Client

- **Size:** Small to mid-size companies (20-500 employees)
- **Industry:** Starting with ed-tech; expandable to any company adopting AI tools
- **Buyer:** Company leadership (CTO, COO, Head of Product) who want AI adoption without per-person training costs
- **Builder profiles within client:** Coders, non-technical staff (PMs, marketing, ops), tech-averse employees
- **Use cases:** Internal tools, student-facing tools (14-18 audience), partner-facing tools, tools that may evolve into core product

---

## 4. Business Model

**Product:** Licensed framework with optional services

| Tier | What They Get | Engagement |
|------|--------------|------------|
| **License Only** | Core framework (standards, guides, checklists, templates) + self-service customization guide | Write once, sell many |
| **Done With You** | Core + facilitated workshop to populate client config (branding, tools, roles, prompts) | 1-2 day engagement per client |
| **Done For You** | Core + full client config + AI tool configurations + team onboarding | 1-2 week engagement per client |
| **Managed** | Everything above + quarterly reviews, framework updates, compliance audits | Monthly retainer |

**Modularity requirement:** The framework must decompose cleanly to support all four tiers.

---

## 5. Design Principles

### 5.1 The Framework IS the Training

Not: "Read this manual, then go build."
Instead: "Follow this guide while you build, and learn as you go."

Every checklist item, every guided step, every template is designed to teach through repetition. By the 10th build, the framework is internalized. This is the **flight checklist model** - continuous guided practice, not one-time training.

### 5.2 Tool-Agnostic, Human-Centric

VCF wraps around the human, not the tool. It works whether the builder uses Replit, Lovable, Cursor, Claude Code, or anything else. Tool-specific configurations are optional accelerators, not requirements.

### 5.3 Meet People Where They Are (Progressive Disclosure)

Three audience profiles inform content design, but are never user-facing labels:

| Profile | Who | What they need |
|---------|-----|---------------|
| **Builder** | Has coded before, comfortable with AI tools | Structure, not hand-holding |
| **Explorer** | Non-technical but curious (PM, marketing, ops) | Guided steps, plain language |
| **Cautious** | Tech-averse, may be required to use this by leadership | Maximum safety, minimum jargon |

Implementation via **progressive disclosure**: every content item has three layers:
1. **One-liner** (Builder reads this and moves on)
2. **WHY** (Explorer reads this for context)
3. **HOW TO** (Cautious reads this for step-by-step guidance)

Nobody picks a profile. Content layers are accessed on demand (collapsible sections in markdown, expandable in future portal).

### 5.4 50% Accelerator, 50% Safeguard

The framework must make builders FASTER, not just SAFER. Every phase includes:
- **Accelerator items:** Prompt library shortcuts, starter templates, "has someone built this already?" checks, auto-validation scripts
- **Safeguard items:** Security checks, privacy verification, review requirements

If the framework only slows people down, they'll abandon it. The accelerators are what earn adoption.

### 5.5 Dual-Mode Content

Each build phase exists in two modes:
- **Build Guide (learning mode):** Step-by-step instructions with WHY and HOW. This IS the training.
- **Build Checklist (verification mode):** Compact yes/no items. For builders who already know the steps.

Builders naturally graduate from Guide to Checklist over time.

---

## 6. Classification Model

### 6.1 Project Intake (5 Questions)

Every project starts with 5 plain-language questions. The framework scores answers and assigns a build path. Every question includes an "I'm not sure" option that bumps to the next-higher tier and flags for human review.

```
PROJECT INTAKE
──────────────

1. Who will use this?
   [ ] Just our team (internal)
   [ ] Partners or vendors
   [ ] Customers / end users
   [ ] Students or anyone under 18
   [ ] I'm not sure → treat as "Customers" and flag for review

2. What data does it touch?
   [ ] No real data (mockups, test data, public info)
   [ ] Internal business data (reports, metrics, content)
   [ ] Personal data (names, emails, accounts)
   [ ] Protected data (student records, health, financial)
   [ ] I'm not sure → treat as "Personal data" and flag for review

3. What happens if it breaks or gives wrong information?
   [ ] Minor inconvenience, easy workaround
   [ ] Team is slowed down, but workaround exists
   [ ] External users are affected or confused
   [ ] Legal, safety, or financial consequences
   [ ] I'm not sure → treat as "External users affected" and flag for review

4. How long will this be used?
   [ ] One-time or throwaway (demo, test, prototype)
   [ ] Ongoing but can be replaced easily
   [ ] Core to daily operations or part of our product

5. What role does AI play?
   [ ] AI helped me build it, but I defined all the logic
   [ ] AI generates content that users will see
   [ ] AI makes decisions that affect outcomes (scoring, filtering, recommendations)
   [ ] I'm not sure → treat as "generates content" and flag for review
```

### 6.2 Four Build Paths

Based on intake answers, every project maps to one of four paths. Each path is a superset of the one below it. **Highest trigger wins.**

| Path | Color | Trigger | Requirements | Items |
|------|-------|---------|--------------|-------|
| **Quick Build** | Green | Internal + no sensitive data + throwaway | Basic checklist. No formal review. | ~6 |
| **Standard Build** | Yellow | Internal + business data, OR partner-facing | Full checklist. Peer review. | ~10 |
| **Reviewed Build** | Orange | Customer-facing, OR personal data, OR core ops, OR AI generates user content | Full checklist + security review + branding check + prompt documentation. | ~14 |
| **Protected Build** | Red | Minors (students), OR protected data, OR AI makes decisions affecting outcomes, OR replaces core system | Everything above + data privacy review + accessibility + incident response plan + designated reviewer sign-off. | ~18 |

### 6.3 Escalation Rules

- Projects can only move UP paths, never down
- Each checklist item that could trigger escalation explicitly says so
- Re-intake is required at defined intervals (Red: 30 days, Orange: 90 days, Yellow: on significant change)
- "I'm not sure" always bumps up one level

---

## 7. Framework Structure (Deliverable)

```
VCF-[client-name]/
│
├── START-HERE.md                     # What this is, how to use it (1 page)
│
├── 01-intake/
│   └── PROJECT-INTAKE.md             # 5 questions → build path assignment
│
├── 02-standards/
│   ├── QUALITY.md                    # What "good enough" looks like
│   ├── SECURITY.md                   # Data handling, secrets, auth, privacy
│   ├── BRANDING.md                   # Visual + tone standards (client-specific)
│   └── PROMPTS.md                    # How to write, test, document AI prompts
│
├── 03-build-guides/                  # Learn-by-doing mode (the training)
│   ├── GREEN-QUICK-BUILD.md
│   ├── YELLOW-STANDARD-BUILD.md
│   ├── ORANGE-REVIEWED-BUILD.md
│   └── RED-PROTECTED-BUILD.md
│
├── 04-checklists/                    # Verification mode (the audit)
│   ├── GREEN-CHECKLIST.md
│   ├── YELLOW-CHECKLIST.md
│   ├── ORANGE-CHECKLIST.md
│   └── RED-CHECKLIST.md
│
├── 05-templates/
│   ├── project-brief.md              # Define what you're building
│   ├── prompt-spec.md                # Document production AI prompts
│   ├── review-request.md             # Request a review
│   ├── incident-report.md            # Something went wrong
│   └── build-log.md                  # Track decisions during build
│
├── 06-guides/
│   ├── FIRST-BUILD.md                # "Your first project" walkthrough
│   ├── TOOL-SELECTION.md             # Which tool for which job
│   ├── WHEN-TO-ESCALATE.md           # "I'm stuck" guide
│   └── GLOSSARY.md                   # Every term, plainly explained
│
├── 07-client-config/                 # Customized per client (DFY/DWY)
│   ├── COMPANY-CONTEXT.md            # Company values, constraints, policies
│   ├── APPROVED-TOOLS.md             # Which AI tools, which tiers
│   ├── ROLES.md                      # Who reviews, who approves, escalation contacts
│   └── PROMPT-LIBRARY.md             # Company-specific tested prompt templates
│
└── 08-tooling/                       # Optional: AI tool configurations
    ├── claude-code/                  # .claude/ rules files
    ├── cursor/                       # .cursorrules
    └── replit/                       # Replit project templates
```

### Separation of concerns:
- **Folders 01-06:** Core framework. Same for every client. Centrally maintained and updated.
- **Folder 07:** Client-specific config. Unique per engagement. This is where the DFY/DWY value lives.
- **Folder 08:** Optional tool enforcement. Accelerator for clients using specific AI tools.

---

## 8. Tooling Evaluation Framework

### 8.1 Tiered Tooling Strategy

VCF includes a decision matrix in TOOL-SELECTION.md:

| Factor | No-Code (Lovable, Bolt, v0) | Low-Code (Replit Agent) | Pro Tools (Cursor, Claude Code) |
|--------|----------------------------|------------------------|-------------------------------|
| **Best for** | Landing pages, forms, quick UIs, prototypes | Internal tools, dashboards, CRUD apps, MVPs | Complex logic, integrations, production |
| **Builder skill** | Can describe in words | Basic tech comfort | Has coded before |
| **Data handling** | Limited (presentation layer) | Moderate (APIs/DBs with guidance) | Full (any integration) |
| **Customization ceiling** | Low | Medium | High |
| **Security posture** | Vendor-controlled | Platform-managed | Full control |
| **Exit strategy** | Hard (vendor lock-in) | Medium (code accessible) | Easy (standard code) |

### 8.2 Tool Selection Flow

```
What are you building?
├── Static content (landing page, docs) → No-Code Tools
├── Interactive internal tool (dashboard, form) → Low-Code Platform
├── Complex or customer-facing with custom logic → Pro Tools
└── Not sure → Start Low-Code, escalate if needed
```

### 8.3 Replit-Specific Assessment

**Fits well:** Green/Yellow builds, mixed-ability teams, speed-to-demo, learning environment
**Hits limits:** Red builds (limited audit controls), multi-dev collaboration at scale, complex deployment pipelines, long-term maintenance

**Recommendation pattern:** "Start with Replit for Green/Yellow. Evaluate migration to Pro Tools when escalating to Orange/Red or when codebase exceeds maintainability threshold."

---

## 9. Prompt Management

### Two Categories of Prompts

**Build Prompts** (ephemeral - used to generate code):
- Prompt templates for common tasks
- Testing protocol: 3 variations, compare results
- Versioning: save alongside code for reproducibility

**Production Prompts** (artifacts - define tool behavior):
- Prompt Spec Template: purpose, input/output, failure modes, test results
- Prompt Review Checklist: bias, safety, edge cases, brand voice
- Prompt Registry: central documentation of all production prompts

**Key principle:** "If an AI prompt affects what a user sees or experiences, it's a product decision that needs documentation."

---

## 10. Success Criteria

VCF is successful when:

| Criterion | Measurement |
|-----------|-------------|
| Builders feel faster, not slower | Builder feedback: "the framework helped me move faster" > "it slowed me down" |
| Risk is reduced | Zero incidents from AI-generated tools that followed VCF process |
| AI usage becomes structured and intentional | All projects have completed intake and documented prompts |
| Tooling decisions become strategic | Tool selection follows the decision matrix, not individual preference |
| Scale with confidence | Company can run 10+ concurrent AI-powered projects without quality degradation |

---

## 11. Scope for v1

### In scope:
- Core framework documentation (folders 01-06)
- One client config template with customization guide (folder 07)
- Classification model with intake and 4 build paths
- Build Guides for all 4 paths (learn-by-doing mode)
- Checklists for all 4 paths (verification mode)
- All 5 templates (project brief, prompt spec, review request, incident report, build log)
- Tool selection guide with Replit assessment
- Prompt management standards

### Out of scope for v1 (future):
- Web portal / SaaS dashboard
- Automated compliance tracking
- AI tool configurations (folder 08)
- Build registry (searchable index of all projects)
- Maturity assessment scoring
- Multi-language / internationalization

---

## 12. Open Questions for Implementation

1. Where does the framework repo live? (GitHub org, client-specific repos, or monorepo with branches?)
2. How are framework updates distributed to existing clients? (Git pull, versioned releases, manual push?)
3. What's the first client engagement to validate v1 against?
4. Should the FIRST-BUILD walkthrough use a specific tool (e.g., Replit) or remain tool-agnostic?
5. How detailed should the GLOSSARY.md be? (Technical terms only, or also process terms like "build path"?)
