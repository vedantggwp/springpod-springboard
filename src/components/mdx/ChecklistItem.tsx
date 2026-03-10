"use client";

import { useState, useSyncExternalStore, useCallback } from "react";

interface ChecklistItemProps {
  readonly id: string;
  readonly label: string;
  readonly children?: React.ReactNode;
}

function getStorageKey(id: string): string {
  return `sp-checklist-${id}`;
}

function useLocalStorageChecked(id: string) {
  const key = getStorageKey(id);
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
  const getSnapshot = useCallback(
    () => localStorage.getItem(key) === "true",
    [key]
  );
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function ChecklistItem({
  id,
  label,
  children,
}: ChecklistItemProps) {
  const storedChecked = useLocalStorageChecked(id);
  const [localChecked, setLocalChecked] = useState<boolean | null>(null);
  const checked = localChecked ?? storedChecked;
  const mounted = typeof window !== "undefined";

  function handleToggle() {
    const next = !checked;
    setLocalChecked(next);
    localStorage.setItem(getStorageKey(id), String(next));
  }

  return (
    <div className="flex flex-col gap-1" role="listitem">
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className={[
            "h-4 w-4 shrink-0 cursor-pointer rounded-[4px] border-2 border-sp-border",
            "appearance-none transition-colors duration-150",
            "checked:border-sp-teal checked:bg-sp-teal",
            "dark:border-white/20 dark:checked:border-sp-teal dark:checked:bg-sp-teal",
          ].join(" ")}
          style={
            mounted && checked
              ? {
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E\")",
                  backgroundSize: "100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : undefined
          }
          aria-label={label}
        />
        <span
          className={[
            "text-sm text-sp-navy transition-colors duration-150 dark:text-white",
            checked ? "text-sp-text-muted line-through dark:text-white/40" : "",
          ].join(" ")}
        >
          {label}
        </span>
      </label>
      {children && (
        <div className="ml-7 text-sm text-sp-text-secondary dark:text-white/60">
          {children}
        </div>
      )}
    </div>
  );
}
