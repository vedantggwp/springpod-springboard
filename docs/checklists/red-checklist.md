# Red: Protected Build Checklist

**Your build path:** Protected Build (protected data, minors, compliance requirements, or high-stakes)

Complete every item before going live. This checklist requires sign-off from your designated reviewer. Expand any item for details.

---

## Items 1-6: Quick Build Foundations

These are the same items from the [Green Checklist](green-checklist.md).

### Pre-Build

- [ ] **I have filled out a [Project Brief](../forms/project-brief.md)**

    <details><summary>WHY</summary>

    A Protected Build has the highest stakes. The brief must be thorough — explicitly state what protected data you are handling, who your users are, and what compliance requirements apply.

    </details>

### During Build

- [ ] **My work is saved somewhere recoverable**

    <details><summary>WHY</summary>

    Use version-controlled repositories with access controls. You must be able to track every change and roll back if needed.

    </details>

- [ ] **I have tested it with realistic inputs (not just "test123")**

    <details><summary>WHY</summary>

    Test with data representative of your actual users. If your users are students aged 14-18, test with inputs typical of that age group.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Test with names, characters, and input patterns your actual users would produce
    2. Test with empty fields, maximum-length inputs, and special characters
    3. Test on the devices your users actually have (not just your development machine)
    4. Test with data volumes you expect in production

    </details>

### Pre-Ship

- [ ] **It does what the project brief says it does**

    <details><summary>WHY</summary>

    Walk through every "done" criterion. For protected builds, partial delivery is not acceptable.

    </details>

- [ ] **No secrets (API keys, passwords) are visible in the code**

    <details><summary>WHY</summary>

    Exposed secrets in a protected build can lead to a data breach affecting vulnerable users.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Search your code for: `sk-`, `api_key`, `secret`, `password`, `token`, `DATABASE_URL`
    2. Search your git history for accidentally committed secrets
    3. If any were ever committed, rotate them immediately (get new keys/passwords)
    4. Use a secrets scanner if available

    </details>

- [ ] **There is a way to turn it off if something goes wrong**

    <details><summary>WHY</summary>

    The kill switch must be documented, tested, and known to at least two people. Document it in your incident response plan.

    </details>

---

## Items 7-10: Standard Build Additions

These are the same items from the [Yellow Checklist](yellow-checklist.md).

- [ ] **Someone other than me has used this tool and given feedback**

    <details><summary>WHY</summary>

    Fresh eyes catch problems you cannot see.

    </details>

- [ ] **My AI prompts are documented**

    <details><summary>WHY</summary>

    Full prompt documentation is essential for auditing and maintenance.

    </details>

- [ ] **It looks and feels like our company**

    <details><summary>WHY</summary>

    Users interacting with protected data need to trust that the tool is legitimate and official.

    </details>

- [ ] **A peer has reviewed and approved it**

    <details><summary>WHY</summary>

    First line of review before the more thorough technical and designated reviews.

    </details>

---

## Items 11-14: Reviewed Build Additions

These are the same items from the [Orange Checklist](orange-checklist.md).

- [ ] **Data is handled correctly**

    Personal data is encrypted at rest and in transit, not over-collected, and only sent to approved services.

    <details><summary>WHY</summary>

    Protected data breaches have legal, financial, and reputational consequences.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. List every piece of personal or protected data your tool collects
    2. Confirm HTTPS is active (lock icon in browser)
    3. Confirm database encryption is enabled
    4. List every external service that receives data — all must be on the [Approved Tools](../client-config/approved-tools.md) list

    </details>

- [ ] **Users can only see their own data**

    <details><summary>WHY</summary>

    Access control failures in protected builds can expose vulnerable users' data.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Create two test accounts
    2. Verify that Account B cannot access Account A's data through the interface, URL manipulation, or API
    3. Test role-based access: can a regular user access admin features?

    </details>

- [ ] **Someone with technical or security knowledge has reviewed it**

    <details><summary>WHY</summary>

    Technical review catches security and data handling issues before the designated reviewer sign-off.

    </details>

- [ ] **Error messages show helpful text, not technical details**

    <details><summary>WHY</summary>

    Technical errors can reveal system architecture to attackers and confuse vulnerable users.

    </details>

---

## Items 15-18: Protected Build Additions

These items are specific to Red builds.

- [ ] **Data privacy compliance has been verified**

    If your tool handles data about anyone under 18: no behavioral tracking, no unnecessary data sharing, parental notification if required by policy. Compliance with applicable regulations (COPPA, GDPR, FERPA) has been confirmed.

    <details><summary>WHY</summary>

    Children and young people have special legal protections. Non-compliance can result in significant fines and reputational damage, and — most importantly — can harm the people you are trying to serve.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. List every piece of data collected about users under 18
    2. For each: is it strictly necessary? If not, remove it
    3. Confirm: no behavioral tracking or profiling of minors
    4. Confirm: no data shared with third parties beyond what is strictly necessary
    5. Check your company's policy on parental notification
    6. Document your findings for the designated reviewer
    7. See the [Security Standard](../standards/security.md) for the full requirements

    </details>

- [ ] **An incident response plan is documented**

    Before going live, you have written down: what happens if data is exposed? Who gets notified? What is the first action? Where are the credentials to shut things down?

    <details><summary>WHY</summary>

    When something goes wrong, you do not have time to figure out what to do. A plan means you respond in minutes, not hours.

    </details>

    <details><summary>HOW TO DO THIS</summary>

    1. Use the [Incident Report](../forms/incident-report.md) template as your starting point
    2. Fill in: first responder name, emergency contact, kill switch instructions, notification list
    3. Test the kill switch — actually do it in a test environment to confirm it works
    4. Share the plan with at least two people
    5. Store it somewhere accessible (not only in the tool itself — if the tool is down, you still need the plan)

    </details>

- [ ] **The designated reviewer has signed off**

    A named person has reviewed and approved this build. Their name and the date of approval are recorded.

    <details><summary>WHY</summary>

    Protected builds require accountability. Someone with the authority and expertise to evaluate compliance and safety must explicitly approve the launch. This is not a formality — it is a safeguard for your users.

    </details>

    <details><summary>HOW TO DO THIS</summary>

    1. Complete all items above
    2. Submit a [Review Request](../forms/review-request.md) to your designated reviewer (see [Roles](../client-config/roles.md))
    3. Include all supporting documents: Build Log, Prompt Specs, third-party services list, incident response plan, privacy compliance notes
    4. The reviewer will respond with approval, changes needed, or escalation
    5. Record the reviewer's name and approval date

    </details>

- [ ] **A re-intake date is scheduled**

    Within 30 days of launch or at the first significant usage milestone, re-run the [Project Intake](../intake/project-intake.md) to verify the build path is still correct.

    <details><summary>WHY</summary>

    Tools change after launch. Users behave differently than expected. Data volumes grow. A re-intake catches silent escalations — when a tool has become more risky than originally assessed. Schedule it now, while you are thinking about it.

    </details>

    <details><summary>HOW TO DO THIS</summary>

    1. Pick a date: 30 days from launch, or after 100 users, whichever comes first
    2. Put it in someone's calendar with a reminder
    3. When the date arrives, re-run the Project Intake with current (not original) answers
    4. If the build path has changed, follow the new path's checklist

    </details>

---

All checked? **Submit your [Review Request](../forms/review-request.md) to your designated reviewer.**

Do not go live until the designated reviewer has signed off. This is not negotiable for Protected builds. If they request changes, make them and re-submit.
