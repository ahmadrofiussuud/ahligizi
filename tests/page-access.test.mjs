import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pageAccess, demoAccounts } from '../src/lib/page-access.ts';

test('access inventory matches every existing page, including dynamic templates', () => {
  const root = fileURLToPath(new URL('../src/app/', import.meta.url));
  const routes = [];
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.name === 'page.tsx') routes.push('/' + relative(root, directory).split(sep).join('/'));
    }
  }
  visit(root);
  assert.deepEqual(pageAccess.map(page => page.path).sort(), routes.sort());
});
test('demo account destinations never lead to a live portal or production administration', () => {
  assert.equal(new Set(demoAccounts.map(account => account.email)).size, 3);
  for (const account of demoAccounts) {
    assert.match(account.email, /@cekat\.test$/);
    const path = new URL(account.href, 'http://localhost').pathname;
    assert.ok(['/app', '/station/demo', '/access'].includes(path));
    assert.notEqual(path, '/patient'); assert.notEqual(path, '/station'); assert.notEqual(path, '/admin/articles');
  }
});
