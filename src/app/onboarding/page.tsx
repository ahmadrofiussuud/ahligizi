'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Activity, 
  Scale, 
  HeartPulse, 
  Droplet, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Crosshair,
  UserCheck
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: 'Sofia Kusuma',
    gender: 'FEMALE' as 'MALE' | 'FEMALE',
    age: 38,
    height: 162,
    weight: 68,
    activityLevel: 'LIGHT' as 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'HEAVY',
    ptm_focus: 'blood_sugar_control' as 'obesity_management' | 'blood_sugar_control' | 'hypertension_prevention',
  });

  // Calculate BMR (Mifflin-St Jeor)
  const calculateBMR = () => {
    const { weight, height, age, gender } = formData;
    if (!weight || !height || !age) return 0;
    
    // Mifflin-St Jeor Formula
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr = gender === 'MALE' ? bmr + 5 : bmr - 161;
    return Math.round(bmr);
  };

  // Calculate TDEE based on activity level
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const multipliers = {
      SEDENTARY: 1.2,
      LIGHT: 1.375,
      MODERATE: 1.55,
      HEAVY: 1.725,
    };
    return Math.round(bmr * multipliers[formData.activityLevel]);
  };

  // Compute Target Calories based on PTM Focus
  const calculateTargetCalories = () => {
    const tdee = calculateTDEE();
    if (formData.ptm_focus === 'obesity_management') {
      return Math.max(1200, Math.round(tdee - 450)); // Controlled deficit
    }
    if (formData.ptm_focus === 'blood_sugar_control') {
      return Math.round(tdee * 0.9); // Low-GI controlled carb intake
    }
    return Math.round(tdee * 0.95); // DASH sodium restriction
  };

  // IMT Calculation
  const heightM = formData.height / 100;
  const imt = parseFloat((formData.weight / (heightM * heightM)).toFixed(1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' ? Number(value) : value,
    }));
  };

  const handleSelectPtm = (focus: 'obesity_management' | 'blood_sugar_control' | 'hypertension_prevention') => {
    setFormData((prev) => ({ ...prev, ptm_focus: focus }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCalories = calculateTargetCalories();
    const tdee = calculateTDEE();

    const userProfile = {
      ...formData,
      imt,
      bmr: calculateBMR(),
      tdee,
      targetCalories,
      completedOnboarding: true,
      onboardingDate: new Date().toISOString(),
    };

    localStorage.setItem('nutrisnap_user_profile', JSON.stringify(userProfile));
    localStorage.setItem('nutrisnap_logged_in', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF8EE] text-slate-800 py-8 px-4 sm:px-6 relative overflow-hidden font-sans select-none">
      
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-[#00875A] text-[11px] font-mono uppercase tracking-widest font-black shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#00875A]" />
            <span>KEMENKES RI • PTM PREVENTIVE PROTOCOL 2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
            Inisialisasi Profil <span className="text-[#00875A]">Medis-Preventif PTM</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto font-medium">
            Evaluasi klinis presisi untuk pencegahan dini Penyakit Tidak Menular (PTM) berbasis formula metabolik <strong>Mifflin-St Jeor</strong> Kemenkes RI.
          </p>
        </div>

        {/* STEP 1: PILIH FOKUS ORIENTASI MEDIS-PREVENTIF PTM */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#00875A] text-white text-xs font-mono font-bold flex items-center justify-center shadow-xs">01</span>
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Pilih Orientasi Fokus Medis Pencegahan PTM
              </h2>
            </div>
            <span className="text-[10px] text-[#00875A] font-black tracking-wider uppercase">WAJIB DIPILIH</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: Obesity Management */}
            <div
              onClick={() => handleSelectPtm('obesity_management')}
              className={`cursor-pointer rounded-3xl p-5 border transition-all relative flex flex-col justify-between shadow-xs ${
                formData.ptm_focus === 'obesity_management'
                  ? 'bg-emerald-50/90 border-[#00875A] ring-2 ring-[#00875A]/20'
                  : 'bg-white border-slate-200/80 hover:border-emerald-300'
              }`}
            >
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                  formData.ptm_focus === 'obesity_management'
                    ? 'bg-[#00875A] text-white border-[#00875A]'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}>
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#00875A] uppercase tracking-wider block">Fokus 01</span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">Manajemen Obesitas</h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                    Pengurangan lingkar perut & lemak visceral via defisit kalori terkontrol dan tinggi serat.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-black text-[#00875A]">
                <span>DEFISIT TERUKUR</span>
                <span>SERAT &gt;25g/HARI</span>
              </div>
            </div>

            {/* Card 2: Blood Sugar Control */}
            <div
              onClick={() => handleSelectPtm('blood_sugar_control')}
              className={`cursor-pointer rounded-3xl p-5 border transition-all relative flex flex-col justify-between shadow-xs ${
                formData.ptm_focus === 'blood_sugar_control'
                  ? 'bg-emerald-50/90 border-[#00875A] ring-2 ring-[#00875A]/20'
                  : 'bg-white border-slate-200/80 hover:border-emerald-300'
              }`}
            >
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                  formData.ptm_focus === 'blood_sugar_control'
                    ? 'bg-[#00875A] text-white border-[#00875A]'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}>
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#00875A] uppercase tracking-wider block">Fokus 02</span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">Kontrol Gula Darah</h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                    Pencegahan prediabetes & hiperglikemia via karbohidrat kompleks rendah glikemik dan nol gula bebas.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-black text-[#00875A]">
                <span>LOW GI CARB</span>
                <span>GULA &lt;20g/HARI</span>
              </div>
            </div>

            {/* Card 3: Hypertension Prevention */}
            <div
              onClick={() => handleSelectPtm('hypertension_prevention')}
              className={`cursor-pointer rounded-3xl p-5 border transition-all relative flex flex-col justify-between shadow-xs ${
                formData.ptm_focus === 'hypertension_prevention'
                  ? 'bg-emerald-50/90 border-[#00875A] ring-2 ring-[#00875A]/20'
                  : 'bg-white border-slate-200/80 hover:border-emerald-300'
              }`}
            >
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                  formData.ptm_focus === 'hypertension_prevention'
                    ? 'bg-[#00875A] text-white border-[#00875A]'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}>
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#00875A] uppercase tracking-wider block">Fokus 03</span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">Pemeliharaan Tensi</h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                    Pola makan DASH (Dietary Approaches to Stop Hypertension), restriksi natrium & tinggi kalium alami.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-black text-[#00875A]">
                <span>DIET DASH</span>
                <span>GARAM &lt;1 SDT/HARI</span>
              </div>
            </div>

          </div>
        </div>

        {/* STEP 2: FORM DATA FISIK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Form Parameters */}
          <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-lg bg-[#00875A] text-white text-xs font-mono font-bold flex items-center justify-center shadow-xs">02</span>
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Parameter Fisik Pasien
              </h2>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-700 block">
                  Nama Lengkap Pasien
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama pasien..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#00875A] font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-slate-700 block">Jenis Kelamin</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#00875A] font-semibold"
                  >
                    <option value="FEMALE">Wanita</option>
                    <option value="MALE">Pria</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-slate-700 block">Usia (Tahun)</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#00875A] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-slate-700 block">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#00875A] font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-slate-700 block">Berat Badan (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#00875A] font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-700 block">Tingkat Aktivitas Fisik</label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#00875A] font-semibold"
                >
                  <option value="SEDENTARY">Sangat Jarang Berolahraga (Duduk Kerja)</option>
                  <option value="LIGHT">Aktivitas Ringan (Jalan Santai 1-3x/minggu)</option>
                  <option value="MODERATE">Aktivitas Sedang (Olahraga 3-5x/minggu)</option>
                  <option value="HEAVY">Aktivitas Tinggi / Pekerja Fisik</option>
                </select>
              </div>
            </div>
          </div>

          {/* Assessment Output Panel */}
          <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-lg bg-[#00875A] text-white text-xs font-mono font-bold flex items-center justify-center shadow-xs">03</span>
                <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
                  Hasil Evaluasi Metabolik Presisi
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#00875A] space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider block">Indeks Massa Tubuh (IMT)</span>
                  <span className="text-2xl sm:text-3xl font-black">{imt}</span>
                  <span className="text-[9.5px] font-bold block uppercase">
                    {imt >= 27 ? 'Obesitas' : imt >= 25 ? 'Kelebihan BB' : 'Normal'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#00875A] space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider block">Target Kalori PTM/Hari</span>
                  <span className="text-2xl sm:text-3xl font-black">{calculateTargetCalories()}</span>
                  <span className="text-[9.5px] font-bold block uppercase">Kcal / Hari</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700 font-medium">
                <div className="flex items-center justify-between">
                  <span>Basal Metabolic Rate (BMR):</span>
                  <span className="font-bold text-slate-900">{calculateBMR()} Kcal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Energy Expenditure (TDEE):</span>
                  <span className="font-bold text-slate-900">{calculateTDEE()} Kcal</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl bg-[#00875A] hover:bg-[#00704a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
            >
              <span>Simpan Profil & Masuk Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
