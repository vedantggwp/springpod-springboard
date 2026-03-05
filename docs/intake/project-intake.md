# Project Intake

Before you build anything, answer these 5 questions. Your answers tell the framework which build path to follow — so you get the right level of guidance without extra steps.

It takes about 2 minutes.

---

## The 5 questions

### 1. Who will use this?

- [ ] Just our team (internal)
- [ ] Partners or vendors
- [ ] Customers or end users
- [ ] Students or anyone under 18
- [ ] I'm not sure

<details><summary>WHY this matters</summary>

The more vulnerable your audience, the more safeguards you need. An internal dashboard for your team is very different from a tool used by students.

</details>

<details><summary>HOW TO answer</summary>

Think about who will actually interact with the finished tool — not who requested it. If a manager asks you to build something that students will use, the answer is "Students or anyone under 18."

</details>

---

### 2. What data does it touch?

- [ ] No real data (mockups, test data, public info)
- [ ] Internal business data (reports, metrics, content)
- [ ] Personal data (names, emails, accounts)
- [ ] Protected data (student records, health, financial)
- [ ] I'm not sure

<details><summary>WHY this matters</summary>

Data that identifies real people requires more protection than internal metrics. Protected data (like student records) has legal requirements.

</details>

<details><summary>HOW TO answer</summary>

List every piece of information your tool will store, display, or send somewhere. If any of it could identify a real person, select "Personal data." If it includes student records, health information, or financial details, select "Protected data."

</details>

---

### 3. What happens if it breaks or gives wrong information?

- [ ] Minor inconvenience, easy workaround
- [ ] Team is slowed down, but workaround exists
- [ ] External users are affected or confused
- [ ] Legal, safety, or financial consequences
- [ ] I'm not sure

<details><summary>WHY this matters</summary>

A broken prototype is a minor annoyance. A broken tool that gives parents wrong information about their child's progress is a serious problem. The potential damage determines how much testing and review you need.

</details>

<details><summary>HOW TO answer</summary>

Imagine the worst realistic thing that could happen if this tool showed wrong data or stopped working for a day. Pick the option that matches that scenario.

</details>

---

### 4. How long will this be used?

- [ ] One-time or throwaway (demo, test, prototype)
- [ ] Ongoing but can be replaced easily
- [ ] Core to daily operations or part of our product

<details><summary>WHY this matters</summary>

A throwaway prototype needs less documentation and review than something your team will rely on every day. Long-lived tools also need maintenance plans.

</details>

<details><summary>HOW TO answer</summary>

If you would need more than a day to replace this tool with something else, it is not throwaway. If people would change their daily workflow because it was gone, it is core to operations.

</details>

---

### 5. What role does AI play?

- [ ] AI helped me build it, but I defined all the logic
- [ ] AI generates content that users will see
- [ ] AI makes decisions that affect outcomes (scoring, filtering, recommendations)
- [ ] I'm not sure

<details><summary>WHY this matters</summary>

When AI generates content or makes decisions that affect real people, you need extra checks for accuracy, bias, and safety. The more influence AI has on what users experience, the higher the stakes.

</details>

<details><summary>HOW TO answer</summary>

If your tool has a chatbot, summarizer, or any feature where AI writes text that users read — that is "generates content." If AI scores applicants, filters results, or recommends actions — that is "makes decisions."

</details>

---

## How to find your build path

After answering all 5 questions, find your highest-scoring answer using this table:

| Your highest answer | Your build path |
|---|---|
| All answers are the first option | **Green: Quick Build** |
| Any answer is the second option | **Yellow: Standard Build** |
| Any answer is the third option | **Orange: Reviewed Build** |
| Any answer is the fourth option | **Red: Protected Build** |

**The highest one wins.** If Q2 is "Internal business data" (Yellow) but Q1 is "Students under 18" (Red), your path is **Red**.

### What if I selected "I'm not sure"?

That is completely fine. Your path has been bumped up one level automatically:

| Question | "I'm not sure" is treated as |
|---|---|
| Q1 (Who will use this?) | Customers or end users (Orange) |
| Q2 (What data?) | Personal data (Orange) |
| Q3 (What if it breaks?) | External users affected (Orange) |
| Q5 (AI's role?) | Generates content (Orange) |

Flag it with your reviewer to confirm the right path before you start building. You can always adjust after the review.

---

## Example: Student engagement dashboard

A product manager wants to build a dashboard showing student engagement metrics for internal use by the teaching team.

| Question | Answer | Path |
|---|---|---|
| Q1: Who will use this? | Just our team (internal) | Green |
| Q2: What data? | Student records (attendance, grades) | **Red** |
| Q3: What if it breaks? | Team is slowed down | Yellow |
| Q4: How long? | Ongoing but replaceable | Yellow |
| Q5: AI's role? | AI helped build it, I defined the logic | Green |

**Result: Red (Protected Build)** — because student records are protected data, even though only internal staff will use the tool. The highest trigger wins.

---

## What happens next?

1. Fill out a [Project Brief](../forms/project-brief.md) for your project
2. Open the build guide for your path:
    - [Green: Quick Build](../build-guides/green-quick-build.md)
    - [Yellow: Standard Build](../build-guides/yellow-standard-build.md)
    - [Orange: Reviewed Build](../build-guides/orange-reviewed-build.md)
    - [Red: Protected Build](../build-guides/red-protected-build.md)
3. Follow the guide step by step

Your build path can change over time. If your tool starts handling new data, gets new users, or becomes more critical, come back here and re-answer the questions. Projects only move up paths, never down.
