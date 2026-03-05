# Green: Quick Build Checklist

**Your build path:** Quick Build (internal use, no sensitive data, throwaway or replaceable)

Complete every item before going live. Expand any item for details.

---

## Pre-Build

- [ ] **I have filled out a [Project Brief](../forms/project-brief.md)**

    <details><summary>WHY</summary>

    Even a quick build needs a sentence describing what it does and what "done" looks like. If you cannot describe it, you are not ready to build it.

    </details>

## During Build

- [ ] **My work is saved somewhere recoverable**

    <details><summary>WHY</summary>

    If your laptop dies, can you get your work back? Save to a cloud tool (Replit, GitHub, Google Drive) — not just your desktop.

    </details>

- [ ] **I have tested it with realistic inputs (not just "test123")**

    <details><summary>WHY</summary>

    "test123" will not reveal problems. Use realistic names, numbers, and edge cases (empty fields, very long text, special characters like accents or apostrophes).

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Try entering a name with an apostrophe (e.g., "O'Brien")
    2. Try entering an empty form — does it handle it?
    3. Try entering a very long string (200+ characters)
    4. Try entering special characters (accents, emoji, symbols)
    5. If any of these cause a crash or blank screen, fix it before shipping

    </details>

## Pre-Ship

- [ ] **It does what the project brief says it does**

    <details><summary>WHY</summary>

    Open your project brief. Walk through each item under "What does done look like?" Does the tool do all of them? Not some — all.

    </details>

- [ ] **No secrets (API keys, passwords) are visible in the code**

    <details><summary>WHY</summary>

    Anyone who sees your code can use your accounts and access your data. This is the most common security mistake in AI-assisted development.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Search your code for: `sk-`, `api_key`, `secret`, `password`, `token`, `DATABASE_URL`
    2. Search for any long random string that looks like a key
    3. If you find any, move them to environment variables (your tool's settings or secrets panel)
    4. Not sure how? See [When to Escalate](../guides/when-to-escalate.md)

    </details>

- [ ] **There is a way to turn it off if something goes wrong**

    <details><summary>WHY</summary>

    You need a kill switch. "I can delete the deployment" counts. "I can set it to private" counts. Know how to do it before you need to.

    </details>

---

All checked? **You are good to go.**

Your tool starts as Green, but if things change — it handles new data, gets new users, or becomes more critical — re-run the [Project Intake](../intake/project-intake.md) to check if your path has changed.
