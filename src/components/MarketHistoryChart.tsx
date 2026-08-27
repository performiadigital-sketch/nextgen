'use client';

import React, { useEffect, useRef } from 'react';
import { MarketValuePoint } from '@/types/player';
import { useApp } from './Providers';
import { convertCurrency, formatCurrency } from '@/lib/currency';

interface MarketHistoryChartProps {
  history: MarketValuePoint[];
}

export function MarketHistoryChart({ history }: MarketHistoryChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { currency } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !history || history.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 30, right: 30, bottom: 40, left: 60 };

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    // Convert values
    const values = history.map((h) => convertCurrency(h.value, currency));
    const minVal = Math.min(...values) * 0.8;
    const maxVal = Math.max(...values) * 1.15;

    const getX = (index: number) => padding.left + (index / (history.length - 1)) * chartWidth;
    const getY = (val: number) => padding.top + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (i / 4) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const gridVal = maxVal - (i / 4) * (maxVal - minVal);
      ctx.fillStyle = '#64748B';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(formatCurrency(gridVal / (convertCurrency(1, currency) || 1), currency, true), padding.left - 10, y);
    }

    // Draw gradient area under curve
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0.0)');

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(values[0]));
    for (let i = 1; i < history.length; i++) {
      ctx.lineTo(getX(i), getY(values[i]));
    }
    ctx.lineTo(getX(history.length - 1), height - padding.bottom);
    ctx.lineTo(getX(0), height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(values[0]));
    for (let i = 1; i < history.length; i++) {
      ctx.lineTo(getX(i), getY(values[i]));
    }
    ctx.strokeStyle = '#22C55E';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw points & labels
    history.forEach((h, idx) => {
      const x = getX(idx);
      const y = getY(values[idx]);

      // Point circle
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#7C3AED';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Date Label
      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(h.date, x, height - padding.bottom + 10);
    });
  }, [history, currency]);

  return (
    <div className="w-full h-64 relative bg-slate-950/60 rounded-2xl border border-white/10 p-4">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
