'use client';

import React from 'react';
import Link from 'next/link';
import { getAllPlayers } from '@/lib/data';
import { useApp } from '@/components/Providers';
import { RadarChart } from '@/components/RadarChart';
import { formatCurrency } from '@/lib/currency';
import { calculateScoutOpportunity, getPlayerValuationExplanation } from '@/lib/valuation-engine';
import { Split, Trash2, X, Plus, UserPlus, FileText } from 'lucide-react';

import { Player } from '@/types/player';

export default function ComparePage() {
  const [mounted, setMounted] = React.useState(false);
  const [playersList, setPlayersList] = React.useState<Player[]>([]);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
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

  const allPlayers = mounted ? playersList : getAllPlayers();
  const { comparedIds, addComparison, removeComparison, clearComparison, currency, lang } = useApp();

  const maxSlots = isMobile ? 2 : 4;
  const comparedPlayers = allPlayers.filter((p) => comparedIds.includes(p.id)).slice(0, maxSlots);
  const activeSlotsCount = comparedPlayers.length;

  const handleAdd = (id: string) => {
    if (comparedPlayers.length >= maxSlots) {
      alert(lang === 'fr' 
        ? `En version mobile, vous ne pouvez pas comparer plus de ${maxSlots} joueuses. Veuillez d'abord en retirer une.`
        : `On mobile, you cannot compare more than ${maxSlots} players. Please remove one first.`);
      return;
    }
    addComparison(id);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100 font-outfit">
      {/* Header section matching Screenshot 1 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-900/30 border border-purple-500/40 text-purple-400 rounded-2xl">
            <Split className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'fr' ? 'Comparateur Multicritères de Joueuses' : 'Multi-Criteria Player Comparison'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'fr'
                ? `Comparez jusqu'à ${maxSlots} joueuses simultanément sur l'ensemble des métriques sportives et financières.`
                : `Compare up to ${maxSlots} players simultaneously across all sporting and financial metrics.`} ({activeSlotsCount} / {maxSlots} {lang === 'fr' ? 'actives' : 'active'})
            </p>
          </div>
        </div>
        {activeSlotsCount > 0 && (
          <button
            onClick={clearComparison}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-green-400 border border-green-500/30 bg-green-950/20 hover:bg-green-950/40 transition"
          >
            <Trash2 className="w-4 h-4 text-green-400" />
            <span>{lang === 'fr' ? 'TERMINER LA COMPARAISON' : 'END COMPARISON'}</span>
          </button>
        )}
      </div>

      {/* Grid of Slots matching Screenshot 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: maxSlots }).map((_, slotIdx) => {
          const player = comparedPlayers[slotIdx];

          if (player) {
            return (
              <div
                key={player.id}
                className="relative bg-slate-900/90 border-2 border-purple-500/60 rounded-2xl p-4 flex items-center justify-between hover:shadow-lg hover:shadow-purple-950/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-12 h-12 rounded-xl object-cover border border-purple-500/30"
                  />
                  <div>
                    <h3 className="font-extrabold text-white text-sm line-clamp-1">{player.name}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {player.clubName}
                    </p>
                    <p className="text-[11px] text-green-400 font-semibold mt-0.5">
                      {player.positionDetail.split(' ')[0] || player.position} • {player.age} {lang === 'fr' ? 'ans' : 'y.o.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full space-y-4">
                  <button
                    onClick={() => removeComparison(player.id)}
                    className="p-1 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 transition"
                    title={lang === 'fr' ? 'Enlever' : 'Remove'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 block">{lang === 'fr' ? 'Valeur' : 'Value'}</span>
                    <span className="text-xs font-extrabold text-green-400">
                      {formatCurrency(player.marketValueEur, currency, true)}
                    </span>
                  </div>
                  <Link
                    href={`/players/${player.id}`}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-300 rounded-lg transition border border-white/5"
                  >
                    {lang === 'fr' ? 'FICHE' : 'PROFILE'}
                  </Link>
                </div>
              </div>
            );
          }

          // Empty Slot
          return (
            <div
              key={`empty-${slotIdx}`}
              className="bg-slate-900/40 border-2 border-dashed border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3"
            >
              <div className="p-2.5 bg-slate-900 rounded-xl border border-white/5 text-slate-500">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  {lang === 'fr' ? 'EMPLACEMENT LIBRE' : 'FREE SLOT'}
                </span>
                <span className="text-[9px] text-slate-500">{lang === 'fr' ? 'CLIQUEZ POUR AJOUTER' : 'CLICK TO ADD'}</span>
              </div>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAdd(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full max-w-[160px] bg-slate-900 border border-slate-700 hover:border-purple-500 rounded-xl px-2 py-1.5 text-[11px] text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="">{lang === 'fr' ? '+ Choisir une joueuse...' : '+ Select a player...'}</option>
                {allPlayers
                  .filter((p) => !comparedIds.includes(p.id))
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </div>
          );
        })}
      </div>

      {activeSlotsCount === 0 ? (
        <div className="glass-card p-12 text-center">
          <Split className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-300">
            {lang === 'fr' ? 'Aucune joueuse sélectionnée pour la comparaison' : 'No players selected for comparison'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {lang === 'fr'
              ? "Utilisez les sélecteurs ci-dessus pour ajouter des joueuses et lancer l'analyse comparative."
              : 'Use the dropdowns above to add players and start the comparison analysis.'}
          </p>
        </div>
      ) : (
        <>
          {/* Radar Section matching Screenshot 2 */}
          <div className="glass-card p-6 md:p-8 space-y-6">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-widest block">
                {lang === 'fr' ? 'COMPARAISON VISUELLE MULTI-AXES (RADAR DYNAMIQUE)' : 'MULTI-AXIS VISUAL COMPARISON (DYNAMIC RADAR)'}
              </span>
              {/* Legend Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-3">
                {comparedPlayers.map((p, idx) => {
                  const colors = ['border-purple-500 text-purple-400', 'border-green-500 text-green-400', 'border-sky-400 text-sky-400', 'border-amber-500 text-amber-400'];
                  const colorClass = colors[idx % colors.length];
                  return (
                    <div
                      key={p.id}
                      className={`flex items-center gap-2 px-3 py-1 bg-slate-950/80 border rounded-xl text-xs font-semibold ${colorClass}`}
                    >
                      <img src={p.photoUrl} alt={p.name} className="w-5 h-5 rounded-md object-cover" />
                      <span>{p.name}</span>
                      <span className="text-[10px] text-slate-555 font-normal">({p.clubName})</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <RadarChart players={comparedPlayers} />
          </div>

          {/* Matrix Grid matching Screenshot 3 */}
          <div className="glass-card p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" /> {lang === 'fr' ? 'CRITÈRES & MÉTRIQUES' : 'CRITERIA & METRICS'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{lang === 'fr' ? 'Comparaison directe par attribut' : 'Direct attribute comparison'}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="custom-table text-xs">
                <thead>
                  <tr>
                    <th className="w-48 bg-slate-950 border-r border-white/5">{lang === 'fr' ? 'Métriques Clés' : 'Key Metrics'}</th>
                    {comparedPlayers.map((p) => (
                      <th key={p.id} className="text-center font-bold text-white bg-slate-900/60 p-4">
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={p.photoUrl}
                            alt={p.name}
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/50 shadow-md"
                          />
                          <span className="text-sm font-black text-white">{p.name.toUpperCase()}</span>
                          <span className="text-[10px] text-slate-400 block">{p.clubName.toUpperCase()}</span>
                          <span className="px-2 py-0.5 bg-slate-950 border border-white/5 rounded text-[9px] text-purple-300 font-bold uppercase">
                            {p.positionDetail.split(' ')[0] || p.position} • {p.nationality.toUpperCase()}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold text-slate-300 border-r border-white/5">{lang === 'fr' ? 'Valeur Marchande Estimée' : 'Estimated Market Value'}</td>
                    {comparedPlayers.map((p) => (
                      <td key={p.id} className="text-center font-black text-green-400 text-sm py-4">
                        {formatCurrency(p.marketValueEur, currency, false)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-slate-300 border-r border-white/5 py-3">
                      {lang === 'fr' ? 'Facteurs Explicatifs (Cote)' : 'Explaining Factors (Quote)'}
                      <span className="text-[10px] text-slate-500 block font-normal mt-0.5">{lang === 'fr' ? "Moteurs clés de l'évaluation" : 'Key engines of valuation'}</span>
                    </td>
                    {comparedPlayers.map((p) => {
                      const explanation = getPlayerValuationExplanation(p.id);
                      return (
                        <td key={p.id} className="text-left text-slate-400 text-[11px] p-3 leading-relaxed font-normal bg-slate-950/20 max-w-[220px]">
                          💡 {explanation}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="font-bold text-slate-300 border-r border-white/5">{lang === 'fr' ? 'Score Performance Algorithmique' : 'Algorithm Performance Score'}</td>
                    {comparedPlayers.map((p) => {
                      const perf = p.radarStats ? Math.round((p.radarStats.finishing + p.radarStats.playmaking + (p.radarStats.defense || 50)) / 3) : 80;
                      return (
                        <td key={p.id} className="text-center font-bold text-green-400 py-4">
                          {perf} / 100
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="font-bold text-slate-300 border-r border-white/5 py-3">
                      {lang === 'fr' ? 'Opportunité de Recrutement' : 'Scouting Opportunity'}
                      <span className="text-[10px] text-slate-500 block font-normal mt-0.5">{lang === 'fr' ? 'Rapport Performance / Prix (Scout)' : 'Performance / Price Ratio'}</span>
                    </td>
                    {comparedPlayers.map((p) => {
                      const perf = p.radarStats ? Math.round((p.radarStats.finishing + p.radarStats.playmaking + (p.radarStats.defense || 50)) / 3) : 80;
                      const opp = calculateScoutOpportunity(perf, p.marketValueEur);
                      return (
                        <td key={p.id} className="text-center p-3 bg-slate-900/10">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`text-xs font-black ${opp.colorClass}`}>
                              {opp.grade} <span className="text-[10px] font-bold text-slate-400">({opp.score}/100)</span>
                            </span>
                            <span className="text-[9px] text-slate-500 font-bold block">{opp.label}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="font-bold text-slate-300 border-r border-white/5">{lang === 'fr' ? 'Âge & Potentiel' : 'Age & Potential'}</td>
                    {comparedPlayers.map((p) => (
                      <td key={p.id} className="text-center text-slate-200 py-4">
                        <strong className="text-white">{p.age} {lang === 'fr' ? 'ans' : 'y.o.'}</strong> <span className="text-slate-500">({100 - p.age * 2}/100)</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-slate-300 border-r border-white/5 py-3">
                      {lang === 'fr' ? 'Club & Championnat' : 'Club & League'}
                    </td>
                    {comparedPlayers.map((p) => (
                      <td key={p.id} className="text-center text-slate-200 py-4 leading-relaxed">
                        <strong className="text-white block">{p.clubName}</strong>
                        <span className="text-slate-400 text-[11px]">{lang === 'fr' ? 'Championnat National' : 'Domestic League'}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-slate-300 border-r border-white/5">{lang === 'fr' ? 'Confédération & Nationalité' : 'Confederation & Nationality'}</td>
                    {comparedPlayers.map((p) => (
                      <td key={p.id} className="text-center text-slate-200 py-4">
                        {p.confed} • {p.nationality}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-bold text-slate-300 border-r border-white/5">{lang === 'fr' ? 'Gabarit (Taille / Poids)' : 'Physical Size (Height / Weight)'}</td>
                    {comparedPlayers.map((p) => (
                      <td key={p.id} className="text-center text-slate-200 py-4">
                        {p.height} cm / {p.weight} kg
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Clear Comparison Button (Desktop & Mobile) */}
          <div className="flex justify-center pt-6 pb-4">
            <button
              onClick={clearComparison}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-green-400 border border-green-500/30 bg-green-950/20 hover:bg-green-950/40 transition shadow-lg"
            >
              <Trash2 className="w-4 h-4 text-green-400" />
              <span>{lang === 'fr' ? 'TERMINER LA COMPARAISON' : 'END COMPARISON'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
