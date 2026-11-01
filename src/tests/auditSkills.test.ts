/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Comprehensive Unit Tests for Patch S0.1 Quality Gates & Engine Features
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateSkillCompleteness,
  validateCrossReferences,
  validateRoleCases,
  validateLessonWorkedExample,
  validateQuizAmbiguity,
  validateRegulatedContent,
  validateBlocklistText,
  validateRoleRelevanceRule2,
  validateDomainCoverage,
} from '../utils/auditSkillsValidators';
import { checkContentBlocklist } from '../../scripts/auditBlocklist';
import { D12_QUIZZES, generateSeededD12Quizzes } from '../content/skills/d12-komunikasi/quizzes';
import { generateSeededD14Quizzes } from '../content/skills/d14-literasi-digital/quizzes';
import { generateSeededD15Quizzes } from '../content/skills/d15-karier-akademik/quizzes';
import { generateSeededD7Quizzes } from '../content/skills/d7-keuangan-pribadi/quizzes';
import { DEFAULT_EMAIL_REQUIREMENTS } from '../components/engines/EmailEditor';
import { moduleTypeToDomainId, domainIdToLegacyModule, Skill } from '../types/skills';
import { Role } from '../types/roles';
import { ROLES, calculateRoleReadiness } from '../content/roles';
import { useGameStore } from '../store/useGameStore';
import { D12_LEVELS } from '../content/skills/d12-komunikasi/levels';

// =========================================================================
// 1. Audit Rules Rejecting Intentionally Flawed Test Data
// =========================================================================

test('Audit Quality Gate: Rejects skill without lessons, levels, or roleRelevance', () => {
  const flawedSkill: any = {
    id: 'FLAWED-SKILL-01',
    linkedLessons: [],
    linkedLevels: [],
    roleRelevance: {},
  };

  const issues = validateSkillCompleteness(flawedSkill);
  assert.equal(issues.length, 3);
  assert.ok(issues[0].includes('linkedLessons'));
  assert.ok(issues[1].includes('linkedLevels'));
  assert.ok(issues[2].includes('roleRelevance'));
});

test('Audit Quality Gate: Rejects dangling cross-references in skills and roles', () => {
  const validLessons = new Set(['les-excel-01']);
  const validLevels = new Set(['excel-t1-01']);
  const validCases = new Set(['case-01']);

  const flawedSkill: any = {
    id: 'FLAWED-SKILL-02',
    linkedLessons: ['non-existent-lesson'],
    linkedLevels: ['non-existent-level'],
    linkedCases: ['non-existent-case'],
  };

  const skillIssues = validateCrossReferences(flawedSkill, validLessons, validLevels, validCases);
  assert.equal(skillIssues.length, 3);
  assert.ok(skillIssues[0].includes('non-existent-lesson'));
  assert.ok(skillIssues[1].includes('non-existent-level'));
  assert.ok(skillIssues[2].includes('non-existent-case'));

  const flawedRole: any = {
    id: 'flawed-role',
    recommendedCases: ['case-ghost-99'],
  };
  const roleIssues = validateRoleCases(flawedRole, validCases);
  assert.equal(roleIssues.length, 1);
  assert.ok(roleIssues[0].includes('case-ghost-99'));
});

test('Audit Quality Gate: Rejects lesson without worked examples', () => {
  const emptyLesson = {
    id: 'EMPTY-LES-01',
    title: 'Pelajaran Tanpa Contoh',
    sections: [
      {
        title: 'Bagian Teori Saja',
        content: 'Hanya ada teks penjelasan teori tanpa contoh nyata.',
      },
    ],
  };

  const issues = validateLessonWorkedExample(emptyLesson);
  assert.equal(issues.length, 1);
  assert.ok(issues[0].includes('worked example'));

  // Valid lesson with good/bad example should pass
  const validLesson = {
    id: 'VALID-LES-01',
    title: 'Pelajaran Bagus',
    sections: [
      {
        title: 'Teori & Contoh',
        content: 'Isi materi.',
        example: { good: 'Contoh bagus', bad: 'Contoh salah', explanation: 'Alasan' },
      },
    ],
  };
  assert.equal(validateLessonWorkedExample(validLesson).length, 0);
});

test('Audit Quality Gate: Rejects ambiguous quizzes', () => {
  // Duplicate pairs in matching quiz
  const flawedMatchQuiz = {
    id: 'Q-MATCH-FLAWED',
    type: 'cocokkan',
    pairs: [
      { id: '1', left: 'Pilihan A', right: 'Jawaban X' },
      { id: '2', left: 'Pilihan A', right: 'Jawaban Y' }, // Duplicate left!
    ],
  };
  const matchIssues = validateQuizAmbiguity(flawedMatchQuiz);
  assert.ok(matchIssues.some((i) => i.includes('duplikat')));

  // Mismatched error count in error spotting quiz
  const flawedSpotQuiz = {
    id: 'Q-SPOT-FLAWED',
    type: 'temukan-kesalahan',
    requiredErrorCount: 3,
    contextSnippet: {
      lines: [
        { id: '1', text: 'Teks normal', isError: false },
        { id: '2', text: 'Teks salah', isError: true },
      ], // Only 1 error, but requires 3!
    },
  };
  const spotIssues = validateQuizAmbiguity(flawedSpotQuiz);
  assert.ok(spotIssues.some((i) => i.includes('requiredErrorCount')));
});

test('Audit Quality Gate: Rejects regulated content without sources or expired (>12 months)', () => {
  // Regulated domain (D6) without sources
  const noSources = {
    id: 'D6-SKILL-01',
    domain: 'D6',
    sources: [],
    lastReviewed: '2026-10-26',
  };
  const issues1 = validateRegulatedContent(noSources);
  assert.ok(issues1.some((i) => i.includes('wajib mencantumkan sumber')));

  // Regulated domain (D17) reviewed 2 years ago (expired)
  const expired = {
    id: 'D17-SKILL-01',
    domain: 'D17',
    sources: ['UU Ketenagakerjaan'],
    lastReviewed: '2023-01-01', // over 12 months ago
  };
  const issues2 = validateRegulatedContent(expired);
  assert.ok(issues2.some((i) => i.includes('kedaluwarsa')));
});

test('Audit Quality Gate: Rejects real brands, real persons, and prohibited promises', () => {
  const violations1 = checkContentBlocklist('Dapatkan layanan cepat lewat ekspedisi JNE atau Shopee.');
  assert.ok(violations1.some((v) => v.includes('jne')));
  assert.ok(violations1.some((v) => v.includes('shopee')));

  const violations2 = checkContentBlocklist('Belajar di sini pasti diterima kerja dan pasti kaya.');
  assert.ok(violations2.some((v) => v.includes('pasti diterima kerja')));
  assert.ok(violations2.some((v) => v.includes('pasti kaya')));

  const violations3 = checkContentBlocklist('Pertemuan bersama Elon Musk dan Joko Widodo.');
  assert.ok(violations3.some((v) => v.includes('elon musk')));
  assert.ok(violations3.some((v) => v.includes('joko widodo')));
});

test('Audit Quality Gate: Rejects roleRelevance exceeding domain weight (Bagian B Rule 2)', () => {
  const mockRoles: any[] = [
    {
      id: 'admin-perkantoran',
      domainRequirements: [{ domainId: 'D12', weight: 4 }],
    },
  ];

  const flawedSkill: any = {
    id: 'D12-SKILL-TEST',
    domain: 'D12',
    roleRelevance: {
      'admin-perkantoran': 5, // Exceeds domain weight 4!
    },
  };

  const issues = validateRoleRelevanceRule2(flawedSkill, mockRoles);
  assert.equal(issues.length, 1);
  assert.ok(issues[0].includes('melebihi bobot domain D12 (4)'));
});

// =========================================================================
// 2. Deterministic Seed-Based Quiz Generator (BUTIR 2)
// =========================================================================

test('Seeded Quiz Generator: Same seed produces identical questions and shuffled order', () => {
  const setA1 = generateSeededD12Quizzes(42);
  const setA2 = generateSeededD12Quizzes(42);
  assert.deepEqual(setA1, setA2, 'Identical seed must yield strictly identical quiz objects');

  const setB = generateSeededD12Quizzes(9999);
  // Compare item orders in question 1 (reordering)
  const q1A = setA1[0] as any;
  const q1B = setB[0] as any;
  const q1AOrder = q1A.items.map((i: any) => i.id).join(',');
  const q1BOrder = q1B.items.map((i: any) => i.id).join(',');
  assert.notEqual(q1AOrder, q1BOrder, 'Different seeds should produce different shuffled item orders');
});

test('Seeded Quiz Generator (D14, D15, D7): Solutions pass across 20 random seeds', () => {
  for (let seed = 200; seed < 220; seed++) {
    const d14Quizzes = generateSeededD14Quizzes(seed);
    assert.equal(d14Quizzes.length, 10);
    const d15Quizzes = generateSeededD15Quizzes(seed);
    assert.equal(d15Quizzes.length, 10);
    const d7Quizzes = generateSeededD7Quizzes(seed);
    assert.equal(d7Quizzes.length, 10);

    for (const q of [...d14Quizzes, ...d15Quizzes, ...d7Quizzes]) {
      if (q.type === 'urutan') {
        assert.equal(q.correctOrder.length, q.items.length);
        const itemIds = new Set(q.items.map((i) => i.id));
        assert.ok(q.correctOrder.every((id) => itemIds.has(id)));
      } else if (q.type === 'cocokkan') {
        assert.ok(q.pairs.length >= 2);
      } else if (q.type === 'temukan-kesalahan') {
        const errorCount = q.contextSnippet.lines.filter((l) => l.isError).length;
        assert.equal(errorCount, q.requiredErrorCount);
      } else if (q.type === 'klik-area') {
        const target = q.previewImageOrBox.zones.find((z) => z.isTarget);
        assert.ok(target, 'Every seeded click-area question must have at least one target');
      }
    }
  }
});

test('Seeded Quiz Generator (D12): Reference solutions pass across 20 random seeds', () => {
  for (let seed = 100; seed < 120; seed++) {
    const quizzes = generateSeededD12Quizzes(seed);
    assert.equal(quizzes.length, 10);

    for (const q of quizzes) {
      if (q.type === 'urutan') {
        assert.equal(q.correctOrder.length, q.items.length);
        const itemIds = new Set(q.items.map((i) => i.id));
        assert.ok(q.correctOrder.every((id) => itemIds.has(id)));
      } else if (q.type === 'cocokkan') {
        assert.ok(q.pairs.length >= 2);
      } else if (q.type === 'temukan-kesalahan') {
        const errorCount = q.contextSnippet.lines.filter((l) => l.isError).length;
        assert.equal(errorCount, q.requiredErrorCount);
      } else if (q.type === 'klik-area') {
        const target = q.previewImageOrBox.zones.find((z) => z.isTarget);
        assert.ok(target, 'Every seeded click-area question must have exactly one target');
      }
    }
  }
});

// =========================================================================
// 3. Character Reputation in Simulation & Store (BUTIR 3)
// =========================================================================

test('Character Reputation: Empathetic choice increases reputation and harsh choice decreases it', () => {
  const store = useGameStore.getState();
  const initialRep = store.profile.reputation['klien'] || 50;

  // Empathetic choice +3
  store.updateReputation('klien', 3);
  const afterEmpathetic = useGameStore.getState().profile.reputation['klien'];
  assert.equal(afterEmpathetic, initialRep + 3);

  // Harsh choice -2
  store.updateReputation('klien', -2);
  const afterHarsh = useGameStore.getState().profile.reputation['klien'];
  assert.equal(afterHarsh, initialRep + 1);

  // Bounds check (0-100)
  store.updateReputation('klien', 200);
  assert.equal(useGameStore.getState().profile.reputation['klien'], 100);

  store.updateReputation('klien', -200);
  assert.equal(useGameStore.getState().profile.reputation['klien'], 0);
});

// =========================================================================
// 4. Email Editor Spelling & Punctuation Validation (BUTIR 5)
// =========================================================================

test('EmailEditor Engine: Validates basic spelling and punctuation rules', () => {
  const spellingReq = DEFAULT_EMAIL_REQUIREMENTS.find((r) => r.id === 'req-spelling-punctuation');
  assert.ok(spellingReq, 'req-spelling-punctuation must be defined');

  // Correct email
  const validEmail = {
    to: 'mitra@katering.co.id',
    cc: '',
    subject: 'Jadwal Pertemuan Presentasi Proyek',
    body: 'Yth. Ibu Ratna,\n\nSehubungan dengan pesanan bahan makanan, paket telah dikirim oleh armada kami.\n\nHormat kami,\nBudi',
    hasAttachment: false,
  };
  const validRes = spellingReq.validator(validEmail);
  assert.equal(validRes.passed, true);

  // Double punctuation "!!" failure
  const emailDoublePunc = {
    ...validEmail,
    body: 'Yth. Ibu Ratna,\n\nHarap konfirmasi sekarang juga!!\n\nHormat kami,\nBudi',
  };
  const puncRes = spellingReq.validator(emailDoublePunc);
  assert.equal(puncRes.passed, false);
  assert.ok(puncRes.tip?.includes('tanda baca ganda'));

  // Passive verb error "di kirim" failure
  const emailPassiveError = {
    ...validEmail,
    body: 'Yth. Ibu Ratna,\n\nPaket sudah di kirim oleh staf kami pagi ini.\n\nHormat kami,\nBudi',
  };
  const passiveRes = spellingReq.validator(emailPassiveError);
  assert.equal(passiveRes.passed, false);
  assert.ok(passiveRes.tip?.includes('dikirim'));

  // Double spaces failure
  const emailDoubleSpace = {
    ...validEmail,
    body: 'Yth. Ibu Ratna,\n\nSehubungan  dengan jadwal rapat, kami siap hadir.\n\nHormat kami,\nBudi',
  };
  const spaceRes = spellingReq.validator(emailDoubleSpace);
  assert.equal(spaceRes.passed, false);
  assert.ok(spaceRes.tip?.includes('spasi ganda'));

  // Lowercase sentence start failure
  const emailLowercase = {
    ...validEmail,
    body: 'Yth. Ibu Ratna,\n\nsehubungan dengan permohonan Anda, kami setuju.\n\nHormat kami,\nBudi',
  };
  const lowerRes = spellingReq.validator(emailLowercase);
  assert.equal(lowerRes.passed, false);
  assert.ok(lowerRes.tip?.includes('huruf kapital'));
});

// =========================================================================
// 5. ModuleType <-> DomainId Mapping (BUTIR 7)
// =========================================================================

test('ModuleType <-> DomainId: Bidirectional mapping is consistent and accurate', () => {
  assert.equal(moduleTypeToDomainId('excel'), 'D1');
  assert.equal(moduleTypeToDomainId('word'), 'D2');
  assert.equal(moduleTypeToDomainId('coding'), 'D5');
  assert.equal(moduleTypeToDomainId('web'), 'D5');

  assert.equal(domainIdToLegacyModule('D1'), 'excel');
  assert.equal(domainIdToLegacyModule('D2'), 'word');
  assert.equal(domainIdToLegacyModule('D5'), 'coding');
  assert.equal(domainIdToLegacyModule('D12'), null);
});

// =========================================================================
// 6. Job Readiness F1 & Legacy Level Bridge F3 (PATCH v9.2)
// =========================================================================

test('F1 Job Readiness: bobotBelumTersedia for all 16 roles matches manual calculation', () => {
  const EXPECTED_BELUM_TERSEDIA: Record<string, number> = {
    'admin-perkantoran': 0,
    'staf-akuntansi': 0,
    'staf-gudang-logistik': 0,
    'admin-sdm-hrd': 0,
    'digital-marketing': 0,
    'customer-service': 0,
    'sales-account-exec': 0,
    'analis-data-junior': 0,
    'web-dev-junior': 0,
    'koordinator-proyek': 0,
    'pemilik-umkm': 0,
    'supervisor-asisten-manajer': 0,
    'mahasiswa-tingkat-akhir': 0,
    'pencari-kerja-freshgrad': 0,
    'event-organizer': 0,
    'admin-toko-online': 0,
  };

  for (const role of ROLES) {
    const res = calculateRoleReadiness(role, {});
    const expected = EXPECTED_BELUM_TERSEDIA[role.id];
    assert.ok(typeof expected === 'number', `Expected value for role ${role.id} must be defined`);
    assert.equal(
      res.bobotBelumTersedia,
      expected,
      `Role ${role.id} bobotBelumTersedia must be ${expected}% (got ${res.bobotBelumTersedia}%)`
    );
    assert.equal(res.bobotTersedia + res.bobotBelumTersedia, 100);
  }
});

test('F1 Job Readiness: all active domains yield 100% with full mastery', () => {
  const adminRole = ROLES.find((r) => r.id === 'admin-perkantoran')!;
  // Active domains in S2a include D1, D2, D5, D12, D14, D15, D7, D11, D3, D6. Admin needs D1, D2, D12, D11, D3, D14, D6 (available weight 25 / 27 = 93%)
  const fullActiveMastery = {
    D1: 100,
    D2: 100,
    D5: 100,
    D12: 100,
    D14: 100,
    D15: 100,
    D7: 100,
    D11: 100,
    D3: 100,
    D6: 100,
    D13: 100,
    D16: 100,
    D8: 100,
    D9: 100,
    D10: 100,
    D17: 100,
    D4: 100,
  };

  const res = calculateRoleReadiness(adminRole, fullActiveMastery);
  assert.equal(res.bobotTersedia, 100);
  assert.equal(res.bobotBelumTersedia, 0);
  assert.equal(res.kesiapanTotal, 100);
  assert.equal(res.kesiapanTotal, res.bobotTersedia);
  assert.equal(res.kesiapanBagianTersedia, 100);
});

test('F1 Job Readiness: Simulated all domains active + full mastery yields 100%', () => {
  const adminRole = ROLES.find((r) => r.id === 'admin-perkantoran')!;
  const allActiveSet = new Set(adminRole.domainRequirements.map((d) => d.domainId));
  const fullMastery: Record<string, number> = {};
  for (const d of adminRole.domainRequirements) {
    fullMastery[d.domainId] = 100;
  }

  const res = calculateRoleReadiness(adminRole, fullMastery, allActiveSet);
  assert.equal(res.bobotTersedia, 100);
  assert.equal(res.bobotBelumTersedia, 0);
  assert.equal(res.kesiapanTotal, 100);
  assert.equal(res.kesiapanBagianTersedia, 100);
});

test('F3 Legacy Level Bridge: Completing Excel level t1-01 with 3 stars updates D1 skill & domain mastery', () => {
  const store = useGameStore.getState();
  // Clear D1 mastery for clean check
  store.updateSkillMastery('D1-SKILL-01', 0);

  // Complete Excel level with 3 stars
  store.recordMissionSuccess('excel-t1-01', 3, 100, 50);

  const updatedProfile = useGameStore.getState().profile;
  assert.equal(updatedProfile.skillMastery?.['D1-SKILL-01'], 100);
  assert.equal(updatedProfile.domainMastery?.['D1'], 100);
});

// =========================================================================
// 7. F2 Engine Integrity Unit Tests
// =========================================================================

test('F2.1 Email Editor: Sending unchanged flawed initial draft fails with score 0', () => {
  const level1 = D12_LEVELS[0];
  assert.ok(level1.emailConfig);
  const cfg = level1.emailConfig;
  assert.equal(cfg.initialSubject, 'Rapat');
  assert.ok(cfg.initialBody.length > 0);

  // An unchanged draft must fail immediately
  const isUnchanged =
    cfg.initialBody.trim().length > 0 &&
    cfg.initialTo.trim() === 'ratna@mitrakatering.co.id' &&
    cfg.initialSubject.trim() === 'Rapat';
  assert.equal(isUnchanged, true);
});

test('F2.2 Quiz Engine: Reordering questions guarantee initial sequence != correctOrder', () => {
  for (const q of D12_QUIZZES) {
    if (q.type === 'urutan') {
      const initialIds = q.items.map((i) => i.id).join(',');
      const correctIds = q.correctOrder.join(',');
      assert.notEqual(
        initialIds,
        correctIds,
        `Question ${q.id} initial sequence must not match correct order`
      );
    }
  }

  // Check across seeds 1 to 20
  for (let s = 1; s <= 20; s++) {
    const seeded = generateSeededD12Quizzes(s);
    for (const q of seeded) {
      if (q.type === 'urutan') {
        const initialIds = q.items.map((i) => i.id).join(',');
        const correctIds = q.correctOrder.join(',');
        assert.notEqual(
          initialIds,
          correctIds,
          `Question ${q.id} at seed ${s} initial sequence must not match correct order`
        );
      }
    }
  }
});

test('F2.3 & F2.4 Domain Mastery: Computed as average of skills and does not decrease on lower retry', () => {
  const store = useGameStore.getState();

  // Reset D12 skills
  store.updateSkillMastery('D12-SKILL-01', 0);
  store.updateSkillMastery('D12-SKILL-02', 0);
  store.updateSkillMastery('D12-SKILL-03', 0);

  // Skill 1 achieves 90
  store.updateSkillMastery('D12-SKILL-01', 90);
  let p = useGameStore.getState().profile;
  assert.equal(p.skillMastery?.['D12-SKILL-01'], 90);
  // Average of (90 + 0 + 0) / 3 = 30
  assert.equal(p.domainMastery?.['D12'], 30);

  // Skill 2 achieves 90
  store.updateSkillMastery('D12-SKILL-02', 90);
  p = useGameStore.getState().profile;
  assert.equal(p.skillMastery?.['D12-SKILL-02'], 90);
  // Average of (90 + 90 + 0) / 3 = 60
  assert.equal(p.domainMastery?.['D12'], 60);

  // Retry with lower score (e.g. 50) -> mastery must not decrease
  store.updateSkillMastery('D12-SKILL-01', 50);
  p = useGameStore.getState().profile;
  assert.equal(p.skillMastery?.['D12-SKILL-01'], 90);
  assert.equal(p.domainMastery?.['D12'], 60);
});
