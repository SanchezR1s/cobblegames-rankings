import { getTierInfo } from "@/lib/utils";

interface TierBadgeProps {
  elo: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const TIER_ICONS: Record<string, string> = {
  unranked: "?",
  bronze: "✦",
  silver: "✦",
  gold: "✦",
  platinum: "✦",
  diamond: "◆",
  champion: "★",
  mythic: "✸",
};

export default function TierBadge({ elo, showLabel = false, size = "md" }: TierBadgeProps) {
  const info = getTierInfo(elo);

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-semibold font-mono whitespace-nowrap ${sizeClasses[size]}`}
      style={{
        backgroundColor: info.bgColor,
        border: `1px solid ${info.borderColor}`,
        color: info.textColor,
      }}
    >
      <span>{TIER_ICONS[info.tier]}</span>
      {showLabel ? info.label : elo.toLocaleString("es-ES")}
    </span>
  );
}
