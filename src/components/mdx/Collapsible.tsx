"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { tealVariant, redVariant, blueVariant } from "./variant-styles";

type CollapsibleVariant = "info" | "warning" | "tip" | "example" | "why" | "how";

interface CollapsibleProps {
  readonly title: string;
  readonly children: React.ReactNode;
  readonly variant?: CollapsibleVariant;
}

interface VariantStyle {
  readonly bg: string;
  readonly border: string;
  readonly chevronColor: string;
}

const variantStyles: Record<CollapsibleVariant, VariantStyle> = {
  info: { ...tealVariant, chevronColor: tealVariant.accentColor },
  warning: { ...redVariant, chevronColor: redVariant.accentColor },
  tip: { ...tealVariant, chevronColor: tealVariant.accentColor },
  example: { ...blueVariant, chevronColor: blueVariant.accentColor },
  why: { ...blueVariant, chevronColor: blueVariant.accentColor },
  how: { ...tealVariant, chevronColor: tealVariant.accentColor },
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
        "my-4 overflow-hidden rounded-lg",
        isOpen ? `border-l-4 ${styles.bg} ${styles.border}` : "",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 px-6 py-4 text-left
          focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-teal focus-visible:ring-offset-2 ring-offset-[var(--sp-ring-offset)]"
        aria-expanded={isOpen}
      >
        <ChevronRight
          size={18}
          className={[
            "shrink-0 transition-transform duration-150 ease-out",
            styles.chevronColor,
            isOpen ? "rotate-90" : "",
          ].join(" ")}
        />
        <span className="font-medium text-sp-navy dark:text-white">
          {title}
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-150 ease-out"
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
