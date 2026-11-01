/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D15: Karier & Metodologi Akademik - Skills Definitions
 */

import { Skill } from '../../../types/skills';
import { ROLES } from '../../roles';
import { computeSkillRoleRelevance } from '../../roleRelevanceHelper';

export const D15_SKILLS: Skill[] = [
  {
    id: 'D15-SKILL-01',
    domain: 'D15',
    name: 'Penyusunan CV ATS & Portofolio Profesional',
    description: 'Format resume ramah mesin pelacak pelamar (ATS), penulisan deskripsi berbasis pencapaian (XYZ), dan deteksi lowongan palsu.',
    prerequisites: [],
    canDo: {
      1: 'Menyusun CV satu halaman dengan tata letak satu kolom yang lolos pemindaian mesin ATS.',
      2: 'Menuliskan pencapaian kerja dengan formula XYZ (Mencapai X, diukur dengan Y, dengan melakukan Z).',
      3: 'Mengidentifikasi ciri-ciri lowongan kerja palsu (memungut biaya travel, email domain gratisan).',
      4: 'Menyesuaikan kata kunci keahlian pada CV sesuai kualifikasi deskripsi pekerjaan lowongan.',
      5: 'Menyusun portofolio hasil kerja nyata berbasis tautan publik yang terorganisir rapi.',
      6: 'Melakukan peninjauan dan optimasi profil profesional untuk visibilitas rekruter.',
      7: 'Merancang strategi reposisi karier dan personal branding lintas industri.',
    },
    practiceModes: ['T', 'K'],
    linkedLessons: ['D15-LES-01'],
    linkedLevels: ['D15-LEVEL-01'],
    linkedCases: ['case-d15-01'],
    roleRelevance: computeSkillRoleRelevance('D15-SKILL-01', 'D15', ROLES),
    depth: 'menengah',
    estimatedHours: 8,
    sources: [
      'Job Description and Candidate Specification Standard (Chartered Institute of Personnel and Development - CIPD, 2022)',
      'Pedoman Pelayanan Antarkerja dan Rekrutmen Tenaga Kerja (Kementerian Ketenagakerjaan RI, 2021)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D15-SKILL-02',
    domain: 'D15',
    name: 'Teknik Wawancara Kerja & Negosiasi Karier',
    description: 'Menjawab pertanyaan wawancara terstruktur dengan model STAR, etika wawancara, dan negosiasi penawaran kerja.',
    prerequisites: ['D15-SKILL-01'],
    canDo: {
      1: 'Menyampaikan perkenalan diri profesional (elevator pitch) dalam durasi 90 detik.',
      2: 'Menjawab pertanyaan berbasis perilaku menggunakan kerangka STAR (Situasi, Tugas, Aksi, Hasil).',
      3: 'Menjawab pertanyaan sulit mengenai kelemahan diri dengan solusi mitigasi yang jujur dan konstruktif.',
      4: 'Mengajukan pertanyaan berbobot kepada pewawancara mengenai budaya kerja dan ekspektasi kinerja divisi.',
      5: 'Melakukan negosiasi rentang gaji dan tunjangan kerja dengan dasar riset pasar yang objektif.',
      6: 'Merancang rencana aksi 90 hari pertama kerja untuk masa probation magang/karyawan baru.',
      7: 'Mengembangkan kapabilitas wawancara manajerial dan kepemimpinan tingkat lanjut.',
    },
    practiceModes: ['S', 'K'],
    linkedLessons: ['D15-LES-02'],
    linkedLevels: ['D15-LEVEL-02', 'D15-LEVEL-04'],
    linkedCases: ['case-d15-01'],
    roleRelevance: computeSkillRoleRelevance('D15-SKILL-02', 'D15', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Behavioral Interviewing Guidelines and the STAR Model (Development Dimensions International - DDI, 2020)',
      'Getting to Yes: Negotiating Agreement Without Giving In (Roger Fisher & William Ury, Penguin Books, 2011)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['simulation-engine'],
  },
  {
    id: 'D15-SKILL-03',
    domain: 'D15',
    name: 'Metodologi Penelitian, Sitasi APA 7 & Etika Riset',
    description: 'Perumusan masalah skripsi/laporan, penelusuran literatur ilmiah, format rujukan APA edisi ke-7, dan pencegahan plagiarisme.',
    prerequisites: [],
    canDo: {
      1: 'Merumuskan pertanyaan penelitian dan tujuan studi yang spesifik, relevan, dan terukur.',
      2: 'Menyusun tinjauan pustaka dengan sintesis temuan dari minimal 5 artikel jurnal terakreditasi.',
      3: 'Menuliskan sitasi dalam teks dan daftar pustaka sesuai standar baku APA edisi ke-7.',
      4: 'Melakukan parafrase kalimat ilmiah untuk menjaga orisinalitas dan menurunkan skor kemiripan (similarity).',
      5: 'Memilih instrumen pengumpulan data (kuesioner skala Likert) dan rancangan sampel yang representatif.',
      6: 'Menyusun laporan skripsi atau makalah studi kasus bisnis dengan kaidah penulisan ilmiah yang ketat.',
      7: 'Mengevaluasi validitas, reliabilitas instrumen riset, dan kepatuhan kode etik penelitian akademik.',
    },
    practiceModes: ['K', 'T'],
    linkedLessons: ['D15-LES-03'],
    linkedLevels: ['D15-LEVEL-03'],
    linkedCases: ['case-d15-01'],
    roleRelevance: computeSkillRoleRelevance('D15-SKILL-03', 'D15', ROLES),
    depth: 'menengah',
    estimatedHours: 12,
    sources: [
      'Publication Manual of the American Psychological Association (7th ed., American Psychological Association, 2020)',
      'Pedoman Integritas Akademik dan Pencegahan Plagiarisme (Kemendikbudristek RI / Dirjen Dikti, 2021)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['advanced-quiz-engine'],
  },
];
