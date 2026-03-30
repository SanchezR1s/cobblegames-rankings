import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Tier =
  | "unranked"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "champion"
  | "mythic";

export interface TierInfo {
  tier: Tier;
  label: string;
  minElo: number;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export const TIERS: TierInfo[] = [
  {
    tier: "unranked",
    label: "Sin Rango",
    minElo: 0,
    color: "#6b7280",
    bgColor: "rgba(107,114,128,0.12)",
    borderColor: "rgba(107,114,128,0.3)",
    textColor: "#9ca3af",
  },
  {
    tier: "bronze",
    label: "Bronce",
    minElo: 800,
    color: "#cd7f32",
    bgColor: "rgba(205,127,50,0.12)",
    borderColor: "rgba(205,127,50,0.3)",
    textColor: "#d4956a",
  },
  {
    tier: "silver",
    label: "Plata",
    minElo: 900,
    color: "#94a3b8",
    bgColor: "rgba(148,163,184,0.12)",
    borderColor: "rgba(148,163,184,0.3)",
    textColor: "#cbd5e1",
  },
  {
    tier: "gold",
    label: "Oro",
    minElo: 1000,
    color: "#f59e0b",
    bgColor: "rgba(245,158,11,0.12)",
    borderColor: "rgba(245,158,11,0.3)",
    textColor: "#fbbf24",
  },
  {
    tier: "platinum",
    label: "Platino",
    minElo: 1100,
    color: "#2dd4bf",
    bgColor: "rgba(45,212,191,0.12)",
    borderColor: "rgba(45,212,191,0.3)",
    textColor: "#5eead4",
  },
  {
    tier: "diamond",
    label: "Diamante",
    minElo: 1200,
    color: "#818cf8",
    bgColor: "rgba(129,140,248,0.12)",
    borderColor: "rgba(129,140,248,0.3)",
    textColor: "#a5b4fc",
  },
  {
    tier: "champion",
    label: "Campeón",
    minElo: 1350,
    color: "#f43f5e",
    bgColor: "rgba(244,63,94,0.12)",
    borderColor: "rgba(244,63,94,0.3)",
    textColor: "#fb7185",
  },
  {
    tier: "mythic",
    label: "Mítico",
    minElo: 1500,
    color: "#a855f7",
    bgColor: "rgba(168,85,247,0.12)",
    borderColor: "rgba(168,85,247,0.3)",
    textColor: "#c084fc",
  },
];

export function getTierInfo(elo: number): TierInfo {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (elo >= TIERS[i].minElo) return TIERS[i];
  }
  return TIERS[0];
}

export function formatElo(elo: number): string {
  return elo.toLocaleString("es-ES");
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export function formatPercent(ratio: number): string {
  return (ratio * 100).toFixed(1) + "%";
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return s > 0 ? `${m}m ${s}s` : `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return rm > 0 ? `${h}h ${rm}m` : `${h}h`;
}

export function formatRelativeTime(epochMs: number): string {
  const diff = Date.now() - epochMs;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return "ahora";
  if (minutes < 60) return `hace ${minutes}m`;
  if (hours < 24) return `hace ${hours}h`;
  if (days < 7) return `hace ${days}d`;
  return new Date(epochMs).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

export function eloDelta(delta: number): string {
  if (delta > 0) return `+${delta}`;
  return delta.toString();
}

export function avatarUrl(uuid: string, size = 32): string {
  return `https://crafatar.com/avatars/${uuid}?size=${size}&overlay`;
}
