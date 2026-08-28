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

    const stadiumFallbacks = [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&auto=format&fit=crop&q=80',
    ];

    allPlayers.forEach((player, pIdx) => {
      const saved = localStorage.getItem(`nextgen_player_posts_${player.id}`);
      let posts = [];

      const playerDefaultVid = player.videoGallery?.[0];
      const playerStadiumThumb = playerDefaultVid?.thumbnail || stadiumFallbacks[pIdx % stadiumFallbacks.length];

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
            thumbnail: playerStadiumThumb
          }
        ];
        posts = defaultVideos.map((vid, idx) => ({
          id: `init-vid-${player.id}-${idx}`,
          type: 'video',
          title: vid.title,
          url: vid.url,
          thumbnail: vid.thumbnail || playerStadiumThumb,
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
      videoPosts.forEach((post: any, vIdx: number) => {
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

        // Ensure thumbnail is a stadium/pitch image rather than portrait
        let videoThumbnail = post.thumbnail;
        if (!videoThumbnail || videoThumbnail === player.photoUrl || videoThumbnail.includes('supabase.co/storage/v1/object/public/nextmedia/')) {
          videoThumbnail = playerStadiumThumb || stadiumFallbacks[(pIdx + vIdx) % stadiumFallbacks.length];
        }

        combinedVideos.push({
          id: post.id,
          type: 'video',
          title: post.title,
          url: post.url,
          thumbnail: videoThumbnail,
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

    // Sort by totalScore descending, then take top 4
    const top4 = combinedVideos
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 4);

    setTopVideos(top4);
  }, []);

  if (!mounted) return null;

  const rankBadgeStyles = [
    'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-amber-500/25',
    'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 shadow-slate-400/20',
    'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-orange-600/20',
    'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-500/20',
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Film className="w-6 h-6 text-purple-400" /> 
            {lang === 'fr' ? 'Top 4 des Vidéos Vedettes' : 'Top 4 Featured Videos'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {lang === 'fr' 
              ? 'Temps forts et gestes techniques les mieux notés de nos joueuses' 
              : 'Highest rated highlights and skills from our featured players'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {topVideos.map((vid, idx) => {
          const rankBadge = rankBadgeStyles[idx] || rankBadgeStyles[3];

          return (
            <div 
              key={`${vid.id}-${idx}`}
              className="glass-card group relative flex flex-col justify-between h-full rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 transform hover:-translate-y-1 bg-slate-900/70"
            >
              {/* Media Preview Container */}
              <div 
                className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setActiveVideoUrl(vid.url)}
              >
                <img 
                  src={vid.thumbnail} 
                  alt={vid.title} 
                  className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" 
                />
                
                {/* Sleek Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none"></div>

                {/* Ranking Ribbon */}
                <div className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-xs font-black shadow-lg flex items-center gap-1 ${rankBadge}`}>
                  <span>#</span>{idx + 1}
                </div>

                {/* Stars Count badge */}
                <div className="absolute top-2.5 right-2.5 px-2 py-1 bg-slate-950/80 border border-white/10 rounded-lg text-amber-400 text-[10px] font-bold flex items-center gap-1 backdrop-blur-md shadow-md">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{vid.average} <span className="text-[8px] text-slate-400 font-normal">({vid.votesCount})</span></span>
                </div>

                {/* Centered Glowing Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-green-500/90 text-slate-950 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:bg-green-400 transition-all duration-300 pl-0.5">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Video and Player Details */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-slate-900/80">
                <div className="space-y-1">
                  <h3 
                    onClick={() => setActiveVideoUrl(vid.url)}
                    className="font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-purple-300 transition-colors cursor-pointer"
                    title={vid.title}
                  >
                    {vid.title}
                  </h3>
                </div>

                {/* Player Tag */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <Link 
                    href={`/players/${vid.player.id}`}
                    className="flex items-center gap-2.5 min-w-0 flex-1 group/player"
                  >
                    <img 
                      src={vid.player.photoUrl} 
                      alt={vid.player.name} 
                      className="w-8 h-8 rounded-full object-cover object-top ring-2 ring-purple-500/30 group-hover/player:ring-purple-400 transition shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-xs text-slate-200 block truncate leading-tight group-hover/player:text-purple-300 transition">
                        {vid.player.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate leading-tight mt-0.5">
                        {vid.player.clubName} • {vid.player.position}
                      </span>
                    </div>
                  </Link>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setActiveVideoUrl(vid.url)}
                      className="p-1.5 rounded-lg bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-slate-950 border border-green-500/20 transition-all duration-200"
                      title={lang === 'fr' ? 'Regarder la vidéo' : 'Watch video'}
                    >
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                    <Link 
                      href={`/players/${vid.player.id}`}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-400 hover:text-white border border-white/5 transition-all duration-200"
                      title={lang === 'fr' ? 'Fiche joueuse' : 'Player profile'}
                    >
                      <Eye className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal overlay */}
      {activeVideoUrl && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveVideoUrl(null)}
        >
          <button
            onClick={() => setActiveVideoUrl(null)}
            className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full text-white transition focus:outline-none border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          <div 
            className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
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
