import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { DETECTIVE_CASES, DetectiveCase } from '../../content/detectiveCases';
import { SpreadsheetEditor } from '../editor/SpreadsheetEditor';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Search, Award, AlertCircle, ArrowLeft, Lightbulb, CheckCircle2 } from 'lucide-react';

export const DetectiveView: React.FC = () => {
  const { setView, addCoins, addXp } = useGameStore();
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [solvedCases, setSolvedCases] = useState<string[]>([]);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const currentCase = DETECTIVE_CASES[selectedCaseIdx];
  const isSolved = solvedCases.includes(currentCase.id);

  const handleCellClick = (cellAddr: string) => {
    sound.playClick();
    setSelectedCell(cellAddr);

    if (cellAddr.toUpperCase() === currentCase.culpritCell.toUpperCase()) {
      sound.playSuccess();
      confetti({ particleCount: 70, spread: 60 });
      setShowExplanation(true);
      if (!isSolved) {
        setSolvedCases([...solvedCases, currentCase.id]);
        addCoins(currentCase.coinReward);
        addXp(currentCase.xpReward);
      }
    } else {
      sound.playError();
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-5xl mx-auto pb-12">
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
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase">
                Mode Detektif & Audit
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-semibold text-slate-600">
                Selesai: {solvedCases.length}/{DETECTIVE_CASES.length} Kasus
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">{currentCase.title}</h1>
          </div>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center gap-2">
          {DETECTIVE_CASES.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedCaseIdx(i);
                setSelectedCell(null);
                setShowExplanation(false);
                setShowHint(false);
              }}
              className={`w-8 h-8 rounded-xl font-bold text-xs transition cursor-pointer ${
                selectedCaseIdx === i
                  ? 'bg-purple-600 text-white shadow-md'
                  : solvedCases.includes(c.id)
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Case Brief Banner */}
      <div className="p-4 bg-purple-50/70 border border-purple-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <Search className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-purple-900">Brief Kasus: </span>
            <span className="text-purple-800">{currentCase.story}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowHint(true)}
          className="px-3 py-1.5 bg-white hover:bg-purple-100 text-purple-700 border border-purple-200 font-semibold rounded-xl text-xs transition shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Lihat Hint</span>
        </button>
      </div>

      {showHint && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-in fade-in">
          <span className="font-bold">Petunjuk Detektif: </span>
          {currentCase.hint}
        </div>
      )}

      {/* Interactive Sheet Grid to Click */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Klik langsung pada sel yang memicu kesalahan untuk menandainya!</span>
          {selectedCell && (
            <span className="font-mono font-bold text-slate-800">
              Sel Dipilih: {selectedCell} {selectedCell === currentCase.culpritCell ? '✅ TEPAT!' : '❌ BUKAN'}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="border-collapse w-full text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-2 border border-slate-200 w-10 text-center">#</th>
                {['A', 'B', 'C', 'D'].map((col) => (
                  <th key={col} className="p-2 border border-slate-200 text-center font-mono">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row}>
                  <td className="p-2 border border-slate-200 text-center bg-slate-50 font-semibold text-slate-500 font-mono">
                    {row}
                  </td>
                  {['A', 'B', 'C', 'D'].map((col) => {
                    const addr = `${col}${row}`;
                    const cell = currentCase.suspectSheet[addr];
                    if (!cell) {
                      return <td key={addr} className="p-2 border border-slate-200 bg-white" />;
                    }

                    const isTarget = selectedCell === addr;
                    const isCulprit = addr === currentCase.culpritCell;

                    return (
                      <td
                        key={addr}
                        onClick={() => handleCellClick(addr)}
                        className={`p-2 border border-slate-200 cursor-pointer font-mono transition ${
                          cell.isHeader ? 'bg-slate-100 font-bold text-slate-800' : 'bg-white hover:bg-purple-50'
                        } ${
                          isTarget && isCulprit
                            ? 'ring-2 ring-emerald-500 bg-emerald-50 font-bold'
                            : isTarget
                            ? 'ring-2 ring-rose-500 bg-rose-50'
                            : ''
                        }`}
                      >
                        <div className="truncate">{cell.raw}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Solved Explanation Box */}
      {showExplanation && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-3xl space-y-2 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Audit Berhasil! Sel {currentCase.culpritCell} Terbukti Bermasalah</span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">{currentCase.explanation}</p>
          <div className="text-[11px] font-semibold text-emerald-700 pt-1">
            Imbalan Diterima: +{currentCase.xpReward} XP & +{currentCase.coinReward} Koin
          </div>
        </div>
      )}
    </div>
  );
};
