# Prompt Management Standard

When you build with AI, you give it instructions — prompts. Some prompts are temporary notes you use while building. Others become permanent parts of your tool. This standard explains the difference and how to handle each.

---

## Two kinds of prompts

### Build prompts (used to create your tool)

What you type into Replit, Cursor, Claude, or any AI tool to generate code. These are your instructions to the AI while building.

Build prompts are temporary. They helped you create the tool, but they are not running inside it.

### Production prompts (running inside your tool)

Prompts that your finished tool uses — like a chatbot's system prompt, an AI summarizer's instructions, or a recommendation engine's criteria. These affect what your users see every time they use the tool.

**The rule:** Build prompts are temporary notes. Production prompts are product decisions.

<details><summary>WHY</summary>

A build prompt that gives a bad result costs you a few minutes — you regenerate. A production prompt that gives a bad result costs your users' trust, your brand reputation, or worse.

</details>

---

## Build prompt best practices

### 1. Start from the prompt library

Check the [Prompt Library](../client-config/prompt-library.md) before writing your own. Tested prompts give better results faster than starting from scratch.

<details><summary>WHY</summary>

Prompts are like recipes. Starting from a tested recipe and adjusting it is faster and more reliable than inventing one from scratch every time.

</details>

### 2. Be specific about what you want

Vague prompts produce vague results. Specific prompts produce useful results.

**Instead of this:**

> Make a dashboard

**Write this:**

> Create a dashboard that shows daily active users, weekly retention rate, and revenue per user. Use a line chart for trends over the past 30 days and summary cards for current values. Use the color scheme: primary #1B3A5C, accent #2ABFBF, background #FFFFFF.

<details><summary>WHY</summary>

AI tools do exactly what you ask. If you do not specify colors, layout, or data, the AI guesses — and its guesses rarely match your needs.

</details>

### 3. Include your constraints

Tell the AI what NOT to do, not just what to do.

**Example constraints:**

> Do not use any external libraries. Keep all code in a single file. Do not add any features I did not ask for. Use only the colors listed above.

<details><summary>WHY</summary>

AI tools tend to add helpful extras you did not ask for. Constraints prevent scope creep and keep the output focused.

</details>

### 4. Test with 3 variations (Orange+ builds)

Write your prompt 3 slightly different ways. Compare the outputs. Pick the one closest to what you need, then refine it.

<details><summary>WHY</summary>

Small wording changes can produce very different results. Testing variations helps you find the best phrasing before committing to it.

</details>

<details><summary>HOW TO do this</summary>

1. Write your prompt
2. Create two variations by rephrasing the key instruction (e.g., "build a form" vs. "create an input page" vs. "generate a data entry screen")
3. Run all three and compare the outputs side by side
4. Use the best output as your starting point

</details>

### 5. Save your prompts alongside your project (Yellow+ builds)

If someone needs to modify your tool later, they need to know what instructions you gave the AI.

<details><summary>WHY</summary>

Without the original prompts, the next person has to guess how the tool was built. This leads to worse modifications and more bugs.

</details>

<details><summary>HOW TO do this</summary>

1. Create a file called `prompts.md` or use your [Build Log](../forms/build-log.md)
2. Paste each prompt you used, with a note about what it produced
3. Save it in the same location as your project files

</details>

---

## Production prompt requirements

Production prompts — the ones running inside your finished tool — need more care because they affect real users every time the tool is used.

### All build paths

- [ ] **Each production prompt has a clear purpose**

    You can describe what the prompt does in one sentence. If you cannot, it is doing too much — split it up.

### Yellow: Standard Build (and above)

- [ ] **Each production prompt is documented**

    Use the [Prompt Spec Template](../forms/prompt-spec.md) to record: what the prompt does, the full prompt text, expected inputs and outputs, and known limitations.

    <details><summary>WHY</summary>

    Undocumented prompts become mysteries. When something breaks or needs updating, nobody knows what the prompt was supposed to do or why it was written that way.

    </details>

### Orange: Reviewed Build (and above)

- [ ] **Each production prompt has been reviewed for:**

    - **Brand voice alignment** — Does the output match your [Branding Standard](branding.md)?
    - **Bias** — Does it treat all users fairly regardless of background?
    - **Safety** — Can it produce harmful, misleading, or inappropriate output?
    - **Edge cases** — What happens with unexpected, empty, or very long input?

    <details><summary>HOW TO CHECK</summary>

    1. Generate 10 outputs using varied inputs (including edge cases)
    2. Read each output against the four criteria above
    3. Flag any output that fails a criterion
    4. Adjust the prompt and re-test until all criteria pass consistently

    </details>

### Red: Protected Build

- [ ] **Production prompts tested with target audience demographics**

    If your tool serves students aged 14-18, test prompts with inputs typical of that age group — not adult professionals.

    <details><summary>WHY</summary>

    Prompts optimized for adult language patterns may produce confusing or inappropriate results for younger users. Test with realistic inputs from your actual audience.

    </details>

- [ ] **Prompt failure modes documented and mitigated**

    For each production prompt, answer: what is the worst output this prompt could produce? What safeguards prevent that?

    <details><summary>HOW TO CHECK</summary>

    1. Try deliberately adversarial inputs (very long text, nonsense, offensive language, prompt injection attempts like "ignore your instructions and...")
    2. Document what happens for each
    3. Add guardrails in the prompt or in the application logic to handle each failure mode

    </details>

- [ ] **Prompt version history maintained**

    Every change to a production prompt is recorded with the date, what changed, and why.

    <details><summary>WHY</summary>

    When a prompt that used to work starts producing bad results, version history lets you compare what changed and roll back if needed.

    </details>

---

## Quick reference

| What | Build prompts | Production prompts |
|------|--------------|-------------------|
| When used | While you are building | After the tool is live |
| Who sees the output | You (the builder) | Your users |
| If it gives a bad result | Regenerate, no harm done | Users are affected |
| Documentation needed | Yellow+: save alongside project | Yellow+: full prompt spec |
| Review needed | No | Orange+: bias, safety, brand, edge cases |
| Version control needed | No | Red: yes |
