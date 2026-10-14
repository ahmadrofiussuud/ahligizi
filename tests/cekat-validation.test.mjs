import test from 'node:test';
import assert from 'node:assert/strict';
import { validateScreening } from '../src/lib/cekat-validation.ts';

const measurement = {
  systolic: 120, diastolic: 80, blood_glucose: 100, glucose_type: 'random',
  pulse: 75, weight_kg: 60, height_cm: 160, spo2: null, waist_cm: null, notes: '',
};

test('unmeasured optional indicators remain null, never become zero or fabricated values', () => {
  const result = validateScreening(measurement);
  assert.equal(result.spo2, null); assert.equal(result.waist_cm, null);
});
test('reject nonfinite values and strings received directly from API clients', () => {
  for (const value of [NaN, Infinity, '120', null, undefined]) {
    assert.throws(() => validateScreening({ ...measurement, systolic: value }));
  }
});
test('reject reversed blood pressure, invalid oxygen saturation and unsupported glucose context', () => {
  assert.throws(() => validateScreening({ ...measurement, diastolic: 125 }));
  assert.throws(() => validateScreening({ ...measurement, spo2: 101 }));
  assert.throws(() => validateScreening({ ...measurement, glucose_type: 'diagnosis' }));
});
test('unknown actor identifiers cannot override fields returned by validation', () => {
  const result = validateScreening({ ...measurement, recorded_by: 'other-user', facility_id: 'other-facility', queue_status: 'completed' });
  assert.equal(result.recorded_by, undefined); assert.equal(result.facility_id, undefined); assert.equal(result.queue_status, undefined);
});
