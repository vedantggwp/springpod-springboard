import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = "http://localhost:3000";
const OUT = "/tmp/springboard-screenshots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

// Collect console errors
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(err.message));

async function screenshot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log(`📸 ${name}`);
}

// ── 1. Homepage Light Mode ──────────────────────────────────────
console.log("\n=== HOMEPAGE (Light Mode) ===");
await page.goto(BASE, { waitUntil: "networkidle" });
await screenshot("01-homepage-light");

// Check page title
const title = await page.title();
console.log(`Title: ${title}`);

// Check for VCF/VibeFrame text on page
const bodyText = await page.textContent("body");
const vcfRefs = bodyText.match(/VCF|VibeFrame|Vibe Coding Framework/gi);
if (vcfRefs) console.log(`⚠️ VCF references found on homepage: ${vcfRefs.join(", ")}`);

// Check header branding
const headerText = await page.textContent("header");
console.log(`Header text: ${headerText.replace(/\s+/g, " ").trim()}`);

// Check GitHub link
const githubLink = await page.$eval('a[aria-label="GitHub"]', el => el.href).catch(() => "NOT FOUND");
console.log(`GitHub link: ${githubLink}`);

// ── 2. Dark Mode Toggle ─────────────────────────────────────────
console.log("\n=== DARK MODE ===");
await page.click('button[aria-label="Switch to dark mode"]');
await page.waitForTimeout(500);
await screenshot("02-homepage-dark");

// Check if .dark class is on html
const hasDark = await page.$eval("html", el => el.classList.contains("dark"));
console.log(`Dark class on <html>: ${hasDark}`);

// Check background color of body
const bodyBg = await page.$eval("body", el => getComputedStyle(el).backgroundColor);
console.log(`Body background (dark): ${bodyBg}`);

// Check header background
const headerBg = await page.$eval("header", el => getComputedStyle(el).backgroundColor);
console.log(`Header background (dark): ${headerBg}`);

// Check sidebar background
const sidebarBg = await page.$eval("aside", el => getComputedStyle(el).backgroundColor);
console.log(`Sidebar background (dark): ${sidebarBg}`);

// Check text color contrast
const h1Color = await page.$eval("h1", el => getComputedStyle(el).color);
console.log(`H1 text color (dark): ${h1Color}`);

// Toggle back to light
await page.click('button[aria-label="Switch to light mode"]');
await page.waitForTimeout(300);

// ── 3. Navigation – Test all sidebar sections ───────────────────
console.log("\n=== SIDEBAR NAVIGATION ===");
const sidebarLinks = await page.$$eval("aside nav a", links =>
  links.map(a => ({ text: a.textContent.trim(), href: a.href }))
);
console.log(`Sidebar links found: ${sidebarLinks.length}`);

// Check for section icons
const sidebarSections = await page.$$eval("aside nav button", btns =>
  btns.map(b => b.textContent.trim())
);
console.log(`Sidebar sections (collapsed): ${sidebarSections.join(", ")}`);

// ── 4. Navigate to key pages and screenshot ─────────────────────
console.log("\n=== PAGE NAVIGATION ===");
const testPages = [
  { path: "/intake/project-intake", name: "03-intake" },
  { path: "/standards/security", name: "04-security" },
  { path: "/standards/safeguarding", name: "05-safeguarding" },
  { path: "/build-guides/green-quick-build", name: "06-green-build" },
  { path: "/checklists/yellow-checklist", name: "07-yellow-checklist" },
  { path: "/forms/build-log", name: "08-build-log" },
  { path: "/guides/first-build", name: "09-first-build" },
  { path: "/roles/curriculum-designer", name: "10-role-curriculum" },
  { path: "/design-system/colors", name: "11-design-colors" },
  { path: "/design-system/components", name: "12-design-components" },
  { path: "/updates/feed", name: "13-updates-feed" },
];

for (const { path, name } of testPages) {
  const resp = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
  console.log(`${resp.status()} ${path}`);
  if (resp.status() !== 200) {
    console.log(`  ❌ Non-200 status!`);
  }

  // Check for VCF references
  const text = await page.textContent("body");
  const refs = text.match(/VCF|VibeFrame|Vibe Coding Framework/gi);
  if (refs) console.log(`  ⚠️ VCF refs: ${refs.join(", ")}`);

  await screenshot(name);
}

// ── 5. Dark mode on a content page ──────────────────────────────
console.log("\n=== DARK MODE - CONTENT PAGE ===");
await page.goto(`${BASE}/build-guides/green-quick-build`, { waitUntil: "networkidle" });
await page.click('button[aria-label="Switch to dark mode"]');
await page.waitForTimeout(500);
await screenshot("14-green-build-dark");

// Check specific elements in dark mode
const cardBgs = await page.$$eval('[class*="rounded-xl"]', els =>
  els.slice(0, 5).map(el => ({
    tag: el.tagName,
    bg: getComputedStyle(el).backgroundColor,
    color: getComputedStyle(el).color,
    border: getComputedStyle(el).borderColor,
  }))
);
console.log("Dark mode card styles:", JSON.stringify(cardBgs, null, 2));

await page.click('button[aria-label="Switch to light mode"]');
await page.waitForTimeout(300);

// ── 6. Collapsible components ───────────────────────────────────
console.log("\n=== INTERACTIVE COMPONENTS ===");
await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });

// Try clicking a collapsible
const collapsibles = await page.$$('button[aria-expanded]');
console.log(`Collapsibles found: ${collapsibles.length}`);
if (collapsibles.length > 0) {
  const isExpanded = await collapsibles[0].getAttribute("aria-expanded");
  console.log(`First collapsible expanded: ${isExpanded}`);
  await collapsibles[0].click();
  await page.waitForTimeout(300);
  const isExpandedAfter = await collapsibles[0].getAttribute("aria-expanded");
  console.log(`After click: ${isExpandedAfter}`);
  await screenshot("15-collapsible-open");
}

// ── 7. Checklist items ──────────────────────────────────────────
await page.goto(`${BASE}/checklists/green-checklist`, { waitUntil: "networkidle" });
const checkboxes = await page.$$('input[type="checkbox"]');
console.log(`Checkboxes found: ${checkboxes.length}`);
if (checkboxes.length > 0) {
  await checkboxes[0].click();
  await page.waitForTimeout(200);
  const checked = await checkboxes[0].isChecked();
  console.log(`Checkbox clicked, checked: ${checked}`);
  await screenshot("16-checklist-checked");
}

// ── 8. Search dialog ────────────────────────────────────────────
console.log("\n=== SEARCH ===");
await page.goto(BASE, { waitUntil: "networkidle" });
await page.keyboard.press("Meta+k");
await page.waitForTimeout(500);
await screenshot("17-search-open");

// Type a search query
await page.keyboard.type("security");
await page.waitForTimeout(500);
await screenshot("18-search-results");

// Check results
const searchResults = await page.$$eval("ul li a", links =>
  links.map(a => a.textContent.trim())
).catch(() => []);
console.log(`Search results for "security": ${searchResults.length > 0 ? searchResults.join(", ") : "NONE"}`);

// Close search
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

// ── 9. Mobile viewport ─────────────────────────────────────────
console.log("\n=== MOBILE VIEW ===");
await page.setViewportSize({ width: 375, height: 812 }); // iPhone size
await page.goto(BASE, { waitUntil: "networkidle" });
await screenshot("19-mobile-homepage");

// Check sidebar is hidden
const sidebarVisible = await page.$eval("aside", el => {
  const style = getComputedStyle(el);
  return style.display !== "none";
}).catch(() => false);
console.log(`Sidebar visible on mobile: ${sidebarVisible}`);

// Open mobile nav
await page.click('button[aria-label="Toggle navigation"]');
await page.waitForTimeout(500);
await screenshot("20-mobile-nav-open");

// Check mobile nav branding
const mobileNavText = await page.textContent('[aria-label="Mobile navigation"]').catch(() => "");
const mobileHeaderText = await page.$eval('.fixed.inset-y-0 > div:first-child', el => el.textContent.trim()).catch(() => "NOT FOUND");
console.log(`Mobile nav header: ${mobileHeaderText}`);

// Check for "V" icon text
const vIcon = await page.$eval('.fixed.inset-y-0 span.text-xs', el => el.textContent).catch(() => "NOT FOUND");
console.log(`Mobile nav icon text: "${vIcon}"`);

// Close mobile nav
await page.click('button[aria-label="Close navigation"]');
await page.waitForTimeout(300);

// Mobile dark mode
await page.click('button[aria-label="Switch to dark mode"]');
await page.waitForTimeout(500);
await screenshot("21-mobile-dark");

// Mobile nav in dark mode
await page.click('button[aria-label="Toggle navigation"]');
await page.waitForTimeout(500);
await screenshot("22-mobile-nav-dark");

// ── 10. Tablet viewport ─────────────────────────────────────────
console.log("\n=== TABLET VIEW ===");
await page.click('button[aria-label="Close navigation"]').catch(() => {});
await page.click('button[aria-label="Switch to light mode"]').catch(() => {});
await page.waitForTimeout(300);
await page.setViewportSize({ width: 768, height: 1024 });
await page.goto(BASE, { waitUntil: "networkidle" });
await screenshot("23-tablet-homepage");

// ── 11. FOUC Test (Dark mode flash) ─────────────────────────────
console.log("\n=== FOUC TEST ===");
// Set dark mode preference, then do a fresh navigation
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.click('button[aria-label="Switch to dark mode"]');
await page.waitForTimeout(300);

// Navigate to a new page and capture early render
const newPage = await context.newPage();
await newPage.goto(`${BASE}/standards/security`, { waitUntil: "commit" });
// Screenshot as early as possible
await newPage.screenshot({ path: `${OUT}/24-fouc-test.png` });
console.log("📸 24-fouc-test (early render)");
await newPage.waitForLoadState("networkidle");
await newPage.screenshot({ path: `${OUT}/25-fouc-after-load.png` });
console.log("📸 25-fouc-after-load");
await newPage.close();

// ── 12. 404 page ────────────────────────────────────────────────
console.log("\n=== 404 PAGE ===");
await page.setViewportSize({ width: 1440, height: 900 });
const resp404 = await page.goto(`${BASE}/nonexistent-page`, { waitUntil: "networkidle" });
console.log(`404 page status: ${resp404.status()}`);
await screenshot("26-404-page");

// ── 13. Table of contents ───────────────────────────────────────
console.log("\n=== TABLE OF CONTENTS ===");
await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });
const tocLinks = await page.$$eval('nav[aria-label*="table"] a, [class*="toc"] a, aside:last-of-type a', links =>
  links.map(a => ({ text: a.textContent.trim(), href: a.href }))
).catch(() => []);
console.log(`TOC links found: ${tocLinks.length}`);
if (tocLinks.length > 0) console.log(`TOC sample: ${tocLinks.slice(0, 3).map(l => l.text).join(", ")}`);

// ── 14. Breadcrumbs ─────────────────────────────────────────────
console.log("\n=== BREADCRUMBS ===");
const breadcrumbs = await page.textContent('nav[aria-label*="Breadcrumb"], [class*="breadcrumb"]').catch(() => "NOT FOUND");
console.log(`Breadcrumbs: ${breadcrumbs?.replace(/\s+/g, " ").trim()}`);

// ── Summary ─────────────────────────────────────────────────────
console.log("\n=== CONSOLE ERRORS ===");
if (consoleErrors.length > 0) {
  consoleErrors.forEach(e => console.log(`  ❌ ${e}`));
} else {
  console.log("  ✅ No console errors");
}

console.log(`\n📁 Screenshots saved to: ${OUT}/`);
console.log(`Total screenshots: ${(await import("fs")).readdirSync(OUT).filter(f => f.endsWith(".png")).length}`);

await browser.close();
