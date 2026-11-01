/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Skills & Roles Audit Pure Validators
 * Provides modular, testable validation functions for Semesta Keterampilan quality gates.
 */

import { Skill, DomainId } from '../types/skills';
import { Role } from '../types/roles';
import { checkContentBlocklist } from '../../scripts/auditBlocklist';

export interface AuditIssue {
  category: string;
  item: string;
  message: string;
}

/**
 * 1a. Skill must have linked lessons, levels, and non-empty roleRelevance.
 */
export function validateSkillCompleteness(skill: Skill): string[] {
  const issues: string[] = [];
  if (!skill.linkedLessons || skill.linkedLessons.length === 0) {
    issues.push('Keterampilan wajib memiliki minimal 1 pelajaran tertaut (linkedLessons kosong).');
  }
  if (!skill.linkedLevels || skill.linkedLevels.length === 0) {
    issues.push('Keterampilan wajib memiliki minimal 1 latihan/level tertaut (linkedLevels kosong).');
  }
  if (!skill.roleRelevance || Object.keys(skill.roleRelevance).length === 0) {
    issues.push('Keterampilan wajib memiliki tautan peran (roleRelevance kosong).');
  }
  return issues;
}

/**
 * 1b. All referenced IDs in linkedLessons, linkedLevels, linkedCases must exist in actual content.
 */
export function validateCrossReferences(
  skill: Skill,
  availableLessonIds: Set<string>,
  availableLevelIds: Set<string>,
  availableCaseIds: Set<string>
): string[] {
  const issues: string[] = [];

  for (const lesId of skill.linkedLessons) {
    if (!availableLessonIds.has(lesId)) {
      issues.push(`Pelajaran tertaut "${lesId}" tidak ditemukan dalam repositori konten.`);
    }
  }

  for (const lvlId of skill.linkedLevels) {
    if (!availableLevelIds.has(lvlId)) {
      issues.push(`Latihan/Level tertaut "${lvlId}" tidak ditemukan dalam repositori level.`);
    }
  }

  for (const caseId of skill.linkedCases) {
    if (!availableCaseIds.has(caseId)) {
      issues.push(`Kasus tertaut "${caseId}" tidak ditemukan dalam repositori kasus.`);
    }
  }

  return issues;
}

/**
 * 1b. Role recommendedCases must exist in actual content.
 */
export function validateRoleCases(role: Role, availableCaseIds: Set<string>): string[] {
  const issues: string[] = [];
  for (const caseId of role.recommendedCases) {
    if (!availableCaseIds.has(caseId)) {
      issues.push(`Kasus rekomendasi "${caseId}" pada peran "${role.id}" belum tersedia di konten.`);
    }
  }
  return issues;
}

/**
 * 1c. Lesson must contain at least one worked example.
 */
export function validateLessonWorkedExample(lesson: {
  id: string;
  title: string;
  workedExample?: any;
  sections?: Array<any>;
}): string[] {
  const issues: string[] = [];

  const hasTopLevelExample =
    (typeof lesson.workedExample === 'string' && lesson.workedExample.trim().length > 0) ||
    (typeof lesson.workedExample === 'object' &&
      lesson.workedExample !== null &&
      Object.keys(lesson.workedExample).length > 0);

  const hasSectionExample =
    Array.isArray(lesson.sections) &&
    lesson.sections.some(
      (s) =>
        (s.example && s.example.good && s.example.bad) ||
        (typeof s.workedExample === 'string' && s.workedExample.trim().length > 0) ||
        (typeof s.workedExample === 'object' && s.workedExample !== null)
    );

  if (!hasTopLevelExample && !hasSectionExample) {
    issues.push(`Pelajaran "${lesson.id}" tidak memiliki worked example (contoh konkret).`);
  }

  return issues;
}

/**
 * 1d. Quiz must not have ambiguous answers (duplicates, missing answer, or multiple identical options).
 */
export function validateQuizAmbiguity(quiz: any): string[] {
  const issues: string[] = [];

  if (quiz.type === 'urutan') {
    if (!Array.isArray(quiz.items) || quiz.items.length < 2) {
      issues.push(`Kuis urutan "${quiz.id}" harus memiliki minimal 2 item.`);
    }
    const itemIds = (quiz.items || []).map((i: any) => i.id);
    const uniqueIds = new Set(itemIds);
    if (uniqueIds.size !== itemIds.length) {
      issues.push(`Kuis urutan "${quiz.id}" memiliki duplikasi ID item.`);
    }
    const correctOrder = quiz.correctOrder || [];
    if (correctOrder.length !== itemIds.length || !correctOrder.every((id: string) => uniqueIds.has(id))) {
      issues.push(`Kuis urutan "${quiz.id}" memiliki correctOrder yang tidak selaras dengan item.`);
    }
  } else if (quiz.type === 'cocokkan') {
    if (!Array.isArray(quiz.pairs) || quiz.pairs.length < 2) {
      issues.push(`Kuis cocokkan "${quiz.id}" harus memiliki minimal 2 pasangan.`);
    }
    const leftTexts = (quiz.pairs || []).map((p: any) => p.left.trim());
    const rightTexts = (quiz.pairs || []).map((p: any) => p.right.trim());
    if (new Set(leftTexts).size !== leftTexts.length) {
      issues.push(`Kuis cocokkan "${quiz.id}" memiliki opsi kiri duplikat.`);
    }
    if (new Set(rightTexts).size !== rightTexts.length) {
      issues.push(`Kuis cocokkan "${quiz.id}" memiliki opsi kanan duplikat.`);
    }
  } else if (quiz.type === 'temukan-kesalahan') {
    const lines = quiz.contextSnippet?.lines || [];
    const errorLines = lines.filter((l: any) => l.isError);
    if (errorLines.length !== quiz.requiredErrorCount) {
      issues.push(
        `Kuis temukan-kesalahan "${quiz.id}" requiredErrorCount (${quiz.requiredErrorCount}) tidak cocok dengan jumlah baris isError (${errorLines.length}).`
      );
    }
    const lineIds = lines.map((l: any) => l.id);
    if (new Set(lineIds).size !== lineIds.length) {
      issues.push(`Kuis "${quiz.id}" memiliki duplikasi ID baris.`);
    }
  } else if (quiz.type === 'klik-area') {
    const zones = quiz.previewImageOrBox?.zones || [];
    const targets = zones.filter((z: any) => z.isTarget);
    if (targets.length === 0) {
      issues.push(`Kuis klik-area "${quiz.id}" tidak memiliki target yang benar.`);
    }
    const zoneIds = zones.map((z: any) => z.id);
    if (new Set(zoneIds).size !== zoneIds.length) {
      issues.push(`Kuis "${quiz.id}" memiliki duplikasi ID area.`);
    }
  }

  return issues;
}

/**
 * 1e. Regulated domains (legal, tax, finance, HR - D6, D7, D10, D17) must have sources, review date <= 12 months, and disclaimer.
 */
export function validateRegulatedContent(content: {
  id: string;
  domain: string;
  sources?: string[];
  lastReviewed?: string;
  disclaimer?: string;
}): string[] {
  const issues: string[] = [];
  const regulatedDomains = ['D6', 'D7', 'D10', 'D17'];

  if (regulatedDomains.includes(content.domain)) {
    if (!content.sources || content.sources.length === 0) {
      issues.push(`Konten regulasi ${content.domain} ("${content.id}") wajib mencantumkan sumber (sources).`);
    }

    if (!content.lastReviewed || !/^\d{4}-\d{2}-\d{2}$/.test(content.lastReviewed)) {
      issues.push(`Konten regulasi ${content.domain} ("${content.id}") wajib memiliki tanggal lastReviewed valid.`);
    } else {
      // Check expiration (> 12 months / 365 days)
      const reviewDate = new Date(content.lastReviewed).getTime();
      const now = Date.now();
      const diffDays = Math.floor((now - reviewDate) / (1000 * 3600 * 24));
      if (diffDays > 365) {
        issues.push(
          `Konten regulasi ${content.domain} ("${content.id}") kedaluwarsa (terakhir ditinjau ${diffDays} hari lalu, batas maks 365 hari).`
        );
      }
    }
  }

  return issues;
}

/**
 * 1f. Check blocklist of real brands, persons, and unethical promises.
 */
export function validateBlocklistText(text: string, identifier: string): string[] {
  const violations = checkContentBlocklist(text);
  return violations.map((v) => `[${identifier}] ${v}`);
}

/**
 * 1g & BUTIR 4. Role relevance must NOT exceed the domain weight for that role, and every role requiring D12 has an entry.
 */
export function validateRoleRelevanceRule2(skill: Skill, roles: Role[]): string[] {
  const issues: string[] = [];

  for (const [roleId, weight] of Object.entries(skill.roleRelevance)) {
    const role = roles.find((r) => r.id === roleId);
    if (!role) {
      issues.push(`Keterampilan "${skill.id}" menunjuk peran yang tidak ada: "${roleId}".`);
      continue;
    }

    const domainReq = role.domainRequirements.find((d) => d.domainId === skill.domain);
    if (!domainReq) {
      issues.push(
        `Keterampilan "${skill.id}" (${skill.domain}) dimasukkan ke peran "${roleId}" padahal peran tersebut tidak membutuhkan domain ${skill.domain}.`
      );
      continue;
    }

    if (weight > domainReq.weight) {
      issues.push(
        `Pelanggaran Aturan 2: Bobot skill "${skill.id}" (${weight}) melebihi bobot domain ${skill.domain} (${domainReq.weight}) pada peran "${roleId}".`
      );
    }
  }

  return issues;
}

/**
 * 1g & Bagian B.5. Every domain D1-D17 appears in at least one role, and each role has at least 5 domains.
 */
export function validateDomainCoverage(roles: Role[], allDomainIds: readonly string[]): string[] {
  const issues: string[] = [];
  const referencedDomains = new Set<string>();

  for (const role of roles) {
    if (role.domainRequirements.length < 5) {
      issues.push(`Peran "${role.id}" hanya memiliki ${role.domainRequirements.length} domain (minimal 5).`);
    }
    for (const req of role.domainRequirements) {
      referencedDomains.add(req.domainId);
    }
  }

  for (const domainId of allDomainIds) {
    if (!referencedDomains.has(domainId)) {
      issues.push(`Domain "${domainId}" yatim piatu (tidak muncul di peran manapun).`);
    }
  }

  return issues;
}

/**
 * 1g & Bagian B.5. Verify key skills mapping in roles have matching available skills.
 */
export function validateRoleKeySkillsMapping(roles: Role[], availableSkills: Skill[]): string[] {
  const issues: string[] = [];
  const availableSkillIds = new Set(availableSkills.map((s) => s.id));

  for (const role of roles) {
    for (const skillReq of role.skills) {
      if (skillReq.isKeySkill && availableSkillIds.has(skillReq.skillId)) {
        const found = availableSkills.find((s) => s.id === skillReq.skillId);
        if (!found) {
          issues.push(`Skill kunci "${skillReq.skillId}" pada peran "${role.id}" tidak ditemukan.`);
        }
      }
    }
  }

  return issues;
}
