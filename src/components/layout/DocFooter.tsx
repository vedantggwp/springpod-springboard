import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NavItem } from "@/types/navigation";

interface DocFooterProps {
  readonly prev: NavItem | null;
  readonly next: NavItem | null;
}

export function DocFooter({ prev, next }: DocFooterProps) {
  if (!prev && !next) return null;

  return (
    <footer className="mt-12 border-t border-sp-border pt-6 dark:border-white/10">
      <div className="flex items-stretch justify-between gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-center gap-2 rounded-xl px-4 py-3
              text-sm text-sp-text-secondary transition-colors
              hover:text-sp-navy
              dark:text-white/50 dark:hover:text-white/80"
          >
            <ChevronLeft
              size={16}
              className="text-sp-text-muted transition-transform
                group-hover:-translate-x-0.5 group-hover:text-sp-teal"
            />
            <div className="text-right">
              <p className="text-xs text-sp-text-muted">Previous</p>
              <p className="font-medium text-sp-navy dark:text-white/87">
                {prev.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex items-center gap-2 rounded-xl px-4 py-3
              text-sm text-sp-text-secondary transition-colors
              hover:text-sp-navy
              dark:text-white/50 dark:hover:text-white/80"
          >
            <div className="text-left">
              <p className="text-xs text-sp-text-muted">Next</p>
              <p className="font-medium text-sp-navy dark:text-white/87">
                {next.title}
              </p>
            </div>
            <ChevronRight
              size={16}
              className="text-sp-text-muted transition-transform
                group-hover:translate-x-0.5 group-hover:text-sp-teal"
            />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </footer>
  );
}
