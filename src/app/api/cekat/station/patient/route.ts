import { cekatFailure, cekatResponse, CekatError, requireCekatSession, requireCekatStaff, requireSameOrigin, supabaseRequest } from '@/lib/cekat-supabase';
import type { CekatPatient, CekatScreening } from '@/lib/cekat-types';

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const session = await requireCekatSession();
    await requireCekatStaff(session);
    const { code } = await request.json();
    if (typeof code !== 'string' || !/^[0-9A-F]{20}$/i.test(code.trim())) throw new CekatError(400, 'Kode registrasi harus terdiri dari 20 karakter dari barcode pasien.');
    const rows = await supabaseRequest<CekatPatient[]>('/rest/v1/rpc/cekat_lookup_patient', { method: 'POST', body: JSON.stringify({ registration_code: code.trim().toUpperCase() }) }, session.access_token);
    if (!rows[0]) throw new CekatError(404, 'Pasien tidak ditemukan pada faskes akun petugas ini.');
    const screenings = await supabaseRequest<CekatScreening[]>(`/rest/v1/cekat_screenings?patient_id=eq.${rows[0].user_id}&select=*&order=created_at.desc&limit=20`, {}, session.access_token);
    return cekatResponse({ patient: rows[0], screenings }, session);
  } catch (error) { return cekatFailure(error); }
}
