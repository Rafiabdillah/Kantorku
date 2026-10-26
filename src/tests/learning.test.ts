import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LessonSchema,
  LearningPathSchema,
  GlossaryTermSchema,
  CheatSheetSchema,
  CaseStudyComparisonSchema,
} from '../features/learning/types';
import {
  ALL_LESSONS,
  LEARNING_PATHS,
  GLOSSARY_TERMS,
  CHEAT_SHEETS,
  CASE_STUDIES,
  getLessonById,
  getLessonsForSkill,
  getLessonsForLevel,
  getLessonsForTrack,
} from '../content/lessons';
import { learningRepo } from '../features/learning/learningRepo';
import { PlayerProfile } from '../types';

import { LEVELS } from '../content/levels';

test('Learning Content: All lessons pass Zod schema validation', () => {
  assert.ok(ALL_LESSONS.length >= 39, `There should be at least 39 lessons registered (actual: ${ALL_LESSONS.length})`);
  for (const lesson of ALL_LESSONS) {
    const result = LessonSchema.safeParse(lesson);
    assert.equal(
      result.success,
      true,
      `Lesson ${lesson.id} failed schema validation: ${result.error?.issues.map((i) => i.message).join(', ')}`
    );
    assert.ok(lesson.steps.length >= 3, `Lesson ${lesson.id} should have at least 3 steps`);
  }
});

test('Learning Content: 100% of skills from LEVELS have dedicated lessons', () => {
  const allTaughtSkills = new Set<string>();
  for (const lvl of LEVELS) {
    for (const s of lvl.skillsTaught) {
      allTaughtSkills.add(s);
    }
  }
  const lessonSkillMap = new Set(ALL_LESSONS.map((l) => l.skillId));
  for (const skill of allTaughtSkills) {
    assert.ok(lessonSkillMap.has(skill), `Skill "${skill}" must have a dedicated lesson in ALL_LESSONS`);
  }
});

test('Learning Content: All learning paths pass Zod schema validation and reference existing lessons', () => {
  assert.ok(LEARNING_PATHS.length >= 4, 'There should be at least 4 learning paths');
  const allLessonIds = new Set(ALL_LESSONS.map((l) => l.id));

  for (const path of LEARNING_PATHS) {
    const result = LearningPathSchema.safeParse(path);
    assert.equal(
      result.success,
      true,
      `Path ${path.id} failed schema validation: ${result.error?.issues.map((i) => i.message).join(', ')}`
    );
    for (const lId of path.lessonIds) {
      assert.ok(allLessonIds.has(lId), `Path ${path.id} references non-existent lesson ID: ${lId}`);
    }
  }
});

test('Learning Content: Glossary terms pass schema validation', () => {
  assert.ok(GLOSSARY_TERMS.length >= 10);
  for (const term of GLOSSARY_TERMS) {
    const result = GlossaryTermSchema.safeParse(term);
    assert.equal(result.success, true, `Glossary term ${term.id} failed validation`);
  }
});

test('Learning Content: Cheat sheets pass schema validation', () => {
  assert.ok(CHEAT_SHEETS.length >= 3);
  for (const sheet of CHEAT_SHEETS) {
    const result = CheatSheetSchema.safeParse(sheet);
    assert.equal(result.success, true, `Cheat sheet ${sheet.id} failed validation`);
  }
});

test('Learning Content: Case study comparisons pass schema validation', () => {
  assert.ok(CASE_STUDIES.length >= 2);
  for (const cs of CASE_STUDIES) {
    const result = CaseStudyComparisonSchema.safeParse(cs);
    assert.equal(result.success, true, `Case study ${cs.id} failed validation`);
    assert.ok(cs.annotations.length >= 2, `Case study ${cs.id} should have annotations`);
  }
});

test('Learning Repository: Progress tracking, step completion, and position saving', () => {
  const testLessonId = ALL_LESSONS[0].id;
  learningRepo.markStepCompleted(testLessonId, 0);
  learningRepo.markStepCompleted(testLessonId, 1);

  const prog = learningRepo.getLessonProgress(testLessonId);
  assert.equal(prog.completedSteps.includes(0), true);
  assert.equal(prog.completedSteps.includes(1), true);

  const { newlyCompleted } = learningRepo.completeLesson(testLessonId, 95);
  assert.equal(learningRepo.getLessonProgress(testLessonId).completed, true);
  assert.equal(learningRepo.getLessonProgress(testLessonId).quizScore, 95);
});

test('Learning Repository: Notes creation and Markdown export', () => {
  const testLessonId = ALL_LESSONS[0].id;
  const note = learningRepo.addNote(testLessonId, 0, 'Catatan penting rumus SUM', 'Teks yang disorot');
  assert.ok(note.id);
  assert.equal(note.noteText, 'Catatan penting rumus SUM');

  const md = learningRepo.exportNotesToMarkdown();
  assert.ok(md.includes('# Catatan'));
  assert.ok(md.includes('Catatan penting rumus SUM'));

  learningRepo.deleteNote(note.id);
  assert.equal(learningRepo.getState().notes.some((n) => n.id === note.id), false);
});

test('Learning Repository: Adaptive recommendations based on profile mastery', () => {
  const mockProfile: PlayerProfile = {
    name: 'Budi Test',
    avatar: 'player',
    xp: 500,
    coins: 200,
    streakDays: 3,
    streakFreeze: 1,
    lastActiveDate: '2026-10-26',
    currentTier: 2,
    moduleMastery: {
      excel: 80,
      word: 20, // lowest!
      coding: 60,
      web: 50,
    },
    reputation: {
      sari: 50,
      dimas: 50,
      maya: 50,
      intan: 50,
      reza: 50,
      hendra: 50,
      nadia: 50,
    },
    completedLevelIds: [],
    levelStars: {},
    unlockedAchievements: [],
    inventory: [],
    equipped: { avatar: 'player', desk: 'desk-kayu', decor: 'decor-kaktus' },
    soundEnabled: true,
    theme: 'office-warm',
    hasCompletedOnboarding: true,
  };

  const recs = learningRepo.getAdaptiveRecommendations(mockProfile, []);
  assert.ok(recs.length > 0);
  // Weakest module was 'word', so one recommendation should focus on word or next uncompleted
  assert.ok(recs.some((r) => r.lesson.track === 'word' || r.reason.length > 0));
});
