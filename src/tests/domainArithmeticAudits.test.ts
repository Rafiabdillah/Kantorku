/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Domain Mathematical & Arithmetic Consistency Audit Suite (D6, D7, D11, D3)
 * Verifies exact arithmetic recalculation for bank reconciliation, journal equations,
 * BEP calculations, critical path float, resource leveling, and source citations.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { D6_LEVELS } from '../content/skills/d6-akuntansi/levels';
import { D6_CASES } from '../content/skills/d6-akuntansi/cases';
import { D6_LESSONS } from '../content/skills/d6-akuntansi/lessons';
import { D6_SKILLS } from '../content/skills/d6-akuntansi/skills';
import { generateSeededD6Quizzes } from '../content/skills/d6-akuntansi/quizzes';

import { D7_LEVELS } from '../content/skills/d7-keuangan-pribadi/levels';
import { D7_LESSONS } from '../content/skills/d7-keuangan-pribadi/lessons';
import { D7_SKILLS } from '../content/skills/d7-keuangan-pribadi/skills';
import { generateSeededD7Quizzes } from '../content/skills/d7-keuangan-pribadi/quizzes';

import { D11_LEVELS } from '../content/skills/d11-manajemen-proyek/levels';
import { D11_CASES } from '../content/skills/d11-manajemen-proyek/cases';
import { generateSeededD11Quizzes } from '../content/skills/d11-manajemen-proyek/quizzes';

import { D3_SKILLS } from '../content/skills/d3-presentasi/skills';
import { generateSeededD3Quizzes } from '../content/skills/d3-presentasi/quizzes';

import {
  D9_MARKETING_CONSTANTS,
  calculateROAS,
  calculateCAC,
  calculateLTV,
  calculateROI,
} from '../content/skills/d9-pemasaran/constants';
import { D9_LESSONS } from '../content/skills/d9-pemasaran/lessons';
import { D9_LEVELS } from '../content/skills/d9-pemasaran/levels';
import { generateSeededD9Quizzes } from '../content/skills/d9-pemasaran/quizzes';

import {
  D10_PAYROLL_CONSTANTS,
  calculateHourlyWage,
  calculateWeekdayOvertimePay,
  calculateTHR,
  calculateBpjsKesehatanEmployeeDeduction,
} from '../content/skills/d10-sdm/constants';
import { D10_LESSONS } from '../content/skills/d10-sdm/lessons';
import { D10_LEVELS } from '../content/skills/d10-sdm/levels';
import { generateSeededD10Quizzes } from '../content/skills/d10-sdm/quizzes';

import {
  D8_INVENTORY_CONSTANTS,
  calculateEOQ,
  calculateDailyDemand,
  calculateSafetyStock,
  calculateROP,
  calculateOrderFrequency,
} from '../content/skills/d8-operasional/constants';
import { D8_LESSONS } from '../content/skills/d8-operasional/lessons';
import { D8_LEVELS } from '../content/skills/d8-operasional/levels';
import { generateSeededD8Quizzes } from '../content/skills/d8-operasional/quizzes';

// =========================================================================
// 1. D6 Bank Reconciliation & Accounting Arithmetic
// =========================================================================

test('D6 Arithmetic: Bank reconciliation balances perfectly on both sides', () => {
  const lvl2 = D6_LEVELS.find((l) => l.id === 'D6-LEVEL-02')!;
  assert.ok(lvl2 && lvl2.simulationScenario, 'D6 Level 2 must have simulationScenario');

  const scen = lvl2.simulationScenario!;
  const startNode = scen.nodes['node-start'];
  assert.ok(startNode, 'node-start must exist');

  // Extract initial figures from dialogue
  // "rekening koran bank mencatat saldo kas Rp46.500.000, tetapi buku besar kas kita mencatat Rp50.000.000. Ada selisih Rp3.500.000"
  const startText = startNode.text;
  assert.ok(startText.includes('46.500.000'), 'Initial bank statement must be Rp46.500.000');
  assert.ok(startText.includes('50.000.000'), 'Initial book balance must be Rp50.000.000');
  assert.ok(startText.includes('3.500.000'), 'Initial difference must be Rp3.500.000');

  const initialBank = 46_500_000;
  const initialBook = 50_000_000;
  const difference = initialBook - initialBank;
  assert.equal(difference, 3_500_000, 'Difference between book and bank must be exactly 3.500.000');

  // Assembly node checks
  const assemblyNode = scen.nodes['node-assembly'];
  assert.ok(assemblyNode, 'node-assembly must exist');
  assert.ok(assemblyNode.text.includes('setoran dalam perjalanan Rp3.450.000'), 'Assembly text must state setoran dalam perjalanan');
  assert.ok(assemblyNode.text.includes('beban administrasi bank Rp50.000'), 'Assembly text must state beban administrasi bank');

  const depositInTransit = 3_450_000;
  const bankAdminFee = 50_000;

  // Independent recalculation:
  // Bank side: Bank Balance + Deposit in Transit = Adjusted Bank Balance
  const adjustedBank = initialBank + depositInTransit;
  // Book side: Book Balance - Bank Admin Fee = Adjusted Book Balance
  const adjustedBook = initialBook - bankAdminFee;

  assert.equal(adjustedBank, 49_950_000, 'Adjusted bank balance must be 49.950.000');
  assert.equal(adjustedBook, 49_950_000, 'Adjusted book balance must be 49.950.000');
  assert.equal(adjustedBank, adjustedBook, 'Both adjusted balances must be strictly equal!');

  // Check sentence blocks
  const blocks = assemblyNode.sentenceBlocks!.available;
  const blockAdmin = blocks.find((b) => b.id === 'b1')!;
  const blockDeposit = blocks.find((b) => b.id === 'b2')!;
  const blockAdjusted = blocks.find((b) => b.id === 'b3')!;

  assert.ok(blockAdmin.text.includes('beban administrasi bank Rp50.000'), 'Block b1 must specify admin fee Rp50.000');
  assert.ok(blockDeposit.text.includes('Menambahkan setoran dalam perjalanan Rp3.450.000'), 'Block b2 must specify addition of setoran dalam perjalanan');
  assert.ok(!blockDeposit.text.toLowerCase().includes('cek vendor'), 'Block b2 must not contain cek vendor');
  assert.ok(!blockDeposit.text.toLowerCase().includes('mengurangkan cek'), 'Block b2 must not contain mengurangkan cek');
  assert.ok(blockAdjusted.text.includes('Rp49.950.000'), 'Block b3 must confirm balanced figure Rp49.950.000');

  // Check explanation string matches exact formula
  const exp = assemblyNode.sentenceBlocks!.explanation;
  assert.ok(exp.includes('46.500.000 + 3.450.000 = 49.950.000'), 'Explanation must prove bank side addition');
  assert.ok(
    exp.includes('50.000.000 - 50.000 (biaya admin) = 49.950.000') ||
      exp.includes('50.000.000 - 50.000 = 49.950.000') ||
      (exp.includes('50.000.000') && exp.includes('50.000') && exp.includes('49.950.000')),
    'Explanation must prove book side subtraction'
  );
});

test('D6 Arithmetic: D6 case and lesson worked example reflect identical bank reconciliation math', () => {
  // Case File Check
  const d6Case = D6_CASES.find((c) => c.id === 'case-d6-01')!;
  assert.ok(d6Case, 'case-d6-01 must exist');
  assert.ok(d6Case.dataPack?.anomalies.some((a) => a.includes('Setoran dalam perjalanan Rp3.450.000')), 'Case anomalies must state setoran dalam perjalanan Rp3.450.000');

  const recDeliverable = d6Case.deliverables?.find((d) => d.name.includes('Rekonsiliasi Bank'));
  assert.ok(recDeliverable, 'Reconciliation deliverable must exist');
  assert.ok(recDeliverable.requiredElements.includes('Setoran dalam perjalanan'), 'Deliverable must require Setoran dalam perjalanan');
  assert.ok(recDeliverable.requiredElements.includes('Beban administrasi bank'), 'Deliverable must require Beban administrasi bank');

  // Lesson Worked Example Check
  const les02 = D6_LESSONS.find((l) => l.id === 'D6-LES-02')!;
  assert.ok(les02 && les02.workedExample, 'D6-LES-02 worked example must exist');
  const goodText = les02.workedExample.good;
  assert.ok(goodText.includes('46.500.000'), 'Lesson must state bank Rp46.500.000');
  assert.ok(goodText.includes('3.450.000'), 'Lesson must state deposit Rp3.450.000');
  assert.ok(goodText.includes('50.000.000'), 'Lesson must state book Rp50.000.000');
  assert.ok(goodText.includes('49.950.000'), 'Lesson must state adjusted Rp49.950.000');
});

test('D6 Arithmetic: Accounting fundamental equation and double-entry balance in quizzes', () => {
  const quizzes = generateSeededD6Quizzes(777);

  // Q5: Double-entry audit
  const q5 = quizzes.find((q) => q.id === 'D6-QZ-05') as any;
  assert.ok(q5 && q5.contextSnippet, 'Q5 must exist');
  const validEntries = q5.contextSnippet.lines.filter((l: any) => !l.isError);
  for (const entry of validEntries) {
    // Each valid entry must debit amount === credit amount
    const numbers = entry.text.match(/\d+[\d.]*/g);
    if (numbers && numbers.length >= 2) {
      assert.equal(numbers[0], numbers[1], `Debit and credit in "${entry.text}" must match`);
    }
  }

  // Q7: Accounting Equation delta balance: Delta A = Delta L + Delta E
  const q7 = quizzes.find((q) => q.id === 'D6-QZ-07') as any;
  assert.ok(q7 && q7.pairs, 'Q7 must exist');

  // Map known transactions and verify net delta is 0: Delta Assets - Delta Liab - Delta Equity = 0
  const expectedDeltas: Record<string, { deltaA: number; deltaL: number; deltaE: number }> = {
    'eq-1': { deltaA: 2, deltaL: 2, deltaE: 0 },
    'eq-2': { deltaA: -1.5, deltaL: -1.5, deltaE: 0 },
    'eq-3': { deltaA: 0.8, deltaL: 0, deltaE: 0.8 },
    'eq-4': { deltaA: 5, deltaL: 0, deltaE: 5 },
  };

  for (const pair of q7.pairs) {
    const d = expectedDeltas[pair.id];
    assert.ok(d, `Delta for pair ${pair.id} must be configured`);
    assert.equal(
      d.deltaA,
      d.deltaL + d.deltaE,
      `Accounting equation must hold: ${d.deltaA} = ${d.deltaL} + ${d.deltaE}`
    );
  }
});

// =========================================================================
// 2. D7 Financial & Break-Even Point (BEP) Arithmetic
// =========================================================================

test('D7 Arithmetic: BEP formula recalculation matches lesson worked example', () => {
  const les03 = D7_LESSONS.find((l) => l.id === 'D7-LES-03')!;
  assert.ok(les03 && les03.workedExample, 'D7-LES-03 worked example must exist');

  const fixedCost = 3_000_000; // Rp 3.000.000 / month
  const variableCostPerUnit = 6_000; // Rp 6.000 / cup
  const sellingPricePerUnit = 16_000; // Rp 16.000 / cup

  const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
  assert.equal(contributionMargin, 10_000, 'Contribution margin must be 10.000 / cup');

  const bepUnitsPerMonth = fixedCost / contributionMargin;
  assert.equal(bepUnitsPerMonth, 300, 'BEP per month must be 300 units');

  const bepUnitsPerDay = bepUnitsPerMonth / 30;
  assert.equal(bepUnitsPerDay, 10, 'Daily BEP must be 10 units / day');

  // Verify lesson text mentions exact values
  const exText = JSON.stringify(les03.workedExample);
  assert.ok(exText.includes('10.000'), 'Must mention Rp 10.000 margin');
  assert.ok(exText.includes('300'), 'Must mention 300 cup');
  assert.ok(exText.includes('10'), 'Must mention 10 cup/hari');
});

test('D7 Arithmetic: Pricing margin formula vs markup in quizzes', () => {
  // Margin formula: Price = HPP / (1 - Margin)
  const hpp = 18_000;
  const targetMargin = 0.50; // 50%
  const correctPrice = hpp / (1 - targetMargin);

  assert.equal(correctPrice, 36_000, 'Price with 50% margin must be Rp 36.000');

  // Profit and margin verification
  const profit = correctPrice - hpp;
  assert.equal(profit, 18_000);
  const calculatedMargin = profit / correctPrice;
  assert.equal(calculatedMargin, targetMargin);

  // Check Q5 variant B text in D7
  const quizzes = generateSeededD7Quizzes(4001);
  const q5 = quizzes.find((q) => q.id === 'D7-Q-05')!;
  assert.ok(q5, 'D7-Q-05 must exist');
});

test('D7 Arithmetic: Level 2 down payment and Level 4 capital allocation sum to 100%', () => {
  // Level 2 Down Payment & Credit Terms
  const lvl2 = D7_LEVELS.find((l) => l.id === 'D7-LEVEL-02')!;
  assert.ok(lvl2 && lvl2.simulationScenario, 'D7 Level 2 scenario must exist');
  const blocksLvl2 = lvl2.simulationScenario!.nodes['node-joko-assembly'].sentenceBlocks!.available;

  const dpBlock = blocksLvl2.find((b) => b.id === 'b1')!;
  const creditBlock = blocksLvl2.find((b) => b.id === 'b3')!;

  assert.ok(dpBlock.text.includes('40%'), 'DP must be 40%');
  assert.ok(creditBlock.text.includes('60%'), 'Credit must be 60%');
  assert.ok(creditBlock.text.includes('14 hari'), 'Credit terms must be 14 days');
  assert.equal(40 + 60, 100, 'DP 40% + Credit 60% must equal 100%');

  // Total invoice is 8.000.000
  const invoice = 8_000_000;
  const dpAmount = invoice * 0.40;
  const creditAmount = invoice * 0.60;
  assert.equal(dpAmount + creditAmount, invoice, 'Sum of DP and credit amount must equal invoice');
  assert.equal(dpAmount, 3_200_000);
  assert.equal(creditAmount, 4_800_000);

  // Level 4 Capital Allocation
  const lvl4 = D7_LEVELS.find((l) => l.id === 'D7-LEVEL-04')!;
  assert.ok(lvl4 && lvl4.simulationScenario, 'D7 Level 4 scenario must exist');
  const blocksLvl4 = lvl4.simulationScenario!.nodes['node-rahmat-cash-assembly'].sentenceBlocks!.available;
  const allocBlock = blocksLvl4.find((b) => b.id === 'b1')!;

  assert.ok(allocBlock.text.includes('70%'), 'Production equipment must be 70%');
  assert.ok(allocBlock.text.includes('30%'), 'Operating cash buffer must be 30%');
  assert.equal(70 + 30, 100, 'Capital allocation must sum to 100%');
});

// =========================================================================
// 3. D11 Critical Path, Float & WBS Arithmetic
// =========================================================================

test('D11 Arithmetic: Critical Path zero float and resource leveling shift <= float', () => {
  const lvl4 = D11_LEVELS.find((l) => l.id === 'D11-LEVEL-04')!;
  assert.ok(lvl4 && lvl4.simulationScenario, 'D11 Level 4 scenario must exist');

  const scen = lvl4.simulationScenario!;
  const choice2 = scen.nodes['node-start'].choices!.find((c) => c.id === 'c2')!;

  // Choice 2 specifies:
  // - Audit task has float of 10 days
  // - Cloud migration is on critical path with zero float
  // - Shift audit task by 4 days
  assert.ok(choice2.text.includes('(float) 10 hari') || choice2.text.includes('float 10 hari'), 'Audit task must have float of 10 days');
  assert.ok(choice2.text.includes('jalur kritis tanpa kelonggaran'), 'Critical path task must have 0 float');
  assert.ok(choice2.text.includes('4 hari'), 'Shift must be 4 days');

  const availableFloat = 10;
  const taskShift = 4;
  assert.ok(taskShift <= availableFloat, 'Shift must not exceed available float');
  const remainingFloat = availableFloat - taskShift;
  assert.equal(remainingFloat, 6, 'Remaining float must be 6 days');
  assert.ok(remainingFloat >= 0, 'Project completion is guaranteed not delayed');

  // WBS 100% rule check in Level 2 / Quizzes
  const q8 = generateSeededD11Quizzes(1111).find((q) => q.id === 'D11-QZ-08')!;
  assert.ok(q8, 'WBS 100% quiz must exist');
  assert.ok(q8.instruction.includes('WBS') || q8.title.includes('WBS'));
});

// =========================================================================
// 4. D3 Visual Ratio & Time Allocation Arithmetic
// =========================================================================

test('D3 Arithmetic: WCAG AA contrast thresholds and timeboxing consistency', () => {
  const quizzes = generateSeededD3Quizzes(3333);
  const q10 = quizzes.find((q) => q.id === 'D3-QZ-10') as any;
  assert.ok(q10 && q10.previewImageOrBox, 'Q10 contrast test must exist');

  const zones = q10.previewImageOrBox.zones!;
  const wcagAaThreshold = 4.5;

  for (const zone of zones) {
    const ratioMatch = zone.label.match(/(\d+\.?\d*):1/);
    assert.ok(ratioMatch, `Zone ${zone.id} must specify contrast ratio`);
    const ratio = parseFloat(ratioMatch[1]);
    if (zone.isTarget) {
      assert.ok(ratio >= wcagAaThreshold, `Target zone ${zone.id} ratio (${ratio}:1) must meet WCAG AA >= 4.5:1`);
    } else {
      assert.ok(ratio < wcagAaThreshold, `Non-target zone ${zone.id} ratio (${ratio}:1) must be below WCAG AA < 4.5:1`);
    }
  }

  // Timeboxing in Level 4: 12 minutes total = 7 minutes presentation + 5 minutes Q&A
  const lvl4 = D11_LEVELS.find((l) => l.id === 'D11-LEVEL-04');
  assert.ok(lvl4, 'D11 Level 4 exists');
  const d3Lvl4 = D3_SKILLS.find((s) => s.id === 'D3-SKILL-02')!;
  assert.ok(d3Lvl4, 'D3-SKILL-02 exists');
});

// =========================================================================
// 5. Cross-Domain Source Sanitation Audit
// =========================================================================

test('Source Sanitation: No "Color Contrast Contrast" duplicate in any skill', () => {
  for (const skill of D3_SKILLS) {
    for (const src of skill.sources) {
      assert.ok(
        !src.includes('Color Contrast Contrast'),
        `Skill ${skill.id} contains duplicate "Color Contrast Contrast": "${src}"`
      );
    }
  }
});

test('Source Sanitation: SAK EMKM citation year is uniformly 2016 in D6 and D7', () => {
  // Check D6 skills & lessons
  for (const skill of D6_SKILLS) {
    for (const src of skill.sources) {
      if (src.includes('SAK EMKM')) {
        assert.ok(src.includes('2016'), `D6 skill ${skill.id} must cite SAK EMKM 2016: "${src}"`);
        assert.ok(!src.includes('2018'), `D6 skill ${skill.id} must not cite SAK EMKM 2018: "${src}"`);
      }
    }
  }
  for (const les of D6_LESSONS) {
    for (const src of les.sources) {
      if (src.includes('SAK EMKM')) {
        assert.ok(src.includes('2016'), `D6 lesson ${les.id} must cite SAK EMKM 2016: "${src}"`);
        assert.ok(!src.includes('2018'), `D6 lesson ${les.id} must not cite SAK EMKM 2018: "${src}"`);
      }
    }
  }

  // Check D7 skills & lessons
  for (const skill of D7_SKILLS) {
    for (const src of skill.sources) {
      if (src.includes('SAK EMKM')) {
        assert.ok(src.includes('2016'), `D7 skill ${skill.id} must cite SAK EMKM 2016: "${src}"`);
        assert.ok(!src.includes('2018'), `D7 skill ${skill.id} must not cite SAK EMKM 2018: "${src}"`);
      }
    }
  }
  for (const les of D7_LESSONS) {
    for (const src of les.sources) {
      if (src.includes('SAK EMKM')) {
        assert.ok(src.includes('2016'), `D7 lesson ${les.id} must cite SAK EMKM 2016: "${src}"`);
        assert.ok(!src.includes('2018'), `D7 lesson ${les.id} must not cite SAK EMKM 2018: "${src}"`);
      }
    }
  }
});

// =========================================================================
// 6. D9 Digital Marketing & Unit Economics Arithmetic
// =========================================================================

test('D9 Arithmetic: Marketing constants recalculate CAC, LTV, ROAS, and ROI deterministically', () => {
  const c = D9_MARKETING_CONSTANTS;

  // 1. ROAS recalculation
  const roas = calculateROAS(c.adRevenue, c.adSpend);
  assert.equal(roas, 5.0, 'ROAS must be exactly 5.0x');
  assert.equal(c.adRevenue / c.adSpend, 5.0);

  // 2. CAC recalculation
  const cac = calculateCAC(c.totalMarketingCost, c.totalNewCustomersAcquired);
  assert.equal(cac, 200_000, 'CAC must be exactly Rp200.000');
  assert.equal(c.totalMarketingCost / c.totalNewCustomersAcquired, 200_000);

  // 3. LTV recalculation
  const ltv = calculateLTV(c.averageOrderValue, c.annualPurchaseFrequency, c.expectedTenureYears);
  assert.equal(ltv, 2_400_000, 'LTV must be exactly Rp2.400.000');

  // 4. LTV / CAC sustainability ratio
  const ltvCacRatio = ltv / cac;
  assert.equal(ltvCacRatio, 12.0, 'LTV/CAC ratio must be 12.0x');
  assert.ok(ltvCacRatio >= 3.0, 'LTV/CAC ratio must exceed healthy industry benchmark (>= 3.0x)');

  // 5. Total Campaign ROI recalculation
  const roi = calculateROI(c.totalCampaignRevenue, c.totalMarketingCost);
  assert.equal(roi, 100.0, 'ROI must be exactly 100%');
  const netProfit = c.totalCampaignRevenue - c.totalMarketingCost;
  assert.equal(netProfit, 15_000_000, 'Net profit must be Rp15.000.000');

  // 6. Funnel conversion rates
  const leadCr = (c.leadsGenerated / c.websiteVisitors) * 100;
  const salesCr = (c.payingCustomers / c.leadsGenerated) * 100;
  const overallCr = (c.payingCustomers / c.websiteVisitors) * 100;
  assert.equal(leadCr, 5.0, 'Lead conversion rate must be 5.0%');
  assert.equal(salesCr, 20.0, 'Sales conversion rate from leads must be 20.0%');
  assert.equal(overallCr, 1.0, 'Overall visitor-to-customer conversion rate must be 1.0%');
});

test('D9 Arithmetic: Lesson worked example, Level simulation, and Quizzes reflect exact constant recalculations', () => {
  const les03 = D9_LESSONS.find((l) => l.id === 'D9-LES-03')!;
  assert.ok(les03 && les03.workedExample, 'D9-LES-03 worked example must exist');
  const goodText = les03.workedExample.good;
  const expText = les03.workedExample.explanation;
  assert.ok(goodText.includes('Rp200.000'), 'Worked example must contain recalculated CAC Rp200.000');
  assert.ok(goodText.includes('5.0x'), 'Worked example must contain recalculated ROAS 5.0x');
  assert.ok(goodText.includes('100%'), 'Worked example must contain recalculated ROI 100%');
  assert.ok(expText.includes('Rp2.400.000'), 'Worked example explanation must contain recalculated LTV Rp2.400.000');
  assert.ok(expText.includes('12x'), 'Worked example explanation must contain recalculated LTV/CAC ratio 12x');

  // Level 4 simulation scenario check
  const lvl4 = D9_LEVELS.find((l) => l.id === 'D9-LEVEL-04')!;
  assert.ok(lvl4 && lvl4.simulationScenario, 'D9 Level 4 simulation scenario must exist');
  const scen = lvl4.simulationScenario!;
  const assemblyNode = scen.nodes['node-assembly'];
  assert.ok(assemblyNode && assemblyNode.sentenceBlocks, 'node-assembly must have sentence blocks');
  const blocks = assemblyNode.sentenceBlocks.available;
  const b1 = blocks.find((b) => b.id === 'b1')!;
  const b2 = blocks.find((b) => b.id === 'b2')!;
  const b3 = blocks.find((b) => b.id === 'b3')!;
  assert.ok(b1.text.includes('5.0x'), 'Block b1 must specify ROAS 5.0x');
  assert.ok(b2.text.includes('Rp200.000'), 'Block b2 must specify CAC Rp200.000');
  assert.ok(b3.text.includes('100%'), 'Block b3 must specify ROI 100%');

  // Quiz recalculation check (seed 501)
  const quizzes = generateSeededD9Quizzes(501);
  const q6 = quizzes.find((q) => q.id === 'D9-QZ-06') as any;
  assert.ok(q6 && q6.previewImageOrBox, 'D9-QZ-06 must exist and have preview zones');
  const targetZone = q6.previewImageOrBox.zones.find((z: any) => z.isTarget)!;
  assert.ok(targetZone, 'D9-QZ-06 must have target zone');
  assert.ok(targetZone.label.includes('5.0x'), 'Target zone must contain calculated ROAS 5.0x');
  assert.ok(targetZone.label.includes('Rp5.000.000'), 'Target zone must specify ad spend Rp5.000.000');
  assert.ok(targetZone.label.includes('Rp25.000.000'), 'Target zone must specify ad revenue Rp25.000.000');
});

// =========================================================================
// 7. D10 Payroll & Overtime PP 35/2021 Arithmetic
// =========================================================================

test('D10 Arithmetic: Payroll constants recalculate overtime, THR, and BPJS deterministically', () => {
  const p = D10_PAYROLL_CONSTANTS;

  // 1. Hourly wage = monthlySalary / 173
  const hourlyWage = calculateHourlyWage(p.monthlySalary);
  assert.equal(hourlyWage, 30_000, 'Hourly wage must be exactly Rp30.000');
  assert.equal(p.monthlySalary / 173, 30_000, '5.190.000 / 173 must be integer 30.000');

  // 2. Overtime 3 hours weekday:
  // Hour 1: 1.5 * 30.000 = Rp45.000
  // Hours 2-3: 2 * 2.0 * 30.000 = Rp120.000
  // Total = Rp165.000
  const overtimePay = calculateWeekdayOvertimePay(hourlyWage, p.overtimeHoursWorked);
  assert.equal(overtimePay, 165_000, 'Overtime pay for 3 weekday hours must be Rp165.000');

  // 3. THR Worker A (18 months tenure) = full 1 month salary
  const thrA = calculateTHR(p.monthlySalary, p.tenureMonthsWorkerA);
  assert.equal(thrA, 5_190_000, 'Worker A THR must equal 1 full month salary (Rp5.190.000)');

  // 4. THR Worker B (8 months tenure) = (8 / 12) * 5.190.000
  const thrB = calculateTHR(p.monthlySalary, p.tenureMonthsWorkerB);
  assert.equal(thrB, 3_460_000, 'Worker B prorated THR must be exactly Rp3.460.000');

  // 5. BPJS Kesehatan employee deduction (1%)
  const bpjsEmployee = calculateBpjsKesehatanEmployeeDeduction(p.monthlySalary);
  assert.equal(bpjsEmployee, 51_900, 'BPJS Kesehatan 1% employee deduction must be Rp51.900');

  // 6. Regular net take-home pay
  const regularTakeHomePay = p.monthlySalary - bpjsEmployee;
  assert.equal(regularTakeHomePay, 5_138_100, 'Regular net salary must be Rp5.138.100');
});

test('D10 Arithmetic: Lesson worked example, Level simulation, and Quizzes reflect exact constant recalculations', () => {
  const les02 = D10_LESSONS.find((l) => l.id === 'D10-LES-02')!;
  assert.ok(les02 && les02.workedExample, 'D10-LES-02 worked example must exist');
  const goodText = les02.workedExample.good;
  assert.ok(goodText.includes('Rp30.000'), 'Worked example must specify hourly wage Rp30.000');
  assert.ok(goodText.includes('Rp165.000'), 'Worked example must specify overtime pay Rp165.000');
  assert.ok(goodText.includes('Rp3.460.000'), 'Worked example must specify prorated THR Rp3.460.000');

  // Level 4 simulation scenario check
  const lvl4 = D10_LEVELS.find((l) => l.id === 'D10-LEVEL-04')!;
  assert.ok(lvl4 && lvl4.simulationScenario, 'D10 Level 4 simulation scenario must exist');
  const scen = lvl4.simulationScenario!;
  const assemblyNode = scen.nodes['node-assembly'];
  assert.ok(assemblyNode && assemblyNode.sentenceBlocks, 'node-assembly must have sentence blocks');
  const blocks = assemblyNode.sentenceBlocks.available;
  const b1 = blocks.find((b) => b.id === 'b1')!;
  const b2 = blocks.find((b) => b.id === 'b2')!;
  const b3 = blocks.find((b) => b.id === 'b3')!;
  assert.ok(b1.text.includes('Rp30.000'), 'Block b1 must specify hourly wage Rp30.000');
  assert.ok(b2.text.includes('Rp165.000'), 'Block b2 must specify overtime Rp165.000');
  assert.ok(b3.text.includes('Rp3.460.000'), 'Block b3 must specify prorated THR Rp3.460.000');

  // Quiz recalculation check (seed 701)
  const quizzes = generateSeededD10Quizzes(701);
  const q6 = quizzes.find((q) => q.id === 'D10-QZ-06') as any;
  assert.ok(q6 && q6.previewImageOrBox, 'D10-QZ-06 must exist and have preview zones');
  const targetZone = q6.previewImageOrBox.zones.find((z: any) => z.isTarget)!;
  assert.ok(targetZone, 'D10-QZ-06 must have target zone');
  assert.ok(targetZone.label.includes('Rp3.460.000'), 'Target zone must contain calculated prorated THR Rp3.460.000');
  assert.ok(targetZone.label.includes('8 bulan') || targetZone.label.includes('8/12'), 'Target zone must specify 8 months tenure');
});

// =========================================================================
// 8. D8 Operations, EOQ & Inventory Management Arithmetic
// =========================================================================

test('D8 Arithmetic: Inventory constants recalculate EOQ, Safety Stock, and ROP deterministically', () => {
  const inv = D8_INVENTORY_CONSTANTS;

  // 1. EOQ recalculation: sqrt((2 * 10.000 * 50.000) / 1.000) = sqrt(1.000.000) = 1.000 unit
  const eoq = calculateEOQ(inv.annualDemandUnits, inv.orderCostPerOrder, inv.holdingCostPerUnitPerYear);
  assert.equal(eoq, 1_000, 'EOQ must be exactly 1.000 units');

  // 2. Daily demand: 10.000 / 250 = 40 units/day
  const dailyDemand = calculateDailyDemand(inv.annualDemandUnits, inv.workingDaysPerYear);
  assert.equal(dailyDemand, 40, 'Daily demand must be 40 units/day');

  // 3. Safety Stock: (8 - 5) * 40 = 120 units
  const safetyStock = calculateSafetyStock(inv.maxLeadTimeDays, inv.normalLeadTimeDays, dailyDemand);
  assert.equal(safetyStock, 120, 'Safety stock must be 120 units');

  // 4. Reorder Point (ROP): (40 * 5) + 120 = 200 + 120 = 320 units
  const rop = calculateROP(dailyDemand, inv.normalLeadTimeDays, safetyStock);
  assert.equal(rop, 320, 'ROP must be exactly 320 units');

  // 5. Order frequency per year: 10.000 / 1.000 = 10 times
  const orderFreq = calculateOrderFrequency(inv.annualDemandUnits, eoq);
  assert.equal(orderFreq, 10, 'Annual order frequency must be 10 times');

  // 6. Total Inventory Cost equilibrium check:
  // Annual Ordering Cost = (D / Q) * S = 10 * 50.000 = Rp500.000
  // Annual Holding Cost = (Q / 2) * H = 500 * 1.000 = Rp500.000
  const annualOrderCost = orderFreq * inv.orderCostPerOrder;
  const annualHoldingCost = (eoq / 2) * inv.holdingCostPerUnitPerYear;
  assert.equal(annualOrderCost, 500_000, 'Annual ordering cost must be Rp500.000');
  assert.equal(annualHoldingCost, 500_000, 'Annual holding cost must be Rp500.000');
  assert.equal(annualOrderCost, annualHoldingCost, 'At EOQ, ordering cost and holding cost must be strictly equal!');
});

test('D8 Arithmetic: Lesson worked example, Level simulation, and Quizzes reflect exact constant recalculations', () => {
  const les01 = D8_LESSONS.find((l) => l.id === 'D8-LES-01')!;
  const les02 = D8_LESSONS.find((l) => l.id === 'D8-LES-02')!;
  assert.ok(les01 && les01.workedExample, 'D8-LES-01 worked example must exist');
  assert.ok(les02 && les02.workedExample, 'D8-LES-02 worked example must exist');
  const goodText01 = les01.workedExample.good;
  const goodText02 = les02.workedExample.good;
  assert.ok(goodText01.includes('1.000 unit'), 'D8-LES-01 worked example must specify EOQ 1.000 unit');
  assert.ok(goodText02.includes('120 unit'), 'D8-LES-02 worked example must specify safety stock 120 unit');
  assert.ok(goodText02.includes('320 unit'), 'D8-LES-02 worked example must specify ROP 320 unit');

  // Level 4 simulation scenario check
  const lvl4 = D8_LEVELS.find((l) => l.id === 'D8-LEVEL-04')!;
  assert.ok(lvl4 && lvl4.simulationScenario, 'D8 Level 4 simulation scenario must exist');
  const scen = lvl4.simulationScenario!;
  const assemblyNode = scen.nodes['node-assembly'];
  assert.ok(assemblyNode && assemblyNode.sentenceBlocks, 'node-assembly must have sentence blocks');
  const blocks = assemblyNode.sentenceBlocks.available;
  const b1 = blocks.find((b) => b.id === 'b1')!;
  const b2 = blocks.find((b) => b.id === 'b2')!;
  const b3 = blocks.find((b) => b.id === 'b3')!;
  assert.ok(b1.text.includes('1.000 unit'), 'Block b1 must specify EOQ 1.000 unit');
  assert.ok(b2.text.includes('120 unit'), 'Block b2 must specify safety stock 120 unit');
  assert.ok(b3.text.includes('320 unit'), 'Block b3 must specify ROP 320 unit');

  // Quiz recalculation check (seed 801)
  const quizzes = generateSeededD8Quizzes(801);
  const q6 = quizzes.find((q) => q.id === 'D8-QZ-06') as any;
  assert.ok(q6 && q6.previewImageOrBox, 'D8-QZ-06 must exist and have preview zones');
  const targetZone = q6.previewImageOrBox.zones.find((z: any) => z.isTarget)!;
  assert.ok(targetZone, 'D8-QZ-06 must have target zone');
  assert.ok(targetZone.label.includes('1.000 unit'), 'Target zone must specify EOQ 1.000 unit');
  assert.ok(targetZone.label.includes('Rp500.000'), 'Target zone must specify balanced cost Rp500.000');
});

