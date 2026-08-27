'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp, UserRole } from './Providers';
import { CurrencyCode } from '@/lib/currency';
import {
  Home,
  Users,
  Split,
  Trophy,
  Newspaper,
  Briefcase,
  User,
  Menu,
  X,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency, lang, setLang, role, setRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic Navigation Items based on active role
  const getNavItems = () => {
    const homeItem = { label: lang === 'fr' ? 'Accueil' : 'Home', href: '/', icon: Home };
    const playersItem = { label: lang === 'fr' ? 'Joueuses' : 'Players', href: '/players', icon: Users };
    const compareItem = { label: lang === 'fr' ? 'Comparateur' : 'Comparison', href: '/compare', icon: Split };
    const rankingsItem = { label: lang === 'fr' ? 'Classements' : 'Rankings', href: '/rankings', icon: Trophy };
    const newsItem = { label: lang === 'fr' ? 'Actualités' : 'News', href: '/news', icon: Newspaper };
    const proItem = { label: lang === 'fr' ? 'Espace Pro' : 'Pro Space', href: '/pro', icon: Briefcase };
    const playerProfileItem = { label: lang === 'fr' ? 'Mon Profil' : 'My Profile', href: '/player-profile', icon: User };

    if (role === 'public') {
      return [homeItem, playersItem, rankingsItem, newsItem];
    }
    if (role === 'player') {
      return [homeItem, playersItem, rankingsItem, newsItem, playerProfileItem];
    }
    if (role === 'recruiter' || role === 'agent') {
      return [playersItem, compareItem, rankingsItem, newsItem, proItem];
    }
    // Admin role sees all options
    return [homeItem, playersItem, compareItem, rankingsItem, newsItem, proItem];
  };

  const navItems = getNavItems();
  const showCurrencySelector = role === 'recruiter' || role === 'agent' || role === 'admin';

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080C14]/85 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer flex-shrink-0 z-10 mr-3 sm:mr-6">
            <img
              src="/images/logo.png"
              alt="NextGen Women's Football"
              className="h-10 sm:h-12 w-auto object-contain block flex-shrink-0"
              style={{ display: 'block', maxHeight: '48px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-900/60 to-green-950/40 text-white border border-purple-500/50 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Currency, Language & Pro Role Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Currency Selector (devices options) */}
            {showCurrencySelector && (
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-slate-900 border border-slate-700 hover:border-purple-500 rounded-xl px-2.5 py-1.5 text-xs text-green-400 font-bold focus:outline-none transition cursor-pointer animate-fadeIn"
              >
                <option value="EUR">€ EUR</option>
                <option value="USD">$ USD</option>
                <option value="FCFA">FCFA</option>
                <option value="GBP">£ GBP</option>
              </select>
            )}

            {/* Language Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-0.5 text-xs">
              <button
                onClick={() => setLang('fr')}
                className={`px-2 py-1 rounded-lg font-bold transition ${
                  lang === 'fr' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg font-bold transition ${
                  lang === 'en' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Role Selector */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-slate-900 border border-slate-700 hover:border-green-500 rounded-xl px-3 py-1.5 text-xs text-purple-300 font-semibold focus:outline-none transition cursor-pointer"
            >
              <option value="public">👤 {lang === 'fr' ? 'Public / Fan' : 'Public / Fan'}</option>
              <option value="player">🏃 {lang === 'fr' ? 'Joueuse connectée' : 'Logged-in Player'}</option>
              <option value="recruiter">🛡️ {lang === 'fr' ? 'Recruteur / Club' : 'Recruiter / Club'}</option>
              <option value="agent">💼 {lang === 'fr' ? 'Agent (Alma 2019)' : 'Agent (Alma 2019)'}</option>
              <option value="admin">⚙️ {lang === 'fr' ? 'Admin Back-Office' : 'Admin Back-Office'}</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {showCurrencySelector && (
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-green-400 font-bold"
              >
                <option value="EUR">€</option>
                <option value="USD">$</option>
                <option value="FCFA">FCFA</option>
                <option value="GBP">£</option>
              </select>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-2"
                >
                  <Icon className="w-4 h-4 text-purple-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Langue:</span>
              <button
                onClick={() => setLang('fr')}
                className={`px-2 py-0.5 rounded font-bold ${lang === 'fr' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded font-bold ${lang === 'en' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
              >
                EN
              </button>
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-slate-800 border border-slate-700 rounded p-1 text-xs text-purple-300"
            >
              <option value="public">👤 {lang === 'fr' ? 'Public / Fan' : 'Public / Fan'}</option>
              <option value="player">🏃 {lang === 'fr' ? 'Joueuse connectée' : 'Logged-in Player'}</option>
              <option value="recruiter">🛡️ {lang === 'fr' ? 'Recruteur / Club' : 'Recruiter / Club'}</option>
              <option value="agent">💼 {lang === 'fr' ? 'Agent (Alma 2019)' : 'Agent (Alma 2019)'}</option>
              <option value="admin">⚙️ {lang === 'fr' ? 'Admin Back-Office' : 'Admin Back-Office'}</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
