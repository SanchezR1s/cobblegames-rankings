import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: "purple" | "cyan" | "pink";
  icon?: ReactNode;
  className?: string;
}

const accentMap = {
  purple: "text-accent-purple",
  cyan: "text-accent-cyan",
  pink: "text-accent-pink",
};

export default function StatCard({
  label,
  value,
  sub,
  accent = "cyan",
  icon,
  className,
}: StatCardProps) {
  return (
    <div className={cn("card p-5 flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
        {icon && <span className={cn("opacity-60", accentMap[accent])}>{icon}</span>}
      </div>
      <span className={cn("text-2xl font-bold tabular-nums", accentMap[accent])}>
        {typeof value === "number" ? value.toLocaleString("es-ES") : value}
      </span>
      {sub && <span className="text-xs text-gray-500">{sub}</span>}
    </div>
  );
}
