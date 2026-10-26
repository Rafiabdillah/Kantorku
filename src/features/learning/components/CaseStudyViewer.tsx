/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Case Study Viewer (Bedah Kasus Interaktif)
 * Perbandingan dokumen/web Buruk vs Baik dengan anotasi klik.
 */

import React, { useState } from 'react';
import { CASE_STUDIES } from '../../../content/lessons/caseStudies';
import { CaseStudyComparison, CaseStudyAnnotation } from '../types';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface CaseStudyViewerProps {
  initialCaseId?: string;
  onOpenLesson?: (lessonId: string) => void;
}

export const CaseStudyViewer: React.FC<CaseStudyViewerProps> = ({
  initialCaseId,
  onOpenLesson,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    initialCaseId || CASE_STUDIES[0]?.id || ''
  );
  const [selectedAnnotation, setSelectedAnnotation] = useState<CaseStudyAnnotation | null>(null);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'bad-only' | 'good-only'>('side-by-side');

  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  if (!activeCase) {
    return <div className="p-8 text-center text-slate-500">Belum ada data Bedah Kasus.</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
      {/* Header Selector */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
              Bedah Kasus Interaktif
            </span>
            <span className="text-xs text-slate-400">• Buruk vs Baik</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{activeCase.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{activeCase.summary}</p>
        </div>

        {/* Case Selector Dropdown & Layout Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCaseId}
            onChange={(e) => {
              setSelectedCaseId(e.target.value);
              setSelectedAnnotation(null);
            }}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {CASE_STUDIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewMode === 'side-by-side' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600'
              }`}
            >
              Berdampingan
            </button>
            <button
              type="button"
              onClick={() => setViewMode('bad-only')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewMode === 'bad-only' ? 'bg-white shadow-xs text-rose-700 font-bold' : 'text-slate-600'
              }`}
            >
              Versi Buruk
            </button>
            <button
              type="button"
              onClick={() => setViewMode('good-only')}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewMode === 'good-only' ? 'bg-white shadow-xs text-emerald-700 font-bold' : 'text-slate-600'
              }`}
            >
              Versi Baik
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Click Annotations Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <Sparkles className="w-4 h-4" />
            <span>Klik Anotasi Bedah Masalah di Bawah Ini:</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {activeCase.annotations.length} Titik Kritis Ditemukan
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {activeCase.annotations.map((ann) => {
            const isSelected = selectedAnnotation?.id === ann.id;
            const isBad = ann.targetSide === 'bad';
            return (
              <button
                key={ann.id}
                type="button"
                onClick={() => setSelectedAnnotation(ann)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-white'
                    : isBad
                    ? 'bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-200'
                    : 'bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200'
                }`}
              >
                {isBad ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span>{ann.highlightLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Annotation Detail Card */}
      {selectedAnnotation && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300/80 shadow-xs animate-in fade-in duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-200 text-amber-900 mt-0.5">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                {selectedAnnotation.problemTitle}
              </h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {selectedAnnotation.problemExplanation}
              </p>
              <div className="mt-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 p-2 rounded-lg border border-emerald-300/60">
                ✅ {selectedAnnotation.solutionFix}
              </div>
            </div>
          </div>

          {activeCase.relatedLessonId && onOpenLesson && (
            <button
              type="button"
              onClick={() => onOpenLesson(activeCase.relatedLessonId!)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <span>Buka Pelajarannya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Side-by-Side Comparison Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Bad Side */}
        {(viewMode === 'side-by-side' || viewMode === 'bad-only') && (
          <div className="bg-white rounded-3xl border-2 border-rose-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-5 py-3 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{activeCase.badDocument.title || 'Versi Buruk (Cacat Standar)'}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-200 text-rose-900 rounded-full">
                Hindari Ini
              </span>
            </div>
            <div className="p-5 overflow-auto max-h-[500px]">
              <div dangerouslySetInnerHTML={{ __html: activeCase.badDocument.contentHtml }} />
            </div>
          </div>
        )}

        {/* Good Side */}
        {(viewMode === 'side-by-side' || viewMode === 'good-only') && (
          <div className="bg-white rounded-3xl border-2 border-emerald-300 shadow-sm overflow-hidden flex flex-col">
            <div className="px-5 py-3 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{activeCase.goodDocument.title || 'Versi Baik (Standar Korporat)'}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full">
                Standar KantorKu
              </span>
            </div>
            <div className="p-5 overflow-auto max-h-[500px]">
              <div dangerouslySetInnerHTML={{ __html: activeCase.goodDocument.contentHtml }} />
            </div>
          </div>
        )}
      </div>

      {/* Key Takeaways Bottom Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Pelajaran Utama yang Harus Kamu Bawa ke Meja Kerja:</span>
        </h3>
        <ul className="space-y-2 text-xs text-slate-600">
          {activeCase.learningPoints.map((pt, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
