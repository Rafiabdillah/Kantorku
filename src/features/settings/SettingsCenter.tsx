import React, { useState, useMemo } from 'react';
import { useSettings } from './useSettings';
import { SETTING_SECTIONS, SETTINGS_REGISTRY, SETTING_PRESETS } from './registry';
import { SettingDef, SettingSectionId, PresetId, UserProfileMeta } from './types';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/sound';
import { BrandLogoIcon } from '../../components/brand/BrandLogo';
import {
  ArrowLeft,
  Search,
  RotateCcw,
  Sparkles,
  Sliders,
  User,
  Palette,
  Volume2,
  Globe,
  GraduationCap,
  MessageSquare,
  Table,
  FileText,
  Code,
  Bell,
  Eye,
  Zap,
  ShieldCheck,
  School,
  Keyboard,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  Download,
  Upload,
  Trash2,
  Lock,
  Plus,
  RefreshCw,
  ExternalLink,
  Info,
  Undo2,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  User: <User className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Volume2: <Volume2 className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  GraduationCap: <GraduationCap className="w-4 h-4" />,
  MessageSquare: <MessageSquare className="w-4 h-4" />,
  Table: <Table className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  Code: <Code className="w-4 h-4" />,
  Bell: <Bell className="w-4 h-4" />,
  Eye: <Eye className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  School: <School className="w-4 h-4" />,
  Keyboard: <Keyboard className="w-4 h-4" />,
  Sliders: <SlidersHorizontal className="w-4 h-4" />,
};

export const SettingsCenter: React.FC = () => {
  const { setView } = useGameStore();
  const {
    settings,
    undoEntry,
    profiles,
    activeProfile,
    assignment,
    get,
    set,
    isModified,
    resetKey,
    resetSection,
    applyPreset,
    undo,
    createProfile,
    switchProfile,
    deleteProfile,
    setAssignment,
    resetSettingsOnly,
    resetModuleProgress,
    fullWipe,
    exportSettings,
    importSettings,
  } = useSettings();

  const [activeSectionId, setActiveSectionId] = useState<SettingSectionId>('profile');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Profile modal states
  const [showAddProfileModal, setShowAddProfileModal] = useState<boolean>(false);
  const [newProfileName, setNewProfileName] = useState<string>('');
  const [newProfileGoal, setNewProfileGoal] = useState<string>('magang_karir');
  const [newProfilePin, setNewProfilePin] = useState<string>('');
  const [pinPromptModal, setPinPromptModal] = useState<{ targetId: string; pin: string; error?: string } | null>(null);

  // Classroom modal states
  const [showClassroomImport, setShowClassroomImport] = useState<boolean>(false);
  const [classroomJsonInput, setClassroomJsonInput] = useState<string>('');

  // Reset modal states
  const [wipeConfirmText, setWipeConfirmText] = useState<string>('');
  const [showWipeModal, setShowWipeModal] = useState<boolean>(false);

  // Import/Export modals
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>('');

  // Developer tap test mode
  const [versionTapCount, setVersionTapCount] = useState<number>(0);

  // Filtering settings
  const filteredSettings = useMemo(() => {
    if (!searchQuery.trim()) {
      return SETTINGS_REGISTRY.filter((s) => s.section === activeSectionId);
    }
    const q = searchQuery.toLowerCase().trim();
    return SETTINGS_REGISTRY.filter((s) => {
      const matchLabel = s.label.toLowerCase().includes(q);
      const matchDesc = s.description.toLowerCase().includes(q);
      const matchKey = s.key.toLowerCase().includes(q);
      const matchKeywords = s.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchLabel || matchDesc || matchKey || matchKeywords;
    });
  }, [searchQuery, activeSectionId]);

  // Section modification count
  const modifiedCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of SETTINGS_REGISTRY) {
      if (isModified(s.key)) {
        counts[s.section] = (counts[s.section] || 0) + 1;
      }
    }
    return counts;
  }, [settings, isModified]);

  const showNotification = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => {
      setToastMsg((cur) => (cur?.text === text ? null : cur));
    }, 4000);
  };

  const handleExportJson = () => {
    sound.playClick();
    const jsonStr = exportSettings();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kantorku_settings_backup_${activeProfile.name.toLowerCase().replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showNotification('File konfigurasi & profil berhasil diekspor!');
  };

  const handleImportJson = () => {
    sound.playClick();
    const res = importSettings(importJsonText);
    if (res.success) {
      showNotification(res.message, 'success');
      setShowImportModal(false);
      setImportJsonText('');
    } else {
      showNotification(res.message, 'error');
    }
  };

  const handleCreateProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    const res = await createProfile(newProfileName, newProfileGoal, 'player', newProfilePin);
    if (res.success) {
      sound.playSuccess?.();
      showNotification(`Profil "${newProfileName}" berhasil dibuat!`);
      setShowAddProfileModal(false);
      setNewProfileName('');
      setNewProfilePin('');
    } else {
      showNotification(res.error || 'Gagal membuat profil', 'error');
    }
  };

  const handleSwitchProfileClick = async (p: UserProfileMeta) => {
    sound.playClick();
    if (p.id === activeProfile.id) return;
    if (p.pinHash) {
      setPinPromptModal({ targetId: p.id, pin: '' });
      return;
    }
    const res = await switchProfile(p.id);
    if (res.success) {
      showNotification(`Beralih ke profil "${p.name}".`);
    } else {
      showNotification(res.error || 'Gagal beralih profil', 'error');
    }
  };

  const handlePinSubmit = async () => {
    if (!pinPromptModal) return;
    const res = await switchProfile(pinPromptModal.targetId, pinPromptModal.pin);
    if (res.success) {
      showNotification('PIN terverifikasi. Profil berhasil dimuat!');
      setPinPromptModal(null);
    } else {
      setPinPromptModal({ ...pinPromptModal, error: res.error || 'PIN tidak sesuai.' });
    }
  };

  const handleVersionTap = () => {
    const next = versionTapCount + 1;
    setVersionTapCount(next);
    if (next >= 5) {
      set('adv_test_mode', true);
      showNotification('Developer Test Mode diaktifkan! Semua level terbuka.', 'info');
      setVersionTapCount(0);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setView('office');
            }}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-500 cursor-pointer transition"
            title="Kembali ke Ruang Kantor"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                Pusat Pengaturan v2.0
              </span>
              <span className="text-[10px] font-mono text-slate-400">Offline-first</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Preferensi & Lingkungan Kerja
            </h1>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer"
            title="Ekspor Konfigurasi & Profil JSON"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor</span>
          </button>
          <button
            type="button"
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer"
            title="Pulihkan dari Berkas JSON"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Impor</span>
          </button>
        </div>
      </div>

      {/* 1-Click Presets Bar */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-5 md:p-6 shadow-md border border-emerald-800/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-sm md:text-base">Preset Konfigurasi 1-Klik</h2>
          </div>
          <span className="text-[11px] text-emerald-300 font-medium hidden sm:inline">
            Terapkan setelan optimal dalam sekali sentuh
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SETTING_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                sound.playClick();
                applyPreset(preset.id);
                showNotification(`Preset "${preset.title}" berhasil diterapkan!`);
              }}
              className="p-3 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl border border-white/15 text-left transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="font-bold text-xs text-white group-hover:text-emerald-300 transition">
                  {preset.title}
                </div>
                <div className="text-[10px] text-emerald-100/70 mt-1 leading-snug">
                  {preset.description}
                </div>
              </div>
              <div className="text-[10px] font-bold text-emerald-300 mt-2 flex items-center gap-1">
                <span>Terapkan Preset</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Settings Layout (Sidebar + Content Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: 16 Categories */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengaturan (cth: margin, koma, font)..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Navigation Category List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 border border-slate-200 dark:border-slate-800 shadow-xs space-y-0.5">
            {SETTING_SECTIONS.map((sec) => {
              const isActive = !searchQuery && activeSectionId === sec.id;
              const modifiedCount = modifiedCounts[sec.id] || 0;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveSectionId(sec.id);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition cursor-pointer text-left ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                      {ICON_MAP[sec.iconName] || <Sliders className="w-4 h-4" />}
                    </span>
                    <span>{sec.title}</span>
                  </div>
                  {modifiedCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
                      {modifiedCount} diubah
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Live Preview Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>Pratinjau Langsung (Live Preview)</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Skala Font:</span>
                <span className="font-bold uppercase text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                  {get('appearance_font_size', 'medium')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Pemisah Rumus:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {get('excel_separator', 'semicolon') === 'semicolon' ? '; (Titik Koma)' : ', (Koma)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Margin Naskah:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {get('word_margin_preset', 'academic_4333') === 'academic_4333' ? '4-3-3-3 cm (Skripsi)' : 'Standar 2.54cm'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Mode Kontras:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {get('a11y_high_contrast', false) ? 'Tinggi (WCAG AAA)' : 'Standar'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Section Header */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : SETTING_SECTIONS.find((s) => s.id === activeSectionId)?.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {searchQuery
                  ? `Ditemukan ${filteredSettings.length} pengaturan yang cocok`
                  : SETTING_SECTIONS.find((s) => s.id === activeSectionId)?.description}
              </p>
            </div>
            {!searchQuery && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  resetSection(activeSectionId);
                  showNotification('Pengaturan pada bagian ini telah dikembalikan ke bawaan.');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
                title="Reset seluruh pengaturan di kategori ini"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Bagian</span>
              </button>
            )}
          </div>

          {/* Active Profile Bar (if in profile category) */}
          {activeSectionId === 'profile' && !searchQuery && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Daftar Profil Lokal (Maksimal 5)</h3>
                  <p className="text-xs text-slate-500">Mendukung banyak pengguna di perangkat komputer kantor bersama.</p>
                </div>
                {profiles.length < 5 && (
                  <button
                    type="button"
                    onClick={() => setShowAddProfileModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Profil</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {profiles.map((p) => {
                  const isCurrent = p.id === activeProfile.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSwitchProfileClick(p)}
                      className={`p-3.5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{p.name}</span>
                          {p.pinHash && <Lock className="w-3 h-3 text-amber-600" />}
                        </div>
                        {isCurrent && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                            Aktif
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-2">
                        {p.learningGoal === 'magang_karir'
                          ? 'Persiapan Magang'
                          : p.learningGoal === 'skripsi_akademik'
                          ? 'Skripsi / Akademik'
                          : 'Eksplorasi Mandiri'}
                      </div>
                      {profiles.length > 1 && !isCurrent && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Hapus profil "${p.name}"?`)) {
                              deleteProfile(p.id);
                              showNotification(`Profil "${p.name}" dihapus.`);
                            }
                          }}
                          className="mt-2 text-[10px] text-rose-600 hover:text-rose-700 font-bold self-end"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Classroom Mode Widget (if in classroom section) */}
          {activeSectionId === 'classroom' && !searchQuery && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Status Penugasan Dosen</h3>
                  <p className="text-xs text-slate-500">
                    {assignment
                      ? `Terhubung ke kelas: ${assignment.title} (Dosen: ${assignment.teacherName})`
                      : 'Belum ada paket penugasan kelas yang diimpor.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowClassroomImport(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Impor Tugas Dosen</span>
                </button>
              </div>

              {assignment && (
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 space-y-1">
                  <div className="font-bold">Kode Penugasan: {assignment.code}</div>
                  <div>Tenggat Waktu: {assignment.deadline}</div>
                  <div>Kunci Solusi: {assignment.lockedHints ? 'Terkunci Ketat' : 'Bebas'}</div>
                </div>
              )}
            </div>
          )}

          {/* Tiered Data & Reset Widget (if in data section) */}
          {activeSectionId === 'data' && !searchQuery && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Reset Bertingkat (Tiered Reset)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* Level 1: Settings only */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">1. Reset Pengaturan</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Kembalikan seluruh preferensi ke bawaan pabrik. Progres level dan XP tetap aman.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset seluruh setelan ke bawaan pabrik?')) {
                        resetSettingsOnly();
                        showNotification('Pengaturan telah direset ke bawaan.');
                      }
                    }}
                    className="mt-3 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 font-bold rounded-xl text-slate-700 dark:text-slate-200 cursor-pointer text-center"
                  >
                    Reset Pengaturan
                  </button>
                </div>

                {/* Level 2: Modules only */}
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-amber-900 dark:text-amber-200">2. Reset Progres Modul</div>
                    <div className="text-[11px] text-amber-700 dark:text-amber-300 mt-1">
                      Mulai ulang level Excel, Word, dan Coding dari tier 1. Setelan tema tetap tersimpan.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Yakin ingin mereset progres modul karier?')) {
                        resetModuleProgress();
                        showNotification('Progres modul direset ke nol.');
                      }
                    }}
                    className="mt-3 px-3 py-1.5 bg-amber-200 dark:bg-amber-800 hover:bg-amber-300 font-bold rounded-xl text-amber-900 dark:text-amber-100 cursor-pointer text-center"
                  >
                    Reset Modul
                  </button>
                </div>

                {/* Level 3: Full wipe */}
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-rose-900 dark:text-rose-200">3. Hapus Total (Wipe)</div>
                    <div className="text-[11px] text-rose-700 dark:text-rose-300 mt-1">
                      Menghapus total semua akun, lencana, koin, dan pengaturan (butuh konfirmasi "HAPUS").
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowWipeModal(true)}
                    className="mt-3 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 font-bold rounded-xl text-white cursor-pointer text-center"
                  >
                    Hapus Total...
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Tap Mode info (if in advanced section) */}
          {activeSectionId === 'advanced' && !searchQuery && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <BrandLogoIcon className="w-10 h-10 rounded-xl shadow-sm shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Versi KantorKu v2.0 Production</h3>
                  <p className="text-xs text-slate-500">Klik nomor versi 5 kali beruntun untuk membuka Developer Test Mode.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleVersionTap}
                className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer self-start sm:self-auto"
              >
                v2.0.0-release ({versionTapCount}/5)
              </button>
            </div>
          )}

          {/* Settings Item Cards */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800/80 space-y-5">
            {filteredSettings.length === 0 ? (
              <div className="py-12 text-center space-y-2 text-slate-400">
                <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
                <div className="font-bold text-sm">Tidak ada pengaturan yang cocok</div>
                <div className="text-xs">Coba kata kunci pencarian lain.</div>
              </div>
            ) : (
              filteredSettings.map((def) => {
                const curVal = get(def.key, def.default);
                const modified = isModified(def.key);

                return (
                  <div key={def.key} className="pt-4 first:pt-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{def.label}</span>
                        {modified && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                            Diubah
                          </span>
                        )}
                        <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400">
                          {def.scope}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{def.description}</p>
                    </div>

                    {/* Interactive Input by Type */}
                    <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
                      {def.type === 'boolean' && (
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            set(def.key, !curVal);
                          }}
                          className={`w-12 h-6 rounded-full transition cursor-pointer relative p-0.5 ${
                            curVal ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                              curVal ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      )}

                      {def.type === 'select' && def.options && (
                        <select
                          value={curVal}
                          onChange={(e) => {
                            sound.playClick();
                            let val: any = e.target.value;
                            if (typeof def.default === 'number') {
                              val = Number(val);
                            }
                            set(def.key, val);
                          }}
                          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 px-3 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer max-w-xs"
                        >
                          {def.options.map((opt) => (
                            <option key={String(opt.value)} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {def.type === 'slider' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min={def.min ?? 0}
                            max={def.max ?? 100}
                            step={def.step ?? 1}
                            value={curVal}
                            onChange={(e) => set(def.key, Number(e.target.value))}
                            className="w-28 accent-emerald-600 cursor-pointer"
                          />
                          <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 w-12 text-right">
                            {curVal} {def.unit || ''}
                          </span>
                        </div>
                      )}

                      {def.type === 'text' && (
                        <input
                          type="text"
                          value={curVal}
                          onChange={(e) => set(def.key, e.target.value)}
                          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 px-3 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 w-44"
                        />
                      )}

                      {def.type === 'keybind' && (
                        <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                          {curVal}
                        </div>
                      )}

                      {/* Reset per item button */}
                      {modified && (
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            resetKey(def.key);
                          }}
                          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
                          title="Kembalikan nilai ini ke bawaan"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* 5-Second Undo Toast */}
      {undoEntry && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 flex items-center gap-4 animate-in slide-in-from-bottom-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pengaturan Diperbarui</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Kunci: <span className="font-mono text-slate-200">{undoEntry.key}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              undo();
              showNotification('Perubahan berhasil dibatalkan.');
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition cursor-pointer shadow-xs"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Batalkan (5s)</span>
          </button>
        </div>
      )}

      {/* Floating Global Message Banner */}
      {toastMsg && (
        <div
          className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border shadow-xl text-xs font-bold animate-in slide-in-from-top-2 ${
            toastMsg.type === 'error'
              ? 'bg-rose-50 border-rose-300 text-rose-900'
              : toastMsg.type === 'info'
              ? 'bg-blue-50 border-blue-300 text-blue-900'
              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}
        >
          {toastMsg.text}
        </div>
      )}

      {/* Modal: Add New Profile */}
      {showAddProfileModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-black text-base text-slate-900 dark:text-white">Buat Profil Kantor Baru</h3>
            <form onSubmit={handleCreateProfileSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Pegawai</label>
                <input
                  type="text"
                  required
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="Contoh: Rian Anggara"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tujuan Belajar</label>
                <select
                  value={newProfileGoal}
                  onChange={(e) => setNewProfileGoal(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                >
                  <option value="magang_karir">Persiapan Magang & Kerja Pertama</option>
                  <option value="skripsi_akademik">Penulisan Skripsi & Tugas Akhir</option>
                  <option value="naik_jabatan">Peningkatan Skill Menuju Manajer</option>
                  <option value="eksplorasi_mandiri">Eksplorasi Santai & Belajar Mandiri</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Kunci PIN Profil (Opsional, minimal 4 digit)
                </label>
                <input
                  type="password"
                  value={newProfilePin}
                  onChange={(e) => setNewProfilePin(e.target.value)}
                  placeholder="Kosongkan jika tanpa PIN"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddProfileModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-bold rounded-xl text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-white shadow-xs"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: PIN Verification Prompt */}
      {pinPromptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <Lock className="w-5 h-5" />
              <h3 className="font-black text-base text-slate-900 dark:text-white">Masukkan PIN Profil</h3>
            </div>
            <p className="text-xs text-slate-500">Profil ini dilindungi oleh PIN keamanan lokal.</p>
            {pinPromptModal.error && (
              <div className="text-xs text-rose-600 font-bold">{pinPromptModal.error}</div>
            )}
            <input
              type="password"
              autoFocus
              value={pinPromptModal.pin}
              onChange={(e) => setPinPromptModal({ ...pinPromptModal, pin: e.target.value, error: undefined })}
              onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
              placeholder="Ketik 4 digit PIN..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center text-lg outline-none tracking-widest"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPinPromptModal(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handlePinSubmit}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-xs"
              >
                Buka Profil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Import Settings JSON */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-black text-base text-slate-900 dark:text-white">Impor Berkas Cadangan JSON</h3>
            <p className="text-xs text-slate-500">
              Tempel isi data JSON yang sebelumnya telah diekspor untuk memulihkan seluruh profil dan pengaturan.
            </p>
            <textarea
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Tempel string JSON di sini..."
              className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-[11px] outline-none"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={!importJsonText.trim()}
                onClick={handleImportJson}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-xs disabled:opacity-50"
              >
                Proses Impor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Full Wipe Confirmation */}
      {showWipeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-rose-300 dark:border-rose-900 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <Trash2 className="w-5 h-5" />
              <h3 className="font-black text-base">Konfirmasi Hapus Total (Full Wipe)</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Tindakan ini tidak dapat dibatalkan. Seluruh profil, koin, riwayat dialog, dan berkas kantor akan terhapus bersih dari peramban ini.
            </p>
            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Ketik kata <span className="font-mono text-rose-600">HAPUS</span> untuk melanjutkan:
              </label>
              <input
                type="text"
                value={wipeConfirmText}
                onChange={(e) => setWipeConfirmText(e.target.value)}
                placeholder="Ketik HAPUS"
                className="w-full p-2.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 rounded-xl font-mono text-xs font-bold outline-none"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowWipeModal(false);
                  setWipeConfirmText('');
                }}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={wipeConfirmText !== 'HAPUS'}
                onClick={() => fullWipe(wipeConfirmText)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded-xl text-xs font-bold text-white shadow-xs disabled:opacity-40"
              >
                Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
