import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RUBRIC_DIMENSIONS,
  UNMEASURED_RUBRIC,
  clampScore,
  correctnessFromObjectives,
  evaluateCaseHandover,
  hasMeasuredScore,
  isHandoverWritten,
} from '../engine/evaluation';
import { isBlankWork } from '../engine/submissionGuard';

const DEFAULT_NOTE = 'Tugas telah selesai dirapikan sesuai instruksi.';

test('rubric: unmeasured dimensions stay null instead of a flattering number', () => {
  assert.deepEqual(
    RUBRIC_DIMENSIONS.map((d) => UNMEASURED_RUBRIC[d]),
    [null, null, null, null, null]
  );
  assert.equal(hasMeasuredScore(UNMEASURED_RUBRIC), false);
  assert.equal(hasMeasuredScore({ ...UNMEASURED_RUBRIC, correctness: 40 }), true);
});

test('clampScore keeps scores inside 0-100 and survives NaN', () => {
  assert.equal(clampScore(Number.NaN), 0);
  assert.equal(clampScore(-20), 0);
  assert.equal(clampScore(160), 100);
  assert.equal(clampScore(66.6), 67);
});

test('correctnessFromObjectives: Excel/Code missions are scored by objectives only', () => {
  assert.equal(correctnessFromObjectives({}), 0);
  assert.equal(
    correctnessFromObjectives({
      a: { status: 'passed' },
      b: { status: 'passed' },
      c: { status: 'failed' },
      d: { status: 'untested' },
    }),
    50
  );
  assert.equal(correctnessFromObjectives({ a: { status: 'passed' } }), 100);
});

test('isHandoverWritten: the prefilled example note is not real work', () => {
  assert.equal(isHandoverWritten(DEFAULT_NOTE, DEFAULT_NOTE), false);
  assert.equal(isHandoverWritten('   ', DEFAULT_NOTE), false);
  assert.equal(isHandoverWritten('Rekap selesai.', DEFAULT_NOTE), false);
  assert.equal(isHandoverWritten('Retur dikeluarkan, rekap siap dikirim ke klien.', DEFAULT_NOTE), true);
});

test('evaluateCaseHandover: an untouched case is blocked with concrete notes', () => {
  const res = evaluateCaseHandover({
    workChanged: false,
    clarificationAnswered: false,
    clarificationOptimal: false,
    handoverWritten: false,
  });
  assert.equal(res.blockers.length, 2);
  assert.match(res.blockers.join(' '), /klarifikasi/);
  assert.match(res.blockers.join(' '), /serah terima/);
  assert.equal(res.rubric.efficiency, null);
  assert.equal(res.rubric.neatness, null);
  assert.equal(res.rubric.maintainability, null);
  assert.equal(res.rubric.correctness, 0);
  assert.equal(res.rubric.communication, 0);
});

test('evaluateCaseHandover: answered plus written note passes and is scored honestly', () => {
  const res = evaluateCaseHandover({
    workChanged: true,
    clarificationAnswered: true,
    clarificationOptimal: true,
    handoverWritten: true,
  });
  assert.deepEqual(res.blockers, []);
  assert.equal(res.rubric.correctness, 100);
  assert.equal(res.rubric.communication, 100);
  assert.ok(res.notes.some((note) => /paling aman secara bisnis/.test(note)));
});

test('evaluateCaseHandover: a non-optimal clarification lowers communication only', () => {
  const res = evaluateCaseHandover({
    workChanged: true,
    clarificationAnswered: true,
    clarificationOptimal: false,
    handoverWritten: true,
  });
  assert.equal(res.rubric.communication, 70);
  assert.ok(res.notes.some((note) => /bukan yang paling tepat/.test(note)));
});

test('isBlankWork: generic helper detects an untouched case workbook', () => {
  const initial = { excel: { A2: { raw: 'Budi' }, B2: { raw: '90' } } };
  const snap = { sheet: initial.excel, code: '', word: '', html: '', css: '' };
  assert.equal(isBlankWork('excel', initial, snap), true);
  assert.equal(isBlankWork('excel', initial, { ...snap, sheet: { ...initial.excel, C2: { raw: '10' } } }), false);
});
