/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Lesson Reader (Pembaca Pelajaran)
 * Includes 3 modes, Web Speech API TTS, step progress, notes, instant quizzes, and mini-editor.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Lesson, LearningMode, FontSizeSetting, QuizQuestion } from '../types';
import { learningRepo } from '../learningRepo';
import { InteractiveMiniEditor } from './InteractiveMiniEditor';
import { CharacterAvatar } from '../../../components/character/CharacterAvatar';
import { sound } from '../../../services/sound';
import { useGameStore } from '../../../store/useGameStore';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Bookmark,
  FileDown,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  StickyNote,
  ChevronDown,
  ChevronUp,
  Printer,
  Check,
  AlertCircle,
  Award,
} from 'lucide-react';

interface LessonReaderViewProps {
  lesson: Lesson;
  initialStepIndex?: number;
  onBack: () => void;
  onOpenLevel?: (levelId: string) => void;
  onOpenCaseFile?: (caseId: string) => void;
}

export const LessonReaderView: React.FC<LessonReaderViewProps> = ({
  lesson,
  initialStepIndex = 0,
  onBack,
  onOpenLevel,
  onOpenCaseFile,
}) => {
  const [learningState, setLearningState] = useState(learningRepo.getState());
  const progress = learningRepo.getLessonProgress(lesson.id);

  const [currentStep, setCurrentStep] = useState<number>(
    initialStepIndex || progress.currentStepIndex || 0
  );
  const [learningMode, setLearningMode] = useState<LearningMode>(learningState.preferredMode);
  const [fontSize, setFontSize] = useState<FontSizeSetting>(learningState.fontSize);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [userSelectedText, setUserSelectedText] = useState<string>('');

  // Web Speech API State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [speechWarning, setSpeechWarning] = useState<string | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);

  // Mandiri Mode Collapsible Accordion State
  const [mandiriExpanded, setMandiriExpanded] = useState<boolean>(false);

  useEffect(() => {
    const unsub = learningRepo.subscribe(() => {
      setLearningState({ ...learningRepo.getState() });
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    learningRepo.saveReadingPosition(lesson.id, currentStep);
  }, [lesson.id, currentStep]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  const totalSteps = lesson.steps.length;
  const activeStep = lesson.steps[currentStep] || lesson.steps[0];
  const isBookmarked = learningState.bookmarkedLessonIds.includes(lesson.id);

  // Handle Step Navigation
  const handleNextStep = () => {
    sound.playClick();
    learningRepo.markStepCompleted(lesson.id, currentStep);

    if (currentStep + 1 < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all steps!
      const { newlyCompleted } = learningRepo.completeLesson(lesson.id);
      if (newlyCompleted) {
        sound.playSuccess();
        useGameStore.getState().recordLessonStreak();
      }
    }
  };

  const handlePrevStep = () => {
    sound.playClick();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Text-To-Speech Reader using Web Speech API
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      setSpeechWarning('Peramban web ini tidak mendukung fitur Web Speech API suara.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Extract text from current step
    let textToRead = `${activeStep.title}. `;
    if (activeStep.type === 'penjelasan') {
      textToRead += `${activeStep.content} ${activeStep.analogy || ''}`;
    } else if (activeStep.type === 'ringkasan') {
      textToRead += activeStep.points.join('. ');
    } else if (activeStep.type === 'tips') {
      textToRead += activeStep.content;
    } else {
      textToRead += 'Langkah latihan interaktif. Kerjakan tugas pada editor di layar.';
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = learningState.voiceRate || 1.0;

    // Pick Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find((v) => v.lang.startsWith('id') || v.name.toLowerCase().includes('indonesia'));
    if (idVoice) {
      utterance.voice = idVoice;
      utterance.lang = 'id-ID';
    } else {
      utterance.lang = 'id-ID';
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeechWarning('Gagal memutar audio TTS suara bahasa Indonesia.');
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Handle Note & Text Selection
  const handleCaptureSelection = () => {
    const sel = window.getSelection()?.toString().trim();
    if (sel) {
      setUserSelectedText(sel);
      setShowNotesDrawer(true);
    }
  };

  const handleSaveNote = () => {
    if (!newNoteText.trim()) return;
    learningRepo.addNote(lesson.id, currentStep, newNoteText.trim(), userSelectedText || undefined);
    setNewNoteText('');
    setUserSelectedText('');
    sound.playSuccess();
  };

  // Font Size CSS Helper
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-xs md:text-sm leading-relaxed';
      case 'lg':
        return 'text-base md:text-lg leading-loose';
      case 'xl':
        return 'text-lg md:text-xl leading-loose font-medium';
      default:
        return 'text-sm md:text-base leading-relaxed';
    }
  };

  return (
    <div
      onMouseUp={handleCaptureSelection}
      className={`flex flex-col w-full max-w-4xl mx-auto pb-16 transition-all ${
        isFocusMode ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto max-w-full' : 'gap-5'
      }`}
    >
      {/* Top Header & Toolbars */}
      <div className="bg-white rounded-3xl p-4 md:p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition cursor-pointer"
              title="Kembali ke Pusat Belajar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                  Tier {lesson.tier} • {lesson.track.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-700">{lesson.skillId}</span>
              </div>
              <h1 className="text-lg md:text-xl font-black text-slate-900 mt-0.5">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Quick Actions (Audio, Text Size, Bookmark, Focus) */}
          <div className="flex items-center gap-1.5">
            {speechSupported && (
              <button
                type="button"
                onClick={handleToggleSpeech}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-100 border-amber-300 text-amber-800 animate-pulse'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                }`}
                title={isSpeaking ? 'Hentikan Pembacaan' : 'Bacakan Pelajaran (TTS Indonesia)'}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                const nextSize: Record<FontSizeSetting, FontSizeSetting> = {
                  sm: 'base',
                  base: 'lg',
                  lg: 'xl',
                  xl: 'sm',
                };
                const next = nextSize[fontSize];
                setFontSize(next);
                learningRepo.setFontSize(next);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer"
              title="Ubah Ukuran Teks"
            >
              A{fontSize === 'xl' ? '++' : fontSize === 'lg' ? '+' : ''}
            </button>

            <button
              type="button"
              onClick={() => learningRepo.toggleBookmark(lesson.id)}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400'
              }`}
              title="Tandai / Simpan Pelajaran"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => setShowNotesDrawer(!showNotesDrawer)}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
              title="Catatan Pribadi"
            >
              <StickyNote className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                window.print();
              }}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
              title="Cetak / Simpan Pelajaran ke PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
              title={isFocusMode ? 'Keluar Mode Fokus' : 'Mode Fokus Bebas Gangguan'}
            >
              {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 3 Learning Modes Switcher (Cepat, Lengkap, Mandiri) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl font-semibold">
            <button
              type="button"
              onClick={() => {
                setLearningMode('cepat');
                learningRepo.setPreferredMode('cepat');
              }}
              className={`px-3 py-1 rounded-lg transition ${
                learningMode === 'cepat' ? 'bg-white shadow-xs text-emerald-800 font-bold' : 'text-slate-600'
              }`}
            >
              ⚡ Mode Cepat (Inti)
            </button>
            <button
              type="button"
              onClick={() => {
                setLearningMode('lengkap');
                learningRepo.setPreferredMode('lengkap');
              }}
              className={`px-3 py-1 rounded-lg transition ${
                learningMode === 'lengkap' ? 'bg-white shadow-xs text-emerald-800 font-bold' : 'text-slate-600'
              }`}
            >
              📖 Mode Lengkap (Analogi)
            </button>
            <button
              type="button"
              onClick={() => {
                setLearningMode('mandiri');
                learningRepo.setPreferredMode('mandiri');
              }}
              className={`px-3 py-1 rounded-lg transition ${
                learningMode === 'mandiri' ? 'bg-white shadow-xs text-emerald-800 font-bold' : 'text-slate-600'
              }`}
            >
              🛠️ Mode Mandiri (Praktik Langsung)
            </button>
          </div>

          <div className="text-slate-400 text-[11px] font-mono">
            Langkah {currentStep + 1} dari {totalSteps}
          </div>
        </div>

        {/* Interactive Step Stepper Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {lesson.steps.map((st, idx) => {
            const isCurrent = currentStep === idx;
            const isStepCompleted = progress.completedSteps.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setCurrentStep(idx);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isStepCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title={`Langkah ${idx + 1}: ${st.title}`}
              >
                {isStepCompleted && !isCurrent ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                )}
                <span className="truncate max-w-[130px]">{st.title}</span>
              </button>
            );
          })}
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-600 h-1.5 transition-all duration-300"
            style={{ width: `${Math.round(((currentStep + 1) / totalSteps) * 100)}%` }}
          />
        </div>
      </div>

      {/* Speech Warning Alert */}
      {speechWarning && (
        <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-2xl text-xs flex items-center justify-between">
          <span>{speechWarning}</span>
          <button
            type="button"
            onClick={() => setSpeechWarning(null)}
            className="text-amber-700 font-bold ml-2 cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Character Introduction Dialog */}
      {lesson.characterIntro && learningState.showCharacterIntros && currentStep === 0 && (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 shadow-xs flex items-start gap-3 animate-in fade-in duration-300">
          <CharacterAvatar id={lesson.characterIntro.characterId} size="md" />
          <div className="flex-1">
            <div className="text-xs font-bold text-emerald-950 uppercase">
              Catatan Pembuka {lesson.characterIntro.characterId.toUpperCase()}
            </div>
            <p className="text-xs text-emerald-900 mt-1 italic">
              "{lesson.characterIntro.dialogue}"
            </p>
            <div className="mt-2 text-[11px] font-semibold text-emerald-800 bg-white/80 p-2 rounded-lg border border-emerald-300/40">
              💡 Saran: {lesson.characterIntro.tip}
            </div>
          </div>
        </div>
      )}

      {/* Main Step Content Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm flex flex-col gap-6">
        {/* Step Title Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
              {currentStep + 1}
            </span>
            <h2 className="text-base md:text-lg font-bold text-slate-900">{activeStep.title}</h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
            {activeStep.type}
          </span>
        </div>

        {/* 1. PENJELASAN STEP */}
        {activeStep.type === 'penjelasan' && (
          <div className={`space-y-4 text-slate-700 ${getFontSizeClass()}`}>
            {/* Mandiri mode folding */}
            {learningMode === 'mandiri' && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer" onClick={() => setMandiriExpanded(!mandiriExpanded)}>
                <span className="text-xs font-semibold text-slate-700">Teori disembunyikan di Mode Mandiri.</span>
                <button type="button" className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <span>{mandiriExpanded ? 'Tutup Teori' : 'Buka Teori'}</span>
                  {mandiriExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            )}

            {(learningMode !== 'mandiri' || mandiriExpanded) && (
              <>
                <p className="leading-relaxed">{activeStep.content}</p>

                {learningMode === 'lengkap' && activeStep.analogy && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs md:text-sm">
                    <span className="font-bold block mb-1">💡 Analogi Sehari-Hari:</span>
                    {activeStep.analogy}
                  </div>
                )}

                {activeStep.officeContext && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs md:text-sm">
                    <span className="font-bold block mb-1">🏢 Konteks Kantor Nyata:</span>
                    {activeStep.officeContext}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* 2. CONTOH INTERAKTIF STEP */}
        {activeStep.type === 'contoh-interaktif' && (
          <div className="space-y-4">
            <p className={`text-slate-700 ${getFontSizeClass()}`}>{activeStep.explanation}</p>
            <InteractiveMiniEditor
              editorType={activeStep.editorType}
              initialData={activeStep.initialData}
              expectedResult={activeStep.expectedResult}
              walkthrough={activeStep.walkthrough}
            />
          </div>
        )}

        {/* 3. COBA SENDIRI STEP */}
        {activeStep.type === 'coba-sendiri' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 text-xs md:text-sm font-medium">
              🎯 <strong>Instruksi Mandiri:</strong> {activeStep.instruction}
            </div>
            <InteractiveMiniEditor
              editorType={activeStep.editorType}
              initialData={activeStep.initialData}
              expectedResult={activeStep.expectedOutput || activeStep.expectedFormula}
              instruction={activeStep.validationHint}
            />
          </div>
        )}

        {/* 4. KUIS STEP */}
        {activeStep.type === 'kuis' && (
          <div className="space-y-6">
            <div className="text-xs text-slate-500">
              Uji pemahamanmu! Tidak ada penalti XP. Pilih jawaban dan cek penjelasannya langsung.
            </div>

            {activeStep.questions.map((q: QuizQuestion, qIdx: number) => {
              const selected = quizAnswers[q.id];
              const isSubmitted = submittedQuiz;
              const isCorrect = selected === q.correctAnswer;

              return (
                <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="font-bold text-slate-900 text-sm">
                    {qIdx + 1}. {q.prompt}
                  </div>

                  {q.options && (
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selected === opt;
                        const isThisCorrect = opt === q.correctAnswer;

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => {
                              if (!submittedQuiz) {
                                setQuizAnswers({ ...quizAnswers, [q.id]: opt });
                              }
                            }}
                            className={`w-full p-3 rounded-xl text-xs text-left font-medium transition flex items-center justify-between border cursor-pointer ${
                              isThisSelected
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                                : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                            } ${
                              isSubmitted && isThisCorrect ? 'ring-2 ring-emerald-500 bg-emerald-100/60' : ''
                            }`}
                          >
                            <span>{opt}</span>
                            {isThisSelected && !isSubmitted && (
                              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isSubmitted && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isSubmitted && (
                    <div
                      className={`p-3 rounded-xl text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          : 'bg-rose-100 text-rose-900 border border-rose-200'
                      }`}
                    >
                      <strong>{isCorrect ? '✅ Tepat Sekali!' : '❌ Belum Benar.'}</strong>{' '}
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex justify-end">
              {!submittedQuiz ? (
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedQuiz(true);
                    sound.playClick();
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Cek Jawaban Kuis
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedQuiz(false);
                    setQuizAnswers({});
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Ulangi Kuis
                </button>
              )}
            </div>
          </div>
        )}

        {/* 5. RINGKASAN STEP */}
        {activeStep.type === 'ringkasan' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800">3 Poin Inti yang Harus Diingat:</h3>
            <div className="space-y-3">
              {activeStep.points.map((pt: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs md:text-sm text-emerald-950 font-medium leading-relaxed">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. TIPS STEP */}
        {activeStep.type === 'tips' && (
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{activeStep.badge || 'Kiat Praktis Dunia Kerja'}</span>
            </div>
            <p className={`text-slate-800 ${getFontSizeClass()}`}>{activeStep.content}</p>
          </div>
        )}

        {/* Two-Way Links Card (Tautan ke Level Latihan & Case Files) */}
        {currentStep === totalSteps - 1 && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wide">
              Latihan Terkait di Kantor PT Maju Sejahtera:
            </h4>
            <div className="flex flex-wrap gap-2">
              {lesson.relatedLevels.map((lvlId) => (
                <button
                  key={lvlId}
                  type="button"
                  onClick={() => onOpenLevel && onOpenLevel(lvlId)}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>Kerjakan Misi {lvlId}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ))}

              {lesson.relatedCaseFiles.map((caseId) => (
                <button
                  key={caseId}
                  type="button"
                  onClick={() => onOpenCaseFile && onOpenCaseFile(caseId)}
                  className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>Buka Kasus Nyata ({caseId})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Step Stepper Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
          >
            <span>{currentStep + 1 === totalSteps ? 'Selesaikan Pelajaran' : 'Lanjut Langkah Berikutnya'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide-out Notes Drawer */}
      {showNotesDrawer && (
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xl space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
              <StickyNote className="w-4 h-4 text-emerald-600" />
              <span>Catatan Pribadi & Penanda Teks</span>
            </div>
            <button
              type="button"
              onClick={() => setShowNotesDrawer(false)}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Tutup
            </button>
          </div>

          {userSelectedText && (
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 italic">
              "{userSelectedText}"
            </div>
          )}

          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Tulis pemahaman atau poin penting yang ingin kamu ingat..."
            rows={3}
            className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleSaveNote}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition cursor-pointer"
            >
              Simpan Catatan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
