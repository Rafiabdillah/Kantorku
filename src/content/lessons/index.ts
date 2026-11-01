/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Pusat Belajar Central Registry
 */

import { Lesson, LessonTrack } from '../../features/learning/types';
import { EXCEL_LESSONS } from './excelLessons';
import { WORD_LESSONS } from './wordLessons';
import { WEB_LESSONS } from './webLessons';
import { CODING_LESSONS } from './codingLessons';
import { WEB_LESSONS_PATCH } from './webLessonsPatch';
import { CODING_LESSONS_PATCH } from './codingLessonsPatch';
import { WORD_LESSONS_PATCH } from './wordLessonsPatch';

export * from './paths';
export * from './glossary';
export * from './cheatSheets';
export * from './caseStudies';

export const ALL_LESSONS: Lesson[] = [
  ...EXCEL_LESSONS,
  ...WORD_LESSONS,
  ...WORD_LESSONS_PATCH,
  ...WEB_LESSONS,
  ...WEB_LESSONS_PATCH,
  ...CODING_LESSONS,
  ...CODING_LESSONS_PATCH,
];

const lessonsById = new Map<string, Lesson>(ALL_LESSONS.map((l) => [l.id, l]));

export function getLessonById(id: string): Lesson | undefined {
  return lessonsById.get(id);
}

export function getLessonsForSkill(skillId: string): Lesson[] {
  const norm = skillId.toLowerCase().trim();
  return ALL_LESSONS.filter(
    (l) =>
      l.skillId.toLowerCase().trim() === norm ||
      l.title.toLowerCase().includes(norm) ||
      l.glossaryTerms.some((g) => g.toLowerCase().includes(norm))
  );
}

export function getLessonsForLevel(levelId: string): Lesson[] {
  return ALL_LESSONS.filter((l) => l.relatedLevels.includes(levelId));
}

export function getLessonsForTrack(track: LessonTrack): Lesson[] {
  return ALL_LESSONS.filter((l) => l.track === track);
}

export function getQuickRefresherLessons(): Lesson[] {
  return ALL_LESSONS.filter((l) => l.isQuickRefresher);
}
