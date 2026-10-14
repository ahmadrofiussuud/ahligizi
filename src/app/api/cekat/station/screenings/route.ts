import { cekatFailure, cekatResponse, CekatError, requireCekatSession, requireCekatStaff, requireSameOrigin, supabaseRequest } from '@/lib/cekat-supabase';
import type { CekatScreening } from '@/lib/cekat-types';
import { validateScreening } from '@/lib/cekat-validation';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export async function GET() {
  try {
    const session = await requireCekatSession(); const staff = await requireCekatStaff(session);
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const day = ['year', 'month', 'day'].map(type => parts.find(part => part.type === type)?.value).join('-');
    const screenings = await supabaseRequest<CekatScreening[]>(`/rest/v1/cekat_screenings?facility_id=eq.${staff.facility_id}&visit_date=eq.${day}&select=*,cekat_patients(name)&order=queue_number.asc&limit=200`, {}, session.access_token);
    return cekatResponse({ screenings }, session);
  } catch (error) { return cekatFailure(error); }
}
export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const session = await requireCekatSession(); const staff = await requireCekatStaff(session);
    const data = await request.json();
    if (typeof data.patient_id !== 'string' || !uuid.test(data.patient_id)) throw new CekatError(400, 'Identitas pasien tidak valid.');
    if (typeof data.request_id !== 'string' || !uuid.test(data.request_id)) throw new CekatError(400, 'Identitas permintaan tidak valid.');
    let values;
    try { values = validateScreening(data); } catch (error) { throw new CekatError(400, error instanceof Error ? error.message : 'Nilai pemeriksaan tidak valid.'); }
    const existingPath = `/rest/v1/cekat_screenings?request_id=eq.${data.request_id}&recorded_by=eq.${session.user.id}&select=*`;
    const existing = await supabaseRequest<CekatScreening[]>(existingPath, {}, session.access_token);
    if (existing[0]) return cekatResponse({ success: true, screening: existing[0] }, session);
    let rows: CekatScreening[];
    try {
      rows = await supabaseRequest<CekatScreening[]>('/rest/v1/cekat_screenings', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ ...values, request_id: data.request_id, patient_id: data.patient_id, facility_id: staff.facility_id, recorded_by: session.user.id }) }, session.access_token);
    } catch (error) {
      if (!(error instanceof CekatError) || error.status !== 409) throw error;
      rows = await supabaseRequest<CekatScreening[]>(existingPath, {}, session.access_token);
      if (!rows[0]) throw error;
    }
    return cekatResponse({ success: true, screening: rows[0] }, session, 201);
  } catch (error) { return cekatFailure(error); }
}
export async function PATCH(request: Request) {
  try {
    requireSameOrigin(request);
    const session = await requireCekatSession(); const staff = await requireCekatStaff(session);
    const { id, status } = await request.json();
    if (typeof id !== 'string' || !uuid.test(id) || !['waiting', 'called', 'completed'].includes(status)) throw new CekatError(400, 'Status antrean tidak valid.');
    const rows = await supabaseRequest<CekatScreening[]>(`/rest/v1/cekat_screenings?id=eq.${id}&facility_id=eq.${staff.facility_id}`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ queue_status: status }) }, session.access_token);
    if (!rows[0]) throw new CekatError(404, 'Antrean tidak ditemukan.');
    return cekatResponse({ success: true }, session);
  } catch (error) { return cekatFailure(error); }
}
