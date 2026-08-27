import React from 'react';
import Link from 'next/link';
import { Compass, FileQuestion } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center p-6 space-y-6 animate-fadeIn">
      <div className="p-4 rounded-full bg-purple-900/30 border border-purple-500/40 text-purple-400">
        <FileQuestion className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white">Page Introuvable (404)</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Le profil de la joueuse, l'article ou la ressource que vous recherchez n'existe pas ou a été déplacé.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-xs shadow-lg shadow-purple-950/50 hover:opacity-95 transition flex items-center gap-2"
        >
          <Compass className="w-4 h-4" /> Retourner à l'Accueil
        </Link>
      </div>
    </div>
  );
}
