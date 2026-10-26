import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CHEATSHEETS, CheatSheetEntry } from '../../content/cheatsheet';
import { sound } from '../../services/sound';
import { BookOpen, Search, ArrowLeft, Copy, Check } from 'lucide-react';

export const DictionaryView: React.FC = () => {
  const { setView } = useGameStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const filtered = CHEATSHEETS.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.syntax.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopy = (text: string, name: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

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
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
              Kamus & Cheat Sheet
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Referensi Cepat KantorKu</h1>
          </div>
        </div>
      </div>

      {/* Search & Category Tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari rumus (misal: VLOOKUP, filter, IF)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'excel', 'coding', 'word'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition cursor-pointer capitalize ${
                activeCategory === cat ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-3.5">
        {filtered.map((item) => (
          <div
            key={item.name}
            className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                  {item.category}
                </span>
                <h3 className="font-extrabold text-sm text-slate-900">{item.name}</h3>
                {item.shortcut && (
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold">
                    {item.shortcut}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

              <div className="pt-2 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Sintaks:</div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 font-mono text-xs text-slate-800">
                  {item.syntax}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 flex flex-col justify-between shrink-0 md:w-64 gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Contoh Praktik:</span>
                <div className="font-mono text-xs text-emerald-700 mt-1 break-all">{item.example}</div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(item.example, item.name)}
                className="flex items-center justify-center gap-1.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition cursor-pointer"
              >
                {copiedName === item.name ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Rumus</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
