import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { isBlankWorkSubmission } from '../engine/submissionGuard';
import { validateWebContent } from '../engine/webValidator';
import { validateWordDocument } from '../engine/wordValidator';
import { runCodeWithTests } from '../engine/codeSandbox';
import { LEVELS } from '../content/levels';
import { LevelItem, SheetGrid } from '../types';
import { D3_QUIZZES } from '../content/skills/d3-presentasi/quizzes';
import { D6_QUIZZES } from '../content/skills/d6-akuntansi/quizzes';
import { D7_QUIZZES } from '../content/skills/d7-keuangan-pribadi/quizzes';
import { D8_QUIZZES } from '../content/skills/d8-operasional/quizzes';
import { D9_QUIZZES } from '../content/skills/d9-pemasaran/quizzes';
import { D10_QUIZZES } from '../content/skills/d10-sdm/quizzes';
import { D11_QUIZZES } from '../content/skills/d11-manajemen-proyek/quizzes';
import { D12_QUIZZES } from '../content/skills/d12-komunikasi/quizzes';
import { D13_QUIZZES } from '../content/skills/d13-bahasa-inggris/quizzes';
import { D14_QUIZZES } from '../content/skills/d14-literasi-digital/quizzes';
import { D15_QUIZZES } from '../content/skills/d15-karier-akademik/quizzes';
import { D16_QUIZZES } from '../content/skills/d16-desain-uiux/quizzes';
import { D17_QUIZZES } from '../content/skills/d17-hukum-kepatuhan/quizzes';

const ALL_QUIZZES: Array<[string, unknown[]]> = [
  ['D3', D3_QUIZZES],
  ['D6', D6_QUIZZES],
  ['D7', D7_QUIZZES],
  ['D8', D8_QUIZZES],
  ['D9', D9_QUIZZES],
  ['D10', D10_QUIZZES],
  ['D11', D11_QUIZZES],
  ['D12', D12_QUIZZES],
  ['D13', D13_QUIZZES],
  ['D14', D14_QUIZZES],
  ['D15', D15_QUIZZES],
  ['D16', D16_QUIZZES],
  ['D17', D17_QUIZZES],
];

const level = (partial: Partial<LevelItem> & Pick<LevelItem, 'module'>): LevelItem =>
  partial as LevelItem;

const snapshot = (over: Partial<{ sheet: SheetGrid; code: string; word: string; html: string; css: string }> = {}) => ({
  sheet: {},
  code: '',
  word: '',
  html: '',
  css: '',
  ...over,
});

test('guard: excel submit with an untouched grid counts as blank', () => {
  const initial: SheetGrid = { A2: { raw: 'Budi' }, B2: { raw: '90' } };
  const lvl = level({ module: 'excel', initialData: { excel: initial } });

  assert.equal(isBlankWorkSubmission(lvl, snapshot({ sheet: initial })), true);
  assert.equal(isBlankWorkSubmission(lvl, snapshot({ sheet: { ...initial, C2: { raw: '=SUM(B2)' } } })), false);
});

test('guard: excel cells typed then cleared are still blank', () => {
  const lvl = level({ module: 'excel', initialData: { excel: { A1: { raw: 'x' } } } });
  const cleared: SheetGrid = { A1: { raw: 'x' }, D9: { raw: '   ' } };

  assert.equal(isBlankWorkSubmission(lvl, snapshot({ sheet: cleared })), true);
});

test('guard: web/coding/word compare against the prefilled template', () => {
  const web = level({ module: 'web', initialData: { html: '<h1>Halaman</h1>', css: 'body{color:red}' } });
  assert.equal(isBlankWorkSubmission(web, snapshot({ html: '<h1>Halaman</h1>', css: 'body{color:red}' })), true);
  assert.equal(isBlankWorkSubmission(web, snapshot({ html: '<h1>Halaman</h1><p>baru</p>' })), false);

  const code = level({ module: 'coding', initialData: { code: 'function solution() {}' } });
  assert.equal(isBlankWorkSubmission(code, snapshot({ code: '  function solution() {}  ' })), true);
  assert.equal(isBlankWorkSubmission(code, snapshot({ code: 'function solution() { return 1; }' })), false);

  const word = level({ module: 'word', initialData: { word: '' } });
  assert.equal(isBlankWorkSubmission(word, snapshot({ word: '<p></p>' })), true);
  assert.equal(isBlankWorkSubmission(word, snapshot({ word: '<p>Notulensi rapat divisi.</p>' })), false);
});

test('webValidator rejects an empty HTML panel even with sparse requirements', () => {
  const res = validateWebContent('', '', { requireFlexbox: true, requiredClasses: ['flex-navbar'] });
  assert.equal(res.passed, false);
  assert.equal(res.score.correctness, 0);
});

test('wordValidator rejects an empty document even with structure-only requirements', () => {
  const res = validateWordDocument('', { requireH1: true });
  assert.equal(res.passed, false);
  assert.equal(res.score.total, 0);
});

test('codeSandbox fails closed when a level ships no test cases', async () => {
  const res = await runCodeWithTests('function solution() { return 42; }', [], 'solution');
  assert.equal(res.success, false);
  assert.match(res.friendlyError || '', /kasus uji/i);
});

test('codeSandbox still runs real test cases', async () => {
  const pass = await runCodeWithTests('function solution(a) { return a * 2; }', [{ input: [3], expected: 6, description: 'dobel' }], 'solution');
  assert.equal(pass.success, true);
  const fail = await runCodeWithTests('function solution(a) { return a; }', [{ input: [3], expected: 6, description: 'dobel' }], 'solution');
  assert.equal(fail.success, false);
});

test('content: every coding level ships at least one test case', () => {
  const offenders = LEVELS.filter((l) => l.module === 'coding' && !(l.testCases && l.testCases.length > 0));
  assert.deepEqual(offenders.map((l) => l.id), []);
});

test('content: every excel level has an explicit grader in MissionPlayView', () => {
  const source = readFileSync(fileURLToPath(new URL('../components/mission/MissionPlayView.tsx', import.meta.url)), 'utf-8');
  const missing = LEVELS.filter((l) => l.module === 'excel' && !source.includes(`level.id === '${l.id}'`));
  assert.deepEqual(missing.map((l) => l.id), []);
});

test('content: no advanced quiz question can pass vacuously', () => {
  for (const [domain, questions] of ALL_QUIZZES) {
    for (const raw of questions) {
      const q = raw as {
        id: string;
        type: string;
        correctOrder?: string[];
        pairs?: Array<{ id: string }>;
        contextSnippet?: { lines: Array<{ isError?: boolean }> };
      };
      if (q.type === 'urutan') {
        assert.ok((q.correctOrder?.length ?? 0) > 0, `${domain}/${q.id}: urutan tanpa correctOrder`);
      }
      if (q.type === 'cocokkan') {
        assert.ok((q.pairs?.length ?? 0) > 0, `${domain}/${q.id}: cocokkan tanpa pairs`);
      }
      if (q.type === 'temukan-kesalahan') {
        const errors = (q.contextSnippet?.lines ?? []).filter((l) => l.isError).length;
        assert.ok(errors > 0, `${domain}/${q.id}: temukan-kesalahan tanpa baris isError`);
      }
    }
  }
});
