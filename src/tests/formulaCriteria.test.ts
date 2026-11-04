import test from 'node:test';
import assert from 'node:assert/strict';
import { ExcelFormulaEngine } from '../engine/formula';

const grid: any = {
  A1: { raw: 'Transfer' }, B1: { raw: '1500000' },
  A2: { raw: 'Tunai' }, B2: { raw: '800000' },
  A3: { raw: 'Transfer' }, B3: { raw: '2500000' },
  C1: { raw: '0.1' }, D1: { raw: 'abc def' },
  E1: { raw: '' }, E2: { raw: '5' },
};
const calc = (formula: string) => new ExcelFormulaEngine({ ...grid, Z9: { raw: formula } }).getCellValue('Z9');

test('parentheses, unary minus, power, percent, and & precedence', () => {
  assert.equal(calc('=B1*(1-C1)'), 1350000);
  assert.equal(calc('=ROUND(B1*(1-C1), 0)'), 1350000);
  assert.equal(calc('=(B1+B2)/2'), 1150000);
  assert.equal(calc('=-B1'), -1500000);
  assert.equal(calc('=2^3'), 8);
  assert.equal(calc('=B1*10%'), 150000);
  assert.equal(calc('="a"&1+2'), 'a3');
});

test('COUNTIF/SUMIF accept operator criteria and wildcards', () => {
  assert.equal(calc('=COUNTIF(B1:B3; ">=1000000")'), 2);
  assert.equal(calc('=COUNTIF(A1:A3; "<>Tunai")'), 2);
  assert.equal(calc('=COUNTIF(A1:A3; "Trans*")'), 2);
  assert.equal(calc('=SUMIF(B1:B3; ">1000000")'), 4000000);
  assert.equal(calc('=SUMIF(A1:A3; "Transfer"; B1:B3)'), 4000000);
});

test('AVERAGEIF, SUMIFS, COUNTIFS', () => {
  assert.equal(calc('=AVERAGEIF(A1:A3; "Transfer"; B1:B3)'), 2000000);
  assert.equal(calc('=AVERAGEIF(A1:A3; "x"; B1:B3)'), '#DIV/0!');
  assert.equal(calc('=SUMIFS(B1:B3; A1:A3; "Transfer"; B1:B3; ">2000000")'), 2500000);
  assert.equal(calc('=COUNTIFS(A1:A3; "Transfer"; B1:B3; ">2000000")'), 1);
});

test('COUNT/COUNTA/COUNTBLANK ignore empty cells; VALUE and PROPER work', () => {
  assert.equal(calc('=COUNTA(E1:E2)'), 1);
  assert.equal(calc('=COUNT(E1:E2)'), 1);
  assert.equal(calc('=COUNTBLANK(E1:E2)'), 1);
  assert.equal(calc('=VALUE("12")+1'), 13);
  assert.equal(calc('=PROPER(D1)'), 'Abc Def');
});
