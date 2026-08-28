'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Player } from '@/types/player';
import { useApp } from '@/components/Providers';
import { Play, Eye, X, Star, MessageSquare, Send, Plus, Film, Image as ImageIcon, Trash2 } from 'lucide-react';

interface Comment {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

interface Rating {
  user: string;
  score: number; // 1 to 5
}

interface Post {
  id: string;
  type: 'photo' | 'video';
  title: string;
  url: string;
  thumbnail: string;
  ratings: Rating[];
  comments: Comment[];
  createdAt: string;
}

interface PlayerMediaGalleryProps {
  player: Player;
}

function getInitialPosts(player: Player): Post[] {
  const initial: Post[] = [];

  const stadiumThumb = player.videoGallery?.[0]?.thumbnail || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80';
  const defaultVideos = player.videoGallery || [
    {
      title: `Actions marquantes et temps forts de la saison — ${player.shortName}`,
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: stadiumThumb
    }
  ];

  defaultVideos.forEach((vid, idx) => {
    initial.push({
      id: `init-vid-${player.id}-${idx}`,
      type: 'video',
      title: vid.title,
      url: vid.url,
      thumbnail: vid.thumbnail || stadiumThumb,
      ratings: [
        { user: 'init-user-1', score: 5 },
        { user: 'init-user-2', score: 4 },
        { user: 'init-user-3', score: 5 }
      ],
      comments: [
        {
          id: `init-c1-${idx}`,
          authorName: 'Jean Dupont',
          authorRole: 'recruiter',
          content: 'Physique et vision du jeu exceptionnels !',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        }
      ],
      createdAt: new Date(Date.now() - 86400000 * (idx + 1)).toISOString()
    });
  });

  const defaultPhotos = player.photoGallery || [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80'
  ];

  defaultPhotos.forEach((url, idx) => {
    initial.push({
      id: `init-photo-${player.id}-${idx}`,
      type: 'photo',
      title: `Session d'entraînement et préparation physique #${idx + 1}`,
      url: url,
      thumbnail: url,
      ratings: [
        { user: 'init-user-1', score: 4 },
        { user: 'init-user-2', score: 4 }
      ],
      comments: [],
      createdAt: new Date(Date.now() - 86400000 * (idx + 3)).toISOString()
    });
  });

  return initial.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function getEmbedUrl(url: string) {
  let embedUrl = url.trim();
  if (embedUrl.includes('youtube.com/watch?v=')) {
    embedUrl = embedUrl.replace('watch?v=', 'embed/');
  } else if (embedUrl.includes('youtu.be/')) {
    const parts = embedUrl.split('/');
    const id = parts[parts.length - 1];
    embedUrl = `https://www.youtube.com/embed/${id}`;
  }
  return embedUrl;
}

export default function PlayerMediaGallery({ player }: PlayerMediaGalleryProps) {
  const { role, lang } = useApp();
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  // Post Creator States
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState<'photo' | 'video'>('photo');

  // Comment input state per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Hover state for interactive 5-star rating (postId -> score rating 1-5)
  const [hoveredStars, setHoveredStars] = useState<Record<string, number | null>>({});

  // Preview states
  const [activePost, setActivePost] = useState<Post | null>(null);

  // Authenticated user check
  const activePlayerId = typeof window !== 'undefined' ? localStorage.getItem('nextgen_active_player_id') : null;
  const isOwner = role === 'player' && activePlayerId === player.id;
  const isAuthenticated = role !== 'public';

  // Get localized Role Label
  const getRoleLabel = (r: string) => {
    switch (r) {
      case 'admin': return lang === 'fr' ? 'Administrateur' : 'Administrator';
      case 'recruiter': return lang === 'fr' ? 'Recruteur' : 'Recruteur';
      case 'agent': return lang === 'fr' ? 'Agent' : 'Agent';
      case 'player': return lang === 'fr' ? 'Joueuse' : 'Player';
      default: return lang === 'fr' ? 'Membre' : 'Member';
    }
  };

  useEffect(() => {
    setMounted(true);
    const savedPosts = localStorage.getItem(`nextgen_player_posts_${player.id}`);
    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts);
        // Handle migration from old stars: number schema if present
        const migrated = parsed.map((p: any) => {
          if (!p.ratings) {
            const simulatedRatings: Rating[] = [];
            const count = p.stars || 0;
            // Simulate count ratings of 5 stars
            for (let i = 0; i < count; i++) {
              simulatedRatings.push({ user: `migrated-${i}`, score: 5 });
            }
            return { ...p, ratings: simulatedRatings };
          }
          return p;
        });
        setPosts(migrated);
      } catch (e) {
        const fallback = getInitialPosts(player);
        setPosts(fallback);
        localStorage.setItem(`nextgen_player_posts_${player.id}`, JSON.stringify(fallback));
      }
    } else {
      const fallback = getInitialPosts(player);
      setPosts(fallback);
      localStorage.setItem(`nextgen_player_posts_${player.id}`, JSON.stringify(fallback));
    }
  }, [player.id]);

  if (!mounted) return null;

  // Handle Publish Post
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    let finalUrl = newUrl.trim();
    let thumbnail = player.photoUrl;

    if (newType === 'video') {
      finalUrl = getEmbedUrl(finalUrl);
      thumbnail = player.videoGallery?.[0]?.thumbnail || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80';
    } else {
      thumbnail = finalUrl;
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      type: newType,
      title: newTitle.trim(),
      url: finalUrl,
      thumbnail: thumbnail,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem(`nextgen_player_posts_${player.id}`, JSON.stringify(updated));

    // Reset fields
    setNewTitle('');
    setNewUrl('');
  };

  // Handle Delete Post (Owner only)
  const handleDeletePost = (postId: string) => {
    if (!isOwner) return;
    const updated = posts.filter(p => p.id !== postId);
    setPosts(updated);
    localStorage.setItem(`nextgen_player_posts_${player.id}`, JSON.stringify(updated));
  };

  // Handle Star (1 to 5 stars) Submission
  const handleRatePost = (postId: string, score: number) => {
    if (!isAuthenticated) return;

    const userVoteKey = `${role}-${activePlayerId || 'member'}`;

    const updated = posts.map(post => {
      if (post.id === postId) {
        let ratings = [...(post.ratings || [])];
        const existingVoteIndex = ratings.findIndex(r => r.user === userVoteKey);

        if (existingVoteIndex > -1) {
          // If already voted, update score (or do nothing if user changes rating, user wanted single vote)
          ratings[existingVoteIndex].score = score;
        } else {
          // Add new vote
          ratings.push({ user: userVoteKey, score });
        }

        return { ...post, ratings };
      }
      return post;
    });

    setPosts(updated);
    localStorage.setItem(`nextgen_player_posts_${player.id}`, JSON.stringify(updated));
  };

  // Handle Comment Submission
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim() || !isAuthenticated) return;

    // Get commenter's name based on role
    let authorName = 'Anonyme';
    if (role === 'admin') authorName = 'Administrateur NextGen';
    else if (role === 'recruiter') authorName = 'Recruteur Club';
    else if (role === 'agent') authorName = 'Agent Joueuse';
    else if (role === 'player') {
      const activeId = localStorage.getItem('nextgen_active_player_id');
      if (activeId === player.id) {
        authorName = `${player.name} (Auteur)`;
      } else {
        authorName = lang === 'fr' ? 'Autre Joueuse' : 'Other Player';
      }
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorName,
      authorRole: role,
      content: text.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    });

    setPosts(updated);
    localStorage.setItem(`nextgen_player_posts_${player.id}`, JSON.stringify(updated));

    // Clear comment input
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="glass-card p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-sm font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-400" /> {lang === 'fr' ? 'Fil de Publications' : 'Publication Feed'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'fr' ? 'Espace communautaire et suivi des performances de la joueuse.' : 'Community space and performance tracking of the player.'}
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 font-semibold">
          {posts.length} Post{posts.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Center and restrict feed width on desktop for elegant layout */}
      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Owner Only: Publish Form */}
        {isOwner && (
          <form onSubmit={handlePublish} className="p-4 bg-slate-950/60 border border-purple-500/30 rounded-2xl space-y-4 animate-fadeIn no-print text-xs">
            <div className="flex items-center gap-2 text-[10px] text-purple-400 uppercase font-black tracking-wider">
              <Plus className="w-4 h-4" /> {lang === 'fr' ? 'Publier une nouvelle performance' : 'Publish a new performance'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold block">{lang === 'fr' ? 'Type de publication' : 'Post type'}</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white cursor-pointer focus:outline-none focus:border-purple-500"
                >
                  <option value="photo">{lang === 'fr' ? '📸 Photo / Image' : '📸 Photo / Image'}</option>
                  <option value="video">{lang === 'fr' ? '🎥 Vidéo (Lien)' : '🎥 Video (Link)'}</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-slate-400 font-bold block">{lang === 'fr' ? 'Légende ou Titre' : 'Caption or Title'}</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={lang === 'fr' ? 'Ex: Séance technique du jour / But en match...' : 'Ex: Daily technical drill / Match goal...'}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold block">
                {newType === 'photo' 
                  ? (lang === 'fr' ? 'URL de la photo (ex: Unsplash / Imgur...)' : 'Photo URL (ex: Unsplash / Imgur...)') 
                  : (lang === 'fr' ? 'URL de la vidéo YouTube (ex: https://youtube.com/watch?v=...)' : 'YouTube Video URL (ex: https://youtube.com/watch?v=...)')}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold px-5 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-purple-950/40"
                >
                  {lang === 'fr' ? 'Partager' : 'Share'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Feed List */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              {lang === 'fr' ? 'Aucune publication pour le moment.' : 'No publications yet.'}
            </div>
          ) : (
            posts.map((post) => {
              const userVoteKey = `${role}-${activePlayerId || 'member'}`;
              const myRating = post.ratings?.find(r => r.user === userVoteKey);
              const hasVoted = !!myRating;

              // Calculate average rating
              const ratingsList = post.ratings || [];
              const totalScore = ratingsList.reduce((sum, r) => sum + r.score, 0);
              const averageScore = ratingsList.length > 0 ? (totalScore / ratingsList.length).toFixed(1) : '0.0';

              const hoveredScore = hoveredStars[post.id] || null;

              return (
                <div key={post.id} className="p-4 sm:p-5 bg-slate-900/60 border border-white/5 rounded-2xl space-y-4 transition hover:border-slate-800">
                  {/* Post Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={player.photoUrl}
                        alt={player.name}
                        className="w-10 h-10 rounded-full object-cover object-top border border-purple-500/50 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-white text-xs block">{player.name}</span>
                        <span className="text-[10px] text-slate-400 block">
                          {new Date(post.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 text-[9px] font-black uppercase flex items-center gap-1">
                        {post.type === 'video' ? <Film className="w-3 h-3 text-green-400" /> : <ImageIcon className="w-3 h-3 text-purple-400" />}
                        {post.type}
                      </span>
                      {isOwner && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-950 rounded-lg transition"
                          title={lang === 'fr' ? 'Supprimer' : 'Delete'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">
                    {post.title}
                  </p>

                  {/* Media Body */}
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-950 group">
                    {post.type === 'video' ? (
                      <>
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div
                          onClick={() => setActivePost(post)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                        >
                          <span className="p-4 rounded-full bg-green-500 text-slate-950 shadow-lg group-hover:scale-110 transition duration-300">
                            <Play className="w-6 h-6 fill-current" />
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={post.url}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div
                          onClick={() => setActivePost(post)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center cursor-zoom-in"
                        >
                          <span className="p-2.5 rounded-full bg-purple-600 text-white shadow-lg">
                            <Eye className="w-5 h-5" />
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Interaction Footer Bar (1 to 5 Stars System) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80 pt-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* 5-star selector */}
                      <div className="flex items-center gap-1 bg-slate-950/40 px-2.5 py-1.5 rounded-xl border border-slate-800">
                        {[1, 2, 3, 4, 5].map((starValue) => {
                          // Determine color fill logic
                          let isFilled = false;
                          if (hasVoted) {
                            isFilled = starValue <= myRating.score;
                          } else if (hoveredScore !== null) {
                            isFilled = starValue <= hoveredScore;
                          } else {
                            isFilled = starValue <= Math.round(Number(averageScore));
                          }

                          return (
                            <button
                              key={starValue}
                              disabled={!isAuthenticated}
                              onClick={() => handleRatePost(post.id, starValue)}
                              onMouseEnter={() => !hasVoted && setHoveredStars(prev => ({ ...prev, [post.id]: starValue }))}
                              onMouseLeave={() => !hasVoted && setHoveredStars(prev => ({ ...prev, [post.id]: null }))}
                              className={`p-0.5 transition-transform duration-100 ${
                                !isAuthenticated 
                                  ? 'opacity-40 cursor-not-allowed' 
                                  : hasVoted 
                                    ? 'cursor-default' 
                                    : 'hover:scale-125 cursor-pointer'
                              }`}
                              title={
                                !isAuthenticated 
                                  ? (lang === 'fr' ? 'Connectez-vous pour évaluer' : 'Log in to rate')
                                  : hasVoted 
                                    ? (lang === 'fr' ? `Votre vote : ${myRating.score} étoiles` : `Your vote: ${myRating.score} stars`)
                                    : (lang === 'fr' ? `Voter ${starValue} étoiles` : `Vote ${starValue} stars`)
                              }
                            >
                              <Star 
                                className={`w-4 h-4 transition ${
                                  isFilled 
                                    ? 'text-amber-400 fill-amber-400' 
                                    : 'text-slate-600 hover:text-amber-400'
                                }`} 
                              />
                            </button>
                          );
                        })}

                        {/* Average Score Tag */}
                        <span className="text-[10px] font-black text-slate-300 ml-1.5 bg-slate-905 px-1.5 py-0.5 rounded border border-slate-800">
                          {averageScore} / 5
                        </span>
                        
                        <span className="text-[9px] text-slate-500 font-bold ml-1 shrink-0">
                          ({ratingsList.length} vote{ratingsList.length > 1 ? 's' : ''})
                        </span>
                      </div>

                      {/* Comments Indicator */}
                      <span className="flex items-center gap-1.5 text-slate-400 font-bold px-1.5">
                        <MessageSquare className="w-4 h-4 text-purple-400" />
                        <span>{post.comments?.length || 0} {lang === 'fr' ? 'commentaires' : 'comments'}</span>
                      </span>
                    </div>

                    {/* Right side info prompt */}
                    <div>
                      {!isAuthenticated ? (
                        <span className="text-[9px] text-slate-500 italic block">
                          🔑 {lang === 'fr' ? 'Connectez-vous pour réagir' : 'Log in to interact'}
                        </span>
                      ) : hasVoted ? (
                        <span className="text-[9px] text-green-400 font-bold bg-green-950/20 px-2 py-0.5 rounded border border-green-500/10 block">
                          ✓ {lang === 'fr' ? `Évalué (${myRating.score}★)` : `Rated (${myRating.score}★)`}
                        </span>
                      ) : (
                        <span className="text-[9px] text-purple-400 font-medium animate-pulse block">
                          ★ {lang === 'fr' ? 'Cliquez pour évaluer (1-5)' : 'Click to rate (1-5)'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Comments Thread Section */}
                  <div className="bg-slate-950/40 rounded-xl p-3 space-y-3">
                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="text-[11px] p-2 bg-slate-900/40 border border-slate-800/60 rounded-xl space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-extrabold text-white">{comment.authorName}</span>
                              <span className="px-1.5 py-0.5 rounded text-[8px] bg-slate-950 text-slate-400 font-bold uppercase">
                                {getRoleLabel(comment.authorRole)}
                              </span>
                            </div>
                            <p className="text-slate-300 font-normal leading-relaxed">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment Form */}
                    {isAuthenticated ? (
                      <div className="flex gap-2 pt-1 border-t border-slate-800/60">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          placeholder={lang === 'fr' ? 'Écrire un commentaire...' : 'Write a comment...'}
                          className="flex-1 bg-slate-900 border border-slate-850 rounded-xl px-3 py-1.5 text-[11px] text-white focus:outline-none focus:border-purple-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="p-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition flex items-center justify-center"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-500 italic text-center py-1">
                        {lang === 'fr' ? 'Seuls les membres connectés peuvent commenter.' : 'Only logged-in members can comment.'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modern Split-screen Lightbox Modal (2/3 Media, 1/3 Comments) */}
      {activePost && (() => {
        const currentPost = posts.find(p => p.id === activePost.id) || activePost;
        const userVoteKey = `${role}-${activePlayerId || 'member'}`;
        const myRating = currentPost.ratings?.find(r => r.user === userVoteKey);
        const hasVoted = !!myRating;

        // Calculate average rating
        const ratingsList = currentPost.ratings || [];
        const totalScore = ratingsList.reduce((sum, r) => sum + r.score, 0);
        const averageScore = ratingsList.length > 0 ? (totalScore / ratingsList.length).toFixed(1) : '0.0';

        const hoveredScore = hoveredStars[currentPost.id] || null;

        return createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/95 no-print flex items-center justify-center animate-fadeIn">
            {/* Main Container: Full screen (100% device height/width) */}
            <div className="relative w-screen h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden">
              
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 z-[110] p-2.5 bg-slate-900/80 hover:bg-slate-800 rounded-full text-white border border-white/10 transition focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Side: Media content (2/3 width on desktop) */}
              <div className="w-full md:w-2/3 h-3/5 md:h-full bg-black relative flex items-center justify-center">
                {currentPost.type === 'video' ? (
                  <iframe
                    src={currentPost.url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <img
                    src={currentPost.url}
                    alt={currentPost.title}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>

              {/* Right Side: Identity, Ratings, Comments (1/3 width on desktop) */}
              <div className="w-full md:w-1/3 h-2/5 md:h-full flex flex-col justify-between bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800/80">
                
                {/* Post Owner Header */}
                <div className="p-4 border-b border-slate-850 flex items-center gap-3">
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-10 h-10 rounded-full object-cover object-top border border-purple-500/50 shrink-0"
                  />
                  <div>
                    <span className="font-extrabold text-white text-xs block">{player.name}</span>
                    <span className="text-[9px] text-slate-400 block">
                      {new Date(currentPost.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Caption & Description */}
                <div className="p-4 bg-slate-950/20 border-b border-slate-850/60 max-h-[80px] overflow-y-auto">
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    {currentPost.title}
                  </p>
                </div>

                {/* Comments List (Independently Scrollable) */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  {currentPost.comments && currentPost.comments.length > 0 ? (
                    currentPost.comments.map((comment) => (
                      <div key={comment.id} className="text-[11px] p-2.5 bg-slate-955/40 border border-slate-850/50 rounded-xl space-y-1">
                        <div className="flex justify-between items-center gap-2">
                          <span className="font-extrabold text-white">{comment.authorName}</span>
                          <span className="px-1.5 py-0.5 rounded text-[8px] bg-slate-900 border border-slate-800 text-slate-400 font-bold uppercase shrink-0">
                            {getRoleLabel(comment.authorRole)}
                          </span>
                        </div>
                        <p className="text-slate-300 font-normal leading-relaxed">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-center text-[10px] text-slate-500 italic py-8">
                      {lang === 'fr' ? 'Aucun commentaire pour le moment.' : 'No comments yet.'}
                    </div>
                  )}
                </div>

                {/* Footer Area: Ratings and Comment Input Form */}
                <div className="p-4 border-t border-slate-850 bg-slate-950/30 space-y-3">
                  
                  {/* Stars rating widget */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800">
                      {[1, 2, 3, 4, 5].map((starValue) => {
                        let isFilled = false;
                        if (hasVoted) {
                          isFilled = starValue <= myRating.score;
                        } else if (hoveredScore !== null) {
                          isFilled = starValue <= hoveredScore;
                        } else {
                          isFilled = starValue <= Math.round(Number(averageScore));
                        }

                        return (
                          <button
                            key={starValue}
                            disabled={!isAuthenticated}
                            onClick={() => handleRatePost(currentPost.id, starValue)}
                            onMouseEnter={() => !hasVoted && setHoveredStars(prev => ({ ...prev, [currentPost.id]: starValue }))}
                            onMouseLeave={() => !hasVoted && setHoveredStars(prev => ({ ...prev, [currentPost.id]: null }))}
                            className={`p-0.5 transition-transform duration-100 ${
                              !isAuthenticated 
                                ? 'opacity-40 cursor-not-allowed' 
                                : hasVoted 
                                  ? 'cursor-default' 
                                  : 'hover:scale-125 cursor-pointer'
                            }`}
                            title={
                              !isAuthenticated 
                                ? (lang === 'fr' ? 'Connectez-vous pour évaluer' : 'Log in to rate')
                                : hasVoted 
                                  ? (lang === 'fr' ? `Votre vote : ${myRating.score} étoiles` : `Your vote: ${myRating.score} stars`)
                                  : (lang === 'fr' ? `Voter ${starValue} étoiles` : `Vote ${starValue} stars`)
                            }
                          >
                            <Star 
                              className={`w-3.5 h-3.5 transition ${
                                isFilled 
                                  ? 'text-amber-400 fill-amber-400' 
                                  : 'text-slate-600 hover:text-amber-400'
                              }`} 
                            />
                          </button>
                        );
                      })}
                      <span className="text-[9px] font-black text-slate-300 ml-1">
                        {averageScore}/5
                      </span>
                      <span className="text-[8px] text-slate-500 font-bold ml-0.5">
                        ({ratingsList.length})
                      </span>
                    </div>

                    {/* Status info */}
                    <div>
                      {!isAuthenticated ? (
                        <span className="text-[8px] text-slate-500 italic">
                          {lang === 'fr' ? 'Reconnexion requise' : 'Login required'}
                        </span>
                      ) : hasVoted ? (
                        <span className="text-[8px] text-green-400 font-bold">
                          {lang === 'fr' ? `Voté (${myRating.score}★)` : `Rated (${myRating.score}★)`}
                        </span>
                      ) : (
                        <span className="text-[8px] text-purple-400 animate-pulse">
                          {lang === 'fr' ? 'Notez ce média' : 'Rate this media'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Comment Form */}
                  {isAuthenticated ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentInputs[currentPost.id] || ''}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [currentPost.id]: e.target.value })}
                        placeholder={lang === 'fr' ? 'Écrire un commentaire...' : 'Write a comment...'}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] text-white focus:outline-none focus:border-purple-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(currentPost.id);
                        }}
                      />
                      <button
                        onClick={() => handleAddComment(currentPost.id)}
                        className="p-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition flex items-center justify-center shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-[9px] text-slate-500 italic text-center py-1 border border-dashed border-slate-800 rounded-lg">
                      {lang === 'fr' ? 'Membres connectés uniquement.' : 'Logged-in members only.'}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>,
          document.body
        );
      })()}
    </div>
  );
}
