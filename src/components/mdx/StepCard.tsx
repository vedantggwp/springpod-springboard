interface StepCardProps {
  readonly number: number;
  readonly title: string;
  readonly children: React.ReactNode;
}

export default function StepCard({ number, title, children }: StepCardProps) {
  return (
    <div
      className={[
        "my-4 flex gap-4 rounded-xl border border-[#B9BEC9] bg-white p-5",
        "transition-shadow duration-200 hover:shadow-md",
        "dark:border-white/10 dark:bg-[#161b22]",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center",
          "rounded-lg bg-gradient-to-br from-[#16254C] to-[#0BB3B7]",
          "text-sm font-bold text-white",
        ].join(" ")}
        aria-hidden="true"
      >
        {number}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="mb-1 text-lg font-medium text-[#16254C] dark:text-white">
          {title}
        </h4>
        <div className="text-sm text-[#5C6682] dark:text-white/60">
          {children}
        </div>
      </div>
    </div>
  );
}
