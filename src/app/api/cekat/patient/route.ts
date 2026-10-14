import { cekatFailure, cekatResponse, CekatError, requireCekatSession, requireSameOrigin, supabaseRequest } from '@/lib/cekat-supabase';
import type { CekatFacility, CekatPatient, CekatScreening } from '@/lib/cekat-types';

export async function GET() {
  try {
    const session = await requireCekatSession();
    const id = encodeURIComponent(session.user.id);
    const [patients, registrations, staff, facilities, screenings] = await Promise.all([
      supabaseRequest<CekatPatient[]>(`/rest/v1/cekat_patients?user_id=eq.${id}&select=user_id,facility_id,name`, {}, session.access_token),
      supabaseRequest<{ code: string }[]>(`/rest/v1/cekat_registrations?user_id=eq.${id}&select=code`, {}, session.access_token),
      supabaseRequest<{ facility_id: string; active: boolean }[]>(`/rest/v1/cekat_staff?user_id=eq.${id}&active=eq.true&select=facility_id,active`, {}, session.access_token),
      supabaseRequest<CekatFacility[]>('/rest/v1/cekat_facilities?select=id,name&order=name.asc', {}, session.access_token),
      supabaseRequest<CekatScreening[]>(`/rest/v1/cekat_screenings?patient_id=eq.${id}&select=*&order=created_at.desc&limit=50`, {}, session.access_token),
    ]);
    return cekatResponse({ user: session.user, patient: patients[0] || null, registration: registrations[0] || null, staff: staff[0] || null, facilities, screenings }, session);
  } catch (error) { return cekatFailure(error); }
}
export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const session = await requireCekatSession();
    const { name, facility_id } = await request.json();
    if (typeof name !== 'string' || !name.trim() || name.length > 150 || typeof facility_id !== 'string' || !/^[0-9a-f-]{36}$/i.test(facility_id)) throw new CekatError(400, 'Isi nama dan pilih faskes.');
    await supabaseRequest('/rest/v1/rpc/cekat_register_patient', { method: 'POST', body: JSON.stringify({ patient_name: name.trim(), selected_facility: facility_id }) }, session.access_token);
    return cekatResponse({ success: true }, session);
  } catch (error) { return cekatFailure(error); }
}
