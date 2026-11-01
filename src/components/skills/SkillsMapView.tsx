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

import { D14_LEVELS, D14Level } from '../../content/skills/d14-literasi-digital/levels';
import { D14_LESSONS } from '../../content/skills/d14-literasi-digital/lessons';
import { D14_QUIZZES } from '../../content/skills/d14-literasi-digital/quizzes';
import { D14_CHEATSHEET } from '../../content/skills/d14-literasi-digital/cheatsheet';

import { D15_LEVELS, D15Level } from '../../content/skills/d15-karier-akademik/levels';
import { D15_LESSONS } from '../../content/skills/d15-karier-akademik/lessons';
import { D15_QUIZZES } from '../../content/skills/d15-karier-akademik/quizzes';
import { D15_CHEATSHEET } from '../../content/skills/d15-karier-akademik/cheatsheet';

import { D7_LEVELS, D7Level } from '../../content/skills/d7-keuangan-pribadi/levels';
import { D7_LESSONS } from '../../content/skills/d7-keuangan-pribadi/lessons';
import { D7_QUIZZES } from '../../content/skills/d7-keuangan-pribadi/quizzes';
import { D7_CHEATSHEET } from '../../content/skills/d7-keuangan-pribadi/cheatsheet';

import { D11_LEVELS, D11Level } from '../../content/skills/d11-manajemen-proyek/levels';
import { D11_LESSONS } from '../../content/skills/d11-manajemen-proyek/lessons';
import { D11_QUIZZES } from '../../content/skills/d11-manajemen-proyek/quizzes';
import { D11_CHEATSHEET } from '../../content/skills/d11-manajemen-proyek/cheatsheet';

import { D3_LEVELS, D3Level } from '../../content/skills/d3-presentasi/levels';
import { D3_LESSONS } from '../../content/skills/d3-presentasi/lessons';
import { D3_QUIZZES } from '../../content/skills/d3-presentasi/quizzes';
import { D3_CHEATSHEET } from '../../content/skills/d3-presentasi/cheatsheet';

import { D6_LEVELS, D6Level } from '../../content/skills/d6-akuntansi/levels';
import { D6_LESSONS } from '../../content/skills/d6-akuntansi/lessons';
import { D6_QUIZZES } from '../../content/skills/d6-akuntansi/quizzes';
import { D6_CHEATSHEET } from '../../content/skills/d6-akuntansi/cheatsheet';

import { D8_LEVELS, D8Level } from '../../content/skills/d8-operasional/levels';
import { D8_LESSONS } from '../../content/skills/d8-operasional/lessons';
import { D8_QUIZZES } from '../../content/skills/d8-operasional/quizzes';
import { D8_CHEATSHEET } from '../../content/skills/d8-operasional/cheatsheet';

import { D9_LEVELS, D9Level } from '../../content/skills/d9-pemasaran/levels';
import { D9_LESSONS } from '../../content/skills/d9-pemasaran/lessons';
import { D9_QUIZZES } from '../../content/skills/d9-pemasaran/quizzes';
import { D9_CHEATSHEET } from '../../content/skills/d9-pemasaran/cheatsheet';

import { D10_LEVELS, D10Level } from '../../content/skills/d10-sdm/levels';
import { D10_LESSONS } from '../../content/skills/d10-sdm/lessons';
import { D10_QUIZZES } from '../../content/skills/d10-sdm/quizzes';
import { D10_CHEATSHEET } from '../../content/skills/d10-sdm/cheatsheet';
import { D4_LEVELS, D4Level } from '../../content/skills/d4-data-sql/levels';
import { D4_LESSONS } from '../../content/skills/d4-data-sql/lessons';
import { D4_QUIZZES } from '../../content/skills/d4-data-sql/quizzes';
import { D4_CHEATSHEET } from '../../content/skills/d4-data-sql/cheatsheet';
import { D17_LEVELS, D17Level } from '../../content/skills/d17-hukum-kepatuhan/levels';
import { D17_LESSONS } from '../../content/skills/d17-hukum-kepatuhan/lessons';
import { D17_QUIZZES } from '../../content/skills/d17-hukum-kepatuhan/quizzes';
import { D17_CASES } from '../../content/skills/d17-hukum-kepatuhan/cases';
import { D17_CHEATSHEET } from '../../content/skills/d17-hukum-kepatuhan/cheatsheet';
import { D17_LEGAL_DISCLAIMER } from '../../content/skills/d17-hukum-kepatuhan/constants';
import { SqlPracticeEngine } from '../engines/SqlPracticeEngine';
import { D13_LEVELS, D13Level } from '../../content/skills/d13-bahasa-inggris/levels';
import { D13_LESSONS } from '../../content/skills/d13-bahasa-inggris/lessons';
import { D13_QUIZZES } from '../../content/skills/d13-bahasa-inggris/quizzes';
import { D13_CHEATSHEET } from '../../content/skills/d13-bahasa-inggris/cheatsheet';
import { D13_CASES } from '../../content/skills/d13-bahasa-inggris/cases';
import { D16_LEVELS, D16Level } from '../../content/skills/d16-desain-uiux/levels';
import { D16_LESSONS } from '../../content/skills/d16-desain-uiux/lessons';
import { D16_QUIZZES } from '../../content/skills/d16-desain-uiux/quizzes';
import { D16_CHEATSHEET } from '../../content/skills/d16-desain-uiux/cheatsheet';
import { D16_CASES } from '../../content/skills/d16-desain-uiux/cases';

type PracticeLevel =
  | D12Level
  | D14Level
  | D15Level
  | D7Level
  | D11Level
  | D3Level
  | D6Level
  | D8Level
  | D9Level
  | D10Level
  | D4Level
  | D17Level
  | D13Level
  | D16Level;

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
  const [activePracticeLevel, setActivePracticeLevel] = useState<PracticeLevel | null>(null);
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
  const activeDomainsCount = domainKeys.filter((id) => DOMAIN_CATALOG[id].status === 'aktif').length;
  const upcomingDomainsCount = domainKeys.filter((id) => DOMAIN_CATALOG[id].status === 'segera-hadir').length;

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

  const handlePracticeLevelComplete = (lvl: PracticeLevel, score: number) => {
    // F2: Ambang batas kelulusan per data level atau tier (Tier 1-2: 70%, Tier 3+: 80%)
    const passThreshold = (lvl as any).passThreshold || (lvl.tier <= 2 ? 70 : 80);
    const passed = score >= passThreshold;

    if (passed) {
      sound.playSuccess();
      setPracticeSuccessMessage(`Selamat! Latihan "${lvl.title}" berhasil diselesaikan dengan skor ${score}%.`);
      // Update skill mastery langsung dari metadata level.skillId
      const targetSkillId = (lvl as any).skillId;
      if (targetSkillId) {
        updateSkillMastery(targetSkillId, score);
      }
    } else {
      sound.playError();
      setPracticeSuccessMessage(`Belum lulus — coba lagi (skor ${score}%)`);
    }
  };

  const [showAllRoles, setShowAllRoles] = useState(false);

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
              <div data-testid="active-domain-count" className="text-xl font-black text-emerald-400 font-mono">{activeDomainsCount}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Domain Aktif</div>
            </div>
            <div className="text-center px-3 border-r border-white/10">
              <div data-testid="upcoming-domain-count" className="text-xl font-black text-slate-300 font-mono">{upcomingDomainsCount}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Segera Hadir</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-black text-indigo-400 font-mono">16</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Jalur Peran</div>
            </div>
          </div>
        </div>

        {/* Wizard: Mulai dari Tujuanmu (Selector 16 Peran Lengkap - F4) */}
        <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Mulai dari Tujuanmu: Pilih Target Karier</span>
            </div>
            <button
              type="button"
              onClick={() => setShowAllRoles(!showAllRoles)}
              className="text-xs text-emerald-300 hover:text-emerald-200 underline font-semibold transition-colors"
            >
              {showAllRoles ? 'Tutup Daftar Lengkap' : 'Lihat Semua 16 Peran'}
            </button>
          </div>

          {/* Quick presets (6 populer) */}
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

          {/* Expanded 16-role selector grid (F4) */}
          {showAllRoles && (
            <div className="mt-2 p-4 bg-slate-950/80 rounded-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 max-h-80 overflow-y-auto">
              {ROLES.map((role) => {
                const isSelected = currentRoleId === role.id;
                const roleReadiness = calculateRoleReadiness(role, profile.domainMastery, availableSkillIds);
                const minTier = Math.min(...role.domainRequirements.map((d) => d.targetTier));
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      handleSelectRole(role.id);
                      setShowAllRoles(false);
                    }}
                    className={`p-2.5 rounded-xl text-left transition-all border flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <span>{role.icon}</span>
                      <span className="truncate">{role.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Min Tier {minTier}</span>
                      <span className="text-amber-300/90 font-mono">{roleReadiness.bobotBelumTersedia}% belum ada</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Role Readiness Overview Card (F1.1 & F1.2) */}
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

          {/* Dual Readiness Gauges (F1) */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Gauge 1: Kesiapan Kerja Total */}
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/80">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Kesiapan Kerja Total</div>
                <div className="text-xl font-black text-emerald-600 font-mono">
                  {readinessData.kesiapanTotal}%
                </div>
                <div className="text-[9px] text-slate-400">Maksimal S0: {readinessData.bobotTersedia}%</div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-emerald-500 flex items-center justify-center font-black text-[11px] text-slate-700">
                {readinessData.kesiapanTotal}%
              </div>
            </div>

            {/* Gauge 2: Kesiapan Domain Tersedia */}
            <div className="flex items-center gap-3 bg-indigo-50/60 px-4 py-2.5 rounded-2xl border border-indigo-100">
              <div>
                <div className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Domain Tersedia</div>
                <div className="text-xl font-black text-indigo-700 font-mono">
                  {readinessData.kesiapanBagianTersedia}%
                </div>
                <div className="text-[9px] text-indigo-500">Dari domain aktif</div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 flex items-center justify-center font-black text-[11px] text-indigo-700">
                {readinessData.kesiapanBagianTersedia}%
              </div>
            </div>
          </div>
        </div>

        {/* Transparent Note on Unavailable Skills (F1.2) - Selalu Ditampilkan */}
        <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Keterbukaan Informasi:</strong> {readinessData.bobotBelumTersedia}% bobot peran ini ada di domain yang belum tersedia (rilis Gelombang S1–S3). Skor kesiapan total ({readinessData.kesiapanTotal}%) dihitung dari seluruh kompetensi peran, di mana domain belum rilis dinilai 0. Skor domain aktif adalah {readinessData.kesiapanBagianTersedia}%.
          </div>
        </div>

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
              Aktif ({activeDomainsCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('segera-hadir')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === 'segera-hadir' ? 'bg-white text-slate-700 shadow-xs' : 'text-slate-500'
              }`}
            >
              Segera Hadir ({upcomingDomainsCount})
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
                data-domain-id={domainId}
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
                      {isActive ? `Aktif (${meta.wave})` : `Segera Hadir (${meta.wave})`}
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
                        {domainId === 'D12' ? 'Pilot: 3 dari 12 sub-topik' : `${skills.length} Keterampilan`}
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
                aria-label="Tutup Modal"
                onClick={() => {
                  setActiveModalDomain(null);
                  setActivePracticeLevel(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {activeModalDomain === 'D17' && (
              <div data-testid="d17-disclaimer-panel" className="p-3 rounded-xl border border-amber-300 bg-amber-50 text-xs text-amber-950">
                {D17_LEGAL_DISCLAIMER}
              </div>
            )}

            {/* Active Practice Level Runner if selected */}
            {activePracticeLevel && (
              <div className="flex flex-col gap-4 animate-in fade-in">
                {activePracticeLevel.domainId === 'D17' && (
                  <div data-testid="d17-disclaimer-practice" className="p-3 rounded-xl border border-amber-300 bg-amber-50 text-xs text-amber-950">
                    {D17_LEGAL_DISCLAIMER}
                  </div>
                )}
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
                  <div
                    className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-between gap-2 ${
                      practiceSuccessMessage.startsWith('Selamat')
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border border-rose-200 text-rose-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {practiceSuccessMessage.startsWith('Selamat') ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>{practiceSuccessMessage}</span>
                    </div>
                    {!practiceSuccessMessage.startsWith('Selamat') && (
                      <button
                        type="button"
                        onClick={() => {
                          const lvl = activePracticeLevel;
                          setActivePracticeLevel(null);
                          setTimeout(() => setActivePracticeLevel(lvl), 50);
                          setPracticeSuccessMessage(null);
                        }}
                        className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shrink-0"
                      >
                        Ulangi
                      </button>
                    )}
                  </div>
                )}

                {/* Render Engine dynamically */}
                {activePracticeLevel.engine === 'email-editor' && 'emailConfig' in activePracticeLevel && (
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
                      scenario={{
                        ...activePracticeLevel.simulationScenario,
                        title: activePracticeLevel.title,
                        scenarioContext: activePracticeLevel.title,
                      } as any}
                      onComplete={(res) => handlePracticeLevelComplete(activePracticeLevel, res.scores.total)}
                    />
                  )}

                {activePracticeLevel.engine === 'advanced-quiz-engine' && (
                  <AdvancedQuizEngine
                    questions={
                      activePracticeLevel.domainId === 'D14'
                        ? D14_QUIZZES
                        : activePracticeLevel.domainId === 'D15'
                        ? D15_QUIZZES
                        : activePracticeLevel.domainId === 'D7'
                        ? D7_QUIZZES
                        : activePracticeLevel.domainId === 'D11'
                        ? D11_QUIZZES
                        : activePracticeLevel.domainId === 'D3'
                        ? D3_QUIZZES
                        : activePracticeLevel.domainId === 'D6'
                        ? D6_QUIZZES
                        : activePracticeLevel.domainId === 'D8'
                        ? D8_QUIZZES
                        : activePracticeLevel.domainId === 'D9'
                        ? D9_QUIZZES
                        : activePracticeLevel.domainId === 'D10'
                        ? D10_QUIZZES
                        : activePracticeLevel.domainId === 'D4'
                        ? D4_QUIZZES
                        : activePracticeLevel.domainId === 'D17'
                        ? D17_QUIZZES
                        : activePracticeLevel.domainId === 'D13'
                        ? D13_QUIZZES
                        : activePracticeLevel.domainId === 'D16'
                        ? D16_QUIZZES
                        : D12_QUIZZES
                    }
                    onComplete={(res) => handlePracticeLevelComplete(activePracticeLevel, res.score)}
                  />
                )}
                {activePracticeLevel.domainId === 'D4' && (
                  <SqlPracticeEngine onComplete={(res) => handlePracticeLevelComplete(activePracticeLevel, res.score)} />
                )}
              </div>
            )}

            {/* Normal Drilldown View when not practicing */}
            {!activePracticeLevel && (
              <>
                {/* Active Domain Pack Content: D12, D14, D15, D7, D11, D3, D6, D8, D9, D10 */}
                {(() => {
                  const getDomainPack = (domainId: DomainId) => {
                    switch (domainId) {
                      case 'D12':
                        return { levels: D12_LEVELS, lessons: D12_LESSONS, cheatsheet: D12_CHEATSHEET, quizzes: D12_QUIZZES };
                      case 'D14':
                        return { levels: D14_LEVELS, lessons: D14_LESSONS, cheatsheet: D14_CHEATSHEET, quizzes: D14_QUIZZES };
                      case 'D15':
                        return { levels: D15_LEVELS, lessons: D15_LESSONS, cheatsheet: D15_CHEATSHEET, quizzes: D15_QUIZZES };
                      case 'D7':
                        return { levels: D7_LEVELS, lessons: D7_LESSONS, cheatsheet: D7_CHEATSHEET, quizzes: D7_QUIZZES };
                      case 'D11':
                        return { levels: D11_LEVELS, lessons: D11_LESSONS, cheatsheet: D11_CHEATSHEET, quizzes: D11_QUIZZES };
                      case 'D3':
                        return { levels: D3_LEVELS, lessons: D3_LESSONS, cheatsheet: D3_CHEATSHEET, quizzes: D3_QUIZZES };
                      case 'D6':
                        return { levels: D6_LEVELS, lessons: D6_LESSONS, cheatsheet: D6_CHEATSHEET, quizzes: D6_QUIZZES };
                      case 'D8':
                        return { levels: D8_LEVELS, lessons: D8_LESSONS, cheatsheet: D8_CHEATSHEET, quizzes: D8_QUIZZES };
                      case 'D9':
                        return { levels: D9_LEVELS, lessons: D9_LESSONS, cheatsheet: D9_CHEATSHEET, quizzes: D9_QUIZZES };
                      case 'D10':
                        return { levels: D10_LEVELS, lessons: D10_LESSONS, cheatsheet: D10_CHEATSHEET, quizzes: D10_QUIZZES };
                      case 'D4':
                        return { levels: D4_LEVELS, lessons: D4_LESSONS, cheatsheet: D4_CHEATSHEET, quizzes: D4_QUIZZES };
                      case 'D17':
                        return { levels: D17_LEVELS, lessons: D17_LESSONS, cheatsheet: D17_CHEATSHEET, quizzes: D17_QUIZZES };
                      case 'D13':
                        return { levels: D13_LEVELS, lessons: D13_LESSONS, cheatsheet: D13_CHEATSHEET, quizzes: D13_QUIZZES };
                      case 'D16':
                        return { levels: D16_LEVELS, lessons: D16_LESSONS, cheatsheet: D16_CHEATSHEET, quizzes: D16_QUIZZES };
                      default:
                        return null;
                    }
                  };

                  const pack = activeModalDomain ? getDomainPack(activeModalDomain) : null;
                  if (!pack) return null;

                  return (
                    <div className="space-y-6">
                      {activeModalDomain === 'D17' && (
                        <div data-testid="d17-disclaimer-lessons" className="p-3 rounded-xl border border-amber-300 bg-amber-50 text-xs text-amber-950">
                          {D17_LEGAL_DISCLAIMER}
                        </div>
                      )}
                      {/* Practice Exercises */}
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                          <Play className="w-4 h-4 text-emerald-600" />
                          Ruang Latihan Interaktif ({pack.levels.length} Level Siap Latihan)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {pack.levels.map((lvl) => (
                            <div
                              key={lvl.id}
                              data-level-id={lvl.id}
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
                          Pelajaran & Studi Kasus ({pack.lessons.length} Materi)
                        </h3>
                        <div className="space-y-2.5">
                          {pack.lessons.map((lesson) => (
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

                      {activeModalDomain === 'D17' && (
                        <div data-testid="d17-disclaimer-case" className="p-4 rounded-2xl border border-amber-300 bg-amber-50">
                          <div className="text-xs font-black text-amber-950 mb-1">Studi Kasus</div>
                          {D17_CASES.map((caseItem) => (
                            <div key={caseItem.id} className="text-xs text-amber-950 mb-2">{caseItem.summary}</div>
                          ))}
                          <div className="text-xs font-bold text-amber-950">{D17_LEGAL_DISCLAIMER}</div>
                        </div>
                      )}
                      {activeModalDomain === 'D13' && (
                        <div data-testid="d13-case" className="p-4 rounded-2xl border border-sky-200 bg-sky-50">
                          <div className="text-xs font-black text-sky-950 mb-1">Studi Kasus</div>
                          {D13_CASES.map((caseItem) => (
                            <div key={caseItem.id} className="text-xs text-sky-950 mb-2">{caseItem.summary}</div>
                          ))}
                        </div>
                      )}
                      {activeModalDomain === 'D16' && (
                        <div data-testid="d16-case" className="p-4 rounded-2xl border border-violet-200 bg-violet-50">
                          <div className="text-xs font-black text-violet-950 mb-1">Studi Kasus</div>
                          {D16_CASES.map((caseItem) => (
                            <div key={caseItem.id} className="text-xs text-violet-950 mb-2">{caseItem.summary}</div>
                          ))}
                        </div>
                      )}

                      {/* Cheatsheet Preview */}
                      <div>
                        {activeModalDomain === 'D17' && (
                          <div data-testid="d17-disclaimer-cheatsheet" className="mb-3 p-3 rounded-xl border border-amber-300 bg-amber-50 text-xs text-amber-950">
                            {D17_LEGAL_DISCLAIMER}
                          </div>
                        )}
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-indigo-600" />
                          Lembar Contekan & Template Cepat
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {pack.cheatsheet.map((sheet: any, idx: number) => {
                            const title = sheet.title || sheet.name || `Lembar ${idx + 1}`;
                            const items: string[] = Array.isArray(sheet.items)
                              ? sheet.items.map((it: any) => (typeof it === 'string' ? it : it.label || it.title || String(it)))
                              : Array.isArray(sheet.points)
                              ? sheet.points
                              : [];
                            return (
                              <div
                                key={idx}
                                className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs"
                              >
                                <div className="font-bold text-indigo-950 mb-1">{title}</div>
                                <div className="text-[11px] text-indigo-800 space-y-1">
                                  {items.map((it: string, i: number) => (
                                    <div key={i}>• {it}</div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}

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
