"use client";

import { useState, useCallback, useRef, useSyncExternalStore } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface FeedbackWidgetProps {
  readonly slug: string;
}

interface FeedbackData {
  readonly vote: "up" | "down";
  readonly comment?: string;
  readonly timestamp: number;
}

function getStorageKey(slug: string): string {
  return `sp-feedback-${slug}`;
}

function useFeedbackStore(slug: string): FeedbackData | null {
  const key = getStorageKey(slug);

  // Cache the last raw string so getSnapshot returns a stable reference when
  // the underlying data has not changed. Without this, JSON.parse produces a
  // new object on every call and useSyncExternalStore treats every render as a
  // store update, preventing the submitted state from ever stabilising.
  const cacheRef = useRef<{ raw: string | undefined; value: FeedbackData | null }>({
    raw: undefined,
    value: null,
  });

  const subscribe = useCallback(
    (callback: () => void) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key) callback();
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    [key]
  );

  const getSnapshot = useCallback((): FeedbackData | null => {
    const raw = localStorage.getItem(key) ?? undefined;
    if (raw === cacheRef.current.raw) return cacheRef.current.value;
    cacheRef.current.raw = raw;
    if (!raw) {
      cacheRef.current.value = null;
      return null;
    }
    try {
      cacheRef.current.value = JSON.parse(raw) as FeedbackData;
    } catch {
      cacheRef.current.value = null;
    }
    return cacheRef.current.value;
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const getServerSnapshot = useCallback((): FeedbackData | null => null, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function saveFeedback(slug: string, data: FeedbackData): void {
  localStorage.setItem(getStorageKey(slug), JSON.stringify(data));
}

function sendBeacon(slug: string, data: FeedbackData): void {
  const url = process.env.NEXT_PUBLIC_FEEDBACK_WEBHOOK;
  if (!url) return;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug,
      vote: data.vote,
      comment: data.comment,
      timestamp: data.timestamp,
    }),
    keepalive: true,
  }).catch(() => {
    /* silently ignore beacon failures */
  });
}

export default function FeedbackWidget({ slug }: FeedbackWidgetProps) {
  const stored = useFeedbackStore(slug);
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isLocked = stored !== null || submitted;
  const activeVote = vote ?? stored?.vote ?? null;

  function handleVote(direction: "up" | "down") {
    if (isLocked) return;
    setVote(direction);
  }

  function handleSubmit() {
    if (!activeVote) return;
    const data: FeedbackData = {
      vote: activeVote,
      comment: comment.trim() || undefined,
      timestamp: Date.now(),
    };
    saveFeedback(slug, data);
    sendBeacon(slug, data);
    setSubmitted(true);
  }

  function handleDismiss() {
    if (!activeVote) return;
    const data: FeedbackData = {
      vote: activeVote,
      timestamp: Date.now(),
    };
    saveFeedback(slug, data);
    sendBeacon(slug, data);
    setSubmitted(true);
  }

  // Thank-you state
  if (isLocked) {
    return (
      <div className="mt-12 mb-4">
        <div aria-live="polite" className="text-sm text-sp-teal">
          Thanks for your feedback
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-4">
      <div
        role="group"
        aria-label="Page feedback"
        className="flex flex-col gap-3"
      >
        <p className="text-sm text-sp-text-secondary dark:text-white/60">
          Was this page helpful?
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-pressed={activeVote === "up"}
            onClick={() => handleVote("up")}
            className={[
              "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors",
              activeVote === "up"
                ? "border-sp-teal bg-sp-teal/10 text-sp-teal"
                : "border-sp-border text-sp-text-secondary hover:border-sp-teal hover:text-sp-teal dark:border-white/20 dark:text-white/60 dark:hover:border-sp-teal dark:hover:text-sp-teal",
            ].join(" ")}
          >
            <ThumbsUp className="h-4 w-4" />
            Yes
          </button>
          <button
            type="button"
            aria-pressed={activeVote === "down"}
            onClick={() => handleVote("down")}
            className={[
              "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors",
              activeVote === "down"
                ? "border-sp-teal bg-sp-teal/10 text-sp-teal"
                : "border-sp-border text-sp-text-secondary hover:border-sp-teal hover:text-sp-teal dark:border-white/20 dark:text-white/60 dark:hover:border-sp-teal dark:hover:text-sp-teal",
            ].join(" ")}
          >
            <ThumbsDown className="h-4 w-4" />
            No
          </button>
        </div>

        {activeVote !== null && (
          <div className="flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
            <label
              htmlFor={`feedback-comment-${slug}`}
              className="text-sm text-sp-text-secondary dark:text-white/60"
            >
              {activeVote === "down"
                ? "How can we improve this page?"
                : "What did you find helpful?"}
            </label>
            <textarea
              id={`feedback-comment-${slug}`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              className={[
                "w-full max-w-md resize-none rounded-md border border-sp-border bg-transparent px-3 py-2 text-sm",
                "text-sp-navy placeholder:text-sp-text-muted",
                "dark:border-white/20 dark:text-white dark:placeholder:text-white/40",
                "focus:border-sp-teal focus:outline-none focus:ring-1 focus:ring-sp-teal",
              ].join(" ")}
              placeholder="Optional"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                className={[
                  "rounded-md bg-sp-teal px-3 py-1.5 text-sm font-medium text-white transition-colors",
                  "hover:bg-sp-teal/90 focus:outline-none focus:ring-2 focus:ring-sp-teal focus:ring-offset-2",
                  "dark:focus:ring-offset-sp-navy",
                ].join(" ")}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="rounded-md px-3 py-1.5 text-sm text-sp-text-secondary transition-colors hover:text-sp-navy dark:text-white/60 dark:hover:text-white"
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>

      <div aria-live="polite" />
    </div>
  );
}
