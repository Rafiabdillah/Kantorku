import React, { useMemo, useState } from 'react';
import { CheckCircle2, Clock, FileSpreadsheet, FileText, Globe, Lock } from 'lucide-react';
import { CASE_FILES } from '../../content/caseFiles';
import { isCaseUnlocked, useGameStore } from '../../store/useGameStore';
import { ModuleType, TierLevel, TIERS } from '../../types';

const MODULE_LABEL: Partial<Record<ModuleType, { label: string; icon: React.ReactNode; tone: string }>> = {
  excel: { label: 'Excel', icon: <FileSpreadsheet className="w-3.5 h-3.5" aria-hidden="true" />, tone: 'bg-emerald-100 text-emerald-800' },
  word: { label: 'Word', icon: <FileText className="w-3.5 h-3.5" aria-hidden="true" />, tone: 'bg-blue-100 text-blue-800' },
  web: { label: 'Web', icon: <Globe className="w-3.5 h-3.5" aria-hidden="true" />, tone: 'bg-indigo-100 text-indigo-800' },
};

type Filter = 'all' | 'excel' | 'word' | 'web';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'excel', label: 'Excel' },
  { id: 'word', label: 'Word' },
  { id: 'web', label: 'Web' },
];

export const CaseCatalogView: React.FC = () => {
  const { profile, startCaseFile } = useGameStore();
  const [filter, setFilter] = useState<Filter>('all');

  const grouped = useMemo(() => {
    const visible = CASE_FILES.filter((c) => filter === 'all' || c.module === filter);
    const tiers = [...new Set(visible.map((c) => c.tier))].sort((a, b) => a - b) as TierLevel[];
    return tiers.map((tier) => ({ tier, items: visible.filter((c) => c.tier === tier) }));
  }, [filter]);

  const doneCount = CASE_FILES.filter((c) => profile.xpClaims?.[`case:${c.id}`]).length;

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto gap-5 pb-6">
      <header className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Kasus Nyata</h1>
        <p className="mt-1 text-sm text-slate-600">
          Klien memberi brief lewat email dan chat. Kamu bertanya, mengerjakan berkasnya, lalu menulis serah terima.
          Selesai {doneCount} dari {CASE_FILES.length} kasus.
        </p>
        <div role="group" aria-label="Filter modul kasus" className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`min-h-11 px-4 rounded-xl text-xs font-bold border cursor-pointer transition focus-visible:outline-2 focus-visible:outline-emerald-600 ${
                filter === f.id
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      {grouped.length === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600">
          Belum ada kasus untuk modul ini.
        </p>
      )}

      {grouped.map(({ tier, items }) => {
        const info = TIERS[tier];
        const tierLocked = !isCaseUnlocked(profile, { tier });
        return (
          <section key={tier} aria-labelledby={`case-tier-${tier}`} className="flex flex-col gap-3">
            <h2 id={`case-tier-${tier}`} className="flex items-center gap-2 text-sm font-extrabold text-slate-100">
              <span aria-hidden="true">{info.badge}</span>
              <span>
                Tier {tier}: {info.title}
              </span>
              {tierLocked && (
                <span className="text-xs font-semibold text-slate-300">
                  (butuh {info.minXp.toLocaleString('id-ID')} XP)
                </span>
              )}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {items.map((c) => {
                const done = Boolean(profile.xpClaims?.[`case:${c.id}`]);
                const mod = MODULE_LABEL[c.module];
                return (
                  <article
                    key={c.id}
                    className={`flex flex-col justify-between gap-3 rounded-2xl border p-4 ${
                      tierLocked ? 'bg-slate-100 border-slate-300' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {mod && (
                          <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold ${mod.tone}`}>
                            {mod.icon}
                            {mod.label}
                          </span>
                        )}
                        {done && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                            Selesai
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                      <p className="text-xs text-slate-600">{c.industry}</p>
                      <p className="text-sm text-slate-700">{c.summary}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        Tenggat {c.deadlineHours} jam, +{c.xpReward} XP
                      </p>
                      <button
                        type="button"
                        disabled={tierLocked}
                        onClick={() => startCaseFile(c.id)}
                        className="inline-flex items-center justify-center gap-1.5 min-h-11 px-4 rounded-xl text-xs font-bold cursor-pointer disabled:cursor-not-allowed bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-600 focus-visible:outline-2 focus-visible:outline-emerald-600"
                      >
                        {tierLocked ? (
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
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
