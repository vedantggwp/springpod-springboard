"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-md
        text-sp-text-muted transition-colors
        hover:bg-sp-surface hover:text-sp-navy
        dark:hover:bg-white/10 dark:hover:text-white"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
