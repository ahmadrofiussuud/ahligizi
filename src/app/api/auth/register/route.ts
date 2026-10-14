import { POST as authenticate } from '@/app/api/cekat/session/route';
import { cekatResponse } from '@/lib/cekat-supabase';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    return authenticate(new Request(request.url, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Origin: request.headers.get('origin') || '' },
      body: JSON.stringify({ action: 'register', name, email, password }),
    }));
  } catch { return cekatResponse({ error: 'Permintaan pendaftaran tidak valid.' }, undefined, 400); }
}
