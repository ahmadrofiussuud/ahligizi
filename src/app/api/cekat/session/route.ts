import { cekatFailure, cekatResponse, CekatError, requireCekatSession, requireSameOrigin, supabaseRequest, type CekatSession } from '@/lib/cekat-supabase';

export async function GET() {
  try { const session = await requireCekatSession(); return cekatResponse({ user: session.user }, session); }
  catch (error) { return cekatFailure(error); }
}
export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const { action, email, password, name } = await request.json();
    if (action === 'logout') {
      try {
        const session = await requireCekatSession();
        await supabaseRequest('/auth/v1/logout?scope=local', { method: 'POST' }, session.access_token);
      } catch { /* Clear local cookies even when the remote service is unavailable. */ }
      const response = cekatResponse({ success: true });
      response.cookies.delete('cekat_access'); response.cookies.delete('cekat_refresh');
      return response;
    }
    if (!['login', 'register'].includes(action) || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof password !== 'string' || password.length < 8 || password.length > 128) {
      throw new CekatError(400, 'Masukkan email valid dan kata sandi 8–128 karakter.');
    }
    if (action === 'register') {
      if (typeof name !== 'string' || !name.trim() || name.length > 150) throw new CekatError(400, 'Masukkan nama lengkap.');
      const redirect = encodeURIComponent(new URL('/patient', request.url).toString());
      const data = await supabaseRequest<Partial<CekatSession>>(`/auth/v1/signup?redirect_to=${redirect}`, { method: 'POST', body: JSON.stringify({ email: email.trim(), password, data: { name: name.trim() } }) });
      if (data.access_token && data.refresh_token && data.user) return cekatResponse({ success: true }, data as CekatSession);
      return cekatResponse({ confirmation_required: true, message: 'Periksa email untuk verifikasi akun, lalu masuk. Jika akun sudah ada, gunakan halaman masuk.' });
    }
    const session = await supabaseRequest<CekatSession>('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email: email.trim(), password }) });
    return cekatResponse({ success: true }, session);
  } catch (error) { return cekatFailure(error); }
}
