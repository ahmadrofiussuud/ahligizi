'use client';

import React, { useEffect, useState } from 'react';
import { Award, Trophy, Lock, Eye, EyeOff } from 'lucide-react';

export default function GamificationPage() {
  const [data, setData] = useState<any>(null);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGamificationData = () => {
    fetch('/api/gamification')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setIsPrivate(d.is_private);
      });
  };

  useEffect(() => {
    fetchGamificationData();
  }, []);

  const handleTogglePrivacy = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gamification', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toggle_privacy: !isPrivate }),
      });
      if (res.ok) {
        setIsPrivate(!isPrivate);
        fetchGamificationData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!data) return <div className="p-8 text-center text-slate-500 font-semibold">Loading Gamification...</div>;

  const { points, current_streak, longest_streak, level, progress, badges, leaderboard } = data;

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* 1. Header Typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-805 tracking-tight">
            Papan Skor & Lencana
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-semibold">
            Pantau perkembangan dan peringkat kesehatan Anda secara berkala.
          </p>
        </div>

        {/* Minimalist Stats Counters */}
        <div className="flex items-center space-x-6 text-slate-700">
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Streak</span>
            <span className="text-lg font-black text-slate-800">{current_streak} Hari</span>
          </div>
          <div className="h-6 w-px bg-slate-150"></div>
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Skor</span>
            <span className="text-lg font-black text-emerald-600">{points} PTS</span>
          </div>
          <div className="h-6 w-px bg-slate-150"></div>
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Level</span>
            <span className="text-xs font-extrabold text-slate-800">{level}</span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Badges List (Left Side) */}
        <div className="lg:col-span-2 space-y-5">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">
            Lencana Pencapaian
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((badge: any) => (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border transition-all duration-200 bg-white ${
                  badge.earned 
                    ? 'border-emerald-200 shadow-sm hover:border-emerald-300' 
                    : 'border-slate-100 opacity-60'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-extrabold text-slate-800 truncate">{badge.name}</h4>
                  {badge.earned ? (
                    <span className="text-[8px] font-black text-emerald-650 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase tracking-wider shrink-0">
                      Terbuka
                    </span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-semibold">{badge.description}</p>
                <span className="text-[9px] text-slate-400 font-bold block mt-3.5">
                  Syarat: {badge.criteria}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard & Controls (Right Side) */}
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">
              Klasemen Komunitas
            </h3>

            {/* Privacy toggle */}
            <button
              onClick={handleTogglePrivacy}
              disabled={loading}
              className="p-1 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-805 transition shadow-sm"
              title={isPrivate ? 'Tampilkan profil di klasemen' : 'Sembunyikan profil (Anonim)'}
            >
              {isPrivate ? <EyeOff className="w-3.5 h-3.5 text-rose-500" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          </div>

          {/* Clean minimal Leaderboard list */}
          <div className="space-y-2">
            {leaderboard.map((item: any) => (
              <div
                key={item.rank}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition duration-200 ${
                  item.name.includes('Kamu')
                    ? 'bg-emerald-50/40 border-emerald-100 text-emerald-800 font-bold'
                    : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="text-xs font-black text-slate-405 w-4 text-center">
                    {item.rank}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-600 shrink-0 border border-slate-200">
                    {item.avatar}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 truncate leading-snug">{item.name}</h5>
                    <span className="text-[10px] text-slate-405 font-bold">{item.streak} hari beruntun</span>
                  </div>
                </div>
                <span className="text-xs font-black text-slate-800 shrink-0">{item.points} PTS</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
