import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPlayers, getPlayerById } from '@/lib/data';
import ClientPlayerModalActions from './ClientActions';
import BackButton from './BackButton';
import LayoutFocusController from './LayoutFocusController';
import PlayerDetailClient from './PlayerDetailClient';
import PlayerHeaderInfo from './PlayerHeaderInfo';

interface PlayerPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const players = getAllPlayers();
  return players.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: PlayerPageProps): Promise<Metadata> {
  const player = getPlayerById(params.id);
  if (!player) {
    return { title: 'Joueuse introuvable — NextGen' };
  }

  return {
    title: `${player.name} (${player.clubName}) — Valeur Marchande & Statistiques | NextGen`,
    description: `Fiche complète de ${player.name} : valeur marchande estimée, statistiques de saison, historique de transferts et analyse NextGen.`,
    openGraph: {
      title: `${player.name} — NextGen Women's Football`,
      description: `Valeur marchande : ${player.marketValueEur.toLocaleString()} € • Club : ${player.clubName}`,
      images: [player.photoUrl],
    },
  };
}

export default function PlayerDetailPage({ params }: PlayerPageProps) {
  const player = getPlayerById(params.id);

  if (!player) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-200 font-outfit pb-12 flex flex-col">
      {/* Immersive Focus Mode controller */}
      <LayoutFocusController />

      {/* Immersive STICKY TOP header bar (covering Navbar) */}
      <header className="sticky top-0 z-[60] w-full bg-[#080C14]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <BackButton />
          
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          
          {/* Active Player Mini Info (Client Component for instant localStorage updates) */}
          <PlayerHeaderInfo player={player} />
        </div>

        {/* Action Controls & Branding Logo */}
        <div className="flex items-center gap-4">
          <ClientPlayerModalActions player={player} />
          <img
            src="https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/logo%20nextgen%20flatWhat.png"
            alt="NextGen Logo"
            className="h-8 w-auto object-contain select-none"
          />
        </div>
      </header>

      {/* Main Body content page wrapper (Padded & centered) */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
        <PlayerDetailClient player={player} />
      </div>
    </div>
  );
}
