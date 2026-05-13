
import React from 'react';
import { JournalEntry } from '../types';

interface ChartProps {
  entries: JournalEntry[];
}

export const EchoScoreTrend: React.FC<ChartProps> = ({ entries }) => {
  if (entries.length < 2) {
    return (
      <div className="h-40 flex items-center justify-center text-slate-300 text-xs uppercase tracking-widest italic">
        Chronicle more reflections to see trends
      </div>
    );
  }

  const scores = entries.map(e => e.insight.echoScore);
  const max = 100;
  const padding = 20;
  const width = 400;
  const height = 160;
  
  const points = scores.map((score, i) => {
    const x = padding + (i * (width - 2 * padding) / (scores.length - 1));
    const y = height - padding - (score / max * (height - 2 * padding));
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-40">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Fill area */}
        <path
          d={`M${padding},${height - padding} ${points} L${width - padding},${height - padding} Z`}
          fill="url(#lineGrad)"
        />
        {/* Trend line */}
        <polyline
          fill="none"
          stroke="#818cf8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className="transition-all duration-1000"
        />
        {/* Data points */}
        {scores.map((score, i) => {
          const x = padding + (i * (width - 2 * padding) / (scores.length - 1));
          const y = height - padding - (score / max * (height - 2 * padding));
          return (
            <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#818cf8" strokeWidth="2" />
          );
        })}
      </svg>
    </div>
  );
};

export const PatternFrequency: React.FC<ChartProps> = ({ entries }) => {
  const patterns = entries.reduce((acc, e) => {
    const p = e.insight.pattern;
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(patterns);
  if (labels.length === 0) return null;

  // Fix: Explicitly cast Object.values to number array to resolve unknown type error in Math.max spread
  const frequencies = Object.values(patterns) as number[];
  const maxFreq = Math.max(...frequencies);
  const height = 120;

  return (
    <div className="space-y-4">
      {labels.map(label => {
        const freq = patterns[label];
        const percent = (freq / maxFreq) * 100;
        return (
          <div key={label} className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>{label}</span>
              <span>{freq}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-200 to-indigo-300 rounded-full transition-all duration-1000"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
