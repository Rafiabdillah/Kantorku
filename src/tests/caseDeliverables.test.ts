import test from 'node:test';
import assert from 'node:assert/strict';
import { CASE_FILES } from '../content/caseFiles';
import { evaluateCaseDeliverableAsync, hasMeasurableDeliverable, CaseWork } from '../engine/caseDeliverable';
import { evaluateCaseHandover } from '../engine/evaluation';
import { CaseFile, SheetGrid } from '../types';

function initialWork(c: CaseFile): CaseWork {
  return {
    sheet: JSON.parse(JSON.stringify(c.initialData.excel ?? {})),
    html: c.initialData.html ?? '',
    css: c.initialData.css ?? '',
    word: c.initialData.word ?? '',
    code: c.initialData.code ?? '',
  };
}

function solvedWork(c: CaseFile): CaseWork {
  const work = initialWork(c);
  const fix = c.checkSolution;
  assert.ok(fix, `${c.id} has measurable checks but no checkSolution`);
  for (const [cell, raw] of Object.entries(fix.excel ?? {})) {
    work.sheet[cell] = { ...(work.sheet[cell] ?? {}), raw } as SheetGrid[string];
  }
  work.html += fix.html ?? '';
  work.css += fix.css ?? '';
  work.word += fix.word ?? '';
  if (fix.code !== undefined) work.code = fix.code;
  return work;
}

const measurable = CASE_FILES.filter(hasMeasurableDeliverable);

test('every tier from 1 to 7 has at least one case', () => {
  for (let tier = 1; tier <= 7; tier++) {
    assert.ok(CASE_FILES.some((c) => c.tier === tier), `tier ${tier} has no case`);
  }
});

function track(c: CaseFile): string {
  if (c.module === 'coding') return 'js';
  if (c.module === 'word') return 'word';
  return c.module === 'web' ? 'web' : 'excel';
}

test('every tier from 1 to 7 has a case in the Excel, Web, JavaScript and Word tracks', () => {
  for (let tier = 1; tier <= 7; tier++) {
    for (const t of ['excel', 'web', 'js', 'word']) {
      assert.ok(CASE_FILES.some((c) => c.tier === tier && track(c) === t), `tier ${tier} has no ${t} case`);
    }
  }
});

test('JavaScript cases carry hidden edge tests and a reference solution', () => {
  for (const c of CASE_FILES.filter((x) => x.module === 'coding')) {
    assert.ok((c.testCases?.length ?? 0) >= 3, `${c.id} needs at least 3 tests`);
    assert.ok(c.testCases?.some((t) => t.hidden), `${c.id} needs a hidden edge test`);
    assert.ok(c.checkSolution?.code, `${c.id} needs a reference solution`);
  }
});

test('case ids are unique', () => {
  const ids = CASE_FILES.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every case added for tiers 1, 2, 4, 5, 6 and 7 is graded on its deliverable', () => {
  for (const c of CASE_FILES.filter((x) => [1, 4, 5, 6, 7].includes(x.tier))) {
    assert.ok(hasMeasurableDeliverable(c), `${c.id} has no measurable check`);
  }
});

for (const c of measurable) {
  test(`case ${c.id}: untouched work does not pass`, async () => {
    const result = await evaluateCaseDeliverableAsync(c, initialWork(c));
    assert.equal(result.passed, false, 'the starting file must not already satisfy the client');
    assert.ok(result.messages.length > 0);
  });

  test(`case ${c.id}: the reference work passes`, async () => {
    const result = await evaluateCaseDeliverableAsync(c, solvedWork(c));
    assert.equal(result.passed, true, result.messages.join(' | '));
  });
}

test('a failing deliverable blocks the handover with the client-facing message', async () => {
  const c = measurable[0];
  const deliverable = await evaluateCaseDeliverableAsync(c, initialWork(c));
  const verdict = evaluateCaseHandover({
    workChanged: true,
    clarificationAnswered: true,
    clarificationOptimal: true,
    handoverWritten: true,
    deliverable,
  });
  assert.ok(verdict.blockers.some((b) => b.includes('belum memenuhi permintaan klien')));
});
