'use client';

import { useState } from 'react';
import Link from 'next/link';
import { demoAccounts } from '@/lib/page-access';

export default function DemoLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [account, setAccount] = useState<(typeof demoAccounts)[number] | null>(null);
  function login(event: React.FormEvent) {
    event.preventDefault();
    const selected = demoAccounts.find(item => item.email === email.trim().toLowerCase() && item.password === password);
    if (!selected) { setError('Email atau password demo tidak cocok. Gunakan salah satu akun di bawah.'); return; }
    setAccount(selected); setPassword(''); setError('');
  }
  return <div className="mx-auto max-w-4xl px-5 py-10 space-y-6 text-slate-800">
    <div><p className="font-bold text-emerald-700">CEKAT · Mode Demo</p><h1 className="mt-2 text-3xl font-black">Coba akses pasien, petugas, dan admin</h1><p className="mt-3 text-sm text-slate-600">Tidak perlu mendaftar atau memverifikasi email. Akun demo hanya membuka tampilan dan data contoh, tanpa akses data pasien nyata.</p></div>
    {account ? <section className="rounded-3xl border border-emerald-200 bg-white p-6 space-y-4"><h2 className="text-xl font-bold">Berhasil masuk sebagai {account.label}</h2><p className="text-sm text-slate-600">{account.description}</p><p className="font-mono text-sm">{account.email}</p><div className="flex flex-wrap gap-3"><Link href={account.href} className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">Buka {account.label} →</Link><button onClick={() => { setAccount(null); setEmail(''); }} className="rounded-xl border border-slate-200 px-5 py-3 font-bold">Ganti akun demo</button></div></section> : <form onSubmit={login} className="mx-auto max-w-md rounded-3xl border border-emerald-100 bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold">Masuk ke Akun Demo</h2>{error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <label className="block text-sm font-semibold">Email demo<input type="email" required autoComplete="off" value={email} onChange={event => setEmail(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 p-3" /></label>
      <label className="block text-sm font-semibold">Password demo<input type="password" required autoComplete="off" value={password} onChange={event => setPassword(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 p-3" /></label>
      <button className="w-full rounded-xl bg-emerald-700 p-3 font-bold text-white">Masuk Demo</button>
    </form>}
    <div className="grid gap-4 md:grid-cols-3">{demoAccounts.map(item => <article key={item.role} className="rounded-2xl border border-amber-200 bg-amber-50 p-5 space-y-2"><h2 className="font-bold">{item.label}</h2><p className="font-mono text-sm break-all">{item.email}</p><p className="font-mono text-sm break-all">{item.password}</p><p className="text-xs text-slate-600">{item.description}</p><button onClick={() => { setAccount(null); setEmail(item.email); setPassword(item.password); setError(''); }} className="mt-2 text-sm font-bold text-emerald-800 underline">Pakai akun ini</button></article>)}</div>
    <div className="flex flex-wrap gap-4 text-sm font-bold text-emerald-700"><Link href="/access">Lihat seluruh halaman →</Link><Link href="/patient">Akun pasien Supabase →</Link><Link href="/station">Station Supabase →</Link></div>
  </div>;
}
