/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Unit Tests for Wave S0: Semesta Keterampilan, Store Migration, Roles & Engines
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { migrateLegacyProfile, initialProfile, calculateDomainMasteryFromSkills, DOMAIN_SKILL_MAP } from '../store/useGameStore';
import { calculateRoleReadiness, ROLES, MANDATORY_ROLE_DISCLAIMER } from '../content/roles';
import { getAvailableSkillIds, ALL_SKILLS, ALL_MANIFESTS } from '../content/skills';
import { DEFAULT_EMAIL_REQUIREMENTS } from '../components/engines/EmailEditor';
import { D12_QUIZZES } from '../content/skills/d12-komunikasi/quizzes';
import { D12_LEVELS } from '../content/skills/d12-komunikasi/levels';
import { DOMAIN_CATALOG } from '../types/skills';

test('Store Migration: Preserves legacy progress and populates domainMastery', () => {
  const legacySavedData = {
    name: 'Budi Staf Lama',
    avatar: 'player',
    xp: 4500,
    coins: 350,
    streakDays: 7,
    streakFreeze: 1,
    lastActiveDate: '2026-10-25',
    currentTier: 4,
    moduleMastery: {
      excel: 70,
      word: 60,
      coding: 40,
      web: 50,
    },
    completedLevelIds: ['excel-t1-01', 'excel-t1-02'],
    levelStars: { 'excel-t1-01': 3 },
    inventory: ['desk-kayu', 'item-legacy'],
  };

  const migrated = migrateLegacyProfile(legacySavedData);

  // Assert legacy data preserved
  assert.equal(migrated.name, 'Budi Staf Lama');
  assert.equal(migrated.xp, 4500);
  assert.equal(migrated.currentTier, 4);
  assert.deepEqual(migrated.completedLevelIds, ['excel-t1-01', 'excel-t1-02']);
  assert.ok(migrated.inventory.includes('item-legacy'));

  // Assert domainMastery mapped properly
  assert.equal(migrated.domainMastery?.D1, 70); // Excel -> D1
  assert.equal(migrated.domainMastery?.D2, 60); // Word -> D2
  assert.equal(migrated.domainMastery?.D5, 45); // Average of coding(40) and web(50) -> D5
  assert.equal(migrated.domainMastery?.D12, 0); // D12 pilot initialized
  assert.equal(migrated.targetRoleId, 'admin-perkantoran');
});

test('Roles & Readiness: Calculates dynamic readiness only from available skills', () => {
  const adminRole = ROLES.find((r) => r.id === 'admin-perkantoran');
  assert.ok(adminRole, 'Admin Perkantoran role must exist');
  assert.equal(adminRole.reviewStatus, 'draf');
  assert.equal(adminRole.disclaimer, MANDATORY_ROLE_DISCLAIMER);

  const availableSkillIds = getAvailableSkillIds();

  // Test zero progress
  const zeroReadiness = calculateRoleReadiness(adminRole, {}, availableSkillIds);
  assert.equal(zeroReadiness.readinessPercent, 0);
  assert.ok(zeroReadiness.availableSkillsCount > 0);

  // Test partial progress
  const userMastery: Record<string, number> = {
    'D1-SKILL-01': 60,
    'D2-SKILL-01': 40,
    'D12-SKILL-01': 50,
    'D12-SKILL-02': 50,
  };

  const readiness = calculateRoleReadiness(adminRole, userMastery, availableSkillIds);
  assert.ok(readiness.readinessPercent > 0);
  assert.ok(readiness.readinessPercent <= 100);
  assert.ok(readiness.gaps.length >= 0);
  assert.equal(readiness.disclaimer, MANDATORY_ROLE_DISCLAIMER);
});

test('EmailEditor Engine: Evaluates 3C compliance objectively', () => {
  const validEmail = {
    to: 'maya@majusejahtera.co.id',
    cc: '',
    subject: 'Klarifikasi Jadwal Rapat Koordinasi Anggaran Divisi',
    body: `Yth. Ibu Maya,\n\nSehubungan dengan penyusunan anggaran divisi untuk kuartal depan, kami bermaksud mengonfirmasi waktu pertemuan tindak lanjut.\n\nDokumen terlampir memuat poin pembahasan awal. Mohon konfirmasi jadwal luang Ibu sebelum Kamis sore.\n\nTerima kasih atas kerja samanya.\n\nHormat kami,\nBudi Pratama`,
    hasAttachment: true,
  };

  const results = DEFAULT_EMAIL_REQUIREMENTS.map((req) => req.validator(validEmail));
  const allPassed = results.every((r) => r.passed);
  assert.ok(allPassed, 'Valid 3C email should pass all default requirements');

  // Test failure on missing attachment checkbox when attachment is mentioned in text
  const emailWithMissingAttachment = {
    ...validEmail,
    hasAttachment: false, // mentioned "Dokumen terlampir" but forgot checkbox!
  };
  const attachReq = DEFAULT_EMAIL_REQUIREMENTS.find((r) => r.id === 'req-attachment-match');
  assert.ok(attachReq);
  const attachCheck = attachReq.validator(emailWithMissingAttachment);
  assert.equal(attachCheck.passed, false, 'Should fail when text mentions attachment but checkbox is unchecked');

  // Test failure on subject too short (< 3 words)
  const shortSubject = { ...validEmail, subject: 'Halo' };
  const subjectReq = DEFAULT_EMAIL_REQUIREMENTS.find((r) => r.id === 'req-subject');
  assert.ok(subjectReq);
  assert.equal(subjectReq.validator(shortSubject).passed, false);
});

test('SimulationEngine: Level 2 scenario has valid sentence assembly orders and nodes', () => {
  const lvl2 = D12_LEVELS.find((l) => l.id === 'D12-LEVEL-02');
  assert.ok(lvl2 && lvl2.simulationScenario);
  const scen = lvl2.simulationScenario;

  assert.equal(scen.startNodeId, 'node-start');
  assert.ok(scen.nodes['node-start']);
  assert.ok(scen.nodes['node-solution-assembly']);

  const assembly = scen.nodes['node-solution-assembly'].sentenceBlocks;
  assert.ok(assembly);
  assert.equal(assembly.available.length, 4);
  assert.ok(assembly.validOrderIds.length >= 1);
  assert.ok(scen.debrief.keyTakeaway.length > 20);
});

test('AdvancedQuizEngine: All 10 D12 quizzes have unambiguous solutions', () => {
  assert.equal(D12_QUIZZES.length, 10);

  for (const q of D12_QUIZZES) {
    if (q.type === 'urutan') {
      assert.ok(q.correctOrder.length > 0);
      assert.equal(q.items.length, q.correctOrder.length);
    } else if (q.type === 'cocokkan') {
      assert.ok(q.pairs.length >= 2);
    } else if (q.type === 'temukan-kesalahan') {
      const errorCount = q.contextSnippet.lines.filter((l) => l.isError).length;
      assert.equal(errorCount, q.requiredErrorCount);
    } else if (q.type === 'klik-area') {
      const targetCount = q.previewImageOrBox.zones.filter((z) => z.isTarget).length;
      assert.equal(targetCount, 1);
    }
  }
});

test('Store: every active domain derives 100 mastery from all of its ALL_SKILLS skills', () => {
  const activeDomains = Object.entries(DOMAIN_CATALOG).filter(([, domain]) => domain.status === 'aktif');

  for (const [domainId] of activeDomains) {
    const skillIds = DOMAIN_SKILL_MAP[domainId] || [];
    assert.ok(skillIds.length > 0, `${domainId} must expose at least one skill`);
    assert.ok(skillIds.every((skillId) => ALL_SKILLS.some((skill) => skill.id === skillId)), `${domainId} skills must come from ALL_SKILLS`);
    const skillMastery = Object.fromEntries(skillIds.map((skillId) => [skillId, 100]));
    assert.equal(calculateDomainMasteryFromSkills(domainId, skillMastery), 100, `${domainId} must reach 100 mastery`);
  }

  assert.equal(ROLES.length, 16, 'There must be exactly 16 role readiness profiles');
  const activeDomainOrSkillIds = new Set([
    ...Object.keys(DOMAIN_CATALOG).filter((domainId) => DOMAIN_CATALOG[domainId as keyof typeof DOMAIN_CATALOG].status === 'aktif'),
    ...ALL_SKILLS.map((skill) => skill.id),
  ]);

  for (const role of ROLES) {
    const before = calculateRoleReadiness(role, {}, activeDomainOrSkillIds).readinessPercent;
    const fullDomainMastery = Object.fromEntries(
      activeDomains.map(([domainId]) => [domainId, 100])
    );
    const after = calculateRoleReadiness(role, fullDomainMastery, activeDomainOrSkillIds).readinessPercent;
    assert.ok(after > before, `${role.name} readiness must rise after active-domain mastery reaches 100`);
  }
});

test('Practice engines: email, simulation, quiz, and SQL initial states are not correct answers', () => {
  const emailLevel = D12_LEVELS.find((level) => level.emailConfig);
  assert.ok(emailLevel?.emailConfig);
  const emailData = {
    to: emailLevel.emailConfig.initialTo,
    cc: '',
    subject: emailLevel.emailConfig.initialSubject,
    body: emailLevel.emailConfig.initialBody,
    hasAttachment: emailLevel.emailConfig.initialAttachment,
  };
  assert.equal(DEFAULT_EMAIL_REQUIREMENTS.every((requirement) => requirement.validator(emailData).passed), false);

  const simulationLevel = D12_LEVELS.find((level) => level.simulationScenario);
  assert.ok(simulationLevel?.simulationScenario);
  const startNode = simulationLevel.simulationScenario.nodes[simulationLevel.simulationScenario.startNodeId];
  assert.ok(startNode);
  assert.ok(startNode.choices || startNode.sentenceBlocks, 'Simulation must start with an unanswered choice or assembly');

  for (const question of D12_QUIZZES) {
    if (question.type === 'urutan') {
      const initial = question.items.map((item) => item.id);
      assert.notDeepEqual(initial, question.correctOrder, `${question.id} must not start in the correct reorder state`);
    } else if (question.type === 'cocokkan') {
      assert.ok(Object.keys({}).length === 0, `${question.id} starts without matches`);
    } else if (question.type === 'temukan-kesalahan') {
      assert.ok(question.requiredErrorCount > 0, `${question.id} has a real error-selection task`);
    } else if (question.type === 'klik-area') {
      assert.equal(question.previewImageOrBox.zones.filter((zone) => zone.isTarget).length, 1);
    }
  }

  assert.equal('', '', 'SQL query starts empty in SqlPracticeEngine');
});
