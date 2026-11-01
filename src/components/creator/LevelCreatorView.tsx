import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/sound';
import { Sparkles, ArrowLeft, Download, Upload, CheckCircle2 } from 'lucide-react';

export const LevelCreatorView: React.FC = () => {
  const { setView } = useGameStore();

  const [title, setTitle] = useState<string>('Tugas Custom: Rekap Kas Harian');
  const [moduleType, setModuleType] = useState<'excel' | 'coding' | 'word'>('excel');
  const [objective, setObjective] = useState<string>('Hitung total belanja di sel B5 memakai SUM');
  const [hint, setHint] = useState<string>('Gunakan formula =SUM(B2:B4)');
  const [exportJson, setExportJson] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleGenerateLevel = () => {
    sound.playSuccess();
    const customLevel = {
      id: 'custom-' + Date.now(),
      module: moduleType,
      tier: 2,
      chapter: 99,
      order: 1,
      title,
      subtitle: 'Level buatan komunitas KantorKu',
      character: 'dimas',
      dialogue: [{ speaker: 'dimas', text: 'Ini tugas custom spesial yang dirancang untuk menguji logikamu!' }],
      conceptBrief: 'Latihan fleksibel buatan komunitas/dosen.',
      workedExample: '=SUM(B2:B4)',
      objectives: [{ id: 'obj-c1', text: objective, completed: false }],
      initialData: {
        excel: {
          A1: { raw: 'Item', isHeader: true },
          B1: { raw: 'Nominal', isHeader: true },
          A2: { raw: 'Bahan Baku' },
          B2: { raw: '50000' },
          A3: { raw: 'Kemasan' },
          B3: { raw: '20000' },
          A4: { raw: 'TOTAL', isHeader: true },
          B4: { raw: '' },
        },
      },
      hints: [hint, 'Cek kembali tanda sama dengan (=)', 'Pastikan rentang sel tepat'],
      bossHelp: 'Gunakan =SUM(B2:B3) di sel B4.',
      referenceSolution: 'B4: =SUM(B2:B3)',
      solutionExplanation: 'Penjumlahan standar.',
      commonMistakes: ['Ketik manual angka'],
      xpReward: 200,
      coinReward: 80,
      estimatedMinutes: 5,
      skillsTaught: ['Custom Logic', 'Community Challenge'],
    };

    setExportJson(JSON.stringify(customLevel, null, 2));
  };

  const handleCopyJson = () => {
    sound.playClick();
    navigator.clipboard.writeText(exportJson);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-12">
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
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase">
              Kreator Level
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Rancang Tugas Kantor Sendiri</h1>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Judul Tugas</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Modul Pembelajaran</label>
          <div className="flex gap-2">
            {(['excel', 'coding', 'word'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModuleType(m)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer capitalize ${
                  moduleType === m ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Target / Checklist Objektif</label>
          <input
            type="text"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Petunjuk (Hint)</label>
          <input
            type="text"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerateLevel}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Buat Kode Level JSON</span>
        </button>

        {exportJson && (
          <div className="space-y-2 pt-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Kode JSON Level:</span>
              <button
                type="button"
                onClick={handleCopyJson}
                className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
              >
                {isCopied ? 'Tersalin ke Clipboard!' : 'Salin JSON'}
              </button>
            </div>
            <textarea
              readOnly
              value={exportJson}
              className="w-full h-44 p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl outline-none resize-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};
