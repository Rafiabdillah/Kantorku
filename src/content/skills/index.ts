/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Semesta Keterampilan Content Index
 */

import { Skill, SkillPackManifest, DomainId } from '../../types/skills';
import { DOMAIN_CATALOG } from '../../types/skills';
import { D12_MANIFEST } from './d12-komunikasi/manifest';
import { D12_SKILLS } from './d12-komunikasi/skills';

// D1 (Spreadsheet) Baseline Skills for Wave S0
export const D1_SKILLS: Skill[] = [
  {
    id: 'D1-SKILL-01',
    domain: 'D1',
    name: 'Rumus Dasar & Lookup Excel',
    description: 'SUM, AVERAGE, COUNT, SUMIFS, VLOOKUP, XLOOKUP, dan logika IF kondisional pada tabel bisnis.',
    prerequisites: [],
    canDo: {
      1: 'Menghitung total, rata-rata, dan jumlah baris dengan rumus dasar.',
      2: 'Menerapkan format mata uang Rupiah dan logika persentase laba rugi.',
      3: 'Menyusun rumus IF bertingkat dan kalkulasi bersyarat SUMIFS.',
      4: 'Menggabungkan tabel referensi harga dengan VLOOKUP dan XLOOKUP.',
      5: 'Membangun tabel analitik pivot dan pemodelan skenario titik impas.',
      6: 'Merancang arsitektur formula anti-hardcode dengan audit sel.',
      7: 'Mengembangkan sistem otomasi makro dan validasi data skala korporat.',
    },
    practiceModes: ['E', 'K'],
    linkedLessons: ['excel-sum-intro', 'excel-vlookup-mastery'],
    linkedLevels: ['excel-t1-01', 'excel-t2-01'],
    linkedCases: ['case-a1', 'case-a2'],
    roleRelevance: {
      'admin-perkantoran': 5,
      'staf-akuntansi': 5,
      'staf-gudang-logistik': 4,
      'admin-sdm-hrd': 4,
      'analis-data-junior': 5,
    },
    depth: 'penuh',
    estimatedHours: 12,
    sources: ['Standar Pengolahan Data Tabular', 'Panduan Praktik Excel Bisnis'],
    lastReviewed: '2026-10-26',
    requires: ['spreadsheet-editor'],
  },
];

// D2 (Dokumen) Baseline Skills for Wave S0
export const D2_SKILLS: Skill[] = [
  {
    id: 'D2-SKILL-01',
    domain: 'D2',
    name: 'Penyusunan Surat Resmi & Dokumen Kerja',
    description: 'Format tata naskah dinas, penomoran surat, struktur invoice, dan notulen rapat profesional.',
    prerequisites: [],
    canDo: {
      1: 'Mengetik dokumen rapi dengan tata letak paragraf dan indentasi standar.',
      2: 'Menyusun surat undangan rapat dan pengumuman dengan kop kantor.',
      3: 'Membuat format invoice dan kuitansi berseri dengan tabel biaya.',
      4: 'Menyusun Standar Operasional Prosedur (SOP) dan surat perjanjian kerja.',
      5: 'Menulis proposal pengajuan pinjaman modal dan laporan pertanggungjawaban.',
      6: 'Menyusun dokumen kontrak kerjasama bisnis dan tinjauan kepatuhan.',
      7: 'Membangun sistem template tata naskah dinas korporasi menyeluruh.',
    },
    practiceModes: ['E', 'T'],
    linkedLessons: ['word-document-structure'],
    linkedLevels: ['word-t1-01'],
    linkedCases: ['case-f1', 'case-f2'],
    roleRelevance: {
      'admin-perkantoran': 5,
      'admin-sdm-hrd': 4,
      'koordinator-proyek': 3,
      'pencari-kerja-freshgrad': 4,
    },
    depth: 'penuh',
    estimatedHours: 10,
    sources: ['Pedoman Tata Naskah Dinas', 'PUEBI'],
    lastReviewed: '2026-10-26',
    requires: ['word-editor'],
  },
];

// D5 (Coding & Web) Baseline Skills for Wave S0
export const D5_SKILLS: Skill[] = [
  {
    id: 'D5-SKILL-01',
    domain: 'D5',
    name: 'JavaScript Algoritma & Logika Pemrosesan Data',
    description: 'Manipulasi array, kalkulasi diskon, pemfilteran data transaksi, dan manipulasi objek.',
    prerequisites: [],
    canDo: {
      1: 'Menulis variabel, tipe data angka, string, dan operator aritmatika.',
      2: 'Menyusun percabangan if/else untuk validasi input batas nilai.',
      3: 'Mengolah data transaksi belanja dalam perulangan loop dan fungsi array map/filter.',
      4: 'Membangun kalkulator harga, diskon bertingkat, dan estimasi ongkos kirim.',
      5: 'Membuat fungsi parser data pesan chat menjadi format objek JSON terstruktur.',
      6: 'Melakukan refactoring kode warisan (legacy code) dan menulis unit test mandiri.',
      7: 'Merancang arsitektur aplikasi berbasis modul dengan penanganan error terisolasi.',
    },
    practiceModes: ['E'],
    linkedLessons: ['js-variables', 'js-array-processing'],
    linkedLevels: ['coding-t1-01'],
    linkedCases: ['case-g4'],
    roleRelevance: {
      'web-dev-junior': 5,
      'analis-data-junior': 2,
    },
    depth: 'penuh',
    estimatedHours: 14,
    sources: ['MDN Web Docs', 'ECMAScript Standard'],
    lastReviewed: '2026-10-26',
    requires: ['js-runner'],
  },
  {
    id: 'D5-SKILL-02',
    domain: 'D5',
    name: 'HTML5 Semantik & CSS Layout Responsif',
    description: 'Struktur halaman web semantik, tombol interaktif, flexbox, dan grid ramah ponsel.',
    prerequisites: [],
    canDo: {
      1: 'Membuat elemen judul, paragraf, tautan, dan gambar dengan tag semantik HTML5.',
      2: 'Menyusun form pemesanan dengan label, input bertipe benar, dan tombol kirim.',
      3: 'Menerapkan styling CSS warna, tipografi, dan padding yang proporsional.',
      4: 'Membangun tata letak kartu produk menggunakan CSS Flexbox.',
      5: 'Membuat landing page usaha responsif yang tampil rapi di layar 360px dan 1024px.',
      6: 'Mengoptimalkan aksesibilitas web (alt image, contrast ratio, ARIA landmarks).',
      7: 'Merancang sistem desain antarmuka web (UI design system) mandiri.',
    },
    practiceModes: ['E'],
    linkedLessons: ['web-html-semantics'],
    linkedLevels: ['web-t1-01'],
    linkedCases: ['case-g1'],
    roleRelevance: {
      'web-dev-junior': 5,
      'digital-marketing': 3,
    },
    depth: 'penuh',
    estimatedHours: 12,
    sources: ['W3C Semantic HTML5 Standard', 'WCAG Accessibility Guidelines'],
    lastReviewed: '2026-10-26',
    requires: ['web-preview'],
  },
];

// All Registered Skills in the Universe
export const ALL_SKILLS: Skill[] = [
  ...D1_SKILLS,
  ...D2_SKILLS,
  ...D5_SKILLS,
  ...D12_SKILLS,
];

// All Manifests
export const ALL_MANIFESTS: Record<DomainId, SkillPackManifest> = {
  D1: {
    domain: 'D1',
    name: DOMAIN_CATALOG.D1.name,
    version: '1.0.0',
    wave: 'S0',
    depth: 'penuh',
    status: 'aktif',
    requires: ['spreadsheet-editor'],
    description: DOMAIN_CATALOG.D1.description,
    lastUpdated: '2026-10-26',
  },
  D2: {
    domain: 'D2',
    name: DOMAIN_CATALOG.D2.name,
    version: '1.0.0',
    wave: 'S0',
    depth: 'penuh',
    status: 'aktif',
    requires: ['word-editor'],
    description: DOMAIN_CATALOG.D2.description,
    lastUpdated: '2026-10-26',
  },
  D3: {
    domain: 'D3',
    name: DOMAIN_CATALOG.D3.name,
    version: '0.1.0',
    wave: 'S2',
    depth: 'menengah',
    status: 'segera-hadir',
    requires: ['slide-editor'],
    description: DOMAIN_CATALOG.D3.description,
    lastUpdated: '2026-10-26',
  },
  D4: {
    domain: 'D4',
    name: DOMAIN_CATALOG.D4.name,
    version: '0.1.0',
    wave: 'S3',
    depth: 'penuh',
    status: 'segera-hadir',
    requires: ['sql-editor'],
    description: DOMAIN_CATALOG.D4.description,
    lastUpdated: '2026-10-26',
  },
  D5: {
    domain: 'D5',
    name: DOMAIN_CATALOG.D5.name,
    version: '1.0.0',
    wave: 'S0',
    depth: 'penuh',
    status: 'aktif',
    requires: ['js-runner', 'web-preview'],
    description: DOMAIN_CATALOG.D5.description,
    lastUpdated: '2026-10-26',
  },
  D6: {
    domain: 'D6',
    name: DOMAIN_CATALOG.D6.name,
    version: '0.1.0',
    wave: 'S2',
    depth: 'penuh',
    status: 'segera-hadir',
    requires: ['ledger-editor'],
    description: DOMAIN_CATALOG.D6.description,
    lastUpdated: '2026-10-26',
  },
  D7: {
    domain: 'D7',
    name: DOMAIN_CATALOG.D7.name,
    version: '0.1.0',
    wave: 'S1',
    depth: 'menengah',
    status: 'segera-hadir',
    requires: [],
    description: DOMAIN_CATALOG.D7.description,
    lastUpdated: '2026-10-26',
  },
  D8: {
    domain: 'D8',
    name: DOMAIN_CATALOG.D8.name,
    version: '0.1.0',
    wave: 'S2',
    depth: 'menengah',
    status: 'segera-hadir',
    requires: [],
    description: DOMAIN_CATALOG.D8.description,
    lastUpdated: '2026-10-26',
  },
  D9: {
    domain: 'D9',
    name: DOMAIN_CATALOG.D9.name,
    version: '0.1.0',
    wave: 'S2',
    depth: 'penuh',
    status: 'segera-hadir',
    requires: [],
    description: DOMAIN_CATALOG.D9.description,
    lastUpdated: '2026-10-26',
  },
  D10: {
    domain: 'D10',
    name: DOMAIN_CATALOG.D10.name,
    version: '0.1.0',
    wave: 'S2',
    depth: 'menengah',
    status: 'segera-hadir',
    requires: [],
    description: DOMAIN_CATALOG.D10.description,
    lastUpdated: '2026-10-26',
  },
  D11: {
    domain: 'D11',
    name: DOMAIN_CATALOG.D11.name,
    version: '0.1.0',
    wave: 'S2',
    depth: 'penuh',
    status: 'segera-hadir',
    requires: ['kanban-editor'],
    description: DOMAIN_CATALOG.D11.description,
    lastUpdated: '2026-10-26',
  },
  D12: D12_MANIFEST,
  D13: {
    domain: 'D13',
    name: DOMAIN_CATALOG.D13.name,
    version: '0.1.0',
    wave: 'S3',
    depth: 'menengah',
    status: 'segera-hadir',
    requires: [],
    description: DOMAIN_CATALOG.D13.description,
    lastUpdated: '2026-10-26',
  },
  D14: {
    domain: 'D14',
    name: DOMAIN_CATALOG.D14.name,
    version: '0.1.0',
    wave: 'S1',
    depth: 'penuh',
    status: 'segera-hadir',
    requires: [],
    description: DOMAIN_CATALOG.D14.description,
    lastUpdated: '2026-10-26',
  },
  D15: {
    domain: 'D15',
    name: DOMAIN_CATALOG.D15.name,
    version: '0.1.0',
    wave: 'S1',
    depth: 'penuh',
    status: 'segera-hadir',
    requires: [],
    description: DOMAIN_CATALOG.D15.description,
    lastUpdated: '2026-10-26',
  },
  D16: {
    domain: 'D16',
    name: DOMAIN_CATALOG.D16.name,
    version: '0.1.0',
    wave: 'S3',
    depth: 'menengah',
    status: 'segera-hadir',
    requires: ['svg-canvas'],
    description: DOMAIN_CATALOG.D16.description,
    lastUpdated: '2026-10-26',
  },
  D17: {
    domain: 'D17',
    name: DOMAIN_CATALOG.D17.name,
    version: '0.1.0',
    wave: 'S3',
    depth: 'menengah',
    status: 'segera-hadir',
    requires: [],
    description: DOMAIN_CATALOG.D17.description,
    lastUpdated: '2026-10-26',
  },
};

export function getSkillsByDomain(domainId: DomainId): Skill[] {
  return ALL_SKILLS.filter((s) => s.domain === domainId);
}

export function getSkillById(id: string): Skill | undefined {
  return ALL_SKILLS.find((s) => s.id === id);
}

export function getAvailableSkillIds(): Set<string> {
  return new Set(ALL_SKILLS.map((s) => s.id));
}
