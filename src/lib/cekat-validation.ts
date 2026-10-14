export function validateScreening(data: Record<string, unknown>) {
  const result: Record<string, string | number | null> = {};
  const bounds: Record<string, [number, number]> = {
    systolic: [40, 300], diastolic: [20, 200], blood_glucose: [10, 1000], pulse: [20, 250],
    spo2: [0, 100], weight_kg: [2, 400], height_cm: [30, 250], waist_cm: [10, 250],
  };
  for (const [key, [min, max]] of Object.entries(bounds)) {
    const value = data[key];
    if ((key === 'spo2' || key === 'waist_cm') && (value === null || value === undefined)) { result[key] = null; continue; }
    if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) throw new Error(`Nilai ${key} tidak valid.`);
    result[key] = value;
  }
  if (Number(result.diastolic) >= Number(result.systolic)) throw new Error('Tekanan sistolik harus lebih besar daripada diastolik.');
  if (typeof data.glucose_type !== 'string' || !['fasting', 'random', 'postmeal'].includes(data.glucose_type)) throw new Error('Pilih jenis pemeriksaan gula darah.');
  if (typeof data.notes !== 'string' || data.notes.length > 2000) throw new Error('Catatan maksimal 2.000 karakter.');
  result.glucose_type = data.glucose_type; result.notes = data.notes.trim();
  return result;
}
