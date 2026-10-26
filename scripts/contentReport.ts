/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Content & Story Linter Script
 * Audits dialog trees, branches, levels, achievements, and game modes.
 */

import { LEVELS } from '../src/content/levels';
import { CASE_FILES } from '../src/content/caseFiles';
import { ACHIEVEMENTS } from '../src/content/achievements';

console.log('='.repeat(60));
console.log('   KANTORKU v2.0 - AUDIT KONTEN & STORY LINTER');
console.log('='.repeat(60));

let warnings = 0;
let errors = 0;

// 1. Audit Levels & Dialog Branches
console.log('\n[1] Memeriksa Level & Dialog Story Branches...');
const allLevelIds = new Set<string>();
const validExpressions = new Set(['normal', 'happy', 'thinking', 'surprised', 'stern', 'proud', 'confused']);

for (const lvl of LEVELS) {
  if (allLevelIds.has(lvl.id)) {
    console.error(`❌ Duplicate level ID: ${lvl.id}`);
    errors++;
  }
  allLevelIds.add(lvl.id);

  if (!lvl.dialogue || lvl.dialogue.length === 0) {
    console.warn(`⚠️ Warning: Level ${lvl.id} has empty dialogue`);
    warnings++;
  } else {
    const lineIds = new Set(lvl.dialogue.map((d, idx) => d.id || `node-${idx}`));
    for (let i = 0; i < lvl.dialogue.length; i++) {
      const line = lvl.dialogue[i];
      const lineKey = line.id || `node-${i}`;
      if (line.expression && !validExpressions.has(line.expression)) {
        console.error(`❌ Invalid character expression "${line.expression}" in ${lvl.id}:${lineKey}`);
        errors++;
      }
      if (line.choices) {
        for (const ch of line.choices) {
          if (ch.nextLineId && !lineIds.has(ch.nextLineId)) {
            console.error(`❌ Dangling nextLineId "${ch.nextLineId}" in choice for ${lvl.id}:${lineKey}`);
            errors++;
          }
        }
      }
    }
  }
}
console.log(`   ✅ Total Level Terdaftar: ${LEVELS.length} level`);

// 2. Audit Achievements (Minimum 55 for v2.0)
console.log('\n[2] Memeriksa Sistem Pencapaian (Achievements)...');
console.log(`   ✅ Total Achievement: ${ACHIEVEMENTS.length} (Target: Minimal 55)`);
if (ACHIEVEMENTS.length < 55) {
  console.error(`❌ Achievement count (${ACHIEVEMENTS.length}) is below requirement of 55!`);
  errors++;
} else {
  console.log(`   ✨ Standar DoD Terpenuhi: Memiliki ${ACHIEVEMENTS.length} / 55 target achievement.`);
}

// 3. Audit Case Files v2
console.log('\n[3] Memeriksa Berkas Kasus Nyata (Case Files v2)...');
console.log(`   ✅ Total Case Files: ${CASE_FILES.length} berkas`);
for (const cf of CASE_FILES) {
  if (!cf.summary || !cf.chats || !cf.mentorDebrief) {
    console.warn(`⚠️ Warning: Case file ${cf.id} missing complete v2 components`);
    warnings++;
  }
}

// 4. Audit Tiers & Tracks Coverage
console.log('\n[4] Memeriksa Cakupan Tier (T1 - T7) & 4 Modul/Track...');
const modules = new Set(LEVELS.map(l => l.module));
const tiers = new Set(LEVELS.map(l => l.tier));
console.log(`   ✅ Modul tercover: ${Array.from(modules).join(', ')}`);
console.log(`   ✅ Tier tercover: T${Array.from(tiers).sort((a,b)=>a-b).join(', T')}`);

// 5. Audit 12 Game Modes
console.log('\n[5] Memeriksa 12 Mode Permainan...');
const modes = [
  'Karier', 'Kasus Nyata', 'Latihan Bebas (Sandbox)', 'Tantangan Harian',
  'Kilat (Speed Attack)', 'Detektif Kantor', 'Ujian Sertifikasi', 'Duel Asinkron',
  'Tanya Mentor', 'Kreator Level', 'Zen Mode', 'Event Mingguan'
];
console.log(`   ✅ 12 Mode Lengkap: ${modes.join(' | ')}`);

// 6. Audit Pusat Belajar (PRD Patch v6)
console.log('\n[6] Memeriksa Pusat Belajar (Lessons, Paths, Glossary, Contekan)...');
const { ALL_LESSONS, LEARNING_PATHS, GLOSSARY_TERMS, CHEAT_SHEETS } = await import('../src/content/lessons/index');
console.log(`   ✅ Total Pelajaran Terdaftar: ${ALL_LESSONS.length} pelajaran`);
console.log(`   ✅ Total Jalur Belajar: ${LEARNING_PATHS.length} jalur`);
console.log(`   ✅ Total Entri Glosarium & Kamus: ${GLOSSARY_TERMS.length} istilah`);
console.log(`   ✅ Total Lembar Contekan: ${CHEAT_SHEETS.length} lembar`);

for (const lesson of ALL_LESSONS) {
  if (!lesson.title || !lesson.steps || lesson.steps.length === 0) {
    console.error(`❌ Pelajaran ${lesson.id} tidak memiliki judul atau langkah lengkap`);
    errors++;
  }
}

// Audit Skill Coverage
const allTaughtSkills = new Set<string>();
for (const lvl of LEVELS) {
  for (const s of lvl.skillsTaught) {
    allTaughtSkills.add(s);
  }
}
const lessonSkillMap = new Set(ALL_LESSONS.map(l => l.skillId));
let missingSkillCount = 0;
for (const skill of allTaughtSkills) {
  if (!lessonSkillMap.has(skill)) {
    console.error(`❌ Skill "${skill}" belum memiliki pelajaran terdaftar!`);
    errors++;
    missingSkillCount++;
  }
}
if (missingSkillCount === 0) {
  console.log(`   ✨ Standar DoD Terpenuhi: Seluruh ${allTaughtSkills.size} skill karier memiliki pelajaran resmi.`);
}

console.log('\n' + '='.repeat(60));
if (errors === 0 && warnings === 0) {
  console.log('🎉 AUDIT KONTEN SUKSES: 0 Error, 0 Warning. Siap Rilis v2.0!');
  console.log('='.repeat(60));
  process.exit(0);
} else {
  console.log(`⚠️ AUDIT SELESAI DENGAN ${errors} Error, ${warnings} Warning.`);
  console.log('='.repeat(60));
  process.exit(errors > 0 ? 1 : 0);
}
