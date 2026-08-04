'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateDailyCalorieTarget } from '@/lib/mifflinStJeor';
import { Sparkles, ArrowRight, UserCheck, Activity, Scale, Ruler, Calendar } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    gender: 'male' as 'male' | 'female',
    height_cm: 170,
    weight_kg: 65,
    activity_level: 'moderately_active' as 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active',
  });

  const [calculated, setCalculated] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'height_cm' || name === 'weight_kg' ? Number(value) : value,
    }));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateDailyCalorieTarget(formData);
    setCalculated(result);
  };

  const handleSaveAndRedirect = () => {
    if (!calculated) return;

    // Save profile to localStorage for seamless dashboard persistence
    const userProfile = {
      ...formData,
      daily_calorie_target: calculated.tdee,
      protein_target_g: calculated.protein_target_g,
      carbs_target_g: calculated.carbs_target_g,
      fat_target_g: calculated.fat_target_g,
      onboarded: true,
    };

    localStorage.setItem('nutrisnap_user_profile', JSON.stringify(userProfile));
    router.push('/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 py-4">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          Langkah Awal NutriSnap
        </span>
        <h1 className="text-3xl font-extrabold text-white">Profil Kesehatan & Target Kalori</h1>
        <p className="text-slate-400 text-sm">
          Isi data fisik kamu untuk menghitung target kalori harian presisi menggunakan metode <strong>Mifflin-St Jeor</strong>.
        </p>
      </div>

      <form onSubmit={handleCalculate} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Masukkan nama kamu..."
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Jenis Kelamin</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="male">Pria</option>
              <option value="female">Wanita</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Usia (Tahun)</label>
            <input
              type="number"
              name="age"
              required
              min="10"
              max="100"
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Tinggi Badan (cm)</label>
            <input
              type="number"
              name="height_cm"
              required
              min="100"
              max="250"
              value={formData.height_cm}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Berat Badan (kg)</label>
            <input
              type="number"
              name="weight_kg"
              required
              min="30"
              max="250"
              value={formData.weight_kg}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Tingkat Aktivitas Fisik</label>
          <select
            name="activity_level"
            value={formData.activity_level}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="sedentary">Sangat Jarang Olahraga (Sedentary)</option>
            <option value="lightly_active">Ringan (Olahraga 1-3 hari/minggu)</option>
            <option value="moderately_active">Sedang (Olahraga 3-5 hari/minggu)</option>
            <option value="very_active">Berat (Olahraga 6-7 hari/minggu)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-emerald-950 font-extrabold text-xs shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Hitung Target Kalori Otomatis</span>
        </button>
      </form>

      {/* Calculated Result Card */}
      {calculated && (
        <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-500/50 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Hasil Mifflin-St Jeor</span>
              <h3 className="text-xl font-extrabold text-white">Target Kalori Harian (TDEE)</h3>
            </div>
            <span className="text-3xl font-black text-amber-400">{calculated.tdee} <span className="text-xs text-slate-300 font-normal">kcal/hari</span></span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 block">Target Protein</span>
              <span className="text-sm font-bold text-teal-300">{calculated.protein_target_g}g</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Target Karbo</span>
              <span className="text-sm font-bold text-amber-300">{calculated.carbs_target_g}g</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Target Lemak</span>
              <span className="text-sm font-bold text-rose-300">{calculated.fat_target_g}g</span>
            </div>
          </div>

          <button
            onClick={handleSaveAndRedirect}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <span>Simpan Profil & Lanjut ke Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
