"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, X, FileText, ArrowRight } from "lucide-react";
import Fuse from "fuse.js";
import type { SearchEntry } from "@/types/content";

interface SearchResult {
  readonly item: SearchEntry;
  readonly score?: number;
}

/** Group results by their section field for organized display. */
function groupBySection(
  results: readonly SearchResult[]
): ReadonlyMap<string, readonly SearchResult[]> {
  const groups = new Map<string, SearchResult[]>();
  for (const result of results) {
    const section = result.item.section || "Other";
    const existing = groups.get(section);
    if (existing) {
      existing.push(result);
    } else {
      groups.set(section, [result]);
    }
  }
  return groups;
}

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fuse, setFuse] = useState<Fuse<SearchEntry> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);

  // Load search index lazily on first open
  const loadIndex = useCallback(async () => {
    if (fuse) return;
    const res = await fetch("/search-index.json");
    const data: SearchEntry[] = await res.json();
    setFuse(
      new Fuse(data, {
        keys: [
          { name: "title", weight: 3 },
          { name: "section", weight: 1 },
          { name: "content", weight: 0.5 },
        ],
        threshold: 0.3,
        includeScore: true,
      })
    );
  }, [fuse]);

  const open = useCallback(() => {
    setIsOpen(true);
    loadIndex();
  }, [loadIndex]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  // Listen for open-search event and Cmd+K
  useEffect(() => {
    const handleCustom = () => open();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open();
      }
      if (e.key === "Escape") close();
    };

    window.addEventListener("open-search", handleCustom);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-search", handleCustom);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  // Derive search results from query (no effect needed)
  const results = useMemo<readonly SearchResult[]>(() => {
    if (!fuse || !query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [query, fuse]);

  // Scroll selected result into view
  useEffect(() => {
    if (!resultsRef.current) return;
    const selected = resultsRef.current.querySelector(
      `[data-index="${selectedIndex}"]`
    );
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        window.location.href = results[selectedIndex].item.slug;
        close();
      }
    },
    [results, selectedIndex, close]
  );

  if (!isOpen) return null;

  const grouped = groupBySection(results);

  // Build a flat index mapping so keyboard nav works across grouped sections
  let flatIndex = 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className={
          "relative w-full max-w-xl rounded-xl border shadow-2xl " +
          "border-[#B9BEC9] bg-white " +
          "dark:border-white/10 dark:bg-[#161b22]"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Search Input ────────────────────────────────────────── */}
        <div
          className={
            "flex items-center gap-3 border-b px-4 " +
            "border-[#B9BEC9]/50 " +
            "dark:border-white/10"
          }
        >
          <Search
            size={18}
            className="shrink-0 text-[#5C6682] dark:text-[#8B92A6]"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className={
              "h-14 flex-1 bg-transparent text-sm outline-none " +
              "text-[#16254C] placeholder:text-[#8B92A6] " +
              "dark:text-white/90 dark:placeholder:text-[#8B92A6]"
            }
          />
          <button
            onClick={close}
            className={
              "rounded-lg p-1.5 transition-colors " +
              "text-[#8B92A6] hover:bg-[#E9E9ED] hover:text-[#16254C] " +
              "dark:hover:bg-white/10 dark:hover:text-white"
            }
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Results (grouped by section) ────────────────────────── */}
        {results.length > 0 && (
          <ul ref={resultsRef} className="max-h-80 overflow-y-auto p-2">
            {Array.from(grouped.entries()).map(
              ([section, sectionResults]) => (
                <li key={section}>
                  {/* Section label */}
                  <div
                    className={
                      "px-3 pb-1 pt-3 text-xs font-medium uppercase tracking-wider " +
                      "text-[#8B92A6]"
                    }
                  >
                    {section}
                  </div>

                  {/* Section items */}
                  <ul>
                    {sectionResults.map((result) => {
                      const currentIndex = flatIndex;
                      flatIndex += 1;
                      const isActive = currentIndex === selectedIndex;

                      return (
                        <li key={result.item.slug} data-index={currentIndex}>
                          <a
                            href={result.item.slug}
                            className={
                              "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors " +
                              (isActive
                                ? "bg-gradient-to-r from-[#9CF6F6]/30 to-[#0BB3B7]/20 "
                                : "hover:bg-[#E9E9ED] dark:hover:bg-white/5 ")
                            }
                            onMouseEnter={() =>
                              setSelectedIndex(currentIndex)
                            }
                          >
                            <FileText
                              size={16}
                              className={
                                "shrink-0 " +
                                (isActive
                                  ? "text-[#0BB3B7]"
                                  : "text-[#8B92A6]")
                              }
                            />
                            <div className="min-w-0 flex-1">
                              <div
                                className={
                                  "truncate text-sm font-medium " +
                                  "text-[#16254C] dark:text-white/90"
                                }
                              >
                                {result.item.title}
                              </div>
                              {result.item.section && (
                                <div className="mt-0.5 truncate text-xs text-[#8B92A6]">
                                  {result.item.section}
                                </div>
                              )}
                            </div>
                            {isActive && (
                              <ArrowRight
                                size={14}
                                className="shrink-0 text-[#0BB3B7]"
                              />
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )
            )}
          </ul>
        )}

        {/* ── Empty state ─────────────────────────────────────────── */}
        {query && results.length === 0 && (
          <div className="px-4 py-10 text-center">
            <Search
              size={32}
              className="mx-auto mb-3 text-[#B9BEC9] dark:text-white/20"
            />
            <p className="text-sm text-[#8B92A6]">
              No results found for &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-xs text-[#B9BEC9]">
              Try a different search term
            </p>
          </div>
        )}

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div
          className={
            "flex items-center justify-between border-t px-4 py-2.5 " +
            "border-[#B9BEC9]/50 text-xs text-[#8B92A6] " +
            "dark:border-white/10"
          }
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-[#B9BEC9] bg-white px-2 py-1 font-mono text-[10px] text-[#5C6682] dark:border-white/15 dark:bg-white/5 dark:text-white/60">
                &uarr;
              </kbd>
              <kbd className="rounded border border-[#B9BEC9] bg-white px-2 py-1 font-mono text-[10px] text-[#5C6682] dark:border-white/15 dark:bg-white/5 dark:text-white/60">
                &darr;
              </kbd>
              <span className="ml-0.5">navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-[#B9BEC9] bg-white px-2 py-1 font-mono text-[10px] text-[#5C6682] dark:border-white/15 dark:bg-white/5 dark:text-white/60">
                &crarr;
              </kbd>
              <span className="ml-0.5">select</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-[#B9BEC9] bg-white px-2 py-1 font-mono text-[10px] text-[#5C6682] dark:border-white/15 dark:bg-white/5 dark:text-white/60">
              Esc
            </kbd>
            <span className="ml-0.5">close</span>
          </span>
        </div>
      </div>
    </div>
  );
}
