import { getContentBySlug } from "@/lib/mdx";
import { extractToc } from "@/lib/toc";
import { findNavItem, findAdjacentPages } from "@/lib/navigation";
import { DocPage } from "@/components/layout/DocPage";

export default async function HomePage() {
  const { raw, meta } = getContentBySlug("");
  const toc = extractToc(raw);
  const navInfo = findNavItem("");
  const adjacent = findAdjacentPages("");

  return (
    <DocPage
      raw={raw}
      meta={meta}
      toc={toc}
      sectionTitle={navInfo?.section.title ?? ""}
      prev={adjacent.prev}
      next={adjacent.next}
    />
  );
}
