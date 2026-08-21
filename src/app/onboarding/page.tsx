'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  calculateDailyCalorieTarget, 
  PtmFocus, 
  PTM_DETAILS, 
  UserHealthProfile 
} from '@/lib/mifflinStJeor';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Scale, 
  HeartPulse, 
  Droplet, 
  Flame, 
  Crosshair, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Zap,
  Target
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<UserHealthProfile>({
    name: 'Sofia Kusuma',
    age: 42,
    gender: 'female',
    height_cm: 160,
    weight_kg: 68,
    activity_level: 'moderately_active',
    ptm_focus: 'blood_sugar_control',
  });

  const [calculated, setCalculated] = useState<any>(() => {
    return calculateDailyCalorieTarget({
      name: 'Sofia Kusuma',
      age: 42,
      gender: 'female',
      height_cm: 160,
      weight_kg: 68,
      activity_level: 'moderately_active',
      ptm_focus: 'blood_sugar_control',
    });
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: name === 'age' || name === 'height_cm' || name === 'weight_kg' ? Number(value) : value,
      };
      // Auto recalculate live
      setCalculated(calculateDailyCalorieTarget(updated));
      return updated;
    });
  };

  const handleSelectPtm = (focus: PtmFocus) => {
    setFormData((prev) => {
      const updated = { ...prev, ptm_focus: focus };
      setCalculated(calculateDailyCalorieTarget(updated));
      return updated;
    });
  };

  const handleSaveAndRedirect = () => {
    if (!calculated) return;

    // Save profile to localStorage for seamless dashboard persistence
    const userProfile = {
      ...formData,
      daily_calorie_target: calculated.adjusted_calorie_target,
      tdee: calculated.tdee,
      bmr: calculated.bmr,
      protein_target_g: calculated.protein_target_g,
      carbs_target_g: calculated.carbs_target_g,
      fat_target_g: calculated.fat_target_g,
      fiber_target_g: calculated.fiber_target_g,
      imt: calculated.imt,
      imt_category: calculated.imt_category,
      ptm_focus: formData.ptm_focus,
      ptm_detail: calculated.ptm_detail,
      onboarded: true,
      updated_at: new Date().toISOString(),
    };

    localStorage.setItem('nutrisnap_user_profile', JSON.stringify(userProfile));
    localStorage.setItem('nutrisnap_logged_in', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Tactical HUD Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Tactical HUD Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/60 backdrop-blur text-emerald-400 text-[11px] font-mono uppercase tracking-widest">
            <Crosshair className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>PHIC 2026 PREVENTIVE PROTOCOL v2.4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            Inisialisasi Profil <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Medis-Preventif PTM</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Sistem evaluasi gizi klinik presisi untuk pencegahan dini Penyakit Tidak Menular (PTM) berbasis formula metabolik <strong>Mifflin-St Jeor</strong> dan pedoman gizi klinis.
          </p>
        </div>

        {/* STEP 1: PILIH FOKUS ORIENTASI MEDIS-PREVENTIF PTM */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">01</span>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-200">
                Pilih Orientasi Fokus Medis Pencegahan PTM
              </h2>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold">WAJIB DIPILIH</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: Obesity Management */}
            <div
              onClick={() => handleSelectPtm('obesity_management')}
              className={`cursor-pointer rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                formData.ptm_focus === 'obesity_management'
                  ? 'bg-gradient-to-b from-emerald-950/80 to-slate-900 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              {formData.ptm_focus === 'obesity_management' && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  formData.ptm_focus === 'obesity_management'
                    ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">Fokus 01</span>
                  <h3 className="text-base font-black text-white mt-0.5">Manajemen Obesitas</h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Pengurangan lingkar perut & lemak visceral via defisit kalori terkontrol dan tinggi serat.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-emerald-400 font-bold">
                <span>DEFISIT TERUKUR</span>
                <span>SERAT &gt;25g/HARI</span>
              </div>
            </div>

            {/* Card 2: Blood Sugar Control */}
            <div
              onClick={() => handleSelectPtm('blood_sugar_control')}
              className={`cursor-pointer rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                formData.ptm_focus === 'blood_sugar_control'
                  ? 'bg-gradient-to-b from-teal-950/80 to-slate-900 border-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.25)] ring-1 ring-teal-300'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              {formData.ptm_focus === 'blood_sugar_control' && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              )}
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  formData.ptm_focus === 'blood_sugar_control'
                    ? 'bg-teal-500/20 border-teal-400/50 text-teal-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider block">Fokus 02</span>
                  <h3 className="text-base font-black text-white mt-0.5">Kontrol Gula Darah</h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Pencegahan prediabetes & hiperglikemia via karbohidrat kompleks rendah glikemik dan nol gula bebas.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-teal-400 font-bold">
                <span>LOW GI CARB</span>
                <span>GULA &lt;20g/HARI</span>
              </div>
            </div>

            {/* Card 3: Hypertension Prevention */}
            <div
              onClick={() => handleSelectPtm('hypertension_prevention')}
              className={`cursor-pointer rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                formData.ptm_focus === 'hypertension_prevention'
                  ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-300'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              {formData.ptm_focus === 'hypertension_prevention' && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  formData.ptm_focus === 'hypertension_prevention'
                    ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">Fokus 03</span>
                  <h3 className="text-base font-black text-white mt-0.5">Pemeliharaan Tensi</h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Pola makan DASH (Dietary Approaches to Stop Hypertension), restriksi natrium & tinggi kalium alami.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-cyan-400 font-bold">
                <span>DIET DASH</span>
                <span>GARAM &lt;1 SDT/HARI</span>
              </div>
            </div>

          </div>
        </div>

        {/* STEP 2: FORM DATA FISIK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Form Parameters */}
          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">02</span>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-200">
                Parameter Fisik Pasien
              </h2>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-slate-400 flex items-center justify-between">
                  <span>Nama Lengkap Pasien</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama pasien..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-slate-400">Jenis Kelamin</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  >
                    <option value="male">Pria</option>
                    <option value="female">Wanita</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-slate-400">Usia (Tahun)</label>
                  <input
                    type="number"
                    name="age"
                    min="10"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-slate-400">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    name="height_cm"
                    min="100"
                    max="250"
                    value={formData.height_cm}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-slate-400">Berat Badan (kg)</label>
                  <input
                    type="number"
                    name="weight_kg"
                    min="30"
                    max="250"
                    value={formData.weight_kg}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-slate-400">Tingkat Aktivitas Fisik</label>
                <select
                  name="activity_level"
                  value={formData.activity_level}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
                >
                  <option value="sedentary">Sedentary (Sangat Jarang Bergerak / Kerja Duduk)</option>
                  <option value="lightly_active">Ringan (Jalan Santai / Olahraga 1-3 hari/minggu)</option>
                  <option value="moderately_active">Sedang (Olahraga Teratur 3-5 hari/minggu)</option>
                  <option value="very_active">Berat (Fisik Intensif / Olahraga 6-7 hari/minggu)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Realtime Tactical HUD Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 flex flex-col justify-between space-y-5 shadow-2xl relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider block">
                    {calculated.ptm_detail.badge}
                  </span>
                  <h3 className="text-lg font-black text-white mt-0.5">Analisis Kebutuhan Nutrisi Klinis</h3>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  IMT: {calculated.imt} ({calculated.imt_category})
                </div>
              </div>

              {/* Big Display Target Kalori */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Target Kalori Harian (Presisi)</span>
                  <div className="text-3xl font-black text-white flex items-baseline gap-1 mt-0.5">
                    <span className="text-emerald-400">{calculated.adjusted_calorie_target}</span>
                    <span className="text-xs text-slate-400 font-normal">kcal/hari</span>
                  </div>
                </div>
                <div className="text-right text-[11px] font-mono text-slate-400 space-y-0.5">
                  <div>BMR: <span className="text-slate-200 font-bold">{calculated.bmr} kcal</span></div>
                  <div>TDEE: <span className="text-slate-200 font-bold">{calculated.tdee} kcal</span></div>
                </div>
              </div>

              {/* Macro & Fiber Grid */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">Protein</span>
                  <span className="text-xs font-black text-teal-300 mt-0.5 block">{calculated.protein_target_g}g</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">Karbohidrat</span>
                  <span className="text-xs font-black text-amber-300 mt-0.5 block">{calculated.carbs_target_g}g</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">Lemak Sehat</span>
                  <span className="text-xs font-black text-rose-300 mt-0.5 block">{calculated.fat_target_g}g</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">Target Serat</span>
                  <span className="text-xs font-black text-emerald-300 mt-0.5 block">{calculated.fiber_target_g}g</span>
                </div>
              </div>

              {/* Pedoman GGL Klinis */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Pedoman Batas GGL (Gula • Garam • Lemak)</span>
                </span>
                <div className="text-[11px] text-slate-300 space-y-1 leading-relaxed">
                  <div>• <strong className="text-amber-300">Gula:</strong> {calculated.ptm_detail.ggl_guideline.sugar_limit}</div>
                  <div>• <strong className="text-cyan-300">Garam:</strong> {calculated.ptm_detail.ggl_guideline.salt_limit}</div>
                  <div>• <strong className="text-rose-300">Lemak:</strong> {calculated.ptm_detail.ggl_guideline.fat_limit}</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveAndRedirect}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Aktifkan Profil & Masuk ke Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
