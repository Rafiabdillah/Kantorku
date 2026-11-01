/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Semesta Keterampilan Content Index
 */

import { Skill, SkillPackManifest, DomainId } from '../../types/skills';
import { DOMAIN_CATALOG } from '../../types/skills';
import { D12_MANIFEST } from './d12-komunikasi/manifest';
import { D12_SKILLS } from './d12-komunikasi/skills';
import { D7_MANIFEST } from './d7-keuangan-pribadi/manifest';
import { D7_SKILLS } from './d7-keuangan-pribadi/skills';
import { D14_MANIFEST } from './d14-literasi-digital/manifest';
import { D14_SKILLS } from './d14-literasi-digital/skills';
import { D15_MANIFEST } from './d15-karier-akademik/manifest';
import { D15_SKILLS } from './d15-karier-akademik/skills';
import { D11_MANIFEST } from './d11-manajemen-proyek/manifest';
import { D11_SKILLS } from './d11-manajemen-proyek/skills';
import { D3_MANIFEST } from './d3-presentasi/manifest';
import { D3_SKILLS } from './d3-presentasi/skills';
import { D6_MANIFEST } from './d6-akuntansi/manifest';
import { D6_SKILLS } from './d6-akuntansi/skills';
import { D8_MANIFEST } from './d8-operasional/manifest';
import { D8_SKILLS } from './d8-operasional/skills';
import { D9_MANIFEST } from './d9-pemasaran/manifest';
import { D9_SKILLS } from './d9-pemasaran/skills';
import { D10_MANIFEST } from './d10-sdm/manifest';
import { D10_SKILLS } from './d10-sdm/skills';
import { D4_MANIFEST } from './d4-data-sql/manifest';
import { D4_SKILLS } from './d4-data-sql/skills';
import { D17_MANIFEST } from './d17-hukum-kepatuhan/manifest';
import { D17_SKILLS } from './d17-hukum-kepatuhan/skills';
import { D13_SKILLS } from './d13-bahasa-inggris/skills';
import { D16_SKILLS } from './d16-desain-uiux/skills';
import { ROLES } from '../roles';
import { computeSkillRoleRelevance } from '../roleRelevanceHelper';

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
    linkedLessons: ['les-excel-sum-basics', 'les-excel-vlookup-basics'],
    linkedLevels: ['excel-t1-01', 'excel-t2-01'],
    linkedCases: ['case-01-sayur'],
    roleRelevance: computeSkillRoleRelevance('D1-SKILL-01', 'D1', ROLES),
    depth: 'penuh',
    estimatedHours: 12,
    sources: [
      'Pedoman Tata Kelola Data dan Spreadsheet Kemenkeu RI (2023)',
      'Microsoft Excel 365 Data Analysis Specification (2024)',
    ],
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
    linkedLessons: ['les-word-official-letter', 'les-word-sop'],
    linkedLevels: ['word-t1-01'],
    linkedCases: ['case-08-word-sop'],
    roleRelevance: computeSkillRoleRelevance('D2-SKILL-01', 'D2', ROLES),
    depth: 'penuh',
    estimatedHours: 10,
    sources: [
      'Permenpan-RB No. 83 Tahun 2012 tentang Pedoman Tata Naskah Dinas Instansi Pemerintah',
      'Kamus Besar Bahasa Indonesia (KBBI) VI Daring (2024)',
    ],
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
    linkedLessons: ['les-code-function-basics', 'les-code-array-operations'],
    linkedLevels: ['code-t1-01'],
    linkedCases: [],
    roleRelevance: computeSkillRoleRelevance('D5-SKILL-01', 'D5', ROLES),
    depth: 'penuh',
    estimatedHours: 14,
    sources: [
      'ECMA-262 14th Edition ECMAScript Language Specification (2023)',
      'MDN Web Docs: JavaScript Guide (Mozilla, 2024)',
    ],
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
    linkedLessons: ['les-web-html-structure', 'les-web-flexbox-cards'],
    linkedLevels: ['web-t1-01'],
    linkedCases: ['case-03-web-umkm'],
    roleRelevance: computeSkillRoleRelevance('D5-SKILL-02', 'D5', ROLES),
    depth: 'penuh',
    estimatedHours: 12,
    sources: [
      'W3C HTML5.3 Recommendation & Web Content Accessibility Guidelines (WCAG) 2.2 (2023)',
      'MDN Web Docs: HTML & CSS Semantic Web (2024)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['web-preview'],
  },
];

// All Registered Skills in the Universe for Wave S2b
export const ALL_SKILLS: Skill[] = [
  ...D1_SKILLS,
  ...D2_SKILLS,
  ...D5_SKILLS,
  ...D12_SKILLS,
  ...D14_SKILLS,
  ...D15_SKILLS,
  ...D7_SKILLS,
  ...D11_SKILLS,
  ...D3_SKILLS,
  ...D6_SKILLS,
  ...D8_SKILLS,
  ...D9_SKILLS,
  ...D10_SKILLS,
  ...D4_SKILLS,
  ...D17_SKILLS,
  ...D13_SKILLS,
  ...D16_SKILLS,
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
  D3: D3_MANIFEST,
  D4: D4_MANIFEST,
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
  D6: D6_MANIFEST,
  D7: D7_MANIFEST,
  D8: D8_MANIFEST,
  D9: D9_MANIFEST,
  D10: D10_MANIFEST,
  D11: D11_MANIFEST,
  D12: D12_MANIFEST,
  D13: {
    domain: 'D13',
    name: DOMAIN_CATALOG.D13.name,
    version: '1.0.0',
    wave: 'S3',
    depth: 'menengah',
    status: 'aktif',
    requires: [],
    description: DOMAIN_CATALOG.D13.description,
    lastUpdated: '2026-11-01',
  },
  D14: D14_MANIFEST,
  D15: D15_MANIFEST,
  D16: {
    domain: 'D16',
    name: DOMAIN_CATALOG.D16.name,
    version: '1.0.0',
    wave: 'S3',
    depth: 'menengah',
    status: 'aktif',
    requires: ['advanced-quiz-engine', 'contrast-calculator'],
    description: DOMAIN_CATALOG.D16.description,
    lastUpdated: '2026-11-01',
  },
  D17: D17_MANIFEST,
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
