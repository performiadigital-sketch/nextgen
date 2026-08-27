'use client';

import React, { useState, useEffect } from 'react';
import { Player } from '@/types/player';
import { useApp } from '@/components/Providers';
import { formatCurrency } from '@/lib/currency';
import { Trophy, FileText, Activity } from 'lucide-react';
import { MarketHistoryChart } from '@/components/MarketHistoryChart';
import { RadarChart } from '@/components/RadarChart';
import PlayerMediaGallery from './PlayerMediaGallery';

interface PlayerDetailClientProps {
  player: Player;
}

export default function PlayerDetailClient({ player }: PlayerDetailClientProps) {
  const { role, currency, lang } = useApp();
  const isPublicOrPlayer = role === 'public' || role === 'player';

  const [mounted, setMounted] = useState(false);
  const [activePlayer, setActivePlayer] = useState<Player>(player);

  // Overrides state from player editor (maintains legacy overrides if any, otherwise loads from activePlayer)
  const [bio, setBio] = useState('');
  const [height, setHeight] = useState(player.height);
  const [weight, setWeight] = useState(player.weight);
  const [preferredFoot, setPreferredFoot] = useState(player.preferredFoot);
  const [caps, setCaps] = useState(player.caps);
  const [intlGoals, setIntlGoals] = useState(player.internationalGoals);
  const [photoUrl, setPhotoUrl] = useState(player.photoUrl);

  useEffect(() => {
    setMounted(true);

    // 1. Fetch updated player from central players database list in localStorage if it exists
    const customListStr = localStorage.getItem('nextgen_custom_players');
    let resolvedPlayer = player;
    if (customListStr) {
      try {
        const list = JSON.parse(customListStr);
        const found = list.find((p: any) => p.id === player.id);
        if (found) {
          resolvedPlayer = found;
          setActivePlayer(found);
        }
      } catch (e) {}
    }

    // 2. Fetch individual custom player dashboard override keys if they exist
    const savedBio = localStorage.getItem(`nextgen_player_bio_${player.id}`);
    const savedHeight = localStorage.getItem(`nextgen_player_height_${player.id}`);
    const savedWeight = localStorage.getItem(`nextgen_player_weight_${player.id}`);
    const savedFoot = localStorage.getItem(`nextgen_player_foot_${player.id}`);
    const savedCaps = localStorage.getItem(`nextgen_player_caps_${player.id}`);
    const savedIntlGoals = localStorage.getItem(`nextgen_player_intl_goals_${player.id}`);
    const savedPhoto = localStorage.getItem(`nextgen_player_photo_${player.id}`);

    if (savedBio) {
      setBio(savedBio);
    } else {
      setBio(resolvedPlayer.biography || `${resolvedPlayer.name} est une joueuse de talent évoluant au poste de ${resolvedPlayer.positionDetail || resolvedPlayer.position.toLowerCase()}. Elle représente actuellement ${resolvedPlayer.clubName} au niveau de club et ${resolvedPlayer.nationalTeam} sur la scène internationale. Reconnue pour sa régularité et sa polyvalence, elle continue de progresser et de s'affirmer comme un atout majeur pour son équipe.`);
    }

    setHeight(savedHeight ? Number(savedHeight) : resolvedPlayer.height);
    setWeight(savedWeight ? Number(savedWeight) : resolvedPlayer.weight);
    setPreferredFoot(savedFoot ? (savedFoot as any) : resolvedPlayer.preferredFoot);
    setCaps(savedCaps ? Number(savedCaps) : resolvedPlayer.caps);
    setIntlGoals(savedIntlGoals ? Number(savedIntlGoals) : resolvedPlayer.internationalGoals);
    setPhotoUrl(savedPhoto || resolvedPlayer.photoUrl);
  }, [player.id]);

  // Prevent hydration mismatch by only rendering pro chart/table sections after mount
  const showProSections = mounted && !isPublicOrPlayer;

  return (
    <div className="space-y-8">
      {/* Portrait & Biography Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Portrait Photo */}
        <div className="lg:col-span-4 glass-card overflow-hidden relative min-h-[380px] lg:min-h-[420px] bg-slate-955 flex flex-col justify-end">
          <img
            src={photoUrl}
            alt={`${activePlayer.name} Portrait`}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-955/90 via-slate-955/10 to-transparent"></div>
          <div className="relative p-6 z-10">
            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-widest block">Portrait Officiel</span>
            <h2 className="text-xl font-black text-white leading-tight mt-0.5">{activePlayer.name}</h2>
          </div>
        </div>

        {/* Biography & Quick Info Grid */}
        <div className="lg:col-span-8 glass-card p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" /> {lang === 'fr' ? 'Biographie & Profil de Carrière' : 'Biography & Career Profile'}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
              "{bio}"
            </p>
          </div>

          {/* Quick Bio Info Grid arrangement inside the biography container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-4 border-t border-slate-800">
            <div className="p-3 bg-slate-950/50 rounded-xl border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">{lang === 'fr' ? 'Âge & Date de Naiss.' : 'Age & Date of Birth'}</span>
              <strong className="text-white text-sm mt-0.5 block">{activePlayer.age} {lang === 'fr' ? 'ans' : 'y.o.'} ({activePlayer.dob})</strong>
            </div>
            <div className="p-3 bg-slate-950/50 rounded-xl border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">{lang === 'fr' ? 'Gabarit & Pied fort' : 'Physique & Strong Foot'}</span>
              <strong className="text-white text-sm mt-0.5 block">
                {height} cm • {weight} kg • {preferredFoot === 'left' ? (lang === 'fr' ? 'Gaucher' : 'Left-footed') : preferredFoot === 'right' ? (lang === 'fr' ? 'Droitier' : 'Right-footed') : (lang === 'fr' ? 'Ambidextre' : 'Ambidextrous')}
              </strong>
            </div>
            <div className="p-3 bg-slate-950/50 rounded-xl border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">{lang === 'fr' ? 'Sélection Nationale' : 'National Selection'}</span>
              <strong className="text-white text-sm mt-0.5 block">
                {activePlayer.nationalTeam} ({caps} {lang === 'fr' ? 'sél.' : 'caps'}, {intlGoals} {lang === 'fr' ? 'buts' : 'goals'})
              </strong>
            </div>
            <div className="p-3 bg-slate-950/50 rounded-xl border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">{lang === 'fr' ? "Contrat Jusqu'en" : 'Contract Until'}</span>
              <strong className="text-amber-400 text-sm mt-0.5 block">{activePlayer.contractUntil}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Galleries (Photo & Video) - Always Visible */}
      <PlayerMediaGallery player={activePlayer} />

      {/* Market Value Trajectory Chart (Hidden for Public/Player roles) */}
      {showProSections && (
        <div className="glass-card p-6 md:p-8 space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase text-slate-400 font-bold block">{lang === 'fr' ? 'Indice de Valeur Marchande' : 'Market Value Index'}</span>
              <span className="text-2xl sm:text-3xl font-black text-green-400">
                {formatCurrency(activePlayer.marketValueEur, currency, false)}
              </span>
            </div>
            <span className="text-xs text-slate-400">{lang === 'fr' ? 'Trajectoire de valorisation sur 5 ans' : '5-Year Valuation Trajectory'}</span>
          </div>

          <div className="h-[260px] w-full">
            <MarketHistoryChart history={activePlayer.marketValueHistory} />
          </div>
        </div>
      )}

      {/* Stats Table & Radar Chart Section (Hidden for Public/Player roles) */}
      {showProSections && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Stats Table */}
          <div className="lg:col-span-7 glass-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider mb-4">
                {lang === 'fr' ? 'Statistiques Détaillées par Compétition' : 'Detailed Statistics by Competition'}
              </h3>
              <div className="overflow-x-auto">
                <table className="custom-table text-xs">
                  <thead>
                    <tr>
                      <th>{lang === 'fr' ? 'Saison' : 'Season'}</th>
                      <th>{lang === 'fr' ? 'Compétition' : 'Competition'}</th>
                      <th className="text-center">{lang === 'fr' ? 'Matchs' : 'Matches'}</th>
                      <th className="text-center">{lang === 'fr' ? 'Buts' : 'Goals'}</th>
                      <th className="text-center">{lang === 'fr' ? 'Passes' : 'Assists'}</th>
                      <th className="text-center">{lang === 'fr' ? 'Minutes' : 'Minutes'}</th>
                      <th className="text-right">{lang === 'fr' ? 'Note' : 'Rating'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePlayer.seasonStats.map((s, idx) => (
                      <tr key={idx}>
                        <td className="font-bold text-white">{s.season}</td>
                        <td>{s.competition}</td>
                        <td className="text-center">{s.matches}</td>
                        <td className="text-center font-bold text-green-400">{s.goals || (s.cleanSheets !== undefined ? `${s.cleanSheets} (CS)` : 0)}</td>
                        <td className="text-center">{s.assists || 0}</td>
                        <td className="text-center">{s.minutes}</td>
                        <td className="text-right font-black text-purple-400">{s.rating || '8.2'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" /> {lang === 'fr' ? "Radar d'Attributs" : 'Attributes Radar'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'fr' ? 'Aptitudes techniques et athlétiques modélisées sur 100.' : 'Technical and athletic abilities modeled out of 100.'}
              </p>
            </div>
            <div className="w-full max-w-[280px] aspect-square mx-auto">
              <RadarChart players={[activePlayer]} />
            </div>
          </div>
        </div>
      )}

      {/* Transfers Timeline & Honors - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Transfers */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider mb-4">
            {lang === 'fr' ? 'Historique des Transferts' : 'Transfer History'}
          </h3>
          <div className="space-y-3">
            {activePlayer.transfers.map((t, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white block">{t.fromClub} ➔ {t.toClub}</span>
                  <span className="text-[11px] text-slate-400">{t.date} • {t.type}</span>
                </div>
                <span className="font-bold text-green-400">{t.fee}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Honors & Palmarès */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider mb-4">
            {lang === 'fr' ? 'Palmarès & Distinctions Individuelles' : 'Honors & Individual Awards'}
          </h3>
          <ul className="space-y-2.5">
            {activePlayer.palmares.map((p, idx) => (
              <li key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center gap-2.5 text-slate-300">
                <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
