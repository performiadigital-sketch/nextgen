'use client';

import React, { useState } from 'react';
import { Player } from '@/types/player';
import { ValuationWeights } from '@/types/valuation';
import { DEFAULT_WEIGHTS, evaluatePlayer, calculateScoutOpportunity, getPlayerValuationExplanation } from '@/lib/valuation-engine';
import { useApp } from './Providers';
import { formatCurrency } from '@/lib/currency';
import { RefreshCw, RotateCcw, Zap, Sparkles, TrendingUp } from 'lucide-react';

interface AlgorithmSimulatorProps {
  samplePlayer: Player;
}

export function AlgorithmSimulator({ samplePlayer }: AlgorithmSimulatorProps) {
  const { currency } = useApp();
  const [weights, setWeights] = useState<ValuationWeights>({ ...DEFAULT_WEIGHTS });

  const evalResult = evaluatePlayer(samplePlayer, weights);
  const formattedVal = formatCurrency(evalResult.estimatedValue, currency, false);

  const handleSliderChange = (key: keyof ValuationWeights, val: number) => {
    setWeights((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setWeights({ ...DEFAULT_WEIGHTS });
  };

  return (
    <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-700/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-950/60 border border-green-500/40 text-green-400 text-xs font-bold rounded-full mb-2">
            <Zap className="w-3.5 h-3.5" /> SIMULATEUR EN DIRECT
          </div>
          <h3 className="text-xl font-bold text-white">Simulation d'Évaluation sur {samplePlayer.name}</h3>
          <p className="text-xs text-slate-400 mt-1">{samplePlayer.clubName} • {samplePlayer.nationality} • {samplePlayer.positionDetail}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 px-5 py-3 rounded-2xl text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Cote Marchande Finale</span>
            <span className="text-2xl font-black text-green-400">{formattedVal}</span>
          </div>
          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Restaurer pondérations par défaut"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between font-semibold">
            <span className="text-slate-300">Performance Sportive</span>
            <span className="text-purple-400 font-bold">{weights.performance}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            value={weights.performance}
            onChange={(e) => handleSliderChange('performance', parseInt(e.target.value, 10))}
            className="w-full accent-purple-500"
          />
        </div>

        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between font-semibold">
            <span className="text-slate-300">Âge & Potentiel</span>
            <span className="text-purple-400 font-bold">{weights.agePotential}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            value={weights.agePotential}
            onChange={(e) => handleSliderChange('agePotential', parseInt(e.target.value, 10))}
            className="w-full accent-purple-500"
          />
        </div>

        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between font-semibold">
            <span className="text-slate-300">Niveau Ligue & Club</span>
            <span className="text-purple-400 font-bold">{weights.leagueClub}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            value={weights.leagueClub}
            onChange={(e) => handleSliderChange('leagueClub', parseInt(e.target.value, 10))}
            className="w-full accent-purple-500"
          />
        </div>

        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between font-semibold">
            <span className="text-slate-300">Statut International</span>
            <span className="text-green-400 font-bold">{weights.international}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            value={weights.international}
            onChange={(e) => handleSliderChange('international', parseInt(e.target.value, 10))}
            className="w-full accent-green-500"
          />
        </div>

        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between font-semibold">
            <span className="text-slate-300">Durée Restante Contrat</span>
            <span className="text-green-400 font-bold">{weights.contract}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="25"
            value={weights.contract}
            onChange={(e) => handleSliderChange('contract', parseInt(e.target.value, 10))}
            className="w-full accent-green-500"
          />
        </div>

        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between font-semibold">
            <span className="text-slate-300">Image & Visibilité Digitale</span>
            <span className="text-green-400 font-bold">{weights.mediaBrand}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            value={weights.mediaBrand}
            onChange={(e) => handleSliderChange('mediaBrand', parseInt(e.target.value, 10))}
            className="w-full accent-green-500"
          />
        </div>
      </div>

      {/* Composite Score, Scout Opportunity & Explanations Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
        {/* Composite & Value */}
        <div className="lg:col-span-4 p-5 bg-slate-950/80 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase text-slate-500 block font-bold tracking-wider">Score Composite Obtenu</span>
            <span className="text-3xl font-black text-white mt-1 block">{evalResult.compositeScore} / 100</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Ce score alimente la courbe exponentielle calculant la valeur marchande de {samplePlayer.shortName} ({formattedVal}).
          </p>
        </div>

        {/* Option B: Indice d'Opportunité Scout */}
        {(() => {
          const opp = calculateScoutOpportunity(evalResult.compositeScore, evalResult.estimatedValue);
          return (
            <div className="lg:col-span-4 p-5 bg-gradient-to-br from-slate-950 to-green-950/20 rounded-2xl border border-green-500/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-550 block font-bold tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-green-400" /> OPPORTUNITÉ DE RECRUTEMENT
                </span>
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className={`text-2xl font-black ${opp.colorClass}`}>{opp.grade}</span>
                  <span className="text-slate-400 text-xs font-bold">Ratio : {opp.score}/100</span>
                </div>
              </div>
              <p className={`text-[11px] font-bold ${opp.colorClass} mt-2`}>
                Statut : {opp.label}
              </p>
            </div>
          );
        })()}

        {/* Option C: Facteur Explicatif de la Côte */}
        {(() => {
          const explanation = getPlayerValuationExplanation(samplePlayer.id);
          return (
            <div className="lg:col-span-4 p-5 bg-slate-950/80 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-500 block font-bold tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-400" /> PONDÉRATIONS ET CONTEXTE
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal mt-2">
                  💡 {explanation}
                </p>
              </div>
              <span className="text-[9px] text-slate-500 block mt-2">Source : Modèle d'évaluation NextGen</span>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
