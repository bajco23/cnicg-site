import { cn } from "@/lib/utils";

export default function StatPill({
  label,
  value,
  className,
  testId,
}: {
  label: string;
  value: string;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      data-testid={testId}
      className={cn(
        "rounded-2xl border border-border/60 bg-card/40 backdrop-blur px-4 py-3 shadow-[var(--shadow-2xs)]",
        "transition-all duration-300 hover:shadow-[var(--shadow-xs)]",
        className,
      )}
    >
      <div className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-display text-lg tracking-tight">{value}</div>
    </div>
  );
}
