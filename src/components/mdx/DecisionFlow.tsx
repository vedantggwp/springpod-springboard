interface DecisionStepProps {
  readonly question: string;
  readonly yes: string;
  readonly yesHref?: string;
  readonly no?: string;
  readonly isLast?: boolean;
}

function DecisionStep({
  question,
  yes,
  yesHref,
  no,
  isLast = false,
}: DecisionStepProps) {
  return (
    <div className="relative pl-6">
      {/* Vertical connector line */}
      <div
        className="absolute left-[11px] top-0 w-0.5 bg-sp-teal/30"
        style={{ height: isLast ? "1.25rem" : "100%" }}
        aria-hidden="true"
      />

      {/* Node dot */}
      <div
        className="absolute left-0 top-1 h-[22px] w-[22px] rounded-full border-2 border-sp-teal bg-white dark:bg-card"
        aria-hidden="true"
      />

      <div className="pb-6">
        <p className="text-sm font-medium text-sp-navy dark:text-white">
          {question}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-sp-teal/10 px-2.5 py-1 text-xs font-semibold text-sp-teal">
            YES
          </span>
          <span className="text-sm text-sp-text-secondary dark:text-white/60">→</span>
          {yesHref ? (
            <a
              href={yesHref}
              className="text-sm font-medium text-sp-teal underline-offset-2 hover:underline"
            >
              {yes}
            </a>
          ) : (
            <span className="text-sm text-sp-text-secondary dark:text-white/60">
              {yes}
            </span>
          )}
        </div>

        {no && (
          <div className="mt-1.5 flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-sp-navy/10 px-2.5 py-1 text-xs font-semibold text-sp-text-secondary dark:bg-white/10 dark:text-white/50">
              NO
            </span>
            <span className="text-sm text-sp-text-secondary dark:text-white/60">
              ↓ {no}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface DecisionFlowProps {
  readonly children: React.ReactNode;
}

function DecisionFlow({ children }: DecisionFlowProps) {
  return (
    <div className="my-4 rounded-xl border border-sp-border bg-white p-5 dark:border-white/10 dark:bg-card">
      {children}
    </div>
  );
}

export { DecisionFlow, DecisionStep };
