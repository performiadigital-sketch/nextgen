'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getAllPlayers, getAllClubs } from '@/lib/data';
import { useApp } from '@/components/Providers';
import { formatCurrency } from '@/lib/currency';
import { 
  Trophy, 
  Globe, 
  Award, 
  Shield, 
  TrendingUp, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';

type RankingCategory = 'world' | 'confed' | 'position' | 'clubs' | 'trending' | 'u21';

export default function RankingsPage() {
  const allPlayers = getAllPlayers();
  const allClubs = getAllClubs();
  const { currency } = useApp();

  const [activeCategory, setActiveCategory] = useState<RankingCategory>('world');
  const [selectedConfed, setSelectedConfed] = useState<string>('ALL');
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');

  // 1. Filtered and sorted players
  let displayedPlayers = [...allPlayers];

  if (activeCategory === 'world') {
    displayedPlayers.sort((a, b) => b.marketValueEur - a.marketValueEur);
  } else if (activeCategory === 'u21') {
    displayedPlayers = displayedPlayers.filter((p) => p.age <= 21);
    displayedPlayers.sort((a, b) => b.marketValueEur - a.marketValueEur);
  } else if (activeCategory === 'trending') {
    // Sort by positive trends first (parse trend percentages)
    displayedPlayers.sort((a, b) => {
      const valA = parseFloat(a.trending?.replace(/[^\d.-]/g, '') || '0');
      const valB = parseFloat(b.trending?.replace(/[^\d.-]/g, '') || '0');
      return valB - valA;
    });
  } else if (activeCategory === 'confed') {
    if (selectedConfed !== 'ALL') {
      displayedPlayers = displayedPlayers.filter((p) => p.confed === selectedConfed);
    }
    displayedPlayers.sort((a, b) => b.marketValueEur - a.marketValueEur);
  } else if (activeCategory === 'position') {
    if (selectedPosition !== 'ALL') {
      displayedPlayers = displayedPlayers.filter((p) => p.position === selectedPosition);
    }
    displayedPlayers.sort((a, b) => b.marketValueEur - a.marketValueEur);
  }

  // 2. Club rankings calculation
  const clubRankings = allClubs
    .map((club) => {
      const squad = allPlayers.filter(
        (p) => p.clubId === club.id || p.clubName.toLowerCase().includes(club.name.toLowerCase().split(' ')[0])
      );
      const totalVal = squad.reduce((sum, p) => sum + p.marketValueEur, 0);
      const avgVal = squad.length > 0 ? totalVal / squad.length : 0;
      return {
        ...club,
        squadSize: squad.length || 1,
        totalValuation: totalVal || 600000,
        avgValuation: avgVal || 600000,
      };
    })
    .sort((a, b) => b.totalValuation - a.totalValuation);

  const categories = [
    { id: 'world' as const, label: 'TOP MONDIAL', icon: Trophy },
    { id: 'confed' as const, label: 'PAR CONFÉDÉRATION', icon: Globe },
    { id: 'position' as const, label: 'PAR POSTE', icon: Award },
    { id: 'clubs' as const, label: 'TOP CLUBS', icon: Shield },
    { id: 'trending' as const, label: 'TOP PROGRESSIONS', icon: TrendingUp },
    { id: 'u21' as const, label: 'NEXTGEN U21', icon: Sparkles },
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-200 font-outfit">
      
      {/* Classements Officiels Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-7 h-7 text-green-400" /> Classements Officiels
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Baromètre international des cotes de marché et valorisations d'effectifs.
          </p>
        </div>

        {/* Categories Tab Pill Selectors matching media mockup design */}
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold tracking-wider transition ${
                  isActive
                    ? 'bg-green-950/40 text-green-400 border border-green-500/60 shadow-lg'
                    : 'bg-slate-900/40 text-slate-400 border border-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-green-400' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Filters for Confed & Position Categories */}
      {activeCategory === 'confed' && (
        <div className="flex flex-wrap gap-2 p-3 bg-slate-900/20 border border-white/5 rounded-2xl text-xs animate-slideDown">
          <span className="text-slate-400 font-bold self-center px-2 uppercase text-[10px]">Confédérations :</span>
          {['ALL', 'UEFA', 'CONCACAF', 'CAF', 'CONMEBOL', 'AFC'].map((conf) => (
            <button
              key={conf}
              onClick={() => setSelectedConfed(conf)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                selectedConfed === conf
                  ? 'bg-purple-600/35 text-purple-300 border border-purple-500/50'
                  : 'text-slate-400 hover:text-white bg-slate-950/20'
              }`}
            >
              {conf === 'ALL' ? 'Toutes' : conf}
            </button>
          ))}
        </div>
      )}

      {activeCategory === 'position' && (
        <div className="flex flex-wrap gap-2 p-3 bg-slate-900/20 border border-white/5 rounded-2xl text-xs animate-slideDown">
          <span className="text-slate-400 font-bold self-center px-2 uppercase text-[10px]">Postes :</span>
          {[
            { id: 'ALL', label: 'Tous les postes' },
            { id: 'FW', label: 'Attaquantes (FW)' },
            { id: 'MF', label: 'Milieux (MF)' },
            { id: 'DF', label: 'Défenseures (DF)' },
            { id: 'GK', label: 'Gardiennes (GK)' },
          ].map((pos) => (
            <button
              key={pos.id}
              onClick={() => setSelectedPosition(pos.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                selectedPosition === pos.id
                  ? 'bg-purple-600/35 text-purple-300 border border-purple-500/50'
                  : 'text-slate-400 hover:text-white bg-slate-950/20'
              }`}
            >
              {pos.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      {activeCategory === 'clubs' ? (
        /* CLUBS TABLE VIEW */
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="custom-table text-xs">
              <thead>
                <tr>
                  <th className="w-12 text-center">Rang</th>
                  <th>Club</th>
                  <th>Pays / Confédération</th>
                  <th className="text-center">Effectif Évalué</th>
                  <th className="text-right">Moyenne par Joueuse</th>
                  <th className="text-right">Valeur Totale Effectif</th>
                </tr>
              </thead>
              <tbody>
                {clubRankings.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-white/5 transition">
                    <td className={`text-center font-black ${idx < 3 ? 'text-amber-400 text-sm' : 'text-slate-400'}`}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                    </td>
                    <td className="font-bold text-white flex items-center gap-2 py-4">
                      <span className="text-lg">{c.logo}</span>
                      <span>{c.name}</span>
                    </td>
                    <td>{c.country} ({c.confed})</td>
                    <td className="text-center font-bold text-slate-300">{c.squadSize}</td>
                    <td className="text-right text-purple-300 font-bold">
                      {formatCurrency(c.avgValuation, currency, true)}
                    </td>
                    <td className="text-right font-black text-green-400 text-sm">
                      {formatCurrency(c.totalValuation, currency, true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* PLAYERS TABLE VIEW (Covers World, U21, Trending, Confed & Position) */
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="custom-table text-xs">
              <thead>
                <tr>
                  <th className="w-12 text-center">Rang</th>
                  <th>Joueuse</th>
                  <th>Club</th>
                  <th>Confédération</th>
                  <th>Âge</th>
                  <th className="text-center">Tendance</th>
                  <th className="text-right">Valeur Marchande</th>
                </tr>
              </thead>
              <tbody>
                {displayedPlayers.length > 0 ? (
                  displayedPlayers.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-white/5 transition">
                      <td className={`text-center font-black ${idx < 3 ? 'text-amber-400 text-sm' : 'text-slate-400'}`}>
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={p.photoUrl} 
                            alt={p.name} 
                            className="w-10 h-10 rounded-xl object-cover border border-purple-500/30" 
                          />
                          <div>
                            <Link href={`/players/${p.id}`} className="font-black text-white hover:text-green-400 transition flex items-center gap-1">
                              <span>{p.name}</span>
                            </Link>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {p.nationality} • {p.positionDetail || p.position}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold text-slate-300">{p.clubName}</td>
                      <td>
                        <span className="px-2 py-0.5 bg-slate-905 border border-white/5 rounded text-[10px] text-purple-300 font-bold uppercase">
                          {p.confed}
                        </span>
                      </td>
                      <td className="font-medium">{p.age} ans</td>
                      <td className="text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          p.trending?.startsWith('-')
                            ? 'bg-rose-950/60 text-rose-400 border border-rose-900/50'
                            : 'bg-green-950/60 text-green-400 border border-green-900/50'
                        }`}>
                          {p.trending || '+10%'}
                        </span>
                      </td>
                      <td className="text-right font-black text-green-400 text-sm">
                        {formatCurrency(p.marketValueEur, currency, false)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500 font-bold italic">
                      Aucune joueuse ne correspond aux filtres sélectionnés.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
