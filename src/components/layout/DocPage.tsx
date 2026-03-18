import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents, resetSeenSlugs } from "@/components/mdx/mdx-components";
import { DocTableOfContents } from "./DocTableOfContents";
import { DocFooter } from "./DocFooter";
import { DocBreadcrumbs } from "./DocBreadcrumbs";
import { Clock } from "lucide-react";
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
import {
  DecisionFlow,
  DecisionStep,
} from "@/components/mdx/DecisionFlow";
import FeedbackWidget from "@/components/feedback/FeedbackWidget";

interface DocPageProps {
  readonly raw: string;
  readonly meta: { readonly title: string; readonly description?: string };
  readonly toc: readonly TocItem[];
  readonly sectionTitle: string;
  readonly slug: string;
  readonly prev: NavItem | null;
  readonly next: NavItem | null;
  readonly lastUpdated?: string;
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
  DecisionFlow,
  DecisionStep,
};

export function DocPage({
  raw,
  meta,
  toc,
  sectionTitle,
  slug,
  prev,
  next,
  lastUpdated,
}: DocPageProps) {
  // Reset slug tracker so each page gets unique heading IDs during SSG
  resetSeenSlugs();

  return (
    <div className="flex gap-8">
      <article className="min-w-0 max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {sectionTitle && sectionTitle !== "Home" && (
          <DocBreadcrumbs sectionTitle={sectionTitle} pageTitle={meta.title} />
        )}
        {lastUpdated && (
          <p className="flex items-center gap-1 text-xs text-sp-text-muted dark:text-white/40 mb-2">
            <Clock size={12} />
            <span>{lastUpdated}</span>
          </p>
        )}
        <div className="max-w-none">
          <MDXRemote
            source={raw}
            components={components}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
        <FeedbackWidget slug={slug} />
        <DocFooter prev={prev} next={next} />
      </article>
      {toc.length > 0 && <DocTableOfContents items={toc} />}
    </div>
  );
}
