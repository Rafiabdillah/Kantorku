import test from 'node:test';
import assert from 'node:assert/strict';

import { LEVELS } from '../content/levels';
import { validateWebContent } from '../engine/webValidator';
import { validateWordDocument } from '../engine/wordValidator';
import { runCodeWithTests, extractFunctionName } from '../engine/codeSandbox';

const webLevels = LEVELS.filter((l) => l.module === 'web');
const wordLevels = LEVELS.filter((l) => l.module === 'word');
const codingLevels = LEVELS.filter((l) => l.module === 'coding');

/**
 * Anggaran 3s di sandbox diukur dengan jam dinding, jadi mesin yang sedang sibuk bisa memunculkan
 * "terlalu lama" palsu. Loop yang benar-benar tidak berhenti tetap gagal pada percobaan kedua.
 */
async function runWithTimeoutRetry(code: string, testCases: Parameters<typeof runCodeWithTests>[1]) {
  const first = await runCodeWithTests(code, testCases, extractFunctionName(code));
  if (!first.friendlyError?.includes('terlalu lama')) return first;
  return runCodeWithTests(code, testCases, extractFunctionName(code));
}

test('starter drafts for web missions do not satisfy their own requirements', () => {
  const offenders = webLevels
    .filter((l) => validateWebContent(l.initialData.html || '', l.initialData.css || '', l.webRequirements || {}).passed)
    .map((l) => l.id);
  assert.deepEqual(offenders, []);
});

test('starter drafts for word missions do not satisfy their own requirements', () => {
  const offenders = wordLevels
    .filter((l) => validateWordDocument(l.initialData.word || '', l.wordRequirements || { minWords: 15 }).passed)
    .map((l) => l.id);
  assert.deepEqual(offenders, []);
});

test('starter code for coding missions fails its own test cases', async () => {
  const offenders: string[] = [];
  for (const l of codingLevels) {
    const code = l.initialData.code || '';
    const res = await runCodeWithTests(code, l.testCases || [], extractFunctionName(code));
    if (res.success) offenders.push(l.id);
  }
  assert.deepEqual(offenders, []);
});

test('every coding mission is solvable: its reference solution passes all test cases', async () => {
  const broken: string[] = [];
  for (const l of codingLevels) {
    const res = await runWithTimeoutRetry(l.referenceSolution, l.testCases || []);
    if (!res.success) broken.push(`${l.id}: ${res.friendlyError || res.error || 'gagal'}`);
  }
  assert.deepEqual(broken, []);
});

test('word and web drafts stay editable: they are non-empty scaffolds, not blank pages', () => {
  const emptyWord = wordLevels.filter((l) => !(l.initialData.word || '').trim()).map((l) => l.id);
  const emptyHtml = webLevels.filter((l) => !(l.initialData.html || '').trim()).map((l) => l.id);
  assert.deepEqual(emptyWord, []);
  assert.deepEqual(emptyHtml, []);
});
