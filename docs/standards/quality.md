# Quality Standard

Not every tool needs to be perfect. But every tool needs to meet a minimum bar before real people use it. This document defines that bar.

---

## Universal quality rules (all build paths)

These apply to every project, whether it is a quick prototype or a fully protected tool.

### 1. It does what it says it does

If your project brief says "show student engagement metrics," it shows student engagement metrics. Not some of them — all of them.

<details><summary>WHY</summary>

A tool that only partially works creates more confusion than no tool at all. People will assume it is complete and make decisions based on incomplete information.

</details>

<details><summary>HOW TO CHECK</summary>

1. Open your [Project Brief](../forms/project-brief.md)
2. Read each item under "What does done look like?"
3. Open your tool and verify each item works
4. If any item does not work, it is not done yet

</details>

---

### 2. It handles mistakes gracefully

If someone enters wrong information or the tool loses its connection, it shows a clear message — not a blank screen or a cryptic error.

<details><summary>WHY</summary>

When things go wrong (and they will), a helpful message keeps people confident in the tool. A blank screen or "Error 500" makes them stop trusting it entirely.

</details>

<details><summary>HOW TO CHECK</summary>

1. Try submitting an empty form — does it tell you what to fill in?
2. Try entering text where a number is expected — does it explain the problem?
3. Turn off your internet and try using the tool — does it show a clear message?
4. If any of these show a blank screen, a raw error, or no feedback at all, fix it before shipping

</details>

---

### 3. It looks intentional

Consistent colors, aligned elements, readable text. Not polished — intentional. There is a difference between "simple" and "sloppy."

<details><summary>WHY</summary>

People judge a tool's reliability by how it looks. Misaligned buttons and random font sizes make people question whether the data is reliable too.

</details>

<details><summary>HOW TO CHECK</summary>

1. Look at any two pages in your tool side by side — do they use the same colors, fonts, and button styles?
2. Is all text large enough to read comfortably?
3. Are buttons and links clearly distinguishable from regular text?
4. If anything looks accidental, fix it or ask someone for a second opinion

</details>

---

### 4. It works on the devices your users have

If your users are on phones, it works on phones. If they use tablets, it works on tablets. You do not get to decide what device people use.

<details><summary>WHY</summary>

A tool that only works on a desktop is useless to someone who only has a phone. Check what your users actually use before you ship.

</details>

<details><summary>HOW TO CHECK</summary>

1. Ask your users (or your team) what devices they use most
2. Open your tool on those devices (or use your browser's device preview mode)
3. Try completing the main task on each device
4. If it is unusable on a device your users have, fix it or note it as a known limitation in your project brief

</details>

---

## Additional quality rules by build path

Each path adds requirements on top of the universal rules above.

### Yellow: Standard Build (and above)

- [ ] **Tested with realistic data (not just "test123")**

    Use real names, real numbers, edge cases (empty fields, very long text, special characters like accents or apostrophes). "Test123" will not reveal problems.

    <details><summary>WHY</summary>

    Problems almost always appear with real data, not test data. A name like "O'Brien" or a 200-character address will break things that "John Smith" never will.

    </details>

- [ ] **Someone other than the builder has used it**

    Not "looked at" — actually used it. Asked them to complete the main task without help. Watched where they got confused.

    <details><summary>WHY</summary>

    You already know how your tool works. A fresh pair of eyes will find problems you cannot see because you built it.

    </details>

---

### Orange: Reviewed Build (and above)

- [ ] **Matches company branding guidelines**

    Correct colors, logo placement, and tone of voice. See [Branding Standard](branding.md) for details.

    <details><summary>WHY</summary>

    Every tool users see represents your brand. Generic AI-generated styling signals "we did not care enough to make this ours."

    </details>

- [ ] **Loads in under 5 seconds on a normal connection**

    Test on a connection similar to what your users have, not your office fiber.

    <details><summary>WHY</summary>

    Slow tools get abandoned. If people wait more than a few seconds, they will find another way to do the task.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Open your browser's developer tools (right-click, "Inspect," then "Network" tab)
    2. Reload the page and watch the load time in the bottom bar
    3. To simulate a slower connection: in the Network tab, select "Slow 3G" from the throttling dropdown
    4. If it takes more than 5 seconds on Slow 3G, optimize images, reduce page size, or talk to your reviewer

    </details>

---

### Red: Protected Build

- [ ] **Accessible to people with disabilities**

    Keyboard navigation works. Text contrast is sufficient. Images have alt text. Screen readers can parse the page.

    <details><summary>WHY</summary>

    Accessibility is not optional for tools used by the public, students, or anyone in a protected group. It may also be a legal requirement.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Try using your tool with only a keyboard (no mouse). Can you reach every button and link?
    2. Run the free [WAVE accessibility checker](https://wave.webaim.org/) on your pages
    3. Run a Lighthouse audit in Chrome DevTools (right-click, "Inspect," "Lighthouse" tab, check "Accessibility")
    4. Fix any errors flagged as "critical" or "serious"

    </details>

- [ ] **Tested with actual target users (not just colleagues)**

    If your tool is for parents, test with parents. If it is for students, test with students (with appropriate consent).

    <details><summary>WHY</summary>

    Your colleagues are not your users. They have different technical skills, expectations, and contexts. Only real users reveal real usability problems.

    </details>

- [ ] **Performance tested under expected load**

    If 500 people will use this at once, test with 500 simultaneous connections, not just 5.

    <details><summary>WHY</summary>

    A tool that works for 5 people and crashes for 500 is not ready. Load testing reveals bottlenecks before your users find them.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Estimate how many people will use this at the same time during peak hours
    2. Ask your technical reviewer to run a load test at that number
    3. If you do not have a technical reviewer, flag this in your [Review Request](../forms/review-request.md)

    </details>
