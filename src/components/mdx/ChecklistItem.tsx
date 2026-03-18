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
            "sp-check h-4 w-4 shrink-0 cursor-pointer rounded-[4px] border-2 border-sp-border",
            "appearance-none transition-colors duration-150",
            "checked:border-sp-teal checked:bg-sp-teal",
            "dark:border-white/20 dark:checked:border-sp-teal dark:checked:bg-sp-teal",
          ].join(" ")}
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
