import { test, expect } from "@playwright/test";

test.describe("Dark Mode", () => {
  test("toggle applies .dark class and correct bg", async ({ page }) => {
    await page.goto("/");
    await page.click('button[aria-label="Switch to dark mode"]');
    await expect(page.locator("html")).toHaveClass(/dark/);

    const bodyBg = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bodyBg).toBe("rgb(13, 17, 23)");

    await expect(page.locator('button[aria-label="Switch to light mode"]')).toBeVisible();
  });

  test("dark mode persists across navigation", async ({ page }) => {
    await page.goto("/");
    await page.click('button[aria-label="Switch to dark mode"]');
    await page.goto("/standards/security");
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("toggle back to light", async ({ page }) => {
    await page.goto("/");
    await page.click('button[aria-label="Switch to dark mode"]');
    await page.click('button[aria-label="Switch to light mode"]');
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("no FOUC — dark class present at first paint", async ({ page, context }) => {
    await page.goto("/");
    await page.click('button[aria-label="Switch to dark mode"]');
    await page.waitForTimeout(300);

    const fresh = await context.newPage();
    await fresh.goto("/standards/security", { waitUntil: "commit" });
    await expect(fresh.locator("html")).toHaveClass(/dark/);
    await fresh.close();
  });
});
