'use client';

import React, { useEffect, useState } from 'react';
import { 
  Stethoscope, 
  MessageSquare, 
  ArrowLeft, 
  User, 
  Clock, 
  Send,
  Eye,
  CheckCircle,
  FileText
} from 'lucide-react';

export default function ExpertPortalPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [consentGranted, setConsentGranted] = useState<boolean>(true);
  const [activeSession, setActiveSession] = useState<any>({
    id: 'session-active',
    patient_name: 'Rizky Fitrianto',
    patient_age: 25,
    patient_gender: 'Pria',
    patient_weight: '65 kg',
    patient_height: '170 cm'
  });

  // Fetch chat messages
  const fetchMessages = () => {
    fetch('/api/consultation/chat?session_id=session-active')
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) setMessages(data.messages);
      });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2500); // Polling every 2.5s
    return () => clearInterval(interval);
  }, []);

  // Send message as expert role
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      const res = await fetch('/api/consultation/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'expert',
          text: inputText
        })
      });

      if (res.ok) {
        setInputText('');
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Stethoscope className="w-7 h-7 text-emerald-400" />
            <span>Portal Ahli Gizi / Dokter (Expert Portal)</span>
          </h1>
          <p className="text-xs text-slate-400">
            Halaman khusus internal simulasi interaksi dokter dengan pasien.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Patient Information & FoodLogs Summary Context */}
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-400" />
              <span>Profil Medis Pasien</span>
            </h3>

            <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs text-slate-300">
              <p>Nama: <strong>{activeSession.patient_name}</strong></p>
              <p>Fisik: <strong>{activeSession.patient_gender}, {activeSession.patient_age} Tahun</strong></p>
              <p>Tinggi / Berat: <strong>{activeSession.patient_height} / {activeSession.patient_weight}</strong></p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Log Makanan Pasien (7 Hari Terakhir)</span>
            </h3>

            {consentGranted ? (
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full inline-block">
                  Akses Diizinkan Pasien
                </span>
                
                {/* Patient food log context */}
                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-850">
                    <span className="text-slate-500 font-bold block">Kemarin - Makan Siang</span>
                    <strong>Dada Ayam Panggang & Salad</strong> (530 kcal)
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-850">
                    <span className="text-slate-500 font-bold block">Kemarin - Sarapan</span>
                    <strong>Oatmeal Pisang & Almond</strong> (350 kcal)
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Pasien belum memberikan persetujuan akses log makanan.</p>
            )}
          </div>
        </div>

        {/* Center/Right: Chat consultation session room */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl flex flex-col h-[520px] overflow-hidden">
          {/* Chat room header */}
          <div className="p-4 bg-slate-950 border-b border-slate-850 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sesi Aktif</span>
              <h4 className="text-sm font-bold text-white">{activeSession.patient_name}</h4>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Ongoing</span>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-950/40">
            {messages.map((msg) => {
              const isMe = msg.sender === 'expert';
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-md rounded-2xl p-3 text-xs leading-relaxed ${
                      isMe 
                        ? 'bg-emerald-600 text-white rounded-tr-none' 
                        : 'bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-1.5 font-medium">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat input form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-950 border-t border-slate-850 flex space-x-2">
            <input
              type="text"
              placeholder="Tulis instruksi medis gizi..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
