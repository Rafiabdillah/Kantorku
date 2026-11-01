/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - 16 Jalur Peran Kerja (Career Paths) & Dynamic Readiness Calculator
 * Sesuai Bagian B PATCH v9.1.
 */

import { Role, RoleReadinessResult } from '../types/roles';
import { DOMAIN_CATALOG, DomainId } from '../types/skills';

export const MANDATORY_ROLE_DISCLAIMER =
  'Pemetaan perkiraan untuk keperluan latihan. Bukan standar resmi (mis. SKKNI) dan bukan jaminan kesiapan kerja.';

export const ROLES: Role[] = [
  {
    id: 'admin-perkantoran',
    name: 'Admin Perkantoran',
    tagline: 'Manajemen arsip, korespondensi resmi, dan koordinasi operasional harian.',
    description:
      'Menangani tata kelola dokumen kantor, surat-menyurat dinas, penjadwalan, rekap lembar kerja, dan komunikasi lintas bagian.',
    icon: '📋',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D1', targetTier: 4, weight: 5, keySkills: ['rumus dasar-menengah', 'format', 'sort dan filter', 'VLOOKUP'] },
      { domainId: 'D2', targetTier: 4, weight: 5, keySkills: ['surat resmi', 'notulen', 'template'] },
      { domainId: 'D12', targetTier: 4, weight: 4, keySkills: ['email bisnis', 'etiket chat'] },
      { domainId: 'D11', targetTier: 3, weight: 4, keySkills: ['email', 'file', 'jadwal'] },
      { domainId: 'D3', targetTier: 3, weight: 3 },
      { domainId: 'D14', targetTier: 3, weight: 3 },
      { domainId: 'D13', targetTier: 2, weight: 2 },
      { domainId: 'D6', targetTier: 2, weight: 1 },
    ],
    skills: [
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Rumus Dasar & Lookup Excel', targetTier: 4, weight: 5, isKeySkill: true },
      { skillId: 'D2-SKILL-01', domainId: 'D2', name: 'Penyusunan Surat Resmi & Notulen', targetTier: 4, weight: 5, isKeySkill: true },
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Bisnis & Korespondensi Formal', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D12-SKILL-02', domainId: 'D12', name: 'Etiket Chat Kerja & Komunikasi Cepat', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D14-SKILL-01', domainId: 'D14', name: 'Keamanan Akun & Verifikasi Dua Langkah (2FA)', targetTier: 3, weight: 3, isKeySkill: true },
      { skillId: 'D14-SKILL-02', domainId: 'D14', name: 'Deteksi Phishing & Proteksi Data UU PDP', targetTier: 3, weight: 3, isKeySkill: true },
    ],
    recommendedCases: ['case-01-sayur', 'case-08-word-sop', 'case-d12-01', 'case-d14-01'],
    plannedCases: ['case-a2', 'case-f1', 'case-f4'],
  },
  {
    id: 'staf-akuntansi',
    name: 'Staf Akuntansi / Keuangan',
    tagline: 'Pencatatan pembukuan, rekonsiliasi kas, dan analitik laporan keuangan.',
    description:
      'Bertanggung jawab atas pencatatan jurnal, buku besar, rekonsiliasi perbankan, penghitungan pajak edukatif, dan tabel analitik.',
    icon: '📊',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D6', targetTier: 5, weight: 5, keySkills: ['jurnal', 'buku besar', 'laporan keuangan', 'rekonsiliasi'] },
      { domainId: 'D1', targetTier: 5, weight: 5, keySkills: ['SUMIFS', 'pivot', 'lookup'] },
      { domainId: 'D4', targetTier: 3, weight: 3 },
      { domainId: 'D12', targetTier: 3, weight: 3 },
      { domainId: 'D14', targetTier: 3, weight: 3, keySkills: ['keamanan data keuangan'] },
      { domainId: 'D2', targetTier: 3, weight: 2 },
      { domainId: 'D11', targetTier: 3, weight: 2 },
      { domainId: 'D17', targetTier: 2, weight: 2 },
      { domainId: 'D13', targetTier: 2, weight: 1 },
    ],
    skills: [
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'SUMIFS, Pivot & Lookup Finansial', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Penagihan & Verifikasi Keuangan', targetTier: 3, weight: 3, isKeySkill: false },
      { skillId: 'D2-SKILL-01', domainId: 'D2', name: 'Format Invoice & Laporan Keuangan Word', targetTier: 3, weight: 2, isKeySkill: false },
      { skillId: 'D14-SKILL-01', domainId: 'D14', name: 'Proteksi Sandi & Keamanan Data Keuangan', targetTier: 3, weight: 3, isKeySkill: true },
    ],
    recommendedCases: ['case-01-sayur', 'case-06-koperasi', 'case-d14-01'],
    plannedCases: ['case-b1', 'case-b2', 'case-b3', 'case-a8'],
  },
  {
    id: 'staf-gudang-logistik',
    name: 'Staf Gudang dan Logistik',
    tagline: 'Pengendalian persediaan barang, opname fisik, dan manajemen pengiriman.',
    description:
      'Mengelola pencatatan arus keluar-masuk stok barang, titik pesan ulang, evaluasi vendor pemasok, dan kalkulasi ongkir.',
    icon: '📦',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D8', targetTier: 5, weight: 5, keySkills: ['stok', 'titik pesan ulang', 'pemasok', 'ongkir'] },
      { domainId: 'D1', targetTier: 4, weight: 4 },
      { domainId: 'D12', targetTier: 3, weight: 3 },
      { domainId: 'D11', targetTier: 3, weight: 3 },
      { domainId: 'D6', targetTier: 3, weight: 2, keySkills: ['persediaan'] },
      { domainId: 'D4', targetTier: 3, weight: 2 },
      { domainId: 'D2', targetTier: 3, weight: 2 },
      { domainId: 'D14', targetTier: 2, weight: 2 },
    ],
    skills: [
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Kartu Stok & Formula Saldo Excel', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D12-SKILL-02', domainId: 'D12', name: 'Koordinasi Chat Pengiriman Cepat', targetTier: 3, weight: 3, isKeySkill: true },
      { skillId: 'D12-SKILL-03', domainId: 'D12', name: 'Penanganan Komplain Keterlambatan Logistik', targetTier: 3, weight: 3, isKeySkill: true },
      { skillId: 'D14-SKILL-01', domainId: 'D14', name: 'Keamanan Kredensial Sistem Pergudangan', targetTier: 2, weight: 2, isKeySkill: false },
    ],
    recommendedCases: ['case-04-kargo', 'case-d12-01'],
    plannedCases: ['case-c1', 'case-c2', 'case-c5'],
  },
  {
    id: 'admin-sdm-hrd',
    name: 'Admin SDM / HRD',
    tagline: 'Administrasi rekrutmen, rekap absensi, slip gaji, dan hubungan industrial dasar.',
    description:
      'Mendukung operasional personalia mulai dari pemilahan CV, kalkulasi absensi dan lembur, pembuatan slip gaji, hingga penyusunan surat peringatan.',
    icon: '👥',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D10', targetTier: 5, weight: 5 },
      { domainId: 'D2', targetTier: 4, weight: 4 },
      { domainId: 'D1', targetTier: 4, weight: 4 },
      { domainId: 'D12', targetTier: 4, weight: 4 },
      { domainId: 'D17', targetTier: 3, weight: 4, keySkills: ['ketenagakerjaan dasar'] },
      { domainId: 'D14', targetTier: 3, weight: 3, keySkills: ['privasi data karyawan'] },
      { domainId: 'D11', targetTier: 3, weight: 2 },
      { domainId: 'D3', targetTier: 3, weight: 2 },
      { domainId: 'D6', targetTier: 2, weight: 2 },
    ],
    skills: [
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Rekap Absensi & Payroll Excel', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D2-SKILL-01', domainId: 'D2', name: 'Surat Peringatan & Perjanjian Kerja Word', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Undangan Wawancara & Surat Dinas', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D12-SKILL-03', domainId: 'D12', name: 'Komunikasi Asertif & Resolusi Konflik', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D14-SKILL-02', domainId: 'D14', name: 'Kepatuhan Privasi Data Karyawan (UU PDP)', targetTier: 3, weight: 3, isKeySkill: true },
    ],
    recommendedCases: ['case-08-word-sop', 'case-d12-01', 'case-d14-01'],
    plannedCases: ['case-d1', 'case-d2', 'case-d5', 'case-d6'],
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    tagline: 'Copywriting kampanye, analitik promosi digital, dan pembuatan landing page.',
    description:
      'Merancang materi promosi beretika, kalender konten media sosial, evaluasi metrik ROI iklan, dan integrasi tombol pesan interaktif.',
    icon: '📣',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D9', targetTier: 5, weight: 5 },
      { domainId: 'D16', targetTier: 4, weight: 4 },
      { domainId: 'D12', targetTier: 4, weight: 4, keySkills: ['copywriting'] },
      { domainId: 'D4', targetTier: 4, weight: 4, keySkills: ['analitik'] },
      { domainId: 'D14', targetTier: 4, weight: 3 },
      { domainId: 'D1', targetTier: 4, weight: 3 },
      { domainId: 'D3', targetTier: 3, weight: 3 },
      { domainId: 'D5', targetTier: 3, weight: 3, keySkills: ['HTML/CSS', 'landing page'] },
      { domainId: 'D17', targetTier: 3, weight: 2 },
      { domainId: 'D2', targetTier: 3, weight: 2 },
      { domainId: 'D13', targetTier: 3, weight: 2 },
    ],
    skills: [
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Copywriting Email Newsletter Beretika', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D5-SKILL-02', domainId: 'D5', name: 'Landing Page HTML & CSS Responsif', targetTier: 3, weight: 3, isKeySkill: true },
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Analisis ROI & Metrik Kampanye Excel', targetTier: 4, weight: 3, isKeySkill: false },
      { skillId: 'D14-SKILL-03', domainId: 'D14', name: 'Prompting Terstruktur & Verifikasi AI', targetTier: 4, weight: 3, isKeySkill: true },
    ],
    recommendedCases: ['case-03-web-umkm'],
    plannedCases: ['case-e1', 'case-e2', 'case-e4'],
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    tagline: 'Pelayanan pelanggan prima, penanganan komplain, dan komunikasi empati.',
    description:
      'Menjawab pertanyaan konsumen secara cepat dan ramah, melakukan de-eskalasi emosi, mencatat tiket masalah, dan menjaga reputasi perusahaan.',
    icon: '🎧',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D12', targetTier: 5, weight: 5, keySkills: ['chat bisnis', 'telepon', 'komplain', 'empati'] },
      { domainId: 'D9', targetTier: 3, weight: 4, keySkills: ['layanan pelanggan', 'CRM'] },
      { domainId: 'D14', targetTier: 3, weight: 3 },
      { domainId: 'D2', targetTier: 3, weight: 3 },
      { domainId: 'D1', targetTier: 3, weight: 3 },
      { domainId: 'D13', targetTier: 3, weight: 2 },
      { domainId: 'D17', targetTier: 2, weight: 2 },
      { domainId: 'D10', targetTier: 2, weight: 2 },
      { domainId: 'D11', targetTier: 3, weight: 2 },
    ],
    skills: [
      { skillId: 'D12-SKILL-02', domainId: 'D12', name: 'Etiket Chat Kerja & Layanan Cepat', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D12-SKILL-03', domainId: 'D12', name: 'Penanganan Komplain & De-Eskalasi Krisis', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Klarifikasi & Solusi Pelanggan', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D14-SKILL-02', domainId: 'D14', name: 'Deteksi Rekayasa Sosial & Penipuan Chat', targetTier: 3, weight: 3, isKeySkill: true },
    ],
    recommendedCases: ['case-d12-01'],
    plannedCases: ['case-a7'],
  },
  {
    id: 'sales-account-exec',
    name: 'Sales dan Account Executive',
    tagline: 'Prospek klien, negosiasi harga, pembuatan proposal, dan penutupan transaksi.',
    description:
      'Membangun relasi dengan mitra usaha, menyusun surat penawaran harga, melakukan presentasi pitch persuasif, dan menegosiasikan kontrak.',
    icon: '💼',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D9', targetTier: 5, weight: 5 },
      { domainId: 'D12', targetTier: 5, weight: 5, keySkills: ['negosiasi'] },
      { domainId: 'D3', targetTier: 4, weight: 4, keySkills: ['pitch'] },
      { domainId: 'D1', targetTier: 4, weight: 3 },
      { domainId: 'D2', targetTier: 4, weight: 3, keySkills: ['penawaran'] },
      { domainId: 'D4', targetTier: 3, weight: 3 },
      { domainId: 'D6', targetTier: 3, weight: 2, keySkills: ['margin', 'piutang'] },
      { domainId: 'D17', targetTier: 3, weight: 2 },
      { domainId: 'D14', targetTier: 3, weight: 2 },
      { domainId: 'D13', targetTier: 3, weight: 2 },
    ],
    skills: [
      { skillId: 'D12-SKILL-03', domainId: 'D12', name: 'Negosiasi Penawaran & Komunikasi Asertif', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Penawaran & Tindak Lanjut Klien', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D2-SKILL-01', domainId: 'D2', name: 'Surat Penawaran Harga Resmi Word', targetTier: 4, weight: 3, isKeySkill: true },
      { skillId: 'D14-SKILL-01', domainId: 'D14', name: 'Proteksi Akun CRM & Kredensial Klien', targetTier: 3, weight: 2, isKeySkill: true },
    ],
    recommendedCases: ['case-05-resto', 'case-d12-01'],
    plannedCases: ['case-f2', 'case-a4'],
  },
  {
    id: 'analis-data-junior',
    name: 'Analis Data Junior',
    tagline: 'Pembersihan data mentah, pemodelan tabel analitik, dan visualisasi temuan.',
    description:
      'Mengolah set data yang berantakan, melakukan uji korelasi, mendeteksi anomali data, dan menyajikan ringkasan eksekutif berbasis angka terpercaya.',
    icon: '📈',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D4', targetTier: 5, weight: 5 },
      { domainId: 'D1', targetTier: 5, weight: 5 },
      { domainId: 'D3', targetTier: 4, weight: 3 },
      { domainId: 'D2', targetTier: 4, weight: 3 },
      { domainId: 'D12', targetTier: 4, weight: 3 },
      { domainId: 'D14', targetTier: 4, weight: 3, keySkills: ['etika data', 'privasi'] },
      { domainId: 'D5', targetTier: 3, weight: 2 },
      { domainId: 'D11', targetTier: 3, weight: 2 },
      { domainId: 'D13', targetTier: 3, weight: 2 },
      { domainId: 'D17', targetTier: 2, weight: 1 },
    ],
    skills: [
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Pembersihan Data & Lookup Lanjutan Excel', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D5-SKILL-01', domainId: 'D5', name: 'Pemrosesan Array & Logika JavaScript', targetTier: 3, weight: 2, isKeySkill: false },
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Narasi Temuan Data Eksekutif', targetTier: 4, weight: 3, isKeySkill: false },
      { skillId: 'D14-SKILL-02', domainId: 'D14', name: 'Etika Privasi Data Pelanggan & UU PDP', targetTier: 4, weight: 3, isKeySkill: true },
      { skillId: 'D14-SKILL-03', domainId: 'D14', name: 'Deteksi Halusinasi Data & Verifikasi Fakta AI', targetTier: 4, weight: 3, isKeySkill: true },
    ],
    recommendedCases: ['case-01-sayur', 'case-02-klinik', 'case-d14-01'],
    plannedCases: ['case-a6', 'case-i4'],
  },
  {
    id: 'web-dev-junior',
    name: 'Web Developer Junior',
    tagline: 'Pembangunan antarmuka web, styling responsif, dan logika JavaScript.',
    description:
      'Mengembangkan website yang ramah perangkat mobile, menulis logika algoritma bersih, menjaga aksesibilitas kode, dan membaca dokumentasi teknis.',
    icon: '💻',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D5', targetTier: 5, weight: 5 },
      { domainId: 'D14', targetTier: 4, weight: 4, keySkills: ['keamanan web'] },
      { domainId: 'D11', targetTier: 4, weight: 3, keySkills: ['Git', 'Kanban'] },
      { domainId: 'D13', targetTier: 4, weight: 3, keySkills: ['membaca dokumentasi'] },
      { domainId: 'D16', targetTier: 3, weight: 3 },
      { domainId: 'D12', targetTier: 3, weight: 3 },
      { domainId: 'D4', targetTier: 3, weight: 2, keySkills: ['SQL', 'JSON'] },
      { domainId: 'D2', targetTier: 3, weight: 1 },
      { domainId: 'D17', targetTier: 2, weight: 1, keySkills: ['lisensi'] },
    ],
    skills: [
      { skillId: 'D5-SKILL-01', domainId: 'D5', name: 'JavaScript Algoritma & DOM Interaktif', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D5-SKILL-02', domainId: 'D5', name: 'HTML5 Semantik & CSS Layout Responsif', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D12-SKILL-02', domainId: 'D12', name: 'Komunikasi Teknis & Notulen Sprint', targetTier: 3, weight: 3, isKeySkill: false },
      { skillId: 'D14-SKILL-01', domainId: 'D14', name: 'Keamanan Akun Kredensial & Autentikasi 2FA', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D14-SKILL-02', domainId: 'D14', name: 'Pertahanan Rekayasa Sosial & Privasi Data', targetTier: 4, weight: 4, isKeySkill: true },
    ],
    recommendedCases: ['case-03-web-umkm', 'case-10-web-portal', 'case-d14-01'],
    plannedCases: ['case-g1', 'case-g4', 'case-g9'],
  },
  {
    id: 'koordinator-proyek',
    name: 'Koordinator Proyek',
    tagline: 'Perencanaan tenggat, monitoring milestone, dan fasilitasi komunikasi tim.',
    description:
      'Menjaga agar proyek selesai tepat waktu dan sesuai anggaran, mengidentifikasi hambatan antar divisi, dan memitigasi risiko operasional.',
    icon: '⏱️',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D11', targetTier: 5, weight: 5 },
      { domainId: 'D12', targetTier: 5, weight: 5 },
      { domainId: 'D3', targetTier: 4, weight: 4 },
      { domainId: 'D1', targetTier: 4, weight: 4 },
      { domainId: 'D2', targetTier: 4, weight: 3 },
      { domainId: 'D10', targetTier: 4, weight: 3 },
      { domainId: 'D6', targetTier: 3, weight: 3, keySkills: ['anggaran proyek'] },
      { domainId: 'D17', targetTier: 3, weight: 2 },
      { domainId: 'D14', targetTier: 3, weight: 2 },
      { domainId: 'D8', targetTier: 3, weight: 2 },
      { domainId: 'D13', targetTier: 3, weight: 2 },
    ],
    skills: [
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Update Status & Tindak Lanjut Proyek', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D12-SKILL-02', domainId: 'D12', name: 'Etiket Komunikasi Cepat & Eskalasi Masalah', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Monitoring Budget & Milestone Excel', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D2-SKILL-01', domainId: 'D2', name: 'Penyusunan Notulen Rapat & SOP Word', targetTier: 4, weight: 3, isKeySkill: true },
      { skillId: 'D14-SKILL-01', domainId: 'D14', name: 'Hak Akses Kolaborasi & Protokol Backup 3-2-1', targetTier: 3, weight: 2, isKeySkill: true },
    ],
    recommendedCases: ['case-09-word-proposal', 'case-d12-01'],
    plannedCases: ['case-f14', 'case-f5', 'case-f9'],
  },
  {
    id: 'pemilik-umkm',
    name: 'Pemilik UMKM / Wirausaha',
    tagline: 'Pengelolaan bisnis mandiri dari modal, operasional, hingga pemasaran.',
    description:
      'Mengendalikan arus kas usaha, menetapkan harga jual dan HPP, mempromosikan produk, mengelola stok, dan menjalin hubungan baik dengan pelanggan.',
    icon: '🏪',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D7', targetTier: 5, weight: 5 },
      { domainId: 'D9', targetTier: 4, weight: 5 },
      { domainId: 'D6', targetTier: 4, weight: 5, keySkills: ['pembukuan sederhana', 'HPP', 'laba rugi'] },
      { domainId: 'D8', targetTier: 4, weight: 4 },
      { domainId: 'D1', targetTier: 4, weight: 4 },
      { domainId: 'D12', targetTier: 4, weight: 3 },
      { domainId: 'D17', targetTier: 3, weight: 3, keySkills: ['perizinan', 'merek', 'perlindungan konsumen'] },
      { domainId: 'D14', targetTier: 3, weight: 3 },
      { domainId: 'D3', targetTier: 3, weight: 3 },
      { domainId: 'D2', targetTier: 3, weight: 3 },
      { domainId: 'D10', targetTier: 3, weight: 3 },
      { domainId: 'D16', targetTier: 3, weight: 3 },
      { domainId: 'D11', targetTier: 3, weight: 2 },
      { domainId: 'D5', targetTier: 2, weight: 1 },
      { domainId: 'D13', targetTier: 2, weight: 1 },
    ],
    skills: [
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Buku Kas & Kalkulasi HPP Excel', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D12-SKILL-02', domainId: 'D12', name: 'Chat Pelayanan Pembeli WhatsApp Cepat', targetTier: 4, weight: 3, isKeySkill: true },
      { skillId: 'D12-SKILL-03', domainId: 'D12', name: 'Negosiasi Harga Pemasok & Solusi Pelanggan', targetTier: 4, weight: 3, isKeySkill: true },
      { skillId: 'D7-SKILL-01', domainId: 'D7', name: 'Anggaran Bisnis, Arus Kas & Dana Darurat', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D7-SKILL-02', domainId: 'D7', name: 'Business Model Canvas & Penetapan Harga HPP', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D14-SKILL-01', domainId: 'D14', name: 'Keamanan Akun Perbankan & Toko Online 2FA', targetTier: 3, weight: 3, isKeySkill: true },
    ],
    recommendedCases: ['case-01-sayur', 'case-03-web-umkm', 'case-d12-01', 'case-d7-01'],
    plannedCases: ['case-a1', 'case-b2', 'case-b3', 'case-c7'],
  },
  {
    id: 'supervisor-asisten-manajer',
    name: 'Supervisor / Asisten Manajer',
    tagline: 'Kepemimpinan tim operasional, pendelegasian tugas, dan evaluasi capaian.',
    description:
      'Menjembatani arahan manajemen puncak dengan staf pelaksana, mengawasi produktivitas kerja, membimbing staf junior, dan menyusun laporan evaluasi.',
    icon: '🎯',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D10', targetTier: 5, weight: 5 },
      { domainId: 'D12', targetTier: 5, weight: 5 },
      { domainId: 'D11', targetTier: 5, weight: 4 },
      { domainId: 'D1', targetTier: 4, weight: 4 },
      { domainId: 'D3', targetTier: 4, weight: 4 },
      { domainId: 'D2', targetTier: 4, weight: 3 },
      { domainId: 'D6', targetTier: 4, weight: 3 },
      { domainId: 'D4', targetTier: 4, weight: 3 },
      { domainId: 'D14', targetTier: 3, weight: 3 },
      { domainId: 'D17', targetTier: 3, weight: 3 },
      { domainId: 'D8', targetTier: 3, weight: 2 },
      { domainId: 'D9', targetTier: 3, weight: 2 },
      { domainId: 'D13', targetTier: 3, weight: 2 },
    ],
    skills: [
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Pengarahan & Delegasi Tugas Formal', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D12-SKILL-03', domainId: 'D12', name: 'Umpan Balik Kinerja & Mediasi Konflik', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Rekap Kinerja Tim & Laporan KPI Excel', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D14-SKILL-02', domainId: 'D14', name: 'Pengawasan Privasi Data Tim & UU PDP', targetTier: 3, weight: 3, isKeySkill: true },
    ],
    recommendedCases: ['case-07-hotel', 'case-08-word-sop', 'case-d12-01'],
    plannedCases: ['case-d4', 'case-b6'],
  },
  {
    id: 'mahasiswa-tingkat-akhir',
    name: 'Mahasiswa Tingkat Akhir',
    tagline: 'Penulisan karya ilmiah, sitasi akademik terstandar, dan analisis data skripsi.',
    description:
      'Menyiapkan proposal riset, mengolah kuesioner dan data statistik di lembar kerja, menyusun daftar pustaka berstandar APA 7, dan latihan presentasi sidang.',
    icon: '🎓',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D15', targetTier: 5, weight: 5, keySkills: ['skripsi', 'metodologi', 'sitasi', 'plagiarisme'] },
      { domainId: 'D2', targetTier: 5, weight: 5 },
      { domainId: 'D4', targetTier: 4, weight: 4, keySkills: ['statistik', 'analisis'] },
      { domainId: 'D1', targetTier: 4, weight: 4 },
      { domainId: 'D3', targetTier: 4, weight: 4, keySkills: ['presentasi sidang'] },
      { domainId: 'D14', targetTier: 4, weight: 4, keySkills: ['integritas akademik', 'penggunaan AI'] },
      { domainId: 'D12', targetTier: 4, weight: 3 },
      { domainId: 'D11', targetTier: 4, weight: 3 },
      { domainId: 'D13', targetTier: 3, weight: 3 },
      { domainId: 'D17', targetTier: 2, weight: 1 },
    ],
    skills: [
      { skillId: 'D2-SKILL-01', domainId: 'D2', name: 'Format Dokumen Akademik & Sitasi Word', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Olah Data Statistik & Grafik Excel', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Etiket Komunikasi Dosen Pembimbing', targetTier: 4, weight: 3, isKeySkill: true },
      { skillId: 'D15-SKILL-03', domainId: 'D15', name: 'Metodologi Penelitian, Sitasi APA 7 & Anti-Plagiarisme', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D14-SKILL-03', domainId: 'D14', name: 'Prompting Terstruktur & Integritas Akademik AI', targetTier: 4, weight: 4, isKeySkill: true },
    ],
    recommendedCases: ['case-08-word-sop', 'case-09-word-proposal', 'case-d15-01'],
    plannedCases: ['case-h1', 'case-h2', 'case-h4', 'case-h7'],
  },
  {
    id: 'pencari-kerja-freshgrad',
    name: 'Pencari Kerja / Fresh Graduate',
    tagline: 'Penyusunan CV berstandar, simulasi wawancara kerja, dan etiket profesional.',
    description:
      'Menyusun berkas lamaran kerja profesional, mengenali lowongan bodong, mempersiapkan jawaban wawancara kerja, dan memahami hak dasar kontrak kerja.',
    icon: '🌱',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D15', targetTier: 5, weight: 5, keySkills: ['CV', 'wawancara', 'mengenali lowongan palsu'] },
      { domainId: 'D12', targetTier: 4, weight: 5 },
      { domainId: 'D2', targetTier: 4, weight: 4 },
      { domainId: 'D1', targetTier: 4, weight: 4 },
      { domainId: 'D13', targetTier: 3, weight: 4 },
      { domainId: 'D3', targetTier: 3, weight: 3 },
      { domainId: 'D14', targetTier: 3, weight: 3 },
      { domainId: 'D7', targetTier: 3, weight: 3 },
      { domainId: 'D11', targetTier: 3, weight: 3 },
      { domainId: 'D10', targetTier: 2, weight: 2 },
      { domainId: 'D17', targetTier: 2, weight: 2, keySkills: ['kontrak kerja dasar'] },
    ],
    skills: [
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Lamaran Kerja & Cover Letter Formal', targetTier: 4, weight: 5, isKeySkill: true },
      { skillId: 'D2-SKILL-01', domainId: 'D2', name: 'Pembuatan CV Bersih & Rapi Word', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Dasar Lembar Kerja untuk Tes Kerja Excel', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D15-SKILL-01', domainId: 'D15', name: 'Penyusunan CV Ramah ATS & Deteksi Lowongan Bodong', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D15-SKILL-02', domainId: 'D15', name: 'Simulasi Wawancara STAR & Diplomasi Gaji', targetTier: 5, weight: 5, isKeySkill: true },
      { skillId: 'D7-SKILL-01', domainId: 'D7', name: 'Alokasi Gaji 50/30/20 & Dana Darurat Awal Karier', targetTier: 3, weight: 3, isKeySkill: true },
      { skillId: 'D14-SKILL-01', domainId: 'D14', name: 'Keamanan Akun Email Karier & Sandi 2FA', targetTier: 3, weight: 3, isKeySkill: true },
    ],
    recommendedCases: ['case-08-word-sop', 'case-d12-01', 'case-d15-01', 'case-d7-01'],
    plannedCases: ['case-f1', 'case-d5'],
  },
  {
    id: 'event-organizer',
    name: 'Event Organizer & Acara',
    tagline: 'Penyusunan RAB acara, manajemen vendor, rundown, dan komunikasi sponsor.',
    description:
      'Merancang rencana anggaran biaya acara, koordinasi jadwal vendor perlengkapan, pembuatan proposal sponsor, dan komunikasi cepat selama acara.',
    icon: '🎪',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D11', targetTier: 5, weight: 5 },
      { domainId: 'D12', targetTier: 5, weight: 4 },
      { domainId: 'D9', targetTier: 4, weight: 4 },
      { domainId: 'D6', targetTier: 4, weight: 4, keySkills: ['RAB', 'anggaran'] },
      { domainId: 'D1', targetTier: 4, weight: 4 },
      { domainId: 'D8', targetTier: 4, weight: 3, keySkills: ['vendor', 'logistik'] },
      { domainId: 'D2', targetTier: 4, weight: 3, keySkills: ['proposal', 'rundown'] },
      { domainId: 'D3', targetTier: 4, weight: 3 },
      { domainId: 'D16', targetTier: 3, weight: 3 },
      { domainId: 'D17', targetTier: 3, weight: 3, keySkills: ['kontrak vendor', 'perizinan kegiatan'] },
      { domainId: 'D10', targetTier: 3, weight: 3 },
      { domainId: 'D14', targetTier: 3, weight: 2 },
    ],
    skills: [
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Penyusunan RAB & Realisasi Biaya Excel', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D12-SKILL-01', domainId: 'D12', name: 'Email Penawaran Sponsor & Rundown Acara', targetTier: 5, weight: 4, isKeySkill: true },
      { skillId: 'D12-SKILL-02', domainId: 'D12', name: 'Koordinasi Lapangan Cepat via Chat', targetTier: 5, weight: 4, isKeySkill: true },
      { skillId: 'D14-SKILL-02', domainId: 'D14', name: 'Proteksi Data Peserta Event (UU PDP)', targetTier: 3, weight: 2, isKeySkill: true },
    ],
    recommendedCases: ['case-09-word-proposal', 'case-d12-01'],
    plannedCases: ['case-f9', 'case-h5'],
  },
  {
    id: 'admin-toko-online',
    name: 'Admin Toko Online & Marketplace',
    tagline: 'Listing produk marketplace, respon chat pembeli, dan rekap pesanan harian.',
    description:
      'Mengelola etalase produk toko daring, melayani pertanyaan calon pembeli, menghitung ongkos kirim antardaerah, dan mencegah tindak penipuan online.',
    icon: '🛒',
    reviewStatus: 'draf',
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
    domainRequirements: [
      { domainId: 'D9', targetTier: 4, weight: 5, keySkills: ['listing', 'layanan'] },
      { domainId: 'D8', targetTier: 4, weight: 5, keySkills: ['stok', 'ongkir'] },
      { domainId: 'D1', targetTier: 4, weight: 5 },
      { domainId: 'D12', targetTier: 4, weight: 4 },
      { domainId: 'D14', targetTier: 4, weight: 4, keySkills: ['penipuan', 'keamanan akun'] },
      { domainId: 'D6', targetTier: 3, weight: 3 },
      { domainId: 'D16', targetTier: 3, weight: 3, keySkills: ['foto', 'banner'] },
      { domainId: 'D17', targetTier: 3, weight: 3, keySkills: ['perlindungan konsumen', 'merek'] },
      { domainId: 'D4', targetTier: 3, weight: 3 },
      { domainId: 'D2', targetTier: 3, weight: 2 },
      { domainId: 'D5', targetTier: 2, weight: 2 },
      { domainId: 'D7', targetTier: 2, weight: 1 },
    ],
    skills: [
      { skillId: 'D1-SKILL-01', domainId: 'D1', name: 'Rekap Transaksi Harian & Laba Bersih Excel', targetTier: 4, weight: 5, isKeySkill: true },
      { skillId: 'D12-SKILL-02', domainId: 'D12', name: 'Respon Chat Pembeli Ramah & Menutup Penjualan', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D12-SKILL-03', domainId: 'D12', name: 'Penanganan Retur & Komplain Barang Rusak', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D14-SKILL-01', domainId: 'D14', name: 'Keamanan Akun Toko Marketplace & OTP 2FA', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D14-SKILL-02', domainId: 'D14', name: 'Deteksi Penipuan Bukti Bayar & Phishing', targetTier: 4, weight: 4, isKeySkill: true },
      { skillId: 'D7-SKILL-02', domainId: 'D7', name: 'Penetapan Harga Produk UMKM & Margin Usaha', targetTier: 2, weight: 1, isKeySkill: true },
    ],
    recommendedCases: ['case-01-sayur', 'case-03-web-umkm', 'case-d12-01', 'case-d14-01', 'case-d7-01'],
    plannedCases: ['case-a1', 'case-a6', 'case-c5'],
  },
];

/**
 * Dynamic Job Readiness Calculator (F1 & Bagian B)
 * Dihitung langsung dari role.domainRequirements (domainId, weight, targetTier), BUKAN dari role.skills.
 *
 * Formula:
 * - bobotTersedia: persentase bobot domain yang berstatus 'aktif' terhadap total bobot peran (dibulatkan).
 * - bobotBelumTersedia: 100 - bobotTersedia (dalam persen).
 * - kesiapanTotal: Σ(weight × min(masteryDomain / targetDomain, 1)) / Σ(semua weight)
 *   Domain yang belum tersedia dihitung 0, sehingga nilai maksimum kesiapanTotal = bobotTersedia.
 * - kesiapanBagianTersedia: skor yang sama dihitung HANYA atas domain aktif (0 - 100).
 */
export function calculateRoleReadiness(
  role: Role,
  userMastery: Record<string, number> = {},
  activeDomainOrSkillIds?: Set<string>
): RoleReadinessResult {
  const reqs = role.domainRequirements;
  const totalWeight = reqs.reduce((sum, r) => sum + r.weight, 0);

  // Tentukan apakah sebuah domain aktif:
  const isDomainActive = (domainId: string): boolean => {
    if (activeDomainOrSkillIds && activeDomainOrSkillIds.has(domainId)) return true;
    const cat = DOMAIN_CATALOG[domainId as DomainId];
    return cat ? cat.status === 'aktif' : false;
  };

  let availableWeight = 0;
  let totalWeightedScore = 0;
  let activeWeightedScore = 0;

  const gaps: RoleReadinessResult['gaps'] = [];

  for (const req of reqs) {
    const active = isDomainActive(req.domainId);
    if (active) {
      availableWeight += req.weight;
    }

    // targetScore berdasarkan targetTier (Tier 1-7: Tier 1 = 14, Tier 4 = 57, Tier 7 = 100)
    const targetScore = Math.min(100, Math.round((req.targetTier / 7) * 100)) || 100;

    // Periksa user mastery domain
    let domainScore = 0;
    if (active) {
      if (typeof userMastery[req.domainId] === 'number') {
        domainScore = userMastery[req.domainId];
      } else {
        const matchingSkills = Object.keys(userMastery).filter((k) => k.startsWith(`${req.domainId}-`));
        if (matchingSkills.length > 0) {
          const sum = matchingSkills.reduce((acc, k) => acc + (userMastery[k] || 0), 0);
          domainScore = Math.round(sum / matchingSkills.length);
        }
      }
    }

    const ratio = active && targetScore > 0 ? Math.min(1, domainScore / targetScore) : 0;
    const contribution = req.weight * ratio;

    totalWeightedScore += contribution;
    if (active) {
      activeWeightedScore += contribution;
    }

    const gap = Math.max(0, targetScore - domainScore);
    if (gap > 0 && active) {
      gaps.push({
        skillId: `${req.domainId}-SKILL-01`,
        skillName: `${req.domainId} Keterampilan Utama`,
        domainId: req.domainId,
        targetTier: req.targetTier,
        currentMastery: domainScore,
        weight: req.weight,
        gap,
        priorityScore: req.weight * gap,
        recommendedLessons: [],
      });
    }
  }

  gaps.sort((a, b) => b.priorityScore - a.priorityScore);

  const bobotTersedia = totalWeight > 0 ? Math.round((availableWeight / totalWeight) * 100) : 0;
  const bobotBelumTersedia = 100 - bobotTersedia;

  const kesiapanTotal = totalWeight > 0 ? Math.round((totalWeightedScore / totalWeight) * 100) : 0;
  const kesiapanBagianTersedia = availableWeight > 0 ? Math.round((activeWeightedScore / availableWeight) * 100) : 0;

  const allSkills = role.skills || [];
  const availableSkills = allSkills.filter((s) => isDomainActive(s.domainId));

  return {
    roleId: role.id,
    roleName: role.name,
    readinessPercent: kesiapanTotal,
    kesiapanTotal,
    kesiapanBagianTersedia,
    bobotTersedia,
    bobotBelumTersedia,
    availableSkillsCount: availableSkills.length,
    totalSkillsCount: allSkills.length,
    unavailableSkillsPercent: bobotBelumTersedia,
    gaps: gaps.slice(0, 5),
    disclaimer: MANDATORY_ROLE_DISCLAIMER,
  };
}
