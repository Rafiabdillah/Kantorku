/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D14: Literasi Digital, Keamanan & AI - Skills Definitions
 */

import { Skill } from '../../../types/skills';
import { ROLES } from '../../roles';
import { computeSkillRoleRelevance } from '../../roleRelevanceHelper';

export const D14_SKILLS: Skill[] = [
  {
    id: 'D14-SKILL-01',
    domain: 'D14',
    name: 'Keamanan Akun, Sandi & Verifikasi Dua Langkah',
    description: 'Manajemen kata sandi kuat, prinsip manajer sandi, 2FA/MFA, dan protokol pencadangan data 3-2-1.',
    prerequisites: [],
    canDo: {
      1: 'Membuat kata sandi kuat unik dengan kombinasi karakter dan frasa sandi (passphrase).',
      2: 'Mengaktifkan verifikasi dua langkah (2FA berbasis aplikasi otentikasi) pada akun kerja.',
      3: 'Menerapkan pencadangan data kantor dengan aturan 3-2-1 (3 salinan, 2 media, 1 lokasi terpisah).',
      4: 'Mengelola brankas sandi tim kantor dan mengaudit kebocoran kredensial berkala.',
      5: 'Menyusun kebijakan keamanan kata sandi dan hak akses karyawan per departemen.',
      6: 'Merancang rencana kontinjensi pemulihan bencana (disaster recovery) data operasional.',
      7: 'Mengaudit arsitektur keamanan informasi kantor sesuai standar ISO/IEC 27001.',
    },
    practiceModes: ['K'],
    linkedLessons: ['D14-LES-01'],
    linkedLevels: ['D14-LEVEL-01'],
    linkedCases: ['case-d14-01'],
    roleRelevance: computeSkillRoleRelevance('D14-SKILL-01', 'D14', ROLES),
    depth: 'menengah',
    estimatedHours: 8,
    sources: [
      'ISO/IEC 27001:2022 Information Security Management Systems (ISO/IEC, 2022)',
      'NIST Special Publication 800-63B: Digital Identity Guidelines - Authentication (NIST, 2020)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D14-SKILL-02',
    domain: 'D14',
    name: 'Deteksi Phishing, Rekayasa Sosial & Proteksi PDP',
    description: 'Identifikasi pesan tipuan (phishing, spoofing), prinsip pertahanan rekayasa sosial, dan kepatuhan UU PDP.',
    prerequisites: ['D14-SKILL-01'],
    canDo: {
      1: 'Mengenali ciri-ciri email dan pesan chat mencurigakan (urgensi palsu, domain typo).',
      2: 'Memeriksa header dan alamat domain pengirim asli sebelum mengklik tautan atau mengunduh lampiran.',
      3: 'Menolak permintaan data sensitif karyawan/klien yang melanggar protokol Pelindungan Data Pribadi (UU PDP).',
      4: 'Melakukan de-eskalasi dan pelaporan insiden dugaan rekayasa sosial kepada tim keamanan kantor.',
      5: 'Menyusun prosedur penanganan insiden phishing dan edukasi kesadaran siber staf operasional.',
      6: 'Melakukan audit kepatuhan aliran data pribadi pelanggan terhadap regulasi privasi.',
      7: 'Merancang tata kelola privasi data (privacy by design) pada sistem operasional bisnis.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D14-LES-02'],
    linkedLevels: ['D14-LEVEL-02', 'D14-LEVEL-04'],
    linkedCases: ['case-d14-01'],
    roleRelevance: computeSkillRoleRelevance('D14-SKILL-02', 'D14', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP, LNRI No. 196, 2022)',
      'NIST Cybersecurity Framework (CSF) 2.0 (National Institute of Standards and Technology, 2024)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['simulation-engine', 'advanced-quiz-engine'],
  },
  {
    id: 'D14-SKILL-03',
    domain: 'D14',
    name: 'Prompting Bertanggung Jawab & Validasi Anti-Halusinasi AI',
    description: 'Penulisan instruksi prompt 5 elemen, batasan kerahasiaan data pada AI, dan verifikasi fakta keluaran model.',
    prerequisites: ['D14-SKILL-01'],
    canDo: {
      1: 'Menulis instruksi terstruktur dengan 5 elemen: Peran, Tujuan, Konteks, Format, dan Batasan.',
      2: 'Mencegah pengunggahan data rahasia perusahaan (gaji, data pribadi pelanggan) ke sistem AI pihak ketiga.',
      3: 'Melakukan verifikasi fakta silang (cross-check) terhadap angka, regulasi, dan rujukan hasil teks AI.',
      4: 'Mendeteksi halusinasi data dan logika bias dalam ringkasan dokumen yang dibangkitkan AI.',
      5: 'Menyusun panduan penggunaan AI generatif yang etis dan transparan untuk tim kerja kantor.',
      6: 'Merancang alur kerja augmentasi dokumen bisnis berbasis AI dengan gerbang review manusia (human-in-the-loop).',
      7: 'Menilai risiko kepatuhan hukum, hak cipta aset, dan dampak etika integrasi sistem otomatisasi cerdas.',
    },
    practiceModes: ['T', 'K'],
    linkedLessons: ['D14-LES-03'],
    linkedLevels: ['D14-LEVEL-03'],
    linkedCases: ['case-d14-01'],
    roleRelevance: computeSkillRoleRelevance('D14-SKILL-03', 'D14', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Surat Edaran Menkominfo No. 9 Tahun 2023 tentang Etika Kecerdasan Artifisial (Kemenkominfo RI, 2023)',
      'ISO/IEC 42001:2023 Artificial Intelligence Management System (ISO/IEC, 2023)',
    ],
    lastReviewed: '2026-10-26',
    requires: ['advanced-quiz-engine'],
  },
];
