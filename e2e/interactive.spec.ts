import { test, expect } from "@playwright/test";

test.describe("Collapsible Components", () => {
  test("expand and collapse", async ({ page }) => {
    await page.goto("/standards/security");
    const btn = page.locator("button[aria-expanded]").first();
    await expect(btn).toHaveAttribute("aria-expanded", "false");

    await btn.click();
    await expect(btn).toHaveAttribute("aria-expanded", "true");

    await btn.click();
    await expect(btn).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("Checklist Persistence", () => {
  test("check, reload, verify persisted, uncheck", async ({ page }) => {
    await page.goto("/checklists/green-checklist");
    // Clear previous state
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("sp-checklist-"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();

    const cb = page.locator('input[type="checkbox"]').first();
    await expect(cb).not.toBeChecked();

    await cb.click();
    await expect(cb).toBeChecked();

    // Strikethrough on label
    const label = page.locator('input[type="checkbox"]:checked + span, label:has(input:checked) span').first();
    await expect(label).toHaveClass(/line-through/);

    // Persists after reload
    await page.reload();
    await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();

    // Uncheck
    await page.locator('input[type="checkbox"]').first().click();
    await expect(page.locator('input[type="checkbox"]').first()).not.toBeChecked();

    // Clean up
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("sp-checklist-"))
        .forEach((k) => localStorage.removeItem(k));
    });
  });
});

test.describe("Feedback Widget", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/standards/security");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("sp-feedback-"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
  });

  test("vote, submit, thank you, locked", async ({ page }) => {
    await expect(page.locator('text="Was this page helpful?"')).toBeVisible();

    const yesBtn = page.locator('button[aria-pressed]:has-text("Yes")');
    await yesBtn.click();
    await expect(yesBtn).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("textarea")).toBeVisible();

    await page.locator("textarea").fill("Great guide!");
    await page.click('button:has-text("Submit")');
    await page.waitForTimeout(600);

    await expect(page.locator("body")).toContainText("Thanks for your feedback");

    // Locked after reload
    await page.reload();
    await expect(page.locator('button[aria-pressed]')).toHaveCount(0);

    // Clean up
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("sp-feedback-"))
        .forEach((k) => localStorage.removeItem(k));
    });
  });
});

test.describe("Table of Contents", () => {
  test("TOC exists with anchor links", async ({ page, viewport }) => {
    test.skip(viewport!.width < 1280, "TOC hidden below xl");
    await page.goto("/standards/security");

    const toc = page.locator('nav[aria-label="Table of contents"]');
    await expect(toc).toBeVisible();
    await expect(toc).toContainText("ON THIS PAGE");

    const firstLink = toc.locator("a").first();
    const href = await firstLink.getAttribute("href");
    expect(href).toMatch(/^#/);

    // Anchor target exists
    const targetId = href!.slice(1);
    const exists = await page.evaluate((id) => !!document.getElementById(id), targetId);
    expect(exists).toBe(true);
  });
});

test.describe("Heading Anchors", () => {
  test("headings have unique IDs", async ({ page }) => {
    await page.goto("/standards/security");
    const ids = await page.locator("article h2[id], article h3[id]").evaluateAll((els) =>
      els.map((el) => el.id)
    );
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
