import React from 'react';
import Link from 'next/link';
import { getAllNews } from '@/lib/data';
import { Newspaper, ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const news = getAllNews();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Actualités, Mercato & Analyses</h1>
        <p className="text-sm text-slate-400 mt-1">L'actualité financière et sportive du football féminin mondial décryptée par NextGen.</p>
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
    </div>
  );
}
