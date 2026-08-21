'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Camera, 
  Sparkles, 
  Heart, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle,
  TrendingUp,
  Activity,
  Stethoscope,
  ArrowRight
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  // Auto redirect to dashboard if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('nutrisnap_logged_in') === 'true';
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [router]);

  // Selected Service state to trigger offset background card visibility (Customized to Emerald green)
  const [selectedService, setSelectedService] = useState<number>(0);

  // Demo user data accounts
  const demoUsers = [
    {
      id: 'user-1',
      name: 'Rizky Fitrianto',
      role: 'Pengguna Umum (Pencegahan PTM & Gula Darah)',
      avatar: 'RF',
      profile: {
        name: 'Rizky Fitrianto',
        age: 25,
        gender: 'male',
        height_cm: 170,
        weight_kg: 65,
        activity_level: 'moderately_active',
        daily_calorie_target: 2100,
        protein_target_g: 100,
        carbs_target_g: 220,
        fat_target_g: 60,
      }
    },
    {
      id: 'user-2',
      name: 'dr. Sarah Amanda, Sp.GK',
      role: 'Spesialis Gizi Klinik (Tenaga Medis)',
      avatar: 'SA',
      profile: {
        name: 'dr. Sarah Amanda, Sp.GK',
        age: 32,
        gender: 'female',
        height_cm: 160,
        weight_kg: 52,
        activity_level: 'active',
        daily_calorie_target: 1800,
        protein_target_g: 90,
        carbs_target_g: 190,
        fat_target_g: 50,
      }
    }
  ];

  const handleSimulateLogin = (user: typeof demoUsers[0]) => {
    localStorage.setItem('nutrisnap_logged_in', 'true');
    localStorage.setItem('nutrisnap_user_profile', JSON.stringify(user.profile));
    router.push('/dashboard');
  };

  return (
    <div className="space-y-16 pb-20 w-full overflow-x-hidden">
      
      {/* 1. Hero Section - Truly full-screen width with correct transparent navigation header padding */}
      <section className="relative w-full min-h-[640px] flex items-center bg-white pt-24 bg-[#3fa89b]">
        
        {/* Background Image of the Doctor - Covering the entire background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/landing/hero_doctor_banner.jpg" 
            alt="Doctor Banner" 
            className="w-full h-full object-cover object-[80%_center]"
          />
        </div>

        {/* Semi-transparent color overlay covering the ENTIRE banner to tint the doctor green, matching the reference image */}
        <div className="absolute inset-0 bg-[#3fa89b]/80 z-10"></div>

        {/* Hero Text content matched with clean styles */}
        <div className="max-w-2xl space-y-6 pt-36 pb-32 z-20 text-white relative pl-6 sm:pl-12 lg:pl-20 xl:pl-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
            WE PROVIDE BEST<br />HEALTHCARE
          </h1>
          <p className="text-xs sm:text-sm text-teal-50 font-bold leading-relaxed max-w-md opacity-95">
            CekGizi NutriSnap membantu Anda mendeteksi kalori piring makan secara real-time, 
            menganalisis kandungan nutrisi akurat, dan menghubungkan Anda dengan para praktisi ahli gizi handal.
          </p>
          <div className="pt-4">
            <a 
              href="#login-section"
              className="px-8 py-3.5 rounded-md bg-white text-[#2d8d81] font-extrabold text-xs shadow hover:bg-slate-50 transition"
            >
              Mulai Demo
            </a>
          </div>
        </div>

        {/* Curved SVG Wave Bottom overlaying layout background naturally without thin white lines */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] -mb-[1px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,77.77,27.7,136,39.6,204,53.5,258.89,68,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* 2. Our Departments / Services Section - Modern Minimalist Card Layout (No raw emojis, rich aesthetics) */}
      <section id="features-section" className="max-w-5xl mx-auto space-y-12 px-6 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block">LAYANAN UNGGULAN</span>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Our Services</h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold max-w-sm">
            Platform pemantauan nutrisi mandiri terintegrasi medis untuk menjaga metabolisme tubuh tetap prima.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Service 1: AI Scanner */}
          <div className="relative group">
            {/* Cyberpunk tactical offset backplate - rotates and offsets when selected */}
            <div className={`absolute -inset-1.5 rounded-2xl rounded-tl-[2.2rem] bg-emerald-500/80 transition-all duration-300 ${
              selectedService === 0 
                ? 'translate-x-2 translate-y-3 rotate-1 opacity-100 blur-[2px]' 
                : 'translate-x-0 translate-y-0 rotate-0 opacity-0 scale-95'
            }`}></div>
            
            <div 
              onClick={() => setSelectedService(0)}
              className={`relative bg-white border p-8 rounded-2xl rounded-tl-[2.2rem] hover:shadow-xl cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between space-y-6 ${
                selectedService === 0 
                  ? 'border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.15)]' 
                  : 'border-slate-100 hover:border-emerald-200'
              }`}
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 transition-transform duration-300 group-hover:scale-105">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-850 tracking-wide flex items-center justify-between">
                  <span>AI Food Scanner</span>
                  {selectedService === 0 && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black uppercase tracking-wider scale-90">ACTIVE</span>}
                </h3>
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  Deteksi otomatis kalori, protein, lemak, dan karbohidrat secara instan hanya dengan mengunggah foto makanan Anda sehari-hari.
                </p>
              </div>
              <a href="#login-section" className="text-[10px] font-black text-emerald-600 flex items-center gap-1 hover:text-emerald-700 transition">
                <span>Coba Demo</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Service 2: Gamifikasi */}
          <div className="relative group">
            {/* Cyberpunk tactical offset backplate - rotates and offsets when selected */}
            <div className={`absolute -inset-1.5 rounded-2xl rounded-tl-[2.2rem] bg-emerald-500/80 transition-all duration-300 ${
              selectedService === 1 
                ? 'translate-x-2 translate-y-3 rotate-1 opacity-100 blur-[2px]' 
                : 'translate-x-0 translate-y-0 rotate-0 opacity-0 scale-95'
            }`}></div>

            <div 
              onClick={() => setSelectedService(1)}
              className={`relative bg-white border p-8 rounded-2xl rounded-tl-[2.2rem] hover:shadow-xl cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between space-y-6 ${
                selectedService === 1 
                  ? 'border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.15)]' 
                  : 'border-slate-100 hover:border-emerald-200'
              }`}
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 transition-transform duration-300 group-hover:scale-105">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-850 tracking-wide flex items-center justify-between">
                  <span>Tantangan & Gamifikasi Gizi</span>
                  {selectedService === 1 && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black uppercase tracking-wider scale-90">ACTIVE</span>}
                </h3>
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  Ikuti misi mingguan dan pertahankan rekor beruntun (streak) makan sehat Anda untuk mengklaim lencana dan poin kesehatan.
                </p>
              </div>
              <a href="#login-section" className="text-[10px] font-black text-emerald-600 flex items-center gap-1 hover:text-emerald-700 transition">
                <span>Coba Demo</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Service 3: Dokter Sesi */}
          <div className="relative group">
            {/* Cyberpunk tactical offset backplate - rotates and offsets when selected */}
            <div className={`absolute -inset-1.5 rounded-2xl rounded-tl-[2.2rem] bg-emerald-500/80 transition-all duration-300 ${
              selectedService === 2 
                ? 'translate-x-2 translate-y-3 rotate-1 opacity-100 blur-[2px]' 
                : 'translate-x-0 translate-y-0 rotate-0 opacity-0 scale-95'
            }`}></div>

            <div 
              onClick={() => setSelectedService(2)}
              className={`relative bg-white border p-8 rounded-2xl rounded-tl-[2.2rem] hover:shadow-xl cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between space-y-6 ${
                selectedService === 2 
                  ? 'border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.15)]' 
                  : 'border-slate-100 hover:border-emerald-200'
              }`}
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 transition-transform duration-300 group-hover:scale-105">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-850 tracking-wide flex items-center justify-between">
                  <span>Konsultasi Dokter & Ahli Gizi</span>
                  {selectedService === 2 && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black uppercase tracking-wider scale-90">ACTIVE</span>}
                </h3>
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  Konsultasikan pola diet dan hasil tracking nutrisi harian Anda secara privat bersama dokter spesialis gizi klinik tersertifikasi.
                </p>
              </div>
              <a href="#login-section" className="text-[10px] font-black text-emerald-600 flex items-center gap-1 hover:text-emerald-700 transition">
                <span>Coba Demo</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Service 4: Wrapped */}
          <div className="relative group">
            {/* Cyberpunk tactical offset backplate - rotates and offsets when selected */}
            <div className={`absolute -inset-1.5 rounded-2xl rounded-tl-[2.2rem] bg-emerald-500/80 transition-all duration-300 ${
              selectedService === 3 
                ? 'translate-x-2 translate-y-3 rotate-1 opacity-100 blur-[2px]' 
                : 'translate-x-0 translate-y-0 rotate-0 opacity-0 scale-95'
            }`}></div>

            <div 
              onClick={() => setSelectedService(3)}
              className={`relative bg-white border p-8 rounded-2xl rounded-tl-[2.2rem] hover:shadow-lg cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between space-y-6 ${
                selectedService === 3 
                  ? 'border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.15)]' 
                  : 'border-slate-100 hover:border-emerald-200'
              }`}
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 transition-transform duration-300 group-hover:scale-105">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-850 tracking-wide flex items-center justify-between">
                  <span>NutriSnap Wrapped</span>
                  {selectedService === 3 && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black uppercase tracking-wider scale-90">ACTIVE</span>}
                </h3>
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  Lihat ulasan kilas balik (wrapped) nutrisi dan pola makan harian Anda sepanjang tahun yang divisualisasikan dengan infografik menarik.
                </p>
              </div>
              <a href="#login-section" className="text-[10px] font-black text-emerald-600 flex items-center gap-1 hover:text-emerald-700 transition">
                <span>Coba Demo</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section - Decorated with soft background container, glowing glassmorphism borders & shadows */}
      <section id="how-it-works-section" className="w-full bg-emerald-50/30 border-y border-emerald-100/50 py-16 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">HOW IT WORKS</h2>
            <p className="text-xs text-slate-400 font-semibold max-w-md mx-auto">
              3 langkah mudah memulai perjalanan hidup sehat Anda bersama NutriSnap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative p-8 bg-white/90 backdrop-blur-sm border border-emerald-100/60 rounded-2xl rounded-tl-[2.2rem] shadow-sm text-center space-y-5 hover:shadow-[0_8px_30px_rgb(16,185,129,0.12)] hover:border-emerald-300 transition-all duration-350 ease-out hover:-translate-y-2 group overflow-hidden">
              {/* Top right decorative background shape */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full transition-all duration-300 group-hover:scale-125"></div>
              
              {/* Step badge with ring wrapper */}
              <div className="w-12 h-12 rounded-full bg-emerald-100/70 border-2 border-emerald-200 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-105">
                <div className="w-8 h-8 rounded-full bg-[#3fa89b] text-white flex items-center justify-center text-xs font-black shadow-sm">
                  1
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-800 transition-colors duration-250 group-hover:text-[#2d8d81] tracking-wide">
                  Unggah atau Ambil Foto
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Gunakan kamera ponsel Anda untuk mengambil gambar menu makanan Anda secara langsung.
                </p>
              </div>
              
              {/* Active bottom border accent mimicking target screen orange line */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-[#3fa89b] transform translate-y-[3px] group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>

            {/* Card 2 */}
            <div className="relative p-8 bg-white/90 backdrop-blur-sm border border-emerald-100/60 rounded-2xl rounded-tl-[2.2rem] shadow-sm text-center space-y-5 hover:shadow-[0_8px_30px_rgb(16,185,129,0.12)] hover:border-emerald-300 transition-all duration-350 ease-out hover:-translate-y-2 group overflow-hidden">
              {/* Top right decorative background shape */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full transition-all duration-300 group-hover:scale-125"></div>
              
              {/* Step badge with ring wrapper */}
              <div className="w-12 h-12 rounded-full bg-emerald-100/70 border-2 border-emerald-200 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-105">
                <div className="w-8 h-8 rounded-full bg-[#3fa89b] text-white flex items-center justify-center text-xs font-black shadow-sm">
                  2
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-800 transition-colors duration-250 group-hover:text-[#2d8d81] tracking-wide">
                  Analisis Gizi Otomatis
                </h3>
                <p className="text-xs text-slate-505 leading-relaxed font-semibold">
                  Kecerdasan Buatan (AI Gemini) menganalisis kalori, kadar protein, karbohidrat, dan lemak dalam hitungan detik.
                </p>
              </div>
              
              {/* Active bottom border accent mimicking target screen orange line */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-[#3fa89b] transform translate-y-[3px] group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>

            {/* Card 3 */}
            <div className="relative p-8 bg-white/90 backdrop-blur-sm border border-emerald-100/60 rounded-2xl rounded-tl-[2.2rem] shadow-sm text-center space-y-5 hover:shadow-[0_8px_30px_rgb(16,185,129,0.12)] hover:border-emerald-300 transition-all duration-350 ease-out hover:-translate-y-2 group overflow-hidden">
              {/* Top right decorative background shape */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full transition-all duration-300 group-hover:scale-125"></div>
              
              {/* Step badge with ring wrapper */}
              <div className="w-12 h-12 rounded-full bg-emerald-100/70 border-2 border-emerald-200 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-105">
                <div className="w-8 h-8 rounded-full bg-[#3fa89b] text-white flex items-center justify-center text-xs font-black shadow-sm">
                  3
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-800 transition-colors duration-250 group-hover:text-[#2d8d81] tracking-wide">
                  Konsultasikan & Lacak
                </h3>
                <p className="text-xs text-slate-505 leading-relaxed font-semibold">
                  Simpan log ke dashboard harian Anda atau bagikan ke dokter gizi pilihan Anda untuk bimbingan langsung.
                </p>
              </div>
              
              {/* Active bottom border accent mimicking target screen orange line */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-[#3fa89b] transform translate-y-[3px] group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About Us Section */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-72 rounded-[2.5rem] overflow-hidden bg-slate-55 border border-slate-100 shadow-sm">
            <img 
              src="/landing/about_us_dietitian.jpg" 
              alt="About dietitian" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block">TENTANG KAMI</span>
            <h2 className="text-2xl font-black text-slate-800 leading-tight">Membentuk Kebiasaan Makan Sehat Secara Ilmiah</h2>
            <p className="text-xs text-slate-505 leading-relaxed font-semibold">
              NutriSnap dikembangkan bersama praktisi nutrisi Indonesia untuk menghadirkan tracking gizi tanpa repot. 
              Melalui deteksi Gemini AI Vision, kami membantu Anda mengenali pola makan harian dengan tepat guna menghindari risiko penyakit metabolik.
            </p>
            <div className="pt-2">
              <a 
                href="#login-section"
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
              >
                Lihat Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Doctors Section - Fixed contrast with white background and green highlight accents */}
      <section id="doctors-section" className="max-w-5xl mx-auto px-6 scroll-mt-24 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-800">OUR DOCTORS</h2>
          <p className="text-xs text-slate-505 font-semibold max-w-md mx-auto">
            Tim dokter spesialis gizi klinik dan nutrisionis tersertifikasi yang siap mendampingi program kesehatan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-emerald-250 transition duration-300">
            <img src="/landing/doctor_sarah_photo.jpg" alt="Doctor 1" className="w-20 h-20 rounded-full object-cover border-2 border-emerald-100 shadow-sm" />
            <div>
              <h4 className="text-xs font-bold text-slate-850">dr. Sarah Amanda, Sp.GK</h4>
              <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest mt-1">Spesialis Gizi Klinik</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-emerald-250 transition duration-300">
            <img src="/landing/dietitian_budi_photo.jpg" alt="Doctor 2" className="w-20 h-20 rounded-full object-cover border-2 border-emerald-100 shadow-sm" />
            <div>
              <h4 className="text-xs font-bold text-slate-850">dr. Budi Kusuma, M.Gizi</h4>
              <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest mt-1">Pencernaan & Diet Herbal</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-emerald-250 transition duration-300">
            <img src="/landing/nutritionist_dimas_photo.jpg" alt="Doctor 3" className="w-20 h-20 rounded-full object-cover border-2 border-emerald-100 shadow-sm" />
            <div>
              <h4 className="text-xs font-bold text-slate-850">Dimas Prasetyo, S.Gz</h4>
              <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest mt-1">Gizi Olahraga & Kebugaran</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section id="testimonials-section" className="max-w-5xl mx-auto px-6 scroll-mt-24 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">WHAT USERS SAY</h2>
          <p className="text-xs text-slate-400 font-semibold max-w-md mx-auto">
            Cerita sukses dari mereka yang telah mengubah pola hidup menjadi lebih sehat bersama NutriSnap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <p className="text-xs text-slate-505 leading-relaxed italic font-semibold">
              &ldquo;Dulu saya malas mencatat makanan karena ribet memasukkan data kalori satu per satu. Dengan NutriSnap, saya tinggal jepret foto piring makan siang saya, dan Gemini langsung menghitung kadar protein & karbohidratnya secara instan!&rdquo;
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-xs">
                AH
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Ahmad Hermawan</h4>
                <span className="text-[9px] text-slate-405 block font-semibold">Pengguna 3 Bulan</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <p className="text-xs text-slate-550 leading-relaxed italic font-semibold">
              &ldquo;Fitur konsultasi dokter gizi sangat menolong. Saya bisa langsung membagikan riwayat asupan log kalori mingguan saya kepada dokter tanpa perlu mencatat ulang secara manual. Sangat efisien!&rdquo;
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-xs">
                YN
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-850">Yulia Ningsih</h4>
                <span className="text-[9px] text-slate-405 block font-semibold">Ibu Rumah Tangga</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Demo Account Selector */}
      <section id="login-section" className="max-w-xl mx-auto px-6 scroll-mt-24">
        <div className="bg-white border border-slate-100 p-8 rounded-3xl space-y-6 shadow-sm">
          <div className="text-center space-y-1.5">
            <h3 className="text-lg font-black text-slate-850">Akses Masuk Cepat</h3>
            <p className="text-xs text-slate-500 font-semibold">
              Silakan pilih salah satu role akun demo berikut untuk mencoba seluruh fitur NutriSnap.
            </p>
          </div>

          <div className="space-y-3">
            {demoUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSimulateLogin(user)}
                className="w-full p-4 rounded-2xl border border-slate-100 hover:border-emerald-250 hover:bg-emerald-50/10 text-left flex items-center justify-between transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-xs">
                    {user.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-755 transition">
                      {user.name}
                    </h4>
                    <span className="text-[10px] text-slate-405 font-semibold block mt-0.5">
                      {user.role}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-305 group-hover:text-emerald-600 transition" />
              </button>
            ))}
          </div>

          <div className="text-center text-[10px] text-slate-405 font-semibold flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulasi login sandboxed. Data disimpan di memori lokal.</span>
          </div>
        </div>
      </section>

    </div>
  );
}
