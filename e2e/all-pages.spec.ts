import { test, expect } from "@playwright/test";

const ALL_PAGES = [
  "/",
  "/intake/project-intake",
  "/standards/quality",
  "/standards/security",
  "/standards/branding",
  "/standards/prompts",
  "/standards/safeguarding",
  "/standards/data-workflows",
  "/build-guides/green-quick-build",
  "/build-guides/yellow-standard-build",
  "/build-guides/orange-reviewed-build",
  "/build-guides/red-protected-build",
  "/checklists/green-checklist",
  "/checklists/yellow-checklist",
  "/checklists/orange-checklist",
  "/checklists/red-checklist",
  "/forms/project-brief",
  "/forms/prompt-spec",
  "/forms/review-request",
  "/forms/incident-report",
  "/forms/build-log",
  "/guides/first-build",
  "/guides/tool-selection",
  "/guides/when-to-escalate",
  "/guides/glossary",
  "/client-config/company-context",
  "/client-config/approved-tools",
  "/client-config/roles",
  "/client-config/prompt-library",
  "/roles/curriculum-designer",
  "/roles/ops-partnerships",
  "/roles/product-engineering",
  "/roles/marketing",
  "/roles/leadership",
  "/updates/feed",
  "/design-system/colors",
  "/design-system/typography",
  "/design-system/components",
  "/reference/verification-log",
  "/reference/version",
];

for (const path of ALL_PAGES) {
  test(`${path} loads with 200 and h1`, async ({ page }) => {
    const resp = await page.goto(path);
    expect(resp?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    const body = await page.textContent("body");
    expect(body).not.toMatch(/VCF|VibeFrame|Vibe Coding Framework/i);
  });
}

test("404 for unknown route", async ({ page }) => {
  const resp = await page.goto("/nonexistent-xyz-page");
  expect(resp?.status()).toBe(404);
});
