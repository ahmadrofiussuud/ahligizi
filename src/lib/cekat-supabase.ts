import 'server-only';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export class CekatError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export interface SupabaseIdentity { id: string; email?: string }
export interface CekatSession { access_token: string; refresh_token?: string; expires_in?: number; user: SupabaseIdentity }

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url)) {
    throw new CekatError(503, 'Koneksi Supabase belum dikonfigurasi.');
  }
  return { url, key };
}

export async function supabaseRequest<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const { url, key } = config();
  let response: Response;
  try {
    response = await fetch(`${url}${path}`, {
      ...init, cache: 'no-store', signal: AbortSignal.timeout(15000),
      headers: { apikey: key, Authorization: `Bearer ${token || key}`, 'Content-Type': 'application/json', ...init.headers },
    });
  } catch { throw new CekatError(503, 'Supabase belum dapat dihubungi. Coba lagi sebentar.'); }
  if (!response.ok) {
    let code = '';
    try { const data = await response.json(); code = data.code || data.error_code || ''; } catch { /* No details are logged. */ }
    if (code === 'email_not_confirmed') throw new CekatError(401, 'Verifikasi email terlebih dahulu, lalu masuk kembali.');
    if (code === 'email_address_invalid') throw new CekatError(400, 'Gunakan alamat email aktif yang dapat menerima verifikasi. Alamat contoh tidak dapat dipakai.');
    if (code === 'email_address_not_authorized') throw new CekatError(503, 'Pengiriman email verifikasi belum diaktifkan untuk alamat ini. Administrator perlu menyiapkan layanan email. Untuk mencoba tampilan, gunakan Akun Demo.');
    if (code === 'signup_disabled' || code === 'email_provider_disabled') throw new CekatError(503, 'Pendaftaran email belum diaktifkan pada layanan akun.');
    if (code === 'weak_password') throw new CekatError(400, 'Kata sandi belum memenuhi persyaratan keamanan layanan akun.');
    if (code === 'PGRST205' || code === 'PGRST202' || code === '42P01') throw new CekatError(503, 'Tabel integrasi Station belum tersedia.');
    if (response.status === 429) throw new CekatError(429, 'Terlalu banyak percobaan. Silakan coba lagi nanti.');
    if (response.status === 401 || response.status === 400 && path.startsWith('/auth/')) throw new CekatError(401, 'Email, kata sandi, atau sesi tidak valid. Untuk akun baru, pastikan email sudah diverifikasi. Akun demo hanya dapat digunakan di halaman Akun Demo.');
    if (response.status === 403) throw new CekatError(403, 'Anda tidak memiliki izin untuk tindakan ini.');
    if (code === '23505') throw new CekatError(409, 'Data tersebut sudah tersimpan.');
    throw new CekatError(502, 'Layanan belum dapat memproses permintaan.');
  }
  if (response.status === 204) return undefined as T;
  return await response.json() as T;
}

export async function requireCekatSession(): Promise<CekatSession> {
  const jar = await cookies();
  const access = jar.get('cekat_access')?.value;
  const refresh = jar.get('cekat_refresh')?.value;
  if (access) {
    try {
      const user = await supabaseRequest<SupabaseIdentity>('/auth/v1/user', {}, access);
      return { access_token: access, user };
    } catch (error) {
      if (!(error instanceof CekatError) || error.status !== 401) throw error;
    }
  }
  if (refresh) {
    const session = await supabaseRequest<CekatSession>('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: JSON.stringify({ refresh_token: refresh }) });
    const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/' };
    jar.set('cekat_access', session.access_token, { ...options, maxAge: session.expires_in || 3600 });
    if (session.refresh_token) jar.set('cekat_refresh', session.refresh_token, { ...options, maxAge: 60 * 60 * 24 * 30 });
    return { access_token: session.access_token, user: session.user };
  }
  throw new CekatError(401, 'Silakan masuk ke akun CEKAT terlebih dahulu.');
}

export function cekatResponse(data: unknown, session?: CekatSession, status = 200) {
  const response = NextResponse.json(data, { status, headers: { 'Cache-Control': 'private, no-store' } });
  if (session?.refresh_token) {
    const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/' };
    response.cookies.set('cekat_access', session.access_token, { ...options, maxAge: session.expires_in || 3600 });
    response.cookies.set('cekat_refresh', session.refresh_token, { ...options, maxAge: 60 * 60 * 24 * 30 });
  }
  return response;
}
export function cekatFailure(error: unknown) {
  return cekatResponse({ error: error instanceof CekatError ? error.message : 'Permintaan tidak dapat diproses.' }, undefined, error instanceof CekatError ? error.status : 500);
}
export function requireSameOrigin(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) throw new CekatError(403, 'Asal permintaan tidak diizinkan.');
}
export async function requireCekatStaff(session: CekatSession) {
  const rows = await supabaseRequest<{ facility_id: string; active: boolean }[]>(`/rest/v1/cekat_staff?user_id=eq.${encodeURIComponent(session.user.id)}&active=eq.true&select=facility_id,active`, {}, session.access_token);
  if (!rows[0]) throw new CekatError(403, 'Akun ini belum terdaftar sebagai petugas faskes.');
  return rows[0];
}
