interface HeroBadgeProps {
  readonly children: React.ReactNode;
}

export default function HeroBadge({ children }: HeroBadgeProps) {
  return (
    <span className="inline-block rounded-full bg-gradient-to-r from-[#9CF6F6]/40 to-[#0BB3B7]/20 px-4 py-2 dark:from-[#9CF6F6]/20 dark:to-[#0BB3B7]/10">
      <span className="bg-gradient-to-r from-[#16254C] to-[#0BB3B7] bg-clip-text text-sm font-medium text-transparent dark:from-[#9CF6F6] dark:to-[#0BB3B7]">
        {children}
      </span>
    </span>
  );
}
