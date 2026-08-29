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
  User,
  UserCheck, 
  RefreshCw, 
  Printer, 
  ClipboardList,
  Compass,
  Users,
  Smartphone,
  HeartPulse,
  Ticket,
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function CekatStation() {
  const [step, setStep] = useState<number>(1);
  
  // Step 1: Identification States & Modal
  const [identMethod, setIdentMethod] = useState<'qr' | 'phone' | 'code' | null>(null);
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
    }, 1000);
  };

  // Process risk calculation & Digital Queue routing
  const calculateRisk = () => {
    let riskPoints = 0;
    
    if (imt >= 27) riskPoints += 3;
    else if (imt >= 25) riskPoints += 2;

    if (systolic >= 140 || diastolic >= 90) riskPoints += 3;
    else if (systolic >= 130 || diastolic >= 85) riskPoints += 2;

    if (gulaDarah >= 140) riskPoints += 3;
    else if (gulaDarah >= 110) riskPoints += 2;

    if (lingkarPerut > 90) riskPoints += 2;

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
    <div className="min-h-screen bg-[#FAF8EE] text-slate-800 font-sans flex flex-col justify-between p-4 sm:p-8 relative overflow-x-hidden select-none">
      
      {/* HEADER SECTION MATCHING DESIGN */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-slate-200/80 pb-4 mb-4">
        {/* Logo Left */}
        <div className="flex items-center space-x-3">
          <img 
            src="/images/logo full cekat station.png" 
            alt="CEKAT Station Logo" 
            className="h-12 sm:h-14 object-contain" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-[#10B981] flex items-center justify-center text-white font-black text-lg shadow-sm">
              C
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none">Cekat</h1>
              <span className="text-[9px] font-black text-[#00875A] tracking-wider uppercase block mt-0.5">Cek. Kenali. Tindaklanjuti</span>
            </div>
          </div>
        </div>

        {/* Time & Date Right */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-900 text-white rounded-full px-4 py-2 text-xs sm:text-sm font-bold shadow-xs">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>08 : 30 AM</span>
          </div>
          <span className="hidden sm:inline text-xs font-bold text-slate-600">Senin, 31 Agustus 2026</span>
        </div>
      </header>

      {/* CORE CONTENT */}
      <main className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center my-2">
        
        {/* STEP 1: WELCOME & ACCESS METHODS LANDING PAGE (EXACT IMAGE REPLICA) */}
        {step === 1 && (
          <div className="space-y-6">
            
            {/* Title Section */}
            <div className="text-center space-y-1">
              <h3 className="text-lg sm:text-2xl font-bold text-slate-800 tracking-tight">Selamat Datang di</h3>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight uppercase">
                CEKAT Station
              </h2>
              <p className="text-xs sm:text-base font-semibold text-slate-600">
                Akses layanan kesehatan dimulai dari sini
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 my-4">
              
              {/* Left Mascot */}
              <div className="hidden lg:flex flex-col items-center justify-center w-52 shrink-0 space-y-2">
                <img 
                  src="/images/maskot cekat normal.png" 
                  alt="Ceko Mascot" 
                  className="w-36 h-48 object-contain drop-shadow-md" 
                />
                <div className="text-center px-2">
                  <span className="text-2xl font-serif text-slate-400 block leading-none">“</span>
                  <p className="text-[11px] font-bold text-slate-700 leading-snug">
                    CEKAT Station siap membantu Anda hidup lebih sehat!
                  </p>
                </div>
              </div>

              {/* Main Service Flow & Options Container */}
              <div className="flex-1 w-full space-y-6">
                
                {/* ALUR PELAYANAN CEKAT STATION */}
                <div className="space-y-3 bg-white/60 p-4 rounded-3xl border border-slate-200/60 shadow-xs">
                  <h4 className="text-xs sm:text-sm font-black text-[#00875A] uppercase tracking-widest text-center">
                    ALUR PELAYANAN CEKAT STATION
                  </h4>

                  <div className="flex items-center justify-center space-x-1 sm:space-x-3 overflow-x-auto py-2">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center space-y-1 text-center shrink-0 w-24">
                      <span className="text-[9.5px] font-black text-[#00875A] uppercase tracking-wider">STEP 1</span>
                      <div className="w-14 h-14 rounded-full bg-[#B4F769] border-2 border-slate-900 flex items-center justify-center shadow-xs">
                        <User className="w-7 h-7 text-slate-950 stroke-[2.2]" />
                      </div>
                      <span className="text-[10.5px] font-extrabold text-slate-900 leading-tight">Identifikasi</span>
                    </div>

                    {/* Curved Arrow 1->2 */}
                    <svg className="w-5 h-5 text-slate-700 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14 Q12 4 20 12" />
                      <polyline points="15 12 20 12 20 7" />
                    </svg>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center space-y-1 text-center shrink-0 w-24">
                      <span className="text-[9.5px] font-black text-[#00875A] uppercase tracking-wider">STEP 2</span>
                      <div className="w-14 h-14 rounded-full bg-[#B4F769] border-2 border-slate-900 flex items-center justify-center shadow-xs">
                        <ClipboardList className="w-7 h-7 text-slate-950 stroke-[2.2]" />
                      </div>
                      <span className="text-[10.5px] font-extrabold text-slate-900 leading-tight">Quick Health Check</span>
                    </div>

                    {/* Curved Arrow 2->3 */}
                    <svg className="w-5 h-5 text-slate-700 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14 Q12 4 20 12" />
                      <polyline points="15 12 20 12 20 7" />
                    </svg>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center space-y-1 text-center shrink-0 w-24">
                      <span className="text-[9.5px] font-black text-[#00875A] uppercase tracking-wider">STEP 3</span>
                      <div className="w-14 h-14 rounded-full bg-[#B4F769] border-2 border-slate-900 flex items-center justify-center shadow-xs">
                        <Activity className="w-7 h-7 text-slate-950 stroke-[2.2]" />
                      </div>
                      <span className="text-[10.5px] font-extrabold text-slate-900 leading-tight">Health Screening</span>
                    </div>

                    {/* Curved Arrow 3->4 */}
                    <svg className="w-5 h-5 text-slate-700 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14 Q12 4 20 12" />
                      <polyline points="15 12 20 12 20 7" />
                    </svg>

                    {/* Step 4 (Orange Header as in Design) */}
                    <div className="flex flex-col items-center space-y-1 text-center shrink-0 w-24">
                      <span className="text-[9.5px] font-black text-[#F59E0B] uppercase tracking-wider">STEP 4</span>
                      <div className="w-14 h-14 rounded-full bg-[#B4F769] border-2 border-slate-900 flex items-center justify-center shadow-xs">
                        <Compass className="w-7 h-7 text-slate-950 stroke-[2.5]" />
                      </div>
                      <span className="text-[10.5px] font-extrabold text-slate-900 leading-tight">Service Navigation</span>
                    </div>

                    {/* Curved Arrow 4->5 */}
                    <svg className="w-5 h-5 text-slate-700 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14 Q12 4 20 12" />
                      <polyline points="15 12 20 12 20 7" />
                    </svg>

                    {/* Step 5 (Orange Header as in Design) */}
                    <div className="flex flex-col items-center space-y-1 text-center shrink-0 w-28">
                      <span className="text-[9.5px] font-black text-[#F59E0B] uppercase tracking-wider">STEP 5</span>
                      <div className="w-14 h-14 rounded-full bg-[#B4F769] border-2 border-slate-900 flex items-center justify-center shadow-xs">
                        <Users className="w-7 h-7 text-slate-950 stroke-[2.2]" />
                      </div>
                      <span className="text-[10.5px] font-extrabold text-slate-900 leading-tight">Digital Queue & Check-in</span>
                    </div>

                    {/* Curved Arrow 5->6 */}
                    <svg className="w-5 h-5 text-slate-700 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14 Q12 4 20 12" />
                      <polyline points="15 12 20 12 20 7" />
                    </svg>

                    {/* Step 6 */}
                    <div className="flex flex-col items-center space-y-1 text-center shrink-0 w-28">
                      <span className="text-[9.5px] font-black text-[#00875A] uppercase tracking-wider">STEP 6</span>
                      <div className="w-14 h-14 rounded-full bg-[#B4F769] border-2 border-slate-900 flex items-center justify-center shadow-xs">
                        <Smartphone className="w-7 h-7 text-slate-950 stroke-[2.2]" />
                      </div>
                      <span className="text-[10.5px] font-extrabold text-slate-900 leading-tight">Health Result to App</span>
                    </div>
                  </div>
                </div>

                {/* PILIH CARA AKSES */}
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest text-center">
                    PILIH CARA AKSES
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* CARD 1: SCAN QR */}
                    <div className="bg-[#B8F568] p-5 rounded-3xl flex flex-col justify-between items-center text-center space-y-4 shadow-sm hover:shadow-md transition border border-emerald-300/40">
                      <div className="w-16 h-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center p-3 shadow-inner">
                        <QrCode className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">SCAN QR</h3>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5">dari aplikasi CEKAT</p>
                      </div>
                      <button 
                        onClick={() => setIdentMethod('qr')}
                        className="w-full py-3 bg-[#F1C40F] hover:bg-[#e2b70d] text-slate-950 font-black text-xs uppercase rounded-full flex items-center justify-center space-x-2 shadow-xs transition active:scale-95 cursor-pointer"
                      >
                        <span>MULAI</span>
                        <div className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </button>
                    </div>

                    {/* CARD 2: NOMOR HP */}
                    <div className="bg-[#FFDE00] p-5 rounded-3xl flex flex-col justify-between items-center text-center space-y-4 shadow-sm hover:shadow-md transition border border-yellow-300/40">
                      <div className="flex items-center space-x-1 py-3">
                        <span className="w-8 h-8 rounded-full bg-slate-950 text-white font-black text-xs flex items-center justify-center">4</span>
                        <span className="w-8 h-8 rounded-full bg-slate-950 text-white font-black text-xs flex items-center justify-center">6</span>
                        <span className="w-8 h-8 rounded-full bg-slate-950 text-white font-black text-xs flex items-center justify-center">1</span>
                        <span className="w-8 h-8 rounded-full bg-slate-950 text-white font-black text-xs flex items-center justify-center">2</span>
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">NOMOR HP</h3>
                        <p className="text-xs font-semibold text-slate-800 leading-snug mt-0.5">daftar/ masuk menggunakan nomor Hp</p>
                      </div>
                      <button 
                        onClick={() => setIdentMethod('phone')}
                        className="w-full py-3 bg-[#F1C40F] hover:bg-[#e2b70d] text-slate-950 font-black text-xs uppercase rounded-full flex items-center justify-center space-x-2 shadow-xs transition active:scale-95 cursor-pointer border border-yellow-500/20"
                      >
                        <span>MULAI</span>
                        <div className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </button>
                    </div>

                    {/* CARD 3: ID CARD */}
                    <div className="bg-[#EBE9DC] p-5 rounded-3xl flex flex-col justify-between items-center text-center space-y-4 shadow-sm hover:shadow-md transition border border-slate-300/40">
                      <div className="w-16 h-12 border-2 border-slate-900 rounded-xl bg-white flex items-center p-1.5 space-x-2 shadow-xs">
                        <User className="w-6 h-6 text-slate-800 shrink-0" />
                        <div className="space-y-1 flex-1">
                          <div className="h-1 bg-slate-800 rounded w-full" />
                          <div className="h-1 bg-slate-400 rounded w-2/3" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">ID CARD</h3>
                        <p className="text-xs font-semibold text-slate-700 leading-snug mt-0.5">Gunakan Identitas sesuai sistem Fasilitas Kesehatan</p>
                      </div>
                      <button 
                        onClick={() => setIdentMethod('code')}
                        className="w-full py-3 bg-[#F1C40F] hover:bg-[#e2b70d] text-slate-950 font-black text-xs uppercase rounded-full flex items-center justify-center space-x-2 shadow-xs transition active:scale-95 cursor-pointer"
                      >
                        <span>MULAI</span>
                        <div className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </button>
                    </div>

                    {/* CARD 4: BANTUAN */}
                    <div className="bg-[#3CB395] p-5 rounded-3xl flex flex-col justify-between items-center text-center space-y-4 shadow-sm hover:shadow-md transition border border-teal-400/40 text-white">
                      <div className="w-16 h-12 border-2 border-white rounded-xl bg-slate-950 flex items-center justify-center p-1 shadow-xs">
                        <UserCheck className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white uppercase tracking-tight">BANTUAN</h3>
                        <p className="text-xs font-semibold text-teal-50 mt-0.5">Petugas siap membantu Anda</p>
                      </div>
                      <button 
                        onClick={() => setIdentMethod('phone')}
                        className="w-full py-3 bg-[#F1C40F] hover:bg-[#e2b70d] text-slate-950 font-black text-xs uppercase rounded-full flex items-center justify-center space-x-2 shadow-xs transition active:scale-95 cursor-pointer"
                      >
                        <span>MULAI</span>
                        <div className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* IDENTIFICATION INPUT MODAL OVERLAY */}
            {identMethod && (
              <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
                <div className="bg-white border border-slate-200 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl relative text-slate-800">
                  
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900 uppercase flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-[#00875A]" />
                      <span>Verifikasi Pasien CEKAT Station</span>
                    </h3>
                    <button 
                      onClick={() => setIdentMethod(null)}
                      className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  {identMethod === 'qr' && (
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#00875A]/40 bg-emerald-50/50 rounded-2xl">
                      <div className="w-36 h-36 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm">
                        <QrCode className="w-20 h-20 text-[#00875A] animate-pulse" />
                      </div>
                      <p className="text-xs text-[#00875A] mt-3 font-bold uppercase tracking-wider text-center">
                        Arahkan QR Code CEKAT Mobile ke Kamera Kiosk
                      </p>
                      <button
                        type="button"
                        onClick={handleIdentify}
                        className="mt-4 px-6 py-2.5 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white text-xs font-black uppercase tracking-wider"
                      >
                        Simulasi Scan QR Berhasil
                      </button>
                    </div>
                  )}

                  {identMethod === 'phone' && (
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Nomor Handphone Terdaftar di Faskes:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="Contoh: 08123456789"
                          className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#00875A]"
                        />
                        <button
                          type="button"
                          onClick={handleIdentify}
                          className="px-6 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white font-black text-xs uppercase flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                        >
                          <Search className="w-4 h-4" />
                          <span>Cari</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {identMethod === 'code' && (
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        NIK Pasien (KTP) / Nomor BPJS Kesehatan:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Masukkan 16 digit NIK..."
                          defaultValue="3174XXXXXXXX0002"
                          className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#00875A]"
                        />
                        <button
                          type="button"
                          onClick={handleIdentify}
                          className="px-6 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white font-black text-xs uppercase flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                        >
                          <Search className="w-4 h-4" />
                          <span>Cari</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SEARCH STATUS BOX */}
                  {searchStatus === 'searching' && (
                    <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-2xl flex items-center justify-center space-x-3 text-xs font-bold text-[#00875A]">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span className="tracking-wider animate-pulse">Menghubungkan data SATUSEHAT Kemenkes...</span>
                    </div>
                  )}

                  {searchStatus === 'found' && patientData && (
                    <div className="p-5 border border-emerald-200 bg-emerald-50/60 rounded-2xl space-y-4 text-xs text-slate-800 shadow-inner">
                      <div className="flex items-center space-x-2 text-[#00875A] font-black border-b border-emerald-200 pb-2">
                        <UserCheck className="w-5 h-5" />
                        <span className="uppercase tracking-wider">
                          Pasien Ditemukan: {patientData.name} ({patientData.age} Thn / {patientData.gender})
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11.5px] font-medium">
                        <div>NIK: <span className="text-slate-900 font-bold">{patientData.nik}</span></div>
                        <div>Kunjungan: <span className="text-slate-900 font-bold">{patientData.lastVisit}</span></div>
                      </div>
                      <div className="p-3 bg-white border border-emerald-200 rounded-xl text-[11px] leading-relaxed text-slate-700 font-sans">
                        <strong className="text-amber-600 uppercase font-bold block mb-1">Catatan Skrining Sebelumnya:</strong>
                        {patientData.history}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                      >
                        <span>Lanjutkan ke Quick Health Check</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        )}

        {/* STEP 2: QUICK HEALTH CHECK */}
        {step === 2 && (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <button onClick={() => setStep(1)} className="p-2 hover:bg-slate-100 rounded-full transition flex items-center gap-1 text-xs font-bold text-slate-700">
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              <span className="text-xs font-black text-[#00875A] uppercase tracking-widest">STEP 2 DARI 6 • QUICK HEALTH CHECK</span>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                Pengukuran Telemetri Fisik (Vitals HUD)
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Masukkan parameter fisik atau tempelkan alat ukur kiosk untuk evaluasi kardiovaskular & metabolik.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Form Input */}
              <div className="md:col-span-7 bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-black text-[#00875A] uppercase">Input Parameter Klinis</span>
                  <span className="text-[10px] font-bold text-slate-400">SATUSEHAT CONNECTED</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-600">Berat Badan (kg)</label>
                    <input
                      type="number"
                      value={bb}
                      onChange={(e) => setBb(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#00875A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-600">Tinggi Badan (cm)</label>
                    <input
                      type="number"
                      value={tb}
                      onChange={(e) => setTb(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#00875A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-600">Tensi Sistolik (mmHg)</label>
                    <input
                      type="number"
                      value={systolic}
                      onChange={(e) => setSystolic(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#00875A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-600">Tensi Diastolik (mmHg)</label>
                    <input
                      type="number"
                      value={diastolic}
                      onChange={(e) => setDiastolic(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#00875A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-600">Gula Darah (mg/dL)</label>
                    <input
                      type="number"
                      value={gulaDarah}
                      onChange={(e) => setGulaDarah(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#00875A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-600">Denyut Nadi (bpm)</label>
                    <input
                      type="number"
                      value={nadi}
                      onChange={(e) => setNadi(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#00875A]"
                    />
                  </div>
                </div>
              </div>

              {/* Assessment Panel */}
              <div className="md:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between space-y-4 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-black text-[#00875A] uppercase">
                      Analisis Sensor IMT & PTM
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">AUTOMATIC</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                    <span className="text-3xl font-black text-[#00875A]">{imt}</span>
                    <span className="text-[9.5px] text-slate-700 font-bold block uppercase">
                      Indeks Massa Tubuh ({imt >= 27 ? 'Obesitas' : imt >= 25 ? 'Kelebihan BB' : 'Normal'})
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600 font-semibold">Tekanan Darah:</span>
                      <span className={`font-bold ${
                        systolic >= 140 || diastolic >= 90 ? 'text-rose-600' : systolic >= 130 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {systolic}/{diastolic} mmHg
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-600 font-semibold">Gula Darah Puasa/Sewaktu:</span>
                      <span className={`font-bold ${
                        gulaDarah >= 140 ? 'text-rose-600' : gulaDarah >= 110 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {gulaDarah} mg/dL
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                >
                  <span>Lanjutkan ke Skrining Perilaku</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: HEALTH SCREENING QUESTIONNAIRE */}
        {step === 3 && (
          <div className="space-y-6 max-w-3xl mx-auto w-full">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <button onClick={() => setStep(2)} className="p-2 hover:bg-slate-100 rounded-full transition flex items-center gap-1 text-xs font-bold text-slate-700">
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              <span className="text-xs font-black text-[#00875A] uppercase tracking-widest">STEP 3 DARI 6 • HEALTH SCREENING</span>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                Kuesioner Gaya Hidup & Risiko PTM
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Evaluasi pola makan, aktivitas fisik, dan riwayat kesehatan keluarga.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-5 shadow-sm">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">1. Konsumsi Sayur dan Buah Harian:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSayurBuah('cukup')}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      sayurBuah === 'cukup' ? 'bg-emerald-50 border-[#00875A] text-[#00875A]' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    ✓ Cukup (≥5 porsi/hari)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSayurBuah('kurang')}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      sayurBuah === 'kurang' ? 'bg-amber-50 border-amber-500 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    ⚠ Kurang (&lt;5 porsi/hari)
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">2. Kebiasaan Minuman Manis / Gula Murni (&gt;4 sdm/hari):</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setManis(true)}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      manis ? 'bg-amber-50 border-amber-500 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Ya, Sering (&gt;4 sdm/hari)
                  </button>
                  <button
                    type="button"
                    onClick={() => setManis(false)}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      !manis ? 'bg-emerald-50 border-[#00875A] text-[#00875A]' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Tidak, Jarang
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">3. Aktivitas Fisik Olahraga (150 menit/minggu):</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOlahraga('cukup')}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      olahraga === 'cukup' ? 'bg-emerald-50 border-[#00875A] text-[#00875A]' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Rutin Olahraga
                  </button>
                  <button
                    type="button"
                    onClick={() => setOlahraga('kurang')}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      olahraga === 'kurang' ? 'bg-amber-50 border-amber-500 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Jarang / Jarang Bergerak
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={calculateRisk}
                className="w-full py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <span>Proses Evaluasi Risiko & Navigasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SERVICE NAVIGATION RESULT */}
        {step === 4 && (
          <div className="space-y-6 max-w-3xl mx-auto w-full">
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                Hasil Navigasi Layanan Faskes
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Berdasarkan parameter vitalitas & kuesioner skrining Anda.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-5 shadow-sm text-center">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                <span className="text-xs font-black uppercase tracking-wider block">Kategori Risiko Kesehatan</span>
                <h3 className="text-xl font-black text-amber-800">
                  {riskResult === 'high' ? 'RISIKO TINGGI (Prioritas Kunjungan)' : 'RISIKO SEDANG (Pre-Diabetes / Pre-Hipertensi)'}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <span className="font-black text-slate-900 uppercase block">Rekomendasi Poli Tujuan:</span>
                <p className="font-bold text-[#00875A] text-sm">{queueRoom}</p>
                <p className="text-slate-600 text-[11.5px] leading-relaxed">
                  Disarankan melakukan konseling gizi terstruktur, pencegahan hipertensi dengan pengurangan garam, serta evaluasi rutin kadar gula darah.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep(5)}
                className="w-full py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <span>Cetak & Terbitkan Tiket Antrean Digital</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: DIGITAL QUEUE TICKET */}
        {step === 5 && (
          <div className="space-y-6 max-w-md mx-auto w-full">
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                Tiket Antrean Faskes Digital
              </h2>
              <p className="text-xs text-slate-600">
                Tiket resmi diterbitkan. Data Anda diteruskan ke layar monitor dokter.
              </p>
            </div>

            <div className="bg-white border-2 border-emerald-300 p-8 rounded-3xl space-y-6 text-center shadow-lg relative">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>PUSKESMAS NGABAB</span>
                <span className="text-[#00875A] font-black">#82049</span>
              </div>

              <div className="space-y-1 py-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                  NOMOR ANTREAN DIGITAL
                </span>
                <div className="text-6xl font-black text-[#00875A] tracking-widest py-2">
                  {queueNo}
                </div>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#00875A]">
                  <span>{queueRoom}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-left">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Estimasi Tunggu</span>
                  <span className="text-slate-900 font-bold text-sm">{queueEstimasi}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Nama Pasien</span>
                  <span className="text-slate-900 font-bold text-sm truncate block">{patientData?.name || 'Sofia Kusuma'}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setTicketPrinted(true)}
                  className="flex-1 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition"
                >
                  <Printer className="w-4 h-4 text-[#00875A]" />
                  <span>{ticketPrinted ? 'Tiket Dicetak ✓' : 'Cetak Tiket'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(6)}
                  className="flex-1 py-3 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white font-black text-xs uppercase flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <span>Selesai</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: SYNC & SUCCESS */}
        {step === 6 && (
          <div className="space-y-6 max-w-md mx-auto w-full">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl text-center space-y-6 shadow-md">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-[#00875A] flex items-center justify-center mx-auto text-[#00875A]">
                <Check className="w-8 h-8 font-black" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 uppercase">
                  Pemeriksaan Station Selesai!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Data skrining dan nomor antrean Anda telah tersinkronisasi penuh ke CEKAT Mobile App.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <Link
                  href="/app"
                  className="w-full py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md"
                >
                  <span>Buka Dashboard Mobile CEKAT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setIdentMethod(null);
                    setSearchStatus('idle');
                    setPatientData(null);
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold uppercase transition"
                >
                  Daftarkan Pasien Baru
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-7xl mx-auto border-t border-slate-200/80 pt-3 mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold text-slate-600">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 flex items-center space-x-2 shadow-xs hover:bg-slate-50 transition">
          <span>BAHASA INDONESIA</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <span>© 2026 CEKAT Station • KIOSK Point-of-Care • Kementerian Kesehatan RI</span>
      </footer>

    </div>
  );
}
