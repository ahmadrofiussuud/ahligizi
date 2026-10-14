import test from 'node:test';
import assert from 'node:assert/strict';

const base = process.env.CEKAT_TEST_URL || 'http://localhost:3000';
test('anonymous requests cannot read patient or staff data', async () => {
  for (const path of ['/api/cekat/patient', '/api/cekat/station/screenings', '/api/cekat/session']) {
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 401, path);
    assert.match(response.headers.get('cache-control'), /no-store/);
  }
});
test('cross-origin mutations are rejected before authentication or cloud writes', async () => {
  for (const path of ['/api/cekat/patient', '/api/cekat/station/patient', '/api/cekat/station/screenings', '/api/cekat/session']) {
    const response = await fetch(`${base}${path}`, { method: 'POST', headers: { Origin: 'https://untrusted.example', 'Content-Type': 'application/json' }, body: '{}' });
    assert.equal(response.status, 403, path);
  }
});
test('anonymous clients cannot identify a patient or save fabricated measurements', async () => {
  for (const path of ['/api/cekat/station/patient', '/api/cekat/station/screenings']) {
    const response = await fetch(`${base}${path}`, { method: 'POST', headers: { Origin: base, 'Content-Type': 'application/json' }, body: JSON.stringify({ code: '11111111111111111111' }) });
    assert.equal(response.status, 401, path);
  }
});
test('legacy login no longer issues fabricated Google identities', async () => {
  const response = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { Origin: base, 'Content-Type': 'application/json' }, body: JSON.stringify({ provider: 'google' }) });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).token, undefined);
});
