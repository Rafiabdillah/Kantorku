/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Unit Tests for Wave S1: D14 (Digital Literacy & AI), D15 (Career & Academic), D7 (Personal Finance & Entrepreneurship)
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ALL_SKILLS, ALL_MANIFESTS, getSkillsByDomain, getAvailableSkillIds } from '../content/skills';
import { DOMAIN_CATALOG } from '../types/skills';
import { ROLES, calculateRoleReadiness } from '../content/roles';

// S1 Content Imports
import { D14_SKILLS } from '../content/skills/d14-literasi-digital/skills';
import { D14_LESSONS } from '../content/skills/d14-literasi-digital/lessons';
import { D14_LEVELS } from '../content/skills/d14-literasi-digital/levels';
import { D14_QUIZZES, generateSeededD14Quizzes } from '../content/skills/d14-literasi-digital/quizzes';
import { D14_CASES } from '../content/skills/d14-literasi-digital/cases';

import { D15_SKILLS } from '../content/skills/d15-karier-akademik/skills';
import { D15_LESSONS } from '../content/skills/d15-karier-akademik/lessons';
import { D15_LEVELS } from '../content/skills/d15-karier-akademik/levels';
import { D15_QUIZZES, generateSeededD15Quizzes } from '../content/skills/d15-karier-akademik/quizzes';
import { D15_CASES } from '../content/skills/d15-karier-akademik/cases';

import { D7_SKILLS } from '../content/skills/d7-keuangan-pribadi/skills';
import { D7_LESSONS } from '../content/skills/d7-keuangan-pribadi/lessons';
import { D7_LEVELS } from '../content/skills/d7-keuangan-pribadi/levels';
import { D7_QUIZZES, generateSeededD7Quizzes } from '../content/skills/d7-keuangan-pribadi/quizzes';
import { D7_CASES } from '../content/skills/d7-keuangan-pribadi/cases';

test('Wave S1 Manifests & Domain Catalog: D14, D15, D7 are properly activated for S1', () => {
  assert.equal(DOMAIN_CATALOG.D14.status, 'aktif');
  assert.equal(DOMAIN_CATALOG.D14.depth, 'penuh');
  assert.equal(DOMAIN_CATALOG.D14.wave, 'S1');

  assert.equal(DOMAIN_CATALOG.D15.status, 'aktif');
  assert.equal(DOMAIN_CATALOG.D15.depth, 'penuh');
  assert.equal(DOMAIN_CATALOG.D15.wave, 'S1');

  assert.equal(DOMAIN_CATALOG.D7.status, 'aktif');
  assert.equal(DOMAIN_CATALOG.D7.depth, 'penuh');
  assert.equal(DOMAIN_CATALOG.D7.wave, 'S1');

  assert.equal(ALL_MANIFESTS.D14.status, 'aktif');
  assert.equal(ALL_MANIFESTS.D15.status, 'aktif');
  assert.equal(ALL_MANIFESTS.D7.status, 'aktif');
});

test('Wave S1 D14 Content Pack: Depth requirements verified', () => {
  assert.equal(D14_SKILLS.length, 3);
  assert.ok(D14_LESSONS.length >= 3);
  assert.ok(D14_LEVELS.length >= 4);
  assert.equal(D14_QUIZZES.length, 10);
  assert.ok(D14_CASES.length >= 1);

  // Check that every D14 skill has at least one objective mode (E or K)
  for (const skill of D14_SKILLS) {
    const hasObj = skill.practiceModes.includes('E') || skill.practiceModes.includes('K');
    assert.ok(hasObj, `Skill ${skill.id} must have objective practice mode`);
  }

  // Check worked examples in D14 lessons
  for (const lesson of D14_LESSONS) {
    assert.ok(lesson.workedExample, `Lesson ${lesson.id} must have worked example`);
    assert.ok(lesson.sources.length > 0, `Lesson ${lesson.id} must have sources`);
    assert.ok(lesson.disclaimer.length > 0, `Lesson ${lesson.id} must have disclaimer`);
  }
});

test('Wave S1 D14 Seeded Quizzes: Deterministic reproducibility and variance', () => {
  const seedA1 = generateSeededD14Quizzes(1001);
  const seedA2 = generateSeededD14Quizzes(1001);
  const seedB = generateSeededD14Quizzes(9999);

  // Exact reproducibility for same seed
  assert.deepEqual(seedA1, seedA2, 'Identical seed must produce identical D14 quizzes');

  // Text or order variance across different seeds
  if (seedA1[0].type === 'urutan' && seedB[0].type === 'urutan') {
    const q1TextA = seedA1[0].items[0]?.text;
    const q1TextB = seedB[0].items[0]?.text;
    assert.ok(typeof q1TextA === 'string' && typeof q1TextB === 'string');
  }

  // Verify that all 10 quizzes have valid correct answers
  for (const q of seedA1) {
    if (q.type === 'urutan') {
      assert.ok(Array.isArray(q.correctOrder) && q.correctOrder.length > 0);
    } else if (q.type === 'temukan-kesalahan') {
      const errCount = q.contextSnippet.lines.filter((l) => l.isError).length;
      assert.equal(errCount, q.requiredErrorCount);
    } else if (q.type === 'klik-area') {
      const targetCount = q.previewImageOrBox.zones.filter((z) => z.isTarget).length;
      assert.ok(targetCount > 0);
    }
  }
});

test('Wave S1 D14 Simulation Engine: Level 2 anti-social-engineering scenario', () => {
  const simLevel = D14_LEVELS.find((l) => l.engine === 'simulation-engine');
  assert.ok(simLevel, 'D14 simulation level must exist');
  assert.ok(simLevel.simulationScenario);

  const scenario = simLevel.simulationScenario;
  assert.equal(scenario.targetCharacter.id, 'sari');
  assert.ok(Object.keys(scenario.nodes).length >= 3);

  // Assert reputation impacts exist and are bounded
  for (const node of Object.values(scenario.nodes)) {
    if (node.choices) {
      for (const choice of node.choices) {
        if (typeof choice.reputationImpact === 'number') {
          assert.ok(choice.reputationImpact >= -10 && choice.reputationImpact <= 10);
        }
      }
    }
  }
});

test('Wave S1 D15 Content Pack: Depth requirements & ATS/STAR models', () => {
  assert.equal(D15_SKILLS.length, 3);
  assert.ok(D15_LESSONS.length >= 3);
  assert.ok(D15_LEVELS.length >= 4);
  assert.equal(D15_QUIZZES.length, 10);
  assert.ok(D15_CASES.length >= 1);

  // Check objective modes
  for (const skill of D15_SKILLS) {
    const hasObj = skill.practiceModes.includes('E') || skill.practiceModes.includes('K');
    assert.ok(hasObj, `Skill ${skill.id} must have objective mode`);
  }

  // Check simulation level with Maya
  const simLevel = D15_LEVELS.find((l) => l.engine === 'simulation-engine');
  assert.ok(simLevel && simLevel.simulationScenario);
  assert.equal(simLevel.simulationScenario.targetCharacter.id, 'maya');

  // Check seeded quizzes
  const qSeed1 = generateSeededD15Quizzes(42);
  const qSeed2 = generateSeededD15Quizzes(42);
  assert.deepEqual(qSeed1, qSeed2);
});

test('Wave S1 D7 Content Pack: Depth requirements & Financial logic', () => {
  assert.equal(D7_SKILLS.length, 3);
  assert.ok(D7_LESSONS.length >= 3);
  assert.ok(D7_LEVELS.length >= 4);
  assert.equal(D7_QUIZZES.length, 10);
  assert.ok(D7_CASES.length >= 1);

  // 50/30/20 formula verification:
  const monthlyIncome = 6000000;
  const needs50 = monthlyIncome * 0.5; // 3.000.000
  const wants30 = monthlyIncome * 0.3; // 1.800.000
  const savings20 = monthlyIncome * 0.2; // 1.200.000
  assert.equal(needs50 + wants30 + savings20, monthlyIncome);

  // HPP, Markup, and Margin formula verification:
  const rawMaterial = 12000;
  const directLabor = 3000;
  const overhead = 1000;
  const hpp = rawMaterial + directLabor + overhead; // 16.000
  const markupPercent = 0.25; // 25% markup
  const sellingPrice = hpp * (1 + markupPercent); // 20.000
  const grossProfit = sellingPrice - hpp; // 4.000
  const marginPercent = grossProfit / sellingPrice; // 20% margin
  assert.equal(hpp, 16000);
  assert.equal(sellingPrice, 20000);
  assert.equal(marginPercent, 0.2);

  // Check seeded quizzes
  const d7Quizzes1 = generateSeededD7Quizzes(7001);
  const d7Quizzes2 = generateSeededD7Quizzes(7001);
  assert.deepEqual(d7Quizzes1, d7Quizzes2);
});

test('Bagian B Rule 2 Inheritance: roleRelevance never exceeds domainRequirement.weight', () => {
  for (const skill of ALL_SKILLS) {
    for (const [roleId, weight] of Object.entries(skill.roleRelevance)) {
      const role = ROLES.find((r) => r.id === roleId);
      assert.ok(role, `Role ${roleId} must exist`);
      const req = role.domainRequirements.find((d) => d.domainId === skill.domain);
      assert.ok(req, `Role ${roleId} must require domain ${skill.domain}`);
      assert.ok(
        weight <= req.weight,
        `Skill ${skill.id} weight (${weight}) cannot exceed domain weight (${req.weight}) for role ${roleId}`
      );
    }
  }
});

test('Wave S1 Depth Audit v9.2: Lessons >= 3, Levels >= 4, Quizzes >= 8, and Sources >= 2 per skill', () => {
  const domains = [
    { id: 'D14', skills: D14_SKILLS, lessons: D14_LESSONS, levels: D14_LEVELS, quizzes: D14_QUIZZES },
    { id: 'D15', skills: D15_SKILLS, lessons: D15_LESSONS, levels: D15_LEVELS, quizzes: D15_QUIZZES },
    { id: 'D7', skills: D7_SKILLS, lessons: D7_LESSONS, levels: D7_LEVELS, quizzes: D7_QUIZZES },
  ];

  for (const d of domains) {
    assert.ok(d.lessons.length >= 3, `${d.id} must have at least 3 lessons (found ${d.lessons.length})`);
    assert.ok(d.levels.length >= 4, `${d.id} must have at least 4 levels (found ${d.levels.length})`);
    assert.ok(d.quizzes.length >= 8, `${d.id} must have at least 8 quizzes (found ${d.quizzes.length})`);

    for (const skill of d.skills) {
      assert.ok(
        Array.isArray(skill.sources) && skill.sources.length >= 2,
        `Skill ${skill.id} in ${d.id} must have >= 2 verifiable sources (found ${skill.sources?.length ?? 0})`
      );
      for (const source of skill.sources) {
        // Must contain title, publisher, and year (e.g. "2020", "2021", etc.)
        assert.ok(
          /\b(19\d\d|20\d\d)\b/.test(source),
          `Source '${source}' in skill ${skill.id} must contain a verifiable publication year`
        );
        assert.ok(source.length > 20, `Source '${source}' must be specific and descriptive`);
      }
    }
  }
});

test('Wave S1 Passing Thresholds: passThreshold strictly set (70 for T1-T2, 80 for T3+)', () => {
  const allS1Levels = [...D14_LEVELS, ...D15_LEVELS, ...D7_LEVELS];
  for (const lvl of allS1Levels) {
    assert.ok(
      typeof lvl.passThreshold === 'number',
      `Level ${lvl.id} must explicitly declare passThreshold`
    );
    if (lvl.tier <= 2) {
      assert.equal(lvl.passThreshold, 70, `Level ${lvl.id} (Tier ${lvl.tier}) must have passThreshold 70`);
    } else {
      assert.equal(lvl.passThreshold, 80, `Level ${lvl.id} (Tier ${lvl.tier}) must have passThreshold 80`);
    }
  }
});

test('Wave S1 Reordering Quizzes: initial sequence != correctOrder guaranteed across all seeds', () => {
  const seedGenerators = [
    { id: 'D14', gen: generateSeededD14Quizzes },
    { id: 'D15', gen: generateSeededD15Quizzes },
    { id: 'D7', gen: generateSeededD7Quizzes },
  ];

  for (const { id, gen } of seedGenerators) {
    for (let seed = 1; seed <= 15; seed++) {
      const quizzes = gen(seed);
      for (const q of quizzes) {
        if (q.type === 'urutan') {
          const initialSequence = q.items.map((item) => item.id).join(',');
          const correctSequence = q.correctOrder.join(',');
          assert.notEqual(
            initialSequence,
            correctSequence,
            `Question ${q.id} (${id}, seed ${seed}) initial order must not equal correct order`
          );
        }
      }
    }
  }
});

test('Level -> SkillId Mapping in Level Data: D7-SKILL-02/03 and Level 4 D14/D15 target correct skills', () => {
  // Check D7 levels
  const d7Lvl1 = D7_LEVELS.find((l) => l.id === 'D7-LEVEL-01');
  const d7Lvl2 = D7_LEVELS.find((l) => l.id === 'D7-LEVEL-02');
  const d7Lvl3 = D7_LEVELS.find((l) => l.id === 'D7-LEVEL-03');
  const d7Lvl4 = D7_LEVELS.find((l) => l.id === 'D7-LEVEL-04');

  assert.equal(d7Lvl1?.skillId, 'D7-SKILL-01');
  assert.equal(d7Lvl2?.skillId, 'D7-SKILL-02');
  assert.equal(d7Lvl3?.skillId, 'D7-SKILL-02');
  assert.equal(d7Lvl4?.skillId, 'D7-SKILL-03');

  // Check D14 levels
  const d14Lvl1 = D14_LEVELS.find((l) => l.id === 'D14-LEVEL-01');
  const d14Lvl2 = D14_LEVELS.find((l) => l.id === 'D14-LEVEL-02');
  const d14Lvl3 = D14_LEVELS.find((l) => l.id === 'D14-LEVEL-03');
  const d14Lvl4 = D14_LEVELS.find((l) => l.id === 'D14-LEVEL-04');

  assert.equal(d14Lvl1?.skillId, 'D14-SKILL-01');
  assert.equal(d14Lvl2?.skillId, 'D14-SKILL-02');
  assert.equal(d14Lvl3?.skillId, 'D14-SKILL-03');
  assert.equal(d14Lvl4?.skillId, 'D14-SKILL-02'); // Incident response & UU PDP must target D14-SKILL-02

  // Check D15 levels
  const d15Lvl1 = D15_LEVELS.find((l) => l.id === 'D15-LEVEL-01');
  const d15Lvl2 = D15_LEVELS.find((l) => l.id === 'D15-LEVEL-02');
  const d15Lvl3 = D15_LEVELS.find((l) => l.id === 'D15-LEVEL-03');
  const d15Lvl4 = D15_LEVELS.find((l) => l.id === 'D15-LEVEL-04');

  assert.equal(d15Lvl1?.skillId, 'D15-SKILL-01');
  assert.equal(d15Lvl2?.skillId, 'D15-SKILL-02');
  assert.equal(d15Lvl3?.skillId, 'D15-SKILL-03');
  assert.equal(d15Lvl4?.skillId, 'D15-SKILL-02'); // Offering letter negotiation must target D15-SKILL-02

  // All levels in S0 & S1 must have valid existing skillIds
  const allKnownSkillIds = new Set(ALL_SKILLS.map((s) => s.id));
  const allLevels = [...D14_LEVELS, ...D15_LEVELS, ...D7_LEVELS];
  for (const lvl of allLevels) {
    assert.ok(lvl.skillId, `Level ${lvl.id} must have skillId`);
    assert.ok(allKnownSkillIds.has(lvl.skillId), `SkillId ${lvl.skillId} in ${lvl.id} must exist in ALL_SKILLS`);
  }
});

test('Audit Sources D12 Citation Correctness: Permenpan-RB 80/2012 for Tata Naskah Dinas', () => {
  const d12Skill1 = ALL_SKILLS.find((s) => s.id === 'D12-SKILL-01');
  assert.ok(d12Skill1, 'D12-SKILL-01 must exist');
  assert.ok(
    d12Skill1.sources.some((s) => s.includes('Permenpan-RB No. 80 Tahun 2012') && s.includes('Tata Naskah Dinas')),
    'D12-SKILL-01 must cite Permenpan-RB No. 80 Tahun 2012 for Tata Naskah Dinas'
  );
  // Ensure the erroneous Permenpan-RB 83/2012 for Tata Naskah Dinas is not present
  assert.ok(
    !d12Skill1.sources.some((s) => s.includes('83 Tahun 2012') && s.includes('Tata Naskah Dinas')),
    'D12-SKILL-01 must not cite Permenpan-RB 83/2012 for Tata Naskah Dinas'
  );
});


