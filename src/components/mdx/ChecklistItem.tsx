"use client";

import { useState, useEffect } from "react";

interface ChecklistItemProps {
  readonly id: string;
  readonly label: string;
  readonly children?: React.ReactNode;
}

function getStorageKey(id: string): string {
  return `vcf-checklist-${id}`;
}

export default function ChecklistItem({
  id,
  label,
  children,
}: ChecklistItemProps) {
  const [checked, setChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(id));
    if (stored === "true") {
      setChecked(true);
    }
    setMounted(true);
  }, [id]);

  function handleToggle() {
    const next = !checked;
    setChecked(next);
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
            "h-4 w-4 shrink-0 cursor-pointer rounded-[4px] border-2 border-[#B9BEC9]",
            "appearance-none transition-colors duration-150",
            "checked:border-[#0BB3B7] checked:bg-[#0BB3B7]",
            "dark:border-white/20 dark:checked:border-[#0BB3B7] dark:checked:bg-[#0BB3B7]",
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
            "text-sm text-[#16254C] transition-colors duration-150 dark:text-white",
            checked ? "text-[#8B92A6] line-through dark:text-white/40" : "",
          ].join(" ")}
        >
          {label}
        </span>
      </label>
      {children && (
        <div className="ml-7 text-sm text-[#5C6682] dark:text-white/60">
          {children}
        </div>
      )}
    </div>
  );
}
