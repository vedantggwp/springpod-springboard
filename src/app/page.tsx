import { getContentBySlug } from "@/lib/mdx";
import { extractToc } from "@/lib/toc";
import { findNavItem, findAdjacentPages } from "@/lib/navigation";
import { getLastUpdated, formatLastUpdated } from "@/lib/content-dates";
import { DocPage } from "@/components/layout/DocPage";

export default async function HomePage() {
  const { raw, meta } = getContentBySlug("");
  const toc = extractToc(raw);
  const navInfo = findNavItem("");
  const adjacent = findAdjacentPages("");
  const dateIso = getLastUpdated("");
  const lastUpdated = dateIso ? formatLastUpdated(dateIso) : undefined;

  return (
    <DocPage
      raw={raw}
      meta={meta}
      toc={toc}
      sectionTitle={navInfo?.section.title ?? ""}
      slug="home"
      prev={adjacent.prev}
      next={adjacent.next}
      lastUpdated={lastUpdated}
    />
  );
}
