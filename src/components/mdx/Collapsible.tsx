"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

type CollapsibleVariant = "info" | "warning" | "tip" | "example";

interface CollapsibleProps {
  readonly title: string;
  readonly children: React.ReactNode;
  readonly variant?: CollapsibleVariant;
}

interface VariantStyle {
  readonly gradient: string;
  readonly darkGradient: string;
  readonly border: string;
  readonly chevronColor: string;
}

const variantStyles: Record<CollapsibleVariant, VariantStyle> = {
  info: {
    gradient: "from-[#9CF6F6]/30 to-[#0BB3B7]/10",
    darkGradient: "dark:from-[#9CF6F6]/10 dark:to-[#0BB3B7]/5",
    border: "border-[#0BB3B7]",
    chevronColor: "text-[#0BB3B7]",
  },
  warning: {
    gradient: "from-[#FF475A]/10 to-[#FF475A]/5",
    darkGradient: "dark:from-[#FF475A]/8 dark:to-[#FF475A]/3",
    border: "border-[#FF475A]",
    chevronColor: "text-[#FF475A]",
  },
  tip: {
    gradient: "from-[#0BB3B7]/10 to-[#9CF6F6]/20",
    darkGradient: "dark:from-[#0BB3B7]/8 dark:to-[#9CF6F6]/5",
    border: "border-[#0BB3B7]",
    chevronColor: "text-[#0BB3B7]",
  },
  example: {
    gradient: "from-[#446DF6]/10 to-[#446DF6]/5",
    darkGradient: "dark:from-[#446DF6]/8 dark:to-[#446DF6]/3",
    border: "border-[#446DF6]",
    chevronColor: "text-[#446DF6]",
  },
};

export default function Collapsible({
  title,
  children,
  variant = "info",
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const styles = variantStyles[variant];

  return (
    <div
      className={[
        "my-4 overflow-hidden rounded-xl border-l-4 bg-gradient-to-r",
        styles.gradient,
        styles.darkGradient,
        styles.border,
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 px-6 py-4 text-left"
        aria-expanded={isOpen}
      >
        <ChevronRight
          size={18}
          className={[
            "shrink-0 transition-transform duration-200",
            styles.chevronColor,
            isOpen ? "rotate-90" : "",
          ].join(" ")}
        />
        <span className="font-medium text-[#16254C] dark:text-white">
          {title}
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-200 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-0 text-sm text-[#2D3B5E] dark:text-white/70">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
