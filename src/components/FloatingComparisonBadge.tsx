'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './Providers';
import { getAllPlayers } from '@/lib/data';
import { ChevronRight } from 'lucide-react';

import { Player } from '@/types/player';

export function FloatingComparisonBadge() {
  const [mounted, setMounted] = useState(false);
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const { comparedIds, lang } = useApp();
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('nextgen_custom_players');
    if (stored) {
      try {
        setPlayersList(JSON.parse(stored));
      } catch (e) {
        setPlayersList(getAllPlayers());
      }
    } else {
      setPlayersList(getAllPlayers());
    }

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  const allPlayers = playersList;

  // 1. Hide badge on comparison page
  if (pathname === '/compare') return null;

  // 2. Hide badge if no players compared
  if (comparedIds.length === 0) return null;

  // 3. Limit to 2 on mobile view, otherwise 4
  const maxSlots = isMobile ? 2 : 4;
  const comparedPlayers = allPlayers.filter((p) => comparedIds.includes(p.id)).slice(0, maxSlots);
  const activeCount = comparedPlayers.length;

  if (activeCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-4 bg-slate-950/90 backdrop-blur-xl border border-green-500/50 rounded-2xl py-3 px-4 shadow-2xl shadow-green-950/40">
        
        {/* Avatars group */}
        <div className="flex -space-x-2">
          {comparedPlayers.map((p) => (
            <img
              key={p.id}
              src={p.photoUrl}
              alt={p.name}
              className="w-8 h-8 rounded-full object-cover object-top border-2 border-slate-950 shadow-md"
            />
          ))}
        </div>

        {/* Text descriptions */}
        <div className="text-left leading-tight">
          <span className="text-xs font-black text-white block">
            {lang === 'fr' 
              ? `${activeCount} joueuse${activeCount > 1 ? 's' : ''} en comparaison`
              : `${activeCount} player${activeCount > 1 ? 's' : ''} in comparison`}
          </span>
          <span className="text-[10px] text-slate-400">
            {lang === 'fr' ? 'Face-à-face interactif prêt' : 'Interactive head-to-head ready'}
          </span>
        </div>

        {/* Voir button */}
        <Link
          href="/compare"
          className="bg-green-500 hover:bg-green-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1 shadow-md shadow-green-900/30"
        >
          <span>{lang === 'fr' ? 'VOIR' : 'VIEW'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
