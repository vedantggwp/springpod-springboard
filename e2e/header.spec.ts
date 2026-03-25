import { test, expect } from "@playwright/test";

test.describe("Header & Branding", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header is sticky at 48px", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(header).toHaveCSS("position", "sticky");
    const box = await header.boundingBox();
    expect(box?.height).toBe(48);
  });

  test("logo images with CLS-prevention dimensions", async ({ page }) => {
    // Light logo is hidden in dark mode via dark:hidden, check attribute presence
    // Header logo and MobileNav logo both use same src — check the header one
    const lightLogo = page.locator('header img[src="/springpod-logo.svg"]');
    await expect(lightLogo).toHaveAttribute("width");
    await expect(lightLogo).toHaveAttribute("height");
  });

  test("branding text", async ({ page }) => {
    await expect(page.locator("header")).toContainText("SpringBoard");
    await expect(page.locator("header")).toContainText("Beta");
  });

  test("desktop search button visible", async ({ page, viewport }) => {
    test.skip(viewport!.width < 640, "mobile viewport");
    await expect(page.locator('header button:has-text("Search docs")')).toBeVisible();
  });
});
