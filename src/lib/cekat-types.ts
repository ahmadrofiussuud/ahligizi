export interface CekatFacility { id: string; name: string }
export interface CekatPatient { user_id: string; facility_id: string; name: string }
export interface CekatScreening {
  id: string; patient_id: string; facility_id: string; created_at: string;
  visit_date: string; queue_number: number; queue_status: 'waiting' | 'called' | 'completed';
  systolic: number; diastolic: number; blood_glucose: number;
  glucose_type: 'fasting' | 'random' | 'postmeal'; pulse: number; spo2: number | null;
  weight_kg: number; height_cm: number; waist_cm: number | null; notes: string;
  cekat_patients?: { name: string };
}
export interface CekatAccount {
  user: { id: string; email?: string }; patient: CekatPatient | null;
  registration: { code: string } | null; staff: { facility_id: string; active: boolean } | null;
  facilities: CekatFacility[]; screenings: CekatScreening[];
}
