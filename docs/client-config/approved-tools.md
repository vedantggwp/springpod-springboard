# Approved Tools

This document lists the AI coding tools your company has approved for use, and what build paths each tool is approved for.

Search this document for `[CLIENT:` to find all fields that need your input.

---

## AI coding tools approved for use

[CLIENT: Fill in this table with your approved tools. Add or remove rows as needed.]

| Tool | Tier | Approved for | Not approved for | Notes |
|------|------|-------------|------------------|-------|
| [CLIENT: e.g., Lovable] | No-Code | Green builds | Yellow+ builds | [CLIENT: reason, e.g., "No code export, limited data handling"] |
| [CLIENT: e.g., Replit Agent] | Low-Code | Green, Yellow builds | Orange, Red builds | [CLIENT: reason, e.g., "Data residency not confirmed for EU compliance"] |
| [CLIENT: e.g., Cursor] | Pro Tool | All build paths | — | [CLIENT: reason, e.g., "Full code control, approved by security team"] |
| [CLIENT: e.g., Claude Code] | Pro Tool | All build paths | — | [CLIENT: reason] |

<details><summary>What do the tiers mean?</summary>

See the [Tool Selection Guide](../guides/tool-selection.md) for a full explanation of No-Code, Low-Code, and Pro Tool tiers, including strengths, limitations, and when to use each.

</details>

---

## Other approved services

[CLIENT: List any other services your team is approved to use with AI-built tools.]

| Service | Type | Approved for | Notes |
|---------|------|-------------|-------|
| [CLIENT: e.g., Supabase] | Database | All build paths | [CLIENT: notes] |
| [CLIENT: e.g., Vercel] | Hosting | Green, Yellow, Orange | [CLIENT: notes] |
| [CLIENT: e.g., OpenAI API] | AI API | Orange, Red (with review) | [CLIENT: notes] |
| [CLIENT: e.g., Google Analytics] | Analytics | Green, Yellow only | [CLIENT: "Not approved for tools serving minors"] |

---

## Requesting a new tool

If you want to use a tool that is not on this list:

1. [CLIENT: Describe the process — e.g., "Submit a request to the IT team using the internal tool request form"]
2. [CLIENT: Who approves — e.g., "IT Security reviews and approves within 5 business days"]
3. [CLIENT: Criteria — e.g., "The tool must meet our data residency requirements, have a privacy policy, and not store user data outside approved regions"]

<details><summary>WHY this process exists</summary>

Every external tool your team uses is a potential data flow. If a tool sends your data somewhere you have not vetted, you cannot guarantee your users' privacy. The approval process is not bureaucracy — it is protecting your users and your company.

</details>

---

## Tools explicitly not approved

[CLIENT: List any tools your company has specifically evaluated and rejected.]

| Tool | Reason not approved | Date evaluated |
|------|-------------------|----------------|
| [CLIENT: e.g., Tool X] | [CLIENT: reason, e.g., "Stores data on servers outside approved regions"] | [CLIENT: date] |

---

## Review schedule

This list should be reviewed and updated:

- [CLIENT: How often — e.g., "Every 6 months"]
- [CLIENT: By whom — e.g., "IT Security team"]
- [CLIENT: Trigger events — e.g., "Also reviewed when a new tool is requested or when a vendor changes their terms of service"]

---

## Related documents

- [Tool Selection Guide](../guides/tool-selection.md) — how to choose between tool tiers
- [Company Context](company-context.md) — constraints that affect tool approval
- [Security Standard](../standards/security.md) — security requirements for all tools
