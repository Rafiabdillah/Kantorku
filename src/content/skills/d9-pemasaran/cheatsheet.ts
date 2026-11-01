/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D9: Pemasaran & Penjualan - Cheatsheet
 */

export interface CheatsheetItem {
  id: string;
  title: string;
  category: string;
  points: string[];
}

export const D9_CHEATSHEET: CheatsheetItem[] = [
  {
    id: 'd9-cs-formula-metrik',
    title: 'Formula Kunci Metrik Finansial Pemasaran',
    category: 'Metrik & Efisiensi',
    points: [
      'CAC = Total Biaya Pemasaran / Jumlah Pelanggan Baru Terakuisisi',
      'ROAS = Pendapatan dari Iklan / Belanja Iklan Berbayar (Target > 3x)',
      'ROI Kampanye = ((Total Pendapatan - Total Biaya) / Total Biaya) * 100%',
      'LTV = Rata-rata Nilai Transaksi * Frekuensi Belanja Tahunan * Lama Retensi',
      'Rasio Sehat Unit Ekonomi: LTV / CAC minimal 3:1 (Ideal 4:1 hingga 5:1)',
      'Conversion Rate = (Jumlah Transaksi Berhasil / Total Kunjungan) * 100%',
    ],
  },
  {
    id: 'd9-cs-copywriting-etika',
    title: 'Checklist Copywriting AIDA & Kepatuhan Etika Iklan',
    category: 'Copywriting & Legal',
    points: [
      'Attention: Hook 3 detik pertama menjawab masalah spesifik audiens sasaran',
      'Interest: Sajikan fakta dan relevansi tanpa melebih-lebihkan kenyataan',
      'Desire: Lampirkan bukti autentik, sertifikasi BPOM/Halal, dan garansi resmi',
      'Action: Berikan satu Call to Action (CTA) yang jelas dan bebas biaya tersembunyi',
      'Kepatuhan UU No. 8/1999: Dilarang mencoret harga fiktif atau menjanjikan khasiat palsu',
      'Kepatuhan PP No. 80/2019: Syarat promo, stok terbatas, dan masa berlaku wajib transparan',
    ],
  },
];
