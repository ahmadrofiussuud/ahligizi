'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  Share2, 
  Flame, 
  Award, 
  Heart, 
  AlertCircle,
  Clock
} from 'lucide-react';

export default function WrappedPage() {
  const [data, setData] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  
  const slideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch wrapped data for 2026
    fetch('/api/wrapped/2026')
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  if (!data) return <div className="p-8 text-center text-slate-500 font-semibold">Loading Wrapped Experience...</div>;

  // 1. Data threshold verification (requires at least 30 food logs)
  if (!data.has_enough_data) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-6 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-805">Wrapped Belum Siap</h2>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Kamu membutuhkan minimal <strong>30 hari mencatat makanan</strong> untuk membuka halaman Nutrition Wrapped tahun ini.
          </p>
        </div>
        
        {/* Progress status */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 shadow-inner">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Progress Log</span>
            <span>{data.current_days} / 30 Hari</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (data.current_days / 30) * 100)}%` }}
            ></div>
          </div>
        </div>

        <p className="text-[11px] text-slate-450 font-bold">
          Terus lakukan scan makanan di menu utama untuk melengkapi log gizi tahunan kamu!
        </p>
      </div>
    );
  }

  const { stats } = data;

  // 2. Story Slides content definer with clean white themes and card interfaces
  const slides = [
    // Slide 1: Welcome Intro
    {
      bg: 'from-emerald-500 to-teal-600',
      isDark: true,
      content: (
        <div className="space-y-6 text-center text-white">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Nutrition Wrapped 2026</span>
          </div>
          <h1 className="text-3xl font-black leading-tight text-white">
            Hai {data.user_name},<br />Pola Makan Kamu<br />Tahun Ini Sudah Siap!
          </h1>
          <p className="text-xs text-emerald-100 max-w-xs mx-auto leading-relaxed font-semibold">
            Mari lihat perjalanan gizi, kebiasaan kalori, dan tipe persona kesehatan kamu sepanjang tahun ini.
          </p>
        </div>
      )
    },
    // Slide 2: Total Scans & Activity
    {
      bg: 'from-emerald-50/50 to-teal-50/30',
      isDark: false,
      content: (
        <div className="space-y-4 text-center">
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Aktivitas Scan</span>
          <h2 className="text-2xl font-black text-slate-800 leading-snug">
            Kamu Melakukan <span className="text-emerald-650">{stats.total_scans} Scan</span> Makanan!
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-semibold">
            Setiap jepretan foto membantu memahami asupan gizi secara ilmiah. Konsistensi yang luar biasa!
          </p>
        </div>
      )
    },
    // Slide 3: Favorite Food & Meal Time
    {
      bg: 'from-emerald-50/50 to-teal-50/30',
      isDark: false,
      content: (
        <div className="space-y-5 text-center">
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Santapan Terfavorit</span>
          <h2 className="text-xl font-black text-slate-800 leading-snug">
            {stats.favorite_food}
          </h2>
          <p className="text-xs text-emerald-700 font-bold">
            Kamu menikmatinya sebanyak {stats.favorite_food_count} kali!
          </p>
          <div className="p-3 bg-white rounded-2xl border border-slate-100 max-w-xs mx-auto text-xs text-slate-600 flex items-center justify-center gap-2 shadow-sm font-semibold">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Favorit: {stats.favorite_meal_time} ({stats.favorite_meal_time_count}x)</span>
          </div>
        </div>
      )
    },
    // Slide 4: Streaks & Badges
    {
      bg: 'from-emerald-50/50 to-teal-50/30',
      isDark: false,
      content: (
        <div className="space-y-5 text-center">
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Konsistensi & Prestasi</span>
          <div className="flex justify-center space-x-6">
            <div className="bg-white border border-slate-100 p-4 rounded-3xl w-28 shadow-sm">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500 mx-auto" />
              <span className="text-lg font-black text-slate-800 mt-1 block">{stats.longest_streak} Hari</span>
              <span className="text-[9px] text-slate-400 font-bold block">Streak Terbaik</span>
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-3xl w-28 shadow-sm">
              <Award className="w-5 h-5 text-emerald-600 mx-auto" />
              <span className="text-lg font-black text-slate-800 mt-1 block">{stats.badges_earned} Badge</span>
              <span className="text-[9px] text-slate-400 font-bold block">Terbuka</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-semibold">
            Disiplin mencatat gizi secara beruntun adalah kunci gaya hidup sehat jangka panjang.
          </p>
        </div>
      )
    },
    // Slide 5: Macro averages comparison
    {
      bg: 'from-emerald-50/50 to-teal-50/30',
      isDark: false,
      content: (
        <div className="space-y-5 text-center w-full max-w-xs mx-auto">
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">Keseimbangan Makro</span>
          <h2 className="text-base font-black text-slate-800 leading-tight">Rata-rata Distribusi Energi</h2>
          
          <div className="space-y-3.5 bg-white p-5 rounded-3xl border border-slate-100 text-left shadow-sm font-semibold">
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 font-bold">
                <span>Karbohidrat</span>
                <span className="text-slate-800">{stats.macro_percentages.carbs}% (Ideal: 45%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${stats.macro_percentages.carbs}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 font-bold">
                <span>Protein</span>
                <span className="text-slate-800">{stats.macro_percentages.protein}% (Ideal: 30%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: `${stats.macro_percentages.protein}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 font-bold">
                <span>Lemak Baik</span>
                <span className="text-slate-800">{stats.macro_percentages.fat}% (Ideal: 25%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${stats.macro_percentages.fat}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 6: Nutrition Personality Profile (Final Card)
    {
      bg: 'from-emerald-500 to-teal-600',
      isDark: true,
      isFinal: true,
      content: (
        <div className="space-y-5 text-center text-white">
          <span className="text-[10px] font-black text-emerald-100 uppercase tracking-widest block">Karakter Gizi Kamu</span>
          <h2 className="text-2xl font-black text-white">{stats.nutrition_personality}</h2>
          <p className="text-xs text-emerald-100 leading-relaxed max-w-xs mx-auto font-semibold">
            {stats.personality_description}
          </p>
          <div className="grid grid-cols-2 gap-2.5 text-left bg-white/10 p-4 rounded-3xl border border-white/20 text-[10px] text-white font-bold">
            <div>• Rata Kalori: <strong>{stats.average_calories} kcal</strong></div>
            <div>• Bulan Terbaik: <strong>{stats.best_month}</strong></div>
            <div>• Total Scan: <strong>{stats.total_scans} kali</strong></div>
            <div>• Rekor Streak: <strong>{stats.longest_streak} Hari</strong></div>
          </div>
        </div>
      )
    }
  ];

  // Slide navigation
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Export current slide as image
  const handleExportImage = async () => {
    if (!slideRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(slideRef.current, {
        backgroundColor: slides[currentSlide].isDark ? '#10b981' : '#ffffff',
        scale: 2,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `NutriSnap_Wrapped_Slide_${currentSlide + 1}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const activeSlide = slides[currentSlide];

  return (
    <div className="max-w-md mx-auto space-y-6 py-4">
      {/* Stories progress indicator */}
      <div className="flex space-x-1.5 px-2">
        {slides.map((_, index) => (
          <div key={index} className="flex-1 bg-slate-105 h-1 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-emerald-600 transition-all duration-300 ${
                index === currentSlide ? 'w-full' : index < currentSlide ? 'w-full opacity-60' : 'w-0'
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Slide Container (Viewport) */}
      <div 
        ref={slideRef}
        className={`bg-gradient-to-b ${activeSlide.bg} border ${
          activeSlide.isDark ? 'border-emerald-500' : 'border-slate-100'
        } rounded-3xl h-[460px] p-6 flex flex-col justify-between items-center relative overflow-hidden shadow-sm`}
      >
        <div className={`absolute top-4 left-6 flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest ${
          activeSlide.isDark ? 'text-emerald-100' : 'text-slate-400'
        }`}>
          <span>NutriSnap</span>
        </div>

        {/* Dynamic content rendering with slide transition animations */}
        <div className="flex-1 flex items-center justify-center w-full px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {activeSlide.content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Share watermark/footnote */}
        <div className={`text-[9px] font-black uppercase tracking-widest mb-2 flex items-center gap-1.5 ${
          activeSlide.isDark ? 'text-emerald-100' : 'text-slate-400'
        }`}>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Wrapped 2026</span>
        </div>
      </div>

      {/* Navigation & Action Buttons */}
      <div className="flex items-center justify-between px-2">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`p-3 rounded-xl border transition ${
            currentSlide === 0 
              ? 'text-slate-300 border-slate-100 cursor-not-allowed' 
              : 'text-slate-655 border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleExportImage}
          disabled={isDownloading}
          className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-700 active:scale-95 transition"
        >
          {isDownloading ? (
            <span>Mengekspor...</span>
          ) : (
            <>
              <span>Bagikan Slide</span>
            </>
          )}
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`p-3 rounded-xl border transition ${
            currentSlide === slides.length - 1 
              ? 'text-slate-300 border-slate-100 cursor-not-allowed' 
              : 'text-slate-655 border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
