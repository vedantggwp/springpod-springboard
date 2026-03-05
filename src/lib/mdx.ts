import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export function getContentBySlug(slug: string): {
  readonly raw: string;
  readonly meta: { readonly title: string; readonly description?: string };
} {
  // Map empty slug to index
  const filePath =
    slug === ""
      ? path.join(contentDir, "index.mdx")
      : path.join(contentDir, `${slug}.mdx`);

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  // Extract title from frontmatter or first h1
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = (data.title as string) || titleMatch?.[1] || "Untitled";

  return {
    raw: content,
    meta: {
      title,
      description: data.description as string | undefined,
    },
  };
}

export function getAllSlugs(): readonly string[] {
  const slugs: string[] = [];

  function walk(dir: string, prefix: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), `${prefix}${entry.name}/`);
      } else if (entry.name.endsWith(".mdx")) {
        const name = entry.name.replace(/\.mdx$/, "");
        if (name === "index" && prefix === "") {
          slugs.push("");
        } else {
          slugs.push(`${prefix}${name}`);
        }
      }
    }
  }

  walk(contentDir, "");
  return slugs;
}
