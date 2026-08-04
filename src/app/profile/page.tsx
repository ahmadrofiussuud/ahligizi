'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Settings, 
  Flame, 
  Scale, 
  Ruler, 
  Calendar,
  Lock,
  LogOut,
  Target,
  Trophy
} from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Read local profile from onboarding
    const savedProfile = localStorage.getItem('nutrisnap_user_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Fallback default profile if onboarding not completed yet
      setProfile({
        name: 'Rizky Fitrianto',
        age: 25,
        gender: 'male',
        height_cm: 170,
        weight_kg: 65,
        activity_level: 'moderately_active',
        daily_calorie_target: 2100,
        protein_target_g: 100,
        carbs_target_g: 220,
        fat_target_g: 60,
      });
    }
  }, []);

  if (!profile) return <div className="p-8 text-center text-slate-400">Loading Profile...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Header Profile Info card */}
      <div className="bg-gradient-to-r from-white to-emerald-50/40 border border-emerald-100 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
        
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-400/40 flex items-center justify-center font-black text-emerald-700 text-3xl shadow-md shrink-0">
          {profile.name ? profile.name.substring(0, 2).toUpperCase() : 'US'}
        </div>

        <div className="space-y-1 text-center sm:text-left z-10">
          <h2 className="text-2xl font-black text-slate-800">{profile.name}</h2>
          <p className="text-xs text-slate-500 font-bold">Status Akun: <span className="text-emerald-600">Premium Gold</span></p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-full">
              {profile.gender === 'male' ? 'Pria' : 'Wanita'}
            </span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-full">
              {profile.age} Tahun
            </span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-full">
              Level: Master Gizi
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Physical info details */}
        <div className="space-y-6 md:col-span-1">
          <div className="bg-white border border-emerald-100 rounded-3xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span>Komposisi Fisik</span>
            </h3>

            <div className="space-y-3 text-xs font-semibold">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Tinggi Badan</span>
                <strong className="text-slate-800">{profile.height_cm} cm</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Berat Badan</span>
                <strong className="text-slate-800">{profile.weight_kg} kg</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Aktifitas Fisik</span>
                <strong className="text-emerald-700 capitalize">
                  {profile.activity_level.replace('_', ' ')}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: nutrition goals values */}
        <div className="space-y-6 md:col-span-2">
          <div className="bg-white border border-emerald-100 rounded-3xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>Target Nutrisi Harian (TDEE)</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 pb-2">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-emerald-100/50">
                <span className="text-[10px] text-slate-500 font-bold block">TARGET KALORI</span>
                <span className="text-xl font-black text-amber-500">{profile.daily_calorie_target} <span className="text-xs font-normal text-slate-500">kcal</span></span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-emerald-100/50">
                <span className="text-[10px] text-slate-500 font-bold block">TARGET PROTEIN</span>
                <span className="text-xl font-black text-teal-600">{profile.protein_target_g} <span className="text-xs font-normal text-slate-500">gram</span></span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-emerald-100/50">
                <span className="text-[10px] text-slate-500 font-bold block">TARGET KARBOHIDRAT</span>
                <span className="text-xl font-black text-amber-500">{profile.carbs_target_g} <span className="text-xs font-normal text-slate-500">gram</span></span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-emerald-100/50">
                <span className="text-[10px] text-slate-500 font-bold block">TARGET LEMAK BAIK</span>
                <span className="text-xl font-black text-rose-500">{profile.fat_target_g} <span className="text-xs font-normal text-slate-500">gram</span></span>
              </div>
            </div>

            <Link
              href="/onboarding"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/60 text-slate-700 font-bold text-xs border border-slate-200 text-center block transition"
            >
              Ubah Parameter Target Nutrisi (Onboarding Ulang)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
