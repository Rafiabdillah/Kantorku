/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D11: Manajemen Proyek & Produktivitas - Skills Definitions
 */

import { Skill } from '../../../types/skills';
import { ROLES } from '../../roles';
import { computeSkillRoleRelevance } from '../../roleRelevanceHelper';

export const D11_SKILLS: Skill[] = [
  {
    id: 'D11-SKILL-01',
    domain: 'D11',
    name: 'Manajemen Tugas, Prioritas & Matriks Eisenhower',
    description:
      'Klasifikasi urgensi vs kepentingan tugas, timeboxing harian, penataan alur kerja bebas distraksi, dan delegasi efektif.',
    prerequisites: [],
    canDo: {
      1: 'Mencatat daftar to-do list harian dan membedakan tenggat waktu mendesak vs penting.',
      2: 'Mengelompokkan tugas kerja ke dalam 4 kuadran Matriks Eisenhower (Lakukan, Jadwalkan, Delegasikan, Hapus).',
      3: 'Menerapkan metode timeboxing kalender untuk memblokade fokus kerja tanpa gangguan rapat.',
      4: 'Melakukan delegasi tugas operasional kepada staf dengan instruksi batasan kewenangan yang jelas.',
      5: 'Menyusun alur prioritas tim mingguan dan memangkas tugas bernilai rendah (eliminate waste).',
      6: 'Merancang kebijakan efisiensi rapat dan standardisasi saluran komunikasi kerja perusahaan.',
      7: 'Membangun sistem produktivitas organisasi terintegrasi untuk mencegah burnout karyawan.',
    },
    practiceModes: ['K'],
    linkedLessons: ['D11-LES-01'],
    linkedLevels: ['D11-LEVEL-01'],
    linkedCases: ['case-d11-01'],
    roleRelevance: computeSkillRoleRelevance('D11-SKILL-01', 'D11', ROLES),
    depth: 'menengah',
    estimatedHours: 8,
    sources: [
      'Project Management Institute (PMI): A Guide to the Project Management Body of Knowledge (PMBOK Guide – 7th Edition, 2021)',
      'Covey, S. R. (2020). The 7 Habits of Highly Effective People: Habit 3 Put First Things First (Simon & Schuster, 30th Anniversary Edition)',
    ],
    lastReviewed: '2026-10-29',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D11-SKILL-02',
    domain: 'D11',
    name: 'Struktur Rincian Kerja (WBS) & Jadwal Proyek Gantt',
    description:
      'Dekomposisi ruang lingkup proyek (WBS 100% Rule), estimasi durasi tugas, penentuan milestone utama, dan identifikasi jalur kritis (Critical Path).',
    prerequisites: ['D11-SKILL-01'],
    canDo: {
      1: 'Menentukan sasaran proyek dengan kriteria SMART (Specific, Measurable, Achievable, Relevant, Time-bound).',
      2: 'Memecah deliverable proyek utama menjadi paket kerja tingkat operasional (Work Breakdown Structure).',
      3: 'Menerapkan aturan 100% WBS sehingga tidak ada pekerjaan terlewat atau ruang lingkup berlebih.',
      4: 'Memetakan dependensi antar-aktivitas (Finish-to-Start) dan mengidentifikasi milestone kunci.',
      5: 'Menghitung estimasi jalur kritis (Critical Path Method) untuk mencegah keterlambatan tenggat akhir.',
      6: 'Menyusun bagan visual Gantt Chart berkala dan mengelola deviasi jadwal proyek.',
      7: 'Merancang standar metodologi perencanaan proyek skala korporasi lintas divisi.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D11-LES-02'],
    linkedLevels: ['D11-LEVEL-02', 'D11-LEVEL-04'],
    linkedCases: ['case-d11-01'],
    roleRelevance: computeSkillRoleRelevance('D11-SKILL-02', 'D11', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'ISO 21500:2021 Project, programme and portfolio management — Context and concepts (International Organization for Standardization, 2021)',
      'Kerzner, H. (2017). Project Management: A Systems Approach to Planning, Scheduling, and Controlling (John Wiley & Sons, 12th ed.)',
    ],
    lastReviewed: '2026-10-29',
    requires: ['advanced-quiz-engine', 'simulation-engine'],
  },
  {
    id: 'D11-SKILL-03',
    domain: 'D11',
    name: 'Alur Kerja Tim Kanban & Manajemen Risiko Proyek',
    description:
      'Penerapan papan visual alur kerja (To Do, In Progress, Review, Done), pembatasan Work in Progress (WIP Limits), standup harian, dan penyusunan Risk Register.',
    prerequisites: ['D11-SKILL-01'],
    canDo: {
      1: 'Menata kartu tugas pada papan visual Kanban berdasarkan tahapan proses alur kerja.',
      2: 'Menetapkan batas jumlah pekerjaan aktif berjalan (WIP limits) untuk menghindari leher botol (bottleneck).',
      3: 'Memfasilitasi rapat koordinasi kilat harian (daily standup 15 menit) dengan 3 pertanyaan fokus.',
      4: 'Mengidentifikasi potensi risiko teknis, jadwal, atau sumber daya dan mencatatnya ke dalam Risk Register.',
      5: 'Menghitung skor probabilitas dan dampak risiko untuk menentukan strategi mitigasi prioritas.',
      6: 'Melakukan peninjauan retrospektif proyek (Sprint Retrospective) guna continuous improvement alur kerja.',
      7: 'Membangun arsitektur tata kelola proyek tangkas (Agile/Kanban framework) adaptif seluruh organisasi.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D11-LES-03'],
    linkedLevels: ['D11-LEVEL-03'],
    linkedCases: ['case-d11-01'],
    roleRelevance: computeSkillRoleRelevance('D11-SKILL-03', 'D11', ROLES),
    depth: 'menengah',
    estimatedHours: 8,
    sources: [
      'Anderson, D. J., & Carmichael, A. (2016). Essential Kanban Condensed (Lean-Kanban University Press, 2016)',
      'ISO 31000:2018 Risk Management — Guidelines (International Organization for Standardization, 2018)',
    ],
    lastReviewed: '2026-10-29',
    requires: ['advanced-quiz-engine', 'simulation-engine'],
  },
];
