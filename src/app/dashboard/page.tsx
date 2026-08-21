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
  Award
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

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [todaysLogs, setTodaysLogs] = useState<any[]>([]);
  const [activePtmFocus, setActivePtmFocus] = useState<PtmFocus>('blood_sugar_control');

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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 relative overflow-hidden font-sans space-y-8">
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* TACTICAL PROFILE & PTM BANNER */}
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur shadow-2xl relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono uppercase tracking-widest">
                <Crosshair className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>{ptmDetail.badge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Halo, {profile?.name || 'Sofia Kusuma'} 👋
              </h1>
              <p className="text-xs text-slate-400 max-w-xl font-sans leading-relaxed">
                {ptmDetail.description}
              </p>
            </div>

            {/* Quick Switcher & Action Links */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Link
                href="/pantry-ai"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-mono font-black text-xs uppercase flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <ChefHat className="w-4 h-4" />
                <span>Pantry AI</span>
              </Link>
              <Link
                href="/scan"
                className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/80 hover:bg-slate-800 text-xs font-mono font-bold text-white transition flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Scan Gizi</span>
              </Link>
              <Link
                href="/station"
                className="px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-900/40 text-xs font-mono font-bold text-emerald-300 transition flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Kiosk Station</span>
              </Link>
              <Link
                href="/onboarding"
                className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                title="Sesuaikan Profil PTM"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Tactical PTM Telemetry Quick Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80 text-xs font-mono">
            <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
              <span className="text-[9px] text-slate-400 block uppercase">Target Kalori</span>
              <span className="text-base font-black text-amber-400 mt-0.5 block">{userTarget} kcal</span>
            </div>
            <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
              <span className="text-[9px] text-slate-400 block uppercase">IMT Tubuh</span>
              <span className="text-base font-black text-teal-300 mt-0.5 block">
                {profile?.imt || 26.6} ({profile?.imt_category || 'Kelebihan BB'})
              </span>
            </div>
            <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
              <span className="text-[9px] text-slate-400 block uppercase">Batas GGL Harian</span>
              <span className="text-xs font-bold text-emerald-400 mt-1 block truncate">
                {ptmDetail.ggl_guideline.sugar_limit}
              </span>
            </div>
            <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
              <span className="text-[9px] text-slate-400 block uppercase">Status Kiosk Faskes</span>
              <span className="text-xs font-bold text-cyan-300 mt-1 block flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Antrean Sinkron
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PERSONAL HEALTH ACTION (TARGET TINDAKAN PRIORITAS MINGGUAN) */}
        {/* ======================================================== */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Personal Health Action Protocol (PHIC 2026)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Target Tindakan Prioritas Mingguan
              </h2>
              <p className="text-xs text-slate-400">
                Diterjemahkan otomatis dari data risiko Kiosk Station & profil PTM untuk membentuk kebiasaan sehat terukur.
              </p>
            </div>

            {/* Focus Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleChangePtmFocus('blood_sugar_control')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition cursor-pointer ${
                  activePtmFocus === 'blood_sugar_control'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Gula Darah
              </button>
              <button
                type="button"
                onClick={() => handleChangePtmFocus('obesity_management')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition cursor-pointer ${
                  activePtmFocus === 'obesity_management'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Obesitas
              </button>
              <button
                type="button"
                onClick={() => handleChangePtmFocus('hypertension_prevention')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition cursor-pointer ${
                  activePtmFocus === 'hypertension_prevention'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tensi DASH
              </button>
            </div>
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {actions.map((act) => {
              const progressPercent = Math.min(100, Math.round((act.current_streak / act.target_days) * 100));
              return (
                <div
                  key={act.id}
                  className={`rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition ${
                    act.checked_today
                      ? 'bg-gradient-to-b from-emerald-950/60 to-slate-950 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-[9px] font-bold">
                        {act.tag}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{act.current_streak} Hari Streak</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-white font-mono leading-tight">{act.title}</h3>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{act.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-900">
                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>Target Mingguan</span>
                        <span className="text-emerald-400 font-bold">{act.current_streak} / {act.target_days} Hari</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Interactive Check-in / Start Target Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleCheckAction(act.id)}
                      className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        act.checked_today
                          ? 'bg-emerald-950 border border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-md'
                      }`}
                    >
                      {act.checked_today ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Target Tercapai Hari Ini ✓</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span>Check-in / Mulai Target</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* NUTRITION VISUALIZATIONS GRID (TACTICAL RECHARTS) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card 1: Circular Calorie HUD (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 backdrop-blur shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Konsumsi Kalori Hari Ini</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-bold">Target: {userTarget} kcal</span>
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
                <span className="text-3xl font-black text-white font-mono">{consumedCalories}</span>
                <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">
                  kcal dikonsumsi
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold mt-1">
                  {remainingCalories > 0 ? `Sisa ${remainingCalories} kcal` : 'Target Terpenuhi!'}
                </span>
              </div>
            </div>

            <div className="flex justify-center space-x-6 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span>Masuk ({consumedCalories} kcal)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                <span>Sisa ({remainingCalories} kcal)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Macro Bar Chart (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 backdrop-blur shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Makronutrien (Aktual vs Target Klinis)</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Mifflin-St Jeor PTM</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={macroComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#020617',
                      borderColor: '#1e293b',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#f8fafc',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Aktual" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Target" fill="#334155" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* 7-Day Calorie Trend Line Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 backdrop-blur shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Grafik Tren Kalori Mingguan</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">STABIL & TERKONTROL</span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#020617',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f8fafc',
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
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-lg font-black text-white font-mono uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Timeline Log Makanan Hari Ini</span>
            </h2>
            <div className="flex gap-2">
              <Link
                href="/pantry-ai"
                className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>+ Resep Pantry AI</span>
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/scan"
                className="text-xs font-mono font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>+ Scan Foto</span>
              </Link>
            </div>
          </div>

          {todaysLogs.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 border-dashed rounded-3xl p-8 text-center space-y-3">
              <p className="text-xs text-slate-400 font-mono">Belum ada makanan yang dicatat hari ini.</p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/pantry-ai"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-mono font-bold text-xs"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>Racik di Pantry AI</span>
                </Link>
                <Link
                  href="/scan"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-white font-mono font-bold text-xs"
                >
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>Scan Foto Makanan</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todaysLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-emerald-500/40 transition space-x-4 shadow-sm"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {log.image_url ? (
                      <img
                        src={log.image_url}
                        alt={log.food_name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-800"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 shrink-0 flex items-center justify-center text-lg">
                        🥗
                      </div>
                    )}
                    <div className="min-w-0 font-mono">
                      <h4 className="text-xs font-bold text-white truncate">{log.food_name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        <span className="text-amber-400 font-bold">{log.calories} kcal</span> • P:{log.protein_g}g K:{log.carbs_g}g L:{log.fat_g}g
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteLog(log.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition cursor-pointer"
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
    </div>
  );
}
