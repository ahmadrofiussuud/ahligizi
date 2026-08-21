'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Camera, 
  Upload, 
  ChefHat, 
  Flame, 
  ShieldCheck, 
  Clock, 
  Utensils, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  Zap, 
  Crosshair, 
  Droplet, 
  Scale, 
  HeartPulse, 
  BookmarkCheck,
  Tag,
  Check,
  ChevronRight
} from 'lucide-react';
import { PtmFocus, PTM_DETAILS } from '@/lib/mifflinStJeor';

const QUICK_INGREDIENTS = [
  'Telur', 'Bayam', 'Tahu', 'Tempe', 'Wortel', 'Tomat', 
  'Ayam Fillet', 'Kangkung', 'Brokoli', 'Buncis', 'Labu Siam', 'Jamur Tiram'
];

export default function PantryAiPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['Telur', 'Bayam', 'Tahu']);
  const [customInput, setCustomInput] = useState<string>('');
  const [ptmFocus, setPtmFocus] = useState<PtmFocus>('obesity_management');
  
  // Image upload / camera states
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Loading & Result States
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStage, setLoadingStage] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loggedSuccess, setLoggedSuccess] = useState<boolean>(false);

  // Tag toggle helper
  const toggleTag = (item: string) => {
    if (selectedTags.includes(item)) {
      setSelectedTags(selectedTags.filter((t) => t !== item));
    } else {
      setSelectedTags([...selectedTags, item]);
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const items = customInput.split(',').map((s) => s.trim()).filter(Boolean);
    const newTags = Array.from(new Set([...selectedTags, ...items]));
    setSelectedTags(newTags);
    setCustomInput('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateRecipe = async () => {
    const allIngredients = selectedTags.join(', ');
    if (!allIngredients && !imagePreview) {
      setError('Silakan pilih minimal 1 bahan makanan atau unggah foto kulkas.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setLoggedSuccess(false);

    // Visual Stage Simulation
    setLoadingStage('Memindai matriks nutrisi bahan...');
    setTimeout(() => setLoadingStage('Menerapkan parameter diet klinis PTM & GGL...'), 700);
    setTimeout(() => setLoadingStage('Menghasilkan resep preventif presisi...'), 1300);

    try {
      const res = await fetch('/api/pantry-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: allIngredients,
          image: imagePreview,
          ptm_focus: ptmFocus,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Gagal memproses rekomendasi resep.');
      }
    } catch (err) {
      setError('Terjadi kendala jaringan saat menghubungi asisten AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToFoodLog = () => {
    if (!result) return;

    const newLog = {
      id: `pantry-log-${Date.now()}`,
      food_name: result.recipe_name,
      calories: result.calories,
      protein_g: result.protein_g,
      carbs_g: result.carbs_g,
      fat_g: result.fat_g,
      portion_estimate: result.portion,
      meal_type: 'LUNCH',
      health_verdict: 'Healthy',
      ai_notes: result.clinical_benefit,
      created_at: new Date().toISOString(),
    };

    // Save to local storage mock logs for dashboard sync
    const existingLogs = JSON.parse(localStorage.getItem('nutrisnap_local_food_logs') || '[]');
    existingLogs.unshift(newLog);
    localStorage.setItem('nutrisnap_local_food_logs', JSON.stringify(existingLogs));

    setLoggedSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Tactical HUD Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Tactical Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/60 backdrop-blur text-emerald-400 text-[11px] font-mono uppercase tracking-widest">
              <Crosshair className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>PANTRY AI • ZERO FOOD WASTE & PREVENTIVE DIET</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase flex items-center gap-3">
              <span>Smart Pantry</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">NutriChef AI</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              Ubah bahan makanan sisa di kulkas Anda menjadi menu masakan sehat bernutrisi tinggi dengan optimasi restriksi GGL (Gula, Garam, Lemak) berbasis AI.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/scan"
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs font-mono text-slate-300 font-bold transition flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Scan Makanan Siap Saji</span>
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <span>Dashboard Gizi</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* MAIN INTERACTIVE WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: INGREDIENTS SELECTOR & PTM FOCUS (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: PTM Focus Selector */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 backdrop-blur shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>01. Fokus Target Medis-Preventif</span>
                </span>
                <span className="text-[9px] font-mono text-slate-500">STANDAR PHIC</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPtmFocus('obesity_management')}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    ptmFocus === 'obesity_management'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 ring-1 ring-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold leading-tight">Obesitas (Cut BB)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPtmFocus('blood_sugar_control')}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    ptmFocus === 'blood_sugar_control'
                      ? 'bg-teal-950/80 border-teal-400 text-teal-300 ring-1 ring-teal-300 shadow-[0_0_10px_rgba(20,184,166,0.2)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Droplet className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold leading-tight">Gula Darah</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPtmFocus('hypertension_prevention')}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    ptmFocus === 'hypertension_prevention'
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 ring-1 ring-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <HeartPulse className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold leading-tight">Kontrol Tensi</span>
                </button>
              </div>
            </div>

            {/* Step 2: Tag & Text Input */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 backdrop-blur shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>02. Pilih / Ketik Bahan Sisa Masakan</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {selectedTags.length} Bahan Dipilih
                </span>
              </div>

              {/* Quick Preset Tags */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Preset Bahan Populer:</span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_INGREDIENTS.map((item) => {
                    const isSelected = selectedTags.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleTag(item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                            : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        {isSelected ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3 text-slate-500" />}
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Input Form */}
              <form onSubmit={handleAddCustom} className="space-y-2 pt-2 border-t border-slate-800/80">
                <label className="text-[10px] font-mono text-slate-400 block uppercase">
                  Tambah Bahan Lain (pisahkan dengan koma):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Contoh: labu siam, daun salam, bawang..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-200 uppercase transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah</span>
                  </button>
                </div>
              </form>

              {/* Active Selected Tags Display */}
              {selectedTags.length > 0 && (
                <div className="p-3 bg-slate-950/90 border border-slate-800/80 rounded-2xl space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Daftar Bahan Aktif:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className="text-slate-400 hover:text-rose-400 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Camera / Image Upload */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">
                    Atau Foto Bahan di Kulkas (Opsional):
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-[10px] font-mono text-rose-400 hover:underline"
                    >
                      Hapus Foto
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 max-h-36">
                    <img src={imagePreview} alt="Fridge ingredients" className="w-full h-36 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex items-end p-2.5">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">Foto Siap Dianalisis AI</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 border border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-950/50 rounded-2xl text-center text-xs font-mono text-slate-400 hover:text-emerald-300 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Unggah / Ambil Foto Bahan Kulkas</span>
                  </button>
                )}
              </div>

              {/* Generate Trigger Button */}
              <button
                type="button"
                onClick={handleGenerateRecipe}
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.35)] transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{loadingStage || 'Sedang Meracik Resep...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Resep Sehat Preventif</span>
                  </>
                )}
              </button>

              {error && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: TACTICAL RECIPE DISPLAY (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {result ? (
              <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 space-y-6 backdrop-blur shadow-2xl relative">
                {/* HUD Corner Decorators */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />

                {/* Recipe Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                      <ChefHat className="w-3 h-3" />
                      <span>{result.suitability_badge || 'Menu Preventif PTM Teruji'}</span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      {result.recipe_name}
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                        {result.portion}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-teal-400" />
                        ± {result.cook_time_minutes} Menit
                      </span>
                    </div>
                  </div>

                  {/* Calories Highlight Card */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-center sm:text-right shrink-0">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Estimasi Energi</span>
                    <div className="text-2xl font-black text-amber-400 flex items-baseline justify-center sm:justify-end gap-1">
                      <span>{result.calories}</span>
                      <span className="text-xs text-slate-400 font-normal">kcal</span>
                    </div>
                  </div>
                </div>

                {/* Macro Nutrition Radar HUD */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Protein</span>
                    <span className="text-sm font-black text-teal-300 mt-1 block">{result.protein_g}g</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Karbohidrat</span>
                    <span className="text-sm font-black text-amber-300 mt-1 block">{result.carbs_g}g</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Lemak Sehat</span>
                    <span className="text-sm font-black text-rose-300 mt-1 block">{result.fat_g}g</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Serat Pangan</span>
                    <span className="text-sm font-black text-emerald-300 mt-1 block">{result.fiber_g}g</span>
                  </div>
                </div>

                {/* CLINICAL GGL DEFENSE BOX (TIPS PENGURANGAN GULA, GARAM, MINYAK) */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-950 to-cyan-950/50 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-mono font-black uppercase text-emerald-300 tracking-wider">
                      Pedoman Reduksi GGL (Gula • Garam • Minyak) Resep Ini
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] font-sans">
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="text-amber-300 font-mono font-bold block uppercase text-[10px]">01. Kontrol Gula</span>
                      <p className="text-slate-300 leading-relaxed">{result.ggl_reduction_tips?.sugar || 'Nol gula tambahan dalam proses memasak.'}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="text-cyan-300 font-mono font-bold block uppercase text-[10px]">02. Kontrol Garam/Natrium</span>
                      <p className="text-slate-300 leading-relaxed">{result.ggl_reduction_tips?.salt || 'Gunakan rempah aromatik pengganti garam berlebih.'}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <span className="text-rose-300 font-mono font-bold block uppercase text-[10px]">03. Kontrol Minyak/Lemak</span>
                      <p className="text-slate-300 leading-relaxed">{result.ggl_reduction_tips?.oil_fat || 'Gunakan teknik kukus atau saute minyak minimal.'}</p>
                    </div>
                  </div>
                </div>

                {/* Cooking Steps */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-black uppercase text-slate-300 tracking-wider flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Langkah Memasak Praktis</span>
                  </h3>
                  <div className="space-y-2.5">
                    {result.cooking_steps?.map((step: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-start gap-3 text-xs text-slate-300 leading-relaxed"
                      >
                        <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Benefit Note */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 block uppercase">
                    Evaluasi Klinis Gizi:
                  </span>
                  <p>{result.clinical_benefit}</p>
                </div>

                {/* Action Buttons: Log to Food Log */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleSaveToFoodLog}
                    disabled={loggedSuccess}
                    className={`flex-1 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
                      loggedSuccess
                        ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white shadow-lg'
                    }`}
                  >
                    {loggedSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Tersimpan di Log Makanan Hari Ini!</span>
                      </>
                    ) : (
                      <>
                        <BookmarkCheck className="w-4 h-4" />
                        <span>+ Catat ke Food Log Hari Ini</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setResult(null);
                      setImagePreview(null);
                    }}
                    className="px-4 py-3 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold transition"
                  >
                    Reset & Racik Ulang
                  </button>
                </div>
              </div>
            ) : (
              /* Empty Placeholder State */
              <div className="bg-slate-900/60 border border-slate-800/80 border-dashed rounded-3xl p-12 text-center space-y-4 backdrop-blur">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <ChefHat className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 max-w-sm mx-auto">
                  <h3 className="text-base font-black text-white uppercase tracking-wider">
                    Asisten Chef Siap Beraksi
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Pilih bahan makanan sisa di panel kiri atau unggah foto kulkas Anda. Algoritma kami akan merancang resep lezat rendah GGL dalam hitungan detik.
                  </p>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950 text-slate-500 font-mono text-[10px]">
                    0% Food Waste
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-950 text-slate-500 font-mono text-[10px]">
                    Kalkulasi Makro Otomatis
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-950 text-slate-500 font-mono text-[10px]">
                    PHIC 2026 Ready
                  </span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
