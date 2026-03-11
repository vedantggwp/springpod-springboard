import { TocItem } from "@/types/content";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function extractToc(raw: string): readonly TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items: TocItem[] = [];
  const seen = new Map<string, number>();
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(raw)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    items.push({ id, text, level });
  }

  return items;
}
