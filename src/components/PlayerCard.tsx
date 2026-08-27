'use client';

import React from 'react';
import Link from 'next/link';
import { Player } from '@/types/player';
import { useApp } from './Providers';
import { formatCurrency } from '@/lib/currency';
import { Star, ChevronRight } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const { currency, toggleWatchlist, isInWatchlist, addComparison, removeComparison, comparedIds, role, lang } = useApp();
  
  const isWatchlisted = isInWatchlist(player.id);
  const isCompared = comparedIds.includes(player.id);
  const formattedVal = formatCurrency(player.marketValueEur, currency, false);

  const isGK = player.position === 'GK';
  const latestStats = player.seasonStats?.[0] || { matches: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 7.0 };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeComparison(player.id);
    } else {
      addComparison(player.id);
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(player.id);
  };

  const isU21 = player.age <= 23;
  const isAlma = player.agent?.toLowerCase().includes('alma');
  const isPublicOrPlayer = role === 'public' || role === 'player';

  // Position-based premium color highlights and dynamic glows
  const posColors = {
    FW: { text: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', glow: 'hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]' },
    MF: { text: 'text-purple-400 border-purple-500/30 bg-purple-500/10', glow: 'hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.12)]' },
    DF: { text: 'text-blue-400 border-blue-500/30 bg-blue-500/10', glow: 'hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]' },
    GK: { text: 'text-amber-400 border-amber-500/30 bg-amber-500/10', glow: 'hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]' }
  };
  const theme = posColors[player.position as keyof typeof posColors] || posColors.MF;

  return (
    <div
      className={`player-card group flex flex-col h-full justify-between bg-slate-900/60 backdrop-blur-md rounded-2xl overflow-hidden border p-3.5 transition-all duration-500 ${
        isCompared
          ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.15)] bg-slate-950/40'
          : `border-white/5 ${theme.glow}`
      }`}
    >
      {/* 1. Large Photo Hero Header Container - Inset layout like a premium trading card */}
      <Link 
        href={`/players/${player.id}`} 
        className="relative w-full aspect-[3/4] block overflow-hidden rounded-xl bg-slate-950 shadow-inner group/photo"
      >
        <img
          src={player.photoUrl}
          alt={player.name}
          className="absolute inset-0 w-full h-full object-cover object-top scale-100 group-hover/photo:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Subtle gradient overlay to make top badges readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60 opacity-80 group-hover/photo:opacity-90 transition-opacity duration-300"></div>

        {/* Overlay Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <div className="flex gap-1.5">
            <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black border backdrop-blur-md uppercase tracking-wider ${theme.text}`}>
              {player.position}
            </span>
            {isU21 && (
              <span className="px-1.5 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 text-[8px] font-black rounded-lg backdrop-blur-md uppercase tracking-wider">
                U21
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-slate-950/80 text-slate-300 border border-white/10 backdrop-blur-md uppercase tracking-wider">
              {player.confed}
            </span>
            {!isPublicOrPlayer && (
              <button
                onClick={handleFavoriteToggle}
                className="p-1 rounded-lg bg-slate-950/80 border border-white/10 hover:bg-slate-900 text-slate-400 hover:text-white backdrop-blur-md transition-all duration-200"
                title={lang === 'fr' ? 'Favoris' : 'Favorites'}
              >
                <Star
                  className={`w-3 h-3 ${
                    isWatchlisted ? 'text-amber-400 fill-amber-400' : 'text-slate-400'
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Clean position color stripe at the bottom of image */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
          player.position === 'FW' ? 'from-emerald-500 to-teal-400' :
          player.position === 'MF' ? 'from-purple-500 to-indigo-400' :
          player.position === 'DF' ? 'from-blue-500 to-cyan-400' :
          'from-amber-500 to-orange-400'
        }`} />
      </Link>

      {/* 2. Details Body Container */}
      <div className="mt-3.5 space-y-3.5 flex-1 flex flex-col justify-between">
        
        {/* Identity Block */}
        <div className="space-y-0.5">
          <Link href={`/players/${player.id}`} className="group/name block">
            <h3 className="text-base font-black text-white leading-tight truncate group-hover/name:text-purple-400 transition-colors duration-200">
              {player.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 truncate">
            <span>{player.clubName}</span>
            <span className="text-slate-600">•</span>
            <span>{player.nationality}</span>
          </div>
        </div>

        {/* Extra Agency indicator */}
        {isAlma && (
          <div className="text-[8px] font-black text-purple-300 uppercase tracking-widest bg-purple-950/30 border border-purple-500/20 py-1 rounded-lg text-center select-none">
            {lang === 'fr' ? '🌟 Joueuse Mandatée • Alma 2019' : '🌟 Represented Player • Alma 2019'}
          </div>
        )}

        {/* 3. Stats Row - Clean, high contrast grid capsules */}
        <div className="grid grid-cols-3 gap-0.5 p-1 bg-slate-950/70 border border-white/5 rounded-xl text-center text-[9px] sm:text-[10px]">
          <div className="py-1">
            <span className="text-slate-500 block uppercase text-[7px] font-bold tracking-wider mb-0.5">
              {lang === 'fr' ? 'Matchs' : 'Matches'}
            </span>
            <span className="font-extrabold text-white text-xs">{latestStats.matches || 0}</span>
          </div>
          <div className="py-1 border-x border-white/5">
            <span className="text-slate-500 block uppercase text-[7px] font-bold tracking-wider mb-0.5">
              {isGK ? 'Clean Sheets' : (lang === 'fr' ? 'B / P' : 'G / A')}
            </span>
            <span className="font-extrabold text-white text-xs">
              {isGK
                ? latestStats.cleanSheets || 0
                : `${latestStats.goals || 0}/${latestStats.assists || 0}`}
            </span>
          </div>
          <div className="py-1">
            <span className="text-slate-500 block uppercase text-[7px] font-bold tracking-wider mb-0.5">
              {lang === 'fr' ? 'Note' : 'Rating'}
            </span>
            <span className="font-black text-purple-400 text-xs">
              {latestStats.rating ? `${latestStats.rating.toFixed(1)}` : '7.0'}
            </span>
          </div>
        </div>

        {/* 4. Value & Trend Row */}
        {!isPublicOrPlayer && (
          <div className="flex items-center justify-between border-t border-slate-950 pt-2.5">
            <div>
              <span className="text-[8px] uppercase tracking-wider text-slate-500 block font-bold">
                {lang === 'fr' ? 'Valeur Marchande' : 'Market Value'}
              </span>
              <span className="text-sm font-black text-green-400">
                {formattedVal}
              </span>
            </div>

            <span
              className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                player.trending?.startsWith('-')
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'bg-green-500/10 text-green-400 border border-green-500/20'
              }`}
            >
              {player.trending || '+10%'}
            </span>
          </div>
        )}

        {/* 5. Footer Action Buttons */}
        <div className="flex items-center gap-1.5 pt-1">
          <Link
            href={`/players/${player.id}`}
            className={`flex-1 py-2 rounded-xl text-[9px] xs:text-[10px] sm:text-xs font-black flex items-center justify-center gap-0.5 border transition-all duration-300 whitespace-nowrap px-2.5 select-none ${
              isPublicOrPlayer
                ? 'bg-purple-600 hover:bg-purple-500 border-purple-600 text-white w-full py-2.5 text-xs font-black shadow-lg shadow-purple-950/40'
                : isCompared
                ? 'bg-green-500 text-slate-950 border-green-500 hover:bg-green-400 shadow-md shadow-green-500/10'
                : 'bg-white text-slate-950 border-white hover:bg-slate-200'
            }`}
          >
            <span>{lang === 'fr' ? 'FICHE COMPLÈTE' : 'FULL PROFILE'}</span>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
          </Link>

          {!isPublicOrPlayer && (
            <button
              onClick={handleCompareToggle}
              className={`px-3 py-2 rounded-xl text-[9px] xs:text-[10px] sm:text-xs font-bold border transition-all duration-200 whitespace-nowrap select-none ${
                isCompared
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                  : 'border-white/10 text-slate-300 hover:bg-white/5'
              }`}
            >
              {isCompared ? (lang === 'fr' ? 'RETIRER' : 'REMOVE') : (lang === 'fr' ? '+ COMPARER' : '+ COMPARE')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
