/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Semesta Keterampilan (Skill Universe) Types & Schemas
 * Compliant with PATCH v9 & v9.1 Wave S0 Architecture.
 */

import { z } from 'zod';
import { TierLevel } from './index';

// 17 Domains Definition
export const DOMAIN_IDS = [
  'D1',
  'D2',
  'D3',
  'D4',
  'D5',
  'D6',
  'D7',
  'D8',
  'D9',
  'D10',
  'D11',
  'D12',
  'D13',
  'D14',
  'D15',
  'D16',
  'D17',
] as const;

export type DomainId = (typeof DOMAIN_IDS)[number];

export const PRACTICE_MODES = ['E', 'T', 'S', 'K', 'P'] as const;
export type PracticeMode = (typeof PRACTICE_MODES)[number];

export const SKILL_DEPTHS = ['penuh', 'menengah', 'dasar'] as const;
export type SkillDepth = (typeof SKILL_DEPTHS)[number];

export const WAVE_IDS = ['S0', 'S1', 'S2', 'S3'] as const;
export type WaveId = (typeof WAVE_IDS)[number];

// Practice Mode Descriptions
export const PRACTICE_MODE_LABELS: Record<PracticeMode, { label: string; description: string }> = {
  E: { label: 'Editor Interaktif', description: 'Praktik langsung di lembar kerja atau dokumen dengan validator otomatis' },
  T: { label: 'Penulisan Terstruktur', description: 'Menulis teks bisnis dengan checklist aturan objektif' },
  S: { label: 'Simulasi Situasional', description: 'Percakapan bercabang dan de-eskalasi dengan rubrik transparan' },
  K: { label: 'Kuis Analitis', description: 'Urutkan tahapan, pasangkan konsep, temukan kesalahan, dan analisis red flag' },
  P: { label: 'Kasus Nyata (Portofolio)', description: 'Studi kasus lintas fungsi bisnis dan dokumen nyata' },
};

// Domain Metadata Structure
export interface DomainMeta {
  id: DomainId;
  code: string;
  name: string;
  shortName: string;
  icon: string;
  wave: WaveId;
  depth: SkillDepth;
  status: 'aktif' | 'segera-hadir';
  description: string;
  legacyModuleMapping?: 'excel' | 'word' | 'coding' | 'web';
}

export const DOMAIN_CATALOG: Record<DomainId, DomainMeta> = {
  D1: {
    id: 'D1',
    code: 'D1',
    name: 'Spreadsheet & Pengolahan Data Tabel',
    shortName: 'Spreadsheet',
    icon: '📊',
    wave: 'S0',
    depth: 'penuh',
    status: 'aktif',
    description: 'Rumus, fungsi logika, lookup, manipulasi data tabular, dan analitik lembar kerja.',
    legacyModuleMapping: 'excel',
  },
  D2: {
    id: 'D2',
    code: 'D2',
    name: 'Dokumen & Penulisan Profesional',
    shortName: 'Dokumen',
    icon: '📝',
    wave: 'S0',
    depth: 'penuh',
    status: 'aktif',
    description: 'Surat resmi, laporan kerja, proposal, notulen, format akademik, dan template standar.',
    legacyModuleMapping: 'word',
  },
  D3: {
    id: 'D3',
    code: 'D3',
    name: 'Presentasi & Storytelling Visual',
    shortName: 'Presentasi',
    icon: '📽️',
    wave: 'S2',
    depth: 'menengah',
    status: 'segera-hadir',
    description: 'Alur cerita bisnis, hierarki slide 16:9, kontras visual, pitch deck, dan catatan pembicara.',
  },
  D4: {
    id: 'D4',
    code: 'D4',
    name: 'Data, Analisis & SQL',
    shortName: 'Data & SQL',
    icon: '📈',
    wave: 'S3',
    depth: 'penuh',
    status: 'segera-hadir',
    description: 'Statistik deskriptif, grafik analitis, pivot, korelasi vs sebab, dasbor, dan kueri SQL.',
  },
  D5: {
    id: 'D5',
    code: 'D5',
    name: 'Pemrograman & Web Frontend',
    shortName: 'Web & Coding',
    icon: '💻',
    wave: 'S0',
    depth: 'penuh',
    status: 'aktif',
    description: 'Algoritma JavaScript, logika pemrosesan data, HTML5 semantik, CSS responsif, dan DOM.',
    legacyModuleMapping: 'coding',
  },
  D6: {
    id: 'D6',
    code: 'D6',
    name: 'Akuntansi & Keuangan Usaha',
    shortName: 'Akuntansi',
    icon: '💰',
    wave: 'S2',
    depth: 'penuh',
    status: 'segera-hadir',
    description: 'Jurnal debit-kredit, buku besar, neraca saldo, laba rugi, HPP, arus kas, dan rekonsiliasi.',
  },
  D7: {
    id: 'D7',
    code: 'D7',
    name: 'Keuangan Pribadi & Wirausaha',
    shortName: 'Keuangan Pribadi',
    icon: '🪙',
    wave: 'S1',
    depth: 'menengah',
    status: 'segera-hadir',
    description: 'Anggaran pribadi, dana darurat, cicilan, BMC, penetapan harga, dan perizinan dasar edukatif.',
  },
  D8: {
    id: 'D8',
    code: 'D8',
    name: 'Operasional & Rantai Pasok',
    shortName: 'Operasional',
    icon: '📦',
    wave: 'S2',
    depth: 'menengah',
    status: 'segera-hadir',
    description: 'Manajemen stok, titik pesan ulang, evaluasi pemasok, logistik ongkir, jadwal produksi, SOP.',
  },
  D9: {
    id: 'D9',
    code: 'D9',
    name: 'Pemasaran & Penjualan',
    shortName: 'Pemasaran',
    icon: '📣',
    wave: 'S2',
    depth: 'penuh',
    status: 'segera-hadir',
    description: 'Riset persona, bauran pemasaran, copywriting promo, kalender konten, etika email & marketplace.',
  },
  D10: {
    id: 'D10',
    code: 'D10',
    name: 'SDM & Kepemimpinan',
    shortName: 'SDM',
    icon: '👥',
    wave: 'S2',
    depth: 'menengah',
    status: 'segera-hadir',
    description: 'Rekrutmen, onboarding, penilaian KPI, umpan balik konstruktif, rapat produktif, resolusi konflik.',
  },
  D11: {
    id: 'D11',
    code: 'D11',
    name: 'Manajemen Proyek & Produktivitas',
    shortName: 'Proyek',
    icon: '⏱️',
    wave: 'S2',
    depth: 'penuh',
    status: 'segera-hadir',
    description: 'Tujuan SMART, WBS, jadwal Gantt, Kanban, manajemen risiko, prioritas matriks, dan penamaan file.',
  },
  D12: {
    id: 'D12',
    code: 'D12',
    name: 'Komunikasi Profesional & Etiket Kerja',
    shortName: 'Komunikasi',
    icon: '✉️',
    wave: 'S0',
    depth: 'penuh',
    status: 'aktif',
    description: 'Email bisnis terstruktur (3C), etiket chat kerja, de-eskalasi komplain, notulen rapat, dan diplomasi.',
  },
  D13: {
    id: 'D13',
    code: 'D13',
    name: 'Bahasa Inggris Bisnis',
    shortName: 'English Bisnis',
    icon: '🌐',
    wave: 'S3',
    depth: 'menengah',
    status: 'segera-hadir',
    description: 'Korespondensi email internasional, istilah bisnis global, notulen bilingual, dan resume formal.',
  },
  D14: {
    id: 'D14',
    code: 'D14',
    name: 'Literasi Digital, Keamanan & AI',
    shortName: 'Literasi AI & Sekuriti',
    icon: '🛡️',
    wave: 'S1',
    depth: 'penuh',
    status: 'segera-hadir',
    description: 'Deteksi phishing & red flag, proteksi data pribadi, checklist prompt AI, validasi fakta anti-halusinasi.',
  },
  D15: {
    id: 'D15',
    code: 'D15',
    name: 'Karier & Metodologi Akademik',
    shortName: 'Karier & Akademik',
    icon: '🎓',
    wave: 'S1',
    depth: 'penuh',
    status: 'segera-hadir',
    description: 'Penyusunan CV ATS, verifikasi lowongan, wawancara kerja, sitasi APA 7, dan metodologi riset skripsi.',
  },
  D16: {
    id: 'D16',
    code: 'D16',
    name: 'Desain Visual & Konten Brand',
    shortName: 'Desain Konten',
    icon: '🎨',
    wave: 'S3',
    depth: 'menengah',
    status: 'segera-hadir',
    description: 'Hierarki visual, kontras warna aksesibel, tipografi dokumen bisnis, dan aset media sosial proporsional.',
  },
  D17: {
    id: 'D17',
    code: 'D17',
    name: 'Hukum & Kepatuhan Dasar',
    shortName: 'Hukum Bisnis',
    icon: '⚖️',
    wave: 'S3',
    depth: 'menengah',
    status: 'segera-hadir',
    description: 'Anatomi kontrak kerja, perlindungan konsumen, hak cipta aset, dan perizinan usaha edukatif.',
  },
};

// Zod Schemas for Skill Validation
export const SkillSchema = z.object({
  id: z.string().min(3),
  domain: z.enum(DOMAIN_IDS),
  name: z.string().min(3),
  description: z.string().min(10),
  prerequisites: z.array(z.string()),
  canDo: z.record(z.union([z.string(), z.number()]), z.string()), // Tier 1-7 statements
  practiceModes: z.array(z.enum(PRACTICE_MODES)).min(1),
  linkedLessons: z.array(z.string()),
  linkedLevels: z.array(z.string()),
  linkedCases: z.array(z.string()),
  roleRelevance: z.record(z.string(), z.number().min(1).max(5)),
  depth: z.enum(SKILL_DEPTHS),
  estimatedHours: z.number().positive(),
  sources: z.array(z.string()).default([]),
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  requires: z.array(z.string()).default([]),
});

export type Skill = z.infer<typeof SkillSchema>;

// SkillPack Manifest Schema
export const SkillPackManifestSchema = z.object({
  domain: z.enum(DOMAIN_IDS),
  name: z.string(),
  version: z.string(),
  wave: z.enum(WAVE_IDS),
  depth: z.enum(SKILL_DEPTHS),
  status: z.enum(['aktif', 'segera-hadir']),
  requires: z.array(z.string()).default([]),
  description: z.string(),
  lastUpdated: z.string(),
});

export type SkillPackManifest = z.infer<typeof SkillPackManifestSchema>;
