# Branding Standard

Every tool your company puts in front of users represents your brand. AI tools can generate beautiful interfaces — but they default to generic styling. This guide ensures everything looks and sounds like your company.

---

## Visual identity

### Colors

[CLIENT: Insert your primary, secondary, and accent colors with hex codes]

| Usage | Color | Hex |
|-------|-------|-----|
| Primary (buttons, headers) | [e.g., Navy Blue] | [e.g., #1B3A5C] |
| Secondary (accents, links) | [e.g., Teal] | [e.g., #2ABFBF] |
| Background | [e.g., White] | [e.g., #FFFFFF] |
| Text | [e.g., Dark Gray] | [e.g., #333333] |
| Error/warning | [e.g., Red] | [e.g., #D32F2F] |
| Success | [e.g., Green] | [e.g., #388E3C] |

<details><summary>WHY</summary>

Consistent colors are the fastest way to make a tool feel "ours." Without defined colors, every AI-generated tool looks different — and none of them look like your company.

</details>

<details><summary>HOW TO CHECK</summary>

1. Open your tool next to your company website or an existing branded product
2. Compare the main colors — buttons, headers, links, backgrounds
3. If the colors do not match the table above, update them before shipping
4. Most AI tools let you set colors in a theme or CSS file. Paste the hex codes from the table.

</details>

---

### Typography

[CLIENT: Insert font families and sizes]

| Usage | Font | Size |
|-------|------|------|
| Headings | [e.g., Inter Bold] | [e.g., 24px / 20px / 16px] |
| Body text | [e.g., Inter Regular] | [e.g., 16px] |
| Small text / captions | [e.g., Inter Regular] | [e.g., 14px] |

<details><summary>WHY</summary>

Mismatched fonts make a tool look unfinished. Using your company's standard fonts ties everything together visually.

</details>

---

### Logo usage

[CLIENT: Insert logo files and usage rules]

- **Primary logo file:** [link or file name]
- **Favicon:** [link or file name]
- **Minimum clear space:** [e.g., equal to the height of the logo mark on all sides]
- **Do not** stretch, rotate, recolor, or place on busy backgrounds

<details><summary>WHY</summary>

A misused logo damages brand perception. These rules exist because designers tested what works.

</details>

---

## Tone of voice

[CLIENT: Define how the brand speaks. Below are example entries — replace with your actual voice guidelines.]

| Do | Do not |
|----|--------|
| "Let's get started" | "Please initiate the process" |
| "Something went wrong" | "Error 500: Internal Server Exception" |
| "You're all set!" | "Process completed successfully" |
| "We could not find that page" | "404 Not Found" |
| "Try again in a few minutes" | "Service temporarily unavailable" |

<details><summary>WHY</summary>

Every piece of text a user reads is your brand speaking. If your brand is friendly and approachable, error messages should be too — not robotic or technical.

</details>

<details><summary>HOW TO CHECK</summary>

1. Read every piece of text in your tool out loud
2. Does it sound like something your company would say?
3. Check buttons, error messages, confirmation text, empty states, and loading messages
4. Replace anything that sounds generic or overly technical with your brand voice

</details>

---

## AI-generated content guidelines

When AI generates text that users see (chatbot responses, summaries, recommendations), it must:

- [ ] **Match the tone of voice above**

    AI defaults to a neutral, slightly formal tone. Adjust the prompt to match your brand.

    <details><summary>HOW TO CHECK</summary>

    1. Generate 5 sample outputs from your AI feature
    2. Read each one against the tone of voice table above
    3. If any output sounds off-brand, adjust the system prompt to include tone instructions
    4. Re-test until the outputs consistently match your voice

    </details>

- [ ] **Not mention being AI unless required by policy**

    [CLIENT: Does your policy require AI disclosure? If yes, specify the wording here. If no, instruct AI not to reference itself.]

- [ ] **Not make promises or guarantees**

    AI should never say "I guarantee" or "This will definitely work." Use language like "Based on the available information" or "This suggests."

    <details><summary>WHY</summary>

    AI can be wrong. Promises create legal and trust liability when the output turns out to be incorrect.

    </details>

- [ ] **Not use informal language unless the brand voice permits it**

    No slang, no jokes, no casual abbreviations unless your tone of voice guide above specifically allows them.

---

## Checking your build against brand

Use this quick checklist before shipping any Orange+ build:

- [ ] Colors match the table above (buttons, headers, links, backgrounds)
- [ ] Fonts match the table above (headings, body, captions)
- [ ] Logo is present and correctly placed
- [ ] All user-facing text matches the tone of voice
- [ ] AI-generated content has been reviewed for brand alignment
- [ ] Error messages and empty states use brand voice (not generic defaults)

<details><summary>HOW TO CHECK (accelerator)</summary>

1. Take a screenshot of your tool's main page
2. Place it next to a screenshot of your company's website
3. If they do not look like they belong together, adjust colors, fonts, and logo placement
4. This 30-second visual comparison catches most branding issues

</details>

---

## Customizing this document

This document uses `[CLIENT: ...]` markers wherever company-specific information is needed. To set up this standard for your company:

1. Search this document for `[CLIENT:`
2. Replace each marker with your company's actual values
3. Save the completed version in your [Client Config](../client-config/company-context.md)
