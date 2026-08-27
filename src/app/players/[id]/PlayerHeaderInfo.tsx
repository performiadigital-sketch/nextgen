'use client';

import React, { useEffect, useState } from 'react';
import { Player } from '@/types/player';

interface PlayerHeaderInfoProps {
  player: Player;
}

export default function PlayerHeaderInfo({ player }: PlayerHeaderInfoProps) {
  const [activePlayer, setActivePlayer] = useState<Player>(player);

  useEffect(() => {
    // Read the updated player from custom players list in localStorage
    const customListStr = localStorage.getItem('nextgen_custom_players');
    if (customListStr) {
      try {
        const list = JSON.parse(customListStr);
        const found = list.find((p: any) => p.id === player.id);
        if (found) {
          setActivePlayer(found);
        }
      } catch (e) {}
    }
  }, [player.id]);

  // Fallback override photo if custom key exists (legacy dashboard override check)
  const [photoUrl, setPhotoUrl] = useState(player.photoUrl);
  useEffect(() => {
    const savedPhoto = localStorage.getItem(`nextgen_player_photo_${player.id}`);
    if (savedPhoto) {
      setPhotoUrl(savedPhoto);
    } else {
      setPhotoUrl(activePlayer.photoUrl);
    }
  }, [activePlayer.photoUrl, player.id]);

  return (
    <div className="flex items-center gap-3">
      <img
        src={photoUrl}
        alt={activePlayer.name}
        className="w-10 h-10 rounded-xl object-cover object-top border border-purple-500/30 shrink-0"
      />
      <div>
        <div className="flex items-center gap-1.5">
          <h1 className="text-sm font-extrabold text-white leading-tight">{activePlayer.name}</h1>
          <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-purple-900/80 text-purple-200 border border-purple-500/40 uppercase shrink-0">
            {activePlayer.position}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5">
          {activePlayer.clubName} • {activePlayer.nationality}
        </p>
      </div>
    </div>
  );
}
