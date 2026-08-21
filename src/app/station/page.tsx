'use client';

import React, { useState } from 'react';
import { 
  QrCode, 
  Phone, 
  Key, 
  Search, 
  Activity, 
  ArrowRight, 
  Check, 
  AlertTriangle, 
  UserCheck, 
  RefreshCw, 
  Printer, 
  ChevronRight, 
  ShieldCheck, 
  ClipboardList,
  Crosshair,
  HeartPulse,
  Droplet,
  Scale,
  Sparkles,
  CheckCircle2,
  Clock,
  Ticket,
  Flame,
  Volume2,
  Download
} from 'lucide-react';
import Link from 'next/link';

export default function CekatStation() {
  const [step, setStep] = useState<number>(1);
  
  // Step 1: Identification States
  const [identMethod, setIdentMethod] = useState<'qr' | 'phone' | 'code'>('phone');
  const [phoneInput, setPhoneInput] = useState<string>('08123456789');
  const [searchStatus, setSearchStatus] = useState<'idle' | 'searching' | 'found'>('idle');
  const [patientData, setPatientData] = useState<any>(null);

  // Step 2: Quick Health Check Input States
  const [bb, setBb] = useState<number>(72);
  const [tb, setTb] = useState<number>(165);
  const [systolic, setSystolic] = useState<number>(135);
  const [diastolic, setDiastolic] = useState<number>(88);
  const [gulaDarah, setGulaDarah] = useState<number>(128);
  const [nadi, setNadi] = useState<number>(78);
  const [lingkarPerut, setLingkarPerut] = useState<number>(89);

  // Computed IMT
  const heightInMeters = tb / 100;
  const imt = parseFloat((bb / (heightInMeters * heightInMeters)).toFixed(1));

  // Step 3: Screening Questionnaire States
  const [sayurBuah, setSayurBuah] = useState<string>('kurang');
  const [manis, setManis] = useState<boolean>(true);
  const [garamLemak, setGaramLemak] = useState<boolean>(true);
  const [olahraga, setOlahraga] = useState<string>('kurang');
  const [merokok, setMerokok] = useState<boolean>(false);
  const [riwayatKeluarga, setRiwayatKeluarga] = useState<boolean>(true);

  // Risk Score calculation
  const [riskResult, setRiskResult] = useState<'low' | 'attention' | 'high'>('attention');

  // Step 5: Queue Ticket Information
  const [queueNo, setQueueNo] = useState<string>('B-109');
  const [queueRoom, setQueueRoom] = useState<string>('Poli Edukasi & Konseling Gizi');
  const [queueEstimasi, setQueueEstimasi] = useState<string>('± 12 Menit');
  const [ticketPrinted, setTicketPrinted] = useState<boolean>(false);

  // Identification Simulation
  const handleIdentify = () => {
    setSearchStatus('searching');
    setTimeout(() => {
      setSearchStatus('found');
      setPatientData({
        name: 'Sofia Kusuma',
        age: 42,
        gender: 'Wanita',
        nik: '3174XXXXXXXX0002',
        bpjs: '0001234567890',
        lastVisit: '14 Juni 2026',
        history: 'Kecenderungan pre-hipertensi ringan & risiko gula darah postprandial di posbindu sebelumnya',
      });
    }, 1200);
  };

  // Process risk calculation & Digital Queue routing
  const calculateRisk = () => {
    let riskPoints = 0;
    
    // Quick Check Points
    if (imt >= 27) riskPoints += 3;
    else if (imt >= 25) riskPoints += 2;

    if (systolic >= 140 || diastolic >= 90) riskPoints += 3;
    else if (systolic >= 130 || diastolic >= 85) riskPoints += 2;

    if (gulaDarah >= 140) riskPoints += 3;
    else if (gulaDarah >= 110) riskPoints += 2;

    if (lingkarPerut > 90) riskPoints += 2;

    // Lifestyle points
    if (sayurBuah === 'kurang') riskPoints += 1;
    if (manis) riskPoints += 2;
    if (garamLemak) riskPoints += 1;
    if (olahraga === 'kurang') riskPoints += 2;
    if (merokok) riskPoints += 2;
    if (riwayatKeluarga) riskPoints += 2;

    if (riskPoints >= 8) {
      setRiskResult('high');
      setQueueNo('A-042');
      setQueueRoom('Poli Umum & Spesialis (Jalur Prioritas)');
      setQueueEstimasi('± 5-8 Menit');
    } else if (riskPoints >= 4) {
      setRiskResult('attention');
      setQueueNo('B-109');
      setQueueRoom('Poli Edukasi Gizi & Konseling PTM');
      setQueueEstimasi('± 12 Menit');
    } else {
      setRiskResult('low');
      setQueueNo('C-018');
      setQueueRoom('Poli Promotif / Skrining Mandiri');
      setQueueEstimasi('± 3 Menit');
    }
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between py-6 px-4 sm:px-6 relative overflow-hidden">
      {/* Tactical HUD Background Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TACTICAL HUD HEADER */}
      <header className="max-w-6xl mx-auto w-full border-b border-slate-800/80 pb-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Crosshair className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>CEKAT HEALTH STATION</span>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-950/80 text-emerald-400 font-mono border border-emerald-500/40 rounded-full">
                KIOSK v2.4 • SATUSEHAT
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
              Digital Point-of-Care & Service Navigation Kiosk
            </p>
          </div>
        </div>

        {/* Step Progress indicators */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          {[
            { num: 1, label: 'Identifikasi' },
            { num: 2, label: 'Vitalitas' },
            { num: 3, label: 'Skrining' },
            { num: 4, label: 'Navigasi' },
            { num: 5, label: 'Antrean' },
            { num: 6, label: 'Selesai' },
          ].map((s) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  step === s.num
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                    : step > s.num
                    ? 'border border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
                    : 'border border-slate-800 text-slate-600 bg-slate-900/60'
                }`}
              >
                0{s.num}
              </div>
              {s.num < 6 && (
                <div
                  className={`w-3 h-[1px] ${
                    step > s.num ? 'bg-emerald-500/60' : 'bg-slate-800'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </header>

      {/* CORE WORKSPACE */}
      <main className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center my-4 relative z-10">
        
        {/* STEP 1: IDENTIFIKASI */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verifikasi Identitas Pasien</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Identifikasi Pasien Kiosk
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Silakan lakukan verifikasi untuk memuat rekam medis gizi & riwayat pemeriksaan Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* QR Method */}
              <button
                type="button"
                onClick={() => setIdentMethod('qr')}
                className={`p-5 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-3 cursor-pointer ${
                  identMethod === 'qr'
                    ? 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                }`}
              >
                <QrCode className={`w-8 h-8 ${identMethod === 'qr' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase text-white">Scan QR Mobile</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Aplikasi CEKAT Mobile</p>
                </div>
              </button>

              {/* Phone Method */}
              <button
                type="button"
                onClick={() => setIdentMethod('phone')}
                className={`p-5 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-3 cursor-pointer ${
                  identMethod === 'phone'
                    ? 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                }`}
              >
                <Phone className={`w-8 h-8 ${identMethod === 'phone' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase text-white">Nomor Telepon</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Terdaftar di Faskes</p>
                </div>
              </button>

              {/* Code Method */}
              <button
                type="button"
                onClick={() => setIdentMethod('code')}
                className={`p-5 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-3 cursor-pointer ${
                  identMethod === 'code'
                    ? 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                }`}
              >
                <Key className={`w-8 h-8 ${identMethod === 'code' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase text-white">NIK / Kartu BPJS</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">16 Digit KTP / BPJS</p>
                </div>
              </button>
            </div>

            {/* Input field wrapper */}
            <div className="p-6 border border-slate-800 bg-slate-900/80 rounded-3xl max-w-lg mx-auto space-y-4 shadow-2xl backdrop-blur">
              {identMethod === 'qr' && (
                <div className="flex flex-col items-center justify-center p-6 border border-dashed border-emerald-500/40 bg-slate-950/80 rounded-2xl">
                  <div className="w-36 h-36 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 shadow-inner">
                    <QrCode className="w-20 h-20 text-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-emerald-400 mt-3 font-mono uppercase font-bold tracking-wider">
                    Arahkan QR Code CEKAT App ke Sensor Kiosk
                  </p>
                  <button
                    type="button"
                    onClick={handleIdentify}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold"
                  >
                    Simulasi Scan Berhasil
                  </button>
                </div>
              )}

              {identMethod === 'phone' && (
                <div className="space-y-3">
                  <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                    Input Nomor Handphone Terdaftar:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="Contoh: 08123456789"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleIdentify}
                      className="px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-xs uppercase flex items-center gap-1.5 transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      <Search className="w-4 h-4" />
                      <span>Cari</span>
                    </button>
                  </div>
                </div>
              )}

              {identMethod === 'code' && (
                <div className="space-y-3">
                  <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                    Input NIK Pasien / Nomor BPJS:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Masukkan 16 digit NIK..."
                      defaultValue="3174XXXXXXXX0002"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleIdentify}
                      className="px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-xs uppercase flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      <span>Cari</span>
                    </button>
                  </div>
                </div>
              )}

              {/* SEARCH STATUS BOX */}
              {searchStatus === 'searching' && (
                <div className="p-4 border border-emerald-500/40 bg-emerald-950/40 rounded-2xl flex items-center justify-center space-x-3 text-xs font-mono text-emerald-400">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="font-bold tracking-wider animate-pulse">Menghubungkan data SATUSEHAT Kemenkes...</span>
                </div>
              )}

              {searchStatus === 'found' && patientData && (
                <div className="p-5 border border-emerald-500/40 bg-slate-950/90 rounded-2xl space-y-4 text-xs font-mono text-slate-300 shadow-xl">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold border-b border-slate-800 pb-2.5">
                    <UserCheck className="w-4.5 h-4.5" />
                    <span className="uppercase tracking-wider">
                      Pasien Ditemukan: {patientData.name} ({patientData.age} Thn / {patientData.gender})
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-400 text-[11px]">
                    <div>NIK: <span className="text-slate-200">{patientData.nik}</span></div>
                    <div>Terakhir: <span className="text-slate-200">{patientData.lastVisit}</span></div>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] leading-relaxed text-slate-400 font-sans">
                    <strong className="text-amber-400 uppercase font-mono block mb-1">Catatan Skrining Sebelumnya:</strong>
                    {patientData.history}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    <span>Lanjutkan ke Pemeriksaan Vitalitas</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: QUICK HEALTH CHECK (VITALS TELEMETRY HUD) */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase">
                <HeartPulse className="w-3.5 h-3.5" />
                <span>Pengukuran Telemetri Fisik</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Quick Health Check (Vitals HUD)
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Masukkan data sensor fisik atau gunakan alat ukur kiosk untuk mengevaluasi parameter kardiovaskular & metabolik.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Form: Vitals input */}
              <div className="md:col-span-7 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 backdrop-blur shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Input Parameter Klinis</span>
                  <span className="text-[10px] font-mono text-slate-500">REALTIME SYNC</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Berat Badan (kg)</label>
                    <input
                      type="number"
                      value={bb}
                      onChange={(e) => setBb(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Tinggi Badan (cm)</label>
                    <input
                      type="number"
                      value={tb}
                      onChange={(e) => setTb(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Tensi Sistolik (mmHg)</label>
                    <input
                      type="number"
                      value={systolic}
                      onChange={(e) => setSystolic(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Tensi Diastolik (mmHg)</label>
                    <input
                      type="number"
                      value={diastolic}
                      onChange={(e) => setDiastolic(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Gula Darah Sewaktu (mg/dL)</label>
                    <input
                      type="number"
                      value={gulaDarah}
                      onChange={(e) => setGulaDarah(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Denyut Nadi (bpm)</label>
                    <input
                      type="number"
                      value={nadi}
                      onChange={(e) => setNadi(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Lingkar Perut (cm)</label>
                    <input
                      type="number"
                      value={lingkarPerut}
                      onChange={(e) => setLingkarPerut(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right HUD: Telemetry Assessment Card */}
              <div className="md:col-span-5 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-emerald-500/30 p-6 rounded-3xl flex flex-col justify-between space-y-4 shadow-2xl backdrop-blur">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                      Analisis Sensor IMT & PTM
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">PHIC CLASSIFIER</span>
                  </div>

                  {/* IMT BIG DISPLAY */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1 shadow-inner">
                    <span className="text-3xl font-black text-emerald-400 font-mono">{imt}</span>
                    <span className="text-[9px] text-slate-400 font-mono block uppercase">
                      Indeks Massa Tubuh ({imt >= 27 ? 'Obesitas' : imt >= 25 ? 'Kelebihan BB' : 'Normal'})
                    </span>
                  </div>

                  {/* Indicators List */}
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400">Tekanan Darah:</span>
                      <span className={`font-bold ${
                        systolic >= 140 || diastolic >= 90 ? 'text-rose-400' : systolic >= 130 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {systolic}/{diastolic} mmHg
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400">Gula Darah:</span>
                      <span className={`font-bold ${
                        gulaDarah >= 140 ? 'text-rose-400' : gulaDarah >= 110 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {gulaDarah} mg/dL
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400">Lingkar Perut:</span>
                      <span className={`font-bold ${
                        lingkarPerut > 90 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {lingkarPerut} cm
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <span>Mulai Skrining Gaya Hidup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: SCREENING QUESTIONNAIRE */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase">
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Kuesioner Gaya Hidup & Faktor Risiko</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Skrining Pencegahan PTM
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Skrining singkat mengenai pola konsumsi GGL, aktivitas fisik, dan riwayat genetik keluarga.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-5 max-w-2xl mx-auto shadow-2xl backdrop-blur">
              {/* Pola Makan */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                  01. Pola Makan & Konsumsi GGL
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300">Konsumsi Sayur & Buah:</label>
                    <select
                      value={sayurBuah}
                      onChange={(e) => setSayurBuah(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="cukup">Cukup (Min. 2 Porsi Sehari)</option>
                      <option value="kurang">Jarang Konsumsi Sayur/Buah</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300">Minuman Manis / Makanan Asin:</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setManis(true)}
                        className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition ${
                          manis ? 'border-emerald-500 bg-emerald-950/80 text-emerald-300' : 'border-slate-800 text-slate-500 bg-slate-950'
                        }`}
                      >
                        Sering
                      </button>
                      <button
                        type="button"
                        onClick={() => setManis(false)}
                        className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition ${
                          !manis ? 'border-emerald-500 bg-emerald-950/80 text-emerald-300' : 'border-slate-800 text-slate-500 bg-slate-950'
                        }`}
                      >
                        Dibatasi
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gaya Hidup */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                  02. Aktivitas Fisik & Kebiasaan
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300">Aktivitas Fisik / Olahraga:</label>
                    <select
                      value={olahraga}
                      onChange={(e) => setOlahraga(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="cukup">Aktif (Min. 30 Menit/Hari)</option>
                      <option value="kurang">Kurang Aktivitas (Sedentary)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300">Status Merokok:</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setMerokok(true)}
                        className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition ${
                          merokok ? 'border-rose-500 bg-rose-950/60 text-rose-300' : 'border-slate-800 text-slate-500 bg-slate-950'
                        }`}
                      >
                        Perokok
                      </button>
                      <button
                        type="button"
                        onClick={() => setMerokok(false)}
                        className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition ${
                          !merokok ? 'border-emerald-500 bg-emerald-950/80 text-emerald-300' : 'border-slate-800 text-slate-500 bg-slate-950'
                        }`}
                      >
                        Bukan Perokok
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Riwayat Genetik */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                  03. Riwayat Genetik Keluarga
                </span>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">
                    Ada keluarga menderita Diabetes / Hipertensi / Jantung?
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRiwayatKeluarga(true)}
                      className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition ${
                        riwayatKeluarga ? 'border-amber-500 bg-amber-950/60 text-amber-300' : 'border-slate-800 text-slate-500 bg-slate-950'
                      }`}
                    >
                      Ada Riwayat
                    </button>
                    <button
                      type="button"
                      onClick={() => setRiwayatKeluarga(false)}
                      className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition ${
                        !riwayatKeluarga ? 'border-emerald-500 bg-emerald-950/80 text-emerald-300' : 'border-slate-800 text-slate-500 bg-slate-950'
                      }`}
                    >
                      Tidak Ada
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={calculateRisk}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:brightness-110 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.35)]"
              >
                <span>Evaluasi Peta Risiko & Layanan Faskes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SERVICE NAVIGATION & RISK EVALUATION */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase">
                <Crosshair className="w-3.5 h-3.5" />
                <span>Service Navigation Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Hasil Evaluasi Risiko & Navigasi Layanan
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Klasifikasi tingkat risiko terdeteksi dan rekomendasi jalur pelayanan faskes digital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto">
              
              {/* Risk Level Badge Card */}
              <div className="md:col-span-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between items-center text-center space-y-4 backdrop-blur">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Status Risiko PTM
                </span>

                <div className="my-2">
                  {riskResult === 'low' && (
                    <div className="w-32 h-32 rounded-full border-4 border-emerald-400 bg-emerald-950/60 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                      <span className="text-emerald-300 font-mono font-black text-sm uppercase">🟢 RISIKO RENDAH</span>
                      <span className="text-[9px] text-emerald-400 font-mono mt-1">Normal / Preventif</span>
                    </div>
                  )}

                  {riskResult === 'attention' && (
                    <div className="w-32 h-32 rounded-full border-4 border-amber-400 bg-amber-950/60 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                      <span className="text-amber-300 font-mono font-black text-xs uppercase">🟡 PERLU PERHATIAN</span>
                      <span className="text-[9px] text-amber-400 font-mono mt-1">Pre-Hipertensi / Glikemik</span>
                    </div>
                  )}

                  {riskResult === 'high' && (
                    <div className="w-32 h-32 rounded-full border-4 border-rose-500 bg-rose-950/60 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_25px_rgba(244,63,94,0.4)]">
                      <span className="text-rose-300 font-mono font-black text-sm uppercase">🔴 RISIKO TINGGI</span>
                      <span className="text-[9px] text-rose-400 font-mono mt-1">Prioritas Medis</span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] font-mono text-slate-400">
                  Parameter: {systolic}/{diastolic} mmHg • {gulaDarah} mg/dL • IMT {imt}
                </div>
              </div>

              {/* Navigation Instruction Details */}
              <div className="md:col-span-8 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-5 backdrop-blur">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-mono font-black text-emerald-400 uppercase tracking-wider">
                      Protokol Navigasi Faskes Digital
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">AUTO-TRIAGE</span>
                  </div>

                  {riskResult === 'low' && (
                    <div className="space-y-2 text-xs font-sans text-slate-300 leading-relaxed">
                      <p className="text-emerald-300 font-semibold">
                        Profil Anda berada dalam rentang sehat. Anda disarankan melanjutkan pemantauan gizi mandiri dan edukasi preventif rutin.
                      </p>
                      <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4">
                        <li>Lacak kalori dan gizi harian via <strong>CEKAT App / Scan Makanan</strong>.</li>
                        <li>Gunakan fitur <strong>Pantry AI</strong> untuk menu sehat tanpa food waste.</li>
                        <li>Nomor antrean edukasi diterbitkan untuk konsultasi ringan jika diperlukan.</li>
                      </ul>
                    </div>
                  )}

                  {riskResult === 'attention' && (
                    <div className="space-y-2 text-xs font-sans text-slate-300 leading-relaxed">
                      <p className="text-amber-300 font-semibold">
                        Terdeteksi parameter pre-hipertensi ringan atau kelebihan berat badan. Sistem mengarahkan Anda ke <strong>Poli Edukasi Gizi & Konseling Diet PTM</strong>.
                      </p>
                      <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4">
                        <li>Konsultasi pola makan rendah natrium (Diet DASH) dan rendah gula bebas.</li>
                        <li>Penerbitan resep target tindakan gizi mingguan terarah.</li>
                        <li>Estimasi antrean konsultasi gizi terbit secara digital.</li>
                      </ul>
                    </div>
                  )}

                  {riskResult === 'high' && (
                    <div className="space-y-2 text-xs font-sans text-slate-300 leading-relaxed">
                      <p className="text-rose-300 font-semibold">
                        Peringatan Medis: Beberapa parameter fisik vitalitas berada di atas ambang batas. Sistem mendaftarkan Anda secara prioritas ke <strong>Poli Umum / Spesialis</strong>.
                      </p>
                      <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4">
                        <li>Jalur antrean prioritas penanganan medis langsung oleh dokter.</li>
                        <li>Rekomendasi skrining lanjutan laboratorium profil lipid & glukosa puasa.</li>
                        <li>Sinkronisasi data rekam medis terpadu ke portal SATUSEHAT.</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Terbitkan Tiket & Nomor Antrean Digital</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 5: DIGITAL QUEUE & TICKET HUD */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase">
                <Ticket className="w-3.5 h-3.5" />
                <span>Digital Queue Ticket Dispatcher</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Tiket Antrean Faskes Digital
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Tiket antrean resmi diterbitkan. Data skrining vital Anda telah diteruskan ke monitor dokter / petugas gizi.
              </p>
            </div>

            {/* TACTICAL TICKET CARD */}
            <div className="border border-emerald-500/40 bg-slate-900/95 p-8 rounded-3xl max-w-md mx-auto space-y-6 text-center shadow-2xl backdrop-blur relative">
              {/* HUD Corner Decorators */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />

              <div className="border-b border-slate-800 pb-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>FASKES: PUSKESMAS NGABAB</span>
                <span className="text-emerald-400 font-bold">KODE TIKET: #82049</span>
              </div>

              {/* Big Queue Number */}
              <div className="space-y-1 py-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                  NOMOR ANTREAN DIGITAL
                </span>
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-mono tracking-widest py-2">
                  {queueNo}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 font-bold">
                  <span>{queueRoom}</span>
                </div>
              </div>

              {/* Estimation & Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-left">
                  <span className="text-[9px] text-slate-500 block uppercase">Estimasi Waktu Tunggu</span>
                  <span className="text-white font-bold text-sm">{queueEstimasi}</span>
                </div>
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-left">
                  <span className="text-[9px] text-slate-500 block uppercase">Nama Pasien</span>
                  <span className="text-white font-bold text-sm truncate block">{patientData?.name || 'Sofia Kusuma'}</span>
                </div>
              </div>

              {/* Barcode & QR Ticket Graphic */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex justify-center space-x-1 py-1">
                  {Array.from({ length: 34 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-9 ${i % 3 === 0 ? 'w-1 bg-emerald-400' : i % 2 === 0 ? 'w-1.5 bg-slate-400' : 'w-0.5 bg-slate-600'}`}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-slate-500 block tracking-widest">
                  *31740002-2026-PTM-STATION*
                </span>
              </div>

              {/* Ticket Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setTicketPrinted(true)}
                  className="flex-1 py-3 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>{ticketPrinted ? 'Tiket Dicetak ✓' : 'Cetak Tiket Fisik'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(6)}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <span>Selesai & Sinkron</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: SYNC & SUCCESS */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Pemeriksaan Station Selesai
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Data skrining dan nomor antrean Anda telah tersinkronisasi penuh ke CEKAT Mobile App.
              </p>
            </div>

            <div className="border border-emerald-500/40 bg-slate-900/90 p-8 rounded-3xl max-w-md mx-auto text-center space-y-6 shadow-2xl backdrop-blur">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Check className="w-8 h-8 font-black" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-mono font-black text-white uppercase tracking-wider">
                  Health Profile Sinkronisasi Sukses!
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Nomor antrean digital Anda telah aktif. Buka dashboard untuk memulai target tindakan preventif mingguan Anda.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <Link
                  href="/dashboard"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:brightness-110 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <span>Buka Dashboard Personal Health Action</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pantry-ai"
                  className="w-full py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold uppercase transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Racik Menu Sisa di Pantry AI</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSearchStatus('idle');
                    setPatientData(null);
                  }}
                  className="w-full py-2 rounded-xl text-slate-500 hover:text-slate-300 text-[11px] font-mono uppercase transition"
                >
                  Daftarkan Pasien Baru
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER METRICS AND STATUS */}
      <footer className="max-w-6xl mx-auto w-full border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
        <span>© 2026 CEKAT KIOSK ACCESS POINT • STANDAR INOVASI PHIC 2026</span>
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SATUSEHAT CONNECTED
          </span>
          <span>TERMINAL ID: K-0822-NGABAB</span>
        </div>
      </footer>
    </div>
  );
}
