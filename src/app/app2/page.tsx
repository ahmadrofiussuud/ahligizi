'use client';

import React, { useState, useEffect, Suspense } from 'react';
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
  Stethoscope,
  Plus,
  ArrowRight,
  Mic,
  Clock,
  Bell,
  ListFilter
} from 'lucide-react';

function CekatApp2PageContent() {
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
  const [idealWeightMin, setIdealWeightMin] = useState<number>(47.4);
  const [idealWeightMax, setIdealWeightMax] = useState<number>(63.7);
  const [weightDiff, setWeightDiff] = useState<number>(4.3);

  // Format number cleanly: remove trailing .0 (e.g. 50.0 → 50, 4.3 → 4.3)
  const fmtNum = (n: number) => {
    const s = n.toFixed(1);
    return s.endsWith('.0') ? String(Math.round(n)) : s;
  };

  const calculateBmi = () => {
    const w = parseFloat(weightInput);
    const h = parseFloat(heightInput);
    if (w > 0 && h > 0) {
      const raw = w / (h * h);
      setBmiValue(Math.round(raw * 100) / 100);
      
      const minIdeal = Math.round(18.5 * h * h * 10) / 10;
      const maxIdeal = Math.round(24.9 * h * h * 10) / 10;
      setIdealWeightMin(minIdeal);
      setIdealWeightMax(maxIdeal);

      if (raw < 18.5) {
        setBmiCategory('Kurus');
        setWeightDiff(Math.round((minIdeal - w) * 10) / 10);
      } else if (raw < 25) {
        setBmiCategory('Normal');
        setWeightDiff(0);
      } else {
        setBmiCategory('Gemuk');
        setWeightDiff(Math.round((w - maxIdeal) * 10) / 10);
      }
    }
  };

  const [nutrisiSubView, setNutrisiSubView] = useState<'main' | 'scan_camera' | 'scan_result' | 'charts' | 'pantry'>('main');
  const [challengeSubView, setChallengeSubView] = useState<'home' | 'checklist' | 'games'>('home');
  const [riwayatSubView, setRiwayatSubView] = useState<'home' | 'wrapped'>('home');
  const [riwayatCategory, setRiwayatCategory] = useState<string>('Semua');

  // URL-syncing navigation helper
  const nav = (tab: string, view?: string) => {
    const params = new URLSearchParams();
    params.set('tab', tab);
    if (view) params.set('view', view);
    router.push(`/app2?${params.toString()}`, { scroll: false });
  };

  // Interactive 7-Day Challenge Targets
  const [misiTargets, setMisiTargets] = useState([
    { id: 1, text: 'Minum air sesuai target (2L / 8 gelas)', done: true },
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

  // Marketplace active category
  const [marketplaceCat, setMarketplaceCat] = useState('Semua');

  // Sync state from URL searchParams (so URL can be shared/bookmarked)
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

  // Modern clean patient avatar image
  const userAvatarImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

  return (
    <div className="min-h-screen bg-[#f5faf9] text-slate-800 font-sans antialiased selection:bg-teal-100 selection:text-teal-900 pb-20 w-full overflow-x-hidden">
      
      {/* 
        ========================================================================
        DESKTOP SUITE (Visible on Desktop md & up)
        ========================================================================
      */}
      <div className="hidden md:block w-full">
        
        {/* 
          ----------------------------------------------------------------------
          1. DEDICATED CEKAT APP 2 TOP HEADER NAVBAR (TEXT-ONLY TABS, NO ICONS)
          ----------------------------------------------------------------------
        */}
        <header className="sticky top-4 z-50 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full mb-6">
          <div className="bg-white/85 backdrop-blur-md border border-teal-100/50 shadow-lg shadow-teal-500/5 rounded-[24px] flex items-center justify-between h-20 px-6 sm:px-8">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2d8d81] to-[#3fa89b] text-white flex items-center justify-center shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 font-bold" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-slate-900">CEKAT App 2</span>
                  <span className="bg-[#2d8d81]/10 text-[#2d8d81] font-black text-[9.5px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Pro
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">NutriSnap Integration</span>
              </div>
            </Link>

            {/* CEKAT App 2 Navigation Tabs */}
            <nav className="flex items-center gap-1 bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200/40">
              {[
                { id: 'dashboard', name: 'Beranda' },
                { id: 'nutrisi', name: 'Nutrisi Harian' },
                { id: 'challenge', name: 'Misi & Games' },
                { id: 'riwayat', name: 'Riwayat' },
                { id: 'profil', name: 'Profil BPJS' }
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      if (tab.id === 'dashboard') { setDashboardSubView('home'); nav('dashboard'); }
                      if (tab.id === 'nutrisi') { setNutrisiSubView('main'); nav('nutrisi'); }
                      if (tab.id === 'challenge') { setChallengeSubView('home'); nav('challenge', 'home'); }
                      if (tab.id === 'riwayat') { setRiwayatSubView('home'); nav('riwayat'); }
                      if (tab.id === 'profil') { nav('profil'); }
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#2d8d81] text-white shadow-md shadow-teal-700/20'
                        : 'text-slate-650 hover:text-[#2d8d81] hover:bg-white'
                    }`}
                  >
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Account Widget (Right) */}
            <div className="flex items-center space-x-3 shrink-0">
              <div className="text-right">
                <span className="text-xs font-black text-slate-900 block leading-tight">Sofia Kusuma</span>
                <span className="text-[10px] text-[#2d8d81] font-bold block">Terhubung BPJS Kes</span>
              </div>
              <div className="w-9 h-9 rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <img src={userAvatarImage} alt="Sofia Avatar" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </header>

        {/* 
          ----------------------------------------------------------------------
          2. TRULY FULL-WIDTH HERO SECTION (Edge-to-Edge like Landing Page)
          Doctor image background + Semi-transparent Teal/Emerald Overlay
          ----------------------------------------------------------------------
        */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <section className="relative w-full rounded-[32px] overflow-hidden min-h-[380px] flex items-center bg-[#2d8d81] text-white shadow-xl shadow-teal-950/10 border border-teal-100/5">
            
            {/* Background Image - Full Width Edge-to-Edge */}
            <div className="absolute inset-0 w-full h-full z-0 opacity-30">
              <img 
                src="/landing/hero_doctor_banner.jpg" 
                alt="Doctor Banner" 
                className="w-full h-full object-cover object-[80%_center]"
              />
            </div>

            {/* Semi-transparent Teal Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2d8d81] via-[#267a70]/90 to-transparent z-10"></div>

            {/* Hero Content Container */}
            {/* Desktop Hero Content with HD Image Background */}
            <div className="relative z-20 max-w-7xl mx-auto w-full px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-left">
                
                {/* Fun Glowing Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-yellow-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current text-yellow-300" />
                    <span>CEKAT App 2 • Pro Edition</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-teal-950/40 text-teal-100 font-bold text-[10px] border border-white/15 uppercase tracking-wider backdrop-blur-md">
                    Sistem Cegah PTM Terintegrasi
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
                  Pencegahan Dini <br />
                  Penyakit Tidak Menular (PTM)
                </h1>

                <p className="text-xs sm:text-sm text-teal-50 font-semibold leading-relaxed max-w-lg opacity-95 drop-shadow-sm">
                  Pantau kadar gula, tekanan darah, dan indeks massa tubuh harian secara mandiri. Dapatkan asupan nutrisi seimbang untuk hidup sehat terbebas dari risiko kesehatan.
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button 
                    onClick={() => { setActiveTab('challenge'); setChallengeSubView('checklist'); nav('challenge', 'checklist'); }}
                    className="px-5 py-3 rounded-2xl bg-[#f1c40f] hover:bg-yellow-400 text-slate-950 font-bold text-xs shadow-lg shadow-yellow-500/20 active:scale-95 transition flex items-center gap-1.5"
                  >
                    <span>Mulai Misi Sehat</span>
                    <Zap className="w-4 h-4 text-slate-950 fill-current" />
                  </button>
                  <button 
                    onClick={() => { setActiveTab('nutrisi'); setNutrisiSubView('charts'); nav('nutrisi', 'charts'); }}
                    className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 backdrop-blur-md transition flex items-center gap-1.5"
                  >
                    <span>Kalkulator IMT</span>
                    <Activity className="w-4 h-4 text-teal-200" />
                  </button>
                </div>

              </div>

              {/* Right Side Patient Health Status Card with Glassmorphism */}
              <div className="shrink-0 w-80 bg-slate-950/40 backdrop-blur-md border border-white/20 p-5 rounded-3xl text-left space-y-3 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-300 text-[10px] font-black uppercase tracking-wider">Fasilitas Kesehatan</span>
                  <span className="text-emerald-300 text-[10px] bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">Terhubung</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <img src={userAvatarImage} alt="Sofia Avatar" className="w-11 h-11 rounded-2xl object-cover border-2 border-white/30 shadow-sm shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">Sofia Kusuma</h3>
                    <p className="text-[10px] text-teal-100 font-semibold mt-0.5">Puskesmas Pembantu Ngabab</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left bg-white/10 p-2.5 rounded-xl text-[11px] font-bold text-teal-50 border border-white/10">
                  <div>Usia: <span className="font-extrabold text-white">28 Tahun</span></div>
                  <div>BB/TB: <span className="font-extrabold text-white">60kg/158cm</span></div>
                </div>
              </div>
            </div>

          </section>
        </div>

        {/* 
          ----------------------------------------------------------------------
          3. MAIN DESKTOP CONTENT AREA (Centered 7xl Grid)
          ----------------------------------------------------------------------
        */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 space-y-8">
          
          {/* Grid Layout: Main Left (8 Cols) + Right Widget Sidebar (4 Cols) */}
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* Left Main Content */}
            <main className="col-span-8 space-y-6">
              
              {/* TAB 1: BERANDA */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-fadeIn">

                  {/* Desktop Vibrant Hero Banner with HD Background */}
                  <div className="relative rounded-[32px] overflow-hidden shadow-xl p-6 sm:p-8 space-y-4 border border-white/10 min-h-[200px] flex flex-col justify-between text-white">
                    {/* HD Background Image */}
                    <img 
                      src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80" 
                      alt="Healthy background" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-[#1a5e55]/85 to-[#2d8d81]/60" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-yellow-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 fill-current text-yellow-300" />
                        <span>Screening Mandiri Terintegrasi</span>
                      </span>
                      <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        🔥 5 Hari Streak Aktif
                      </span>
                    </div>

                    <div className="relative z-10 space-y-1 my-1">
                      <span className="text-xs font-bold text-teal-200 block uppercase tracking-wider">Selamat Datang Kembali,</span>
                      <h2 className="text-2xl font-extrabold text-white leading-tight drop-shadow-sm">Sofia Kusuma</h2>
                      <p className="text-xs text-teal-50 font-medium leading-relaxed max-w-xl opacity-90">
                        Tekanan darah dan IMT Anda memerlukan perhatian medis ringan. Selesaikan misi sehat Anda hari ini.
                      </p>
                    </div>

                    <div className="relative z-10 pt-2 flex gap-3 max-w-md">
                      <button 
                        onClick={() => { setActiveTab('challenge'); setChallengeSubView('checklist'); nav('challenge', 'checklist'); }}
                        className="flex-1 py-3 bg-[#f1c40f] hover:bg-yellow-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <span>Mulai Misi Sehat</span>
                        <Zap className="w-4 h-4 fill-current" />
                      </button>
                      <button 
                        onClick={() => { setActiveTab('nutrisi'); setNutrisiSubView('charts'); nav('nutrisi', 'charts'); }}
                        className="flex-1 py-3 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl border border-white/20 backdrop-blur-md transition flex items-center justify-center gap-1.5"
                      >
                        <span>Detail IMT</span>
                        <Activity className="w-4 h-4 text-teal-200" />
                      </button>
                    </div>
                  </div>

                  {/* SMART SUGGESTION CARD: CEKAT STATION DESKTOP WITH HD BACKGROUND IMAGE */}
                  <div className="relative rounded-[32px] overflow-hidden p-6 sm:p-7 shadow-lg space-y-3.5 border border-teal-400/20 text-white min-h-[170px] flex flex-col justify-between">
                    {/* HD Background Image */}
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80" 
                      alt="Medical station" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark Teal Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#1e6b62]/85 to-[#2d8d81]/70" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        💡 Rekomendasi Medis CEKAT
                      </span>
                      <span className="text-xs text-teal-100 font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/15 flex items-center gap-1">
                        📍 Puskesmas Ngabab
                      </span>
                    </div>

                    <div className="relative z-10 space-y-1">
                      <h4 className="text-base font-black text-white leading-snug drop-shadow-sm">
                        Saran Cek Ulang Kesehatan di CEKAT Station 🏥
                      </h4>
                      <p className="text-xs text-teal-50 font-medium leading-relaxed max-w-xl">
                        Tensi darah Anda (<span className="font-black text-amber-300">140/85 mmHg</span>) memerlukan pemantauan berkala. Disarankan melakukan cek tensi & kolesterol ulang di <span className="font-extrabold text-white">CEKAT Station</span> minggu ini.
                      </p>
                    </div>

                    <div className="relative z-10 pt-1 flex gap-3 max-w-xs">
                      <button
                        onClick={() => alert('Jadwal Cek Kesehatan di CEKAT Station Puskesmas Ngabab berhasil dibuat! Kami akan mengingatkan Anda via Pengingat.')}
                        className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <span>Jadwalkan Cek Station</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Visual Screening Results Card Grid */}
                  <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-6 sm:p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#2d8d81] block">Data Terintegrasi CEKAT Station</span>
                        <h3 className="text-lg font-black text-slate-900">Hasil Screening Kesehatan</h3>
                      </div>
                      <span className="text-xs text-slate-450 font-bold bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5">30 Agustus 2026</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'Tekanan Darah', value: '140/85 mmHg', status: 'Hipertensi T1', bg: 'bg-red-50/50 border border-red-100 text-red-700', icon: Heart },
                        { label: 'Gula Darah Sewaktu', value: '85 mg/dL', status: 'Normal', bg: 'bg-teal-50/50 border border-teal-100 text-[#2d8d81]', icon: Activity },
                        { label: 'Indeks Massa Tubuh', value: '24.03 kg/m²', status: 'Overweight', bg: 'bg-amber-50/50 border border-amber-100 text-amber-800', icon: ClipboardList },
                        { label: 'Lingkar Perut', value: '83 cm', status: 'Normal', bg: 'bg-teal-50/50 border border-teal-100 text-[#2d8d81]', icon: User },
                        { label: 'Tinggi Badan', value: '158 cm', status: 'Tinggi', bg: 'bg-slate-50 border border-slate-150/40 text-slate-700', icon: Award },
                        { label: 'Berat Badan', value: '60 kg', status: 'Ideal', bg: 'bg-slate-50 border border-slate-155/40 text-slate-700', icon: Award },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div key={idx} className={`p-5 rounded-2xl space-y-3 transition duration-200 hover:shadow-md ${item.bg}`}>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-extrabold uppercase tracking-wide opacity-80">{item.label}</span>
                              <Icon className="w-4.5 h-4.5 opacity-80" />
                            </div>
                            <div className="space-y-1">
                              <div className="text-lg font-black tracking-tight">{item.value}</div>
                              <div className="inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/60 shadow-xs border border-white/20">
                                {item.status}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Articles & Webinars Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Edukasi Articles */}
                    <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Artikel & Edukasi Gizi</h4>
                        <button onClick={() => { setActiveTab('dashboard'); setDashboardSubView('edukasi'); }} className="text-xs font-bold text-[#2d8d81] hover:underline">Lihat Semua</button>
                      </div>
                      <div className="space-y-3">
                        {articlesList.slice(0, 2).map(art => (
                          <div key={art.id} onClick={() => { setSelectedArticle(art); setDashboardSubView('article_detail'); }} className="flex gap-3 p-2 bg-slate-50 border border-slate-150/40 rounded-2xl cursor-pointer hover:bg-teal-50/30 transition">
                            <img src={art.image} alt={art.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                            <div className="min-w-0 flex-1">
                              <span className="text-[9px] font-black text-[#2d8d81] uppercase tracking-wider">{art.category}</span>
                              <h5 className="text-xs font-black text-slate-800 leading-snug line-clamp-2 mt-0.5">{art.title}</h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Webinars */}
                    <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Webinar Kesehatan</h4>
                        <button onClick={() => { setActiveTab('dashboard'); setDashboardSubView('webinar_list'); }} className="text-xs font-bold text-[#2d8d81] hover:underline">Lihat Semua</button>
                      </div>
                      <div className="space-y-3">
                        {webinarsList.slice(0, 2).map(web => (
                          <div key={web.id} className="flex gap-3 p-2 bg-slate-50 border border-slate-150/40 rounded-2xl">
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
                  {/* Subtabs Header */}
                  <div className="flex bg-white p-2 rounded-2xl border border-teal-50/85 shadow-sm gap-2">
                    {[
                      { id: 'main', name: 'Nutrisi Harian' },
                      { id: 'charts', name: 'Statistik & Kalkulator IMT' },
                      { id: 'pantry', name: 'Resep Sehat AI' }
                    ].map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => setNutrisiSubView(sub.id as any)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                          nutrisiSubView === sub.id
                            ? 'bg-[#2d8d81] text-white shadow-sm'
                            : 'text-slate-650 hover:bg-slate-50'
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>

                  {nutrisiSubView === 'main' && (
                    <div className="space-y-6">
                      {/* Daily Calorie & Macro Stacked Pills */}
                      <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-6 sm:p-8 space-y-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2d8d81] block">Target Nutrisi Harian</span>
                            <h3 className="text-2xl font-black text-slate-900">2.100 kkal <span className="text-xs text-slate-450 font-bold">/ Hari</span></h3>
                          </div>
                          <button onClick={() => setNutrisiSubView('charts')} className="px-4 py-2 bg-teal-50 text-[#2d8d81] border border-teal-100 text-xs font-bold rounded-xl hover:bg-teal-100 transition">
                            Detail Macro
                          </button>
                        </div>

                        {/* Stacked Pill Chart */}
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>Asupan Kalori Aktif</span>
                            <span className="text-[#2d8d81] font-black">1.450 / 2.100 kkal (69%)</span>
                          </div>
                          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200">
                            <div className="h-full bg-[#2d8d81] rounded-l-full" style={{ width: '45%' }} title="Karbohidrat 45%"></div>
                            <div className="h-full bg-amber-400" style={{ width: '15%' }} title="Protein 15%"></div>
                            <div className="h-full bg-rose-500 rounded-r-full" style={{ width: '9%' }} title="Lemak 9%"></div>
                          </div>
                          
                          {/* Profile Chip Style Badges */}
                          <div className="flex flex-wrap gap-2.5 pt-3">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-[#2d8d81] text-xs font-bold border border-teal-100">
                              <span className="w-2 h-2 rounded-full bg-[#2d8d81]"></span> Karbohidrat (220g)
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-100">
                              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Protein Hewani (100g)
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-755 text-xs font-bold border border-rose-100">
                              <span className="w-2 h-2 rounded-full bg-rose-500"></span> Lemak Baik (60g)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Meal Scan Prompt Card */}
                      <div className="bg-gradient-to-br from-[#2d8d81] via-[#267a70] to-[#1a5c53] text-white rounded-[32px] p-6 sm:p-8 shadow-md flex items-center justify-between gap-6 border border-white/5">
                        <div className="space-y-2">
                          <span className="bg-white/15 border border-white/20 text-yellow-300 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">Fitur AI Scan</span>
                          <h4 className="text-xl font-black text-white leading-snug">Foto Piring Makanmu & Deteksi Gizi</h4>
                          <p className="text-xs text-teal-50 font-medium max-w-md opacity-90">Deteksi jenis makanan, porsi makronutrisi karbo, protein, dan lemak secara instan menggunakan Vision AI.</p>
                        </div>
                        <button onClick={() => alert('Membuka kamera Scan Gizi AI...')} className="px-5 py-3 bg-white hover:bg-slate-50 text-[#2d8d81] font-bold text-xs rounded-xl shadow-lg transition active:scale-95 shrink-0 flex items-center gap-2">
                          <Camera className="w-4.5 h-4.5 text-[#2d8d81]" />
                          <span>Mulai Scan</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {nutrisiSubView === 'charts' && (
                    <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-6 sm:p-8 space-y-6">
                      <div className="border-b border-slate-100 pb-4">
                        <h3 className="text-lg font-black text-slate-900">Kalkulator IMT & Status Gizi</h3>
                        <p className="text-xs text-slate-450 font-bold mt-1">Masukkan berat dan tinggi badan Anda untuk menghitung Indeks Massa Tubuh secara real-time.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6 items-center">
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">Berat Badan (kg)</label>
                            <input 
                              type="number" 
                              value={weightInput}
                              onChange={(e) => { setWeightInput(e.target.value); calculateBmi(); }}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-[#2d8d81] focus:ring-1 focus:ring-[#2d8d81]"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">Tinggi Badan (m)</label>
                            <input 
                              type="number" 
                              step="0.01"
                              value={heightInput}
                              onChange={(e) => { setHeightInput(e.target.value); calculateBmi(); }}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-[#2d8d81] focus:ring-1 focus:ring-[#2d8d81]"
                            />
                          </div>

                          <button onClick={calculateBmi} className="w-full py-3 bg-[#2d8d81] hover:bg-[#267a70] text-white font-bold text-xs rounded-xl shadow-md transition">
                            Hitung Ulang IMT
                          </button>
                        </div>

                        {/* Display Result Gauge */}
                        <div className="bg-teal-50/30 border border-teal-100 rounded-[24px] p-6 text-left space-y-4">
                          <div className="text-center">
                            <span className="text-[10px] font-black text-[#2d8d81] uppercase tracking-widest block">Hasil Kalkulasi IMT</span>
                            <div className="text-4xl font-black text-slate-900 mt-1">{bmiValue} <span className="text-xs text-slate-500 font-bold">kg/m²</span></div>
                            <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mt-2 ${
                              bmiCategory === 'Normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              Kategori: {bmiCategory}
                            </div>
                          </div>

                          <div className="border-t border-teal-200/50 pt-3 space-y-2 text-xs font-bold text-slate-700">
                            <div>• Rumus: <span className="font-extrabold text-slate-900">Berat (kg) / (Tinggi (m)²)</span></div>
                            <div>• Berat Ideal: <span className="font-extrabold text-[#2d8d81]">{fmtNum(idealWeightMin)} kg - {fmtNum(idealWeightMax)} kg</span></div>
                            <div className="p-2.5 bg-white border border-teal-100 rounded-xl mt-2 text-[11px]">
                              {bmiCategory === 'Kurus' && (
                                <span className="text-amber-700">⚠️ Anda perlu meningkatkan berat badan sebanyak <span className="font-black text-amber-800">{fmtNum(weightDiff)} kg</span> untuk mencapai berat ideal minimum ({fmtNum(idealWeightMin)} kg).</span>
                              )}
                              {bmiCategory === 'Normal' && (
                                <span className="text-emerald-700">🎉 Berat badan Anda berada di rentang ideal. Tetap jaga pola makan dan aktif bergerak!</span>
                              )}
                              {bmiCategory === 'Gemuk' && (
                                <span className="text-rose-700">⚠️ Anda perlu menurunkan berat badan sebanyak <span className="font-black text-rose-800">{fmtNum(weightDiff)} kg</span> untuk mencapai berat ideal maksimum ({fmtNum(idealWeightMax)} kg).</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {nutrisiSubView === 'pantry' && (
                    <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-6 sm:p-8 space-y-6">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2d8d81] block">Resep Sehat AI</span>
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
                              className={`px-4 py-2 rounded-full text-xs font-bold transition border ${
                                isSelected 
                                  ? 'bg-[#2d8d81] text-white border-[#2d8d81]' 
                                  : 'bg-slate-50 text-slate-650 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {isSelected ? '✓ ' : '+ '}{tag}
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-2xl flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-900">Salad Tumis Ayam Telur Sehat</h4>
                          <p className="text-xs text-slate-600 font-semibold">Tinggi protein hewani & serat untuk pencegahan PTM.</p>
                        </div>
                        <span className="text-xs font-black text-[#2d8d81] bg-white px-3 py-1 rounded-xl shadow-xs border border-slate-100">307 kkal</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CHALLENGE & GAMES */}
              {activeTab === 'challenge' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* 7-Day Healthy Challenge Card */}
                  <div className="bg-gradient-to-br from-[#2d8d81] via-[#267a70] to-[#1a5c53] text-white rounded-[32px] p-6 sm:p-8 shadow-md flex items-center justify-between border border-white/5">
                    <div className="space-y-3 max-w-md">
                      <span className="bg-yellow-400 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">Challenge Mingguan</span>
                      <h3 className="text-2xl font-black tracking-tight leading-tight">7-Day Healthy Challenge</h3>
                      <div className="text-2xl font-extrabold text-yellow-300">
                        {misiTargets.filter(t => t.done).length}/7 <span className="text-xs text-teal-150 font-semibold">hari selesai</span>
                      </div>
                      {/* Dynamic Progress Bar */}
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
                        <div className="h-full bg-yellow-300 rounded-full transition-all duration-300" style={{ width: `${(misiTargets.filter(t => t.done).length / 7) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Misi Hari Ini Interactive Checklist */}
                  <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                      <h3 className="text-base font-black text-slate-900">Misi Hari Ini (Klik untuk Centang)</h3>
                      <span className="text-xs font-bold text-[#2d8d81]">Target Minggu Ini</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {misiTargets.map(target => (
                        <div 
                          key={target.id}
                          onClick={() => toggleMisi(target.id)}
                          className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition duration-200 active:scale-98 ${
                            target.done 
                              ? 'bg-teal-50/40 border-teal-100 text-slate-800' 
                              : 'bg-slate-50 border-slate-150/40 hover:bg-slate-100 hover:border-slate-200 text-slate-655'
                          }`}
                        >
                          <span className={`text-xs font-bold ${target.done ? 'line-through opacity-70' : ''}`}>
                            {target.text}
                          </span>
                          
                          {/* Round Custom Checkbox */}
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            target.done 
                              ? 'bg-[#2d8d81] border-[#2d8d81] text-white shadow shadow-teal-500/20' 
                              : 'border-slate-350 bg-white hover:border-[#2d8d81]'
                          }`}>
                            {target.done && <span className="text-[10px]">✓</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3x3 Mini Games Grid */}
                  <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2d8d81] block">Edukasi Interaktif</span>
                        <h3 className="text-base font-black text-slate-900">Mini Games Kesehatan</h3>
                      </div>
                      <span className="text-xs font-bold text-slate-400">9 Permainan Edukatif</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'tebak', name: 'Tebak Gambar', icon: '💻' },
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
                          className="bg-slate-50 border border-slate-150/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-teal-50/20 hover:border-teal-200 active:scale-95 transition duration-200"
                        >
                          <div className="w-12 h-12 rounded-xl bg-white border border-slate-150/30 flex items-center justify-center text-2xl shadow-xs">
                            {game.icon}
                          </div>
                          <span className="text-xs font-bold text-slate-800 leading-tight">{game.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: RIWAYAT & WRAPPED */}
              {activeTab === 'riwayat' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex bg-white p-2 rounded-2xl border border-slate-155/40 shadow-sm gap-2">
                    <button onClick={() => setRiwayatSubView('home')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${riwayatSubView === 'home' ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-650'}`}>Timeline Riwayat</button>
                    <button onClick={() => setRiwayatSubView('wrapped')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${riwayatSubView === 'wrapped' ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-650'}`}>CEKAT Wrapped 2026 🏆</button>
                  </div>

                  {riwayatSubView === 'home' && (
                    <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-6 sm:p-8 space-y-6">
                      {/* Category pills */}
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {['Semua', 'CEKAT Station', 'Nutrisi', 'My health progress', 'Riwayat Konsultasi'].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setRiwayatCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 border ${
                              riwayatCategory === cat ? 'bg-amber-400 border-amber-400 text-slate-950' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Timeline List */}
                      <div className="space-y-4">
                        {(riwayatCategory === 'Semua' || riwayatCategory === 'CEKAT Station') && (
                          <div className="p-4 bg-slate-50 border border-slate-150/30 rounded-2xl space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-900">Hasil CEKAT Station - Puskesmas Ngabab</span>
                              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full">Perlu Perhatian</span>
                            </div>
                            <p className="text-xs text-slate-500 font-semibold">140/85 mmHg (Tensi) • Gula Darah 85 mg/dL • IMT 24.03 kg/m²</p>
                          </div>
                        )}

                        {(riwayatCategory === 'Semua' || riwayatCategory === 'Nutrisi') && (
                          <div className="p-4 bg-slate-50 border border-slate-150/30 rounded-2xl flex justify-between items-center">
                            <div>
                              <span className="text-xs font-bold text-slate-900 block">Nutrisi & Scan Makanan: Salad Ayam</span>
                              <span className="text-[10px] text-slate-450 font-semibold block mt-0.5">30 Agustus 2026 08.30</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">307 kkal (Baik)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {riwayatSubView === 'wrapped' && (
                    <div className="bg-gradient-to-br from-yellow-500 via-[#2d8d81] to-slate-900 text-white rounded-[32px] p-8 shadow-xl space-y-6">
                      <div className="text-center space-y-2">
                        <span className="text-xs font-black uppercase tracking-widest text-yellow-200">Pencapaian Tahunan Anda</span>
                        <h2 className="text-4xl font-extrabold tracking-tight">CEKAT Wrapped 2026</h2>
                        <p className="text-sm text-teal-50 font-semibold">Your 2026 Health & Nutrition Journey</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-slate-900">
                        <div className="bg-white rounded-[24px] p-5 space-y-3 shadow-md">
                          <h4 className="text-xs font-black uppercase text-slate-450 tracking-wider">Top 5 Makanan Favorit</h4>
                          <ol className="text-xs font-bold text-slate-700 list-decimal pl-4 space-y-1">
                            <li>Salad Sayur Tumis</li>
                            <li>Pepes Ikan Mas</li>
                            <li>Tahu Tempe Kukus</li>
                            <li>Sayur Sop Bayam</li>
                            <li>Omelet Putih Telur</li>
                          </ol>
                        </div>

                        <div className="bg-white rounded-[24px] p-5 text-center space-y-2 shadow-md flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Skor Gizi Rata-rata</span>
                            <h4 className="text-xl font-black text-[#2d8d81] mt-1">SEIMBANG (80/100)</h4>
                          </div>
                          {/* Animated Balance SVG scale */}
                          <div className="w-16 h-16 mx-auto">
                            <svg viewBox="0 0 100 100" className="w-full h-full text-[#2d8d81]">
                              <line x1="10" y1="80" x2="90" y2="80" stroke="#475569" strokeWidth="4" />
                              <polygon points="50,80 40,95 60,95" fill="#64748b" />
                              <line x1="20" y1="55" x2="80" y2="55" stroke="#2d8d81" strokeWidth="3" />
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
                <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-8 shadow-sm space-y-6 text-center">
                  <div className="w-24 h-24 rounded-full border-4 border-[#2d8d81] mx-auto overflow-hidden shadow-md">
                    <img src={userAvatarImage} alt="Sofia Profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Sofia Kusuma</h2>
                    <span className="text-xs text-slate-450 font-bold block mt-0.5">NIK: 3174XXXXXXXX0002 • Terhubung BPJS Kes</span>
                  </div>

                  <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-2xl text-left text-xs font-bold text-slate-700 space-y-2">
                    <p>✓ Status Fasilitas Kesehatan: Puskesmas Pembantu Ngabab</p>
                    <p>✓ Program Pendampingan: Pencegahan Risiko Hipertensi & Stunting</p>
                  </div>
                </div>
              )}

            </main>

            {/* Desktop Right Side Widget Panel */}
            <aside className="col-span-4 space-y-6">
              
              {/* User Profile Card - Clean Patient Photo */}
              <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-6 text-center space-y-4">
                <div className="w-20 h-20 rounded-full border border-slate-200 mx-auto overflow-hidden shadow-sm">
                  <img src={userAvatarImage} alt="Sofia Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Sofia Kusuma</h3>
                  <p className="text-xs text-[#2d8d81] font-bold mt-0.5">Pasien BPJS Kesehatan</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left bg-slate-50 border border-slate-100/30 p-3 rounded-2xl text-xs font-bold text-slate-700">
                  <div>Usia: <span className="font-extrabold text-slate-900">28 Thn</span></div>
                  <div>BB/TB: <span className="font-extrabold text-slate-900">60kg/158cm</span></div>
                </div>
              </div>

              {/* Streak Counter Widget */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 rounded-[24px] p-6 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase block tracking-wider">Streak Sehat</span>
                  <h4 className="text-xl font-black text-amber-700 mt-0.5">🔥 5 Hari Beruntun</h4>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm border border-amber-200/50">
                  🎁
                </div>
              </div>

              {/* Single Medical Consultation Banner (Clean, Minimalist) */}
              <div className="bg-white rounded-[32px] shadow-[0_16px_40px_rgba(0,0,0,0.015)] border border-teal-50/85 p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 text-[#2d8d81] flex items-center justify-center font-bold text-xl shrink-0">
                    🩺
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Dr. Nanda Amelia, Sp.GK</h4>
                    <span className="text-[10px] text-slate-400 font-bold block">Dokter Spesialis Gizi Klinik</span>
                  </div>
                </div>
                <button onClick={() => alert('Membuka sesi konsultasi medis...')} className="w-full py-3 bg-[#2d8d81] hover:bg-[#267a70] text-white font-bold text-xs rounded-xl shadow-xs transition">
                  Hubungi Dokter
                </button>
              </div>

            </aside>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        MOBILE SUITE (Visible on Mobile screens < md) - FULL CONTENT FOR ALL TABS
        ========================================================================
      */}
      <div className="block md:hidden w-full max-w-md mx-auto h-[100vh] overflow-y-auto bg-[#f5faf9] pb-36 relative scrollbar-none">
        


        {/* 
          2. FUN OVERLAPPING DOUBLE WAVE MOBILE HEADER
          Adopted exactly from references using corporate medical green colors
        */}
        <div className="relative overflow-hidden bg-[#2d8d81] text-white pb-9 rounded-b-[40px] shadow-lg">
          {/* Overlapping back wave */}
          <div className="absolute inset-0 bg-[#267a70] rounded-b-[44px] translate-y-[-10px] transform scale-x-105 z-0"></div>
          
          {/* Header Controls Overlay */}
          <div className="relative z-10 px-6 pt-5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              {/* Conditional Back button if not in Beranda home */}
              {(activeTab !== 'dashboard' || dashboardSubView !== 'home') ? (
                <button 
                  onClick={() => {
                    if (dashboardSubView !== 'home') setDashboardSubView('home');
                    else {
                      setActiveTab('dashboard');
                      setDashboardSubView('home');
                    }
                  }} 
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center mr-1"
                >
                  <ArrowLeft className="w-4 h-4 text-white" />
                </button>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mr-1 shadow-inner">
                  <Leaf className="w-4.5 h-4.5 text-white" />
                </div>
              )}
              
              <div>
                <span className="text-[10px] font-bold text-teal-150 block uppercase tracking-wider leading-none">NutriSnap Pro</span>
                {/* Dynamically adjust title based on subtab */}
                <h1 className="text-base font-black tracking-tight text-white mt-1 leading-tight">
                  {activeTab === 'dashboard' && dashboardSubView === 'home' && 'CEKAT App 2'}
                  {activeTab === 'dashboard' && dashboardSubView === 'reminders' && 'Pengingat & Jadwal'}
                  {activeTab === 'dashboard' && dashboardSubView === 'marketplace' && 'Keranjangmu'}
                  {activeTab === 'dashboard' && dashboardSubView === 'edukasi' && 'Edukasi Kesehatan'}
                  {activeTab === 'nutrisi' && nutrisiSubView === 'pantry' && 'Pantry AI & Menu Sehat'}
                  {activeTab === 'nutrisi' && nutrisiSubView === 'charts' && 'Kalkulator IMT'}
                  {activeTab === 'nutrisi' && nutrisiSubView === 'main' && 'Nutrisi Harian'}
                  {activeTab === 'nutrisi' && nutrisiSubView === 'scan_camera' && 'Scan Gizi AI 📸'}
                  {activeTab === 'nutrisi' && nutrisiSubView === 'scan_result' && 'Hasil Scan AI ✨'}
                  {activeTab === 'challenge' && challengeSubView === 'games' && 'Games'}
                  {activeTab === 'challenge' && challengeSubView !== 'games' && 'Misi Sehat'}
                  {activeTab === 'riwayat' && riwayatSubView === 'wrapped' && 'CEKAT Wrapped'}
                  {activeTab === 'riwayat' && riwayatSubView === 'home' && 'Riwayat Medis'}
                  {activeTab === 'profil' && 'Profil Anggota'}
                </h1>
              </div>
            </div>

            {/* Header Right Icon widgets */}
            <div className="flex items-center space-x-2.5 relative z-15">
              {activeTab === 'dashboard' && dashboardSubView === 'marketplace' && (
                <button className="relative w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/10">
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-extrabold text-[9px] flex items-center justify-center border-2 border-[#2d8d81]">3</span>
                </button>
              )}
              <div className="w-8.5 h-8.5 rounded-xl border border-white/25 overflow-hidden shadow-md shrink-0">
                <img src={userAvatarImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* 
          3. MOBILE MAIN BODY CONTENT 
          Dynamic subview rendering to map EXACTLY to the provided mockup pictures
        */}
        <div className="p-4 space-y-4">
          
          {/* ======================================= */}
          {/* TAB 1: BERANDA / DASHBOARD SUBVIEWS     */}
          {/* ======================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              
              {/* SUBVIEW A: HOME DASHBOARD SCREEN */}
              {dashboardSubView === 'home' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Vibrant Mobile Hero Banner with HD Background Image */}
                  <div className="relative rounded-[32px] overflow-hidden shadow-xl space-y-3.5 border border-white/10 min-h-[190px] flex flex-col justify-between p-5">
                    {/* HD Background Image */}
                    <img 
                      src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80" 
                      alt="Healthy background" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for high text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-[#1a5e55]/85 to-[#2d8d81]/60" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-yellow-300 font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-current text-yellow-300" />
                        <span>Screening Mandiri</span>
                      </span>
                      <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                        🔥 5 Hari Streak
                      </span>
                    </div>

                    <div className="relative z-10 space-y-1 my-1">
                      <span className="text-[11px] font-bold text-teal-200 block uppercase tracking-wider">Selamat Datang,</span>
                      <h2 className="text-xl font-extrabold text-white leading-tight drop-shadow-sm">Sofia Kusuma</h2>
                      <p className="text-[11px] text-teal-50 font-medium leading-relaxed mt-0.5 opacity-90 max-w-[92%]">
                        Tekanan darah dan IMT Anda memerlukan perhatian medis ringan. Selesaikan misi sehat Anda.
                      </p>
                    </div>

                    {/* Mobile Hero Quick Action Buttons */}
                    <div className="relative z-10 pt-1 flex gap-2">
                      <button 
                        onClick={() => { setActiveTab('challenge'); setChallengeSubView('checklist'); nav('challenge', 'checklist'); }}
                        className="flex-1 py-2.5 bg-[#f1c40f] hover:bg-yellow-400 text-slate-950 font-extrabold text-[10.5px] rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-1"
                      >
                        <span>Mulai Misi</span>
                        <Zap className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button 
                        onClick={() => { setActiveTab('nutrisi'); setNutrisiSubView('charts'); nav('nutrisi', 'charts'); }}
                        className="flex-1 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-[10.5px] rounded-xl border border-white/20 backdrop-blur-md transition flex items-center justify-center gap-1"
                      >
                        <span>Detail IMT</span>
                        <Activity className="w-3.5 h-3.5 text-teal-200" />
                      </button>
                    </div>
                  </div>

                  {/* Restored Fitur & Layanan Utama Grid Menu (8 Features with Belanja Gizi) */}
                  <div className="bg-white border border-teal-50/50 rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-50">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Layanan Utama</h4>
                      <span className="text-[9.5px] font-black text-[#2d8d81] bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full">8 Fitur</span>
                    </div>

                    <div className="grid grid-cols-4 gap-y-4 gap-x-2.5 text-center">
                      {[
                        { name: 'Scan Gizi', icon: Camera, color: 'bg-emerald-50/95 border border-emerald-250/90 text-emerald-800', action: () => { setActiveTab('nutrisi'); setNutrisiSubView('scan_camera'); nav('nutrisi', 'scan_camera'); } },
                        { name: 'Hitung IMT', icon: Activity, color: 'bg-amber-50/95 border border-amber-250/90 text-amber-800', action: () => { setActiveTab('nutrisi'); setNutrisiSubView('charts'); nav('nutrisi', 'charts'); } },
                        { name: 'Belanja Gizi', icon: ShoppingBag, color: 'bg-teal-50/95 border border-teal-250/90 text-[#2d8d81]', action: () => { setDashboardSubView('marketplace'); nav('dashboard', 'marketplace'); } },
                        { name: 'Challenge', icon: Zap, color: 'bg-purple-50/95 border border-purple-250/90 text-purple-800', action: () => { setActiveTab('challenge'); setChallengeSubView('checklist'); nav('challenge', 'checklist'); } },
                        { name: 'Games', icon: Gamepad2, color: 'bg-rose-50/95 border border-rose-250/90 text-rose-700', action: () => { setActiveTab('challenge'); setChallengeSubView('games'); nav('challenge', 'games'); } },
                        { name: 'Wrapped', icon: Trophy, color: 'bg-yellow-50/95 border border-yellow-250/90 text-yellow-800', action: () => { setActiveTab('riwayat'); setRiwayatSubView('wrapped'); nav('riwayat', 'wrapped'); } },
                        { name: 'Pengingat', icon: Bell, color: 'bg-blue-50/95 border border-blue-250/90 text-blue-800', action: () => { setDashboardSubView('reminders'); nav('dashboard', 'reminders'); } },
                        { name: 'Edukasi', icon: BookOpen, color: 'bg-orange-50/95 border border-orange-250/90 text-orange-700', action: () => { setDashboardSubView('edukasi'); nav('dashboard', 'edukasi'); } }
                      ].map((menu, idx) => {
                        const IconComp = menu.icon;
                        return (
                          <div 
                            key={idx}
                            onClick={menu.action}
                            className="group cursor-pointer active:scale-95 transition-all duration-200 min-w-0 text-center"
                          >
                            <div className={`w-12 h-12 rounded-full ${menu.color} flex items-center justify-center shadow-md shadow-slate-100/50 group-hover:scale-105 transition-transform duration-300 mx-auto`}>
                              <IconComp className="w-5.5 h-5.5 stroke-[2.4]" />
                            </div>
                            <span className="text-[9.5px] font-black text-slate-800 tracking-tight leading-tight mt-1.5 block truncate w-full">{menu.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile Indicators Cards Grid */}
                  <div className="bg-white border border-teal-50/50 rounded-[32px] p-4.5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Hasil Cek Kesehatan</h4>
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full">Perlu Perhatian</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl flex flex-col justify-between space-y-2">
                        <div className="flex justify-between items-center text-[9.5px] font-black text-rose-700 uppercase tracking-wide">
                          <span>Tensi Darah</span>
                          <Heart className="w-4 h-4 text-rose-650 fill-current shrink-0 animate-pulse" />
                        </div>
                        <div>
                          <span className="text-sm font-black text-slate-900 block leading-tight">140/85 mmHg</span>
                          <span className="text-[9px] font-bold text-rose-600 uppercase tracking-wider block mt-0.5">Hipertensi T1</span>
                        </div>
                      </div>
                      <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-2xl flex flex-col justify-between space-y-2">
                        <div className="flex justify-between items-center text-[9.5px] font-black text-amber-800 uppercase tracking-wide">
                          <span>IMT Tubuh</span>
                          <Activity className="w-4 h-4 text-amber-700" />
                        </div>
                        <div>
                          <span className="text-sm font-black text-slate-900 block leading-tight">24.03 kg/m²</span>
                          <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider block mt-0.5">Overweight</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SMART SUGGESTION CARD: CEKAT STATION WITH HD BACKGROUND IMAGE */}
                  <div className="relative rounded-[32px] overflow-hidden p-5 shadow-lg space-y-3 border border-teal-400/20 text-white min-h-[160px] flex flex-col justify-between">
                    {/* HD Background Image */}
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" 
                      alt="Medical station" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark Teal Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#1e6b62]/85 to-[#2d8d81]/70" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                        💡 Rekomendasi Medis
                      </span>
                      <span className="text-[10px] text-teal-100 font-bold bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/15 flex items-center gap-1">
                        📍 Puskesmas Ngabab
                      </span>
                    </div>

                    <div className="relative z-10 space-y-1 my-0.5">
                      <h4 className="text-sm font-black text-white leading-snug drop-shadow-sm">
                        Saran Cek Ulang di CEKAT Station 🏥
                      </h4>
                      <p className="text-[11px] text-teal-50 font-medium leading-relaxed max-w-[95%]">
                        Tensi darah Anda (<span className="font-black text-amber-300">140/85 mmHg</span>) memerlukan pemantauan berkala. Disarankan melakukan cek tensi & kolesterol ulang di <span className="font-extrabold text-white">CEKAT Station</span> minggu ini.
                      </p>
                    </div>

                    <div className="relative z-10 pt-1 flex gap-2">
                      <button
                        onClick={() => alert('Jadwal Cek Kesehatan di CEKAT Station Puskesmas Ngabab berhasil dibuat! Kami akan mengingatkan Anda via Pengingat.')}
                        className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10.5px] rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <span>Jadwalkan Cek Station</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Data Pengukuran CEKAT Station Table Mobile */}
                  <div className="bg-white border border-teal-50/50 rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Hasil CEKAT Station</h4>
                      <span className="text-[9px] font-black text-[#2d8d81] bg-teal-50 px-2.5 py-0.5 rounded-full">Puskesmas Ngabab</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-slate-800 text-xs">
                      <div className="p-2 bg-slate-50 border border-slate-150/40 rounded-xl">
                        <span className="text-[9px] font-bold text-slate-450 block">Gula Darah</span>
                        <span className="font-extrabold text-sm block mt-0.5">85 mg/dL</span>
                      </div>
                      <div className="p-2 bg-slate-50 border border-slate-155/45 rounded-xl">
                        <span className="text-[9px] font-bold text-slate-455 block">Denyut Nadi</span>
                        <span className="font-extrabold text-sm block mt-0.5">60 bpm</span>
                      </div>
                      <div className="p-2 bg-slate-50 border border-slate-155/45 rounded-xl">
                        <span className="text-[9px] font-bold text-slate-455 block">Lingkar Perut</span>
                        <span className="font-extrabold text-sm block mt-0.5">83 cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW B: PENGINGAT & JADWAL SCREEN (Screenshot 4) */}
              {dashboardSubView === 'reminders' && (
                <div className="bg-white rounded-[32px] p-5 shadow-sm space-y-5 animate-fadeIn border border-slate-100/50">
                  {/* Category Pills inside reminders */}
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-[11px] font-black">
                    {['Semua', 'Obat', 'Pemeriksaan', 'Konsumsi'].map((pill, idx) => (
                      <button 
                        key={idx} 
                        className={`px-4 py-2 rounded-full border transition shrink-0 ${
                          idx === 0 
                            ? 'bg-yellow-400 border-yellow-400 text-slate-950' 
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {pill}
                      </button>
                    ))}
                  </div>

                  {/* Timeline Schedule stack */}
                  <div className="space-y-4 text-xs">
                    
                    {/* Hari Ini */}
                    <div className="space-y-2.5">
                      <h4 className="font-black text-slate-800 uppercase tracking-wider text-[10px]">Hari Ini</h4>
                      <div className="flex items-start justify-between p-3.5 bg-rose-50/30 border border-rose-100 rounded-2xl gap-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-extrabold text-slate-900 text-sm">20.00</span>
                          <div className="w-10 h-10 rounded-xl bg-white border border-rose-100 flex items-center justify-center shrink-0">
                            💊
                          </div>
                          <div>
                            <h5 className="font-black text-slate-850 text-xs">Minum Obat</h5>
                            <p className="text-[10px] text-slate-450 font-bold mt-0.5">Amlodipine 5 mg (1 tablet)</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-extrabold text-[9px] uppercase tracking-wider">Segera</span>
                      </div>
                    </div>

                    {/* Besok */}
                    <div className="space-y-2.5">
                      <h4 className="font-black text-slate-800 uppercase tracking-wider text-[10px]">Besok, 31 Agustus 2026</h4>
                      
                      <div className="flex items-start justify-between p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl gap-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-extrabold text-slate-900 text-sm">08.00</span>
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                            🩺
                          </div>
                          <div>
                            <h5 className="font-black text-slate-850 text-xs">Cek Tekanan Darah</h5>
                            <p className="text-[10px] text-slate-450 font-bold mt-0.5">Pantau tekanan darah kamu</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-[9px] uppercase tracking-wider">Besok</span>
                      </div>

                      <div className="flex items-start justify-between p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl gap-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-extrabold text-slate-900 text-sm">12.00</span>
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                            💧
                          </div>
                          <div>
                            <h5 className="font-black text-slate-850 text-xs">Minum Air Putih</h5>
                            <p className="text-[10px] text-slate-450 font-bold mt-0.5">Minimal 8 gelas sehari</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-[9px] uppercase tracking-wider">Besok</span>
                      </div>
                    </div>

                    {/* Jadwal Mendatang */}
                    <div className="space-y-2.5 pt-2">
                      <h4 className="font-black text-slate-800 uppercase tracking-wider text-[10px]">Jadwal Mendatang</h4>
                      
                      <div className="flex items-start justify-between p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl gap-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-center font-extrabold text-slate-500 shrink-0">
                            <span className="block text-xs leading-none">31</span>
                            <span className="block text-[8px] uppercase tracking-wider mt-0.5">Agust</span>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                            🏥
                          </div>
                          <div>
                            <h5 className="font-black text-slate-850 text-xs">Kontrol Kesehatan</h5>
                            <p className="text-[10px] text-slate-450 font-bold mt-0.5">Puskesmas Pembantu Ds. Ngabab</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-extrabold text-[9px]">Dalam 4 hari</span>
                      </div>

                      <div className="flex items-start justify-between p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl gap-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-center font-extrabold text-slate-500 shrink-0">
                            <span className="block text-xs leading-none">17</span>
                            <span className="block text-[8px] uppercase tracking-wider mt-0.5">Mei</span>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                            👶
                          </div>
                          <div>
                            <h5 className="font-black text-slate-850 text-xs">Pantau Tumbuh Kembang</h5>
                            <p className="text-[10px] text-slate-450 font-bold mt-0.5">Cek tinggi & BB anak - Posyandu Mawar</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-100 font-extrabold text-[9px]">Dalam 6 hari</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* SUBVIEW C: MARKETPLACE / SHOPPING SCREEN */}
              {dashboardSubView === 'marketplace' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari produk kesehatan & gizi..."
                      className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-xs focus:outline-none focus:border-[#2d8d81] shadow-sm"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <Mic className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
                  </div>

                  {/* Horizontal Category pills — interactive */}
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {['Semua', 'Vitamin', 'Penambah Darah', 'Susu', 'Obat', 'Makanan Sehat'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setMarketplaceCat(cat)}
                        className={`px-3.5 py-2 rounded-full border transition shrink-0 text-[11px] font-black ${
                          marketplaceCat === cat
                            ? 'bg-[#2d8d81] border-[#2d8d81] text-white shadow-md shadow-teal-500/20'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-[#2d8d81] hover:text-[#2d8d81]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Banner promo */}
                  <div className="bg-gradient-to-r from-[#2d8d81] to-[#3fa89b] rounded-[24px] p-4 flex items-center justify-between text-white shadow-md">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-teal-200 block">Promo Hari Ini</span>
                      <p className="text-sm font-black mt-0.5">Gratis ongkir produk gizi!</p>
                      <span className="text-[10px] text-teal-100 font-semibold">Min. pembelian Rp 50.000</span>
                    </div>
                    <div className="text-4xl">🎁</div>
                  </div>

                  {/* Product Grid — filtered by marketplaceCat */}
                  {(() => {
                    const allProducts = [
                      { name: 'Enervon C 100mg 30 Tablet', cat: 'Vitamin', price: 'Rp 45.900', oldPrice: 'Rp 61.360', disc: '25%', image: 'https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?auto=format&fit=crop&w=300&q=80', rating: '4.9' },
                      { name: 'Vitamin D3 5000 IU 60 Kapsul', cat: 'Vitamin', price: 'Rp 89.000', oldPrice: 'Rp 110.000', disc: '19%', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80', rating: '4.8' },
                      { name: 'Tablet Tambah Darah 100 Tablet', cat: 'Penambah Darah', price: 'Rp 24.999', oldPrice: 'Rp 29.350', disc: '15%', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=300&q=80', rating: '4.8' },
                      { name: 'Fe Tablet Sangobion Iron 30 Kapsul', cat: 'Penambah Darah', price: 'Rp 38.500', oldPrice: 'Rp 45.000', disc: '14%', image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=300&q=80', rating: '4.7' },
                      { name: 'Ultra Milk Susu UHT Full Cream 200ml', cat: 'Susu', price: 'Rp 5.700', oldPrice: 'Rp 6.000', disc: '5%', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300&q=80', rating: '4.7' },
                      { name: 'Frisian Flag Susu Kental Manis 385g', cat: 'Susu', price: 'Rp 14.500', oldPrice: 'Rp 16.000', disc: '9%', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80', rating: '4.6' },
                      { name: 'Paracetamol 500mg 10 Tablet', cat: 'Obat', price: 'Rp 3.500', oldPrice: 'Rp 4.500', disc: '22%', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=300&q=80', rating: '4.9' },
                      { name: 'Amoxicillin 500mg 10 Kapsul', cat: 'Obat', price: 'Rp 9.800', oldPrice: 'Rp 12.000', disc: '18%', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=300&q=80', rating: '4.7' },
                      { name: 'Salad Sayur Segar Premium 250g', cat: 'Makanan Sehat', price: 'Rp 22.000', oldPrice: 'Rp 25.000', disc: '12%', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80', rating: '4.8' },
                      { name: 'Oatmeal Instant Quaker 800g', cat: 'Makanan Sehat', price: 'Rp 45.000', oldPrice: 'Rp 52.000', disc: '13%', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80', rating: '4.9' },
                    ];
                    const filtered = marketplaceCat === 'Semua' ? allProducts : allProducts.filter(p => p.cat === marketplaceCat);
                    return (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                            {marketplaceCat === 'Semua' ? 'Semua Produk' : marketplaceCat}
                            <span className="ml-1.5 text-slate-400 font-semibold normal-case">({filtered.length})</span>
                          </h4>
                          <button className="text-[10px] font-black text-[#2d8d81]">Lihat semua →</button>
                        </div>
                        {filtered.length === 0 ? (
                          <div className="text-center py-10 text-slate-400 text-xs font-bold">Produk tidak ditemukan</div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            {filtered.map((prod, idx) => (
                              <div key={idx} className="bg-white border border-slate-100 rounded-[22px] overflow-hidden shadow-sm flex flex-col">
                                <div className="relative w-full h-32 bg-slate-50">
                                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                  <span className="absolute top-2 left-2 bg-rose-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md">
                                    -{prod.disc}
                                  </span>
                                </div>
                                <div className="p-2.5 flex flex-col flex-1 gap-1.5">
                                  <span className="text-[8.5px] font-black text-[#2d8d81] uppercase tracking-wide">{prod.cat}</span>
                                  <h5 className="text-[11px] font-black text-slate-800 leading-snug line-clamp-2 flex-1">{prod.name}</h5>
                                  <div className="flex items-center gap-1 text-[9px] text-amber-500 font-bold">★ {prod.rating}</div>
                                  <div>
                                    <span className="text-sm font-black text-rose-600 block leading-tight">{prod.price}</span>
                                    <span className="text-[9px] text-slate-400 line-through">{prod.oldPrice}</span>
                                  </div>
                                  <button
                                    onClick={() => alert(`${prod.name} ditambahkan ke keranjang!`)}
                                    className="w-full py-1.5 bg-[#2d8d81] hover:bg-[#267a70] text-white text-[10px] font-black rounded-xl transition active:scale-95 mt-0.5"
                                  >
                                    + Keranjang
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* SUBVIEW D: EDUKASI ARTICLES LIST SCREEN */}
              {dashboardSubView === 'edukasi' && (
                <div className="space-y-4 animate-fadeIn">
                  {articlesList.map(art => (
                    <div key={art.id} onClick={() => { setSelectedArticle(art); setDashboardSubView('article_detail'); }} className="bg-white border border-slate-150/40 p-4 rounded-3xl cursor-pointer hover:bg-teal-50/20 active:scale-98 transition flex gap-4">
                      <img src={art.image} alt={art.title} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[8.5px] font-black text-[#2d8d81] uppercase tracking-wider block">{art.category}</span>
                          <h4 className="text-xs font-black text-slate-900 mt-1 leading-snug line-clamp-2">{art.title}</h4>
                        </div>
                        <span className="text-[9px] text-slate-400 font-semibold block">{art.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SUBVIEW E: ARTICLE DETAIL VIEW SCREEN */}
              {dashboardSubView === 'article_detail' && selectedArticle && (
                <div className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm space-y-4 animate-fadeIn">
                  <button onClick={() => setDashboardSubView('edukasi')} className="flex items-center text-xs font-black text-[#2d8d81] gap-1">
                    <ArrowLeft className="w-4 h-4" /> Kembali
                  </button>
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-44 rounded-2xl object-cover" />
                  <span className="text-[9px] font-black text-[#2d8d81] bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">{selectedArticle.category}</span>
                  <h3 className="text-base font-black text-slate-900 leading-tight">{selectedArticle.title}</h3>
                  <p className="text-[11px] text-slate-500 font-bold">Ditulis oleh: {selectedArticle.author} • {selectedArticle.readTime}</p>
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold">{selectedArticle.summary}</p>
                </div>
              )}
            </div>
          )}

          {/* ======================================= */}
          {/* TAB 2: NUTRISI MOBILE SUBVIEWS          */}
          {/* ======================================= */}
          {activeTab === 'nutrisi' && (
            <div className="space-y-4">
              
              {/* Subtab Toggles: Harian | IMT Calc | Scan AI | Resep Sehat */}
              <div className="flex bg-white p-1 rounded-2xl border border-slate-150/40 shadow-sm gap-0.5 text-[10.5px] font-black">
                <button onClick={() => { setNutrisiSubView('main'); nav('nutrisi', 'main'); }} className={`flex-1 py-2 rounded-xl transition ${nutrisiSubView === 'main' ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-650'}`}>Harian</button>
                <button onClick={() => { setNutrisiSubView('charts'); nav('nutrisi', 'charts'); }} className={`flex-1 py-2 rounded-xl transition ${nutrisiSubView === 'charts' ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-655'}`}>IMT Calc</button>
                <button onClick={() => { setNutrisiSubView('scan_camera'); nav('nutrisi', 'scan_camera'); }} className={`flex-1 py-2 rounded-xl transition ${'scan_camera,scan_result'.includes(nutrisiSubView) ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-655'}`}>Scan AI</button>
                <button onClick={() => { setNutrisiSubView('pantry'); nav('nutrisi', 'pantry'); }} className={`flex-1 py-2 rounded-xl transition ${nutrisiSubView === 'pantry' ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-655'}`}>Resep</button>
              </div>

              {/* SUBVIEW A: NUTRISI MAIN HARIAN SCREEN */}
              {nutrisiSubView === 'main' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-3">
                    <h3 className="text-sm font-black text-slate-900">Target Nutrisi Harian: 2.100 kkal</h3>
                    <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex p-0.5">
                      <div className="h-full bg-[#2d8d81] rounded-l-full" style={{ width: '45%' }}></div>
                      <div className="h-full bg-amber-400" style={{ width: '15%' }}></div>
                      <div className="h-full bg-rose-500 rounded-r-full" style={{ width: '9%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 pt-1">
                      <span>Karbo: 220g</span>
                      <span>Protein: 100g</span>
                      <span>Lemak: 60g</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#2d8d81] to-[#3fa89b] text-white rounded-[32px] p-5 shadow-lg space-y-2 border border-white/5">
                    <h4 className="text-sm font-black">AI Meal Scanner 📸</h4>
                    <p className="text-[11px] text-teal-150">Foto piring makan untuk hitung kalori makro otomatis.</p>
                    <button onClick={() => alert('Membuka kamera AI Meal Scanner...')} className="w-full py-3 bg-white text-[#2d8d81] font-bold text-xs rounded-xl shadow mt-2">
                      Scan Foto Makanan
                    </button>
                  </div>
                </div>
              )}

              {/* SUBVIEW B: IMT CALCULATOR (ENHANCED DETAIL SCREEN) */}
              {nutrisiSubView === 'charts' && (
                <div className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4 animate-fadeIn">
                  <h3 className="text-sm font-black text-slate-900 border-b border-slate-50 pb-2">Kalkulator IMT Real-time</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Berat Badan (kg)</label>
                      <input 
                        type="number" 
                        value={weightInput} 
                        onChange={(e) => { setWeightInput(e.target.value); calculateBmi(); }} 
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-[#2d8d81]" 
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Tinggi Badan (m)</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        value={heightInput} 
                        onChange={(e) => { setHeightInput(e.target.value); calculateBmi(); }} 
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-[#2d8d81]" 
                      />
                    </div>

                    <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-[20px] text-left space-y-3.5">
                      <div className="text-center">
                        <span className="text-[10px] font-black text-[#2d8d81] uppercase block">Hasil IMT</span>
                        <span className="text-2xl font-black text-slate-900 block mt-0.5">{bmiValue} kg/m²</span>
                        <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full mt-1.5 ${
                          bmiCategory === 'Normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>{bmiCategory}</span>
                      </div>

                      <div className="border-t border-teal-200/40 pt-3 space-y-2 text-[11px] font-bold text-slate-700">
                        <div>• Rumus: <span className="font-extrabold text-slate-950">Berat (kg) / (Tinggi (m)²)</span></div>
                        <div>• Berat Ideal: <span className="font-extrabold text-[#2d8d81]">{idealWeightMin} kg - {idealWeightMax} kg</span></div>
                        <div className="p-2.5 bg-white border border-teal-100 rounded-xl mt-2 text-[10.5px]">
                          {bmiCategory === 'Kurus' && (
                            <span className="text-amber-700">⚠️ Perlu naik <span className="font-black text-amber-800">{weightDiff} kg</span> untuk berat ideal minimum ({idealWeightMin} kg).</span>
                          )}
                          {bmiCategory === 'Normal' && (
                            <span className="text-emerald-700">🎉 Berat badan sudah ideal. Jaga pola makan & aktif bergerak!</span>
                          )}
                          {bmiCategory === 'Gemuk' && (
                            <span className="text-rose-700">⚠️ Perlu turun <span className="font-black text-rose-800">{weightDiff} kg</span> untuk berat ideal maksimum ({idealWeightMax} kg).</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW D: SCAN GIZI AI — Camera viewfinder */}
              {nutrisiSubView === 'scan_camera' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Camera viewfinder card */}
                  <div className="relative bg-slate-950 rounded-[32px] overflow-hidden shadow-xl" style={{ aspectRatio: '3/4' }}>
                    {/* Fake camera background */}
                    <img
                      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
                      alt="Camera preview"
                      className="w-full h-full object-cover opacity-70"
                    />

                    {/* Top gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/70" />

                    {/* AI badge top */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-emerald-500/90 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur">
                        ⚡ AI Scan Aktif
                      </span>
                      <span className="bg-white/15 text-white text-[9px] font-bold px-3 py-1 rounded-full backdrop-blur">
                        HD
                      </span>
                    </div>

                    {/* Animated corner-bracket viewfinder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-52 h-52">
                        {/* Top-left */}
                        <span className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-emerald-400 rounded-tl-xl" style={{ borderWidth: '3px' }} />
                        {/* Top-right */}
                        <span className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-emerald-400 rounded-tr-xl" style={{ borderTopWidth: '3px', borderRightWidth: '3px', borderColor: '#34d399' }} />
                        {/* Bottom-left */}
                        <span className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-emerald-400 rounded-bl-xl" style={{ borderBottomWidth: '3px', borderLeftWidth: '3px', borderColor: '#34d399' }} />
                        {/* Bottom-right */}
                        <span className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-emerald-400 rounded-br-xl" style={{ borderBottomWidth: '3px', borderRightWidth: '3px', borderColor: '#34d399' }} />
                        {/* Scan line animation */}
                        <div className="absolute inset-x-2 h-px bg-emerald-400/80 animate-bounce" style={{ top: '50%', boxShadow: '0 0 8px #34d399' }} />
                        <p className="absolute -bottom-8 left-0 right-0 text-center text-[10px] font-bold text-white/80">Arahkan kamera ke makanan</p>
                      </div>
                    </div>

                    {/* Bottom controls */}
                    <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-8">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
                        <span className="text-lg">🖼️</span>
                      </button>
                      {/* Capture button */}
                      <button
                        onClick={() => setNutrisiSubView('scan_result')}
                        className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl border-4 border-emerald-400 active:scale-90 transition-transform"
                      >
                        <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
                        <span className="text-lg">⚡</span>
                      </button>
                    </div>
                  </div>

                  {/* Tip card */}
                  <div className="bg-white border border-slate-100 rounded-[28px] p-4 shadow-sm flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <span className="text-xl">💡</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-slate-900">Tips Scan Terbaik</p>
                      <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Pastikan pencahayaan cukup dan makanan terlihat jelas dalam bingkai.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW E: SCAN RESULT — AI food analysis result */}
              {nutrisiSubView === 'scan_result' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Result hero image */}
                  <div className="relative rounded-[32px] overflow-hidden shadow-lg" style={{ aspectRatio: '4/3' }}>
                    <img
                      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=80&fit=crop&w=600&q=80"
                      alt="Scanned food"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">✅ Teridentifikasi</span>
                      <h3 className="text-white font-black text-lg mt-1.5 leading-tight">Salad Sayur Segar</h3>
                      <p className="text-white/70 text-[10px] font-semibold">Akurasi AI: 94% • Porsi: ~250g</p>
                    </div>
                    {/* Rescan button */}
                    <button
                      onClick={() => setNutrisiSubView('scan_camera')}
                      className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur border border-white/30 rounded-full flex items-center justify-center"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Nutrition breakdown card */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">Info Nutrisi (per porsi)</h4>
                      <span className="text-[10px] font-black text-[#2d8d81] bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full">AI Analyzed</span>
                    </div>

                    {/* Calorie big number */}
                    <div className="flex items-center gap-4 p-3 bg-teal-50/60 border border-teal-100 rounded-2xl">
                      <div className="text-center">
                        <span className="text-3xl font-black text-[#2d8d81]">187</span>
                        <span className="text-[9px] font-black text-slate-500 block">kkal</span>
                      </div>
                      {/* Macro bars */}
                      <div className="flex-1 space-y-2">
                        {[
                          { label: 'Karbo', val: 22, max: 60, color: 'bg-amber-400', unit: 'g' },
                          { label: 'Protein', val: 8, max: 40, color: 'bg-emerald-500', unit: 'g' },
                          { label: 'Lemak', val: 7, max: 30, color: 'bg-rose-400', unit: 'g' },
                          { label: 'Serat', val: 5, max: 25, color: 'bg-violet-400', unit: 'g' },
                        ].map((m, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-slate-600 w-10 shrink-0">{m.label}</span>
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${m.color} rounded-full`} style={{ width: `${(m.val/m.max)*100}%` }} />
                            </div>
                            <span className="text-[9px] font-black text-slate-700 w-8 text-right shrink-0">{m.val}{m.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Micro nutrients */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Vitamin C', val: '45mg', color: 'text-orange-600 bg-orange-50 border-orange-100' },
                        { label: 'Zat Besi', val: '2.1mg', color: 'text-rose-600 bg-rose-50 border-rose-100' },
                        { label: 'Kalsium', val: '67mg', color: 'text-blue-600 bg-blue-50 border-blue-100' },
                      ].map((n, i) => (
                        <div key={i} className={`rounded-2xl p-2.5 border text-center ${n.color}`}>
                          <span className="text-[11px] font-black block">{n.val}</span>
                          <span className="text-[9px] font-bold block mt-0.5 opacity-75">{n.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Saran card */}
                  <div className="bg-gradient-to-br from-[#2d8d81] to-[#3fa89b] text-white rounded-[32px] p-5 shadow-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🤖</span>
                      <h4 className="text-sm font-black">Saran AI CEKAT</h4>
                    </div>
                    <p className="text-[11px] text-teal-100 leading-relaxed font-semibold">
                      Salad sayur ini pilihan tepat untuk Anda! Rendah kalori dan tinggi serat membantu mengontrol tekanan darah.
                      Tambahkan protein hewani seperti telur rebus untuk nutrisi yang lebih lengkap.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert('Makanan disimpan ke log harian!')}
                      className="flex-1 py-3 bg-[#2d8d81] text-white font-bold text-xs rounded-2xl shadow-md active:scale-95 transition"
                    >
                      ➕ Simpan ke Log Harian
                    </button>
                    <button
                      onClick={() => setNutrisiSubView('scan_camera')}
                      className="py-3 px-4 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl active:scale-95 transition"
                    >
                      Scan Lagi
                    </button>
                  </div>
                </div>
              )}

              {/* SUBVIEW C: PANTRY AI & MENU SEHAT SCREEN */}
              {nutrisiSubView === 'pantry' && (() => {
                const allRecipes = [
                  { name: 'Nasi Campur Komplit Bergizi', cat: 'Ayam', image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Nasi Goreng Ayam Katsu', cat: 'Ayam', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Salad Sayur Segar', cat: 'Sayur', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Tumis Sayur Beef Cheese', cat: 'Sayur', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Ikan Bakar Madu', cat: 'Ikan', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Pepes Ikan Bumbu Kuning', cat: 'Ikan', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Omlet Mewah Rumahan', cat: 'Telur', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Telur Dadar Crispy', cat: 'Telur', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Grill Steak Daging Sapi', cat: 'Daging', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Sop Daging Tulang', cat: 'Daging', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80' },
                ];
                const [pantryFilter, setPantryFilter] = [selectedPantryTags, setSelectedPantryTags];
                const [recipeFilter, setRecipeFilter] = useState !== undefined ? (() => {
                  // use a local state pattern via a wrapper
                  return ['Semua', setPantryFilter] as const;
                })() : ['Semua', () => {}] as const;
                return null; // placeholder — see below
              })()}
              {nutrisiSubView === 'pantry' && (
                <div className="space-y-4 animate-fadeIn">

                  {/* "Apa isi kulkasmu?" — toggle pills, no emoji */}
                  <div className="bg-white border border-slate-100 rounded-[28px] p-4 shadow-sm">
                    <h4 className="text-[12px] font-black text-slate-900 mb-3">Apa isi kulkasmu?</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Telur', 'Ikan', 'Ayam', 'Sayur', 'Daging', 'Tempe'].map(item => {
                        const isSelected = selectedPantryTags.includes(item);
                        return (
                          <button
                            key={item}
                            onClick={() => {
                              if (isSelected) setSelectedPantryTags(selectedPantryTags.filter(t => t !== item));
                              else setSelectedPantryTags([...selectedPantryTags, item]);
                            }}
                            className={`px-3.5 py-2 rounded-full border text-[11px] font-black transition-all ${
                              isSelected
                                ? 'bg-[#2d8d81] border-[#2d8d81] text-white shadow-md shadow-teal-500/20'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                    {selectedPantryTags.length > 0 && (
                      <p className="text-[10px] text-[#2d8d81] font-bold mt-2.5">
                        ✓ {selectedPantryTags.length} bahan dipilih — AI merekomendasikan resep untukmu
                      </p>
                    )}
                  </div>

                  {/* Search bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari resep..."
                      className="w-full pl-11 pr-11 py-2.5 bg-white border border-slate-200 rounded-2xl font-bold text-xs focus:outline-none focus:border-[#2d8d81]"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <Mic className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Filter pills — interactive, filters recipe grid */}
                  {(() => {
                    const cats = ['Semua', 'Ayam', 'Sayur', 'Ikan', 'Telur', 'Daging'];
                    const allRecipes = [
                      { name: 'Nasi Campur Komplit Bergizi', cat: 'Ayam', image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Nasi Goreng Ayam Katsu', cat: 'Ayam', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Salad Sayur Segar', cat: 'Sayur', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Tumis Sayur Beef', cat: 'Sayur', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Ikan Bakar Madu', cat: 'Ikan', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Pepes Ikan Bumbu Kuning', cat: 'Ikan', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Omlet Mewah Rumahan', cat: 'Telur', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Telur Dadar Crispy', cat: 'Telur', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Grill Steak Daging Sapi', cat: 'Daging', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Sop Daging Tulang', cat: 'Daging', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80' },
                    ];
                    // Derive active filter from pantry tags (first selected) or 'Semua'
                    const activeFilter = selectedPantryTags.length === 1
                      ? (cats.includes(selectedPantryTags[0]) ? selectedPantryTags[0] : 'Semua')
                      : 'Semua';

                    // We'll use a simple click-to-set approach using pantryTagsList hack
                    // Store single recipe filter in a dedicated way — we repurpose a simpler approach:
                    // Read from data-pantry-filter attr on a hidden element OR just rely on rendered state.
                    // Since we can't add more useState here, we track via a global CSS class trick.
                    // Instead, render statically and add onClick to rerender.
                    const [recipeFilter, setRecipeFilter] = [
                      (typeof window !== 'undefined' && (window as any).__pantryFilter) || 'Semua',
                      (v: string) => { if (typeof window !== 'undefined') (window as any).__pantryFilter = v; }
                    ];

                    const filtered = recipeFilter === 'Semua' ? allRecipes : allRecipes.filter(r => r.cat === recipeFilter);

                    return (
                      <div className="space-y-4">
                        {/* Filter pills */}
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                          {cats.map(cat => (
                            <button
                              key={cat}
                              onClick={() => {
                                (window as any).__pantryFilter = cat;
                                // Force re-render by toggling a dummy pantry tag
                                setSelectedPantryTags(prev => [...prev]);
                              }}
                              className={`px-3.5 py-2 rounded-full border transition shrink-0 text-[11px] font-black ${
                                ((typeof window !== 'undefined' && (window as any).__pantryFilter) || 'Semua') === cat
                                  ? 'bg-[#2d8d81] border-[#2d8d81] text-white shadow-md shadow-teal-500/20'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        {/* Recipe grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {filtered.map((recipe, idx) => (
                            <div
                              key={idx}
                              onClick={() => alert(`Membuka resep: ${recipe.name}...`)}
                              className="h-36 rounded-[24px] overflow-hidden relative cursor-pointer group shadow border border-slate-100"
                            >
                              <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-3">
                                <div>
                                  <span className="text-[8px] font-black text-teal-300 uppercase block mb-0.5">{recipe.cat}</span>
                                  <h5 className="text-[11px] font-black text-white leading-tight">{recipe.name}</h5>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                </div>
              )}

            </div>
          )}

          {/* ======================================= */}
          {/* TAB 3: CHALLENGE MOBILE SUBVIEWS        */}
          {/* ======================================= */}
          {activeTab === 'challenge' && (
            <div className="space-y-4">
              
              {/* Subtab toggle — Misi | Checklist | Mini Games */}
              <div className="flex bg-white p-1.5 rounded-2xl border border-slate-150/40 shadow-sm gap-1 text-[11px] font-black">
                <button
                  onClick={() => { setChallengeSubView('home'); nav('challenge', 'home'); }}
                  className={`flex-1 py-2 rounded-xl transition ${challengeSubView === 'home' ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-655'}`}
                >
                  Misi
                </button>
                <button
                  onClick={() => { setChallengeSubView('checklist'); nav('challenge', 'checklist'); }}
                  className={`flex-1 py-2 rounded-xl transition ${challengeSubView === 'checklist' ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-655'}`}
                >
                  Checklist
                </button>
                <button
                  onClick={() => { setChallengeSubView('games'); nav('challenge', 'games'); }}
                  className={`flex-1 py-2 rounded-xl transition ${challengeSubView === 'games' ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-655'}`}
                >
                  Mini Games
                </button>
              </div>

              {/* SUBVIEW A: MISI — Challenge overview + progress banner + goals summary */}
              {challengeSubView === 'home' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Hero challenge card */}
                  <div className="bg-gradient-to-br from-[#2d8d81] to-[#3fa89b] text-white rounded-[32px] p-5 shadow-lg space-y-4 border border-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-teal-150 block">Challenge Mingguan</span>
                        <h3 className="text-base font-black mt-0.5">7-Day Healthy Challenge</h3>
                      </div>
                      <span className="bg-yellow-400 text-slate-950 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">🔥 Aktif</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-extrabold text-yellow-300 leading-none">{misiTargets.filter(t => t.done).length}</span>
                        <span className="text-sm font-bold text-teal-100">/ 7 hari selesai</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-300 rounded-full transition-all duration-500"
                          style={{ width: `${(misiTargets.filter(t => t.done).length / 7) * 100}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-teal-100 font-semibold">
                        {misiTargets.filter(t => t.done).length >= 7
                          ? '🎉 Semua misi selesai! Kamu luar biasa!'
                          : `${7 - misiTargets.filter(t => t.done).length} misi lagi untuk menyelesaikan tantangan minggu ini.`}
                      </p>
                    </div>
                  </div>

                  {/* Ringkasan kategori misi */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Kategori Misi Minggu Ini</h4>
                      <button
                        onClick={() => { setChallengeSubView('checklist'); nav('challenge', 'checklist'); }}
                        className="text-[10px] font-black text-[#2d8d81] flex items-center gap-0.5"
                      >
                        Lihat semua <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Hidrasi', icon: '💧', done: 2, total: 2 },
                        { label: 'Aktivitas Fisik', icon: '🏃', done: 1, total: 2 },
                        { label: 'Nutrisi Sehat', icon: '🥗', done: 2, total: 2 },
                        { label: 'Istirahat & Tidur', icon: '😴', done: 0, total: 1 },
                      ].map((cat, i) => (
                        <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{cat.icon}</span>
                            <span className={`text-[9px] font-black ${cat.done === cat.total ? 'text-emerald-700' : 'text-amber-700'}`}>
                              {cat.done}/{cat.total}
                            </span>
                          </div>
                          <p className="text-[10px] font-bold text-slate-700 mt-1">{cat.label}</p>
                          <div className="w-full h-1 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                            <div
                              className="h-full bg-[#2d8d81] rounded-full"
                              style={{ width: `${(cat.done / cat.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW B: CHECKLIST — Interactive task checklist */}
              {challengeSubView === 'checklist' && (
                <div className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Checklist Misi Sehat Harian</h4>
                    <span className="text-[9px] font-bold text-[#2d8d81] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                      {misiTargets.filter(t => t.done).length}/7 selesai
                    </span>
                  </div>
                  <div className="space-y-2">
                    {misiTargets.map(target => (
                      <div
                        key={target.id}
                        onClick={() => toggleMisi(target.id)}
                        className={`flex justify-between items-center text-xs font-bold p-3.5 rounded-2xl cursor-pointer active:scale-98 transition-all border ${
                          target.done
                            ? 'bg-teal-50/40 border-teal-100 text-slate-600'
                            : 'bg-slate-50 border-slate-150/40 text-slate-800 hover:border-teal-200'
                        }`}
                      >
                        <span className={target.done ? 'line-through opacity-60' : ''}>{target.text}</span>
                        <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 transition-all ml-3 ${
                          target.done ? 'bg-[#2d8d81] border-[#2d8d81] text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {target.done && <span className="text-[9px]">✓</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUBVIEW C: GAMES SCREEN */}
              {challengeSubView === 'games' && (
                <div className="bg-white border border-slate-150/40 rounded-[32px] p-5 shadow-xs space-y-4 animate-fadeIn">
                  <div className="flex bg-slate-50 border border-slate-150/50 p-1.5 rounded-2xl gap-2 text-[11px] font-black">
                    <button className="flex-1 py-2 bg-white text-[#2d8d81] border border-teal-100 shadow-sm rounded-xl">Semua</button>
                    <button className="flex-1 py-2 text-slate-500">Tersimpan</button>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { id: 'tebak', name: 'Tebak Gambar', icon: '🎮', bg: 'bg-emerald-50 border border-emerald-100' },
                      { id: 'fruity', name: 'Tutty Fruity', icon: '🍉', bg: 'bg-amber-50 border border-amber-100' },
                      { id: 'uno', name: 'Health Uno', icon: '🃏', bg: 'bg-purple-50 border border-purple-100' },
                      { id: 'boom', name: 'Healthy Boom', icon: '💣', bg: 'bg-rose-50 border border-rose-100' },
                      { id: 'sudoku', name: 'Sudoku Fruity', icon: '🧩', bg: 'bg-indigo-50 border border-indigo-100' },
                      { id: 'xox', name: 'Health XOX', icon: '🎮', bg: 'bg-blue-50 border border-blue-100' },
                      { id: 'search', name: 'Search Your Health', icon: '🔍', bg: 'bg-yellow-50 border border-yellow-100' },
                      { id: 'puzzle', name: 'Puzzle Nutritone', icon: '🧩', bg: 'bg-teal-50 border border-teal-100' },
                      { id: 'monopoly', name: 'Monopoli', icon: '🎲', bg: 'bg-slate-50 border border-slate-150/40' }
                    ].map(g => (
                      <div
                        key={g.id}
                        onClick={() => alert(`Membuka game: ${g.name}...`)}
                        className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${g.bg}`}>
                          {g.icon}
                        </div>
                        <span className="text-[10px] font-black text-slate-800 leading-tight block w-full truncate">{g.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================= */}
          {/* TAB 4: RIWAYAT MOBILE SUBVIEWS          */}
          {/* ======================================= */}
          {activeTab === 'riwayat' && (
            <div className="space-y-4">
              
              {/* Subtab toggle */}
              <div className="flex bg-white p-1.5 rounded-2xl border border-slate-155/40 shadow-sm gap-1 text-[11px] font-black">
                <button onClick={() => setRiwayatSubView('home')} className={`flex-1 py-2 rounded-xl transition ${riwayatSubView === 'home' ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-650'}`}>Timeline</button>
                <button onClick={() => setRiwayatSubView('wrapped')} className={`flex-1 py-2 rounded-xl transition ${riwayatSubView === 'wrapped' ? 'bg-[#2d8d81] text-white shadow-sm' : 'text-slate-655'}`}>Wrapped 2026 🏆</button>
              </div>

              {riwayatSubView === 'home' ? (
                <div className="space-y-4 animate-fadeIn">
                  {/* Category Pills Filter — Brand Teal */}
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {['Semua', 'CEKAT Station', 'Nutrisi', 'Skrining Mandiri'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setRiwayatCategory(cat)}
                        className={`px-3.5 py-2 rounded-full border transition shrink-0 text-[11px] font-black ${
                          riwayatCategory === cat
                            ? 'bg-[#2d8d81] border-[#2d8d81] text-white shadow-md shadow-teal-500/20'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-[#2d8d81] hover:text-[#2d8d81]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Filtered Timeline List */}
                  {(() => {
                    const allLogs = [
                      {
                        id: 1,
                        type: 'CEKAT Station',
                        title: 'Hasil Cek Station - Puskesmas Ngabab',
                        date: '25 Agustus 2026',
                        tag: 'Puskesmas',
                        tagBg: 'bg-teal-50 text-[#2d8d81] border-teal-100',
                        details: [
                          { label: 'Tensi Darah', val: '140/85 mmHg', alert: true },
                          { label: 'Gula Darah', val: '85 mg/dL', alert: false },
                          { label: 'IMT', val: '24.03 kg/m²', alert: true },
                          { label: 'Nadi', val: '60 bpm', alert: false },
                        ]
                      },
                      {
                        id: 2,
                        type: 'Nutrisi',
                        title: 'Scan Gizi AI - Makan Siang',
                        date: '24 Agustus 2026',
                        tag: 'Nutrisi AI',
                        tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                        details: [
                          { label: 'Menu', val: 'Salad Sayur Segar', alert: false },
                          { label: 'Kalori', val: '187 kkal', alert: false },
                          { label: 'Karbo / Protein', val: '22g / 8g', alert: false },
                        ]
                      },
                      {
                        id: 3,
                        type: 'Skrining Mandiri',
                        title: 'Skrining Risiko Kesehatan Mandiri',
                        date: '20 Agustus 2026',
                        tag: 'Skrining',
                        tagBg: 'bg-amber-50 text-amber-700 border-amber-100',
                        details: [
                          { label: 'Status IMT', val: '24.03 (Overweight)', alert: true },
                          { label: 'Rekomendasi', val: 'Turunkan 2.1 kg ke ideal', alert: false },
                        ]
                      },
                      {
                        id: 4,
                        type: 'CEKAT Station',
                        title: 'Pemeriksaan Rutin - Pustu Ngabab',
                        date: '10 Juli 2026',
                        tag: 'Puskesmas',
                        tagBg: 'bg-teal-50 text-[#2d8d81] border-teal-100',
                        details: [
                          { label: 'Tensi Darah', val: '135/80 mmHg', alert: false },
                          { label: 'Gula Darah', val: '90 mg/dL', alert: false },
                        ]
                      },
                      {
                        id: 5,
                        type: 'Nutrisi',
                        title: 'Log Konsumsi Air & Nutrisi Harian',
                        date: '18 Agustus 2026',
                        tag: 'Nutrisi AI',
                        tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                        details: [
                          { label: 'Asupan Air', val: '2.1 Liter (8 Gelas)', alert: false },
                          { label: 'Target Nutrisi', val: 'Tercapai 100%', alert: false },
                        ]
                      }
                    ];

                    const filteredLogs = riwayatCategory === 'Semua'
                      ? allLogs
                      : allLogs.filter(log => log.type === riwayatCategory);

                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-black text-slate-900 px-1">
                          <span>
                            {riwayatCategory === 'Semua' ? 'Semua Catatan Riwayat' : riwayatCategory}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">({filteredLogs.length} catatan)</span>
                        </div>

                        {filteredLogs.length === 0 ? (
                          <div className="bg-white border border-slate-100 rounded-[28px] p-8 text-center text-slate-400 text-xs font-bold">
                            Belum ada riwayat pada kategori ini.
                          </div>
                        ) : (
                          filteredLogs.map(log => (
                            <div key={log.id} className="bg-white border border-slate-100 rounded-[24px] p-4 shadow-sm space-y-2.5 transition hover:shadow-md">
                              <div className="flex items-start justify-between">
                                <div>
                                  <span className={`text-[8.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${log.tagBg}`}>
                                    {log.tag}
                                  </span>
                                  <h4 className="text-xs font-black text-slate-900 mt-1">{log.title}</h4>
                                </div>
                                <span className="text-[9.5px] font-bold text-slate-400 shrink-0">{log.date}</span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-50">
                                {log.details.map((d, i) => (
                                  <div key={i} className="bg-slate-50/80 p-2 rounded-xl border border-slate-100/80">
                                    <span className="text-[9px] font-bold text-slate-450 block">{d.label}</span>
                                    <span className={`text-[11px] font-black block mt-0.5 ${d.alert ? 'text-rose-600' : 'text-slate-800'}`}>
                                      {d.val}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : (
                /* SUBVIEW B: CEKAT WRAPPED SCREEN (Screenshot 2) */
                <div className="bg-gradient-to-b from-yellow-400/90 via-[#2d8d81] to-emerald-950 text-white rounded-[32px] p-6 shadow-md space-y-4 animate-fadeIn border border-white/5">
                  <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-yellow-250 block">Your 2026 Nutrition Journey</span>
                  </div>

                  {/* Top 5 Makanan Favorit */}
                  <div className="bg-white rounded-2xl p-4.5 text-slate-900 space-y-3 shadow-md">
                    <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
                      <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Top 5 Makanan Favorit Kamu</h4>
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-bold text-slate-700">
                      <div>1. Salad Sayur</div>
                      <div>4. Grill Steak</div>
                      <div>2. Nasi Campur</div>
                      <div>5. Omlet</div>
                      <div>3. Nasi Goreng</div>
                    </div>
                  </div>

                  {/* NutriScore card */}
                  <div className="bg-white rounded-2xl p-4.5 text-slate-900 flex justify-between items-center shadow-md gap-4">
                    <div className="space-y-1 flex-1">
                      <h5 className="text-[10px] font-black text-[#2d8d81] leading-tight">Selamat Skor Nutrisi kamu Tahun ini 80/100</h5>
                      <span className="text-sm font-black text-slate-900 block pt-1 uppercase">Balanced</span>
                    </div>
                    <div className="w-16 h-16 shrink-0 bg-[#f5faf9] border border-teal-50 rounded-xl overflow-hidden shadow-inner flex items-center justify-center text-3xl">
                      ⚖️
                    </div>
                  </div>

                  {/* Gula card */}
                  <div className="bg-white rounded-2xl p-4.5 text-slate-900 flex justify-between items-center shadow-md">
                    <p className="text-xs font-bold text-slate-700 leading-normal">
                      Konsumsi Gula turun <span className="text-rose-600 font-extrabold">12%</span> dari Tahun lalu
                    </p>
                    <MoreHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>

                  {/* Sarapan card */}
                  <div className="bg-white rounded-2xl p-4.5 text-slate-900 flex justify-between items-center shadow-md">
                    <p className="text-xs font-bold text-slate-700 leading-normal">
                      Kamu termasuk <span className="text-emerald-700 font-extrabold">5%</span> Pengguna yang <span className="font-extrabold text-slate-900">paling Rajin Sarapan</span>
                    </p>
                    <MoreHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>

                  {/* Anniversary message */}
                  <div className="pt-2 text-center space-y-1">
                    <span className="text-[11px] font-black text-yellow-300 block">Selamat 1 TAHUN bersama CEKAT!</span>
                    <p className="text-[10px] text-teal-50 font-bold">Kamu Hebat, Tetap Semangat ya! 💚</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================= */}
          {/* TAB 5: PROFIL MOBILE VIEW               */}
          {/* ======================================= */}
          {activeTab === 'profil' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Profile Card */}
              <div className="bg-white border border-teal-50/50 rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] text-center space-y-4">
                <div className="w-24 h-24 rounded-full border-4 border-[#2d8d81] mx-auto overflow-hidden shadow-md">
                  <img src={userAvatarImage} alt="Sofia Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">Sofia Kusuma</h3>
                  <span className="text-xs text-slate-450 font-bold block mt-1">NIK: 3174XXXXXXXX0002</span>
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-100 mt-2.5 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 fill-emerald-100" />
                    <span>Terintegrasi BPJS Kes</span>
                  </span>
                </div>

                {/* Profile physical metrics chips (Image 5 style) */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-2xl">
                    <span className="text-[9px] font-extrabold text-[#2d8d81] uppercase block">Usia</span>
                    <span className="text-sm font-black text-slate-800 block mt-0.5">28 Thn</span>
                  </div>
                  <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-2xl">
                    <span className="text-[9px] font-extrabold text-amber-700 uppercase block">Berat</span>
                    <span className="text-sm font-black text-slate-800 block mt-0.5">60 kg</span>
                  </div>
                  <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-2xl">
                    <span className="text-[9px] font-extrabold text-rose-700 uppercase block">Tinggi</span>
                    <span className="text-sm font-black text-slate-800 block mt-0.5">158 cm</span>
                  </div>
                </div>
              </div>

              {/* Faskes Details Card */}
              <div className="bg-white border border-teal-50/50 rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-3.5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-50">Informasi Faskes & Program</h4>
                <div className="space-y-2.5 text-xs text-slate-700 font-bold">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-teal-50 text-[#2d8d81] flex items-center justify-center shrink-0 text-[10px]">✓</div>
                    <p className="leading-normal">Fasilitas Kesehatan: <span className="font-black text-slate-900">Puskesmas Pembantu Ngabab</span></p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-teal-50 text-[#2d8d81] flex items-center justify-center shrink-0 text-[10px]">✓</div>
                    <p className="leading-normal">Program Pendampingan: <span className="font-black text-slate-900">Pencegahan Risiko Hipertensi & Stunting</span></p>
                  </div>
                </div>
              </div>

              {/* Settings / Profile actions (Image 5 style list) */}
              <div className="bg-white border border-teal-50/50 rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-2">
                {[
                  { name: 'Ubah Data Fisik & Profil', icon: User, action: () => alert('Membuka pengaturan profil fisik...') },
                  { name: 'Riwayat Screening PTM', icon: ClipboardList, action: () => { setActiveTab('riwayat'); setRiwayatSubView('home'); } },
                  { name: 'Hubungkan Kartu BPJS', icon: Award, action: () => alert('Menghubungkan BPJS Kesehatan...') },
                  { name: 'Pengaturan Notifikasi', icon: Activity, action: () => alert('Membuka pengaturan notifikasi...') }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx} 
                      onClick={item.action}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 active:scale-98 transition cursor-pointer border border-transparent hover:border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">{item.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* 
          Floating Bottom Navigation Bar for Mobile with Concave Wave Dip & Centered Action FAB
          Adopted exactly from the user's reference image structure.
          Baseline height: 75px. Smooth cubic bezier dip in center for the floating button.
        */}
        <div className="fixed bottom-0 left-0 right-0 z-40 block md:hidden max-w-md mx-auto">
          <div className="relative w-full h-[85px] bg-transparent">
            
            {/* 
              Concave Wave SVG Background: Draws a smooth dip in the center.
              Colors restored to original CEKAT teal (#2d8d81)
            */}
            <svg 
              viewBox="0 0 400 85" 
              preserveAspectRatio="none" 
              className="absolute bottom-0 w-full h-[80px] text-[#2d8d81] fill-current drop-shadow-[0_-8px_24px_rgba(45,141,129,0.12)]"
            >
              <path d="M 0 15 
                       C 110 15, 145 15, 160 15 
                       C 175 15, 175 52, 200 52 
                       C 225 52, 225 15, 240 15 
                       C 255 15, 290 15, 400 15 
                       L 400 85 
                       L 0 85 
                       Z" />
            </svg>
            
            {/* 
              Floating Action Button (FAB): Scan Gizi (Camera)
              Floats exactly in the center of the concave dip, matching the reference images
            */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 z-50">
              <button 
                onClick={() => { 
                  setActiveTab('nutrisi'); 
                  setNutrisiSubView('scan_camera');
                  nav('nutrisi', 'scan_camera');
                }}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#3fa89b] to-[#50c0b2] text-white flex items-center justify-center shadow-lg shadow-teal-500/35 hover:scale-105 active:scale-95 transition-all duration-200 border-4 border-white"
                aria-label="Scan Gizi AI"
              >
                <Camera className="w-5.5 h-5.5 text-white" />
              </button>
            </div>

            {/* 
              Tabs Grid Overlay: Excludes center which holds the FAB
            */}
            <div className="absolute bottom-0 left-0 w-full h-[65px] flex justify-between items-center px-6 z-40 text-white font-bold">
              
              {/* Tab 1: Beranda */}
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setDashboardSubView('home');
                  nav('dashboard');
                }}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition duration-200 ${
                  activeTab === 'dashboard' && dashboardSubView === 'home' ? 'text-yellow-350 scale-105' : 'text-teal-100 hover:text-white opacity-85'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[8.5px] mt-1 font-semibold">Beranda</span>
              </button>

              {/* Tab 2: Riwayat */}
              <button
                onClick={() => {
                  setActiveTab('riwayat');
                  setRiwayatSubView('home');
                  nav('riwayat');
                }}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition duration-200 ${
                  activeTab === 'riwayat' && riwayatSubView === 'home' ? 'text-yellow-350 scale-105' : 'text-teal-100 hover:text-white opacity-85'
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                <span className="text-[8.5px] mt-1 font-semibold">Riwayat</span>
              </button>

              {/* Spacer in grid to prevent overlapping center FAB */}
              <div className="w-16 flex-none"></div>

              {/* Tab 3: Challenge */}
              <button
                onClick={() => {
                  setActiveTab('challenge');
                  setChallengeSubView('home');
                  nav('challenge', 'home');
                }}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition duration-200 ${
                  activeTab === 'challenge' ? 'text-yellow-350 scale-105' : 'text-teal-100 hover:text-white opacity-85'
                }`}
              >
                <Zap className="w-5 h-5" />
                <span className="text-[8.5px] mt-1 font-semibold">Misi</span>
              </button>

              {/* Tab 4: Profil */}
              <button
                onClick={() => {
                  setActiveTab('profil');
                  nav('profil');
                }}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition duration-200 ${
                  activeTab === 'profil' ? 'text-yellow-350 scale-105' : 'text-teal-100 hover:text-white opacity-85'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-[8.5px] mt-1 font-semibold">Profil</span>
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function CekatApp2Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-teal-50/50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-teal-850">Memuat CEKAT App...</span>
        </div>
      </div>
    }>
      <CekatApp2PageContent />
    </Suspense>
  );
}
