'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Player } from '@/types/player';
import { useApp } from '@/components/Providers';
import { FileText, Bookmark } from 'lucide-react';

interface ClientPlayerModalActionsProps {
  player: Player;
}

export default function ClientPlayerModalActions({ player }: ClientPlayerModalActionsProps) {
  const { toggleWatchlist, isInWatchlist, role, lang } = useApp();
  const isWatchlisted = isInWatchlist(player.id);
  const [fromPage, setFromPage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFromPage(params.get('from'));
  }, []);

  if (role === 'public' || role === 'player') return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/players/${player.id}/scout${fromPage === 'pro' ? '?from=pro' : ''}`}
        className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition flex items-center gap-2"
      >
        <FileText className="w-4 h-4" /> {lang === 'fr' ? 'Rapport Scout PDF' : 'Scouting Report PDF'}
      </Link>
      <button
        onClick={() => toggleWatchlist(player.id)}
        className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
          isWatchlisted
            ? 'bg-slate-950/80 border-purple-500/50 text-purple-300'
            : 'border-white/10 text-slate-300 hover:bg-white/5 bg-slate-900/60'
        }`}
      >
        <Bookmark className="w-4 h-4" />
        <span>{isWatchlisted ? (lang === 'fr' ? 'Dans la Watchlist' : 'In Watchlist') : (lang === 'fr' ? 'Suivre la joueuse' : 'Follow Player')}</span>
      </button>
    </div>
  );
}
