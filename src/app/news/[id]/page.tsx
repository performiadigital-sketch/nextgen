import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllNews } from '@/lib/data';
import { ArrowLeft, Newspaper } from 'lucide-react';

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const news = getAllNews();
  return news.map((n) => ({
    id: n.id,
  }));
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const article = getAllNews().find((n) => n.id === params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      <Link href="/news" className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition">
        <ArrowLeft className="w-4 h-4" /> Retour aux actualités
      </Link>

      <article className="glass-card p-6 md:p-10 space-y-6">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-purple-900/60 text-purple-300 font-bold text-xs rounded-full border border-purple-500/40">
            {article.category}
          </span>
          <span className="text-xs text-slate-400">{article.date} • {article.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-2 text-xs text-slate-400 border-b border-slate-800 pb-4">
          <span>Par <strong>{article.author}</strong></span>
          <span>•</span>
          <span>NextGen Intelligence</span>
        </div>

        <img
          src={article.image}
          alt={article.title}
          className="w-full h-80 object-cover rounded-2xl border border-white/10 shadow-xl"
        />

        <div className="text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-line pt-4">
          {article.content}
        </div>
      </article>
    </div>
  );
}
