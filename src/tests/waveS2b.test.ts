/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Unit Tests for Wave S2b: D9, D10, D8
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DOMAIN_CATALOG, DomainMeta } from '../types/skills';

import { D9_SKILLS } from '../content/skills/d9-pemasaran/skills';
import { D9_LESSONS } from '../content/skills/d9-pemasaran/lessons';
import { D9_LEVELS } from '../content/skills/d9-pemasaran/levels';
import { D9_CASES } from '../content/skills/d9-pemasaran/cases';
import { D9_QUIZZES, generateSeededD9Quizzes } from '../content/skills/d9-pemasaran/quizzes';
import { D9_MARKETING_CONSTANTS, calculateCAC, calculateLTV, calculateROAS, calculateROI } from '../content/skills/d9-pemasaran/constants';

import { D10_SKILLS } from '../content/skills/d10-sdm/skills';
import { D10_LESSONS } from '../content/skills/d10-sdm/lessons';
import { D10_LEVELS } from '../content/skills/d10-sdm/levels';
import { D10_CASES } from '../content/skills/d10-sdm/cases';
import { D10_QUIZZES, generateSeededD10Quizzes } from '../content/skills/d10-sdm/quizzes';
import { D10_PAYROLL_CONSTANTS, calculateHourlyWage, calculateWeekdayOvertimePay, calculateTHR, calculateBpjsKesehatanEmployeeDeduction } from '../content/skills/d10-sdm/constants';

import { D8_SKILLS } from '../content/skills/d8-operasional/skills';
import { D8_LESSONS } from '../content/skills/d8-operasional/lessons';
import { D8_LEVELS } from '../content/skills/d8-operasional/levels';
import { D8_CASES } from '../content/skills/d8-operasional/cases';
import { D8_QUIZZES, generateSeededD8Quizzes } from '../content/skills/d8-operasional/quizzes';
import { D8_INVENTORY_CONSTANTS, calculateEOQ, calculateDailyDemand, calculateSafetyStock, calculateROP } from '../content/skills/d8-operasional/constants';

const domainPacks = [
  { id: 'D9', skills: D9_SKILLS, lessons: D9_LESSONS, levels: D9_LEVELS, quizzes: D9_QUIZZES, cases: D9_CASES },
  { id: 'D10', skills: D10_SKILLS, lessons: D10_LESSONS, levels: D10_LEVELS, quizzes: D10_QUIZZES, cases: D10_CASES },
  { id: 'D8', skills: D8_SKILLS, lessons: D8_LESSONS, levels: D8_LEVELS, quizzes: D8_QUIZZES, cases: D8_CASES },
];

function countStatus(status: DomainMeta['status']) {
  return Object.values(DOMAIN_CATALOG).filter((domain) => domain.status === status).length;
}

test('Wave S2b activation: D9, D10, and D8 are active; final wave count includes 17 active domains', () => {
  for (const id of ['D9', 'D10', 'D8'] as const) {
    assert.equal(DOMAIN_CATALOG[id].status, 'aktif');
  }
  assert.equal(countStatus('aktif'), 17);
  assert.equal(countStatus('segera-hadir'), 0);
});

test('Wave S2b depth audit: at least 3 lessons, 4 levels, 10 seeded quizzes, and 1 case per skill pack', () => {
  for (const pack of domainPacks) {
    assert.equal(pack.skills.length, 3, `${pack.id} must have 3 skills`);
    assert.ok(pack.lessons.length >= 3, `${pack.id} needs at least 3 lessons`);
    assert.ok(pack.levels.length >= 4, `${pack.id} needs at least 4 levels`);
    assert.ok(pack.quizzes.length >= 10, `${pack.id} needs at least 10 quizzes`);
    assert.ok(pack.cases.length >= 1, `${pack.id} needs at least 1 case`);
    for (const lesson of pack.lessons) assert.ok(lesson.workedExample?.bad && lesson.workedExample?.good, `${lesson.id} needs bad and good drafts`);
  }
});

test('Wave S2b sources: every skill has at least two specific, verifiable sources', () => {
  for (const pack of domainPacks) {
    for (const skill of pack.skills) {
      assert.ok(skill.sources.length >= 2, `${skill.id} must have at least 2 sources`);
      for (const source of skill.sources) {
        assert.ok(source.length > 10);
        assert.ok(!source.toLowerCase().includes('praktik umum'));
        assert.ok(!source.toLowerCase().includes('standar industri'));
      }
    }
  }
});

test('Wave S2b level mapping and thresholds', () => {
  for (const pack of domainPacks) {
    for (const level of pack.levels) {
      assert.ok(pack.skills.some((skill) => skill.id === level.skillId), `${level.id} references an existing skillId`);
      assert.equal(level.passThreshold, level.tier <= 2 ? 70 : 80, `${level.id} has wrong pass threshold`);
      assert.ok(level.id.length > 0 && level.title.length > 0, `${level.id} needs an identifier and title`);
    }
  }
});

test('Wave S2b seeded quizzes are reproducible, vary across seeds, and reorder drafts are not correct initially', () => {
  const generators = [
    ['D9', generateSeededD9Quizzes],
    ['D10', generateSeededD10Quizzes],
    ['D8', generateSeededD8Quizzes],
  ] as const;
  for (const [domain, generate] of generators) {
    const a = generate(4242);
    const b = generate(4242);
    const c = generate(9876);
    assert.deepEqual(a, b);
    assert.notDeepEqual(a, c);
    assert.ok(generate(4242).length >= 10);
    for (const seed of [101, 555, 999, 1234, 7777, 98765]) {
      for (const quiz of generate(seed).filter((question) => question.type === 'urutan')) {
        const initial = quiz.items.map((item) => item.id).join(',');
        assert.notEqual(initial, quiz.correctOrder.join(','), `${domain} reorder quiz ${quiz.id} starts in correct order`);
      }
    }
  }
});

test('Wave S2b numeric scenarios recalculate from constants, not hard-coded expectations', () => {
  const d9CAC = calculateCAC(D9_MARKETING_CONSTANTS.totalMarketingCost, D9_MARKETING_CONSTANTS.totalNewCustomersAcquired);
  const d9LTV = calculateLTV(D9_MARKETING_CONSTANTS.averageOrderValue, D9_MARKETING_CONSTANTS.annualPurchaseFrequency, D9_MARKETING_CONSTANTS.expectedTenureYears);
  assert.equal(d9CAC, 200_000);
  assert.equal(d9LTV / d9CAC, 12);
  assert.equal(calculateROAS(D9_MARKETING_CONSTANTS.adRevenue, D9_MARKETING_CONSTANTS.adSpend), 5);
  assert.equal(calculateROI(D9_MARKETING_CONSTANTS.totalCampaignRevenue, D9_MARKETING_CONSTANTS.totalMarketingCost), 100);

  const hourly = calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary);
  const overtime = calculateWeekdayOvertimePay(hourly, D10_PAYROLL_CONSTANTS.overtimeHoursWorked);
  const thr = calculateTHR(D10_PAYROLL_CONSTANTS.monthlySalary, D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB);
  const bpjs = calculateBpjsKesehatanEmployeeDeduction(D10_PAYROLL_CONSTANTS.monthlySalary);
  assert.equal(hourly, D10_PAYROLL_CONSTANTS.monthlySalary / D10_PAYROLL_CONSTANTS.overtimeDivisor);
  assert.equal(overtime, 165_000);
  assert.equal(thr, 3_460_000);
  assert.equal(bpjs, 51_900);

  const daily = calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear);
  const eoq = calculateEOQ(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.orderCostPerOrder, D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear);
  const safety = calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, daily);
  const rop = calculateROP(daily, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, safety);
  assert.equal(daily, 40);
  assert.equal(eoq, 1_000);
  assert.equal(safety, 120);
  assert.equal(rop, 320);

  assert.ok(D9_LESSONS[2].workedExample.good.includes('Rp200.000'));
  assert.ok(D10_LESSONS[1].workedExample.good.includes('Rp165.000'));
  assert.ok(D8_LESSONS[1].workedExample.good.includes('320 unit'));
});
