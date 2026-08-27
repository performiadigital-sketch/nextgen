'use client';

import React, { useEffect } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('NextGen Platform Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-6">
      <div className="p-4 rounded-full bg-rose-900/30 border border-rose-500/40 text-rose-400">
        <AlertTriangle className="w-12 h-12" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-white">Une erreur est survenue !</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          L'application a rencontré un problème inattendu. Nos équipes ont été notifiées.
        </p>
        {error.message && (
          <code className="block p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-rose-300 font-mono max-w-lg mx-auto overflow-x-auto">
            {error.message}
          </code>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Réessayer
        </button>
        <a
          href="/"
          className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5 font-semibold text-xs transition"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
