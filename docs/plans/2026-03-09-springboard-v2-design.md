# SpringBoard v2 Design

> Approved: 2026-03-09

## Context

Springpod is scaling AI usage across the company (~80 people, mostly non-technical). Velocity is high, experimentation is strong, standards are inconsistent. Some tools are internal-only, some student-facing (ages 13+), some partner-facing, some may evolve into core product.

VCF v1 provides a complete generic framework (29 MDX pages, 7 layers, 4 risk-based build paths). SpringBoard v2 takes this foundation and makes it Springpod's own — specific, adoption-ready, and useful to every role in the company.

## Design Principles

1. **Knowledge base first** — Get the content right before choosing delivery surface (app, agent, portal TBD)
2. **Build on what exists** — VCF v1 is solid. Sharpen and extend, don't rebuild
3. **Empowerment, not governance** — Tone is inviting, not policy-like. This reduces anxiety about AI, not adds bureaucracy
4. **Nobody reads a knowledge base** — Content must reach people at the right moment via pull (they come to it) and push (it comes to them)
5. **Springpod-specific** — Real examples, real roles, real tools. No more `[CLIENT: ...]`

## Three Workstreams

### Workstream 1: Make It Springpod's

Replace all ~50 `[CLIENT: ...]` placeholders and generic examples:

| Page | Change |
|------|--------|
| Client Config/Company Context | Fill with Springpod mission, values, constraints, compliance |
| Client Config/Approved Tools | Fill with actual tools being evaluated/used |
| Client Config/Roles | Fill with real team structure and reviewers |
| Client Config/Prompt Library | Add Springpod-specific prompts (VWE content, student-facing, employer dashboards) |
| Standards/Branding | Fill with Springpod brand guidelines |
| Build Guides (all 4) | Replace "team directory" example with Springpod scenario |
| Guides/First Build | Rewrite walkthrough with a Springpod project |
| Guides/When to Escalate | Add Springpod-specific contacts and scenarios |
| Guides/Glossary | Add Springpod-specific terms |
| Intake | Rewrite example to Springpod scenario |

### Workstream 2: Fill the Gaps

New content the brief requires that VCF v1 doesn't have:

| New Page | Section | What It Covers |
|----------|---------|----------------|
| Safeguarding & Under-18s | Standards | Age-appropriate design, COPPA/GDPR for minors, parental consent, content moderation, special scrutiny for 13+ audience |
| Data Workflows | Standards | When Data team must sign off, pen test scope triggers, DWH backup requirements, data classification by build path |
| AI Testing (expanded) | Standards/Prompts | Hallucination testing, bias detection, prompt injection prevention — practical steps integrated into build workflow |
| Tooling Strategy | Guides (expanded Tool Selection) | Platform evaluation (Replit, Cursor, Vercel, etc.), when to use what, cost/security/collaboration trade-offs, tiered recommendation |
| Updates Feed | New section | Curated AI updates relevant to edTech, Springpod tools, regulatory changes. Tagged by role/area. Pushable to email/Slack |

### Workstream 3: Role-Based Entry Points

The adoption unlock — map every role to their questions and needs:

| Role | Questions They Have | What They'd Build |
|------|-------------------|-------------------|
| Curriculum designer | "Can I use AI to generate quiz questions?" "What if it hallucinates wrong answers?" | Quiz generators, content tools, assessment aids |
| Ops / partnerships | "Can I build a dashboard to track employer engagement?" | Internal dashboards, reporting tools |
| Product / engineering | "What standards apply to student-facing features?" "When does this need pen testing?" | Platform features, integrations |
| Marketing | "Can I use AI for student-facing copy?" "Brand voice?" | Content generation, social tools |
| Leadership | "What's our AI policy?" "What risk are we carrying?" | Oversight, policy, budget decisions |

Each gets a "Start Here for [Role]" page — not new content, curated paths through existing content.

## Content Structure (Final)

```
Existing (sharpen)              New
──────────────────              ───
Home
Intake
Standards/Quality
Standards/Security
Standards/Branding
Standards/Prompts               → Expand with AI testing
                                Standards/Safeguarding (NEW)
                                Standards/Data Workflows (NEW)
Build Guides (all 4)
Checklists (all 4)
Forms (all 5)
Guides/First Build
Guides/Tool Selection           → Expand into Tooling Strategy
Guides/When to Escalate
Guides/Glossary
Client Config (all 4)
Reference (both)
                                For Your Role (NEW section)
                                Updates Feed (NEW section)
```

## What We're NOT Doing

- Not redesigning the site structure or components
- Not creating a web app, AI agent, or portal (yet)
- Not writing dynamic content updating (future roadmap)
- Not touching VCF v1 (remains as generic framework)

## Future Roadmap (not now)

- AI agent trained on the knowledge base (like Openclaw)
- Slack bot surfacing relevant guidance at build moments
- Interactive web app with guided workflows
- Browser extension checking builds against standards
- Dynamic content updates from authoritative sources
