import { test, expect } from "@playwright/test";

test.describe("Sidebar Navigation @desktop", () => {
  test.beforeEach(async ({ page, viewport }) => {
    test.skip(viewport!.width < 1024, "desktop only");
    await page.goto("/");
  });

  test("sidebar exists with collapsible sections", async ({ page }) => {
    await expect(page.locator("aside")).toBeVisible();
    const sections = page.locator("aside nav button");
    await expect(sections).not.toHaveCount(0);
  });

  test("expand section reveals links", async ({ page }) => {
    const standardsBtn = page.locator('aside nav button:has-text("Standards")');
    await standardsBtn.click();
    await expect(page.locator('aside nav a[href*="/standards/"]').first()).toBeVisible();
  });

  test("sidebar navigates to correct page", async ({ page }) => {
    const standardsBtn = page.locator('aside nav button:has-text("Standards")');
    await standardsBtn.click();
    await page.click('aside nav a[href="/standards/security"]');
    await expect(page.locator("h1")).toContainText("Security");
  });
});

test.describe("Mobile Navigation @mobile", () => {
  test.beforeEach(async ({ page, viewport }) => {
    test.skip(viewport!.width >= 1024, "mobile only");
    await page.goto("/");
  });

  test("sidebar hidden, hamburger visible", async ({ page }) => {
    await expect(page.locator('button[aria-label="Toggle navigation"]')).toBeVisible();
  });

  test("drawer opens and closes via X", async ({ page }) => {
    await page.click('button[aria-label="Toggle navigation"]');
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();
    await expect(page.locator(".fixed.inset-y-0.left-0")).toContainText("SpringBoard");

    await page.click('button[aria-label="Close navigation"]');
    await expect(page.locator(".fixed.inset-y-0.left-0")).toHaveClass(/-translate-x-full/);
  });

  test("drawer closes on overlay click", async ({ page }) => {
    await page.click('button[aria-label="Toggle navigation"]');
    await page.waitForTimeout(400);
    await page.locator('div[aria-hidden="true"].fixed.inset-0').click({ position: { x: 350, y: 400 }, force: true });
    await expect(page.locator(".fixed.inset-y-0.left-0")).toHaveClass(/-translate-x-full/);
  });

  test("body scroll locked while drawer open", async ({ page }) => {
    await page.click('button[aria-label="Toggle navigation"]');
    await page.waitForTimeout(400);
    const overflow = await page.locator("body").evaluate((el) => el.style.overflow);
    expect(overflow).toBe("hidden");
  });
});

test.describe("Breadcrumbs", () => {
  test("content page shows breadcrumbs", async ({ page }) => {
    await page.goto("/standards/security");
    const crumbs = page.locator('nav[aria-label*="readcrumb"]');
    await expect(crumbs).toBeVisible();
    await expect(crumbs).toContainText("Standards");
    await expect(crumbs).toContainText("Security");
  });

  test("homepage has no breadcrumbs", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('nav[aria-label*="readcrumb"]')).toHaveCount(0);
  });
});

test.describe("Prev/Next Navigation", () => {
  test("middle page has both prev and next", async ({ page }) => {
    await page.goto("/standards/security");
    await expect(page.locator('a:has-text("Previous")')).toBeVisible();
    await expect(page.locator('a:has-text("Next")')).toBeVisible();
  });

  test("homepage has no Previous", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a:has-text("Previous")')).toHaveCount(0);
  });

  test("last page has no Next", async ({ page }) => {
    await page.goto("/reference/version");
    await expect(page.locator('a:has-text("Next")')).toHaveCount(0);
  });
});
