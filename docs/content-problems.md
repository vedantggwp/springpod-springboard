# SpringBoard: What Actually Happens When Humans Use This

**Date:** 2026-03-14

This document is not about what the framework *intends*. It's about what real people at Springpod actually experience when they open this site with work to do.

---

## The People and What They Actually Want

### Person 1: Sarah, Curriculum Designer

**Arrives with:** "I want to use ChatGPT to turn this course outline into quiz questions for Year 10 students."

**What she actually needs:** Permission to do it, and to know the three things that could go wrong (hallucinated facts, age-inappropriate language, data leakage if she pastes student names).

**What the site gives her:** A 5-question intake quiz, a project brief form, a 6-step build guide, a 6-item checklist, links to 4 standards pages, and a collapsible that says "WHY: A tool that only partially works creates confusion."

**The gap:** Sarah doesn't have a "project." She has a task. She'll spend 20 minutes on the framework for something that takes 10 minutes to do. She'll fill out the intake, get "Green," fill out a Project Brief, read the Green Build Guide, and at Step 3 ("Build It") finally do the thing she came here to do. Steps 1-2 and 4-6 are framework overhead.

**What she'll actually do:** Ask a colleague in Slack who's done it before, skip the framework entirely, paste the course outline into ChatGPT, review the output, and ship it.

---

### Person 2: James, Product Engineer

**Arrives with:** "I need to integrate an AI summarizer into the student dashboard. It'll process student activity data and generate reports for parents."

**What he actually needs:** The exact security/data requirements, the review process, and who signs off. He already knows how to build it.

**What the site gives him:** The same 5-question intake quiz (which he'll answer in 30 seconds — he already knows this is Red), a Project Brief form asking "What problem does it solve?" (he has a Jira ticket for that), and a 13-step build guide that tells him to "Pick your tool" (he's using the existing codebase).

**The gap:** James doesn't need the framework to teach him how to build. He needs it to tell him what *extra* things he must do because this involves minors' data. The 18-item Red checklist has that, but it's buried under 14 items that are obvious to him (yes, he tested it; yes, he saved his work somewhere recoverable).

**What he'll actually do:** Jump directly to the Red Checklist, skim for items he doesn't already know (privacy compliance, incident response plan, designated reviewer), ignore the rest, and message the designated reviewer directly.

---

### Person 3: Priya, Marketing Manager

**Arrives with:** "I want to use AI to write social media copy for our student recruitment campaign."

**What she actually needs:** Is this okay to do? Does it need to sound like Springpod? Can she mention specific schools?

**What the site gives her:** The intake quiz classifies her as Yellow (student-facing content but no personal data). The framework then sends her through a 9-step process designed for building *tools*, not writing *content*.

**The gap:** The entire framework assumes the user is building a tool — something with a URL, a kill switch, a deployment. Priya is writing copy. Step 2 says "Pick your tool." Step 4 says "Test it." Step 6 says "Ship it — share the URL." None of this maps to writing social media posts.

**What she'll actually do:** Read the Branding Standard page (useful), check the Prompt Library for a copy-generation prompt (useful), and ignore the rest of the framework because it doesn't describe her workflow.

---

### Person 4: David, Ops & Partnerships Manager

**Arrives with:** "I need a dashboard that shows partner engagement metrics. Internal use only, no student data, I want to build it in Lovable."

**What he actually needs:** Confirmation that Lovable is approved for this, and a quick checklist to make sure he doesn't accidentally expose partner data.

**What the site gives him:** A reasonable path — Green build, 6-item checklist. But he has to go through the intake quiz to "discover" what he already knows (this is low-risk). Then the Project Brief form asks him to write 2-3 sentences about what he's building and list stakeholders. He's building a dashboard for himself.

**The gap:** The framework treats every interaction as a project with stakeholders and acceptance criteria. For David's 2-hour dashboard build, the "What does done look like? List 3-5 criteria" question is absurd. Done looks like "the dashboard shows the numbers."

**What he'll actually do:** Check the Approved Tools table (Lovable: approved for Green/Yellow), build the dashboard, and maybe glance at the Green Checklist afterward.

---

### Person 5: Helen, Head of Product (Leadership)

**Arrives with:** "The CEO asked me if we have AI governance. What do we have?"

**What she actually needs:** A one-page summary of the framework, what it covers, what the risk levels mean, and evidence that people are using it.

**What the site gives her:** The same homepage that everyone sees — four StepCards explaining how to build things, seven navigation cards, and a "First time here?" box pointing her to a guided walkthrough of building an employer engagement tracker.

**The gap:** Helen isn't building anything. She needs the *meta-view* — what does this framework do, how does it classify risk, who's accountable at each level, and are people actually following it. None of that exists. The site is entirely oriented toward builders.

**What she'll actually do:** Spend 5 minutes scanning the homepage and sidebar, open the Standards pages to verify they exist, and write her own summary for the CEO from what she's gathered.

---

## The Real Problems

### Problem 1: The Framework Assumes Everyone Is Building a Tool

Every flow — intake, brief, build guide, checklist — is structured around creating software with a URL, a deployment, and a kill switch. But at least two of the five roles (Marketing, partially Curriculum) primarily use AI to *generate content*, not build tools.

**Impact:** Content creators either force-fit their work into the tool-building framework (filling out Project Briefs for a blog post) or skip the framework entirely. Either way, the framework fails them.

**The content blocks this breaks:**
- StepCards on homepage ("Get your build path") — irrelevant for content tasks
- Project Brief form ("What tools will you use?") — doesn't apply to pasting into ChatGPT
- Build Guide Step 6 ("Ship it — share the URL") — content doesn't have a URL
- ChecklistItem "There is a way to turn it off if something goes wrong" — you can't "kill switch" a published blog post

---

### Problem 2: The Intake Quiz Tells People What They Already Know

The 5 intake questions are diagnostic — they determine your risk level. But most Springpod employees can answer "what risk level is my project?" without a quiz. The curriculum designer knows quiz generation is low-risk. The product engineer knows student-facing AI is high-risk.

**Impact:** The intake page has a high cost-to-value ratio for experienced users. It's valuable for a first-time user who genuinely doesn't know, but it becomes a speed bump for everyone else.

**The content blocks this breaks:**
- ChecklistItems as radio buttons (the intake questions use checkboxes but function as radio selections — you pick one answer per question). The component doesn't enforce single-selection, so a user could check multiple answers and not know which "wins."
- The path assignment table at the bottom ("find your highest-scoring answer") asks the user to manually score themselves. This is a UX anti-pattern — the framework knows the scoring rules but makes the human do the calculation.

---

### Problem 3: Checklists Repeat Lower-Path Items Without Acknowledging It

The Yellow Checklist starts with "Items 1-6: Quick Build Foundations — These are the same items from the Green Checklist." The Orange Checklist repeats all 10 Yellow items. Red repeats all 14 Orange items.

**Impact:** A product engineer on the Red path sees 14 items they've already checked (or would trivially check) before reaching the 4 items that actually matter for their risk level. The Red-specific items (privacy compliance, incident response, designated reviewer, re-intake) are at the very bottom of a long page.

**The content blocks this breaks:**
- ChecklistItems 1-14 on the Red Checklist are noise for experienced builders. The `why` collapsibles try to compensate by giving Red-specific reasoning ("at this scale, a minor bug in your save logic could lose compliance data"), but the user has to open each collapsible to discover that context.
- The page structure (scroll to the bottom for the important stuff) inverts information priority. The most critical items should be most prominent.

---

### Problem 4: Forms Are Templates, Not Forms

The Project Brief, Build Log, Prompt Spec, Review Request, and Incident Report are all MDX pages with placeholder text (`___`). They're not fillable forms — they're templates you're meant to copy into a Google Doc or Notion.

**Impact:** The framework calls them "forms" in the sidebar, but they have no submit action, no save state, and no way to share a completed form with a reviewer. The user reads a page full of blanks, realizes they need to recreate it somewhere else, and now they're doing data entry twice — once to understand the template, once to actually fill it in.

**The content blocks this breaks:**
- DataTable in Project Brief (stakeholder table with blank cells) — visually looks like you should type into it, but you can't
- ChecklistItems in forms — persist to localStorage, but the rest of the form doesn't. So you can check "severity: high" on the Incident Report, but the written details (what happened, timeline) are lost when you close the tab
- The "How to use this log" section on Build Log is instructions for using a tool the site doesn't provide

---

### Problem 5: Progressive Disclosure Hides Critical Information

Collapsibles are used everywhere to reduce visual noise. But some of the hidden content is not optional — it's essential.

**Examples:**
- "HOW TO CHECK: No API keys, passwords are visible in the code" is inside a collapsible. If the user doesn't expand it, they might not know to run `grep -r` for secrets. This isn't supplementary — it's the actual instruction.
- The Red Checklist's "HOW TO DO THIS: Privacy compliance" collapsible contains the actual steps for conducting a privacy audit. Without opening it, the checkbox label just says "privacy and data compliance requirements are met" — which is meaninglessly vague.

**Impact:** Users who don't expand collapsibles miss critical procedural information. The framework assumes people will be curious enough to click "WHY" and "HOW TO CHECK" — but a user in a hurry will check the box and move on.

**The content blocks this breaks:**
- Collapsible `how` variant — contains essential instructions, not supplementary detail. The visual treatment (collapsed by default, secondary color) signals "this is optional." It's not.

---

### Problem 6: No State Carries Between Pages

The intake quiz doesn't pass its result to the next page. The checkboxes save to localStorage per-page, but there's no cross-page awareness. The build guide doesn't know whether you've completed the project brief. The checklist doesn't know whether you've completed the build guide.

**Impact:** The framework presents a linear journey (intake → brief → build → verify → review → ship) but has no memory of where the user is in that journey. Every page is a standalone document. The user is responsible for tracking their own progress across 4-6 pages.

**The content blocks this breaks:**
- StepCards on homepage link to the first step ("Start the intake →") but don't show completion state
- ChecklistItems on checklists persist individually, but there's no "you've completed 4 of 6" indicator
- The "What happens next?" sections at the bottom of each page manually list the next steps — the framework can't auto-advance because it doesn't know what you've done

---

### Problem 7: The Sidebar Doesn't Match the Journey

The sidebar lists 11 sections alphabetically/categorically: Home, Intake, Standards, Build Guides, Checklists, Forms & Templates, Guides, Client Config, For Your Role, Design System, Reference.

A user following the framework's intended flow would visit: Intake → Forms (Brief) → Build Guides → Standards (as referenced) → Checklists → Forms (Review Request) → Ship.

**Impact:** The sidebar structure reflects how the *content creators* organized the framework (by type), not how *users* experience it (by workflow phase). "Build Guides" and "Checklists" are separated by "Forms & Templates," even though in the actual workflow, checklists come immediately after the build guide.

**The content blocks this breaks:**
- Card navigation on role pages partially solves this by curating a role-specific journey, but the sidebar (which is always visible) constantly presents the organizational view

---

### Problem 8: The Homepage Undersells the Value

The homepage shows 4 StepCards and 7 category cards. It explains the mechanics of the framework but not the *value*. A non-technical employee landing here sees:

> "Build AI-powered tools — quickly, safely, and consistently."

Followed immediately by process: "Tell us what you're building," "Get your build path," "Follow the guide," "Run the checklist."

**Impact:** This reads as bureaucracy, not enablement. The employee who was excited about using AI now sees a governance process. There's no message saying "You can build things — and here's how we make sure they're safe." The tone is procedural where it should be empowering.

**The content blocks this breaks:**
- StepCards deliver the process but not the promise. There's no "hero" moment — no case study, no "Sarah built a quiz generator in 2 hours" success story, no signal that other people at Springpod have used this and shipped real things.

---

### Problem 9: "When to Escalate" Is Discoverable Only If You Know to Look

The escalation guide is one of the most valuable pages on the site — it covers 8 specific "I'm stuck" scenarios with exact actions and contacts. But it's nested under Guides in the sidebar, two levels deep.

**Impact:** A user who's panicking because their tool exposed data isn't going to methodically browse the sidebar. The homepage has a single Admonition ("Stuck or unsure? Read When to Escalate") but it's at the bottom of the page, after the StepCards and info boxes.

**The content blocks this breaks:**
- The Admonition is positioned correctly in the content flow (after the "here's the process" section), but wrong in the urgency hierarchy. Someone who needs to escalate needs it to be immediately visible, not after scrolling past the process overview.

---

### Problem 10: Collapsibles as Radio Buttons (Intake Quiz)

The intake quiz uses ChecklistItems (multi-select checkboxes) for questions that should be single-select. "Who will use this?" lists: Internal team only / Partners or vendors / Customers and students / Students, anyone under 18 / I'm not sure.

The scoring rule is "highest answer wins." But the UI lets you check multiple answers, and there's no visual feedback about which answer determined your path. The user has to scroll to the bottom, find the scoring table, and manually look up their result.

**Impact:** The intake quiz is the most important page on the site — it determines the entire rest of the user's experience. But its UI is imprecise (multi-select for single-select questions), its scoring is manual (user reads a table), and its result is not actionable (no "click here to go to your build guide" button with the path pre-selected).

---

## What The Site Actually Serves Well

Despite these problems, several things work:

1. **The Approved Tools table** — This is genuinely useful. People check it before building anything. It answers a concrete question ("Can I use Lovable?") with a concrete answer.

2. **The Branding Standard** — The tone-of-voice table (do/don't examples) and color reference are practical and used by real people writing real copy.

3. **The "When to Escalate" content itself** — The 8 scenarios are well-chosen and the actions are specific. The problem is discoverability, not content quality.

4. **The WHY collapsibles on standards pages** — When someone does read them, they genuinely build understanding. "A tool that only partially works creates confusion — people assume it's complete" is more convincing than "Test your tool."

5. **The risk-proportional design** — Green's 6 items vs. Red's 18 is fundamentally sound. The problem is in the details (repetition, ordering), not the architecture.

6. **Role pages as routers** — Sending a curriculum designer directly to the 5 most relevant pages is better than making them browse 38 pages. The content selection is good.

---

## The Core Tension

SpringBoard tries to be two things:

1. **A governance framework** — classification system, standards, checklists, review processes, audit trails
2. **A builder's guide** — step-by-step instructions, tool recommendations, prompt templates, worked examples

These serve different users at different moments. The governance framework serves leadership and reviewers. The builder's guide serves makers. Right now, both are interleaved on every page, and neither audience gets a clean experience.

The path forward is likely not restructuring the content (it's well-written and thorough), but **restructuring how users enter and navigate it** — so the governance person sees the governance view and the builder sees the builder view, from the same underlying content.
