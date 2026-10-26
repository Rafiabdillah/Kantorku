import React, { useState } from 'react';
import { useGameStore, AppView } from '../../store/useGameStore';
import { CHARACTERS } from '../../data/characters';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { TIERS } from '../../types';
import { sound } from '../../services/sound';
import { LEVELS } from '../../content/levels';
import { CASE_FILES } from '../../content/caseFiles';
import { ALL_LESSONS } from '../../content/lessons';
import {
  Briefcase,
  FileSpreadsheet,
  Code2,
  FileText,
  Calendar,
  Mail,
  Zap,
  Coffee,
  Award,
  Search,
  Users,
  Compass,
  Sparkles,
  Trophy,
  Flame,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';

export const OfficeHubView: React.FC = () => {
  const { profile, setView, startMission } = useGameStore();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showInboxModal, setShowInboxModal] = useState<boolean>(false);

  const tierInfo = TIERS[profile.currentTier] || TIERS[1];

  const handleRoomClick = (zoneId: string, actionView?: AppView, defaultLevelId?: string) => {
    sound.playClick();
    setSelectedZone(zoneId);
    if (defaultLevelId) {
      startMission(defaultLevelId);
    } else if (actionView) {
      setView(actionView);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* Top Banner / Today's Briefing */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative background shapes */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <CharacterAvatar id="player" size="xl" className="border-2 border-emerald-400 shadow-md" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {tierInfo.badge} {tierInfo.title}
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  {profile.streakDays} Hari Streak
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
                Selamat Datang, {profile.name}!
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Kantor Pusat PT Maju Sejahtera. Selesaikan tugas hari ini untuk meningkatkan reputasimu di hadapan jajaran pimpinan!
              </p>
            </div>
          </div>

          {/* Quick Stats Widget */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setView('skills-map')}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/30 hover:bg-emerald-500/40 border border-emerald-400/40 rounded-2xl text-xs font-bold text-white transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Peta Keterampilan (D1-D17)</span>
            </button>
            <button
              type="button"
              onClick={() => setShowInboxModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-xs font-semibold backdrop-blur-md transition cursor-pointer"
            >
              <Mail className="w-4 h-4 text-emerald-300" />
              <span>Inbox Kantor</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </button>
            <button
              type="button"
              onClick={() => setView('daily')}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl text-xs shadow-lg transition cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Tantangan Harian</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Floor Plan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Office Interactive Zones (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-800">Denah Interaktif Kantor PT Maju Sejahtera</h2>
            </div>
            <span className="text-xs text-slate-400">Klik ruangan untuk memulai aktivitas</span>
          </div>

          {/* Interactive Office Floor Blueprint Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
            {/* Zone 1: Meja Kerjamu */}
            <div
              onClick={() => handleRoomClick('meja', 'career-map')}
              className="group p-4 bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-2xl shadow-sm transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Meja Utama
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-emerald-700 transition">
                  Meja Kerjamu
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  Lanjutkan jalur karier utama ({LEVELS.length} level misi) & cek tugas aktif.
                </p>
              </div>
            </div>

            {/* Zone 2: Ruang Finance */}
            <div
              onClick={() => handleRoomClick('finance', undefined, 'excel-t1-01')}
              className="group p-4 bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-2xl shadow-sm transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex items-start justify-between">
                <CharacterAvatar id="reza" size="sm" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Finance
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-700 transition">
                  Meja Pak Reza (Finance)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  Praktik rumus Excel: SUM, VLOOKUP, hingga model audit laporan.
                </p>
              </div>
            </div>

            {/* Zone 3: Lab IT & Server */}
            <div
              onClick={() => handleRoomClick('it', undefined, 'code-t1-01')}
              className="group p-4 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-2xl shadow-sm transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex items-start justify-between">
                <CharacterAvatar id="intan" size="sm" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  Lab IT
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-700 transition">
                  Ruang IT Kak Intan
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  Tantangan coding JavaScript: variabel, filter, dan algoritma.
                </p>
              </div>
            </div>

            {/* Zone 4: Ruang HR & Dokumen */}
            <div
              onClick={() => handleRoomClick('hr', undefined, 'word-t1-01')}
              className="group p-4 bg-white hover:bg-rose-50/50 border border-slate-200 hover:border-rose-300 rounded-2xl shadow-sm transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex items-start justify-between">
                <CharacterAvatar id="maya" size="sm" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  HR & Arsip
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-rose-700 transition">
                  Ruang Maya (HR & Word)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  Penyusunan surat resmi, notulen rapat, dan dokumen standar.
                </p>
              </div>
            </div>

            {/* Zone 5: Ruang Rapat & Kasus Nyata */}
            <div
              onClick={() => handleRoomClick('cases', 'case-file')}
              className="group p-4 bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-2xl shadow-sm transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex items-start justify-between">
                <CharacterAvatar id="sari" size="sm" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Kasus Nyata
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-amber-700 transition">
                  Ruang Briefing Kasus
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  Kerjakan {CASE_FILES.length} studi kasus nyata: UMKM, klinik, kargo, & perhotelan.
                </p>
              </div>
            </div>

            {/* Zone 6: Pantry Kantor */}
            <div
              onClick={() => handleRoomClick('pantry', 'zen')}
              className="group p-4 bg-white hover:bg-orange-50/50 border border-slate-200 hover:border-orange-300 rounded-2xl shadow-sm transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex items-start justify-between">
                <CharacterAvatar id="dimas" size="sm" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                  Pantry
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-orange-700 transition">
                  Pantry & Zona Santai
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  Ngopi bareng Dimas, latihan Zen tanpa timer, atau duel asinkron!
                </p>
              </div>
            </div>

            {/* Zone 7: Ruang Pelatihan & Akademi */}
            <div
              onClick={() => handleRoomClick('training', 'learning')}
              className="group p-4 bg-white hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 rounded-2xl shadow-sm transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  Ruang Pelatihan
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-teal-700 transition">
                  Akademi & Pusat Belajar
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  Pelajari {ALL_LESSONS.length} modul terstruktur dari nol, latihan bebas, & lembar contekan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick Navigation & Coworker Status */}
        <div className="flex flex-col gap-5">
          {/* Calendar Widget */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Jadwal Kantor Hari Ini</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Senin, Standup Mingguan</span>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">09.00 - Standup Divisi Operasional</div>
                  <div className="text-[11px] text-slate-500">Laporan mingguan inventaris barang bersama Bu Sari.</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">14.00 - Audit Berkas Keuangan</div>
                  <div className="text-[11px] text-slate-500">Pemeriksaan selisih rumus Excel dengan Pak Reza.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Modes Dock */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mode Game Lainnya</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setView('detective')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left border border-slate-200/60 flex items-center gap-2 cursor-pointer transition"
              >
                <Search className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-slate-800">Detektif</span>
              </button>
              <button
                type="button"
                onClick={() => setView('mentor')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left border border-slate-200/60 flex items-center gap-2 cursor-pointer transition"
              >
                <Users className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-800">Mentor</span>
              </button>
              <button
                type="button"
                onClick={() => setView('speed')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left border border-slate-200/60 flex items-center gap-2 cursor-pointer transition"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-800">Kilat</span>
              </button>
              <button
                type="button"
                onClick={() => setView('exam')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left border border-slate-200/60 flex items-center gap-2 cursor-pointer transition"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">Ujian & Sertif</span>
              </button>
              <button
                type="button"
                onClick={() => setView('duel')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left border border-slate-200/60 flex items-center gap-2 cursor-pointer transition"
              >
                <Trophy className="w-4 h-4 text-rose-500" />
                <span className="font-semibold text-slate-800">Duel Asinkron</span>
              </button>
              <button
                type="button"
                onClick={() => setView('creator')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left border border-slate-200/60 flex items-center gap-2 cursor-pointer transition"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="font-semibold text-slate-800">Kreator Level</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inbox Dialog Modal */}
      {showInboxModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Mail className="w-5 h-5 text-emerald-600" />
                <span>Kotak Masuk Email Kantor</span>
              </div>
              <button
                type="button"
                onClick={() => setShowInboxModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CharacterAvatar id="sari" size="sm" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Bu Sari (Direktur Operasional)</span>
                    <span className="text-[10px] text-slate-400">08.15 WIB</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 mt-0.5">Tugas Evaluasi Laporan Bulanan</div>
                  <p className="text-xs text-slate-600 mt-1">
                    Halo {profile.name}, jangan lupa selesaikan rekap inventaris ATK pagi ini ya. Ketelitian adalah kunci di kantor ini!
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CharacterAvatar id="dimas" size="sm" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Dimas (Rekan Kerja)</span>
                    <span className="text-[10px] text-slate-400">08.40 WIB</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 mt-0.5">Ngopi di Pantry?</div>
                  <p className="text-xs text-slate-600 mt-1">
                    Bro/sis, kalau udah selesai input data nanti kita ngopi bentar di pantry ya. Ada tips formula VLOOKUP baru nih!
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowInboxModal(false)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition cursor-pointer"
            >
              Tutup Kotak Masuk
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
