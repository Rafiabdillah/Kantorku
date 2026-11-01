/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Learning Repository & Progress Service
 */

import {
  UserLearningState,
  UserNote,
  LessonProgress,
  LearningMode,
  FontSizeSetting,
  LearningPath,
  Lesson,
} from './types';
import { ALL_LESSONS, LEARNING_PATHS, getLessonById } from '../../content/lessons';
import { PlayerProfile, ErrorLogItem } from '../../types';

const STORAGE_KEY = 'kantorku_learning_progress_v2';

const DEFAULT_STATE: UserLearningState = {
  progress: {},
  notes: [],
  bookmarkedLessonIds: [],
  preferredMode: 'lengkap',
  fontSize: 'base',
  voiceRate: 1.0,
  showCharacterIntros: true,
  customPaths: [],
};

class LearningRepository {
  private state: UserLearningState = DEFAULT_STATE;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.state = {
          ...DEFAULT_STATE,
          ...parsed,
          progress: parsed.progress || {},
          notes: parsed.notes || [],
          bookmarkedLessonIds: parsed.bookmarkedLessonIds || [],
          customPaths: parsed.customPaths || [],
        };
      }
    } catch {
      this.state = DEFAULT_STATE;
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Storage quota or iframe security fallback
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      try {
        listener();
      } catch {
        // Safe dispatch
      }
    }
  }

  public getState(): UserLearningState {
    return this.state;
  }

  public getLessonProgress(lessonId: string): LessonProgress {
    return (
      this.state.progress[lessonId] || {
        lessonId,
        completed: false,
        completedSteps: [],
        currentStepIndex: 0,
        lastAccessed: new Date().toISOString(),
      }
    );
  }

  public markStepCompleted(lessonId: string, stepIndex: number): void {
    const prev = this.getLessonProgress(lessonId);
    const stepsSet = new Set(prev.completedSteps);
    stepsSet.add(stepIndex);

    this.state.progress[lessonId] = {
      ...prev,
      completedSteps: Array.from(stepsSet),
      currentStepIndex: stepIndex,
      lastAccessed: new Date().toISOString(),
    };
    this.save();
  }

  public completeLesson(lessonId: string, quizScore = 100): { newlyCompleted: boolean } {
    const prev = this.getLessonProgress(lessonId);
    const wasCompleted = prev.completed;

    this.state.progress[lessonId] = {
      ...prev,
      completed: true,
      quizScore,
      lastAccessed: new Date().toISOString(),
    };
    this.save();
    return { newlyCompleted: !wasCompleted };
  }

  public saveReadingPosition(lessonId: string, stepIndex: number): void {
    const prev = this.getLessonProgress(lessonId);
    this.state.progress[lessonId] = {
      ...prev,
      currentStepIndex: stepIndex,
      lastAccessed: new Date().toISOString(),
    };
    this.save();
  }

  public setPreferredMode(mode: LearningMode): void {
    this.state.preferredMode = mode;
    this.save();
  }

  public setFontSize(size: FontSizeSetting): void {
    this.state.fontSize = size;
    this.save();
  }

  public setVoiceRate(rate: number): void {
    this.state.voiceRate = rate;
    this.save();
  }

  public setShowCharacterIntros(show: boolean): void {
    this.state.showCharacterIntros = show;
    this.save();
  }

  public toggleBookmark(lessonId: string): boolean {
    const exists = this.state.bookmarkedLessonIds.includes(lessonId);
    if (exists) {
      this.state.bookmarkedLessonIds = this.state.bookmarkedLessonIds.filter((id) => id !== lessonId);
    } else {
      this.state.bookmarkedLessonIds.push(lessonId);
    }
    this.save();
    return !exists;
  }

  public addNote(lessonId: string, stepIndex: number, noteText: string, highlightText?: string): UserNote {
    const note: UserNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      lessonId,
      stepIndex,
      noteText,
      highlightText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.state.notes.unshift(note);
    this.save();
    return note;
  }

  public deleteNote(noteId: string): void {
    this.state.notes = this.state.notes.filter((n) => n.id !== noteId);
    this.save();
  }

  public addCustomClassroomPath(path: LearningPath): void {
    const newPath: LearningPath = {
      ...path,
      isCustom: true,
    };
    this.state.customPaths.push(newPath);
    this.save();
  }

  public getAllPaths(): LearningPath[] {
    return [...LEARNING_PATHS, ...this.state.customPaths];
  }

  /**
   * Adaptive recommendations based on:
   * 1. Player's lowest moduleMastery
   * 2. Recent errors in ErrorNotebook
   * 3. Next uncompleted lesson in active tracks
   */
  public getAdaptiveRecommendations(
    profile: PlayerProfile,
    errorLogs: ErrorLogItem[] = []
  ): { reason: string; lesson: Lesson }[] {
    const recs: { reason: string; lesson: Lesson }[] = [];
    const completedSet = new Set(
      Object.keys(this.state.progress).filter((id) => this.state.progress[id]?.completed)
    );

    // 1. From unresolved error notebook items
    const unresolvedErrors = errorLogs.filter((e) => !e.resolved);
    if (unresolvedErrors.length > 0) {
      const latestError = unresolvedErrors[0];
      const match = ALL_LESSONS.find(
        (l) => l.relatedLevels.includes(latestError.levelId) || l.track === latestError.module
      );
      if (match) {
        recs.push({
          reason: `Penyembuh Kesalahan: Berdasarkan kesalahan terbaru di level ${latestError.levelTitle}`,
          lesson: match,
        });
      }
    }

    // 2. From lowest module mastery
    const modules: ('excel' | 'word' | 'coding' | 'web')[] = ['excel', 'word', 'coding', 'web'];
    const sortedModules = [...modules].sort(
      (a, b) => (profile.moduleMastery[a] || 0) - (profile.moduleMastery[b] || 0)
    );
    const weakestModule = sortedModules[0];

    const nextWeakestLesson = ALL_LESSONS.find(
      (l) => l.track === weakestModule && !completedSet.has(l.id)
    );
    if (nextWeakestLesson && !recs.some((r) => r.lesson.id === nextWeakestLesson.id)) {
      recs.push({
        reason: `Penguatan Pilar: Modul ${weakestModule.toUpperCase()} adalah area yang paling potensial kamu tingkatkan!`,
        lesson: nextWeakestLesson,
      });
    }

    // 3. Fallback to uncompleted lessons
    for (const l of ALL_LESSONS) {
      if (!completedSet.has(l.id) && !recs.some((r) => r.lesson.id === l.id)) {
        recs.push({
          reason: 'Langkah Karier Berikutnya: Pelajaran esensial untuk naik tingkat',
          lesson: l,
        });
        if (recs.length >= 3) break;
      }
    }

    if (recs.length === 0 && ALL_LESSONS.length > 0) {
      recs.push({
        reason: 'Penyegaran Kilat: Ulas kembali konsep penting kapan saja',
        lesson: ALL_LESSONS[0],
      });
    }

    return recs;
  }

  public exportNotesToMarkdown(): string {
    if (this.state.notes.length === 0) {
      return '# Catatan Belajar KantorKu\n\nBelum ada catatan yang tersimpan.';
    }

    let md = `# Catatan & Sorotan Belajar KantorKu v2.0\n`;
    md += `*Diekspor pada: ${new Date().toLocaleDateString('id-ID')}*\n\n`;

    for (const note of this.state.notes) {
      const lesson = getLessonById(note.lessonId);
      const title = lesson ? lesson.title : note.lessonId;
      md += `## ${title} (Langkah ${note.stepIndex + 1})\n`;
      if (note.highlightText) {
        md += `> **Teks Disorot:** "${note.highlightText}"\n\n`;
      }
      md += `${note.noteText}\n\n`;
      md += `---\n\n`;
    }

    return md;
  }
}

export const learningRepo = new LearningRepository();
