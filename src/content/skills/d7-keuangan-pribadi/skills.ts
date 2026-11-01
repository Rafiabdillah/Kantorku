/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D7: Keuangan Pribadi & Wirausaha - Skills Definitions
 */

import { Skill } from '../../../types/skills';
import { ROLES } from '../../roles';
import { computeSkillRoleRelevance } from '../../roleRelevanceHelper';

export const D7_SKILLS: Skill[] = [
  {
    id: 'D7-SKILL-01',
    domain: 'D7',
    name: 'Manajemen Anggaran Pribadi, Dana Darurat & Arus Kas',
    description: 'Metode alokasi anggaran (50/30/20), perhitungan dana darurat bertingkat, evaluasi bunga flat vs efektif, dan manajemen cicilan sehat.',
    prerequisites: [],
    canDo: {
      1: 'Mencatat pengeluaran harian dan mengelompokkan ke dalam kebutuhan primer vs keinginan.',
      2: 'Menyusun alokasi anggaran bulanan dengan metode proporsional (contoh: 50% kebutuhan, 30% keinginan, 20% tabungan).',
      3: 'Menghitung target dana darurat minimal (3 hingga 6 kali pengeluaran bulanan) berdasarkan profil tanggungan.',
      4: 'Membandingkan skema bunga cicilan flat vs efektif untuk memahami total biaya riil utang.',
      5: 'Merancang simulasi rencana pelunasan utang (metode snowball vs avalanche).',
      6: 'Menyusun proyeksi arus kas pribadi jangka menengah dengan memperhitungkan faktor inflasi.',
      7: 'Mengembangkan model perencanaan finansial mandiri berbasis lembar kerja otomatis.',
    },
    practiceModes: ['K'],
    linkedLessons: ['D7-LES-01'],
    linkedLevels: ['D7-LEVEL-01'],
    linkedCases: ['case-d7-01'],
    roleRelevance: computeSkillRoleRelevance('D7-SKILL-01', 'D7', ROLES),
    depth: 'menengah',
    estimatedHours: 8,
    sources: [
      'Buku Saku Literasi Keuangan: Perencanaan Keuangan Keluarga (Otoritas Jasa Keuangan - OJK, 2021)',
      'Financial Planning Standards Board (FPSB) Code of Ethics and Professional Responsibility (FPSB Indonesia, 2022)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D7-SKILL-02',
    domain: 'D7',
    name: 'Validasi Model Bisnis (BMC) & Penetapan Harga UMKM',
    description: 'Penyusunan 9 blok Business Model Canvas, analisis titik impas (BEP) sederhana, penetapan harga jual berdasar HPP, dan perizinan usaha edukatif.',
    prerequisites: ['D7-SKILL-01'],
    canDo: {
      1: 'Mengidentifikasi proposisi nilai (Value Proposition) dan segmen pelanggan sasaran usaha rintisan.',
      2: 'Menyusun 9 elemen Business Model Canvas (BMC) untuk memetakan alur bisnis usaha mikro.',
      3: 'Menghitung Harga Pokok Penjualan (HPP) per unit produk makanan/jasa sederhana.',
      4: 'Menentukan harga jual produk berdasarkan target margin keuntungan yang realistis.',
      5: 'Menghitung volume titik impas (Break-Even Point / BEP) dalam unit dan nominal rupiah.',
      6: 'Menyusun ringkasan proyeksi modal kerja awal dan proyeksi laba rugi tahun pertama.',
      7: 'Mengevaluasi risiko operasional dan merancang alur legalitas perizinan usaha dasar (NIB).',
    },
    practiceModes: ['K', 'T', 'S'],
    linkedLessons: ['D7-LES-02'],
    linkedLevels: ['D7-LEVEL-02', 'D7-LEVEL-03'],
    linkedCases: ['case-d7-01'],
    roleRelevance: computeSkillRoleRelevance('D7-SKILL-02', 'D7', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers (Alexander Osterwalder & Yves Pigneur, John Wiley & Sons, 2010)',
      'Panduan Kemudahan, Pelindungan, dan Pemberdayaan Koperasi dan Usaha Mikro, Kecil, dan Menengah (Kementerian Koperasi dan UKM RI, 2021)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['advanced-quiz-engine', 'simulation-engine'],
  },
  {
    id: 'D7-SKILL-03',
    domain: 'D7',
    name: 'Pengendalian Arus Kas Operasional, Analisis BEP & Legalitas NIB',
    description: 'Manajemen siklus kas usaha kecil, pemisahan rekening pribadi vs usaha, kalkulasi titik impas BEP, dan kepatuhan perizinan NIB.',
    prerequisites: ['D7-SKILL-02'],
    canDo: {
      1: 'Menerapkan disiplin pemisahan rekening bank pribadi dan rekening operasional usaha mikro.',
      2: 'Mengidentifikasi klasifikasi biaya tetap (fixed cost) versus biaya variabel (variable cost).',
      3: 'Menghitung titik impas operasional (BEP dalam unit dan nominal rupiah) secara akurat.',
      4: 'Menyusun simulasi arus kas mingguan untuk mengantisipasi keterlambatan pembayaran piutang pelanggan.',
      5: 'Melakukan pendaftaran dan verifikasi Nomor Induk Berusaha (NIB) berbasis risiko.',
      6: 'Menyusun proposal kemitraan usaha mikro dengan transparansi laporan keuangan berstandar SAK EMKM.',
      7: 'Merancang arsitektur tata kelola keuangan usaha kecil yang tahan krisis dan siap ekspansi.',
    },
    practiceModes: ['S', 'K'],
    linkedLessons: ['D7-LES-03'],
    linkedLevels: ['D7-LEVEL-04'],
    linkedCases: ['case-d7-01'],
    roleRelevance: computeSkillRoleRelevance('D7-SKILL-03', 'D7', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Ikatan Akuntan Indonesia (IAI): Standar Akuntansi Keuangan Entitas Mikro, Kecil, dan Menengah (SAK EMKM, 2016)',
      'Peraturan Pemerintah Nomor 7 Tahun 2021 tentang Kemudahan, Pelindungan, dan Pemberdayaan Koperasi dan UMKM (Sekretariat Negara RI, 2021)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['simulation-engine', 'advanced-quiz-engine'],
  },
];
