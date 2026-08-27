'use client';

import React, { useEffect, useRef } from 'react';
import { Player } from '@/types/player';

interface RadarChartProps {
  players: Player[];
}

export function RadarChart({ players }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || players.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    const categories = ['Vitesse', 'Tir / Finition', 'Passe / Vision', 'Dribble / Agilité', 'Défense', 'Physique / Impact'];
    const numPoints = categories.length;
    const angleStep = (Math.PI * 2) / numPoints;

    ctx.clearRect(0, 0, width, height);

    // Draw concentric polygon webs
    const levels = 5;
    for (let l = 1; l <= levels; l++) {
      const levelRadius = (radius / levels) * l;
      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * levelRadius;
        const y = centerY + Math.sin(angle) * levelRadius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw radial axis lines & labels
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.stroke();

      // Label
      const labelDistance = radius + 28;
      const labelX = centerX + Math.cos(angle) * labelDistance;
      const labelY = centerY + Math.sin(angle) * labelDistance;

      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 11px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(categories[i], labelX, labelY);
    }

    // Player colors
    const colors = [
      { fill: 'rgba(124, 58, 237, 0.3)', stroke: '#7C3AED' },
      { fill: 'rgba(34, 197, 94, 0.3)', stroke: '#22C55E' },
      { fill: 'rgba(56, 189, 248, 0.3)', stroke: '#38BDF8' },
      { fill: 'rgba(245, 158, 11, 0.3)', stroke: '#F59E0B' },
    ];

    players.forEach((p, pIdx) => {
      const color = colors[pIdx % colors.length];
      const stats = p.radarStats || { finishing: 70, playmaking: 70, pace: 70, physique: 70, defense: 70, international: 70 };
      const rawScores = [
        stats.pace,
        stats.finishing,
        stats.playmaking,
        stats.international || stats.playmaking, // Dribble
        stats.defense,
        stats.physique,
      ];

      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const score = rawScores[i] || 50;
        const dist = (score / 100) * radius;
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * dist;
        const y = centerY + Math.sin(angle) * dist;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = color.fill;
      ctx.fill();
      ctx.strokeStyle = color.stroke;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Points
      for (let i = 0; i < numPoints; i++) {
        const score = rawScores[i] || 50;
        const dist = (score / 100) * radius;
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * dist;
        const y = centerY + Math.sin(angle) * dist;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color.stroke;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });
  }, [players]);

  return (
    <div className="w-full h-80 relative bg-slate-950/60 rounded-2xl border border-white/10 p-4 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
