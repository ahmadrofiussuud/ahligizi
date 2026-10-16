'use client';

import { useState } from 'react';
import Link from 'next/link';

const greeting = 'Halo! Saya Ceko, asisten edukasi kesehatan CEKAT. Mari bahas gizi, hipertensi, diabetes, obesitas, kolesterol, atau pencegahan stunting. Apa yang ingin Anda ketahui?';
const topics = ['Bagaimana mengurangi garam untuk mencegah hipertensi?', 'Apa kebiasaan yang membantu mencegah diabetes?', 'Bagaimana mengelola berat badan secara bertahap?', 'Apa saja langkah pencegahan stunting?'];
export default function AIPage() {
  const [messages, setMessages] = useState([{ sender: 'bot', text: greeting }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (!input.trim() || busy) return;
    const question = input.trim();
    const history = messages.slice(-8);
    setMessages(current => [...current, { sender: 'user', text: question }]);
    setInput(''); setBusy(true); setError('');
    try {
      const response = await fetch('/api/ceko-ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question, history }) });
      const data = await response.json();
      if (!response.ok || !data.success || !data.reply) throw new Error(data.error || 'Jawaban belum tersedia. Coba lagi.');
      setMessages(current => [...current, { sender: 'bot', text: data.reply }]);
    } catch (error) { setError(error instanceof Error ? error.message : 'AI belum dapat dihubungi.'); setInput(question); }
    finally { setBusy(false); }
  }
  return <div className="mx-auto max-w-3xl px-5 py-8 text-slate-800 space-y-5">
    <nav className="flex flex-wrap gap-4 text-sm font-bold text-emerald-700"><Link href="/access">Daftar akses</Link><Link href="/patient">Pasien</Link><Link href="/station">Station</Link><Link href="/scan">Scan makanan →</Link></nav>
    <header><p className="font-bold text-emerald-700">CEKAT · Asisten kesehatan</p><h1 className="mt-2 text-3xl font-black">Tanya Ceko AI</h1><p className="mt-3 text-sm text-slate-600">Edukasi gizi, pencegahan PTM dan stunting untuk pasien, petugas, serta pengguna demo. Untuk diagnosis dan pengobatan pribadi, konsultasikan dengan tenaga kesehatan.</p></header>
    <div className="flex flex-wrap gap-2">{topics.map(topic => <button key={topic} disabled={busy} onClick={() => setInput(topic)} className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-left text-xs font-semibold">{topic}</button>)}</div>
    <div role="log" aria-live="polite" aria-label="Percakapan Ceko" className="space-y-4 rounded-3xl border border-emerald-100 bg-white p-5">{messages.map((message, index) => <article key={index} className={`rounded-2xl p-4 text-sm whitespace-pre-wrap leading-relaxed ${message.sender === 'user' ? 'ml-8 bg-emerald-700 text-white' : 'mr-4 bg-slate-50'}`}><p className="mb-2 text-xs font-bold">{message.sender === 'user' ? 'Anda' : 'Ceko'}</p>{message.text}</article>)}{busy && <p role="status" className="text-sm text-emerald-700">Ceko sedang menyiapkan jawaban…</p>}</div>
    {error && <p role="alert" className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
    <form onSubmit={send} className="flex gap-2"><label className="flex-1"><span className="sr-only">Pertanyaan untuk Ceko</span><textarea maxLength={4000} required value={input} onChange={event => setInput(event.target.value)} placeholder="Tanyakan tentang gizi, PTM, atau stunting…" className="w-full rounded-xl border border-emerald-200 bg-white p-3 text-sm" /></label><button disabled={busy || !input.trim()} className="self-end rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white disabled:opacity-50">Kirim</button></form>
    <button disabled={busy} onClick={() => { setMessages([{ sender: 'bot', text: greeting }]); setError(''); setInput(''); }} className="text-sm text-slate-500 underline">Mulai percakapan baru</button>
  </div>;
}
