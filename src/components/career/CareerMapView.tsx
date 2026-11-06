import React, { useState } from 'react';
import { useGameStore, TIER_XP_THRESHOLDS, isLevelUnlocked, isCaseUnlocked } from '../../store/useGameStore';
import { LEVELS } from '../../content/levels';
import { CASE_FILES } from '../../content/caseFiles';
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
  const { profile, startMission, openLessonView, startCaseFile } = useGameStore();
  const [activeModule, setActiveModule] = useState<ModuleType>('excel');
  const [selectedTier, setSelectedTier] = useState<TierLevel>(profile.currentTier);

  const filteredLevels = LEVELS.filter((l) => l.module === activeModule && l.tier === selectedTier);

  const tierCases = CASE_FILES.filter((c) => c.module === activeModule && c.tier === selectedTier);
  const casesUnlocked = isCaseUnlocked(profile, { tier: selectedTier });

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
            className={`flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeModule === 'excel' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Excel</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveModule('web');
            }}
            className={`flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
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
            className={`flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
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
            className={`flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
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
          const isTierLocked = t > profile.currentTier;

          return (
            <button
              key={t}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedTier(t);
              }}
              className={`flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition border cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{tInfo.badge}</span>
              <span>
                Tier {t}: {tInfo.title}
              </span>
              {isTierLocked && <Lock className="w-3 h-3 text-slate-500" />}
              {isPlayerTier && (
                <span className="text-[11px] bg-emerald-700 text-white px-1.5 py-0.2 rounded-full font-bold">
                  Kariermu
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Levels Pathway Nodes */}
      <div className="flex flex-col gap-4">
        {filteredLevels.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
            <p className="text-sm font-bold text-slate-800">Belum ada misi di Tier {selectedTier} untuk modul ini</p>
            <p className="mt-1 text-xs text-slate-600">
              Tier ini belum punya misi latihan untuk jalur ini. Kerjakan Kasus Nyata di bawah untuk mendapat XP dan
              naik jabatan.
            </p>
          </div>
        )}
        {filteredLevels.map((lvl) => {
          const isCompleted = profile.completedLevelIds.includes(lvl.id);
          const stars = profile.levelStars[lvl.id] || 0;
          const isUnlocked = isLevelUnlocked(profile, lvl);
          const tierThreshold = TIER_XP_THRESHOLDS[lvl.tier];
          const xpNeeded = tierThreshold ? Math.max(0, tierThreshold - profile.xp) : 0;

          return (
            <div
              key={lvl.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isCompleted
                  ? 'bg-white border-emerald-200 shadow-xs'
                  : isUnlocked
                  ? 'bg-white border-slate-300 shadow-md ring-1 ring-slate-200'
                  : 'bg-slate-100 border-slate-300'
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
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 uppercase">
                        Skala: {lvl.scale}
                      </span>
                    )}
                    {lvl.track && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                        Track {lvl.track.toUpperCase()}
                      </span>
                    )}
                    {lvl.isBoss && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 flex items-center gap-1">
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
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
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
                      className="flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[44px] min-w-[44px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition cursor-pointer"
                      title="Pelajari materi teori dan contoh interaktif di Pusat Belajar"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="hidden sm:inline">Pelajari</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => startMission(lvl.id)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isCompleted ? 'Main Ulang' : 'Mulai Tugas'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-200 text-slate-500 rounded-xl text-xs font-semibold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Terkunci</span>
                    </div>
                    {tierThreshold !== undefined && (
                      <span className="text-[11px] text-slate-500 font-medium text-right leading-snug max-w-[220px]">
                        Terbuka di Tier {lvl.tier} (butuh {tierThreshold.toLocaleString('id-ID')} XP total
                        {xpNeeded > 0 && <>, kurang <b className="text-slate-500">{xpNeeded.toLocaleString('id-ID')} XP</b></>})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <section aria-labelledby="career-cases-heading" className="flex flex-col gap-3">
        <h2 id="career-cases-heading" className="text-base font-extrabold text-white">
          Kasus Nyata Tier {selectedTier}
        </h2>
        {tierCases.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-500 bg-white p-4 text-xs text-slate-700">
            Belum ada kasus nyata di tier ini untuk jalur ini.
          </p>
        )}
        {tierCases.map((c) => {
          const done = Boolean(profile.xpClaims?.[`case:${c.id}`]);
          return (
            <article
              key={c.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-amber-800">Kasus Nyata, {c.industry}</p>
                <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                <p className="text-xs text-slate-700">{c.summary}</p>
                <p className="text-xs text-slate-600">
                  Tenggat {c.deadlineHours} jam, +{c.xpReward} XP{done ? ', selesai' : ''}
                </p>
              </div>
              <button
                type="button"
                disabled={!casesUnlocked}
                onClick={() => {
                  sound.playClick();
                  startCaseFile(c.id);
                }}
                className="inline-flex items-center justify-center gap-1.5 min-h-11 shrink-0 px-4 rounded-xl text-xs font-bold cursor-pointer disabled:cursor-not-allowed bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-600 focus-visible:outline-2 focus-visible:outline-emerald-600"
              >
                {!casesUnlocked ? (
                  <>
                    <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                    Terkunci
                  </>
                ) : done ? (
                  'Kerjakan lagi'
                ) : (
                  'Buka kasus'
                )}
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
};
