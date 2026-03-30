import Link from "next/link";
import type { HgPlayerStats } from "@/lib/api";
import { formatPercent, formatNumber, eloDelta, getTierInfo } from "@/lib/utils";
import TierBadge from "./TierBadge";
import RankNumber from "./RankNumber";
import PlayerAvatar from "./PlayerAvatar";

interface HgTableProps {
  players: HgPlayerStats[];
  offset?: number;
}

export default function HgTable({ players, offset = 0 }: HgTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-bg-border text-gray-500 text-xs uppercase tracking-wider">
            <th className="text-left px-4 py-3 w-10">#</th>
            <th className="text-left px-4 py-3">Jugador</th>
            <th className="text-right px-4 py-3">ELO</th>
            <th className="text-right px-4 py-3 hidden sm:table-cell">Victorias</th>
            <th className="text-right px-4 py-3 hidden sm:table-cell">Partidas</th>
            <th className="text-right px-4 py-3 hidden md:table-cell">Win%</th>
            <th className="text-right px-4 py-3 hidden md:table-cell">Kills</th>
            <th className="text-right px-4 py-3 hidden lg:table-cell">Duelos</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-bg-border">
          {players.map((p, i) => {
            const rank = offset + i + 1;
            const tierInfo = getTierInfo(p.elo);
            return (
              <tr
                key={p.uuid}
                className="table-row-hover group"
                style={rank <= 3 ? { backgroundColor: `${tierInfo.bgColor}` } : undefined}
              >
                <td className="px-4 py-3">
                  <RankNumber rank={rank} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/player/${p.uuid}`}
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <PlayerAvatar uuid={p.uuid} username={p.username} size={32} />
                    <div className="flex flex-col">
                      <span className="font-medium text-white group-hover:text-accent-purple transition-colors">
                        {p.username}
                      </span>
                      <span className="text-[11px] text-gray-500 hidden sm:block">
                        {p.current_streak > 0 ? `🔥 ${p.current_streak} racha` : ""}
                      </span>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-right">
                  <TierBadge elo={p.elo} />
                </td>
                <td className="px-4 py-3 text-right hidden sm:table-cell font-mono text-white">
                  {p.wins.toLocaleString("es-ES")}
                </td>
                <td className="px-4 py-3 text-right hidden sm:table-cell font-mono text-gray-400">
                  {p.matches.toLocaleString("es-ES")}
                </td>
                <td className="px-4 py-3 text-right hidden md:table-cell font-mono text-gray-400">
                  {formatPercent(p.win_rate)}
                </td>
                <td className="px-4 py-3 text-right hidden md:table-cell font-mono text-gray-400">
                  {formatNumber(p.kills)}
                </td>
                <td className="px-4 py-3 text-right hidden lg:table-cell font-mono text-gray-400">
                  {formatNumber(p.duel_wins)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
