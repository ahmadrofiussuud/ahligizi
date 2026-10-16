'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  Heart, 
  Baby, 
  Pill, 
  AlertTriangle, 
  FileText, 
  Printer, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Info, 
  ArrowUpRight, 
  Lock, 
  TrendingUp,
  Download,
  Building2,
  ChevronRight
} from 'lucide-react';

export default function RekapKesehatanDesaPage() {
  const [selectedDusun, setSelectedDusun] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('okt-2026');
  const [showLegalModal, setShowLegalModal] = useState<boolean>(false);

  // Data Agregat Desa (Anonim & De-Identified sesuai UU PDP & Permenkes 24/2022)
  const statsOverview = {
    desaName: 'Desa Ngabab',
    kecamatan: 'Kecamatan Pujon',
    kabupaten: 'Kabupaten Malang, Jawa Timur',
    totalPendudukSasaran: 1475,
    totalSkriningSelesai: 1248,
    cakupanSkriningPersen: 84.6,
    kategoriRisikoRendah: 854, // 68.4%
    kategoriRisikoSedang: 275, // 22.0%
    kategoriRisikoTinggi: 119, // 9.5%
    kepatuhanObatDesa: 82.1,
    balitaPantauKhusus: 14, // 5.8% dari 242 balita
    balitaGiziBaik: 228,
  };

  const dusunBreakdown = [
    {
      id: 'krajan',
      nama: 'Dusun Krajan',
      populasiSasaran: 580,
      terSkrining: 512,
      persenCakupan: 88.3,
      risikoTinggi: 46,
      persenTinggi: 9.0,
      kepatuhanObat: 84.5,
      balitaStunting: 5,
      status: 'Wilayah Terpantau Baik',
    },
    {
      id: 'torongrejo',
      nama: 'Dusun Torongrejo',
      populasiSasaran: 460,
      terSkrining: 382,
      persenCakupan: 83.0,
      risikoTinggi: 39,
      persenTinggi: 10.2,
      kepatuhanObat: 79.2,
      balitaStunting: 4,
      status: 'Perlu Penguatan Senam Lansia',
    },
    {
      id: 'ngabab-timur',
      nama: 'Dusun Ngabab Timur',
      populasiSasaran: 435,
      terSkrining: 354,
      persenCakupan: 81.4,
      risikoTinggi: 34,
      persenTinggi: 9.6,
      kepatuhanObat: 81.8,
      balitaStunting: 5,
      status: 'Distribusi PMT Balita Rutin',
    },
  ];

  const filteredDusunList = selectedDusun === 'all' 
    ? dusunBreakdown 
    : dusunBreakdown.filter(d => d.id === selectedDusun);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. Header & Location Breadcrumb */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Profil Komunitas Desa
              </span>
              <span className="text-teal-200/80 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-300" />
                {statsOverview.desaName}, {statsOverview.kecamatan}, {statsOverview.kabupaten}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Rekap Data Kesehatan Masyarakat Desa
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-normal">
              Ringkasan data agregat kesehatan populasi desa untuk deteksi dini risiko Penyakit Tidak Menular (PTM), 
              pemantauan nutrisi balita 1000 HPK, dan evaluasi kepatuhan terapi warga secara kolektif.
            </p>

            {/* Legal Compliance Badge Button */}
            <div className="pt-1">
              <button
                onClick={() => setShowLegalModal(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold transition backdrop-blur-sm"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Kepatuhan UU PDP No. 27/2022 & Permenkes No. 24/2022 (Data Anonim Terverifikasi)</span>
                <Info className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>
          </div>

          {/* Quick Actions (Print / Filter) */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Ekspor Rekap Resmi</span>
            </button>
            <Link
              href="/station"
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Activity className="w-4 h-4 text-emerald-300" />
              <span>Input Data di Kiosk Station</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Privacy & Regulatory Compliance Notice Banner */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3.5 text-slate-800 shadow-sm">
        <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-amber-950 flex items-center gap-2">
            Pernyataan Kepatuhan Keamanan & Kerahasiaan Data Medis Masyarakat Indonesia
          </h4>
          <p className="text-amber-900/90 leading-relaxed font-medium">
            Sesuai amanat <strong>Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)</strong> serta 
            <strong> Permenkes RI No. 24 Tahun 2022 tentang Rekam Medis</strong>, halaman ini 
            <strong> sama sekali tidak menampilkan nama perseorangan, NIK, alamat rumah, maupun riwayat medis individu</strong>. 
            Semua angka disajikan dalam wujud statistik agregat teranonimkan untuk kebutuhan advokasi kebijakan faskes, 
            posyandu desa, dan pemantauan preventif Puskesmas.
          </p>
        </div>
      </div>

      {/* 3. Filters: Dusun & Periode */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-600 flex items-center gap-1.5 mr-1">
            <Building2 className="w-4 h-4 text-emerald-600" />
            Wilayah Dusun:
          </span>
          <button
            onClick={() => setSelectedDusun('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              selectedDusun === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Semua Wilayah ({statsOverview.desaName})
          </button>
          <button
            onClick={() => setSelectedDusun('krajan')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              selectedDusun === 'krajan'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Dusun Krajan
          </button>
          <button
            onClick={() => setSelectedDusun('torongrejo')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              selectedDusun === 'torongrejo'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Dusun Torongrejo
          </button>
          <button
            onClick={() => setSelectedDusun('ngabab-timur')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              selectedDusun === 'ngabab-timur'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Dusun Ngabab Timur
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-slate-600">Periode Data:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="okt-2026">Oktober 2026 (Bulan Berjalan)</option>
            <option value="triwulan-3">Triwulan III 2026</option>
            <option value="tahun-2026">Akumulasi Tahun 2026</option>
          </select>
        </div>
      </div>

      {/* 4. Core KPI Metrik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Cakupan Skrining */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cakupan Skrining</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {statsOverview.totalSkriningSelesai.toLocaleString('id-ID')}{' '}
              <span className="text-xs font-bold text-slate-400">/ {statsOverview.totalPendudukSasaran.toLocaleString('id-ID')} Jiwa</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {statsOverview.cakupanSkriningPersen}% Terlaksana
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Usia &ge; 15 tahun</span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${statsOverview.cakupanSkriningPersen}%` }} />
          </div>
        </div>

        {/* Card 2: Prevalensi Bebas Risiko PTM */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tensi & Gula Normal</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {statsOverview.kategoriRisikoRendah.toLocaleString('id-ID')}{' '}
              <span className="text-xs font-bold text-slate-400">Jiwa (68.4%)</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-emerald-600 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Status Sehat & Terkendali</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            275 Sedang (22.0%) • 119 Tinggi (9.5%)
          </div>
        </div>

        {/* Card 3: Gizi Balita & 1000 HPK */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gizi Balita Desa</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Baby className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              94.2%{' '}
              <span className="text-xs font-bold text-slate-400">Gizi Baik ({statsOverview.balitaGiziBaik} Anak)</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-amber-600 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{statsOverview.balitaPantauKhusus} Balita Pantau Khusus PMT</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
            <div className="bg-sky-500 h-full" style={{ width: '94.2%' }} />
            <div className="bg-amber-400 h-full" style={{ width: '5.8%' }} />
          </div>
        </div>

        {/* Card 4: Kepatuhan Obat PTM Desa */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kepatuhan Obat PTM</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              {statsOverview.kepatuhanObatDesa}%{' '}
              <span className="text-xs font-bold text-slate-400">Rutin Minum Obat</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-indigo-600 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Meningkat +4.2% dari Triwulan II</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Program Prolanis & Pendamping Kader Aktif
          </div>
        </div>
      </div>

      {/* 5. Two Columns: Agregat Hipertensi & Agregat Gula Darah */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Distribusi Tekanan Darah Desa */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-500" />
                Distribusi Tekanan Darah Komunitas
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Prevalensi klasifikasi tensi dari 1.248 warga ter-skrining
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
              JNC-8 / PERHI
            </span>
          </div>

          <div className="space-y-4">
            {/* Normal */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Optimal / Normal (&lt;120 / &lt;80 mmHg)
                </span>
                <span className="font-black text-slate-900">764 Jiwa (61.2%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '61.2%' }}></div>
              </div>
            </div>

            {/* Pre-Hipertensi */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  Pra-Hipertensi (120-139 / 80-89 mmHg)
                </span>
                <span className="font-black text-slate-900">303 Jiwa (24.3%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '24.3%' }}></div>
              </div>
            </div>

            {/* Hipertensi Derajat 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  Hipertensi Tingkat 1 (140-159 / 90-99 mmHg)
                </span>
                <span className="font-black text-slate-900">144 Jiwa (11.5%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '11.5%' }}></div>
              </div>
            </div>

            {/* Hipertensi Derajat 2 / Krisis */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                  Hipertensi Tingkat 2 (&ge;160 / &ge;100 mmHg)
                </span>
                <span className="font-black text-slate-900">37 Jiwa (3.0%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-600 h-full rounded-full" style={{ width: '3.0%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold">Tindak Lanjut Medis Desa:</span>
            <span className="font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
              181 Warga Masuk Program Prolanis Faskes
            </span>
          </div>
        </div>

        {/* Distribusi Glukosa Darah Desa */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-teal-600" />
                Distribusi Gula Darah Komunitas
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Hasil skrining glukosa acak & puasa warga desa
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
              PERKENI 2021
            </span>
          </div>

          <div className="space-y-4">
            {/* Normal */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Glukosa Darah Normal (&lt;100 mg/dL puasa / &lt;140 sewaktu)
                </span>
                <span className="font-black text-slate-900">917 Jiwa (73.5%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '73.5%' }}></div>
              </div>
            </div>

            {/* Pra-Diabetes */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  Toleransi Glukosa Terganggu / Pra-Diabetes (140-199 mg/dL)
                </span>
                <span className="font-black text-slate-900">227 Jiwa (18.2%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '18.2%' }}></div>
              </div>
            </div>

            {/* Risiko Diabetes */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                  Terindikasi Diabetes Melitus (&ge;200 mg/dL sewaktu)
                </span>
                <span className="font-black text-slate-900">104 Jiwa (8.3%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-600 h-full rounded-full" style={{ width: '8.3%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold">Intervensi Gizi & Menu Desa:</span>
            <span className="font-bold text-teal-800 bg-teal-100/70 px-2.5 py-1 rounded-lg">
              Edukasi Indeks Glikemik Jagung & Sayur Lokal
            </span>
          </div>
        </div>

      </div>

      {/* 6. Breakdown Agregat Sebaran Wilayah per Dusun (Tabel Anonim) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Sebaran Data Agregat per Dusun
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Data perbandingan tingkat partisipasi dan capaian kesehatan antar wilayah rukun warga
            </p>
          </div>
          <span className="text-[11px] text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            Data Agregat Wilayah (Tanpa Identitas Individu)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Nama Wilayah Dusun</th>
                <th className="py-3 px-3 text-center">Sasaran Warga</th>
                <th className="py-3 px-3 text-center">Cakupan Skrining</th>
                <th className="py-3 px-3 text-center">Risiko PTM Tinggi</th>
                <th className="py-3 px-3 text-center">Kepatuhan Obat</th>
                <th className="py-3 px-3 text-center">Balita Pantau PMT</th>
                <th className="py-3 px-3 text-left">Fokus Intervensi Desa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredDusunList.map((dusun) => (
                <tr key={dusun.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-3 font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{dusun.nama}</span>
                  </td>
                  <td className="py-3.5 px-3 text-center font-semibold">
                    {dusun.populasiSasaran} Jiwa
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                      {dusun.terSkrining} ({dusun.persenCakupan}%)
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold">
                      {dusun.risikoTinggi} Jiwa ({dusun.persenTinggi}%)
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-indigo-700">
                    {dusun.kepatuhanObat}%
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-amber-700">
                    {dusun.balitaStunting} Balita
                  </td>
                  <td className="py-3.5 px-3 text-left">
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {dusun.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Action Plan & Intervensi Preventif Desa */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-emerald-950">
              Rekomendasi Rencana Aksi Program Desa Sehat
            </h3>
          </div>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-200/60 px-3 py-1 rounded-full">
            Tindak Lanjut Terjadwal
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="bg-white p-4 rounded-2xl border border-emerald-100 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">1</span>
              <span>Posbindu PTM Keliling</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              Jadwal skrining rutin tensi & glukosa jemput bola tiap Sabtu pagi di balai dusun untuk 227 warga dengan pra-diabetes.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-100 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px]">2</span>
              <span>Distribusi PMT Balita Terpadu</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              Pemberian Makanan Tambahan berbasis pangan lokal telur, susu, dan wortel Pujon kepada 14 balita kategori pantau khusus.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-100 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-[10px]">3</span>
              <span>Pengingat Obat via Kader Posyandu</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              Kader mendampingi pasien hipertensi & diabetes untuk memastikan keteraturan konsumsi obat tanpa keterlambatan resep faskes.
            </p>
          </div>
        </div>
      </div>

      {/* 8. Modal Edukasi UU PDP & Permenkes 24/2022 */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-100">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Landasan Hukum & Privasi Data</h3>
                  <span className="text-xs text-slate-500 font-semibold">Regulasi Kesehatan Republik Indonesia</span>
                </div>
              </div>
              <button
                onClick={() => setShowLegalModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed font-medium">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">1. UU No. 27 Tahun 2022 (Pelindungan Data Pribadi / UU PDP)</span>
                <p>
                  Pasal 4 ayat (2) mengklasifikasikan data kesehatan sebagai <em>Data Pribadi yang Bersifat Spesifik</em>. 
                  Sistem CEKAT menerapkan enkripsi end-to-end dan menyajikan tampilan publik desa secara murni dalam bentuk 
                  <strong> data agregat de-identified</strong>, sehingga privasi warga terlindungi penuh dari risiko kebocoran data.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">2. Permenkes No. 24 Tahun 2022 (Rekam Medis Elektronik)</span>
                <p>
                  Pasal 26 & 28 mengatur kerahasiaan isi rekam medis individu pasien. Pembagian data untuk kepentingan 
                  statistik surveilans kesehatan masyarakat diperbolehkan <strong>hanya tanpa membuka identitas perorangan</strong> (anonymized aggregates).
                </p>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-100 text-emerald-850">
                <span className="font-bold block mb-1">Status Kepatuhan Sistem:</span>
                Platform CEKAT secara otomatis memvalidasi bahwa tidak ada parameter NIK, nama lengkap, atau alamat rumah yang disalurkan ke tampilan publik rekap desa ini.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowLegalModal(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
              >
                Saya Mengerti & Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
