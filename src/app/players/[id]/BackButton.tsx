'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/components/Providers';

export default function BackButton() {
  const router = useRouter();
  const { lang } = useApp();
  const [hasHistory, setHasHistory] = useState(false);
  const [fromPage, setFromPage] = useState<string | null>(null);

  useEffect(() => {
    // Check search parameters for referral page
    const params = new URLSearchParams(window.location.search);
    setFromPage(params.get('from'));
    setHasHistory(window.history.length > 1 && !!document.referrer);
  }, []);

  const handleBack = () => {
    if (fromPage === 'pro') {
      router.push('/pro');
    } else if (hasHistory) {
      router.back();
    } else {
      router.push('/players');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition focus:outline-none bg-transparent border-none cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" /> 
      <span>
        {fromPage === 'pro' 
          ? (lang === 'fr' ? "Retour à l'Espace Pro" : "Back to Pro Space") 
          : (lang === 'fr' ? "Retour" : "Back")}
      </span>
    </button>
  );
}
