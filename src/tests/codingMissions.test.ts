import test from 'node:test';
import assert from 'node:assert/strict';
import { LEVELS } from '../content/levels';

const coding = LEVELS.filter((l) => l.module === 'coding' && l.testCases?.length);

function functionNameOf(code: string): string {
  const match = code.match(/function\s+([A-Za-z_$][\w$]*)/);
  assert.ok(match, 'starter code must declare a function');
  return match[1];
}

for (const level of coding) {
  test(`${level.id}: reference solution passes every test case and the starter does not`, () => {
    const name = functionNameOf(level.initialData.code ?? '');
    const run = (code: string) => {
      const fn = new Function(`${code}\nreturn ${name};`)() as (...args: unknown[]) => unknown;
      return level.testCases!.map((tc) => {
        const args = Array.isArray(tc.input) ? tc.input : tc.input !== undefined ? [tc.input] : [];
        const actual = fn(...JSON.parse(JSON.stringify(args)));
        return JSON.stringify(actual) === JSON.stringify(tc.expected);
      });
    };
    assert.ok(run(level.referenceSolution).every(Boolean), 'reference solution must pass all cases');
    assert.ok(run(level.initialData.code ?? '').some((ok) => !ok), 'starter code must not already pass');
  });
}
