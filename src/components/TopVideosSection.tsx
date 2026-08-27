'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Player } from '@/types/player';
import { getAllPlayers } from '@/lib/data';
import { useApp } from '@/components/Providers';
import { Play, Star, Eye, X, Film } from 'lucide-react';

interface VideoPostWithPlayer {
  id: string;
  type: 'video';
  title: string;
  url: string;
  thumbnail: string;
  totalScore: number;
  average: string;
  votesCount: number;
  createdAt: string;
  player: {
    id: string;
    name: string;
    photoUrl: string;
    clubName: string;
    position: string;
  };
}

export function TopVideosSection() {
  const { lang } = useApp();
  const [topVideos, setTopVideos] = useState<VideoPostWithPlayer[]>([]);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const allPlayers = getAllPlayers();
    const combinedVideos: VideoPostWithPlayer[] = [];

    allPlayers.forEach((player) => {
      const saved = localStorage.getItem(`nextgen_player_posts_${player.id}`);
      let posts = [];

      if (saved) {
        try {
          posts = JSON.parse(saved);
        } catch (e) {}
      } else {
        // Fallback to initial mock posts for default stars matching PlayerMediaGallery
        const defaultVideos = player.videoGallery || [
          {
            title: `Actions marquantes et temps forts de la saison — ${player.shortName}`,
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: player.photoUrl
          }
        ];
        posts = defaultVideos.map((vid, idx) => ({
          id: `init-vid-${player.id}-${idx}`,
          type: 'video',
          title: vid.title,
          url: vid.url,
          thumbnail: vid.thumbnail || player.photoUrl,
          ratings: [
            { user: 'init-user-1', score: 5 },
            { user: 'init-user-2', score: 4 },
            { user: 'init-user-3', score: 5 }
          ],
          createdAt: new Date(Date.now() - 86400000 * (idx + 1)).toISOString()
        }));
      }

      // Filter and append video posts
      const videoPosts = posts.filter((p: any) => p.type === 'video');
      videoPosts.forEach((post: any) => {
        // Handle migration from old stars: number schema if needed
        let ratings = post.ratings || [];
        if (!post.ratings && typeof post.stars === 'number') {
          ratings = [];
          for (let i = 0; i < post.stars; i++) {
            ratings.push({ user: `migrated-${i}`, score: 5 });
          }
        }

        const totalScore = ratings.reduce((sum: number, r: any) => sum + r.score, 0);
        const average = ratings.length > 0 ? (totalScore / ratings.length).toFixed(1) : '0.0';
        const votesCount = ratings.length;

        combinedVideos.push({
          id: post.id,
          type: 'video',
          title: post.title,
          url: post.url,
          thumbnail: post.thumbnail || player.photoUrl,
          totalScore,
          average,
          votesCount,
          createdAt: post.createdAt,
          player: {
            id: player.id,
            name: player.name,
            photoUrl: player.photoUrl,
            clubName: player.clubName,
            position: player.position
          }
        });
      });
    });

    // Sort by totalScore descending, then take top 5
    const top5 = combinedVideos
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 5);

    setTopVideos(top5);
  }, []);

  if (!mounted) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Film className="w-6 h-6 text-purple-400" /> 
            {lang === 'fr' ? 'Top 5 des Vidéos les plus Populaires' : 'Top 5 Most Popular Videos'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {lang === 'fr' 
              ? 'Temps forts et gestes techniques les mieux notés par les membres NextGen' 
              : 'Highlights and technical skills rated highest by NextGen members'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {topVideos.map((vid, idx) => {
          // The first one is featured larger
          const isFeatured = idx === 0;

          return (
            <div 
              key={`${vid.id}-${idx}`}
              className={`glass-card overflow-hidden group relative flex flex-col justify-between transition hover:border-purple-500/30 ${
                isFeatured ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              {/* Media Preview Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img 
                  src={vid.thumbnail} 
                  alt={vid.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500" 
                />
                
                {/* Ranking Ribbon */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-purple-600 border border-purple-500/50 text-white rounded-lg text-xs font-black shadow-lg flex items-center gap-1">
                  <span>#</span>{idx + 1}
                </div>

                {/* Stars Count badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-slate-950/80 border border-amber-500/30 rounded-lg text-amber-400 text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{vid.average} <span className="text-[8px] text-slate-400 font-normal">({vid.votesCount})</span></span>
                </div>

                {/* Play Button Overlay */}
                <div 
                  onClick={() => setActiveVideoUrl(vid.url)}
                  className="absolute inset-0 bg-black/45 flex items-center justify-center cursor-pointer"
                >
                  <span className="p-3.5 rounded-full bg-green-500 text-slate-950 shadow-lg group-hover:scale-110 transition duration-300">
                    <Play className="w-5 h-5 fill-current" />
                  </span>
                </div>
              </div>

              {/* Video and Player Details */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-slate-900/60">
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-xs sm:text-xs leading-snug line-clamp-2 group-hover:text-purple-300 transition">
                    {vid.title}
                  </h3>
                </div>

                {/* Player Tag */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <Link 
                    href={`/players/${vid.player.id}`}
                    className="flex items-center gap-2 min-w-0"
                  >
                    <img 
                      src={vid.player.photoUrl} 
                      alt={vid.player.name} 
                      className="w-7 h-7 rounded-full object-cover object-top border border-purple-500/50" 
                    />
                    <div className="min-w-0">
                      <span className="font-bold text-[10px] text-slate-200 block truncate leading-tight hover:text-purple-300">
                        {vid.player.name}
                      </span>
                      <span className="text-[8px] text-slate-400 block truncate leading-tight">
                        {vid.player.clubName}
                      </span>
                    </div>
                  </Link>

                  <Link 
                    href={`/players/${vid.player.id}`}
                    className="text-[9px] font-black text-purple-400 hover:text-purple-300 shrink-0"
                    title={lang === 'fr' ? 'Fiche joueuse' : 'Player profile'}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal overlay */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveVideoUrl(null)}
            className="absolute top-4 right-4 p-2 bg-slate-900 hover:bg-slate-800 rounded-full text-white transition focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src={activeVideoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
