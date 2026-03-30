import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-bg-elevated rounded animate-pulse",
        className
      )}
    />
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <Skeleton className="w-7 h-5" />
      <Skeleton className="w-8 h-8 rounded-md flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-1.5">
        <Skeleton className="w-28 h-4" />
        <Skeleton className="w-16 h-3" />
      </div>
      <Skeleton className="w-16 h-6 rounded-md" />
      <Skeleton className="w-12 h-4 hidden sm:block" />
      <Skeleton className="w-12 h-4 hidden sm:block" />
      <Skeleton className="w-12 h-4 hidden md:block" />
    </div>
  );
}

export function SkeletonTable({ rows = 20 }: { rows?: number }) {
  return (
    <div className="divide-y divide-bg-border">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
