/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D10: SDM & Kepemimpinan - Skills Definitions
 */

import { Skill } from '../../../types/skills';
import { ROLES } from '../../roles';
import { computeSkillRoleRelevance } from '../../roleRelevanceHelper';

export const D10_SKILLS: Skill[] = [
  {
    id: 'D10-SKILL-01',
    domain: 'D10',
    name: 'Administrasi Ketenagakerjaan, Kontrak PKWT/PKWTT & Kepatuhan Regulasi',
    description:
      'Penyusunan perjanjian kerja waktu tertentu (PKWT), pemahaman masa percobaan, hak istirahat cuti, dan kepatuhan undang-undang ketenagakerjaan.',
    prerequisites: [],
    canDo: {
      1: 'Membedakan klausula hak dan kewajiban antara kontrak kerja PKWT dan PKWTT.',
      2: 'Menerapkan batas durasi maksimal PKWT dan uang kompensasi berakhirnya kontrak kerja sesuai PP No. 35/2021.',
      3: 'Menyusun draf surat perjanjian kerja standar yang memuat syarat jabatan, upah, dan tata tertib.',
      4: 'Mengelola pencatatan hak cuti tahunan, cuti sakit dengan surat dokter, dan istirahat melahirkan.',
      5: 'Mengidentifikasi larangan masa percobaan (probation) pada perjanjian kerja waktu tertentu.',
      6: 'Melakukan audit dokumen kepatuhan ketenagakerjaan internal perusahaan.',
      7: 'Merancang arsitektur tata kelola hubungan industrial dan perjanjian kerja bersama skala korporat.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D10-LES-01'],
    linkedLevels: ['D10-LEVEL-01', 'D10-LEVEL-02'],
    linkedCases: ['case-d10-01'],
    roleRelevance: computeSkillRoleRelevance('D10-SKILL-01', 'D10', ROLES),
    depth: 'menengah',
    estimatedHours: 12,
    sources: [
      'UU No. 13 Tahun 2003 tentang Ketenagakerjaan jo. UU No. 6 Tahun 2023',
      'PP No. 35 Tahun 2021 tentang Perjanjian Kerja Waktu Tertentu, Alih Daya, Waktu Kerja dan PHK',
    ],
    lastReviewed: '2026-10-31',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D10-SKILL-02',
    domain: 'D10',
    name: 'Penggajian (Payroll), Perhitungan Lembur & THR Sesuai Regulasi',
    description:
      'Perhitungan slip upah, tarif lembur resmi berbasis pembagi 1/173 sesuai PP No. 35/2021, kalkulasi THR proporsional Permenaker No. 6/2016, dan potongan iuran BPJS.',
    prerequisites: ['D10-SKILL-01'],
    canDo: {
      1: 'Menghitung upah per jam resmi menggunakan rumus standar 1/173 dikali upah bulanan.',
      2: 'Menghitung uang lembur hari kerja biasa (1.5x upah jam pertama, 2x upah jam berikutnya).',
      3: 'Menghitung Tunjangan Hari Raya (THR) proporsional untuk masa kerja kurang dari 12 bulan.',
      4: 'Menguraikan potongan iuran BPJS Kesehatan (1% pekerja, 4% pemberi kerja) dan BPJS Ketenagakerjaan.',
      5: 'Menyusun slip gaji resmi dengan transparansi rincian upah pokok, tunjangan tetap, dan potongan.',
      6: 'Melakukan rekonsiliasi data lembur tim operasional untuk mencegah kelebihan/kekurangan bayar.',
      7: 'Membangun sistem penggajian otomatis yang patuh regulasi ketenagakerjaan dan perpajakan PPh 21.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D10-LES-02'],
    linkedLevels: ['D10-LEVEL-03', 'D10-LEVEL-04'],
    linkedCases: ['case-d10-01'],
    roleRelevance: computeSkillRoleRelevance('D10-SKILL-02', 'D10', ROLES),
    depth: 'menengah',
    estimatedHours: 12,
    sources: [
      'PP No. 35 Tahun 2021 tentang Perjanjian Kerja Waktu Tertentu, Alih Daya, Waktu Kerja dan PHK (Pasal 31-32)',
      'Permenaker No. 6 Tahun 2016 tentang Tunjangan Hari Raya Keagamaan Bagi Pekerja/Buruh di Perusahaan',
    ],
    lastReviewed: '2026-10-31',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D10-SKILL-03',
    domain: 'D10',
    name: 'Manajemen Kinerja, Konseling Karyawan & De-eskalasi Friksi Tim',
    description:
      'Penyusunan indikator kinerja kunci (KPI/OKRs), teknik umpan balik konstruktif (SBI: Situation-Behavior-Impact), konseling kedisiplinan, dan mediasi konflik internal.',
    prerequisites: ['D10-SKILL-01'],
    canDo: {
      1: 'Merumuskan target kinerja SMART (Specific, Measurable, Achievable, Relevant, Time-bound).',
      2: 'Memberikan umpan balik evaluasi kinerja menggunakan model Situation-Behavior-Impact (SBI).',
      3: 'Melakukan wawancara konseling untuk staf dengan penurunan performa kerja secara suportif.',
      4: 'Menerapkan tahapan surat peringatan (SP 1, SP 2, SP 3) sesuai aturan perusahaan dan undang-undang.',
      5: 'Memfasilitasi mediasi penyelesaian konflik interpersonal antar rekan kerja dengan netral.',
      6: 'Menyusun rencana perbaikan kinerja (Performance Improvement Plan / PIP) berjangka waktu jelas.',
      7: 'Merancang program retensi bakat dan budaya kerja kolaboratif berorientasi produktivitas tinggi.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D10-LES-03'],
    linkedLevels: ['D10-LEVEL-01', 'D10-LEVEL-02'],
    linkedCases: ['case-d10-01'],
    roleRelevance: computeSkillRoleRelevance('D10-SKILL-03', 'D10', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Dessler, G. (2020). Human Resource Management (Pearson, 16th ed.)',
      'UU No. 13 Tahun 2003 tentang Ketenagakerjaan jo. UU No. 6 Tahun 2023 (Tata Tertib & Sanksi Kerja)',
    ],
    lastReviewed: '2026-10-31',
    requires: ['advanced-quiz-engine'],
  },
];
