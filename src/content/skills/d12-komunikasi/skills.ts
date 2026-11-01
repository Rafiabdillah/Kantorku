/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D12: Komunikasi Profesional - Skills Definitions
 * Compliant with Bagian B Rule 2 inheritance: roleRelevance <= role domain weight.
 */

import { Skill } from '../../../types/skills';
import { ROLES } from '../../roles';
import { computeSkillRoleRelevance } from '../../roleRelevanceHelper';

export const D12_SKILLS: Skill[] = [
  {
    id: 'D12-SKILL-01',
    domain: 'D12',
    name: 'Email Bisnis & Korespondensi Formal',
    description:
      'Menyusun email bisnis dengan struktur 3C (Clear, Concise, Courteous), subjek spesifik, salam baku, ajakan bertindak jelas, dan manajemen lampiran teratur.',
    prerequisites: [],
    canDo: {
      1: 'Menulis salam pembuka dan salam penutup formal serta mencantumkan nama penerima dengan benar.',
      2: 'Menuliskan subjek email spesifik minimal 3 kata dan merumuskan tujuan pesan di paragraf pembuka.',
      3: 'Menyusun email tindak lanjut lengkap dengan ajakan bertindak (CTA) dan memverifikasi lampiran berkas.',
      4: 'Menyusun email klarifikasi masalah atau penagihan dengan nada sopan tanpa kalimat multitafsir.',
      5: 'Menyusun email resmi kepada pemangku kepentingan tingkat manajerial dengan ringkasan eksekutif padat.',
      6: 'Menyusun tanggapan resmi krisis komunikasi eksternal dan memo resmi kebijakan operasional.',
      7: 'Merancang standar operasional prosedur korespondensi dan panduan gaya komunikasi seluruh kantor.',
    },
    practiceModes: ['E', 'T', 'K'],
    linkedLessons: ['D12-LESSON-01'],
    linkedLevels: ['D12-LEVEL-01'],
    linkedCases: ['case-d12-01'],
    roleRelevance: computeSkillRoleRelevance('D12-SKILL-01', 'D12', ROLES),
    depth: 'menengah',
    estimatedHours: 6,
    sources: [
      'Pedoman Umum Ejaan Bahasa Indonesia (EYD Edisi V, Badan Pengembangan dan Pembinaan Bahasa Kemendikbudristek RI, 2022)',
      'Permenpan-RB No. 80 Tahun 2012 tentang Pedoman Tata Naskah Dinas Instansi Pemerintah (Kemenpan-RB, 2012)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['email-editor'],
  },
  {
    id: 'D12-SKILL-02',
    domain: 'D12',
    name: 'Etiket Chat Kerja & Komunikasi Cepat',
    description:
      'Berkomunikasi secara efisien melalui aplikasi pesan instan kantor, memperhatikan batasan jam kerja, nada profesional, dan pencegahan spam.',
    prerequisites: ['D12-SKILL-01'],
    canDo: {
      1: 'Menyapa rekan kerja dengan sopan di chat tanpa mengirim pesan sepotong "P" atau "Halo" tanpa maksud.',
      2: 'Merangkum pertanyaan penting dalam satu gelembung pesan lengkap (one-message summary).',
      3: 'Memilih saluran komunikasi yang tepat antara chat instan, email, atau panggilan suara darurat.',
      4: 'Menjaga batasan waktu komunikasi di luar jam kerja resmi dan menggunakan fitur jadwalkan pesan.',
      5: 'Mengelola komunikasi grup kerja lintas divisi tanpa memicu kegaduhan informasi atau salah paham.',
      6: 'Menyusun pedoman etika pesan instan perusahaan untuk menjaga work-life balance dan keamanan data.',
      7: 'Membangun arsitektur saluran informasi darurat dan protokol komunikasi krisis internal kantor.',
    },
    practiceModes: ['T', 'S', 'K'],
    linkedLessons: ['D12-LESSON-02'],
    linkedLevels: ['D12-LEVEL-02'],
    linkedCases: ['case-d12-01'],
    roleRelevance: computeSkillRoleRelevance('D12-SKILL-02', 'D12', ROLES),
    depth: 'menengah',
    estimatedHours: 4,
    sources: [
      'Undang-Undang Republik Indonesia No. 13 Tahun 2003 tentang Ketenagakerjaan (Pasal 77-78 Pengaturan Waktu Kerja dan Hak Istirahat, Pemerintah RI, 2003)',
      'Pedoman Umum Ejaan Bahasa Indonesia (EYD Edisi V, Badan Pengembangan dan Pembinaan Bahasa Kemendikbudristek RI, 2022)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['simulation-engine'],
  },
  {
    id: 'D12-SKILL-03',
    domain: 'D12',
    name: 'Penanganan Komplain & Negosiasi Situasional',
    description:
      'Teknik de-eskalasi emosi lawan bicara, mendengar aktif, mengakui kekeliruan tanpa menyalahkan sepihak, dan menawarkan solusi konkret yang dapat dieksekusi.',
    prerequisites: ['D12-SKILL-01'],
    canDo: {
      1: 'Mendengarkan keluhan pelanggan dengan tenang tanpa memotong pembicaraan atau menyela dengan defensif.',
      2: 'Mengucapkan permohonan maaf empati yang tulus atas ketidaknyamanan yang dialami pelanggan.',
      3: 'Menyampaikan fakta kendala secara objektif dan menawarkan opsi solusi yang realistis sesuai SLA.',
      4: 'Menangani pelanggan atau mitra kerja yang emosional dengan teknik komunikasi asertif tanpa menyerang.',
      5: 'Melakukan negosiasi kompensasi atau penyesuaian tenggat yang menguntungkan kedua belah pihak.',
      6: 'Menyelesaikan eskalasi sengketa kerja sama dagang atau komplain bernilai besar secara diplomatis.',
      7: 'Membangun gugus tugas manajemen krisis pelanggan dan protokol retensi mitra strategis.',
    },
    practiceModes: ['S', 'T', 'K', 'P'],
    linkedLessons: ['D12-LESSON-03'],
    linkedLevels: ['D12-LEVEL-03'],
    linkedCases: ['case-d12-01'],
    roleRelevance: computeSkillRoleRelevance('D12-SKILL-03', 'D12', ROLES),
    depth: 'menengah',
    estimatedHours: 8,
    sources: [
      'ISO 10002:2018 Quality Management — Customer Satisfaction — Guidelines for Complaints Handling in Organizations (International Organization for Standardization, 2018)',
      'Fisher, R., Ury, W. L., & Patton, B. (2011). Getting to Yes: Negotiating Agreement Without Giving In (Penguin Books, 3rd ed.)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['simulation-engine', 'advanced-quiz-engine'],
  },
];
