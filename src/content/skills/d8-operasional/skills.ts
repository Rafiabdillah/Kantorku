/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D8: Operasional & Rantai Pasok - Skills Definitions
 */

import { Skill } from '../../../types/skills';
import { ROLES } from '../../roles';
import { computeSkillRoleRelevance } from '../../roleRelevanceHelper';

export const D8_SKILLS: Skill[] = [
  {
    id: 'D8-SKILL-01',
    domain: 'D8',
    name: 'Pengendalian Persediaan, Model EOQ & Penentuan Titik Pesan Ulang (ROP)',
    description:
      'Kalkulasi kuantitas pesanan ekonomis (Economic Order Quantity), penentuan stok pengaman (safety stock), dan penetapan Reorder Point untuk mencegah kehabisan stok (stockout).',
    prerequisites: [],
    canDo: {
      1: 'Menghitung rata-rata permintaan harian barang berdasarkan data riwayat konsumsi.',
      2: 'Menghitung Kuantitas Pesanan Ekonomis (EOQ) yang meminimalkan total biaya simpan dan pesan.',
      3: 'Menentukan besaran stok pengaman (Safety Stock) menghadapi variabilitas lead time pengiriman.',
      4: 'Menghitung Titik Pesan Ulang (Reorder Point / ROP) untuk pemicu otomatis pembelian barang.',
      5: 'Melakukan analisis persediaan ABC berdasarkan nilai investasi dan tingkat perputaran barang.',
      6: 'Menganalisis dampak pemotongan harga (kuantitas diskon) terhadap total biaya persediaan.',
      7: 'Merancang kebijakan manajemen persediaan terintegrasi (Just-in-Time & Buffer Stock).',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D8-LES-01', 'D8-LES-02'],
    linkedLevels: ['D8-LEVEL-01', 'D8-LEVEL-03', 'D8-LEVEL-04'],
    linkedCases: ['case-d8-01'],
    roleRelevance: computeSkillRoleRelevance('D8-SKILL-01', 'D8', ROLES),
    depth: 'menengah',
    estimatedHours: 12,
    sources: [
      'Heizer, J., Render, B., & Munson, C. (2020). Operations Management: Sustainability and Supply Chain Management (Pearson, 13th ed.)',
      'Chopra, S., & Meindl, P. (2016). Supply Chain Management: Strategy, Planning, and Operation (Pearson, 6th ed.)',
    ],
    lastReviewed: '2026-10-31',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D8-SKILL-02',
    domain: 'D8',
    name: 'Manajemen Pemasok (Vendor Evaluation), Negosiasi Lead Time & Kualitas',
    description:
      'Penilaian kinerja vendor menggunakan metode pembobotan (weighted score), perjanjian tingkat layanan (SLA), negosiasi tenggat kirim, dan audit kualitas pasokan.',
    prerequisites: ['D8-SKILL-01'],
    canDo: {
      1: 'Menyusun kriteria seleksi vendor (kualitas, ketepatan waktu pengiriman, harga, dan stabilitas finansial).',
      2: 'Menghitung skor evaluasi pemasok menggunakan matriks pembobotan objektif.',
      3: 'Merumuskan Service Level Agreement (SLA) pengiriman dan garansi pergantian barang cacat.',
      4: 'Melakukan negosiasi pemendekan lead time pengiriman dengan vendor utama.',
      5: 'Menangani perselisihan ketidaksesuaian spesifikasi barang datang (retur dan nota kredit).',
      6: 'Membangun program kemitraan pemasok strategis (Vendor Managed Inventory / VMI).',
      7: 'Merancang arsitektur tata kelola rantai pasok multi-sumber untuk mitigasi risiko disrupsi.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D8-LES-03'],
    linkedLevels: ['D8-LEVEL-01', 'D8-LEVEL-02'],
    linkedCases: ['case-d8-01'],
    roleRelevance: computeSkillRoleRelevance('D8-SKILL-02', 'D8', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Chopra, S., & Meindl, P. (2016). Supply Chain Management: Strategy, Planning, and Operation (Pearson, 6th ed.)',
      'SNI ISO 9001:2015 Sistem Manajemen Mutu (Klausul 8.4 Pengendalian Proses, Produk, dan Jasa yang Disediakan Eksternal)',
    ],
    lastReviewed: '2026-10-31',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D8-SKILL-03',
    domain: 'D8',
    name: 'Prosedur Operasional Standar (SOP) Pergudangan & Keselamatan Kerja (K3)',
    description:
      'Penerimaan barang (inbound), tata letak gudang (layouting), stock opname berkala, penanganan material (material handling), dan standar K3 lingkungan pergudangan.',
    prerequisites: ['D8-SKILL-01'],
    canDo: {
      1: 'Memeriksa surat jalan dan surat pesanan (PO) saat proses inbound barang masuk gudang.',
      2: 'Menerapkan sistem pelabelan barang FIFO (First In, First Out) dan FEFO (First Expired, First Out).',
      3: 'Menyusun prosedur pencatatan kartu stok digital untuk meminimalkan selisih fisik barang.',
      4: 'Melaksanakan tahapan stock opname berkala dan pelacakan akar penyebab selisih persediaan.',
      5: 'Menerapkan protokol Keselamatan dan Kesehatan Kerja (K3) pada area penyimpanan dan pengangkatan barang.',
      6: 'Mengidentifikasi bahaya operasional gudang dan menyusun jalur evakuasi darurat.',
      7: 'Merancang tata letak gudang (warehouse layout) berstandar efisiensi pergerakan dan ergonomi kerja.',
    },
    practiceModes: ['K'],
    linkedLessons: ['D8-LES-03'],
    linkedLevels: ['D8-LEVEL-01'],
    linkedCases: ['case-d8-01'],
    roleRelevance: computeSkillRoleRelevance('D8-SKILL-03', 'D8', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Heizer, J., Render, B., & Munson, C. (2020). Operations Management: Sustainability and Supply Chain Management (Pearson, 13th ed.)',
      'UU No. 1 Tahun 1970 tentang Keselamatan Kerja (Standar K3 Lingkungan Kerja & Pergudangan)',
    ],
    lastReviewed: '2026-10-31',
    requires: ['advanced-quiz-engine'],
  },
];
