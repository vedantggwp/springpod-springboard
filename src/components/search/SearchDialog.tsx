"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fuse, setFuse] = useState<Fuse<SearchEntry> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

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
    triggerRef.current = document.activeElement;
    setIsOpen(true);
    loadIndex();
  }, [loadIndex]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
    // Restore focus to the element that opened the dialog
    if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
    triggerRef.current = null;
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
        router.push(results[selectedIndex].item.slug);
        close();
      } else if (e.key === "Tab") {
        // Focus trap within dialog
        e.preventDefault();
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'input, button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
          } else {
            // Find previous focusable
            for (let i = focusable.length - 1; i >= 0; i--) {
              if (focusable[i] === document.activeElement && i > 0) {
                focusable[i - 1].focus();
                break;
              }
            }
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
          } else {
            for (let i = 0; i < focusable.length; i++) {
              if (focusable[i] === document.activeElement && i < focusable.length - 1) {
                focusable[i + 1].focus();
                break;
              }
            }
          }
        }
      }
    },
    [results, selectedIndex, close, router]
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        className={
          "relative w-full max-w-xl rounded-lg border shadow-sp-search " +
          "border-sp-border bg-white " +
          "dark:border-white/10 dark:bg-card"
        }
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* ── Search Input ────────────────────────────────────────── */}
        <div
          className={
            "flex items-center gap-3 border-b px-4 " +
            "border-sp-border/50 " +
            "dark:border-white/10"
          }
        >
          <Search
            size={18}
            className="shrink-0 text-sp-text-secondary dark:text-sp-text-muted"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className={
              "h-14 flex-1 bg-transparent text-sm " +
              "text-sp-navy placeholder:text-sp-text-muted " +
              "dark:text-white/90 dark:placeholder:text-sp-text-muted " +
              "focus:outline-none"
            }
          />
          <button
            onClick={close}
            className={
              "rounded-md p-1.5 transition-colors duration-150 ease-out " +
              "text-sp-text-muted hover:bg-sp-surface hover:text-sp-navy " +
              "dark:hover:bg-white/10 dark:hover:text-white " +
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-teal focus-visible:ring-offset-2 ring-offset-[var(--sp-ring-offset)]"
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
                      "text-sp-text-muted"
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
                              "flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors duration-150 ease-out " +
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-teal focus-visible:ring-offset-2 ring-offset-[var(--sp-ring-offset)] " +
                              (isActive
                                ? "bg-sp-teal/[0.08] "
                                : "hover:bg-sp-surface dark:hover:bg-white/5 ")
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
                                  ? "text-sp-teal"
                                  : "text-sp-text-muted")
                              }
                            />
                            <div className="min-w-0 flex-1">
                              <div
                                className={
                                  "truncate text-sm font-medium " +
                                  "text-sp-navy dark:text-white/90"
                                }
                              >
                                {result.item.title}
                              </div>
                              {result.item.section && (
                                <div className="mt-0.5 truncate text-xs text-sp-text-muted">
                                  {result.item.section}
                                </div>
                              )}
                            </div>
                            {isActive && (
                              <ArrowRight
                                size={14}
                                className="shrink-0 text-sp-teal"
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
              className="mx-auto mb-3 text-sp-border dark:text-white/20"
            />
            <p className="text-sm text-sp-text-muted">
              No results found for &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-xs text-sp-border">
              Try a different search term
            </p>
          </div>
        )}

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div
          className={
            "flex items-center justify-between border-t px-4 py-2.5 " +
            "border-sp-border/50 text-xs text-sp-text-muted " +
            "dark:border-white/10"
          }
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-sp-border bg-white px-2 py-1 font-mono text-[10px] text-sp-text-secondary dark:border-white/15 dark:bg-white/5 dark:text-white/60">
                &uarr;
              </kbd>
              <kbd className="rounded border border-sp-border bg-white px-2 py-1 font-mono text-[10px] text-sp-text-secondary dark:border-white/15 dark:bg-white/5 dark:text-white/60">
                &darr;
              </kbd>
              <span className="ml-0.5">navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-sp-border bg-white px-2 py-1 font-mono text-[10px] text-sp-text-secondary dark:border-white/15 dark:bg-white/5 dark:text-white/60">
                &crarr;
              </kbd>
              <span className="ml-0.5">select</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-sp-border bg-white px-2 py-1 font-mono text-[10px] text-sp-text-secondary dark:border-white/15 dark:bg-white/5 dark:text-white/60">
              Esc
            </kbd>
            <span className="ml-0.5">close</span>
          </span>
        </div>
      </div>
    </div>
  );
}
