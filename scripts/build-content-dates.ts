/**
 * Build-time script: generates public/content-dates.json with last-updated dates.
 *
 * Priority: manual `lastUpdated` frontmatter > git commit date.
 * Uses a single batch git command for efficiency.
 *
 * Usage: npx tsx scripts/build-content-dates.ts
 * Run before `next build` or in CI.
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");
const outPath = path.join(process.cwd(), "public/content-dates.json");

function filePathToSlug(filePath: string): string {
  const relative = path.relative(contentDir, filePath).replace(/\.mdx$/, "");
  if (relative === "index") return "";
  return relative;
}

function getGitDates(): ReadonlyMap<string, string> {
  const dates = new Map<string, string>();

  try {
    const output = execSync(
      'git log --format="COMMIT_DATE:%aI" --name-only -- "src/content/"',
      { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 },
    );

    let currentDate = "";

    for (const line of output.split("\n")) {
      const trimmed = line.trim();
      if (trimmed === "") continue;

      if (trimmed.startsWith("COMMIT_DATE:")) {
        currentDate = trimmed.slice("COMMIT_DATE:".length);
        continue;
      }

      // Only process .mdx files under src/content/
      if (trimmed.startsWith("src/content/") && trimmed.endsWith(".mdx") && currentDate) {
        const fullPath = path.join(process.cwd(), trimmed);
        const slug = filePathToSlug(fullPath);
        // First occurrence = most recent commit, skip if already seen
        if (!dates.has(slug)) {
          dates.set(slug, currentDate);
        }
      }
    }
  } catch (err) {
    console.warn(
      "Warning: git log failed (shallow clone?). Using frontmatter dates only.",
      err instanceof Error ? err.message : err,
    );
  }

  return dates;
}

function getFrontmatterDates(): ReadonlyMap<string, string> {
  const dates = new Map<string, string>();

  function walk(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".mdx")) {
        const source = fs.readFileSync(fullPath, "utf-8");
        const { data } = matter(source);
        if (data.lastUpdated) {
          const slug = filePathToSlug(fullPath);
          dates.set(slug, new Date(data.lastUpdated).toISOString());
        }
      }
    }
  }

  walk(contentDir);
  return dates;
}

function buildContentDates(): Record<string, string> {
  const gitDates = getGitDates();
  const frontmatterDates = getFrontmatterDates();

  // Merge: frontmatter takes precedence over git
  const result: Record<string, string> = {};

  for (const [slug, date] of gitDates) {
    result[slug] = date;
  }
  for (const [slug, date] of frontmatterDates) {
    result[slug] = date;
  }

  return result;
}

const dates = buildContentDates();
const entryCount = Object.keys(dates).length;
fs.writeFileSync(outPath, JSON.stringify(dates, null, 2), "utf-8");
console.log(`Content dates built: ${entryCount} entries → ${outPath}`);
