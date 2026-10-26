import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { LEVELS } from '../../content/levels';
import { ModuleType, TierLevel, TIERS } from '../../types';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { sound } from '../../services/sound';
import { ALL_LESSONS } from '../../content/lessons';
import {
  FileSpreadsheet,
  Code2,
  FileText,
  Star,
  Lock,
  Play,
  Award,
  Globe,
  GraduationCap,
} from 'lucide-react';

export const CareerMapView: React.FC = () => {
  const { profile, startMission, openLessonView } = useGameStore();
  const [activeModule, setActiveModule] = useState<ModuleType>('excel');
  const [selectedTier, setSelectedTier] = useState<TierLevel>(profile.currentTier);

  const filteredLevels = LEVELS.filter((l) => l.module === activeModule);

  const masteryPercent = profile.moduleMastery[activeModule] || 0;

  const getMasteryBadge = (pct: number) => {
    if (pct >= 85) return { label: 'Expert', color: 'bg-purple-100 text-purple-700' };
    if (pct >= 60) return { label: 'Dikuasai', color: 'bg-emerald-100 text-emerald-700' };
    if (pct >= 25) return { label: 'Berkembang', color: 'bg-blue-100 text-blue-700' };
    return { label: 'Baru', color: 'bg-slate-100 text-slate-700' };
  };

  const masteryStatus = getMasteryBadge(masteryPercent);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-12">
      {/* Module Selector & Skill Mastery Radar Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              Peta Karier & Skill Tree v2.0
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${masteryStatus.color}`}>
              {masteryStatus.label} ({masteryPercent}%)
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Jalur Pembelajaran Profesional</h1>
          <p className="text-xs text-slate-500 mt-1">
            Empat pilar keahlian: Excel, Web (HTML/CSS), JavaScript, dan Word Bisnis & Akademik.
          </p>
        </div>

        {/* Module Switcher Tabs (Excel, Web, JS, Word) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveModule('excel');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeModule === 'excel' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Excel</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveModule('web');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeModule === 'web' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-orange-600" />
            <span>Track Web</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveModule('coding');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeModule === 'coding' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Track JS</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveModule('word');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeModule === 'word' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-rose-600" />
            <span>Word & Akademik</span>
          </button>
        </div>
      </div>

      {/* Tier Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {([1, 2, 3, 4, 5, 6, 7] as TierLevel[]).map((t) => {
          const tInfo = TIERS[t];
          const isSelected = selectedTier === t;
          const isPlayerTier = profile.currentTier === t;

          return (
            <button
              key={t}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedTier(t);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition border cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{tInfo.badge}</span>
              <span>
                Tier {t}: {tInfo.title}
              </span>
              {isPlayerTier && (
                <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                  Kariermu
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Levels Pathway Nodes */}
      <div className="flex flex-col gap-4">
        {filteredLevels.map((lvl, index) => {
          const isCompleted = profile.completedLevelIds.includes(lvl.id);
          const stars = profile.levelStars[lvl.id] || 0;
          const isUnlocked = lvl.tier <= profile.currentTier || isCompleted || index === 0;

          return (
            <div
              key={lvl.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isCompleted
                  ? 'bg-white border-emerald-200 shadow-xs'
                  : isUnlocked
                  ? 'bg-white border-slate-300 shadow-md ring-1 ring-slate-200'
                  : 'bg-slate-50/80 border-slate-200 opacity-60'
              }`}
            >
              {/* Level Info Left */}
              <div className="flex items-start gap-4">
                <CharacterAvatar id={lvl.character} size="md" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      Tier {lvl.tier} • Bab {lvl.chapter}
                    </span>
                    {lvl.scale && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 uppercase">
                        Skala: {lvl.scale}
                      </span>
                    )}
                    {lvl.track && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                        Track {lvl.track.toUpperCase()}
                      </span>
                    )}
                    {lvl.isBoss && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Boss Level
                      </span>
                    )}
                    {isCompleted && (
                      <div className="flex items-center gap-0.5 ml-1">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 mt-1">{lvl.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{lvl.subtitle}</p>

                  {/* Skills Tagged */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {lvl.skillsTaught.map((skill, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button Right */}
              <div className="flex items-center gap-3 self-end md:self-center">
                <div className="text-right text-xs text-slate-500 hidden md:block">
                  <div className="font-semibold text-slate-700">+{lvl.xpReward} XP</div>
                  <div>+{lvl.coinReward} Koin</div>
                </div>

                {isUnlocked ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const lesson = ALL_LESSONS.find(
                          (l) => l.relatedLevels.includes(lvl.id) || l.track === lvl.module
                        );
                        openLessonView(lesson?.id);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition cursor-pointer"
                      title="Pelajari materi teori dan contoh interaktif di Pusat Belajar"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="hidden sm:inline">Pelajari</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => startMission(lvl.id)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isCompleted ? 'Main Ulang' : 'Mulai Tugas'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-200 text-slate-500 rounded-xl text-xs font-semibold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Terkunci</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
