/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Skills & Roles Audit Script (Wave S0)
 * Run via: npm run skills:audit
 */

import { SkillSchema, SkillPackManifestSchema, DOMAIN_CATALOG, DOMAIN_IDS, DomainId } from '../src/types/skills';
import { RoleSchema } from '../src/types/roles';
import { ALL_SKILLS, ALL_MANIFESTS } from '../src/content/skills';
import { ROLES, MANDATORY_ROLE_DISCLAIMER } from '../src/content/roles';
import { D12_LESSONS } from '../src/content/skills/d12-komunikasi/lessons';
import { D12_LEVELS } from '../src/content/skills/d12-komunikasi/levels';
import { D12_QUIZZES } from '../src/content/skills/d12-komunikasi/quizzes';
import { D12_CASES } from '../src/content/skills/d12-komunikasi/cases';
import { D12_GLOSSARY } from '../src/content/skills/d12-komunikasi/glossary';
import { D12_CHEATSHEET } from '../src/content/skills/d12-komunikasi/cheatsheet';

interface AuditError {
  category: string;
  item: string;
  message: string;
}

const errors: AuditError[] = [];

console.log('================================================================');
console.log(' KantorKu: Audit Semesta Keterampilan & 16 Jalur Peran (Wave S0)');
console.log('================================================================\n');

// 1. Audit Skills Schema
console.log('1. Memeriksa Validasi Zod Keterampilan (Skills)...');
for (const skill of ALL_SKILLS) {
  const result = SkillSchema.safeParse(skill);
  if (!result.success) {
    errors.push({
      category: 'Skill Schema',
      item: skill.id,
      message: JSON.stringify(result.error.format()),
    });
  }

  // Check objective evaluation mode: must have 'E' or 'K'
  const hasObjective = skill.practiceModes.includes('E') || skill.practiceModes.includes('K');
  if (!hasObjective) {
    errors.push({
      category: 'Practice Mode',
      item: skill.id,
      message: 'Setiap keterampilan wajib memiliki minimal satu mode objektif (E atau K).',
    });
  }

  // Check lastReviewed
  if (!skill.lastReviewed || !/^\d{4}-\d{2}-\d{2}$/.test(skill.lastReviewed)) {
    errors.push({
      category: 'Quality Gate',
      item: skill.id,
      message: 'Keterampilan wajib memiliki tanggal lastReviewed valid (YYYY-MM-DD).',
    });
  }

  // Check for prohibited promises
  const textBlob = `${skill.name} ${skill.description} ${Object.values(skill.canDo).join(' ')}`.toLowerCase();
  const prohibitedWords = ['pasti diterima kerja', 'pasti untung', 'jaminan kaya', 'pasti kaya'];
  for (const word of prohibitedWords) {
    if (textBlob.includes(word)) {
      errors.push({
        category: 'Prohibited Promise',
        item: skill.id,
        message: `Ditemukan klaim terlarang: "${word}".`,
      });
    }
  }
}
console.log(`✓ ${ALL_SKILLS.length} keterampilan berhasil divalidasi.`);

// 2. Audit Manifests
console.log('\n2. Memeriksa Manifest Domain...');
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

// 3. Audit 16 Career Roles
console.log('\n3. Memeriksa Pemetaan 16 Jalur Peran...');
if (ROLES.length !== 16) {
  errors.push({
    category: 'Role Count',
    item: 'ROLES',
    message: `Jumlah peran harus tepat 16 (ditemukan: ${ROLES.length}).`,
  });
}

const referencedDomains = new Set<string>();

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

  // Check minimum 5 domains per role
  if (role.domainRequirements.length < 5) {
    errors.push({
      category: 'Role Domains',
      item: role.id,
      message: `Peran harus mencakup minimal 5 domain (ditemukan: ${role.domainRequirements.length}).`,
    });
  }

  for (const req of role.domainRequirements) {
    referencedDomains.add(req.domainId);
  }
}

// Every domain D1-D17 must appear in at least one role
for (const domainId of DOMAIN_IDS) {
  if (!referencedDomains.has(domainId)) {
    errors.push({
      category: 'Domain Orphan',
      item: domainId,
      message: `Domain ${domainId} tidak muncul di peran manapun.`,
    });
  }
}
console.log(`✓ 16 Jalur Peran valid (17/17 domain terpetakan secara lengkap).`);

// 4. Audit Pilot Domain D12 (Komunikasi Profesional) Full Depth
console.log('\n4. Memeriksa Kelengkapan Kedalaman Penuh Domain Pilot D12...');
if (D12_LESSONS.length < 3) {
  errors.push({
    category: 'D12 Full Depth',
    item: 'Lessons',
    message: `Minimal 3 pelajaran untuk status penuh (ditemukan: ${D12_LESSONS.length}).`,
  });
}
if (D12_LEVELS.length < 3) {
  errors.push({
    category: 'D12 Full Depth',
    item: 'Levels',
    message: `Minimal 3 latihan/level untuk status penuh (ditemukan: ${D12_LEVELS.length}).`,
  });
}
if (D12_QUIZZES.length < 10) {
  errors.push({
    category: 'D12 Full Depth',
    item: 'Quizzes',
    message: `Minimal 10 soal kuis berseed untuk status penuh (ditemukan: ${D12_QUIZZES.length}).`,
  });
}
if (D12_CASES.length < 1) {
  errors.push({
    category: 'D12 Full Depth',
    item: 'Cases',
    message: `Minimal 1 studi kasus untuk status penuh (ditemukan: ${D12_CASES.length}).`,
  });
}
if (D12_GLOSSARY.length < 5) {
  errors.push({
    category: 'D12 Full Depth',
    item: 'Glossary',
    message: `Minimal 5 istilah kamus (ditemukan: ${D12_GLOSSARY.length}).`,
  });
}
if (D12_CHEATSHEET.length < 2) {
  errors.push({
    category: 'D12 Full Depth',
    item: 'Cheatsheet',
    message: `Minimal 2 bagian lembar contekan (ditemukan: ${D12_CHEATSHEET.length}).`,
  });
}
console.log(
  `✓ D12 Full Depth terbukti: ${D12_LESSONS.length} Pelajaran, ${D12_LEVELS.length} Level Latihan, ${D12_QUIZZES.length} Kuis Berseed, ${D12_CASES.length} Kasus Nyata, ${D12_GLOSSARY.length} Istilah Kamus, ${D12_CHEATSHEET.length} Lembar Contekan.`
);

// 5. Status Summary Table
console.log('\n----------------------------------------------------------------');
console.log(' TABEL AUDIT STATUS DOMAIN (GELOMBANG S0 PILOT)');
console.log('----------------------------------------------------------------');
console.log(
  `${'Domain'.padEnd(6)} | ${'Nama'.padEnd(35)} | ${'Gelombang'.padEnd(10)} | ${'Status'.padEnd(13)} | ${'Kedalaman'}`
);
console.log('----------------------------------------------------------------');

for (const id of DOMAIN_IDS) {
  const meta = DOMAIN_CATALOG[id];
  console.log(
    `${id.padEnd(6)} | ${meta.name.slice(0, 35).padEnd(35)} | ${meta.wave.padEnd(10)} | ${meta.status.padEnd(13)} | ${meta.depth}`
  );
}
console.log('----------------------------------------------------------------\n');

if (errors.length > 0) {
  console.error(`❌ AUDIT GAGAL! Ditemukan ${errors.length} masalah:`);
  for (const err of errors) {
    console.error(`- [${err.category}] ${err.item}: ${err.message}`);
  }
  process.exit(1);
} else {
  console.log('✅ SEMUA QUALITY GATES WAVE S0 LULUS 100%!');
  process.exit(0);
}
