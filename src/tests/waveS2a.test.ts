/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Unit Tests for Wave S2a: D11 (Project Management), D3 (Presentation & Visual Storytelling), D6 (Accounting & Business Finance)
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ALL_SKILLS, ALL_MANIFESTS, getSkillsByDomain, getAvailableSkillIds } from '../content/skills';
import { DOMAIN_CATALOG } from '../types/skills';
import { ROLES } from '../content/roles';

// S2a Content Imports
import { D11_SKILLS } from '../content/skills/d11-manajemen-proyek/skills';
import { D11_LESSONS } from '../content/skills/d11-manajemen-proyek/lessons';
import { D11_LEVELS } from '../content/skills/d11-manajemen-proyek/levels';
import { D11_QUIZZES, generateSeededD11Quizzes } from '../content/skills/d11-manajemen-proyek/quizzes';
import { D11_CASES } from '../content/skills/d11-manajemen-proyek/cases';

import { D3_SKILLS } from '../content/skills/d3-presentasi/skills';
import { D3_LESSONS } from '../content/skills/d3-presentasi/lessons';
import { D3_LEVELS } from '../content/skills/d3-presentasi/levels';
import { D3_QUIZZES, generateSeededD3Quizzes } from '../content/skills/d3-presentasi/quizzes';
import { D3_CASES } from '../content/skills/d3-presentasi/cases';

import { D6_SKILLS } from '../content/skills/d6-akuntansi/skills';
import { D6_LESSONS } from '../content/skills/d6-akuntansi/lessons';
import { D6_LEVELS } from '../content/skills/d6-akuntansi/levels';
import { D6_QUIZZES, generateSeededD6Quizzes } from '../content/skills/d6-akuntansi/quizzes';
import { D6_CASES } from '../content/skills/d6-akuntansi/cases';

import { D12_SKILLS } from '../content/skills/d12-komunikasi/skills';

test('Wave S2a Manifests & Domain Catalog: D11, D3, D6 are properly activated for S2a', () => {
  assert.equal(DOMAIN_CATALOG.D11.status, 'aktif');
  assert.equal(DOMAIN_CATALOG.D11.depth, 'penuh');
  assert.equal(DOMAIN_CATALOG.D11.wave, 'S2');

  assert.equal(DOMAIN_CATALOG.D3.status, 'aktif');
  assert.equal(DOMAIN_CATALOG.D3.depth, 'penuh');
  assert.equal(DOMAIN_CATALOG.D3.wave, 'S2');

  assert.equal(DOMAIN_CATALOG.D6.status, 'aktif');
  assert.equal(DOMAIN_CATALOG.D6.depth, 'penuh');
  assert.equal(DOMAIN_CATALOG.D6.wave, 'S2');

  assert.equal(ALL_MANIFESTS.D11.status, 'aktif');
  assert.equal(ALL_MANIFESTS.D3.status, 'aktif');
  assert.equal(ALL_MANIFESTS.D6.status, 'aktif');

  // Verify total count: at least 10 active in S2
  const allDomains = Object.values(DOMAIN_CATALOG);
  const activeCount = allDomains.filter((d) => d.status === 'aktif').length;
  const upcomingCount = allDomains.filter((d) => d.status === 'segera-hadir').length;
  assert.ok(activeCount >= 10, 'Must have at least 10 active domains');
  assert.ok(upcomingCount <= 7, 'Upcoming domains count must decrease as waves activate');
});

test('Wave S2a Depth Requirements: D11, D3, D6 satisfy >=3 lessons, >=4 levels, >=10 quizzes, >=1 case', () => {
  // D11
  assert.equal(D11_SKILLS.length, 3);
  assert.ok(D11_LESSONS.length >= 3);
  assert.ok(D11_LEVELS.length >= 4);
  assert.ok(D11_QUIZZES.length >= 10);
  assert.ok(D11_CASES.length >= 1);

  // D3
  assert.equal(D3_SKILLS.length, 3);
  assert.ok(D3_LESSONS.length >= 3);
  assert.ok(D3_LEVELS.length >= 4);
  assert.ok(D3_QUIZZES.length >= 10);
  assert.ok(D3_CASES.length >= 1);

  // D6
  assert.equal(D6_SKILLS.length, 3);
  assert.ok(D6_LESSONS.length >= 3);
  assert.ok(D6_LEVELS.length >= 4);
  assert.ok(D6_QUIZZES.length >= 10);
  assert.ok(D6_CASES.length >= 1);
});

test('Wave S2a Verifiable Sources: Every skill in D11, D3, D6 has >=2 specific verifiable sources', () => {
  const s2aSkills = [...D11_SKILLS, ...D3_SKILLS, ...D6_SKILLS];
  for (const skill of s2aSkills) {
    assert.ok(Array.isArray(skill.sources), `Skill ${skill.id} must have sources array`);
    assert.ok(skill.sources.length >= 2, `Skill ${skill.id} must have at least 2 sources`);
    for (const source of skill.sources) {
      assert.ok(source.length > 10, `Source "${source}" in skill ${skill.id} is too short`);
      assert.ok(!source.toLowerCase().includes('praktik umum'), `Source in ${skill.id} cannot be generic`);
      assert.ok(!source.toLowerCase().includes('standar industri'), `Source in ${skill.id} cannot be generic`);
    }
  }
});

test('Wave S2a Seeded Quizzes: Deterministic reproducibility and variance across seeds', () => {
  // D11 reproducibility
  const d11A1 = generateSeededD11Quizzes(1111);
  const d11A2 = generateSeededD11Quizzes(1111);
  const d11B = generateSeededD11Quizzes(9999);
  assert.deepEqual(d11A1, d11A2);
  assert.notDeepEqual(d11A1, d11B);

  // D3 reproducibility
  const d3A1 = generateSeededD3Quizzes(2222);
  const d3A2 = generateSeededD3Quizzes(2222);
  const d3B = generateSeededD3Quizzes(8888);
  assert.deepEqual(d3A1, d3A2);
  assert.notDeepEqual(d3A1, d3B);

  // D6 reproducibility
  const d6A1 = generateSeededD6Quizzes(3333);
  const d6A2 = generateSeededD6Quizzes(3333);
  const d6B = generateSeededD6Quizzes(7777);
  assert.deepEqual(d6A1, d6A2);
  assert.notDeepEqual(d6A1, d6B);
});

test('Wave S2a Reordering Quizzes: Initial sequence != correctOrder guaranteed', () => {
  const seeds = [101, 555, 999, 1234, 7777, 98765];
  for (const seed of seeds) {
    const q11 = generateSeededD11Quizzes(seed);
    const q3 = generateSeededD3Quizzes(seed);
    const q6 = generateSeededD6Quizzes(seed);

    const reorderQuestions = [...q11, ...q3, ...q6].filter((q) => q.type === 'urutan');
    for (const q of reorderQuestions) {
      const initialItemIds = q.items.map((i: any) => i.id);
      const isIdentical = initialItemIds.join(',') === q.correctOrder.join(',');
      assert.ok(
        !isIdentical,
        `Reorder quiz ${q.id} in seed ${seed} has initial order equal to correctOrder!`
      );
    }
  }
});

test('Wave S2a Level -> SkillId Mapping in Level Data: Correct target skills configured', () => {
  // D11 Level SkillId mappings
  assert.equal(D11_LEVELS[0].skillId, 'D11-SKILL-01');
  assert.equal(D11_LEVELS[1].skillId, 'D11-SKILL-02');
  assert.equal(D11_LEVELS[2].skillId, 'D11-SKILL-03');
  assert.equal(D11_LEVELS[3].skillId, 'D11-SKILL-02'); // Resource leveling targets WBS & Scheduling

  // D3 Level SkillId mappings
  assert.equal(D3_LEVELS[0].skillId, 'D3-SKILL-01');
  assert.equal(D3_LEVELS[1].skillId, 'D3-SKILL-02');
  assert.equal(D3_LEVELS[2].skillId, 'D3-SKILL-03');
  assert.equal(D3_LEVELS[3].skillId, 'D3-SKILL-02'); // Slide redesign targets 16:9 & contrast

  // D6 Level SkillId mappings
  assert.equal(D6_LEVELS[0].skillId, 'D6-SKILL-01');
  assert.equal(D6_LEVELS[1].skillId, 'D6-SKILL-02');
  assert.equal(D6_LEVELS[2].skillId, 'D6-SKILL-03');
  assert.equal(D6_LEVELS[3].skillId, 'D6-SKILL-02'); // Stock adjustment targets ledger & reconciliation
});

test('Wave S2a Passing Thresholds: Strict passThreshold set (70 for T1-T2, 80 for T3+)', () => {
  const allS2aLevels = [...D11_LEVELS, ...D3_LEVELS, ...D6_LEVELS];
  for (const lvl of allS2aLevels) {
    if (lvl.tier <= 2) {
      assert.equal(lvl.passThreshold, 70, `Level ${lvl.id} tier ${lvl.tier} must have passThreshold 70`);
    } else {
      assert.equal(lvl.passThreshold, 80, `Level ${lvl.id} tier ${lvl.tier} must have passThreshold 80`);
    }
  }
});

test('Wave S2a D12-SKILL-02 Sources Replacement: Verified UU No. 13/2003 and EYD V present; ITU-T and CIPD absent', () => {
  const d12Skill02 = D12_SKILLS.find((s) => s.id === 'D12-SKILL-02');
  assert.ok(d12Skill02, 'D12-SKILL-02 must exist');
  assert.ok(d12Skill02.sources.length >= 2, 'D12-SKILL-02 must have >=2 sources');

  const sourcesBlob = d12Skill02.sources.join(' ');
  assert.ok(
    sourcesBlob.includes('13 Tahun 2003') || sourcesBlob.includes('Ketenagakerjaan'),
    'D12-SKILL-02 must cite UU Ketenagakerjaan for work hours & rest rights'
  );
  assert.ok(
    sourcesBlob.includes('EYD') || sourcesBlob.includes('Bahasa Indonesia'),
    'D12-SKILL-02 must cite EYD V for workplace communication'
  );
  assert.ok(
    !sourcesBlob.includes('ITU-T') && !sourcesBlob.includes('F.500'),
    'ITU-T F.500 must be removed from D12-SKILL-02'
  );
  assert.ok(
    !sourcesBlob.includes('CIPD'),
    'CIPD must be removed from D12-SKILL-02'
  );
});
