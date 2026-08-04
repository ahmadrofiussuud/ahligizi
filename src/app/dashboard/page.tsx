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
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [todaysLogs, setTodaysLogs] = useState<any[]>([]);

  useEffect(() => {
    // Read local profile from onboarding if present
    const savedProfile = localStorage.getItem('nutrisnap_user_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setTodaysLogs(d.todays_logs || []);
      });
  }, []);

  if (!data) {
    return <div className="p-8 text-center text-slate-500">Loading Dashboard...</div>;
  }

  const userTarget = profile?.daily_calorie_target || data.user.daily_calorie_target;
  const consumedCalories = todaysLogs.reduce((acc, log) => acc + (log.calories || 0), 0) || data.user.consumed_calories;

  // Calculate Ring Progress Data
  const remainingCalories = Math.max(0, userTarget - consumedCalories);
  const pieData = [
    { name: 'Terkonsumsi', value: consumedCalories, color: '#10b981' },
    { name: 'Sisa Target', value: remainingCalories, color: '#e2e8f0' },
  ];

  // Macro Bar Chart Data (Actual vs Target)
  const actualProtein = todaysLogs.reduce((acc, log) => acc + (log.protein_g || 0), 0) || data.user.protein_g;
  const actualCarbs = todaysLogs.reduce((acc, log) => acc + (log.carbs_g || 0), 0) || data.user.carbs_g;
  const actualFat = todaysLogs.reduce((acc, log) => acc + (log.fat_g || 0), 0) || data.user.fat_g;

  const targetProtein = profile?.protein_target_g || 100;
  const targetCarbs = profile?.carbs_target_g || 220;
  const targetFat = profile?.fat_target_g || 60;

  const macroComparisonData = [
    { name: 'Protein (g)', Aktual: actualProtein, Target: targetProtein },
    { name: 'Karbo (g)', Aktual: actualCarbs, Target: targetCarbs },
    { name: 'Lemak (g)', Aktual: actualFat, Target: targetFat },
  ];

  // 7-Day Calorie Trend Data (Mock timeline)
  const weeklyTrendData = [
    { day: 'Senin', kalori: 1850 },
    { day: 'Selasa', kalori: 1920 },
    { day: 'Rabu', kalori: 1780 },
    { day: 'Kamis', kalori: 2100 },
    { day: 'Jumat', kalori: 1650 },
    { day: 'Sabtu', kalori: 2050 },
    { day: 'Hari Ini', kalori: consumedCalories },
  ];

  // Delete Log Item
  const handleDeleteLog = (id: string) => {
    setTodaysLogs((prev) => prev.filter((item) => item.id !== id));
  };

  // Group logs by meal_type
  const groupedLogs = {
    BREAKFAST: todaysLogs.filter((l) => l.meal_type === 'BREAKFAST'),
    LUNCH: todaysLogs.filter((l) => l.meal_type === 'LUNCH'),
    DINNER: todaysLogs.filter((l) => l.meal_type === 'DINNER'),
    SNACK: todaysLogs.filter((l) => l.meal_type === 'SNACK'),
  };

  return (
    <div className="space-y-8">
      {/* Header Profile Greeting & Onboarding Quick Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-white to-emerald-50/40 border border-emerald-100 p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Selamat Datang, {profile?.name || data.user.name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Ringkasan nutrisi harian dihitung berdasarkan metode <strong>Mifflin-St Jeor</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/onboarding"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-emerald-100 text-slate-700 font-bold text-xs shadow-sm transition"
          >
            <Settings className="w-4 h-4 text-emerald-600" />
            <span>Update Profil Gizi</span>
          </Link>

          <Link
            href="/scan"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-sm hover:brightness-105 active:scale-95 transition"
          >
            <Camera className="w-4 h-4" />
            <span>+ Scan Makanan</span>
          </Link>
        </div>
      </div>

      {/* Top Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1: Circular Progress Ring Kalori Hari Ini */}
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 flex flex-col items-center justify-between space-y-4 shadow-sm">
          <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Ringkasan Kalori Hari Ini</span>
            </h3>
            <span className="text-xs text-slate-500 font-bold">Target: {userTarget} kcal</span>
          </div>

          <div className="relative w-56 h-56 flex items-center justify-center">
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
              <span className="text-3xl font-black text-slate-800">{consumedCalories}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                kcal dikonsumsi
              </span>
              <span className="text-xs text-emerald-600 font-black mt-1">
                {remainingCalories > 0 ? `Sisa ${remainingCalories} kcal` : 'Target Terpenuhi!'}
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-6 text-xs text-slate-655 font-semibold">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span>Dikonsumsi ({consumedCalories} kcal)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-200 inline-block"></span>
              <span>Sisa ({remainingCalories} kcal)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Bar Chart Perbandingan Makronutrien (Aktual vs Target) */}
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Breakdown Makronutrien (Aktual vs Target)</span>
            </h3>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={macroComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
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
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-500" />
          <span>Grafik Tren Kalori 7 Hari Terakhir</span>
        </h3>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="kalori" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grouped Food Logs Timeline */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>Timeline Log Makanan Hari Ini</span>
          </h2>
          <Link
            href="/scan"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
          >
            <span>+ Log Makanan Baru</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {todaysLogs.length === 0 ? (
          <div className="bg-white border border-emerald-100 rounded-3xl p-8 text-center space-y-3 shadow-sm">
            <p className="text-xs text-slate-500 font-semibold">Belum ada makanan yang dicatat hari ini.</p>
            <Link
              href="/scan"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Makanan Sekarang</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'] as const).map((type) => {
              const logs = groupedLogs[type];
              if (!logs || logs.length === 0) return null;

              const title =
                type === 'BREAKFAST'
                  ? 'Sarapan (Breakfast)'
                  : type === 'LUNCH'
                  ? 'Makan Siang (Lunch)'
                  : type === 'DINNER'
                  ? 'Makan Malam (Dinner)'
                  : 'Camilan (Snack)';

              return (
                <div key={type} className="space-y-3">
                  <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider block">
                    {title}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {logs.map((log) => (
                      <div
                        key={log.id}
                        className="bg-white border border-emerald-100 rounded-2xl p-4 flex items-center justify-between hover:border-emerald-300 transition space-x-4 shadow-sm"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          {log.image_url ? (
                            <img
                              src={log.image_url}
                              alt={log.food_name}
                              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-emerald-100"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-slate-100 shrink-0 flex items-center justify-center text-slate-500 font-bold">
                              🥗
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-slate-800 truncate">{log.food_name}</h4>
                            <p className="text-xs text-slate-500 mt-0.5 font-medium">
                              {log.calories} kcal • P:{log.protein_g}g K:{log.carbs_g}g L:{log.fat_g}g
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteLog(log.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
                          title="Hapus Log"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
