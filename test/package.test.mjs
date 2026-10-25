import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSync } from '@babel/core';
import { getMemberPositions, hasRoleAccumulation, isExclusiveRole, unitLabel } from '../dist/organization.js';

const root = fileURLToPath(new URL('../', import.meta.url));
test('todos os exports públicos existem no pacote compilado', () => {
  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
  for (const target of Object.values(pkg.exports)) assert.ok(existsSync(resolve(root, target)), target);
});
test('JavaScript distribuído não tem JSX, aliases locais ou imports ausentes', () => {
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = resolve(dir, entry.name);
      if (entry.isDirectory()) { walk(file); continue; }
      if (!file.endsWith('.js')) continue;
      const code = readFileSync(file, 'utf8');
      assert.doesNotMatch(code, /from\s+['"]@\//, file);
      assert.doesNotMatch(code, /(?:apiKey|databaseURL|NEXT_PUBLIC_FIREBASE)\s*[:=]/, file);
      const ast = parseSync(code, { configFile: false, babelrc: false, sourceType: 'module' });
      for (const node of ast.program.body) {
        const source = node.source?.value;
        if (source?.startsWith('.')) assert.ok(existsSync(resolve(dirname(file), source)), `${file}: ${source}`);
      }
    }
  }
  walk(resolve(root, 'dist'));
});
test('fronteiras client são preservadas na compilação', () => {
  for (const name of ['primitives', 'firebase', 'website/Header', 'website/Footer', 'sara/Navbar', 'sig/Navbar', 'sig/AuthGuard', 'sig/MemberModal']) {
    assert.match(readFileSync(resolve(root, `dist/${name}.js`), 'utf8'), /^['"]use client['"]/);
  }
});
test('regras de cargos preservam membros atuais e formato legado', () => {
  const positions = [{ unit: 'diretoria-executiva', role: 'Presidente' }];
  assert.deepEqual(getMemberPositions({ positions }), positions);
  assert.deepEqual(getMemberPositions({ unit: 'diretoria-executiva', role: 'Presidente' }), positions);
  assert.deepEqual(getMemberPositions({}), []);
  assert.equal(isExclusiveRole('Secretário'), true);
  assert.equal(isExclusiveRole('Tesoureiro'), true);
  assert.equal(isExclusiveRole('Presidente'), false);
  assert.equal(hasRoleAccumulation({ positions: [...positions, { unit: 'diretoria-orientacao', role: 'Orientador' }] }), true);
  assert.equal(unitLabel('diretoria-executiva'), 'Diretoria Executiva');
});
