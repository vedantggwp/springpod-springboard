interface ChecklistProps {
  readonly children: React.ReactNode;
}

export default function Checklist({ children }: ChecklistProps) {
  return (
    <div className="my-4 flex flex-col gap-3" role="list">
      {children}
    </div>
  );
}
