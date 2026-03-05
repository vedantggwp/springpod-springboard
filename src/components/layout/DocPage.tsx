import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { DocTableOfContents } from "./DocTableOfContents";
import { DocFooter } from "./DocFooter";
import { DocBreadcrumbs } from "./DocBreadcrumbs";
import type { TocItem } from "@/types/content";
import type { NavItem } from "@/types/navigation";
import Collapsible from "@/components/mdx/Collapsible";
import Admonition from "@/components/mdx/Admonition";
import CardGrid from "@/components/mdx/CardGrid";
import Card from "@/components/mdx/Card";
import Checklist from "@/components/mdx/Checklist";
import ChecklistItem from "@/components/mdx/ChecklistItem";
import HeroBadge from "@/components/mdx/HeroBadge";
import StepCard from "@/components/mdx/StepCard";

interface DocPageProps {
  readonly raw: string;
  readonly meta: { readonly title: string; readonly description?: string };
  readonly toc: readonly TocItem[];
  readonly sectionTitle: string;
  readonly prev: NavItem | null;
  readonly next: NavItem | null;
}

const components = {
  ...mdxComponents,
  Collapsible,
  Admonition,
  CardGrid,
  Card,
  Checklist,
  ChecklistItem,
  HeroBadge,
  StepCard,
};

export function DocPage({
  raw,
  meta,
  toc,
  sectionTitle,
  prev,
  next,
}: DocPageProps) {
  return (
    <div className="flex gap-8">
      <article className="min-w-0 max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {sectionTitle && sectionTitle !== "Home" && (
          <DocBreadcrumbs sectionTitle={sectionTitle} pageTitle={meta.title} />
        )}
        <div className="prose-vcf max-w-none">
          <MDXRemote
            source={raw}
            components={components}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
        <DocFooter prev={prev} next={next} />
      </article>
      {toc.length > 0 && <DocTableOfContents items={toc} />}
    </div>
  );
}
