'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getAllPlayers } from '@/lib/data';
import { PlayerCard } from '@/components/PlayerCard';
import { useApp } from '@/components/Providers';
import { formatCurrency } from '@/lib/currency';
import { Search, LayoutGrid, Table, Eye, Split, Bookmark, SearchX } from 'lucide-react';
import { Player } from '@/types/player';

export default function PlayersDirectoryPage() {
  const [mounted, setMounted] = useState(false);
  const [playersList, setPlayersList] = useState<Player[]>([]);

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
  }, []);

  const allPlayers = mounted ? playersList : getAllPlayers();
  const { currency, toggleWatchlist, isInWatchlist, addComparison, lang } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [confed, setConfed] = useState('ALL');
  const [position, setPosition] = useState('ALL');
  const [sortBy, setSortBy] = useState('value_desc');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredPlayers = useMemo(() => {
    let list = [...allPlayers];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nationality.toLowerCase().includes(q) ||
          p.clubName.toLowerCase().includes(q) ||
          p.position.toLowerCase().includes(q)
      );
    }

    if (confed !== 'ALL') {
      list = list.filter((p) => p.confed === confed);
    }

    if (position !== 'ALL') {
      list = list.filter((p) => p.position === position);
    }

    if (sortBy === 'value_desc') {
      list.sort((a, b) => b.marketValueEur - a.marketValueEur);
    } else if (sortBy === 'value_asc') {
      list.sort((a, b) => a.marketValueEur - b.marketValueEur);
    } else if (sortBy === 'name_asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'age_asc') {
      list.sort((a, b) => a.age - b.age);
    } else if (sortBy === 'progress_desc') {
      list.sort((a, b) => (parseFloat(b.trending || '0') || 0) - (parseFloat(a.trending || '0') || 0));
    }

    return list;
  }, [allPlayers, searchQuery, confed, position, sortBy]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Directory Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            {lang === 'fr' ? 'Répertoire International des Joueuses' : 'International Players Directory'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {lang === 'fr' 
              ? 'Base de données multi-critères, statistiques et cotes marchandes actualisées.' 
              : 'Multi-criteria database, updated statistics and market values.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
              viewMode === 'cards'
                ? 'bg-purple-900/50 border-purple-500 text-white'
                : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> {lang === 'fr' ? 'Cartes' : 'Cards'}
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
              viewMode === 'table'
                ? 'bg-purple-900/50 border-purple-500 text-white'
                : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Table className="w-4 h-4" /> {lang === 'fr' ? 'Tableau' : 'Table'}
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder={lang === 'fr' ? 'Rechercher une joueuse, un club, un pays...' : 'Search player, club, country...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Confed */}
          <div>
            <select
              value={confed}
              onChange={(e) => setConfed(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 transition"
            >
              <option value="ALL">🌍 {lang === 'fr' ? 'Toutes les confédérations' : 'All Confederations'}</option>
              <option value="CAF">CAF ({lang === 'fr' ? 'Afrique' : 'Africa'})</option>
              <option value="UEFA">UEFA ({lang === 'fr' ? 'Europe' : 'Europe'})</option>
              <option value="CONCACAF">CONCACAF ({lang === 'fr' ? 'Am. Nord' : 'N. America'})</option>
              <option value="CONMEBOL">CONMEBOL ({lang === 'fr' ? 'Am. Sud' : 'S. America'})</option>
              <option value="AFC">AFC ({lang === 'fr' ? 'Asie' : 'Asia'})</option>
            </select>
          </div>

          {/* Position */}
          <div>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 transition"
            >
              <option value="ALL">⚽ {lang === 'fr' ? 'Tous les postes' : 'All Positions'}</option>
              <option value="FW">{lang === 'fr' ? 'Attaquante (FW)' : 'Forward (FW)'}</option>
              <option value="MF">{lang === 'fr' ? 'Milieu (MF)' : 'Midfielder (MF)'}</option>
              <option value="DF">{lang === 'fr' ? 'Défenseure (DF)' : 'Defender (DF)'}</option>
              <option value="GK">{lang === 'fr' ? 'Gardienne (GK)' : 'Goalkeeper (GK)'}</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 transition"
            >
              <option value="value_desc">💰 {lang === 'fr' ? 'Valeur (Décroissante)' : 'Value (High to Low)'}</option>
              <option value="value_asc">💰 {lang === 'fr' ? 'Valeur (Croissante)' : 'Value (Low to High)'}</option>
              <option value="name_asc">🔤 {lang === 'fr' ? 'Nom (A - Z)' : 'Name (A - Z)'}</option>
              <option value="age_asc">🎂 {lang === 'fr' ? 'Âge (Plus jeune)' : 'Age (Youngest)'}</option>
              <option value="progress_desc">📈 {lang === 'fr' ? 'Plus forte progression' : 'Highest Growth'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Content */}
      {filteredPlayers.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <SearchX className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-300">
            {lang === 'fr' ? 'Aucune joueuse ne correspond aux filtres' : 'No players match your filters'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'fr' 
              ? "Essayez d'ajuster votre recherche ou réinitialisez les filtres." 
              : 'Try adjusting your search terms or resetting the filters.'}
          </p>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>{lang === 'fr' ? 'Joueuse' : 'Player'}</th>
                  <th>{lang === 'fr' ? 'Poste' : 'Position'}</th>
                  <th>{lang === 'fr' ? 'Club' : 'Club'}</th>
                  <th>{lang === 'fr' ? 'Confédération' : 'Confederation'}</th>
                  <th>{lang === 'fr' ? 'Âge' : 'Age'}</th>
                  <th>{lang === 'fr' ? 'Sélections / Buts' : 'Caps / Goals'}</th>
                  <th className="text-right">{lang === 'fr' ? 'Valeur Marchande' : 'Market Value'}</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((p) => {
                  const formattedVal = formatCurrency(p.marketValueEur, currency, false);
                  const isWatchlisted = isInWatchlist(p.id);
                  return (
                    <tr key={p.id}>
                      <td className="font-bold text-white">
                        <div className="flex items-center gap-3">
                          <img src={p.photoUrl} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-purple-500/40" />
                          <div>
                            <Link href={`/players/${p.id}`} className="block hover:text-purple-400 transition">
                              {p.name}
                            </Link>
                            <span className="text-xs text-slate-400 font-normal">{p.nationality}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className="px-2 py-0.5 rounded text-xs bg-purple-950 text-purple-300 border border-purple-800">{p.position}</span></td>
                      <td>{p.clubName}</td>
                      <td><span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">{p.confed}</span></td>
                      <td>{p.age} {lang === 'fr' ? 'ans' : 'y.o.'}</td>
                      <td>
                        {p.caps} {lang === 'fr' ? 'sél.' : 'caps'} ({p.internationalGoals} {lang === 'fr' ? 'b.' : 'g.'})
                      </td>
                      <td className="text-right font-black text-green-400">{formattedVal}</td>
                      <td className="text-right space-x-1.5">
                        <Link href={`/players/${p.id}`} className="p-1.5 inline-block text-slate-400 hover:text-white rounded hover:bg-slate-800 transition" title={lang === 'fr' ? 'Voir fiche' : 'View profile'}>
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => addComparison(p.id)} className="p-1.5 text-slate-400 hover:text-purple-300 rounded hover:bg-slate-800 transition" title={lang === 'fr' ? 'Comparer' : 'Compare'}>
                          <Split className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleWatchlist(p.id)} className={`p-1.5 rounded hover:bg-slate-800 transition ${isWatchlisted ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`} title="Watchlist">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
