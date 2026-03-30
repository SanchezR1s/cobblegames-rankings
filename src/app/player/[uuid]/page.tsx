import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import TierBadge from "@/components/TierBadge";
import StatCard from "@/components/StatCard";
import {
  getPlayer,
  getPlayerHgMatches,
  getPlayerDuelMatches,
  type HgMatch,
  type DuelMatch,
} from "@/lib/api";
import {
  formatPercent,
  formatDuration,
  formatRelativeTime,
  eloDelta,
  avatarUrl,
  getTierInfo,
  cn,
} from "@/lib/utils";

export const revalidate = 60;

const UUID_REGEX = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uuid: string }>;
}): Promise<Metadata> {
  const { uuid } = await params;
  if (!UUID_REGEX.test(uuid)) return { title: "Jugador no encontrado" };
  try {
    const player = await getPlayer(uuid);
    return {
      title: player.username,
      description: `Estadísticas de ${player.username} en Cobblegames`,
    };
  } catch {
    return { title: "Jugador no encontrado" };
  }
}

function EloDeltaBadge({ delta }: { delta: number }) {
  if (delta === 0) return <span className="text-gray-500 font-mono text-xs">+0</span>;
  const positive = delta > 0;
  return (
    <span
      className={cn(
        "font-mono text-xs font-medium",
        positive ? "text-emerald-400" : "text-red-400"
      )}
    >
      {eloDelta(delta)}
    </span>
  );
}

function HgMatchRow({ match }: { match: HgMatch }) {
  const won = match.placement === 1;
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-bg-border last:border-0 hover:bg-bg-hover transition-colors">
      <div
        className={cn(
          "w-1.5 h-8 rounded-full shrink-0",
          won ? "bg-emerald-500" : "bg-gray-600"
        )}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-medium", won ? "text-emerald-400" : "text-gray-300")}>
            {won ? "Victoria" : `#${match.placement}`}
          </span>
          <span className="text-xs text-gray-500 font-mono truncate hidden sm:block">
            {match.template_id}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          {match.kills} kills · {match.player_count} jugadores · {formatDuration(match.duration_seconds)}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <EloDeltaBadge delta={match.elo_delta} />
        <span className="text-xs text-gray-500">{formatRelativeTime(match.started_at)}</span>
      </div>
    </div>
  );
}

function DuelMatchRow({ match, myUuid }: { match: DuelMatch; myUuid: string }) {
  const won = match.winner_uuid === myUuid;
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-bg-border last:border-0 hover:bg-bg-hover transition-colors">
      <div
        className={cn(
          "w-1.5 h-8 rounded-full shrink-0",
          won ? "bg-emerald-500" : "bg-red-500/60"
        )}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-medium", won ? "text-emerald-400" : "text-red-400")}>
            {won ? "Victoria" : "Derrota"}
          </span>
          <span className="text-xs text-gray-400">vs</span>
          <Link
            href={`/player/${match.opponent_uuid}`}
            className="text-sm text-gray-300 hover:text-white transition-colors truncate"
          >
            {match.opponent_name}
          </Link>
          {match.is_ranked && (
            <span className="text-[10px] bg-accent-purple/15 text-accent-purple border border-accent-purple/30 px-1.5 py-0.5 rounded font-medium hidden sm:inline">
              RANKED
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          {formatDuration(match.duration_seconds)}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <EloDeltaBadge delta={match.elo_delta} />
        <span className="text-xs text-gray-500">{formatRelativeTime(match.played_at)}</span>
      </div>
    </div>
  );
}

export default async function PlayerPage({
  params,
  searchParams,
}: {
  params: Promise<{ uuid: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { uuid } = await params;
  const { tab: tabParam } = await searchParams;

  if (!UUID_REGEX.test(uuid)) notFound();

  let player;
  try {
    player = await getPlayer(uuid);
  } catch {
    notFound();
  }

  const tab = tabParam === "duels" ? "duels" : "hg";

  const [hgMatches, duelMatches] = await Promise.allSettled([
    getPlayerHgMatches(uuid, 20, 0),
    getPlayerDuelMatches(uuid, 20, 0),
  ]);

  const hgMatchList = hgMatches.status === "fulfilled" ? hgMatches.value.data : [];
  const duelMatchList = duelMatches.status === "fulfilled" ? duelMatches.value.data : [];

  const hg = player.hg;
  const duels = player.duels;
  const mainElo = hg?.elo ?? duels?.elo ?? 1000;
  const tierInfo = getTierInfo(mainElo);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero / Profile header */}
      <div
        className="border-b border-bg-border"
        style={{
          background: `linear-gradient(135deg, ${tierInfo.bgColor} 0%, transparent 60%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div
              className="rounded-xl overflow-hidden shrink-0 border-2"
              style={{ borderColor: tierInfo.borderColor }}
            >
              <Image
                src={avatarUrl(player.uuid, 128)}
                alt={player.username}
                width={72}
                height={72}
                unoptimized
                className="block"
              />
            </div>

            {/* Name + tier */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{player.username}</h1>
                <TierBadge elo={mainElo} showLabel size="lg" />
              </div>
              <p className="text-sm text-gray-400 mt-1 font-mono">{player.uuid}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Stats grid */}
        {hg && (
          <section>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Hunger Games
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard label="ELO" value={hg.elo} accent="purple" />
              <StatCard label="Victorias" value={hg.wins} accent="purple" />
              <StatCard label="Partidas" value={hg.matches} accent="purple" />
              <StatCard label="Win Rate" value={formatPercent(hg.win_rate)} accent="purple" />
              <StatCard label="Kills" value={hg.kills} accent="purple" />
              <StatCard label="Mejor Racha" value={hg.best_streak} accent="purple" />
            </div>
          </section>
        )}

        {duels && (
          <section>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Duelos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <StatCard label="ELO" value={duels.elo} accent="cyan" />
              <StatCard label="Victorias" value={duels.wins} accent="cyan" />
              <StatCard label="Derrotas" value={duels.losses} accent="cyan" />
              <StatCard label="Win Rate" value={formatPercent(duels.win_rate)} accent="cyan" />
              <StatCard label="Mejor Racha" value={duels.best_streak} accent="cyan" />
            </div>
          </section>
        )}

        {/* Match history */}
        <div className="card overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-1 px-4 pt-4 pb-0 border-b border-bg-border">
            <Link
              href={`/player/${player.uuid}?tab=hg`}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors -mb-px",
                tab === "hg"
                  ? "border-accent-purple text-accent-purple bg-accent-purple/5"
                  : "border-transparent text-gray-400 hover:text-white"
              )}
            >
              Historial HG
            </Link>
            <Link
              href={`/player/${player.uuid}?tab=duels`}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors -mb-px",
                tab === "duels"
                  ? "border-accent-cyan text-accent-cyan bg-accent-cyan/5"
                  : "border-transparent text-gray-400 hover:text-white"
              )}
            >
              Historial Duelos
            </Link>
          </div>

          <div className="divide-y divide-bg-border animate-fade-in">
            {tab === "hg" ? (
              hgMatchList.length > 0 ? (
                hgMatchList.map((m) => <HgMatchRow key={m.match_id} match={m} />)
              ) : (
                <div className="py-12 text-center text-gray-500 text-sm">
                  Sin partidas registradas
                </div>
              )
            ) : duelMatchList.length > 0 ? (
              duelMatchList.map((m) => (
                <DuelMatchRow key={m.match_id} match={m} myUuid={player.uuid} />
              ))
            ) : (
              <div className="py-12 text-center text-gray-500 text-sm">
                Sin duelos registrados
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
