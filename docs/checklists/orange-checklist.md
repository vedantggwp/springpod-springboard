# Orange: Reviewed Build Checklist

**Your build path:** Reviewed Build (personal data, external users, or significant business impact)

Complete every item before going live. Expand any item for details.

---

## Items 1-6: Quick Build Foundations

These are the same items from the [Green Checklist](green-checklist.md).

### Pre-Build

- [ ] **I have filled out a [Project Brief](../forms/project-brief.md)**

    <details><summary>WHY</summary>

    A Reviewed Build affects real people outside your team. The brief ensures everyone agrees on scope, audience, and success criteria before you invest significant effort.

    </details>

### During Build

- [ ] **My work is saved somewhere recoverable**

    <details><summary>WHY</summary>

    Save to a version-controlled repository (GitHub, GitLab) — not just a cloud folder. You need the ability to roll back changes.

    </details>

- [ ] **I have tested it with realistic inputs (not just "test123")**

    <details><summary>WHY</summary>

    Problems appear with real data. Test with names containing apostrophes, accents, and hyphens. Test with empty fields, very long text, and special characters.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Test with names: O'Brien, Müller, Smith-Jones, 日本語の名前
    2. Test with empty forms, maximum-length inputs, and special characters
    3. Test with numbers: zero, negative, very large, decimal
    4. Test on different browsers (Chrome, Safari, Firefox)
    5. Test on mobile devices

    </details>

### Pre-Ship

- [ ] **It does what the project brief says it does**

    <details><summary>WHY</summary>

    Walk through every "done" criterion in your project brief. Every single one must work.

    </details>

- [ ] **No secrets (API keys, passwords) are visible in the code**

    <details><summary>WHY</summary>

    With external users, exposed secrets are a direct path to data breaches.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Search your code for: `sk-`, `api_key`, `secret`, `password`, `token`, `DATABASE_URL`
    2. Check your repository history — secrets removed from code may still be in git history
    3. If you find any, move them to environment variables and rotate the exposed secrets (get new ones)

    </details>

- [ ] **There is a way to turn it off if something goes wrong**

    <details><summary>WHY</summary>

    For a Reviewed Build, the kill switch should be fast (under 5 minutes) and documented. You may need to use it urgently.

    </details>

---

## Items 7-10: Standard Build Additions

These are the same items from the [Yellow Checklist](yellow-checklist.md).

- [ ] **Someone other than me has used this tool and given feedback**

    <details><summary>WHY</summary>

    A fresh pair of eyes catches problems you cannot see because you built it.

    </details>

- [ ] **My AI prompts are documented**

    Saved in a [Build Log](../forms/build-log.md) or `prompts.md` file alongside the project.

    <details><summary>WHY</summary>

    If someone needs to modify this tool, they need the original prompts.

    </details>

- [ ] **It looks and feels like our company**

    See the [Branding Standard](../standards/branding.md).

    <details><summary>WHY</summary>

    External users see this as a company product. It must match your brand.

    </details>

- [ ] **A peer has reviewed and approved it**

    <details><summary>WHY</summary>

    Peer review catches obvious issues before the more thorough technical review.

    </details>

---

## Items 11-14: Reviewed Build Additions

These items are specific to Orange builds and above.

- [ ] **Data is handled correctly**

    Personal data is encrypted, not over-collected, and not sent to unauthorized services.

    <details><summary>WHY</summary>

    When you handle personal data, you are responsible for protecting it. "I did not know" is not an acceptable excuse if data is exposed.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. List every piece of personal data your tool collects
    2. For each item: is it strictly necessary? If not, remove it
    3. Check that your connection uses HTTPS (lock icon in browser)
    4. Check that your database encrypts data at rest (most modern services do this by default — confirm it)
    5. List every external service your tool sends data to. Check each against your [Approved Tools](../client-config/approved-tools.md)
    6. See the [Security Standard](../standards/security.md) for the full data handling requirements

    </details>

- [ ] **Users can only see their own data**

    No user can access another user's information — not through the interface, not by changing the URL, not through the API.

    <details><summary>WHY</summary>

    This is one of the most common security failures in web applications. The tool "works" — it just shows the wrong person's data.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Create two test accounts
    2. Log in as Account A and note the URL when viewing personal data
    3. Log in as Account B and paste Account A's URL
    4. If you can see Account A's data while logged in as Account B, stop and fix this immediately

    </details>

- [ ] **Someone with technical or security knowledge has reviewed it**

    This is a structured review, not a casual look. Use the [Review Request](../forms/review-request.md) template and submit to your technical reviewer (see [Roles](../client-config/roles.md)).

    <details><summary>WHY</summary>

    Orange builds handle personal data or serve external users. A peer review catches usability issues. A technical review catches security and data handling issues that non-technical reviewers will miss.

    </details>

    <details><summary>HOW TO PREPARE</summary>

    1. Complete all items above first
    2. Fill out the [Review Request](../forms/review-request.md) form
    3. Include your Build Log and any Prompt Specs
    4. List every external service the tool connects to
    5. Note any checklist items you could not complete and explain why
    6. Submit to your technical reviewer

    </details>

- [ ] **Error messages show helpful text, not technical details**

    Users see "Something went wrong. Please try again or contact support." Not a stack trace, database name, or file path.

    <details><summary>WHY</summary>

    Technical error messages tell attackers how your tool is built. They also confuse and alarm non-technical users.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Try actions that might fail: disconnect from the internet, submit invalid data, access a page that does not exist
    2. Check what the user sees for each
    3. If they see raw errors, stack traces, or database names, replace them with user-friendly messages
    4. Test that error messages suggest what to do next ("try again" or "contact support")

    </details>

---

All checked? **Submit your [Review Request](../forms/review-request.md) to your technical reviewer.**

Do not go live until the technical reviewer has approved it. If they request changes, make them and re-submit.
