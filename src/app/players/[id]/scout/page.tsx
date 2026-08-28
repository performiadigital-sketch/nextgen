'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPlayerById } from '@/lib/data';
import { useApp } from '@/components/Providers';
import { formatCurrency } from '@/lib/currency';
import { Printer, X, ShieldCheck, Edit, Save, Undo2, Lock, ArrowLeft, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import LayoutFocusController from '../LayoutFocusController';

interface ScoutReportPageProps {
  params: {
    id: string;
  };
}

interface CustomScoutReportData {
  scoutName: string;
  date: string;
  scoutNote: string;
  strengths: string;
  weaknesses: string;
  recommendation: string;
  finishing: number;
  playmaking: number;
  pace: number;
  physique: number;
  defense: number;
  international: number;
}

export default function ScoutReportPage({ params }: ScoutReportPageProps) {
  const player = getPlayerById(params.id);
  const { currency, role, lang } = useApp();
  const [editMode, setEditMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fromPage, setFromPage] = useState<string | null>(null);

  // Form State
  const [scoutData, setScoutData] = useState<CustomScoutReportData>({
    scoutName: 'Scout Alma 2019',
    date: new Date().toISOString().substring(0, 10),
    scoutNote: '',
    strengths: '',
    weaknesses: '',
    recommendation: 'Acheter (Cible Prioritaire)',
    finishing: 80,
    playmaking: 80,
    pace: 85,
    physique: 80,
    defense: 60,
    international: 90,
  });

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    setFromPage(params.get('from'));
  }, []);

  // Load custom scout report from localStorage
  useEffect(() => {
    if (player && mounted) {
      const saved = localStorage.getItem(`nextgen_scout_report_${player.id}`);
      if (saved) {
        try {
          setScoutData(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse saved scout report", e);
        }
      } else {
        // Fallback defaults from player metrics
        setScoutData({
          scoutName: role === 'agent' ? 'Représentant Alma 2019' : 'Scout Principal NextGen',
          date: new Date().toISOString().substring(0, 10),
          scoutNote: player.biography || `Profil de très haut niveau international. Dominance athlétique, excellente rentabilité offensive et fort potentiel d'image. Cible de recrutement recommandée.`,
          strengths: player.position === 'FW' 
            ? 'Finition clinique, Vitesse de pointe, Élimination en 1v1' 
            : player.position === 'MF' 
            ? 'Vision de jeu, Transition offensive, Orientation du bloc' 
            : 'Rigueur de placement, Duel physique, Relance propre',
          weaknesses: 'Jeu sous haute pression défensive à parfaire',
          recommendation: 'Acheter (Cible Prioritaire)',
          finishing: player.radarStats?.finishing || 80,
          playmaking: player.radarStats?.playmaking || 80,
          pace: player.radarStats?.pace || 85,
          physique: player.radarStats?.physique || 80,
          defense: player.radarStats?.defense || 60,
          international: player.radarStats?.international || 90,
        });
      }
    }
  }, [player?.id, mounted, role]);

  if (!player) {
    return (
      <div className="min-h-screen bg-[#080C14] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold">Joueuse introuvable</h2>
        <Link href="/players" className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold">
          Retour à l'annuaire
        </Link>
      </div>
    );
  }

  const isAuthorized = role === 'recruiter' || role === 'agent' || role === 'admin';
  const formattedVal = formatCurrency(player.marketValueEur, currency, false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`nextgen_scout_report_${player.id}`, JSON.stringify(scoutData));
    setEditMode(false);
  };

  const handleReset = () => {
    if (window.confirm("Voulez-vous réinitialiser le rapport avec les valeurs par défaut de la joueuse ?")) {
      localStorage.removeItem(`nextgen_scout_report_${player.id}`);
      setScoutData({
        scoutName: 'Scout Principal NextGen',
        date: new Date().toISOString().substring(0, 10),
        scoutNote: player.biography || `Profil de très haut niveau international. Dominance athlétique, excellente rentabilité offensive et fort potentiel d'image. Cible de recrutement recommandée.`,
        strengths: player.position === 'FW' 
          ? 'Finition clinique, Vitesse de pointe, Élimination en 1v1' 
          : player.position === 'MF' 
          ? 'Vision de jeu, Transition offensive, Orientation du bloc' 
          : 'Rigueur de placement, Duel physique, Relance propre',
        weaknesses: 'Jeu sous haute pression défensive à parfaire',
        recommendation: 'Acheter (Cible Prioritaire)',
        finishing: player.radarStats?.finishing || 80,
        playmaking: player.radarStats?.playmaking || 80,
        pace: player.radarStats?.pace || 85,
        physique: player.radarStats?.physique || 80,
        defense: player.radarStats?.defense || 60,
        international: player.radarStats?.international || 90,
      });
      setEditMode(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-200 font-outfit pb-12 flex flex-col">
      {/* Immersive Focus Mode controller (Hides Navbar/Footer) */}
      <LayoutFocusController />

      {/* Dynamic Printing CSS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #scout-report-print-area, #scout-report-print-area * {
            visibility: visible !important;
          }
          #scout-report-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            background: #ffffff !important;
            color: #0f172a !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-bg-slate {
            background-color: #f8fafc !important;
            border-color: #e2e8f0 !important;
            color: #0f172a !important;
          }
          .print-text-dark {
            color: #0f172a !important;
          }
          .print-text-slate {
            color: #475569 !important;
          }
          .print-border {
            border-color: #cbd5e1 !important;
          }
        }
      `}</style>

      {/* Header bar (no-print) */}
      <header className="sticky top-0 z-[60] w-full bg-[#080C14]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 shadow-xl no-print">
        <div className="flex items-center gap-4">
          <Link 
            href={fromPage === 'pro' ? '/pro' : `/players/${player.id}`}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white font-bold text-xs transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {fromPage === 'pro' 
                ? (lang === 'fr' ? "Retour à l'Espace Pro" : "Back to Pro Space") 
                : (lang === 'fr' ? "Retour au profil" : "Back to profile")}
            </span>
          </Link>
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          <span className="text-xs text-purple-400 font-bold uppercase tracking-wider hidden sm:inline">
            {lang === 'fr' ? 'Dossier Scouting' : 'Scouting Folder'} • {player.shortName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-900/60 border border-purple-500/50 text-purple-300 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> PRO ACCESS ACTIVE
          </span>
        </div>
      </header>

      {/* Main Body container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div 
          id="scout-report-print-area"
          className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative"
        >
          {/* Header Title Section */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-5 mb-6 gap-4 no-print">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="NextGen Logo" className="h-10 object-contain" />
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {lang === 'fr' ? 'RAPPORT DE SCOUTING PROFESSIONNEL' : 'PROFESSIONAL SCOUTING REPORT'}
                </h2>
                <p className="text-xs text-purple-400 font-medium tracking-wide uppercase">NextGen Women's Football • Intelligence & Valuation</p>
              </div>
            </div>
          </div>

          {/* Print Only Header (Visible only when exporting/printing) */}
          <div className="hidden print:flex justify-between items-center border-b-2 border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-black text-xl tracking-tight text-slate-900">NEXTGEN</span>
              <div className="h-6 w-px bg-slate-300"></div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  {lang === 'fr' ? 'DOSSIER INDIVIDUEL DE RECRUTEMENT' : 'INDIVIDUAL RECRUITMENT DOSSIER'}
                </h2>
                <p className="text-[9px] text-slate-500 font-semibold uppercase">
                  {lang === 'fr' ? 'Rapport Confidentiel & Évaluation Financière' : 'Confidential Report & Financial Evaluation'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 border border-red-500 text-red-500 text-[8px] font-black uppercase rounded">
                {lang === 'fr' ? 'DOCUMENT CONFIDENTIEL' : 'CONFIDENTIAL DOCUMENT'}
              </span>
              <p className="text-[8px] text-slate-400 mt-1">
                {lang === 'fr' 
                  ? `Rédigé le ${scoutData.date} par ${scoutData.scoutName}` 
                  : `Written on ${scoutData.date} by ${scoutData.scoutName}`}
              </p>
            </div>
          </div>

          {/* ACCÈS RESTREINT PAYWALL (If user role is Public or Press) */}
          {!isAuthorized ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
              <div className="p-4 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-400 shadow-xl animate-pulse">
                <Lock className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-white uppercase tracking-wider">
                  {lang === 'fr' ? '🔒 Rapport Scout Confidentiel' : '🔒 Confidential Scouting Report'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'fr'
                    ? 'Les dossiers tactiques complets, observations de terrain et outils de rédaction de rapports sont réservés exclusivement aux recruteurs de clubs, directeurs sportifs et agents licenciés.'
                    : 'Full tactical files, field observations and report writing tools are reserved exclusively for club recruiters, sports directors and licensed agents.'}
                </p>
              </div>
              <div className="p-3.5 bg-slate-950/60 border border-white/5 rounded-2xl w-full text-left text-[11px] text-slate-300">
                {lang === 'fr'
                  ? '💡 Comment y accéder ? Veuillez modifier votre rôle actuel (Fan / Public) en sélectionnant Recruteur / Club ou Agent dans le switcher situé en haut à droite de la barre de navigation.'
                  : '💡 How to access? Please modify your current role (Fan / Public) by selecting Recruiter / Club or Agent in the switcher on the top right of the navigation bar.'}
              </div>
              <Link
                href={fromPage === 'pro' ? '/pro' : `/players/${player.id}`}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition block text-center"
              >
                {fromPage === 'pro' 
                  ? (lang === 'fr' ? "Retour à l'Espace Pro" : "Back to Pro Space") 
                  : (lang === 'fr' ? "Retour au profil de la joueuse" : "Back to player profile")}
              </Link>
            </div>
          ) : editMode ? (
            /* SCOUT REPORT EDITOR FORM MODE */
            <form onSubmit={handleSave} className="space-y-5 no-print text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 block font-bold">Nom du Scout / Mandataire</label>
                  <input 
                    type="text" 
                    value={scoutData.scoutName}
                    onChange={(e) => setScoutData({...scoutData, scoutName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 transition"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 block font-bold">Date de l'Observation</label>
                  <input 
                    type="date" 
                    value={scoutData.date}
                    onChange={(e) => setScoutData({...scoutData, date: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">Avis de Recrutement (Observations Générales)</label>
                <textarea 
                  rows={4}
                  value={scoutData.scoutNote}
                  onChange={(e) => setScoutData({...scoutData, scoutNote: e.target.value})}
                  placeholder="Rédigez l'analyse sportive et tactique ici..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 block font-bold">Points Forts Majeurs</label>
                  <input 
                    type="text" 
                    value={scoutData.strengths}
                    onChange={(e) => setScoutData({...scoutData, strengths: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 block font-bold">Points Faibles à travailler</label>
                  <input 
                    type="text" 
                    value={scoutData.weaknesses}
                    onChange={(e) => setScoutData({...scoutData, weaknesses: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                />
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Ajuster les Indices Sportifs (Base 100)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="space-y-1 bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Finition ({scoutData.finishing})</span>
                    <input type="range" min="30" max="100" value={scoutData.finishing} onChange={(e) => setScoutData({...scoutData, finishing: parseInt(e.target.value, 10)})} className="w-full accent-purple-500" />
                  </div>
                  <div className="space-y-1 bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Créativité ({scoutData.playmaking})</span>
                    <input type="range" min="30" max="100" value={scoutData.playmaking} onChange={(e) => setScoutData({...scoutData, playmaking: parseInt(e.target.value, 10)})} className="w-full accent-purple-500" />
                  </div>
                  <div className="space-y-1 bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Vitesse ({scoutData.pace})</span>
                    <input type="range" min="30" max="100" value={scoutData.pace} onChange={(e) => setScoutData({...scoutData, pace: parseInt(e.target.value, 10)})} className="w-full accent-green-500" />
                  </div>
                  <div className="space-y-1 bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Physique ({scoutData.physique})</span>
                    <input type="range" min="30" max="100" value={scoutData.physique} onChange={(e) => setScoutData({...scoutData, physique: parseInt(e.target.value, 10)})} className="w-full accent-green-500" />
                  </div>
                  <div className="space-y-1 bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Défense ({scoutData.defense})</span>
                    <input type="range" min="30" max="100" value={scoutData.defense} onChange={(e) => setScoutData({...scoutData, defense: parseInt(e.target.value, 10)})} className="w-full accent-blue-500" />
                  </div>
                  <div className="space-y-1 bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Rayonnement ({scoutData.international})</span>
                    <input type="range" min="30" max="100" value={scoutData.international} onChange={(e) => setScoutData({...scoutData, international: parseInt(e.target.value, 10)})} className="w-full accent-amber-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-slate-400 block font-bold">{lang === 'fr' ? 'Recommandation Finale' : 'Final Recommendation'}</label>
                  <select 
                    value={scoutData.recommendation}
                    onChange={(e) => setScoutData({...scoutData, recommendation: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-purple-300 font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="Acheter (Cible Prioritaire)">{lang === 'fr' ? 'Acheter (Cible Prioritaire)' : 'Buy (Priority Target)'}</option>
                    <option value="Suivre avec Attention">{lang === 'fr' ? 'Suivre avec Attention (Observation)' : 'Follow closely (Observation)'}</option>
                    <option value="Écarter du Recrutement">{lang === 'fr' ? 'Écarter (Ne correspond pas au projet)' : 'Discard (Does not fit project)'}</option>
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1"
                  >
                    <Save className="w-4 h-4" /> {lang === 'fr' ? 'Enregistrer les modifications' : 'Save changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 font-semibold"
                    title={lang === 'fr' ? 'Réinitialiser' : 'Reset'}
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* PREMIUM PREVIEW LAYOUT (A4 Print Area) */
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                
                {/* Profile card left column */}
                <div className="md:col-span-1 flex flex-col items-center text-center p-5 bg-slate-800/80 rounded-2xl border border-slate-700 print-bg-slate print-border">
                  <div className="relative mb-3.5 group">
                    <img
                      src={player.photoUrl}
                      alt={player.name}
                      className="w-32 h-32 sm:w-36 sm:h-36 aspect-square rounded-2xl object-cover object-top border-2 border-purple-500/60 shadow-xl print-border"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none"></div>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white leading-snug print-text-dark">{player.name}</h3>
                  <span className="inline-block mt-1 px-3 py-1 bg-slate-700 text-purple-300 text-[10px] font-bold rounded-lg print-bg-slate print-text-slate border print-border">
                    {player.positionDetail || player.position}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-2 print-text-slate">{player.clubName} • {player.nationality}</p>
                  
                  <div className="mt-4 w-full pt-3 border-t border-slate-700 text-center print-border">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-bold print-text-slate">
                      {lang === 'fr' ? 'Valeur Marchande Estimée' : 'Estimated Market Value'}
                    </span>
                    <span className="text-xl font-black text-green-400">{formattedVal}</span>
                  </div>
                </div>

                {/* Player details grid right column */}
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-[11px] print-text-dark">
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 print-bg-slate print-border">
                      <span className="text-slate-400 block text-[9px] font-bold uppercase print-text-slate">{lang === 'fr' ? 'Âge & Date de Naiss.' : 'Age & Date of Birth'}</span>
                      <span className="font-bold text-white text-xs mt-0.5 block print-text-dark">{player.age} {lang === 'fr' ? 'ans' : 'y.o.'} ({player.dob})</span>
                    </div>
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 print-bg-slate print-border">
                      <span className="text-slate-400 block text-[9px] font-bold uppercase print-text-slate">{lang === 'fr' ? 'Gabarit & Pied fort' : 'Physique & Strong Foot'}</span>
                      <span className="font-bold text-white text-xs mt-0.5 block print-text-dark">
                        {player.height} cm • {player.weight} kg • {player.preferredFoot === 'right' ? (lang === 'fr' ? 'Droitier' : 'Right-footed') : player.preferredFoot === 'left' ? (lang === 'fr' ? 'Gaucher' : 'Left-footed') : (lang === 'fr' ? 'Ambidextre' : 'Ambidextrous')}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 print-bg-slate print-border">
                      <span className="text-slate-400 block text-[9px] font-bold uppercase print-text-slate">{lang === 'fr' ? 'Sélection Nationale' : 'National Selection'}</span>
                      <span className="font-bold text-white text-xs mt-0.5 block print-text-dark">
                        {player.nationalTeam} ({player.caps} {lang === 'fr' ? 'sél.' : 'caps'}, {player.internationalGoals} {lang === 'fr' ? 'buts' : 'goals'})
                      </span>
                    </div>
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 print-bg-slate print-border">
                      <span className="text-slate-400 block text-[9px] font-bold uppercase print-text-slate">{lang === 'fr' ? 'Statut Contractuel' : 'Contract Status'}</span>
                      <span className="font-bold text-amber-400 text-xs mt-0.5 block print-text-dark">
                        {lang === 'fr' ? `Contrat jusqu'en ${player.contractUntil}` : `Contract until ${player.contractUntil}`}
                      </span>
                    </div>
                  </div>

                  {/* Technical Ratings visual gauges */}
                  <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 print-bg-slate print-border">
                    <h4 className="text-[10px] font-bold uppercase text-slate-300 tracking-wider mb-3 print-text-dark">
                      {lang === 'fr' ? 'Indices de Performance NextGen (Base 100)' : 'NextGen Performance Indices (Base 100)'}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] print-text-dark">
                      <div className="p-2 bg-slate-950/65 rounded-lg border border-slate-800 print-bg-slate print-border flex justify-between items-center">
                        <span className="text-slate-400 print-text-slate">{lang === 'fr' ? 'Finition' : 'Finishing'}</span>
                        <strong className="text-purple-400 text-xs print-text-dark">{scoutData.finishing}/100</strong>
                      </div>
                      <div className="p-2 bg-slate-950/65 rounded-lg border border-slate-800 print-bg-slate print-border flex justify-between items-center">
                        <span className="text-slate-400 print-text-slate">{lang === 'fr' ? 'Créativité' : 'Creativity'}</span>
                        <strong className="text-purple-400 text-xs print-text-dark">{scoutData.playmaking}/100</strong>
                      </div>
                      <div className="p-2 bg-slate-950/65 rounded-lg border border-slate-800 print-bg-slate print-border flex justify-between items-center">
                        <span className="text-slate-400 print-text-slate">{lang === 'fr' ? 'Vitesse' : 'Pace'}</span>
                        <strong className="text-green-400 text-xs print-text-dark">{scoutData.pace}/100</strong>
                      </div>
                      <div className="p-2 bg-slate-950/65 rounded-lg border border-slate-800 print-bg-slate print-border flex justify-between items-center">
                        <span className="text-slate-400 print-text-slate">{lang === 'fr' ? 'Physique' : 'Physicality'}</span>
                        <strong className="text-green-400 text-xs print-text-dark">{scoutData.physique}/100</strong>
                      </div>
                      <div className="p-2 bg-slate-950/65 rounded-lg border border-slate-800 print-bg-slate print-border flex justify-between items-center">
                        <span className="text-slate-400 print-text-slate">{lang === 'fr' ? 'Défense' : 'Defense'}</span>
                        <strong className="text-blue-400 text-xs print-text-dark">{scoutData.defense}/100</strong>
                      </div>
                      <div className="p-2 bg-slate-950/65 rounded-lg border border-slate-800 print-bg-slate print-border flex justify-between items-center">
                        <span className="text-slate-400 print-text-slate">{lang === 'fr' ? 'Rayonnement' : 'Influence'}</span>
                        <strong className="text-amber-400 text-xs print-text-dark">{scoutData.international}/100</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tactical Notes & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-950/65 rounded-2xl border border-slate-800 print-bg-slate print-border space-y-2">
                  <h4 className="text-[10px] font-bold uppercase text-purple-400 tracking-wider print-text-slate">
                    {lang === 'fr' ? 'Observations de la Cellule de Recrutement' : 'Recruitment Cell Observations'}
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed italic print-text-dark font-normal">
                    "{scoutData.scoutNote}"
                  </p>
                </div>
                <div className="p-4 bg-slate-950/65 rounded-2xl border border-slate-800 print-bg-slate print-border space-y-3">
                  <h4 className="text-[10px] font-bold uppercase text-green-400 tracking-wider print-text-slate">
                    {lang === 'fr' ? "Profil D'Opportunité & Cible" : 'Opportunity & Target Profile'}
                  </h4>
                  <div className="text-[11px] space-y-1.5 print-text-dark font-normal">
                    <div><span className="text-slate-400 print-text-slate">{lang === 'fr' ? 'Points Forts :' : 'Strengths:'}</span> <strong className="text-white print-text-dark">{scoutData.strengths}</strong></div>
                    <div><span className="text-slate-400 print-text-slate">{lang === 'fr' ? 'Faiblesses :' : 'Weaknesses:'}</span> <strong className="text-slate-300 print-text-dark">{scoutData.weaknesses}</strong></div>
                    <div className="pt-1.5 flex items-center gap-1">
                      <span className="text-slate-400 print-text-slate">{lang === 'fr' ? 'Recommandation :' : 'Recommendation:'}</span>
                      <span className="px-2 py-0.5 rounded bg-purple-900/40 border border-purple-500/30 text-purple-300 font-extrabold text-[10px] print-bg-slate print-text-dark print-border">
                        {scoutData.recommendation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signature validation watermark */}
              <div className="hidden print:flex justify-between items-center border-t border-slate-300 pt-4 text-[9px] text-slate-500 font-medium">
                <span>
                  {lang === 'fr' ? 'NextGen Scouting Operations • Yaoundé, Cameroun' : 'NextGen Scouting Operations • Yaounde, Cameroon'}
                </span>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span>
                    {lang === 'fr' 
                      ? `Rapport Validé & Signé Électriquement par ${scoutData.scoutName}` 
                      : `Report Validated & Electronically Signed by ${scoutData.scoutName}`}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Footer Actions (no-print) */}
          {isAuthorized && (
            <div className="pt-4 border-t border-slate-700 flex flex-wrap items-center justify-between text-xs gap-3 no-print mt-4">
              <span className="text-slate-400">
                {lang === 'fr' ? 'Rédacteur :' : 'Author:'} <strong className="text-white">{scoutData.scoutName}</strong> ({scoutData.date})
              </span>
              <div className="flex gap-2">
                {!editMode ? (
                  <>
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/5 rounded-xl font-bold transition flex items-center gap-1.5"
                    >
                      <Edit className="w-4 h-4" /> {lang === 'fr' ? 'Éditer le Rapport' : 'Edit Report'}
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-green-600 text-white font-bold rounded-xl shadow hover:opacity-90 transition flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4" /> {lang === 'fr' ? 'Imprimer / PDF' : 'Print / PDF'}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                  >
                    {lang === 'fr' ? "Annuler l'édition" : 'Cancel editing'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
