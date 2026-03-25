import { test, expect } from "@playwright/test";

test.describe("Keyboard Accessibility", () => {
  test("skip-to-content is first focusable", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => ({
      tag: document.activeElement?.tagName,
      href: document.activeElement?.getAttribute("href"),
    }));
    expect(focused.href).toBe("#main-content");
  });

  test("main-content target exists", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main#main-content")).toBeVisible();
  });
});

test.describe("Reduced Motion @desktop", () => {
  test("scroll-behavior is auto with reduced motion", async ({ browser, viewport }) => {
    test.skip(viewport!.width < 640, "desktop only");
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/");
    const behavior = await page.locator("html").evaluate((el) =>
      getComputedStyle(el).scrollBehavior
    );
    expect(behavior).toBe("auto");
    await context.close();
  });
});

test.describe("Design Tokens", () => {
  test("light bg is solid, not transparent", async ({ page }) => {
    await page.goto("/");
    const bg = await page.locator("body").evaluate((el) =>
      getComputedStyle(el).backgroundColor
    );
    expect(bg).not.toContain("0.3");
  });

  test("dark card surface is #1c2128", async ({ page }) => {
    await page.goto("/");
    await page.click('button[aria-label="Switch to dark mode"]');
    await page.waitForTimeout(400);
    const card = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--card").trim()
    );
    expect(card).toBe("#1c2128");
  });
});

test.describe("Responsive", () => {
  test("TOC hidden on mobile", async ({ page, viewport }) => {
    test.skip(viewport!.width >= 1280, "desktop has TOC");
    await page.goto("/standards/security");
    const toc = page.locator('nav[aria-label="Table of contents"]');
    if (await toc.count() > 0) {
      await expect(toc).not.toBeVisible();
    }
  });
});
