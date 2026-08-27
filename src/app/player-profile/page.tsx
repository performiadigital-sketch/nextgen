'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/Providers';
import { getAllPlayers, getPlayerById, savePlayersToLocalStorage } from '@/lib/data';
import { formatCurrency } from '@/lib/currency';
import { Player } from '@/types/player';
import { 
  User, 
  Settings, 
  Image as ImageIcon, 
  Video, 
  Lock, 
  Save, 
  Undo2, 
  Plus, 
  Trash2, 
  TrendingUp, 
  Activity, 
  Trophy, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { RadarChart } from '@/components/RadarChart';

interface VideoRecord {
  title: string;
  url: string;
  thumbnail: string;
}

export default function PlayerProfileEditor() {
  const { role, currency } = useApp();
  const allPlayers = getAllPlayers();
  
  // Default to Achta Toko Njoya if available
  const defaultPlayerId = allPlayers.find(p => p.id.includes('toko') || p.id.includes('achta'))?.id || allPlayers[0]?.id || '';
  const [selectedPlayerId, setSelectedPlayerId] = useState(defaultPlayerId);
  
  const fallbackPlayer: Player = {
    id: 'no-player',
    name: 'Sélectionnez une joueuse',
    shortName: 'Joueuse',
    nationality: 'Inconnue',
    countryCode: 'FR',
    confed: 'UEFA',
    dob: '2004-01-01',
    age: 20,
    position: 'MF',
    positionDetail: 'Milieu de terrain',
    preferredFoot: 'right',
    height: 170,
    weight: 65,
    clubId: '',
    clubName: 'Aucun Club',
    contractUntil: '',
    agent: '',
    nationalTeam: 'Sélection Nationale',
    caps: 0,
    internationalGoals: 0,
    marketValueEur: 0,
    photoUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600',
    biography: 'Aucune joueuse disponible dans la base de données.',
    photoGallery: [],
    videoGallery: [],
    marketValueHistory: [],
    seasonStats: [],
    transfers: [],
    palmares: [],
    injuryHistory: 'Aucune blessure majeure',
    socialFollowers: '0',
    radarStats: { finishing: 50, playmaking: 50, pace: 50, physique: 50, defense: 50, international: 50 }
  };

  const player = getPlayerById(selectedPlayerId) || allPlayers[0] || fallbackPlayer;

  // Active Tab: 'edit' | 'gallery' | 'stats_readonly'
  const [activeTab, setActiveTab] = useState<'edit' | 'gallery' | 'stats_readonly'>('edit');
  const [mounted, setMounted] = useState(false);
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  // Form States
  const [bio, setBio] = useState('');
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [preferredFoot, setPreferredFoot] = useState<'right' | 'left' | 'both'>('right');
  const [caps, setCaps] = useState(0);
  const [intlGoals, setIntlGoals] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('');

  // Media States
  const [photos, setPhotos] = useState<string[]>([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const active = localStorage.getItem('nextgen_active_player_id');
      if (!active) {
        localStorage.setItem('nextgen_active_player_id', selectedPlayerId);
      } else {
        setSelectedPlayerId(active);
      }
    }
  }, []);

  // Load state whenever player changes
  useEffect(() => {
    if (player && mounted) {
      const savedBio = localStorage.getItem(`nextgen_player_bio_${player.id}`);
      const savedHeight = localStorage.getItem(`nextgen_player_height_${player.id}`);
      const savedWeight = localStorage.getItem(`nextgen_player_weight_${player.id}`);
      const savedFoot = localStorage.getItem(`nextgen_player_foot_${player.id}`);
      const savedCaps = localStorage.getItem(`nextgen_player_caps_${player.id}`);
      const savedIntlGoals = localStorage.getItem(`nextgen_player_intl_goals_${player.id}`);
      const savedPhoto = localStorage.getItem(`nextgen_player_photo_${player.id}`);

      setBio(savedBio || player.biography || '');
      setHeight(savedHeight ? Number(savedHeight) : player.height);
      setWeight(savedWeight ? Number(savedWeight) : player.weight);
      setPreferredFoot((savedFoot as any) || player.preferredFoot);
      setCaps(savedCaps ? Number(savedCaps) : player.caps);
      setIntlGoals(savedIntlGoals ? Number(savedIntlGoals) : player.internationalGoals);
      setPhotoUrl(savedPhoto || player.photoUrl);

      // Media
      const savedPhotos = localStorage.getItem(`nextgen_player_photos_${player.id}`);
      const savedVideos = localStorage.getItem(`nextgen_player_videos_${player.id}`);

      if (savedPhotos) {
        try {
          const parsed = JSON.parse(savedPhotos);
          setPhotos(Array.isArray(parsed) ? parsed : (player.photoGallery || []));
        } catch (e) {
          setPhotos(player.photoGallery || []);
        }
      } else {
        setPhotos(player.photoGallery || []);
      }

      if (savedVideos) {
        try {
          const parsed = JSON.parse(savedVideos);
          setVideos(Array.isArray(parsed) ? parsed : (player.videoGallery || []));
        } catch (e) {
          setVideos(player.videoGallery || []);
        }
      } else {
        setVideos(player.videoGallery || []);
      }
    }
  }, [player.id, mounted]);

  if (!mounted) return null;

  // Role Protection
  if (role !== 'player') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#080C14] text-slate-200">
        <div className="max-w-md w-full glass-card p-8 border border-white/10 rounded-3xl text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-400 flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white uppercase tracking-wider">🔒 ESPACE JOUEUSE LIMITÉ</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              L'accès à l'édition de profil et à la publication de médias est réservé aux joueuses connectées disposant d'un compte certifié.
            </p>
          </div>
          <div className="p-4 bg-slate-950/80 border border-white/5 rounded-2xl text-left text-xs text-slate-300">
            💡 **Comment tester ?** Sélectionnez le rôle **Joueuse connectée** dans le sélecteur situé dans la barre de navigation en haut à droite.
          </div>
        </div>
      </div>
    );
  }

  if (!player) {
    return <div className="text-center text-slate-400 py-12">Aucune joueuse sélectionnée.</div>;
  }

  // Handle Form Save
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();

    // Sync with central players list
    const currentPlayers = getAllPlayers();
    const updatedPlayers = currentPlayers.map(p => {
      if (p.id === player.id) {
        return {
          ...p,
          biography: bio,
          height: Number(height),
          weight: Number(weight),
          preferredFoot: preferredFoot as any,
          caps: Number(caps),
          internationalGoals: Number(intlGoals),
          photoUrl: photoUrl
        };
      }
      return p;
    });
    savePlayersToLocalStorage(updatedPlayers);

    localStorage.setItem(`nextgen_player_bio_${player.id}`, bio);
    localStorage.setItem(`nextgen_player_height_${player.id}`, String(height));
    localStorage.setItem(`nextgen_player_weight_${player.id}`, String(weight));
    localStorage.setItem(`nextgen_player_foot_${player.id}`, preferredFoot);
    localStorage.setItem(`nextgen_player_caps_${player.id}`, String(caps));
    localStorage.setItem(`nextgen_player_intl_goals_${player.id}`, String(intlGoals));
    localStorage.setItem(`nextgen_player_photo_${player.id}`, photoUrl);

    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  // Add Photo
  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    const updated = [...photos, newPhotoUrl.trim()];
    setPhotos(updated);
    localStorage.setItem(`nextgen_player_photos_${player.id}`, JSON.stringify(updated));
    setNewPhotoUrl('');

    // Sync with unified posts feed
    const savedPosts = localStorage.getItem(`nextgen_player_posts_${player.id}`);
    let postList = [];
    if (savedPosts) {
      try { postList = JSON.parse(savedPosts); } catch (e) {}
    }
    const newPost = {
      id: `post-${Date.now()}`,
      type: 'photo',
      title: `Match Day Action #${updated.length}`,
      url: newPhotoUrl.trim(),
      thumbnail: newPhotoUrl.trim(),
      stars: 0,
      starredBy: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(`nextgen_player_posts_${player.id}`, JSON.stringify([newPost, ...postList]));
  };

  // Remove Photo
  const handleRemovePhoto = (index: number) => {
    const updated = photos.filter((_, idx) => idx !== index);
    setPhotos(updated);
    localStorage.setItem(`nextgen_player_photos_${player.id}`, JSON.stringify(updated));
  };

  // Add Video
  const handleAddVideo = () => {
    if (!newVideoTitle.trim() || !newVideoUrl.trim()) return;
    
    // Convert normal YouTube URL to Embed link if needed
    let embedUrl = newVideoUrl.trim();
    if (embedUrl.includes('youtube.com/watch?v=')) {
      embedUrl = embedUrl.replace('watch?v=', 'embed/');
    } else if (embedUrl.includes('youtu.be/')) {
      const parts = embedUrl.split('/');
      const id = parts[parts.length - 1];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }

    const newVideo: VideoRecord = {
      title: newVideoTitle.trim(),
      url: embedUrl,
      thumbnail: player.photoUrl
    };

    const updated = [...videos, newVideo];
    setVideos(updated);
    localStorage.setItem(`nextgen_player_videos_${player.id}`, JSON.stringify(updated));
    setNewVideoTitle('');
    setNewVideoUrl('');

    // Sync with unified posts feed
    const savedPosts = localStorage.getItem(`nextgen_player_posts_${player.id}`);
    let postList = [];
    if (savedPosts) {
      try { postList = JSON.parse(savedPosts); } catch (e) {}
    }
    const newPost = {
      id: `post-${Date.now()}`,
      type: 'video',
      title: newVideoTitle.trim(),
      url: embedUrl,
      thumbnail: player.photoUrl,
      stars: 0,
      starredBy: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(`nextgen_player_posts_${player.id}`, JSON.stringify([newPost, ...postList]));
  };

  // Remove Video
  const handleRemoveVideo = (index: number) => {
    const updated = videos.filter((_, idx) => idx !== index);
    setVideos(updated);
    localStorage.setItem(`nextgen_player_videos_${player.id}`, JSON.stringify(updated));
    setNewVideoTitle('');
    setNewVideoUrl('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Player Selector Simulator Header */}
      <div className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-purple-500 bg-gradient-to-r from-purple-950/20 via-slate-900 to-slate-900 animate-fadeIn">
        <div className="space-y-1 flex-1 min-w-0">
          <span className="text-[10px] bg-purple-900/60 border border-purple-500/40 text-purple-300 font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block">
            Simulateur • Session Joueuse
          </span>
          <h2 className="text-xl font-extrabold text-white">Espace Personnel de Management de Fiche</h2>
          <p className="text-xs text-slate-400">Sélectionnez la joueuse avec laquelle vous souhaitez vous connecter pour éditer sa fiche publique.</p>
        </div>
        <div className="flex-shrink-0">
          <select
            value={selectedPlayerId}
            onChange={(e) => {
              setSelectedPlayerId(e.target.value);
              localStorage.setItem('nextgen_active_player_id', e.target.value);
            }}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-bold text-white focus:border-purple-500 focus:outline-none transition cursor-pointer"
          >
            {allPlayers.map((p) => (
              <option key={p.id} value={p.id}>{p.name} ({p.clubName})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Profile Info Banner */}
      <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <img 
          src={photoUrl} 
          alt={player.name} 
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover object-top border-2 border-purple-500/50 shadow-xl" 
        />
        <div className="text-center md:text-left space-y-2 flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{player.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2.5 text-xs text-slate-300">
            <span className="px-2 py-0.5 bg-slate-950 text-purple-400 font-bold border border-slate-800 rounded">{player.position}</span>
            <span>{player.clubName}</span>
            <span>•</span>
            <span>{player.nationalTeam}</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Bienvenue dans votre tableau de bord. Vous pouvez enrichir votre biographie, mettre à jour votre gabarit de jeu, ainsi que publier des photos et des vidéos de vos meilleures performances.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link
            href={`/players/${player.id}`}
            className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-white/10 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            Voir ma fiche publique
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-1 sm:gap-2">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition ${
            activeTab === 'edit'
              ? 'border-purple-500 text-white bg-white/5'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4 text-purple-400" />
          <span>Édition de ma Fiche</span>
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition ${
            activeTab === 'gallery'
              ? 'border-purple-500 text-white bg-white/5'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-purple-400" />
          <span>Galeries Photo & Vidéo</span>
        </button>
        <button
          onClick={() => setActiveTab('stats_readonly')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition ${
            activeTab === 'stats_readonly'
              ? 'border-purple-500 text-white bg-white/5'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4 text-purple-400" />
          <span>Données Certifiées (Lecture Seule)</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">

        {/* Tab 1: Edit Fiche */}
        {activeTab === 'edit' && (
          <form onSubmit={handleSaveInfo} className="glass-card p-6 md:p-8 space-y-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200 pb-3 border-b border-slate-800">
              Informations Personnelles & Biographie
            </h3>

            {isSavedAlert && (
              <div className="p-4 bg-green-950/60 border border-green-500/40 text-green-300 rounded-2xl text-xs font-bold animate-fadeIn">
                ✓ Vos modifications ont été enregistrées avec succès et sont appliquées sur votre fiche publique !
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Taille (en cm)</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Poids (en kg)</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Pied fort</label>
                <select 
                  value={preferredFoot}
                  onChange={(e) => setPreferredFoot(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="right">Droitier</option>
                  <option value="left">Gaucher</option>
                  <option value="both">Ambidextre</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Caps (Sélection Nationale)</label>
                <input 
                  type="number" 
                  value={caps}
                  onChange={(e) => setCaps(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Buts Internationaux</label>
                <input 
                  type="number" 
                  value={intlGoals}
                  onChange={(e) => setIntlGoals(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5 col-span-1 sm:col-span-2 md:col-span-3">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Lien Photo de Portrait (Portrait Officiel)</label>
                <input 
                  type="text" 
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="URL d'image Unsplash ou CDN"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5 col-span-1 sm:col-span-2 md:col-span-3">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Biographie / Présentation de Carrière</label>
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={5}
                  placeholder="Rédigez votre biographie professionnelle..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none leading-relaxed"
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-950/40 flex items-center gap-2 transition"
              >
                <Save className="w-4 h-4" />
                Enregistrer mon profil
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Gallery and Videos */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Photos Section */}
            <div className="glass-card p-6 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-extrabold uppercase text-slate-200 tracking-wider">Galerie Photos Personnelle</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Ajoutez ou supprimez les photos visibles dans votre portfolio.</p>
              </div>

              {/* Add Photo Form */}
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Lien URL de la photo..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={handleAddPhoto}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>

              {/* Photo List */}
              <div className="grid grid-cols-3 gap-3">
                {photos.map((url, idx) => (
                  <div key={idx} className="relative group aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/5">
                    <img src={url} alt="Gallery item" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleRemovePhoto(idx)}
                        className="p-1.5 bg-rose-600/90 text-white rounded-lg hover:bg-rose-500 transition"
                        title="Supprimer la photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Videos Section */}
            <div className="glass-card p-6 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-extrabold uppercase text-slate-200 tracking-wider">Temps Forts Vidéos (Youtube Embed)</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Mettez en avant vos compilations et archives vidéos.</p>
              </div>

              {/* Add Video Form */}
              <div className="space-y-3">
                <input 
                  type="text"
                  placeholder="Titre de la vidéo (ex: Best actions 2025)..."
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Lien URL Youtube (ex: https://youtu.be/...)..."
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    onClick={handleAddVideo}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Ajouter
                  </button>
                </div>
              </div>

              {/* Video List */}
              <div className="space-y-3">
                {videos.map((vid, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/70 border border-white/5 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 flex-shrink-0">
                        <Video className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-white block text-xs truncate">{vid.title}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{vid.url}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveVideo(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition flex-shrink-0"
                      title="Supprimer la vidéo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Readonly Technical and valuation analytics */}
        {activeTab === 'stats_readonly' && (
          <div className="space-y-6">
            
            {/* Warning paywall block */}
            <div className="glass-card p-6 border-l-4 border-amber-500 bg-amber-950/20 flex gap-4 items-start">
              <ShieldAlert className="w-8 h-8 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm uppercase">🔒 DONNÉES ANALYTIQUES CERTIFIÉES ET SÉCURISÉES</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Conformément à la charte technique NextGen, les indices de valorisation financière (valeurs marchandes, trajectoires de marché), les statistiques par compétition, l'historique officiel des transferts et le radar d'attributs de performances sont générés et certifiés de manière neutre par nos analystes. Ils ne peuvent pas être modifiés par la joueuse.
                </p>
              </div>
            </div>

            {/* Read-Only Metrics Grid Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="glass-card p-6 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Valeur Marchande Actuelle</span>
                <span className="text-2xl font-black text-green-400">{formatCurrency(player.marketValueEur, currency, false)}</span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1.5 border-t border-slate-800">
                  <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                  <span>Tendance du marché : {player.trending || '+10%'}</span>
                </div>
              </div>

              <div className="glass-card p-6 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Meilleure Note Recruteur</span>
                <span className="text-2xl font-black text-purple-400">{player.seasonStats?.[0]?.rating || '8.2'}/10</span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1.5 border-t border-slate-800">
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                  <span>Matchs joués : {player.seasonStats?.[0]?.matches || 0}</span>
                </div>
              </div>

              <div className="glass-card p-6 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Palmarès & Honors</span>
                <span className="text-2xl font-black text-amber-400">{player.palmares?.length || 0} Titres</span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1.5 border-t border-slate-800">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dernier titre : {player.palmares?.[0] || 'N/A'}</span>
                </div>
              </div>

            </div>

            {/* Radar Preview */}
            <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-md">
                <h4 className="font-extrabold text-white text-base uppercase">Radar d'Attributs de Compétence</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cette cartographie modélise votre niveau technique actuel dans 6 domaines athlétiques clés. Le calcul est fondé sur vos statistiques objectives accumulées durant les compétitions majeures.
                </p>
              </div>
              <div className="w-64 h-64 bg-slate-950/60 p-4 border border-white/5 rounded-2xl flex items-center justify-center">
                <RadarChart players={[player]} />
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
