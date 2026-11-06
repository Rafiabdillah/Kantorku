import test from 'node:test';
import assert from 'node:assert/strict';
import { LEVELS } from '../content/levels';
import { ExcelFormulaEngine } from '../engine/formula';
import type { SheetGrid } from '../types';

const withChecks = LEVELS.filter((l) => l.excelChecks?.length);

function parseSolution(ref: string): [string, string][] {
  return ref
    .split(/,\s*(?=[A-Z]+\d+:\s)/)
    .map((part) => part.match(/^([A-Z]+\d+):\s*([\s\S]*)$/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => [m[1], m[2].trim()]);
}

function evaluate(level: (typeof LEVELS)[number], sheet: SheetGrid) {
  const engine = new ExcelFormulaEngine(sheet);
  return level.excelChecks!.map((check) => {
    const actual = engine.getCellValue(check.cell);
    const raw = String(sheet[check.cell]?.raw ?? '').toUpperCase();
    const valueOk =
      typeof check.expected === 'number'
        ? typeof actual === 'number' && Math.abs(actual - check.expected) < 0.005
        : String(actual).trim().toLowerCase() === check.expected.toLowerCase();
    const formulaOk = (check.formulaIncludes ?? []).every((f) => raw.includes(f.toUpperCase()));
    return { cell: check.cell, ok: valueOk && formulaOk, actual };
  });
}

test('there are declarative excel missions to verify', () => {
  assert.ok(withChecks.length >= 3);
});

for (const level of withChecks) {
  test(`${level.id}: starting sheet does not pass, reference solution passes every check`, () => {
    const start: SheetGrid = JSON.parse(JSON.stringify(level.initialData.excel ?? {}));
    assert.ok(
      evaluate(level, start).some((r) => !r.ok),
      'the untouched sheet must not already satisfy the checks',
    );

    const solved: SheetGrid = JSON.parse(JSON.stringify(level.initialData.excel ?? {}));
    for (const [addr, raw] of parseSolution(level.referenceSolution)) {
      solved[addr] = { ...(solved[addr] ?? { raw: '' }), raw };
    }
    const failed = evaluate(level, solved).filter((r) => !r.ok);
    assert.deepEqual(failed, [], `failed checks: ${JSON.stringify(failed)}`);

    level.excelChecks!.forEach((c) => assert.ok(c.objective >= 0 && c.objective < level.objectives.length));
  });
}
