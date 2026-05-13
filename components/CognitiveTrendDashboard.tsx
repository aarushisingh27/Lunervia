
import React from 'react';
import { JournalEntry } from '../types';
import { EchoScoreTrend, PatternFrequency } from './TrendCharts';

interface DashboardProps {
  history: JournalEntry[];
}

const CognitiveTrendDashboard: React.FC<DashboardProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="flex items-center gap-3 mb-8 px-4">
        <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-700">
            Cognitive Trend Dashboard
          </h3>
          <p className="text-[10px] text-indigo-700/60 tracking-widest uppercase font-medium">Session-based progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Trend Chart Card */}
        <div className="bg-white/15 backdrop-blur-[10px] rounded-2xl p-8 border border-white/30 shadow-xl flex flex-col">
          <div className="mb-6">
            <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-1">EchoScore Trend</h4>
            <p className="text-[10px] text-slate-500">Emotional flexibility over time</p>
          </div>
          <div className="flex-1 flex items-center">
            <EchoScoreTrend entries={history} />
          </div>
        </div>

        {/* Pattern Analysis Card */}
        <div className="bg-white/15 backdrop-blur-[10px] rounded-2xl p-8 border border-white/30 shadow-xl flex flex-col">
          <div className="mb-6">
            <h4 className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.2em] mb-1">Detected Patterns</h4>
            <p className="text-[10px] text-slate-500">Frequency of cognitive schemas</p>
          </div>
          <div className="flex-1">
            <PatternFrequency entries={history} />
          </div>
        </div>
      </div>

      {/* Consistency Metric */}
      <div className="mt-8 bg-gradient-to-r from-emerald-50/20 to-teal-50/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100/40 flex items-center justify-center text-emerald-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.2em]">Reflection Consistency</h4>
            <p className="text-sm text-slate-700 font-medium">You have completed <span className="text-emerald-800 font-bold">{history.length}</span> reflections this session.</p>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="flex gap-1">
            {[...Array(Math.min(history.length, 10))].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-emerald-500/30 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveTrendDashboard;
