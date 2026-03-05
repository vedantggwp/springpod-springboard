interface CardGridProps {
  readonly children: React.ReactNode;
}

export default function CardGrid({ children }: CardGridProps) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {children}
    </div>
  );
}
