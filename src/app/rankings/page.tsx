import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import HgTable from "@/components/HgTable";
import DuelsTable from "@/components/DuelsTable";
import { SkeletonTable } from "@/components/Skeleton";
import RankingsTabs from "./RankingsTabs";
import { getHgRankings, getDuelRankings, getSummary } from "@/lib/api";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rankings",
  description: "Top jugadores de Cobblegames — Hunger Games y Duelos clasificados por ELO.",
};

export const revalidate = 60;

async function SummarySection() {
  try {
    const summary = await getSummary();
    return (
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Jugadores"
          value={formatNumber(summary.total_players)}
          accent="cyan"
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatCard
          label="Partidas HG"
          value={formatNumber(summary.total_hg_matches)}
          accent="cyan"
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
        />
        <StatCard
          label="Duelos"
          value={formatNumber(summary.total_duel_matches)}
          accent="cyan"
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>}
        />
      </div>
    );
  } catch {
    return null;
  }
}

async function HgRankingsContent() {
  try {
    const data = await getHgRankings("elo", 50, 0);
    return <HgTable players={data.data} offset={0} />;
  } catch {
    return (
      <div className="py-16 text-center text-gray-500">
        <p className="text-sm">No se pudo cargar el ranking. El servidor podría estar offline.</p>
      </div>
    );
  }
}

async function DuelRankingsContent() {
  try {
    const data = await getDuelRankings("elo", 50, 0);
    return <DuelsTable players={data.data} offset={0} />;
  } catch {
    return (
      <div className="py-16 text-center text-gray-500">
        <p className="text-sm">No se pudo cargar el ranking. El servidor podría estar offline.</p>
      </div>
    );
  }
}

export default async function RankingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: tabParam } = await searchParams;
  const tab = tabParam === "duels" ? "duels" : "hg";

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-bg-border bg-hero-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-accent-cyan uppercase tracking-widest">
              Rankings
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Clasificación competitiva de jugadores por ELO. Se actualiza cada 60 segundos.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Summary stats */}
        <Suspense fallback={null}>
          <SummarySection />
        </Suspense>

        {/* Tab switcher + table */}
        <div className="card overflow-hidden">
          <RankingsTabs activeTab={tab} />

          <div className="animate-fade-in">
            {tab === "hg" ? (
              <Suspense fallback={<SkeletonTable rows={20} />}>
                <HgRankingsContent />
              </Suspense>
            ) : (
              <Suspense fallback={<SkeletonTable rows={20} />}>
                <DuelRankingsContent />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
