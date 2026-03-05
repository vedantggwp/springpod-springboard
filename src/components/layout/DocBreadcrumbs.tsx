import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface DocBreadcrumbsProps {
  readonly sectionTitle: string;
  readonly pageTitle: string;
}

export function DocBreadcrumbs({ sectionTitle, pageTitle }: DocBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-white/50">
        <li>
          <Link
            href="/"
            className="flex items-center transition-colors hover:text-[#16254C]
              dark:hover:text-white/80"
          >
            <Home size={14} />
          </Link>
        </li>
        <li>
          <ChevronRight size={12} className="text-[#B9BEC9] dark:text-white/30" />
        </li>
        <li>
          <span className="transition-colors">{sectionTitle}</span>
        </li>
        <li>
          <ChevronRight size={12} className="text-[#B9BEC9] dark:text-white/30" />
        </li>
        <li>
          <span className="font-medium text-gray-900 dark:text-white/87">
            {pageTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
