import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { ACHIEVEMENTS } from '../../content/achievements';
import { Achievement } from '../../types';
import { sound } from '../../services/sound';
import { Trophy, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { profile, setView } = useGameStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered =
    activeCategory === 'all'
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((a) => a.category === activeCategory);

  const unlockedCount = ACHIEVEMENTS.filter(
    (a) => profile.unlockedAchievements.includes(a.id) || a.id === 'ach-01'
  ).length;

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12">
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
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase">
              Pencapaian & Medali
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Daftar Rekor Kinerja Kantor</h1>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 font-medium">Terbuka</span>
          <div className="text-base font-extrabold text-slate-800 font-mono">
            {unlockedCount} / {ACHIEVEMENTS.length}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'career', 'excel', 'coding', 'word', 'audit', 'speed'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveCategory(cat);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition cursor-pointer capitalize ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'all'
              ? 'Semua Lencana'
              : cat === 'career'
              ? 'Karier'
              : cat === 'excel'
              ? 'Excel'
              : cat === 'coding'
              ? 'Coding'
              : cat === 'word'
              ? 'Word'
              : cat === 'audit'
              ? 'Audit & Detektif'
              : 'Kecepatan'}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {filtered.map((ach) => {
          const isUnlocked = profile.unlockedAchievements.includes(ach.id) || ach.id === 'ach-01';

          return (
            <div
              key={ach.id}
              className={`p-4 rounded-3xl border transition flex items-start gap-3.5 ${
                isUnlocked ? 'bg-white border-amber-200 shadow-xs' : 'bg-slate-50 border-slate-200/60 opacity-60'
              }`}
            >
              <div
                className={`text-3xl p-3 rounded-2xl flex items-center justify-center shrink-0 ${
                  isUnlocked ? 'bg-amber-50 border border-amber-100 shadow-inner' : 'bg-slate-100 grayscale'
                }`}
              >
                {ach.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs text-slate-900 truncate">{ach.title}</h3>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {ach.description}
                </p>
                <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {ach.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
