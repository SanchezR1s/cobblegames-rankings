import { cn } from "@/lib/utils";

interface RankNumberProps {
  rank: number;
}

export default function RankNumber({ rank }: RankNumberProps) {
  if (rank === 1) {
    return (
      <span className="rank-badge bg-rank-first/15 text-rank-first border border-rank-first/30">
        1
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="rank-badge bg-rank-second/15 text-rank-second border border-rank-second/30">
        2
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="rank-badge bg-rank-third/15 text-rank-third border border-rank-third/30">
        3
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 text-xs font-mono text-gray-500">
      {rank}
    </span>
  );
}
