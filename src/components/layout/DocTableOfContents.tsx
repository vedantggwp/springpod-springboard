"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/types/content";

interface DocTableOfContentsProps {
  readonly items: readonly TocItem[];
}

export function DocTableOfContents({ items }: DocTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveId(topEntry.target.id);
        }
      },
      { rootMargin: "-64px 0px -75% 0px", threshold: 0 },
    );

    for (const el of headingElements) {
      observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden w-64 shrink-0 xl:block"
    >
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto py-8">
        <p
          className="mb-3 px-4 text-sm font-semibold uppercase tracking-wider
            text-[#8B92A6] dark:text-white/40"
        >
          ON THIS PAGE
        </p>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const indent = item.level === 3 ? "pl-7" : "pl-4";
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block rounded-sm py-1.5 pr-4 text-[13px] leading-snug transition-colors ${indent} ${
                    isActive
                      ? "border-l-2 border-[#0BB3B7] bg-[#9CF6F6]/20 font-medium text-[#0BB3B7] dark:bg-[#0BB3B7]/10 dark:text-[#9CF6F6]"
                      : "text-[#5C6682] hover:bg-[#E9E9ED] hover:text-[#16254C] dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white/80"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
