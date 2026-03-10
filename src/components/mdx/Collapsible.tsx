"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

type CollapsibleVariant = "info" | "warning" | "tip" | "example" | "why" | "how";

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
    gradient: "from-sp-teal-light/30 to-sp-teal/10",
    darkGradient: "dark:from-sp-teal-light/10 dark:to-sp-teal/5",
    border: "border-sp-teal",
    chevronColor: "text-sp-teal",
  },
  warning: {
    gradient: "from-sp-red/10 to-sp-red/5",
    darkGradient: "dark:from-sp-red/8 dark:to-sp-red/3",
    border: "border-sp-red",
    chevronColor: "text-sp-red",
  },
  tip: {
    gradient: "from-sp-teal/10 to-sp-teal-light/20",
    darkGradient: "dark:from-sp-teal/8 dark:to-sp-teal-light/5",
    border: "border-sp-teal",
    chevronColor: "text-sp-teal",
  },
  example: {
    gradient: "from-sp-blue/10 to-sp-blue/5",
    darkGradient: "dark:from-sp-blue/8 dark:to-sp-blue/3",
    border: "border-sp-blue",
    chevronColor: "text-sp-blue",
  },
  why: {
    gradient: "from-sp-blue/10 to-sp-blue/5",
    darkGradient: "dark:from-sp-blue/8 dark:to-sp-blue/3",
    border: "border-sp-blue",
    chevronColor: "text-sp-blue",
  },
  how: {
    gradient: "from-[#10B981]/10 to-[#10B981]/5",
    darkGradient: "dark:from-[#10B981]/8 dark:to-[#10B981]/3",
    border: "border-[#10B981]",
    chevronColor: "text-[#10B981]",
  },
};

const variantEmoji: Partial<Record<CollapsibleVariant, string>> = {
  why: "\u{1F4A1} ",
  how: "\u{1F527} ",
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
        <span className="font-medium text-sp-navy dark:text-white">
          {variantEmoji[variant] ?? ""}{title}
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-200 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-0 text-sm text-sp-navy-light dark:text-white/70">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
