"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  readonly text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available; silently fail
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={[
        "flex items-center gap-1.5 rounded-lg px-3 py-1",
        "bg-[#0BB3B7]/20 text-sm text-white",
        "transition-colors duration-150",
        "hover:bg-[#0BB3B7]/30",
      ].join(" ")}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <>
          <Check size={14} />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
