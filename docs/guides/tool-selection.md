# Tool Selection Guide

Choosing the right AI coding tool is one of the first decisions you make. This guide helps you pick a tool that matches your project's needs, your skill level, and your build path.

---

## The principle: start low, escalate if needed

Pick the simplest tool that meets your requirements. If you outgrow it, you can move to a more powerful tool later. Starting with a complex tool when a simple one would work wastes time and increases risk.

---

## Three tiers of tools

### No-Code tools (describe what you want in words)

Tools like **Lovable**, **Bolt**, and **v0** let you describe what you want in plain language and generate a working tool without writing code.

| Strength | Limitation |
|----------|-----------|
| Fastest way to get a working prototype | Limited customization once generated |
| No coding knowledge needed | Harder to fix when something goes wrong |
| Great for landing pages, simple forms, static sites | Limited data handling and backend logic |
| Visual editing after generation | Vendor lock-in — your project lives on their platform |

**Best for:** Green builds, prototypes, landing pages, simple internal tools.

<details><summary>WHY choose No-Code</summary>

If your project is a quick internal tool or prototype with no sensitive data, No-Code tools get you from idea to working tool in minutes, not hours.

</details>

---

### Low-Code tools (guided coding with AI assistance)

Tools like **Replit Agent** provide an AI-assisted development environment where you describe what you want and the AI generates code you can see and modify.

| Strength | Limitation |
|----------|-----------|
| Full code visibility — you can see and edit what was generated | Requires basic comfort with code (not writing it, but reading it) |
| Built-in hosting, databases, and deployment | Performance limits at scale |
| Good balance of speed and control | Moderate vendor lock-in |
| Environment variables for secrets management | Some features change frequently |

**Best for:** Green and Yellow builds, internal dashboards, data entry tools, workflow automations.

<details><summary>Replit-specific notes</summary>

Replit Agent is a strong choice for Green and Yellow builds. It handles environment setup, deployment, and basic database needs automatically.

**Where Replit works well:**

- Quick internal tools and prototypes
- Tools with moderate data requirements
- Projects where you want to iterate fast

**Where to consider alternatives:**

- Orange/Red builds handling protected data (evaluate data residency and compliance)
- Tools expecting high concurrent usage
- Projects requiring complex backend logic or custom infrastructure
- Long-term production tools where vendor independence matters

If you start on Replit and outgrow it, the generated code is standard and can be moved to other hosting. Plan the migration before you need it.

</details>

---

### Pro Tools (full development environment with AI copilot)

Tools like **Cursor** and **Claude Code** give you a professional development environment with AI assistance built in. You work with code directly, and the AI helps you write it faster.

| Strength | Limitation |
|----------|-----------|
| Maximum control over every aspect | Requires coding experience |
| No vendor lock-in — standard code, any host | Slower to get started |
| Full data handling, security, and compliance options | More decisions to make |
| Best for complex logic and custom requirements | Steeper learning curve |

**Best for:** Orange and Red builds, complex applications, tools requiring custom security or compliance, long-term production systems.

<details><summary>WHY choose Pro Tools</summary>

When your project handles personal data, serves external users, or needs to meet compliance requirements, Pro Tools give you the control necessary to implement those safeguards properly.

</details>

---

## Decision flow

Use this flow to pick your tool tier:

```
Start here
    |
    v
Is this a quick prototype or internal tool
with no sensitive data?
    |
   YES --> No-Code tools (Lovable, Bolt, v0)
    |
   NO
    |
    v
Does it handle business data or need moderate
customization?
    |
   YES --> Low-Code tools (Replit Agent)
    |
   NO
    |
    v
Does it handle personal/protected data, serve
external users, or need full control?
    |
   YES --> Pro Tools (Cursor, Claude Code)
```

---

## Tool selection by build path

| Build path | Recommended tier | Reasoning |
|-----------|-----------------|-----------|
| **Green** (Quick Build) | Any tier — pick what you are comfortable with | Low risk, so tool choice does not matter much |
| **Yellow** (Standard Build) | No-Code or Low-Code | Moderate data needs, but no compliance requirements |
| **Orange** (Reviewed Build) | Low-Code or Pro Tools | Personal data and external users need more control |
| **Red** (Protected Build) | Pro Tools strongly recommended | Protected data, minors, compliance — you need full control |

<details><summary>WHY these recommendations</summary>

Higher build paths require more security controls, data handling options, and compliance features. No-Code tools often do not expose these settings. Pro Tools give you the access you need to implement them.

</details>

---

## Exit strategy: what happens when you outgrow a tool

Before committing to a tool, ask: if this tool stops working for us, how hard is it to move?

| Tool tier | Exit difficulty | What to plan for |
|-----------|----------------|-----------------|
| No-Code | Hard — project often tied to the platform | Accept this for throwaway builds. For anything else, consider starting with Low-Code. |
| Low-Code | Medium — code is exportable but may need refactoring | Keep a local backup of your code. Document any platform-specific features you use. |
| Pro Tools | Easy — standard code runs anywhere | Minimal exit risk. Document your deployment setup. |

<details><summary>WHY this matters</summary>

Tools change, companies pivot, pricing increases. If your tool becomes critical to operations (Yellow+ path), you need a realistic exit plan before you are locked in.

</details>

---

## Cost considerations

| Factor | No-Code | Low-Code | Pro Tools |
|--------|---------|----------|-----------|
| Getting started | Free tiers available | Free tiers available | Free tiers or one-time purchase |
| Scaling up | Costs increase with usage | Costs increase with usage and compute | Hosting costs are separate (you choose) |
| At enterprise scale | Can become expensive for many users | Moderate — depends on usage patterns | Most cost-effective at scale (you control infrastructure) |

For Green builds, cost is rarely a concern. For Yellow+ builds that will scale, factor in the cost trajectory before choosing a tool.

---

## Your company's approved tools

Your company may have specific tools that are pre-approved or restricted. Check the [Approved Tools](../client-config/approved-tools.md) list before choosing.

If you want to use a tool that is not on the approved list, follow the approval process described there.
