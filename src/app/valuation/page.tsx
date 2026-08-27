'use client';

import React from 'react';
import { getAllPlayers } from '@/lib/data';
import { AlgorithmSimulator } from '@/components/AlgorithmSimulator';
import { Cpu, Activity, Sparkles, Trophy, Globe, Calendar, Share2, Lock } from 'lucide-react';
import { useApp } from '@/components/Providers';

export default function ValuationPage() {
  const { role } = useApp();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const players = getAllPlayers();
  const samplePlayer = players[1] || players[0]; // Barbra Banda or first player

  if (!mounted) return null;

  if (role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#080C14] text-slate-200">
        <div className="max-w-md w-full glass-card p-8 border border-white/10 rounded-3xl text-center space-y-6 animate-fadeIn">
          <div className="mx-auto w-16 h-16 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-400 flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white uppercase tracking-wider">🔒 ACCÈS ADMINISTRATEUR REQUIS</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              La console de calibration de l'algorithme d'évaluation et de simulation de valorisation est réservée exclusivement aux administrateurs de la plateforme NextGen.
            </p>
          </div>
          <div className="p-4 bg-slate-950/80 border border-white/5 rounded-2xl text-left text-xs text-slate-300">
            💡 **Comment tester ?** Sélectionnez le rôle **Admin Back-Office** dans le sélecteur situé dans la barre de navigation en haut à droite.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-card p-8 border-l-4 border-green-500 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-950/80 border border-green-500/50 text-green-400 text-xs font-bold rounded-full">
            <Cpu className="w-3.5 h-3.5" /> SECTION 5.2 DU CAHIER DES CHARGES
          </div>
          <h1 className="text-3xl font-black text-white">Algorithme d'Évaluation de la Valeur Marchande</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Le cœur différenciant de la plateforme NextGen Women's Football : une formule multicritère mathématique, transparente et évolutive permettant d'estimer avec précision la valeur de transfert d'une joueuse.
          </p>
        </div>
      </div>

      {/* 7 Factors Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-5 border-t-2 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-purple-400 uppercase">Facteur 1 • 30%</span>
            <Activity className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="font-bold text-white text-base">Performance Sportive</h3>
          <p className="text-xs text-slate-400 mt-2">Statistiques de la saison et régularité : buts marqués, passes décisives, expected goals (xG), clean sheets gardienne, temps de jeu effectif.</p>
        </div>

        <div className="glass-card p-5 border-t-2 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-purple-400 uppercase">Facteur 2 • 20%</span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="font-bold text-white text-base">Âge & Potentiel</h3>
          <p className="text-xs text-slate-400 mt-2">Courbe d'âge et marge de progression. Prime pour les révélations U21 et maturité maximale entre 22 et 28 ans.</p>
        </div>

        <div className="glass-card p-5 border-t-2 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-purple-400 uppercase">Facteur 3 • 15%</span>
            <Trophy className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="font-bold text-white text-base">Compétitivité Championnat & Club</h3>
          <p className="text-xs text-slate-400 mt-2">Coefficients attribués à la ligue d'appartenance (Liga F, WSL, D1 Arkema, NWSL, CAF WCL) et classement continental du club.</p>
        </div>

        <div className="glass-card p-5 border-t-2 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-green-400 uppercase">Facteur 4 • 15%</span>
            <Globe className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="font-bold text-white text-base">Statut International & Sélections</h3>
          <p className="text-xs text-slate-400 mt-2">Titularisations en équipe nationale, impact lors de la Coupe du Monde, CAN Féminine, Euro Féminin et Jeux Olympiques.</p>
        </div>

        <div className="glass-card p-5 border-t-2 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-green-400 uppercase">Facteur 5 • 10%</span>
            <Calendar className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="font-bold text-white text-base">Durée Restante de Contrat</h3>
          <p className="text-xs text-slate-400 mt-2">Effet levier contractuel dans les négociations de transfert (plus le contrat est long, plus l'indemnité potentielle est élevée).</p>
        </div>

        <div className="glass-card p-5 border-t-2 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-green-400 uppercase">Facteurs 6 & 7 • 10%</span>
            <Share2 className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="font-bold text-white text-base">Image Commerciale & Risque Médical</h3>
          <p className="text-xs text-slate-400 mt-2">Visibilité digitale / sponsoring (5%) pondérée par l'historique d'indisponibilité et le risque de blessures (5%).</p>
        </div>
      </div>

      {/* Simulator Section */}
      <AlgorithmSimulator samplePlayer={samplePlayer} />
    </div>
  );
}
