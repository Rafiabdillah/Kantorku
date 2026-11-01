/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D6: Akuntansi & Keuangan Usaha - Skills Definitions
 */

import { Skill } from '../../../types/skills';
import { ROLES } from '../../roles';
import { computeSkillRoleRelevance } from '../../roleRelevanceHelper';

export const D6_SKILLS: Skill[] = [
  {
    id: 'D6-SKILL-01',
    domain: 'D6',
    name: 'Pencatatan Jurnal Umum & Persamaan Dasar Akuntansi',
    description:
      'Logika debit-kredit berbasis persamaan dasar Aset = Liabilitas + Ekuitas, bagan akun (Chart of Accounts), dan analisis bukti transaksi faktur/kuitansi.',
    prerequisites: [],
    canDo: {
      1: 'Membedakan klasifikasi akun utama (Aset, Kewajiban, Ekuitas, Pendapatan, dan Beban).',
      2: 'Menerapkan kaidah debit-kredit yang seimbang untuk setiap transaksi penerimaan dan pengeluaran kas.',
      3: 'Menyusun jurnal umum 2 kolom berurutan kronologis berdasarkan bukti faktur atau nota belanja.',
      4: 'Mengidentifikasi kode akun standar (Chart of Accounts / COA) untuk entri transaksi operasional.',
      5: 'Menghitung dampak penyesuaian transaksi akrual dan beban dibayar di muka.',
      6: 'Melakukan koreksi entri jurnal yang salah tanpa menghapus jejak audit pembukuan.',
      7: 'Merancang sistem kodefikasi akun dan prosedur standar pencatatan transaksi seluruh perusahaan.',
    },
    practiceModes: ['K'],
    linkedLessons: ['D6-LES-01'],
    linkedLevels: ['D6-LEVEL-01'],
    linkedCases: ['case-d6-01'],
    roleRelevance: computeSkillRoleRelevance('D6-SKILL-01', 'D6', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Ikatan Akuntan Indonesia (IAI): Standar Akuntansi Keuangan Entitas Mikro, Kecil, dan Menengah (SAK EMKM, 2016)',
      'Weygandt, J. J., Kimmel, P. D., & Kieso, D. E. (2018). Accounting Principles (John Wiley & Sons, 13th ed.)',
    ],
    lastReviewed: '2026-10-29',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D6-SKILL-02',
    domain: 'D6',
    name: 'Buku Besar, Neraca Saldo & Rekonsiliasi Bank',
    description:
      'Posting jurnal ke buku besar 4 kolom, penutupan saldo akun, penyusunan neraca saldo, dan pencocokan saldo kas buku perusahaan terhadap rekening koran bank.',
    prerequisites: ['D6-SKILL-01'],
    canDo: {
      1: 'Memindahkan (posting) saldo ayat jurnal umum ke masing-masing buku besar akun terkait.',
      2: 'Menghitung saldo akhir berjalan akun buku besar bentuk 4 kolom dengan akurat.',
      3: 'Menyusun neraca saldo (Trial Balance) belum disesuaikan dan memeriksa keseimbangan total debit dan kredit.',
      4: 'Mengidentifikasi pos rekonsiliasi bank (setoran dalam perjalanan, cek beredar, biaya administrasi, dan pendapatan jasa giro).',
      5: 'Menghitung saldo kas yang benar (adjusted cash balance) dan menyusun ayat jurnal penyesuaian rekonsiliasi.',
      6: 'Melakukan penelusuran selisih pencatatan mutasi kas bank secara sistematis.',
      7: 'Membangun prosedur pengendalian internal pengelolaan kas dan rekening bank perusahaan.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D6-LES-02'],
    linkedLevels: ['D6-LEVEL-02', 'D6-LEVEL-04'],
    linkedCases: ['case-d6-01'],
    roleRelevance: computeSkillRoleRelevance('D6-SKILL-02', 'D6', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Ikatan Akuntan Indonesia (IAI): Standar Akuntansi Keuangan Entitas Tanpa Akuntabilitas Publik (SAK ETAP / SAK Entitas Privat, 2021)',
      'Weygandt, J. J., Kimmel, P. D., & Kieso, D. E. (2018). Accounting Principles: Chapter 8 Fraud, Internal Control, and Cash (John Wiley & Sons)',
    ],
    lastReviewed: '2026-10-29',
    requires: ['advanced-quiz-engine', 'simulation-engine'],
  },
  {
    id: 'D6-SKILL-03',
    domain: 'D6',
    name: 'Laporan Keuangan Dasar & Perhitungan Laba Rugi/HPP',
    description:
      'Perhitungan Harga Pokok Penjualan (HPP) perusahaan dagang/jasa, penyusunan laporan laba rugi, laporan posisi keuangan (neraca), dan laporan arus kas sederhana berstandar SAK EMKM.',
    prerequisites: ['D6-SKILL-01'],
    canDo: {
      1: 'Menghitung Harga Pokok Penjualan (Persediaan Awal + Pembelian Bersih - Persediaan Akhir).',
      2: 'Menyusun Laporan Laba Rugi berjenjang (Pendapatan Usaha - HPP = Laba Kotor - Beban Operasional = Laba Bersih).',
      3: 'Menyusun Laporan Posisi Keuangan (Neraca) yang mengelompokkan aset lancar, aset tetap, liabilitas, dan modal.',
      4: 'Menghitung margin laba kotor (Gross Profit Margin) dan margin laba bersih untuk evaluasi kesehatan bisnis.',
      5: 'Membedakan arus kas masuk dari aktivitas operasional, investasi, dan pendanaan.',
      6: 'Menyusun catatan atas laporan keuangan sederhana untuk pelaporan pajak UMKM (PPh Final 0,5% PP 55/2022).',
      7: 'Menganalisis rasio likuiditas dan solvabilitas perusahaan untuk kelayakan pengajuan kredit usaha perbankan.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D6-LES-03'],
    linkedLevels: ['D6-LEVEL-03'],
    linkedCases: ['case-d6-01'],
    roleRelevance: computeSkillRoleRelevance('D6-SKILL-03', 'D6', ROLES),
    depth: 'menengah',
    estimatedHours: 12,
    sources: [
      'Ikatan Akuntan Indonesia (IAI): Standar Akuntansi Keuangan Entitas Mikro, Kecil, dan Menengah (SAK EMKM Bab 3 Laporan Keuangan, 2016)',
      'Undang-Undang Republik Indonesia No. 7 Tahun 2021 tentang Harmonisasi Peraturan Perpajakan (UU HPP, Pemerintah RI, 2021)',
    ],
    lastReviewed: '2026-10-29',
    requires: ['advanced-quiz-engine', 'simulation-engine'],
  },
];
