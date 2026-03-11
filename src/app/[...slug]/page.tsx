import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs } from "@/lib/mdx";
import { extractToc } from "@/lib/toc";
import { findNavItem, findAdjacentPages } from "@/lib/navigation";
import { DocPage } from "@/components/layout/DocPage";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs
    .filter((s) => s !== "")
    .map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = slug.join("/");
  try {
    const { meta } = getContentBySlug(slugStr);
    return {
      title: meta.title,
      ...(meta.description ? { description: meta.description } : {}),
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function DocPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const slugStr = slug.join("/");

  try {
    const { raw, meta } = getContentBySlug(slugStr);
    const toc = extractToc(raw);
    const navInfo = findNavItem(slugStr);
    const adjacent = findAdjacentPages(slugStr);

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
  } catch {
    notFound();
  }
}
