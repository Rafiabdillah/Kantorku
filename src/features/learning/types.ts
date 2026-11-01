/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Pusat Belajar (Learning Center) Types & Zod Schemas
 * PRD v6 specification compliant.
 */

import { z } from 'zod';
import { ModuleType, TierLevel, CharacterId } from '../../types';

// ============================================================================
// 1. Step Schemas
// ============================================================================

export const QuizQuestionTypeSchema = z.enum([
  'pilihan-ganda',
  'isian-singkat',
  'urutkan-langkah',
  'tebak-hasil',
  'temukan-kesalahan',
]);
export type QuizQuestionType = z.infer<typeof QuizQuestionTypeSchema>;

export const QuizQuestionSchema = z.object({
  id: z.string(),
  type: QuizQuestionTypeSchema,
  prompt: z.string().min(5),
  codeSnippet: z.string().optional(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.number(), z.array(z.string())]),
  explanation: z.string().min(5),
  hint: z.string().optional(),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const WalkthroughStepSchema = z.object({
  stepIndex: z.number(),
  instruction: z.string(),
  targetCell: z.string().optional(),
  targetCode: z.string().optional(),
  highlightLabel: z.string().optional(),
});
export type WalkthroughStep = z.infer<typeof WalkthroughStepSchema>;

export const StepExplanationSchema = z.object({
  type: z.literal('penjelasan'),
  title: z.string(),
  content: z.string(),
  analogy: z.string().optional(),
  officeContext: z.string().optional(),
  keyTerms: z.array(z.string()).optional(),
});

export const StepInteractiveExampleSchema = z.object({
  type: z.literal('contoh-interaktif'),
  title: z.string(),
  explanation: z.string(),
  editorType: z.enum(['excel', 'word', 'coding', 'web']),
  initialData: z.record(z.string(), z.any()),
  expectedResult: z.any().optional(),
  walkthrough: z.array(WalkthroughStepSchema),
});

export const StepTryYourselfSchema = z.object({
  type: z.literal('coba-sendiri'),
  title: z.string(),
  instruction: z.string(),
  editorType: z.enum(['excel', 'word', 'coding', 'web']),
  initialData: z.record(z.string(), z.any()),
  validationHint: z.string(),
  expectedFormula: z.string().optional(),
  expectedOutput: z.any().optional(),
});

export const StepQuizSchema = z.object({
  type: z.literal('kuis'),
  title: z.string(),
  questions: z.array(QuizQuestionSchema).min(1),
});

export const StepSummarySchema = z.object({
  type: z.literal('ringkasan'),
  title: z.string(),
  points: z.tuple([z.string(), z.string(), z.string()]),
});

export const StepTipsSchema = z.object({
  type: z.literal('tips'),
  title: z.string(),
  content: z.string(),
  badge: z.string().optional(),
});

export const StepSchema = z.discriminatedUnion('type', [
  StepExplanationSchema,
  StepInteractiveExampleSchema,
  StepTryYourselfSchema,
  StepQuizSchema,
  StepSummarySchema,
  StepTipsSchema,
]);
export type LessonStep = z.infer<typeof StepSchema>;

// ============================================================================
// 2. Lesson Schema
// ============================================================================

export const LessonTrackSchema = z.enum(['excel', 'word', 'web', 'coding']);
export type LessonTrack = z.infer<typeof LessonTrackSchema>;

export const LessonSchema = z.object({
  id: z.string().min(3),
  track: LessonTrackSchema,
  tier: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
    z.literal(7),
  ]),
  skillId: z.string().min(2),
  title: z.string().min(3),
  objectives: z.array(z.string()).min(1),
  estimatedMinutes: z.number().min(1).max(30),
  prerequisites: z.array(z.string()),
  steps: z.array(StepSchema).min(1),
  commonMistakes: z.array(z.string()).min(1),
  glossaryTerms: z.array(z.string()),
  relatedLevels: z.array(z.string()),
  relatedCaseFiles: z.array(z.string()),
  cheatSheetId: z.string().optional(),
  characterIntro: z
    .object({
      characterId: z.enum(['sari', 'dimas', 'maya', 'intan', 'reza', 'hendra', 'nadia']),
      dialogue: z.string(),
      tip: z.string(),
    })
    .optional(),
  isQuickRefresher: z.boolean().optional(),
});
export type Lesson = z.infer<typeof LessonSchema>;

// ============================================================================
// 3. Learning Path Schema
// ============================================================================

export const LearningPathSchema = z.object({
  id: z.string().min(3),
  title: z.string().min(3),
  description: z.string(),
  goal: z.string(), // "Setelah jalur ini kamu bisa..."
  targetAudience: z.string(),
  module: z.enum(['excel', 'word', 'coding', 'web']),
  lessonIds: z.array(z.string()).min(1),
  estimatedHours: z.string(),
  badge: z.string(),
  isCustom: z.boolean().optional(),
  author: z.string().optional(), // For custom classroom tracks
  mandatoryLessonIds: z.array(z.string()).optional(),
});
export type LearningPath = z.infer<typeof LearningPathSchema>;

// ============================================================================
// 4. Glossary & Cheat Sheet Schemas
// ============================================================================

export const GlossaryTermSchema = z.object({
  id: z.string(),
  term: z.string(),
  englishTerm: z.string().optional(),
  category: z.enum(['excel', 'word', 'web', 'coding', 'bisnis']),
  definition: z.string(),
  syntax: z.string().optional(),
  arguments: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        description: z.string(),
        required: z.boolean(),
      })
    )
    .optional(),
  example: z.string(),
  commonMistake: z.string().optional(),
  relatedSkills: z.array(z.string()).optional(),
});
export type GlossaryTerm = z.infer<typeof GlossaryTermSchema>;

export const CheatSheetSectionSchema = z.object({
  heading: z.string(),
  items: z.array(
    z.object({
      label: z.string(),
      codeOrShortcut: z.string(),
      description: z.string(),
      tip: z.string().optional(),
    })
  ),
});

export const CheatSheetSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: stringOrUndefined(),
  track: LessonTrackSchema,
  tier: z.number().optional(),
  sections: z.array(CheatSheetSectionSchema),
  footerNote: z.string().optional(),
});
function stringOrUndefined() {
  return z.string().optional();
}
export type CheatSheet = z.infer<typeof CheatSheetSchema>;

// ============================================================================
// 5. Case Study (Bedah Kasus) Schema
// ============================================================================

export const CaseStudyAnnotationSchema = z.object({
  id: z.string(),
  highlightLabel: z.string(),
  problemTitle: z.string(),
  problemExplanation: z.string(),
  solutionFix: z.string(),
  targetSide: z.enum(['bad', 'good']),
});
export type CaseStudyAnnotation = z.infer<typeof CaseStudyAnnotationSchema>;

export const CaseStudyComparisonSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(['word-bisnis', 'word-akademik', 'web-usaha', 'web-landing']),
  summary: z.string(),
  badDocument: z.object({
    title: z.string().optional(),
    contentHtml: z.string(),
  }),
  goodDocument: z.object({
    title: z.string().optional(),
    contentHtml: z.string(),
  }),
  annotations: z.array(CaseStudyAnnotationSchema),
  learningPoints: z.array(z.string()),
  relatedLessonId: z.string().optional(),
});
export type CaseStudyComparison = z.infer<typeof CaseStudyComparisonSchema>;

// ============================================================================
// 6. User Learning Progress & Notes Schema
// ============================================================================

export type LearningMode = 'cepat' | 'lengkap' | 'mandiri';
export type FontSizeSetting = 'sm' | 'base' | 'lg' | 'xl';

export interface UserNote {
  id: string;
  lessonId: string;
  stepIndex: number;
  highlightText?: string;
  noteText: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedSteps: number[]; // indices of completed steps
  currentStepIndex: number;
  lastAccessed: string;
  quizScore?: number; // 0-100
  favorite?: boolean;
}

export interface UserLearningState {
  progress: Record<string, LessonProgress>; // lessonId -> LessonProgress
  notes: UserNote[];
  bookmarkedLessonIds: string[];
  preferredMode: LearningMode;
  fontSize: FontSizeSetting;
  voiceRate: number; // 0.75 - 1.5
  showCharacterIntros: boolean;
  customPaths: LearningPath[];
}
