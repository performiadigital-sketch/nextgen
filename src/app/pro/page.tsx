'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPlayers, getAllClubs, savePlayersToLocalStorage, saveClubsToLocalStorage } from '@/lib/data';
import { useApp } from '@/components/Providers';
import { formatCurrency } from '@/lib/currency';
import {
  ShieldCheck,
  Briefcase,
  Newspaper,
  Settings,
  Bookmark,
  FileText,
  Trash2,
  Share2,
  Check,
  Copy,
  TrendingUp,
  Star,
  Plus,
  Save,
  ArrowRight,
} from 'lucide-react';
import { Player } from '@/types/player';

export default function ProHubsPage() {
  const [mounted, setMounted] = useState(false);
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [clubsList, setClubsList] = useState<any[]>([]);

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

    const storedClubs = localStorage.getItem('nextgen_custom_clubs');
    if (storedClubs) {
      try {
        setClubsList(JSON.parse(storedClubs));
      } catch (e) {
        setClubsList(getAllClubs());
      }
    } else {
      setClubsList(getAllClubs());
    }
  }, []);

  const allPlayers = mounted ? playersList : getAllPlayers();
  const allClubs = mounted ? clubsList : getAllClubs();
  const { role, setRole, watchlist, toggleWatchlist, currency } = useApp();

  const watchlistedPlayers = allPlayers.filter((p) => watchlist.includes(p.id));
  const agentPlayers = allPlayers.filter((p) => p.agent && p.agent.toLowerCase().includes('alma'));

  // Admin sub-tabs
  const [adminTab, setAdminTab] = useState<'players' | 'clubs' | 'algo'>('players');
  const [adminSuccess, setAdminSuccess] = useState('');

  // Selected player to edit
  const [adminSelectedPlayerId, setAdminSelectedPlayerId] = useState<string>('new');

  // Player Form inputs
  const [pName, setPName] = useState('');
  const [pShortName, setPShortName] = useState('');
  const [pNationality, setPNationality] = useState('');
  const [pConfed, setPConfed] = useState('UEFA');
  const [pDob, setPDob] = useState('2000-01-01');
  const [pAge, setPAge] = useState(25);
  const [pPosition, setPPosition] = useState('MF');
  const [pPositionDetail, setPPositionDetail] = useState('');
  const [pPreferredFoot, setPPreferredFoot] = useState<'right' | 'left' | 'both'>('right');
  const [pHeight, setPHeight] = useState(170);
  const [pWeight, setPWeight] = useState(65);
  const [pClubId, setPClubId] = useState('');
  const [pContract, setPContract] = useState('2028-06-30');
  const [pAgent, setPAgent] = useState('Alma 2019');
  const [pNationalTeam, setPNationalTeam] = useState('');
  const [pCaps, setPCaps] = useState(10);
  const [pGoals, setPGoals] = useState(2);
  const [pMarketValue, setPMarketValue] = useState(300000);
  const [pPhoto, setPPhoto] = useState('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80');
  const [pBio, setPBio] = useState('');

  // Club Form inputs
  const [cName, setCName] = useState('');
  const [cCountry, setCCountry] = useState('');
  const [cLeagueId, setCLeagueId] = useState('liga-f');
  const [cLogo, setCLogo] = useState('⚽');

  // Load player details on edit selection
  useEffect(() => {
    if (adminSelectedPlayerId === 'new') {
      setPName('');
      setPShortName('');
      setPNationality('');
      setPConfed('UEFA');
      setPDob('2000-01-01');
      setPAge(25);
      setPPosition('MF');
      setPPositionDetail('');
      setPPreferredFoot('right');
      setPHeight(170);
      setPWeight(65);
      setPClubId(allClubs[0]?.id || '');
      setPContract('2028-06-30');
      setPAgent('Alma 2019');
      setPNationalTeam('');
      setPCaps(10);
      setPGoals(2);
      setPMarketValue(300000);
      setPPhoto('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80');
      setPBio('');
    } else {
      const pl = allPlayers.find((p) => p.id === adminSelectedPlayerId);
      if (pl) {
        setPName(pl.name);
        setPShortName(pl.shortName);
        setPNationality(pl.nationality);
        setPConfed(pl.confed);
        setPDob(pl.dob || '2000-01-01');
        setPAge(pl.age);
        setPPosition(pl.position);
        setPPositionDetail(pl.positionDetail || '');
        setPPreferredFoot(pl.preferredFoot);
        setPHeight(pl.height);
        setPWeight(pl.weight);
        setPClubId(pl.clubId);
        setPContract(pl.contractUntil);
        setPAgent(pl.agent || '');
        setPNationalTeam(pl.nationalTeam);
        setPCaps(pl.caps);
        setPGoals(pl.internationalGoals);
        setPMarketValue(pl.marketValueEur);
        setPPhoto(pl.photoUrl);
        setPBio(pl.biography || '');
      }
    }
  }, [adminSelectedPlayerId]);

  // Save or Create Player
  const handleSavePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = pName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const finalId = adminSelectedPlayerId === 'new' ? slug : adminSelectedPlayerId;
    
    const club = allClubs.find(c => c.id === pClubId);

    const updatedPlayer: Player = {
      id: finalId,
      name: pName,
      shortName: pShortName || pName,
      nationality: pNationality,
      countryCode: pNationality.substring(0, 2).toUpperCase(),
      confed: pConfed as any,
      dob: pDob,
      age: Number(pAge),
      position: pPosition as any,
      positionDetail: pPositionDetail || pPosition,
      preferredFoot: pPreferredFoot as any,
      height: Number(pHeight),
      weight: Number(pWeight),
      clubId: pClubId,
      clubName: club ? club.name : 'Club Inconnu',
      contractUntil: pContract,
      agent: pAgent,
      nationalTeam: pNationalTeam || pNationality,
      caps: Number(pCaps),
      internationalGoals: Number(pGoals),
      marketValueEur: Number(pMarketValue),
      photoUrl: pPhoto,
      biography: pBio,
      marketValueHistory: adminSelectedPlayerId === 'new' 
        ? [{ date: '2026-08', value: Number(pMarketValue) }] 
        : (allPlayers.find(p => p.id === adminSelectedPlayerId)?.marketValueHistory || [{ date: '2026-08', value: Number(pMarketValue) }]),
      seasonStats: adminSelectedPlayerId === 'new' 
        ? [{ season: '2025/2026', competition: club ? (club.country === 'France' ? 'Arkema Première Ligue' : 'D1 Nationale') : 'Championnat', matches: 20, goals: 5, assists: 4, minutes: 1600, rating: 7.2 }]
        : (allPlayers.find(p => p.id === adminSelectedPlayerId)?.seasonStats || []),
      transfers: adminSelectedPlayerId === 'new' ? [] : (allPlayers.find(p => p.id === adminSelectedPlayerId)?.transfers || []),
      palmares: adminSelectedPlayerId === 'new' ? [] : (allPlayers.find(p => p.id === adminSelectedPlayerId)?.palmares || [])
    };

    let updatedList: Player[];
    if (adminSelectedPlayerId === 'new') {
      if (allPlayers.some(p => p.id === finalId)) {
        alert('Une joueuse avec cet ID ou nom existe déjà.');
        return;
      }
      updatedList = [...allPlayers, updatedPlayer];
    } else {
      updatedList = allPlayers.map(p => p.id === adminSelectedPlayerId ? updatedPlayer : p);
    }

    savePlayersToLocalStorage(updatedList);
    setPlayersList(updatedList);

    // Clear individual player cache overrides so the new admin settings propagate immediately
    localStorage.removeItem(`nextgen_player_bio_${finalId}`);
    localStorage.removeItem(`nextgen_player_height_${finalId}`);
    localStorage.removeItem(`nextgen_player_weight_${finalId}`);
    localStorage.removeItem(`nextgen_player_foot_${finalId}`);
    localStorage.removeItem(`nextgen_player_caps_${finalId}`);
    localStorage.removeItem(`nextgen_player_intl_goals_${finalId}`);
    localStorage.removeItem(`nextgen_player_photo_${finalId}`);

    setAdminSuccess(`Fiche de ${pName} sauvegardée avec succès !`);
    setAdminSelectedPlayerId('new');
    setTimeout(() => setAdminSuccess(''), 3000);
  };

  // Delete Player Fiche
  const handleDeletePlayer = () => {
    if (adminSelectedPlayerId === 'new') return;
    if (!confirm(`Voulez-vous vraiment supprimer définitivement la fiche de ${pName} ?`)) return;
    
    const updatedList = allPlayers.filter(p => p.id !== adminSelectedPlayerId);
    savePlayersToLocalStorage(updatedList);
    setPlayersList(updatedList);

    // Clean up local storage cache overrides
    localStorage.removeItem(`nextgen_player_bio_${adminSelectedPlayerId}`);
    localStorage.removeItem(`nextgen_player_height_${adminSelectedPlayerId}`);
    localStorage.removeItem(`nextgen_player_weight_${adminSelectedPlayerId}`);
    localStorage.removeItem(`nextgen_player_foot_${adminSelectedPlayerId}`);
    localStorage.removeItem(`nextgen_player_caps_${adminSelectedPlayerId}`);
    localStorage.removeItem(`nextgen_player_intl_goals_${adminSelectedPlayerId}`);
    localStorage.removeItem(`nextgen_player_photo_${adminSelectedPlayerId}`);

    setAdminSuccess(`Fiche de ${pName} supprimée de la base de données.`);
    setAdminSelectedPlayerId('new');
    setTimeout(() => setAdminSuccess(''), 3000);
  };

  // Direct Delete Player from List
  const handleDirectDeletePlayer = (playerId: string, playerName: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer définitivement la fiche de ${playerName} ?`)) return;
    
    const updatedList = allPlayers.filter(p => p.id !== playerId);
    savePlayersToLocalStorage(updatedList);
    setPlayersList(updatedList);

    // Clean up local storage cache overrides
    localStorage.removeItem(`nextgen_player_bio_${playerId}`);
    localStorage.removeItem(`nextgen_player_height_${playerId}`);
    localStorage.removeItem(`nextgen_player_weight_${playerId}`);
    localStorage.removeItem(`nextgen_player_foot_${playerId}`);
    localStorage.removeItem(`nextgen_player_caps_${playerId}`);
    localStorage.removeItem(`nextgen_player_intl_goals_${playerId}`);
    localStorage.removeItem(`nextgen_player_photo_${playerId}`);

    setAdminSuccess(`Fiche de ${playerName} supprimée de la base de données.`);
    if (adminSelectedPlayerId === playerId) {
      setAdminSelectedPlayerId('new');
    }
    setTimeout(() => setAdminSuccess(''), 3000);
  };

  // Save Club Referencing
  const handleSaveClub = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = cName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const newClub = {
      id: slug,
      name: cName,
      country: cCountry,
      leagueId: cLeagueId,
      confed: cLeagueId === 'liga-f' || cLeagueId === 'd1-arkema' || cLeagueId === 'wsl' || cLeagueId === 'frauen-bundesliga' ? 'UEFA' : 'CAF',
      logo: cLogo || '⚽'
    };

    if (allClubs.some(c => c.id === slug)) {
      alert('Ce club est déjà référencé.');
      return;
    }

    const updatedList = [...allClubs, newClub];
    saveClubsToLocalStorage(updatedList);
    setClubsList(updatedList);
    setAdminSuccess(`Club ${cName} enregistré avec succès !`);
    setCName('');
    setCCountry('');
    setCLogo('⚽');
    setTimeout(() => setAdminSuccess(''), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Role Switcher */}
      <div className="glass-card p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase block">Espace Professionnel Sélectionné :</span>
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={() => setRole('recruiter')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                role === 'recruiter'
                  ? 'bg-blue-950/60 border-blue-500 text-blue-300'
                  : 'border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Club & Recruteur
            </button>
            <button
              onClick={() => setRole('agent')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                role === 'agent'
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                  : 'border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" /> Agent (Alma 2019)
            </button>

            <button
              onClick={() => setRole('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                role === 'admin'
                  ? 'bg-purple-950/60 border-purple-500 text-purple-300'
                  : 'border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" /> Admin Back-Office
            </button>
          </div>
        </div>

        <span className="text-xs text-slate-400">Sections 4.0, 5.5 & 5.7 du Cahier des Charges</span>
      </div>

      {/* VIEW: RECRUITER */}
      {role === 'recruiter' && (
        <div className="space-y-6">
          <div className="glass-card p-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950 border border-blue-500 text-blue-300 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Cellule de Recrutement & Pro Scout
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Tableau de Bord & Listes de Suivi (Watchlist)</h2>
              <p className="text-sm text-slate-300 mt-1">Gérez vos cibles prioritaires, vos notes techniques et exportez vos dossiers de scouting PDF.</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Joueuses surveillées</span>
              <span className="text-2xl font-black text-blue-400">{watchlistedPlayers.length} profil(s)</span>
            </div>
          </div>

          {watchlistedPlayers.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-300">Aucune joueuse dans votre Watchlist</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">Parcourez le répertoire et cliquez sur "Ajouter à la Watchlist" pour centraliser vos observations de scouting.</p>
              <Link href="/players" className="inline-block mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow transition">
                Explorer les Joueuses
              </Link>
            </div>
          ) : (
            <div className="glass-card overflow-hidden">
              <div className="p-4 bg-slate-800/60 border-b border-slate-700 flex items-center justify-between">
                <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider">Cibles Enregistrées & Dossiers</h3>
                <span className="text-xs text-slate-400">Export officiel NextGen / Alma 2019</span>
              </div>
              <div className="divide-y divide-slate-800">
                {watchlistedPlayers.map((p) => (
                  <div key={p.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-800/30 transition">
                    <div className="flex items-center gap-4 min-w-[280px]">
                      <img src={p.photoUrl} alt={p.name} className="w-14 h-14 rounded-2xl object-cover object-top border border-purple-500/40 shadow" />
                      <div>
                        <Link href={`/players/${p.id}?from=pro`} className="font-bold text-white text-base hover:text-purple-400 transition">
                          {p.name}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className="px-1.5 py-0.5 bg-purple-950 text-purple-300 rounded text-[11px] border border-purple-800">{p.position}</span>
                          <span>{p.clubName}</span>
                          <span>•</span>
                          <span>{p.age} ans</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <div className="text-right mr-2">
                        <span className="text-[10px] text-slate-400 block uppercase">Valeur estimée</span>
                        <span className="font-bold text-green-400 text-sm">{formatCurrency(p.marketValueEur, currency, false)}</span>
                      </div>
                      <Link
                        href={`/players/${p.id}/scout?from=pro`}
                        className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:bg-purple-900 text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <FileText className="w-3.5 h-3.5" /> Dossier PDF
                      </Link>
                      <button
                        onClick={() => toggleWatchlist(p.id)}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition"
                        title="Retirer de la Watchlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW: AGENT */}
      {role === 'agent' && (
        <div className="space-y-6">
          <div className="glass-card p-6 border-l-4 border-amber-500 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 border border-amber-500 text-amber-300 mb-2">
                <Briefcase className="w-3.5 h-3.5" /> Espace Agent & Représentation
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Portefeuille de Joueuses Mandatées (Alma 2019 & Partenaires)</h2>
              <p className="text-sm text-slate-300 mt-1">Suivez les échéances contractuelles, mettez en valeur vos athlètes et partagez des dossiers certifiés.</p>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 uppercase block">Valeur cumulée du mandat</span>
              <span className="text-xl font-extrabold text-amber-400">
                {formatCurrency(agentPlayers.reduce((sum, p) => sum + p.marketValueEur, 0), currency, true)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentPlayers.map((p) => (
              <div key={p.id} className="glass-card p-5 border-t-2 border-t-amber-500 space-y-4">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Link href={`/players/${p.id}?from=pro`} className="block flex-shrink-0">
                      <img 
                        src={p.photoUrl} 
                        alt={p.name} 
                        className="w-16 h-16 rounded-2xl object-cover object-top border border-amber-500/40 hover:border-amber-400 transition shadow" 
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-white text-base truncate">
                        <Link href={`/players/${p.id}?from=pro`} className="hover:text-purple-400 transition">
                          {p.name}
                        </Link>
                      </h4>
                      <span className="text-xs text-amber-300 font-semibold block truncate">{p.agent}</span>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{p.clubName}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleWatchlist(p.id)}
                    className={`p-2 rounded-xl border transition-all flex-shrink-0 ${
                      watchlist.includes(p.id)
                        ? 'bg-slate-950/80 border-amber-500/40 text-amber-400'
                        : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    title={watchlist.includes(p.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Star className={`w-4 h-4 ${watchlist.includes(p.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Fin de contrat</span>
                    <span className="font-bold text-white">{p.contractUntil}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Tendance</span>
                    <span className="font-bold text-green-400">{p.trending || '+15%'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
                  <span className="text-xs sm:text-sm font-extrabold text-green-400 truncate">
                    {formatCurrency(p.marketValueEur, currency, false)}
                  </span>
                  <div className="flex gap-1.5">
                    <Link
                      href={`/players/${p.id}?from=pro`}
                      className="px-2.5 py-1.5 border border-white/10 hover:bg-white/5 text-slate-300 rounded-xl text-[10px] sm:text-xs font-semibold transition"
                    >
                      Profil
                    </Link>
                    <Link
                      href={`/players/${p.id}/scout?from=pro`}
                      className="px-2.5 py-1.5 bg-amber-950/50 border border-amber-500/40 text-amber-300 rounded-xl text-[10px] sm:text-xs font-semibold hover:bg-amber-900 transition flex items-center gap-1"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Mandat
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: ADMIN */}
      {role === 'admin' && (
        <div className="space-y-6">
          <div className="glass-card p-6 border-l-4 border-purple-500 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 border border-purple-500 text-purple-300 mb-2">
                <Settings className="w-3.5 h-3.5" /> Back-Office Administration (Module 5.7)
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Tableau de Bord & Gouvernance des Données</h2>
              <p className="text-sm text-slate-300 mt-1">Gestion sans restriction de la base de données (joueuses, clubs) et contrôle du moteur de valorisation.</p>
            </div>
            <Link href="/valuation" className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-500 hover:to-green-500 text-white font-bold text-xs rounded-xl shadow-lg transition">
              Calibrer l'Algorithme Officiel
            </Link>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 text-center">
              <span className="text-xs uppercase text-slate-400 font-semibold block">Total Joueuses</span>
              <span className="text-2xl font-black text-purple-400">{allPlayers.length}</span>
            </div>
            <div className="glass-card p-4 text-center">
              <span className="text-xs uppercase text-slate-400 font-semibold block">Clubs Référencés</span>
              <span className="text-2xl font-black text-green-400">{allClubs.length}</span>
            </div>
            <div className="glass-card p-4 text-center">
              <span className="text-xs uppercase text-slate-400 font-semibold block">Valorisation Cumulée</span>
              <span className="text-2xl font-black text-amber-400">
                {formatCurrency(allPlayers.reduce((sum, p) => sum + p.marketValueEur, 0), currency, true)}
              </span>
            </div>
            <div className="glass-card p-4 text-center">
              <span className="text-xs uppercase text-slate-400 font-semibold block">Statut Moteur Algo</span>
              <span className="text-base font-bold text-emerald-400 mt-1 block">Actif & Calibré</span>
            </div>
          </div>

          {/* Sub Navigation Tabs for Back-Office */}
          <div className="flex border-b border-slate-800 gap-2">
            <button
              onClick={() => setAdminTab('players')}
              className={`px-4 py-3 text-xs font-bold border-b-2 transition ${
                adminTab === 'players'
                  ? 'border-purple-500 text-white bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Gestion des Joueuses ({allPlayers.length})
            </button>
            <button
              onClick={() => setAdminTab('clubs')}
              className={`px-4 py-3 text-xs font-bold border-b-2 transition ${
                adminTab === 'clubs'
                  ? 'border-purple-500 text-white bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Référencement des Clubs ({allClubs.length})
            </button>
            <button
              onClick={() => setAdminTab('algo')}
              className={`px-4 py-3 text-xs font-bold border-b-2 transition ${
                adminTab === 'algo'
                  ? 'border-purple-500 text-white bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Statut de l'Algorithme
            </button>
          </div>

          {/* Alert Success Banner */}
          {adminSuccess && (
            <div className="p-4 bg-green-950/60 border border-green-500/40 text-green-300 rounded-2xl text-xs font-bold animate-fadeIn">
              ✓ {adminSuccess}
            </div>
          )}

          {/* TAB 1: Gestion des Joueuses (CRUD sans restriction) */}
          {adminTab === 'players' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Selector / List */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-sm font-extrabold uppercase text-slate-200 tracking-wider">Sélectionner une joueuse</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setAdminSelectedPlayerId('new')}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold flex items-center justify-between transition ${
                      adminSelectedPlayerId === 'new'
                        ? 'bg-purple-950/60 border-purple-500 text-purple-300'
                        : 'bg-slate-900 border-white/5 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>➕ Créer un nouveau profil</span>
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                  </button>

                  <div className="h-[400px] overflow-y-auto space-y-2 pr-1">
                    {allPlayers.map((p) => (
                      <div
                        key={p.id}
                        className={`w-full p-2.5 rounded-xl border text-xs transition flex items-center justify-between gap-3 ${
                          adminSelectedPlayerId === p.id
                            ? 'bg-slate-800 border-purple-500/60 text-white'
                            : 'bg-slate-950/50 border-white/5 hover:bg-slate-900 text-slate-300'
                        }`}
                      >
                        <div
                          onClick={() => setAdminSelectedPlayerId(p.id)}
                          className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer select-none"
                        >
                          <img src={p.photoUrl} alt={p.name} className="w-8 h-8 rounded-lg object-cover object-top shrink-0" />
                          <div className="min-w-0">
                            <span className="font-bold block truncate">{p.name}</span>
                            <span className="text-[10px] text-slate-400 block truncate">{p.clubName} • {p.position}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-bold text-green-400 text-[10px]">{formatCurrency(p.marketValueEur, currency, false)}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDirectDeletePlayer(p.id, p.name);
                            }}
                            className="p-1.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-lg transition"
                            title="Supprimer le profil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Editor */}
              <div className="lg:col-span-2 glass-card p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-extrabold uppercase text-slate-200 tracking-wider">
                    {adminSelectedPlayerId === 'new' ? 'Création de Fiche Joueuse' : `Édition : ${pName}`}
                  </h3>
                  {adminSelectedPlayerId !== 'new' && (
                    <button
                      onClick={handleDeletePlayer}
                      className="px-2.5 py-1.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Supprimer
                    </button>
                  )}
                </div>

                <form onSubmit={handleSavePlayer} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Nom Complet</label>
                      <input 
                        type="text" 
                        value={pName} 
                        onChange={(e) => setPName(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        placeholder="Ex: Aitana Bonmatí" 
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Nom court d'affichage</label>
                      <input 
                        type="text" 
                        value={pShortName} 
                        onChange={(e) => setPShortName(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        placeholder="Ex: A. Bonmatí"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Nationalité</label>
                      <input 
                        type="text" 
                        value={pNationality} 
                        onChange={(e) => setPNationality(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        placeholder="Ex: Espagne" 
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Confédération</label>
                      <select 
                        value={pConfed} 
                        onChange={(e) => setPConfed(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="UEFA">UEFA (Europe)</option>
                        <option value="CAF">CAF (Afrique)</option>
                        <option value="CONCACAF">CONCACAF (Amérique du Nord)</option>
                        <option value="CONMEBOL">CONMEBOL (Amérique du Sud)</option>
                        <option value="AFC">AFC (Asie)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Poste</label>
                      <select 
                        value={pPosition} 
                        onChange={(e) => setPPosition(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="FW">FW (Attaquante)</option>
                        <option value="MF">MF (Milieu de terrain)</option>
                        <option value="DF">DF (Défenseuse)</option>
                        <option value="GK">GK (Gardienne)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Détail du poste</label>
                      <input 
                        type="text" 
                        value={pPositionDetail} 
                        onChange={(e) => setPPositionDetail(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        placeholder="Ex: Milieu offensive" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Pied fort</label>
                      <select 
                        value={pPreferredFoot} 
                        onChange={(e) => setPPreferredFoot(e.target.value as any)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="right">Droitier</option>
                        <option value="left">Gaucher</option>
                        <option value="both">Ambidextre</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Âge</label>
                      <input 
                        type="number" 
                        value={pAge} 
                        onChange={(e) => setPAge(Number(e.target.value))} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Taille (cm)</label>
                      <input 
                        type="number" 
                        value={pHeight} 
                        onChange={(e) => setPHeight(Number(e.target.value))} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Poids (kg)</label>
                      <input 
                        type="number" 
                        value={pWeight} 
                        onChange={(e) => setPWeight(Number(e.target.value))} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Club affilié</label>
                      <select 
                        value={pClubId} 
                        onChange={(e) => setPClubId(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      >
                        {allClubs.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Fin de contrat</label>
                      <input 
                        type="text" 
                        value={pContract} 
                        onChange={(e) => setPContract(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        placeholder="Ex: 2027-06-30" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Sélection Nationale</label>
                      <input 
                        type="text" 
                        value={pNationalTeam} 
                        onChange={(e) => setPNationalTeam(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Sélections / Caps</label>
                      <input 
                        type="number" 
                        value={pCaps} 
                        onChange={(e) => setPCaps(Number(e.target.value))} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Buts Internationaux</label>
                      <input 
                        type="number" 
                        value={pGoals} 
                        onChange={(e) => setPGoals(Number(e.target.value))} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Valeur Marchande (EUR)</label>
                      <input 
                        type="number" 
                        value={pMarketValue} 
                        onChange={(e) => setPMarketValue(Number(e.target.value))} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Nom de l'Agent représentant</label>
                      <input 
                        type="text" 
                        value={pAgent} 
                        onChange={(e) => setPAgent(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        placeholder="Ex: Alma 2019"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">URL Photo de portrait</label>
                      <input 
                        type="text" 
                        value={pPhoto} 
                        onChange={(e) => setPPhoto(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1 col-span-1 sm:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Biographie</label>
                      <textarea 
                        value={pBio} 
                        onChange={(e) => setPBio(e.target.value)} 
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        placeholder="Rédiger une brève biographie..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition shadow"
                    >
                      <Save className="w-4 h-4" /> Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: Référencement des Clubs */}
          {adminTab === 'clubs' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Existing Clubs list */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-sm font-extrabold uppercase text-slate-200 tracking-wider">Clubs actuellement Référencés ({allClubs.length})</h3>
                <div className="grid grid-cols-2 gap-2 max-h-[480px] overflow-y-auto pr-1">
                  {allClubs.map((club) => (
                    <div key={club.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-lg">{club.logo}</div>
                      <div className="min-w-0">
                        <span className="font-bold text-white block text-xs truncate">{club.name}</span>
                        <span className="text-[9px] text-slate-400 block truncate">{club.country} • {club.confed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Club Form */}
              <div className="glass-card p-6 space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-extrabold uppercase text-slate-200 tracking-wider">Référencer un Nouveau Club</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Enregistrez un nouveau club pour l'affecter aux joueuses.</p>
                </div>

                <form onSubmit={handleSaveClub} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Nom du Club</label>
                    <input 
                      type="text" 
                      value={cName} 
                      onChange={(e) => setCName(e.target.value)} 
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      placeholder="Ex: Paris FC" 
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Pays d'origine</label>
                    <input 
                      type="text" 
                      value={cCountry} 
                      onChange={(e) => setCCountry(e.target.value)} 
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      placeholder="Ex: France" 
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Ligue</label>
                      <select 
                        value={cLeagueId} 
                        onChange={(e) => setCLeagueId(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="liga-f">Liga F (Espagne)</option>
                        <option value="d1-arkema">Première Ligue (France)</option>
                        <option value="wsl">Super League (Angleterre)</option>
                        <option value="nwsl">NWSL (États-Unis)</option>
                        <option value="caf-wcl">CAF Champions League</option>
                        <option value="guinness-super-league">Guinness Super League (Cameroun)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Logo / Emoji</label>
                      <input 
                        type="text" 
                        value={cLogo} 
                        onChange={(e) => setCLogo(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                        placeholder="Ex: ⚽, 🗼, 🦁"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition shadow"
                    >
                      <Plus className="w-4 h-4" /> Enregistrer le Club
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

          {/* TAB 3: Algorithme d'Évaluation (Statut) */}
          {adminTab === 'algo' && (
            <div className="glass-card p-6 md:p-8 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-extrabold uppercase text-slate-200 tracking-wider">Calibration de l'Algorithme d'Évaluation Financière</h3>
                <p className="text-xs text-slate-400 mt-0.5">Le modèle combine plusieurs critères pondérés pour évaluer la valeur marchande.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                  <strong className="text-purple-300 block">Performance sportive (50%)</strong>
                  <p className="text-slate-450 leading-relaxed">Pondération des buts marqués, passes décisives, clean sheets et la note moyenne scout de la saison en cours.</p>
                </div>
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                  <strong className="text-green-300 block">Âge & Potentiel (30%)</strong>
                  <p className="text-slate-450 leading-relaxed">Prime de valeur pour les joueuses de moins de 23 ans (U21) et dépréciation progressive au-delà de 30 ans.</p>
                </div>
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                  <strong className="text-amber-300 block">Indice de Ligue & Statut (20%)</strong>
                  <p className="text-slate-450 leading-relaxed">Application de coefficients de ligue (WSL: 1.28, Liga F: 1.25) et bonus pour les caps en équipe nationale.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 border border-purple-900/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-white block text-sm">Réglage complet des coefficients du moteur</span>
                  <p className="text-xs text-slate-450">Pour ajuster les coefficients d'âge, les bonus de sélection nationale ou les coefficients de ligues tiers, utilisez le module dédié.</p>
                </div>
                <Link href="/valuation" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow">
                  Accéder à la console de calibrage
                </Link>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
