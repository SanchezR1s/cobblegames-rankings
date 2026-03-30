const API_BASE = process.env.API_URL || "http://193.31.31.225:3226";

export interface HgPlayerStats {
  uuid: string;
  username: string;
  elo: number;
  wins: number;
  matches: number;
  kills: number;
  duel_wins: number;
  win_rate: number;
  best_streak: number;
  current_streak: number;
  last_seen: number;
}

export interface DuelPlayerStats {
  uuid: string;
  username: string;
  elo: number;
  wins: number;
  losses: number;
  matches: number;
  win_rate: number;
  best_streak: number;
  current_streak: number;
  last_seen: number;
}

export interface HgMatch {
  match_id: string;
  template_id: string;
  started_at: number;
  ended_at: number;
  duration_seconds: number;
  player_count: number;
  winner_uuid: string;
  winner_name: string;
  placement: number;
  kills: number;
  elo_delta: number;
  elo_after: number;
}

export interface DuelMatch {
  match_id: string;
  opponent_uuid: string;
  opponent_name: string;
  winner_uuid: string;
  played_at: number;
  duration_seconds: number;
  is_ranked: boolean;
  elo_delta: number;
  elo_after: number;
}

export interface PlayerProfile {
  uuid: string;
  username: string;
  hg: HgPlayerStats | null;
  duels: DuelPlayerStats | null;
}

export interface SummaryStats {
  total_players: number;
  total_hg_matches: number;
  total_duel_matches: number;
}

export interface RankingsResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function getHgRankings(
  sort: "elo" | "wins" | "duel_wins" = "elo",
  limit = 50,
  offset = 0
): Promise<RankingsResponse<HgPlayerStats>> {
  return apiFetch(`/api/v1/rankings/hg?sort=${sort}&limit=${limit}&offset=${offset}`);
}

export async function getDuelRankings(
  sort: "elo" | "wins" = "elo",
  limit = 50,
  offset = 0
): Promise<RankingsResponse<DuelPlayerStats>> {
  return apiFetch(`/api/v1/rankings/duels?sort=${sort}&limit=${limit}&offset=${offset}`);
}

export async function getPlayer(uuid: string): Promise<PlayerProfile> {
  return apiFetch(`/api/v1/players/${uuid}`);
}

export async function getPlayerHgMatches(
  uuid: string,
  limit = 20,
  offset = 0
): Promise<RankingsResponse<HgMatch>> {
  return apiFetch(`/api/v1/players/${uuid}/matches/hg?limit=${limit}&offset=${offset}`);
}

export async function getPlayerDuelMatches(
  uuid: string,
  limit = 20,
  offset = 0
): Promise<RankingsResponse<DuelMatch>> {
  return apiFetch(`/api/v1/players/${uuid}/matches/duels?limit=${limit}&offset=${offset}`);
}

export async function getSummary(): Promise<SummaryStats> {
  return apiFetch(`/api/v1/stats/summary`);
}
