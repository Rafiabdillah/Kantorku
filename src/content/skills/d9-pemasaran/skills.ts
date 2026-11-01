/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D9: Pemasaran & Penjualan - Skills Definitions
 */

import { Skill } from '../../../types/skills';
import { ROLES } from '../../roles';
import { computeSkillRoleRelevance } from '../../roleRelevanceHelper';

export const D9_SKILLS: Skill[] = [
  {
    id: 'D9-SKILL-01',
    domain: 'D9',
    name: 'Riset Pasar, Buyer Persona & Bauran Pemasaran (4P/7P)',
    description:
      'Segmentasi pasar, pemetaan profil pelanggan ideal (buyer persona), analisis proposisi nilai, dan integrasi bauran pemasaran Product, Price, Place, Promotion.',
    prerequisites: [],
    canDo: {
      1: 'Mengidentifikasi segmentasi demografis dan geografis target audiens produk.',
      2: 'Menyusun lembar profil Buyer Persona lengkap dengan titik nyeri (pain points) dan motivasi belanja.',
      3: 'Merumuskan Unique Value Proposition (UVP) yang membedakan produk dari kompetitor.',
      4: 'Menerapkan bauran pemasaran 4P (Product, Price, Place, Promotion) pada penawaran ritel dan UMKM.',
      5: 'Melakukan penyesuaian strategi harga psikologis berbasis positioning pasar.',
      6: 'Menganalisis umpan balik konsumen untuk perbaikan saluran distribusi produk.',
      7: 'Merancang arsitektur riset pasar terpadu untuk ekspansi lini produk baru.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D9-LES-01'],
    linkedLevels: ['D9-LEVEL-01', 'D9-LEVEL-02'],
    linkedCases: ['case-d9-01'],
    roleRelevance: computeSkillRoleRelevance('D9-SKILL-01', 'D9', ROLES),
    depth: 'menengah',
    estimatedHours: 12,
    sources: [
      'Kotler, P., & Armstrong, G. (2021). Principles of Marketing (Pearson, 18th ed.)',
      'UU No. 8 Tahun 1999 tentang Perlindungan Konsumen (Ketentuan Iklan & Informasi Produk Jujur)',
    ],
    lastReviewed: '2026-10-31',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D9-SKILL-02',
    domain: 'D9',
    name: 'Copywriting Iklan, Saluran Konten & Etika Promosi Digital',
    description:
      'Penulisan naskah promosi persuasif berbasis formula AIDA (Attention, Interest, Desire, Action), perencanaan kalender editorial, dan kepatuhan hukum periklanan.',
    prerequisites: ['D9-SKILL-01'],
    canDo: {
      1: 'Menulis judul (hook) penawaran yang menarik tanpa menggunakan umpan klik palsu (clickbait menyesatkan).',
      2: 'Menerapkan struktur naskah AIDA pada deskripsi produk dan materi promosi media sosial.',
      3: 'Menyusun kalender editorial konten mingguan yang menyeimbangkan konten edukasi, hiburan, dan jualan.',
      4: 'Memilih saluran pemasaran digital yang relevan (email, media sosial, perpesanan instan, marketplace).',
      5: 'Menghindari klaim berlebihan atau tanpa bukti sesuai etika pariwara dan UU Perlindungan Konsumen.',
      6: 'Menyusun naskah penawaran promo terbatas (scarcity) yang transparan dan dapat dipertanggungjawabkan.',
      7: 'Mengembangkan strategi narasi brand lintas saluran dan tata kelola etika periklanan perusahaan.',
    },
    practiceModes: ['K'],
    linkedLessons: ['D9-LES-02'],
    linkedLevels: ['D9-LEVEL-01'],
    linkedCases: ['case-d9-01'],
    roleRelevance: computeSkillRoleRelevance('D9-SKILL-02', 'D9', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Chaffey, D., & Ellis-Chadwick, F. (2019). Digital Marketing: Strategy, Implementation and Practice (Pearson, 7th ed.)',
      'PP No. 80 Tahun 2019 tentang Perdagangan Melalui Sistem Elektronik (PMSE)',
    ],
    lastReviewed: '2026-10-31',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D9-SKILL-03',
    domain: 'D9',
    name: 'Analisis Metrik Kinerja Pemasaran (CAC, LTV, ROAS & ROI)',
    description:
      'Penghitungan efisiensi biaya akuisisi pelanggan (CAC), nilai seumur hidup pelanggan (LTV), rasio pengembalian belanja iklan (ROAS), dan laba atas investasi (ROI) kampanye.',
    prerequisites: ['D9-SKILL-01'],
    canDo: {
      1: 'Menghitung rasio konversi (Conversion Rate) pada setiap tahapan corong penjualan (funnel).',
      2: 'Menghitung Biaya Akuisisi Pelanggan (CAC = Total Biaya Pemasaran / Jumlah Pelanggan Baru).',
      3: 'Menganalisis pengembalian belanja iklan digital (ROAS = Pendapatan dari Iklan / Belanja Iklan).',
      4: 'Mengevaluasi rasio LTV/CAC untuk menilai keberlanjutan ekonomi unit bisnis (minimal 3x).',
      5: 'Menghitung Return on Investment (ROI) kampanye pemasaran menyeluruh.',
      6: 'Mengidentifikasi pos pemborosan anggaran iklan dan melakukan realokasi ke kanal berkinerja tertinggi.',
      7: 'Membangun dasbor analitik metrik akuisisi dan retensi pelanggan untuk pengambilan keputusan eksekutif.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D9-LES-03'],
    linkedLevels: ['D9-LEVEL-03', 'D9-LEVEL-04'],
    linkedCases: ['case-d9-01'],
    roleRelevance: computeSkillRoleRelevance('D9-SKILL-03', 'D9', ROLES),
    depth: 'menengah',
    estimatedHours: 12,
    sources: [
      'Kotler, P., & Armstrong, G. (2021). Principles of Marketing (Pearson, 18th ed.)',
      'Chaffey, D., & Ellis-Chadwick, F. (2019). Digital Marketing: Strategy, Implementation and Practice (Pearson, 7th ed.)',
    ],
    lastReviewed: '2026-10-31',
    requires: ['advanced-quiz-engine'],
  },
];
