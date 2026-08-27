'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode } from '@/lib/currency';
import { Language } from '@/lib/i18n';

export type UserRole = 'public' | 'recruiter' | 'agent' | 'player' | 'admin';

interface AppContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  lang: Language;
  setLang: (l: Language) => void;
  role: UserRole;
  setRole: (r: UserRole) => void;
  watchlist: string[];
  toggleWatchlist: (id: string) => boolean;
  isInWatchlist: (id: string) => boolean;
  comparedIds: string[];
  addComparison: (id: string) => boolean;
  removeComparison: (id: string) => void;
  clearComparison: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('EUR');
  const [lang, setLangState] = useState<Language>('fr');
  const [role, setRoleState] = useState<UserRole>('public');
  const [watchlist, setWatchlist] = useState<string[]>(['barbra-banda', 'tabitha-chawinga', 'melchie-dumornay']);
  const [comparedIds, setComparedIds] = useState<string[]>(['barbra-banda', 'tabitha-chawinga']);

  useEffect(() => {
    const savedCur = localStorage.getItem('nextgen_cur') as CurrencyCode;
    if (savedCur) setCurrencyState(savedCur);

    const savedLang = localStorage.getItem('nextgen_lng') as Language;
    if (savedLang) setLangState(savedLang);

    const savedRole = localStorage.getItem('nextgen_usr_role') as UserRole;
    if (savedRole) setRoleState(savedRole);

    const savedWl = localStorage.getItem('nextgen_wl');
    if (savedWl) {
      try { setWatchlist(JSON.parse(savedWl)); } catch (e) {}
    }

    const savedCmp = localStorage.getItem('nextgen_cmp');
    if (savedCmp) {
      try { setComparedIds(JSON.parse(savedCmp)); } catch (e) {}
    }
    const handleGlobalError = (event: ErrorEvent) => {
      const errMessage = event.error ? event.error.stack || event.error.message : event.message;
      alert(`[NextGen UI Crash Debugger]\n\nUne erreur s'est produite :\n${errMessage}`);
    };
    window.addEventListener('error', handleGlobalError);

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errMessage = event.reason ? event.reason.stack || event.reason.message || event.reason : "Rejection inconnue";
      alert(`[NextGen UI Promise Crash Debugger]\n\nUne promesse a échoué :\n${errMessage}`);
    };
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem('nextgen_cur', c);
  };

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('nextgen_lng', l);
  };

  const setRole = (r: UserRole) => {
    setRoleState(r);
    localStorage.setItem('nextgen_usr_role', r);
  };

  const toggleWatchlist = (id: string): boolean => {
    let updated: string[];
    let isAdded = false;
    if (watchlist.includes(id)) {
      updated = watchlist.filter((p) => p !== id);
      isAdded = false;
    } else {
      updated = [...watchlist, id];
      isAdded = true;
    }
    setWatchlist(updated);
    localStorage.setItem('nextgen_wl', JSON.stringify(updated));
    return isAdded;
  };

  const isInWatchlist = (id: string): boolean => watchlist.includes(id);

  const addComparison = (id: string): boolean => {
    if (comparedIds.length >= 4) {
      alert(lang === 'fr' ? 'Vous pouvez comparer au maximum 4 joueuses simultanément.' : 'You can compare up to 4 players simultaneously.');
      return false;
    }
    if (!comparedIds.includes(id)) {
      const updated = [...comparedIds, id];
      setComparedIds(updated);
      localStorage.setItem('nextgen_cmp', JSON.stringify(updated));
      return true;
    }
    return false;
  };

  const removeComparison = (id: string) => {
    const updated = comparedIds.filter((p) => p !== id);
    setComparedIds(updated);
    localStorage.setItem('nextgen_cmp', JSON.stringify(updated));
  };

  const clearComparison = () => {
    setComparedIds([]);
    localStorage.setItem('nextgen_cmp', JSON.stringify([]));
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        lang,
        setLang,
        role,
        setRole,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        comparedIds,
        addComparison,
        removeComparison,
        clearComparison,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within a Providers component');
  }
  return context;
}
