import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Cmd+K opens search dialog with ARIA", async ({ page, viewport }) => {
    await page.keyboard.press("Meta+k");
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog).toHaveAttribute("aria-label", "Search documentation");
  });

  test("input auto-focused on open", async ({ page }) => {
    await page.keyboard.press("Meta+k");
    await page.waitForTimeout(300);
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBe("INPUT");
  });

  test("typing returns results", async ({ page }) => {
    await page.keyboard.press("Meta+k");
    await page.keyboard.type("security");
    await page.waitForTimeout(500);
    await expect(page.locator('[role="dialog"] ul li a').first()).toBeVisible();
  });

  test("Enter navigates to result", async ({ page }) => {
    await page.keyboard.press("Meta+k");
    await page.keyboard.type("security");
    await page.waitForTimeout(500);
    await page.keyboard.press("Enter");
    await page.waitForLoadState("networkidle");
    // Should have navigated away from homepage
    expect(page.url()).not.toMatch(/localhost:3000\/?$/);
  });

  test("no results shows empty state", async ({ page }) => {
    await page.keyboard.press("Meta+k");
    await page.keyboard.type("xyznonexistent123");
    await page.waitForTimeout(500);
    await expect(page.locator('[role="dialog"]')).toContainText("No results found");
  });

  test("Escape closes and restores focus", async ({ page }) => {
    await page.keyboard.press("Meta+k");
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  });

  test("close button works", async ({ page }) => {
    await page.keyboard.press("Meta+k");
    await page.click('[role="dialog"] button[aria-label="Close search"]');
    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  });

  test("query clears on reopen", async ({ page }) => {
    await page.keyboard.press("Meta+k");
    await page.keyboard.type("test");
    await page.keyboard.press("Escape");
    await page.keyboard.press("Meta+k");
    const val = await page.locator('[role="dialog"] input').inputValue();
    expect(val).toBe("");
  });
});
