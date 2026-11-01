/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Interactive Mini Editor for Lesson Steps
 * Supports Excel mini-grid, Web HTML/CSS preview, and JavaScript sandbox.
 */

import React, { useState, useEffect } from 'react';
import { ExcelFormulaEngine, formatCellValue } from '../../../engine/formula';
import { runCodeWithTests } from '../../../engine/codeSandbox';
import { Play, RotateCcw, CheckCircle2, HelpCircle, StepForward } from 'lucide-react';
import { WalkthroughStep } from '../types';

interface InteractiveMiniEditorProps {
  editorType: 'excel' | 'word' | 'coding' | 'web';
  initialData: Record<string, any>;
  expectedResult?: any;
  walkthrough?: WalkthroughStep[];
  instruction?: string;
  onValidate?: (passed: boolean) => void;
  readOnly?: boolean;
}

export const InteractiveMiniEditor: React.FC<InteractiveMiniEditorProps> = ({
  editorType,
  initialData,
  expectedResult,
  walkthrough = [],
  instruction,
  onValidate,
}) => {
  // --- EXCEL STATE ---
  const [grid, setGrid] = useState<Record<string, { raw: string; format?: string }>>(() => {
    if (editorType === 'excel' && initialData) {
      return JSON.parse(JSON.stringify(initialData));
    }
    return {};
  });
  const [activeCell, setActiveCell] = useState<string>('B2');

  // --- WEB STATE ---
  const [htmlContent, setHtmlContent] = useState<string>(initialData.html || '');
  const [cssContent, setCssContent] = useState<string>(initialData.css || '');

  // --- CODING STATE ---
  const [codeContent, setCodeContent] = useState<string>(initialData.code || '');
  const [codeOutput, setCodeOutput] = useState<string | null>(null);

  // --- WORD STATE ---
  const [wordContent, setWordContent] = useState<string>(initialData.word || '');

  // --- COACH MARK / WALKTHROUGH STATE ---
  const [walkthroughIndex, setWalkthroughIndex] = useState<number>(-1);
  const [evaluationFeedback, setEvaluationFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (walkthroughIndex >= 0 && walkthroughIndex < walkthrough.length) {
      const step = walkthrough[walkthroughIndex];
      if (step.targetCell) {
        setActiveCell(step.targetCell);
      }
    }
  }, [walkthroughIndex, walkthrough]);

  // Handle Coach Mark Stepper
  const handleNextWalkthrough = () => {
    if (walkthroughIndex + 1 < walkthrough.length) {
      setWalkthroughIndex(walkthroughIndex + 1);
    } else {
      setWalkthroughIndex(-1);
    }
  };

  const handleStartWalkthrough = () => {
    setWalkthroughIndex(0);
  };

  // Run Code Execution
  const handleRunCode = async () => {
    try {
      const res = await runCodeWithTests(codeContent, []);
      const outputText = res.output.join('\n') || (res.success ? 'Kode berjalan tanpa error.' : res.error || '');
      setCodeOutput(outputText);

      if (expectedResult !== undefined) {
        const passed = outputText.includes(String(expectedResult)) || res.success;
        setIsSuccess(passed);
        setEvaluationFeedback(passed ? 'Benar! Hasil sesuai dengan target pelajaran.' : 'Belum tepat. Cek kembali perhitungan logikanya.');
        if (onValidate) onValidate(passed);
      } else {
        setIsSuccess(true);
        if (onValidate) onValidate(true);
      }
    } catch (err: any) {
      setCodeOutput(`Error: ${err.message}`);
      setIsSuccess(false);
    }
  };

  // Reset Editor
  const handleReset = () => {
    if (editorType === 'excel') setGrid(JSON.parse(JSON.stringify(initialData)));
    if (editorType === 'web') {
      setHtmlContent(initialData.html || '');
      setCssContent(initialData.css || '');
    }
    if (editorType === 'coding') {
      setCodeContent(initialData.code || '');
      setCodeOutput(null);
    }
    if (editorType === 'word') setWordContent(initialData.word || '');
    setIsSuccess(false);
    setEvaluationFeedback(null);
    setWalkthroughIndex(-1);
  };

  // Evaluate Excel Grid
  const evaluateCell = (address: string): string => {
    const item = grid[address];
    if (!item) return '';
    const raw = item.raw || '';
    if (raw.startsWith('=')) {
      const engine = new ExcelFormulaEngine(grid as any);
      const res = engine.evaluateFormula(raw.substring(1));
      return formatCellValue(res.value, item.format as any);
    }
    return formatCellValue(raw, item.format as any);
  };

  const handleExcelCellChange = (address: string, val: string) => {
    const nextGrid = { ...grid, [address]: { ...grid[address], raw: val } };
    setGrid(nextGrid);

    // Instant check against expected output or formula
    if (expectedResult !== undefined) {
      const engine = new ExcelFormulaEngine(nextGrid as any);
      let evaluated: any = val;
      if (val.startsWith('=')) {
        evaluated = engine.evaluateFormula(val.substring(1)).value;
      }
      const passed =
        String(evaluated) === String(expectedResult) ||
        val.toLowerCase().replace(/\s+/g, '') === String(expectedResult).toLowerCase().replace(/\s+/g, '');
      if (passed) {
        setIsSuccess(true);
        setEvaluationFeedback('Kerja bagus! Rumus dan nilaimu tepat.');
        if (onValidate) onValidate(true);
      }
    }
  };

  const activeWalkthroughStep = walkthroughIndex >= 0 ? walkthrough[walkthroughIndex] : null;

  return (
    <div className="flex flex-col gap-3 p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-md">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wide">
            Mini-Editor {editorType.toUpperCase()}
          </span>
          {instruction && <span className="text-xs text-slate-300 font-medium">{instruction}</span>}
        </div>

        <div className="flex items-center gap-2">
          {walkthrough.length > 0 && (
            <button
              type="button"
              onClick={handleStartWalkthrough}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 transition cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Lihat Caranya ({walkthrough.length} Langkah)</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition cursor-pointer"
            title="Reset Editor"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Coach Mark Walkthrough Banner */}
      {activeWalkthroughStep && (
        <div className="p-3 bg-teal-950/80 border border-teal-500/40 rounded-xl flex items-center justify-between gap-3 text-xs text-teal-200 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-[11px] shrink-0">
              {walkthroughIndex + 1}
            </span>
            <span>{activeWalkthroughStep.instruction}</span>
          </div>
          <button
            type="button"
            onClick={handleNextWalkthrough}
            className="px-2 py-1 rounded bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition cursor-pointer shrink-0 flex items-center gap-1"
          >
            <span>{walkthroughIndex + 1 === walkthrough.length ? 'Paham!' : 'Lanjut'}</span>
            <StepForward className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 1. EXCEL EDITOR */}
      {editorType === 'excel' && (
        <div className="overflow-x-auto bg-slate-950 p-2 rounded-xl border border-slate-800 font-mono text-xs">
          <div className="flex items-center gap-2 mb-2 px-1 text-[11px] text-slate-400">
            <span className="font-bold text-emerald-400">{activeCell}</span>
            <input
              type="text"
              value={grid[activeCell]?.raw || ''}
              onChange={(e) => handleExcelCellChange(activeCell, e.target.value)}
              placeholder="Ketik rumus atau angka..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <table className="border-collapse w-full text-slate-200">
            <thead>
              <tr className="bg-slate-900 text-slate-500 text-[10px]">
                <th className="p-1 border border-slate-800 w-8">#</th>
                <th className="p-1 border border-slate-800 min-w-[80px]">A</th>
                <th className="p-1 border border-slate-800 min-w-[100px]">B</th>
                <th className="p-1 border border-slate-800 min-w-[100px]">C</th>
              </tr>
            </thead>
            <tbody>
              {['1', '2', '3', '4', '5', '6'].map((row) => (
                <tr key={row}>
                  <td className="p-1 border border-slate-800 text-center bg-slate-900 text-slate-500 text-[10px]">
                    {row}
                  </td>
                  {['A', 'B', 'C'].map((col) => {
                    const addr = `${col}${row}`;
                    const isSelected = activeCell === addr;
                    const val = evaluateCell(addr);
                    const isTargetWalkthrough = activeWalkthroughStep?.targetCell === addr;

                    return (
                      <td
                        key={addr}
                        onClick={() => setActiveCell(addr)}
                        className={`p-1.5 border border-slate-800 cursor-pointer transition select-none ${
                          isSelected ? 'bg-emerald-950/60 ring-1 ring-emerald-500' : 'hover:bg-slate-900'
                        } ${isTargetWalkthrough ? 'animate-pulse bg-teal-900/40 border-teal-400' : ''}`}
                      >
                        <div className="truncate">{val || <span className="text-slate-700">-</span>}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. CODING / JAVASCRIPT EDITOR */}
      {editorType === 'coding' && (
        <div className="flex flex-col gap-2">
          <textarea
            value={codeContent}
            onChange={(e) => setCodeContent(e.target.value)}
            rows={5}
            className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 resize-none"
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleRunCode}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Jalankan Kode</span>
            </button>
            {codeOutput !== null && (
              <span className="text-xs text-slate-400 font-mono">Hasil Output Terminal:</span>
            )}
          </div>
          {codeOutput !== null && (
            <pre className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              {codeOutput}
            </pre>
          )}
        </div>
      )}

      {/* 3. WEB (HTML & CSS LIVE PREVIEW) */}
      {editorType === 'web' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Kode HTML & CSS:</span>
            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              rows={5}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 resize-none"
              placeholder="HTML markup..."
            />
            {initialData.css && (
              <textarea
                value={cssContent}
                onChange={(e) => setCssContent(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-blue-300 resize-none"
                placeholder="CSS styles..."
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Pratinjau Browser:</span>
            <div className="flex-1 bg-white text-slate-900 p-3 rounded-xl min-h-[140px] overflow-auto border border-slate-700 text-xs">
              <style>{cssContent}</style>
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </div>
        </div>
      )}

      {/* 4. WORD VIEWER / EDITOR */}
      {editorType === 'word' && (
        <div className="flex flex-col gap-2">
          <textarea
            value={wordContent}
            onChange={(e) => setWordContent(e.target.value)}
            rows={4}
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 resize-none"
            placeholder="Ketik tag HTML format Word..."
          />
          <div className="bg-white text-slate-900 p-4 rounded-xl border border-slate-700 min-h-[100px] text-xs">
            <div dangerouslySetInnerHTML={{ __html: wordContent }} />
          </div>
        </div>
      )}

      {/* Feedback banner */}
      {evaluationFeedback && (
        <div
          className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
            isSuccess ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
          }`}
        >
          {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          <span>{evaluationFeedback}</span>
        </div>
      )}
    </div>
  );
};
