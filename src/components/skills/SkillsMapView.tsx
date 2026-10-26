/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Peta Keterampilan (Skills Map View) & Jalur Peran
 * Compliant with PATCH v9 & v9.1 Wave S0.
 */

import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { DOMAIN_CATALOG, DomainId, Skill } from '../../types/skills';
import { ALL_MANIFESTS, getSkillsByDomain, getAvailableSkillIds } from '../../content/skills';
import { ROLES, calculateRoleReadiness, MANDATORY_ROLE_DISCLAIMER } from '../../content/roles';
import { D12_LEVELS, D12Level } from '../../content/skills/d12-komunikasi/levels';
import { D12_LESSONS } from '../../content/skills/d12-komunikasi/lessons';
import { D12_QUIZZES } from '../../content/skills/d12-komunikasi/quizzes';
import { D12_CHEATSHEET } from '../../content/skills/d12-komunikasi/cheatsheet';
import { EmailEditor } from '../engines/EmailEditor';
import { SimulationEngine } from '../engines/SimulationEngine';
import { AdvancedQuizEngine } from '../engines/AdvancedQuizEngine';
import { sound } from '../../services/sound';
import {
  Compass,
  Search,
  Target,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
  Award,
  AlertCircle,
  FileText,
  X,
  Play,
  Lightbulb,
} from 'lucide-react';

export const SkillsMapView: React.FC = () => {
  const { profile, setTargetRoleId, updateSkillMastery, updateDomainMastery, openLessonView, setView } =
    useGameStore();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'semua' | 'aktif' | 'segera-hadir'>('semua');
  const [activeModalDomain, setActiveModalDomain] = useState<DomainId | null>(null);
  const [activePracticeLevel, setActivePracticeLevel] = useState<D12Level | null>(null);
  const [practiceSuccessMessage, setPracticeSuccessMessage] = useState<string | null>(null);

  const availableSkillIds = getAvailableSkillIds();
  const currentRoleId = profile.targetRoleId || 'admin-perkantoran';
  const currentRole = ROLES.find((r) => r.id === currentRoleId) || ROLES[0];

  const readinessData = calculateRoleReadiness(
    currentRole,
    profile.skillMastery || {},
    availableSkillIds
  );

  // Filtered Domains
  const domainKeys = Object.keys(DOMAIN_CATALOG) as DomainId[];
  const filteredDomains = domainKeys.filter((id) => {
    const meta = DOMAIN_CATALOG[id];
    const matchesSearch =
      meta.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meta.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meta.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'semua'
        ? true
        : selectedFilter === 'aktif'
        ? meta.status === 'aktif'
        : meta.status === 'segera-hadir';
    return matchesSearch && matchesFilter;
  });

  const handleSelectRole = (roleId: string) => {
    sound.playClick();
    setTargetRoleId(roleId);
  };

  const handleOpenDomain = (id: DomainId) => {
    sound.playClick();
    setActiveModalDomain(id);
    setActivePracticeLevel(null);
    setPracticeSuccessMessage(null);
  };

  const handlePracticeLevelComplete = (lvl: D12Level, score: number) => {
    sound.playSuccess();
    setPracticeSuccessMessage(`Selamat! Latihan "${lvl.title}" berhasil diselesaikan dengan skor ${score}%.`);
    // Award skill mastery & domain mastery
    if (lvl.domainId === 'D12') {
      const skillId =
        lvl.engine === 'email-editor'
          ? 'D12-SKILL-01'
          : lvl.engine === 'simulation-engine'
          ? 'D12-SKILL-02'
          : 'D12-SKILL-03';
      updateSkillMastery(skillId, score);
      updateDomainMastery('D12', 40);
    }
  };

  const goalPresets = [
    { label: 'Admin Perkantoran', roleId: 'admin-perkantoran', icon: '📋' },
    { label: 'Staf Keuangan', roleId: 'staf-akuntansi', icon: '📊' },
    { label: 'Buka Usaha / UMKM', roleId: 'pemilik-umkm', icon: '🏪' },
    { label: 'Fresh Graduate', roleId: 'pencari-kerja-freshgrad', icon: '🌱' },
    { label: 'Mahasiswa Skripsi', roleId: 'mahasiswa-tingkat-akhir', icon: '🎓' },
    { label: 'Customer Service', roleId: 'customer-service', icon: '🎧' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-16">
      {/* Hero Banner: Semesta Keterampilan & Wizard Tujuan */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-800 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-emerald-500/30">
                <Compass className="w-3.5 h-3.5" />
                Semesta Keterampilan v9.1
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium">
                17 Domain & 16 Jalur Peran
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">Peta Keterampilan Profesional</h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Jalur karier berbasis kompetensi nyata: dari penguasaan teknis spreadsheet hingga etiket komunikasi
              bisnis, diplomasi, dan integritas kerja.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl shrink-0 backdrop-blur-xs">
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-xl font-black text-emerald-400 font-mono">4</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Domain Aktif</div>
            </div>
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-xl font-black text-slate-300 font-mono">13</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Segera Hadir</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-black text-indigo-400 font-mono">16</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Jalur Peran</div>
            </div>
          </div>
        </div>

        {/* Wizard: Mulai dari Tujuanmu */}
        <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Mulai dari Tujuanmu: Pilih Target Karier</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {goalPresets.map((preset) => {
              const isSelected = currentRoleId === preset.roleId;
              return (
                <button
                  key={preset.roleId}
                  type="button"
                  onClick={() => handleSelectRole(preset.roleId)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200'
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Role Readiness Overview Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className="text-3xl p-3 bg-indigo-50 rounded-2xl border border-indigo-100 shrink-0">
              {currentRole.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{currentRole.name}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 uppercase tracking-wide">
                  {currentRole.reviewStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentRole.tagline}</p>
            </div>
          </div>

          {/* Readiness Gauge */}
          <div className="flex items-center gap-4 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
            <div>
              <div className="text-[11px] font-bold text-slate-500">Estimasi Kesiapan Kerja</div>
              <div className="text-2xl font-black text-emerald-600 font-mono">
                {readinessData.readinessPercent}%
              </div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-emerald-500 flex items-center justify-center font-black text-xs text-slate-700">
              {readinessData.readinessPercent}%
            </div>
          </div>
        </div>

        {/* Transparent Note on Unavailable Skills */}
        {readinessData.unavailableSkillsPercent > 0 && (
          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-xs text-blue-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Keterbukaan Informasi:</strong> {readinessData.unavailableSkillsPercent}% keterampilan peran ini
              berada di domain gelombang mendatang (S1-S3) dan belum aktif. Skor kesiapan di atas dihitung hanya dari
              keterampilan yang telah tersedia saat ini.
            </span>
          </div>
        )}

        {/* Priority Gaps Analysis */}
        {readinessData.gaps.length > 0 && (
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Prioritas Belajar Berikutnya (Celah Keterampilan Terbesar):
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {readinessData.gaps.map((gap) => (
                <div
                  key={gap.skillId}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800">{gap.skillName}</div>
                    <div className="text-[10px] text-slate-500">
                      Domain {gap.domainId} • Target Tier {gap.targetTier} • Bobot {gap.weight}/5
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenDomain(gap.domainId as DomainId)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-bold text-emerald-700 transition-colors shrink-0"
                  >
                    Buka Modul
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mandatory Disclaimer */}
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 italic">
          ⚠️ {MANDATORY_ROLE_DISCLAIMER}
        </div>
      </div>

      {/* Domain Cards & Filter Navigation */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl w-fit">
            <button
              type="button"
              onClick={() => setSelectedFilter('semua')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === 'semua' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Semua ({domainKeys.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('aktif')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === 'aktif' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'
              }`}
            >
              Aktif (4)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('segera-hadir')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === 'segera-hadir' ? 'bg-white text-slate-700 shadow-xs' : 'text-slate-500'
              }`}
            >
              Segera Hadir (13)
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari domain atau keahlian..."
              className="pl-9 pr-4 py-2 text-xs rounded-2xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDomains.map((domainId) => {
            const meta = DOMAIN_CATALOG[domainId];
            const isActive = meta.status === 'aktif';
            const manifest = ALL_MANIFESTS[domainId];
            const skills = getSkillsByDomain(domainId);
            const domainMastery = profile.domainMastery?.[domainId] || 0;

            return (
              <div
                key={domainId}
                onClick={() => handleOpenDomain(domainId)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                  isActive
                    ? 'bg-white hover:border-emerald-500 hover:shadow-md border-slate-200/90 group'
                    : 'bg-slate-50/70 border-slate-200/60 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{meta.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isActive ? 'Aktif (S0)' : `Segera Hadir (${meta.wave})`}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 font-mono">{meta.code}</div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {meta.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{meta.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {isActive ? (
                    <>
                      <span className="font-semibold text-slate-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {skills.length} Keterampilan
                      </span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Buka Detail <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-400 text-[11px]">Rilis: Gelombang {meta.wave}</span>
                      <span className="text-slate-400 text-[11px] font-medium">Dalam Pengembangan</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Domain Drilldown Modal */}
      {activeModalDomain && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 flex flex-col gap-6 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2.5 bg-slate-100 rounded-2xl">
                  {DOMAIN_CATALOG[activeModalDomain].icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{activeModalDomain}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        DOMAIN_CATALOG[activeModalDomain].status === 'aktif'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {DOMAIN_CATALOG[activeModalDomain].status === 'aktif' ? 'Aktif' : 'Segera Hadir'}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {DOMAIN_CATALOG[activeModalDomain].name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{DOMAIN_CATALOG[activeModalDomain].description}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveModalDomain(null);
                  setActivePracticeLevel(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active Practice Level Runner if selected */}
            {activePracticeLevel && (
              <div className="flex flex-col gap-4 animate-in fade-in">
                <div className="flex items-center justify-between bg-slate-100 px-4 py-2 rounded-2xl">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Latihan Berjalan: {activePracticeLevel.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePracticeLevel(null)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    Tutup Latihan ✕
                  </button>
                </div>

                {practiceSuccessMessage && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{practiceSuccessMessage}</span>
                  </div>
                )}

                {/* Render Engine dynamically */}
                {activePracticeLevel.engine === 'email-editor' && (
                  <EmailEditor
                    scenarioTitle={activePracticeLevel.title}
                    scenarioBrief={activePracticeLevel.scenarioBrief}
                    initialTo={activePracticeLevel.emailConfig?.initialTo}
                    initialSubject={activePracticeLevel.emailConfig?.initialSubject}
                    initialBody={activePracticeLevel.emailConfig?.initialBody}
                    initialAttachment={activePracticeLevel.emailConfig?.initialAttachment}
                    onComplete={(res) => handlePracticeLevelComplete(activePracticeLevel, res.score)}
                  />
                )}

                {activePracticeLevel.engine === 'simulation-engine' &&
                  activePracticeLevel.simulationScenario && (
                    <SimulationEngine
                      scenario={activePracticeLevel.simulationScenario}
                      onComplete={(res) => handlePracticeLevelComplete(activePracticeLevel, res.scores.total)}
                    />
                  )}

                {activePracticeLevel.engine === 'advanced-quiz-engine' && (
                  <AdvancedQuizEngine
                    questions={D12_QUIZZES}
                    onComplete={(res) => handlePracticeLevelComplete(activePracticeLevel, res.score)}
                  />
                )}
              </div>
            )}

            {/* Normal Drilldown View when not practicing */}
            {!activePracticeLevel && (
              <>
                {/* Active Pilot Domain D12 Content */}
                {activeModalDomain === 'D12' && (
                  <div className="space-y-6">
                    {/* Practice Exercises (3 Engines) */}
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                        <Play className="w-4 h-4 text-emerald-600" />
                        Ruang Latihan Interaktif (3 Mesin Berjalan)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {D12_LEVELS.map((lvl) => (
                          <div
                            key={lvl.id}
                            className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-emerald-500 transition-all flex flex-col justify-between gap-3 shadow-2xs"
                          >
                            <div>
                              <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                                Tier {lvl.tier} • {lvl.engine}
                              </div>
                              <h4 className="text-xs font-bold text-slate-900 mt-1">{lvl.title}</h4>
                              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{lvl.subtitle}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setActivePracticeLevel(lvl);
                                setPracticeSuccessMessage(null);
                              }}
                              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Play className="w-3.5 h-3.5" />
                              Mulai Latihan
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lessons List */}
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        Pelajaran & Studi Kasus Bisnis (3 Materi Penuh)
                      </h3>
                      <div className="space-y-2.5">
                        {D12_LESSONS.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4"
                          >
                            <div>
                              <div className="text-xs font-bold text-slate-900">{lesson.title}</div>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{lesson.summary}</p>
                              <div className="text-[10px] text-slate-400 mt-2">
                                Estimasi: {lesson.estimatedMinutes} menit • Ditinjau: {lesson.lastReviewed}
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold shrink-0">
                              Materi Siap
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cheatsheet Preview */}
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        Lembar Contekan & Template Cepat
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {D12_CHEATSHEET.map((sheet, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs"
                          >
                            <div className="font-bold text-indigo-950 mb-1">{sheet.title}</div>
                            <div className="text-[11px] text-indigo-800 space-y-1">
                              {sheet.items.map((it, i) => (
                                <div key={i}>• {it.label}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* For Domains D1, D2, D5 */}
                {(activeModalDomain === 'D1' || activeModalDomain === 'D2' || activeModalDomain === 'D5') && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                      Domain ini terintegrasi penuh dengan simulator modul utama. Anda dapat menyelesaikan level
                      praktik langsung di <strong>Peta Karier</strong> atau mengerjakan studi kasus nyata di{' '}
                      <strong>Kasus Nyata</strong>.
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setView('career-map');
                          setActiveModalDomain(null);
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs"
                      >
                        Buka Peta Karier
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setView('case-file');
                          setActiveModalDomain(null);
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-xs"
                      >
                        Buka Kasus Nyata
                      </button>
                    </div>
                  </div>
                )}

                {/* For Coming Soon Domains */}
                {DOMAIN_CATALOG[activeModalDomain].status === 'segera-hadir' && (
                  <div className="p-8 rounded-3xl bg-slate-50 border border-dashed border-slate-200 text-center flex flex-col items-center gap-3">
                    <span className="text-4xl">{DOMAIN_CATALOG[activeModalDomain].icon}</span>
                    <h4 className="text-base font-bold text-slate-800">
                      Domain Ini Akan Hadir di Gelombang {DOMAIN_CATALOG[activeModalDomain].wave}
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                      Sesuai peta jalan rilis KantorKu, domain ini membutuhkan mesin atau materi yang dijadwalkan pada
                      gelombang berikutnya. Konten tidak ditampilkan sebelum terverifikasi secara penuh.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
