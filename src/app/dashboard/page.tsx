'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import {
  Camera,
  Flame,
  Clock,
  Trash2,
  TrendingUp,
  Plus,
  Settings,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Target,
  CheckCircle2,
  Activity,
  Droplet,
  HeartPulse,
  Scale,
  Zap,
  ChefHat,
  Crosshair,
  Award,
  User,
  ClipboardList,
  LogOut
} from 'lucide-react';
import { PtmFocus, PTM_DETAILS } from '@/lib/mifflinStJeor';

interface HealthAction {
  id: string;
  title: string;
  category: string;
  description: string;
  current_streak: number;
  target_days: number;
  checked_today: boolean;
  tag: string;
}

export default function DashboardPage({ onLogout }: { onLogout?: () => void }) {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [todaysLogs, setTodaysLogs] = useState<any[]>([]);
  const [activePtmFocus, setActivePtmFocus] = useState<PtmFocus>('blood_sugar_control');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'nutrisi' | 'challenge' | 'riwayat' | 'profil'>('dashboard');

  // Personal Health Actions State
  const [actions, setActions] = useState<HealthAction[]>([]);

  useEffect(() => {
    // Read local profile from onboarding if present
    const savedProfile = localStorage.getItem('nutrisnap_user_profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      if (parsed.ptm_focus) {
        setActivePtmFocus(parsed.ptm_focus);
      }
    } else {
      // Default initial profile
      const defaultProfile = {
        name: 'Sofia Kusuma',
        age: 42,
        gender: 'female',
        height_cm: 160,
        weight_kg: 68,
        daily_calorie_target: 1750,
        protein_target_g: 130,
        carbs_target_g: 175,
        fat_target_g: 58,
        fiber_target_g: 32,
        imt: 26.6,
        imt_category: 'Kelebihan BB',
        ptm_focus: 'blood_sugar_control',
        ptm_detail: PTM_DETAILS['blood_sugar_control'],
      };
      setProfile(defaultProfile);
    }

    // Read or initialize health actions
    const savedActions = localStorage.getItem('nutrisnap_health_actions');
    if (savedActions) {
      setActions(JSON.parse(savedActions));
    } else {
      initializeDefaultActions(savedProfile ? JSON.parse(savedProfile).ptm_focus : 'blood_sugar_control');
    }

    // Read local food logs from pantry / scan
    const localLogs = JSON.parse(localStorage.getItem('nutrisnap_local_food_logs') || '[]');

    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        const combined = [...localLogs, ...(d.todays_logs || [])];
        setTodaysLogs(combined);
      })
      .catch(() => {
        setData({
          user: {
            name: 'Sofia Kusuma',
            daily_calorie_target: 1750,
            consumed_calories: 680,
            protein_g: 45,
            carbs_g: 75,
            fat_g: 22,
          }
        });
        setTodaysLogs(localLogs);
      });
  }, []);

  const initializeDefaultActions = (focus: PtmFocus) => {
    let defaultList: HealthAction[] = [];

    if (focus === 'blood_sugar_control') {
      defaultList = [
        {
          id: 'action-1',
          title: 'Zero Sweet Drinks Challenge',
          category: 'Kontrol Glikemik',
          description: 'Hindari minuman manis kemasan & boba selama 7 hari penuh (Gula < 20g/hari)',
          current_streak: 4,
          target_days: 7,
          checked_today: false,
          tag: 'GULA < 20G',
        },
        {
          id: 'action-2',
          title: 'Metode Piring T (Tinggi Serat)',
          category: 'Gizi Seimbang',
          description: 'Isi 1/2 piring makan siang dengan sayur non-tepung & lalapan segar',
          current_streak: 5,
          target_days: 7,
          checked_today: true,
          tag: 'SERAT > 25G',
        },
        {
          id: 'action-3',
          title: 'Jalan Santai 15 Menit Post-Meal',
          category: 'Aktivitas Fisik',
          description: 'Jalan santai ringan sesudah makan malam untuk mencegah lonjakan gula darah',
          current_streak: 3,
          target_days: 7,
          checked_today: false,
          tag: 'POST-MEAL 15M',
        },
      ];
    } else if (focus === 'obesity_management') {
      defaultList = [
        {
          id: 'action-1',
          title: 'Defisit Energi Terukur (-400 kcal)',
          category: 'Kalori Defisit',
          description: 'Jaga asupan harian sesuai batas TDEE target tanpa skip protein',
          current_streak: 5,
          target_days: 7,
          checked_today: true,
          tag: 'DEFISIT AMAN',
        },
        {
          id: 'action-2',
          title: 'Kardio / Jalan Cepat 30 Menit',
          category: 'Aktivitas Fisik',
          description: 'Lakukan aktivitas pembakaran lemak minimal 30 menit per hari',
          current_streak: 3,
          target_days: 7,
          checked_today: false,
          tag: 'KARDIO 30M',
        },
        {
          id: 'action-3',
          title: 'Minum 1 Gelas Air 15 Menit Pra-Makan',
          category: 'Pola Makan',
          description: 'Kendalikan porsi makan secara alami dengan hidrasi optimal',
          current_streak: 6,
          target_days: 7,
          checked_today: false,
          tag: 'PORTION CONTROL',
        },
      ];
    } else {
      defaultList = [
        {
          id: 'action-1',
          title: 'Restriksi Natrium DASH (< 1 sdt Garam)',
          category: 'Pola DASH',
          description: 'Gunakan rempah aromatik pengganti garam & hindari makanan olahan kaleng',
          current_streak: 5,
          target_days: 7,
          checked_today: true,
          tag: 'GARAM < 1 SDT',
        },
        {
          id: 'action-2',
          title: 'Konsumsi Makanan Kaya Kalium Alami',
          category: 'Elektrolit Alami',
          description: 'Konsumsi minimal 1 porsi pisang/bayam/tomat/kentang rebus per hari',
          current_streak: 4,
          target_days: 7,
          checked_today: false,
          tag: 'KALIUM ALAMI',
        },
        {
          id: 'action-3',
          title: 'Latihan Relaksasi & Jalan Santai 20 Menit',
          category: 'Regulasi Tensi',
          description: 'Jalan santai dan pernapasan dalam untuk menurunkan resistensi vaskular',
          current_streak: 3,
          target_days: 7,
          checked_today: false,
          tag: 'TENSI STABIL',
        },
      ];
    }

    setActions(defaultList);
    localStorage.setItem('nutrisnap_health_actions', JSON.stringify(defaultList));
  };

  const handleToggleCheckAction = (id: string) => {
    const updated = actions.map((act) => {
      if (act.id === id) {
        const newChecked = !act.checked_today;
        return {
          ...act,
          checked_today: newChecked,
          current_streak: newChecked ? act.current_streak + 1 : Math.max(0, act.current_streak - 1),
        };
      }
      return act;
    });

    setActions(updated);
    localStorage.setItem('nutrisnap_health_actions', JSON.stringify(updated));
  };

  const handleChangePtmFocus = (focus: PtmFocus) => {
    setActivePtmFocus(focus);
    initializeDefaultActions(focus);
    if (profile) {
      const updated = {
        ...profile,
        ptm_focus: focus,
        ptm_detail: PTM_DETAILS[focus],
      };
      setProfile(updated);
      localStorage.setItem('nutrisnap_user_profile', JSON.stringify(updated));
    }
  };

  if (!data && !profile) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 animate-spin" />
          <span>Memuat Tactical Health Dashboard...</span>
        </div>
      </div>
    );
  }

  const userTarget = profile?.daily_calorie_target || data?.user?.daily_calorie_target || 1750;
  const consumedCalories = todaysLogs.reduce((acc, log) => acc + (log.calories || 0), 0) || 450;

  // Calculate Ring Progress Data
  const remainingCalories = Math.max(0, userTarget - consumedCalories);
  const pieData = [
    { name: 'Terkonsumsi', value: consumedCalories, color: '#10b981' },
    { name: 'Sisa Target', value: remainingCalories, color: '#1e293b' },
  ];

  // Macro Bar Chart Data (Actual vs Target)
  const actualProtein = todaysLogs.reduce((acc, log) => acc + (log.protein_g || 0), 0) || 35;
  const actualCarbs = todaysLogs.reduce((acc, log) => acc + (log.carbs_g || 0), 0) || 60;
  const actualFat = todaysLogs.reduce((acc, log) => acc + (log.fat_g || 0), 0) || 18;

  const targetProtein = profile?.protein_target_g || 120;
  const targetCarbs = profile?.carbs_target_g || 180;
  const targetFat = profile?.fat_target_g || 55;

  const macroComparisonData = [
    { name: 'Protein (g)', Aktual: actualProtein, Target: targetProtein },
    { name: 'Karbo (g)', Aktual: actualCarbs, Target: targetCarbs },
    { name: 'Lemak (g)', Aktual: actualFat, Target: targetFat },
  ];

  // 7-Day Calorie Trend Data
  const weeklyTrendData = [
    { day: 'Sen', kalori: 1650 },
    { day: 'Sel', kalori: 1720 },
    { day: 'Rab', kalori: 1580 },
    { day: 'Kam', kalori: 1700 },
    { day: 'Jum', kalori: 1620 },
    { day: 'Sab', kalori: 1740 },
    { day: 'Hari Ini', kalori: consumedCalories },
  ];

  // Delete Log Item
  const handleDeleteLog = (id: string) => {
    const updated = todaysLogs.filter((item) => item.id !== id);
    setTodaysLogs(updated);
    localStorage.setItem('nutrisnap_local_food_logs', JSON.stringify(updated));
  };

  // Group logs by meal_type
  const groupedLogs = {
    BREAKFAST: todaysLogs.filter((l) => l.meal_type === 'BREAKFAST'),
    LUNCH: todaysLogs.filter((l) => l.meal_type === 'LUNCH'),
    DINNER: todaysLogs.filter((l) => l.meal_type === 'DINNER'),
    SNACK: todaysLogs.filter((l) => l.meal_type === 'SNACK'),
  };

  const ptmDetail = PTM_DETAILS[activePtmFocus] || PTM_DETAILS['blood_sugar_control'];

  return (
    <div className="min-h-screen bg-[#f5faf9] text-slate-800 py-8 px-4 sm:px-6 relative overflow-hidden font-sans space-y-8">
      <header className="border-b border-teal-100/50 bg-white/80 backdrop-blur z-30 relative px-6 py-4 flex items-center justify-between -mx-4 sm:-mx-6 -mt-8 mb-4 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="h-10 flex items-center p-0.5">
            <img src="/images/logo full cekat station.png" alt="Cekat Logo" className="h-full object-contain" />
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex flex-wrap items-center gap-1.5 bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200/40">
          {[
            { id: 'dashboard', name: 'Beranda' },
            { id: 'nutrisi', name: 'Nutrisi Harian' },
            { id: 'challenge', name: 'Misi & Target' },
            { id: 'riwayat', name: 'Riwayat Screening' },
            { id: 'profil', name: 'Profil BPJS' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-white'
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
          <div className="hidden lg:flex items-center space-x-2 text-right">
            <span className="text-xs font-black text-slate-900 block leading-none">{profile?.name || 'Sofia Kusuma'}</span>
            <span className="text-[9px] text-[#2d8d81] font-bold block leading-none">Terhubung BPJS Kes</span>
          </div>
          
          <span className="text-slate-350 hidden lg:inline">|</span>

          {onLogout && (
            <button 
              onClick={onLogout}
              className="hover:text-red-650 transition font-black uppercase text-[10px] cursor-pointer"
            >
              Keluar
            </button>
          )}
          <button 
            onClick={() => {
              localStorage.removeItem('nutrisnap_user_profile');
              localStorage.removeItem('nutrisnap_health_actions');
              localStorage.removeItem('nutrisnap_local_food_logs');
              window.location.reload();
            }} 
            className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black transition active:scale-95 shadow-xs uppercase tracking-wider text-[9px] cursor-pointer"
          >
            Reset Data
          </button>
        </div>
      </header>
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#2d8d81_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
             {/* ========================================== */}
        {/* TABS CONTAINER CONTROLLER */}
        {/* ========================================== */}

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* TACTICAL PROFILE & PTM BANNER */}
            <div className="bg-white border border-teal-100/70 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider">
                    <Crosshair className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '8s' }} />
                    <span>{ptmDetail.badge}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight">
                    Halo, {profile?.name || 'Sofia Kusuma'} 👋
                  </h1>
                  <p className="text-xs text-slate-500 max-w-xl font-semibold leading-relaxed">
                    {ptmDetail.description}
                  </p>
                </div>

                {/* Quick Switcher & Action Links */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <Link
                    href="/pantry-ai"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-mono font-black text-xs uppercase flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  >
                    <ChefHat className="w-4 h-4" />
                    <span>Pantry AI</span>
                  </Link>
                  <Link
                    href="/scan"
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-55 text-xs font-mono font-bold text-slate-700 transition flex items-center gap-1.5"
                  >
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <span>Scan Gizi</span>
                  </Link>
                  <Link
                    href="/station"
                    className="px-4 py-2.5 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100/50 text-xs font-mono font-bold text-emerald-700 transition flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Kiosk Station</span>
                  </Link>
                </div>
              </div>

              {/* Tactical PTM Telemetry Quick Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 text-xs font-mono">
                <div className="p-3 bg-teal-50/30 border border-teal-100/50 rounded-2xl">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Target Kalori</span>
                  <span className="text-base font-black text-amber-700 mt-0.5 block">{userTarget} kcal</span>
                </div>
                <div className="p-3 bg-teal-50/30 border border-teal-100/50 rounded-2xl">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">IMT Tubuh</span>
                  <span className="text-base font-black text-emerald-700 mt-0.5 block">
                    {profile?.imt || 26.6} ({profile?.imt_category || 'Kelebihan BB'})
                  </span>
                </div>
                <div className="p-3 bg-teal-50/30 border border-teal-100/50 rounded-2xl">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Batas GGL Harian</span>
                  <span className="text-xs font-bold text-rose-700 mt-1 block truncate">
                    {ptmDetail.ggl_guideline.sugar_limit}
                  </span>
                </div>
                <div className="p-3 bg-teal-50/30 border border-teal-100/50 rounded-2xl">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Status Kiosk Faskes</span>
                  <span className="text-xs font-bold text-cyan-700 mt-1 block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    Antrean Sinkron
                  </span>
                </div>
              </div>
            </div>

            {/* CEKAT Station Promo Banner Card */}
            <div className="bg-gradient-to-br from-[#81c784] via-[#2e7d32] to-[#1b5e20] text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between shadow-md relative overflow-hidden text-left gap-6">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-12 -mt-12"></div>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-28 shrink-0 relative flex items-center justify-center select-none">
                  <img src="/images/cekat station.png" alt="Cekat Station Kiosk" className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition transform duration-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white leading-snug tracking-tight">Sudah cek kesehatan di CEKAT Station?</h3>
                  <p className="text-sm text-emerald-100 font-semibold leading-relaxed max-w-xl">
                    Ambil hasil screening kesehatan Anda (tensi, gula darah, kolesterol) di Kiosk Station terdekat dan sinkronkan datanya langsung ke aplikasi!
                  </p>
                  <div className="pt-2 flex items-center space-x-4 text-xs font-semibold text-emerald-250">
                    <span>📍 Faskes Terdekat: Puskesmas Pembantu Ds. Ngabab</span>
                    <span>• Buka 08.00-14.00</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('riwayat')}
                className="px-6 py-3 bg-[#cbd52d] hover:bg-[#b0ba24] text-slate-900 font-black rounded-full text-xs uppercase tracking-wider transition active:scale-95 shadow-sm whitespace-nowrap z-10 shrink-0 cursor-pointer"
              >
                Lihat Hasil Screening &gt;
              </button>
            </div>

            {/* 6 Grid Menus */}
            <div className="space-y-4 text-left">
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight font-mono">Layanan Kesehatan CEKAT</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1: Edukasi Kesehatan */}
                <div 
                  onClick={() => alert('Membuka materi edukasi kesehatan...')}
                  className="bg-white border border-teal-50 hover:border-emerald-250 rounded-3xl p-5 shadow-xs transition hover:-translate-y-1 duration-200 cursor-pointer flex gap-4 text-left group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    <img src="/images/icon_edukasi.jpg" alt="Edukasi" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-850 font-mono group-hover:text-emerald-700">Edukasi Kesehatanmu</h3>
                    <p className="text-[11.5px] text-slate-500 font-semibold leading-relaxed">Informasi medis, panduan gizi seimbang, dan tips pola asuh sehat.</p>
                  </div>
                </div>

                {/* Card 2: Cek Risiko Kesehatan */}
                <div 
                  onClick={() => setActiveTab('riwayat')}
                  className="bg-white border border-teal-50 hover:border-emerald-250 rounded-3xl p-5 shadow-xs transition hover:-translate-y-1 duration-200 cursor-pointer flex gap-4 text-left group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    <img src="/images/icon_risiko.jpg" alt="Risiko" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-850 font-mono group-hover:text-emerald-700">Cek Risiko Kesehatan</h3>
                    <p className="text-[11.5px] text-slate-500 font-semibold leading-relaxed">Kalkulator skrining mandiri untuk penyakit tidak menular (PTM).</p>
                  </div>
                </div>

                {/* Card 3: Langkah Sehatmu */}
                <div 
                  onClick={() => setActiveTab('challenge')}
                  className="bg-white border border-teal-50 hover:border-emerald-250 rounded-3xl p-5 shadow-xs transition hover:-translate-y-1 duration-200 cursor-pointer flex gap-4 text-left group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    <img src="/images/icon_langkah.jpg" alt="Langkah" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-850 font-mono group-hover:text-emerald-700">Langkah Sehatmu</h3>
                    <p className="text-[11.5px] text-slate-500 font-semibold leading-relaxed">Misi harian pencegahan PTM, aktivitas fisik, dan target nutrisi.</p>
                  </div>
                </div>

                {/* Card 4: Kebutuhanmu */}
                <div 
                  onClick={() => alert('Membuka program kebutuhanmu...')}
                  className="bg-white border border-teal-50 hover:border-emerald-250 rounded-3xl p-5 shadow-xs transition hover:-translate-y-1 duration-200 cursor-pointer flex gap-4 text-left group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    <img src="/images/icon_kebutuhan.jpg" alt="Kebutuhan" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-850 font-mono group-hover:text-emerald-700">Kebutuhanmu</h3>
                    <p className="text-[11.5px] text-slate-500 font-semibold leading-relaxed">Layanan konsultasi gizi terpadu, rujukan, dan resep gizi klinis.</p>
                  </div>
                </div>

                {/* Card 5: Pengingat & Jadwal */}
                <div 
                  onClick={() => alert('Membuka jadwal pengingat obat & kontrol...')}
                  className="bg-white border border-teal-50 hover:border-emerald-250 rounded-3xl p-5 shadow-xs transition hover:-translate-y-1 duration-200 cursor-pointer flex gap-4 text-left group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    <img src="/images/icon_pengingat.jpg" alt="Pengingat" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-850 font-mono group-hover:text-emerald-700">Pengingat & Jadwal</h3>
                    <p className="text-[11.5px] text-slate-500 font-semibold leading-relaxed">Notifikasi minum obat, kontrol faskes, dan jadwal olahraga preventif.</p>
                  </div>
                </div>

                {/* Card 6: Tanya Ceko AI */}
                <div 
                  onClick={() => alert('Asisten AI Ceko Gizi dapat diakses via chat di pojok kanan bawah / menu mobile!')}
                  className="bg-white border border-teal-50 hover:border-emerald-250 rounded-3xl p-5 shadow-xs transition hover:-translate-y-1 duration-200 cursor-pointer flex gap-4 text-left group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shrink-0 overflow-hidden p-1">
                    <img src="/images/maskot cekat normal.png" alt="Ceko Mascot" className="w-full h-full object-contain rounded-2xl bg-white p-0.5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-850 font-mono group-hover:text-emerald-700">Tanya Ceko AI</h3>
                    <p className="text-[11.5px] text-slate-500 font-semibold leading-relaxed">Asisten kecerdasan buatan untuk konsultasi gizi, resep, dan info PTM.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {activeTab === 'nutrisi' && (
          <div className="space-y-8 animate-fadeIn">
            {/* NUTRITION VISUALIZATIONS GRID (TACTICAL RECHARTS) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Card 1: Circular Calorie HUD */}
              <div className="lg:col-span-5 bg-white border border-teal-100/50 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-600 fill-amber-400" />
                    <span>Konsumsi Kalori Hari Ini</span>
                  </h3>
                  <span className="text-xs font-mono text-emerald-700 font-bold">Target: {userTarget} kcal</span>
                </div>

                <div className="relative w-56 h-56 mx-auto flex items-center justify-center my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Inner Ring Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-slate-800 font-mono">{consumedCalories}</span>
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider font-bold">
                      kcal dikonsumsi
                    </span>
                    <span className="text-xs text-emerald-700 font-mono font-bold mt-1">
                      {remainingCalories > 0 ? `Sisa ${remainingCalories} kcal` : 'Target Terpenuhi!'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center space-x-6 text-xs font-mono text-slate-500 border-t border-slate-100 pt-3">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span>Masuk ({consumedCalories} kcal)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                    <span>Sisa ({remainingCalories} kcal)</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Macro Bar Chart */}
              <div className="lg:col-span-7 bg-white border border-teal-100/50 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Makronutrien (Aktual vs Target Klinis)</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-450">Mifflin-St Jeor PTM</span>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={macroComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderColor: '#ccfbf1',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#0f172a',
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Bar dataKey="Aktual" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* 7-Day Calorie Trend Line Chart */}
            <div className="bg-white border border-teal-100/50 rounded-3xl p-6 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>Grafik Tren Kalori Mingguan</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-700">STABIL & TERKONTROL</span>
              </div>

              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderColor: '#ccfbf1',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#0f172a',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="kalori"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* TIMELINE LOG MAKANAN HARI INI */}
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-teal-100/40 pb-2">
                <h2 className="text-lg font-black text-slate-800 font-mono uppercase flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Timeline Log Makanan Hari Ini</span>
                </h2>
                <div className="flex gap-2">
                  <Link
                    href="/pantry-ai"
                    className="text-xs font-mono font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>+ Resep Pantry AI</span>
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link
                    href="/scan"
                    className="text-xs font-mono font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>+ Scan Foto</span>
                  </Link>
                </div>
              </div>

              {todaysLogs.length === 0 ? (
                <div className="bg-teal-50/10 border border-teal-100/50 border-dashed rounded-3xl p-8 text-center space-y-3">
                  <p className="text-xs text-slate-500 font-mono">Belum ada makanan yang dicatat hari ini.</p>
                  <div className="flex justify-center gap-3">
                    <Link
                      href="/pantry-ai"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white font-mono font-bold text-xs"
                    >
                      <ChefHat className="w-4 h-4" />
                      <span>Racik di Pantry AI</span>
                    </Link>
                    <Link
                      href="/scan"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-55 text-slate-700 font-mono font-bold text-xs"
                    >
                      <Camera className="w-4 h-4 text-emerald-600" />
                      <span>Scan Foto Makanan</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todaysLogs.map((log) => (
                    <div
                      key={log.id}
                      className="bg-white border border-teal-50 rounded-2xl p-4 flex items-center justify-between hover:border-emerald-250 transition space-x-4 shadow-xs"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        {log.image_url ? (
                          <img
                            src={log.image_url}
                            alt={log.food_name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-teal-50/50 border border-teal-100/50 shrink-0 flex items-center justify-center text-lg">
                            🥗
                          </div>
                        )}
                        <div className="min-w-0 font-mono text-left">
                          <h4 className="text-xs font-bold text-slate-800 truncate">{log.food_name}</h4>
                          <p className="text-[11px] text-slate-550 mt-0.5">
                            <span className="text-amber-700 font-bold">{log.calories} kcal</span> • P:{log.protein_g}g K:{log.carbs_g}g L:{log.fat_g}g
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteLog(log.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                        title="Hapus Log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'challenge' && (
          <div className="space-y-8 animate-fadeIn text-left">
            <div className="bg-white border border-teal-100/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-emerald-600 text-xs font-mono font-bold uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    <span>Personal Health Action Protocol (PHIC 2026)</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight">
                    Target Tindakan Prioritas Mingguan
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Diterjemahkan otomatis dari data risiko Kiosk Station & profil PTM untuk membentuk kebiasaan sehat terukur.
                  </p>
                </div>

                {/* Focus Filter Pills */}
                <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/80 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => handleChangePtmFocus('blood_sugar_control')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition cursor-pointer ${
                      activePtmFocus === 'blood_sugar_control'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Gula Darah
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangePtmFocus('obesity_management')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition cursor-pointer ${
                      activePtmFocus === 'obesity_management'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Obesitas
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChangePtmFocus('hypertension_prevention')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition cursor-pointer ${
                      activePtmFocus === 'hypertension_prevention'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Tensi DASH
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {actions.map((act) => {
                  const progressPercent = Math.min(100, Math.round((act.current_streak / act.target_days) * 100));
                  return (
                    <div
                      key={act.id}
                      className={`rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition text-left ${
                        act.checked_today
                          ? 'bg-emerald-50/20 border-emerald-500/50 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:border-emerald-250 hover:bg-white'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-[9px] font-bold">
                            {act.tag}
                          </span>
                          <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-600">
                            <Flame className="w-3.5 h-3.5 fill-amber-500" />
                            <span>{act.current_streak} Hari Streak</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-black text-slate-800 font-mono leading-tight">{act.title}</h3>
                          <p className="text-[11px] text-slate-550 font-semibold mt-1 leading-relaxed">{act.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-slate-100">
                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono text-slate-500">
                            <span>Target Mingguan</span>
                            <span className="text-emerald-700 font-bold">{act.current_streak} / {act.target_days} Hari</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Interactive Check-in Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleCheckAction(act.id)}
                          className={`w-full py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer ${
                            act.checked_today
                              ? 'bg-slate-900 border border-slate-800 text-emerald-400'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs active:scale-95'
                          }`}
                        >
                          {act.checked_today ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Target Tercapai Hari Ini ✓</span>
                            </>
                          ) : (
                            <>
                              <Crosshair className="w-4 h-4 animate-pulse" />
                              <span>Check-In / Mulai Target</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'riwayat' && (
          <div className="space-y-6 text-left animate-fadeIn">
            <div className="bg-white border border-teal-100/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-emerald-600 uppercase">Riwayat Pemeriksaan Klinis</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight font-mono">Data CEKAT Kiosk Station</h2>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                  Terintegrasi Satusehat RI
                </span>
              </div>

              {/* Screening Table */}
              <div className="border border-slate-150 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs font-semibold border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase font-black">
                      <th className="py-3 px-4">Tanggal Screening</th>
                      <th className="py-3 px-4">Fasilitas Kesehatan</th>
                      <th className="py-3 px-4">Tekanan Darah (TD)</th>
                      <th className="py-3 px-4">Gula Darah Puasa (GDP)</th>
                      <th className="py-3 px-4">Lingkar Perut (LP)</th>
                      <th className="py-3 px-4">Indeks Massa Tubuh (IMT)</th>
                      <th className="py-3 px-4 text-right">Status Risiko</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-850">
                    <tr>
                      <td className="py-4 px-4 font-mono">30 Agustus 2026 08:30</td>
                      <td className="py-4 px-4">Puskesmas Pembantu Ds. Ngabab</td>
                      <td className="py-4 px-4 font-mono text-amber-700 font-bold">140/85 mmHg</td>
                      <td className="py-4 px-4 font-mono text-rose-700 font-bold">126 mg/dL</td>
                      <td className="py-4 px-4 font-mono">92 cm</td>
                      <td className="py-4 px-4 font-mono">26.6 (Kelebihan BB)</td>
                      <td className="py-4 px-4 text-right">
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-black text-[9px] uppercase tracking-wider border border-amber-100">
                          Perlu Perhatian
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-mono">15 Juli 2026 09:15</td>
                      <td className="py-4 px-4">Puskesmas Pembantu Ds. Ngabab</td>
                      <td className="py-4 px-4 font-mono text-emerald-700 font-bold">135/80 mmHg</td>
                      <td className="py-4 px-4 font-mono text-emerald-700 font-bold">110 mg/dL</td>
                      <td className="py-4 px-4 font-mono">93 cm</td>
                      <td className="py-4 px-4 font-mono">27.1 (Kelebihan BB)</td>
                      <td className="py-4 px-4 text-right">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-black text-[9px] uppercase tracking-wider border border-emerald-100">
                          Risiko Rendah
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profil' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left animate-fadeIn">
            {/* Profile Card & Metrics */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-white border border-teal-100/70 rounded-3xl p-6 shadow-sm text-center space-y-4">
                <div className="w-24 h-24 rounded-full border-4 border-[#2d8d81] mx-auto overflow-hidden shadow-md">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Sofia Profile" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-800 leading-tight">Sofia Kusuma</h3>
                  <span className="text-xs text-slate-450 font-bold block">NIK: 3174XXXXXXXX0002</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-100 mt-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 fill-emerald-100" />
                    <span>Terintegrasi BPJS Kes</span>
                  </span>
                </div>

                {/* Metrics chips */}
                <div className="grid grid-cols-3 gap-3 pt-3">
                  <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-2xl">
                    <span className="text-[10px] font-extrabold text-[#2d8d81] uppercase block">Usia</span>
                    <span className="text-sm font-black text-slate-800 block mt-0.5">28 Thn</span>
                  </div>
                  <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-2xl">
                    <span className="text-[10px] font-extrabold text-amber-700 uppercase block">Berat</span>
                    <span className="text-sm font-black text-slate-800 block mt-0.5">60 kg</span>
                  </div>
                  <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-2xl">
                    <span className="text-[10px] font-extrabold text-rose-700 uppercase block">Tinggi</span>
                    <span className="text-sm font-black text-slate-800 block mt-0.5">158 cm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Faskes Details & Settings List */}
            <div className="md:col-span-7 space-y-6">
              <div className="bg-white border border-teal-100/70 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">Informasi Faskes & Program Terdaftar</h4>
                <div className="space-y-3 text-xs text-slate-700 font-bold leading-relaxed">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-50 text-[#2d8d81] flex items-center justify-center shrink-0 text-xs font-black">✓</div>
                    <p>Fasilitas Kesehatan Tingkat Pertama (FKTP): <span className="font-black text-slate-900 block mt-0.5">Puskesmas Pembantu Ngabab, Pujon, Malang</span></p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-50 text-[#2d8d81] flex items-center justify-center shrink-0 text-xs font-black">✓</div>
                    <p>Program Pendampingan PTM BPJS: <span className="font-black text-slate-900 block mt-0.5">Pencegahan Risiko Hipertensi & Gizi Terpadu</span></p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-teal-100/70 rounded-3xl p-6 shadow-sm space-y-3">
                {[
                  { name: 'Ubah Data Fisik & Profil', icon: User, action: () => alert('Membuka pengaturan profil fisik...') },
                  { name: 'Riwayat Screening PTM', icon: ClipboardList, action: () => setActiveTab('riwayat') },
                  { name: 'Hubungkan Kartu BPJS', icon: Award, action: () => alert('Menghubungkan BPJS Kesehatan...') },
                  { name: 'Pengaturan Notifikasi', icon: Activity, action: () => alert('Membuka pengaturan notifikasi...') }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx} 
                      onClick={item.action}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-55 active:scale-98 transition cursor-pointer border border-transparent hover:border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-650 flex items-center justify-center shrink-0">
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
          </div>
        )}

      </div>
    </div>
  );
}
