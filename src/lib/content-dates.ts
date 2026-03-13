/**
 * Utilities for reading and formatting content last-updated dates.
 * Consumes the build-time generated public/content-dates.json.
 */

import fs from "fs";
import path from "path";

type ContentDates = Readonly<Record<string, string>>;

function loadContentDates(): ContentDates {
  try {
    const filePath = path.join(process.cwd(), "public/content-dates.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as ContentDates;
  } catch {
    return {};
  }
}

const contentDates: ContentDates = loadContentDates();

/** Returns the ISO date string for a given slug, or null if unknown. */
export function getLastUpdated(slug: string): string | null {
  return contentDates[slug] ?? null;
}

/** Formats an ISO date string into a human-readable "Updated ..." string. */
export function formatLastUpdated(isoDate: string): string {
  const updated = new Date(isoDate);
  const now = new Date();

  // Compare calendar days in UTC to avoid timezone edge cases
  const updatedDay = Date.UTC(
    updated.getUTCFullYear(),
    updated.getUTCMonth(),
    updated.getUTCDate(),
  );
  const todayDay = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const diffDays = Math.floor((todayDay - updatedDay) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Updated today";
  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 30) return `Updated ${diffDays} days ago`;

  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(updated);

  return `Updated ${formatted}`;
}
