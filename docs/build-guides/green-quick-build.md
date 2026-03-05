# Green: Quick Build Guide

You are building something quick — an internal tool, a prototype, or a throwaway. This guide walks you through it step by step.

**Time estimate:** Most people finish a Green build in 1-4 hours depending on complexity. The framework part takes about 15 minutes.

**What you will need:** Access to an AI coding tool (see Step 2) and a clear idea of what you want to build.

---

## Step 1: Define what you are building (5 min)

Fill out the [Project Brief](../forms/project-brief.md). This is a short form that captures what you are building, why, and what "done" looks like.

**Example completed brief:**

> **Project name:** Team Directory
>
> **What are you building?** A simple web page that shows everyone on our team — their name, role, and contact info. Used by new joiners to find who does what.
>
> **What problem does it solve?** New team members currently ask Slack "who handles X?" multiple times a week. A directory saves everyone time.
>
> **What does "done" look like?**
> 1. Shows all team members with name, role, email, and photo
> 2. Searchable by name or role
> 3. Works on mobile
>
> **Tools:** Lovable (fast for simple pages, no backend needed)

### Accelerator

Before you start building, check with your team — someone may have already built something similar. A 2-minute Slack message could save you hours of work.

---

## Step 2: Pick your tool

For a Quick Build, almost any AI tool works. Pick what you are most comfortable with.

**Never used an AI coding tool before?** Check the [Tool Selection Guide](../guides/tool-selection.md) for an overview, then pick one from your company's [Approved Tools](../client-config/approved-tools.md) list.

**Quick rule of thumb for Green builds:**

- Want it done in minutes with no code? → No-Code tools (Lovable, Bolt, v0)
- Want to see and tweak the code? → Low-Code tools (Replit Agent)
- Already comfortable coding? → Pro Tools (Cursor, Claude Code)

Any of these will work for a Green build. Do not overthink it.

---

## Step 3: Build it

Open your AI tool and describe what you want. The more specific your prompt, the better the result.

### Accelerator

Start from the [Prompt Library](../client-config/prompt-library.md). These prompts have been tested and produce better results than starting from scratch.

**Example prompt for a team directory:**

```
Create a team directory page that shows team members in a card layout.
Each card shows: name, role, email address, and a placeholder for a photo.
Include a search bar at the top that filters by name or role.
Make it responsive so it works on mobile.
Use these colors: primary #1B3A5C, background #FFFFFF, text #333333.
Do not use any external libraries. Keep it simple.
```

**Tips for good prompts:**

- Tell the AI what the tool does, not how to code it
- Include specific details: colors, layout, data fields
- Say what NOT to do: "Do not add features I did not ask for"
- See the [Prompt Management Standard](../standards/prompts.md) for more guidance

---

## Step 4: Test it

Try using your tool the way a real person would. Do not just check that it opens — actually use it.

**Test these things:**

1. **Happy path** — Does the main feature work? (e.g., can you search for a team member and find them?)
2. **Empty state** — What happens if there is no data? (e.g., search for someone who does not exist)
3. **Bad input** — What happens if someone types something unexpected? (e.g., very long text, special characters)
4. **Different devices** — Does it work on your phone? (Open the URL on your phone or use your browser's device preview)

**If something breaks:** Tell the AI tool what went wrong and ask it to fix it. Be specific about what happened versus what you expected.

---

## Step 5: Secure it

Before sharing your tool, do a quick security check.

1. **Search your code** for any of these: `sk-`, `api_key`, `secret`, `password`, `token`, `DATABASE_URL`
2. **Search for any long random string** that looks like a key or password
3. If you find anything, move it to your tool's environment variables (usually in Settings or Secrets)

Not sure how to move secrets to environment variables? See [When to Escalate](../guides/when-to-escalate.md) — this is a normal question, not a failure.

---

## Step 6: Ship it

Make your tool accessible to your team.

1. **Share the link** — most AI tools give you a URL. Share it with your team via Slack, email, or wherever your team communicates.
2. **Note the kill switch** — know how to turn it off if something goes wrong. For most tools, this means setting the deployment to "private" or deleting it.
3. **Tell people it exists** — the best tool is useless if nobody knows about it.

---

## Done

You just completed your first VCF build. Here is what you did:

1. Defined what you were building (Project Brief)
2. Picked a tool
3. Built it with a clear prompt
4. Tested it with realistic inputs
5. Checked for exposed secrets
6. Shipped it with a kill switch

The checklist version of everything you just did is the [Green Checklist](../checklists/green-checklist.md). Next time, you might prefer that shorter format.

---

## What if things change?

Your tool starts as Green, but things change. If your tool starts handling business data, serving external users, or becoming critical to operations, re-run the [Project Intake](../intake/project-intake.md). You may need to follow a different build path.

This is not a problem — it means your tool is growing. The framework is designed to scale with you.
