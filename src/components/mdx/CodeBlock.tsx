import { codeToHtml } from "shiki";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  readonly code: string;
  readonly language?: string;
  readonly filename?: string;
}

export default async function CodeBlock({
  code,
  language = "text",
  filename,
}: CodeBlockProps) {
  const highlighted = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  const label = filename ?? language;

  return (
    <div className="group relative my-4 overflow-hidden rounded-xl bg-gradient-to-br from-[#16254C] to-[#2D3B5E]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <span className="text-sm text-[#8B92A6]">{label}</span>
        <CopyButton text={code} />
      </div>

      {/* Code content */}
      <div
        className={[
          "overflow-x-auto px-6 py-4 text-sm leading-relaxed text-[#9CF6F6]",
          "[&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0",
          "[&_code]:!bg-transparent [&_code]:!text-[#9CF6F6]",
        ].join(" ")}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}
