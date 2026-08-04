'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Stethoscope, 
  Calendar, 
  MessageSquare, 
  ArrowLeft, 
  User, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    // Simulated active scheduled & past expert consultation records
    setSessions([
      {
        id: 'cons-active-1',
        expert_name: 'dr. Sarah Amanda, Sp.GK',
        specialization: 'Spesialis Gizi Klinik',
        photo_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
        scheduled_at: 'Hari Ini, 09:00 WIB',
        price: 150000,
        status: 'ONGOING',
        method: 'Chat & Video Call',
      },
      {
        id: 'cons-past-1',
        expert_name: 'Nutrionist Dimas Prasetyo, S.Gz',
        specialization: 'Ahli Gizi Olahraga',
        photo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80',
        scheduled_at: '28 Juli 2026, 14:00 WIB',
        price: 120000,
        status: 'COMPLETED',
        method: 'Chat',
      }
    ]);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header and Quick Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link href="/consultation" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Konsultasi</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-8 h-8 text-emerald-400" />
            <span>Riwayat Konsultasi Kamu</span>
          </h1>
        </div>

        <Link
          href="/consultation/expert-portal"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5"
        >
          <span>Akses Portal Expert (Dokter)</span>
          <ChevronRight className="w-4 h-4 text-emerald-400" />
        </Link>
      </div>

      {/* Sessions History List */}
      <div className="space-y-5">
        {sessions.map((sess) => (
          <div
            key={sess.id}
            className={`bg-slate-900/60 border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
              sess.status === 'ONGOING' ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/5' : 'border-slate-850'
            }`}
          >
            <div className="flex items-center space-x-4">
              <img src={sess.photo_url} alt="" className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white leading-tight">{sess.expert_name}</h3>
                  {sess.status === 'ONGOING' ? (
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
                      Sedang Berlangsung
                    </span>
                  ) : (
                    <span className="bg-slate-950 text-slate-500 border border-slate-850 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                      Selesai
                    </span>
                  )}
                </div>
                <span className="text-xs text-emerald-400 font-semibold">{sess.specialization}</span>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Jadwal: {sess.scheduled_at} ({sess.method})</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Metode Konsul</span>
                <span className="text-xs text-white font-bold">{sess.method}</span>
              </div>

              {sess.status === 'ONGOING' ? (
                <Link
                  href="/consultation?open_chat=true"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-emerald-950 font-extrabold text-xs shadow-md hover:brightness-110 transition flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Masuk Sesi Chat</span>
                </Link>
              ) : (
                <button
                  disabled
                  className="px-4 py-2.5 rounded-xl bg-slate-850 text-slate-500 font-bold text-xs border border-slate-800 cursor-not-allowed"
                >
                  Sesi Selesai
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-300 leading-relaxed">
          <strong className="text-white block mb-0.5">Keamanan & Kerahasiaan Medis</strong>
          Seluruh log percakapan dan dokumen foto makanan yang Anda bagikan dilindungi enkripsi standard industri. Ahli gizi hanya dapat mengakses log gizi harian setelah Anda menyetujui izin akses.
        </div>
      </div>
    </div>
  );
}
