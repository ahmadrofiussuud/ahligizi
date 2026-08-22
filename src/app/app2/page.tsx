'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Heart, 
  Sparkles, 
  Camera, 
  ChevronRight, 
  ArrowLeft, 
  Activity, 
  Calendar, 
  ShoppingBag, 
  BookOpen, 
  Video, 
  MoreHorizontal, 
  CheckCircle2, 
  Trophy, 
  Gamepad2, 
  Leaf,
  Home,
  Utensils,
  ClipboardList,
  User,
  Search,
  Zap,
  Flame,
  Star,
  Award,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export default function CekatApp2Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Navigation & Sub-view states
  const [activeTab, setActiveTab] = useState<'dashboard' | 'nutrisi' | 'challenge' | 'riwayat' | 'profil'>('dashboard');
  const [dashboardSubView, setDashboardSubView] = useState<'home' | 'station_summary' | 'cek_risiko' | 'reminders' | 'marketplace' | 'edukasi' | 'article_detail' | 'webinar_list'>('home');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  // BMI State Variables
  const [weightInput, setWeightInput] = useState<string>('68');
  const [heightInput, setHeightInput] = useState<string>('1.60');
  const [bmiValue, setBmiValue] = useState<number>(26.56);
  const [bmiCategory, setBmiCategory] = useState<'Kurus' | 'Normal' | 'Gemuk'>('Gemuk');

  const calculateBmi = () => {
    const w = parseFloat(weightInput);
    const h = parseFloat(heightInput);
    if (w > 0 && h > 0) {
      const calculated = w / (h * h);
      setBmiValue(parseFloat(calculated.toFixed(2)));
      if (calculated < 18.5) setBmiCategory('Kurus');
      else if (calculated < 25) setBmiCategory('Normal');
      else setBmiCategory('Gemuk');
    }
  };

  const [nutrisiSubView, setNutrisiSubView] = useState<'main' | 'scan_camera' | 'scan_result' | 'charts' | 'pantry'>('main');
  const [challengeSubView, setChallengeSubView] = useState<'home' | 'misi' | 'games'>('home');
  const [riwayatSubView, setRiwayatSubView] = useState<'home' | 'wrapped'>('home');
  const [riwayatCategory, setRiwayatCategory] = useState<string>('Semua');

  // Interactive Focus Targets (Mingguan)
  const [focusTargets, setFocusTargets] = useState([
    { id: 1, text: 'Kurangi konsumsi gula tambahan hari ini', done: true },
    { id: 2, text: 'Jalan cepat 30 menit / Senam ringan', done: true },
    { id: 3, text: 'Makan sayur & buah 2x porsi', done: false }
  ]);
  const toggleFocus = (id: number) => {
    setFocusTargets(focusTargets.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Interactive 7-Day Challenge Targets
  const [misiTargets, setMisiTargets] = useState([
    { id: 1, text: 'Minum air 2 Liter (8 Gelas)', done: true },
    { id: 2, text: 'Aktivitas fisik 30 menit', done: true },
    { id: 3, text: 'Makan sayur 2x sehari', done: true },
    { id: 4, text: 'Kurangi minuman manis & boba', done: true },
    { id: 5, text: 'Tidur cukup 7-8 jam berkualitas', done: true },
    { id: 6, text: 'Kurangi makanan tinggi garam', done: false },
    { id: 7, text: 'Food Scan 3x minggu ini', done: false }
  ]);
  const toggleMisi = (id: number) => {
    setMisiTargets(misiTargets.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Pantry AI selected ingredients
  const [selectedPantryTags, setSelectedPantryTags] = useState<string[]>(['Telur', 'Ayam', 'Sayur']);
  const pantryTagsList = ['Telur', 'Ikan', 'Ayam', 'Sayur', 'Daging', 'Tempe', 'Wortel'];

  // Sync state from searchParams
  useEffect(() => {
    const tab = searchParams.get('tab');
    const view = searchParams.get('view');

    if (tab && ['dashboard', 'nutrisi', 'challenge', 'riwayat', 'profil'].includes(tab)) {
      setActiveTab(tab as any);
    }
    if (tab === 'dashboard' && view) setDashboardSubView(view as any);
    if (tab === 'nutrisi' && view) setNutrisiSubView(view as any);
    if (tab === 'challenge' && view) setChallengeSubView(view as any);
    if (tab === 'riwayat' && view) setRiwayatSubView(view as any);
  }, [searchParams]);

  // Articles mock data
  const articlesList = [
    {
      id: 'art-1',
      category: 'Pencegahan Stunting',
      title: 'Peran Protein Hewani dalam Mencegah Stunting Anak',
      author: 'Tim Medis CEKAT',
      readTime: '4 min baca',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
      summary: 'Protein hewani seperti telur, ikan, dan daging mengandung asam amino esensial lengkap yang dibutuhkan untuk tumbuh kembang optimal anak dan mencegah gangguan pertumbuhan fisik maupun otak.'
    },
    {
      id: 'art-2',
      category: 'Penyakit Tidak Menular',
      title: 'Mengenal Gejala Awal Diabetes Melitus Tipe 2',
      author: 'dr. Sarah Amanda, Sp.GK',
      readTime: '5 min baca',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
      summary: 'Sering merasa haus, sering buang air kecil di malam hari, dan luka susah sembuh adalah indikator penting untuk segera melakuakan cek kadar gula darah puasa.'
    },
    {
      id: 'art-3',
      category: 'Gizi Seimbang',
      title: 'Panduan Isi Piringku: Porsi Makro & Mikro Harian',
      author: 'dr. Elina Rahma, Sp.GK',
      readTime: '3 min baca',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80',
      summary: 'Pembagian porsi 50% karbohidrat kompleks & protein hewani serta 50% buah dan sayuran segar merupakan standar rekomendasi Kementerian Kesehatan.'
    }
  ];

  // Webinars mock list
  const webinarsList = [
    {
      id: 'webinar-1',
      date: 'Minggu, 14 Feb 2026',
      title: 'Teknologi dan Kearifan Lokal Kunci Tumbuh Kembang Optimal',
      platform: 'Zoom Meeting',
      image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'webinar-2',
      date: 'Rabu, 7 Maret 2026',
      title: 'Memahami Hubungan Antara Makanan dan Kesehatan Mental',
      platform: 'Zoom Meeting',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'webinar-3',
      date: 'Sabtu, 18 April 2026',
      title: 'Strategi Pencegahan Hipertensi Usia Muda di Era Digital',
      platform: 'Zoom Meeting',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f8f6] text-slate-800 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 
        ========================================================================
        DESKTOP SUITE (Visible on Desktop md & up)
        ========================================================================
      */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 py-8">
        
        {/* Desktop Header Navigation Bar */}
        <header className="bg-white rounded-3xl p-4 px-8 border border-emerald-100/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00875A] to-[#10b981] text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">CEKAT App 2</h1>
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[9.5px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Modern & Fun
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Sistem Integrasi Cegah PTM Kemkes</p>
            </div>
          </div>

          {/* Tab Selection Bar */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            {[
              { id: 'dashboard', name: 'Beranda', icon: Home },
              { id: 'nutrisi', name: 'Nutrisi Harian', icon: Utensils },
              { id: 'challenge', name: 'Challenge & Misi', icon: Gamepad2 },
              { id: 'riwayat', name: 'Riwayat', icon: ClipboardList },
              { id: 'profil', name: 'Profil BPJS', icon: User }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    if (tab.id === 'dashboard') setDashboardSubView('home');
                    if (tab.id === 'nutrisi') setNutrisiSubView('main');
                    if (tab.id === 'challenge') setChallengeSubView('home');
                    if (tab.id === 'riwayat') setRiwayatSubView('home');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition duration-200 ${
                    isActive
                      ? 'bg-[#00875A] text-white shadow-md shadow-emerald-700/20'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* User Account Widget */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <span className="text-xs font-black text-slate-900 block leading-tight">Sofia Kusuma</span>
              <span className="text-[10px] text-emerald-600 font-bold block">Terhubung BPJS Kes</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border-2 border-emerald-500 overflow-hidden shadow-sm">
              <img src="/landing/doctor_elina_photo.jpg" alt="User Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Grid Layout: Main Left (8 Cols) + Widget Right (4 Cols) */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Main Desktop Dashboard Area */}
          <main className="col-span-8 space-y-6">
            
            {/* TAB 1: BERANDA */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Hero Greeting Banner */}
                <div className="bg-gradient-to-r from-[#00875A] via-[#059669] to-[#2d8d81] text-white rounded-3xl p-7 shadow-lg relative overflow-hidden flex items-center justify-between">
                  <div className="space-y-3 z-10 max-w-lg">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/20 text-yellow-300 text-xs font-black">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      <span>Selamat Datang Kembali!</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight leading-snug">Halo, Sofia Kusuma 👋</h2>
                    <p className="text-sm text-emerald-100 font-semibold leading-relaxed">
                      Pantau indeks kesehatan harian, porsi nutrisi seimbang, dan ikuti challenge mingguan untuk cegah Penyakit Tidak Menular.
                    </p>
                    <div className="pt-2 flex gap-3">
                      <button onClick={() => { setActiveTab('challenge'); setChallengeSubView('misi'); }} className="px-5 py-2.5 bg-[#f1c40f] hover:bg-yellow-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition active:scale-95">
                        Mulai Challenge
                      </button>
                      <button onClick={() => { setActiveTab('nutrisi'); setNutrisiSubView('charts'); }} className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl border border-white/20 transition">
                        Cek IMT Harian
                      </button>
                    </div>
                  </div>
                  <div className="w-32 h-32 shrink-0 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-6xl shadow-inner border border-white/20 z-10">
                    🤖
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                </div>

                {/* Cek Risiko Kesehatan Card */}
                <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block">Hasil Screening Terbaru</span>
                      <h3 className="text-lg font-black text-slate-900">Cek Risiko Kesehatan PTM</h3>
                    </div>
                    <span className="text-xs font-extrabold text-slate-400">30 Agustus 2026</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <Heart className="w-6 h-6 fill-current" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-800 block">Risiko Hipertensi</span>
                        <span className="text-xs font-black text-red-600 block mt-0.5">Tingkat: TINGGI</span>
                        <span className="text-[10px] text-slate-500 font-semibold block mt-1">Tekanan Darah: 140/85 mmHg</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Activity className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-800 block">Indeks Massa Tubuh</span>
                        <span className="text-xs font-black text-amber-700 block mt-0.5">Kategori: OVERWEIGHT</span>
                        <span className="text-[10px] text-slate-500 font-semibold block mt-1">IMT: 24.03 kg/m²</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ringkasan CEKAT Station Metrics Table */}
                <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900">Data Pengukuran CEKAT Station</h3>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Puskesmas Pembantu Ngabab</span>
                  </div>

                  <div className="border border-slate-150 rounded-2xl overflow-hidden shadow-inner">
                    <table className="w-full text-center text-xs font-black border-collapse">
                      <thead>
                        <tr className="bg-[#00875A] text-white">
                          <th className="py-3 px-2 border-r border-emerald-600/40">TD</th>
                          <th className="py-3 px-2 border-r border-emerald-600/40">Gula Darah</th>
                          <th className="py-3 px-2 border-r border-emerald-600/40">HR</th>
                          <th className="py-3 px-2 border-r border-emerald-600/40">LP</th>
                          <th className="py-3 px-2 border-r border-emerald-600/40">TB</th>
                          <th className="py-3 px-2 border-r border-emerald-600/40">BB</th>
                          <th className="py-3 px-2">IMT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white text-slate-800">
                          <td className="py-3 px-2 border-r border-slate-100">140/85 mmHg</td>
                          <td className="py-3 px-2 border-r border-slate-100">85 mg/dL</td>
                          <td className="py-3 px-2 border-r border-slate-100">60 bpm</td>
                          <td className="py-3 px-2 border-r border-slate-100">83 cm</td>
                          <td className="py-3 px-2 border-r border-slate-100">158 cm</td>
                          <td className="py-3 px-2 border-r border-slate-100">60 kg</td>
                          <td className="py-3 px-2 text-amber-700 font-extrabold">24,03 kg/m²</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Articles & Webinars Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Edukasi Articles */}
                  <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">Artikel & Edukasi Gizi</h4>
                      <button onClick={() => { setActiveTab('dashboard'); setDashboardSubView('edukasi'); }} className="text-xs font-bold text-emerald-600 hover:underline">Lihat Semua</button>
                    </div>
                    <div className="space-y-3">
                      {articlesList.slice(0, 2).map(art => (
                        <div key={art.id} onClick={() => { setSelectedArticle(art); setDashboardSubView('article_detail'); }} className="flex gap-3 p-2 bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer hover:bg-emerald-50/50 transition">
                          <img src={art.image} alt={art.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] font-black text-emerald-700 uppercase tracking-wider">{art.category}</span>
                            <h5 className="text-xs font-black text-slate-800 leading-snug line-clamp-2 mt-0.5">{art.title}</h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Webinars */}
                  <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">Webinar Kesehatan</h4>
                      <button onClick={() => { setActiveTab('dashboard'); setDashboardSubView('webinar_list'); }} className="text-xs font-bold text-emerald-600 hover:underline">Lihat Semua</button>
                    </div>
                    <div className="space-y-3">
                      {webinarsList.slice(0, 2).map(web => (
                        <div key={web.id} className="flex gap-3 p-2 bg-slate-50 border border-slate-100 rounded-2xl">
                          <img src={web.image} alt={web.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">{web.date}</span>
                            <h5 className="text-xs font-black text-slate-800 leading-snug line-clamp-2 mt-1">{web.title}</h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: NUTRISI */}
            {activeTab === 'nutrisi' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Header subtabs */}
                <div className="flex bg-white p-2 rounded-2xl border border-emerald-100/80 shadow-sm gap-2">
                  {[
                    { id: 'main', name: 'Nutrisi Harian' },
                    { id: 'charts', name: 'Statistik & Kalkulator IMT' },
                    { id: 'pantry', name: 'Kulkas AI (Pantry)' }
                  ].map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => setNutrisiSubView(sub.id as any)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-black transition ${
                        nutrisiSubView === sub.id
                          ? 'bg-[#00875A] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>

                {nutrisiSubView === 'main' && (
                  <div className="space-y-6">
                    {/* Daily Calorie & Macro Stacked Pills */}
                    <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block">Target Nutrisi Harian</span>
                          <h3 className="text-xl font-black text-slate-900">2.100 kkal / Hari</h3>
                        </div>
                        <button onClick={() => setNutrisiSubView('charts')} className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-black rounded-xl hover:bg-emerald-100 transition">
                          Detail Macro
                        </button>
                      </div>

                      {/* Stacked Pill Chart */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-black text-slate-700">
                          <span>Progress Asupan Kalori</span>
                          <span className="text-emerald-700">1.450 / 2.100 kkal (69%)</span>
                        </div>
                        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200">
                          <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: '45%' }} title="Karbohidrat 45%"></div>
                          <div className="h-full bg-amber-400" style={{ width: '15%' }} title="Protein 15%"></div>
                          <div className="h-full bg-purple-500 rounded-r-full" style={{ width: '9%' }} title="Lemak 9%"></div>
                        </div>
                        <div className="flex gap-4 text-[11px] font-bold text-slate-600 pt-2">
                          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Karbo (220g)</span>
                          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Protein (100g)</span>
                          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span> Lemak (60g)</span>
                        </div>
                      </div>
                    </div>

                    {/* Meal Scan Prompt Card */}
                    <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-600 text-slate-950 rounded-3xl p-6 shadow-md flex items-center justify-between">
                      <div className="space-y-2">
                        <span className="bg-slate-950 text-yellow-300 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">Fitur AI Scan</span>
                        <h4 className="text-xl font-black text-white leading-snug">Foto Makananmu & Hitung Kalori Otomatis</h4>
                        <p className="text-xs text-slate-900 font-bold">Deteksi jenis makanan, karbo, protein, dan lemak secara instan.</p>
                      </div>
                      <button onClick={() => alert('Membuka kamera Scan Gizi AI...')} className="px-5 py-3 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs rounded-xl shadow-lg transition active:scale-95 shrink-0 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-yellow-400" />
                        <span>Mulai Scan</span>
                      </button>
                    </div>
                  </div>
                )}

                {nutrisiSubView === 'charts' && (
                  <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="text-lg font-black text-slate-900">Live Kalkulator IMT & Status Gizi</h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Masukkan berat dan tinggi badan Anda untuk menghitung Indeks Massa Tubuh secara real-time.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 items-center">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-black text-slate-700 block mb-1">Berat Badan (kg)</label>
                          <input 
                            type="number" 
                            value={weightInput}
                            onChange={(e) => { setWeightInput(e.target.value); calculateBmi(); }}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-black text-slate-800 focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-black text-slate-700 block mb-1">Tinggi Badan (m)</label>
                          <input 
                            type="number" 
                            step="0.01"
                            value={heightInput}
                            onChange={(e) => { setHeightInput(e.target.value); calculateBmi(); }}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-black text-slate-800 focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <button onClick={calculateBmi} className="w-full py-3 bg-[#00875A] text-white font-black text-xs rounded-xl shadow-md hover:bg-emerald-700 transition">
                          Hitung Ulang IMT
                        </button>
                      </div>

                      {/* Display Result Gauge */}
                      <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 text-center space-y-3">
                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block">Hasil Kalkulasi IMT</span>
                        <div className="text-4xl font-black text-slate-900">{bmiValue} <span className="text-xs text-slate-500 font-bold">kg/m²</span></div>
                        <div className={`inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          bmiCategory === 'Normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          Kategori: {bmiCategory}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {nutrisiSubView === 'pantry' && (
                  <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block">Kulkas AI (Pantry)</span>
                      <h3 className="text-lg font-black text-slate-900">Rekomendasi Resep dari Bahan yang Ada</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {pantryTagsList.map(tag => {
                        const isSelected = selectedPantryTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => {
                              if (isSelected) setSelectedPantryTags(selectedPantryTags.filter(t => t !== tag));
                              else setSelectedPantryTags([...selectedPantryTags, tag]);
                            }}
                            className={`px-4 py-2 rounded-full text-xs font-black transition border ${
                              isSelected 
                                ? 'bg-[#00875A] text-white border-[#00875A]' 
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{tag}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-900">Salad Tumis Ayam Telur Sehat</h4>
                        <p className="text-xs text-slate-600 font-semibold">Tinggi protein hewani & serat untuk pencegahan PTM.</p>
                      </div>
                      <span className="text-xs font-black text-emerald-700 bg-white px-3 py-1 rounded-xl shadow-sm">307 kkal</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: CHALLENGE & GAMES */}
            {activeTab === 'challenge' && (
              <div className="space-y-6 animate-fadeIn">
                {/* 7-Day Healthy Challenge Card */}
                <div className="bg-gradient-to-br from-[#00875A] via-[#059669] to-[#047857] text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
                  <div className="space-y-3 max-w-md">
                    <span className="bg-yellow-400 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">Challenge Mingguan</span>
                    <h3 className="text-2xl font-black tracking-tight leading-tight">7-Day Healthy Challenge</h3>
                    <div className="text-2xl font-extrabold text-[#cbd52d]">
                      {misiTargets.filter(t => t.done).length}/7 <span className="text-xs text-emerald-100 font-semibold">hari selesai</span>
                    </div>
                    {/* Dynamic Progress Bar */}
                    <div className="w-full h-3 bg-emerald-950/40 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full bg-[#cbd52d] rounded-full transition-all duration-300" style={{ width: `${(misiTargets.filter(t => t.done).length / 7) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur flex items-center justify-center text-5xl border border-white/20">
                    🤖
                  </div>
                </div>

                {/* Misi Hari Ini Interactive Checklist */}
                <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-base font-black text-slate-900">Misi Hari Ini (Klik untuk Centang)</h3>
                    <span className="text-xs font-black text-emerald-700">Target Minggu Ini</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {misiTargets.map(target => (
                      <div 
                        key={target.id}
                        onClick={() => toggleMisi(target.id)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition active:scale-98 ${
                          target.done 
                            ? 'bg-emerald-50/60 border-emerald-200 text-slate-800' 
                            : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span className={`text-xs font-bold ${target.done ? 'line-through opacity-75' : ''}`}>
                          {target.text}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-black shrink-0 ${
                          target.done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {target.done && '✓'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3x3 Mini Games Grid */}
                <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block">Edukasi Interaktif</span>
                      <h3 className="text-base font-black text-slate-900">Mini Games Kesehatan</h3>
                    </div>
                    <span className="text-xs font-black text-slate-400">9 Permainan Edukatif</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'tebak', name: 'Tebak Gambar', icon: '👩‍💻' },
                      { id: 'fruity', name: 'Tutty Fruity', icon: '🍉' },
                      { id: 'uno', name: 'Health Uno', icon: '🃏' },
                      { id: 'boom', name: 'Healthy Boom', icon: '💣' },
                      { id: 'sudoku', name: 'Sudoku Fruity', icon: '🧩' },
                      { id: 'xox', name: 'Health XOX', icon: '🎮' },
                      { id: 'search', name: 'Search Health', icon: '🔍' },
                      { id: 'puzzle', name: 'Puzzle Nutritone', icon: '🧩' },
                      { id: 'monopoly', name: 'Monopoli', icon: '🎲' }
                    ].map(game => (
                      <div 
                        key={game.id}
                        onClick={() => alert(`Membuka permainan edukasi: ${game.name}...`)}
                        className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-emerald-50/50 hover:border-emerald-200 active:scale-95 transition"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-2xl shadow-sm">
                          {game.icon}
                        </div>
                        <span className="text-xs font-black text-slate-800 leading-tight">{game.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: RIWAYAT & WRAPPED */}
            {activeTab === 'riwayat' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex bg-white p-2 rounded-2xl border border-emerald-100/80 shadow-sm gap-2">
                  <button onClick={() => setRiwayatSubView('home')} className={`flex-1 py-2.5 rounded-xl text-xs font-black transition ${riwayatSubView === 'home' ? 'bg-[#00875A] text-white shadow-sm' : 'text-slate-600'}`}>Timeline Riwayat</button>
                  <button onClick={() => setRiwayatSubView('wrapped')} className={`flex-1 py-2.5 rounded-xl text-xs font-black transition ${riwayatSubView === 'wrapped' ? 'bg-[#00875A] text-white shadow-sm' : 'text-slate-600'}`}>CEKAT Wrapped 2026 🏆</button>
                </div>

                {riwayatSubView === 'home' && (
                  <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-6">
                    {/* Category pills */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {['Semua', 'CEKAT Station', 'Nutrisi', 'My health progress', 'Riwayat Konsultasi'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setRiwayatCategory(cat)}
                          className={`px-4 py-2 rounded-full text-xs font-black transition shrink-0 border ${
                            riwayatCategory === cat ? 'bg-[#cbd52d] border-[#cbd52d] text-slate-950' : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Timeline List */}
                    <div className="space-y-4">
                      {(riwayatCategory === 'Semua' || riwayatCategory === 'CEKAT Station') && (
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-slate-900">Hasil CEKAT Station - Puskesmas Ngabab</span>
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Perlu Perhatian</span>
                          </div>
                          <p className="text-xs text-slate-500 font-bold">140/85 mmHg (Tensi) • Gula Darah 85 mg/dL • IMT 24.03 kg/m²</p>
                        </div>
                      )}

                      {(riwayatCategory === 'Semua' || riwayatCategory === 'Nutrisi') && (
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center">
                          <div>
                            <span className="text-xs font-black text-slate-900 block">Nutrisi & Scan Makanan: Salad Ayam</span>
                            <span className="text-[10px] text-slate-450 font-semibold block">30 Agustus 2026 08.30</span>
                          </div>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">307 kkal (GOOD)</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {riwayatSubView === 'wrapped' && (
                  <div className="bg-gradient-to-br from-yellow-500 via-[#10b981] to-emerald-800 text-white rounded-3xl p-8 shadow-xl space-y-6">
                    <div className="text-center space-y-2">
                      <span className="text-xs font-black uppercase tracking-widest text-yellow-200">Pencapaian Tahunan Anda</span>
                      <h2 className="text-4xl font-black tracking-tight">CEKAT Wrapped 2026</h2>
                      <p className="text-sm text-emerald-100 font-semibold">Your 2026 Nutrition Journey</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-slate-900">
                      <div className="bg-white rounded-2xl p-4 space-y-2 shadow-md">
                        <h4 className="text-xs font-black text-slate-800">Top 5 Makanan Favorit</h4>
                        <ol className="text-xs font-bold text-slate-600 list-decimal pl-4 space-y-1">
                          <li>Salad Sayur</li>
                          <li>Nasi Campur</li>
                          <li>Nasi Goreng</li>
                          <li>Grill Steak</li>
                          <li>Omlet</li>
                        </ol>
                      </div>

                      <div className="bg-white rounded-2xl p-4 text-center space-y-2 shadow-md flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 block uppercase">Skor Nutrisi Harian</span>
                          <h4 className="text-2xl font-black text-[#00875A] mt-1">BALANCED (80/100)</h4>
                        </div>
                        {/* Animated Balance SVG scale */}
                        <div className="w-20 h-20 mx-auto">
                          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600">
                            <line x1="10" y1="80" x2="90" y2="80" stroke="#475569" strokeWidth="4" />
                            <polygon points="50,80 40,95 60,95" fill="#64748b" />
                            <line x1="20" y1="55" x2="80" y2="55" stroke="#10b981" strokeWidth="3" />
                            <circle cx="50" cy="35" r="6" fill="#f87171" />
                            <circle cx="30" cy="37" r="3" fill="#ef4444" />
                            <circle cx="70" cy="37" r="3" fill="#f97316" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: PROFIL */}
            {activeTab === 'profil' && (
              <div className="bg-white border border-emerald-100/80 rounded-3xl p-8 shadow-sm space-y-6 text-center">
                <div className="w-24 h-24 rounded-full border-4 border-emerald-500 mx-auto overflow-hidden shadow-md">
                  <img src="/landing/doctor_elina_photo.jpg" alt="Sofia Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Sofia Kusuma</h2>
                  <span className="text-xs text-slate-400 font-bold block mt-0.5">NIK: 3174XXXXXXXX0002 • Terhubung BPJS Kes</span>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl text-left text-xs font-bold text-slate-700 space-y-2">
                  <p>✓ Status Fasilitas Kesehatan: Puskesmas Pembantu Ngabab</p>
                  <p>✓ Program Pendampingan: Pencegahan Risiko Hipertensi & Stunting</p>
                </div>
              </div>
            )}

          </main>

          {/* Desktop Right Side Widget Panel */}
          <aside className="col-span-4 space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm text-center space-y-4">
              <div className="w-20 h-20 rounded-full border-2 border-emerald-500 mx-auto overflow-hidden shadow">
                <img src="/landing/doctor_elina_photo.jpg" alt="Sofia Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Sofia Kusuma</h3>
                <p className="text-xs text-emerald-600 font-bold mt-0.5">Pasien Terintegrasi Kemkes</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left bg-slate-50 p-3 rounded-2xl text-xs font-bold text-slate-700">
                <div>Usia: <span className="font-black text-slate-900">28 Thn</span></div>
                <div>BB/TB: <span className="font-black text-slate-900">60kg/158cm</span></div>
              </div>
            </div>

            {/* Streak Counter Widget */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-amber-800 uppercase block">Streak Harian</span>
                <h4 className="text-xl font-black text-amber-700 mt-0.5">🔥 5 Hari Berturut</h4>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm">
                🎁
              </div>
            </div>

            {/* Doctor Consultation Link */}
            <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
                  🩺
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Dr. Nanda Amelia, M.Gizi</h4>
                  <span className="text-[10px] text-slate-400 font-bold block">Dokter Spesialis Gizi</span>
                </div>
              </div>
              <button onClick={() => alert('Membuka sesi konsultasi medis...')} className="w-full py-2.5 bg-[#00875A] text-white font-black text-xs rounded-xl hover:bg-emerald-700 transition shadow-sm">
                Hubungi Dokter
              </button>
            </div>

          </aside>
        </div>
      </div>

      {/* 
        ========================================================================
        MOBILE SUITE (Visible on Mobile screens < md)
        ========================================================================
      */}
      <div className="block md:hidden w-full max-w-md mx-auto min-h-screen bg-[#f4f8f6] pb-24 relative select-none">
        
        {/* Mobile Header Bar */}
        <div className="bg-[#00875A] text-white px-5 pt-8 pb-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-white text-[#00875A] flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-base font-black tracking-tight">CEKAT App 2</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[9.5px] bg-yellow-400 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">Modern & Fun</span>
            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 overflow-hidden">
              <img src="/landing/doctor_elina_photo.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Mobile Main Body Content */}
        <div className="p-4 space-y-5">
          {activeTab === 'dashboard' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-gradient-to-r from-[#00875A] to-[#059669] text-white rounded-3xl p-5 shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase text-yellow-300 block">Halo, Sofia Kusuma 👋</span>
                <h2 className="text-xl font-black leading-tight">Pantau Gizi & Cegah PTM Hari Ini</h2>
              </div>

              <div className="bg-white border border-emerald-100/80 rounded-3xl p-4 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-black text-slate-900">Hasil Cek Risiko Kesehatan</h4>
                  <span className="text-[9px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Tinggi</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold">Risiko Hipertensi • Tensi: 140/85 mmHg</p>
              </div>
            </div>
          )}

          {activeTab === 'nutrisi' && (
            <div className="bg-white border border-emerald-100/80 rounded-3xl p-5 shadow-sm space-y-4 animate-fadeIn">
              <h3 className="text-sm font-black text-slate-900">Target Nutrisi Harian: 2.100 kkal</h3>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-500" style={{ width: '45%' }}></div>
                <div className="h-full bg-amber-400" style={{ width: '15%' }}></div>
                <div className="h-full bg-purple-500" style={{ width: '9%' }}></div>
              </div>
            </div>
          )}

          {activeTab === 'challenge' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-gradient-to-r from-[#00875A] to-[#047857] text-white rounded-3xl p-5 shadow-sm space-y-3">
                <h3 className="text-base font-black">7-Day Healthy Challenge</h3>
                <div className="text-xl font-extrabold text-[#cbd52d]">{misiTargets.filter(t => t.done).length}/7 hari selesai</div>
              </div>

              <div className="bg-white border border-emerald-100/80 rounded-3xl p-4 shadow-sm space-y-3">
                <h4 className="text-xs font-black text-slate-900">Misi Hari Ini</h4>
                <div className="space-y-2">
                  {misiTargets.map(target => (
                    <div key={target.id} onClick={() => toggleMisi(target.id)} className="flex justify-between items-center text-xs font-bold p-2 bg-slate-50 rounded-xl cursor-pointer">
                      <span className={target.done ? 'line-through text-slate-400' : 'text-slate-800'}>{target.text}</span>
                      <span className={target.done ? 'text-emerald-600 font-black' : 'text-slate-300'}>{target.done ? '✓' : '○'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'riwayat' && (
            <div className="bg-white border border-emerald-100/80 rounded-3xl p-5 shadow-sm space-y-4 animate-fadeIn">
              <h3 className="text-sm font-black text-slate-900">Riwayat Kesehatan & CEKAT Wrapped</h3>
              <p className="text-xs text-slate-500 font-semibold">Skor Tahunan: BALANCED (80/100)</p>
            </div>
          )}

          {activeTab === 'profil' && (
            <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 shadow-sm text-center space-y-3 animate-fadeIn">
              <h3 className="text-base font-black text-slate-900">Sofia Kusuma</h3>
              <p className="text-xs text-slate-400 font-bold">Terintegrasi BPJS Kes</p>
            </div>
          )}
        </div>

        {/* Floating Bottom Navigation Bar for Mobile */}
        <nav className="fixed bottom-0 left-0 w-full bg-[#00875A] text-white py-2 px-4 flex justify-around items-center z-40 border-t border-emerald-700 shadow-lg">
          {[
            { id: 'dashboard', label: 'Beranda', icon: Home },
            { id: 'nutrisi', label: 'Nutrisi', icon: Utensils },
            { id: 'challenge', label: 'Challenge', icon: Gamepad2 },
            { id: 'riwayat', label: 'Riwayat', icon: ClipboardList },
            { id: 'profil', label: 'Profil', icon: User }
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
                  isActive ? 'bg-white/20 text-yellow-300 font-black scale-105' : 'text-emerald-100 font-medium opacity-80'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9.5px] mt-1">{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </div>
  );
}
