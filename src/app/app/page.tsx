'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home,
  Camera, 
  Flame, 
  Apple, 
  Scale, 
  Activity, 
  Plus, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Brain,
  Search,
  CheckCircle,
  AlertCircle,
  Calendar,
  AlertTriangle,
  User,
  Heart,
  Droplet,
  Compass,
  Zap,
  Play,
  ClipboardList,
  MessageCircle,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Info,
  Lock,
  Eye,
  EyeOff,
  Bell,
  ArrowLeft,
  MoreHorizontal,
  BookOpen,
  CalendarDays,
  Gamepad2,
  ListTodo,
  ShoppingCart,
  Stethoscope,
  Pill,
  Star,
  Award,
  Trophy,
  Sparkle,
  Phone,
  LogOut,
  Sparkles as SparklesIcon
} from 'lucide-react';
import Link from 'next/link';
import DashboardPage from '../dashboard/page';

export default function CekatApp() {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulator navigation states
  const [appState, setAppState] = useState<'splash' | 'welcome' | 'login' | 'main'>('main');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'nutrisi' | 'challenge' | 'riwayat' | 'profil'>('dashboard');
  
  // Sub-views for detailed pages
  // - For 'dashboard': 'home' (Kebutuhanmu), 'station_summary' (Hasil Station), 'cek_risiko' (Risiko Kesehatan), 'reminders' (Pengingat & Jadwal), 'marketplace' (Keranjangmu)
  const [dashboardSubView, setDashboardSubView] = useState<'home' | 'station_summary' | 'cek_risiko' | 'reminders' | 'marketplace' | 'edukasi'>('home');
  
  // - For 'nutrisi': 'main' (Nutrisi Harianmu), 'scan_camera' (Camera scanner), 'scan_result' (Score & details), 'charts' (IMT & Charts), 'pantry' (Kulkas resep)
  const [nutrisiSubView, setNutrisiSubView] = useState<'main' | 'scan_camera' | 'scan_result' | 'charts' | 'pantry'>('main');
  
  // - For 'challenge': 'home' (Langkah Sehatmu), 'misi' (7-Day challenge)
  const [challengeSubView, setChallengeSubView] = useState<'home' | 'misi'>('home');
  
  // - For 'riwayat': 'home' (Riwayat List), 'wrapped' (Cekat Wrapped)
  const [riwayatSubView, setRiwayatSubView] = useState<'home' | 'wrapped'>('home');

  // Kebutuhanmu popup list toggle
  const [showKebutuhanmu, setShowKebutuhanmu] = useState<boolean>(false);

  // Login states
  const [emailOrPhone, setEmailOrPhone] = useState<string>('812345678');
  const [nik, setNik] = useState<string>('3174XXXXXXXX0002');
  const [password, setPassword] = useState<string>('password123');

  // Pantry AI selected ingredients
  const [selectedPantryTags, setSelectedPantryTags] = useState<string[]>(['Telur', 'Ayam', 'Sayur']);
  const pantryTagsList = ['Telur', 'Ikan', 'Ayam', 'Sayur', 'Daging', 'Tempe', 'Wortel'];
  
  // Pantry AI active category filter
  const [pantryCategory, setPantryCategory] = useState<string>('Semua');

  // Search query for marketplace & recipes
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Scanning animation states
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Misi / Challenge checkbox states
  const [missions, setMissions] = useState([
    { id: 1, text: 'Minum air sesuai target', done: true },
    { id: 2, text: 'Aktivitas fisik 30 menit', done: true },
    { id: 3, text: 'Makan sayur 2x sehari', done: true },
    { id: 4, text: 'Kurangi minuman manis', done: true },
    { id: 5, text: 'Tidur cukup 7-8 jam', done: true },
    { id: 6, text: 'Kurangi makanan tinggi garam', done: false },
    { id: 7, text: 'Food Scan 3x seminggu', done: false }
  ]);

  const toggleMission = (id: number) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m));
  };

  // Focus targets for Langkah Sehatmu
  const [focusTargets, setFocusTargets] = useState([
    { id: 1, text: 'Kurangi makanan/minuman manis', done: true },
    { id: 2, text: 'Aktivitas fisik minimal 30 menit/hari', done: true },
    { id: 3, text: 'Tambahkan sayur pada makanan utama', done: true }
  ]);

  const toggleFocus = (id: number) => {
    setFocusTargets(prev => prev.map(f => f.id === id ? { ...f, done: !f.done } : f));
  };

  // Food log data that can be added to timeline
  const [foodLogs, setFoodLogs] = useState([
    {
      id: 'log-1',
      title: 'Nutrisi & Scan Makanan',
      subtitle: 'Salad Ayam',
      calories: '327 kkal',
      score: 'GOOD',
      time: '30 Agustus 2026 08.30'
    }
  ]);

  // Handle adding custom scanned food
  const handleSaveScanResult = () => {
    const newLog = {
      id: `log-${Date.now()}`,
      title: 'Nutrisi & Scan Makanan',
      subtitle: 'Salad Sayur Segar',
      calories: '307 kkal',
      score: 'GOOD',
      time: 'Hari ini 12.30'
    };
    setFoodLogs([newLog, ...foodLogs]);
    setNutrisiSubView('main');
    setActiveTab('riwayat');
    setRiwayatSubView('home');
  };

  // Auto transition for splash screen if set to splash
  useEffect(() => {
    if (appState === 'splash') {
      const timer = setTimeout(() => {
        setAppState('welcome');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  // Helper function to easily switch sub-views from external panel
  const jumpToScreen = (tab: any, subview: any) => {
    setActiveTab(tab);
    if (tab === 'dashboard') setDashboardSubView(subview);
    if (tab === 'nutrisi') setNutrisiSubView(subview);
    if (tab === 'challenge') setChallengeSubView(subview);
    if (tab === 'riwayat') setRiwayatSubView(subview);
  };

  // Recipe list data for Pantry AI
  const recipes = [
    {
      name: 'Nasi Campur Komplit Bergizi',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
      category: 'Ayam',
      tag: 'Nasi Campur'
    },
    {
      name: 'Nasi Goreng Ayam Katsu',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
      category: 'Ayam',
      tag: 'Nasi Goreng'
    },
    {
      name: 'Salad Sayur Segar',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
      category: 'Sayur',
      tag: 'Salad Sayur'
    },
    {
      name: 'Salad Sayur Beef Cheese',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80',
      category: 'Daging',
      tag: 'Salad Sayur'
    },
    {
      name: 'Salad Buah Creamy',
      image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=400&q=80',
      category: 'Sayur',
      tag: 'Salad Buah'
    },
    {
      name: 'Grill Steak',
      image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=400&q=80',
      category: 'Daging',
      tag: 'Grill Steak'
    },
    {
      name: 'Omlet Mewah Rumahan',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80',
      category: 'Telur',
      tag: 'Omlet'
    }
  ];

  // Filtered recipes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = pantryCategory === 'Semua' || recipe.category === pantryCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#f7f9f6] flex items-center justify-center text-emerald-600 font-sans text-xs">
        <div className="flex flex-col items-center gap-3">
          <Activity className="w-6 h-6 animate-spin text-emerald-600" />
          <span className="font-bold">Memuat Cekat...</span>
        </div>
      </div>
    );
  }

  if (!isMobile) {
    return <DashboardPage />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Background aesthetic blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 
        ========================================================================
        DESKTOP LEFT: CONTROL PANEL (Jump directly to any PWA sub-view)
        ========================================================================
      */}
      <div className="hidden md:flex md:w-5/12 lg:w-4/12 flex-col justify-between p-8 border-r border-slate-800 bg-slate-900/40 backdrop-blur z-20 overflow-y-auto max-h-screen">
        <div className="space-y-6">
          {/* Cekat Brand header */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 shadow-md">
              <img src="/landing/cekat_logo.png" alt="Cekat Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                <span>Cekat App</span>
                <span className="text-[9px] bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-bold px-1.5 py-0.5 rounded uppercase">Simulator</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cek • Kenali • Tindaklanjuti</p>
            </div>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 rounded-2xl space-y-2 text-xs text-emerald-300 leading-relaxed text-left">
            <p className="font-bold flex items-center gap-1.5 text-emerald-200">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Satu Aplikasi Terintegrasi Kemkes</span>
            </p>
            <p className="text-[11px] text-slate-350 leading-relaxed">
              Simulator ini menampilkan prototipe PWA interaktif mobile persis seperti rancangan UI asli. Gunakan menu kontrol cepat di bawah ini untuk berpindah halaman secara instan di simulator sebelah kanan.
            </p>
          </div>

          {/* Quick jump actions lists */}
          <div className="space-y-3">
            <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase block text-left">KONTROL NAVIGASI CEPAT</span>
            
            <div className="space-y-2.5">
              {/* Beranda Pages */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase block px-1 text-left">Tab 1: Beranda</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={() => jumpToScreen('dashboard', 'home')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'dashboard' && dashboardSubView === 'home'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🏠 Menu Kebutuhanmu
                  </button>
                  <button 
                    onClick={() => jumpToScreen('dashboard', 'station_summary')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'dashboard' && dashboardSubView === 'station_summary'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🏥 Hasil Kiosk Station
                  </button>
                  <button 
                    onClick={() => jumpToScreen('dashboard', 'cek_risiko')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'dashboard' && dashboardSubView === 'cek_risiko'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    ⚠️ Cek Risiko Kesehatan
                  </button>
                  <button 
                    onClick={() => jumpToScreen('dashboard', 'reminders')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'dashboard' && dashboardSubView === 'reminders'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    ⏰ Pengingat & Jadwal
                  </button>
                  <button 
                    onClick={() => jumpToScreen('dashboard', 'marketplace')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'dashboard' && dashboardSubView === 'marketplace'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🛒 Keranjang / Apotek
                  </button>
                </div>
              </div>

              {/* Nutrisi Pages */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase block px-1 text-left">Tab 2: Nutrisi</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={() => jumpToScreen('nutrisi', 'main')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'nutrisi' && nutrisiSubView === 'main'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🥗 Nutrisi Harianmu
                  </button>
                  <button 
                    onClick={() => jumpToScreen('nutrisi', 'scan_camera')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'nutrisi' && nutrisiSubView === 'scan_camera'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    📸 Kamera AI Scanner
                  </button>
                  <button 
                    onClick={() => jumpToScreen('nutrisi', 'charts')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'nutrisi' && nutrisiSubView === 'charts'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    📊 Grafik & IMT
                  </button>
                  <button 
                    onClick={() => jumpToScreen('nutrisi', 'pantry')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'nutrisi' && nutrisiSubView === 'pantry'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🍳 Pantry Kulkas AI
                  </button>
                </div>
              </div>

              {/* Challenge / Riwayat Pages */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase block px-1 text-left">Tab 3 & 4: Challenge & Riwayat</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={() => jumpToScreen('challenge', 'home')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'challenge' && challengeSubView === 'home'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    👣 Langkah Sehatmu
                  </button>
                  <button 
                    onClick={() => jumpToScreen('challenge', 'misi')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'challenge' && challengeSubView === 'misi'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                  }`}
                  >
                    👾 Misi & Challenge
                  </button>
                  <button 
                    onClick={() => jumpToScreen('riwayat', 'home')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'riwayat' && riwayatSubView === 'home'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    📜 Riwayat Timeline
                  </button>
                  <button 
                    onClick={() => jumpToScreen('riwayat', 'wrapped')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'riwayat' && riwayatSubView === 'wrapped'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🎉 CEKAT Wrapped 2026
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop control panel footer */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-bold">
          <span>Kementerian Kesehatan RI • 2026</span>
          <Link href="/dashboard" className="text-emerald-500 hover:underline flex items-center gap-0.5">
            <span>Portal Utama</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 
        ========================================================================
        DESKTOP RIGHT / MOBILE: SMARTPHONE SIMULATOR FRAME OR NATIVE VIEW
        ========================================================================
      */}
      <div className="flex-1 flex items-center justify-center p-0 md:p-6 bg-slate-950">
        
        {/* Smartphone Wrapper Bezel (Hidden on Mobile screens, active on md and up) */}
        <div className="w-full max-w-md md:h-[824px] md:rounded-[45px] md:border-[10px] md:border-slate-800 md:bg-slate-950 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] md:ring-4 md:ring-slate-900 md:relative md:overflow-hidden flex flex-col justify-between">
          
          {/* Camera Notch on Desktop simulation */}
          <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-50 pointer-events-none">
            <div className="absolute right-6 top-1.5 w-3 h-3 bg-slate-900 rounded-full border border-slate-800"></div>
          </div>

          {/* Core Simulator viewport container */}
          <div className="flex-1 flex flex-col justify-between bg-[#f7f9f6] text-slate-800 relative w-full h-full overflow-y-auto md:max-h-[804px] select-none">
            
            {/* 1. SPLASH SCREEN */}
            {appState === 'splash' && (
              <div className="flex-1 min-h-[600px] flex flex-col items-center justify-between py-24 px-8 bg-gradient-to-b from-[#22c55e] via-white to-[#cbd52d]/30 text-center animate-fadeIn">
                <div />
                <div className="space-y-4 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border border-emerald-100 p-4">
                    <img src="/landing/cekat_logo.png" alt="Cekat Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-4xl font-extrabold tracking-tight text-emerald-800">Cekat</h1>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Cek. Kenali. Tindaklanjuti</p>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Kemkes RI Integrated • PWA v1.0
                </div>
              </div>
            )}

            {/* 2. WELCOME SCREEN */}
            {appState === 'welcome' && (
              <div className="flex-1 min-h-[600px] flex flex-col justify-between relative bg-white animate-fadeIn">
                <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('/landing/hero_doctor_banner.jpg')` }} />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-emerald-600/70 to-emerald-800/90" />

                <div className="relative z-10 flex-1 flex flex-col justify-between py-16 px-8 text-center text-white">
                  <div className="space-y-2 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center border border-emerald-100 p-2">
                      <img src="/landing/cekat_logo.png" alt="Cekat Logo" className="w-full h-full object-contain animate-pulse" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-250">Kesehatan Preventif Mandiri</span>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Selamat Datang di</span>
                      <h2 className="text-4xl font-extrabold tracking-tight text-white">CEKAT</h2>
                      <p className="text-xs text-emerald-100 leading-relaxed font-semibold max-w-xs mx-auto">
                        Ketahui profil risiko Penyakit Tidak Menular (PTM) Anda secara dini dan ikuti program preventif pola makan gizi seimbang.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button 
                        onClick={() => setAppState('login')}
                        className="w-full py-3 bg-white text-emerald-800 font-extrabold rounded-full shadow-md text-sm hover:bg-slate-50 transition active:scale-98"
                      >
                        Mulai dengan Email / No HP
                      </button>
                    </div>

                    <div className="text-xs font-semibold text-emerald-100">
                      Sudah mempunyai akun? <button onClick={() => setAppState('login')} className="underline text-white font-black">Masuk</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. LOGIN SCREEN */}
            {appState === 'login' && (
              <div className="flex-1 min-h-[600px] flex flex-col justify-between bg-white px-8 py-12 animate-fadeIn">
                <div className="space-y-6 text-left">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tight text-slate-800">Masuk ke CEKAT</h2>
                    <p className="text-xs text-slate-500 font-semibold">Gunakan akun terdaftar Anda untuk memantau rekam gizi fisik.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Email / Nomor HP</label>
                      <input 
                        type="text" 
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="812345678"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none text-slate-850"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">NIK (Nomor Induk Kependudukan)</label>
                      <input 
                        type="text" 
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="3174XXXXXXXX0002"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none text-slate-850"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Kata Sandi</label>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none text-slate-850"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setAppState('main')}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full text-sm shadow-md transition active:scale-98"
                  >
                    Masuk
                  </button>
                </div>
                
                <div className="text-center text-xs font-semibold text-slate-450">
                  Kemkes RI Integrated Secure Verification
                </div>
              </div>
            )}

            {/* 4. MAIN CORE APPLICATION */}
            {appState === 'main' && (
              <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                
                {/* -------------------------------------------------------------
                    TAB 1: BERANDA / HOME (Kebutuhanmu, Station, Risiko, Reminders, Cart)
                    ------------------------------------------------------------- */}
                {activeTab === 'dashboard' && (
                  <div className="flex-1 flex flex-col justify-between animate-fadeIn pb-20">
                    
                    {/* View: Beranda / Kebutuhanmu (Hi Sofia!) */}
                    {dashboardSubView === 'home' && (
                      <div className="flex-1 flex flex-col space-y-5 overflow-y-auto pb-24 text-left relative">
                        {/* Header yellow-to-green gradient with logo, notification, and centered name badge */}
                        <div className="bg-gradient-to-r from-[#f1c40f] to-[#10b981] text-white rounded-b-[40px] px-5 pt-8 pb-7 shadow-md text-left relative shrink-0">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5">
                                <span className="text-[10.5px] font-black text-[#10b981] leading-none">C</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-black tracking-tight text-white uppercase leading-none">Cekat</span>
                                <span className="text-[5.5px] font-bold text-white/90 uppercase tracking-widest leading-none mt-0.5">Cerdas Sehat Terkendali</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => setDashboardSubView('reminders')}
                              className="relative p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
                            >
                              <Bell className="w-5 h-5" />
                              <span className="absolute top-0 right-0 w-3 h-3 bg-rose-600 rounded-full border border-white text-[7px] font-black flex items-center justify-center text-white">1</span>
                            </button>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center shrink-0">
                              <div className="w-16 h-16 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Sofia Profile" className="w-full h-full object-cover" />
                              </div>
                              <div className="bg-white px-3 py-0.5 rounded-full shadow-sm border border-slate-100 -mt-2.5 z-10">
                                <span className="text-[9.5px] font-black text-slate-800 uppercase block tracking-wider">Sofia</span>
                              </div>
                            </div>
                            <div className="space-y-0.5 pr-2">
                              <h3 className="text-lg font-black text-white leading-tight">Hi Sofia!</h3>
                              <p className="text-[12px] text-white/95 font-semibold leading-snug">
                                Yuk lebih mengenal dirimu, sehat itu mahal, mari mulai hidup sehat dari langkah kecil setiap hari
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Sudah cek kesehatan di CEKAT Station? Promo Banner Card */}
                        <div className="mx-4 mt-1 shrink-0">
                          <div 
                            onClick={() => setDashboardSubView('station_summary')}
                            className="bg-gradient-to-br from-[#81c784] via-[#2e7d32] to-[#1b5e20] text-white p-4.5 rounded-3xl flex items-center justify-between shadow-sm cursor-pointer hover:brightness-105 transition relative overflow-hidden text-left"
                          >
                            {/* Absolute green patterns */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8"></div>
                            
                            {/* Left side: Premium Sloped Kiosk Station SVG */}
                            <div className="w-20 h-32 shrink-0 relative flex items-center justify-center select-none hover:scale-105 transition transform duration-300 -mt-1">
                              <svg width="80" height="120" viewBox="0 14 80 102" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                                {/* Base Stand (3D skewed trapezoid) */}
                                <path d="M 22 100 L 58 100 L 66 108 L 14 108 Z" fill="url(#baseGrad)" stroke="#B2BABB" strokeWidth="1"/>
                                {/* Base shadow */}
                                <ellipse cx="40" cy="111" rx="26" ry="3" fill="black" fillOpacity="0.25" filter="blur(2px)"/>
                                
                                {/* Vertical Column Body */}
                                <path d="M 26 58 L 54 58 L 54 100 L 26 100 Z" fill="url(#bodyGrad)" stroke="#BDC3C7" strokeWidth="0.5"/>
                                <path d="M 26 58 L 30 58 L 30 100 L 26 100 Z" fill="#FFFFFF" opacity="0.6"/> {/* Highlight line */}

                                {/* Sloped Head connector */}
                                <path d="M 22 58 L 58 58 L 54 62 L 26 62 Z" fill="#7F8C8D" />

                                {/* Sloped Screen Head (3D perspective sloped trapezoid) */}
                                <path d="M 18 28 L 62 28 L 54 58 L 26 58 Z" fill="url(#headGrad)" stroke="#BDC3C7" strokeWidth="0.5"/>
                                <path d="M 18 28 L 22 28 L 29 58 L 26 58 Z" fill="#FFFFFF" opacity="0.4"/> {/* Highlight line */}
                                
                                {/* Screen Glass Panel (Sloped) */}
                                <path d="M 21 32 L 59 32 L 52 54 L 28 54 Z" fill="url(#screenGrad)" stroke="#2C3E50" strokeWidth="1.5"/>
                                
                                {/* Screen Header */}
                                <path d="M 22 34 L 58 34 L 56 38 L 24 38 Z" fill="#1B5E20" opacity="0.9"/>
                                <text x="40" y="37.5" fontFamily="sans-serif" fontSize="2.8" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">CEKAT STATION</text>
                                
                                {/* Glowing Scan Line */}
                                <path d="M 25 43 L 55 43" stroke="#00FFCC" strokeWidth="0.8" strokeLinecap="round" opacity="0.8">
                                  <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                                </path>

                                {/* Ready Status Text */}
                                <text x="40" y="49" fontFamily="sans-serif" fontSize="4.5" fontWeight="900" fill="#00FFCC" textAnchor="middle" filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.5))">READY</text>

                                {/* Gradients definitions */}
                                <defs>
                                  <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#EAEDED"/>
                                    <stop offset="100%" stopColor="#95A5A6"/>
                                  </linearGradient>
                                  <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#FFFFFF"/>
                                    <stop offset="100%" stopColor="#D5D8DC"/>
                                  </linearGradient>
                                  <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#FFFFFF"/>
                                    <stop offset="100%" stopColor="#BDC3C7"/>
                                  </linearGradient>
                                  <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#1B5E20"/>
                                    <stop offset="100%" stopColor="#10B981"/>
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>

                            {/* Right side: Information */}
                            <div className="flex-1 pl-4 space-y-1.5 z-10 flex flex-col justify-between h-full">
                              <div>
                                <h4 className="text-[16px] font-black leading-snug tracking-tight">Sudah cek kesehatan di CEKAT Station?</h4>
                                <p className="text-[11.5px] text-emerald-100 font-semibold leading-tight mt-0.5">
                                  Lihat hasil pemeriksaan dan lanjutkan perjalanan sehatmu di CEKAT App!
                                </p>
                              </div>
                              
                              <div className="space-y-0.5">
                                <span className="text-[11px] font-black block text-emerald-200">Faskes Terdekat</span>
                                <div className="flex items-center space-x-1">
                                  <span className="text-[11px]">📍</span>
                                  <span className="text-[12px] font-black text-white">Puskesmas Pembantu Ds. Ngabab</span>
                                </div>
                                <span className="text-[10px] font-semibold text-emerald-250 block">Buka 08.00-14.00</span>
                              </div>

                              <div className="text-right -mt-1">
                                <span className="text-[12.5px] font-black hover:underline cursor-pointer">Lihat Hasil &gt;</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Circular 6-item Grid Menu */}
                        <div className="mx-4 mt-2 shrink-0">
                          <div className="grid grid-cols-3 gap-y-5 gap-x-2">
                            {/* Item 1: Edukasi Kesehatanmu */}
                            <div 
                              onClick={() => setDashboardSubView('edukasi')}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className="w-[76px] h-[76px] rounded-full bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5">
                                <img src="/images/icon_edukasi.jpg" alt="Edukasi" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Edukasi Kesehatanmu</span>
                            </div>

                            {/* Item 2: Cek Risiko Kesehatan */}
                            <div 
                              onClick={() => setDashboardSubView('cek_risiko')}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className="w-[76px] h-[76px] rounded-full bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5">
                                <img src="/images/icon_risiko.jpg" alt="Cek Risiko" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Cek Risiko Kesehatan</span>
                            </div>

                            {/* Item 3: Langkah Sehatmu */}
                            <div 
                              onClick={() => {
                                setActiveTab('challenge');
                                setChallengeSubView('home');
                              }}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className="w-[76px] h-[76px] rounded-full bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5">
                                <img src="/images/icon_langkah.jpg" alt="Langkah" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Langkah Sehatmu</span>
                            </div>

                            {/* Item 4: Kebutuhanmu */}
                            <div 
                              onClick={() => setShowKebutuhanmu(prev => !prev)}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className={`w-[76px] h-[76px] rounded-full border flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5 ${showKebutuhanmu ? 'bg-amber-350 border-amber-500' : 'bg-[#EAEAEA] border-[#CCCCCC]/30'}`}>
                                <img src="/images/icon_kebutuhan.jpg" alt="Kebutuhan" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Kebutuhanmu</span>
                            </div>

                            {/* Item 5: Pengingat & Jadwal */}
                            <div 
                              onClick={() => setDashboardSubView('reminders')}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className="w-[76px] h-[76px] rounded-full bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5">
                                <img src="/images/icon_pengingat.jpg" alt="Pengingat" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Pengingat & Jadwal</span>
                            </div>

                            {/* Item 6: Games */}
                            <div 
                              onClick={() => alert('Membuka Mini Games Sehat...')}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className="w-[76px] h-[76px] rounded-full bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5">
                                <img src="/images/icon_games.jpg" alt="Games" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Games</span>
                            </div>
                          </div>
                        </div>

                        {/* Slide-down Kebutuhanmu list (visible when clicked) */}
                        {showKebutuhanmu && (
                          <div className="mx-4 p-4 bg-slate-50 border border-slate-200 rounded-3xl text-left space-y-3 animate-fadeIn shrink-0">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 px-1">
                              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Layanan Kebutuhanmu</span>
                              <button 
                                onClick={() => setShowKebutuhanmu(false)}
                                className="text-[10px] font-black text-slate-400 hover:text-slate-650 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full shadow-xs"
                              >
                                Tutup
                              </button>
                            </div>
                            <div className="space-y-3">
                              {/* 1. Konsultasi */}
                              <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-xs">
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 animate-pulse">
                                    <Stethoscope className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="text-[10.5px] font-black text-slate-800 leading-none">Konsultasi</h4>
                                    <p className="text-[8px] text-slate-400 font-semibold leading-tight mt-1">Tanya dokter/ahli gizi</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => alert('Menghubungkan ke Ahli Gizi Terverifikasi...')}
                                  className="px-3 py-1 bg-emerald-600 text-white text-[8px] font-black rounded-full uppercase transition"
                                >
                                  Mulai
                                </button>
                              </div>

                              {/* 2. Keranjangmu */}
                              <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-xs">
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                    <ShoppingCart className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="text-[10.5px] font-black text-slate-800 leading-none">Keranjangmu</h4>
                                    <p className="text-[8px] text-slate-400 font-semibold leading-tight mt-1">Beli obat & vitamin</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => setDashboardSubView('marketplace')}
                                  className="px-3 py-1 bg-emerald-600 text-white text-[8px] font-black rounded-full uppercase transition"
                                >
                                  Beli
                                </button>
                              </div>

                              {/* 3. Obat Saya */}
                              <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-xs">
                                <div className="flex items-center space-x-3 text-left">
                                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                    <Pill className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="text-[10.5px] font-black text-slate-800 leading-none">Obat Saya</h4>
                                    <p className="text-[8px] text-slate-400 font-semibold leading-tight mt-1">Jadwal & Riwayat obat</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => setDashboardSubView('reminders')}
                                  className="px-3 py-1 bg-emerald-600 text-white text-[8px] font-black rounded-full uppercase transition"
                                >
                                  Jadwal
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Floating help bot inline */}
                        <div className="absolute bottom-[80px] right-3 z-30 flex flex-col items-end pointer-events-none">
                          <div className="bg-amber-400 text-slate-900 font-black text-[9px] rounded-full px-2 py-0.5 border border-white shadow-md animate-pulse mb-1">💡</div>
                          <div className="w-10 h-10 rounded-full bg-[#10b981] border-2 border-white shadow-lg flex items-center justify-center text-xl animate-bounce">🤖</div>
                        </div>
                      </div>
                    )}

                    {/* View: Station Summary (Ringkasan Hasil CEKAT Station) */}
                    {dashboardSubView === 'station_summary' && (
                      <div className="space-y-6 flex-1 flex flex-col justify-between pb-20">
                        {/* Custom Header matching screenshots */}
                        <div className="bg-white border-b border-slate-100 px-4 pt-8 pb-3 flex items-center justify-between shadow-xs">
                          <button onClick={() => setDashboardSubView('home')} className="p-1 hover:bg-slate-50 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-700" />
                          </button>
                          <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-1">
                              <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center p-0.5">
                                <span className="text-[10px] font-black text-white leading-none">C</span>
                              </div>
                              <span className="text-sm font-black text-slate-800 tracking-tight leading-none">Cekat</span>
                            </div>
                            <span className="text-[6.5px] font-black text-emerald-600 uppercase tracking-widest leading-none mt-0.5">Cek • Kenali • Tindaklanjuti</span>
                          </div>
                          <button className="p-1 hover:bg-slate-50 rounded-full transition text-slate-600">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex-1 px-5 space-y-4 overflow-y-auto">
                          {/* Shadowed Title centered */}
                          <div className="text-center mt-2">
                            <h3 className="text-base font-black text-slate-800 tracking-tight drop-shadow-sm">Ringkasan Hasil CEKAT Station</h3>
                          </div>

                          <div className="text-left text-xs space-y-0.5 px-1">
                            <span className="font-black text-slate-800 block">Hi, Sofia</span>
                            <span className="text-[10.5px] font-semibold text-slate-500 block leading-tight">Berikut hasil pemeriksaan Kamu hari ini.</span>
                          </div>

                          {/* Risk Status Card */}
                          <div className="p-4 bg-[#E8F5E9] border border-[#C8E6C9] rounded-3xl text-left shadow-xs">
                            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block mb-2">Status Risiko Kamu</span>
                            <div className="flex items-start space-x-3">
                              <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-white text-lg shrink-0 font-black shadow-sm">!</div>
                              <div className="flex-1">
                                <span className="text-xs font-black text-slate-850 block leading-none">Perlu Perhatian</span>
                                <span className="text-[9.5px] font-semibold text-slate-650 block leading-tight mt-1">Jaga pola hidup sehat dan lakukan pemantauan rutin.</span>
                                <span className="text-[7.5px] text-slate-400 font-bold block mt-2">Diperbarui: 30 Agustus 2026 • 09:30 WIB</span>
                              </div>
                            </div>
                          </div>

                          {/* Indicators list */}
                          <div className="text-left">
                            <span className="text-xs font-black text-slate-700 block mb-2.5 px-1">Indikator Pemeriksaan</span>
                            <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-3xl p-4 shadow-xs space-y-3.5">
                              {/* Row 1: Tekanan Darah */}
                              <div className="flex items-center justify-between pb-3 border-b border-emerald-100/50">
                                <div className="flex items-center space-x-3">
                                  <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden">
                                    <img src="/images/ind_tensi.jpg" alt="Tekanan Darah" className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-0.5">Tekanan Darah</span>
                                    <span className="text-[15px] font-black text-slate-800 leading-tight">140 / 85 <span className="text-[10px] text-slate-400 font-semibold">mmHg</span></span>
                                  </div>
                                </div>
                                <span className="text-[8.5px] font-black bg-[#FDF2E9] text-[#A04000] px-2.5 py-1 rounded-full border border-[#F5CBA7] shrink-0">Perlu Perhatian</span>
                              </div>

                              {/* Row 2: Gula Darah */}
                              <div className="flex items-center justify-between pb-3 border-b border-emerald-100/50">
                                <div className="flex items-center space-x-3">
                                  <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden">
                                    <img src="/images/ind_gula.jpg" alt="Gula Darah" className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-0.5">Gula Darah</span>
                                    <span className="text-[15px] font-black text-slate-800 leading-tight">112 <span className="text-[10px] text-slate-400 font-semibold">mg/L</span></span>
                                  </div>
                                </div>
                                <span className="text-[8.5px] font-black bg-[#FDF2E9] text-[#A04000] px-2.5 py-1 rounded-full border border-[#F5CBA7] shrink-0">Perlu Perhatian</span>
                              </div>

                              {/* Row 3: Denyut Nadi */}
                              <div className="flex items-center justify-between pb-3 border-b border-emerald-100/50">
                                <div className="flex items-center space-x-3">
                                  <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden">
                                    <img src="/images/ind_nadi.jpg" alt="Denyut Nadi" className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-0.5">Denyut Nadi</span>
                                    <span className="text-[15px] font-black text-slate-800 leading-tight">72 <span className="text-[10px] text-slate-400 font-semibold">bpm</span></span>
                                  </div>
                                </div>
                                <span className="text-[8.5px] font-black bg-[#E8F8F5] text-[#117A65] px-2.5 py-1 rounded-full border border-[#A3E4D7] shrink-0">Normal</span>
                              </div>

                              {/* Row 4: Lingkar Perut */}
                              <div className="flex items-center justify-between pb-3 border-b border-emerald-100/50">
                                <div className="flex items-center space-x-3">
                                  <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden">
                                    <img src="/images/ind_perut.jpg" alt="Lingkar Perut" className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-0.5">Lingkar Perut</span>
                                    <span className="text-[15px] font-black text-slate-800 leading-tight">88 <span className="text-[10px] text-slate-400 font-semibold">cm</span></span>
                                  </div>
                                </div>
                                <span className="text-[8.5px] font-black bg-[#FDF2E9] text-[#A04000] px-2.5 py-1 rounded-full border border-[#F5CBA7] shrink-0">Perlu Perhatian</span>
                              </div>

                              {/* Row 5: IMT (BMI) */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden">
                                    <img src="/images/ind_bmi.jpg" alt="IMT" className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-0.5">IMT (BMI)</span>
                                    <span className="text-[15px] font-black text-slate-800 leading-tight">24.6</span>
                                  </div>
                                </div>
                                <span className="text-[8.5px] font-black bg-[#E8F8F5] text-[#117A65] px-2.5 py-1 rounded-full border border-[#A3E4D7] shrink-0">Normal</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <button 
                              onClick={() => setDashboardSubView('cek_risiko')}
                              className="w-full py-3.5 bg-[#00875A] hover:bg-[#00704a] text-white font-black rounded-3xl text-xs uppercase tracking-wider shadow-sm transition active:scale-98"
                            >
                              Lihat Detail
                            </button>
                          </div>
                        </div>

                        {/* Floating mascot inline */}
                        <div className="absolute bottom-[80px] right-3 z-30 flex flex-col items-end pointer-events-none">
                          <div className="bg-amber-400 text-slate-900 font-black text-[9px] rounded-full px-2 py-0.5 border border-white shadow-md animate-pulse mb-1">💡</div>
                          <div className="w-10 h-10 rounded-full bg-[#10b981] border-2 border-white shadow-lg flex items-center justify-center text-xl animate-bounce">🤖</div>
                        </div>
                      </div>
                    )}

                    {/* View: Cek Risiko Kesehatan Detail */}
                    {dashboardSubView === 'cek_risiko' && (
                      <div className="space-y-6 flex-1 flex flex-col justify-between pb-20">
                        {/* Custom Header matching screenshots */}
                        <div className="bg-white border-b border-slate-100 px-4 pt-8 pb-3 flex items-center justify-between shadow-xs">
                          <button onClick={() => setDashboardSubView('station_summary')} className="p-1 hover:bg-slate-50 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-700" />
                          </button>
                          <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-1">
                              <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center p-0.5">
                                <span className="text-[10px] font-black text-white leading-none">C</span>
                              </div>
                              <span className="text-sm font-black text-slate-800 tracking-tight leading-none">Cekat</span>
                            </div>
                            <span className="text-[6.5px] font-black text-emerald-600 uppercase tracking-widest leading-none mt-0.5">Cek • Kenali • Tindaklanjuti</span>
                          </div>
                          <button className="p-1 hover:bg-slate-50 rounded-full transition text-slate-600">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex-1 px-5 space-y-4 overflow-y-auto">
                          {/* Title with heart shield plus logo */}
                          <div className="px-1 mt-2 text-left flex items-center space-x-2.5">
                            <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0 shadow-xs">
                              <Plus className="w-3.5 h-3.5 font-bold" />
                            </div>
                            <h3 className="text-base font-black text-slate-800 tracking-tight drop-shadow-sm">Cek Risiko Kesehatan</h3>
                          </div>

                          <div className="space-y-4.5">
                            {/* Asam Urat */}
                            <div className="space-y-1 text-left">
                              <span className="text-xs font-black text-slate-800 block px-1">Asam Urat</span>
                              <div className="bg-[#F2F4F4] border border-slate-200/60 rounded-2xl p-3.5 text-xs font-bold text-slate-800 shadow-xs">
                                Angka Asam Urat Darah Anda Hari ini <span className="font-black text-slate-900">5,9 mg/dl</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-normal px-1">
                                Angka asam urat anda <span className="font-extrabold text-slate-700">akan mencapai batas normal</span>, tetap <span className="font-extrabold text-slate-750">waspada terhadap resiko Asam Urat yaa!</span>
                              </p>
                            </div>

                            {/* Kolesterol */}
                            <div className="space-y-1 text-left">
                              <span className="text-xs font-black text-slate-800 block px-1">Kolesterol</span>
                              <div className="bg-[#F2F4F4] border border-slate-200/60 rounded-2xl p-3.5 text-xs font-bold text-slate-800 shadow-xs">
                                Angka Kolesterol Anda Hari ini <span className="font-black text-slate-900">220 mg/dl</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-normal px-1">
                                Angka Kolesterol anda pada kategori <span className="font-extrabold text-slate-700">Sedikit Tinggi</span>, <span className="font-extrabold text-slate-750">Jagalah Pola Makan anda</span>, dan <span className="font-extrabold text-slate-750">waspadai resiko penyakit Kolesterol!</span>
                              </p>
                            </div>

                            {/* Hipertensi */}
                            <div className="space-y-1 text-left">
                              <span className="text-xs font-black text-slate-800 block px-1">Hipertensi</span>
                              <div className="bg-[#FDEDEC] border border-[#FADBD8] rounded-2xl p-3.5 text-xs font-bold text-[#C0392B] shadow-xs">
                                Angka Tekanan Darah Anda Hari ini <span className="font-black">140/85 mmHg</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-normal px-1">
                                Dapat dikatakan Angka Tekanan Darah anda <span className="font-extrabold text-red-650">Tinggi</span>. <span className="font-extrabold text-slate-700">Batasi konsumsi makanan tinggi garam</span>, dan jangan lupa selalu <span className="font-extrabold text-slate-750">cek TD secara berkala ya!</span>
                              </p>
                            </div>

                            {/* Diabetes */}
                            <div className="space-y-1 text-left">
                              <span className="text-xs font-black text-slate-800 block px-1">Diabetes</span>
                              <div className="bg-[#FDEDEC] border border-[#FADBD8] rounded-2xl p-3.5 text-xs font-bold text-[#C0392B] shadow-xs">
                                Angka Diabetes Anda Hari ini <span className="font-black">180 mg/dl</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-normal px-1">
                                Dapat dikatakan Angka Diabetes anda <span className="font-extrabold text-red-650">mengkhawatirkan</span>. <span className="font-extrabold text-slate-700">Batasi konsumsi gula</span>, dan jangan lupa <span className="font-extrabold text-slate-750">olahraga ya!</span>
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 flex flex-col items-center gap-3.5">
                            <button 
                              onClick={() => {
                                setActiveTab('challenge');
                                setChallengeSubView('home');
                              }}
                              className="w-full py-3 bg-white border border-[#E74C3C] text-[#E74C3C] font-black rounded-3xl text-xs uppercase tracking-wider transition active:scale-98 shadow-xs hover:bg-rose-50"
                            >
                              Pola Hidup Sehat
                            </button>

                            <div className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-3xl flex items-start gap-3 shadow-xs">
                              <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg animate-bounce">🥗</div>
                              <p className="text-[10px] leading-relaxed text-slate-500 font-semibold text-left">
                                Ingin mempelajari tentang Resiko Penyakitmu? Jangan khawatir! segera <button onClick={() => alert('Membuka edukasi...')} className="text-blue-500 font-extrabold underline cursor-pointer">kunjungi artikel & Webinar kami</button>, dan semoga dapat membantu
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Floating mascot inline */}
                        <div className="absolute bottom-[80px] right-3 z-30 flex flex-col items-end pointer-events-none">
                          <div className="bg-amber-400 text-slate-900 font-black text-[9px] rounded-full px-2 py-0.5 border border-white shadow-md animate-pulse mb-1">💡</div>
                          <div className="w-10 h-10 rounded-full bg-[#10b981] border-2 border-white shadow-lg flex items-center justify-center text-xl animate-bounce">🤖</div>
                        </div>
                      </div>
                    )}

                    {/* View: Reminders & Medication Schedule (Pengingat & Jadwal) */}
                    {dashboardSubView === 'reminders' && (
                      <div className="space-y-6">
                        <div className="bg-white border-b border-slate-100 px-6 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => setDashboardSubView('home')} className="p-1 hover:bg-slate-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Pengingat & Jadwal</span>
                          <div className="w-7"></div>
                        </div>

                        <div className="px-5 space-y-4 text-left">
                          {/* Schedule Filter Tabs */}
                          <div className="flex bg-slate-100 p-1 rounded-full text-[10px] font-black text-slate-500">
                            <span className="flex-1 py-1.5 text-center bg-white text-emerald-700 rounded-full shadow-sm">Semua</span>
                            <span className="flex-1 py-1.5 text-center">Obat</span>
                            <span className="flex-1 py-1.5 text-center">Pemeriksaan</span>
                            <span className="flex-1 py-1.5 text-center">Konsumsi</span>
                          </div>

                          {/* Today timeline */}
                          <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block">Hari Ini</span>

                            {/* Reminder Item 1 */}
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                              <div className="flex items-center space-x-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                  <Pill className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black text-slate-800">Minum Obat</span>
                                    <span className="text-[8px] font-bold text-slate-400">20.00</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Amlodipine 5 mg • 1 tablet</p>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[9px] font-black rounded-lg uppercase tracking-wider">Segera</span>
                            </div>
                          </div>

                          {/* Tomorrow timeline */}
                          <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block">Besok, 31 Agustus 2026</span>

                            {/* Reminder Item 2 */}
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                              <div className="flex items-center space-x-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                  <Stethoscope className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black text-slate-800">Cek Tekanan Darah</span>
                                    <span className="text-[8px] font-bold text-slate-400">08.00</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Pantau tekanan darah harian kamu</p>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-black rounded-lg uppercase tracking-wider">Besok</span>
                            </div>

                            {/* Reminder Item 3 */}
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                              <div className="flex items-center space-x-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                  <Droplet className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black text-slate-800">Minum Air Putih</span>
                                    <span className="text-[8px] font-bold text-slate-400">12.00</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Minimal 8 gelas sehari</p>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-black rounded-lg uppercase tracking-wider">Besok</span>
                            </div>
                          </div>

                          {/* Upcoming timeline */}
                          <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block">Jadwal Mendatang</span>

                            {/* Reminder Item 4 */}
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                              <div className="flex items-center space-x-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                  <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black text-slate-800">Kontrol Kesehatan</span>
                                    <span className="text-[8px] font-bold text-slate-400">09.00</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Puskesmas Pembantu Ds. Ngabab</p>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-205 text-emerald-705 text-[8px] font-black rounded-lg uppercase tracking-wider shrink-0">Dalam 4 hari</span>
                            </div>

                            {/* Reminder Item 5 */}
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                              <div className="flex items-center space-x-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                  <User className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black text-slate-800">Pantau Tumbuh Kembang</span>
                                    <span className="text-[8px] font-bold text-slate-400">10.00</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold leading-normal mt-0.5">Posyandu Mawar • Cek tinggi & berat badan</p>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-205 text-emerald-705 text-[8px] font-black rounded-lg uppercase tracking-wider shrink-0">Dalam 6 hari</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View: Marketplace (Keranjangmu) */}
                    {dashboardSubView === 'marketplace' && (
                      <div className="space-y-6">
                        <div className="bg-white border-b border-slate-100 px-6 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => setDashboardSubView('home')} className="p-1 hover:bg-slate-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Keranjangmu</span>
                          <div className="w-7"></div>
                        </div>

                        <div className="px-5 space-y-4 text-left">
                          {/* Search bar */}
                          <div className="flex bg-slate-100 rounded-full items-center px-4 py-2 text-xs font-semibold shadow-inner">
                            <Search className="w-4 h-4 text-slate-400 mr-2" />
                            <input 
                              type="text" 
                              placeholder="Telusuri..." 
                              className="bg-transparent focus:outline-none flex-1"
                            />
                          </div>

                          {/* Categories tags */}
                          <div className="flex overflow-x-auto space-x-2 text-[10px] font-black text-slate-500 scrollbar-none pb-1">
                            <span className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full shrink-0">Semua</span>
                            <span className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-full shrink-0">Vitamin</span>
                            <span className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-full shrink-0">Tablet Penambah darah</span>
                            <span className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-full shrink-0">Susu</span>
                            <span className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-full shrink-0">Obat</span>
                          </div>

                          {/* Product Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            {/* Product 1 */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col justify-between space-y-3">
                              <div className="space-y-1.5">
                                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                  <img src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=150&q=80" alt="Enervon C" className="h-full object-contain" />
                                </div>
                                <h5 className="text-[10px] font-black text-slate-800 leading-snug line-clamp-2">Enervon C 133 mg (50 Tablet)</h5>
                                <span className="text-[9px] text-slate-400 block font-bold">NutriStore Official</span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs font-black text-emerald-600">Rp 45.900</span>
                                <span className="text-[9px] text-slate-400 line-through">Rp 61.350</span>
                              </div>
                            </div>

                            {/* Product 2 */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col justify-between space-y-3">
                              <div className="space-y-1.5">
                                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                  <img src="https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=150&q=80" alt="Tablet Tambah Darah" className="h-full object-contain" />
                                </div>
                                <h5 className="text-[10px] font-black text-slate-800 leading-snug line-clamp-2">Tablet Tambah Darah (Pcs 100 Tablet)</h5>
                                <span className="text-[9px] text-slate-400 block font-bold">Kimia Farma</span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs font-black text-emerald-600">Rp 24.999</span>
                                <span className="text-[9px] text-slate-400 line-through">Rp 29.350</span>
                              </div>
                            </div>

                            {/* Product 3 */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col justify-between space-y-3">
                              <div className="space-y-1.5">
                                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                  <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80" alt="Ultra Milk" className="h-full object-contain" />
                                </div>
                                <h5 className="text-[10px] font-black text-slate-800 leading-snug line-clamp-2">Ultra Milk Susu UHT 200 ml (1 Pcs)</h5>
                                <span className="text-[9px] text-slate-400 block font-bold">Ultra Jaya</span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs font-black text-emerald-600">Rp 5.700</span>
                                <span className="text-[9px] text-slate-400 line-through">Rp 6.000</span>
                              </div>
                            </div>

                            {/* Product 4 */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col justify-between space-y-3">
                              <div className="space-y-1.5">
                                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                  <img src="https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=150&q=80" alt="Ayam Fillet" className="h-full object-contain" />
                                </div>
                                <h5 className="text-[10px] font-black text-slate-800 leading-snug line-clamp-2">Ayam Fillet Dada 1 Kg Fresh</h5>
                                <span className="text-[9px] text-slate-400 block font-bold">Pasar Tani</span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs font-black text-emerald-600">Rp 32.300</span>
                                <span className="text-[9px] text-slate-400 line-through">Rp 54.000</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View: Edukasi Kesehatan */}
                    {dashboardSubView === 'edukasi' && (
                      <div className="space-y-0 animate-fadeIn pb-24">

                        {/* ── Header ── */}
                        <div className="bg-white border-b border-slate-100 px-4 pt-8 pb-3 flex items-center justify-between">
                          <button onClick={() => setDashboardSubView('home')} className="p-1.5 hover:bg-slate-50 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-[15px] font-black text-slate-900 tracking-tight">Edukasi Kesehatan</span>
                          <button className="p-1.5 hover:bg-slate-50 rounded-full transition">
                            <CalendarDays className="w-[18px] h-[18px] text-slate-700" />
                          </button>
                        </div>

                        {/* ── Search Bar ── */}
                        <div className="px-4 pt-3 pb-2 bg-white">
                          <div className="flex bg-slate-100 rounded-full items-center px-4 py-2.5 gap-2">
                            <Search className="w-4 h-4 text-slate-500 shrink-0" />
                            <input type="text" placeholder="Telusuri" className="bg-transparent focus:outline-none flex-1 text-[12px] font-semibold text-slate-700 placeholder:text-slate-400" />
                          </div>
                        </div>

                        {/* ── Hero Banner ── */}
                        <div className="mx-4 mt-2 rounded-3xl overflow-hidden bg-gradient-to-br from-[#fefce8] via-[#f0fdf4] to-[#dcfce7] border border-emerald-200 shadow-sm">
                          <div className="flex items-center justify-between px-5 pt-4 pb-4">
                            <div className="flex-1 pr-3">
                              <h2 className="text-[13px] font-black text-slate-900 leading-snug mb-1">Belajar, Pahami, dan Terapkan untuk Kesehatan yang Lebih Baik</h2>
                              <p className="text-[9.5px] font-bold text-slate-600 leading-tight">Informasi terpercaya untuk hidup sehat</p>
                            </div>
                            <div className="w-[88px] h-[88px] shrink-0">
                              <img src="/images/edukasi_hero.jpg" alt="Edukasi" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                          </div>
                        </div>

                        {/* ── Artikel Pilihan ── */}
                        <div className="mx-4 mt-4">
                          <div className="bg-[#f0fdf4] border border-[#86efac] rounded-3xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[13px] font-black text-slate-900">Artikel Pilihan</span>
                              <button className="text-[10.5px] font-black text-emerald-700 flex items-center gap-0.5">Lihat Semua <ChevronRight className="w-3.5 h-3.5" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">

                              {/* ── Article 1: Hipertensi ── */}
                              <div className="bg-white rounded-2xl overflow-hidden shadow-md">
                                <div className="h-[90px] overflow-hidden">
                                  <svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    <defs>
                                      <radialGradient id="bgHt" cx="50%" cy="50%" r="70%">
                                        <stop offset="0%" stopColor="#fff1f2"/>
                                        <stop offset="100%" stopColor="#fecdd3"/>
                                      </radialGradient>
                                    </defs>
                                    <rect width="120" height="90" fill="url(#bgHt)"/>
                                    {/* Tensimeter device */}
                                    <rect x="6" y="18" width="42" height="28" rx="7" fill="#1e40af" opacity="0.92"/>
                                    <rect x="9" y="21" width="36" height="19" rx="4" fill="#dbeafe"/>
                                    <text x="27" y="31" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="bold">140</text>
                                    <text x="27" y="37" textAnchor="middle" fontSize="5.5" fill="#3b82f6">/ 85 mmHg</text>
                                    <rect x="12" y="43" width="30" height="5" rx="2.5" fill="#ef4444" opacity="0.3"/>
                                    <rect x="12" y="43" width="22" height="5" rx="2.5" fill="#ef4444"/>
                                    {/* BP cuff arm */}
                                    <ellipse cx="27" cy="60" rx="18" ry="8" fill="#fca5a5" stroke="#f87171" strokeWidth="1.2"/>
                                    <rect x="15" y="55" width="24" height="10" rx="5" fill="#fca5a5" stroke="#f87171" strokeWidth="1"/>
                                    <line x1="27" y1="46" x2="27" y2="52" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                                    {/* Heart beat line */}
                                    <polyline points="55,45 65,45 68,36 73,56 77,30 81,50 85,40 89,50 95,45 115,45" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    {/* Warning badge */}
                                    <circle cx="100" cy="24" r="12" fill="#f59e0b" stroke="white" strokeWidth="2"/>
                                    <text x="100" y="29" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">!</text>
                                    {/* Heart icon */}
                                    <path d="M68 76 C63 70,52 65,52 58 C52 54,55 52,58.5 54.5 C62 56.5,68 62,68 62 C68 62,74 56.5,77.5 54.5 C81 52,84 54,84 58 C84 65,73 70,68 76Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.8"/>
                                  </svg>
                                </div>
                                <div className="p-3">
                                  <span className="text-[7.5px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full">Hipertensi</span>
                                  <h4 className="text-[10.5px] font-black text-slate-900 leading-snug mt-1.5">Kenali Hipertensi, Cegah Komplikasi</h4>
                                  <p className="text-[8.5px] text-slate-600 font-semibold mt-0.5 leading-tight">Pahami penyebab, gejala, dan cara mencegah hipertensi.</p>
                                </div>
                              </div>

                              {/* ── Article 2: Stunting ── */}
                              <div className="bg-white rounded-2xl overflow-hidden shadow-md">
                                <div className="h-[90px] overflow-hidden">
                                  <svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    <defs>
                                      <radialGradient id="bgSt" cx="50%" cy="50%" r="70%">
                                        <stop offset="0%" stopColor="#fffbeb"/>
                                        <stop offset="100%" stopColor="#fef3c7"/>
                                      </radialGradient>
                                    </defs>
                                    <rect width="120" height="90" fill="url(#bgSt)"/>
                                    {/* Mom figure */}
                                    <circle cx="38" cy="18" r="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
                                    <path d="M38 28 Q28 35 26 55 L50 55 Q48 35 38 28Z" fill="#f97316"/>
                                    <line x1="28" y1="38" x2="18" y2="52" stroke="#f97316" strokeWidth="4" strokeLinecap="round"/>
                                    <line x1="48" y1="38" x2="58" y2="52" stroke="#f97316" strokeWidth="4" strokeLinecap="round"/>
                                    <line x1="32" y1="55" x2="30" y2="72" stroke="#f97316" strokeWidth="4" strokeLinecap="round"/>
                                    <line x1="44" y1="55" x2="46" y2="72" stroke="#f97316" strokeWidth="4" strokeLinecap="round"/>
                                    {/* Child figure */}
                                    <circle cx="72" cy="24" r="7.5" fill="#fcd34d" stroke="#fbbf24" strokeWidth="1"/>
                                    <path d="M72 32 Q65 37 64 50 L80 50 Q79 37 72 32Z" fill="#86efac"/>
                                    <line x1="65" y1="38" x2="57" y2="50" stroke="#86efac" strokeWidth="3" strokeLinecap="round"/>
                                    <line x1="79" y1="38" x2="87" y2="50" stroke="#86efac" strokeWidth="3" strokeLinecap="round"/>
                                    <line x1="67" y1="50" x2="65" y2="65" stroke="#86efac" strokeWidth="3" strokeLinecap="round"/>
                                    <line x1="77" y1="50" x2="79" y2="65" stroke="#86efac" strokeWidth="3" strokeLinecap="round"/>
                                    {/* Veggies & fruits */}
                                    <circle cx="15" cy="74" r="8" fill="#4ade80" stroke="#16a34a" strokeWidth="1"/>
                                    <path d="M15 66 Q13 60 15 58 Q17 56 15 66Z" fill="#16a34a"/>
                                    <circle cx="36" cy="76" r="7" fill="#fb923c" stroke="#ea580c" strokeWidth="1"/>
                                    <circle cx="56" cy="75" r="7" fill="#f87171" stroke="#ef4444" strokeWidth="1"/>
                                    <ellipse cx="96" cy="74" rx="12" ry="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
                                    {/* Stars */}
                                    <text x="105" y="20" fontSize="12" fill="#fbbf24">✦</text>
                                    <text x="10" y="40" fontSize="8" fill="#34d399">✦</text>
                                  </svg>
                                </div>
                                <div className="p-3">
                                  <span className="text-[7.5px] font-black bg-orange-500 text-white px-2 py-0.5 rounded-full">Stunting</span>
                                  <h4 className="text-[10.5px] font-black text-slate-900 leading-snug mt-1.5">Cegah Stunting Sejak Dini</h4>
                                  <p className="text-[8.5px] text-slate-600 font-semibold mt-0.5 leading-tight">Nutrisi, pola asuh, dan sanitasi untuk tumbuh kembang optimal.</p>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                        {/* ── Webinar Kesehatan ── */}
                        <div className="mx-4 mt-4">
                          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[13px] font-black text-slate-900">Webinar Kesehatan</span>
                              <button className="text-[10.5px] font-black text-emerald-700 flex items-center gap-0.5">Lihat Semua <ChevronRight className="w-3.5 h-3.5" /></button>
                            </div>
                            <h4 className="text-[11.5px] font-black text-slate-900 leading-snug">Cegah Hipertensi dengan Pola Hidup Sehat</h4>
                            <p className="text-[9.5px] font-bold text-slate-600 mt-0.5">Bersama: Rahmad Raffi S.Kep., Ns., M.Kep</p>
                            <div className="flex items-center gap-1 mt-1.5 mb-3">
                              <Clock className="w-3 h-3 text-slate-500 shrink-0" />
                              <span className="text-[9px] font-bold text-slate-600">Sabtu, 30 September 2026 • 10.00 WIB</span>
                            </div>
                            <div className="flex items-end justify-between">
                              <button className="py-2 px-5 bg-emerald-700 hover:bg-emerald-600 text-white font-black text-[12px] rounded-xl shadow-sm transition active:scale-95">
                                Daftar
                              </button>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <span className="text-[8.5px] font-black text-slate-500 block">HTM</span>
                                  <span className="text-[14px] font-black text-red-600 leading-none">Rp 20.000</span>
                                </div>
                                {/* Speaker photo — real Unsplash doctor */}
                                <div className="flex flex-col items-center gap-1">
                                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-emerald-200 shadow-md">
                                    <img
                                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=90"
                                      alt="Rahmad Raffi"
                                      className="w-full h-full object-cover object-top"
                                    />
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[7px] font-black text-slate-800 leading-tight">Rahmad Raffi S.Kep., Ns., M.Kep</p>
                                    <p className="text-[6.5px] font-bold text-slate-500 leading-tight">Kepala Hubungan Inna Medica</p>
                                    <p className="text-[6px] font-bold text-slate-400 leading-tight">RS. Dr. Sutomo Surabaya</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ── Mitos Vs Fakta ── */}
                        <div className="mx-4 mt-4 mb-6">
                          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[13px] font-black text-slate-900">Mitos Vs Fakta</span>
                              <button className="text-[10.5px] font-black text-emerald-700 flex items-center gap-0.5">Lihat Semua <ChevronRight className="w-3.5 h-3.5" /></button>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="flex-1 space-y-2.5">
                                <div className="flex items-start gap-2">
                                  <span className="text-[9px] font-black bg-red-500 text-white px-3 py-1 rounded-lg shrink-0 mt-0.5">MITOS</span>
                                  <p className="text-[10px] font-bold text-slate-800 leading-snug">Mitos: "Orang kurus tidak bisa kena hipertensi"</p>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-[9px] font-black bg-emerald-500 text-white px-2.5 py-1 rounded-lg shrink-0 mt-0.5">FAKTA</span>
                                  <p className="text-[10px] font-bold text-slate-800 leading-snug">Hipertensi bisa terjadi pada siapa pun, termasuk orang kurus.</p>
                                </div>
                              </div>
                              {/* Fun illustration for mitos vs fakta */}
                              <div className="shrink-0 w-14 h-14">
                                <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                  <rect width="56" height="56" rx="12" fill="#fef2f2"/>
                                  {/* tensimeter cartoon */}
                                  <rect x="8" y="14" width="24" height="16" rx="5" fill="#3b82f6"/>
                                  <rect x="10" y="16" width="20" height="10" rx="3" fill="#dbeafe"/>
                                  <text x="20" y="23" textAnchor="middle" fontSize="5" fill="#1e40af" fontWeight="bold">38</text>
                                  <path d="M20 30 Q14 36 14 40 A6 6 0 0 0 26 40 Q26 36 20 30Z" fill="#fca5a5" stroke="#f87171" strokeWidth="1"/>
                                  <path d="M30 24 C26 18,20 18,18 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                                  {/* Robot/tech character */}
                                  <rect x="34" y="22" width="14" height="12" rx="3" fill="#10b981" stroke="#059669" strokeWidth="1"/>
                                  <circle cx="38" cy="27" r="2" fill="white"/>
                                  <circle cx="44" cy="27" r="2" fill="white"/>
                                  <circle cx="38" cy="27" r="1" fill="#1e293b"/>
                                  <circle cx="44" cy="27" r="1" fill="#1e293b"/>
                                  <rect x="37" y="30" width="7" height="2" rx="1" fill="#6ee7b7"/>
                                  <rect x="36" y="34" width="16" height="10" rx="3" fill="#10b981" stroke="#059669" strokeWidth="1"/>
                                  <line x1="34" y1="37" x2="30" y2="42" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                                  <line x1="50" y1="37" x2="54" y2="42" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                                  <text x="41" y="42" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">AI</text>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                )}

                {/* -------------------------------------------------------------
                    TAB 2: NUTRISI / FOOD SCANNER (Progress bars, Camera view, Results, Kulkas resep)
                    ------------------------------------------------------------- */}
                {activeTab === 'nutrisi' && (
                  <div className="flex-1 flex flex-col justify-between animate-fadeIn pb-20">
                    
                    {/* View: Main Nutrisi Harianmu (Progress Bars) */}
                    {nutrisiSubView === 'main' && (
                      <div className="space-y-6">
                        {/* Header light yellow with logo and tabs */}
                        <div className="bg-gradient-to-b from-yellow-50/50 to-white px-5 pt-8 pb-4 text-center border-b border-slate-100 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
                                <img src="/landing/cekat_logo.png" alt="Cekat Logo" className="w-full h-full object-contain" />
                              </div>
                              <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">Cekat</span>
                            </div>
                            
                            {/* Calendar icon */}
                            <button className="p-1 hover:bg-slate-100 rounded-full transition">
                              <Calendar className="w-5 h-5 text-slate-600" />
                            </button>
                          </div>

                          {/* Harian, Mingguan, Bulanan, Tahunan Subtabs */}
                          <div className="flex bg-slate-100 p-0.5 rounded-full text-[9px] font-black text-slate-500 shadow-inner">
                            <span className="flex-1 py-1.5 text-center bg-white text-slate-800 rounded-full shadow-sm">Harian</span>
                            <span 
                              onClick={() => setNutrisiSubView('charts')}
                              className="flex-1 py-1.5 text-center cursor-pointer hover:text-slate-800"
                            >
                              Mingguan
                            </span>
                            <span className="flex-1 py-1.5 text-center">Bulanan</span>
                            <span className="flex-1 py-1.5 text-center">Tahunan</span>
                          </div>
                        </div>

                        {/* Nutrition indicator list */}
                        <div className="px-5 space-y-4 text-left">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-slate-850">Nutrisi Harianmu</h3>
                            <button 
                              onClick={() => setNutrisiSubView('charts')}
                              className="text-[9.5px] font-black text-emerald-600 uppercase tracking-wide hover:underline flex items-center gap-0.5"
                            >
                              <span>Lihat Detail</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Progress bars indicators container */}
                          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 text-xs font-semibold text-slate-800">
                            
                            {/* 1. Energi */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-[11px]">
                                <span className="flex items-center gap-1.5 text-slate-700">🔥 Energi</span>
                                <span className="text-slate-900 font-black">1.450 <span className="text-slate-400 font-normal">/ 2.000 kkal</span></span>
                              </div>
                              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72.5%' }}></div>
                              </div>
                            </div>

                            {/* 2. Serat */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-[11px]">
                                <span className="flex items-center gap-1.5 text-slate-700">🌾 Serat</span>
                                <span className="text-slate-900 font-black">18 <span className="text-slate-400 font-normal">/ 25 g</span></span>
                              </div>
                              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }}></div>
                              </div>
                            </div>

                            {/* 3. Gula */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-[11px]">
                                <span className="flex items-center gap-1.5 text-slate-700">🍬 Gula</span>
                                <span className="text-slate-900 font-black">42 <span className="text-slate-400 font-normal">/ 50 g</span></span>
                              </div>
                              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '84%' }}></div>
                              </div>
                            </div>

                            {/* 4. Hidrasi */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-[11px]">
                                <span className="flex items-center gap-1.5 text-slate-700">🥛 Hidrasi</span>
                                <span className="text-slate-900 font-black">5 <span className="text-slate-400 font-normal">/ 8 gelas</span></span>
                              </div>
                              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '62.5%' }}></div>
                              </div>
                            </div>

                            {/* 5. Aktivitas */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-[11px]">
                                <span className="flex items-center gap-1.5 text-slate-700">🏃 Aktivitas</span>
                                <span className="text-slate-900 font-black">25 <span className="text-slate-400 font-normal">/ 30 menit</span></span>
                              </div>
                              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '83.3%' }}></div>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Bottom Feature Banners */}
                        <div className="px-5 space-y-4 text-left">
                          {/* Banner 1: AI Food Scanner */}
                          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/40 p-5 rounded-3xl flex items-center justify-between shadow-sm relative overflow-hidden">
                            <div className="space-y-2.5 max-w-[65%] text-left">
                              <h4 className="text-[13px] font-black text-slate-800 leading-snug">AI Food Scanner</h4>
                              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Cek kandungan gizi makananmu dengan cepat</p>
                              <button 
                                onClick={() => setNutrisiSubView('scan_camera')}
                                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-[9.5px] font-black rounded-lg uppercase tracking-wider transition flex items-center gap-1"
                              >
                                <span>Scan Makanan</span>
                                <Camera className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="w-16 h-16 shrink-0 bg-white rounded-2xl border border-slate-150 flex items-center justify-center p-2 shadow-sm overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=100&q=80" alt="Salad" className="w-full h-full object-cover rounded-lg" />
                            </div>
                          </div>

                          {/* Banner 2: Pantry AI & Menu Sehat */}
                          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/40 p-5 rounded-3xl flex items-center justify-between shadow-sm relative overflow-hidden">
                            <div className="space-y-2.5 max-w-[65%] text-left">
                              <h4 className="text-[13px] font-black text-slate-800 leading-snug">Pantry AI & Menu Sehat</h4>
                              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Buat menu sehat dari bahan yang ada di rumah</p>
                              <button 
                                onClick={() => setNutrisiSubView('pantry')}
                                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-[9.5px] font-black rounded-lg uppercase tracking-wider transition flex items-center gap-1"
                              >
                                <span>Buka Menu</span>
                                <Brain className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="w-16 h-16 shrink-0 bg-white rounded-2xl border border-slate-150 flex items-center justify-center p-2 shadow-sm overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=100&q=80" alt="Kitchen scale" className="w-full h-full object-cover rounded-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View: Scan Camera Camera View */}
                    {nutrisiSubView === 'scan_camera' && (
                      <div className="flex-1 flex flex-col justify-between bg-slate-900 text-white relative min-h-[600px]">
                        {/* Top bar */}
                        <div className="absolute top-0 left-0 w-full px-6 py-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-20">
                          <button onClick={() => setNutrisiSubView('main')} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-white" />
                          </button>
                          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Scan Makananmu</span>
                          <div className="w-8"></div>
                        </div>

                        {/* Scanner Viewfinder / Camera Background */}
                        <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center bg-black">
                          <img 
                            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80" 
                            alt="Camera viewport salad" 
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Corner crosshairs viewport */}
                          <div className="absolute w-64 h-64 border-2 border-white/50 rounded-3xl flex items-center justify-center pointer-events-none">
                            <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl"></div>
                            <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl"></div>
                            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl"></div>
                            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-xl"></div>
                          </div>

                          {isScanning && (
                            <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-30">
                              <Activity className="w-12 h-12 text-emerald-400 animate-pulse" />
                              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest animate-pulse">Menghitung kalori...</span>
                            </div>
                          )}
                        </div>

                        {/* Camera Shutter Area */}
                        <div className="px-6 py-10 bg-gradient-to-t from-slate-950 via-slate-900 to-black/85 flex items-center justify-center gap-12 z-20 border-t border-slate-800">
                          {/* Gallery button */}
                          <button className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                            <Compass className="w-5 h-5 text-white" />
                          </button>

                          {/* Shutter */}
                          <button 
                            onClick={() => {
                              setIsScanning(true);
                              setTimeout(() => {
                                setIsScanning(false);
                                setNutrisiSubView('scan_result');
                              }, 1500);
                            }}
                            className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center shadow-lg border-4 border-slate-850 scale-105 active:scale-95 transition cursor-pointer"
                          >
                            <Camera className="w-7 h-7 text-white" />
                          </button>

                          {/* Flash toggle */}
                          <button className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                            <Zap className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* View: Scan Result Details */}
                    {nutrisiSubView === 'scan_result' && (
                      <div className="flex-1 bg-white flex flex-col justify-between animate-fadeIn min-h-[600px] text-slate-800">
                        {/* Header */}
                        <div className="bg-white border-b border-slate-100 px-6 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => setNutrisiSubView('scan_camera')} className="p-1 hover:bg-slate-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">Cekat Scan</span>
                          <div className="w-7"></div>
                        </div>

                        {/* Top Card Image & Score */}
                        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                          <div className="relative aspect-video rounded-3xl overflow-hidden shadow border border-slate-100">
                            <img 
                              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80" 
                              alt="Scanned salad" 
                              className="w-full h-full object-cover"
                            />
                            {/* Score good circular badge */}
                            <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-emerald-500 border-4 border-white flex flex-col items-center justify-center shadow-lg text-white">
                              <span className="text-[8px] font-bold block uppercase leading-none">Score:</span>
                              <span className="text-xs font-black block uppercase leading-none mt-0.5">GOOD</span>
                            </div>
                          </div>

                          {/* Star feedback text */}
                          <div className="text-center space-y-2">
                            <div className="flex justify-center space-x-1.5 text-yellow-400">
                              <Star className="w-5 h-5 fill-yellow-400" />
                              <Star className="w-5 h-5 fill-yellow-400" />
                              <Star className="w-5 h-5 fill-yellow-400" />
                              <Star className="w-5 h-5 fill-yellow-400" />
                              <Star className="w-5 h-5 text-slate-300" />
                            </div>
                            <p className="text-[11px] leading-relaxed text-slate-500 font-semibold px-4">
                              Saladnya sudah sehat! Bisa ditambahkan telur atau alpukat supaya gizinya makin seimbang.
                            </p>
                          </div>

                          {/* Macro circles list */}
                          <div className="space-y-3.5 text-left">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block px-1">ANALYSIS:</span>
                            
                            <div className="grid grid-cols-3 gap-3 text-center">
                              {/* Protein */}
                              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center space-y-1.5 shadow-sm">
                                <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center font-black text-xs text-slate-800 bg-white">70 Cal</div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Protein</span>
                              </div>

                              {/* Carbs */}
                              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center space-y-1.5 shadow-sm">
                                <div className="w-10 h-10 rounded-full border-2 border-yellow-500 flex items-center justify-center font-black text-xs text-slate-800 bg-white">155 Cal</div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Carbo</span>
                              </div>

                              {/* Fat */}
                              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center space-y-1.5 shadow-sm">
                                <div className="w-10 h-10 rounded-full border-2 border-rose-500 flex items-center justify-center font-black text-xs text-slate-800 bg-white">80 Cal</div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Fat</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Total Button & Save CTA */}
                        <div className="px-5 py-6 bg-slate-50 border-t border-slate-100 space-y-4">
                          <button className="w-full py-3 bg-[#fdf2e9] border border-[#f5c299] text-[#e67e22] text-xs font-black rounded-xl uppercase tracking-wider flex items-center justify-center gap-2">
                            <span>🔥</span>
                            <span>307 Calories</span>
                          </button>
                          
                          <button 
                            onClick={handleSaveScanResult}
                            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-sm transition active:scale-98"
                          >
                            Simpan ke Log Harian
                          </button>
                        </div>
                      </div>
                    )}

                    {/* View: Charts & IMT Calculator */}
                    {nutrisiSubView === 'charts' && (
                      <div className="space-y-6 animate-fadeIn">
                        <div className="bg-white border-b border-slate-100 px-6 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => setNutrisiSubView('main')} className="p-1 hover:bg-slate-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Statistik Nutrisi</span>
                          <div className="w-7"></div>
                        </div>

                        <div className="px-5 space-y-6 text-left">
                          
                          {/* 1. Bar Chart Nutrisi */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-black text-slate-850">Nutrisi</h4>
                            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm text-center">
                              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider mb-4">Minggu Ini • Pilihan Gizi Harian</span>
                              
                              {/* Simple CSS simulated vertical bar chart */}
                              <div className="flex justify-between items-end h-32 px-2 pb-1 border-b border-slate-100">
                                <div className="flex flex-col items-center space-y-2 w-7">
                                  <div className="w-3.5 h-16 bg-[#22c55e] rounded-t-sm" />
                                  <span className="text-[8px] font-bold text-slate-400">S</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2 w-7">
                                  <div className="w-3.5 h-20 bg-[#22c55e] rounded-t-sm" />
                                  <span className="text-[8px] font-bold text-slate-400">S</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2 w-7">
                                  <div className="w-3.5 h-24 bg-[#cbd52d] rounded-t-sm" />
                                  <span className="text-[8px] font-bold text-slate-400">R</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2 w-7">
                                  <div className="w-3.5 h-12 bg-[#22c55e] rounded-t-sm" />
                                  <span className="text-[8px] font-bold text-slate-400">K</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2 w-7">
                                  <div className="w-3.5 h-20 bg-[#22c55e] rounded-t-sm" />
                                  <span className="text-[8px] font-bold text-slate-400">J</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2 w-7">
                                  <div className="w-3.5 h-16 bg-[#cbd52d] rounded-t-sm" />
                                  <span className="text-[8px] font-bold text-slate-400">S</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2 w-7">
                                  <div className="w-3.5 h-14 bg-rose-500 rounded-t-sm" />
                                  <span className="text-[8px] font-bold text-slate-400">M</span>
                                </div>
                              </div>

                              <div className="flex justify-center space-x-4 pt-3 text-[8.5px] font-black text-slate-400 uppercase tracking-wider">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#22c55e]"></span> Sehat</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#cbd52d]"></span> Sedang</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Waspada</span>
                              </div>
                            </div>
                          </div>

                          {/* 2. Hitung IMT Calculator */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-black text-slate-850">Hitung IMT</h4>
                            <span className="text-[9.5px] text-slate-400 font-semibold block px-1 -mt-1 text-left">Indeks Massa Tubuh / hari</span>
                            
                            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3.5 text-center">
                              <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-slate-400">
                                  <span>BB (kg):</span>
                                  <span className="text-slate-800 font-black">68</span>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-slate-400">
                                  <span>TB (m):</span>
                                  <span className="text-slate-800 font-black">1.60</span>
                                </div>
                              </div>

                              <div className="p-3 bg-emerald-50/50 border border-emerald-100 text-emerald-800 text-xs font-black rounded-2xl">
                                IMT = 26.56 (Kelebihan BB)
                              </div>

                              {/* Slider Kurus, Normal, Gemuk */}
                              <div className="space-y-1.5 pt-2">
                                <div className="w-full h-2 bg-gradient-to-r from-sky-400 via-emerald-400 to-rose-400 rounded-full relative">
                                  {/* Slider pointer indicator */}
                                  <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-800 rounded-full shadow" style={{ left: '72%' }}></div>
                                </div>
                                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
                                  <span>Kurus</span>
                                  <span>Normal</span>
                                  <span>Gemuk</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 3. Zat Besi Line Chart */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-black text-slate-850">Zat Besi</h4>
                            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm text-center">
                              {/* Line chart simulation */}
                              <div className="h-32 flex items-end justify-center pb-2 relative border-b border-slate-100">
                                {/* SVG Line */}
                                <svg viewBox="0 0 100 50" className="w-full h-full text-blue-500 overflow-visible absolute inset-0">
                                  <path d="M5,40 L20,38 L38,15 L55,25 L75,32 L95,35" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                              </div>
                              <div className="flex justify-between text-[8px] font-bold text-slate-400 pt-2 px-1">
                                <span>Sen</span>
                                <span>Sel</span>
                                <span>Rab</span>
                                <span>Kam</span>
                                <span>Jum</span>
                                <span>Sab</span>
                                <span>Min</span>
                              </div>

                              {/* Alert zat besi kurang */}
                              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-left text-amber-850">
                                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                                <div className="text-[10px] font-semibold leading-relaxed">
                                  <strong className="text-slate-850 block font-black text-left">Zat Besi kamu masih kurang hari ini.</strong>
                                  Kekurangan zat besi dapat menyebabkan lesu & anemia. <button onClick={() => alert('Membuka tips anemia...')} className="text-blue-600 underline font-black">Cara Mencegah Anemia</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 4. Cairan Hydration bar chart */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-black text-slate-850">Cairan</h4>
                            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm text-center">
                              {/* Hydration progress bars */}
                              <div className="flex justify-between items-end h-24 px-2 pb-1 border-b border-slate-100">
                                <div className="w-3.5 h-16 bg-sky-400 rounded-t-sm" />
                                <div className="w-3.5 h-20 bg-sky-400 rounded-t-sm" />
                                <div className="w-3.5 h-24 bg-sky-400 rounded-t-sm" />
                                <div className="w-3.5 h-24 bg-sky-400 rounded-t-sm" />
                                <div className="w-3.5 h-16 bg-sky-400 rounded-t-sm" />
                                <div className="w-3.5 h-12 bg-sky-300 rounded-t-sm" />
                                <div className="w-3.5 h-8 bg-sky-300 rounded-t-sm" />
                              </div>

                              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2.5 text-left text-emerald-800 mt-4 shadow-inner">
                                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                <p className="text-[10px] leading-relaxed font-semibold">
                                  Asupan cairanmu sangat baik, jangan lewatkan minum air dan tetap terhidrasi ya!
                                </p>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* View: Pantry AI Recipe search & grid */}
                    {nutrisiSubView === 'pantry' && (
                      <div className="space-y-6 animate-fadeIn">
                        <div className="bg-white border-b border-slate-100 px-6 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => setNutrisiSubView('main')} className="p-1 hover:bg-slate-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Pantry AI & Menu Sehat</span>
                          <div className="w-7"></div>
                        </div>

                        <div className="px-5 space-y-5 text-left">
                          <div className="space-y-2">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider text-left">Apa isi kulkasmu?</h4>
                            {/* Tags list selectable */}
                            <div className="flex flex-wrap gap-1.5">
                              {pantryTagsList.map(tag => {
                                const isSelected = selectedPantryTags.includes(tag);
                                return (
                                  <button
                                    key={tag}
                                    onClick={() => {
                                      if (isSelected) {
                                        setSelectedPantryTags(selectedPantryTags.filter(t => t !== tag));
                                      } else {
                                        setSelectedPantryTags([...selectedPantryTags, tag]);
                                      }
                                    }}
                                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition ${
                                      isSelected
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-extrabold shadow-sm'
                                        : 'bg-white border-slate-100 text-slate-400'
                                    }`}
                                  >
                                    <span>{isSelected ? '✓ ' : '+ '}</span>
                                    <span>{tag}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Search recipes */}
                          <div className="flex bg-slate-100 rounded-full items-center px-4 py-2 text-xs font-semibold shadow-inner">
                            <Search className="w-4 h-4 text-slate-400 mr-2" />
                            <input 
                              type="text" 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Telusuri resep..." 
                              className="bg-transparent focus:outline-none flex-1"
                            />
                          </div>

                          {/* Recipe category filters */}
                          <div className="flex overflow-x-auto space-x-2 text-[10px] font-black text-slate-500 scrollbar-none pb-1">
                            {['Semua', 'Ikan', 'Ayam', 'Telur', 'Sayur', 'Daging'].map(cat => {
                              const isActive = pantryCategory === cat;
                              return (
                                <button
                                  key={cat}
                                  onClick={() => setPantryCategory(cat)}
                                  className={`px-4 py-1.5 border rounded-full shrink-0 transition ${
                                    isActive
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                      : 'bg-white border-slate-100 text-slate-400'
                                  }`}
                                >
                                  {cat}
                                </button>
                              );
                            })}
                          </div>

                          {/* Recipes Grid */}
                          <div className="space-y-4">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block px-1 text-left">Rekomendasi Menu Sehat</span>
                            
                            <div className="grid grid-cols-2 gap-4">
                              {filteredRecipes.map((recipe, index) => (
                                <div 
                                  key={index}
                                  onClick={() => {
                                    alert(`Membuka panduan resep: ${recipe.name}`);
                                  }}
                                  className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col justify-between space-y-3 cursor-pointer hover:shadow transition"
                                >
                                  <div className="space-y-2">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 relative">
                                      <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h5 className="text-[10.5px] font-black text-slate-800 leading-snug line-clamp-2 text-left">{recipe.name}</h5>
                                  </div>
                                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded self-start">{recipe.tag}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    )}


                  </div>
                )}

                {/* -------------------------------------------------------------
                    TAB 5: PROFIL (User profiles & connection status)
                    ------------------------------------------------------------- */}
                {activeTab === 'profil' && (
                  <div className="flex-1 bg-white p-6 space-y-6 animate-fadeIn pb-20">
                    <div className="text-center space-y-4 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full border-4 border-emerald-500 bg-slate-200 overflow-hidden shadow-md">
                        <img 
                          src="/landing/doctor_elina_photo.jpg" 
                          alt="Sofia Profile" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Sofia Kusuma</h2>
                        <span className="text-xs text-slate-400 font-semibold">Profil Terintegrasi BPJS</span>
                      </div>
                    </div>

                    <div className="border border-slate-100 p-5 rounded-3xl space-y-4 shadow-sm bg-white text-left">
                      <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block">Informasi Umum</span>
                      <div className="space-y-2 text-xs font-semibold text-slate-605">
                        <div className="flex justify-between border-b pb-2">
                          <span>NIK</span>
                          <span className="text-slate-800">3174XXXXXXXX0002</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Usia</span>
                          <span className="text-slate-800">42 Tahun</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status BPJS</span>
                          <span className="text-emerald-600 font-bold">Aktif / Terdaftar</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setAppState('welcome')}
                      className="w-full py-3 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 text-xs font-black uppercase transition active:scale-98 flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar dari Aplikasi</span>
                    </button>
                  </div>
                )}

                {/* 
                  ==============================================================
                  BOTTOM MOBILE TAB BAR NAVIGATION (DARK GREEN, ACTIVE STATE YELLOW)
                  ==============================================================
                */}
                <nav className="absolute bottom-0 left-0 w-full bg-[#00875A] text-white flex items-center justify-between py-1.5 px-3 border-t border-emerald-700 shadow-2xl z-40">
                  {/* Button 1: Beranda */}
                  <button 
                    onClick={() => {
                      setActiveTab('dashboard');
                      setDashboardSubView('home');
                    }}
                    className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all"
                  >
                    {activeTab === 'dashboard' ? (
                      <div className="w-12 h-12 rounded-full bg-[#cbd52d] flex flex-col items-center justify-center text-slate-800 shadow-md">
                        <Home className="w-5 h-5 shrink-0 fill-slate-800 text-slate-800" />
                        <span className="text-[7.5px] font-black tracking-tight mt-0.5 leading-none">Beranda</span>
                      </div>
                    ) : (
                      <>
                        <Home className="w-5 h-5 shrink-0 text-white/95" />
                        <span className="text-[7.5px] font-bold text-white/90 mt-1 leading-none">Beranda</span>
                      </>
                    )}
                  </button>

                  {/* Button 2: Nutrisi */}
                  <button 
                    onClick={() => {
                      setActiveTab('nutrisi');
                      setNutrisiSubView('main');
                    }}
                    className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all"
                  >
                    {activeTab === 'nutrisi' ? (
                      <div className="w-12 h-12 rounded-full bg-[#cbd52d] flex flex-col items-center justify-center text-slate-800 shadow-md">
                        <Apple className="w-5 h-5 shrink-0 fill-slate-800 text-slate-800" />
                        <span className="text-[7.5px] font-black tracking-tight mt-0.5 leading-none">Nutrisi</span>
                      </div>
                    ) : (
                      <>
                        <Apple className="w-5 h-5 shrink-0 text-white/95" />
                        <span className="text-[7.5px] font-bold text-white/90 mt-1 leading-none">Nutrisi</span>
                      </>
                    )}
                  </button>

                  {/* Button 3: Challenge */}
                  <button 
                    onClick={() => {
                      setActiveTab('challenge');
                      setChallengeSubView('home');
                    }}
                    className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all"
                  >
                    {activeTab === 'challenge' ? (
                      <div className="w-12 h-12 rounded-full bg-[#cbd52d] flex flex-col items-center justify-center text-slate-800 shadow-md">
                        <Gamepad2 className="w-5 h-5 shrink-0 fill-slate-800 text-slate-800" />
                        <span className="text-[7.5px] font-black tracking-tight mt-0.5 leading-none">Challenge</span>
                      </div>
                    ) : (
                      <>
                        <Gamepad2 className="w-5 h-5 shrink-0 text-white/95" />
                        <span className="text-[7.5px] font-bold text-white/90 mt-1 leading-none">Challenge</span>
                      </>
                    )}
                  </button>

                  {/* Button 4: Riwayat */}
                  <button 
                    onClick={() => {
                      setActiveTab('riwayat');
                      setRiwayatSubView('home');
                    }}
                    className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all"
                  >
                    {activeTab === 'riwayat' ? (
                      <div className="w-12 h-12 rounded-full bg-[#cbd52d] flex flex-col items-center justify-center text-slate-800 shadow-md">
                        <ClipboardList className="w-5 h-5 shrink-0 fill-slate-800 text-slate-800" />
                        <span className="text-[7.5px] font-black tracking-tight mt-0.5 leading-none">Riwayat</span>
                      </div>
                    ) : (
                      <>
                        <ClipboardList className="w-5 h-5 shrink-0 text-white/95" />
                        <span className="text-[7.5px] font-bold text-white/90 mt-1 leading-none">Riwayat</span>
                      </>
                    )}
                  </button>

                  {/* Button 5: Profil */}
                  <button 
                    onClick={() => {
                      setActiveTab('profil');
                    }}
                    className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all"
                  >
                    {activeTab === 'profil' ? (
                      <div className="w-12 h-12 rounded-full bg-[#cbd52d] flex flex-col items-center justify-center text-slate-800 shadow-md">
                        <User className="w-5 h-5 shrink-0 fill-slate-800 text-slate-800" />
                        <span className="text-[7.5px] font-black tracking-tight mt-0.5 leading-none">Profil</span>
                      </div>
                    ) : (
                      <>
                        <User className="w-5 h-5 shrink-0 text-white/95" />
                        <span className="text-[7.5px] font-bold text-white/90 mt-1 leading-none">Profil</span>
                      </>
                    )}
                  </button>
                </nav>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
