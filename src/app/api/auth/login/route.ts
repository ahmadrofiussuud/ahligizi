import { POST as authenticate } from '@/app/api/cekat/session/route';
import { cekatResponse } from '@/lib/cekat-supabase';

export async function POST(request: Request) {
  try {
    const { email, password, provider } = await request.json();
    if (provider) return cekatResponse({ error: 'Login sosial belum tersedia. Gunakan email dan kata sandi akun CEKAT.' }, undefined, 400);
    return authenticate(new Request(request.url, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Origin: request.headers.get('origin') || '' },
      body: JSON.stringify({ action: 'login', email, password }),
    }));
  } catch { return cekatResponse({ error: 'Permintaan login tidak valid.' }, undefined, 400); }
}
