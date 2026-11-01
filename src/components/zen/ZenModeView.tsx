import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { SpreadsheetEditor } from '../editor/SpreadsheetEditor';
import { CodeScriptEditor } from '../editor/CodeScriptEditor';
import { WordDocumentEditor } from '../editor/WordDocumentEditor';
import { SheetGrid } from '../../types';
import { sound } from '../../services/sound';
import { Coffee, ArrowLeft, RefreshCw, FileSpreadsheet, Code2, FileText } from 'lucide-react';

export const ZenModeView: React.FC = () => {
  const { setView } = useGameStore();
  const [activeTool, setActiveTool] = useState<'excel' | 'coding' | 'word'>('excel');

  const sampleExcelGrid: SheetGrid = {
    A1: { raw: 'Bulan', isHeader: true },
    B1: { raw: 'Pemasukan', isHeader: true },
    C1: { raw: 'Pengeluaran', isHeader: true },
    D1: { raw: 'Laba Bersih', isHeader: true },
    A2: { raw: 'Januari' },
    B2: { raw: '25000000', format: 'rupiah' },
    C2: { raw: '18000000', format: 'rupiah' },
    D2: { raw: '=B2-C2', format: 'rupiah' },
    A3: { raw: 'Februari' },
    B3: { raw: '32000000', format: 'rupiah' },
    C3: { raw: '21000000', format: 'rupiah' },
    D3: { raw: '=B3-C3', format: 'rupiah' },
    A4: { raw: 'TOTAL LABA', isHeader: true },
    B4: { raw: '=SUM(B2:B3)', format: 'rupiah' },
    C4: { raw: '=SUM(C2:C3)', format: 'rupiah' },
    D4: { raw: '=SUM(D2:D3)', format: 'rupiah' },
  };

  const [excelGrid, setExcelGrid] = useState<SheetGrid>(sampleExcelGrid);
  const [code, setCode] = useState<string>(
    '// Zen Mode: Eksperimen kode JavaScript tanpa batas waktu\nfunction hitungBonus(omzet, persen) {\n  return omzet * (persen / 100);\n}\nconsole.log("Bonus:", hitungBonus(10000000, 5));'
  );
  const [wordDoc, setWordDoc] = useState<string>(
    '<h1>Catatan Santai di Pantry Kantor</h1><p>Ruang untuk mencatat ide, coret-coret SOP, atau merancang draft surat tanpa dinilai.</p>'
  );

  const handleCellChange = (addr: string, data: any) => {
    setExcelGrid((prev) => ({
      ...prev,
      [addr.toUpperCase()]: {
        ...(prev[addr.toUpperCase()] || { raw: '' }),
        ...data,
      },
    }));
  };

  const handleResetData = () => {
    sound.playClick();
    setExcelGrid(sampleExcelGrid);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-7xl mx-auto pb-4 gap-3">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setView('office');
            }}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 uppercase flex items-center gap-1">
                <Coffee className="w-3 h-3" />
                Zen Mode & Latihan Bebas
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-semibold text-slate-700">Bereksperimen Tanpa Timer & Nilai</span>
            </div>
          </div>
        </div>

        {/* Switch Tools */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTool('excel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTool === 'excel' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Excel</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTool('coding')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTool === 'coding' ? 'bg-white text-indigo-800 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Coding</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTool('word')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTool === 'word' ? 'bg-white text-rose-800 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-rose-600" />
              <span>Word</span>
            </button>
          </div>

          {activeTool === 'excel' && (
            <button
              type="button"
              onClick={handleResetData}
              className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg cursor-pointer transition"
              title="Reset Dataset Contoh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-hidden">
        {activeTool === 'excel' && (
          <SpreadsheetEditor grid={excelGrid} onCellChange={handleCellChange} />
        )}
        {activeTool === 'coding' && (
          <CodeScriptEditor code={code} onChange={(c) => setCode(c)} />
        )}
        {activeTool === 'word' && (
          <WordDocumentEditor content={wordDoc} onChange={(w) => setWordDoc(w)} />
        )}
      </div>
    </div>
  );
};
