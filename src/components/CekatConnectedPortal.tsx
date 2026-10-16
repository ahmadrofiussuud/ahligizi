'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity, ArrowLeft, ClipboardList, LockKeyhole, LogOut, RefreshCw, ScanBarcode } from 'lucide-react';
import RegistrationBarcode from './RegistrationBarcode';
import type { CekatAccount, CekatPatient, CekatScreening } from '@/lib/cekat-types';
import { demoAccounts } from '@/lib/page-access';

async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(path, { method, cache: 'no-store', headers: { 'Content-Type': 'application/json' }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  const data = await response.json();
  if (!response.ok) throw Object.assign(new Error(data.error || 'Permintaan gagal.'), { status: response.status });
  return data as T;
}
const statusLabels = { waiting: 'Menunggu', called: 'Dipanggil', completed: 'Selesai' };
const glucoseLabels = { fasting: 'Puasa', random: 'Sewaktu', postmeal: 'Setelah makan' };
const fields = [
  { key: 'systolic', label: 'Tekanan sistolik (mmHg)', min: 40, max: 300 },
  { key: 'diastolic', label: 'Tekanan diastolik (mmHg)', min: 20, max: 200 },
  { key: 'blood_glucose', label: 'Gula darah (mg/dL)', min: 10, max: 1000 },
  { key: 'pulse', label: 'Denyut nadi (bpm)', min: 20, max: 250 },
  { key: 'spo2', label: 'SpO₂ (%)', min: 0, max: 100, optional: true },
  { key: 'weight_kg', label: 'Berat badan (kg)', min: 2, max: 400 },
  { key: 'height_cm', label: 'Tinggi badan (cm)', min: 30, max: 250 },
  { key: 'waist_cm', label: 'Lingkar perut (cm)', min: 10, max: 250, optional: true },
];
const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500';
const buttonClass = 'rounded-xl bg-emerald-700 px-5 py-3 font-bold text-sm text-white hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-wait';

function ScreeningCard({ result }: { result: CekatScreening }) {
  const bmi = (Number(result.weight_kg) / (Number(result.height_cm) / 100) ** 2).toFixed(1);
  return <article className="rounded-2xl border border-emerald-100 bg-white p-5 space-y-4">
    <div className="flex flex-wrap justify-between gap-2"><h3 className="font-bold text-slate-900">{new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', dateStyle: 'medium', timeStyle: 'short' }).format(new Date(result.created_at))} WIB</h3><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">Antrean {String(result.queue_number).padStart(3, '0')} · {statusLabels[result.queue_status]}</span></div>
    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
      {[
        ['Tekanan darah', `${result.systolic}/${result.diastolic} mmHg`],
        [`Gula darah · ${glucoseLabels[result.glucose_type]}`, `${result.blood_glucose} mg/dL`],
        ['Denyut nadi', `${result.pulse} bpm`], ['SpO₂', result.spo2 === null ? 'Belum diukur' : `${result.spo2}%`],
        ['Berat / tinggi', `${result.weight_kg} kg / ${result.height_cm} cm`],
        ['Lingkar perut', result.waist_cm === null ? 'Belum diukur' : `${result.waist_cm} cm`], ['IMT', bmi],
      ].map(([label, value]) => <div key={label}><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 font-bold text-slate-900">{value}</dd></div>)}
    </dl>
    {result.notes && <p className="whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{result.notes}</p>}
  </article>;
}

export default function CekatConnectedPortal({ mode }: { mode: 'patient' | 'station' }) {
  const router = useRouter();
  const [account, setAccount] = useState<CekatAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [register, setRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [facilityId, setFacilityId] = useState('');
  const [consent, setConsent] = useState(false);
  const [code, setCode] = useState('');
  const [patient, setPatient] = useState<CekatPatient | null>(null);
  const [history, setHistory] = useState<CekatScreening[]>([]);
  const [queue, setQueue] = useState<CekatScreening[]>([]);
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [glucoseType, setGlucoseType] = useState('random');
  const [notes, setNotes] = useState('');
  const [requestId, setRequestId] = useState('');
  const demoAccount = demoAccounts.find(item => item.email === email.trim().toLowerCase());

  const loadAccount = useCallback(async () => {
    try {
      const data = await api<CekatAccount>('/api/cekat/patient');
      setAccount(data); setError('');
    } catch (err) {
      if (err instanceof Error && 'status' in err && err.status === 401) { setAccount(null); setPatient(null); setHistory([]); setQueue([]); }
      else setError(err instanceof Error ? err.message : 'Koneksi tidak tersedia.');
    } finally { setLoading(false); }
  }, []);
  const loadQueue = useCallback(async () => {
    try { const data = await api<{ screenings: CekatScreening[] }>('/api/cekat/station/screenings'); setQueue(data.screenings); }
    catch (err) { setError(err instanceof Error ? err.message : 'Antrean tidak dapat dimuat.'); }
  }, []);
  useEffect(() => {
    const first = window.setTimeout(() => { void loadAccount(); }, 0);
    const poll = window.setInterval(() => { if (document.visibilityState === 'visible') void loadAccount(); }, 15000);
    return () => { window.clearTimeout(first); window.clearInterval(poll); };
  }, [loadAccount]);
  useEffect(() => {
    if (mode !== 'station' || !account?.staff) return;
    const first = window.setTimeout(() => { void loadQueue(); }, 0);
    const poll = window.setInterval(() => { if (document.visibilityState === 'visible') void loadQueue(); }, 15000);
    return () => { window.clearTimeout(first); window.clearInterval(poll); };
  }, [mode, account?.staff?.facility_id, loadQueue]);

  async function authenticate(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      if (demoAccount) {
        if (register) throw new Error('Akun demo sudah tersedia. Pilih Masuk untuk mencoba akun ini.');
        if (password !== demoAccount.password) throw new Error('Password demo tidak cocok. Lihat password pada halaman Akun Demo.');
        router.push(demoAccount.href);
        return;
      }
      const data = await api<{ confirmation_required?: boolean; message?: string }>('/api/cekat/session', 'POST', { action: register ? 'register' : 'login', name, email, password });
      setPassword('');
      if (data.confirmation_required) { setMessage(data.message || 'Periksa email untuk verifikasi.'); setRegister(false); }
      else await loadAccount();
    } catch (err) { setError(err instanceof Error ? err.message : 'Tidak dapat masuk.'); }
    finally { setBusy(false); }
  }
  async function enroll(event: React.FormEvent) {
    event.preventDefault(); if (!consent) return; setBusy(true); setError('');
    try { await api('/api/cekat/patient', 'POST', { name, facility_id: facilityId }); await loadAccount(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Profil gagal disimpan.'); }
    finally { setBusy(false); }
  }
  async function lookup(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setMessage(''); setPatient(null); setHistory([]);
    try {
      const data = await api<{ patient: CekatPatient; screenings: CekatScreening[] }>('/api/cekat/station/patient', 'POST', { code });
      setPatient(data.patient); setHistory(data.screenings); setMeasurements({}); setNotes(''); setRequestId(crypto.randomUUID());
    } catch (err) { setError(err instanceof Error ? err.message : 'Pasien tidak ditemukan.'); }
    finally { setBusy(false); }
  }
  async function saveScreening(event: React.FormEvent) {
    event.preventDefault(); if (!patient) return; setBusy(true); setError('');
    try {
      const values = Object.fromEntries(fields.map(field => [field.key, measurements[field.key] ? Number(measurements[field.key]) : null]));
      const sys = Number(values.systolic);
      const glu = Number(values.blood_glucose);
      if (sys >= 220 && glu >= 80 && glu <= 140) {
        throw new Error(`Nilai Sistolik (${sys} mmHg) dan Gula Darah (${glu} mg/dL) terindikasi tertukar. Silakan periksa kembali angka pengukuran.`);
      }
      const data = await api<{ screening: CekatScreening }>('/api/cekat/station/screenings', 'POST', { ...values, request_id: requestId, patient_id: patient.user_id, glucose_type: glucoseType, notes });
      setMessage(`Hasil tersimpan dan dapat dilihat pasien. Nomor antrean ${String(data.screening.queue_number).padStart(3, '0')}.`);
      setPatient(null); setHistory([]); setCode(''); setMeasurements({}); setNotes(''); await loadQueue();
    } catch (err) { setError(err instanceof Error ? err.message : 'Hasil belum tersimpan.'); }
    finally { setBusy(false); }
  }
  async function updateQueue(id: string, status: string) {
    setBusy(true); setError('');
    try { await api('/api/cekat/station/screenings', 'PATCH', { id, status }); await loadQueue(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Status belum tersimpan.'); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true);
    try { await api('/api/cekat/session', 'POST', { action: 'logout' }); setAccount(null); setPatient(null); setHistory([]); setQueue([]); setCode(''); setMessage(''); }
    catch { setError('Tidak dapat keluar. Coba lagi.'); }
    finally { setBusy(false); }
  }

  const facility = account?.facilities.find(f => f.id === (mode === 'station' ? account.staff?.facility_id : account.patient?.facility_id));
  return <div className="min-h-screen bg-[#f5faf7] text-slate-800">
    <header className="border-b border-emerald-100 bg-white px-5 py-5"><div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
      <div><Link href="/app" className="text-xl font-black text-emerald-800">CEKAT</Link><p className="text-xs text-emerald-700">Cek, Kenali, Tindak Lanjuti</p></div>
      <nav className="flex items-center gap-4 text-sm font-bold"><Link href="/patient">Hasil Saya</Link><Link href="/station">Station</Link><Link href="/ai">Tanya Ceko AI</Link><Link href="/scan">Scan makanan</Link>{account && <button disabled={busy} onClick={logout} className="flex items-center gap-1 text-slate-500"><LogOut size={16} /> Keluar</button>}</nav>
    </div></header>
    <main className="mx-auto max-w-5xl space-y-6 px-5 py-8">
      <div className="flex flex-wrap justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-emerald-600">{mode === 'station' ? 'Portal Petugas Faskes' : 'Rekam Pemeriksaan Saya'}</p><h1 className="mt-2 text-2xl font-black">{mode === 'station' ? 'CEKAT Station' : 'Hasil Screening Kesehatan Anda'}</h1>{facility && <p className="mt-1 text-sm text-slate-500">{facility.name}</p>}</div>{account && <button onClick={() => { void loadAccount(); if (account.staff && mode === 'station') void loadQueue(); }} className="flex items-center gap-2 text-sm font-bold text-emerald-700"><RefreshCw size={16} /> Perbarui</button>}</div>
      {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}</div>}
      {message && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">{message}</div>}
      {loading ? <p className="text-sm text-slate-500">Memuat akun…</p> : !account ? <section className="mx-auto max-w-md rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm space-y-5">
        <LockKeyhole className="text-emerald-700" /><h2 className="text-xl font-bold">{register ? 'Daftar akun CEKAT' : 'Masuk ke akun CEKAT'}</h2>
        {demoAccount && <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{demoAccount.label} dikenali. Saat masuk, Anda akan membuka data contoh. Akun ini tidak mengakses rekam pasien Supabase.</p>}
        <p className="text-sm text-slate-600">Gunakan akun CEKAT untuk melihat hasil tersimpan di perangkat mana pun. Jika memakai akun demo, Anda akan diarahkan ke tampilan dengan data contoh.</p>
        <form onSubmit={authenticate} className="space-y-4">
          {register && <label className="block text-sm font-semibold">Nama lengkap<input required maxLength={150} autoComplete="name" className={`${inputClass} mt-1`} value={name} onChange={e => setName(e.target.value)} /></label>}
          <label className="block text-sm font-semibold">Email<input required type="email" autoComplete="email" className={`${inputClass} mt-1`} value={email} onChange={e => { setEmail(e.target.value); setError(''); }} /></label>
          <label className="block text-sm font-semibold">Kata sandi<input required minLength={8} maxLength={128} type="password" autoComplete={register ? 'new-password' : 'current-password'} className={`${inputClass} mt-1`} value={password} onChange={e => setPassword(e.target.value)} /></label>
          <button disabled={busy} className={`${buttonClass} w-full`}>{busy ? 'Memproses…' : register ? 'Daftar' : demoAccount ? 'Masuk Demo' : 'Masuk'}</button>
        </form><button onClick={() => { setRegister(!register); setError(''); }} className="text-sm font-bold text-emerald-700">{register ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}</button>
        <div className="border-t border-slate-100 pt-4 text-sm space-y-2"><p className="text-slate-500">Akun baru perlu verifikasi email. Jika ingin mencoba tampilan tanpa verifikasi:</p><Link href="/demo" className="block font-bold text-emerald-700">Gunakan akun demo pasien / petugas / admin →</Link><Link href="/access" className="block font-bold text-emerald-700">Lihat daftar halaman dan akses →</Link></div>
      </section> : mode === 'patient' ? <>
        {!account.patient ? <form onSubmit={enroll} className="max-w-lg rounded-3xl bg-white border border-emerald-100 p-6 space-y-4">
          <h2 className="font-bold text-lg">Lengkapi profil registrasi</h2>
          <label className="block text-sm font-semibold">Nama lengkap<input required maxLength={150} className={`${inputClass} mt-1`} value={name} onChange={e => setName(e.target.value)} /></label>
          <label className="block text-sm font-semibold">Faskes pemeriksaan<select required className={`${inputClass} mt-1`} value={facilityId} onChange={e => setFacilityId(e.target.value)}><option value="">Pilih faskes</option>{account.facilities.map(f => <option value={f.id} key={f.id}>{f.name}</option>)}</select></label>
          <label className="flex items-start gap-2 text-sm text-slate-600"><input required type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1" />Saya memilih faskes ini untuk mengakses hasil pemeriksaan saya.</label>
          <button disabled={busy || !consent} className={buttonClass}>Buat Barcode Registrasi</button>
        </form> : <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          <aside className="space-y-4"><div className="rounded-3xl border border-emerald-100 bg-white p-5 space-y-4"><h2 className="font-bold">{account.patient.name}</h2><h3 className="text-sm font-bold text-emerald-700">Barcode Registrasi</h3>{account.registration && <RegistrationBarcode value={account.registration.code} />}<p className="text-xs text-slate-500">Petugas di faskes pilihan Anda dapat mengakses hasil setelah masuk ke akun petugas.</p></div></aside>
          <section className="space-y-4"><div className="flex items-center gap-2"><Activity size={20} className="text-emerald-700" /><h2 className="font-bold">Riwayat Pemeriksaan</h2></div>{account.screenings.length ? account.screenings.map(result => <ScreeningCard key={result.id} result={result} />) : <p className="rounded-2xl border border-dashed border-emerald-200 p-8 text-sm text-slate-500">Belum ada pemeriksaan tersimpan. Tunjukkan barcode Anda saat pemeriksaan di Station.</p>}<p className="text-xs text-slate-500">Hasil dan status antrean diperbarui setiap 15 detik saat halaman aktif.</p></section>
        </div>}
      </> : !account.staff ? <div className="rounded-2xl bg-white border border-amber-200 p-6 space-y-3"><h2 className="font-bold">Akses petugas belum tersedia</h2><p className="text-sm text-slate-600">Administrator faskes perlu memberikan akses petugas pada akun ini. Pendaftaran akun biasa tidak memberikan akses ke rekam pemeriksaan pasien.</p><Link className="font-bold text-emerald-700 text-sm" href="/patient">Buka hasil saya →</Link></div> : <div className="space-y-6">
        <section className="rounded-3xl border border-emerald-100 bg-white p-6 space-y-4"><h2 className="flex items-center gap-2 font-bold"><ScanBarcode size={20} /> Identifikasi pasien</h2><form onSubmit={lookup} className="flex flex-col sm:flex-row gap-3"><label className="flex-1"><span className="sr-only">Kode barcode pasien</span><input required minLength={20} maxLength={20} autoComplete="off" placeholder="Pindai atau ketik kode barcode pasien" value={code} onChange={e => setCode(e.target.value.toUpperCase())} className={inputClass} /></label><button disabled={busy} className={buttonClass}>Cari Pasien</button></form></section>
        {patient && <section className="space-y-4"><h2 className="font-bold text-xl">Pemeriksaan: {patient.name}</h2>{history[0] && <details className="rounded-2xl border border-slate-200 p-4"><summary className="cursor-pointer font-semibold text-sm">Lihat pemeriksaan sebelumnya</summary><div className="mt-3 space-y-3">{history.map(result => <ScreeningCard key={result.id} result={result} />)}</div></details>}
          <form onSubmit={saveScreening} className="rounded-3xl border border-emerald-100 bg-white p-6 space-y-5">
            {Number(measurements.systolic) >= 190 && Number(measurements.blood_glucose) >= 70 && Number(measurements.blood_glucose) <= 150 && (
              <div className="p-3 bg-amber-50 border-2 border-amber-400 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-amber-950">
                <div className="text-xs">
                  <span className="font-bold block text-amber-900">⚠️ Peringatan: Kemungkinan Nilai Tertukar!</span>
                  Sistolik ({measurements.systolic} mmHg) dan Gula Darah ({measurements.blood_glucose} mg/dL) terindikasi terbalik.
                </div>
                <button
                  type="button"
                  onClick={() => setMeasurements(p => ({ ...p, systolic: p.blood_glucose, blood_glucose: p.systolic }))}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  🔄 Tukar Kembali
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{fields.map(field => <label key={field.key} className="block text-sm font-semibold">{field.label}{field.optional && <span className="text-xs text-slate-400"> · opsional</span>}<input type="number" required={!field.optional} min={field.min} max={field.max} step="0.1" value={measurements[field.key] || ''} onChange={e => setMeasurements(previous => ({ ...previous, [field.key]: e.target.value }))} className={`${inputClass} mt-1`} /></label>)}<label className="block text-sm font-semibold">Jenis pemeriksaan gula darah<select value={glucoseType} onChange={e => setGlucoseType(e.target.value)} className={`${inputClass} mt-1`}><option value="random">Sewaktu</option><option value="fasting">Puasa</option><option value="postmeal">Setelah makan</option></select></label></div><label className="block text-sm font-semibold">Catatan petugas<textarea maxLength={2000} value={notes} onChange={e => setNotes(e.target.value)} className={`${inputClass} mt-1`} rows={3} /></label><p className="text-xs text-slate-500">Isi nilai yang benar-benar diukur. SpO₂ dan lingkar perut yang kosong akan ditandai belum diukur.</p><button disabled={busy} className={buttonClass}>{busy ? 'Menyimpan…' : 'Simpan Hasil & Buat Antrean'}</button></form>
        </section>}
        <section className="space-y-3"><h2 className="flex items-center gap-2 font-bold"><ClipboardList size={20} /> Antrean Hari Ini</h2>{!queue.length && <p className="text-sm text-slate-500">Belum ada antrean pemeriksaan hari ini.</p>}{queue.map(row => <div key={row.id} className="flex flex-wrap justify-between items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><div><p className="font-bold">{String(row.queue_number).padStart(3, '0')} · {row.cekat_patients?.name || 'Pasien'}</p><p className="text-xs text-slate-500">{statusLabels[row.queue_status]}</p></div><div className="flex gap-2">{row.queue_status === 'waiting' && <button disabled={busy} onClick={() => void updateQueue(row.id, 'called')} className={buttonClass}>Panggil</button>}{row.queue_status !== 'completed' && <button disabled={busy} onClick={() => void updateQueue(row.id, 'completed')} className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-bold text-emerald-700 disabled:opacity-50">Selesai</button>}</div></div>)}</section>
      </div>}
      <Link href={mode === 'station' ? '/station/demo' : '/app'} className="inline-flex items-center gap-2 text-sm text-slate-500"><ArrowLeft size={16} /> Lihat tampilan demo</Link>
    </main>
  </div>;
}
