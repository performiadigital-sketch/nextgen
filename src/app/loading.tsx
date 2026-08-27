import React from 'react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      {/* Dynamic pulse spinner with brand colors */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 border-r-green-500 animate-spin"></div>
      </div>
      
      <div className="text-center space-y-1">
        <h3 className="text-sm font-bold text-white tracking-wide uppercase">Chargement des données...</h3>
        <p className="text-xs text-slate-400">NextGen Women's Football Intelligence</p>
      </div>
    </div>
  );
}
