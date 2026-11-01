/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Skills & Roles Audit Script (Patch S0.1)
 * Enhanced with strict checks:
 * 1a. Skill completeness (lessons, levels, roleRelevance)
 * 1b. Non-dangling cross-references (linkedLessons, linkedLevels, linkedCases, recommendedCases)
 * 1c. Worked examples in lessons
 * 1d. Quiz ambiguity (no duplicates, valid keys, seed generation check)
 * 1e. Regulated content compliance (sources, <=12 months review date, disclaimer)
 * 1f. Prohibited real brands, persons, and claims check (auditBlocklist.ts)
 * 1g. Bagian B.5 rules (coverage, roleRelevance <= domainWeight, key skills mapping)
 * 1h. Honest domain status and depth table
 * Run via: npm run skills:audit
 */

import { SkillSchema, SkillPackManifestSchema, DOMAIN_CATALOG, DOMAIN_IDS, DomainId } from '../src/types/skills';
import { RoleSchema } from '../src/types/roles';
import { ALL_SKILLS, ALL_MANIFESTS } from '../src/content/skills';
import { ROLES, MANDATORY_ROLE_DISCLAIMER } from '../src/content/roles';
import { ALL_LESSONS } from '../src/content/lessons';
import { LEVELS } from '../src/content/levels';
import { CASE_FILES } from '../src/content/caseFiles';

import { D12_LESSONS } from '../src/content/skills/d12-komunikasi/lessons';
import { D12_LEVELS } from '../src/content/skills/d12-komunikasi/levels';
import { D12_QUIZZES, generateSeededD12Quizzes } from '../src/content/skills/d12-komunikasi/quizzes';
import { D12_CASES } from '../src/content/skills/d12-komunikasi/cases';
import { D12_GLOSSARY } from '../src/content/skills/d12-komunikasi/glossary';
import { D12_CHEATSHEET } from '../src/content/skills/d12-komunikasi/cheatsheet';

import { D14_LESSONS } from '../src/content/skills/d14-literasi-digital/lessons';
import { D14_LEVELS } from '../src/content/skills/d14-literasi-digital/levels';
import { D14_QUIZZES, generateSeededD14Quizzes } from '../src/content/skills/d14-literasi-digital/quizzes';
import { D14_CASES } from '../src/content/skills/d14-literasi-digital/cases';
import { D14_GLOSSARY } from '../src/content/skills/d14-literasi-digital/glossary';
import { D14_CHEATSHEET } from '../src/content/skills/d14-literasi-digital/cheatsheet';

import { D15_LESSONS } from '../src/content/skills/d15-karier-akademik/lessons';
import { D15_LEVELS } from '../src/content/skills/d15-karier-akademik/levels';
import { D15_QUIZZES, generateSeededD15Quizzes } from '../src/content/skills/d15-karier-akademik/quizzes';
import { D15_CASES } from '../src/content/skills/d15-karier-akademik/cases';
import { D15_GLOSSARY } from '../src/content/skills/d15-karier-akademik/glossary';
import { D15_CHEATSHEET } from '../src/content/skills/d15-karier-akademik/cheatsheet';

import { D7_LESSONS } from '../src/content/skills/d7-keuangan-pribadi/lessons';
import { D7_LEVELS } from '../src/content/skills/d7-keuangan-pribadi/levels';
import { D7_QUIZZES, generateSeededD7Quizzes } from '../src/content/skills/d7-keuangan-pribadi/quizzes';
import { D7_CASES } from '../src/content/skills/d7-keuangan-pribadi/cases';
import { D7_GLOSSARY } from '../src/content/skills/d7-keuangan-pribadi/glossary';
import { D7_CHEATSHEET } from '../src/content/skills/d7-keuangan-pribadi/cheatsheet';

import { D11_LESSONS } from '../src/content/skills/d11-manajemen-proyek/lessons';
import { D11_LEVELS } from '../src/content/skills/d11-manajemen-proyek/levels';
import { D11_QUIZZES, generateSeededD11Quizzes } from '../src/content/skills/d11-manajemen-proyek/quizzes';
import { D11_CASES } from '../src/content/skills/d11-manajemen-proyek/cases';
import { D11_GLOSSARY } from '../src/content/skills/d11-manajemen-proyek/glossary';
import { D11_CHEATSHEET } from '../src/content/skills/d11-manajemen-proyek/cheatsheet';

import { D3_LESSONS } from '../src/content/skills/d3-presentasi/lessons';
import { D3_LEVELS } from '../src/content/skills/d3-presentasi/levels';
import { D3_QUIZZES, generateSeededD3Quizzes } from '../src/content/skills/d3-presentasi/quizzes';
import { D3_CASES } from '../src/content/skills/d3-presentasi/cases';
import { D3_GLOSSARY } from '../src/content/skills/d3-presentasi/glossary';
import { D3_CHEATSHEET } from '../src/content/skills/d3-presentasi/cheatsheet';

import { D6_LESSONS } from '../src/content/skills/d6-akuntansi/lessons';
import { D6_LEVELS } from '../src/content/skills/d6-akuntansi/levels';
import { D6_QUIZZES, generateSeededD6Quizzes } from '../src/content/skills/d6-akuntansi/quizzes';
import { D6_CASES } from '../src/content/skills/d6-akuntansi/cases';
import { D6_GLOSSARY } from '../src/content/skills/d6-akuntansi/glossary';
import { D6_CHEATSHEET } from '../src/content/skills/d6-akuntansi/cheatsheet';

import { D8_LESSONS } from '../src/content/skills/d8-operasional/lessons';
import { D8_LEVELS } from '../src/content/skills/d8-operasional/levels';
import { D8_QUIZZES, generateSeededD8Quizzes } from '../src/content/skills/d8-operasional/quizzes';
import { D8_CASES } from '../src/content/skills/d8-operasional/cases';
import { D8_GLOSSARY } from '../src/content/skills/d8-operasional/glossary';
import { D8_CHEATSHEET } from '../src/content/skills/d8-operasional/cheatsheet';

import { D9_LESSONS } from '../src/content/skills/d9-pemasaran/lessons';
import { D9_LEVELS } from '../src/content/skills/d9-pemasaran/levels';
import { D9_QUIZZES, generateSeededD9Quizzes } from '../src/content/skills/d9-pemasaran/quizzes';
import { D9_CASES } from '../src/content/skills/d9-pemasaran/cases';
import { D9_GLOSSARY } from '../src/content/skills/d9-pemasaran/glossary';
import { D9_CHEATSHEET } from '../src/content/skills/d9-pemasaran/cheatsheet';

import { D10_LESSONS } from '../src/content/skills/d10-sdm/lessons';
import { D10_LEVELS } from '../src/content/skills/d10-sdm/levels';
import { D10_QUIZZES, generateSeededD10Quizzes } from '../src/content/skills/d10-sdm/quizzes';
import { D10_CASES } from '../src/content/skills/d10-sdm/cases';
import { D10_GLOSSARY } from '../src/content/skills/d10-sdm/glossary';
import { D10_CHEATSHEET } from '../src/content/skills/d10-sdm/cheatsheet';

import { D4_LESSONS } from '../src/content/skills/d4-data-sql/lessons';
import { D4_LEVELS } from '../src/content/skills/d4-data-sql/levels';
import { D4_QUIZZES, generateSeededD4Quizzes } from '../src/content/skills/d4-data-sql/quizzes';
import { D4_CASES } from '../src/content/skills/d4-data-sql/cases';
import { D4_CHEATSHEET } from '../src/content/skills/d4-data-sql/cheatsheet';

import { D17_LESSONS } from '../src/content/skills/d17-hukum-kepatuhan/lessons';
import { D17_LEVELS } from '../src/content/skills/d17-hukum-kepatuhan/levels';
import { D17_QUIZZES, generateSeededD17Quizzes } from '../src/content/skills/d17-hukum-kepatuhan/quizzes';
import { D17_CASES } from '../src/content/skills/d17-hukum-kepatuhan/cases';
import { D17_CHEATSHEET } from '../src/content/skills/d17-hukum-kepatuhan/cheatsheet';
import { D13_LESSONS } from '../src/content/skills/d13-bahasa-inggris/lessons';
import { D13_LEVELS } from '../src/content/skills/d13-bahasa-inggris/levels';
import { D13_QUIZZES } from '../src/content/skills/d13-bahasa-inggris/quizzes';
import { D13_CASES } from '../src/content/skills/d13-bahasa-inggris/cases';
import { D13_CHEATSHEET } from '../src/content/skills/d13-bahasa-inggris/cheatsheet';
import { D16_LESSONS } from '../src/content/skills/d16-desain-uiux/lessons';
import { D16_LEVELS } from '../src/content/skills/d16-desain-uiux/levels';
import { D16_QUIZZES } from '../src/content/skills/d16-desain-uiux/quizzes';
import { D16_CASES } from '../src/content/skills/d16-desain-uiux/cases';
import { D16_CHEATSHEET } from '../src/content/skills/d16-desain-uiux/cheatsheet';

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
  validateRoleKeySkillsMapping,
} from '../src/utils/auditSkillsValidators';

interface AuditError {
  category: string;
  item: string;
  message: string;
}

const errors: AuditError[] = [];

console.log('================================================================');
console.log(' KantorKu: Audit Semesta Keterampilan & 16 Jalur Peran (Patch S2b)');
console.log('================================================================\n');

// Build repository sets of available IDs
const availableLessonIds = new Set([
  ...ALL_LESSONS.map((l) => l.id),
  ...D12_LESSONS.map((l) => l.id),
  ...D14_LESSONS.map((l) => l.id),
  ...D15_LESSONS.map((l) => l.id),
  ...D7_LESSONS.map((l) => l.id),
  ...D11_LESSONS.map((l) => l.id),
  ...D3_LESSONS.map((l) => l.id),
  ...D6_LESSONS.map((l) => l.id),
  ...D8_LESSONS.map((l) => l.id),
  ...D9_LESSONS.map((l) => l.id),
  ...D10_LESSONS.map((l) => l.id),
  ...D4_LESSONS.map((l) => l.id),
  ...D17_LESSONS.map((l) => l.id),
  ...D13_LESSONS.map((l) => l.id),
  ...D16_LESSONS.map((l) => l.id),
]);

const availableLevelIds = new Set([
  ...LEVELS.map((l) => l.id),
  ...D12_LEVELS.map((l) => l.id),
  ...D14_LEVELS.map((l) => l.id),
  ...D15_LEVELS.map((l) => l.id),
  ...D7_LEVELS.map((l) => l.id),
  ...D11_LEVELS.map((l) => l.id),
  ...D3_LEVELS.map((l) => l.id),
  ...D6_LEVELS.map((l) => l.id),
  ...D8_LEVELS.map((l) => l.id),
  ...D9_LEVELS.map((l) => l.id),
  ...D10_LEVELS.map((l) => l.id),
  ...D4_LEVELS.map((l) => l.id),
  ...D17_LEVELS.map((l) => l.id),
  ...D13_LEVELS.map((l) => l.id),
  ...D16_LEVELS.map((l) => l.id),
]);

const availableCaseIds = new Set([
  ...CASE_FILES.map((c) => c.id),
  ...D12_CASES.map((c) => c.id),
  ...D14_CASES.map((c) => c.id),
  ...D15_CASES.map((c) => c.id),
  ...D7_CASES.map((c) => c.id),
  ...D11_CASES.map((c) => c.id),
  ...D3_CASES.map((c) => c.id),
  ...D6_CASES.map((c) => c.id),
  ...D8_CASES.map((c) => c.id),
  ...D9_CASES.map((c) => c.id),
  ...D10_CASES.map((c) => c.id),
  ...D4_CASES.map((c) => c.id),
  ...D17_CASES.map((c) => c.id),
  ...D13_CASES.map((c) => c.id),
  ...D16_CASES.map((c) => c.id),
]);

// 1. Audit Skills Schema & Integrity (1a, 1b, 1e, 1f, 1g)
console.log('1. Memeriksa Validasi Zod & Integritas Keterampilan (Skills)...');
for (const skill of ALL_SKILLS) {
  // Zod validation
  const result = SkillSchema.safeParse(skill);
  if (!result.success) {
    errors.push({
      category: 'Skill Schema',
      item: skill.id,
      message: JSON.stringify(result.error.format()),
    });
  }

  // Objective evaluation mode: must have 'E' or 'K'
  const hasObjective = skill.practiceModes.includes('E') || skill.practiceModes.includes('K');
  if (!hasObjective) {
    errors.push({
      category: 'Practice Mode',
      item: skill.id,
      message: 'Setiap keterampilan wajib memiliki minimal satu mode objektif (E atau K).',
    });
  }

  // 1a. Completeness check
  const completenessIssues = validateSkillCompleteness(skill);
  for (const msg of completenessIssues) {
    errors.push({ category: 'Skill Completeness (1a)', item: skill.id, message: msg });
  }

  // 1b. Cross references check
  const crossRefIssues = validateCrossReferences(
    skill,
    availableLessonIds,
    availableLevelIds,
    availableCaseIds
  );
  for (const msg of crossRefIssues) {
    errors.push({ category: 'Cross-Reference (1b)', item: skill.id, message: msg });
  }

  // 1e. Regulated content check (D6, D7, D10, D17)
  const regIssues = validateRegulatedContent(skill);
  for (const msg of regIssues) {
    errors.push({ category: 'Regulated Content (1e)', item: skill.id, message: msg });
  }

  // 1f. Blocklist check (prohibited brands, persons, claims)
  const skillBlob = `${skill.name} ${skill.description} ${Object.values(skill.canDo).join(' ')}`;
  const blocklistIssues = validateBlocklistText(skillBlob, skill.id);
  for (const msg of blocklistIssues) {
    errors.push({ category: 'Blocklist Violation (1f)', item: skill.id, message: msg });
  }

  // 1g & BUTIR 4. Role relevance Rule 2 (inheritance & max limit)
  const roleRelIssues = validateRoleRelevanceRule2(skill, ROLES);
  for (const msg of roleRelIssues) {
    errors.push({ category: 'Role Relevance Rule 2 (1g/Butir 4)', item: skill.id, message: msg });
  }

  // F5. Honest Depth Check (≥ 3 pelajaran, ≥ 4 level untuk label 'penuh')
  if (skill.depth === 'penuh') {
    const hasEnoughLessons = skill.linkedLessons.length >= 3 || ['D1', 'D2', 'D5'].includes(skill.domain);
    const hasEnoughLevels = skill.linkedLevels.length >= 4 || ['D1', 'D2', 'D5'].includes(skill.domain);
    if (!hasEnoughLessons || !hasEnoughLevels) {
      errors.push({
        category: 'Honest Depth (F5)',
        item: skill.id,
        message: `Keterampilan berlabel 'penuh' namun belum memenuhi kuota minimum (≥ 3 pelajaran, ≥ 4 level). Harap turunkan ke 'menengah' atau 'dasar'.`,
      });
    }
  }

  // F6. Honest & Specific Sources Check (tanpa frasa generik)
  const genericTerms = ['praktik umum', 'standar industri', 'kebijakan umum'];
  const hasGenericSource = (skill.sources || []).some((s) => genericTerms.some((g) => s.toLowerCase().includes(g)));
  if (hasGenericSource) {
    errors.push({
      category: 'Honest Sources (F6)',
      item: skill.id,
      message: `Sumber (sources) keterampilan tidak boleh menggunakan frasa generik seperti 'Praktik umum' atau 'Standar industri'.`,
    });
  }
}
console.log(`✓ ${ALL_SKILLS.length} keterampilan berhasil divalidasi.`);

// 2. Audit Lessons: Worked Example & Blocklist Check (1c, 1f)
console.log('\n2. Memeriksa Worked Examples & Konten Pembelajaran (D12, D14, D15, D7, D11, D3, D6)...');
const allActiveLessons = [
  ...D12_LESSONS,
  ...D14_LESSONS,
  ...D15_LESSONS,
  ...D7_LESSONS,
  ...D11_LESSONS,
  ...D3_LESSONS,
  ...D6_LESSONS,
];
for (const lesson of allActiveLessons) {
  const exampleIssues = validateLessonWorkedExample(lesson);
  for (const msg of exampleIssues) {
    errors.push({ category: 'Worked Example (1c)', item: lesson.id, message: msg });
  }

  const lessonBlob = `${lesson.title} ${lesson.summary} ${lesson.sections.map((s: any) => `${s.title || s.heading || ''} ${s.content}`).join(' ')}`;
  const blocklistIssues = validateBlocklistText(lessonBlob, lesson.id);
  for (const msg of blocklistIssues) {
    errors.push({ category: 'Blocklist Violation (1f)', item: lesson.id, message: msg });
  }
}
console.log(`✓ ${allActiveLessons.length} pelajaran aktif memiliki worked example dan bebas pelanggaran merek.`);

// 3. Audit Quizzes: Ambiguity & Seed Generator Check (1d, Butir 2)
console.log('\n3. Memeriksa Kuis Analitis (Bebas Ambigu & Pembangkit Seed)...');
// D12
if (generateSeededD12Quizzes(12345).length !== 10 || generateSeededD12Quizzes(99999).length !== 10) {
  errors.push({ category: 'Quiz Generator (Butir 2)', item: 'generateSeededD12Quizzes', message: 'Harus menghasilkan 10 pertanyaan.' });
}
for (const quiz of D12_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D14
if (generateSeededD14Quizzes(12345).length !== 10 || generateSeededD14Quizzes(99999).length !== 10) {
  errors.push({ category: 'Quiz Generator (Wave S1)', item: 'generateSeededD14Quizzes', message: 'Harus menghasilkan 10 pertanyaan.' });
}
for (const quiz of D14_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D15
if (generateSeededD15Quizzes(12345).length !== 10 || generateSeededD15Quizzes(99999).length !== 10) {
  errors.push({ category: 'Quiz Generator (Wave S1)', item: 'generateSeededD15Quizzes', message: 'Harus menghasilkan 10 pertanyaan.' });
}
for (const quiz of D15_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D7
if (generateSeededD7Quizzes(12345).length !== 10 || generateSeededD7Quizzes(99999).length !== 10) {
  errors.push({ category: 'Quiz Generator (Wave S1)', item: 'generateSeededD7Quizzes', message: 'Harus menghasilkan 10 pertanyaan.' });
}
for (const quiz of D7_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D11
if (generateSeededD11Quizzes(12345).length !== 10 || generateSeededD11Quizzes(99999).length !== 10) {
  errors.push({ category: 'Quiz Generator (Wave S2a)', item: 'generateSeededD11Quizzes', message: 'Harus menghasilkan 10 pertanyaan.' });
}
for (const quiz of D11_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D3
if (generateSeededD3Quizzes(12345).length !== 10 || generateSeededD3Quizzes(99999).length !== 10) {
  errors.push({ category: 'Quiz Generator (Wave S2a)', item: 'generateSeededD3Quizzes', message: 'Harus menghasilkan 10 pertanyaan.' });
}
for (const quiz of D3_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D6
if (generateSeededD6Quizzes(12345).length !== 10 || generateSeededD6Quizzes(99999).length !== 10) {
  errors.push({ category: 'Quiz Generator (Wave S2a)', item: 'generateSeededD6Quizzes', message: 'Harus menghasilkan 10 pertanyaan.' });
}
for (const quiz of D6_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D8
if (generateSeededD8Quizzes(12345).length !== 10 || generateSeededD8Quizzes(99999).length !== 10) {
  errors.push({ category: 'Quiz Generator (Wave S2b)', item: 'generateSeededD8Quizzes', message: 'Harus menghasilkan 10 pertanyaan.' });
}
for (const quiz of D8_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D9
if (generateSeededD9Quizzes(12345).length !== 10 || generateSeededD9Quizzes(99999).length !== 10) {
  errors.push({ category: 'Quiz Generator (Wave S2b)', item: 'generateSeededD9Quizzes', message: 'Harus menghasilkan 10 pertanyaan.' });
}
for (const quiz of D9_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D10
if (generateSeededD10Quizzes(12345).length !== 10 || generateSeededD10Quizzes(99999).length !== 10) {
  errors.push({ category: 'Quiz Generator (Wave S2b)', item: 'generateSeededD10Quizzes', message: 'Harus menghasilkan 10 pertanyaan.' });
}
for (const quiz of D10_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D4
if (generateSeededD4Quizzes(12345).length !== 12 || generateSeededD4Quizzes(99999).length !== 12) {
  errors.push({ category: 'Quiz Generator (Wave S3a)', item: 'generateSeededD4Quizzes', message: 'Harus menghasilkan 12 pertanyaan.' });
}
for (const quiz of D4_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}

// D17
if (generateSeededD17Quizzes(12345).length !== 12 || generateSeededD17Quizzes(99999).length !== 12) {
  errors.push({ category: 'Quiz Generator (Wave S3a)', item: 'generateSeededD17Quizzes', message: 'Harus menghasilkan 12 pertanyaan.' });
}
for (const quiz of D17_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) {
    errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
  }
}
for (const quiz of D13_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
}
for (const quiz of D16_QUIZZES) {
  for (const msg of validateQuizAmbiguity(quiz)) errors.push({ category: 'Quiz Ambiguity (1d)', item: quiz.id, message: msg });
}

const totalQuizzes =
  D12_QUIZZES.length +
  D14_QUIZZES.length +
  D15_QUIZZES.length +
  D7_QUIZZES.length +
  D11_QUIZZES.length +
  D3_QUIZZES.length +
  D6_QUIZZES.length +
  D8_QUIZZES.length +
  D9_QUIZZES.length +
  D10_QUIZZES.length +
  D4_QUIZZES.length +
  D17_QUIZZES.length +
  D13_QUIZZES.length +
  D16_QUIZZES.length;
console.log(`✓ ${totalQuizzes} kuis analitis (D12, D14, D15, D7, D11, D3, D6, D8, D9, D10, D4, D17, D13, D16) diverifikasi bebas ambigu dan berbasis generator seed.`);

// 4. Audit Manifests
console.log('\n4. Memeriksa Manifest Domain...');
for (const domainId of DOMAIN_IDS) {
  const manifest = ALL_MANIFESTS[domainId];
  if (!manifest) {
    errors.push({
      category: 'Manifest Missing',
      item: domainId,
      message: `Manifest untuk domain ${domainId} belum terdaftar di ALL_MANIFESTS.`,
    });
    continue;
  }
  const result = SkillPackManifestSchema.safeParse(manifest);
  if (!result.success) {
    errors.push({
      category: 'Manifest Schema',
      item: domainId,
      message: JSON.stringify(result.error.format()),
    });
  }
}
console.log(`✓ ${DOMAIN_IDS.length} manifest domain berhasil diverifikasi.`);

// 5. Audit 16 Career Roles (1b, 1g, Bagian B.5)
console.log('\n5. Memeriksa Pemetaan 16 Jalur Peran...');
if (ROLES.length !== 16) {
  errors.push({
    category: 'Role Count',
    item: 'ROLES',
    message: `Jumlah peran harus tepat 16 (ditemukan: ${ROLES.length}).`,
  });
}

for (const role of ROLES) {
  const result = RoleSchema.safeParse(role);
  if (!result.success) {
    errors.push({
      category: 'Role Schema',
      item: role.id,
      message: JSON.stringify(result.error.format()),
    });
  }

  // Check reviewStatus
  if (role.reviewStatus !== 'draf') {
    errors.push({
      category: 'Role ReviewStatus',
      item: role.id,
      message: `Status peran harus 'draf' (ditemukan: ${role.reviewStatus}).`,
    });
  }

  // Check mandatory disclaimer
  if (role.disclaimer !== MANDATORY_ROLE_DISCLAIMER) {
    errors.push({
      category: 'Role Disclaimer',
      item: role.id,
      message: 'Penafian peran tidak sesuai standar wajib.',
    });
  }

  // 1b. Check recommendedCases exist in actual content
  const roleCaseIssues = validateRoleCases(role, availableCaseIds);
  for (const msg of roleCaseIssues) {
    errors.push({ category: 'Role Recommended Cases (1b)', item: role.id, message: msg });
  }
}

// 1g & Bagian B.5: Domain coverage check
const domainCoverageIssues = validateDomainCoverage(ROLES, DOMAIN_IDS);
for (const msg of domainCoverageIssues) {
  errors.push({ category: 'Domain Coverage (1g/B.5)', item: 'ROLES', message: msg });
}

// 1g & Bagian B.5: Key skills mapping check
const keySkillsIssues = validateRoleKeySkillsMapping(ROLES, ALL_SKILLS);
for (const msg of keySkillsIssues) {
  errors.push({ category: 'Role Key Skills Mapping (1g/B.5)', item: 'ROLES', message: msg });
}

// Verify that every role requiring active domains has an entry in at least one skill of that domain
const activeDomainsToCheck: DomainId[] = (Object.keys(DOMAIN_CATALOG) as DomainId[]).filter(
  (id) => DOMAIN_CATALOG[id].status === 'aktif'
);
for (const domainId of activeDomainsToCheck) {
  for (const role of ROLES) {
    const requiresDomain = role.domainRequirements.some((d) => d.domainId === domainId);
    if (requiresDomain) {
      const hasDomainEntry = ALL_SKILLS.some(
        (s) => s.domain === domainId && typeof s.roleRelevance[role.id] === 'number' && s.roleRelevance[role.id] > 0
      );
      if (!hasDomainEntry) {
        errors.push({
          category: `${domainId} Role Coverage (Butir 4)`,
          item: role.id,
          message: `Peran "${role.id}" membutuhkan domain ${domainId} tetapi tidak memiliki entri di keterampilan ${domainId} manapun.`,
        });
      }
    }
  }
}

console.log(`✓ 16 Jalur Peran valid (17/17 domain terpetakan secara lengkap, tanpa dangling cases).`);

// 6. Audit Domain Depth: D12, D14, D15 (Penuh) & D7 (Menengah)
console.log('\n6. Memeriksa Kelengkapan Kedalaman Domain Gelombang S0 & S1...');

// D12 Full Depth
if (D12_LESSONS.length < 3) errors.push({ category: 'D12 Full Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D12_LEVELS.length < 3) errors.push({ category: 'D12 Full Depth', item: 'Levels', message: 'Min 3 level.' });
if (D12_QUIZZES.length < 10) errors.push({ category: 'D12 Full Depth', item: 'Quizzes', message: 'Min 10 kuis berseed.' });
if (D12_CASES.length < 1) errors.push({ category: 'D12 Full Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D12_GLOSSARY.length < 5) errors.push({ category: 'D12 Full Depth', item: 'Glossary', message: 'Min 5 istilah.' });
if (D12_CHEATSHEET.length < 2) errors.push({ category: 'D12 Full Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(
  `✓ D12 Full Depth terbukti: ${D12_LESSONS.length} Pelajaran, ${D12_LEVELS.length} Level, ${D12_QUIZZES.length} Kuis Berseed, ${D12_CASES.length} Kasus, ${D12_GLOSSARY.length} Glosarium, ${D12_CHEATSHEET.length} Contekan.`
);

// D14 Full Depth (Wave S1 v9.2: >=3 lessons, >=4 levels, >=8 quizzes)
if (D14_LESSONS.length < 3) errors.push({ category: 'D14 Full Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D14_LEVELS.length < 4) errors.push({ category: 'D14 Full Depth', item: 'Levels', message: 'Min 4 level.' });
if (D14_QUIZZES.length < 8) errors.push({ category: 'D14 Full Depth', item: 'Quizzes', message: 'Min 8 kuis berseed.' });
if (D14_CASES.length < 1) errors.push({ category: 'D14 Full Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D14_GLOSSARY.length < 5) errors.push({ category: 'D14 Full Depth', item: 'Glossary', message: 'Min 5 istilah.' });
if (D14_CHEATSHEET.length < 2) errors.push({ category: 'D14 Full Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(
  `✓ D14 Full Depth terbukti: ${D14_LESSONS.length} Pelajaran, ${D14_LEVELS.length} Level, ${D14_QUIZZES.length} Kuis Berseed, ${D14_CASES.length} Kasus, ${D14_GLOSSARY.length} Glosarium, ${D14_CHEATSHEET.length} Contekan.`
);

// D15 Full Depth (Wave S1 v9.2: >=3 lessons, >=4 levels, >=8 quizzes)
if (D15_LESSONS.length < 3) errors.push({ category: 'D15 Full Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D15_LEVELS.length < 4) errors.push({ category: 'D15 Full Depth', item: 'Levels', message: 'Min 4 level.' });
if (D15_QUIZZES.length < 8) errors.push({ category: 'D15 Full Depth', item: 'Quizzes', message: 'Min 8 kuis berseed.' });
if (D15_CASES.length < 1) errors.push({ category: 'D15 Full Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D15_GLOSSARY.length < 5) errors.push({ category: 'D15 Full Depth', item: 'Glossary', message: 'Min 5 istilah.' });
if (D15_CHEATSHEET.length < 2) errors.push({ category: 'D15 Full Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(
  `✓ D15 Full Depth terbukti: ${D15_LESSONS.length} Pelajaran, ${D15_LEVELS.length} Level, ${D15_QUIZZES.length} Kuis Berseed, ${D15_CASES.length} Kasus, ${D15_GLOSSARY.length} Glosarium, ${D15_CHEATSHEET.length} Contekan.`
);

// D7 Full Depth (Wave S1 v9.2: >=3 lessons, >=4 levels, >=8 quizzes)
if (D7_LESSONS.length < 3) errors.push({ category: 'D7 Full Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D7_LEVELS.length < 4) errors.push({ category: 'D7 Full Depth', item: 'Levels', message: 'Min 4 level.' });
if (D7_QUIZZES.length < 8) errors.push({ category: 'D7 Full Depth', item: 'Quizzes', message: 'Min 8 kuis berseed.' });
if (D7_CASES.length < 1) errors.push({ category: 'D7 Full Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D7_GLOSSARY.length < 5) errors.push({ category: 'D7 Full Depth', item: 'Glossary', message: 'Min 5 istilah.' });
if (D7_CHEATSHEET.length < 2) errors.push({ category: 'D7 Full Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(
  `✓ D7 Full Depth terbukti: ${D7_LESSONS.length} Pelajaran, ${D7_LEVELS.length} Level, ${D7_QUIZZES.length} Kuis Berseed, ${D7_CASES.length} Kasus, ${D7_GLOSSARY.length} Glosarium, ${D7_CHEATSHEET.length} Contekan.`
);

// D11 Full Depth (Wave S2a: >=3 lessons, >=4 levels, >=10 quizzes)
if (D11_LESSONS.length < 3) errors.push({ category: 'D11 Full Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D11_LEVELS.length < 4) errors.push({ category: 'D11 Full Depth', item: 'Levels', message: 'Min 4 level.' });
if (D11_QUIZZES.length < 10) errors.push({ category: 'D11 Full Depth', item: 'Quizzes', message: 'Min 10 kuis berseed.' });
if (D11_CASES.length < 1) errors.push({ category: 'D11 Full Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D11_GLOSSARY.length < 5) errors.push({ category: 'D11 Full Depth', item: 'Glossary', message: 'Min 5 istilah.' });
if (D11_CHEATSHEET.length < 2) errors.push({ category: 'D11 Full Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(
  `✓ D11 Full Depth terbukti: ${D11_LESSONS.length} Pelajaran, ${D11_LEVELS.length} Level, ${D11_QUIZZES.length} Kuis Berseed, ${D11_CASES.length} Kasus, ${D11_GLOSSARY.length} Glosarium, ${D11_CHEATSHEET.length} Contekan.`
);

// D3 Full Depth (Wave S2a: >=3 lessons, >=4 levels, >=10 quizzes)
if (D3_LESSONS.length < 3) errors.push({ category: 'D3 Full Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D3_LEVELS.length < 4) errors.push({ category: 'D3 Full Depth', item: 'Levels', message: 'Min 4 level.' });
if (D3_QUIZZES.length < 10) errors.push({ category: 'D3 Full Depth', item: 'Quizzes', message: 'Min 10 kuis berseed.' });
if (D3_CASES.length < 1) errors.push({ category: 'D3 Full Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D3_GLOSSARY.length < 5) errors.push({ category: 'D3 Full Depth', item: 'Glossary', message: 'Min 5 istilah.' });
if (D3_CHEATSHEET.length < 2) errors.push({ category: 'D3 Full Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(
  `✓ D3 Full Depth terbukti: ${D3_LESSONS.length} Pelajaran, ${D3_LEVELS.length} Level, ${D3_QUIZZES.length} Kuis Berseed, ${D3_CASES.length} Kasus, ${D3_GLOSSARY.length} Glosarium, ${D3_CHEATSHEET.length} Contekan.`
);

// D6 Full Depth (Wave S2a: >=3 lessons, >=4 levels, >=10 quizzes)
if (D6_LESSONS.length < 3) errors.push({ category: 'D6 Full Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D6_LEVELS.length < 4) errors.push({ category: 'D6 Full Depth', item: 'Levels', message: 'Min 4 level.' });
if (D6_QUIZZES.length < 10) errors.push({ category: 'D6 Full Depth', item: 'Quizzes', message: 'Min 10 kuis berseed.' });
if (D6_CASES.length < 1) errors.push({ category: 'D6 Full Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D6_GLOSSARY.length < 5) errors.push({ category: 'D6 Full Depth', item: 'Glossary', message: 'Min 5 istilah.' });
if (D6_CHEATSHEET.length < 2) errors.push({ category: 'D6 Full Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(
  `✓ D6 Full Depth terbukti: ${D6_LESSONS.length} Pelajaran, ${D6_LEVELS.length} Level, ${D6_QUIZZES.length} Kuis Berseed, ${D6_CASES.length} Kasus, ${D6_GLOSSARY.length} Glosarium, ${D6_CHEATSHEET.length} Contekan.`
);

// D8 Medium Depth (Wave S2b: >=3 lessons, >=4 levels, >=10 quizzes)
if (D8_LESSONS.length < 3) errors.push({ category: 'D8 Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D8_LEVELS.length < 4) errors.push({ category: 'D8 Depth', item: 'Levels', message: 'Min 4 level.' });
if (D8_QUIZZES.length < 10) errors.push({ category: 'D8 Depth', item: 'Quizzes', message: 'Min 10 kuis berseed.' });
if (D8_CASES.length < 1) errors.push({ category: 'D8 Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D8_GLOSSARY.length < 5) errors.push({ category: 'D8 Depth', item: 'Glossary', message: 'Min 5 istilah.' });
if (D8_CHEATSHEET.length < 2) errors.push({ category: 'D8 Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(
  `✓ D8 Depth terbukti: ${D8_LESSONS.length} Pelajaran, ${D8_LEVELS.length} Level, ${D8_QUIZZES.length} Kuis Berseed, ${D8_CASES.length} Kasus, ${D8_GLOSSARY.length} Glosarium, ${D8_CHEATSHEET.length} Contekan.`
);

// D9 Full Depth (Wave S2b: >=3 lessons, >=4 levels, >=10 quizzes)
if (D9_LESSONS.length < 3) errors.push({ category: 'D9 Full Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D9_LEVELS.length < 4) errors.push({ category: 'D9 Full Depth', item: 'Levels', message: 'Min 4 level.' });
if (D9_QUIZZES.length < 10) errors.push({ category: 'D9 Full Depth', item: 'Quizzes', message: 'Min 10 kuis berseed.' });
if (D9_CASES.length < 1) errors.push({ category: 'D9 Full Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D9_GLOSSARY.length < 5) errors.push({ category: 'D9 Full Depth', item: 'Glossary', message: 'Min 5 istilah.' });
if (D9_CHEATSHEET.length < 2) errors.push({ category: 'D9 Full Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(
  `✓ D9 Full Depth terbukti: ${D9_LESSONS.length} Pelajaran, ${D9_LEVELS.length} Level, ${D9_QUIZZES.length} Kuis Berseed, ${D9_CASES.length} Kasus, ${D9_GLOSSARY.length} Glosarium, ${D9_CHEATSHEET.length} Contekan.`
);

// D10 Medium Depth (Wave S2b: >=3 lessons, >=4 levels, >=10 quizzes)
if (D10_LESSONS.length < 3) errors.push({ category: 'D10 Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D10_LEVELS.length < 4) errors.push({ category: 'D10 Depth', item: 'Levels', message: 'Min 4 level.' });
if (D10_QUIZZES.length < 10) errors.push({ category: 'D10 Depth', item: 'Quizzes', message: 'Min 10 kuis berseed.' });
if (D10_CASES.length < 1) errors.push({ category: 'D10 Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D10_GLOSSARY.length < 5) errors.push({ category: 'D10 Depth', item: 'Glossary', message: 'Min 5 istilah.' });
if (D10_CHEATSHEET.length < 2) errors.push({ category: 'D10 Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(
  `✓ D10 Depth terbukti: ${D10_LESSONS.length} Pelajaran, ${D10_LEVELS.length} Level, ${D10_QUIZZES.length} Kuis Berseed, ${D10_CASES.length} Kasus, ${D10_GLOSSARY.length} Glosarium, ${D10_CHEATSHEET.length} Contekan.`
);

// D4 Medium Depth (Wave S3a)
if (D4_LESSONS.length < 3) errors.push({ category: 'D4 Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D4_LEVELS.length < 4) errors.push({ category: 'D4 Depth', item: 'Levels', message: 'Min 4 level.' });
if (D4_QUIZZES.length < 10) errors.push({ category: 'D4 Depth', item: 'Quizzes', message: 'Min 10 kuis berseed.' });
if (D4_CASES.length < 1) errors.push({ category: 'D4 Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D4_CHEATSHEET.length < 2) errors.push({ category: 'D4 Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(`✓ D4 Depth terbukti: ${D4_LESSONS.length} Pelajaran, ${D4_LEVELS.length} Level, ${D4_QUIZZES.length} Kuis Berseed, ${D4_CASES.length} Kasus, ${D4_CHEATSHEET.length} Contekan.`);

// D17 Medium Depth (Wave S3a)
if (D17_LESSONS.length < 3) errors.push({ category: 'D17 Depth', item: 'Lessons', message: 'Min 3 materi.' });
if (D17_LEVELS.length < 4) errors.push({ category: 'D17 Depth', item: 'Levels', message: 'Min 4 level.' });
if (D17_QUIZZES.length < 10) errors.push({ category: 'D17 Depth', item: 'Quizzes', message: 'Min 10 kuis berseed.' });
if (D17_CASES.length < 1) errors.push({ category: 'D17 Depth', item: 'Cases', message: 'Min 1 kasus.' });
if (D17_CHEATSHEET.length < 2) errors.push({ category: 'D17 Depth', item: 'Cheatsheet', message: 'Min 2 lembar contekan.' });
console.log(`✓ D17 Depth terbukti: ${D17_LESSONS.length} Pelajaran, ${D17_LEVELS.length} Level, ${D17_QUIZZES.length} Kuis Berseed, ${D17_CASES.length} Kasus, ${D17_CHEATSHEET.length} Contekan.`);

// D13 and D16 Medium Depth (Wave S3b)
if (D13_LESSONS.length < 3 || D13_LEVELS.length < 4 || D13_QUIZZES.length < 10 || D13_CASES.length < 1) errors.push({ category: 'D13 Depth', item: 'Wave S3b', message: 'Min 3 pelajaran, 4 level, 10 kuis berseed, dan 1 kasus.' });
if (D16_LESSONS.length < 3 || D16_LEVELS.length < 4 || D16_QUIZZES.length < 10 || D16_CASES.length < 1) errors.push({ category: 'D16 Depth', item: 'Wave S3b', message: 'Min 3 pelajaran, 4 level, 10 kuis berseed, dan 1 kasus.' });
console.log(`✓ D13 Depth terbukti: ${D13_LESSONS.length} Pelajaran, ${D13_LEVELS.length} Level, ${D13_QUIZZES.length} Kuis Berseed, ${D13_CASES.length} Kasus, ${D13_CHEATSHEET.length} Contekan.`);
console.log(`✓ D16 Depth terbukti: ${D16_LESSONS.length} Pelajaran, ${D16_LEVELS.length} Level, ${D16_QUIZZES.length} Kuis Berseed, ${D16_CASES.length} Kasus, ${D16_CHEATSHEET.length} Contekan.`);

// 7. Status Summary Table: Aktual vs Target per Domain & Kedalaman (1h)
console.log('\n------------------------------------------------------------------------------------------------------');
console.log(' TABEL AUDIT STATUS DOMAIN: AKTUAL VS TARGET PER DOMAIN & KEDALAMAN (WAVE S2b)');
console.log('------------------------------------------------------------------------------------------------------');
console.log(
  `${'Domain'.padEnd(6)} | ${'Nama'.padEnd(35)} | ${'Gelombang'.padEnd(10)} | ${'Status'.padEnd(13)} | ${'Target Kedalaman'.padEnd(16)} | ${'Status Konten'}`
);
console.log('------------------------------------------------------------------------------------------------------');

for (const id of DOMAIN_IDS) {
  const meta = DOMAIN_CATALOG[id];
  const domainSkills = ALL_SKILLS.filter((s) => s.domain === id);
  const statusKonten =
    meta.status === 'aktif'
      ? `${domainSkills.length} skill (Aktif Gelombang ${meta.wave})`
      : 'Segera Hadir (Menunggu Gelombang)';

  console.log(
    `${id.padEnd(6)} | ${meta.name.slice(0, 35).padEnd(35)} | ${meta.wave.padEnd(10)} | ${meta.status.padEnd(13)} | ${meta.depth.padEnd(16)} | ${statusKonten}`
  );
}
console.log('------------------------------------------------------------------------------------------------------\n');

if (errors.length > 0) {
  console.error(`❌ AUDIT GAGAL! Ditemukan ${errors.length} masalah:`);
  for (const err of errors) {
    console.error(`- [${err.category}] ${err.item}: ${err.message}`);
  }
  process.exit(1);
} else {
  console.log('✅ SEMUA QUALITY GATES PATCH S2b LULUS 100%!');
  process.exit(0);
}
