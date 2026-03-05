import { getAllSlugs, getContentBySlug } from "./mdx";
import { findNavItem } from "./navigation";
import type { SearchEntry } from "@/types/content";

export function buildSearchIndex(): readonly SearchEntry[] {
  const slugs = getAllSlugs();
  const entries: SearchEntry[] = [];

  for (const slug of slugs) {
    const { raw, meta } = getContentBySlug(slug);
    const navInfo = findNavItem(slug);

    // Strip MDX/HTML tags for plain text search
    const content = raw
      .replace(/<[^>]+>/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/#{1,6}\s+/g, "")
      .replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1")
      .replace(/`{1,3}[^`]*`{1,3}/g, "")
      .replace(/\n{2,}/g, "\n")
      .trim()
      .slice(0, 2000); // Limit content size per entry

    entries.push({
      title: meta.title,
      slug: slug === "" ? "/" : `/${slug}`,
      section: navInfo?.section.title ?? "",
      content,
    });
  }

  return entries;
}
