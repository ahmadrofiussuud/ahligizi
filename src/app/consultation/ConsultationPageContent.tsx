'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Stethoscope, 
  Star, 
  Calendar, 
  Clock, 
  CheckCircle,
  MessageSquare,
  ChevronRight,
  Filter,
  ShieldCheck,
  Send,
  Eye,
  EyeOff,
  UserCheck,
  ArrowLeft
} from 'lucide-react';

export default function ConsultationPageContent() {
  const searchParams = useSearchParams();
  const openChatParam = searchParams.get('open_chat');

  // Experts list states
  const [experts, setExperts] = useState<any[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<any[]>([]);
  
  // Filter States
  const [specialization, setSpecialization] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);

  // Booking details states
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingMethod, setBookingMethod] = useState<string>('Chat');
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);

  // Chat window states
  const [activeChat, setActiveChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [foodLogConsent, setFoodLogConsent] = useState<boolean>(true);

  // Fetch initial experts data
  useEffect(() => {
    fetch('/api/consultation')
      .then((res) => res.json())
      .then((d) => {
        setExperts(d.experts || []);
        setFilteredExperts(d.experts || []);
      });

    if (openChatParam === 'true') {
      setActiveChat(true);
    }
  }, [openChatParam]);

  // Handle filtering
  useEffect(() => {
    let result = experts;
    if (specialization !== 'All') {
      result = result.filter((e) => e.specialization.toLowerCase().includes(specialization.toLowerCase()));
    }
    if (minRating > 0) {
      result = result.filter((e) => e.rating >= minRating);
    }
    if (maxPrice > 0) {
      result = result.filter((e) => e.price_per_session <= maxPrice);
    }
    setFilteredExperts(result);
  }, [specialization, minRating, maxPrice, experts]);

  // Fetch chat list (polling-based)
  const fetchChatMessages = () => {
    if (!activeChat) return;
    fetch('/api/consultation/chat?session_id=session-active')
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) setMessages(data.messages);
      });
  };

  useEffect(() => {
    fetchChatMessages();
    const chatInterval = setInterval(fetchChatMessages, 2500);
    return () => clearInterval(chatInterval);
  }, [activeChat]);

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    try {
      const res = await fetch('/api/consultation/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'user',
          text: chatInput
        })
      });

      if (res.ok) {
        setChatInput('');
        fetchChatMessages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Confirm booking & trigger Midtrans sandbox simulation redirect
  const handleBookConsultation = async () => {
    if (!selectedExpert || !bookingDate) return;
    setBookingLoading(true);

    try {
      const res = await fetch('/api/consultation/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expert_id: selectedExpert.id,
          scheduled_at: bookingDate,
          method: bookingMethod,
          price: selectedExpert.price_per_session
        })
      });

      const data = await res.json();
      if (res.ok) {
        setBookingSuccess(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Active ongoing Chat Consultation Sesi Room */}
      {activeChat ? (
        <div className="bg-white border border-emerald-100 rounded-3xl overflow-hidden flex flex-col h-[560px] shadow-sm">
          {/* Chat room header */}
          <div className="p-4 bg-slate-55 border-b border-emerald-100 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setActiveChat(false)}
                className="text-xs text-slate-500 hover:text-slate-805 flex items-center gap-1 font-bold animate-pulse"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Keluar Chat</span>
              </button>
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <div>
                <h4 className="text-sm font-bold text-slate-805">dr. Sarah Amanda, Sp.GK</h4>
                <span className="text-[10px] text-emerald-600 font-bold block">Ongoing</span>
              </div>
            </div>

            {/* Sharing data consent checkbox */}
            <label className="flex items-center space-x-2 text-[10px] text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-100 cursor-pointer shadow-sm">
              <input 
                type="checkbox" 
                checked={foodLogConsent} 
                onChange={() => setFoodLogConsent(!foodLogConsent)}
                className="accent-emerald-650" 
              />
              <span className="font-bold">Bagi Log Makanan</span>
            </label>
          </div>

          {/* Messages body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
            {messages.map((msg) => {
              const isMe = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-md rounded-2xl p-3 text-xs leading-relaxed ${
                      isMe 
                        ? 'bg-emerald-650 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
                    }`}
                  >
                    <p className="font-semibold">{msg.text}</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-1.5 font-bold">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat input form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-50 border-t border-emerald-100 flex space-x-2">
            <input
              type="text"
              placeholder="Tulis keluhan..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-white border border-slate-100 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-semibold shadow-sm"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Main expert discovery listings header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                Konsultasi Dokter & Ahli Gizi
              </h1>
              <p className="text-slate-500 text-xs mt-1 font-semibold">
                Dapatkan meal plan medis khusus dan konsultasikan keluhan gizi kamu.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/consultation/history"
                className="px-4 py-2 bg-white border border-slate-100 text-slate-600 text-xs font-bold rounded-xl shadow-sm transition hover:bg-slate-50"
              >
                Riwayat Booking
              </Link>
              <Link
                href="/consultation/expert-portal"
                className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition shadow-sm"
              >
                Portal Dokter
              </Link>
            </div>
          </div>

          {/* Layout Grid optimized: Left side Filter & Right side Experts */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* Filter sidebar card */}
            <div className="lg:col-span-1 bg-white border border-slate-100 p-5 rounded-3xl space-y-5 shadow-sm">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">
                Filter & Cari Ahli
              </h3>

              {/* Specialization filter */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-bold block">Spesialisasi</label>
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-xs text-slate-850 font-bold"
                >
                  <option value="All">Semua Spesialisasi</option>
                  <option value="Gizi Klinik">Spesialis Gizi Klinik</option>
                  <option value="Olahraga">Gizi Olahraga</option>
                  <option value="Pencernaan">Kesehatan Pencernaan</option>
                </select>
              </div>

              {/* Min rating filter */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-bold block">Rating Minimum</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-xs text-slate-850 font-bold"
                >
                  <option value="0">Semua Rating</option>
                  <option value="4.8">⭐️ 4.8 Ke atas</option>
                  <option value="4.9">⭐️ 4.9 Ke atas</option>
                </select>
              </div>

              {/* Max price filter slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-555 font-bold">
                  <span>Harga Maksimum</span>
                  <span className="text-emerald-600 font-black">Rp {maxPrice.toLocaleString('id-ID')}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="200000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-100 h-1 rounded-full cursor-pointer"
                />
              </div>
            </div>

            {/* Grid of Expert list layout to fill the remaining area cleanly */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredExperts.map((exp) => (
                <div key={exp.id} className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col justify-between hover:border-emerald-250 transition shadow-sm h-fit">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <img src={exp.photo_url} alt={exp.name} className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-sm" />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{exp.rating}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-805 leading-tight mt-0.5 truncate">{exp.name}</h3>
                        <span className="text-xs text-emerald-600 font-bold block truncate">{exp.specialization}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 space-y-1 font-semibold">
                      <p className="line-clamp-3 leading-relaxed">{exp.bio}</p>
                      <span className="text-[10px] text-slate-400 block pt-1">Kredensial: {exp.credentials}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-450 block font-bold">Biaya Sesi</span>
                      <span className="text-sm font-black text-slate-800">Rp {exp.price_per_session.toLocaleString('id-ID')}</span>
                    </div>

                    <button
                      onClick={() => { setSelectedExpert(exp); setBookingSuccess(null); }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-705 text-white font-bold text-xs shadow-sm transition"
                    >
                      Jadwalkan Sesi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Booking Calendar & Midtrans Sandbox simulator Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-xl">
            <h3 className="text-lg font-bold text-slate-805">Form Booking Sesi</h3>
            
            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <div>
                  <h4 className="text-base font-bold text-slate-800">Jadwal Sesi Berhasil Disiapkan!</h4>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">
                    Silakan selesaikan pembayaran fiktif melalui portal sandbox Midtrans berikut.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left space-y-1.5 text-xs text-slate-700 font-semibold shadow-inner">
                  <p>Kode Trx: <strong>{bookingSuccess.transaction_id}</strong></p>
                  <p>Snap Token: <strong>{bookingSuccess.snap_token}</strong></p>
                  <p>Nominal: <strong>Rp {selectedExpert.price_per_session.toLocaleString('id-ID')}</strong></p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={bookingSuccess.redirect_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center block transition shadow-sm"
                  >
                    Bayar Sandbox Midtrans
                  </a>
                  <button
                    onClick={() => { setSelectedExpert(null); setBookingSuccess(null); }}
                    className="px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-205 transition"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-inner">
                  <img src={selectedExpert.photo_url} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{selectedExpert.name}</h4>
                    <span className="text-xs text-emerald-600 font-bold">{selectedExpert.specialization}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-bold block">Metode Konsultasi</label>
                    <select
                      value={bookingMethod}
                      onChange={(e) => setBookingMethod(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-xs text-slate-800 font-semibold focus:outline-none"
                    >
                      <option value="Chat">Chat Saja</option>
                      <option value="Chat & Video Call">Chat & Video Call</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-bold block">Tanggal & Waktu</label>
                    <input
                      type="datetime-local"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-[10px] text-slate-800 font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setSelectedExpert(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                  >
                    Batal
                  </button>
                  <button
                    disabled={bookingLoading || !bookingDate}
                    onClick={handleBookConsultation}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
                  >
                    {bookingLoading ? 'Memproses...' : 'Proses Booking'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
