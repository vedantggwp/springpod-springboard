# Yellow: Standard Build Checklist

**Your build path:** Standard Build (business data, moderate customization, ongoing use)

Complete every item before going live. Expand any item for details.

---

## Items 1-6: Quick Build Foundations

These are the same items from the [Green Checklist](green-checklist.md). Every Yellow build must meet these first.

### Pre-Build

- [ ] **I have filled out a [Project Brief](../forms/project-brief.md)**

    <details><summary>WHY</summary>

    A Standard Build is not a throwaway — it will be used by your team for real work. The brief ensures everyone agrees on what "done" means before you invest significant time.

    </details>

### During Build

- [ ] **My work is saved somewhere recoverable**

    <details><summary>WHY</summary>

    If your laptop dies, can you get your work back? Save to a cloud tool (Replit, GitHub, Google Drive) — not just your desktop.

    </details>

- [ ] **I have tested it with realistic inputs (not just "test123")**

    <details><summary>WHY</summary>

    Problems appear with real data, not test data. A name like "O'Brien" or a 200-character address will break things that "John Smith" never will.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Try entering names with apostrophes, accents, and hyphens (O'Brien, Müller, Smith-Jones)
    2. Try entering empty fields — does the tool handle them?
    3. Try very long text (200+ characters)
    4. Try special characters and emoji
    5. If your tool handles numbers, try zero, negative numbers, and very large numbers

    </details>

### Pre-Ship

- [ ] **It does what the project brief says it does**

    <details><summary>WHY</summary>

    Open your project brief. Walk through each item under "What does done look like?" Does the tool do all of them?

    </details>

- [ ] **No secrets (API keys, passwords) are visible in the code**

    <details><summary>WHY</summary>

    Anyone who sees your code can use your accounts and access your data.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Search your code for: `sk-`, `api_key`, `secret`, `password`, `token`, `DATABASE_URL`
    2. Search for any long random string that looks like a key
    3. If you find any, move them to environment variables
    4. Not sure how? See [When to Escalate](../guides/when-to-escalate.md)

    </details>

- [ ] **There is a way to turn it off if something goes wrong**

    <details><summary>WHY</summary>

    You need a kill switch. Know how to take the tool offline before you need to.

    </details>

---

## Items 7-10: Standard Build Additions

These items are specific to Yellow builds and above.

- [ ] **Someone other than me has used this tool and given feedback**

    Not "looked at" — actually used it. Asked them to complete the main task without help. Watched where they got confused.

    <details><summary>WHY</summary>

    You already know how your tool works. A fresh pair of eyes will find problems you cannot see because you built it. This is the single most effective quality check you can do.

    </details>

    <details><summary>HOW TO DO THIS</summary>

    1. Pick someone who was not involved in building the tool
    2. Give them the URL and a task: "Find [X] and do [Y]"
    3. Do not help them unless they are completely stuck
    4. Note where they hesitate, click the wrong thing, or get confused
    5. Fix those issues before shipping

    </details>

- [ ] **My AI prompts are documented**

    Saved alongside your project in a [Build Log](../forms/build-log.md) or a `prompts.md` file.

    <details><summary>WHY</summary>

    If someone needs to modify your tool later, they need to know what instructions you gave the AI. Without the original prompts, the next person has to guess how the tool was built.

    </details>

    <details><summary>HOW TO DO THIS</summary>

    1. Open the [Build Log](../forms/build-log.md) template
    2. For each major feature, paste the prompt you used
    3. Note which tool you used (Replit, Cursor, etc.) and what changes you made to the AI output
    4. Save the file alongside your project

    </details>

- [ ] **It looks and feels like our company**

    Correct colors, logo, and tone of voice. See the [Branding Standard](../standards/branding.md).

    <details><summary>WHY</summary>

    Every tool your team uses represents your brand. Generic AI-generated styling signals "we did not care enough to make this ours."

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Open your tool next to your company website
    2. Compare: buttons, headers, link colors, background, fonts
    3. If they do not match, update the colors and fonts to match the [Branding Standard](../standards/branding.md)
    4. Check that error messages and empty states use your brand voice, not generic defaults

    </details>

- [ ] **My peer has reviewed and approved it**

    Use the [Review Request](../forms/review-request.md) template to submit for review.

    <details><summary>WHY</summary>

    A peer review catches issues you missed. It does not need to be a formal process — a colleague spending 15 minutes with your tool is enough.

    </details>

    <details><summary>HOW TO DO THIS</summary>

    1. Fill out the [Review Request](../forms/review-request.md) form
    2. Send it to a peer reviewer (see [Roles](../client-config/roles.md))
    3. Give them access to the tool
    4. Address their feedback before going live

    </details>

---

All checked? **You are good to go.**

If your tool grows — starts handling personal data, serves external users, or becomes business-critical — re-run the [Project Intake](../intake/project-intake.md) to check if your path has changed.
