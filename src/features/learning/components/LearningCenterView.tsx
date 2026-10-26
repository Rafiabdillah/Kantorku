/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Pusat Belajar (Learning Center Hub)
 * PRD v6 Specification Compliant.
 */

import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../../store/useGameStore';
import {
  ALL_LESSONS,
  LEARNING_PATHS,
  GLOSSARY_TERMS,
  CHEAT_SHEETS,
  getLessonById,
} from '../../../content/lessons';
import { Lesson, LearningPath, GlossaryTerm, CheatSheet } from '../types';
import { learningRepo } from '../learningRepo';
import { LessonReaderView } from './LessonReaderView';
import { CaseStudyViewer } from './CaseStudyViewer';
import { CustomPathBuilderModal } from './CustomPathBuilderModal';
import { ErrorBoundary } from '../../../components/common/ErrorBoundary';
import { sound } from '../../../services/sound';
import {
  GraduationCap,
  Compass,
  BookOpen,
  FileText,
  Search,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  Printer,
  Plus,
  ArrowRight,
  Bookmark,
  Share2,
  StickyNote,
  HelpCircle,
  Zap,
  Target,
  FileCode,
  Layers,
  FileDown,
} from 'lucide-react';

export type LearningCenterTab =
  | 'beranda'
  | 'jalur'
  | 'pelajaran'
  | 'kamus'
  | 'contekan'
  | 'bedah-kasus'
  | 'catatan'
  | 'peta';

export const LearningCenterView: React.FC = () => {
  const { profile, setView, startMission, activeLearningLessonId, openLessonView } = useGameStore();
  const [learningState, setLearningState] = useState(learningRepo.getState());
  const [activeTab, setActiveTab] = useState<LearningCenterTab>('beranda');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(activeLearningLessonId || null);
  const [initialStepIndex, setInitialStepIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<string>('semua');
  const [selectedCheatSheet, setSelectedCheatSheet] = useState<CheatSheet>(CHEAT_SHEETS[0]);
  const [showCustomPathModal, setShowCustomPathModal] = useState<boolean>(false);
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>('semua');

  useEffect(() => {
    const unsub = learningRepo.subscribe(() => {
      setLearningState({ ...learningRepo.getState() });
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (activeLearningLessonId) {
      setActiveLessonId(activeLearningLessonId);
    }
  }, [activeLearningLessonId]);

  const openLesson = (lessonId: string, stepIdx = 0) => {
    sound.playClick();
    setActiveLessonId(lessonId);
    setInitialStepIndex(stepIdx);
  };

  const closeLesson = () => {
    sound.playClick();
    setActiveLessonId(null);
    openLessonView(undefined);
  };

  // If a lesson is active, display the LessonReaderView
  const currentActiveLesson = activeLessonId ? getLessonById(activeLessonId) : null;
  if (currentActiveLesson) {
    return (
      <ErrorBoundary fallbackTitle="Pembaca Pelajaran Mengalami Kendala" onReset={closeLesson}>
        <LessonReaderView
          lesson={currentActiveLesson}
          initialStepIndex={initialStepIndex}
          onBack={closeLesson}
          onOpenLevel={(lvlId) => {
            closeLesson();
            startMission(lvlId);
          }}
          onOpenCaseFile={(caseId) => {
            closeLesson();
            setView('case-file');
          }}
        />
      </ErrorBoundary>
    );
  }

  // Adaptive recommendations based on user progress and weak points
  const adaptiveRecs = learningRepo.getAdaptiveRecommendations(profile, []);
  const allPaths = learningRepo.getAllPaths();

  // Filtered glossary
  const filteredGlossary = GLOSSARY_TERMS.filter((g) => {
    const matchesCat =
      selectedGlossaryCategory === 'semua' || g.category === selectedGlossaryCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      g.term.toLowerCase().includes(q) ||
      (g.englishTerm && g.englishTerm.toLowerCase().includes(q)) ||
      g.definition.toLowerCase().includes(q) ||
      (g.syntax && g.syntax.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  // Filtered lessons
  const filteredLessons = ALL_LESSONS.filter((l) => {
    const matchesTrack = selectedTrackFilter === 'semua' || l.track === selectedTrackFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      l.title.toLowerCase().includes(q) ||
      l.skillId.toLowerCase().includes(q) ||
      l.objectives.some((o) => o.toLowerCase().includes(q));
    return matchesTrack && matchesQuery;
  });

  // Quick refresher lessons (3 mins)
  const quickLessons = ALL_LESSONS.filter((l) => l.isQuickRefresher);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-16">
      {/* Hero Training Room Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Ruang Pelatihan • PT Maju Sejahtera
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" />
                Belajar menambah streak harian!
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Pusat Belajar & Akademi Kantor
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Kuasai konsep kerja dari nol dengan analogi praktis, editor interaktif tanpa risiko, dan
              lembar contekan resmi sebelum menghadapi misi di meja kerjamu.
            </p>
          </div>

          {/* Quick Search & Mode Kelas action */}
          <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowCustomPathModal(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl text-xs backdrop-blur-md transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 text-purple-300" />
              <span>Jalur Kelas Baru</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('kamus')}
              className="w-full sm:w-auto px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Search className="w-4 h-4" />
              <span>Buka Kamus Fungsi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 text-xs font-bold">
        {[
          { id: 'beranda', label: 'Beranda Belajar', icon: <Compass className="w-4 h-4" /> },
          { id: 'jalur', label: 'Jalur Belajar', icon: <Target className="w-4 h-4" /> },
          { id: 'pelajaran', label: 'Katalog Pelajaran', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'kamus', label: 'Kamus & Glosarium', icon: <FileCode className="w-4 h-4" /> },
          { id: 'contekan', label: 'Lembar Contekan', icon: <Printer className="w-4 h-4" /> },
          { id: 'bedah-kasus', label: 'Bedah Kasus', icon: <Layers className="w-4 h-4" /> },
          { id: 'catatan', label: 'Catatan Saya', icon: <StickyNote className="w-4 h-4" /> },
          { id: 'peta', label: 'Peta Pengetahuan', icon: <GraduationCap className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as LearningCenterTab);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: BERANDA BELAJAR */}
      {/* ==================================================================== */}
      {activeTab === 'beranda' && (
        <div className="flex flex-col gap-6">
          {/* Lanjutkan Belajar (Resume Last Reading Position) */}
          {(() => {
            const lastEntry = Object.values(learningState.progress).sort(
              (a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
            )[0];
            const lastLsn = lastEntry ? getLessonById(lastEntry.lessonId) : null;
            if (!lastLsn) return null;
            return (
              <div className="bg-white rounded-3xl p-5 md:p-6 border-2 border-emerald-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xl font-bold">
                    📖
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                        Lanjutkan Belajar
                      </span>
                      <span className="text-xs text-slate-400">
                        Langkah {(lastEntry.currentStepIndex || 0) + 1} dari {lastLsn.steps.length}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 mt-1">
                      {lastLsn.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {lastLsn.objectives[0]}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openLesson(lastLsn.id, lastEntry.currentStepIndex || 0)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 shrink-0"
                >
                  <span>Lanjutkan Membaca</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })()}

          {/* 1. Rekomendasi Adaptif */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-extrabold text-slate-900">
                Rekomendasi Adaptif Khusus Untukmu
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {adaptiveRecs.map((rec, i) => (
                <div
                  key={i}
                  onClick={() => openLesson(rec.lesson.id)}
                  className="group p-5 bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 line-clamp-1">
                      {rec.reason}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition">
                      {rec.lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {rec.lesson.objectives[0]}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 mt-3">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {rec.lesson.estimatedMinutes} Menit
                    </span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                      Mulai <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Pelajaran Kilat (3 Menit) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-extrabold text-slate-900">
                  Pelajaran Kilat (Penyegaran 3 Menit)
                </h2>
              </div>
              <span className="text-xs text-slate-400">Cocok sebelum Review Harian</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {quickLessons.map((l) => (
                <div
                  key={l.id}
                  onClick={() => openLesson(l.id)}
                  className="p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                      {l.track}
                    </span>
                    <h4 className="font-bold text-xs text-slate-800 mt-1 line-clamp-2">
                      {l.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                    <span>⏱️ ~{l.estimatedMinutes} mnt</span>
                    <span className="text-emerald-600 font-bold">Buka</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Jalur Belajar Pilihan */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-extrabold text-slate-900">Jalur Belajar Berdasarkan Tujuan</h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('jalur')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                Lihat Semua Jalur →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allPaths.slice(0, 4).map((path) => (
                <div
                  key={path.id}
                  onClick={() => setActiveTab('jalur')}
                  className="p-5 bg-white rounded-3xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-sm transition cursor-pointer flex items-start gap-4"
                >
                  <div className="text-3xl p-3 bg-slate-50 rounded-2xl shrink-0 border border-slate-200/60">
                    {path.badge}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-sm text-slate-900">{path.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{path.description}</p>
                    <div className="text-[11px] font-semibold text-emerald-700 pt-1">
                      🎯 {path.goal}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: JALUR BELAJAR (LEARNING PATHS) */}
      {/* ==================================================================== */}
      {activeTab === 'jalur' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Jalur Belajar Berorientasi Target</h2>
              <p className="text-xs text-slate-500">
                Pilih jalur sesuai profesi idamanmu. Setiap jalur memiliki urutan pelajaran dan hasil akhir jelas.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCustomPathModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Susun Jalur Kustom</span>
            </button>
          </div>

          <div className="space-y-6">
            {allPaths.map((path) => (
              <div
                key={path.id}
                className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{path.badge}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-slate-900">{path.title}</h3>
                        {path.isCustom && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                            Mode Kelas ({path.author || 'Dosen'})
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{path.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Estimasi: {path.estimatedHours}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl text-xs text-emerald-950 font-medium">
                  🎯 <strong>Capaian Akhir:</strong> {path.goal}
                </div>

                {/* Lesson Steps within Path */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Daftar Pelajaran ({path.lessonIds.length} Modul):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {path.lessonIds.map((lId, idx) => {
                      const lesson = getLessonById(lId);
                      if (!lesson) return null;
                      const isCompleted = learningState.progress[lId]?.completed;
                      const isMandatory = path.mandatoryLessonIds?.includes(lId);

                      return (
                        <div
                          key={lId}
                          onClick={() => openLesson(lId)}
                          className={`p-3 rounded-2xl border transition flex items-center justify-between gap-2 cursor-pointer ${
                            isCompleted
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div>
                              <div className="font-bold text-xs truncate max-w-[160px]">
                                {lesson.title}
                              </div>
                              <span className="text-[10px] text-slate-400">
                                {lesson.estimatedMinutes} mnt • Tier {lesson.tier}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            {isMandatory && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                                Wajib
                              </span>
                            )}
                            {isCompleted && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: KATALOG PELAJARAN */}
      {/* ==================================================================== */}
      {activeTab === 'pelajaran' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-2xl flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pelajaran, skill, atau rumus..."
                className="bg-transparent text-xs text-slate-800 focus:outline-none w-full"
              />
            </div>

            {/* Track filter pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['semua', 'excel', 'word', 'web', 'coding'].map((track) => (
                <button
                  key={track}
                  type="button"
                  onClick={() => setSelectedTrackFilter(track)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize cursor-pointer ${
                    selectedTrackFilter === track
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {track}
                </button>
              ))}
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.map((l) => {
              const isCompleted = learningState.progress[l.id]?.completed;
              return (
                <div
                  key={l.id}
                  onClick={() => openLesson(l.id)}
                  className="group p-5 bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                        {l.track} • TIER {l.tier}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Selesai
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition">
                      {l.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{l.objectives[0]}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span>⏱️ {l.estimatedMinutes} Menit</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                      Buka Pelajaran <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: KAMUS & GLOSARIUM */}
      {/* ==================================================================== */}
      {activeTab === 'kamus' && (
        <div className="space-y-6">
          {/* Search & Filter Header */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2.5 rounded-2xl flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari fungsi Excel (SUM, IF, VLOOKUP) atau tag HTML/CSS/JS..."
                className="bg-transparent text-xs text-slate-800 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {['semua', 'excel', 'word', 'web', 'coding', 'bisnis'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedGlossaryCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize cursor-pointer ${
                    selectedGlossaryCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Glossary Terms Accordion / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((term) => (
              <div
                key={term.id}
                className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                      {term.category}
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-1">{term.term}</h3>
                    {term.englishTerm && (
                      <div className="text-xs text-slate-400 italic">{term.englishTerm}</div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{term.definition}</p>

                {term.syntax && (
                  <div className="p-2.5 bg-slate-900 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto">
                    {term.syntax}
                  </div>
                )}

                {term.example && (
                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 font-mono">
                    <span className="text-slate-400 block text-[10px] font-sans font-bold">
                      Contoh Penerapan:
                    </span>
                    {term.example}
                  </div>
                )}

                {term.commonMistake && (
                  <div className="text-xs text-rose-800 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                    <span className="font-bold block text-[10px]">⚠️ Kesalahan Umum:</span>
                    {term.commonMistake}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: LEMBAR CONTEKAN (CHEAT SHEETS) */}
      {/* ==================================================================== */}
      {activeTab === 'contekan' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Lembar Contekan Siap Cetak</h2>
              <p className="text-xs text-slate-500">
                Ringkasan tabel rumus dan pintasan yang bisa dicetak atau disimpan ke PDF.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCheatSheet.id}
                onChange={(e) => {
                  const s = CHEAT_SHEETS.find((cs) => cs.id === e.target.value);
                  if (s) setSelectedCheatSheet(s);
                }}
                className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                {CHEAT_SHEETS.map((cs) => (
                  <option key={cs.id} value={cs.id}>
                    {cs.title}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / PDF</span>
              </button>
            </div>
          </div>

          {/* Printable Sheet Card */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6 print:p-0 print:border-none print:shadow-none">
            <div className="border-b-2 border-emerald-600 pb-4">
              <h1 className="text-xl md:text-2xl font-black text-slate-900">
                {selectedCheatSheet.title}
              </h1>
              {selectedCheatSheet.subtitle && (
                <p className="text-xs text-slate-500 mt-1">{selectedCheatSheet.subtitle}</p>
              )}
            </div>

            <div className="space-y-6">
              {selectedCheatSheet.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <h3 className="font-extrabold text-sm text-emerald-800">{sec.heading}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sec.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{item.label}</span>
                          <code className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-300 text-emerald-700">
                            {item.codeOrShortcut}
                          </code>
                        </div>
                        <p className="text-xs text-slate-600">{item.description}</p>
                        {item.tip && (
                          <div className="text-[11px] text-amber-800 font-medium pt-1">
                            💡 {item.tip}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedCheatSheet.footerNote && (
              <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
                {selectedCheatSheet.footerNote}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 6: BEDAH KASUS */}
      {/* ==================================================================== */}
      {activeTab === 'bedah-kasus' && <CaseStudyViewer onOpenLesson={openLesson} />}

      {/* ==================================================================== */}
      {/* TAB 7: CATATAN SAYA */}
      {/* ==================================================================== */}
      {activeTab === 'catatan' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Catatan & Sorotan Pribadi</h2>
              <p className="text-xs text-slate-500">
                Kompilasi pemikiran dan catatan yang kamu simpan saat membaca pelajaran.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const md = learningRepo.exportNotesToMarkdown();
                const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Catatan_KantorKu_${Date.now()}.md`;
                a.click();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <FileDown className="w-4 h-4" />
              <span>Ekspor ke Markdown</span>
            </button>
          </div>

          {learningState.notes.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-2">
              <StickyNote className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="font-bold text-sm text-slate-700">Belum Ada Catatan Tersimpan</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Sorot teks di dalam pelajaran atau buka ikon Catatan saat membaca untuk menyimpan poin penting.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningState.notes.map((note) => {
                const lesson = getLessonById(note.lessonId);
                return (
                  <div
                    key={note.id}
                    className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {lesson?.title || note.lessonId}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Langkah {note.stepIndex + 1}
                        </span>
                      </div>

                      {note.highlightText && (
                        <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 italic">
                          "{note.highlightText}"
                        </div>
                      )}

                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {note.noteText}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>{new Date(note.createdAt).toLocaleDateString('id-ID')}</span>
                      <button
                        type="button"
                        onClick={() => learningRepo.deleteNote(note.id)}
                        className="text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 8: PETA PENGETAHUAN (SKILL STATUS) */}
      {/* ==================================================================== */}
      {activeTab === 'peta' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Peta Pengetahuan KantorKu</h2>
            <p className="text-xs text-slate-500">
              Pantau status penguasaan setiap kompetensi: Belum → Dipelajari → Dilatih → Dikuasai.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALL_LESSONS.map((l) => {
              const isLearned = learningState.progress[l.id]?.completed;
              const isPracticed = l.relatedLevels.some((lvl) =>
                profile.completedLevelIds.includes(lvl)
              );
              const isMastered = l.relatedLevels.some(
                (lvl) => (profile.levelStars[lvl] || 0) === 3
              );

              let statusLabel = 'Belum Dipelajari';
              let statusBg = 'bg-slate-100 text-slate-500 border-slate-200';
              if (isMastered) {
                statusLabel = 'Dikuasai (Mastered)';
                statusBg = 'bg-purple-100 text-purple-800 border-purple-300';
              } else if (isPracticed) {
                statusLabel = 'Dilatih di Misi';
                statusBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
              } else if (isLearned) {
                statusLabel = 'Pernah Dipelajari';
                statusBg = 'bg-blue-100 text-blue-800 border-blue-300';
              }

              return (
                <div
                  key={l.id}
                  onClick={() => openLesson(l.id)}
                  className="p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBg}`}>
                      {statusLabel}
                    </span>
                    <h4 className="font-extrabold text-xs text-slate-800 mt-1">{l.skillId}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{l.title}</p>
                  </div>
                  <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 mt-3 flex justify-between">
                    <span>Tier {l.tier}</span>
                    <span className="font-bold text-emerald-600">Buka Pelajaran</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode Kelas Custom Path Builder Modal */}
      <CustomPathBuilderModal
        isOpen={showCustomPathModal}
        onClose={() => setShowCustomPathModal(false)}
        onCreated={() => {
          sound.playSuccess();
          setActiveTab('jalur');
        }}
      />
    </div>
  );
};
