/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Buku Catatan Refleksi & Evaluasi Mandiri
 */

import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CheckCircle, RotateCcw, ArrowLeft, CheckCircle2, GraduationCap } from 'lucide-react';
import { sound } from '../../services/sound';
import { ALL_LESSONS } from '../../content/lessons';

export const RefleksiNotebookView: React.FC = () => {
  const { errorNotebook: rawErrorNotebook, resolveErrorLog, startMission, setView, openLessonView } = useGameStore();
  const errorNotebook = Array.isArray(rawErrorNotebook) ? rawErrorNotebook : [];

  const handleRetrain = (levelId: string) => {
    sound.playClick();
    startMission(levelId);
  };

  const handleResolve = (errId: string) => {
    sound.playSuccess();
    resolveErrorLog(errId);
  };

  const unresolvedCount = errorNotebook.filter((e) => e && !e.resolved).length;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setView('office');
            }}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase">
              Buku Catatan Kesalahan
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Evaluasi & Refleksi Mandiri</h1>
          </div>
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          {unresolvedCount} Perlu Dilatih Ulang
        </div>
      </div>

      {errorNotebook.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-800">Buku Catatanmu Masih Bersih!</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Setiap kali kamu mengalami kesalahan rumus atau sintaks dalam tugas, sistem akan mencatatnya di sini beserta tips perbaikannya.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {errorNotebook.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                item.resolved
                  ? 'bg-slate-50/80 border-slate-200 opacity-60'
                  : 'bg-white border-rose-200 shadow-sm'
              }`}
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                    Tier {item.tier} • {item.module}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{item.levelTitle}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                </div>

                <div className="text-xs font-semibold text-rose-800 bg-rose-50 p-2 rounded-xl border border-rose-200/60">
                  {item.mistakeDescription}
                </div>

                {item.userAttempt && (
                  <div className="text-[11px] font-mono bg-slate-100 text-slate-700 p-2 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-sans font-medium">Percobaan:</span> {item.userAttempt}
                  </div>
                )}

                <p className="text-xs text-slate-600 leading-relaxed">{item.explanation}</p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const lesson = Array.isArray(ALL_LESSONS)
                      ? ALL_LESSONS.find(
                          (l) => (l.relatedLevels && l.relatedLevels.includes(item.levelId)) || l.track === item.module
                        )
                      : undefined;
                    if (lesson?.id) {
                      openLessonView(lesson.id);
                    } else {
                      openLessonView();
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition cursor-pointer"
                  title="Buka materi terkait di Pusat Belajar"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Pelajari</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRetrain(item.levelId)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Latih Lagi</span>
                </button>

                {!item.resolved && (
                  <button
                    type="button"
                    onClick={() => handleResolve(item.id)}
                    className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-emerald-600 transition cursor-pointer"
                    title="Tandai Sudah Paham"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RefleksiNotebookView;
