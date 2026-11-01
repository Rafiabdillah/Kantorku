/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Advanced Analytical Quiz Engine (Wave S0)
 * Multi-format analytical assessment: Reordering, Matching, Error Spotting, Hotspot.
 */

import React, { useState } from 'react';
import { sound } from '../../services/sound';
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown,
  MoveUp,
  MoveDown,
  RotateCcw,
  Sparkles,
  Link2,
  Crosshair,
  Search,
} from 'lucide-react';

export type AdvancedQuizType = 'urutan' | 'cocokkan' | 'temukan-kesalahan' | 'klik-area';

export interface BaseAdvancedQuestion {
  id: string;
  type: AdvancedQuizType;
  title: string;
  instruction: string;
  explanation: string;
  conceptReference?: string;
}

export interface ReorderQuestion extends BaseAdvancedQuestion {
  type: 'urutan';
  items: Array<{ id: string; text: string }>;
  correctOrder: string[]; // array of item ids in correct sequence
}

export interface MatchQuestion extends BaseAdvancedQuestion {
  type: 'cocokkan';
  pairs: Array<{
    id: string;
    left: string;
    right: string;
  }>;
}

export interface SpotErrorQuestion extends BaseAdvancedQuestion {
  type: 'temukan-kesalahan';
  contextSnippet: {
    title: string;
    subtitle?: string;
    lines: Array<{
      id: string;
      text: string;
      isError: boolean;
      errorReason?: string;
    }>;
  };
  requiredErrorCount: number;
}

export interface HotspotQuestion extends BaseAdvancedQuestion {
  type: 'klik-area';
  previewImageOrBox: {
    title: string;
    zones: Array<{
      id: string;
      label: string;
      isTarget: boolean;
      explanation: string;
    }>;
  };
}

export type AdvancedQuestion =
  | ReorderQuestion
  | MatchQuestion
  | SpotErrorQuestion
  | HotspotQuestion;

export interface AdvancedQuizEngineProps {
  questions: AdvancedQuestion[];
  onComplete?: (result: {
    score: number;
    total: number;
    passed: boolean;
    mistakes: string[];
  }) => void;
}

export const AdvancedQuizEngine: React.FC<AdvancedQuizEngineProps> = ({
  questions,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [evaluated, setEvaluated] = useState<Record<string, { passed: boolean; tip: string }>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const currentQ = questions[currentIndex];

  // =========================================================================
  // Question Specific State & Handlers
  // =========================================================================

  // 1. Reorder Handler
  const initialReorderOrder = currentQ.type === 'urutan'
    ? (() => {
        const original = currentQ.items.map((i) => i.id);
        if (JSON.stringify(original) !== JSON.stringify(currentQ.correctOrder)) return original;
        const rotated = [...original];
        if (rotated.length > 1) [rotated[0], rotated[1]] = [rotated[1], rotated[0]];
        return rotated;
      })()
    : [];
  const currentOrder = (userAnswers[currentQ.id] as string[]) || initialReorderOrder;

  const handleMoveOrderItem = (index: number, direction: 'up' | 'down') => {
    sound.playClick();
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= currentOrder.length) return;
    const copy = [...currentOrder];
    const temp = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = temp;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: copy }));
  };

  // 2. Matching Handler
  const currentMatches = (userAnswers[currentQ.id] as Record<string, string>) || {};
  const handleSelectMatch = (leftId: string, rightVal: string) => {
    sound.playClick();
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...(prev[currentQ.id] || {}),
        [leftId]: rightVal,
      },
    }));
  };

  // 3. Spot Error Handler
  const currentSelectedErrors = (userAnswers[currentQ.id] as string[]) || [];
  const handleToggleErrorLine = (lineId: string) => {
    sound.playClick();
    setUserAnswers((prev) => {
      const existing: string[] = prev[currentQ.id] || [];
      const updated = existing.includes(lineId)
        ? existing.filter((id) => id !== lineId)
        : [...existing, lineId];
      return { ...prev, [currentQ.id]: updated };
    });
  };

  // 4. Hotspot Handler
  const selectedZoneId = userAnswers[currentQ.id] as string | undefined;
  const handleSelectZone = (zoneId: string) => {
    sound.playClick();
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: zoneId }));
  };

  // Evaluate Current Question
  const handleEvaluateCurrent = () => {
    let passed = false;
    let tip = '';

    if (currentQ.type === 'urutan') {
      const isMatch = currentQ.correctOrder.every((id, idx) => id === currentOrder[idx]);
      passed = isMatch;
      tip = isMatch ? 'Urutan tepat dan logis!' : currentQ.explanation;
    } else if (currentQ.type === 'cocokkan') {
      const allCorrect = currentQ.pairs.every((p) => currentMatches[p.id] === p.right);
      passed = allCorrect;
      tip = allCorrect ? 'Semua pasangan cocok sempurna!' : currentQ.explanation;
    } else if (currentQ.type === 'temukan-kesalahan') {
      const correctErrorIds = currentQ.contextSnippet.lines.filter((l) => l.isError).map((l) => l.id);
      const isIdentical =
        correctErrorIds.length === currentSelectedErrors.length &&
        correctErrorIds.every((id) => currentSelectedErrors.includes(id));
      passed = isIdentical;
      tip = isIdentical ? 'Semua red flag berhasil teridentifikasi!' : currentQ.explanation;
    } else if (currentQ.type === 'klik-area') {
      const targetZone = currentQ.previewImageOrBox.zones.find((z) => z.id === selectedZoneId);
      passed = !!targetZone?.isTarget;
      tip = passed ? targetZone?.explanation || 'Tepat sasaran!' : currentQ.explanation;
    }

    if (passed) {
      sound.playSuccess();
    } else {
      sound.playError();
    }

    setEvaluated((prev) => ({ ...prev, [currentQ.id]: { passed, tip } }));
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResult(true);
      const total = questions.length;
      let scoreCount = 0;
      const mistakes: string[] = [];

      for (const q of questions) {
        if (evaluated[q.id]?.passed) {
          scoreCount++;
        } else {
          mistakes.push(q.title);
        }
      }

      const scorePercent = Math.round((scoreCount / total) * 100);
      if (onComplete) {
        onComplete({
          score: scorePercent,
          total,
          passed: scorePercent >= 70,
          mistakes,
        });
      }
    }
  };

  const isCurrentEvaluated = !!evaluated[currentQ.id];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
      {/* Quiz Engine Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Kuis Analitis Lanjutan (Mode K)
            </span>
          </div>
          <h2 className="text-xl font-bold">{currentQ.title}</h2>
          <p className="text-xs text-slate-300 mt-0.5">{currentQ.instruction}</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-400">Soal</span>
          <div className="text-2xl font-black text-white font-mono">
            {currentIndex + 1} <span className="text-sm text-slate-500 font-normal">/ {questions.length}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Question Body */}
      <div className="p-6 flex flex-col gap-6">
        {/* TYPE 1: URUTAN (Ordering) */}
        {currentQ.type === 'urutan' && (
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <ArrowUpDown className="w-4 h-4 text-emerald-600" />
              Susun urutan dengan tombol panah:
            </label>
            {currentOrder.map((itemId, idx) => {
              const item = currentQ.items.find((i) => i.id === itemId);
              if (!item) return null;
              return (
                <div
                  key={itemId}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all"
                >
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span className="flex-1 text-xs font-medium text-slate-800 leading-relaxed">
                    {item.text}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0 || isCurrentEvaluated}
                      onClick={() => handleMoveOrderItem(idx, 'up')}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-30 border border-slate-200 text-slate-600"
                      title="Geser ke atas"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === currentOrder.length - 1 || isCurrentEvaluated}
                      onClick={() => handleMoveOrderItem(idx, 'down')}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-30 border border-slate-200 text-slate-600"
                      title="Geser ke bawah"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TYPE 2: COCOKKAN (Matching) */}
        {currentQ.type === 'cocokkan' && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-blue-600" />
              Pasangkan konteks di kiri dengan respon tepat di kanan:
            </label>
            <div className="space-y-3">
              {currentQ.pairs.map((pair) => (
                <div
                  key={pair.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <span className="text-xs font-semibold text-slate-800 md:w-1/2 leading-relaxed">
                    {pair.left}
                  </span>
                  <select
                    disabled={isCurrentEvaluated}
                    value={currentMatches[pair.id] || ''}
                    onChange={(e) => handleSelectMatch(pair.id, e.target.value)}
                    className="md:w-1/2 text-xs p-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-emerald-500 font-medium text-slate-800"
                  >
                    <option value="">-- Pilih Respon yang Cocok --</option>
                    {currentQ.pairs.map((p) => (
                      <option key={p.id} value={p.right}>
                        {p.right}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TYPE 3: TEMUKAN KESALAHAN (Spot the Error) */}
        {currentQ.type === 'temukan-kesalahan' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-4 h-4 text-rose-600" />
                Klik kalimat yang mengandung kesalahan / red flag ({currentSelectedErrors.length} /{' '}
                {currentQ.requiredErrorCount} dipilih):
              </label>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-sans text-xs space-y-2 border border-slate-800">
              <div className="text-slate-400 font-mono text-[11px] pb-1 border-b border-slate-800">
                📄 {currentQ.contextSnippet.title}
              </div>
              {currentQ.contextSnippet.lines.map((line) => {
                const isSelected = currentSelectedErrors.includes(line.id);
                return (
                  <div
                    key={line.id}
                    onClick={() => !isCurrentEvaluated && handleToggleErrorLine(line.id)}
                    className={`p-2 rounded-xl cursor-pointer transition-all leading-relaxed ${
                      isSelected
                        ? 'bg-rose-500/25 border border-rose-500/60 text-rose-200 font-semibold'
                        : 'hover:bg-slate-800/80 border border-transparent'
                    }`}
                  >
                    {line.text}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TYPE 4: KLIK AREA (Hotspot) */}
        {currentQ.type === 'klik-area' && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Crosshair className="w-4 h-4 text-purple-600" />
              Pilih area yang paling kritis untuk diperiksa:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQ.previewImageOrBox.zones.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    disabled={isCurrentEvaluated}
                    onClick={() => handleSelectZone(zone.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20 text-purple-950 font-bold'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold mb-1 flex items-center justify-between">
                      <span>{zone.label}</span>
                      {isSelected && <span className="text-[10px] text-purple-600">✓ Terpilih</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Feedback Section if evaluated */}
        {isCurrentEvaluated && (
          <div
            className={`p-4 rounded-2xl text-xs leading-relaxed border animate-in fade-in ${
              evaluated[currentQ.id].passed
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {evaluated[currentQ.id].passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              )}
              <span>{evaluated[currentQ.id].passed ? 'Jawaban Benar!' : 'Perlu Diperbaiki'}</span>
            </div>
            <p>{evaluated[currentQ.id].tip}</p>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="text-[11px] text-slate-400">
            {currentQ.conceptReference && <span>Referensi: {currentQ.conceptReference}</span>}
          </div>
          <div className="flex items-center gap-2">
            {!isCurrentEvaluated ? (
              <button
                type="button"
                onClick={handleEvaluateCurrent}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all shadow-emerald-600/20"
              >
                Cek Jawaban
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
              >
                {currentIndex < questions.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil Akhir'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
