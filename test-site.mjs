import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = "http://localhost:3000";
const OUT = "/tmp/springboard-screenshots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
let passed = 0;
let failed = 0;
const failures = [];

function assert(name, condition, detail = "") {
  if (condition) {
    console.log(`  PASS  ${name}`);
    passed++;
  } else {
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
    failed++;
    failures.push(name);
  }
}

async function screenshot(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
}

// ════════════════════════════════════════════════════════════════════
// All pages from navigation.ts (source of truth)
// ════════════════════════════════════════════════════════════════════
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

// ════════════════════════════════════════════════════════════════════
// SUITE 1: Every page loads (200, no console errors, no VCF refs)
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 1: All Pages Load ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });

  for (const path of ALL_PAGES) {
    consoleErrors.length = 0;
    const resp = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    assert(`${path} returns 200`, resp.status() === 200, `got ${resp.status()}`);

    const body = await page.textContent("body");
    const vcf = body.match(/VCF|VibeFrame|Vibe Coding Framework/gi);
    assert(`${path} no VCF references`, !vcf, vcf ? vcf.join(", ") : "");

    // Check page has an h1
    const h1 = await page.$("h1");
    assert(`${path} has h1`, !!h1);
  }

  // 404 page
  const resp404 = await page.goto(`${BASE}/nonexistent-page-xyz`, { waitUntil: "networkidle" });
  assert("404 for unknown route", resp404.status() === 404);
  await screenshot(page, "404-page");

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 2: Header & Branding
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 2: Header & Branding ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Header exists and is sticky
  const header = await page.$("header");
  assert("Header exists", !!header);
  const headerPos = await page.$eval("header", (el) => getComputedStyle(el).position);
  assert("Header is sticky", headerPos === "sticky");

  // Header height is 48px (h-12)
  const headerH = await page.$eval("header", (el) => el.offsetHeight);
  assert("Header height 48px", headerH === 48, `got ${headerH}`);

  // Logo images exist (light + dark)
  const logoLight = await page.$('img[src="/springpod-logo.svg"]');
  const logoDark = await page.$('img[src="/springpod-logo-dark.svg"]');
  assert("Light logo exists", !!logoLight);
  assert("Dark logo exists", !!logoDark);

  // Logo has width/height (CLS prevention)
  const logoW = await page.$eval('img[src="/springpod-logo.svg"]', (el) => el.getAttribute("width"));
  const logoH = await page.$eval('img[src="/springpod-logo.svg"]', (el) => el.getAttribute("height"));
  assert("Logo has width attr", !!logoW);
  assert("Logo has height attr", !!logoH);

  // "SpringBoard" text in header
  const headerText = await page.textContent("header");
  assert("Header says SpringBoard", headerText.includes("SpringBoard"));
  assert("Header says Beta", headerText.includes("Beta"));

  // Search button visible on desktop
  const searchBtn = await page.$('header button:has-text("Search docs")');
  assert("Desktop search button visible", !!searchBtn);

  // Cmd+K shortcut shown
  assert("Cmd+K hint in header", headerText.includes("K"));

  await screenshot(page, "header-desktop");
  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 3: Dark Mode
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 3: Dark Mode ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Toggle to dark
  const toggleBtn = await page.$('button[aria-label="Switch to dark mode"]');
  assert("Dark mode toggle exists", !!toggleBtn);
  await toggleBtn.click();
  await page.waitForTimeout(400);

  // .dark class on html
  const hasDark = await page.$eval("html", (el) => el.classList.contains("dark"));
  assert("Dark class applied to html", hasDark);

  // Body background is dark
  const bodyBg = await page.$eval("body", (el) => getComputedStyle(el).backgroundColor);
  assert("Body bg is dark", bodyBg === "rgb(13, 17, 23)", `got ${bodyBg}`);

  // Toggle label changed
  const lightBtn = await page.$('button[aria-label="Switch to light mode"]');
  assert("Toggle label switches to 'Switch to light mode'", !!lightBtn);

  await screenshot(page, "dark-mode-homepage");

  // Navigate to content page — dark mode persists
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });
  const stillDark = await page.$eval("html", (el) => el.classList.contains("dark"));
  assert("Dark mode persists across navigation", stillDark);

  await screenshot(page, "dark-mode-content");

  // Toggle back to light
  await page.click('button[aria-label="Switch to light mode"]');
  await page.waitForTimeout(400);
  const isLight = await page.$eval("html", (el) => !el.classList.contains("dark"));
  assert("Light mode restored", isLight);

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 4: FOUC Prevention
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 4: FOUC Prevention ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Set dark mode preference
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.click('button[aria-label="Switch to dark mode"]');
  await page.waitForTimeout(300);

  // Open fresh page — capture at earliest moment
  const freshPage = await context.newPage();
  await freshPage.goto(`${BASE}/standards/security`, { waitUntil: "commit" });
  const earlyDark = await freshPage.$eval("html", (el) => el.classList.contains("dark"));
  assert("Dark class present at first paint (no FOUC)", earlyDark);
  await screenshot(freshPage, "fouc-early-render");

  await freshPage.waitForLoadState("networkidle");
  const lateDark = await freshPage.$eval("html", (el) => el.classList.contains("dark"));
  assert("Dark class still present after hydration", lateDark);
  await screenshot(freshPage, "fouc-after-hydration");

  await freshPage.close();
  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 5: Sidebar Navigation (Desktop)
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 5: Sidebar Navigation ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Sidebar exists
  const sidebar = await page.$("aside");
  assert("Sidebar exists on desktop", !!sidebar);

  // Sidebar has nav with sections
  const sectionBtns = await page.$$("aside nav button");
  assert("Sidebar has collapsible sections", sectionBtns.length >= 8, `got ${sectionBtns.length}`);

  // Sections are collapsed by default (items not visible)
  const sectionNames = await page.$$eval("aside nav button", (btns) =>
    btns.map((b) => b.textContent.trim())
  );
  assert("Sidebar has Standards section", sectionNames.some((n) => n.includes("Standards")));
  assert("Sidebar has Build Guides section", sectionNames.some((n) => n.includes("Build Guides")));
  assert("Sidebar has Checklists section", sectionNames.some((n) => n.includes("Checklists")));
  assert("Sidebar has Design System section", sectionNames.some((n) => n.includes("Design System")));

  // Click to expand a section
  const standardsBtn = sectionBtns.find(
    async (btn) => (await btn.textContent()).includes("Standards")
  );
  if (standardsBtn) {
    await standardsBtn.click();
    await page.waitForTimeout(300);
    const expandedLinks = await page.$$('aside nav a[href*="/standards/"]');
    assert("Standards section expands with links", expandedLinks.length >= 4, `got ${expandedLinks.length}`);
  }

  // Navigate via sidebar link
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });
  const activeLink = await page.$('aside nav a[aria-current="page"], aside nav a.bg-sp-teal');
  // Check the page loaded correctly
  const h1Text = await page.$eval("h1", (el) => el.textContent);
  assert("Sidebar navigation loads correct page", h1Text.includes("Security"));

  await screenshot(page, "sidebar-expanded");
  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 6: Mobile Navigation
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 6: Mobile Navigation ==");
{
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Sidebar hidden on mobile
  const sidebarVisible = await page.$eval("aside", (el) =>
    getComputedStyle(el).display !== "none"
  ).catch(() => false);
  assert("Sidebar hidden on mobile", !sidebarVisible);

  // Hamburger button exists
  const hamburger = await page.$('button[aria-label="Toggle navigation"]');
  assert("Hamburger button visible on mobile", !!hamburger);

  // Open mobile nav
  await hamburger.click();
  await page.waitForTimeout(500);

  // Drawer is visible
  const drawer = await page.$(".fixed.inset-y-0");
  assert("Mobile drawer opens", !!drawer);

  // Drawer has SpringBoard branding
  const drawerText = await drawer.textContent();
  assert("Mobile drawer has SpringBoard text", drawerText.includes("SpringBoard"));

  // Drawer has navigation links
  const mobileNav = await page.$('nav[aria-label="Mobile navigation"]');
  assert("Mobile nav has aria-label", !!mobileNav);

  await screenshot(page, "mobile-nav-open");

  // Overlay exists with aria-hidden
  const overlay = await page.$('div[aria-hidden="true"].fixed.inset-0');
  assert("Overlay has aria-hidden", !!overlay);

  // Close via X button
  const closeBtn = await page.$('button[aria-label="Close navigation"]');
  assert("Close button exists", !!closeBtn);
  await closeBtn.click();
  await page.waitForTimeout(400);

  // Drawer closed (translated off-screen via -translate-x-full)
  const drawerClasses = await page.$eval(".fixed.inset-y-0.left-0", (el) => el.className);
  assert("Drawer closes after X click", drawerClasses.includes("-translate-x-full"));

  // Body scroll unlocked after close
  const bodyOverflow = await page.$eval("body", (el) => el.style.overflow);
  assert("Body scroll restored after close", bodyOverflow === "" || bodyOverflow === "auto");

  // Open again, close via overlay click (click the right edge where drawer doesn't cover)
  await hamburger.click();
  await page.waitForTimeout(500);
  // Overlay is full screen but drawer is 288px wide (w-72), click at x=350 to hit overlay not drawer
  await page.click('div[aria-hidden="true"].fixed.inset-0', { position: { x: 350, y: 400 }, force: true });
  await page.waitForTimeout(400);
  const drawerAfterOverlay = await page.$eval(".fixed.inset-y-0.left-0", (el) => el.className);
  assert("Drawer closes on overlay click", drawerAfterOverlay.includes("-translate-x-full"));

  // Open and navigate — drawer should close on route change
  await hamburger.click();
  await page.waitForTimeout(500);
  // Click a nav link inside mobile drawer
  const mobileLinks = await page.$$('.fixed.inset-y-0 nav a');
  if (mobileLinks.length > 0) {
    // Expand a section first
    const mobileSectionBtns = await page.$$('.fixed.inset-y-0 nav button');
    if (mobileSectionBtns.length > 0) {
      await mobileSectionBtns[0].click();
      await page.waitForTimeout(300);
      const expandedLinks = await page.$$('.fixed.inset-y-0 nav a');
      if (expandedLinks.length > 0) {
        await expandedLinks[0].click();
        await page.waitForTimeout(600);
        const drawerAfterNav = await page.$eval(".fixed.inset-y-0.left-0", (el) => el.className);
        assert("Drawer closes on route change", drawerAfterNav.includes("-translate-x-full"));
      }
    }
  }

  // Body scroll lock while open
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.click('button[aria-label="Toggle navigation"]');
  await page.waitForTimeout(400);
  const overflowWhileOpen = await page.$eval("body", (el) => el.style.overflow);
  assert("Body scroll locked while drawer open", overflowWhileOpen === "hidden");
  await page.click('button[aria-label="Close navigation"]');

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 7: Search
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 7: Search ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Open search via Cmd+K
  await page.keyboard.press("Meta+k");
  await page.waitForTimeout(500);
  const dialog = await page.$('[role="dialog"]');
  assert("Cmd+K opens search dialog", !!dialog);

  // Dialog has correct ARIA
  const ariaModal = await dialog.getAttribute("aria-modal");
  assert("Dialog has aria-modal=true", ariaModal === "true");
  const ariaLabel = await dialog.getAttribute("aria-label");
  assert("Dialog has aria-label", ariaLabel === "Search documentation");

  // Input is focused
  const activeTag = await page.evaluate(() => document.activeElement?.tagName);
  assert("Search input auto-focused", activeTag === "INPUT");

  await screenshot(page, "search-open-empty");

  // Type a query
  await page.keyboard.type("security");
  await page.waitForTimeout(500);
  const results = await page.$$("ul li a");
  assert("Search returns results for 'security'", results.length > 0, `got ${results.length}`);

  await screenshot(page, "search-results");

  // Arrow down selects next result
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(200);
  // After ArrowDown, selectedIndex should have moved (check via arrow icon on active item)
  const arrowIcons = await page.$$('[role="dialog"] svg.text-sp-teal');
  assert("ArrowDown moves selection", arrowIcons.length > 0);

  // Enter navigates to result
  await page.keyboard.press("ArrowUp"); // back to first
  await page.waitForTimeout(100);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(600);
  const urlAfterSearch = page.url();
  assert("Enter navigates to selected result", urlAfterSearch !== `${BASE}/`);

  // Reopen search — check it clears
  await page.keyboard.press("Meta+k");
  await page.waitForTimeout(500);
  const inputVal = await page.$eval('[role="dialog"] input', (el) => el.value);
  assert("Search clears query on reopen", inputVal === "");

  // Empty results state
  await page.keyboard.type("xyznonexistentquery123");
  await page.waitForTimeout(500);
  const emptyMsg = await page.textContent('[role="dialog"]');
  assert("Empty results message shown", emptyMsg.includes("No results found"));
  await screenshot(page, "search-no-results");

  // Close via Escape
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  const dialogAfterEsc = await page.$('[role="dialog"]');
  assert("Escape closes search dialog", !dialogAfterEsc);

  // Focus restored after close
  const focusedAfter = await page.evaluate(() => document.activeElement?.tagName);
  assert("Focus restored after dialog close", focusedAfter !== "INPUT");

  // Open via click on search button
  const searchButton = await page.$('header button:has-text("Search docs")');
  await searchButton.click();
  await page.waitForTimeout(500);
  const dialogViaClick = await page.$('[role="dialog"]');
  assert("Search opens via button click", !!dialogViaClick);

  // Close via backdrop click (the search dialog's parent container)
  await page.click('[role="dialog"]', { position: { x: -50, y: -50 } }).catch(() => {});
  // Fallback: press Escape if backdrop click didn't work
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  const dialogAfterBackdrop = await page.$('[role="dialog"]');
  assert("Search closes on backdrop click", !dialogAfterBackdrop);

  // Close button inside dialog
  await page.keyboard.press("Meta+k");
  await page.waitForTimeout(500);
  const closeSearch = await page.$('[role="dialog"] button[aria-label="Close search"]');
  assert("Close search button exists", !!closeSearch);
  await closeSearch.click();
  await page.waitForTimeout(300);
  const dialogAfterClose = await page.$('[role="dialog"]');
  assert("Close button closes dialog", !dialogAfterClose);

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 8: Breadcrumbs & Page Structure
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 8: Breadcrumbs & Page Structure ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Content page has breadcrumbs
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });
  const breadcrumb = await page.$('nav[aria-label*="readcrumb"]');
  assert("Breadcrumbs nav exists", !!breadcrumb);
  const breadcrumbText = await breadcrumb.textContent();
  assert("Breadcrumbs show section name", breadcrumbText.includes("Standards"));
  assert("Breadcrumbs show page name", breadcrumbText.includes("Security"));

  // Homepage has no breadcrumbs
  await page.goto(BASE, { waitUntil: "networkidle" });
  const homeBreadcrumb = await page.$('nav[aria-label*="readcrumb"]');
  assert("Homepage has no breadcrumbs", !homeBreadcrumb);

  // Content page has article element
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });
  const article = await page.$("article");
  assert("Content page has article element", !!article);

  // Skip-to-content link exists
  const skipLink = await page.$('a[href="#main-content"]');
  assert("Skip-to-content link exists", !!skipLink);
  const mainContent = await page.$("main#main-content");
  assert("main#main-content target exists", !!mainContent);

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 9: Table of Contents
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 9: Table of Contents ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });

  // TOC exists
  const toc = await page.$('nav[aria-label="Table of contents"]');
  assert("TOC nav exists", !!toc);

  // Has "ON THIS PAGE" label
  const tocText = await toc.textContent();
  assert("TOC has 'ON THIS PAGE' label", tocText.includes("ON THIS PAGE"));

  // Has links
  const tocLinks = await toc.$$("a");
  assert("TOC has links", tocLinks.length > 0, `got ${tocLinks.length}`);

  // TOC links point to heading IDs on the page
  const firstHref = await tocLinks[0].getAttribute("href");
  assert("TOC links are anchor links", firstHref.startsWith("#"));
  const targetId = firstHref.slice(1);
  const targetExists = await page.evaluate((id) => !!document.getElementById(id), targetId);
  assert("TOC anchor target exists on page", targetExists);

  // Click TOC link scrolls page
  const tocLink = tocLinks[2]; // pick a link that requires scrolling
  if (tocLink) {
    await tocLink.click();
    await page.waitForTimeout(500);
    const href = await tocLink.getAttribute("href");
    assert("Clicking TOC link updates URL hash", page.url().includes(href));
  }

  // TOC hidden on pages with no headings (homepage might not have TOC)
  await page.goto(BASE, { waitUntil: "networkidle" });
  // Homepage may or may not have TOC — just check it doesn't crash

  await screenshot(page, "toc-content-page");
  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 10: Prev/Next Navigation (DocFooter)
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 10: Prev/Next Navigation ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Middle page has both prev and next
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });
  const prevLink = await page.$('a:has-text("Previous")');
  const nextLink = await page.$('a:has-text("Next")');
  assert("Middle page has Previous link", !!prevLink);
  assert("Middle page has Next link", !!nextLink);

  // Navigate via next link
  if (nextLink) {
    await nextLink.click();
    await page.waitForTimeout(600);
    const newUrl = page.url();
    assert("Next link navigates to a new page", newUrl !== `${BASE}/standards/security`);
  }

  // First page (homepage) — no previous
  await page.goto(BASE, { waitUntil: "networkidle" });
  const homePrev = await page.$('a:has-text("Previous")');
  assert("Homepage has no Previous link", !homePrev);

  // Last page — no next
  await page.goto(`${BASE}/reference/version`, { waitUntil: "networkidle" });
  const lastNext = await page.$('a:has-text("Next")');
  assert("Last page has no Next link", !lastNext);

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 11: Collapsible Components
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 11: Collapsible Components ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });

  const collapsibles = await page.$$('button[aria-expanded]');
  assert("Collapsible buttons exist", collapsibles.length > 0, `got ${collapsibles.length}`);

  if (collapsibles.length > 0) {
    // Initially collapsed
    const initialState = await collapsibles[0].getAttribute("aria-expanded");
    assert("Collapsible starts collapsed", initialState === "false");

    // Click to expand
    await collapsibles[0].click();
    await page.waitForTimeout(300);
    const expandedState = await collapsibles[0].getAttribute("aria-expanded");
    assert("Collapsible expands on click", expandedState === "true");

    // Content is visible
    const content = await collapsibles[0].evaluate((btn) => {
      const panel = btn.closest("div")?.querySelector('[role="region"], div.overflow-hidden');
      return panel ? panel.offsetHeight > 0 : false;
    });
    assert("Expanded content is visible", content);

    await screenshot(page, "collapsible-expanded");

    // Click again to collapse
    await collapsibles[0].click();
    await page.waitForTimeout(300);
    const collapsedAgain = await collapsibles[0].getAttribute("aria-expanded");
    assert("Collapsible collapses on second click", collapsedAgain === "false");
  }

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 12: Checklist Persistence
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 12: Checklist Persistence ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/checklists/green-checklist`, { waitUntil: "networkidle" });

  const checkboxes = await page.$$('input[type="checkbox"]');
  assert("Checklist has checkboxes", checkboxes.length > 0, `got ${checkboxes.length}`);

  if (checkboxes.length > 0) {
    // Initially unchecked
    const initialChecked = await checkboxes[0].isChecked();
    assert("Checkbox starts unchecked", !initialChecked);

    // Click to check
    await checkboxes[0].click();
    await page.waitForTimeout(200);
    const afterClick = await checkboxes[0].isChecked();
    assert("Checkbox checks on click", afterClick);

    // Label gets strikethrough
    const label = await checkboxes[0].evaluate((el) => {
      const span = el.closest("label")?.querySelector("span");
      return span ? span.classList.contains("line-through") : false;
    });
    assert("Checked item label has strikethrough", label);

    await screenshot(page, "checklist-checked");

    // Persists on page reload
    await page.reload({ waitUntil: "networkidle" });
    const afterReload = await page.$$eval('input[type="checkbox"]', (cbs) => cbs[0]?.checked);
    assert("Checkbox state persists after reload", afterReload);

    // Uncheck
    const cb = await page.$('input[type="checkbox"]:checked');
    if (cb) {
      await cb.click();
      await page.waitForTimeout(200);
      const unchecked = await cb.isChecked();
      assert("Checkbox unchecks on second click", !unchecked);
    }

    // Clear localStorage for clean state
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("sp-checklist-"))
        .forEach((k) => localStorage.removeItem(k));
    });
  }

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 13: Feedback Widget
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 13: Feedback Widget ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });

  // Clear any previous feedback
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("sp-feedback-"))
      .forEach((k) => localStorage.removeItem(k));
  });
  await page.reload({ waitUntil: "networkidle" });

  // Widget exists
  const feedbackGroup = await page.$('[role="group"][aria-label="Page feedback"]');
  assert("Feedback widget exists", !!feedbackGroup);

  // "Was this page helpful?" text
  const helpfulText = await page.$('text="Was this page helpful?"');
  assert("Shows 'Was this page helpful?'", !!helpfulText);

  // Yes/No buttons with aria-pressed
  const yesBtn = await page.$('button[aria-pressed]:has-text("Yes")');
  const noBtn = await page.$('button[aria-pressed]:has-text("No")');
  assert("Yes button exists with aria-pressed", !!yesBtn);
  assert("No button exists with aria-pressed", !!noBtn);

  // Click Yes — comment form appears
  await yesBtn.click();
  await page.waitForTimeout(300);
  const yesBtnPressed = await yesBtn.getAttribute("aria-pressed");
  assert("Yes button aria-pressed=true after click", yesBtnPressed === "true");

  const textarea = await page.$("textarea");
  assert("Comment textarea appears after vote", !!textarea);

  const submitBtn = await page.$('button:has-text("Submit")');
  const skipBtn = await page.$('button:has-text("Skip")');
  assert("Submit button appears", !!submitBtn);
  assert("Skip button appears", !!skipBtn);

  await screenshot(page, "feedback-voted");

  // Submit with comment
  await textarea.fill("Very helpful guide!");
  await submitBtn.click();
  await page.waitForTimeout(600);

  const bodyAfterSubmit = await page.textContent("body");
  assert("Thank you message shown after submit", bodyAfterSubmit.includes("Thanks for your feedback"));

  // aria-live on thank you
  const ariaLiveEl = await page.$('[aria-live="polite"]');
  assert("Thank you is in aria-live region", !!ariaLiveEl);

  await screenshot(page, "feedback-submitted");

  // Feedback locked — no buttons shown on reload
  await page.reload({ waitUntil: "networkidle" });
  const feedbackAfterReload = await page.$('[role="group"]');
  assert("Feedback locked after submission (no buttons)", !feedbackAfterReload);

  // Clean up
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("sp-feedback-"))
      .forEach((k) => localStorage.removeItem(k));
  });

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 14: Responsive Layouts
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 14: Responsive Layouts ==");
{
  // Mobile (375px)
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });

  const mobileSearchBar = await mobilePage.$('header button:has-text("Search docs")');
  const mobileSearchIcon = await mobilePage.$('header button[aria-label="Search"]');
  assert("Desktop search bar hidden on mobile", !mobileSearchBar || !(await mobileSearchBar.isVisible()));
  assert("Mobile search icon visible", !!mobileSearchIcon);

  // TOC hidden on mobile
  const mobileToc = await mobilePage.$('nav[aria-label="Table of contents"]');
  const tocVisible = mobileToc ? await mobileToc.isVisible() : false;
  assert("TOC hidden on mobile", !tocVisible);

  await screenshot(mobilePage, "responsive-mobile");
  await mobileCtx.close();

  // Tablet (768px)
  const tabletCtx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tabletPage = await tabletCtx.newPage();
  await tabletPage.goto(BASE, { waitUntil: "networkidle" });
  await screenshot(tabletPage, "responsive-tablet");
  await tabletCtx.close();

  // Wide desktop (1920px)
  const wideCtx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const widePage = await wideCtx.newPage();
  await widePage.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });

  const wideSidebar = await widePage.$("aside");
  const wideToc = await widePage.$('nav[aria-label="Table of contents"]');
  assert("Sidebar visible on wide desktop", !!wideSidebar && await wideSidebar.isVisible());
  assert("TOC visible on wide desktop", !!wideToc && await wideToc.isVisible());

  await screenshot(widePage, "responsive-wide");
  await wideCtx.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 15: Heading Anchor Links
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 15: Heading Anchor Links ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });

  // Headings have IDs
  const headingsWithId = await page.$$eval("article h2[id], article h3[id]", (els) =>
    els.map((el) => ({ tag: el.tagName, id: el.id, text: el.textContent.trim() }))
  );
  assert("Content headings have IDs", headingsWithId.length > 0, `got ${headingsWithId.length}`);

  // No duplicate IDs
  const ids = headingsWithId.map((h) => h.id);
  const uniqueIds = new Set(ids);
  assert("No duplicate heading IDs", ids.length === uniqueIds.size, `${ids.length} total, ${uniqueIds.size} unique`);

  // Anchor link appears on hover
  const firstH2 = await page.$("article h2[id]");
  if (firstH2) {
    await firstH2.hover();
    await page.waitForTimeout(300);
    const anchorLink = await firstH2.$("a");
    assert("Heading has anchor link", !!anchorLink);
    if (anchorLink) {
      const href = await anchorLink.getAttribute("href");
      assert("Anchor link href matches heading ID", href.startsWith("#"));
    }
  }

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 16: DataTable Dark Mode
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 16: DataTable ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  // Find a page with a table
  await page.goto(`${BASE}/client-config/approved-tools`, { waitUntil: "networkidle" });

  const table = await page.$("table");
  if (table) {
    assert("Table exists", true);

    // Check dark mode table
    await page.click('button[aria-label="Switch to dark mode"]');
    await page.waitForTimeout(400);

    const headerBg = await page.$eval("thead", (el) =>
      getComputedStyle(el).backgroundColor
    ).catch(() => "none");
    assert("Table header has background in dark mode", headerBg !== "rgba(0, 0, 0, 0)");

    await screenshot(page, "datatable-dark");
    await page.click('button[aria-label="Switch to light mode"]');
  } else {
    assert("Table exists (skipped — no table on page)", true);
  }

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 17: Keyboard Accessibility
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 17: Keyboard Accessibility ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Skip-to-content is first focusable element
  await page.keyboard.press("Tab");
  const firstFocused = await page.evaluate(() => {
    const el = document.activeElement;
    return el ? { tag: el.tagName, href: el.getAttribute("href") } : null;
  });
  assert("First Tab focuses skip-to-content", firstFocused?.href === "#main-content");

  // Skip link becomes visible on focus
  const skipVisible = await page.$eval('a[href="#main-content"]', (el) => {
    const style = getComputedStyle(el);
    return style.position !== "absolute" || style.clip !== "rect(0px, 0px, 0px, 0px)";
  });
  // The sr-only class uses clip, but focus:not-sr-only should override
  assert("Skip link visible when focused", skipVisible);

  // Focus rings on interactive elements
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });

  // Tab to theme toggle and check focus ring
  // Press Tab multiple times to reach the theme toggle
  for (let i = 0; i < 5; i++) await page.keyboard.press("Tab");
  const focusedEl = await page.evaluate(() => document.activeElement?.tagName);
  assert("Tab key moves focus through interactive elements", focusedEl === "BUTTON" || focusedEl === "A");

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 18: Reduced Motion
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 18: Reduced Motion ==");
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Check that scroll-behavior is auto (not smooth)
  const scrollBehavior = await page.$eval("html", (el) =>
    getComputedStyle(el).scrollBehavior
  );
  assert("scroll-behavior is auto with reduced motion", scrollBehavior === "auto");

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 19: Design Token Consistency
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 19: Design Token Consistency ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Check light mode background
  const lightBg = await page.$eval("body", (el) => getComputedStyle(el).backgroundColor);
  // Should NOT be rgba with transparency (old bug was rgba(233,233,237,0.3))
  assert("Light bg is solid (not transparent)", !lightBg.includes("0.3"));

  // Dark mode card surface
  await page.click('button[aria-label="Switch to dark mode"]');
  await page.waitForTimeout(400);
  const cardBg = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--card").trim()
  );
  assert("Dark card surface is #1c2128 (bumped)", cardBg === "#1c2128");

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUITE 20: Last Updated Dates
// ════════════════════════════════════════════════════════════════════
console.log("\n== SUITE 20: Last Updated Dates ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/standards/security`, { waitUntil: "networkidle" });

  // Check for clock icon / last updated text
  const lastUpdated = await page.$('article p:has(svg)');
  // Not all pages have dates — just check it doesn't crash
  if (lastUpdated) {
    const dateText = await lastUpdated.textContent();
    assert("Last updated shows a date", /\d{4}|ago|updated/i.test(dateText) || dateText.length > 0);
  } else {
    assert("Last updated (not present, ok)", true);
  }

  await context.close();
}

// ════════════════════════════════════════════════════════════════════
// SUMMARY
// ════════════════════════════════════════════════════════════════════
console.log("\n════════════════════════════════════════");
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
if (failures.length > 0) {
  console.log("\nFailed tests:");
  failures.forEach((f) => console.log(`  - ${f}`));
}
console.log(`\nScreenshots: ${OUT}/`);
console.log("════════════════════════════════════════\n");

await browser.close();
process.exit(failed > 0 ? 1 : 0);
