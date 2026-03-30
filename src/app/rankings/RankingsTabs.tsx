"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface RankingsTabsProps {
  activeTab: "hg" | "duels";
}

export default function RankingsTabs({ activeTab }: RankingsTabsProps) {
  return (
    <div className="flex items-center gap-1 px-4 pt-4 pb-0 border-b border-bg-border">
      <Link
        href="/rankings?tab=hg"
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors -mb-px",
          activeTab === "hg"
            ? "border-accent-purple text-accent-purple bg-accent-purple/5"
            : "border-transparent text-gray-400 hover:text-white hover:bg-bg-hover"
        )}
      >
        Hunger Games
      </Link>
      <Link
        href="/rankings?tab=duels"
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors -mb-px",
          activeTab === "duels"
            ? "border-accent-cyan text-accent-cyan bg-accent-cyan/5"
            : "border-transparent text-gray-400 hover:text-white hover:bg-bg-hover"
        )}
      >
        Duelos
      </Link>
    </div>
  );
}
