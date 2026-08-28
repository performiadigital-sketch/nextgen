'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPlayers, getStoredPlayers, getAllNews } from '@/lib/data';
import { PlayerCard } from '@/components/PlayerCard';
import { Compass, Cpu, Split, Star, ArrowRight, TrendingUp, Newspaper, Zap } from 'lucide-react';
import { TopVideosSection } from '@/components/TopVideosSection';
import { Player } from '@/types/player';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setMounted(true);
    setPlayers(getStoredPlayers());
  }, []);

  // SSR fallback to prevent hydration mismatch
  const initialPlayers = getAllPlayers();
  const activePlayers = mounted ? players : initialPlayers;

  const featuredPlayers = activePlayers.filter((p) => p.featured).slice(0, 4);
  const trendingPlayers = [...activePlayers]
    .sort((a, b) => {
      const bTrend = parseFloat(b.trending?.replace('%', '').replace('+', '') || '0');
      const aTrend = parseFloat(a.trending?.replace('%', '').replace('+', '') || '0');
      return bTrend - aTrend;
    })
    .slice(0, 4);
  const news = getAllNews().slice(0, 3);

  return (
    <div className="space-y-12 animate-fadeIn text-slate-200">
      {/* Hero Section */}
      <section className="relative rounded-3xl p-8 md:p-14 overflow-hidden border border-purple-500/20 bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-950 shadow-2xl">
        {/* Background Hero Image with sleek overlay */}
        <img 
          src="https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/Hero.png" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 z-0 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent z-0 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/40 text-purple-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
            <span>NextGen Women's Football • Indice Mondial de Référence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            L'Indice Mondial d'Évaluation & de Valorisation des <span className="brand-gradient-text">Joueuses de Football</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Données statistiques fiables, couverture multi-confédérations (CAF, UEFA, CONCACAF, CONMEBOL, AFC) et algorithme transparent d'estimation de la valeur marchande.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/players"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-sm shadow-lg shadow-purple-950/50 hover:opacity-95 transition flex items-center gap-2"
            >
              <Compass className="w-4 h-4" /> Explorer les Joueuses
            </Link>
            <Link
              href="/valuation"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-green-950/50 hover:opacity-95 transition flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" /> Moteur d'Algorithme
            </Link>
            <Link
              href="/compare"
              className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-white/10 font-semibold text-sm transition flex items-center gap-2"
            >
              <Split className="w-4 h-4" /> Comparateur
            </Link>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <span className="text-xs uppercase text-slate-400 font-semibold block">Joueuses Indexées</span>
            <span className="text-2xl sm:text-3xl font-black text-purple-400">{activePlayers.length}+</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <span className="text-xs uppercase text-slate-400 font-semibold block">Clubs & Sélections</span>
            <span className="text-2xl sm:text-3xl font-black text-green-400">45+</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <span className="text-xs uppercase text-slate-400 font-semibold block">Confédérations</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">6 (CAF / UEFA...)</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <span className="text-xs uppercase text-slate-400 font-semibold block">Couverture</span>
            <span className="text-xl sm:text-2xl font-black text-white">Mondiale</span>
          </div>
        </div>
      </section>

      {/* Featured Players Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-400" /> Joueuses Vedettes Internationales
            </h2>
            <p className="text-sm text-slate-400 mt-1">Les profils phares valorisés par l'algorithme NextGen Women's Football</p>
          </div>
          <Link href="/players" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
            Voir toutes <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredPlayers.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      </section>

      {/* Top Starred Videos Section */}
      <TopVideosSection />

      {/* Algorithm Spotlight */}
      <section className="glass-card p-8 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-950/65 border border-green-500/40 text-green-400 text-xs font-bold rounded-full">
              <Zap className="w-3.5 h-3.5" /> CŒUR DIFFÉRENCIANT (SECTION 5.2)
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Un Modèle d'Évaluation Scientifique & Multi-Critères</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              NextGen Women's Football comble le déficit d'outils analytiques dans le football féminin mondial grâce à un algorithme pondéré prenant en compte les performances réelles, la dynamique d'âge, le statut international et l'exposition médiatique.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                <strong className="text-purple-400 block font-bold">30%</strong> Performance Sportive
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                <strong className="text-purple-400 block font-bold">20%</strong> Âge & Potentiel
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                <strong className="text-purple-400 block font-bold">15%</strong> Compétitivité Club
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                <strong className="text-green-400 block font-bold">15%</strong> Statut International
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                <strong className="text-green-400 block font-bold">10%</strong> Durée Contrat
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                <strong className="text-green-400 block font-bold">10%</strong> Image & Disponibilité
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/valuation"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Tester le Simulateur de Pondération
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm p-6 bg-slate-900/90 border border-purple-500/40 rounded-3xl shadow-xl space-y-4 text-center">
              <img src="/images/logo.png" alt="NextGen Logo" className="h-12 mx-auto object-contain mb-2" />
              <h4 className="text-base font-bold text-white">Indice Officiel NextGen</h4>
              <p className="text-xs text-slate-400">Outil de négociation certifié pour les agences, clubs recruteurs et médias sportifs.</p>
              <div className="p-3 bg-purple-950/40 border border-purple-700/40 rounded-2xl text-left text-xs space-y-1.5 text-purple-200">
                <div className="flex justify-between"><span>Partenaire Représentation :</span> <strong className="text-white">Agences Partenaires Agréées</strong></div>
                <div className="flex justify-between"><span>Conception & Stratégie :</span> <strong className="text-white">NextGen Data Lab</strong></div>
                <div className="flex justify-between"><span>Couverture :</span> <strong className="text-white">Internationale (6 Confédérations)</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Trending Progressions */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" /> Top Progressions & Tendances
            </h2>
            <p className="text-sm text-slate-400 mt-1">Les joueuses enregistrant la plus forte hausse de valeur marchande</p>
          </div>
          <Link href="/rankings" className="text-xs font-bold text-green-400 hover:text-green-300 flex items-center gap-1">
            Classements complets <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {trendingPlayers.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-purple-400" /> Actualités, Mercato & Analyses
            </h2>
            <p className="text-sm text-slate-400 mt-1">Dernières publications éditoriales et insights data</p>
          </div>
          <Link href="/news" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
            Tous les articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((n) => (
            <div key={n.id} className="glass-card overflow-hidden group flex flex-col justify-between">
              <div className="relative h-48 overflow-hidden">
                <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-900/80 text-purple-300 border border-purple-500/50 backdrop-blur-md">
                  {n.category}
                </span>
                <span className="absolute bottom-3 left-3 text-[11px] text-slate-300">{n.date} • {n.readTime}</span>
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-slate-900/80">
                <div>
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-purple-300 transition">{n.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3">{n.summary}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{n.author}</span>
                  <Link href={`/news/${n.id}`} className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                    Lire <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
