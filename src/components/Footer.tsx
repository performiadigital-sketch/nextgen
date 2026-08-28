'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from './Providers';

export function Footer() {
  const { role } = useApp();
  const isPro = role === 'recruiter' || role === 'agent' || role === 'admin';

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 mt-16 pt-12 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Presentation */}
          <div className="md:col-span-2 space-y-4">
            <img src="/images/logo.png" alt="NextGen Logo" className="h-10 object-contain" />
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              NextGen Women's Football est la plateforme de référence internationale dédiée à la présentation, au suivi statistique et à l'estimation de la valeur marchande des joueuses de football féminin.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-purple-300">
              <span>En collaboration avec le réseau d'agences partenaires & experts data (Yaoundé, Cameroun)</span>
            </div>
          </div>

          {/* Confederations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Confédérations Couvertes</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> CAF (Afrique & WAFCON)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> UEFA (Europe & Champions League)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> CONCACAF (Am. Nord & NWSL)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> CONMEBOL (Copa Libertadores)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> AFC & OFC (Asie & Océanie)</li>
            </ul>
          </div>

          {/* Modules Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Plateforme & Outils</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link href="/players" className="hover:text-purple-400 transition">Profils & Fiches Joueuses</Link></li>
              {role === 'admin' && <li><Link href="/valuation" className="hover:text-green-400 transition font-semibold text-green-400">Algorithme d'Évaluation (Formule & Simulateur)</Link></li>}
              {isPro && <li><Link href="/compare" className="hover:text-purple-400 transition">Comparateur Multi-Profils</Link></li>}
              <li><Link href="/rankings" className="hover:text-purple-400 transition">Classements & Clubs</Link></li>
              {isPro && <li><Link href="/pro" className="hover:text-purple-400 transition">Espace Recrutement & Scouts</Link></li>}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 NextGen Women's Football. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>NextGen Analytics — Yaoundé, Cameroun</span>
            <span>•</span>
            <span>Version 1.0 — Architecture Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
